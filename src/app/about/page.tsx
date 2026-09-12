import { Metadata } from "next";
import Link from "next/link";
import { BRAND } from "@/lib/brand";
import { PageToc } from "@/components/common/PageToc";
import { latestDocsHref } from "@/lib/docs/paths";

export const metadata: Metadata = {
  title: "About OpsKnight",
  description:
    "OpsKnight is self-hosted incident command. Other product names identify those products. Not affiliated with PagerDuty or Atlassian.",
};

const TOC_SECTIONS = [
  { id: "overview", title: "Overview" },
  { id: "who-it-is-for", title: "Who it is for" },
  { id: "who-it-is-not-for", title: "Who it is not for" },
  { id: "mission", title: "Mission" },
  { id: "license", title: "License & Open Source" },
  { id: "maintainer", title: "Maintainer & Contact" },
];

const ABOUT_SPECS = [
  { label: "Stable License", value: BRAND.license },
  { label: "Next Major", value: BRAND.developmentLicense },
  { label: "Current Version", value: BRAND.version },
  { label: "Deployment", value: "100% Self-Hosted" },
  { label: "Supported Ingests", value: BRAND.integrationCountLabel },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#f8fafc]">
      <section className="border-b border-slate-200 pt-28 pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="mb-3 font-mono text-[11px] font-medium tracking-wide text-slate-500">
              About · {BRAND.version} · {BRAND.license}
            </p>
            <h1 className="text-3xl font-semibold tracking-tight text-[#111827] sm:text-5xl sm:leading-[1.12]">
              About {BRAND.name}
            </h1>
            <p className="mt-5 text-base leading-relaxed text-[#4b5563] sm:text-lg">
              OpsKnight is a self-hosted incident command center and on-call platform. It exists because per-seat on-call SaaS gets prohibitively expensive as engineering teams scale, and because incident data belongs on the infrastructure you operate.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_18rem] xl:grid-cols-[minmax(0,1fr)_20rem]">
            <article className="min-w-0 space-y-10 max-w-3xl text-sm leading-relaxed text-[#4b5563]">
              <div id="overview" className="scroll-mt-28 space-y-4">
                <p>
                  OpsKnight provides end-to-end alerting, paging, escalation policies, Slack ChatOps war rooms, public status pages, and postmortem incident timelines without third-party vendor lock-in.
                </p>
                <p>
                  OpsKnight is purpose-built self-hosted incident command. It is not a clone of anyone else’s proprietary cloud product.
                </p>
              </div>

              <div id="who-it-is-for" className="scroll-mt-28 border-t border-slate-200 pt-10">
                <h2 className="text-xl font-semibold text-[#111827]">Who it is for</h2>
                <p className="mt-3">
                  SRE, DevOps, and platform teams that already run Postgres, Docker, or Kubernetes. Teams with strict compliance requirements (HIPAA, SOC 2, GDPR, Financial) that cannot place real-time incident timelines and architecture metadata in a multi-tenant vendor cloud.
                </p>
                <p className="mt-2">
                  Teams that would rather operate a resilient on-call pager than meter developer seats. Includes {BRAND.integrationCountLabel} inbound parsers, Slack war room bots, status pages, local accounts, and OIDC enterprise SSO.
                </p>
              </div>

              <div id="who-it-is-not-for" className="scroll-mt-28 border-t border-slate-200 pt-10">
                <h2 className="text-xl font-semibold text-[#111827]">Who it is not for</h2>
                <p className="mt-3">
                  Anyone who needs a hosted SaaS cloud, native voice phone calls, or SAML in this release (local accounts and OIDC single sign-on are supported).
                </p>
                <p className="mt-2">
                  Anyone looking for a PagerDuty or Opsgenie clone — our Events API v2 is an inbound ingest adapter designed to make migration seamless. Change your webhook destination URL and test immediately.
                </p>
              </div>

              <div id="mission" className="scroll-mt-28 border-t border-slate-200 pt-10">
                <h2 className="text-xl font-semibold text-[#111827]">Mission</h2>
                <p className="mt-3">
                  Make modern on-call, paging, war rooms, status pages, and postmortems freely available to engineering teams that can run Docker Compose or Helm while keeping Community software and its licensing transparent.
                </p>
              </div>

              <div id="license" className="scroll-mt-28 border-t border-slate-200 pt-10">
                <h2 className="text-xl font-semibold text-[#111827]">License &amp; Open Source</h2>
                <p className="mt-3">
                  The published v{BRAND.version} release remains licensed under {BRAND.license}. The current development line for the next major Community release is intended to ship under {BRAND.developmentLicense}. Source code for the Community application is openly available on GitHub.
                </p>
                <p className="mt-2">
                  If OpsKnight introduces separately licensed Enterprise modules, hosted services, support, or other commercial offerings, they will be identified separately rather than silently changing the license of already published Community artifacts. See the{" "}
                  <a
                    href={BRAND.links.licenseTransition}
                    className="text-[#d21a1b] font-medium hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    license transition notice
                  </a>{" "}
                  for the exact boundary.
                </p>
              </div>

              <div id="maintainer" className="scroll-mt-28 border-t border-slate-200 pt-10">
                <h2 className="text-xl font-semibold text-[#111827]">Maintainer &amp; Contact</h2>
                <p className="mt-3">
                  Created and maintained by{" "}
                  <a
                    href={BRAND.authors[0].url}
                    className="font-medium text-[#111827] underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {BRAND.authors[0].name}
                  </a>
                  . For security disclosures, press, or partnership inquiries:{" "}
                  <a href={`mailto:${BRAND.links.email}`} className="text-[#d21a1b] font-medium hover:underline">
                    {BRAND.links.email}
                  </a>
                  .
                </p>
              </div>

              <div className="mt-12 flex flex-wrap gap-3 pt-4 border-t border-slate-200">
                <a
                  href={BRAND.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-10 items-center rounded-[12px] bg-[#d21a1b] px-5 text-sm font-semibold text-white hover:bg-[#b41516]"
                >
                  GitHub Repository
                </a>
                <Link
                  href="/install"
                  className="inline-flex h-10 items-center rounded-[12px] border border-slate-200 bg-white px-5 text-sm font-medium text-slate-800 hover:bg-slate-50"
                >
                  Install OpsKnight
                </Link>
                <Link
                  href="/security"
                  className="inline-flex h-10 items-center rounded-[12px] border border-slate-200 bg-white px-5 text-sm font-medium text-slate-800 hover:bg-slate-50"
                >
                  Security Architecture
                </Link>
              </div>
            </article>

            <aside className="hidden lg:block">
              <div className="sticky top-24 pl-4 border-l border-slate-200/80">
                <PageToc
                  sections={TOC_SECTIONS}
                  specs={ABOUT_SPECS}
                  docLink={latestDocsHref("getting-started")}
                  docLinkLabel="Getting Started Docs"
                />
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}
