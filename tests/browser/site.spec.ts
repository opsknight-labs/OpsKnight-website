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
  await page.getByRole("tab", { name: "ChatOps", exact: true }).click();
  await expect(page.locator("#product-proof-panel")).toContainText("ChatOps");
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    "https://opsknight.com/",
  );
  await page.getByRole("tab", { name: "05 Page", exact: true }).click();
  await expect(page.locator("#loop-panel")).toContainText(
    "Voice · Push · Slack",
  );
  await page
    .getByRole("tab", { name: "05 Page", exact: true })
    .press("ArrowRight");
  await expect(
    page.getByRole("tab", { name: "06 Acknowledge", exact: true }),
  ).toBeFocused();
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
  const drawer = page.getByRole("dialog");
  await expect(drawer).toContainText("Datadog");
  await expect(drawer).toContainText("SUPPORTED ACTIONS");
  await expect(drawer).toContainText("AUTHENTICATION");
  await expect(drawer).toContainText("SIGNATURE BEHAVIOR");
  await drawer.getByRole("link", { name: /Open Datadog integration/ }).click();
  await expect(page).toHaveURL(/\/integrations\/datadog\//);
  await expect(
    page.getByRole("link", { name: "View setup guide" }),
  ).toHaveAttribute("href", new RegExp(`${docsPrefix}/.+datadog/`));
  await page.goto("/integrations/");
  await page.getByRole("searchbox").fill("no-provider-by-this-name");
  await expect(page.locator(".empty-result")).toBeVisible();
  await page.getByRole("searchbox").fill("");
  await page
    .getByRole("button", { name: "Communication", exact: true })
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
test("visual coverage for key pages", async ({ page }) => {
  test.setTimeout(90000);
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const route of [
    "/",
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
    for (const image of await page.locator("img").all()) {
      try {
        if (await image.isVisible()) {
          await image.scrollIntoViewIfNeeded();
          await expect(image).toHaveJSProperty("complete", true);
        }
      } catch {
        // Element may have re-rendered or unmounted
      }
    }
    await page.evaluate(() => window.scrollTo(0, 0));
    await expect(page).toHaveScreenshot(
      `${route === "/" ? "home" : route.replaceAll("/", "-")}.png`,
      {
        fullPage: true,
        animations: "disabled",
        maxDiffPixelRatio: 0.025,
        stylePath: "tests/browser/screenshot.css",
      },
    );
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
