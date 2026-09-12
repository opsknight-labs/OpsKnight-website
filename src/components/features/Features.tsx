import Link from "next/link";
import {
  AlertTriangle,
  BarChart3,
  Calendar,
  GitBranch,
  Globe,
  Smartphone,
} from "lucide-react";
import { BRAND } from "@/lib/brand";

const items = [
  {
    n: "01",
    icon: AlertTriangle,
    title: "Incident command",
    body: "Open, ack, assign, resolve. Related alerts can share a fingerprint so one person is not paged for every downstream symptom.",
  },
  {
    n: "02",
    icon: Calendar,
    title: "On-call schedules",
    body: "Rotations, timezones, and last-minute swaps. The active layer is who gets the first message.",
  },
  {
    n: "03",
    icon: GitBranch,
    title: "Escalation and paging",
    body: "Email, SMS (Twilio or SNS), Slack, WhatsApp, push, or a webhook. If they miss it, the policy moves on. No native voice calls.",
  },
  {
    n: "04",
    icon: Globe,
    title: "Customer status page",
    body: "Public, restricted, or private. Optional custom domain and email subscribe. One page per install.",
    href: BRAND.links.status,
  },
  {
    n: "05",
    icon: BarChart3,
    title: "Analytics and SLA",
    body: "MTTA, MTTR, and compliance on your Postgres. You read the numbers; OpsKnight does not invent a postmortem.",
  },
  {
    n: "06",
    icon: Smartphone,
    title: "Ack from a phone",
    body: "Install the site on the home screen. Same login as desktop. Not a separate app-store product.",
  },
];

export function Features() {
  return (
    <section id="features" className="border-b border-slate-200 bg-[#f8fafc] py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="mb-3 font-mono text-[11px] font-medium tracking-wide text-slate-500">
            What you get
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-[#111827] sm:text-4xl">
            The night, in one install.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#4b5563]">
            {BRAND.license} Community software. You host it and control the data plane.
            Separately licensed Enterprise or hosted offerings can add commercial capabilities without changing rights to published Community releases.
          </p>
        </div>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => {
            const Icon = item.icon;
            const card = (
              <article className="group relative flex h-full flex-col rounded-[16px] border border-slate-200/80 bg-white p-6 shadow-[0_1px_0_rgba(15,23,42,0.04)] transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-[0_12px_24px_-16px_rgba(15,23,42,0.35)] md:p-7">
                <div className="mb-5 flex items-start justify-between">
                  <span className="flex h-10 w-10 items-center justify-center rounded-[12px] bg-[#d21a1b]/[0.08] ring-1 ring-[#d21a1b]/15">
                    <Icon className="h-[18px] w-[18px] text-[#d21a1b]" strokeWidth={1.75} />
                  </span>
                  <span className="font-mono text-[11px] text-slate-300 transition-colors group-hover:text-slate-400">
                    {item.n}
                  </span>
                </div>
                <h3 className="text-[17px] font-semibold tracking-tight text-[#111827]">{item.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-[#4b5563]">{item.body}</p>
                {item.href ? (
                  <span className="mt-4 text-sm font-medium text-[#d21a1b] opacity-0 transition-opacity group-hover:opacity-100">
                    See how it ships →
                  </span>
                ) : null}
              </article>
            );

            return (
              <li key={item.title}>
                {item.href ? (
                  <Link
                    href={item.href}
                    className="block h-full"
                    {...(item.href.startsWith("http")
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                  >
                    {card}
                  </Link>
                ) : (
                  card
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
