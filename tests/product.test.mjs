import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
const original = process.cwd();
function fixture(mutator) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "opsknight-contract-"));
  for (const dir of [
    "content/product",
    "content/docs/v2.0.0",
    "src/generated",
    "scripts",
    "public/product",
  ])
    fs.cpSync(path.join(original, dir), path.join(root, dir), {
      recursive: true,
    });
  fs.symlinkSync(
    path.join(original, "node_modules"),
    path.join(root, "node_modules"),
    "dir",
  );
  try {
    mutator(root);
    return spawnSync(
      process.execPath,
      ["scripts/product-manifest.mjs", "--check"],
      { cwd: root, encoding: "utf8" },
    );
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
}
function change(root, name, mutate) {
  const f = path.join(root, "content/product", `${name}.json`);
  const value = JSON.parse(fs.readFileSync(f, "utf8"));
  mutate(value);
  fs.writeFileSync(f, JSON.stringify(value));
}
test("release snapshot and generated manifest agree", () => {
  const r = fixture(() => {});
  assert.equal(r.status, 0, r.stderr);
});
for (const [name, file, mutate] of [
  ["release drift", "release", (v) => (v.version = "9.0.0")],
  ["status page exaggeration", "boundaries", (v) => (v.statusPageLimit = 3)],
  ["native app claim", "boundaries", (v) => (v.mobileType = "Native iOS")],
  [
    "voice lifecycle drift",
    "notifications",
    (v) => (v.voiceScope = "All lifecycle events call"),
  ],
  [
    "missing documentation",
    "platform",
    (v) => (v.products[0].docs = "missing/page"),
  ],
  [
    "unsupported capability",
    "platform",
    (v) => (v.products[0].capability = "ai_rca"),
  ],
])
  test(`rejects ${name}`, () => {
    const r = fixture((root) => change(root, file, mutate));
    assert.notEqual(r.status, 0);
    assert.match(r.stderr, /product contract/);
  });
test("rejects stale generated integration count", () => {
  const r = fixture((root) => {
    const f = path.join(root, "src/generated/product-manifest.json");
    const v = JSON.parse(fs.readFileSync(f, "utf8"));
    v.inboundIntegrationCount = 99;
    fs.writeFileSync(f, JSON.stringify(v));
  });
  assert.notEqual(r.status, 0);
  assert.match(r.stderr, /Manifest stale/);
});
test("rejects altered catalog evidence", () => {
  const r = fixture((root) =>
    fs.appendFileSync(
      path.join(root, "content/product/source/catalog.yaml"),
      "\n# changed\n",
    ),
  );
  assert.notEqual(r.status, 0);
  assert.match(r.stderr, /Snapshot changed/);
});
