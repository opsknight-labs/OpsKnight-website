import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";

test("site parity ledger has no unresolved redesign regressions", () => {
  const ledger = JSON.parse(fs.readFileSync("content/site-parity.json", "utf8"));
  const allowed = new Set(["PRESERVED", "RESTORED", "REWRITTEN", "INTENTIONALLY_REMOVED"]);
  const ids = new Set();

  assert.ok(Array.isArray(ledger.entries) && ledger.entries.length >= 20);

  for (const entry of ledger.entries) {
    assert.ok(entry.id, "every parity entry needs an id");
    assert.ok(!ids.has(entry.id), "duplicate parity id: " + entry.id);
    ids.add(entry.id);

    assert.ok(allowed.has(entry.status), entry.id + ": unsupported status " + entry.status);
    assert.notEqual(entry.status, "MISSING", entry.id + ": still missing");
    assert.notEqual(entry.status, "TODO", entry.id + ": still TODO");

    assert.ok(entry.area && entry.oldContent, entry.id + ": identity fields missing");
    if (entry.status === "INTENTIONALLY_REMOVED") {
      assert.ok(entry.reason, entry.id + ": intentional removals need a reason");
    } else {
      assert.ok(entry.newDestination, entry.id + ": restored/preserved entries need a destination");
    }
  }
});
