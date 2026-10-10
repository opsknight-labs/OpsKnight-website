import { chromium } from "@playwright/test";
import fs from "node:fs";
import sharp from "sharp";
import crypto from "node:crypto";
import { execFileSync } from "node:child_process";
const url = process.env.PRODUCT_DEMO_URL ?? "http://localhost:13202";
if (!["localhost", "127.0.0.1"].includes(new URL(url).hostname))
  throw Error("Marketing capture requires a local, synthetic demo runtime");
const fixturePath = process.argv[2];
let email = process.env.PRODUCT_DEMO_EMAIL,
  password = process.env.PRODUCT_DEMO_PASSWORD;
if (fixturePath) {
  const fixture = fs.readFileSync(fixturePath, "utf8");
  email = fixture.match(/email: '([^']+)'/)[1];
  password = fixture.match(/password: '([^']+)'/)[1];
}
if (!email || !password)
  throw Error(
    "Set demo credentials or pass a synthetic fixture constants file",
  );
const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 1520, height: 1000 },
  deviceScaleFactor: 1,
  reducedMotion: "reduce",
});
const provenance = {
  source: "Isolated Docker Compose marketing demo, actual v2.0.0 release",
  capturedAt: new Date().toISOString(),
  runtimeImage:
    "ghcr.io/opsknight-labs/opsknight@sha256:099023cbd024fac4c53435aaf2bff669f0e8bf04ba96564d3a3d62d6bdfe0d62",
  runtimeRevision: JSON.parse(
    execFileSync("docker", ["inspect", "opsknight-website-demo-app-1"], {
      encoding: "utf8",
    }),
  )[0].Config.Labels["org.opencontainers.image.revision"],
  assets: {},
};
fs.mkdirSync("public/product", { recursive: true });
async function capture(name) {
  const main = page.locator("#main-content");
  await main.waitFor();
  await page
    .locator('[role=status][aria-label="Loading..."]:visible')
    .waitFor({ state: "detached" });
  const text = await main.innerText();
  if (/Something went wrong|couldn.t load|Loading\.\.\./i.test(text))
    throw Error(`Unready product view: ${name}`);
  const box = await main.boundingBox();
  const bytes = await page.screenshot({
    clip: {
      x: box.x,
      y: Math.max(0, box.y),
      width: box.width,
      height: Math.min(box.height, 950),
    },
    animations: "disabled",
  });
  const optimized = await sharp(bytes).webp({ quality: 85 }).toBuffer();
  const image = await sharp(bytes).metadata();
  fs.writeFileSync(`public/product/${name}.webp`, optimized);
  provenance.assets[name] = {
    width: image.width,
    height: image.height,
    sha256: crypto.createHash("sha256").update(optimized).digest("hex"),
    route: new URL(page.url()).pathname,
  };
  console.log(`Captured ${name}`);
}
try {
  await page.goto(`${url}/login`);
  await page.waitForLoadState("networkidle");
  await page.locator("input[type=email]").fill(email);
  await page.locator("input[type=password]").fill(password);
  await page.locator("form button[type=submit]").click();
  await page.waitForURL((u) => u.pathname !== "/login");
  const publication = await page.request.post(
    `${url}/api/settings/status-pages/cmurz14gg002oytbwy38smjpk/publish`,
  );
  if (!publication.ok())
    throw Error(`Demo status publication failed: ${publication.status()}`);
  await page.goto(`${url}/incidents`);
  await page.getByRole("heading", { name: "Incidents", exact: true }).waitFor();
  await page
    .getByRole("link", {
      name: "Elevated checkout error rate",
      exact: true,
    })
    .click();
  await page
    .getByRole("heading", {
      name: "Elevated checkout error rate",
      exact: true,
    })
    .waitFor();
  await capture("incident-detail");
  await page.goto(`${url}/schedules`);
  await page
    .getByText("Commerce Primary On-Call", { exact: true })
    .first()
    .click();
  await page.getByRole("tab", { name: /Rotation/ }).waitFor();
  await capture("on-call-schedule-detail");
  for (const [route, name, ready] of [
    ["/analytics", "analytics-overview", /Active Incidents · Current/],
    ["/postmortems", "postmortems", /Transactional email delivery/],
    ["/audit", "audit-log", /Audit Log/],
    ["/settings/notifications", "notification-settings", /Notifications/],
    ["/settings/system/health", "health-center", /Health Center/],
  ]) {
    await page.goto(`${url}${route}`);
    await page.getByText(ready).first().waitFor();
    if (name === "health-center") {
      await page.getByRole("button", { name: "Re-run Diagnostics" }).click();
      await page.getByRole("button", { name: "Re-run Diagnostics" }).waitFor();
      await page.waitForLoadState("networkidle");
    }
    await capture(name);
  }
  const statusPage = await browser.newPage({
    viewport: { width: 1520, height: 1000 },
    reducedMotion: "reduce",
  });
  await statusPage.goto(`${url}/status/aster-cloud`);
  await statusPage
    .getByText("Aster Cloud Status", { exact: true })
    .first()
    .waitFor();
  await statusPage.waitForLoadState("networkidle");
  const statusBytes = await statusPage.screenshot({ animations: "disabled" });
  const statusWebp = await sharp(statusBytes).webp({ quality: 85 }).toBuffer();
  fs.writeFileSync("public/product/status-pages.webp", statusWebp);
  provenance.assets["status-pages"] = {
    width: 1520,
    height: 1000,
    sha256: crypto.createHash("sha256").update(statusWebp).digest("hex"),
    route: "/status/aster-cloud",
    authenticated: false,
  };
  await statusPage.close();
  const teams = "teams-chatops-war-room";
  const teamsBytes = fs.readFileSync(`public/product/${teams}.webp`);
  const teamsImage = await sharp(teamsBytes).metadata();
  provenance.assets[teams] = {
    width: teamsImage.width,
    height: teamsImage.height,
    sha256: crypto.createHash("sha256").update(teamsBytes).digest("hex"),
    route: "Certified Teams collaboration evidence",
  };
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(`${url}/m`);
  await page
    .getByText("Elevated checkout error rate", { exact: true })
    .first()
    .waitFor();
  const mobileBytes = await page.screenshot({ animations: "disabled" });
  const mobileWebp = await sharp(mobileBytes).webp({ quality: 85 }).toBuffer();
  fs.writeFileSync("public/product/mobile.webp", mobileWebp);
  provenance.assets.mobile = {
    width: 390,
    height: 844,
    sha256: crypto.createHash("sha256").update(mobileWebp).digest("hex"),
    route: "/m",
  };
  fs.writeFileSync(
    "content/product/screenshots.json",
    JSON.stringify(provenance, null, 2) + "\n",
  );
} finally {
  await browser.close();
}
