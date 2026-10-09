import { siteMetadata } from "@/lib/site-metadata";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BRAND } from "@/lib/brand";
import { COMPETITORS } from "@/lib/competitors";
import {
  COMPARE_AS_OF,
  COMPARE_FOOTNOTE,
  COMPARE_SOURCE_LINKS,
} from "@/lib/compare-matrix";
import { CompareTable } from "@/components/comparison/CompareTable";
import { FinalCTA } from "@/components/site/Primitives";

const pageMetadata: Metadata = {
  title: "Compare Incident Management & On-Call Platforms — OpsKnight vs The Market",
  description:
    "Compare OpsKnight v2.0.0 with PagerDuty, incident.io, Opsgenie, and Grafana. An open-source, self-hosted alternative for on-call scheduling, voice paging, and incident response.",
  alternates: { canonical: "/compare/" },
  openGraph: { url: "/compare/" },
};

export const metadata = siteMetadata(pageMetadata);

export default function ComparePage() {
  return (
    <div className="site-page site-page--compare site-page--compare-index">
      {/* 1. Interior Hero */}
      <section className="interior-hero site-dark">
        <div className="site-container">
          <p className="site-eyebrow">
            <span className="signal-dot" /> COMPREHENSIVE MARKET COMPARISON · {COMPARE_AS_OF}
          </p>
          <h1>
            Compare the operating model,
            <br />
            not just the feature list.
          </h1>
          <p className="site-description">
            Evaluate OpsKnight v{BRAND.version} against PagerDuty, incident.io, Opsgenie,
            Squadcast, Splunk On-Call, and Grafana Cloud IRM across deployment ownership,
            response workflows, identity, notification channels, and commercial model.
            OpsKnight values come from the pinned release; vendor values are tied to dated public sources.
          </p>
        </div>
      </section>

      {/* 2. Direct Competitor Cards */}
      <section className="site-section site-white border-b border-slate-200">
        <div className="site-container">
          <div className="mb-6">
            <p className="site-eyebrow">DIRECT PLATFORM COMPARISONS</p>
            <h2 className="text-2xl font-bold text-slate-900">Explore vendor deep-dives</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {COMPETITORS.map((vendor) => (
              <Link
                key={vendor.slug}
                href={vendor.href}
                className="group p-5 rounded-[14px] border border-slate-200 bg-white hover:border-[#d21a1b] hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-lg text-slate-900 group-hover:text-[#d21a1b] transition-colors">
                      {vendor.name}
                    </span>
                    <span className="text-[11px] font-mono font-medium px-2.5 py-1 bg-slate-100 rounded-full text-slate-600">
                      {vendor.category}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mb-4">{vendor.commercialModel}</p>
                </div>
                <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#d21a1b] group-hover:underline">
                  OpsKnight vs {vendor.shortName} <ArrowRight size={14} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Master Capability Matrix */}
      <section className="site-section">
        <div className="site-container">
          <div className="mb-8">
            <p className="site-eyebrow">FULL SPECIFICATION AUDIT</p>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Capability &amp; Architecture Matrix
            </h2>
            <p className="mt-2 text-slate-600 max-w-3xl text-sm leading-relaxed">
              Examine side-by-side capabilities across hosting boundaries, on-call scheduling, notification channels,
              collaboration tools, and enterprise security. Filter by capability category or select a vendor on mobile.
            </p>
          </div>

          <CompareTable />

          {/* Footnote & Primary Sources */}
          <div className="mt-12 rounded-[14px] bg-slate-50 border border-slate-200 p-6 text-slate-600 text-xs">
            <p className="font-semibold text-slate-900 mb-2">Verification &amp; Integrity Notice</p>
            <p className="leading-relaxed mb-4">{COMPARE_FOOTNOTE}</p>
            <p className="font-semibold text-slate-900 mb-2">Primary Sourced Documentation</p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {COMPARE_SOURCE_LINKS.map((link) => (
                <li key={link.href} className="truncate">
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center min-h-[28px] py-1 text-[#d21a1b] hover:underline"
                  >
                    ↳ {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <FinalCTA />
    </div>
  );
}
