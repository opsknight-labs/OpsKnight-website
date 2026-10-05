# OpsKnight website

A product-led, self-hosted incident operations website built with Next.js, Manrope and JetBrains Mono. It exports static HTML, CSS, JavaScript and optimized product images for Cloudflare Pages.

```sh
npm ci
npm run dev
```

Open http://localhost:5001. `npm run build` validates the release contract and writes `out/`.

Cloudflare Pages: build command `npm run pages:build`, output directory `out`. No database, Docker service or Next.js server is required. Use `npm run preview` to inspect the exported site locally.

See [WEBSITE-3.0.md](WEBSITE-3.0.md) for source provenance, release updates, screenshot capture, testing, performance targets and deployment settings.
