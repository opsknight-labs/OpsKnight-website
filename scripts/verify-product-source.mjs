import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import crypto from "node:crypto";
import { execFileSync } from "node:child_process";
const provenance = JSON.parse(
  fs.readFileSync("content/product/source/provenance.json", "utf8"),
);
const flag = process.argv.indexOf("--repository");
const temporary =
  flag === -1
    ? fs.mkdtempSync(path.join(os.tmpdir(), "opsknight-release-"))
    : null;
const repo = temporary ?? path.resolve(process.argv[flag + 1]);
const git = (args) =>
  execFileSync("git", ["-C", repo, ...args], {
    stdio: ["ignore", "pipe", "pipe"],
  });
try {
  if (temporary) {
    git(["init"]);
    git(["remote", "add", "origin", provenance.repository]);
    git([
      "fetch",
      "--depth",
      "1",
      "origin",
      `refs/tags/${provenance.tag}:refs/tags/${provenance.tag}`,
    ]);
  }
  const commit = git(["rev-parse", `${provenance.tag}^{commit}`])
    .toString()
    .trim();
  if (commit !== provenance.commit)
    throw Error("Release tag no longer matches the pinned source commit");
  const mapping = {
    "versions.json": "docs/versions.json",
    "capabilities.yaml": `docs/${provenance.tag}/capabilities.yaml`,
    "catalog.yaml": `docs/${provenance.tag}/integrations/catalog.yaml`,
    "CHANGELOG.md": "CHANGELOG.md",
    LICENSE: "LICENSE",
    "notification-priority.ts": "src/lib/notification-priority.ts",
  };
  for (const [file, source] of Object.entries(mapping)) {
    const bytes = git(["show", `${commit}:${source}`]);
    const hash = crypto.createHash("sha256").update(bytes).digest("hex");
    if (hash !== provenance.sha256[file])
      throw Error(`Upstream evidence differs: ${file}`);
  }
  console.log(`[release source] Verified ${provenance.tag} (${commit})`);
} finally {
  if (temporary) fs.rmSync(temporary, { recursive: true, force: true });
}
