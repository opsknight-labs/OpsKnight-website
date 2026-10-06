"use client";

import { Fragment, useState } from "react";
import {
  COMPARE_AS_OF,
  COMPARE_SECTIONS,
  COMPARE_SOURCES,
  COMPARE_VENDORS,
  type CompareSectionId,
  type CompareVendorId,
} from "@/lib/compare-matrix";

const competitorVendors = COMPARE_VENDORS.filter(
  (vendor) => vendor.id !== "opsknight",
);

export function ComparisonMatrix() {
  const [section, setSection] = useState<CompareSectionId | "all">("all");
  const [vendor, setVendor] = useState<CompareVendorId>("pagerduty");

  const sections =
    section === "all"
      ? COMPARE_SECTIONS
      : COMPARE_SECTIONS.filter((item) => item.id === section);
  const selectedVendor =
    competitorVendors.find((item) => item.id === vendor) ??
    competitorVendors[0];

  return (
    <div className="comparison-experience">
      <div className="comparison-toolbar">
        <div>
          <p className="site-eyebrow">CAPABILITY MATRIX · VERIFIED {COMPARE_AS_OF}</p>
          <p>
            Use the filters to focus on the operating choices that matter to
            your team. Vendor packaging changes; linked primary sources remain
            the authority.
          </p>
        </div>
        <div className="comparison-filters" role="group" aria-label="Comparison area">
          <button
            aria-pressed={section === "all"}
            onClick={() => setSection("all")}
          >
            All
          </button>
          {COMPARE_SECTIONS.map((item) => (
            <button
              key={item.id}
              aria-pressed={section === item.id}
              onClick={() => setSection(item.id)}
            >
              {item.title.replace("Ownership & operating model", "Ownership").replace("On-call & incident response", "Response").replace("Integrations & platform", "Platform").replace("Identity & governance", "Identity")}
            </button>
          ))}
        </div>
      </div>

      <div className="comparison-desktop">
        <table>
          <thead>
            <tr>
              <th>Capability</th>
              {COMPARE_VENDORS.map((item) => (
                <th
                  key={item.id}
                  className={item.id === "opsknight" ? "is-opsknight" : ""}
                >
                  {item.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sections.map((group) => (
              <Fragment key={group.id}>
                <tr className="comparison-section-row">
                  <td colSpan={COMPARE_VENDORS.length + 1}>{group.title}</td>
                </tr>
                {group.rows.map((row) => (
                  <tr key={row.feature}>
                    <th scope="row">
                      {row.feature}
                      {row.note ? <small>{row.note}</small> : null}
                    </th>
                    {COMPARE_VENDORS.map((item) => (
                      <td
                        key={item.id}
                        className={item.id === "opsknight" ? "is-opsknight" : ""}
                      >
                        {row.values[item.id]}
                      </td>
                    ))}
                  </tr>
                ))}
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>

      <div className="comparison-mobile">
        <label>
          Compare OpsKnight with
          <select
            value={selectedVendor.id}
            onChange={(event) =>
              setVendor(event.target.value as CompareVendorId)
            }
          >
            {competitorVendors.map((item) => (
              <option key={item.id} value={item.id}>
                {item.label}
              </option>
            ))}
          </select>
        </label>

        {sections.map((group) => (
          <section key={group.id}>
            <h3>{group.title}</h3>
            <div className="comparison-mobile-rows">
              {group.rows.map((row) => (
                <article key={row.feature}>
                  <h4>{row.feature}</h4>
                  {row.note ? <p className="comparison-note">{row.note}</p> : null}
                  <div>
                    <strong>OpsKnight</strong>
                    <p>{row.values.opsknight}</p>
                  </div>
                  <div>
                    <strong>{selectedVendor.label}</strong>
                    <p>{row.values[selectedVendor.id]}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>

      <div className="comparison-sources">
        <div>
          <p className="site-eyebrow">PRIMARY SOURCES</p>
          <p>
            Vendor claims are summarized for evaluation, not presented as a
            purchasing contract. Check the current provider documentation
            before making a decision.
          </p>
        </div>
        <div>
          {COMPARE_SOURCES.map((source) => (
            <a
              key={`${source.vendor}-${source.label}`}
              href={source.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>{source.vendor}</span>
              {source.label} ↗
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
