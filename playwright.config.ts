import { defineConfig, devices } from "@playwright/test";
export default defineConfig({
  testDir: "./tests/browser",
  snapshotPathTemplate:
    "{testDir}/snapshots/{platform}/{projectName}/{arg}{ext}",
  fullyParallel: true,
  retries: process.env.CI ? 1 : 0,
  reporter: "list",
  use: {
    baseURL: process.env.PREVIEW_URL ?? "http://localhost:5001",
    trace: "retain-on-failure",
  },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"] } },
    {
      name: "mobile",
      use: { ...devices["iPhone 13"], defaultBrowserType: "chromium" },
    },
    {
      name: "laptop-1366",
      grep: /visual coverage for key pages/,
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 1366, height: 768 },
      },
    },
    {
      name: "laptop-1440",
      grep: /visual coverage for key pages/,
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 1440, height: 900 },
      },
    },
    {
      name: "desktop-1920",
      grep: /visual coverage for key pages/,
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 1920, height: 1080 },
      },
    },
  ],
});
