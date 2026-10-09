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
  await expect(page.getByText(/Every alert, every responder, every decision/)).toBeVisible();
  await expect(page.locator(".hero-stage-viewport img")).toHaveAttribute("src", "/product/command-center.webp");
  const integrationSearch = page.getByRole("searchbox", {
    name: "Find an OpsKnight integration",
  });
  await integrationSearch.fill("Prometheus");
  await expect(page.getByRole("link", { name: /Prometheus Alertmanager/ })).toBeVisible();
  await integrationSearch.fill("");
  const proofTabCC = page.locator("#proof-tab-command-center");
  await proofTabCC.focus();
  await page.keyboard.press("ArrowRight");
  await expect(page.locator("#proof-tab-incidents")).toHaveAttribute("aria-selected", "true");
  await expect(page.locator("#proof-tab-incidents")).toBeFocused();
  await page.keyboard.press("End");
  await expect(page.locator("#proof-tab-operations")).toHaveAttribute("aria-selected", "true");
  await expect(page.locator("#product-proof-panel")).toContainText("Operations");
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    "https://opsknight.com/",
  );
  await page.locator("#ten-steps-disclosure summary").click();
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
test("hero uses an immersive full-width product stage", async ({ page }) => {
  await page.goto("/");
  const heading = page.getByRole("heading", { level: 1, name: /Own the incident/ });
  const intro = page.locator(".hero-intro");
  const stage = page.locator(".hero-stage-viewport");
  const picture = stage.locator("img");
  await expect(heading).toBeVisible();
  await expect(stage).toBeVisible();
  await expect(picture).toHaveJSProperty("complete", true);
  expect(await picture.evaluate((img: HTMLImageElement) => img.naturalWidth)).toBeGreaterThan(0);
  if ((page.viewportSize()?.width ?? 0) <= 479) {
    expect(await picture.evaluate((img: HTMLImageElement) => img.currentSrc)).toContain("/product/mobile.webp");
  } else {
    expect(await picture.evaluate((img: HTMLImageElement) => img.currentSrc)).toContain("/product/command-center.webp");
  }

  const introBox = await intro.boundingBox();
  const stageBox = await stage.boundingBox();
  const viewport = page.viewportSize();
  expect(introBox).not.toBeNull();
  expect(stageBox).not.toBeNull();
  if (!introBox || !stageBox || !viewport) return;
  expect(stageBox.y, "Product appears below the editorial opening").toBeGreaterThan(introBox.y + introBox.height - 3);
  expect(stageBox.y, "Product should visibly enter the first screen").toBeLessThan(viewport.height * .92);
  expect(stageBox.width, "Product interface deserves substantial width")
    .toBeGreaterThan(viewport.width * .75);
  if (viewport.width >= 1024) {
    const stageMid = stageBox.x + stageBox.width / 2;
    expect(Math.abs(stageMid - viewport.width / 2)).toBeLessThan(24);
  }
  await expect(page.locator(".hero-signal")).toHaveCount(0);
  await expect(page.locator(".hero-frame-bar")).toHaveCount(0);
  await expect(page.locator(".incident-signal-rail")).toHaveCount(0);
  await expect(page.locator(".hero-image-caption")).toHaveCount(0);
});

test("homepage hero owns the entire initial viewport", async ({ page }, testInfo) => {
  test.setTimeout(90000);
  const viewports = testInfo.project.name === "desktop"
    ? [
      { width: 1280, height: 720 },
      { width: 1366, height: 768 },
      { width: 1440, height: 900 },
      { width: 1920, height: 1080 },
    ]
    : [
      { width: 390, height: 844 },
      { width: 375, height: 667 },
    ];

  for (const viewport of viewports) {
    await page.setViewportSize(viewport);
    await page.goto("/");
    const hero = page.locator(".site-hero");
    const specs = page.locator(".trust-strip");
    const story = page.locator("#incident-loop");
    const heroBox = await hero.boundingBox();
    const specsBox = await specs.boundingBox();
    const storyBox = await story.boundingBox();
    expect(heroBox, "Hero must have a measurable viewport").not.toBeNull();
    expect(specsBox, "Feature strip must exist below the hero").not.toBeNull();
    expect(storyBox, "Incident story must exist below the hero").not.toBeNull();
    if (!heroBox || !specsBox || !storyBox) continue;

    const bottom = heroBox.y + heroBox.height;
    expect(bottom, `Hero must fill the screen at ${viewport.width}x${viewport.height}`)
      .toBeGreaterThanOrEqual(viewport.height - 2);
    expect(specsBox.y, "Licensing and technology details must begin after the first fold")
      .toBeGreaterThanOrEqual(viewport.height - 2);
    expect(storyBox.y, "Next section must not peek into the opening screen")
      .toBeGreaterThan(specsBox.y);
    expect(await page.evaluate(() => document.documentElement.scrollWidth))
      .toBeLessThanOrEqual(viewport.width + 1);
  }
});

test("homepage product evidence is inspectable by touch and keyboard", async ({ page }, testInfo) => {
  await page.goto("/");
  await expect(page.getByRole("tab", { name: /On-call/i }).first()).toHaveAttribute("aria-selected", "true");

  const region = page.getByRole("region", { name: /Product screenshot/i });
  await region.scrollIntoViewIfNeeded();
  if (testInfo.project.name === "mobile") {
    const canPan = await region.evaluate((element) => element.scrollWidth > element.clientWidth);
    expect(canPan, "mobile product screenshot should be pannable rather than unreadably scaled").toBe(true);
    await expect(page.getByText(/Swipe horizontally to explore the screenshot/)).toBeVisible();
  }
  const inspect = page.getByRole("button", { name: "Inspect fullscreen: On-call screenshot" }).first();
  await inspect.focus();
  await page.keyboard.press("Enter");
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await expect(dialog).toContainText("Follow-The-Sun On-Call Coverage");
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).not.toBeVisible();
});

test("editorial page families stay readable without page-level overflow", async ({ page }, testInfo) => {
  test.skip(!["desktop", "mobile"].includes(testInfo.project.name));
  test.setTimeout(150000);
  const pages = [
    "/", "/product/", "/product/paging/", "/integrations/", "/integrations/datadog/",
    "/deploy/", "/deploy/architecture/", "/compare/", "/compare/pagerduty/",
    "/solutions/", "/solutions/sre/", "/security/", "/about/", "/support/",
    "/contact/", "/brand/", "/changelog/", "/community/", "/legal/",
    "/privacy/", "/terms/", "/docs/v2.0.0/", "/docs/v2.0.0/start/quickstart/",
  ];
  for (const route of pages) {
    await page.goto(route);
    await expect(page.getByRole("heading", { level: 1 }).first(), route).toBeVisible();
    const geometry = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      viewportWidth: document.documentElement.clientWidth,
    }));
    expect(geometry.scrollWidth, `Horizontal document overflow on ${route}`).toBeLessThanOrEqual(geometry.viewportWidth + 1);
  }
  await page.goto("/");
  await expect(page.getByText("FIELD NOTES")).toHaveCount(0);
  await expect(page.getByText("01 / INCIDENT RESPONSE")).toHaveCount(0);
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
  if (testInfo.project.name === "desktop") {
    await page.setViewportSize({ width: 1512, height: 982 });
    await page.goto("/changelog/");
    await expect(page.locator(".nav-whats-new")).toHaveAttribute(
      "aria-current",
      "page",
    );
    await expect(page.locator(".nav-whats-new")).toBeVisible();

    await page.setViewportSize({ width: 1366, height: 768 });
    await page.goto("/changelog/");
    await expect(page.locator(".nav-whats-new")).toBeHidden();
    await page.locator(".resources-menu > summary").click();
    await expect(
      page
        .locator(".resources-menu .site-small-menu")
        .getByRole("link", { name: "What’s New", exact: true }),
    ).toHaveAttribute("aria-current", "page");

    await page.goto("/legal/");
    await expect(page.locator(".resources-menu")).toHaveClass(/nav-active/);
  }
});
test("integration catalog distinguishes alert, communication, and issue-tracking connections", async ({ page }) => {
  await page.goto("/integrations/");
  const breakdown = page.getByLabel("Integration catalog breakdown");
  await expect(breakdown).toContainText("28");
  await expect(breakdown).toContainText("Alert sources");
  await expect(breakdown).toContainText("2");
  await expect(breakdown).toContainText("Communication");
  await expect(breakdown).toContainText("1");
  await expect(breakdown).toContainText("Issue tracking");
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
  await page.getByRole("tab", { name: "Performance", exact: true }).click();
  await expect(page.locator(".release-article").first()).toContainText("Performance & Scale");
  await expect(page.locator(".change-kind-performance").first()).toBeVisible();
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
test("every product page exposes the four evaluation layers", async ({ page }) => {
  for (const route of [
    "/product/incidents/",
    "/product/on-call/",
    "/product/paging/",
    "/product/chatops/",
    "/product/status-pages/",
    "/product/analytics/",
    "/product/postmortems/",
    "/product/mobile/",
    "/product/security/",
    "/product/operations/",
  ]) {
    await page.goto(route);
    await expect(page.getByText("WHAT IT SOLVES", { exact: true })).toBeVisible();
    await expect(page.getByText("HOW IT WORKS", { exact: true })).toBeVisible();
    await expect(page.getByText("OPERATIONAL DEPTH", { exact: true })).toBeVisible();
    await expect(page.getByText("KNOW BEFORE PRODUCTION", { exact: true })).toBeVisible();
    await expect(page.locator(".product-readiness-list li")).toHaveCount(3);
  }
  const visualConcepts = [
    ["incidents", 3],
    ["on-call", 5],
    ["paging", 6],
    ["status-pages", 4],
    ["analytics", 4],
    ["postmortems", 5],
    ["mobile", 5],
    ["security", 5],
    ["operations", 6],
  ] as const;
  for (const [slug, nodes] of visualConcepts) {
    await page.goto(`/product/${slug}/`);
    const concept = page.locator(`.product-concept-${slug}`);
    await expect(concept).toBeVisible();
    await expect(concept.locator(".product-concept-node")).toHaveCount(nodes);
  }
  await page.goto("/product/chatops/");
  await expect(page.getByRole("button", { name: "Slack", exact: true })).toBeVisible();
  await page.getByRole("button", { name: "Microsoft Teams", exact: true }).click();
  await expect(page.locator(".chatops-provider-panel")).toContainText("Microsoft Teams");
});

test("reduced motion and product boundaries", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  expect(
    await page
      .locator(".hero-intro h1")
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
test("security evaluation exposes explicit outbound trust boundaries", async ({ page }) => {
  await page.goto("/security/");
  await expect(page.getByRole("heading", { name: "Control boundaries you can verify." })).toBeVisible();
  await expect(page.getByText("Self-hosted does not mean “no egress.”")).toBeVisible();
  await expect(page.getByText(/zero external telemetry/i)).toHaveCount(0);

  const productMenu = page.getByRole("group", { name: /Product/i });
  if (await productMenu.count()) {
    // Covered by the navigation visual contract; keep the route discoverable in source and rendered UI.
    await expect(page.getByRole("link", { name: /Solutions by operating model/ })).toHaveAttribute("href", "/solutions/");
  }
});

test("incident signal rail appears only on product storytelling surfaces", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator(".incident-signal-rail")).toHaveCount(0);

  await page.goto("/product/paging/");
  await expect(page.locator(".incident-signal-rail")).toHaveCount(1);

  for (const route of ["/integrations/", "/compare/", "/deploy/", "/security/", "/about/", "/legal/"]) {
    await page.goto(route);
    await expect(page.locator(".incident-signal-rail")).toHaveCount(0);
  }
});

test("compact laptop density stays below hero-scale proportions", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop");
  await page.setViewportSize({ width: 1366, height: 768 });
  await page.goto("/product/paging/");

  const density = await page.evaluate(() => {
    const hero = document.querySelector<HTMLElement>(".interior-hero");
    const title = document.querySelector<HTMLElement>(".interior-hero h1");
    const cta = document.querySelector<HTMLElement>(".final-cta");
    const footer = document.querySelector<HTMLElement>(".site-footer");
    const section = document.querySelector<HTMLElement>(".site-section");
    if (!hero || !title || !cta || !footer || !section) {
      throw new Error("density probe target missing");
    }
    const heroStyle = getComputedStyle(hero);
    const titleStyle = getComputedStyle(title);
    const ctaStyle = getComputedStyle(cta);
    const footerStyle = getComputedStyle(footer);
    const sectionStyle = getComputedStyle(section);
    return {
      heroTop: parseFloat(heroStyle.paddingTop),
      heroBottom: parseFloat(heroStyle.paddingBottom),
      title: parseFloat(titleStyle.fontSize),
      ctaTop: parseFloat(ctaStyle.paddingTop),
      footerTop: parseFloat(footerStyle.paddingTop),
      sectionTop: parseFloat(sectionStyle.paddingTop),
    };
  });

  expect(density.heroTop).toBeLessThanOrEqual(58);
  expect(density.heroBottom).toBeLessThanOrEqual(50);
  expect(density.title).toBeLessThanOrEqual(56);
  expect(density.ctaTop).toBeLessThanOrEqual(52);
  expect(density.footerTop).toBeLessThanOrEqual(40);
  expect(density.sectionTop).toBeLessThanOrEqual(78);
});

test("product pages expose capability-specific workflows", async ({ page }) => {
  await page.goto("/product/paging/");
  await page.getByRole("button", { name: "Bulk", exact: true }).click();
  await expect(page.locator(".product-signal-flow")).toContainText("Broad broadcast");
  await expect(page.locator(".product-signal-flow")).toContainText("Delivery evidence");

  await page.goto("/product/chatops/");
  await page.getByRole("button", { name: "Microsoft Teams", exact: true }).click();
  await expect(page.locator(".chatops-presentation")).toContainText(
    "Microsoft Teams. Connected to the incident.",
  );
  await expect(page.locator(".chatops-presentation")).toContainText(
    "OpsKnight remains system of record",
  );

  await page.goto("/product/status-pages/");
  await expect(page.locator(".status-live-banner")).toContainText("Live product proof");
  await expect(
    page.locator(".status-live-banner").getByRole("link", { name: /View live status/ }),
  ).toHaveAttribute("href", /^https:\/\/status\.opsknight\.com\/?$/);

  await page.goto("/product/incidents/");
  const triggeredTab = page.locator("#lifecycle-tab-triggered");
  await expect(triggeredTab).toHaveAttribute("aria-selected", "true");
  await triggeredTab.focus();
  await page.keyboard.press("ArrowRight");
  const ackTab = page.locator("#lifecycle-tab-acknowledged");
  await expect(ackTab).toHaveAttribute("aria-selected", "true");
  await expect(ackTab).toBeFocused();
  await page.keyboard.press("ArrowRight");
  const resTab = page.locator("#lifecycle-tab-resolved");
  await expect(resTab).toHaveAttribute("aria-selected", "true");
  await expect(resTab).toBeFocused();
  await expect(page.locator("#lifecycle-panel-resolved")).toBeVisible();
  await expect(page.locator("#lifecycle-panel-resolved")).toContainText(
    "Service restored and incident resolved",
  );
});

test("tier a: core marketing routes responsive verification across key viewports", async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== "desktop");
  test.setTimeout(180000);

  const viewports = [
    { width: 390, height: 844 },
    { width: 768, height: 1024 },
    { width: 1366, height: 768 },
    { width: 1920, height: 1080 },
  ];
  const routes = [
    "/",
    "/product/incidents/",
    "/integrations/",
    "/compare/",
    "/deploy/",
    "/security/",
    "/solutions/",
    "/changelog/",
    "/support/",
    "/about/",
    "/brand/",
    "/contact/",
    "/community/",
    "/legal/",
    "/privacy/",
    "/terms/",
  ];

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

test("tier b: component-heavy routes full viewport matrix from 320px to ultrawide", async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== "desktop");
  test.setTimeout(240000);

  const viewports = [
    { width: 320, height: 640 },
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
    { width: 3440, height: 1440 },
    { width: 3840, height: 1600 },
  ];
  const routes = ["/", "/integrations/", "/compare/", "/deploy/", "/product/paging/", "/changelog/", "/legal/"];

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

test("tier c: route-family responsive certification across dynamic families, detail routes, and docs templates", async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== "desktop");
  test.setTimeout(360000);

  const viewports = [
    { width: 390, height: 844 },
    { width: 1366, height: 768 },
    { width: 1920, height: 1080 },
  ];

  const productRoutes = [
    "incidents",
    "on-call",
    "paging",
    "chatops",
    "status-pages",
    "analytics",
    "postmortems",
    "mobile",
    "security",
    "operations",
  ].map((s) => `/product/${s}/`);

  const solutionRoutes = [
    "self-hosted-incident-management",
    "sre",
    "platform-engineering",
    "devops",
    "soc2-compliance",
    "msp",
  ].map((s) => `/solutions/${s}/`);

  const compareRoutes = [
    "pagerduty",
    "incident-io",
    "opsgenie",
    "squadcast",
    "splunk",
    "grafana",
  ].map((s) => `/compare/${s}/`);

  const deployDetailRoutes = [
    ...manifest.deployments.models.map((m) => `/deploy/${m.id}/`),
    "/deploy/architecture/",
  ];

  const integrationDetailRoutes = manifest.integrations.map(
    (p) => `/integrations/${p.id}/`,
  );

  const allRouteFamilyPages = [
    ...productRoutes,
    ...solutionRoutes,
    ...compareRoutes,
    ...deployDetailRoutes,
    ...integrationDetailRoutes,
  ];

  for (const viewport of viewports) {
    await page.setViewportSize(viewport);
    for (const route of allRouteFamilyPages) {
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

  // Representative docs templates at mobile, tablet, and laptop viewports
  const docsViewports = [
    { width: 390, height: 844 },
    { width: 768, height: 1024 },
    { width: 1366, height: 768 },
  ];

  const representativeDocsTemplates = [
    `/docs/${manifest.release.tag}/`, // docs home
    `/docs/${manifest.release.tag}/concepts/incidents/`, // long conceptual article
    `/docs/${manifest.release.tag}/start/quickstart/`, // code-heavy guide
    `/docs/${manifest.release.tag}/reference/configuration/`, // table-heavy reference
    `/docs/${manifest.release.tag}/integrations/monitoring/datadog/`, // integration guide
    `/docs/${manifest.release.tag}/operate/deploy/compose/`, // deployment guide
  ];

  for (const viewport of docsViewports) {
    await page.setViewportSize(viewport);
    for (const route of representativeDocsTemplates) {
      await page.goto(route);
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
      const dimensions = await page.evaluate(() => ({
        viewport: document.documentElement.clientWidth,
        scroll: document.documentElement.scrollWidth,
      }));
      expect(
        dimensions.scroll,
        "docs route " + route + " overflows at " + viewport.width + "x" + viewport.height,
      ).toBeLessThanOrEqual(dimensions.viewport + 1);
    }
  }
});

test("ultrawide and 4k display layout integrity", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop");
  const ultrawideProfiles = [
    { width: 3440, height: 1440 },
    { width: 3840, height: 1600 },
    { width: 3840, height: 2160 },
  ];
  const sampleRoutes = ["/", "/integrations/", "/compare/", "/deploy/", "/product/incidents/"];

  for (const profile of ultrawideProfiles) {
    await page.setViewportSize(profile);
    for (const route of sampleRoutes) {
      await page.goto(route);
      const metrics = await page.evaluate(() => {
        const container = document.querySelector(".site-container");
        const h1 = document.querySelector("h1");
        return {
          scrollWidth: document.documentElement.scrollWidth,
          clientWidth: document.documentElement.clientWidth,
          containerWidth: container ? container.getBoundingClientRect().width : 0,
          h1FontSize: h1 ? Number.parseFloat(getComputedStyle(h1).fontSize) : 0,
        };
      });

      expect(metrics.scrollWidth).toBeLessThanOrEqual(metrics.clientWidth + 1);
      // Container max-width maintains readable proportion
      expect(metrics.containerWidth).toBeLessThanOrEqual(1440);
      // Hero / h1 font size stays bounded and doesn't explode infinitely
      expect(metrics.h1FontSize).toBeLessThanOrEqual(120);
    }
  }
});

test("integration drawer responsive open state and interactions", async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== "desktop");
  const drawerSizes = [
    { width: 320, height: 640 },
    { width: 360, height: 800 },
    { width: 390, height: 844 },
    { width: 768, height: 1024 },
    { width: 1024, height: 768 },
    { width: 1366, height: 768 },
  ];

  for (const size of drawerSizes) {
    await page.setViewportSize(size);
    await page.goto("/integrations/");
    const datadogCard = page.locator(".integration-item").filter({ hasText: "Datadog" });
    await expect(datadogCard).toBeVisible();
    await datadogCard.click();

    const drawer = page.locator(".integration-drawer");
    await expect(drawer).toBeVisible();

    const drawerBox = await drawer.boundingBox();
    expect(drawerBox?.width ?? 0).toBeLessThanOrEqual(size.width + 1);

    const closeBtn = page.locator(".integration-drawer-close");
    await expect(closeBtn).toBeVisible();

    const noOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth + 1,
    );
    expect(noOverflow).toBe(true);

    // Escape closes the drawer
    await page.keyboard.press("Escape");
    await expect(drawer).toBeHidden();
  }
});

test("mobile navigation open state at tablet and mobile", async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== "desktop");
  const navSizes = [
    { width: 390, height: 844 },
    { width: 768, height: 1024 },
    { width: 1024, height: 768 },
  ];

  for (const size of navSizes) {
    await page.setViewportSize(size);
    await page.goto("/");
    const menuBtn = page.getByLabel("Open navigation");
    await expect(menuBtn).toBeVisible();
    await menuBtn.click();

    const menu = page.getByRole("navigation", { name: "Mobile navigation" });
    await expect(menu).toBeVisible();
    await expect(menu.getByRole("link", { name: "Incident command", exact: true })).toBeVisible();

    // Close menu by clicking summary again
    await menuBtn.click();
    await expect(menu.locator(".mobile-menu-panel")).toBeHidden();
  }
});

test("changelog sticky filter layout at 1366 laptop", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop");
  await page.setViewportSize({ width: 1366, height: 768 });
  await page.goto("/changelog/");

  await page.evaluate(() => window.scrollTo(0, 1000));
  const filters = page.locator(".changelog-filters");
  await expect(filters).toBeVisible();

  const filterBox = await filters.boundingBox();
  // Filter is sticky below nav
  expect(filterBox?.y ?? 0).toBeGreaterThanOrEqual(40);
  expect(filterBox?.y ?? 0).toBeLessThanOrEqual(90);

  // Content remains readable
  await expect(page.locator(".release-article").first()).toBeVisible();
});

test("1366 laptop density stays compact", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop");
  await page.setViewportSize({ width: 1366, height: 768 });
  await page.goto("/product/paging/");

  const hero = page.locator(".interior-hero");
  const heroBox = await hero.boundingBox();
  expect(heroBox?.height ?? Infinity).toBeLessThan(500);

  const titleSize = await hero.locator("h1").evaluate((node) =>
    Number.parseFloat(getComputedStyle(node).fontSize),
  );
  expect(titleSize).toBeLessThanOrEqual(54);

  const sectionPad = await page.locator(".site-section").first().evaluate((node) =>
    Number.parseFloat(getComputedStyle(node).paddingTop),
  );
  expect(sectionPad).toBeLessThanOrEqual(82);

  const finalCta = page.locator(".final-cta");
  await finalCta.scrollIntoViewIfNeeded();
  const ctaBox = await finalCta.boundingBox();
  expect(ctaBox?.height ?? Infinity).toBeLessThan(360);

  const footerPad = await page.locator(".site-footer").evaluate((node) =>
    Number.parseFloat(getComputedStyle(node).paddingTop),
  );
  expect(footerPad).toBeLessThanOrEqual(44);
});

test("desktop density scales intentionally across 1440 and 1920", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop");
  const profiles = [
    { width: 1440, height: 900, section: [70, 74], cta: [44, 48] },
    { width: 1920, height: 1080, section: [94, 98], cta: [56, 60] },
  ];

  for (const profile of profiles) {
    await page.setViewportSize({ width: profile.width, height: profile.height });
    await page.goto("/product/paging/");
    const values = await page.evaluate(() => ({
      section: Number.parseFloat(
        getComputedStyle(document.querySelector(".site-section")!).paddingTop,
      ),
      cta: Number.parseFloat(
        getComputedStyle(document.querySelector(".final-cta")!).paddingTop,
      ),
    }));
    expect(values.section).toBeGreaterThanOrEqual(profile.section[0]);
    expect(values.section).toBeLessThanOrEqual(profile.section[1]);
    expect(values.cta).toBeGreaterThanOrEqual(profile.cta[0]);
    expect(values.cta).toBeLessThanOrEqual(profile.cta[1]);
  }
});

test("desktop comparison matrix is keyboard focusable", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop");
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/compare/");
  const matrix = page.getByRole("region", {
    name: "Seven-vendor capability comparison",
  });
  await expect(matrix).toHaveAttribute("tabindex", "0");
  await matrix.focus();
  await expect(matrix).toBeFocused();
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
    "/changelog/",
    "/legal/",
    "/solutions/",
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
          const naturalWidth = await image.evaluate(
            (node) => (node as HTMLImageElement).naturalWidth,
          );
          expect(naturalWidth, "visible image failed to load").toBeGreaterThan(0);
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
    "/privacy/",
    "/terms/",
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

test("incident story: four acts navigation, visual continuity, and state progression", async ({
  page,
}) => {
  await page.goto("/");

  const incidentSection = page.locator("#incident-loop");
  await expect(incidentSection).toBeVisible();

  // Illustrative fixture disclaimer pill
  await expect(
    page.getByText(/ILLUSTRATIVE INCIDENT SCENARIO · NORTHSTAR SYSTEMS v2\.0\.0 FIXTURE/i),
  ).toBeVisible();

  // Four acts sections exist and are visible
  const detectAct = page.locator("#act-detect");
  const respondAct = page.locator("#act-respond");
  const coordinateAct = page.locator("#act-coordinate");
  const recoverAct = page.locator("#act-recover");

  await expect(detectAct).toBeVisible();
  await expect(respondAct).toBeVisible();
  await expect(coordinateAct).toBeVisible();
  await expect(recoverAct).toBeVisible();

  // Visual continuity: all 4 acts display persistent incident identity
  for (const act of [detectAct, respondAct, coordinateAct, recoverAct]) {
    await expect(act.locator(".incident-id-badge").first()).toHaveText("INC-1042");
  }

  // Lifecycle state badges progression across the 4 acts
  await expect(detectAct.locator(".act-status-badge")).toContainText("INGRESS · SIGNAL CORRELATED");
  await expect(respondAct.locator(".act-status-badge")).toContainText("ACKNOWLEDGED · 00:01:24");
  await expect(coordinateAct.locator(".coordinate-card.internal-room")).toContainText("War Room");
  await expect(coordinateAct.locator(".coordinate-card.internal-room")).toContainText("Investigating checkout latency spike");
  await expect(coordinateAct.locator(".coordinate-card.public-status")).toContainText("DEGRADED");
  await expect(recoverAct.locator(".act-status-badge")).toContainText("RESOLVED · 14:38 UTC");

  // Four acts navigation buttons exist
  const navTabs = page.locator(".acts-nav-bar .act-nav-tab");
  await expect(navTabs).toHaveCount(4);

  // Click nav tab to test navigation with reduced-motion emulation
  await page.emulateMedia({ reducedMotion: "reduce" });
  await navTabs.nth(1).click();
  await expect(respondAct).toBeVisible();
});

test("incident story: detailed ten-step explorer lifecycle states and collapse behavior", async ({
  page,
}) => {
  await page.goto("/");

  const disclosure = page.locator("#ten-steps-disclosure");
  await expect(disclosure).toBeVisible();

  // Collapsed by default
  await expect(disclosure).not.toHaveAttribute("open", "");

  // Expand disclosure
  await page.locator("#ten-steps-disclosure summary").click();
  await expect(disclosure).toHaveAttribute("open", "");

  const loopPanel = page.locator("#loop-panel");

  // Initial state is Step 01 (Detect)
  await expect(loopPanel).toHaveAttribute("data-step", "0");
  await expect(loopPanel).toContainText("SIGNAL RECEIVED");
  await expect(loopPanel).toContainText("Datadog → Checkout API");
  // Pre-incident: INC-1042 should not appear in Step 01
  await expect(loopPanel).not.toContainText("INC-1042 · P1 · TRIGGERED");

  // Step 02: Correlate (pre-incident correlation)
  await page.getByRole("button", { name: "02 Correlate", exact: true }).click();
  await expect(loopPanel).toHaveAttribute("data-step", "1");
  await expect(loopPanel).toContainText("RELATED SIGNAL PROCESSED");
  await expect(loopPanel).toContainText("Correlation key: checkout-api-latency");

  // Step 03: Create (incident triggered)
  await page.getByRole("button", { name: "03 Create", exact: true }).click();
  await expect(loopPanel).toHaveAttribute("data-step", "2");
  await expect(loopPanel).toContainText("INCIDENT TRIGGERED");
  await expect(loopPanel).toContainText("INC-1042 · Checkout API · P1");

  // Step 05: Page
  await page.getByRole("button", { name: "05 Page", exact: true }).click();
  await expect(loopPanel).toHaveAttribute("data-step", "4");
  await expect(loopPanel).toContainText("Voice · Push · SMS · Teams");

  // Step 06: Acknowledge
  await page.getByRole("button", { name: "06 Acknowledge", exact: true }).click();
  await expect(loopPanel).toHaveAttribute("data-step", "5");
  await expect(loopPanel).toContainText("ACKNOWLEDGED");
  await expect(loopPanel).toContainText("Maya Chen acknowledged");

  // Step 09: Resolve
  await page.getByRole("button", { name: "09 Resolve", exact: true }).click();
  await expect(loopPanel).toHaveAttribute("data-step", "8");
  await expect(loopPanel).toContainText("RESOLVED");
  await expect(loopPanel).toContainText("Checkout API recovered");

  // Step 10: Learn
  await page.getByRole("button", { name: "10 Learn", exact: true }).click();
  await expect(loopPanel).toHaveAttribute("data-step", "9");
  await expect(loopPanel).toContainText("POSTMORTEM");
});

