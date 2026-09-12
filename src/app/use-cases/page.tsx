import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Zap, MessageSquare, Layers, FileCheck } from "lucide-react";
import { BRAND } from "@/lib/brand";
import { latestDocsHref } from "@/lib/docs/paths";
import { PageToc } from "@/components/common/PageToc";

const title = "Use Cases";
const description =
  "When OpsKnight is a fit: keep incident data on your stack, scale self-hosted operations, run Slack war rooms, and maintain complete audit visibility.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/use-cases" },
  openGraph: { title, description, url: "/use-cases" },
  twitter: { title, description },
};

const TOC_SECTIONS = [
  { id: "data-sovereignty", title: "VPC Data Sovereignty" },
  { id: "flat-rate-scale", title: "Self-Hosted Scale" },
  { id: "slack-chatops", title: "Slack ChatOps & War Rooms" },
  { id: "escalation-routing", title: "Escalations & Rotations" },
  { id: "audit-compliance", title: "Compliance & Audit Readiness" },
];

const SPEC_ITEMS = [
  { label: "Deployment", value: "Self-Hosted (Docker / Helm)" },
  { label: "Community License", value: BRAND.license },
  { label: "Incident Storage", value: "Local PostgreSQL (Your VPC)" },
  { label: "Telemetry", value: "Zero External Phone-Home" },
  { label: "Current Line", value: BRAND.releaseLabel },
];

export default function UseCasesPage() {
  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <section className="border-b border-slate-200 bg-[#0f172a] pt-28 pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="mb-3 font-mono text-[11px] font-medium tracking-wide text-slate-400">
              Operational Scenarios · {BRAND.releaseLabel}
            </p>
            <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-5xl sm:leading-[1.12]">
              Built for teams that already operate a stack.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
              These are real-world operational situations OpsKnight is built for.
              Keep the Community data plane in your infrastructure, avoid mandatory external SaaS lock-in,
              and keep Community and commercial capabilities explicitly separated.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_18rem] xl:grid-cols-[minmax(0,1fr)_20rem]">
            <article className="min-w-0 space-y-16 max-w-3xl">
              <div id="data-sovereignty" className="scroll-mt-28">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-50 text-[#d21a1b]">
                    <ShieldCheck className="h-4 w-4" />
                  </div>
                  <h2 className="text-2xl font-semibold tracking-tight text-[#111827]">
                    VPC & Air-Gapped Data Sovereignty
                  </h2>
                </div>
                <p className="mt-4 text-base leading-relaxed text-[#4b5563]">
                  When production breaks, your incident logs, database stack traces, customer identifiers,
                  and postmortem root-cause notes frequently contain sensitive infrastructure details.
                  Teams in regulated environments often need incident records to stay inside infrastructure
                  they control rather than a third-party incident SaaS.
                </p>
                <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <h3 className="text-sm font-semibold text-slate-900">How OpsKnight handles this:</h3>
                  <ul className="mt-3 space-y-2 text-sm text-slate-600">
                    <li className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#d21a1b]" />
                      <span>Rotations, incident records, and timelines live in your PostgreSQL database.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#d21a1b]" />
                      <span>No mandatory product telemetry or marketing phone-home is required for the Community deployment.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#d21a1b]" />
                      <span>Deploy with private container registries and infrastructure under your control.</span>
                    </li>
                  </ul>
                  <div className="mt-5 border-t border-slate-100 pt-4">
                    <Link
                      href="/security"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#d21a1b] hover:underline"
                    >
                      Read Security & Encryption Specs
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </div>

              <div id="flat-rate-scale" className="scroll-mt-28 border-t border-slate-200 pt-12">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-50 text-[#d21a1b]">
                    <Zap className="h-4 w-4" />
                  </div>
                  <h2 className="text-2xl font-semibold tracking-tight text-[#111827]">
                    Self-Hosted On-Call at Scale
                  </h2>
                </div>
                <p className="mt-4 text-base leading-relaxed text-[#4b5563]">
                  Vendor-hosted on-call products often scale commercially with seats and add-ons.
                  OpsKnight Community gives teams a source-available-to-run, self-hosted foundation while
                  leaving room for separately licensed Enterprise capabilities where organizations need more.
                </p>
                <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <h3 className="text-sm font-semibold text-slate-900">How OpsKnight handles this:</h3>
                  <ul className="mt-3 space-y-2 text-sm text-slate-600">
                    <li className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#d21a1b]" />
                      <span>{BRAND.license} Community source can be deployed on infrastructure your team operates.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#d21a1b]" />
                      <span>Scale the Community runtime from a small Compose installation to Kubernetes as operational demand grows.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#d21a1b]" />
                      <span>Enterprise capabilities and commercial packaging can be offered separately without changing rights to already published Community releases.</span>
                    </li>
                  </ul>
                  <div className="mt-5 border-t border-slate-100 pt-4">
                    <Link
                      href="/compare"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#d21a1b] hover:underline"
                    >
                      Compare deployment and capabilities
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </div>

              <div id="slack-chatops" className="scroll-mt-28 border-t border-slate-200 pt-12">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-50 text-[#d21a1b]">
                    <MessageSquare className="h-4 w-4" />
                  </div>
                  <h2 className="text-2xl font-semibold tracking-tight text-[#111827]">
                    Slack ChatOps & Incident War Rooms
                  </h2>
                </div>
                <p className="mt-4 text-base leading-relaxed text-[#4b5563]">
                  Engineers already collaborate in Slack during active incidents. Context switching between
                  separate web dashboards, alert feeds, and chat apps slows down Mean Time to Resolution (MTTR).
                </p>
                <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <h3 className="text-sm font-semibold text-slate-900">How OpsKnight handles this:</h3>
                  <ul className="mt-3 space-y-2 text-sm text-slate-600">
                    <li className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#d21a1b]" />
                      <span>Automatically provisions dedicated Slack incident channels (for example, <code className="font-mono text-xs text-red-600">#inc-2026-payment-timeout</code>).</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#d21a1b]" />
                      <span>Interactive message buttons allow acknowledge, assign, and resolve actions directly inside Slack.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#d21a1b]" />
                      <span>Conference bridge links can be attached to the incident workflow.</span>
                    </li>
                  </ul>
                  <div className="mt-5 border-t border-slate-100 pt-4">
                    <Link
                      href={latestDocsHref("integrations/communication/slack-chatops")}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#d21a1b] hover:underline"
                    >
                      View Slack ChatOps Documentation
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </div>

              <div id="escalation-routing" className="scroll-mt-28 border-t border-slate-200 pt-12">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-50 text-[#d21a1b]">
                    <Layers className="h-4 w-4" />
                  </div>
                  <h2 className="text-2xl font-semibold tracking-tight text-[#111827]">
                    Multi-Tier Escalations & SRE Rotations
                  </h2>
                </div>
                <p className="mt-4 text-base leading-relaxed text-[#4b5563]">
                  Complex service architectures require distinct ownership boundaries. Payment, infrastructure,
                  security, and application teams can each need different on-call handoffs.
                </p>
                <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <h3 className="text-sm font-semibold text-slate-900">How OpsKnight handles this:</h3>
                  <ul className="mt-3 space-y-2 text-sm text-slate-600">
                    <li className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#d21a1b]" />
                      <span>Configurable multi-tier escalation policies with customizable step delays.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#d21a1b]" />
                      <span>Multi-channel delivery through the providers enabled in your deployment.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#d21a1b]" />
                      <span>Rotation schedules with timezone-aware handoffs and overrides.</span>
                    </li>
                  </ul>
                  <div className="mt-5 border-t border-slate-100 pt-4">
                    <Link
                      href={latestDocsHref("core-concepts/escalation-policies")}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#d21a1b] hover:underline"
                    >
                      View Escalation Policies Guide
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </div>

              <div id="audit-compliance" className="scroll-mt-28 border-t border-slate-200 pt-12">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-50 text-[#d21a1b]">
                    <FileCheck className="h-4 w-4" />
                  </div>
                  <h2 className="text-2xl font-semibold tracking-tight text-[#111827]">
                    Compliance & Enterprise Audit Readiness
                  </h2>
                </div>
                <p className="mt-4 text-base leading-relaxed text-[#4b5563]">
                  Audit and compliance programs often require teams to reconstruct who was paged, when an
                  incident was acknowledged, and what operational actions were performed.
                </p>
                <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <h3 className="text-sm font-semibold text-slate-900">How OpsKnight handles this:</h3>
                  <ul className="mt-3 space-y-2 text-sm text-slate-600">
                    <li className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#d21a1b]" />
                      <span>Audit trails capture incident state transitions and operational actions supported by the release.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#d21a1b]" />
                      <span>Authentication and SSO capabilities are documented per release and can be extended through separately licensed Enterprise functionality.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#d21a1b]" />
                      <span>Stored integration secrets and notification credentials use the security controls documented for the current release.</span>
                    </li>
                  </ul>
                  <div className="mt-5 border-t border-slate-100 pt-4">
                    <Link
                      href={latestDocsHref("security")}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#d21a1b] hover:underline"
                    >
                      Read Full Security Architecture
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </article>

            <aside className="hidden lg:block">
              <PageToc
                sections={TOC_SECTIONS}
                specs={SPEC_ITEMS}
                quickCommand="docker compose up -d"
                quickCommandLabel="Test locally with Compose"
                docLink={latestDocsHref("getting-started")}
                docLinkLabel="Installation Documentation"
              />
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
