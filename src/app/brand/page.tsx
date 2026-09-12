import type { Metadata } from "next";
import Image from "next/image";
import { BRAND, BRAND_COLORS } from "@/lib/brand";
import { PageToc } from "@/components/common/PageToc";
import { CopyBlock } from "@/components/brand/CopyBlock";

const title = "Brand";
const description =
  "OpsKnight logo, colors, and how to write about the product. Not affiliated with PagerDuty or other tools we ingest from.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/brand" },
  openGraph: { title, description, url: "/brand" },
};

const swatches: { name: string; hex: string; use: string }[] = [
  { name: "Chrome", hex: BRAND_COLORS.chrome, use: "Night surfaces: nav, footer, command chrome" },
  { name: "Canvas", hex: BRAND_COLORS.canvas, use: "Page background" },
  { name: "Ink", hex: BRAND_COLORS.ink, use: "Headings and body on canvas" },
  { name: "Shield", hex: BRAND_COLORS.accent, use: "Buttons, links, and live signal — from the logo" },
  { name: "Clear", hex: BRAND_COLORS.success, use: "Resolved / healthy" },
  { name: "Severity", hex: BRAND_COLORS.error, use: "Error and critical only" },
];

const TOC_SECTIONS = [
  { id: "logo", title: "Logo & Mark" },
  { id: "color", title: "Color System" },
  { id: "writing", title: "Writing About OpsKnight" },
  { id: "assets", title: "Download Brand Assets" },
];

const BRAND_SPECS = [
  { label: "Shield Red", value: "#d21a1b" },
  { label: "Night Chrome", value: "#0f172a" },
  { label: "Canvas", value: "#f8fafc" },
  { label: "Stable Software", value: BRAND.license },
  { label: "Next Major", value: BRAND.developmentLicense },
  { label: "Version", value: BRAND.version },
];

export default function BrandPage() {
  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <section className="border-b border-slate-200 bg-[#0f172a] pt-28 pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="mb-6">
              <Image
                src={BRAND.assets.logo}
                alt={BRAND.name}
                width={48}
                height={48}
                sizes="48px"
                className="h-12 w-12 object-contain"
              />
            </div>
            <p className="mb-3 font-mono text-[11px] font-medium tracking-wide text-slate-400">
              Brand · {BRAND.version}
            </p>
            <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-5xl">
              Night chrome. Shield red.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
              Use the OpsKnight logo as shipped. Do not replace it with a new mark.
              The shield red is for actions, not the whole page.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_18rem] xl:grid-cols-[minmax(0,1fr)_20rem]">
            <article className="min-w-0 space-y-14 max-w-3xl">
              <div id="logo" className="scroll-mt-28">
                <h2 className="text-xl font-semibold text-[#111827]">Logo</h2>
                <p className="mt-3 text-[#4b5563]">
                  The mark is <span className="font-mono text-sm">logo-mark.png</span>{" "}
                  / <span className="font-mono text-sm">logo.svg</span>. Do not
                  stretch, recolor, or substitute it.
                </p>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="flex items-center gap-4 rounded-[14px] border border-slate-800 bg-[#0f172a] p-6">
                    <Image
                      src={BRAND.assets.logo}
                      alt=""
                      width={40}
                      height={40}
                      sizes="40px"
                      className="h-10 w-10 object-contain"
                    />
                    <div>
                      <p className="text-sm font-medium text-white">On chrome</p>
                      <a href={BRAND.assets.logo} download className="text-xs text-slate-400 hover:text-white">
                        Download logo-mark.png
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 rounded-[14px] border border-slate-200 bg-white p-6">
                    <Image
                      src={BRAND.assets.logoSvg}
                      alt=""
                      width={40}
                      height={40}
                      sizes="40px"
                      className="h-10 w-10 object-contain"
                    />
                    <div>
                      <p className="text-sm font-medium text-[#111827]">On canvas</p>
                      <a href={BRAND.assets.logoSvg} download className="text-xs text-slate-500 hover:text-[#111827]">
                        Download logo.svg
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div id="color" className="scroll-mt-28 border-t border-slate-200 pt-10">
                <h2 className="text-xl font-semibold text-[#111827]">Color System</h2>
                <p className="mt-3 text-sm text-[#4b5563]">
                  OpsKnight uses high-contrast night chrome surfaces, warm light canvas backgrounds, and tactical shield red for active signals:
                </p>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {swatches.map((s) => (
                    <div key={s.name} className="flex overflow-hidden rounded-[12px] border border-slate-200 bg-white shadow-sm">
                      <div className="w-16 shrink-0" style={{ background: s.hex }} />
                      <div className="p-3">
                        <p className="font-mono text-xs font-semibold text-[#111827]">{s.name}</p>
                        <p className="font-mono text-[11px] text-slate-500">{s.hex}</p>
                        <p className="mt-1 text-xs text-[#4b5563]">{s.use}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div id="writing" className="scroll-mt-28 border-t border-slate-200 pt-10">
                <h2 className="text-xl font-semibold text-[#111827]">Writing about the product</h2>
                <div className="mt-6 space-y-4 text-sm text-[#4b5563]">
                  <div className="rounded-[12px] border border-slate-200 bg-white p-4">
                    <p className="font-mono text-xs font-semibold text-[#059669]">Do</p>
                    <p className="mt-1">
                      &ldquo;OpsKnight is a self-hosted incident command center and on-call platform.&rdquo;
                    </p>
                  </div>
                  <div className="rounded-[12px] border border-slate-200 bg-white p-4">
                    <p className="font-mono text-xs font-semibold text-[#d21a1b]">Don&apos;t</p>
                    <p className="mt-1">
                      &ldquo;OpsKnight is an open-source PagerDuty clone.&rdquo; — We ingest from PagerDuty-compatible webhooks; we are not PagerDuty and are not affiliated with them.
                    </p>
                  </div>
                </div>
              </div>

              <div id="assets" className="scroll-mt-28 border-t border-slate-200 pt-10">
                <h2 className="text-xl font-semibold text-[#111827]">Download Brand Assets</h2>
                <p className="mt-3 text-sm text-[#4b5563]">
                  Software and brand rights are separate. The published v{BRAND.version}
                  software release remains {BRAND.license}; the next major Community
                  development line is intended to use {BRAND.developmentLicense}. Neither
                  software license grants permission to present a fork, derivative product,
                  or hosted service as the official OpsKnight product. See the{" "}
                  <a
                    href={BRAND.links.trademarks}
                    className="text-[#d21a1b] hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    trademark policy
                  </a>{" "}
                  for details.
                </p>
                <div className="mt-4">
                  <CopyBlock
                    label="curl"
                    value={`curl -O https://opsknight.com/assets/logo.svg
curl -O https://opsknight.com/assets/logo-mark.png`}
                  />
                </div>
              </div>
            </article>

            <aside className="hidden lg:block">
              <div className="sticky top-24 pl-4 border-l border-slate-200/80">
                <PageToc
                  sections={TOC_SECTIONS}
                  specs={BRAND_SPECS}
                  quickCommand="curl -O https://opsknight.com/assets/logo.svg"
                  quickCommandLabel="Download SVG"
                  docLink={BRAND.links.github}
                  docLinkLabel="GitHub Repository"
                />
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
