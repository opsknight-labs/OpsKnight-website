import fs from "node:fs";
import path from "node:path";
const root = "out";
if (!fs.existsSync(`${root}/index.html`))
  throw Error("Run npm run build first");
const files = [];
function walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const f = path.join(d, e.name);
    if (e.isDirectory()) walk(f);
    else if (e.name.endsWith(".html")) files.push(f);
  }
}
walk(root);
const redirects = fs
  .readFileSync(`${root}/_redirects`, "utf8")
  .split("\n")
  .filter((l) => l && !l.startsWith("#"))
  .map((l) => l.trim().split(/\s+/));
function exists(url) {
  const u = new URL(url, "https://opsknight.com");
  let p = decodeURIComponent(u.pathname);
  if (p.startsWith("/docs/latest/"))
    p = p.replace(
      "/docs/latest/",
      `/docs/${JSON.parse(fs.readFileSync("src/generated/product-manifest.json")).release.tag}/`,
    );
  const targets = [
    path.join(root, p),
    path.join(root, p, "index.html"),
    path.join(root, `${p}.html`),
  ];
  if (targets.some(fs.existsSync)) return true;
  return redirects.some(([from]) => from === p);
}
const failures = [];
let checked = 0;
for (const file of files) {
  const html = fs.readFileSync(file, "utf8");
  for (const match of html.matchAll(/(?:href|src)="([^"#]+)"/g)) {
    const url = match[1].replaceAll("&amp;", "&");
    if (!url.startsWith("/") || url.startsWith("//")) continue;
    checked++;
    if (!exists(url)) failures.push(`${file}: ${url}`);
  }
}
if (!fs.existsSync(`${root}/404.html`)) failures.push("Missing 404.html");
const sitemap = fs.readFileSync(`${root}/sitemap.xml`, "utf8");
for (const m of sitemap.matchAll(/<loc>([^<]+)<\/loc>/g))
  if (!exists(new URL(m[1]).pathname)) failures.push(`Sitemap: ${m[1]}`);
// Marketing pages must declare a canonical and release-provided facts.
for (const file of files.filter(
  (f) =>
    !f.includes("/docs/") && !f.includes("/404") && !f.includes("/_not-found"),
)) {
  const html = fs.readFileSync(file, "utf8");
  if (!/rel="canonical"/.test(html))
    failures.push(`${file}: canonical missing`);
}
if (failures.length) {
  console.error([...new Set(failures)].join("\n"));
  process.exit(1);
}
console.log(
  `[static export] ${files.length} HTML pages, ${checked} local references and sitemap validated`,
);
