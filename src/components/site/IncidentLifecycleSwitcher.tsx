"use client";

import { useState } from "react";
import Image from "next/image";

const INCIDENT_STATES = [
  {
    id: "triggered",
    label: "Triggered",
    image: "/product/incident-triggered.webp",
    badge: "OPEN · P1",
    badgeColor: "#f43f5e",
    summary: "First inbound alert correlates to service and creates incident with initial owner and escalation policy.",
  },
  {
    id: "acknowledged",
    label: "Acknowledged",
    image: "/product/incident-acknowledged.webp",
    badge: "ACKNOWLEDGED",
    badgeColor: "#f59e0b",
    summary: "Responder takes ownership, investigates root cause, updates timeline, and stops next-tier paging.",
  },
  {
    id: "resolved",
    label: "Resolved",
    image: "/product/incident-resolved.webp",
    badge: "RESOLVED · SLA MET",
    badgeColor: "#10b981",
    summary: "Root cause remediated, SLA metrics met, timeline sealed with postmortem handoff and audit trail.",
  },
] as const;

export function IncidentLifecycleSwitcher() {
  const [activeTab, setActiveTab] = useState(0);
  const current = INCIDENT_STATES[activeTab];

  return (
    <div className="incident-lifecycle-box">
      <div className="incident-lifecycle-tabs" role="tablist" aria-label="Incident response lifecycle states">
        {INCIDENT_STATES.map((state, idx) => (
          <button
            key={state.id}
            type="button"
            role="tab"
            aria-selected={activeTab === idx}
            className={`lifecycle-tab ${activeTab === idx ? "active" : ""}`}
            onClick={() => setActiveTab(idx)}
          >
            <span className="lifecycle-dot" style={{ background: state.badgeColor }} />
            {state.label}
          </button>
        ))}
      </div>

      <figure className="lifecycle-figure">
        <div className="lifecycle-shot-bar">
          <span className="signal-dot" />
          <span className="lifecycle-badge" style={{ color: current.badgeColor, borderColor: `${current.badgeColor}40` }}>
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
