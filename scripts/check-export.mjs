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

// --- Comprehensive SEO Certification Checks ---

// 1. Sitemap Trailing Slashes, Existence, and Redirect Immunity
const sitemap = fs.readFileSync(`${root}/sitemap.xml`, "utf8");
const sitemapUrls = new Set();
for (const m of sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)) {
  const url = m[1];
  sitemapUrls.add(url);
  if (!url.endsWith("/")) {
    failures.push(`Sitemap: URL missing trailing slash: ${url}`);
  }
  const u = new URL(url);
  if (!exists(u.pathname)) {
    failures.push(`Sitemap: target not found: ${url}`);
  }
  if (redirects.some(([from]) => from === u.pathname)) {
    failures.push(`Sitemap: URL targets a redirect: ${url}`);
  }
}

// 2. Metadata Completeness, Title Uniqueness by Canonical, OG Images, and Structured Data
const titleToCanonical = new Map();
let jsonLdBlocks = 0;

for (const file of files) {
  if (file.includes("/404") || file.includes("/_not-found")) continue;
  const html = fs.readFileSync(file, "utf8");
  const isMarketingOrProduct = !file.includes("/docs/");

  // Canonical tag verification
  const canonicalMatch = html.match(/<link\s+rel="canonical"\s+href="([^"]+)"/);
  if (!canonicalMatch) {
    if (isMarketingOrProduct) failures.push(`${file}: canonical link missing`);
  } else {
    const canonical = canonicalMatch[1];
    if (!canonical.endsWith("/")) {
      failures.push(`${file}: canonical URL ${canonical} must end with trailing slash`);
    }
  }

  // Title tag verification & uniqueness across distinct canonicals
  const titleMatch = html.match(/<title>([^<]+)<\/title>/);
  if (!titleMatch || !titleMatch[1].trim()) {
    failures.push(`${file}: title tag missing or empty`);
  } else if (isMarketingOrProduct && canonicalMatch) {
    const title = titleMatch[1].trim();
    const canonical = canonicalMatch[1];
    if (titleToCanonical.has(title) && titleToCanonical.get(title) !== canonical) {
      failures.push(
        `${file}: duplicate title "${title}" shared by distinct canonicals: ${canonical} and ${titleToCanonical.get(title)}`,
      );
    } else {
      titleToCanonical.set(title, canonical);
    }
  }

  // Description meta tag verification
  const descMatch = html.match(/<meta\s+name="description"\s+content="([^"]*)"/);
  if (!descMatch || !descMatch[1].trim()) {
    failures.push(`${file}: meta description missing or empty`);
  }

  // Open Graph image existence on disk
  for (const ogMatch of html.matchAll(/<meta\s+property="og:image"\s+content="([^"]+)"/g)) {
    const ogUrl = ogMatch[1];
    const ogPath = ogUrl.startsWith("http") ? new URL(ogUrl).pathname : ogUrl;
    if (ogPath.startsWith("/")) {
      const diskPath = path.join(root, ogPath);
      if (!fs.existsSync(diskPath)) {
        failures.push(`${file}: OG image ${ogPath} missing on disk`);
      }
    }
  }

  // Structured Data JSON-LD verification
  for (const ldMatch of html.matchAll(
    /<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g,
  )) {
    jsonLdBlocks++;
    try {
      const parsed = JSON.parse(ldMatch[1]);
      const items = Array.isArray(parsed) ? parsed : [parsed];
      for (const item of items) {
        if (!item["@context"]) failures.push(`${file}: JSON-LD missing @context`);
        if (!item["@type"]) failures.push(`${file}: JSON-LD missing @type`);
      }
    } catch (e) {
      failures.push(`${file}: Invalid JSON-LD (${e.message})`);
    }
  }
}

if (failures.length) {
  console.error([...new Set(failures)].join("\n"));
  process.exit(1);
}

console.log(
  `[static export] ${files.length} HTML pages, ${checked} local references, ${sitemapUrls.size} sitemap URLs, ${titleToCanonical.size} unique canonical titles, and ${jsonLdBlocks} structured data blocks validated`,
);
