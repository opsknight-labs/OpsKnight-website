"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Github } from "lucide-react";
import { BRAND } from "@/lib/brand";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-slate-200 bg-[#f8fafc] pt-24 pb-16 md:pt-28 md:pb-20">
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div
          className="absolute inset-0 opacity-[0.4]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(15, 23, 42, 0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(15, 23, 42, 0.045) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div className="absolute -top-24 right-[-8%] h-[28rem] w-[28rem] rounded-full bg-[#d21a1b]/[0.07] blur-3xl" />
        <div className="absolute bottom-[-20%] left-[-10%] h-[22rem] w-[22rem] rounded-full bg-slate-400/20 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-14">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/10 px-3 py-1 text-xs font-semibold text-red-600">
              <span className="flex h-2 w-2 rounded-full bg-red-500 animate-pulse" />
              <span>Voice Calls · Teams &amp; Slack War Rooms · {BRAND.name} {BRAND.version}</span>
            </div>

            <h1 className="mb-6 max-w-xl text-3xl font-bold leading-[1.12] tracking-tight text-[#111827] sm:text-5xl lg:text-[3.25rem]">
              The 2am page should live on your servers — not in a SaaS you rent per person.
            </h1>

            <p className="max-w-xl text-base leading-relaxed text-[#4b5563] sm:text-lg">
              When production breaks, OpsKnight places automated voice calls, sends SMS &amp; push alerts to whoever is on call, opens Slack or Microsoft Teams war rooms, and gives customers a live status page. Afterward you write what happened. One product. Your machines.
            </p>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-500">
              Built for teams that already run Postgres and would rather operate an incident command center than pay per seat. Direct wholesale Twilio voice &amp; SMS. Zero external phone-home.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/install"
                className="inline-flex h-12 w-full items-center justify-center rounded-[12px] bg-[#d21a1b] px-7 text-sm font-semibold tracking-wide text-white shadow-sm shadow-red-700/20 transition-all hover:bg-[#b41516] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d21a1b] sm:w-auto"
              >
                Install
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link
                href={BRAND.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 w-full items-center justify-center rounded-[12px] border border-slate-200 bg-white px-6 text-sm font-semibold text-slate-800 shadow-sm hover:bg-slate-50 sm:w-auto"
              >
                <Github className="mr-2 h-4 w-4" />
                GitHub
              </Link>
              <Link
                href={BRAND.links.status}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 w-full items-center justify-center gap-2.5 rounded-[12px] border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-700 shadow-sm transition-all hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 sm:w-auto"
              >
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                <span>Live status</span>
              </Link>
            </div>

            <dl className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {[
                { label: "License", value: BRAND.license },
                { label: "Paging", value: "Voice · SMS · Push" },
                { label: "Parsers", value: `${BRAND.integrationCountLabel} Ingests` },
                { label: "Deploy", value: "Compose / Helm / Swarm" },
              ].map((item) => (
                <div key={item.label}>
                  <dt className="font-mono text-[10px] uppercase tracking-wide text-slate-400">{item.label}</dt>
                  <dd className="mt-1 text-sm font-semibold text-[#111827]">{item.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative">
            <div className="absolute -inset-3 rounded-[22px] bg-gradient-to-br from-[#d21a1b]/15 via-transparent to-slate-400/20 blur-xl" aria-hidden />
            <div className="relative overflow-hidden rounded-[16px] border border-slate-800 bg-[#0f172a] shadow-2xl shadow-slate-900/20">
              <div className="flex items-center gap-2 border-b border-slate-800 px-4 py-2.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#ef4444]/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#f59e0b]/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#22c55e]/80" />
                <span className="ml-3 truncate font-mono text-[11px] text-slate-400">
                  Command center · {BRAND.name} {BRAND.version}
                </span>
              </div>
              <Image
                src={BRAND.assets.dashboard}
                alt="OpsKnight command center on a real install — open incidents, on-call, and MTTA/MTTR"
                width={1600}
                height={1000}
                priority
                className="h-auto w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
