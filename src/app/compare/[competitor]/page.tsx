import { BreadcrumbSchema } from "@/components/site/BreadcrumbSchema";
import { siteMetadata } from "@/lib/site-metadata";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import comparisons from "@/../content/product/comparisons.json";
import { PRODUCT } from "@/lib/product";
import { BRAND } from "@/lib/brand";
import { Action, FinalCTA, TextLink } from "@/components/site/Primitives";
import {
  COMPARE_SECTIONS,
  COMPARE_SOURCE_LINKS,
  compareRowVerifiedAt,
  type CompareCell,
  type CompareVendorId,
} from "@/lib/compare-matrix";
import { PagerDutyMigrationHelper } from "@/components/comparison/PagerDutyMigrationHelper";
import { OpsgenieMigrationHelper } from "@/components/comparison/OpsgenieMigrationHelper";
import { GrafanaMigrationHelper } from "@/components/comparison/GrafanaMigrationHelper";
import { Check, Minus, ExternalLink, ShieldCheck, ArrowLeft } from "lucide-react";

const aliases: Record<string, string> = {
  incidentio: "incident-io",
  "grafana-oncall": "grafana",
  victorops: "splunk",
};

const vendorIdMap: Record<string, CompareVendorId> = {
  pagerduty: "pagerduty",
  "incident-io": "incidentio",
  incidentio: "incidentio",
  opsgenie: "opsgenie",
  grafana: "grafana",
  "grafana-oncall": "grafana",
  squadcast: "squadcast",
  splunk: "splunk",
  victorops: "splunk",
};

const find = (s: string) => comparisons.find((c) => c.slug === (aliases[s] ?? s));

export function generateStaticParams() {
  return [
    ...comparisons.map((c) => ({ competitor: c.slug })),
    ...Object.keys(aliases).map((competitor) => ({ competitor })),
  ];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ competitor: string }>;
}): Promise<Metadata> {
  const { competitor } = await params;
  const c = find(competitor);
  const name = c?.name ?? competitor;
  return siteMetadata({
    title: `OpsKnight vs ${name} — Self-Hosted Alternative & Feature Comparison`,
    description: `Detailed technical comparison of OpsKnight and ${name} for self-hosted incident management, on-call scheduling, and alert routing. Evaluated against v2.0.0 capabilities and verified vendor sources.`,
    alternates: { canonical: `/compare/${c?.slug ?? competitor}/` },
    openGraph: { url: `/compare/${c?.slug ?? competitor}/` },
  });
}

type CompetitorPerspective = {
  different: { title: string; desc: string }[];
  stronger: { title: string; desc: string }[];
};

const COMPETITOR_PERSPECTIVES: Record<string, CompetitorPerspective> = {
  pagerduty: {
    different: [
      { title: "Self-hosted deployment", desc: "OpsKnight runs on infrastructure you operate; PagerDuty is a managed SaaS product." },
      { title: "Open-source release", desc: "OpsKnight v2.0.0 is published under AGPL-3.0-only, so the application code can be inspected and modified under that license." },
      { title: "Deployment data custody", desc: "With OpsKnight, the application database, backups and network boundary remain part of your own operating model." },
      { title: "Bring-your-own notification providers", desc: "OpsKnight connects to configured providers such as Twilio rather than bundling a PagerDuty-managed delivery service." },
    ],
    stronger: [
      { title: "Managed operations", desc: "PagerDuty operates the service, so customers do not maintain the application runtime or its PostgreSQL database." },
      { title: "Native mobile applications", desc: "PagerDuty publishes native iOS and Android applications; OpsKnight v2.0.0 uses an installable PWA." },
      { title: "Broader commercial integration ecosystem", desc: "PagerDuty publishes a large vendor-maintained integration directory; confirm the exact integration you need in its current catalog." },
      { title: "Established commercial packaging", desc: "PagerDuty offers paid plans and add-ons with vendor-operated support. Feature availability depends on the selected plan." },
    ],
  },
  "incident-io": {
    different: [
      { title: "Self-hosted control", desc: "OpsKnight is operated inside infrastructure you control rather than as a vendor-hosted incident SaaS." },
      { title: "Open-source release", desc: "OpsKnight v2.0.0 is AGPL-3.0-only and can be inspected directly before adoption." },
      { title: "Data-location choice", desc: "OpsKnight incident, responder and postmortem data lives in the database and network boundary you operate." },
      { title: "Integrated deployment model", desc: "On-call, incident response, status pages and the operational control plane ship as one self-hosted release." },
    ],
    stronger: [
      { title: "Managed SaaS convenience", desc: "incident.io operates the hosted service, eliminating self-hosted application and database operations." },
      { title: "Collaboration-first product experience", desc: "incident.io documents deep Slack and Microsoft Teams workflows as part of its incident response product." },
      { title: "Native mobile applications", desc: "incident.io provides native mobile applications for on-call response; OpsKnight v2.0.0 uses a PWA." },
      { title: "Commercial plan packaging", desc: "incident.io packages response, on-call and enterprise capabilities into paid plans; check current pricing for the exact feature boundary." },
    ],
  },
  opsgenie: {
    different: [
      { title: "Active self-hosted release", desc: "OpsKnight v2.0.0 is a current self-hosted release, while Atlassian has announced the standalone Opsgenie end-of-support date." },
      { title: "No vendor shutdown dependency", desc: "A published OpsKnight release remains runnable under its license even if the project or commercial services later change." },
      { title: "Open-source code and schema", desc: "The OpsKnight application and database migrations are inspectable under AGPL-3.0-only." },
      { title: "Integrated customer status surface", desc: "OpsKnight v2.0.0 includes one supported public/private status page per installation rather than requiring a separate Atlassian Statuspage product." },
    ],
    stronger: [
      { title: "Existing Atlassian migration path", desc: "Atlassian publishes an official path for existing Opsgenie customers moving capabilities into Jira Service Management." },
      { title: "Managed service through the announced window", desc: "Existing Opsgenie customers continue to use an Atlassian-operated service through the published support period." },
      { title: "Atlassian ecosystem familiarity", desc: "Teams already standardized on Jira and related Atlassian workflows may prefer the vendor-supported migration path." },
      { title: "Native mobile applications", desc: "Opsgenie has native mobile applications; OpsKnight v2.0.0 uses an installable PWA." },
    ],
  },
  grafana: {
    different: [
      { title: "Active self-hosted incident codebase", desc: "OpsKnight v2.0.0 is a current AGPL-3.0-only self-hosted release; Grafana documents the OSS OnCall repository as archived." },
      { title: "Standalone incident platform", desc: "OpsKnight does not require Grafana Cloud or a Grafana observability stack to provide on-call and incident workflows." },
      { title: "Customer status page included", desc: "OpsKnight v2.0.0 includes one supported public/private status page in the same installation." },
      { title: "PostgreSQL-centered operations", desc: "OpsKnight publishes Docker/Compose and Kubernetes deployment paths around its documented PostgreSQL runtime." },
    ],
    stronger: [
      { title: "Grafana Cloud integration", desc: "Grafana Cloud IRM is operated alongside Grafana's hosted observability products and alerting workflows." },
      { title: "Observability context", desc: "Organizations already using Grafana Cloud can keep dashboards, alerts and incident response inside the same vendor ecosystem." },
      { title: "Managed cloud operations", desc: "Grafana operates Cloud IRM, avoiding self-hosted incident-platform maintenance." },
      { title: "Native mobile application", desc: "Grafana documents a mobile application for IRM; OpsKnight v2.0.0 uses an installable PWA." },
    ],
  },
  squadcast: {
    different: [
      { title: "Self-hosted application", desc: "OpsKnight runs on infrastructure you operate; SolarWinds Incident Response / Squadcast is sold as a managed service." },
      { title: "Open-source release", desc: "OpsKnight v2.0.0 is published under AGPL-3.0-only." },
      { title: "Deployment data custody", desc: "OpsKnight keeps the application database and incident history within the infrastructure boundary you choose." },
      { title: "Bring-your-own provider model", desc: "OpsKnight uses configured notification providers, allowing the operator to own those provider accounts and costs." },
    ],
    stronger: [
      { title: "Managed SaaS operations", desc: "SolarWinds operates the service, so customers do not maintain the incident-platform runtime." },
      { title: "Native mobile applications", desc: "The commercial service documents mobile applications; OpsKnight v2.0.0 uses an installable PWA." },
      { title: "Commercial packaging", desc: "Schedules, escalations and notification capabilities are packaged into vendor plans; verify exact limits on the current pricing page." },
      { title: "Vendor-operated onboarding", desc: "A managed product can be adopted without provisioning the self-hosted application and database infrastructure OpsKnight requires." },
    ],
  },
  splunk: {
    different: [
      { title: "Self-hosted deployment", desc: "OpsKnight runs in infrastructure you operate rather than as Splunk On-Call's vendor-managed service." },
      { title: "Open-source release", desc: "OpsKnight v2.0.0 is AGPL-3.0-only and can be inspected directly." },
      { title: "Application data custody", desc: "OpsKnight incident and paging records live in the PostgreSQL deployment and network boundary you control." },
      { title: "Independent product stack", desc: "OpsKnight does not require Splunk Enterprise or Splunk Observability to provide on-call and incident response." },
    ],
    stronger: [
      { title: "Splunk ecosystem integration", desc: "Organizations already using Splunk can keep on-call response close to their existing Splunk products and operational workflows." },
      { title: "Managed service operations", desc: "Splunk operates the service, avoiding self-hosted application and database maintenance." },
      { title: "Native mobile applications", desc: "Splunk documents iOS and Android applications; OpsKnight v2.0.0 uses an installable PWA." },
      { title: "Established commercial support model", desc: "Splunk sells the product as a commercial service; confirm current support and packaging terms directly with the vendor." },
    ],
  },
};

function Cell({ value, highlight }: { value: CompareCell; highlight?: boolean }) {
  if (value === true) {
    return (
      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-red-50 text-[#d21a1b]">
        <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
      </span>
    );
  }
  if (value === false) {
    return (
      <span className="inline-flex h-6 w-6 items-center justify-center text-slate-300">
        <Minus className="h-3.5 w-3.5" />
      </span>
    );
  }
  return (
    <span
      className={`text-xs leading-snug ${highlight ? "font-medium text-slate-900" : "text-slate-600"}`}
    >
      {value}
    </span>
  );
}

export default async function CompareCompetitorPage({
  params,
}: {
  params: Promise<{ competitor: string }>;
}) {
  const { competitor } = await params;
  const c = find(competitor);
  if (!c) notFound();

  const vendorKey = vendorIdMap[c.slug] ?? (c.slug as CompareVendorId);
  const perspective = COMPETITOR_PERSPECTIVES[c.slug] || COMPETITOR_PERSPECTIVES.pagerduty;

  return (
    <div className="site-page site-page--compare site-page--compare-detail">
      <BreadcrumbSchema name={c.name} path={`/compare/${c.slug}/`} />

      {/* Hero Section */}
      <section className="interior-hero site-dark">
        <div className="site-container">
          <div className="mb-4">
            <Link
              href="/compare/"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-white transition-colors"
            >
              <ArrowLeft size={14} /> Back to all comparisons
            </Link>
          </div>
          <p className="site-eyebrow">
            <span className="signal-dot" /> ARCHITECTURAL COMPARISON / VERIFIED {c.asOf}
          </p>
          <h1>
            OpsKnight and
            <br />
            {c.name}.
          </h1>
          <p className="site-description">{c.focus}</p>
          <div className="site-actions">
            <Action href="/deploy/">Evaluate OpsKnight {PRODUCT.release.tag}</Action>
            <Action href="/compare/" secondary>
              View full 7-vendor matrix
            </Action>
          </div>
        </div>
      </section>

      {/* Core Positioning & Vendor Summary */}
      <section className="site-section">
        <div className="site-container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-[16px] border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-base font-bold uppercase tracking-wider text-slate-500 mb-2">
                Vendor Context
              </h2>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{c.name}</h3>
              <p className="text-sm leading-relaxed text-slate-600 mb-4">{c.summary}</p>
              <p className="text-[11px] font-mono text-slate-500 mb-4">
                Verified {c.asOf} · primary vendor source
              </p>
              <TextLink href={c.source}>
                {c.sourceLabel} <ExternalLink size={13} className="inline ml-1" />
              </TextLink>
            </div>

            <div className="rounded-[16px] border border-red-100 bg-red-50/40 p-6 shadow-sm">
              <h2 className="text-base font-bold uppercase tracking-wider text-[#d21a1b] mb-2">
                The OpsKnight Model
              </h2>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Self-hosted operating model ({BRAND.license})
              </h3>
              <p className="text-sm leading-relaxed text-slate-600 mb-4">
                OpsKnight {PRODUCT.release.tag} is self-hosted under {PRODUCT.release.license}.
                You operate the application, database, backups and network boundary. Optional
                commercial support and implementation services do not gate product features.
              </p>
              <div className="flex items-center gap-3">
                <TextLink href="/deploy/">View install topologies</TextLink>
                <span className="text-slate-300">•</span>
                <TextLink href="/support/">Support & services</TextLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Where OpsKnight is Intentionally Different & Where Competitor May Be Stronger */}
      <section className="site-section bg-slate-50/70 border-y border-slate-200">
        <div className="site-container space-y-12">
          <div>
            <div className="max-w-2xl mb-8">
              <span className="text-xs font-bold uppercase tracking-wider text-[#d21a1b]">
                Key Architectural Differences
              </span>
              <h2 className="text-2xl font-bold text-slate-900 mt-1">
                Where OpsKnight is intentionally different.
              </h2>
              <p className="text-sm text-slate-600 mt-2">
                The comparison focuses on deployment ownership, data custody, release inspectability
                and the operational trade-offs of a self-hosted model.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {perspective.different.map((item) => (
                <div
                  key={item.title}
                  className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm hover:border-slate-300 transition-all"
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 rounded-full bg-red-100 p-1 text-[#d21a1b]">
                      <ShieldCheck size={16} />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-slate-900">{item.title}</h4>
                      <p className="mt-1 text-xs leading-relaxed text-slate-600">{item.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="max-w-2xl mb-8">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Fair & Objective Assessment
              </span>
              <h2 className="text-2xl font-bold text-slate-900 mt-1">
                Where {c.name} may be stronger.
              </h2>
              <p className="text-sm text-slate-600 mt-2">
                Every software architecture requires trade-offs. Here is where {c.name} may be
                better suited depending on your team&apos;s constraints and procurement model.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {perspective.stronger.map((item) => (
                <div
                  key={item.title}
                  className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm hover:border-slate-300 transition-all"
                >
                  <h4 className="text-base font-bold text-slate-800">{item.title}</h4>
                  <p className="mt-1 text-xs leading-relaxed text-slate-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Migration Helper (PagerDuty, Opsgenie, Grafana) */}
      {c.slug === "pagerduty" && (
        <section className="site-section">
          <div className="site-container">
            <div className="max-w-2xl mb-8">
              <span className="text-xs font-bold uppercase tracking-wider text-[#d21a1b]">
                Migration Accelerator
              </span>
              <h2 className="text-2xl font-bold text-slate-900 mt-1">
                Migrating from PagerDuty to OpsKnight
              </h2>
              <p className="text-sm text-slate-600 mt-2">
                OpsKnight exposes a PagerDuty Events API v2-compatible ingest path. Repoint a pilot sender,
                verify routing-key handling plus trigger/acknowledge/resolve behavior in staging,
                then migrate production senders deliberately.
              </p>
            </div>
            <PagerDutyMigrationHelper />
          </div>
        </section>
      )}

      {c.slug === "opsgenie" && (
        <section className="site-section">
          <div className="site-container">
            <div className="max-w-2xl mb-8">
              <span className="text-xs font-bold uppercase tracking-wider text-[#d21a1b]">
                Migration Accelerator
              </span>
              <h2 className="text-2xl font-bold text-slate-900 mt-1">
                Transitioning from Sunset Opsgenie
              </h2>
              <p className="text-sm text-slate-600 mt-2">
                With standalone Opsgenie support concluding April 5, 2027, map alert routes, schedules,
                escalation policies and responder contacts into OpsKnight, then validate paging
                behavior before changing production integrations.
              </p>
            </div>
            <OpsgenieMigrationHelper />
          </div>
        </section>
      )}

      {c.slug === "grafana" && (
        <section className="site-section">
          <div className="site-container">
            <div className="max-w-2xl mb-8">
              <span className="text-xs font-bold uppercase tracking-wider text-[#d21a1b]">
                Migration Accelerator
              </span>
              <h2 className="text-2xl font-bold text-slate-900 mt-1">
                Moving from Archived Grafana OnCall OSS
              </h2>
              <p className="text-sm text-slate-600 mt-2">
                Evaluate OpsKnight as a self-hosted destination for Grafana alerting, then validate the
                supported webhook lifecycle and responder workflow before migrating production routes.
              </p>
            </div>
            <GrafanaMigrationHelper />
          </div>
        </section>
      )}

      {/* Side-by-Side Detailed Section Tables */}
      <section className="site-section">
        <div className="site-container">
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-[#d21a1b]">
              Feature-by-Feature Matrix
            </span>
            <h2 className="text-2xl font-bold text-slate-900 mt-1">
              Direct Side-by-Side Breakdown
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Comparing capabilities between OpsKnight {PRODUCT.release.tag} and {c.name}. Grounded
              in dated vendor public documentation and v2.0.0 codebase realities.
            </p>
          </div>

          <div className="space-y-8">
            {COMPARE_SECTIONS.map((section) => (
              <div
                key={section.title}
                className="rounded-[16px] border border-slate-200 bg-white overflow-hidden shadow-sm"
              >
                <div className="bg-slate-50/80 px-6 py-3.5 border-b border-slate-200">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800">
                    {section.title}
                  </h3>
                </div>

                <div className="divide-y divide-slate-100">
                  {section.rows.map((row) => (
                    <div
                      key={row.feature}
                      className="p-5 grid grid-cols-1 md:grid-cols-12 gap-4 items-start"
                    >
                      <div className="md:col-span-4">
                        <h4 className="text-sm font-bold text-slate-900">{row.feature}</h4>
                        {row.source && (
                          <>
                            <p className="mt-1 text-[11px] leading-relaxed text-slate-500">
                              {row.source}
                            </p>
                            <p className="mt-1 text-[10px] font-mono uppercase tracking-wider text-slate-600">
                              Verified {compareRowVerifiedAt(row)}
                            </p>
                          </>
                        )}
                      </div>

                      <div className="md:col-span-4 rounded-xl bg-red-50/50 border border-red-100 p-3.5">
                        <span className="block text-[10px] font-bold uppercase tracking-wider text-[#d21a1b] mb-1">
                          OpsKnight {PRODUCT.release.tag}
                        </span>
                        <Cell value={row.values.opsknight} highlight />
                      </div>

                      <div className="md:col-span-4 rounded-xl bg-slate-50 border border-slate-200/60 p-3.5">
                        <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                          {c.name}
                        </span>
                        <Cell value={row.values[vendorKey]} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Boundaries & Verification */}
          <div className="mt-8 rounded-xl border border-slate-200 bg-slate-50 p-5 text-xs text-slate-600">
            <h4 className="font-bold text-slate-900 mb-1">Operational Boundaries</h4>
            <p>
              OpsKnight supports {PRODUCT.boundaries.statusPageLimit} status page per installation.
              Mobile client is an installable {PRODUCT.boundaries.mobileType}. {PRODUCT.boundaries.manualEscalation}
            </p>
          </div>
        </div>
      </section>

      {/* Verified Dated Sources */}
      <section className="site-section bg-slate-50 border-t border-slate-200">
        <div className="site-container">
          <div className="max-w-2xl mb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Auditability
            </span>
            <h2 className="text-xl font-bold text-slate-900 mt-1">Verified Documentation Sources</h2>
            <p className="text-xs text-slate-600 mt-1">
              Public links and references used to verify capabilities and boundaries.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {COMPARE_SOURCE_LINKS.filter(
              (src) =>
                src.label.toLowerCase().includes(c.slug.split("-")[0]) ||
                src.label.toLowerCase().includes(c.name.toLowerCase().split(" ")[0])
            ).map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between rounded-lg border border-slate-200 bg-white p-3 text-xs font-medium text-slate-700 hover:border-slate-300 hover:text-slate-900 transition-all shadow-sm"
              >
                <span className="truncate pr-2">{link.label}</span>
                <ExternalLink size={12} className="shrink-0 text-slate-500" />
              </a>
            ))}
          </div>
        </div>
      </section>

      <FinalCTA />
    </div>
  );
}
