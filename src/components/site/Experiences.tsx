"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
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
} from "lucide-react";
import { PRODUCT, productDocs } from "@/lib/product";
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
    event: "Primary → Anika Rao",
    icon: CalendarDays,
  },
  {
    label: "Page",
    title: "Reach the responder.",
    detail:
      "Configured channels deliver the page. Operators can inspect attempts and delivery outcomes.",
    event: "Voice · Push · Slack",
    icon: PhoneCall,
  },
  {
    label: "Acknowledge",
    title: "Someone owns the response.",
    detail:
      "The responder acknowledges the incident and takes ownership of the next step.",
    event: "Anika Rao acknowledged",
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
export function IncidentLoop() {
  const [active, setActive] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  function select(i: number) {
    setActive(i);
  }
  const step = steps[active],
    Icon = step.icon;
  return (
    <div className="incident-experience" ref={ref}>
      <div className="loop-tabs" role="tablist" aria-label="Incident lifecycle">
        {steps.map((s, i) => (
          <button
            key={s.label}
            id={`loop-tab-${i}`}
            role="tab"
            aria-selected={active === i}
            aria-controls="loop-panel"
            tabIndex={active === i ? 0 : -1}
            onClick={() => select(i)}
            onKeyDown={(e) => {
              const next =
                e.key === "ArrowRight"
                  ? (i + 1) % steps.length
                  : e.key === "ArrowLeft"
                    ? (i + steps.length - 1) % steps.length
                    : e.key === "Home"
                      ? 0
                      : e.key === "End"
                        ? steps.length - 1
                        : null;
              if (next !== null) {
                e.preventDefault();
                select(next);
                document.getElementById(`loop-tab-${next}`)?.focus();
              }
            }}
          >
            <span>{String(i + 1).padStart(2, "0")}</span>
            {s.label}
          </button>
        ))}
      </div>
      <div
        id="loop-panel"
        role="tabpanel"
        aria-labelledby={`loop-tab-${active}`}
        tabIndex={0}
        className="loop-panel"
      >
        <div className="loop-copy">
          <p className="site-eyebrow">NORTHSTAR / ILLUSTRATIVE WORKFLOW</p>
          <h3>{step.title}</h3>
          <p>{step.detail}</p>
          <div className="loop-controls">
            <span>{String(active + 1).padStart(2, "0")} / 10</span>
            <button onClick={() => select((active + 1) % steps.length)}>
              Next step <ArrowRight size={16} />
            </button>
          </div>
        </div>
        <div className="signal-stage" key={active}>
          <div className="stage-orbit" />
          <div className="stage-node">
            <Icon size={30} />
          </div>
          <div className="stage-event">
            <span className="signal-dot" />
            <span>{step.event}</span>
          </div>
          <div className="stage-bottom">
            <span>CHECKOUT API</span>
            <span>INC-1042</span>
          </div>
        </div>
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
          "Anika · on-call",
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
export function IntegrationExplorer() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const categories = Array.from(
    new Set(PRODUCT.integrations.map((p) => p.category)),
  );
  const filtered = PRODUCT.integrations.filter(
    (p) =>
      (category === "all" || p.category === category) &&
      `${p.title} ${p.category}`.toLowerCase().includes(query.toLowerCase()),
  );
  return (
    <div className="integration-explorer">
      <label className="integration-search">
        Search integrations
        <input
          type="search"
          value={query}
          placeholder="Search your stack…"
          onChange={(e) => setQuery(e.target.value)}
        />
      </label>
      <div
        className="integration-filters"
        role="group"
        aria-label="Filter by category"
      >
        {["all", ...categories].map((c) => (
          <button
            aria-pressed={c === category}
            key={c}
            onClick={() => setCategory(c)}
          >
            {c.replaceAll("-", " ")}
          </button>
        ))}
      </div>
      <p className="results-count" aria-live="polite">
        {filtered.length} integrations
      </p>
      <div className="integration-results">
        {filtered.map((p) => (
          <Link
            className="integration-item"
            key={p.id}
            href={`/integrations/${p.id}/`}
          >
            <div className="integration-letter">
              <Image
                src={integrationLogos[p.id]}
                alt=""
                width={36}
                height={36}
              />
            </div>
            <div>
              <h3>
                {p.title}
                <ArrowRight size={17} />
              </h3>
              <p>
                {p.category.replaceAll("-", " ")} · {p.direction}
              </p>
              <div className="integration-actions">
                {p.actions.length
                  ? p.actions.join(" / ")
                  : "See supported workflow"}
              </div>
              <small>
                Authentication:{" "}
                {p.authentication.length
                  ? p.authentication.join(", ")
                  : "See setup guide"}
              </small>
            </div>
          </Link>
        ))}
      </div>
      {!filtered.length && (
        <p className="empty-result">
          No integrations match. Try another search or category.
        </p>
      )}
    </div>
  );
}
