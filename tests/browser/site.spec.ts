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
  await expect(page.getByText("From first signal to final review.")).toBeVisible();
  const integrationSearch = page.getByRole("searchbox", {
    name: "Find an OpsKnight integration",
  });
  await integrationSearch.fill("Prometheus");
  await expect(page.getByRole("link", { name: /Prometheus Alertmanager/ })).toBeVisible();
  await integrationSearch.fill("");
  await page.getByRole("tab", { name: "ChatOps", exact: true }).click();
  await expect(page.locator("#product-proof-panel")).toContainText("ChatOps");
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    "https://opsknight.com/",
  );
  await page.getByRole("button", { name: "05 Page", exact: true }).click();
  await expect(page.locator("#loop-panel")).toHaveAttribute("data-step", "4");
  await expect(page.locator("#loop-panel")).toContainText(
    "Voice · Push · SMS · Teams",
  );
  await page
    .getByRole("button", { name: "06 Acknowledge", exact: true })
    .click();
  await expect(page.locator("#loop-panel")).toHaveAttribute("data-step", "5");
  await expect(page.locator("#loop-panel")).toContainText("ACKNOWLEDGED");
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
  await expect(drawer).toContainText("POST /api/integrations/datadog");
  await expect(drawer).toContainText("REQUEST STARTER");
  await expect(drawer.getByRole("button", { name: "Copy", exact: true })).toHaveCount(2);
  await expect(drawer).toContainText("100 requests / 60s / integration");
  await expect(drawer).toContainText("CORRELATION & RECOVERY");
  await drawer.getByRole("link", { name: /Open Datadog integration/ }).click();
  await expect(page).toHaveURL(/\/integrations\/datadog\//);
  await expect(
    page.getByRole("link", { name: "View setup guide" }),
  ).toHaveAttribute("href", new RegExp(`${docsPrefix}/.+datadog/`));
  await page.goto("/integrations/");
  await page.getByRole("searchbox").fill("x-routing-key");
  await expect(page.locator(".integration-item")).toHaveCount(1);
  await expect(page.locator(".integration-item")).toContainText("PagerDuty");
  await page.goto("/integrations/webhook/");
  await page.context().grantPermissions(["clipboard-read", "clipboard-write"]);
  await expect(page.getByRole("button", { name: "Copy payload.json" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Copy cURL" })).toBeVisible();
  await page.getByRole("button", { name: "Copy payload.json" }).click();
  await expect(page.getByRole("button", { name: "Copy payload.json" })).toContainText("Copied");
  await page.goto("/integrations/");
  await page.getByRole("searchbox").fill("no-provider-by-this-name");
  await expect(page.locator(".empty-result")).toBeVisible();
  await page.getByRole("searchbox").fill("");
  await page
    .getByRole("button", { name: "Communication", exact: true })
    .click();
  await expect(page.locator(".integration-item")).toHaveCount(2);
});

test("changelog restores release filters and version navigation", async ({ page }) => {
  await page.goto("/changelog/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Every release");
  await expect(page.getByRole("tab", { name: "All", exact: true })).toBeVisible();
  await expect(page.getByRole("tab", { name: "Changes", exact: true })).toBeVisible();
  await expect(page.getByRole("tab", { name: "Performance", exact: true })).toBeVisible();
  await expect(page.locator(".release-article").first()).toContainText("v2.0.0");
  await expect(page.locator(".release-command").first()).toContainText("docker pull");
  await page.getByRole("tab", { name: "Security", exact: true }).click();
  await expect(page.locator(".release-article").first()).toBeVisible();
  await expect(page.locator(".change-kind-security").first()).toBeVisible();
  await page.getByRole("tab", { name: "Changes", exact: true }).click();
  await expect(page.locator(".release-article").first()).toContainText("2.0 Release Boundaries");
  await expect(page.locator(".release-article").first()).toContainText("One supported status page");
});
test("solution journeys use the canonical deployment path", async ({ page }) => {
  await page.goto("/solutions/sre/");
  await expect(page.getByRole("link", { name: "Deploy OpsKnight" })).toHaveAttribute(
    "href",
    "/deploy/",
  );
  await page.goto("/legal/");
  const policyGrid = page.locator(".legal-index-grid");
  const privacyPolicy = policyGrid.locator("article").filter({ hasText: "Privacy" });
  const termsPolicy = policyGrid.locator("article").filter({ hasText: "Website terms" });
  await expect(
    privacyPolicy.getByRole("link", { name: "Open policy" }),
  ).toHaveAttribute("href", "/privacy/");
  await expect(
    termsPolicy.getByRole("link", { name: "Open policy" }),
  ).toHaveAttribute("href", "/terms/");
});

test("deployment choices preserve HA boundary", async ({ page }) => {
  await page.goto("/deploy/");
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
  await expect(page.locator(".status-live-banner a")).toHaveAttribute(
    "href",
    "https://status.opsknight.com",
  );
  await page.goto("/product/mobile/");
  await expect(page.locator(".site-boundary")).toContainText("PWA");
  await page.goto("/product/on-call/");
  await expect(page.locator(".site-boundary")).toContainText(
    "no manual escalation control in Web",
  );
});
test("responsive matrix has no horizontal overflow", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop");
  test.setTimeout(180000);

  const viewports = [
    { width: 360, height: 800 },
    { width: 390, height: 844 },
    { width: 430, height: 932 },
    { width: 768, height: 1024 },
    { width: 1024, height: 768 },
    { width: 1280, height: 720 },
    { width: 1366, height: 768 },
    { width: 1440, height: 900 },
    { width: 1512, height: 982 },
    { width: 1920, height: 1080 },
    { width: 2560, height: 1440 },
  ];
  const routes = ["/", "/integrations/", "/compare/", "/deploy/"];

  for (const viewport of viewports) {
    await page.setViewportSize(viewport);
    for (const route of routes) {
      await page.goto(route);
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
      const dimensions = await page.evaluate(() => ({
        viewport: document.documentElement.clientWidth,
        scroll: document.documentElement.scrollWidth,
      }));
      expect(
        dimensions.scroll,
        route + " overflows at " + viewport.width + "x" + viewport.height,
      ).toBeLessThanOrEqual(dimensions.viewport + 1);
    }
  }
});

test("visual coverage for key pages", async ({ page }, testInfo) => {
  test.setTimeout(120000);
  await page.emulateMedia({ reducedMotion: "reduce" });
  const coreVisualRoutes = [
    "/",
    "/product/incidents/",
    "/integrations/",
    "/deploy/",
    "/compare/",
  ];
  const fullVisualRoutes = [
    ...coreVisualRoutes,
    "/security/",
    "/support/",
    "/contact/",
    "/community/",
    "/docs/v2.0.0/",
  ];
  const routes = ["laptop-1366", "laptop-1440", "desktop-1920"].includes(
    testInfo.project.name,
  )
    ? coreVisualRoutes
    : fullVisualRoutes;

  for (const route of routes) {
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

  if (testInfo.project.name === "mobile") {
    await page.goto("/");
    await page.getByLabel("Open navigation").click();
    await expect(
      page.getByRole("navigation", { name: "Mobile navigation" }),
    ).toHaveScreenshot("mobile-navigation.png", {
      animations: "disabled",
      maxDiffPixelRatio: 0.025,
      stylePath: "tests/browser/screenshot.css",
    });
  }
});

test("WCAG AA checks on marketing flows", async ({ page }) => {
  const { default: AxeBuilder } = await import("@axe-core/playwright");
  const failures: Array<{ route: string; violations: unknown[] }> = [];
  for (const route of [
    "/",
    "/deploy/",
    "/integrations/",
    "/compare/",
    "/changelog/",
    "/legal/",
    "/solutions/",
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
    if (results.violations.length) {
      failures.push({
        route,
        violations: results.violations.map((v) => ({
          id: v.id,
          impact: v.impact,
          nodes: v.nodes.map((n) => n.target),
        })),
      });
    }
  }
  expect(failures).toEqual([]);
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
      .locator("summary")
      .filter({ hasText: "Resources" })
      .click();
    await page
      .locator(".resources-menu .site-small-menu")
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
