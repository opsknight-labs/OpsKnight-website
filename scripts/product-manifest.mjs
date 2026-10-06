import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import yaml from "js-yaml";
const base = "content/product";
const read = (n) => fs.readFileSync(`${base}/${n}`, "utf8");
const json = (n) => JSON.parse(read(`${n}.json`));
const assert = (ok, msg) => {
  if (!ok) throw Error(`[product contract] ${msg}`);
};
const provenance = json("source/provenance");
for (const [f, h] of Object.entries(provenance.sha256))
  assert(
    crypto
      .createHash("sha256")
      .update(read(`source/${f}`))
      .digest("hex") === h,
    `Snapshot changed: ${f}`,
  );
const versions = json("source/versions"),
  release = json("release");
const capabilities = yaml.load(read("source/capabilities.yaml")).capabilities,
  catalog = yaml.load(read("source/catalog.yaml"));
assert(
  `v${release.version}` === versions.currentRelease &&
    provenance.tag === versions.currentRelease,
  "Release mismatch",
);
assert(
  release.license === "AGPL-3.0-only" &&
    read("source/LICENSE").includes("GNU AFFERO GENERAL PUBLIC LICENSE"),
  "License mismatch",
);
assert(release.hostedSaaS === false, "Self-hosted distribution required");
const docsRoot = `content/docs/${versions.currentRelease}`;
function docs(slug) {
  const s = slug.replace(/\/README$/, "");
  const f = [`${docsRoot}/${s}.md`, `${docsRoot}/${s}/README.md`].find(
    fs.existsSync,
  );
  assert(f, `Missing docs: ${slug}`);
  return fs.readFileSync(f, "utf8");
}
function visit(v) {
  if (Array.isArray(v)) v.forEach(visit);
  else if (v && typeof v === "object")
    for (const [k, x] of Object.entries(v)) {
      if (k === "docs" || k === "deliveryDocs") docs(x);
      if (k === "capability")
        assert(
          capabilities[x]?.status === "documented",
          `Missing capability: ${x}`,
        );
      visit(x);
    }
}
const platform = json("platform"),
  notifications = json("notifications"),
  deployments = json("deployments"),
  security = json("security"),
  boundaries = json("boundaries"),
  extra = json("integrations");
[platform, notifications, deployments, security, boundaries, extra].forEach(
  visit,
);
for (const e of [
  boundaries.statusEvidence,
  boundaries.mobileEvidence,
  boundaries.escalationEvidence,
])
  assert(
    docs(e.docs).includes(e.contains),
    `Boundary evidence mismatch: ${e.docs}`,
  );
assert(
  boundaries.statusPageLimit === 1 && boundaries.mobileType === "PWA",
  "Status/mobile limits mismatch",
);
assert(
  boundaries.manualEscalation.includes("no manual escalation control in Web"),
  "Web escalation boundary missing",
);
assert(
  notifications.voiceProvider === "Twilio" &&
    notifications.voiceScope.includes("Triggered incidents") &&
    notifications.voiceScope.includes("do not initiate additional calls"),
  "Voice lifecycle scope mismatch",
);
const m = read("source/CHANGELOG.md").match(
  new RegExp(
    `## \\[${release.version.replaceAll(".", "\\.")}\\] - (\\d{4}-\\d{2}-\\d{2})\\n([\\s\\S]*?)(?=\\n## \\[|$)`,
  ),
);
assert(m, "Release date missing");
const highlights = [...m[2].matchAll(/^- \*\*([^*]+)\*\*:? ([^\n]+)/gm)].map(
  (x) => ({ title: x[1].replace(/:$/, ""), description: x[2] }),
);
const files = [];
function walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const f = path.join(d, e.name);
    if (e.isDirectory()) walk(f);
    else if (e.name.endsWith(".md")) files.push(f);
  }
}
walk(`${docsRoot}/integrations`);
const providers = catalog.providers.filter((p) => p.direction === "inbound");
assert(
  new Set(providers.map((p) => p.id)).size === providers.length,
  "Duplicate providers",
);
const integrations = providers.map((p) => {
  const f = files.find((f) => path.basename(f) === `${p.id}.md`);
  assert(f, `Missing provider docs: ${p.id}`);
  return {
    id: p.id,
    title: p.title,
    category: p.category,
    direction: p.direction,
    kind: "inbound",
    protocol: p.protocol ?? null,
    endpoint: p.endpoint ?? null,
    method: p.request?.method ?? null,
    actions: p.acceptedActions,
    authentication: p.authentication,
    acceptedCredentials: p.request?.integrationKey ?? [],
    integrationId: p.request?.integrationId ?? null,
    bodyLimitBytes: p.request?.bodyLimitBytes ?? null,
    rateLimit: p.request?.rateLimit ?? null,
    signature: p.signatureVerification?.mode ?? "none",
    signatureProvider: p.signatureVerification?.provider ?? null,
    signatureHeaders: p.signatureVerification?.headers ?? [],
    correlation: p.correlation ?? null,
    recovery: p.recovery ?? null,
    errors: p.errors ?? [],
    source: p.source ?? null,
    route: p.route ?? null,
    docs: path.relative(docsRoot, f).replace(/\.md$/, ""),
  };
});
for (const p of extra.additional) {
  assert(
    catalog.integrations.some((x) => x.id === (p.catalogId ?? p.id)),
    `Missing ecosystem integration: ${p.id}`,
  );
  integrations.push({
    id: p.id,
    title: p.title,
    category: p.category,
    direction: p.direction,
    kind: "workflow",
    protocol: null,
    endpoint: null,
    method: null,
    actions: [],
    authentication: [],
    acceptedCredentials: [],
    integrationId: null,
    bodyLimitBytes: null,
    rateLimit: null,
    signature: "See setup guide",
    signatureProvider: null,
    signatureHeaders: [],
    correlation: null,
    recovery: null,
    errors: [],
    source: null,
    route: null,
    docs: p.docs,
  });
}
const screenshots = json("screenshots");
for (const [name, evidence] of Object.entries(screenshots.assets)) {
  const file = `public/product/${name}.webp`;
  assert(fs.existsSync(file), `Screenshot missing: ${file}`);
  assert(
    crypto.createHash("sha256").update(fs.readFileSync(file)).digest("hex") ===
      evidence.sha256,
    `Screenshot evidence changed: ${name}`,
  );
}
for (const p of platform.products)
  if (p.screenshot)
    assert(
      screenshots.assets[p.screenshot.replace(/\.png$/, "")],
      `Screenshot evidence missing: ${p.screenshot}`,
    );
const manifest = {
  release: {
    ...release,
    date: m[1],
    tag: provenance.tag,
    sourceCommit: provenance.commit,
    highlights,
  },
  inboundIntegrationCount: providers.length,
  platform,
  notifications,
  deployments,
  security,
  boundaries,
  integrations,
  screenshots,
};
const output = JSON.stringify(manifest, null, 2) + "\n",
  target = "src/generated/product-manifest.json";
if (process.argv.includes("--check"))
  assert(
    fs.existsSync(target) && fs.readFileSync(target, "utf8") === output,
    "Manifest stale; run npm run product:generate",
  );
else fs.writeFileSync(target, output);
console.log(
  `[product contract] ${provenance.tag}: ${providers.length} inbound integrations validated`,
);
