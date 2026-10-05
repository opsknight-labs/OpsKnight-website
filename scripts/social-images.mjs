import fs from "node:fs";
import sharp from "sharp";
const product = JSON.parse(
  fs.readFileSync("src/generated/product-manifest.json", "utf8"),
);
const esc = (s) =>
  s.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
const pages = [
  ["opsknight", "Incident operations", "you control."],
  ...product.platform.products.map((p) => [
    `product-${p.slug}`,
    p.label,
    "On infrastructure you own.",
  ]),
];
fs.mkdirSync("public/social", { recursive: true });
const logo = await sharp("public/logo.svg").resize(54, 54).png().toBuffer();
for (const [id, title, subtitle] of pages) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><rect width="1200" height="630" fill="#0B0F18"/><path d="M80 520H1120" stroke="#334155"/><circle cx="80" cy="210" r="6" fill="#D21A1B"/><text x="105" y="216" fill="#A6B1C2" font-family="Arial" font-size="15" letter-spacing="4">SELF-HOSTED INCIDENT OPERATIONS</text><text x="80" y="325" fill="white" font-family="Arial" font-size="65" font-weight="700">${esc(title)}</text><text x="80" y="405" fill="#CBD5E1" font-family="Arial" font-size="48" font-weight="600">${esc(subtitle)}</text><text x="150" y="113" fill="white" font-family="Arial" font-size="32" font-weight="700">OpsKnight</text><text x="80" y="565" fill="#A6B1C2" font-family="Arial" font-size="16">${product.release.tag} · ${product.release.license} · Self-hosted</text><text x="930" y="565" fill="#A6B1C2" font-family="Arial" font-size="16">opsknight.com</text></svg>`;
  await sharp(Buffer.from(svg))
    .composite([{ input: logo, left: 80, top: 70 }])
    .png()
    .toFile(`public/social/${id}.png`);
}
console.log(`[social] ${pages.length} static graphics generated`);
