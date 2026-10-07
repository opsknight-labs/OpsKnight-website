import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();

test("compare matrix contains 7 vendors and required decision categories", async () => {
  const comparePath = path.join(root, "src/lib/compare-matrix.ts");
  const content = fs.readFileSync(comparePath, "utf8");

  // Check 7 vendors
  const expectedVendors = [
    "opsknight",
    "pagerduty",
    "incidentio",
    "opsgenie",
    "squadcast",
    "splunk",
    "grafana",
  ];
  for (const v of expectedVendors) {
    assert.ok(
      content.includes(`"${v}"`) || content.includes(`'${v}'`),
      `Vendor ${v} missing from compare-matrix.ts`
    );
  }

  // Check categories
  const expectedCategories = [
    "deployment",
    "response",
    "paging",
    "collaboration",
    "status",
    "analytics",
    "identity",
    "integrations",
  ];
  for (const cat of expectedCategories) {
    assert.ok(
      content.includes(`"${cat}"`) || content.includes(`'${cat}'`),
      `Category ${cat} missing from compare-matrix.ts`
    );
  }

  // Check key features in matrix
  assert.ok(content.includes("Deployment"), "Deployment row missing");
  assert.ok(content.includes("DTMF"), "DTMF voice feature missing");
  assert.ok(content.includes("Microsoft Teams"), "Teams feature missing");
  assert.ok(content.includes("SCIM 2.0"), "SCIM feature missing");
  assert.ok(
    (content.match(/feature:/g) || []).length >= 30,
    "Comparison matrix must preserve at least 30 decision dimensions",
  );
});

test("live status links are restored in footer, homepage, and product pages", () => {
  const brandContent = fs.readFileSync(path.join(root, "src/lib/brand.ts"), "utf8");
  assert.ok(
    brandContent.includes("https://status.opsknight.com"),
    "BRAND.links.status should contain https://status.opsknight.com"
  );

  const navContent = fs.readFileSync(
    path.join(root, "src/components/site/SiteNavigation.tsx"),
    "utf8"
  );
  assert.ok(
    navContent.includes("BRAND.links.status") || navContent.includes("https://status.opsknight.com"),
    "Live status URL missing from SiteFooter navigation"
  );
  assert.ok(
    navContent.includes("Live OpsKnight status"),
    "Live OpsKnight status text missing from SiteFooter"
  );

  const homeContent = fs.readFileSync(path.join(root, "src/app/page.tsx"), "utf8");
  assert.ok(
    homeContent.includes("https://status.opsknight.com") || homeContent.includes("BRAND.links.status"),
    "Live status link missing from homepage"
  );

  const productSlugContent = fs.readFileSync(
    path.join(root, "src/app/product/[slug]/page.tsx"),
    "utf8"
  );
  assert.ok(
    productSlugContent.includes("https://status.opsknight.com") || productSlugContent.includes("BRAND.links.status"),
    "Live status link missing from product status page"
  );
});

test("deploy page documents the source-backed quickstart and topology boundaries", () => {
  const installContent = fs.readFileSync(path.join(root, "src/app/install/page.tsx"), "utf8");
  assert.ok(installContent.includes("POSTGRES_PASSWORD"), "Database password missing from quickstart");
  assert.ok(installContent.includes("NEXTAUTH_URL"), "NEXTAUTH_URL missing from quickstart");
  assert.ok(installContent.includes("NEXT_PUBLIC_APP_URL"), "NEXT_PUBLIC_APP_URL missing from quickstart");
  assert.ok(installContent.includes("NEXTAUTH_SECRET"), "NEXTAUTH_SECRET missing from deploy page");
  assert.ok(installContent.includes("ENCRYPTION_KEY"), "ENCRYPTION_KEY missing from deploy page");
  assert.ok(
    /provider, metrics, SCIM, voice, or API secrets only when/i.test(installContent),
    "Conditional provider/API secret boundary missing",
  );
  assert.ok(installContent.includes("Integrated Compose"), "Integrated Compose missing");
  assert.ok(installContent.includes("Split Compose"), "Split Compose missing");
  assert.ok(installContent.includes("Docker Swarm"), "Docker Swarm missing");
  assert.ok(installContent.includes("Kubernetes Helm"), "Helm missing");
  assert.ok(installContent.includes("Kubernetes Kustomize"), "Kustomize missing");
  assert.ok(installContent.includes("Not certified"), "Capacity certification boundary missing");
  assert.ok(installContent.includes("GO-LIVE ACCEPTANCE"), "Production acceptance section missing");
});

test("security page covers identity, encryption, auditability, and procurement", () => {
  const securityContent = fs.readFileSync(path.join(root, "src/app/security/page.tsx"), "utf8");
  assert.ok(securityContent.includes("OIDC"), "OIDC missing from security page");
  assert.ok(securityContent.includes("SCIM 2.0"), "SCIM 2.0 missing from security page");
  assert.ok(securityContent.includes("AES-256-GCM"), "AES-256-GCM missing from security page");
  assert.ok(securityContent.includes("Auditor"), "Auditor role missing from security page");
  assert.ok(/telemetry/i.test(securityContent), "Telemetry statement missing from security page");
  assert.ok(/procurement/i.test(securityContent), "Procurement section missing from security page");
  assert.ok(securityContent.includes("SBOM"), "SBOM missing from security page");
});

test("support page covers sponsorship, enterprise support, and implementation services", () => {
  const supportContent = fs.readFileSync(path.join(root, "src/app/support/page.tsx"), "utf8");
  assert.ok(supportContent.includes("Commercial Support") || supportContent.includes("Support"), "Support tiers missing");
  assert.ok(supportContent.includes("Implementation") || supportContent.includes("Consulting"), "Implementation services missing");
});

test("competitor compare pages have perspectives, migration helpers, and side-by-side matrices", () => {
  const compPageContent = fs.readFileSync(
    path.join(root, "src/app/compare/[competitor]/page.tsx"),
    "utf8"
  );
  assert.ok(compPageContent.includes("Where OpsKnight is intentionally different"), "Differences section missing");
  assert.ok(compPageContent.includes("Where"), "Strengths section missing");
  assert.ok(compPageContent.includes("PagerDutyMigrationHelper"), "PagerDuty helper missing");
  assert.ok(compPageContent.includes("OpsgenieMigrationHelper"), "Opsgenie helper missing");
  assert.ok(compPageContent.includes("GrafanaMigrationHelper"), "Grafana helper missing");
});


test("site parity ledger is explicit and complete", () => {
  const ledger = JSON.parse(
    fs.readFileSync(path.join(root, "content/site-parity.json"), "utf8")
  );
  const allowed = new Set(["PRESERVED", "RESTORED", "REWRITTEN", "INTENTIONALLY_REMOVED"]);
  assert.ok(Array.isArray(ledger.entries) && ledger.entries.length >= 25, "Parity ledger is too small");
  for (const entry of ledger.entries) {
    assert.ok(entry.id && entry.area && entry.oldContent, "Parity entry missing identity fields");
    assert.ok(allowed.has(entry.status), `Invalid parity status for ${entry.id}`);
    if (entry.status === "INTENTIONALLY_REMOVED") {
      assert.ok(entry.reason, `Removal reason missing for ${entry.id}`);
    } else {
      assert.ok(entry.newDestination, `Destination missing for ${entry.id}`);
    }
  }
});

test("primary adoption routes remain exposed", () => {
  const nav = fs.readFileSync(path.join(root, "src/components/site/SiteNavigation.tsx"), "utf8");
  for (const route of ["/integrations/", "/compare/", "/security/", "/deploy/"]) {
    assert.ok(nav.includes(route), `Primary route ${route} missing from navigation`);
  }

  const home = fs.readFileSync(path.join(root, "src/app/page.tsx"), "utf8");
  assert.ok(home.includes("Live OpsKnight status"), "Homepage live-status proof missing");
  assert.ok(home.includes("Compare") || home.includes("/compare/"), "Homepage compare entry missing");

  const integrations = fs.readFileSync(path.join(root, "src/app/integrations/page.tsx"), "utf8");
  assert.ok(/generic webhook/i.test(integrations), "Generic webhook path missing from integrations");
  assert.ok(/PagerDuty Events API/i.test(integrations), "PagerDuty compatibility path missing");
  assert.ok(integrations.includes("IntegrationExplorer"), "Integration explorer missing");
});

test("integration manifest preserves release-backed request contracts", () => {
  const manifest = JSON.parse(
    fs.readFileSync(path.join(root, "src/generated/product-manifest.json"), "utf8")
  );
  const byId = Object.fromEntries(manifest.integrations.map((item) => [item.id, item]));
  assert.equal(byId.datadog.endpoint, "/api/integrations/datadog");
  assert.equal(byId.datadog.method, "POST");
  assert.deepEqual(byId.datadog.rateLimit, { requests: 100, windowSeconds: 60 });
  assert.ok(byId.datadog.acceptedCredentials.includes("Authorization: Bearer"));
  assert.match(byId.datadog.correlation, /dedup_key/);
  assert.ok(byId.datadog.errors.some((error) => error.status === 429));
  assert.equal(byId.pagerduty.signature, "none");
  assert.ok(byId.pagerduty.acceptedCredentials.includes("x-routing-key"));
  assert.equal(byId.webhook.bodyLimitBytes, 1048576);
  assert.equal(byId.slack.kind, "workflow");
  assert.equal(byId.slack.endpoint, null);
});

test("migration helpers use current v2 integration routes", () => {
  const helperPaths = [
    "src/components/comparison/PagerDutyMigrationHelper.tsx",
    "src/components/comparison/OpsgenieMigrationHelper.tsx",
    "src/components/comparison/GrafanaMigrationHelper.tsx",
  ];
  for (const relative of helperPaths) {
    const source = fs.readFileSync(path.join(root, relative), "utf8");
    assert.doesNotMatch(source, /\/api\/v1\/webhooks\//);
    assert.doesNotMatch(source, /\/api\/v1\/heartbeats/);
    assert.doesNotMatch(source, /zero[- ]code|zero alert template changes/i);
  }
  const opsgenie = fs.readFileSync(path.join(root, helperPaths[1]), "utf8");
  assert.match(opsgenie, /\/api\/integrations\/prometheus\?integrationId=/);
  assert.match(opsgenie, /\/api\/integrations\/datadog\?integrationId=/);
  assert.match(opsgenie, /\/api\/integrations\/webhook\?integrationId=/);
  const grafana = fs.readFileSync(path.join(root, helperPaths[2]), "utf8");
  assert.match(grafana, /\/api\/integrations\/grafana\?integrationId=/);
  const pagerduty = fs.readFileSync(path.join(root, helperPaths[0]), "utf8");
  assert.match(pagerduty, /\/api\/integrations\/pagerduty\/v2\/enqueue/);
});

test("deployment marketing preserves v2 capacity and support boundaries", () => {
  const deployPage = fs.readFileSync(
    path.join(root, "src/app/install/page.tsx"),
    "utf8",
  );
  for (const unsupported of [
    "300 - 2,000+ alerts/min",
    "50 - 300 alerts/min",
    "helm repo add opsknight",
    "docker stack deploy -c deploy/swarm/docker-stack.yml",
    "24/7 escalation coverage",
    "High-Volume / Enterprise",
  ]) {
    assert.equal(
      deployPage.includes(unsupported),
      false,
      `deploy page must not publish unsupported claim: ${unsupported}`,
    );
  }
  assert.match(deployPage, /Capacity status/);
  assert.match(deployPage, /Not certified/);
  assert.match(deployPage, /deploy\/swarm\/scripts\/deploy\.sh/);
  assert.match(deployPage, /deploy\/kubernetes\/helm\/opsknight/);
  assert.match(deployPage, /matching benchmark is certified/i);
  assert.match(deployPage, /bundled\s+PostgreSQL\s+is\s+not\s+highly\s+available/i);
  assert.match(deployPage, /No 24×7 coverage or response-time SLA is advertised/);
});


test("marketing evidence stays on the Northstar v2 fixture", () => {
  const manifest = JSON.parse(
    fs.readFileSync(path.join(root, "src/generated/product-manifest.json"), "utf8")
  );
  assert.equal(manifest.screenshots.fixture, "Northstar Systems");
  for (const name of [
    "dashboard-overview",
    "incident-detail",
    "on-call-schedule-detail",
    "notification-settings",
    "analytics-overview",
    "postmortems",
    "audit-log",
    "health-center",
    "status-pages",
  ]) {
    assert.equal(manifest.screenshots.assets[name]?.fixture, "Northstar Systems");
  }
  for (const stale of [
    "incident-triggered",
    "incident-acknowledged",
    "teams-chatops-war-room",
    "mobile",
  ]) {
    assert.equal(manifest.screenshots.assets[stale], undefined);
  }
  const platform = JSON.parse(
    fs.readFileSync(path.join(root, "content/product/platform.json"), "utf8")
  );
  assert.equal(platform.products.find((item) => item.slug === "chatops")?.screenshot, null);
  assert.equal(platform.products.find((item) => item.slug === "mobile")?.screenshot, null);
});

test("comparison rows expose source and verification metadata", () => {
  const matrix = fs.readFileSync(path.join(root, "src/lib/compare-matrix.ts"), "utf8");
  const table = fs.readFileSync(path.join(root, "src/components/comparison/CompareTable.tsx"), "utf8");
  assert.ok(matrix.includes("verifiedAt?: string"));
  assert.ok(matrix.includes("compareRowVerifiedAt"));
  assert.ok(table.includes("Verified {compareRowVerifiedAt(row)}"));
});
