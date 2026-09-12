"use client";

import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { BRAND } from "@/lib/brand";

const features = [
  "Self-hosted Community incident response and on-call",
  "Schedules, paging, Slack rooms, status page, and write-ups",
  `${BRAND.integrationCountLabel} inbound monitoring parsers`,
  "Install on a phone from the browser",
  "Jira Cloud sync",
  `${BRAND.license} Community source — you host it`,
];

export function Pricing() {
  return (
    <section id="pricing" className="border-b border-slate-200 bg-[#f8fafc] py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="mb-3 font-mono text-[11px] font-medium tracking-wide text-slate-500">
            Community
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-[#111827] sm:text-4xl">
            Self-hosted Community. Clear commercial boundaries.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#4b5563]">
            The v1.5 Community line is {BRAND.license}. Separately licensed Enterprise modules,
            support, or hosted services may be offered independently without changing the rights
            attached to published Community releases.
          </p>
        </div>

        <div className="mt-10 overflow-hidden rounded-[16px] border border-slate-200/80 bg-white shadow-[0_1px_0_rgba(15,23,42,0.04)]">
          <div className="grid lg:grid-cols-[minmax(16rem,0.9fr)_minmax(0,1.4fr)]">
            <div className="flex flex-col justify-between border-b border-slate-200 p-7 lg:border-b-0 lg:border-r md:p-8">
              <div>
                <p className="font-mono text-[11px] text-slate-400">Community · self-hosted</p>
                <p className="mt-3 text-3xl font-semibold tracking-tight text-[#111827]">Open source</p>
                <p className="mt-2 text-sm text-[#4b5563]">
                  Community edition · {BRAND.license} · your infrastructure
                </p>
              </div>
              <div className="mt-8 flex flex-col gap-3">
                <Link
                  href="/install"
                  className="inline-flex h-11 items-center justify-center rounded-[12px] bg-[#d21a1b] px-6 text-sm font-semibold text-white hover:bg-[#b41516]"
                >
                  Install Community
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <Link
                  href="/compare"
                  className="text-sm font-medium text-slate-600 hover:text-slate-900 hover:underline"
                >
                  Compare deployment and capabilities
                </Link>
              </div>
            </div>

            <ul className="grid gap-px bg-slate-100 sm:grid-cols-2">
              {features.map((feature) => (
                <li key={feature} className="flex items-start gap-3 bg-white px-6 py-5 md:px-7">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#d21a1b]/[0.08]">
                    <Check className="h-3 w-3 text-[#d21a1b]" strokeWidth={2.5} />
                  </span>
                  <span className="text-sm leading-relaxed text-slate-700">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
