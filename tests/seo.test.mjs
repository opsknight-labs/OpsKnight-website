import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";

test("sitemap source enforces trailing-slash canonical URLs and realistic lastModified dates", () => {
  const sitemapSrc = fs.readFileSync("src/app/sitemap.ts", "utf8");
  assert.ok(sitemapSrc.includes("url: `${baseUrl}/`"), "Root URL in sitemap must include trailing slash");
  assert.ok(sitemapSrc.includes("url: `${baseUrl}/compare/`"), "Compare URL in sitemap must include trailing slash");
  assert.ok(sitemapSrc.includes("url: `${baseUrl}/contact/`"), "Contact URL in sitemap must include trailing slash");
  assert.ok(sitemapSrc.includes("url: `${baseUrl}${route}/`"), "Route mapping in sitemap must append trailing slash");
  assert.ok(sitemapSrc.includes("getRouteLastModified"), "Sitemap must use content-level getRouteLastModified dates");

  const siteJson = JSON.parse(fs.readFileSync("content/product/site.json", "utf8"));
  assert.equal(siteJson.updatedAt, "2026-10-09", "site.json must be updated to current release refresh date");
});

test("social open-graph image assets exist for all primary products and brand", () => {
  assert.ok(fs.existsSync("public/social/opsknight.png"), "Brand OG image public/social/opsknight.png must exist");

  const manifest = JSON.parse(fs.readFileSync("src/generated/product-manifest.json", "utf8"));
  for (const product of manifest.platform.products) {
    const ogPath = path.join("public", "social", `product-${product.slug}.png`);
    assert.ok(fs.existsSync(ogPath), `Social preview image ${ogPath} must exist for product ${product.slug}`);
  }
});

test("robots.txt configuration references the canonical sitemap and host", () => {
  const robotsSrc = fs.readFileSync("src/app/robots.ts", "utf8");
  assert.ok(robotsSrc.includes("sitemap: `${baseUrl}/sitemap.xml`"), "robots.ts must expose the canonical sitemap URL");
  assert.ok(robotsSrc.includes("allow: \"/\""), "robots.ts must allow crawling the site root");
});

test("about page deterministic contracts accurately describe inbound integrations", () => {
  const aboutSrc = fs.readFileSync("src/app/about/page.tsx", "utf8");
  assert.ok(
    !aboutSrc.includes("HMAC cryptographically signed"),
    "About page must not claim all 28 inbound sources are unconditionally HMAC signed",
  );
  assert.ok(
    aboutSrc.includes("Documented request contracts"),
    "About page fact strip must cite documented request contracts",
  );
  assert.ok(
    aboutSrc.includes("conditional signature verification"),
    "About page must note signature verification is conditional on provider configuration",
  );
});

test("structured data in root layout includes comprehensive SoftwareApplication metadata", () => {
  const layoutSrc = fs.readFileSync("src/app/layout.tsx", "utf8");
  assert.ok(layoutSrc.includes('"@type": "SoftwareApplication"'), "Root layout must define SoftwareApplication schema");
  assert.ok(layoutSrc.includes("codeRepository: BRAND.links.github"), "SoftwareApplication must specify codeRepository");
  assert.ok(layoutSrc.includes("downloadUrl:"), "SoftwareApplication must specify downloadUrl");
  assert.ok(layoutSrc.includes("Docker, Kubernetes"), "SoftwareApplication must list supported operating systems");
  assert.ok(layoutSrc.includes("url: `${baseUrl}/`"), "Structured data URLs must use canonical trailing slash");
});
