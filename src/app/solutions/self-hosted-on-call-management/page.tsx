import { BreadcrumbSchema } from "@/components/site/BreadcrumbSchema";
import { siteMetadata } from "@/lib/site-metadata";
import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { PRODUCT } from "@/lib/product";
import { Action, FinalCTA, ProductScreenshot, TextLink } from "@/components/site/Primitives";
import {
  Calendar,
  Clock,
  Check,
  ArrowLeft,
  Bell,
  Layers,
  PhoneCall,
  Lock,
  HelpCircle,
} from "lucide-react";

export const metadata: Metadata = siteMetadata({
  title: "Self-Hosted On-Call Management — Rotations, Escalations & Alerts",
  description:
    "Enterprise self-hosted on-call management software. Run rotations, override shifts, configure multi-channel paging, and control all operational paging data on your own infrastructure.",
  alternates: { canonical: "/solutions/self-hosted-on-call-management/" },
  openGraph: {
    url: "/solutions/self-hosted-on-call-management/",
    title: "Self-Hosted On-Call Management — Rotations, Escalations & Paging",
    description:
      "Take control of your on-call operations with self-hosted scheduling, multi-tier escalation policies, and voice paging on Docker or Kubernetes.",
  },
});

const faqs = [
  {
    question: "What is self-hosted on-call management and why do teams choose it?",
    answer:
      "Self-hosted on-call management means running your scheduling, escalation policies, and paging platform on infrastructure you operate (such as your own VPC, bare-metal servers, or Kubernetes cluster) rather than relying on a third-party multi-tenant SaaS vendor. Teams choose it for strict data sovereignty, compliance with regulatory standards (SOC2, HIPAA, ISO27001), air-gapped network requirements, and immunity from public SaaS outages.",
  },
  {
    question: "How do rotation schedules and shift overrides work in OpsKnight?",
    answer:
      "OpsKnight supports recurring daily, weekly, or custom rotations with timezone-aware handoffs. When an engineer is sick, traveling, or swapping shifts, team members can create temporary schedule overrides that take immediate effect and expire automatically without disrupting the long-term rotation rhythm.",
  },
  {
    question: "What happens if an on-call responder misses a page?",
    answer:
      "OpsKnight executes multi-tier escalation policies. For example: Step 1 pages the primary on-call engineer at 0 minutes. If the incident is not acknowledged within 5 minutes, Step 2 automatically alerts the secondary schedule. If still unacknowledged after 15 minutes, Step 3 notifies the entire team channel or designated escalation lead.",
  },
  {
    question: "How does telephone and SMS delivery operate without a vendor subscription?",
    answer:
      "OpsKnight integrates directly with your own Twilio account. During an incident, OpsKnight makes automated phone calls to responders with synthesized incident summaries. Responders can press 1 on their dialpad to acknowledge or 2 to resolve immediately. You pay standard telecom rates directly to Twilio with zero vendor markups.",
  },
  {
    question: "What infrastructure is required to self-host OpsKnight?",
    answer:
      "A standard Linux VM with Docker and Docker Compose (2+ vCPUs, 4GB RAM) is sufficient for small to mid-sized teams using the integrated topology. For larger organizations and high availability, OpsKnight provides Kubernetes Helm charts and Docker Swarm templates with split web and worker roles connected to a managed PostgreSQL database.",
  },
  {
    question: "Does OpsKnight integrate with our existing monitoring tools?",
    answer:
      "Yes. OpsKnight provides verified inbound webhook integrations for Prometheus Alertmanager, Datadog, Grafana, AWS CloudWatch, PagerDuty Events API v2, and generic HTTP webhooks. Outbound collaboration includes interactive Slack channels and Microsoft Teams cards.",
  },
];

const capabilities = [
  {
    icon: Calendar,
    title: "Flexible Rotations",
    desc: "Configure primary, secondary, and shadow rotations with timezone-aware shift handoff times.",
  },
  {
    icon: Clock,
    title: "One-Click Overrides",
    desc: "Create temporary coverage substitutions for vacations or shift trades without recalculating future schedules.",
  },
  {
    icon: Layers,
    title: "Multi-Tier Escalations",
    desc: "Define ordered steps with configurable wait delays, fallback targets, and channel-specific delivery rules.",
  },
  {
    icon: PhoneCall,
    title: "Voice Phone Paging",
    desc: "Call responders directly via Twilio Voice with DTMF dialpad acknowledgment ('Press 1 to acknowledge').",
  },
  {
    icon: Bell,
    title: "Multi-Channel Delivery",
    desc: "Dispatch alerts simultaneously across Voice calls, SMS, Email, Slack incident channels, and Web Push.",
  },
  {
    icon: Lock,
    title: "Sovereign Data Custody",
    desc: "Keep user phone numbers, schedule calendars, and incident payloads inside your own PostgreSQL database.",
  },
];

export default function SelfHostedOnCallManagementPage() {
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
    <div className="site-page site-page--solutions site-page--solutions-detail">
      <BreadcrumbSchema
        name="Self-Hosted On-Call Management"
        path="/solutions/self-hosted-on-call-management/"
      />
      <Script
        id="faq-schema-oncall"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero Section */}
      <section className="interior-hero site-dark">
        <div className="site-container">
          <div className="mb-4">
            <Link
              href="/solutions/"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
            >
              <ArrowLeft size={14} /> Back to all solutions
            </Link>
          </div>
          <p className="site-eyebrow">
            <span className="signal-dot" /> SOVEREIGN OPERATIONS · SELF-HOSTED ON-CALL
          </p>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mt-2">
            Self-Hosted On-Call Management.
          </h1>
          <p className="site-description mt-4 text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
            Run reliable on-call rotations, multi-tier escalation policies, and voice telephone paging inside
            your own infrastructure. Keep responder contact data, shift schedules, and alert payloads strictly
            governed within your private network boundary.
          </p>
          <div className="site-actions mt-8 flex flex-wrap gap-4">
            <Action href="/deploy/">Deploy OpsKnight v{PRODUCT.release.version}</Action>
            <Action href="/docs/v2.0.0/guides/escalation/configure-policy/" secondary>
              Configure Escalation Policies
            </Action>
          </div>
        </div>
      </section>

      {/* Core Capabilities Grid */}
      <section className="site-section site-white">
        <div className="site-container">
          <div className="max-w-3xl mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-[#d21a1b]">
              Essential On-Call Foundation
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-2">
              Everything your on-call rotation requires, self-hosted.
            </h2>
            <p className="text-sm text-slate-600 mt-2 leading-relaxed">
              Designed from the ground up for engineering, DevOps, and SRE teams who require full control over their
              paging schedules and alerting workflows.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {capabilities.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="rounded-[16px] border border-slate-200 bg-white p-6 shadow-sm hover:border-slate-300 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="rounded-full bg-red-50 p-2.5 text-[#d21a1b] w-fit mb-4">
                      <Icon size={20} />
                    </div>
                    <h3 className="text-base font-bold text-slate-900">{item.title}</h3>
                    <p className="text-xs text-slate-600 mt-2 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Real Product Proof & Schedule Showcase */}
      <section className="site-section bg-slate-50 border-y border-slate-200">
        <div className="site-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5">
              <span className="text-xs font-bold uppercase tracking-wider text-[#d21a1b]">
                Intuitive Schedule Control
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-2">
                Clarity before and during every shift.
              </h2>
              <p className="text-sm text-slate-600 mt-3 leading-relaxed">
                Clear calendar visualization shows who is on duty right now, upcoming shift handoffs, and scheduled
                overrides. Responders always know their coverage obligations in advance.
              </p>
              <div className="mt-6 space-y-3">
                <div className="flex items-start gap-3">
                  <div className="rounded-full bg-slate-200 p-1.5 text-slate-700 mt-0.5">
                    <Check size={16} />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-900">Timezone-Aware Transitions</h3>
                    <p className="text-xs text-slate-600 mt-0.5">
                      Support follow-the-sun global engineering teams with seamless rotational transitions.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="rounded-full bg-slate-200 p-1.5 text-slate-700 mt-0.5">
                    <Check size={16} />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-900">Audit-Logged Changes</h3>
                    <p className="text-xs text-slate-600 mt-0.5">
                      Every rotation adjustment, override, and policy modification is recorded in the immutable audit log.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-7">
              <ProductScreenshot
                name="on-call-schedule-detail.png"
                alt="OpsKnight on-call schedule detail screen showing timeline rotations and responder shifts"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Deployment Topologies for On-Call Operations */}
      <section className="site-section site-white">
        <div className="site-container">
          <div className="max-w-3xl mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-[#d21a1b]">
              Architectural Topologies
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-2">
              Deploy to fit your infrastructure and reliability SLA.
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Choose the deployment architecture that balances operational simplicity with failure isolation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-[16px] border border-slate-200 bg-slate-50/50 p-6 flex flex-col justify-between">
              <div>
                <span className="font-mono text-xs font-bold text-slate-500 uppercase tracking-wide block mb-2">
                  Integrated Runtime · Fast Evaluation
                </span>
                <h3 className="text-lg font-bold text-slate-900">Single-Node Docker Compose</h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Web server, API endpoints, background worker queue, and PostgreSQL run on a single host.
                  Ideal for departmental on-call teams or evaluation environments.
                </p>
                <div className="mt-4 p-3 rounded-lg bg-slate-900 text-slate-100 font-mono text-[11px]">
                  docker compose -f deploy/compose/docker-compose.yml up -d
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-200">
                <TextLink href="/docs/v2.0.0/operate/deploy/compose/">Read Compose Guide</TextLink>
              </div>
            </div>

            <div className="rounded-[16px] border-2 border-red-200 bg-red-50/20 p-6 flex flex-col justify-between shadow-sm">
              <div>
                <span className="font-mono text-xs font-bold text-[#d21a1b] uppercase tracking-wide block mb-2">
                  Split Runtime · Production High Availability
                </span>
                <h3 className="text-lg font-bold text-slate-900">Kubernetes Helm / Split Compose</h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Isolate web/API ingestion from background alert processing and notification workers.
                  Connect to a managed, multi-AZ PostgreSQL database with horizontal pod autoscaling.
                </p>
                <div className="mt-4 p-3 rounded-lg bg-slate-900 text-slate-100 font-mono text-[11px]">
                  helm install opsknight deploy/kubernetes/helm/opsknight
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-red-200/60">
                <TextLink href="/docs/v2.0.0/operate/deploy/helm-operations/">Read Helm Operations Guide</TextLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4-Step Practical On-Call Implementation Plan */}
      <section className="site-section bg-slate-50/70 border-t border-slate-200">
        <div className="site-container">
          <div className="max-w-3xl mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-[#d21a1b]">
              Implementation Guide
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-2">
              4 Steps to Production On-Call Management
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              From fresh deployment to certified production incident paging.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <span className="font-mono text-xs font-bold text-[#d21a1b] block mb-2">01 / USERS</span>
              <h3 className="text-sm font-bold text-slate-900">Configure Responders</h3>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                Connect enterprise OIDC/SCIM or invite responders. Configure telephone numbers, emails, and device push preferences.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <span className="font-mono text-xs font-bold text-[#d21a1b] block mb-2">02 / ROTATIONS</span>
              <h3 className="text-sm font-bold text-slate-900">Build Schedules</h3>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                Create primary and secondary rotation layers with defined weekly handoffs and holiday override rules.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <span className="font-mono text-xs font-bold text-[#d21a1b] block mb-2">03 / POLICIES</span>
              <h3 className="text-sm font-bold text-slate-900">Define Escalations</h3>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                Set progressive delay timelines (e.g. 0m primary, 5m backup, 15m lead) and map alert routing rules.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <span className="font-mono text-xs font-bold text-[#d21a1b] block mb-2">04 / DRILL</span>
              <h3 className="text-sm font-bold text-slate-900">Run Synthetic Drill</h3>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                Trigger a synthetic test alert. Verify phone voice ringing, DTMF keypad acknowledgment, and Health Center logs.
              </p>
            </div>
          </div>
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
              Self-Hosted On-Call Management FAQ
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Common questions about deploying, scaling, and operating OpsKnight for on-call rotations.
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
