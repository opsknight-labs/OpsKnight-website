"use client";

import { useState, type CSSProperties } from "react";
import Link from "next/link";
import Image from "next/image";
import * as Dialog from "@radix-ui/react-dialog";
import { ArrowRight, ExternalLink, Maximize2, X } from "lucide-react";
import { PRODUCT, productImage } from "@/lib/product";
import { BRAND } from "@/lib/brand";

const assetFor = (image: string) =>
  PRODUCT.screenshots.assets[
    image.replace(/\.png$/, "") as keyof typeof PRODUCT.screenshots.assets
  ];

export interface ProductProofAnnotation {
  tag: string;
  title: string;
  detail: string;
}

export interface ProductProofItem {
  id: string;
  num: string;
  label: string;
  headline: string;
  image: string;
  href: string;
  summary: string;
  alt: string;
  live?: boolean;
  facts: string[];
  annotations: ProductProofAnnotation[];
}

export const PRODUCT_PROOFS: ProductProofItem[] = [
  {
    id: "command-center",
    num: "01",
    label: "Command Center",
    headline: "Incident Command Center",
    image: "dashboard-overview.png",
    href: "/product/",
    summary:
      "Live triage, active alerts, workload distribution, and SLA countdowns across Northstar services.",
    alt: "OpsKnight Command Center displaying live triage, active alerts, workload distribution, and SLA countdowns",
    facts: [
      "Breach countdown timers",
      "Squad workload distribution",
      "Inbound alert deduplication",
    ],
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
        title: "Inbound Alert Deduplication",
        detail:
          "Continuous deduplication of incoming telemetry and webhook events before generating actionable incidents.",
      },
    ],
  },
  {
    id: "incidents",
    num: "02",
    label: "Incidents",
    headline: "Incident Workspace & Timeline",
    image: "incident-detail.png",
    href: "/product/incidents/",
    summary:
      "Checkout API incident in acknowledged state: assigned commander, active investigation, and live event timeline.",
    alt: "OpsKnight Checkout API incident in acknowledged state: assigned responder, active investigation, and live event timeline",
    facts: [
      "Assigned incident commander",
      "Correlated metric spikes",
      "Immutable audit timeline",
    ],
    annotations: [
      {
        tag: "Ownership",
        title: "Assigned Incident Commander",
        detail:
          "Role-based assignment coordinating the outage with real-time status syncing and escalation fencing.",
      },
      {
        tag: "Telemetry",
        title: "Correlated Metric & Trace Spikes",
        detail:
          "Pinned service latency and HTTP error rate metrics directly beside the active incident workspace.",
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
    num: "03",
    label: "On-call",
    headline: "Follow-The-Sun On-Call Coverage",
    image: "on-call-schedule-detail.png",
    href: "/product/on-call/",
    summary:
      "Commerce Primary On-Call rotation and schedule detail from the Northstar Systems fixture.",
    alt: "OpsKnight Commerce Primary On-Call schedule in the Northstar Systems fixture",
    facts: [
      "DST-safe rotations",
      "Self-service shift overrides",
      "Continuous schedule validation",
    ],
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
        title: "DST-Safe Handoff Boundaries",
        detail:
          "Timezone-aware shift transitions maintain continuous coverage across daylight saving adjustments.",
      },
    ],
  },
  {
    id: "paging",
    num: "04",
    label: "Paging",
    headline: "Multi-Channel Escalation Policies",
    image: "notification-settings.png",
    href: "/product/paging/",
    summary:
      "Multi-channel paging and escalation policy with on-call rotation targets and delivery rules.",
    alt: "OpsKnight escalation policy and multi-channel paging in the Northstar Systems fixture",
    facts: [
      "Cascading escalation paths",
      "Auditable delivery logs",
      "Urgent paging quiet-hours bypass",
    ],
    annotations: [
      {
        tag: "Multi-Channel",
        title: "Cascading Escalation Paths",
        detail:
          "Push notification, SMS, and automated voice phone call progression until explicit acknowledgement.",
      },
      {
        tag: "Delivery Audit",
        title: "Auditable Delivery Logs",
        detail:
          "Durable delivery intent tracking, per-channel provider attempts, and outcome callback reconciliation.",
      },
      {
        tag: "Policy Control",
        title: "Quiet Hours & Severity Routing",
        detail:
          "Low-urgency notifications respect personal quiet hours, while urgent incident paging bypasses suppression.",
      },
    ],
  },
  {
    id: "status",
    num: "05",
    label: "Status",
    headline: "Customer Status Pages",
    image: "status-pages.png",
    href: "/product/status-pages/",
    summary:
      "Real-time system status, operational services, uptime history and active incident announcements.",
    alt: "OpsKnight public status page displaying real-time system status, operational services, uptime history, and active incident announcements",
    live: true,
    facts: [
      "Decoupled public ingress",
      "Multi-channel subscriber alerts",
      "90-day uptime metrics",
    ],
    annotations: [
      {
        tag: "Decoupled",
        title: "Independent Public Ingress",
        detail:
          "Public status pages run isolated from internal application traffic so updates broadcast during outages.",
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
    num: "06",
    label: "Analytics",
    headline: "Response Velocity & 5-Whys Learning",
    image: "analytics-overview.png",
    href: "/product/analytics/",
    summary:
      "MTTA/MTTR response metrics, incident volume, and operational trends from the Northstar dataset.",
    alt: "OpsKnight analytics overview for the Northstar Systems synthetic fixture",
    facts: [
      "MTTA & MTTR trending",
      "Alert noise detection",
      "Blameless 5-Whys tracking",
    ],
    annotations: [
      {
        tag: "Velocity",
        title: "MTTA & MTTR Trending",
        detail:
          "Median time to acknowledge and median time to resolve calculated across teams and severities.",
      },
      {
        tag: "Fatigue Analysis",
        title: "Alert Flapping & Noise Detection",
        detail:
          "Flags noisy monitoring triggers and un-actioned alerts to reduce on-call responder fatigue.",
      },
      {
        tag: "Learning",
        title: "Postmortem Action Tracking",
        detail:
          "Tracks blameless 5-Whys postmortem turnaround and closure of preventative remediation action items.",
      },
    ],
  },
  {
    id: "operations",
    num: "07",
    label: "Operations",
    headline: "System Health Center & Runtime Diagnostics",
    image: "health-center.png",
    href: "/product/operations/",
    summary:
      "System Health Center diagnostics, background worker status, and runtime telemetry.",
    alt: "OpsKnight System Health Center in the Northstar Systems v2.0.0 fixture",
    facts: [
      "PgBouncer connection pools",
      "Dedicated worker runtime roles",
      "Prometheus metrics & logs",
    ],
    annotations: [
      {
        tag: "Diagnostics",
        title: "System Health Center",
        detail:
          "Comprehensive diagnostics probing database latency, connection pools, and delivery gateways.",
      },
      {
        tag: "Runtime",
        title: "Dedicated Worker Runtime Roles",
        detail:
          "Independent worker processes separating critical notification jobs from general and bulk background tasks.",
      },
      {
        tag: "Verification",
        title: "Webhook Signature Auditing",
        detail:
          "Operational metrics verifying incoming cryptographic signature validity across integrated sources.",
      },
    ],
  },
];

export function ProductProofShowcase() {
  const [activeId, setActiveId] = useState<string>("on-call");
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const active =
    PRODUCT_PROOFS.find((proof) => proof.id === activeId) ?? PRODUCT_PROOFS[0];

  const handleKeyDown = (e: React.KeyboardEvent, currentIndex: number) => {
    let targetIndex: number | null = null;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      targetIndex = (currentIndex + 1) % PRODUCT_PROOFS.length;
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      targetIndex =
        (currentIndex - 1 + PRODUCT_PROOFS.length) % PRODUCT_PROOFS.length;
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

  const asset = assetFor(active.image);

  const activeIndex = PRODUCT_PROOFS.findIndex((p) => p.id === active.id);

  return (
    <div className="pp" style={{ "--i": activeIndex } as CSSProperties}>
      {/* Contact sheet: every view, one click away */}
      <div
        className="pp-index"
        role="tablist"
        aria-label="OpsKnight product views"
        aria-orientation="vertical"
      >
        <span className="pp-index-marker" aria-hidden="true" />
        {PRODUCT_PROOFS.map((proof, idx) => {
          const thumb = assetFor(proof.image);
          return (
            <button
              key={proof.id}
              id={`proof-tab-${proof.id}`}
              type="button"
              role="tab"
              aria-selected={active.id === proof.id}
              aria-controls="product-proof-panel"
              tabIndex={active.id === proof.id ? 0 : -1}
              className="pp-tab"
              onClick={() => setActiveId(proof.id)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
            >
              <span className="pp-tab-thumb" aria-hidden="true">
                <Image
                  src={productImage(proof.image)}
                  width={thumb?.width ?? 1440}
                  height={thumb?.height ?? 900}
                  alt=""
                  sizes="72px"
                />
              </span>
              <span className="pp-tab-num">{proof.num}</span>
              <span className="pp-tab-label">{proof.label}</span>
            </button>
          );
        })}
      </div>

      <div
        id="product-proof-panel"
        className="pp-panel"
        role="tabpanel"
        tabIndex={0}
        aria-labelledby={`proof-tab-${active.id}`}
      >
        <div
          className="pp-stage"
          role="region"
          tabIndex={0}
          aria-label="Product screenshot"
        >
          <div
            className="pp-stage-inner"
            style={{ "--ar": `${asset?.width ?? 16} / ${asset?.height ?? 10}` } as CSSProperties}
          >
            {PRODUCT_PROOFS.map((proof, idx) => {
              const a = assetFor(proof.image);
              return (
                <Image
                  key={proof.id}
                  src={productImage(proof.image)}
                  width={a?.width ?? 1440}
                  height={a?.height ?? 900}
                  alt={proof.id === active.id ? proof.alt : ""}
                  aria-hidden={proof.id !== active.id || undefined}
                  data-active={proof.id === active.id || undefined}
                  style={{ "--o": idx } as CSSProperties}
                  sizes="(max-width: 899px) 900px, 980px"
                />
              );
            })}
          </div>
          <button
            type="button"
            className="pp-inspect"
            onClick={() => setLightboxOpen(true)}
            aria-label={`Inspect fullscreen: ${active.label} screenshot`}
          >
            <Maximize2 size={14} aria-hidden="true" />
            <span>Inspect</span>
          </button>
          <span className="pp-stage-count" aria-hidden="true">
            {active.num} / 07
          </span>
        </div>
        <p className="proof-pan-hint">Tap Inspect for the full-resolution view.</p>

        <div key={active.id} className="pp-caption">
          <div className="pp-caption-head">
            <h3>{active.headline}</h3>
            <p>{active.summary}</p>
            <div className="pp-caption-links">
              <Link href={active.href} className="site-text-link">
                Explore {active.label} <ArrowRight size={15} />
              </Link>
              {active.live ? (
                <a href={BRAND.links.status} target="_blank" rel="noopener noreferrer" className="site-text-link">
                  Live status <ExternalLink size={13} />
                </a>
              ) : null}
            </div>
          </div>
          <ol className="pp-notes">
            {active.annotations.map((note, i) => (
              <li key={note.title} style={{ "--n": i } as CSSProperties}>
                <span>{note.tag}</span>
                <strong>{note.title}</strong>
                <p>{note.detail}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* 3. Fullscreen Inspection Lightbox Dialog */}
      <Dialog.Root open={lightboxOpen} onOpenChange={setLightboxOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="proof-lightbox-overlay" />
          <Dialog.Content
            className="proof-lightbox-content"
            aria-label={`${active.label} screenshot inspection`}
          >
            <Dialog.Description className="sr-only">
              Full-resolution view of {active.headline}
            </Dialog.Description>
            <div className="proof-lightbox-head">
              <div className="flex items-center gap-3">
                <span className="signal-dot" />
                <Dialog.Title className="proof-lightbox-title">
                  {active.headline}
                </Dialog.Title>
                <span className="proof-lightbox-sub">
                  Northstar Systems v{PRODUCT.release.version} fixture
                </span>
              </div>
              <Dialog.Close asChild>
                <button
                  type="button"
                  className="proof-lightbox-close"
                  aria-label="Close fullscreen inspection"
                >
                  <X size={18} />
                </button>
              </Dialog.Close>
            </div>
            <div className="proof-lightbox-body">
              <Image
                src={productImage(active.image)}
                width={asset ? asset.width : 2400}
                height={asset ? asset.height : 1290}
                alt={active.alt}
                quality={95}
                className="proof-lightbox-img"
              />
            </div>
            <div className="proof-lightbox-foot">
              <p className="proof-lightbox-caption">{active.summary}</p>
              <div className="proof-lightbox-meta">
                <span>{active.facts.join(" · ")}</span>
              </div>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
