import fs from "node:fs";

const thresholds = {
  performance: 0.9,
  accessibility: 0.95,
  "best-practices": 0.9,
  seo: 0.95,
};

const reports = process.argv.slice(2);
if (!reports.length) throw new Error("Pass Lighthouse JSON reports to check.");

const failures = [];
for (const reportPath of reports) {
  const report = JSON.parse(fs.readFileSync(reportPath, "utf8"));
  const scores = Object.fromEntries(
    Object.keys(thresholds).map((key) => [key, report.categories?.[key]?.score ?? 0]),
  );
  console.log(
    `[lighthouse] ${report.finalDisplayedUrl ?? report.finalUrl ?? reportPath}: ` +
      Object.entries(scores)
        .map(([key, score]) => `${key}=${Math.round(score * 100)}`)
        .join(" "),
  );
  for (const [key, minimum] of Object.entries(thresholds)) {
    if (scores[key] < minimum) {
      failures.push(
        `${reportPath}: ${key} ${Math.round(scores[key] * 100)} < ${Math.round(minimum * 100)}`,
      );
    }
  }
}
if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}
