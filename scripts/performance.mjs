import fs from "node:fs";
import lighthouse from "lighthouse";
import { launch } from "chrome-launcher";
import { chromium } from "@playwright/test";
const browser = await launch({
  chromePath: chromium.executablePath(),
  chromeFlags: ["--headless", "--no-sandbox", "--disable-dev-shm-usage"],
});
try {
  const result = await lighthouse(
    process.env.PREVIEW_URL ?? "http://localhost:5003/",
    {
      port: browser.port,
      output: ["json", "html"],
      onlyCategories: ["performance", "accessibility", "seo"],
      logLevel: "error",
    },
  );
  fs.mkdirSync("performance-reports", { recursive: true });
  fs.writeFileSync("performance-reports/report.json", result.report[0]);
  fs.writeFileSync("performance-reports/report.html", result.report[1]);
  const audits = result.lhr.audits;
  const metrics = {
    performance: result.lhr.categories.performance.score,
    accessibility: result.lhr.categories.accessibility.score,
    seo: result.lhr.categories.seo.score,
    LCP: audits["largest-contentful-paint"].numericValue,
    CLS: audits["cumulative-layout-shift"].numericValue,
    TBT: audits["total-blocking-time"].numericValue,
  };
  console.log(JSON.stringify(metrics, null, 2));
  if (metrics.LCP > 2500 || metrics.CLS > 0.1 || metrics.TBT > 200)
    process.exitCode = 1;
} finally {
  await browser.kill();
}
