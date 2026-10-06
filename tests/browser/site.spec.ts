import { test, expect } from "@playwright/test";
import manifest from "../../src/generated/product-manifest.json";
const docsPrefix = `/docs/${manifest.release.tag}`;
test("homepage workflow, architecture, metadata and layout", async ({
  page,
}, testInfo) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Own the incident",
  );
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    "https://opsknight.com/",
  );
  if (testInfo.project.name === "mobile") {
    await page.locator(".response-stepper button").filter({ hasText: "Page" }).click();
  } else {
    await page.locator('[data-loop-chapter="4"]').scrollIntoViewIfNeeded();
  }
  await expect(page.locator(".response-canvas")).toHaveAttribute("data-step", "4");
  await expect(page.locator(".response-canvas")).toContainText("Voice");
  await expect(page.locator(".response-canvas")).toContainText("Push");
  await page.getByRole("tab", { name: "Split", exact: true }).click();
  await expect(page.locator("#arch-panel")).toContainText("Critical Worker");
  const noOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth <= innerWidth,
  );
  expect(noOverflow).toBe(true);
  const shots = page.locator('img[src*="/product/"]');
  for (let i = 0; i < (await shots.count()); i++) {
    await shots.nth(i).scrollIntoViewIfNeeded();
    await expect(shots.nth(i)).toHaveJSProperty("complete", true);
    expect(
      await shots.nth(i).evaluate((im: HTMLImageElement) => im.naturalWidth),
    ).toBeGreaterThan(0);
  }
  expect(errors).toEqual([]);
  await page.screenshot({
    path: testInfo.outputPath("homepage.png"),
    fullPage: true,
  });
});
test("navigation and search", async ({ page }, testInfo) => {
  await page.goto("/");
  if (testInfo.project.name === "mobile") {
    await page.getByLabel("Open navigation").click();
    await page
      .getByRole("navigation", { name: "Mobile navigation" })
      .getByRole("link", { name: "Incident command", exact: true })
      .click();
  } else {
    await page
      .locator(".desktop-nav summary")
      .filter({ hasText: "Product" })
      .click();
    await page
      .locator(".site-mega")
      .getByRole("link", { name: "Incident command", exact: true })
      .click();
  }
  await expect(page).toHaveURL(/\/product\/incidents\//);
  await page.getByRole("button", { name: "Search website" }).click();
  await expect(page.getByPlaceholder(/Search/).first()).toBeVisible();
  await page.keyboard.press("Escape");
});
test("integration filtering and setup routes", async ({ page }) => {
  await page.goto("/integrations/");
  for (const image of await page.locator(".integration-item img").all()) {
    await image.scrollIntoViewIfNeeded();
    await expect(image).toHaveJSProperty("complete", true);
    expect(
      await image.evaluate((im: HTMLImageElement) => im.naturalWidth),
    ).toBeGreaterThan(0);
  }
  await page.getByRole("searchbox").fill("Datadog");
  await expect(page.locator(".integration-item")).toHaveCount(1);
  await page.locator(".integration-item").click();
  await expect(page).toHaveURL(/\/integrations\/datadog\//);
  await expect(
    page.getByRole("link", { name: "View setup guide" }),
  ).toHaveAttribute("href", new RegExp(`${docsPrefix}/.+datadog/`));
  await page.getByRole("link", { name: "View setup guide" }).click();
  await expect(page).toHaveURL(new RegExp(`${docsPrefix}/.+datadog/`));
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Datadog",
  );
  await page.reload();
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Datadog",
  );
  await page.goto("/integrations/");
  await expect(
    page.getByRole("link", { name: "Read the generic webhook guide" }),
  ).toHaveAttribute("href", `${docsPrefix}/integrations/webhooks/webhook/`);
  await expect(
    page.getByRole("link", { name: "View the compatibility guide" }),
  ).toHaveAttribute("href", `${docsPrefix}/integrations/webhooks/pagerduty/`);
  await page.getByRole("searchbox").fill("no-provider-by-this-name");
  await expect(page.locator(".empty-result")).toBeVisible();
  await page.getByRole("searchbox").fill("");
  await page
    .getByRole("button", { name: "communication", exact: true })
    .click();
  await expect(page.locator(".integration-item")).toHaveCount(2);
});
test("deployment choices preserve HA boundary", async ({ page }) => {
  await page.goto("/install/");
  await page.getByLabel("High availability", { exact: true }).check();
  await expect(page.locator(".deployment-result")).toContainText(
    "split runtime alone does not provide high availability",
  );
  await page.getByLabel("Kubernetes", { exact: true }).check();
  await expect(page.locator(".deployment-result h3")).toContainText(
    "Kubernetes",
  );
  await expect(page.locator(".deployment-result a")).toHaveAttribute(
    "href",
    `${docsPrefix}/operate/deploy/kubernetes/`,
  );
});
test("reduced motion and product boundaries", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  expect(
    await page
      .locator(".track-point")
      .first()
      .evaluate((e) => getComputedStyle(e).animationName),
  ).toBe("none");
  await page.goto("/product/status-pages/");
  await expect(page.locator(".site-boundary")).toContainText("1 status page");
  await page.goto("/product/mobile/");
  await expect(page.locator(".site-boundary")).toContainText("PWA");
  await page.goto("/product/on-call/");
  await expect(page.locator(".site-boundary")).toContainText(
    "no manual escalation control in Web",
  );
});
test("responsive coverage for key marketing pages", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  const viewports = [
    [360, 800],
    [390, 844],
    [430, 932],
    [768, 1024],
    [1024, 768],
    [1280, 720],
    [1366, 768],
    [1440, 900],
    [1512, 982],
    [1920, 1080],
    [2560, 1440],
  ] as const;

  for (const [width, height] of viewports) {
    await page.setViewportSize({ width, height });
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);
    await expect(page.locator(".hero-command-center img")).toHaveJSProperty(
      "complete",
      true,
    );
    if (height <= 720 || width <= 1099) {
      await expect(page.locator(".response-stepper")).toBeVisible();
    }
  }

  await page.setViewportSize({ width: 1440, height: 900 });
  for (const route of [
    "/product/incidents/",
    "/integrations/",
    "/install/",
    "/security/",
    "/support/",
    "/contact/",
    "/community/",
    "/compare/",
    "/docs/v2.0.0/",
  ]) {
    await page.goto(route);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);
    for (const image of await page.locator("img").all()) {
      await image.scrollIntoViewIfNeeded();
      await expect(image).toHaveJSProperty("complete", true);
    }
  }
});

test("WCAG AA checks on marketing flows", async ({ page }) => {
  const { default: AxeBuilder } = await import("@axe-core/playwright");
  for (const route of [
    "/",
    "/install/",
    "/integrations/",
    "/product/incidents/",
    "/security/",
    "/support/",
    "/contact/",
    "/community/",
  ]) {
    await page.goto(route);
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    expect(
      results.violations.map((v) => ({
        id: v.id,
        nodes: v.nodes.map((n) => n.target),
      })),
    ).toEqual([]);
  }
});

test("organizations can find services and evaluate security without a community account", async ({
  page,
}, testInfo) => {
  await page.goto("/");
  if (testInfo.project.name === "mobile") {
    await page.getByLabel("Open navigation").click();
    await page
      .getByRole("navigation", { name: "Mobile navigation" })
      .getByRole("link", { name: "Support & Services", exact: true })
      .click();
  } else {
    await page
      .locator(".desktop-nav summary")
      .filter({ hasText: "Resources" })
      .click();
    await page
      .getByRole("navigation", { name: "Main navigation" })
      .getByRole("link", { name: "Support & Services", exact: true })
      .click();
  }
  await expect(page).toHaveURL(/\/support\//);
  await expect(
    page.getByRole("heading", { name: "Commercial Support", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Discuss support", exact: true }),
  ).toHaveAttribute("href", /^mailto:help@opsknight\.com\?subject=/);
  await expect(page.locator(".services-process li")).toHaveCount(5);
  await page.goto("/contact/");
  await expect(page.locator("#procurement a").first()).toHaveAttribute(
    "href",
    /^mailto:help@opsknight\.com\?subject=/,
  );
  await expect(page.locator("#security a").first()).toHaveAttribute(
    "href",
    /security\/advisories\/new$/,
  );
  await page
    .locator("#procurement a")
    .filter({ hasText: "Review security" })
    .click();
  await expect(
    page.getByRole("heading", {
      name: "For security & procurement teams",
      exact: true,
    }),
  ).toBeVisible();
  const policy = page
    .locator("#evaluation")
    .getByRole("link", { name: "Read security policy", exact: true });
  await expect(policy).toHaveAttribute(
    "href",
    new RegExp(`/blob/${manifest.release.tag}/SECURITY\\.md$`),
  );
  for (const width of [900, 1050, 1100, 1280]) {
    await page.setViewportSize({ width, height: 900 });
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
  }
});
