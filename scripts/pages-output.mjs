import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";

const source = path.resolve("out");
const destination = path.resolve(".vercel/output/static");

if (!fs.existsSync(path.join(source, "index.html"))) {
  console.log("[pages] Static export missing; triggering build...");
  execSync("npm run build", { stdio: "inherit" });
}
fs.rmSync(destination, { recursive: true, force: true });
fs.mkdirSync(path.dirname(destination), { recursive: true });
fs.cpSync(source, destination, { recursive: true });
console.log(
  "[pages] Static files available at out/ and .vercel/output/static/ for the existing Cloudflare project",
);
