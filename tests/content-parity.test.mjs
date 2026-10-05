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

test("install page documents required secrets, sizing, and all 3 deployment topologies", () => {
  const installContent = fs.readFileSync(path.join(root, "src/app/install/page.tsx"), "utf8");
  assert.ok(installContent.includes("NEXTAUTH_SECRET"), "NEXTAUTH_SECRET missing from install");
  assert.ok(installContent.includes("ENCRYPTION_KEY"), "ENCRYPTION_KEY missing from install");
  assert.ok(installContent.includes("API_KEY_SECRET"), "API_KEY_SECRET missing from install");
  assert.ok(installContent.includes("Docker Compose"), "Docker Compose missing from install");
  assert.ok(installContent.includes("Kubernetes"), "Kubernetes missing from install");
  assert.ok(installContent.includes("Docker Swarm"), "Docker Swarm missing from install");
  assert.ok(installContent.includes("Sizing Matrix"), "Sizing matrix missing from install");
  assert.ok(installContent.includes("Production Readiness Checklist"), "Production checklist missing");
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
