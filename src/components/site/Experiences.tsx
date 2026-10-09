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
} from "lucide-react";
import { PRODUCT, productDocs } from "@/lib/product";
import { copyText } from "@/lib/client-clipboard";
import { DetectCard, RespondCard, CoordinateCards, RecoverCard } from "./IncidentActCards";
import { IncidentTimeline } from "./IncidentTimeline";
const steps = [
  {
    num: "01",
    label: "Detect",
    title: "Inbound signal detected.",
    detail:
      "Datadog reports elevated checkout latency. An alert is ingested via configured integration credentials and matched against alert rules.",
    stage: "Detect",
    state: "SIGNAL RECEIVED",
    statusBadge: "DETECT",
    statusType: "signal",
    context: "Datadog → Checkout API",
    event: "Checkout p95 > 4.5s (threshold: 2.0s)",
    icon: Activity,
  },
  {
    num: "02",
    label: "Correlate",
    title: "One signal. Clear context.",
    detail:
      "A matching provider correlation key groups related telemetry events to the active service context, preventing redundant alert storms.",
    stage: "Correlate",
    state: "RELATED SIGNAL PROCESSED",
    statusBadge: "CORRELATE",
    statusType: "signal",
    context: "Correlation key: checkout-api-latency",
    event: "Related events grouped → checkout-api-latency",
    icon: Radio,
  },
  {
    num: "03",
    label: "Create",
    title: "Give the incident a home.",
    detail:
      "Incident #cm4q7xk2 is created with service context, P1 severity, initial timeline capture, and automated responder routing.",
    stage: "Create",
    state: "INCIDENT TRIGGERED",
    statusBadge: "TRIGGERED",
    statusType: "triggered",
    context: "#cm4q7xk2 · Checkout API",
    event: "#cm4q7xk2 · Checkout API · P1",
    icon: Bell,
  },
  {
    num: "04",
    label: "On-call",
    title: "Find the right person.",
    detail:
      "On-call schedules and active overrides resolve Maya Chen as the primary responder for Tier 1 Commerce escalation.",
    stage: "On-call",
    state: "TRIGGERED · PAGING IN PROGRESS",
    statusBadge: "PAGING",
    statusType: "paging",
    context: "#cm4q7xk2 · Primary → Maya Chen",
    event: "Primary → Maya Chen (Americas Rotation)",
    icon: CalendarDays,
  },
  {
    num: "05",
    label: "Page",
    title: "Reach the responder.",
    detail:
      "Configured paging channels attempt delivery across voice, push, SMS, and Teams, recording delivery outcomes for audit.",
    stage: "Page",
    state: "TRIGGERED · PAGING IN PROGRESS",
    statusBadge: "PAGING",
    statusType: "paging",
    context: "#cm4q7xk2 · Multi-channel dispatch",
    event: "Voice · Push · SMS · Teams",
    icon: PhoneCall,
  },
  {
    num: "06",
    label: "Acknowledge",
    title: "Someone owns the response.",
    detail:
      "Maya Chen acknowledges the page within 1m 24s. Response ownership is established and escalation timeout is canceled.",
    stage: "Acknowledge",
    state: "ACKNOWLEDGED",
    statusBadge: "ACKNOWLEDGED",
    statusType: "ack",
    context: "#cm4q7xk2 · Owned by Maya Chen",
    event: "Maya Chen acknowledged (00:01:24)",
    icon: Check,
  },
  {
    num: "07",
    label: "Coordinate",
    title: "Bring the team together.",
    detail:
      "Responders investigate in a dedicated ChatOps war room with real-time logs, automated trace links, and team visibility.",
    stage: "Coordinate",
    state: "ACKNOWLEDGED · COORDINATING",
    statusBadge: "ACKNOWLEDGED",
    statusType: "ack",
    context: "#cm4q7xk2 · War room inc-x9t2bq7e-g1-checkout",
    event: "inc-x9t2bq7e-g1-checkout · ChatOps",
    icon: MessageSquare,
  },
  {
    num: "08",
    label: "Communicate",
    title: "Keep customers informed.",
    detail:
      "Authorized operators publish a scoped operational update to the public status page without duplicate tooling.",
    stage: "Communicate",
    state: "ACKNOWLEDGED · COMMUNICATING",
    statusBadge: "ACKNOWLEDGED",
    statusType: "ack",
    context: "#cm4q7xk2 · Public Status Page",
    event: "Checkout API → Degraded performance",
    icon: Globe,
  },
  {
    num: "09",
    label: "Resolve",
    title: "Close the loop.",
    detail:
      "Downstream pool isolated and service restored. The incident resolves and response timeline is preserved for postmortem review.",
    stage: "Resolve",
    state: "RESOLVED",
    statusBadge: "RESOLVED",
    statusType: "resolved",
    context: "#cm4q7xk2 · Checkout API Restored",
    event: "Checkout API recovered (14:38 UTC)",
    icon: Check,
  },
  {
    num: "10",
    label: "Learn",
    title: "Make next time better.",
    detail:
      "Review response metrics against service objectives, conduct a blameless 5-Whys analysis, and track follow-up action items.",
    stage: "Learn",
    state: "RESOLVED · POSTMORTEM",
    statusBadge: "RESOLVED",
    statusType: "resolved",
    context: "#cm4q7xk2 · Continuous Improvement",
    event: "Postmortem → owned follow-up actions",
    icon: Activity,
  },
];

const acts = [
  {
    id: "act-detect",
    num: "01",
    label: "Detect",
    summary: "Detect · Correlate · Create",
    eyebrow: "Detect",
    subtag: "Northstar Systems",
    heading: "A signal becomes something actionable.",
    description:
      "An alert arrives through a verified integration. Related signals fold into a single incident, with the service and its telemetry already attached.",
    stages: ["01 Detect", "02 Correlate", "03 Create"],
  },
  {
    id: "act-respond",
    num: "02",
    label: "Respond",
    summary: "On-call · Page · Acknowledge",
    eyebrow: "Respond",
    subtag: "On-call & paging",
    heading: "The right person. The right moment.",
    description:
      "The schedule already knows who is on call. OpsKnight reaches them by voice, push or chat, records every delivery, and hands over ownership the moment they acknowledge.",
    stages: ["04 On-call", "05 Page", "06 Acknowledge"],
  },
  {
    id: "act-coordinate",
    num: "03",
    label: "Coordinate",
    summary: "Coordinate · Communicate",
    eyebrow: "Coordinate",
    subtag: "Inside and out",
    heading: "Internal response. Public clarity.",
    description:
      "Responders work the problem in a dedicated chat channel. Customers see a scoped status update. Both stay in step, in the same system.",
    stages: ["07 Coordinate", "08 Communicate"],
  },
  {
    id: "act-recover",
    num: "04",
    label: "Recover",
    summary: "Resolve · Learn",
    eyebrow: "Recover",
    subtag: "And learn",
    heading: "Resolved, and remembered.",
    description:
      "Service comes back. The timeline, MTTA and MTTR, and the postmortem's follow-up work are kept, under the retention rules you set.",
    stages: ["09 Resolve", "10 Learn"],
  },
];

export function IncidentLoop() {
  const [activeAct, setActiveAct] = useState(-1);

  const scrollToAct = (index: number) => {
    setActiveAct(index);
    const target = document.getElementById(acts[index].id);
    if (target) {
      const prefersReducedMotion =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      target.scrollIntoView({
        behavior: prefersReducedMotion ? "auto" : "smooth",
        block: "start",
      });
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const actIndex = acts.findIndex((a) => a.id === entry.target.id);
          if (actIndex !== -1) setActiveAct(actIndex);
        }
      },
      // A thin band at mid-viewport: whichever act crosses it is the active one.
      { rootMargin: "-45% 0px -50% 0px" },
    );
    acts.forEach((act) => {
      const el = document.getElementById(act.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="incident-story-container">
      {/* Scenario metadata disclaimer */}
      <div className="incident-story-meta-bar">
        <span className="scenario-pill">
          <span className="signal-dot" />
          Illustrative incident scenario · Northstar Systems v2.0.0 fixture
        </span>
      </div>

      {/* 1. Act Navigation / Progress Scrubber */}
      <nav className="acts-nav-bar" aria-label="Four Acts of an Incident">
        {acts.map((act, index) => (
          <button
            key={act.id}
            aria-current={activeAct === index ? "true" : undefined}
            className={`act-nav-tab ${activeAct === index ? "is-active" : ""}`}
            onClick={() => scrollToAct(index)}
          >
            <span className="act-nav-num">{act.num}</span>
            <span className="act-nav-text">
              <strong className="act-nav-label">{act.label}</strong>
              <span className="act-nav-summary">{act.summary}</span>
            </span>
          </button>
        ))}
      </nav>

      {/* 2. Act 01: Detect */}
      <section className={`act-section act-detect${activeAct === 0 ? " act-in-view" : ""}`} id="act-detect">
        <div className="act-story-copy">
          <div className="act-header-tag">
            <span className="act-num">{acts[0].eyebrow}</span>
            <span className="act-subtag">{acts[0].subtag}</span>
          </div>
          <h3 className="act-heading">{acts[0].heading}</h3>
          <p className="act-description">{acts[0].description}</p>
          <div className="act-stages-strip">
            <span className="act-stage-pill is-active">
              <span className="signal-dot" /> 01 Detect
            </span>
            <span className="act-stage-pill">02 Correlate</span>
            <span className="act-stage-pill">03 Create</span>
          </div>
        </div>

        <div className="act-visual-wrapper">
          <DetectCard />
        </div>
      </section>

      {/* 3. Act 02: Respond */}
      <section className={`act-section act-respond${activeAct === 1 ? " act-in-view" : ""}`} id="act-respond">
        <div className="act-story-copy">
          <div className="act-header-tag">
            <span className="act-num">{acts[1].eyebrow}</span>
            <span className="act-subtag">{acts[1].subtag}</span>
          </div>
          <h3 className="act-heading">{acts[1].heading}</h3>
          <p className="act-description">{acts[1].description}</p>
          <div className="act-stages-strip">
            <span className="act-stage-pill">04 On-call</span>
            <span className="act-stage-pill">05 Page</span>
            <span className="act-stage-pill is-active">
              <span className="signal-dot ack" /> 06 Acknowledge
            </span>
          </div>
        </div>

        <div className="act-visual-wrapper">
          <RespondCard />
        </div>
      </section>

      {/* 4. Act 03: Coordinate */}
      <section className={`act-section act-coordinate${activeAct === 2 ? " act-in-view" : ""}`} id="act-coordinate">
        <div className="act-story-copy">
          <div className="act-header-tag">
            <span className="act-num">{acts[2].eyebrow}</span>
            <span className="act-subtag">{acts[2].subtag}</span>
          </div>
          <h3 className="act-heading">{acts[2].heading}</h3>
          <p className="act-description">{acts[2].description}</p>
          <div className="act-stages-strip">
            <span className="act-stage-pill is-active">
              <span className="signal-dot live" /> 07 Coordinate
            </span>
            <span className="act-stage-pill">08 Communicate</span>
          </div>
        </div>

        <div className="act-visual-wrapper">
          <CoordinateCards />
        </div>
      </section>

      {/* 5. Act 04: Recover */}
      <section className={`act-section act-recover${activeAct === 3 ? " act-in-view" : ""}`} id="act-recover">
        <div className="act-story-copy">
          <div className="act-header-tag">
            <span className="act-num">{acts[3].eyebrow}</span>
            <span className="act-subtag">{acts[3].subtag}</span>
          </div>
          <h3 className="act-heading">{acts[3].heading}</h3>
          <p className="act-description">{acts[3].description}</p>
          <div className="act-stages-strip">
            <span className="act-stage-pill is-active green">
              <span className="signal-dot success" /> 09 Resolve
            </span>
            <span className="act-stage-pill green">10 Learn</span>
          </div>
        </div>

        <div className="act-visual-wrapper">
          <RecoverCard />
        </div>
      </section>

      {/* 6. Replay all ten steps */}
      <div className="ten-steps-wrapper">
        <IncidentTimeline steps={steps} />
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
        RESPONSE PATH · ILLUSTRATIVE <span className="signal-dot" />
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
const modes = [
  {
    id: "compose",
    name: "Compose",
    label: "Docker Compose · Integrated Runtime",
    desc: "Single-container runtime running Web, Scheduler, and background queue workers in one unified image alongside PostgreSQL. Ideal for fast evaluation and small teams.",
    roles: [
      { name: "Web HTTP / UI", desc: "User interface, REST API, webhook endpoints" },
      { name: "Scheduler & Rotations", desc: "On-call shifts, escalation timers, cron" },
      { name: "Notification Workers", desc: "Voice, SMS, push, ChatOps dispatch" },
      { name: "Status Projector", desc: "Public service health page publishing" },
    ],
    pooling: false,
    docs: "operate/deploy/compose",
    haNote: "Evaluation topology. Bundled PostgreSQL is not highly available; external managed PostgreSQL is recommended for production HA.",
  },
  {
    id: "split",
    name: "Split",
    label: "Split Runtime · Dedicated Processes",
    desc: "Dedicated runtime processes running independently. Urgent paging alerts in Critical Worker are isolated from bulk webhook traffic.",
    roles: [
      { name: "Web", desc: "HTTP traffic, webhooks, auth, UI routing" },
      { name: "Scheduler", desc: "DST-safe rotation shifts & escalation handoffs" },
      { name: "Critical Worker", desc: "High-priority paging delivery control plane" },
      { name: "Bulk Worker", desc: "High-volume alert ingestion & notification fanout" },
      { name: "General Worker", desc: "ChatOps war rooms & background processing" },
      { name: "Status Projector", desc: "Decoupled public status rendering" },
    ],
    pooling: true,
    docs: "operate/deploy/split-runtime",
    haNote: "Split production runtime. Requires PgBouncer connection pooling. Bundled PostgreSQL is not clustered; external managed database required for multi-node HA.",
  },
  {
    id: "kubernetes",
    name: "Kubernetes",
    label: "Kubernetes · Helm & Kustomize",
    desc: "Cloud-native deployment on Kubernetes with Helm or Kustomize. Independent horizontal pod autoscaling for Web and Worker deployments.",
    roles: [
      { name: "Web (Deployment)", desc: "Ingress-backed pods with horizontal autoscaling" },
      { name: "Scheduler (Deployment)", desc: "Leader-elected cron and rotation shifts" },
      { name: "Critical Worker (Deployment)", desc: "Dedicated high-priority paging pool" },
      { name: "Bulk Worker (Deployment)", desc: "Elastic ingestion and fanout worker pool" },
      { name: "General Worker (Deployment)", desc: "ChatOps war rooms & background jobs" },
      { name: "Status Projector (Deployment)", desc: "Independent public status cache" },
    ],
    pooling: true,
    docs: "operate/deploy/kubernetes",
    haNote: "Production cluster profile. Use cloud-managed PostgreSQL (e.g. AWS RDS, Cloud SQL, or CloudNativePG) for high availability.",
  },
  {
    id: "swarm",
    name: "Swarm",
    label: "Docker Swarm · Stack Services",
    desc: "Docker Swarm service stack with native Raft secrets management, health checks, rollback tooling, and rolling zero-downtime updates.",
    roles: [
      { name: "Web Service", desc: "Replicated ingress service behind overlay network" },
      { name: "Scheduler Service", desc: "Replicated scheduler with leader election" },
      { name: "Critical Worker Service", desc: "Prioritized paging delivery service" },
      { name: "Bulk Worker Service", desc: "Scalable bulk worker replica tasks" },
      { name: "General Worker Service", desc: "ChatOps & event processing tasks" },
      { name: "Status Projector Service", desc: "Independent status page service" },
    ],
    pooling: true,
    docs: "operate/deploy/swarm",
    haNote: "Swarm cluster profile with encrypted overlay network and Swarm secrets. External clustered database required for storage HA.",
  },
];

export { modes as ARCHITECTURE_MODES };

export function ArchitectureViewer() {
  const [active, setActive] = useState(0);
  const current = modes[active];

  return (
    <div className="architecture-viewer">
      <div
        className="architecture-tabs"
        role="tablist"
        aria-label="Runtime architecture"
      >
        {modes.map((mode, i) => (
          <button
            id={`arch-tab-${i}`}
            key={mode.id}
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
            {mode.name}
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
        {/* Topology Topbar */}
        <div className="architecture-caption">
          <div className="flex items-center gap-2">
            <Terminal size={17} />
            <strong>{current.label}</strong>
          </div>
          <span className="arch-badge">v{PRODUCT.release.version} CONTRACT</span>
        </div>

        {/* Clean Topological Diagram */}
        <div className="arch-diagram-flow">
          {/* Tier 1: Ingress */}
          <div className="arch-tier-ingress">
            <span className="arch-tier-label">INGRESS / NETWORK BOUNDARY</span>
            <div className="arch-node ingress-node">
              <span className="signal-dot" />
              <strong>External Webhook &amp; Client Ingress (HTTPS :443)</strong>
              <small>TLS termination · reverse proxy / ingress controller</small>
            </div>
          </div>

          <div className="arch-diagram-arrow" aria-hidden="true">↓</div>

          {/* Tier 2: Runtime Roles */}
          <div className="arch-tier-runtime">
            <div className="flex items-center justify-between mb-2">
              <span className="arch-tier-label">
                APPLICATION RUNTIME TIER ·{" "}
                {active === 0 ? "INTEGRATED" : "INDEPENDENT ROLES"}
              </span>
              <span className="arch-tier-sub">
                {active === 0 ? "1 container" : `${current.roles.length} independent processes`}
              </span>
            </div>
            <div className="arch-roles-grid">
              {current.roles.map((role) => (
                <div key={role.name} className="arch-role-card">
                  <div className="flex items-center gap-2">
                    <span className="signal-dot" />
                    <strong>{role.name}</strong>
                  </div>
                  <small>{role.desc}</small>
                </div>
              ))}
            </div>
          </div>

          <div className="arch-diagram-arrow" aria-hidden="true">↓</div>

          {/* Tier 3: Storage & Connection Pooling */}
          <div className="arch-tier-storage">
            <span className="arch-tier-label">DURABLE STATE LAYER</span>
            <div className="arch-storage-nodes">
              {current.pooling && (
                <div className="arch-node pooling-node">
                  <span className="signal-dot" />
                  <strong>PgBouncer</strong>
                  <small>Transaction connection pool</small>
                </div>
              )}
              <div className="arch-node db-node">
                <span className="signal-dot success" />
                <strong>PostgreSQL 16+</strong>
                <small>Durable state, relation store &amp; audit ledgers</small>
              </div>
            </div>
          </div>
        </div>

        {/* Architecture Notes & Context Panel */}
        <div className="arch-context-footer">
          <div className="arch-context-copy">
            <p className="arch-context-desc">{current.desc}</p>
            <p className="arch-context-ha">
              <span className="font-semibold text-amber-400">HA boundary:</span>{" "}
              {current.haNote}
            </p>
          </div>
          <Link
            className="site-text-link"
            href={productDocs(current.docs)}
          >
            View deployment guide <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </div>
  );
}


export {
  ProductProofShowcase,
  PRODUCT_PROOFS,
  type ProductProofAnnotation,
  type ProductProofItem,
} from "./ProductProofShowcase";


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
