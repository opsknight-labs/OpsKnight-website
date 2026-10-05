import fs from "node:fs";
import sharp from "sharp";
const { assets } = JSON.parse(
  fs.readFileSync("content/product/screenshots.json", "utf8"),
);
for (const [name, image] of Object.entries(assets)) {
  for (const width of [400, 800, 1200].filter((width) => width < image.width)) {
    await sharp(`public/product/${name}.webp`)
      .resize({ width })
      .webp({ quality: 82 })
      .toFile(`public/product/${name}-${width}.webp`);
  }
}
console.log("[product images] static responsive sizes generated");
