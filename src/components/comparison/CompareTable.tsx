"use client";

import { useState, Fragment } from "react";
import { Check, Minus, Filter } from "lucide-react";
import {
  COMPARE_SECTIONS,
  COMPARE_VENDORS,
  compareRowVerifiedAt,
  type CompareCell,
  type CompareVendorId,
} from "@/lib/compare-matrix";

const CATEGORIES = [
  { id: "all", label: "All Capabilities" },
  { id: "deployment", label: "Deployment & Ownership" },
  { id: "response", label: "Incident Response" },
  { id: "paging", label: "On-Call & Paging" },
  { id: "collaboration", label: "ChatOps & Comms" },
  { id: "status", label: "Status Pages" },
  { id: "analytics", label: "Reviews & Analytics" },
  { id: "identity", label: "Identity & Security" },
  { id: "integrations", label: "Integrations & APIs" },
] as const;

function Cell({ value, highlight }: { value: CompareCell; highlight?: boolean }) {
  if (value === true) {
    return (
      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-red-50 text-[#d21a1b]">
        <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
      </span>
    );
  }
  if (value === false) {
    return (
      <span className="inline-flex h-6 w-6 items-center justify-center text-slate-300">
        <Minus className="h-3.5 w-3.5" />
      </span>
    );
  }
  return (
    <span
      className={`text-xs leading-snug ${highlight ? "font-medium text-slate-900" : "text-slate-600"}`}
    >
      {value}
    </span>
  );
}

export function CompareTable() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [mobileVendor, setMobileVendor] = useState<CompareVendorId>("pagerduty");

  const filteredSections = COMPARE_SECTIONS.map((section) => ({
    ...section,
    rows: section.rows.filter((row) => {
      if (selectedCategory === "all") return true;
      return row.category === selectedCategory;
    }),
  })).filter((section) => section.rows.length > 0);

  const selectedVendorObj = COMPARE_VENDORS.find((v) => v.id === mobileVendor) || COMPARE_VENDORS[1];

  return (
    <div className="space-y-6">
      {/* Category filter pills */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 flex items-center gap-1.5 mr-1">
          <Filter size={13} /> Filter:
        </span>
        {CATEGORIES.map((cat) => {
          const active = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`rounded-full px-3.5 py-1.5 min-h-[32px] text-xs font-medium transition-all ${
                active
                  ? "bg-[#d21a1b] text-white shadow-sm"
                  : "bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:bg-slate-50"
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Mobile & tablet comparison: Dropdown selector + 2-column cards */}
      <div className="block xl:hidden">
        <div className="mb-4 rounded-[14px] border border-slate-200 bg-white p-4">
          <label htmlFor="mobile-vendor-select" className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
            Compare OpsKnight with:
          </label>
          <select
            id="mobile-vendor-select"
            value={mobileVendor}
            onChange={(e) => setMobileVendor(e.target.value as CompareVendorId)}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-900 focus:border-[#d21a1b] focus:outline-none focus:ring-1 focus:ring-[#d21a1b]"
          >
            {COMPARE_VENDORS.filter((v) => v.id !== "opsknight").map((v) => (
              <option key={v.id} value={v.id}>
                {v.label}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-6">
          {filteredSections.map((section) => (
            <div key={section.title} className="rounded-[14px] border border-slate-200 bg-white overflow-hidden shadow-sm">
              <h3 className="bg-slate-50 px-4 py-2.5 border-b border-slate-200 font-semibold text-xs uppercase tracking-wider text-slate-600">
                {section.title}
              </h3>
              <div className="divide-y divide-slate-100">
                {section.rows.map((row) => (
                  <div key={row.feature} className="p-4 space-y-3">
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">{row.feature}</h4>
                      {row.source && (
                        <>
                          <p className="mt-0.5 text-[11px] text-slate-500">{row.source}</p>
                          <p className="mt-1 text-[10px] font-mono uppercase tracking-wider text-slate-600">
                            Verified {compareRowVerifiedAt(row)}
                          </p>
                        </>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-3 pt-1">
                      <div className="rounded-lg bg-red-50/60 border border-red-100 p-2.5">
                        <span className="block text-[10px] font-bold uppercase tracking-wider text-[#d21a1b] mb-1">
                          OpsKnight
                        </span>
                        <Cell value={row.values.opsknight} highlight />
                      </div>
                      <div className="rounded-lg bg-slate-50 border border-slate-200/70 p-2.5">
                        <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                          {selectedVendorObj.label}
                        </span>
                        <Cell value={row.values[mobileVendor]} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Desktop matrix: 7-vendor full table (>=1280px) */}
      <div
        className="hidden xl:block overflow-x-auto rounded-[14px] border border-slate-200 bg-white shadow-sm"
        role="region"
        aria-label="Seven-vendor capability comparison"
        tabIndex={0}
      >
        <table className="w-full min-w-[1080px] border-collapse text-left">
          <thead>
            <tr className="border-b border-slate-200">
              <th className="sticky left-0 z-20 bg-slate-50 px-4 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-500">
                Capability
              </th>
              {COMPARE_VENDORS.map((vendor) => (
                <th
                  key={vendor.id}
                  className={
                    vendor.highlight
                      ? "border-x border-slate-200 bg-red-50/80 px-3.5 py-3.5 text-sm font-bold text-[#d21a1b]"
                      : "bg-slate-50 px-3 py-3.5 text-sm font-semibold text-slate-700"
                  }
                >
                  {vendor.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredSections.map((section) => (
              <Fragment key={section.title}>
                <tr className="border-t border-slate-200">
                  <td
                    colSpan={COMPARE_VENDORS.length + 1}
                    className="bg-slate-50/90 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-slate-600"
                  >
                    {section.title}
                  </td>
                </tr>
                {section.rows.map((row) => (
                  <tr key={`${section.title}-${row.feature}`} className="border-t border-slate-100 hover:bg-slate-50/50 transition-colors">
                    <td className="sticky left-0 z-10 bg-white px-4 py-3.5 align-top">
                      <p className="text-sm font-semibold text-slate-900">{row.feature}</p>
                      {row.source ? (
                        <>
                          <p className="mt-1 max-w-[14rem] text-[11px] leading-snug text-slate-500">{row.source}</p>
                          <p className="mt-1 text-[10px] font-mono uppercase tracking-wider text-slate-600">
                            Verified {compareRowVerifiedAt(row)}
                          </p>
                        </>
                      ) : null}
                    </td>
                    {COMPARE_VENDORS.map((vendor) => (
                      <td
                        key={vendor.id}
                        className={
                          vendor.highlight
                            ? "border-x border-slate-100 bg-red-50/30 px-3.5 py-3.5 align-top"
                            : "px-3 py-3.5 align-top"
                        }
                      >
                        <Cell value={row.values[vendor.id]} highlight={vendor.highlight} />
                      </td>
                    ))}
                  </tr>
                ))}
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
