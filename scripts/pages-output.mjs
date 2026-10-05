import fs from "node:fs";
import path from "node:path";
const source = path.resolve("out");
const destination = path.resolve(".vercel/output/static");
if (!fs.existsSync(path.join(source, "index.html")))
  throw Error("Static export missing; run the Next.js build first");
fs.rmSync(destination, { recursive: true, force: true });
fs.mkdirSync(path.dirname(destination), { recursive: true });
fs.cpSync(source, destination, { recursive: true });
console.log(
  "[pages] Static files available at out/ and .vercel/output/static/ for the existing Cloudflare project",
);
