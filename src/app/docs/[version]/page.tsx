import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDocPage, getDocFilePath } from "@/lib/docs/content";
import { getSidebar } from "@/lib/docs/sidebar";
import { DocsToc } from "@/components/docs/DocsToc";
import { DocsArticleBody } from "@/components/docs/DocsArticleBody";
import { DOC_VERSIONS } from "@/lib/docs/versions";
import { BRAND } from "@/lib/brand";
import { ArrowRight, Code2, Rocket } from "lucide-react";

export const dynamicParams = false;
export const dynamic = "force-static";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ version: string }>;
}): Promise<Metadata> {
  const { version } = await params;
  const doc = await getDocPage(version, []);
  const title = `Docs (${version})`;
  const description =
    doc?.description ||
    `Documentation for ${BRAND.name} ${version}: install, paging, incidents, and API.`;

  return {
    title,
    description,
    alternates: { canonical: `/docs/${version}/` },
    openGraph: { title, description, url: `/docs/${version}/` },
    twitter: { title, description },
  };
}

export async function generateStaticParams() {
  return DOC_VERSIONS.map((v) => ({ version: v.id }));
}

const TASK_CARDS = [
  {
    title: "Install on your machines",
    description: "Compose, Helm, and the secrets first boot needs.",
    slug: ["getting-started", "installation"],
  },
  {
    title: "Who gets paged",
    description: "Email, SMS, push, Slack, WhatsApp, webhooks — not voice.",
    slug: ["administration", "notifications"],
  },
  {
    title: "When something breaks",
    description: "Incidents, acknowledge, assign, and write what happened.",
    slug: ["core-concepts", "incidents"],
  },
  {
    title: "Slack rooms",
    description: "A channel for the incident, if this version includes ChatOps.",
    slug: ["integrations", "communication", "slack-chatops"],
  },
  {
    title: "Status page",
    description: "Tell customers what is down. One page per install.",
    slug: ["core-concepts", "status-page"],
  },
  {
    title: "API",
    description: "Events ingest and incident APIs for this version.",
    slug: ["api"],
  },
];

const V2_TASK_CARDS = [
  { title: "Install OpsKnight", description: "Start with Docker Compose or prepare a production deployment.", slug: ["start", "quickstart"] },
  { title: "Configure on-call", description: "Create schedules, rotations, and responder coverage.", slug: ["start", "configure-on-call"] },
  { title: "Configure escalation", description: "Route an unacknowledged incident through responder tiers.", slug: ["guides", "escalation", "configure-policy"] },
  { title: "Receive alerts", description: "Connect monitoring, cloud, uptime, and webhook sources.", slug: ["integrations"] },
  { title: "Connect Slack", description: "Authorize Slack, choose service channels, and use incident actions.", slug: ["integrations", "communication", "slack"] },
  { title: "Configure Microsoft Teams", description: "Connect the bot, destinations, Adaptive Cards, and war rooms.", slug: ["integrations", "communication", "microsoft-teams"] },
  { title: "Connect Jira", description: "Link Jira, map services, and configure synchronized webhooks.", slug: ["integrations", "issue-tracking", "jira"] },
  { title: "Use the Incident API", description: "Authenticate, create, read, and update incidents programmatically.", slug: ["reference", "api", "incidents"] },
  { title: "Deploy production HA", description: "Choose Kubernetes or split runtime roles and scale safely.", slug: ["operate", "deploy", "split-runtime"] },
  { title: "Fix notification delivery", description: "Trace intent creation, queues, provider attempts, retries, and failures.", slug: ["troubleshooting", "notifications", "not-delivered"] },
  { title: "Upgrade OpsKnight", description: "Back up, migrate, validate, and roll back safely.", slug: ["operate", "upgrades", "upgrade"] },
];

export default async function DocsIndexPage({
  params,
}: {
  params: Promise<{ version: string }>;
}) {
  const { version } = await params;
  const doc = await getDocPage(version, []);
  if (!doc) notFound();
  const sidebar = getSidebar(version);

  const isV2 = version.startsWith("v2");
  const cards = (isV2 ? V2_TASK_CARDS : TASK_CARDS).filter((card) => getDocFilePath(version, card.slug));
  const installHref = isV2 ? "start/production-install" : "getting-started/installation";
  const apiHref = isV2 ? "reference/api" : "api";
  const editUrl = `${BRAND.links.github}/blob/main/docs/${version}/README.md`;

  return (
    <div className="space-y-10">
      <section>
        <p className="mb-3 font-mono text-[11px] text-slate-500">
          {BRAND.name} · {version}
        </p>
        <h1 className="text-4xl font-semibold tracking-tight text-[#111827] sm:text-[2.75rem]">
          Documentation
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-[#4b5563]">
          How to run OpsKnight, page the right person, and keep a record of the
          night. Written for this version — switch in the sidebar for older
          releases.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href={`/docs/${version}/${installHref}/`}
            className="inline-flex h-11 items-center gap-2 rounded-[12px] bg-[#d21a1b] px-5 text-sm font-semibold text-white hover:bg-[#b41516]"
          >
            <Rocket className="h-4 w-4" />
            Install
          </Link>
          <Link
            href={`/docs/${version}/${apiHref}/`}
            className="inline-flex h-11 items-center gap-2 rounded-[12px] border border-slate-200 bg-white px-5 text-sm font-medium text-slate-800 hover:bg-slate-50"
          >
            <Code2 className="h-4 w-4" />
            API
          </Link>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => (
          <Link
            key={card.slug.join("/")}
            href={`/docs/${version}/${card.slug.join("/")}/`}
            className="rounded-[14px] border border-slate-200 bg-white p-5 hover:border-slate-300"
          >
            <h2 className="text-base font-semibold text-[#111827]">{card.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-[#4b5563]">
              {card.description}
            </p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-[#d21a1b]">
              Open
              <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </Link>
        ))}
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold text-[#111827]">All sections</h2>
        <div className="grid gap-2 sm:grid-cols-2">
          {sidebar.map((section) => {
            const href = section.href || section.children?.[0]?.href;
            if (!href) return null;
            return (
              <Link
                key={section.title}
                href={href}
                className="rounded-[12px] border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-800 hover:bg-slate-50"
              >
                {section.title}
              </Link>
            );
          })}
        </div>
      </section>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_17rem] xl:grid-cols-[minmax(0,1fr)_18.5rem]">
        <article className="min-w-0 rounded-[14px] border border-slate-200 bg-white p-8">
          <h2 className="mb-6 border-b border-slate-200 pb-4 text-xl font-semibold text-[#111827]">
            This version
          </h2>
          <DocsArticleBody html={doc.html} />
        </article>
        <aside className="hidden lg:block">
          <div
            className="sticky top-20 pl-2 max-h-[calc(100vh-6rem)] overflow-y-auto custom-scrollbar"
            data-toc-container
          >
            <DocsToc headings={doc.headings} editUrl={editUrl} />
          </div>
        </aside>
      </div>
    </div>
  );
}
