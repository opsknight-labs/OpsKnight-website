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
  return siteMetadata({
    title: `OpsKnight and ${c?.name} Comparison`,
    description: `Technical and architectural comparison of OpsKnight and ${c?.name}. Grounded in v2.0.0 capabilities and dated vendor documentation.`,
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
      {
        title: "Self-hosted in your VPC",
        desc: "OpsKnight deploys to your Docker Compose, Docker Swarm, or Kubernetes clusters. Raw telemetry, logs, and incident postmortems never leave your network boundary.",
      },
      {
        title: "Zero per-user licensing fees",
        desc: "100% Free AGPL-3.0 open source. You can grant access to every engineer, product manager, and stakeholder without budgeting per-seat monthly licenses.",
      },
      {
        title: "Direct wholesale Twilio integration",
        desc: "You connect your own Twilio account with single-key DTMF voice acknowledgment and zero markup on SMS/voice telecom rates.",
      },
      {
        title: "Native bidirectional Microsoft Teams & Slack",
        desc: "Automated dedicated incident channels and war rooms with synchronized status, rather than one-way webhook alert spam.",
      },
    ],
    stronger: [
      {
        title: "700+ turnkey SaaS integration catalog",
        desc: "PagerDuty maintains an extensive third-party partner ecosystem with automated click-to-connect setup across legacy enterprise tooling.",
      },
      {
        title: "Managed multi-tenant cloud operations",
        desc: "Zero infrastructure maintenance. No PostgreSQL databases to tune, backup, or upgrade.",
      },
      {
        title: "Native iOS and Android mobile applications",
        desc: "Dedicated native mobile binaries with custom push notification infrastructure designed to bypass standard mobile OS sleep modes.",
      },
      {
        title: "Multi-service enterprise dependency mapping",
        desc: "Advanced event orchestration, machine-learning noise reduction, and complex cross-team service topology modeling for global enterprises.",
      },
    ],
  },
  "incident-io": {
    different: [
      {
        title: "Full data sovereignty & self-hosting",
        desc: "Deploy in your own private cloud or on-prem environment. Sensitive incident conversations, root causes, and security disclosures stay within your custody.",
      },
      {
        title: "Built-in multi-channel paging engine",
        desc: "On-call escalation, schedules, SMS, automated phone calls, and web push are included out of the box in the AGPL-3.0 core, not a paid add-on tier.",
      },
      {
        title: "No vendor tier walls",
        desc: "Features like OIDC/SSO, multi-tier escalation, postmortem templates, and public status pages are available without enterprise sales gates.",
      },
      {
        title: "Transparent, auditable open source",
        desc: "Every line of code, database migration, and webhook handler is inspectable and modifiable under AGPL-3.0.",
      },
    ],
    stronger: [
      {
        title: "Slack-native incident experience",
        desc: "Deeply polished Slack workflows, customizable canvas modals, and bot commands optimized specifically for modern Slack organizations.",
      },
      {
        title: "Catalog integrations (GitHub, Linear, Jira)",
        desc: "Turnkey synchronization of engineering entities, pull requests, services, and issue trackers directly into incident timelines.",
      },
      {
        title: "Managed SaaS convenience",
        desc: "No deployment pipelines, database provisioning, or self-hosted uptime considerations.",
      },
      {
        title: "Rapid collaborative web interface",
        desc: "Live multi-user timeline editing and collaborative postmortem assembly in a slick, modern web application.",
      },
    ],
  },
  opsgenie: {
    different: [
      {
        title: "Active long-term open source roadmap",
        desc: "Atlassian ended new sales of Opsgenie on June 4, 2025 and will sunset support on April 5, 2027. OpsKnight is an actively developed, modern AGPL-3.0 platform.",
      },
      {
        title: "PagerDuty Events API v2 drop-in routing",
        desc: "Direct endpoint compatibility allows Alertmanager, Datadog, Grafana, and CloudWatch alerts to switch targets with a simple base URL swap.",
      },
      {
        title: "Unified incident & status command",
        desc: "Combines high-urgency on-call paging, incident coordination, and customer status pages into one cohesive self-hosted deployment.",
      },
      {
        title: "Zero migration deadline pressure",
        desc: "You own the binary and the database schema. No forced transitions into Jira Service Management or proprietary cloud bundles.",
      },
    ],
    stronger: [
      {
        title: "Deep legacy Jira Cloud integration",
        desc: "Decade-long integration depth with Atlassian Jira, Jira Service Desk, and Bitbucket workflows.",
      },
      {
        title: "Complex historical routing rules",
        desc: "Granular multi-criteria alert filtering and routing logic refined across thousands of legacy enterprise configurations.",
      },
      {
        title: "Managed multi-region cloud backing",
        desc: "Global cloud infrastructure maintained by Atlassian with no server-level sysadmin responsibilities.",
      },
      {
        title: "Proven enterprise footprint",
        desc: "Years of operational track record in Fortune 500 environments with existing procurement contracts.",
      },
    ],
  },
  grafana: {
    different: [
      {
        title: "Dedicated, active open-source codebase",
        desc: "Grafana Labs archived the open-source Grafana OnCall repository on March 24, 2026. OpsKnight is an actively maintained, production-ready AGPL-3.0 incident response system.",
      },
      {
        title: "Complete standalone operational suite",
        desc: "Includes native public/private status pages, real-time war room coordination, and postmortem tracking without requiring a Grafana observability stack.",
      },
      {
        title: "Single Docker Compose / Helm deployment",
        desc: "Straightforward container deployment with standard PostgreSQL. No multi-service microservice sprawl or Celery/Redis fleet management.",
      },
      {
        title: "Single-key DTMF voice acknowledgment",
        desc: "Built-in Twilio voice dispatcher calls engineers and acknowledges incidents instantly with a single keypad press.",
      },
    ],
    stronger: [
      {
        title: "Unified Grafana Cloud ecosystem",
        desc: "Seamless correlation between Grafana dashboards, Loki log queries, Mimir metrics, and Tempo distributed traces.",
      },
      {
        title: "Observability-first alerting pipelines",
        desc: "Direct alerting rules evaluated within the Grafana alert engine with instant drill-down into source panels.",
      },
      {
        title: "Grafana Cloud managed infrastructure",
        desc: "Included with Grafana Cloud accounts, eliminating host provisioning and maintenance.",
      },
      {
        title: "Dedicated Grafana mobile application",
        desc: "Mobile client for monitoring dashboard queries alongside on-call notifications.",
      },
    ],
  },
  squadcast: {
    different: [
      {
        title: "Open source & independent ownership",
        desc: "Free from corporate acquisitions (Squadcast is now part of SolarWinds). You own your codebase, database, and telemetry pipeline.",
      },
      {
        title: "Direct carrier wholesale pricing",
        desc: "Bring your own Twilio account. You pay true telecom cost without arbitrary monthly SMS/voice notification limits or plan markups.",
      },
      {
        title: "Complete data residency & privacy",
        desc: "Keep all infrastructure incidents, postmortems, and internal outage transcripts on your own servers.",
      },
      {
        title: "Community-driven enhancements",
        desc: "Open GitHub repository where you can inspect code, request features, and contribute integrations.",
      },
    ],
    stronger: [
      {
        title: "Turnkey multi-tenant SaaS",
        desc: "Instant onboarding without spinning up compute or configuring a database.",
      },
      {
        title: "Ready-to-use mobile apps",
        desc: "Native apps in the Apple App Store and Google Play Store with pre-configured push delivery tokens.",
      },
      {
        title: "Bundled telecom notification allowances",
        desc: "SMS and voice minutes included in higher subscription tiers without a separate Twilio account.",
      },
      {
        title: "150+ pre-built tool integrations",
        desc: "Extensive webhook parser library for niche observability and IT service management tools.",
      },
    ],
  },
  splunk: {
    different: [
      {
        title: "Lightweight, cloud-native deployment",
        desc: "Runs cleanly on standard container infrastructure with modest hardware requirements, unlike heavyweight enterprise stacks.",
      },
      {
        title: "Predictable zero-license economics",
        desc: "Free AGPL-3.0 Community Edition eliminates complex per-host or per-responder commercial licensing.",
      },
      {
        title: "Modern Next.js & React interface",
        desc: "Fast, modern user experience designed for speed, keyboard navigation, and clear visual hierarchy during high-stress outages.",
      },
      {
        title: "Zero vendor lock-in",
        desc: "Standard PostgreSQL schema, open REST APIs, and full exportability of all historical incident and paging records.",
      },
    ],
    stronger: [
      {
        title: "Splunk Enterprise & Observability integration",
        desc: "Deep bi-directional integration with Splunk core searches, ITSI, and Splunk APM pipelines.",
      },
      {
        title: "Global enterprise compliance & certifications",
        desc: "Broad compliance attestations (FedRAMP, HIPAA, SOC 2 Type II) under the Splunk/Cisco enterprise umbrella.",
      },
      {
        title: "Established enterprise support SLAs",
        desc: "24/7/365 global carrier-grade enterprise support contracts backed by Cisco's global support organization.",
      },
      {
        title: "Mature mobile app ecosystem",
        desc: "Native VictorOps/Splunk On-Call mobile applications with custom sound profiles and system overrides.",
      },
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
    <div className="site-page">
      <BreadcrumbSchema name={c.name} path={`/compare/${c.slug}/`} />

      {/* Hero Section */}
      <section className="interior-hero site-dark">
        <div className="site-container">
          <div className="mb-4">
            <Link
              href="/compare/"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
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
            <Action href="/install/">Evaluate OpsKnight {PRODUCT.release.tag}</Action>
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
              <TextLink href={c.source}>
                {c.sourceLabel} <ExternalLink size={13} className="inline ml-1" />
              </TextLink>
            </div>

            <div className="rounded-[16px] border border-red-100 bg-red-50/40 p-6 shadow-sm">
              <h2 className="text-base font-bold uppercase tracking-wider text-[#d21a1b] mb-2">
                The OpsKnight Model
              </h2>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Self-Hosted Freedom ({BRAND.license})
              </h3>
              <p className="text-sm leading-relaxed text-slate-600 mb-4">
                OpsKnight {PRODUCT.release.tag} is self-hosted under {PRODUCT.release.license}.
                You maintain complete custody of alert telemetry, customer data, and postmortems.
                Available 100% free with optional commercial enterprise support and custom implementation services.
              </p>
              <div className="flex items-center gap-3">
                <TextLink href="/install/">View install topologies</TextLink>
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
                We make explicit design and distribution choices that favor engineering sovereignty,
                transparent costs, and self-hosted control.
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
                OpsKnight implements native PagerDuty Events API v2 compatibility. Swap endpoints in your
                Alertmanager, Datadog, or Terraform configurations with zero disruption.
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
                With Opsgenie support concluding April 5, 2027, migrate your alert routes, schedules,
                and on-call policies to self-hosted OpsKnight today.
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
                Continue running an actively maintained open-source incident management system with direct
                Grafana webhook and contact point support.
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
                          <p className="mt-1 text-[11px] leading-relaxed text-slate-400">
                            {row.source}
                          </p>
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
                <ExternalLink size={12} className="shrink-0 text-slate-400" />
              </a>
            ))}
          </div>
        </div>
      </section>

      <FinalCTA />
    </div>
  );
}
