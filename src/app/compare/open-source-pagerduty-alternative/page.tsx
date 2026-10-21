import { BreadcrumbSchema } from "@/components/site/BreadcrumbSchema";
import { siteMetadata } from "@/lib/site-metadata";
import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { PRODUCT } from "@/lib/product";
import { Action, FinalCTA, ProductScreenshot } from "@/components/site/Primitives";
import { PagerDutyMigrationHelper } from "@/components/comparison/PagerDutyMigrationHelper";
import {
  Server,
  ArrowLeft,
  DollarSign,
  HelpCircle,
  PhoneCall,
  Lock,
  Zap,
} from "lucide-react";

export const metadata: Metadata = siteMetadata({
  title: "Open-Source PagerDuty Alternative — Self-Hosted On-Call & Incidents",
  description:
    "The leading open-source PagerDuty alternative. Self-host on-call rotations, multi-tier escalation policies, SMS and voice paging with PagerDuty Events API v2 drop-in compatibility.",
  alternates: { canonical: "/compare/open-source-pagerduty-alternative/" },
  openGraph: {
    url: "/compare/open-source-pagerduty-alternative/",
    title: "Open-Source PagerDuty Alternative — Self-Hosted OpsKnight",
    description:
      "Replace expensive PagerDuty seat pricing with a self-hosted, AGPL-3.0 incident platform featuring Events API v2 compatibility, on-call schedules, and voice paging.",
  },
});

const faqs = [
  {
    question: "How does OpsKnight provide compatibility with PagerDuty?",
    answer:
      "OpsKnight exposes a PagerDuty Events API v2-compatible endpoint at /api/integrations/pagerduty/v2/enqueue. Any monitoring tool, script, or third-party system configured to send PagerDuty triggers, acknowledgments, or resolutions can simply repoint its webhook URL and routing key to OpsKnight without code changes.",
  },
  {
    question: "Why choose an open-source alternative over PagerDuty SaaS?",
    answer:
      "Organizations choose OpsKnight for three primary reasons: 1) Cost predictability: PagerDuty charges steep per-user monthly seat fees that penalize putting every engineer on call. OpsKnight has zero seat fees under AGPL-3.0. 2) Data sovereignty: Your alert payloads, server names, stack traces, and responder details remain inside your private VPC/network. 3) Resiliency: An internal incident platform stays operational even when public SaaS providers experience outages.",
  },
  {
    question: "How does phone and SMS paging compare to PagerDuty?",
    answer:
      "OpsKnight connects directly to your Twilio account to deliver voice phone calls and SMS notifications. During a phone page, responders hear incident details and can press 1 on their keypad (DTMF) to acknowledge or 2 to resolve immediately. Because you connect your own Twilio credentials, you pay transparent carrier rates without vendor markups.",
  },
  {
    question: "Can OpsKnight handle complex multi-tier escalation policies?",
    answer:
      "Yes. OpsKnight provides granular escalation policies where each step specifies a wait duration (e.g., 0 min, 5 min, 15 min), target schedules or individual responders, fallback conditions, and allowed notification channels. If an incident remains unacknowledged, it advances automatically until an on-call responder claims it.",
  },
  {
    question: "How do you achieve high availability with a self-hosted deployment?",
    answer:
      "For production environments requiring high availability, OpsKnight supports a Split Runtime topology separating web/API processes from background task workers, deployed across redundant nodes in Kubernetes or Docker Swarm, paired with a resilient, managed PostgreSQL cluster (such as AWS RDS Multi-AZ or Patroni).",
  },
  {
    question: "What mobile experience does OpsKnight offer for on-call responders?",
    answer:
      "OpsKnight features an installable Progressive Web Application (PWA) with responsive design, push notifications, and fast touch interactions. Responders can acknowledge, escalate, or resolve incidents directly from their mobile browser or installed PWA icon without downloading proprietary vendor app store binaries.",
  },
];

const comparisonData = [
  {
    feature: "License & Inspectability",
    pagerduty: "Proprietary closed-source SaaS",
    opsknight: "100% Open Source (AGPL-3.0-only)",
    highlight: true,
  },
  {
    feature: "Pricing Model",
    pagerduty: "Per-user/month tiers ($21 - $41+ / user / mo)",
    opsknight: "Free perpetual license; zero per-seat fees",
    highlight: true,
  },
  {
    feature: "Data Custody & Residence",
    pagerduty: "Multi-tenant cloud outside your perimeter",
    opsknight: "Private VPC / Bare Metal / Sovereign DB",
    highlight: true,
  },
  {
    feature: "PagerDuty Events API v2 Ingestion",
    pagerduty: "Native proprietary endpoint",
    opsknight: "Drop-in compatible /api/integrations/pagerduty/v2/enqueue",
    highlight: true,
  },
  {
    feature: "On-Call Rotations & Overrides",
    pagerduty: "Supported across all tiers",
    opsknight: "Supported with timezone handoffs & overrides",
    highlight: false,
  },
  {
    feature: "Escalation Policy Engine",
    pagerduty: "Multi-tier delays and target rules",
    opsknight: "Multi-tier delays, target rules, channel filters",
    highlight: false,
  },
  {
    feature: "Phone Paging with DTMF Acknowledge",
    pagerduty: "Bundled voice minutes with tier restrictions",
    opsknight: "Direct Twilio Voice with DTMF keypad ack/resolve",
    highlight: true,
  },
  {
    feature: "Status Page Capability",
    pagerduty: "Premium add-on or separate product",
    opsknight: "1 public/private status page included per instance",
    highlight: false,
  },
  {
    feature: "Enterprise SSO & SCIM",
    pagerduty: "Gated behind highest enterprise pricing tiers",
    opsknight: "Built-in OIDC (Okta, Azure, Google) and SCIM 2.0",
    highlight: true,
  },
  {
    feature: "ChatOps War Rooms",
    pagerduty: "Slack and Microsoft Teams integrations",
    opsknight: "Slack & Microsoft Teams incident channels & cards",
    highlight: false,
  },
  {
    feature: "Mobile Application",
    pagerduty: "Native iOS & Android store apps",
    opsknight: "Installable PWA with push notifications",
    highlight: false,
  },
];

export default function OpenSourcePagerDutyAlternativePage() {
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
      <BreadcrumbSchema
        name="Open-Source PagerDuty Alternative"
        path="/compare/open-source-pagerduty-alternative/"
      />
      <Script
        id="faq-schema-pagerduty"
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
            <span className="signal-dot" /> OPEN SOURCE ALTERNATIVE · AGPL-3.0
          </p>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mt-2">
            The Open-Source PagerDuty Alternative.
          </h1>
          <p className="site-description mt-4 text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
            Eliminate restrictive per-seat subscription taxes and keep your incident data under your own custody.
            OpsKnight gives engineering teams open-source on-call scheduling, multi-tier escalation policies,
            voice phone paging, and drop-in <strong className="text-white font-semibold">PagerDuty Events API v2</strong> compatibility.
          </p>
          <div className="site-actions mt-8 flex flex-wrap gap-4">
            <Action href="/deploy/">Deploy OpsKnight v{PRODUCT.release.version}</Action>
            <Action href="/compare/pagerduty/" secondary>
              View detailed PagerDuty matrix
            </Action>
          </div>
        </div>
      </section>

      {/* Value Pillars Section */}
      <section className="site-section site-white">
        <div className="site-container">
          <div className="max-w-3xl mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-[#d21a1b]">
              Why Teams Switch
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-2">
              Why engineers choose open source over SaaS monopolies.
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Traditional on-call vendors profit from charging per user, disincentivizing broad engineering participation.
              OpsKnight reclaims ownership for developers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-[16px] border border-slate-200 bg-white p-6 shadow-sm hover:border-slate-300 transition-all">
              <div className="rounded-full bg-red-50 p-2.5 text-[#d21a1b] w-fit mb-4">
                <DollarSign size={20} />
              </div>
              <h3 className="text-base font-bold text-slate-900">Zero Per-User Seat Taxes</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                PagerDuty pricing penalizes adding secondary on-call responders or cross-functional stakeholders.
                With OpsKnight under AGPL-3.0, onboard your entire engineering organization with zero license fees.
              </p>
            </div>

            <div className="rounded-[16px] border border-slate-200 bg-white p-6 shadow-sm hover:border-slate-300 transition-all">
              <div className="rounded-full bg-red-50 p-2.5 text-[#d21a1b] w-fit mb-4">
                <Zap size={20} />
              </div>
              <h3 className="text-base font-bold text-slate-900">Events API v2 Compatibility</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                OpsKnight exposes a drop-in compatible PagerDuty Events API v2 webhook. Repoint existing Datadog,
                Prometheus, Grafana, or CloudWatch alerts by updating the target endpoint and routing key.
              </p>
            </div>

            <div className="rounded-[16px] border border-slate-200 bg-white p-6 shadow-sm hover:border-slate-300 transition-all">
              <div className="rounded-full bg-red-50 p-2.5 text-[#d21a1b] w-fit mb-4">
                <Lock size={20} />
              </div>
              <h3 className="text-base font-bold text-slate-900">Complete Data Sovereignty</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Stop transmitting sensitive error payloads, internal hostnames, and customer identifiers to third-party
                multi-tenant clouds. Your incident database remains 100% within your private infrastructure.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Side-by-Side Comparison Matrix */}
      <section className="site-section bg-slate-50 border-y border-slate-200">
        <div className="site-container">
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-[#d21a1b]">
              Architectural Breakdown
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-2">
              PagerDuty vs OpsKnight Side-by-Side
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Examine the operational and architectural differences between PagerDuty&apos;s commercial SaaS and OpsKnight v{PRODUCT.release.version}.
            </p>
          </div>

          <div className="rounded-[16px] border border-slate-200 bg-white overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-100/90 border-b border-slate-200 text-slate-700 font-bold uppercase tracking-wider">
                    <th className="p-4">Decision Dimension</th>
                    <th className="p-4 w-1/3">PagerDuty Enterprise SaaS</th>
                    <th className="p-4 w-1/3 bg-red-50/50 text-[#d21a1b]">OpsKnight v{PRODUCT.release.version} (Open Source)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {comparisonData.map((row) => (
                    <tr key={row.feature} className="hover:bg-slate-50/60 transition-colors">
                      <td className="p-4 font-semibold text-slate-900">{row.feature}</td>
                      <td className="p-4 text-slate-600">{row.pagerduty}</td>
                      <td className={`p-4 ${row.highlight ? "bg-red-50/40 font-semibold text-slate-900" : "text-slate-800"}`}>
                        {row.opsknight}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Real Product Proof & Incident Detail Showcase */}
      <section className="site-section site-white">
        <div className="site-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5">
              <span className="text-xs font-bold uppercase tracking-wider text-[#d21a1b]">
                Real Incident Response
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-2">
                Fast incident command without the clutter.
              </h2>
              <p className="text-sm text-slate-600 mt-3 leading-relaxed">
                OpsKnight provides a unified incident command view: real-time signal stream, responder assignments,
                timeline events, ChatOps channels, and SLA tracking in one clean interface.
              </p>
              <div className="mt-6 space-y-3">
                <div className="flex items-start gap-3">
                  <div className="rounded-full bg-slate-100 p-1.5 text-slate-700 mt-0.5">
                    <PhoneCall size={16} />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-900">Voice Telephony &amp; DTMF Ack</h3>
                    <p className="text-xs text-slate-600 mt-0.5">
                      Receive automated voice phone calls and press 1 to claim the page directly from your phone.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="rounded-full bg-slate-100 p-1.5 text-slate-700 mt-0.5">
                    <Server size={16} />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-900">Integrated Control Plane</h3>
                    <p className="text-xs text-slate-600 mt-0.5">
                      Status pages, postmortems, and health monitoring ship inside the same deployable image.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-7">
              <ProductScreenshot
                name="incident-detail.png"
                alt="OpsKnight incident detail command center view with live responder assignment and timeline"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Migration Helper Section */}
      <section className="site-section bg-slate-50 border-y border-slate-200">
        <div className="site-container">
          <div className="max-w-2xl mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-[#d21a1b]">
              Seamless Integration
            </span>
            <h2 className="text-2xl font-bold text-slate-900 mt-1">
              Migrate PagerDuty Alert Ingestion to OpsKnight
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              OpsKnight accepts PagerDuty Events API v2 payloads directly. Inspect the contract specification and
              code examples below to configure your monitoring sources.
            </p>
          </div>
          <PagerDutyMigrationHelper />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="site-section site-white">
        <div className="site-container">
          <div className="max-w-3xl mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Frequently Asked Questions
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-2">
              Open-Source PagerDuty Alternative FAQ
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Answers to technical, operational, and licensing questions about adopting OpsKnight.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {faqs.map((faq) => (
              <div key={faq.question} className="rounded-xl border border-slate-200 bg-slate-50/50 p-5 shadow-sm">
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
