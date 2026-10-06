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
  const theater = useRef<HTMLDivElement>(null);
  const [cinematic, setCinematic] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(
      "(min-width: 1100px) and (min-height: 760px) and (prefers-reduced-motion: no-preference)",
    );
    const update = () => setCinematic(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!cinematic || !theater.current) return;
    const chapters = theater.current.querySelectorAll<HTMLElement>(
      "[data-loop-chapter]",
    );
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) {
          setActive(
            Number((visible[0].target as HTMLElement).dataset.loopChapter),
          );
        }
      },
      { rootMargin: "-22% 0px -48% 0px", threshold: [0.15, 0.35, 0.6] },
    );
    chapters.forEach((chapter) => observer.observe(chapter));
    return () => observer.disconnect();
  }, [cinematic]);

  const step = steps[active];

  return (
    <div
      className={`incident-theater response-theater ${cinematic ? "cinematic" : "compact"}`}
      ref={theater}
    >
      <div
        className="theater-chapters"
        aria-label="Scroll through the incident lifecycle"
      >
        {steps.map((chapter, index) => (
          <section
            key={chapter.label}
            data-loop-chapter={index}
            className={`theater-chapter ${active === index ? "is-active" : ""}`}
          >
            <p className="site-eyebrow">
              <span className="signal-dot" />
              {String(index + 1).padStart(2, "0")} /{" "}
              {chapter.label.toUpperCase()}
            </p>
            <h3>{chapter.title}</h3>
            <p>{chapter.detail}</p>
          </section>
        ))}
      </div>

      <div className="response-sticky">
        <ResponseCanvas active={active} />
        <div className="response-mobile-copy" aria-live="polite">
          <p className="site-eyebrow">
            {String(active + 1).padStart(2, "0")} / {step.label.toUpperCase()}
          </p>
          <h3>{step.title}</h3>
          <p>{step.detail}</p>
        </div>
        <div className="response-stepper" aria-label="Incident lifecycle steps">
          {steps.map((item, index) => (
            <button
              key={item.label}
              className={active === index ? "is-active" : ""}
              aria-pressed={active === index}
              onClick={() => setActive(index)}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function ResponseCanvas({ active }: { active: number }) {
  const status =
    active >= 8
      ? "RESOLVED"
      : active >= 5
        ? "ACKNOWLEDGED"
        : active >= 2
          ? "TRIGGERED"
          : "SIGNAL RECEIVED";
  const event = steps[active].event;
  const visible = (step: number) => (active >= step ? "is-visible" : "");

  return (
    <div
      className={`response-canvas response-step-${active}`}
      data-step={active}
      aria-label={`Illustrative OpsKnight response workflow. Current state: ${event}`}
    >
      <div className="response-canvas-head">
        <div>
          <span className="signal-dot" />
          ASTER CLOUD / CHECKOUT API
        </div>
        <span className={`response-status status-${status.toLowerCase().replaceAll(" ", "-")}`}>
          {status}
        </span>
      </div>

      <div className="response-canvas-body">
        <div className={`response-sources ${visible(0)}`}>
          <div className="response-source response-source-primary">
            <Image
              src="/integrations/datadog.svg"
              width={28}
              height={28}
              alt=""
            />
            <span>
              <small>DATADOG</small>
              Checkout p95 &gt; 4.5s
            </span>
          </div>
          <div className={`response-source response-source-secondary ${visible(1)}`}>
            <span>
              <small>RELATED SIGNAL</small>
              5xx errors rising
            </span>
          </div>
          <div className={`response-source response-source-secondary ${visible(1)}`}>
            <span>
              <small>CORRELATION</small>
              Same provider key
            </span>
          </div>
        </div>

        <div className={`response-flow-line flow-to-core ${visible(0)}`}>
          <span />
        </div>

        <div className={`response-core ${visible(2)}`}>
          <div className="response-core-brand">
            <span className="signal-dot" />
            OpsKnight
          </div>
          <div className="response-incident">
            <span>P1</span>
            <div>
              <small>INC-1042</small>
              <strong>Elevated checkout error rate</strong>
              <p>Checkout API · Commerce Reliability</p>
            </div>
          </div>
        </div>

        <div className={`response-flow-line flow-to-responder ${visible(3)}`}>
          <span />
        </div>

        <div className={`response-responder ${visible(3)}`}>
          <div className="response-avatar">MC</div>
          <div>
            <small>COMMERCE PRIMARY</small>
            <strong>Maya Chen</strong>
            <span>On-call responder</span>
          </div>
          <span className={`response-owner ${visible(5)}`}>OWNER</span>
        </div>

        <div className={`response-channels ${visible(4)}`}>
          {["Voice", "Push", "SMS", "Teams"].map((channel) => (
            <span key={channel}>{channel}</span>
          ))}
        </div>

        <div className="response-outcomes">
          <div className={`response-outcome ${visible(6)}`}>
            <MessageSquare size={17} />
            <span>
              <small>WAR ROOM</small>
              #inc-1042-checkout
            </span>
          </div>
          <div className={`response-outcome ${visible(7)}`}>
            <Globe size={17} />
            <span>
              <small>PUBLIC STATUS</small>
              Checkout API · Degraded
            </span>
          </div>
          <div className={`response-outcome response-outcome-success ${visible(8)}`}>
            <Check size={17} />
            <span>
              <small>RECOVERY</small>
              Incident resolved
            </span>
          </div>
          <div className={`response-outcome ${visible(9)}`}>
            <Activity size={17} />
            <span>
              <small>FOLLOW-UP</small>
              Postmortem · 2 actions
            </span>
          </div>
        </div>
      </div>

      <div className="response-canvas-foot">
        <span>{event}</span>
        <span>{String(active + 1).padStart(2, "0")} / 10</span>
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
