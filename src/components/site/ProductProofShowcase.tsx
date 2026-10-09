"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import { PRODUCT } from "@/lib/product";
import { BRAND } from "@/lib/brand";
import { ProductScreenshot } from "@/components/site/Primitives";

export interface ProductProofAnnotation {
  tag: string;
  title: string;
  detail: string;
}

export interface ProductProofItem {
  id: string;
  label: string;
  image: string;
  href: string;
  summary: string;
  alt: string;
  live?: boolean;
  annotations: ProductProofAnnotation[];
}

export const PRODUCT_PROOFS: ProductProofItem[] = [
  {
    id: "command-center",
    label: "Command Center",
    image: "dashboard-overview.png",
    href: "/product/",
    summary:
      "Live triage, active alerts, workload distribution, and SLA countdowns across Northstar services.",
    alt: "OpsKnight Command Center displaying live triage, active alerts, workload distribution, and SLA countdowns",
    annotations: [
      {
        tag: "Triage & SLA",
        title: "Breach Countdown Timers",
        detail:
          "Live SLA countdowns across critical services with tier-1 auto-paging and active escalation indicators.",
      },
      {
        tag: "Workload",
        title: "Responder Load Balancing",
        detail:
          "Real-time distribution metrics across engineering squads preventing fatigue and bottlenecked triage.",
      },
      {
        tag: "Ingestion",
        title: "Sub-Second Ingestion Stream",
        detail:
          "Continuous deduplication of incoming telemetry and webhook events before generating actionable incidents.",
      },
    ],
  },
  {
    id: "incidents",
    label: "Incidents",
    image: "incident-detail.png",
    href: "/product/incidents/",
    summary:
      "Checkout API incident in acknowledged state: assigned responder, active investigation, and live event timeline.",
    alt: "OpsKnight Checkout API incident in acknowledged state: assigned responder, active investigation, and live event timeline",
    annotations: [
      {
        tag: "Ownership",
        title: "Assigned Incident Commander",
        detail:
          "Role-based assignment (Sarah Chen, Lead SRE) coordinating the checkout outage with real-time status syncing.",
      },
      {
        tag: "Telemetry",
        title: "Correlated Metric & Trace Spikes",
        detail:
          "Pinned Redis latency and HTTP 503 error rate metrics directly beside the active incident workspace.",
      },
      {
        tag: "Audit Trail",
        title: "Immutable Event Timeline",
        detail:
          "Timestamped logs of every state change, escalation hop, carrier delivery, and responder action.",
      },
    ],
  },
  {
    id: "on-call",
    label: "On-call",
    image: "on-call-schedule-detail.png",
    href: "/product/on-call/",
    summary:
      "Commerce Primary On-Call rotation and schedule detail from the Northstar Systems fixture.",
    alt: "OpsKnight Commerce Primary On-Call schedule in the Northstar Systems fixture",
    annotations: [
      {
        tag: "Rotation",
        title: "Follow-The-Sun 24/7 Coverage",
        detail:
          "Timezone-aware primary and secondary rotations with zero coverage gaps or unassigned handoffs.",
      },
      {
        tag: "Shift Swaps",
        title: "Self-Service Overrides",
        detail:
          "Responders swap shifts without managerial reconfiguration, updating active escalation targets instantly.",
      },
      {
        tag: "Validation",
        title: "Automated Gap Auditing",
        detail:
          "Continuous schedule verification alerts operators ahead of time if an upcoming shift is under-covered.",
      },
    ],
  },
  {
    id: "paging",
    label: "Paging",
    image: "notification-settings.png",
    href: "/product/paging/",
    summary:
      "Multi-channel paging and escalation policy with on-call rotation targets and delivery rules.",
    alt: "OpsKnight escalation policy and multi-channel paging in the Northstar Systems fixture",
    annotations: [
      {
        tag: "Multi-Channel",
        title: "Cascading Escalation Paths",
        detail:
          "Push notification -> SMS -> automated voice phone call progression until explicit acknowledgement.",
      },
      {
        tag: "Carrier Delivery",
        title: "Guaranteed Delivery Logs",
        detail:
          "Per-channel carrier delivery receipts, fallback gateway routing, and latency verification.",
      },
      {
        tag: "DND Bypass",
        title: "Urgency-Aware Ringing",
        detail:
          "High-priority P1/P2 pages bypass device Do-Not-Disturb profiles while P3/P4 respect sleep schedules.",
      },
    ],
  },
  {
    id: "status",
    label: "Status",
    image: "status-pages.png",
    href: "/product/status-pages/",
    summary:
      "Real-time system status, operational services, uptime history and active incident announcements.",
    alt: "OpsKnight public status page displaying real-time system status, operational services, uptime history, and active incident announcements",
    live: true,
    annotations: [
      {
        tag: "Decoupled",
        title: "Independent Public Ingress",
        detail:
          "Public status pages run isolated from internal application traffic so updates broadcast even during outages.",
      },
      {
        tag: "Broadcast",
        title: "Multi-Channel Subscriber Alerts",
        detail:
          "Automated broadcast delivery across email, webhooks, and RSS feeds on each incident phase update.",
      },
      {
        tag: "Verification",
        title: "90-Day Uptime Metrics",
        detail:
          "Service component availability calculated and displayed transparently with verifiable historical SLA data.",
      },
    ],
  },
  {
    id: "analytics",
    label: "Analytics",
    image: "analytics-overview.png",
    href: "/product/analytics/",
    summary:
      "MTTA/MTTR response metrics, incident volume, and operational trends from the Northstar dataset.",
    alt: "OpsKnight analytics overview for the Northstar Systems synthetic fixture",
    annotations: [
      {
        tag: "Velocity",
        title: "MTTA & MTTR Trending",
        detail:
          "Precise median time to acknowledge and median time to resolve calculated across teams and severities.",
      },
      {
        tag: "Fatigue Analysis",
        title: "Alert Flapping & Noise Detection",
        detail:
          "Flags noisy monitoring monitors and un-actioned alerts to reduce on-call fatigue.",
      },
      {
        tag: "Learning",
        title: "Postmortem SLA Tracking",
        detail:
          "Tracks blameless 5-Whys postmortem turnaround and closure of preventative remediation tasks.",
      },
    ],
  },
  {
    id: "operations",
    label: "Operations",
    image: "health-center.png",
    href: "/product/operations/",
    summary:
      "System Health Center diagnostics, background worker status, and runtime telemetry.",
    alt: "OpsKnight System Health Center in the Northstar Systems v2.0.0 fixture",
    annotations: [
      {
        tag: "Diagnostics",
        title: "System Health Center",
        detail:
          "Comprehensive diagnostics probing database latency, Redis connection pools, and delivery gateways.",
      },
      {
        tag: "Runtime",
        title: "Split Worker Queues",
        detail:
          "Dedicated BullMQ / Redis queues separating critical notification jobs from bulk background tasks.",
      },
      {
        tag: "Verification",
        title: "Webhook Signature Auditing",
        detail:
          "Real-time verification metrics auditing incoming signature validity across integrated sources.",
      },
    ],
  },
];

export function ProductProofShowcase() {
  const [activeId, setActiveId] = useState<string>(PRODUCT_PROOFS[0].id);
  const active =
    PRODUCT_PROOFS.find((proof) => proof.id === activeId) ?? PRODUCT_PROOFS[0];

  const handleKeyDown = (e: React.KeyboardEvent, currentIndex: number) => {
    let targetIndex: number | null = null;
    if (e.key === "ArrowRight") {
      targetIndex = (currentIndex + 1) % PRODUCT_PROOFS.length;
    } else if (e.key === "ArrowLeft") {
      targetIndex = (currentIndex - 1 + PRODUCT_PROOFS.length) % PRODUCT_PROOFS.length;
    } else if (e.key === "Home") {
      targetIndex = 0;
    } else if (e.key === "End") {
      targetIndex = PRODUCT_PROOFS.length - 1;
    }

    if (targetIndex !== null) {
      e.preventDefault();
      const target = PRODUCT_PROOFS[targetIndex];
      setActiveId(target.id);
      document.getElementById(`proof-tab-${target.id}`)?.focus();
    }
  };

  return (
    <div className="product-proof-experience">
      <div
        className="product-proof-tabs"
        role="tablist"
        aria-label="OpsKnight product views"
      >
        {PRODUCT_PROOFS.map((proof, idx) => (
          <button
            key={proof.id}
            id={`proof-tab-${proof.id}`}
            type="button"
            role="tab"
            aria-selected={active.id === proof.id}
            aria-controls="product-proof-panel"
            tabIndex={active.id === proof.id ? 0 : -1}
            onClick={() => setActiveId(proof.id)}
            onKeyDown={(e) => handleKeyDown(e, idx)}
          >
            {proof.label}
          </button>
        ))}
      </div>
      <div
        id="product-proof-panel"
        className="product-proof-panel"
        role="tabpanel"
        tabIndex={0}
        aria-labelledby={`proof-tab-${active.id}`}
      >
        <ProductScreenshot name={active.image} alt={active.alt} />

        <div
          className="product-proof-annotations"
          aria-label="Key operational controls"
        >
          {active.annotations.map((ann, i) => (
            <div key={i} className="proof-annotation-card">
              <span className="proof-annotation-badge">{ann.tag}</span>
              <strong className="proof-annotation-title">{ann.title}</strong>
              <p className="proof-annotation-detail">{ann.detail}</p>
            </div>
          ))}
        </div>

        <div className="product-proof-meta">
          <div>
            <span>REAL OPSKNIGHT UI · v{PRODUCT.release.version}</span>
            <strong>{active.label}</strong>
            <p>{active.summary}</p>
          </div>
          <div className="product-proof-actions">
            <Link href={active.href}>
              Explore {active.label} <ArrowRight size={16} />
            </Link>
            {active.live ? (
              <a
                href={BRAND.links.status}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="live-dot" /> View live status
                <ExternalLink size={14} />
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
