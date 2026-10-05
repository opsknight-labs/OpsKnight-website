import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { gzipSync, brotliCompressSync } from "node:zlib";
const root = path.resolve("out"),
  port = Number(process.env.PORT ?? 5003);
const mime = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "application/javascript",
  ".json": "application/json",
  ".txt": "text/plain",
  ".xml": "application/xml",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".webp": "image/webp",
  ".jpg": "image/jpeg",
  ".woff2": "font/woff2",
};
const cache = new Map();
http
  .createServer((request, response) => {
    let pathname;
    try {
      pathname = decodeURIComponent(
        new URL(request.url, "http://localhost").pathname,
      );
    } catch {
      response.writeHead(400).end();
      return;
    }
    // Match the exported Cloudflare rules; preview has no application backend.
    const rules = fs
      .readFileSync(path.join(root, "_redirects"), "utf8")
      .split("\n")
      .filter((line) => line && !line.startsWith("#"));
    for (const rule of rules) {
      const [source, target, code] = rule.trim().split(/\s+/);
      const names = [];
      const pattern = source
        .split(/(:[a-zA-Z0-9_]+|\*)/)
        .map((part) => {
          if (part === "*") {
            names.push("splat");
            return "(.*)";
          }
          if (part.startsWith(":")) {
            names.push(part.slice(1));
            return "([^/]+)";
          }
          return part.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        })
        .join("");
      const match = pathname.match(new RegExp(`^${pattern}$`));
      if (match && Number(code) >= 300) {
        let location = target;
        names.forEach((name, index) => {
          location = location.replaceAll(`:${name}`, match[index + 1]);
        });
        response
          .writeHead(Number(code), {
            Location:
              location + new URL(request.url, "http://localhost").search,
          })
          .end();
        return;
      }
    }
    let file = path.resolve(root, `.${pathname}`);
    if (!file.startsWith(root + path.sep) && file !== root) {
      response.writeHead(403).end();
      return;
    }
    let status = 200;
    if (fs.existsSync(file) && fs.statSync(file).isDirectory())
      file = path.join(file, "index.html");
    if (!fs.existsSync(file)) {
      status = 404;
      file = path.join(root, "404.html");
    }
    const ext = path.extname(file),
      type = mime[ext] ?? "application/octet-stream",
      modified = fs.statSync(file).mtimeMs;
    let entry = cache.get(file);
    if (!entry || entry.modified !== modified) {
      const plain = fs.readFileSync(file);
      entry = { modified, plain };
      if (/\.(html|css|js|json|txt|xml|svg)$/.test(file)) {
        entry.br = brotliCompressSync(plain);
        entry.gzip = gzipSync(plain);
      }
      cache.set(file, entry);
    }
    const accepted = request.headers["accept-encoding"] ?? "";
    let bytes = entry.plain;
    const headers = { "Content-Type": type, Vary: "Accept-Encoding" };
    if (entry.br && accepted.includes("br")) {
      bytes = entry.br;
      headers["Content-Encoding"] = "br";
    } else if (entry.gzip && accepted.includes("gzip")) {
      bytes = entry.gzip;
      headers["Content-Encoding"] = "gzip";
    }
    headers["Content-Length"] = bytes.length;
    response.writeHead(status, headers);
    response.end(request.method === "HEAD" ? undefined : bytes);
  })
  .listen(port, "127.0.0.1", () =>
    console.log(`Compressed static preview: http://localhost:${port}`),
  );
