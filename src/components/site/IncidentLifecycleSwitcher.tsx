"use client";

import { useState } from "react";
import Image from "next/image";
import { PRODUCT } from "@/lib/product";

export function IncidentLifecycleSwitcher() {
  const lifecycleStates = PRODUCT.lifecycle;
  const [activeTab, setActiveTab] = useState(0);
  const current = lifecycleStates[activeTab];

  return (
    <div className="incident-lifecycle-box">
      <div
        className="incident-lifecycle-tabs"
        role="tablist"
        aria-label="Incident response lifecycle states"
      >
        {lifecycleStates.map((state, idx) => (
          <button
            key={state.id}
            id={`lifecycle-tab-${state.id}`}
            type="button"
            role="tab"
            aria-selected={activeTab === idx}
            aria-controls={`lifecycle-panel-${state.id}`}
            tabIndex={activeTab === idx ? 0 : -1}
            className={`lifecycle-tab ${activeTab === idx ? "active" : ""}`}
            onClick={() => setActiveTab(idx)}
            onKeyDown={(e) => {
              let next: number | null = null;
              if (e.key === "ArrowRight") {
                next = (idx + 1) % lifecycleStates.length;
              } else if (e.key === "ArrowLeft") {
                next = (idx + lifecycleStates.length - 1) % lifecycleStates.length;
              } else if (e.key === "Home") {
                next = 0;
              } else if (e.key === "End") {
                next = lifecycleStates.length - 1;
              }
              if (next !== null) {
                e.preventDefault();
                setActiveTab(next);
                document.getElementById(`lifecycle-tab-${lifecycleStates[next].id}`)?.focus();
              }
            }}
          >
            <span className="lifecycle-dot" style={{ background: state.badgeColor }} />
            {state.label}
          </button>
        ))}
      </div>

      <figure
        id={`lifecycle-panel-${current.id}`}
        role="tabpanel"
        aria-labelledby={`lifecycle-tab-${current.id}`}
        tabIndex={0}
        className="lifecycle-figure"
      >
        <div className="lifecycle-shot-bar">
          <span className="signal-dot" />
          <span
            className="lifecycle-badge"
            style={{ color: current.badgeColor, borderColor: `${current.badgeColor}40` }}
          >
            {current.badge}
          </span>
          <span className="lifecycle-desc">{current.summary}</span>
        </div>
        <Image
          src={current.image}
          width={2400}
          height={1500}
          alt={`OpsKnight incident lifecycle view: ${current.label}`}
          priority
          sizes="(max-width: 768px) 100vw, 1200px"
        />
        <figcaption>
          OpsKnight Incident Command — {current.label} state: {current.summary}
        </figcaption>
      </figure>
    </div>
  );
}
