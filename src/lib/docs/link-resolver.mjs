import fs from "node:fs";
import path from "node:path";
/** Resolve published Markdown links without guessing another release's content. */
export function resolveDocLink(
  raw,
  version,
  relDir = "",
  docsRoot = path.join(process.cwd(), "content/docs"),
) {
  const clean = raw
    .replace(/\.mdx?$/i, "")
    .replace(/\/(README|index)$/i, "")
    .replace(/^(README|index)$/i, "");
  const normalize = (p) =>
    path.posix.normalize(p).replace(/^\.\//, "").replace(/^\/$/, "");
  const candidates = [
    normalize(path.posix.join(relDir === "." ? "" : relDir, clean)),
    normalize(clean),
  ];
  const root = path.join(docsRoot, version);
  const exists = (p) =>
    !p.startsWith("..") &&
    [
      path.join(root, `${p}.md`),
      path.join(root, `${p}.mdx`),
      path.join(root, p, "README.md"),
      path.join(root, p, "index.md"),
    ].some(fs.existsSync);
  const found = candidates.find(exists);
  return found === undefined
    ? null
    : `/docs/${version}/${found === "." ? "" : found}/`.replace(/\/+/g, "/");
}
