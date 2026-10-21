import { BreadcrumbSchema } from "@/components/site/BreadcrumbSchema";
import { siteMetadata } from "@/lib/site-metadata";
import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { PRODUCT } from "@/lib/product";
import { Action, FinalCTA, ProductScreenshot, TextLink } from "@/components/site/Primitives";
import { OpsgenieMigrationHelper } from "@/components/comparison/OpsgenieMigrationHelper";
import {
  Clock,
  Check,
  X,
  AlertTriangle,
  ArrowLeft,
  Database,
  Bell,
  ArrowRight,
  HelpCircle,
} from "lucide-react";

export const metadata: Metadata = siteMetadata({
  title: "Opsgenie Alternative 2027 — Self-Hosted Migration & On-Call Platform",
  description:
    "Looking for an Opsgenie alternative before the April 5, 2027 sunset? OpsKnight provides open-source, self-hosted on-call scheduling, multi-tier escalation policies, and incident response with zero per-user fees.",
  alternates: { canonical: "/compare/opsgenie-alternative-2027/" },
  openGraph: {
    url: "/compare/opsgenie-alternative-2027/",
    title: "Opsgenie Alternative 2027 — Migrate to Self-Hosted OpsKnight",
    description:
      "Plan your migration from sunsetting Opsgenie before April 5, 2027. Self-hosted on-call rotations, multi-channel paging, and full data sovereignty under AGPLv3.",
  },
});

const faqs = [
  {
    question: "When is the official Opsgenie end-of-life (EOL) date?",
    answer:
      "Atlassian announced that new sales of standalone Opsgenie ended on June 4, 2025, and all support for standalone Opsgenie ends on April 5, 2027. After this date, standalone Opsgenie will no longer be available or supported.",
  },
  {
    question: "Why should teams evaluate OpsKnight instead of moving to Jira Service Management (JSM)?",
    answer:
      "While Atlassian directs existing Opsgenie users toward Jira Service Management (JSM) Cloud, many engineering and platform teams prefer not to tie their on-call rotations to an expensive, ticketing-centric Cloud suite with per-agent seat pricing. OpsKnight gives teams 100% control over their operational data, runs on self-hosted Docker Compose or Kubernetes, charges zero seat fees, and is published under the inspectable AGPL-3.0 license.",
  },
  {
    question: "How does OpsKnight handle on-call schedules and escalations compared to Opsgenie?",
    answer:
      "OpsKnight replicates the core on-call capabilities of Opsgenie: timezone-aware rotation schedules, shift overrides, multi-stage escalation policies with configurable delay intervals, conditional channel delivery, and team-based routing. All schedule configurations and responder contacts live within your own PostgreSQL database.",
  },
  {
    question: "Can we still use our existing alerting sources (Prometheus, Datadog, Grafana, CloudWatch)?",
    answer:
      "Yes. OpsKnight provides first-class native webhook integrations for Prometheus Alertmanager, Datadog, Grafana, AWS CloudWatch, and custom generic webhooks. In most cases, migration involves simply updating your webhook destination URL and integration key.",
  },
  {
    question: "How does telephone and SMS notification work in a self-hosted platform?",
    answer:
      "OpsKnight connects to your own configured Twilio account for voice telephony and SMS delivery. Responders receive real phone calls with interactive DTMF acknowledgment ('Press 1 to acknowledge'), eliminating vendor markups on notification telecom and keeping telecom credentials under your control.",
  },
  {
    question: "Is OpsKnight free to deploy and operate?",
    answer:
      "OpsKnight v2.0.0 is open-source software under the GNU AGPLv3 license. You can freely deploy and operate it on your own servers or cloud infrastructure. Optional enterprise commercial support and implementation assistance are available directly from the core maintainers.",
  },
];

const featureComparison = [
  {
    feature: "Deployment Ownership",
    opsgenie: "Vendor-hosted Atlassian Cloud only",
    opsknight: "Self-hosted on your VPC / Bare Metal / Kubernetes",
    winner: "opsknight",
  },
  {
    feature: "Product Lifecycle Status",
    opsgenie: "Sunset announced; EOL April 5, 2027",
    opsknight: "Active release (v2.0.0), perpetual open-source license",
    winner: "opsknight",
  },
  {
    feature: "Pricing Model",
    opsgenie: "Per-user monthly subscription (or JSM Cloud tier)",
    opsknight: "Free open-source AGPL-3.0 license; unlimited users",
    winner: "opsknight",
  },
  {
    feature: "On-Call Rotations & Overrides",
    opsgenie: "Daily, weekly, custom schedules with overrides",
    opsknight: "Daily, weekly, multi-layer schedules with overrides",
    winner: "parity",
  },
  {
    feature: "Multi-Tier Escalation Policies",
    opsgenie: "Multi-step delays with team and schedule targets",
    opsknight: "Multi-step delays with target fallbacks and channel rules",
    winner: "parity",
  },
  {
    feature: "Voice & SMS Notification Costs",
    opsgenie: "Bundled into tiers with regional limits & overages",
    opsknight: "Direct-to-carrier via your own Twilio account at cost",
    winner: "opsknight",
  },
  {
    feature: "DTMF Voice Call Acknowledgment",
    opsgenie: "Press-key to acknowledge during live phone page",
    opsknight: "Press 1 to acknowledge, 2 to resolve via Twilio Voice",
    winner: "parity",
  },
  {
    feature: "Customer Status Page Included",
    opsgenie: "Requires separate Atlassian Statuspage subscription",
    opsknight: "1 integrated public/private status page included",
    winner: "opsknight",
  },
  {
    feature: "Data Residency & Security",
    opsgenie: "Alert payloads stored in multi-tenant Atlassian Cloud",
    opsknight: "100% on-premises / private PostgreSQL database",
    winner: "opsknight",
  },
  {
    feature: "ChatOps Collaboration",
    opsgenie: "Slack & Microsoft Teams integrations",
    opsknight: "Slack & Microsoft Teams incident channels & cards",
    winner: "parity",
  },
  {
    feature: "Mobile App Access",
    opsgenie: "Native iOS and Android store apps",
    opsknight: "Installable PWA with push notification support",
    winner: "opsgenie",
  },
];

export default function OpsgenieAlternative2027Page() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <div className="site-page site-page--compare site-page--compare-detail">
      <BreadcrumbSchema name="Opsgenie Alternative 2027" path="/compare/opsgenie-alternative-2027/" />
      <Script
        id="faq-schema-opsgenie"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

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
            <span className="signal-dot" /> MIGRATION TARGET · OPSGENIE SUNSET 2027
          </p>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mt-2">
            The Dedicated Opsgenie Alternative for 2027.
          </h1>
          <p className="site-description mt-4 text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
            Atlassian has announced that standalone Opsgenie sales have ended, and all support concludes on{" "}
            <strong className="text-white font-semibold">April 5, 2027</strong>. Don&apos;t let forced vendor migrations
            push your team into expensive, complex cloud ticketing suites. OpsKnight provides an open-source,
            self-hosted on-call and incident platform you operate on your own terms.
          </p>
          <div className="site-actions mt-8 flex flex-wrap gap-4">
            <Action href="/deploy/">Deploy OpsKnight v{PRODUCT.release.version}</Action>
            <Action href="/compare/opsgenie/" secondary>
              View direct Opsgenie matrix
            </Action>
          </div>
        </div>
      </section>

      {/* Critical Timeline Callout Banner */}
      <section className="bg-amber-950/30 border-y border-amber-800/40 py-6 px-4">
        <div className="site-container flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="rounded-full bg-amber-500/20 p-2 text-amber-400 shrink-0">
              <AlertTriangle size={20} />
            </div>
            <div>
              <h2 className="text-sm font-bold text-amber-200 uppercase tracking-wide">
                Key Sunset Milestones for Opsgenie Customers
              </h2>
              <p className="text-xs text-amber-300/80 mt-0.5">
                • <strong>June 4, 2025:</strong> New sales of standalone Opsgenie ended.
                <br />• <strong>April 5, 2027:</strong> End of Support (EOL) for all standalone Opsgenie accounts.
              </p>
            </div>
          </div>
          <Link
            href="/docs/v2.0.0/start/initial-setup/"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-amber-600/30 hover:bg-amber-600/50 text-amber-200 text-xs font-semibold border border-amber-500/30 transition-all shrink-0"
          >
            Start Migration Early <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* Strategic Migration Options Section */}
      <section className="site-section site-white">
        <div className="site-container">
          <div className="max-w-3xl mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-[#d21a1b]">
              Strategic Decision Paths
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-2">
              Evaluating your path forward before 2027.
            </h2>
            <p className="text-sm text-slate-600 mt-2 leading-relaxed">
              When a core operational platform sunsets, engineering organizations typically face two choices:
              adopt the vendor&apos;s recommended cloud suite, or take back control with modern self-hosted infrastructure.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Option A: Vendor JSM Cloud Path */}
            <div className="rounded-[16px] border border-slate-200 bg-slate-50/50 p-6 flex flex-col justify-between">
              <div>
                <span className="inline-block px-2.5 py-1 rounded-full text-[11px] font-mono font-medium bg-slate-200 text-slate-700 mb-3">
                  Option A: Vendor Cloud Path
                </span>
                <h3 className="text-lg font-bold text-slate-900">Migrate to Jira Service Management Cloud</h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Atlassian directs Opsgenie customers to rebuild their rotations inside JSM Cloud. While this keeps you
                  within the Atlassian umbrella, it introduces notable trade-offs:
                </p>
                <ul className="mt-4 space-y-2.5 text-xs text-slate-700">
                  <li className="flex items-start gap-2">
                    <X size={15} className="text-red-500 shrink-0 mt-0.5" />
                    <span><strong>High per-agent seat costs</strong> that scale aggressively with team size</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <X size={15} className="text-red-500 shrink-0 mt-0.5" />
                    <span><strong>Ticketing tool overhead</strong> forced onto real-time on-call responders</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <X size={15} className="text-red-500 shrink-0 mt-0.5" />
                    <span><strong>Zero self-hosted deployment option</strong>; all data remains in vendor cloud</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <X size={15} className="text-red-500 shrink-0 mt-0.5" />
                    <span><strong>Ongoing dependency</strong> on vendor pricing changes and product pivots</span>
                  </li>
                </ul>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-200">
                <span className="text-[11px] text-slate-600">Best for: Organizations fully standardized on Atlassian Cloud suite.</span>
              </div>
            </div>

            {/* Option B: OpsKnight Self-Hosted Path */}
            <div className="rounded-[16px] border-2 border-red-200 bg-red-50/30 p-6 flex flex-col justify-between shadow-sm">
              <div>
                <span className="inline-block px-2.5 py-1 rounded-full text-[11px] font-mono font-semibold bg-red-100 text-[#d21a1b] mb-3">
                  Option B: The OpsKnight Path (Recommended)
                </span>
                <h3 className="text-lg font-bold text-slate-900">Self-Hosted On-Call with OpsKnight</h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Retain dedicated, purpose-built on-call rotations and incident management on your own terms.
                  OpsKnight is built specifically for SRE and platform teams who demand operational autonomy:
                </p>
                <ul className="mt-4 space-y-2.5 text-xs text-slate-800">
                  <li className="flex items-start gap-2">
                    <Check size={15} className="text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Zero per-user licensing fees</strong> under the perpetual AGPL-3.0 license</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check size={15} className="text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Complete data custody:</strong> alerts and responder records live in your PostgreSQL</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check size={15} className="text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Independent reliability:</strong> on-call system survives public SaaS disruptions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check size={15} className="text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Direct Twilio voice telephony:</strong> press-key phone paging without markup</span>
                  </li>
                </ul>
              </div>
              <div className="mt-6 pt-4 border-t border-red-200/60 flex items-center justify-between">
                <span className="text-[11px] font-medium text-[#d21a1b]">Production ready on Docker &amp; Kubernetes</span>
                <TextLink href="/deploy/">Explore Deployments</TextLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Real Product Proof & Schedule Showcase */}
      <section className="site-section bg-slate-50 border-y border-slate-200">
        <div className="site-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5">
              <span className="text-xs font-bold uppercase tracking-wider text-[#d21a1b]">
                Reliable On-Call Scheduling
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-2">
                Rotations that feel familiar to Opsgenie users.
              </h2>
              <p className="text-sm text-slate-600 mt-3 leading-relaxed">
                OpsKnight supports the scheduling patterns your teams already use: multi-layer daily and weekly rotations,
                custom intervals, holiday and shift overrides, and timezone alignment.
              </p>
              <div className="mt-6 space-y-3">
                <div className="flex items-start gap-3">
                  <div className="rounded-full bg-slate-200 p-1.5 text-slate-700 mt-0.5">
                    <Clock size={16} />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-900">Shift Overrides Without Schedule Drift</h3>
                    <p className="text-xs text-slate-600 mt-0.5">
                      Cover for a teammate with temporary overrides that expire automatically.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="rounded-full bg-slate-200 p-1.5 text-slate-700 mt-0.5">
                    <Bell size={16} />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-900">Multi-Tier Escalation Delays</h3>
                    <p className="text-xs text-slate-600 mt-0.5">
                      Route to primary schedule at 0m, secondary at 5m, and team leads at 15m until acknowledged.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="rounded-full bg-slate-200 p-1.5 text-slate-700 mt-0.5">
                    <Database size={16} />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-900">100% On-Premises Schedule Data</h3>
                    <p className="text-xs text-slate-600 mt-0.5">
                      Never worry about third-party vendors deprecating APIs or locking your schedule data.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-7">
              <ProductScreenshot
                name="on-call-schedule-detail.png"
                alt="OpsKnight on-call schedule view with timeline rotations and shift overrides"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Feature-by-Feature Comparison Matrix */}
      <section className="site-section site-white">
        <div className="site-container">
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-[#d21a1b]">
              Side-by-Side Analysis
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-2">
              Opsgenie vs OpsKnight Feature Comparison
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Direct architectural comparison between standalone Opsgenie and OpsKnight v{PRODUCT.release.version}.
            </p>
          </div>

          <div className="rounded-[16px] border border-slate-200 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-100/80 border-b border-slate-200 text-slate-700 font-bold uppercase tracking-wider">
                    <th className="p-4">Capability Dimension</th>
                    <th className="p-4 w-1/3">Standalone Opsgenie</th>
                    <th className="p-4 w-1/3 bg-red-50/50 text-[#d21a1b]">OpsKnight v{PRODUCT.release.version}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {featureComparison.map((row) => (
                    <tr key={row.feature} className="hover:bg-slate-50/60 transition-colors">
                      <td className="p-4 font-semibold text-slate-900">{row.feature}</td>
                      <td className="p-4 text-slate-600">{row.opsgenie}</td>
                      <td className="p-4 bg-red-50/30 text-slate-900 font-medium">{row.opsknight}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Step-by-Step 5-Phase Migration Blueprint */}
      <section className="site-section bg-slate-50/70 border-t border-slate-200">
        <div className="site-container">
          <div className="max-w-3xl mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-[#d21a1b]">
              Execution Blueprint
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-2">
              5-Step Migration Blueprint from Opsgenie to OpsKnight
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Follow this phased migration framework to systematically transition on-call services before the 2027 deadline.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm flex flex-col justify-between">
              <div>
                <span className="font-mono text-xs font-bold text-[#d21a1b] block mb-1">01 / AUDIT</span>
                <h3 className="text-sm font-bold text-slate-900">Inventory Services</h3>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                  List active Opsgenie alert rules, teams, on-call schedules, and escalation policies.
                </p>
              </div>
              <div className="mt-4 pt-2 border-t border-slate-100 text-[10px] text-slate-600">Phase 1: Discovery</div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm flex flex-col justify-between">
              <div>
                <span className="font-mono text-xs font-bold text-[#d21a1b] block mb-1">02 / DEPLOY</span>
                <h3 className="text-sm font-bold text-slate-900">Spin Up Runtime</h3>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                  Launch OpsKnight via Docker Compose or Helm. Attach your PostgreSQL instance and configure OIDC/SCIM.
                </p>
              </div>
              <div className="mt-4 pt-2 border-t border-slate-100 text-[10px] text-slate-600">Phase 2: Foundation</div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm flex flex-col justify-between">
              <div>
                <span className="font-mono text-xs font-bold text-[#d21a1b] block mb-1">03 / CONFIGURE</span>
                <h3 className="text-sm font-bold text-slate-900">Recreate Rotations</h3>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                  Define user notification profiles, build schedule rotations, and set escalation rules.
                </p>
              </div>
              <div className="mt-4 pt-2 border-t border-slate-100 text-[10px] text-slate-600">Phase 3: Scheduling</div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm flex flex-col justify-between">
              <div>
                <span className="font-mono text-xs font-bold text-[#d21a1b] block mb-1">04 / REPOINT</span>
                <h3 className="text-sm font-bold text-slate-900">Dual-Send Webhooks</h3>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                  Send alerts to OpsKnight in staging. Verify deduplication, routing keys, and phone paging.
                </p>
              </div>
              <div className="mt-4 pt-2 border-t border-slate-100 text-[10px] text-slate-600">Phase 4: Validation</div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm flex flex-col justify-between">
              <div>
                <span className="font-mono text-xs font-bold text-[#d21a1b] block mb-1">05 / CUTOVER</span>
                <h3 className="text-sm font-bold text-slate-900">Decommission Opsgenie</h3>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                  Switch production alerting traffic, cancel Opsgenie renewal, and eliminate seat fees.
                </p>
              </div>
              <div className="mt-4 pt-2 border-t border-slate-100 text-[10px] text-slate-600">Phase 5: Cutover</div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Migration Code Helper */}
      <section className="site-section site-white">
        <div className="site-container">
          <div className="max-w-2xl mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-[#d21a1b]">
              Interactive Integration Helper
            </span>
            <h2 className="text-2xl font-bold text-slate-900 mt-1">
              Repointing Opsgenie Ingestion to OpsKnight
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Inspect verified configuration recipes for Prometheus Alertmanager, Datadog webhooks, and HTTP payloads.
            </p>
          </div>
          <OpsgenieMigrationHelper />
        </div>
      </section>

      {/* Deep FAQ Section */}
      <section className="site-section bg-slate-50 border-t border-slate-200">
        <div className="site-container">
          <div className="max-w-3xl mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Frequently Asked Questions
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-2">
              Opsgenie 2027 Sunset &amp; Migration FAQ
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Common questions from SRE, DevOps, and Platform teams planning their transition away from Opsgenie.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {faqs.map((faq) => (
              <div key={faq.question} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                <h3 className="text-sm font-bold text-slate-900 flex items-start gap-2">
                  <HelpCircle size={16} className="text-[#d21a1b] shrink-0 mt-0.5" />
                  <span>{faq.question}</span>
                </h3>
                <p className="text-xs text-slate-600 mt-2.5 leading-relaxed pl-6">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FinalCTA />
    </div>
  );
}
