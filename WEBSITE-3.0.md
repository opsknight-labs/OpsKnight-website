# OpsKnight Website 3.0

The site is a Next.js static export. Cloudflare Pages serves `out/`; no application server, database or runtime GitHub request is required.

## Development and verification

```sh
npm ci
npm run dev
# Preview: http://localhost:5001
npm run product:check
npm test
npm run lint
npm run build
npm run test:export
npx playwright install chromium
# Serve the export separately, then test it:
python3 -m http.server 5002 --directory out
PREVIEW_URL=http://localhost:5002 npm run test:browser
```

The contract tests deliberately reject release drift, stale integration counts, unsupported capabilities, missing docs, modified evidence and incorrect status/mobile/voice boundaries. The exported-link check validates every HTML page, local reference, marketing canonical and sitemap entry. Browser tests cover desktop/mobile navigation, filters, deployment recommendations, keyboard tabs, reduced motion, WCAG AA rules and snapshot baselines using Playwright `toHaveScreenshot()` visual-regression assertions.

`npm run test:visual:update` explicitly updates visual baselines. Review changed images before committing them. The portable Chromium baselines allow a small rasterization tolerance; CI retains screenshots and traces when a check fails.

## Release authority

`content/product/source/` contains evidence read from a tagged product release, with its immutable commit and SHA-256 hashes. The marketing contract sits alongside it. `src/generated/product-manifest.json` is deterministic generated output consumed by the site. Provider counts, accepted actions, authentication and signature modes come from the release catalog. Release date and highlights come from the product changelog.

CI verifies the snapshot against the upstream tag, then checks the contract and generated manifest. To verify offline against a local checkout:

```sh
npm run product:verify-source -- --repository ../opsknight
```

For a future release:

```sh
npm run product:sync -- /path/to/OpsKnight vX.Y.Z
# Copy the release's approved, versioned docs tree and assets.
# Review release.json, boundaries and all curated marketing claims.
npm run product:generate
npm run social:generate
npm run build
npm run test:export
```

The sync command reads the tag, never `main`. It refuses a tag whose own `versions.json` does not identify it as the current release. Missing docs, capability evidence or stale generated output block the build. Historical docs remain available and versioned. Marketing links point directly to the current release's exported pages, and Cloudflare's `/docs/latest/` redirects preserve bookmarks; valid historical README references resolve to their version's directory page, while references to unavailable historical articles remain readable text.

## Product visuals

The screenshots are static WebP assets captured from a separate local Docker Compose demo of the actual v2.0.0 release. The demo lives outside this website, in `../opsknight-marketing-demo/`, and has its own database. Neither Compose nor PostgreSQL is used by the website build, CI or Cloudflare deployment. The checkout scenario uses Anika Rao, Rohan Mehta and Sofia Reyes. The public status screenshot is captured anonymously from `/status/aster-cloud`, not the settings screen. Teams imagery retains certified collaboration evidence. Hashes, dimensions and source routes are recorded in `content/product/screenshots.json` and validated at build time.

`scripts/capture-product.mjs` is an optional local asset-authoring tool. It is never run by the production build. Existing images ship in `public/product/`, so a clean build requires no running demo.

## Deployment and rollout

Cloudflare Pages settings:

- Build command: `npm run build`
- Output directory: `out`
- Node.js: 22

`npm run pages:build` also retains `out/`, matching Cloudflare's static output convention. The CI workflow uploads the static site and browser evidence as artifacts. Existing versioned docs URLs, legal routes and old comparison slugs remain available. Current comparison canonicals use `/compare/incident-io/` and `/compare/grafana/`.

Publish a preview deployment and review homepage/mobile/navigation, product pages, catalog, install, security, comparison and docs before promoting it. A Cloudflare production deployment has not been performed by this local rebuild.

## Performance

Manrope and JetBrains Mono are self-hosted by Next's font build. Product images are WebP with explicit source dimensions, lazy loading below the fold and a prioritized hero image. Search loads only when requested. The workflow, deployment chooser and architecture tabs use small local client components, with no scroll trapping or large video download. Reduced motion keeps every section and interaction usable.

Field targets remain LCP <2.5 seconds, CLS <0.1 and INP <200ms. Local Lighthouse results are lab evidence, not a claim about production field performance. Measure the Cloudflare preview before rollout and monitor real-user vitals after launch.

Verification on October 7, 2026: static build passed with 872 static routes rendered; 27 contract and content parity tests passed; 43 Playwright browser tests passed across desktop, mobile, and responsive viewport projects with `expect(page).toHaveScreenshot()` visual regression assertions. The export checker validated 865 HTML pages and 54,183 local references. 100% WCAG AA contrast compliance across all 14 marketing flows. No production deployment was performed.
