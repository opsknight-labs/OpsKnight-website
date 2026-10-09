"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import * as Dialog from "@radix-ui/react-dialog";
import Image from "next/image";
import { integrationLogos } from "@/lib/integration-logos";
import {
  ArrowRight,
  Check,
  PhoneCall,
  Radio,
  Bell,
  Activity,
  CalendarDays,
  MessageSquare,
  Globe,
  Terminal,
  X,
  ExternalLink,
  Copy,
  CheckCircle2,
} from "lucide-react";
import { ProductScreenshot } from "./Primitives";
import { PRODUCT, productDocs } from "@/lib/product";
import { BRAND } from "@/lib/brand";
import { copyText } from "@/lib/client-clipboard";
const steps = [
  {
    label: "Detect",
    title: "Something broke.",
    detail:
      "Datadog reports elevated checkout latency. The alert reaches the Checkout API service.",
    event: "Checkout p95 > 4.5s",
    icon: Activity,
  },
  {
    label: "Correlate",
    title: "One signal. Clear context.",
    detail:
      "Provider correlation keys help group related events instead of opening an incident for every repeat.",
    event: "Related events → same incident",
    icon: Radio,
  },
  {
    label: "Create",
    title: "Give the incident a home.",
    detail:
      "Create an incident with service context, priority and a timeline of what happened.",
    event: "INC-1042 · Checkout API · P1",
    icon: Bell,
  },
  {
    label: "On-call",
    title: "Find the right person.",
    detail:
      "Schedules and overrides resolve the on-call responder for the escalation policy.",
    event: "Primary → Maya Chen",
    icon: CalendarDays,
  },
  {
    label: "Page",
    title: "Reach the responder.",
    detail:
      "Configured channels deliver the page. Operators can inspect attempts and delivery outcomes.",
    event: "Voice · Push · SMS · Teams",
    icon: PhoneCall,
  },
  {
    label: "Acknowledge",
    title: "Someone owns the response.",
    detail:
      "The responder acknowledges the incident and takes ownership of the next step.",
    event: "Maya Chen acknowledged",
    icon: Check,
  },
  {
    label: "Coordinate",
    title: "Bring the team together.",
    detail:
      "A Slack or Teams war room keeps responders and incident context in the same conversation.",
    event: "#inc-1042-checkout",
    icon: MessageSquare,
  },
  {
    label: "Communicate",
    title: "Keep customers informed.",
    detail: "Publish a scoped update to the installation’s status page.",
    event: "Checkout → Degraded performance",
    icon: Globe,
  },
  {
    label: "Resolve",
    title: "Close the loop.",
    detail: "Resolve the incident and preserve the operational timeline.",
    event: "Checkout API recovered",
    icon: Check,
  },
  {
    label: "Learn",
    title: "Make next time better.",
    detail:
      "Review the timeline, explore response metrics and assign postmortem action items.",
    event: "Postmortem → owned follow-up",
    icon: Activity,
  },
];
const acts = [
  {
    id: "act-detect",
    num: "01",
    label: "Detect",
    summary: "Detect · Correlate · Create",
    eyebrow: "01 / DETECT",
    subtag: "NORTHSTAR SYSTEMS",
    heading: "A signal becomes something actionable.",
    description:
      "An incoming alert reaches the service through an HMAC-authenticated webhook. A matching provider correlation key connects related events into a single incident, preserving service context and response evidence.",
    stages: ["01 Detect", "02 Correlate", "03 Create"],
  },
  {
    id: "act-respond",
    num: "02",
    label: "Respond",
    summary: "On-call · Page · Acknowledge",
    eyebrow: "02 / RESPOND",
    subtag: "ON-CALL & PAGING",
    heading: "The right person. The right moment.",
    description:
      "Live schedules determine the current primary responder without guesswork. Configured paging channels deliver multi-modal alerts across voice calls, push notifications, and ChatOps. On acknowledgement, ownership transitions seamlessly.",
    stages: ["04 On-call", "05 Page", "06 Acknowledge"],
  },
  {
    id: "act-coordinate",
    num: "03",
    label: "Coordinate",
    summary: "Coordinate · Communicate",
    eyebrow: "03 / COORDINATE",
    subtag: "INTERNAL & EXTERNAL",
    heading: "Internal response. Public clarity.",
    description:
      "Engineers investigate in dedicated ChatOps channels while customers stay informed through the integrated public status page. Both live in the same unified incident system without manual status duplication.",
    stages: ["07 Coordinate", "08 Communicate"],
  },
  {
    id: "act-recover",
    num: "04",
    label: "Recover",
    summary: "Resolve · Learn",
    eyebrow: "04 / RECOVER & LEARN",
    subtag: "CONTINUOUS IMPROVEMENT",
    heading: "Resolution sealed. Experience preserved.",
    description:
      "Service is restored and the incident resolved. Complete response evidence, timing metrics, and postmortem follow-up action items remain permanently preserved.",
    stages: ["09 Resolve", "10 Learn"],
  },
];

export function IncidentLoop() {
  const [activeAct, setActiveAct] = useState(0);
  const [activeStep, setActiveStep] = useState(4);

  const scrollToAct = (index: number) => {
    setActiveAct(index);
    const target = document.getElementById(acts[index].id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) {
          const actIndex = acts.findIndex((a) => a.id === visible[0].target.id);
          if (actIndex !== -1) setActiveAct(actIndex);
        }
      },
      { rootMargin: "-15% 0px -40% 0px", threshold: [0.15, 0.4] },
    );
    acts.forEach((act) => {
      const el = document.getElementById(act.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="incident-story-container">
      {/* 1. Act Navigation / Scrubber */}
      <nav className="acts-nav-bar" aria-label="Four Acts of an Incident">
        {acts.map((act, index) => (
          <button
            key={act.id}
            aria-current={activeAct === index ? "true" : undefined}
            className={`act-nav-tab ${activeAct === index ? "is-active" : ""}`}
            onClick={() => scrollToAct(index)}
          >
            <span className="act-nav-num">{act.num}</span>
            <div className="act-nav-text">
              <strong className="act-nav-label">{act.label}</strong>
              <span className="act-nav-summary">{act.summary}</span>
            </div>
          </button>
        ))}
      </nav>

      {/* 2. Act 01: Detect */}
      <section className="act-section act-detect" id="act-detect">
        <div className="act-story-copy">
          <div className="act-header-tag">
            <span className="act-num">01 / DETECT</span>
            <span className="act-subtag">NORTHSTAR SYSTEMS</span>
          </div>
          <h3 className="act-heading">A signal becomes something actionable.</h3>
          <p className="act-description">
            An alert reaches the service through an HMAC-authenticated webhook.
            A matching provider correlation key connects related events into a single incident,
            preserving service context and response evidence.
          </p>
          <div className="act-stages-strip">
            <span className="act-stage-pill is-active">
              <span className="signal-dot" /> 01 Detect
            </span>
            <span className="act-stage-pill">02 Correlate</span>
            <span className="act-stage-pill">03 Create</span>
          </div>
        </div>

        <div className="act-visual-wrapper">
          <div className="act-card detect-card">
            <div className="act-card-head">
              <div className="flex items-center gap-2">
                <span className="signal-dot" />
                <span className="act-meta-tag">INGRESS · CHECKOUT API</span>
              </div>
              <span className="act-badge-red">P1 · TRIGGERED</span>
            </div>

            <div className="detect-visual-flow">
              <div className="detect-node alert-node">
                <div className="detect-node-icon">
                  <Image src="/integrations/datadog.svg" width={24} height={24} alt="" />
                </div>
                <div className="detect-node-content">
                  <div className="flex justify-between items-center">
                    <span className="node-source-label">DATADOG SIGNAL</span>
                    <span className="node-active-pill">Active</span>
                  </div>
                  <strong className="node-title">Checkout API · Elevated latency</strong>
                  <span className="node-detail">p95 latency &gt; 4.5s (threshold: 2.0s)</span>
                </div>
              </div>

              <div className="detect-connector">
                <div className="connector-badge">
                  <Radio size={13} className="text-red-500" />
                  <span>Provider correlation: <code>checkout-api-latency</code></span>
                </div>
              </div>

              <div className="detect-node incident-node">
                <div className="incident-node-badge">
                  <span className="incident-p1">P1</span>
                </div>
                <div className="detect-node-content">
                  <div className="flex justify-between items-center">
                    <span className="node-source-label">INCIDENT CREATED</span>
                    <span className="incident-id">INC-1042</span>
                  </div>
                  <strong className="node-title">Elevated checkout error rate</strong>
                  <span className="node-detail">Checkout API · Commerce Reliability Service</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Act 02: Respond */}
      <section className="act-section act-respond" id="act-respond">
        <div className="act-story-copy">
          <div className="act-header-tag">
            <span className="act-num">02 / RESPOND</span>
            <span className="act-subtag">ON-CALL &amp; PAGING</span>
          </div>
          <h3 className="act-heading">The right person. The right moment.</h3>
          <p className="act-description">
            Live schedules determine the current primary responder without guesswork.
            Configured paging channels deliver multi-modal alerts across voice calls, push notifications,
            and ChatOps. On acknowledgement, ownership transitions seamlessly.
          </p>
          <div className="act-stages-strip">
            <span className="act-stage-pill">04 On-call</span>
            <span className="act-stage-pill">05 Page</span>
            <span className="act-stage-pill is-active">
              <span className="signal-dot" /> 06 Acknowledge
            </span>
          </div>
        </div>

        <div className="act-visual-wrapper">
          <div className="act-card respond-card">
            <div className="act-card-head">
              <div className="flex items-center gap-2">
                <span className="signal-dot" />
                <span className="act-meta-tag">ESCALATION POLICY · TIER 1</span>
              </div>
              <span className="act-badge-ack">ACKNOWLEDGED · 00:01:24</span>
            </div>

            <div className="respond-visual-body">
              <div className="responder-profile-card">
                <div className="responder-avatar">MC</div>
                <div className="responder-info">
                  <div className="flex items-center justify-between">
                    <span className="responder-role">COMMERCE PRIMARY</span>
                    <span className="responder-status-pill">On-Call</span>
                  </div>
                  <strong className="responder-name">Maya Chen</strong>
                  <span className="responder-schedule">Americas Primary Rotation · Shift active</span>
                </div>
              </div>

              <div className="channels-grid">
                <div className="channel-chip active">
                  <PhoneCall size={14} className="channel-icon" />
                  <div>
                    <span className="channel-name">Voice Call</span>
                    <span className="channel-state">Answered</span>
                  </div>
                </div>
                <div className="channel-chip active">
                  <Radio size={14} className="channel-icon" />
                  <div>
                    <span className="channel-name">Mobile PWA</span>
                    <span className="channel-state">Delivered</span>
                  </div>
                </div>
                <div className="channel-chip active">
                  <MessageSquare size={14} className="channel-icon" />
                  <div>
                    <span className="channel-name">Direct SMS</span>
                    <span className="channel-state">Delivered</span>
                  </div>
                </div>
                <div className="channel-chip active">
                  <Check size={14} className="channel-icon" />
                  <div>
                    <span className="channel-name">MS Teams</span>
                    <span className="channel-state">Card posted</span>
                  </div>
                </div>
              </div>

              <div className="respond-footer">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                  <span className="text-xs text-slate-300 font-medium">
                    Owned by <strong>Maya Chen</strong> · Escalation timeout canceled
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Act 03: Coordinate */}
      <section className="act-section act-coordinate" id="act-coordinate">
        <div className="act-story-copy">
          <div className="act-header-tag">
            <span className="act-num">03 / COORDINATE</span>
            <span className="act-subtag">INTERNAL &amp; EXTERNAL</span>
          </div>
          <h3 className="act-heading">Internal response. Public clarity.</h3>
          <p className="act-description">
            Engineers investigate in dedicated ChatOps channels while customers stay
            informed through the integrated public status page. Both live in the same
            unified incident system without manual status duplication.
          </p>
          <div className="act-stages-strip">
            <span className="act-stage-pill is-active">
              <span className="signal-dot" /> 07 Coordinate
            </span>
            <span className="act-stage-pill">08 Communicate</span>
          </div>
        </div>

        <div className="act-visual-wrapper">
          <div className="coordinate-split-grid">
            <div className="coordinate-card internal-room">
              <div className="coordinate-card-head">
                <div className="flex items-center gap-2">
                  <MessageSquare size={13} className="text-red-400" />
                  <span className="act-meta-tag">WAR ROOM · #inc-1042-checkout</span>
                </div>
                <span className="channel-badge">CHAT OPS</span>
              </div>
              <div className="chat-thread">
                <div className="chat-msg">
                  <span className="chat-avatar">MC</span>
                  <div className="chat-content">
                    <span className="chat-author">Maya Chen <small>14:24</small></span>
                    <p>Investigating checkout latency spike after deployment v2.4.1.</p>
                  </div>
                </div>
                <div className="chat-msg">
                  <span className="chat-avatar dv">DV</span>
                  <div className="chat-content">
                    <span className="chat-author">Daniel Vance <small>14:26</small></span>
                    <p>Read replicas healthy. Isolating third-party gateway pool.</p>
                  </div>
                </div>
                <div className="chat-msg bot">
                  <span className="chat-avatar bot">OK</span>
                  <div className="chat-content">
                    <span className="chat-author text-red-400">OpsKnight Bot <small>14:27</small></span>
                    <p>Attached APM trace evidence to incident timeline.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="coordinate-card public-status">
              <div className="coordinate-card-head">
                <div className="flex items-center gap-2">
                  <Globe size={13} className="text-amber-400" />
                  <span className="act-meta-tag">PUBLIC STATUS PAGE</span>
                </div>
                <span className="status-pill-degraded">DEGRADED</span>
              </div>
              <div className="status-content">
                <div className="status-service-row">
                  <strong>Checkout &amp; Billing API</strong>
                  <span className="status-indicator-tag">Degraded Performance</span>
                </div>
                <div className="status-update-box">
                  <span className="status-update-time">UPDATE · 14:28 UTC</span>
                  <p>
                    Investigating elevated checkout latency. Engineers are actively isolating downstream pools. Next update in 15 minutes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Act 04: Recover */}
      <section className="act-section act-recover" id="act-recover">
        <div className="act-story-copy">
          <div className="act-header-tag">
            <span className="act-num">04 / RECOVER &amp; LEARN</span>
            <span className="act-subtag">CONTINUOUS IMPROVEMENT</span>
          </div>
          <h3 className="act-heading">Resolution sealed. Experience preserved.</h3>
          <p className="act-description">
            Service restored and incident resolved. Complete response evidence,
            timing metrics, and postmortem follow-up action items remain permanently
            preserved to prevent repeat regressions.
          </p>
          <div className="act-stages-strip">
            <span className="act-stage-pill is-active green">
              <span className="signal-dot success" /> 09 Resolve
            </span>
            <span className="act-stage-pill green">10 Learn</span>
          </div>
        </div>

        <div className="act-visual-wrapper">
          <div className="act-card recover-card">
            <div className="act-card-head recover-head">
              <div className="flex items-center gap-2">
                <span className="signal-dot success" />
                <span className="act-meta-tag text-emerald-400">RESOLUTION &amp; AUDIT TRAIL</span>
              </div>
              <span className="act-badge-resolved">RESOLVED · 14:38 UTC</span>
            </div>

            <div className="recover-body">
              <div className="recover-summary-row">
                <div>
                  <span className="node-source-label text-emerald-400">RESTORED SERVICE</span>
                  <strong className="text-white text-base block">Checkout API</strong>
                </div>
                <div className="recover-metrics-badges">
                  <div className="recover-metric">
                    <span>MTTA</span>
                    <strong>1m 24s</strong>
                  </div>
                  <div className="recover-metric">
                    <span>MTTR</span>
                    <strong>18m 40s</strong>
                  </div>
                  <div className="recover-metric">
                    <span>HEALTH</span>
                    <strong className="text-emerald-400">Normal (42ms)</strong>
                  </div>
                </div>
              </div>

              <div className="recover-deck-grid">
                <div className="recover-deck-card">
                  <div className="flex items-center gap-2 mb-1">
                    <Activity size={14} className="text-emerald-400" />
                    <strong className="text-sm text-white">Timeline</strong>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed mb-0">
                    Immutable timestamped audit log preserved with all webhook payloads and actions.
                  </p>
                </div>
                <div className="recover-deck-card">
                  <div className="flex items-center gap-2 mb-1">
                    <Radio size={14} className="text-emerald-400" />
                    <strong className="text-sm text-white">Metrics</strong>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed mb-0">
                    TTN, TTA, and TTR analytics evaluated against historical baselines.
                  </p>
                </div>
                <div className="recover-deck-card">
                  <div className="flex items-center gap-2 mb-1">
                    <Check size={14} className="text-emerald-400" />
                    <strong className="text-sm text-white">Actions</strong>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed mb-0">
                    2 blameless postmortem follow-up action items created and assigned.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Explore all 10 steps disclosure */}
      <div className="ten-steps-wrapper">
        <details className="ten-steps-disclosure" open>
          <summary className="ten-steps-summary">
            <div className="flex items-center gap-3">
              <span className="signal-dot" />
              <strong className="text-white">Explore all 10 granular incident lifecycle steps</strong>
            </div>
            <span className="ten-steps-hint">Release contract &amp; technical routing</span>
          </summary>

          <div className="ten-steps-drawer-body">
            <div className="ten-steps-stepper" aria-label="Incident lifecycle steps">
              {steps.map((item, index) => (
                <button
                  key={item.label}
                  aria-pressed={activeStep === index}
                  className={`ten-step-btn ${activeStep === index ? "is-active" : ""}`}
                  onClick={() => setActiveStep(index)}
                >
                  <span className="ten-step-num">{String(index + 1).padStart(2, "0")}</span>
                  <span className="ten-step-label">{item.label}</span>
                </button>
              ))}
            </div>

            <div
              id="loop-panel"
              className={`ten-steps-panel step-${activeStep}`}
              data-step={activeStep}
            >
              <div className="ten-step-row">
                <div className="ten-step-meta">
                  <span className="site-eyebrow mb-1">
                    <span className="signal-dot" />
                    STEP {String(activeStep + 1).padStart(2, "0")} / {steps[activeStep].label.toUpperCase()}
                  </span>
                  <h4 className="text-xl font-bold text-white mb-2">{steps[activeStep].title}</h4>
                  <p className="text-sm text-slate-300 leading-relaxed mb-0">{steps[activeStep].detail}</p>
                </div>

                <div className="ten-step-contract-box">
                  <span className="contract-box-label">EVENT CONTRACT</span>
                  <strong className="contract-box-event">
                    {activeStep === 4 ? "Voice · Push · SMS · Teams" :
                     activeStep === 5 ? "ACKNOWLEDGED" :
                     steps[activeStep].event}
                  </strong>
                  <div className="contract-box-status">
                    <span>INC-1042 · Checkout API</span>
                    <span className="status-badge">
                      {activeStep >= 8 ? "RESOLVED" : activeStep >= 5 ? "ACKNOWLEDGED" : "TRIGGERED"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </details>
      </div>
    </div>
  );
}

export function HeroSignal() {
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setPhase(1);
        observer.disconnect();
      },
      { threshold: 0.4 },
    );
    const element = document.getElementById("hero-signal");
    if (element) observer.observe(element);
    return () => observer.disconnect();
  }, []);
  return (
    <div
      id="hero-signal"
      className={`hero-signal ${phase ? "signal-active" : ""}`}
      aria-label="Illustrative incident workflow: alert, routing, on-call, paging, acknowledgement"
    >
      <span className="hero-signal-label">
        LIVE WORKFLOW <span className="signal-dot" />
      </span>
      <div className="signal-track">
        {[
          "Alert received",
          "Routing",
          "Maya · on-call",
          "Paging",
          "Acknowledged",
        ].map((s, i) => (
          <div key={s}>
            <span
              className="track-point"
              style={{ animationDelay: `${i * 0.5}s` }}
            >
              {i === 4 ? <Check size={12} /> : String(i + 1).padStart(2, "0")}
            </span>
            <span>{s}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
const modes = ["Compose", "Split", "Kubernetes", "Swarm"];
export function ArchitectureViewer() {
  const [active, setActive] = useState(0);
  return (
    <div className="architecture-viewer">
      <div
        className="architecture-tabs"
        role="tablist"
        aria-label="Runtime architecture"
      >
        {modes.map((name, i) => (
          <button
            id={`arch-tab-${i}`}
            key={name}
            role="tab"
            aria-controls="arch-panel"
            aria-selected={i === active}
            tabIndex={i === active ? 0 : -1}
            onClick={() => setActive(i)}
            onKeyDown={(e) => {
              const next =
                e.key === "ArrowRight"
                  ? (i + 1) % modes.length
                  : e.key === "ArrowLeft"
                    ? (i + modes.length - 1) % modes.length
                    : null;
              if (next !== null) {
                e.preventDefault();
                setActive(next);
                document.getElementById(`arch-tab-${next}`)?.focus();
              }
            }}
          >
            {name}
          </button>
        ))}
      </div>
      <div
        id="arch-panel"
        role="tabpanel"
        aria-labelledby={`arch-tab-${active}`}
        tabIndex={0}
        className="architecture-panel"
      >
        <div className="architecture-caption">
          <Terminal size={20} />
          <span>
            {active === 0
              ? "Integrated runtime"
              : `${modes[active]} / split runtime`}
          </span>
        </div>
        <div className="architecture-roles">
          {(active === 0
            ? ["OpsKnight · integrated"]
            : PRODUCT.deployments.roles
          ).map((r, i) => (
            <div key={r}>
              <span className="signal-dot" />
              {r}
              <small>
                {active === 0
                  ? "Web + background processing"
                  : i === 0
                    ? "HTTP / UI"
                    : "Independent process"}
              </small>
            </div>
          ))}
        </div>
        <div className="architecture-db">
          <div className="db-line" />
          {active !== 0 && (
            <span>
              PgBouncer <small>optional pooling</small>
            </span>
          )}
          <strong>PostgreSQL</strong>
        </div>
        <p className="architecture-note">
          Conceptual topology. All roles share the database; pooling and direct
          connections follow the deployment guide.
        </p>
        <Link
          className="site-text-link"
          href={productDocs(
            active === 0
              ? "operate/deploy/compose"
              : active === 1
                ? "operate/deploy/split-runtime"
                : active === 2
                  ? "operate/deploy/kubernetes"
                  : "operate/deploy/swarm",
          )}
        >
          View deployment guide <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}

const PRODUCT_PROOFS = [
  {
    id: "command-center",
    label: "Command Center",
    image: "dashboard-overview.png",
    href: "/product/",
    summary: "Live triage, active alerts, workload distribution, and SLA countdowns across Northstar services.",
    alt: "OpsKnight Command Center displaying live triage, active alerts, workload distribution, and SLA countdowns",
  },
  {
    id: "incidents",
    label: "Incidents",
    image: "incident-detail.png",
    href: "/product/incidents/",
    summary: "Checkout API incident in acknowledged state: assigned responder, active investigation, and live event timeline.",
    alt: "OpsKnight Checkout API incident in acknowledged state: assigned responder, active investigation, and live event timeline",
  },
  {
    id: "on-call",
    label: "On-call",
    image: "on-call-schedule-detail.png",
    href: "/product/on-call/",
    summary: "Commerce Primary On-Call rotation and schedule detail from the Northstar Systems fixture.",
    alt: "OpsKnight Commerce Primary On-Call schedule in the Northstar Systems fixture",
  },
  {
    id: "paging",
    label: "Paging",
    image: "notification-settings.png",
    href: "/product/paging/",
    summary: "Multi-channel paging and escalation policy with on-call rotation targets and delivery rules.",
    alt: "OpsKnight escalation policy and multi-channel paging in the Northstar Systems fixture",
  },
  {
    id: "status",
    label: "Status",
    image: "status-pages.png",
    href: "/product/status-pages/",
    summary: "Real-time system status, operational services, uptime history and active incident announcements.",
    alt: "OpsKnight public status page displaying real-time system status, operational services, uptime history, and active incident announcements",
    live: true,
  },
  {
    id: "analytics",
    label: "Analytics",
    image: "analytics-overview.png",
    href: "/product/analytics/",
    summary: "MTTA/MTTR response metrics, incident volume, and operational trends from the Northstar dataset.",
    alt: "OpsKnight analytics overview for the Northstar Systems synthetic fixture",
  },
  {
    id: "operations",
    label: "Operations",
    image: "health-center.png",
    href: "/product/operations/",
    summary: "System Health Center diagnostics, background worker status, and runtime telemetry.",
    alt: "OpsKnight System Health Center in the Northstar Systems v2.0.0 fixture",
  },
] as const;

type ProductProofId = (typeof PRODUCT_PROOFS)[number]["id"];

export function ProductProofShowcase() {
  const [activeId, setActiveId] = useState<ProductProofId>(
    PRODUCT_PROOFS[0].id,
  );
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
      <div className="product-proof-tabs" role="tablist" aria-label="OpsKnight product views">
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
            {"live" in active && active.live ? (
              <a href={BRAND.links.status} target="_blank" rel="noopener noreferrer">
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

export function DeploymentChooser() {
  const [environment, setEnvironment] = useState("docker");
  const [scale, setScale] = useState("evaluation");
  const model = PRODUCT.deployments.models.find((m) => m.id === environment)!;
  return (
    <div className="deployment-chooser">
      <fieldset>
        <legend>Where are you running it?</legend>
        {PRODUCT.deployments.models.map((m) => (
          <label key={m.id}>
            <input
              type="radio"
              name="environment"
              checked={environment === m.id}
              onChange={() => setEnvironment(m.id)}
            />
            {m.title}
          </label>
        ))}
      </fieldset>
      <fieldset>
        <legend>What are you planning?</legend>
        {[
          ["evaluation", "Evaluation"],
          ["standard", "Standard deployment"],
          ["ha", "High availability"],
        ].map(([id, label]) => (
          <label key={id}>
            <input
              type="radio"
              name="scale"
              checked={scale === id}
              onChange={() => setScale(id)}
            />
            {label}
          </label>
        ))}
      </fieldset>
      <div className="deployment-result" aria-live="polite">
        <p className="site-eyebrow">YOUR STARTING POINT</p>
        <h3>
          {model.title}
          {environment === "docker"
            ? scale === "ha"
              ? " · split runtime"
              : " · integrated"
            : scale === "ha"
              ? " · split runtime"
              : ""}
        </h3>
        <p>
          {scale === "ha"
            ? "Plan redundant runtime processes, database availability, ingress and recovery together. A split runtime alone does not provide high availability."
            : model.description}
        </p>
        <Link
          className="site-action"
          href={productDocs(
            environment === "docker" && scale === "ha"
              ? "operate/deploy/split-runtime"
              : model.docs,
          )}
        >
          View guide <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
const INTEGRATION_CATEGORY_LABELS: Record<string, string> = {
  monitoring: "Observability & APM",
  cloud: "Cloud",
  uptime: "Uptime",
  webhooks: "Webhooks & CI/CD",
  communication: "Communication",
  "issue-tracking": "Issue tracking",
};

function readableToken(value: string) {
  return value.replaceAll("-", " ");
}

export function IntegrationExplorer() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [copiedContract, setCopiedContract] = useState<string | null>(null);

  const copyContract = async (label: string, value: string) => {
    const ok = await copyText(value);
    if (!ok) return;
    setCopiedContract(label);
    window.setTimeout(() => setCopiedContract(null), 1400);
  };
  const categories = Array.from(
    new Set(PRODUCT.integrations.map((provider) => provider.category)),
  );
  const filtered = PRODUCT.integrations.filter((provider) => {
    const haystack = [
      provider.title,
      provider.category,
      provider.direction,
      provider.protocol ?? "",
      provider.endpoint ?? "",
      ...provider.actions,
      ...provider.authentication,
      ...provider.acceptedCredentials,
      provider.signature,
      provider.correlation ?? "",
      provider.recovery ?? "",
    ].join(" ").toLowerCase();
    return (
      (category === "all" || provider.category === category) &&
      haystack.includes(query.toLowerCase())
    );
  });
  const selected = PRODUCT.integrations.find(
    (provider) => provider.id === selectedId,
  );
  const communicationCount = PRODUCT.integrations.filter(
    (provider) => provider.category === "communication",
  ).length;
  const issueTrackingCount = PRODUCT.integrations.filter(
    (provider) => provider.category === "issue-tracking",
  ).length;

  return (
    <div className="integration-explorer">
      <h2 className="sr-only">Integration catalog</h2>
      <div className="integration-tools">
        <label className="integration-search">
          Search integrations
          <input
            type="search"
            value={query}
            placeholder="Search providers, actions, or auth…"
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>
        <div className="integration-count-breakdown" aria-label="Integration catalog breakdown">
          <div>
            <strong>{PRODUCT.inboundIntegrationCount}</strong>
            <span>Alert sources</span>
          </div>
          <div>
            <strong>{communicationCount}</strong>
            <span>Communication</span>
          </div>
          <div>
            <strong>{issueTrackingCount}</strong>
            <span>Issue tracking</span>
          </div>
        </div>
      </div>

      <div className="integration-filters" role="group" aria-label="Filter by category">
        {["all", ...categories].map((item) => (
          <button
            aria-pressed={item === category}
            key={item}
            onClick={() => setCategory(item)}
          >
            {item === "all"
              ? "All"
              : (INTEGRATION_CATEGORY_LABELS[item] ?? readableToken(item))}
          </button>
        ))}
      </div>

      <p className="results-count" aria-live="polite">
        {filtered.length} connections match this view · {PRODUCT.inboundIntegrationCount} alert sources · {communicationCount} communication · {issueTrackingCount} issue tracking
      </p>

      <div className="integration-results">
        {filtered.map((provider) => (
          <button
            className="integration-item"
            key={provider.id}
            type="button"
            onClick={() => setSelectedId(provider.id)}
            aria-labelledby={`integration-title-${provider.id}`}
          >
            <div className="integration-letter">
              <Image src={integrationLogos[provider.id]} alt="" width={36} height={36} />
            </div>
            <div>
              <h3 id={`integration-title-${provider.id}`}>
                {provider.title}
                <ArrowRight size={17} aria-hidden="true" />
              </h3>
              <p>
                {INTEGRATION_CATEGORY_LABELS[provider.category] ??
                  readableToken(provider.category)}
                {" · "}
                {readableToken(provider.direction)}
              </p>
              <div className="integration-actions">
                {provider.actions.length
                  ? provider.actions.map(readableToken).join(" · ")
                  : "See supported workflow"}
              </div>
              <small>
                Authentication:{" "}
                {provider.authentication.length
                  ? provider.authentication.map(readableToken).join(", ")
                  : "See setup guide"}
              </small>
            </div>
          </button>
        ))}
      </div>

      {!filtered.length && (
        <p className="empty-result">
          No integrations match. Try another search or category.
        </p>
      )}

      <Dialog.Root
        open={Boolean(selected)}
        onOpenChange={(open) => {
          if (!open) setSelectedId(null);
        }}
      >
        {selected ? (
          <Dialog.Portal>
            <Dialog.Overlay className="integration-drawer-overlay" />
            <Dialog.Content className="integration-drawer">
              <div className="integration-drawer-head">
                <div className="integration-drawer-title">
                  <div className="integration-letter">
                    <Image src={integrationLogos[selected.id]} alt="" width={42} height={42} />
                  </div>
                  <div>
                    <p className="site-eyebrow">RELEASE-VERIFIED INTEGRATION</p>
                    <Dialog.Title>{selected.title}</Dialog.Title>
                    <Dialog.Description>
                      {INTEGRATION_CATEGORY_LABELS[selected.category] ??
                        readableToken(selected.category)}
                      {" · "}
                      {readableToken(selected.direction)}
                    </Dialog.Description>
                  </div>
                </div>
                <Dialog.Close className="integration-drawer-close" aria-label="Close integration details">
                  <X size={19} />
                </Dialog.Close>
              </div>

              <div className="integration-drawer-body">
                <section>
                  <span>SUPPORTED ACTIONS</span>
                  <div className="integration-chip-row">
                    {selected.actions.length ? (
                      selected.actions.map((action) => (
                        <strong key={action}>{readableToken(action)}</strong>
                      ))
                    ) : (
                      <strong>See setup guide</strong>
                    )}
                  </div>
                </section>
                <section>
                  <span>AUTHENTICATION</span>
                  <p>
                    {selected.authentication.length
                      ? selected.authentication.map(readableToken).join(", ")
                      : "See the provider setup guide for the exact authentication contract."}
                  </p>
                </section>
                <section>
                  <span>SIGNATURE BEHAVIOR</span>
                  <p>{readableToken(selected.signature)}</p>
                </section>
                {selected.endpoint ? (
                  <>
                    <section>
                      <span>ENDPOINT</span>
                      <div className="integration-copy-row">
                        <code className="integration-contract-code">
                          {selected.method ?? "POST"} {selected.endpoint}
                        </code>
                        <button
                          type="button"
                          onClick={() =>
                            copyContract(
                              "endpoint",
                              `${selected.method ?? "POST"} ${selected.endpoint}`,
                            )
                          }
                        >
                          <Copy size={14} />
                          {copiedContract === "endpoint" ? "Copied" : "Copy"}
                        </button>
                      </div>
                    </section>
                    <section>
                      <span>REQUEST STARTER</span>
                      <div className="integration-copy-row">
                        <code className="integration-contract-code">
                          curl -X {selected.method ?? "POST"} https://your-opsknight.example{selected.endpoint}
                        </code>
                        <button
                          type="button"
                          onClick={() =>
                            copyContract(
                              "curl",
                              `curl -X ${selected.method ?? "POST"} "https://your-opsknight.example${selected.endpoint}"`,
                            )
                          }
                        >
                          <Copy size={14} />
                          {copiedContract === "curl" ? "Copied" : "Copy"}
                        </button>
                      </div>
                      <p className="integration-starter-note">
                        Starter only. Add the provider-specific credentials and payload from the setup guide.
                      </p>
                    </section>
                  </>
                ) : null}
                {selected.acceptedCredentials.length ? (
                  <section>
                    <span>ACCEPTED CREDENTIAL FORMS</span>
                    <div className="integration-chip-row">
                      {selected.acceptedCredentials.map((credential) => (
                        <strong key={credential}>{credential}</strong>
                      ))}
                    </div>
                  </section>
                ) : null}
                {selected.rateLimit || selected.bodyLimitBytes ? (
                  <section>
                    <span>REQUEST LIMITS</span>
                    <p>
                      {selected.rateLimit
                        ? `${selected.rateLimit.requests} requests / ${selected.rateLimit.windowSeconds}s / integration`
                        : "Provider-specific rate limit"}
                      {selected.bodyLimitBytes
                        ? ` · ${Math.round(selected.bodyLimitBytes / 1048576)} MiB body limit`
                        : ""}
                    </p>
                  </section>
                ) : null}
                {selected.correlation || selected.recovery ? (
                  <section>
                    <span>CORRELATION &amp; RECOVERY</span>
                    {selected.correlation ? <p>Correlation: {selected.correlation}</p> : null}
                    {selected.recovery ? <p>Recovery: {selected.recovery}</p> : null}
                  </section>
                ) : null}
                {selected.errors.length ? (
                  <section>
                    <span>COMMON API OUTCOMES</span>
                    <div className="integration-error-list">
                      {selected.errors.map((error) => (
                        <div key={error.status}>
                          <code>{error.status}</code>
                          <p>{error.meaning}</p>
                        </div>
                      ))}
                    </div>
                  </section>
                ) : null}
                <section>
                  <span>TRUTH BOUNDARY</span>
                  <p>
                    Capabilities shown here come from the v{PRODUCT.release.version} release manifest.
                    Provider authentication and verification rules are not generalized across integrations.
                  </p>
                </section>
              </div>

              <div className="integration-drawer-actions">
                <Link className="site-action" href={`/integrations/${selected.id}/`}>
                  Open {selected.title} integration <ArrowRight size={16} />
                </Link>
                <Link className="integration-doc-link" href={productDocs(selected.docs)}>
                  Setup guide <ExternalLink size={15} />
                </Link>
              </div>
            </Dialog.Content>
          </Dialog.Portal>
        ) : null}
      </Dialog.Root>
    </div>
  );
}
