import Link from "next/link";
import { ArrowRight } from "lucide-react";

const facts = [
  {
    title: "You operate Community",
    body: "The Community data plane is self-hosted in your environment. Enterprise modules or hosted offerings can be packaged separately.",
  },
  {
    title: "Paging is text, chat, and push",
    body: "Email, SMS (Twilio or SNS), Slack, WhatsApp, webhooks. No native voice calls in the current Community capability set.",
  },
  {
    title: "One Community status page per install",
    body: "Public or private, optional custom domain. Additional status-page capabilities can be packaged separately in future offerings.",
  },
  {
    title: "Events API v2 ingest",
    body: "Keep routing keys; change the destination URL. That is an adapter, not a PagerDuty clone of the whole product.",
  },
];

export function Comparison() {
  return (
    <section className="border-b border-slate-200 bg-[#f8fafc] py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="mb-3 font-mono text-[11px] font-medium tracking-wide text-slate-500">
            Versus the usual stack
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-[#111827] sm:text-4xl">
            Incident response on infrastructure you operate.
          </h2>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {facts.map((fact) => (
            <div key={fact.title} className="rounded-[14px] border border-slate-200 bg-white p-6">
              <h3 className="text-base font-semibold text-[#111827]">{fact.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#4b5563]">{fact.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <Link
            href="/compare"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#d21a1b] hover:underline"
          >
            Full capability matrix
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
