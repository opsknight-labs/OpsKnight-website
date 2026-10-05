// Explicitly refresh the checked-in, tagged source snapshot. Never reads main.
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
const [repo, tag] = process.argv.slice(2);
if (!repo || !/^v\d+\.\d+\.\d+$/.test(tag ?? ""))
  throw Error("Usage: node scripts/sync-product.mjs /path/to/OpsKnight vX.Y.Z");
const git = (args) => execFileSync("git", ["-C", path.resolve(repo), ...args]);
const commit = git(["rev-parse", `${tag}^{commit}`])
  .toString()
  .trim();
const mappings = {
  "versions.json": "docs/versions.json",
  "capabilities.yaml": `docs/${tag}/capabilities.yaml`,
  "catalog.yaml": `docs/${tag}/integrations/catalog.yaml`,
  "CHANGELOG.md": "CHANGELOG.md",
  LICENSE: "LICENSE",
};
const staged = Object.entries(mappings).map(([dest, source]) => [
  dest,
  git(["show", `${commit}:${source}`]),
]);
const versions = JSON.parse(
  staged.find(([dest]) => dest === "versions.json")[1],
);
if (versions.currentRelease !== tag)
  throw Error("The requested tag must identify itself as currentRelease");
const sha256 = {};
for (const [dest, bytes] of staged) {
  fs.writeFileSync(`content/product/source/${dest}`, bytes);
  sha256[dest] = crypto.createHash("sha256").update(bytes).digest("hex");
}
fs.writeFileSync(
  "content/product/source/provenance.json",
  JSON.stringify(
    {
      repository: "https://github.com/opsknight-labs/OpsKnight",
      tag,
      commit,
      sha256,
    },
    null,
    2,
  ) + "\n",
);
console.log(
  `Pinned ${tag} at ${commit}. Review the marketing contract, sync versioned docs and run product:generate.`,
);
