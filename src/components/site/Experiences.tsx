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
import { ProductScreenshot } from "./Primitives";
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
  const theater = useRef<HTMLDivElement>(null);
  const manual = useRef(false);
  const [cinematic, setCinematic] = useState(false);
  useEffect(() => {
    const media = window.matchMedia(
      "(min-width: 1180px) and (min-height: 760px) and (prefers-reduced-motion: no-preference)",
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
        if (manual.current) return;
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0])
          setActive(
            Number((visible[0].target as HTMLElement).dataset.loopChapter),
          );
      },
      { rootMargin: "-20% 0px -40% 0px", threshold: [0, 0.2, 0.4, 0.6] },
    );
    chapters.forEach((chapter) => observer.observe(chapter));
    const resume = () => {
      manual.current = false;
    };
    window.addEventListener("wheel", resume, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("wheel", resume);
    };
  }, [cinematic]);
  function select(i: number) {
    manual.current = true;
    setActive(i);
  }
  const step = steps[active],
    Icon = step.icon;
  return (
    <div
      className={`incident-theater ${cinematic ? "cinematic" : ""}`}
      ref={theater}
    >
      <div className="incident-experience" ref={ref}>
        <div
          className="loop-tabs"
          role="tablist"
          aria-label="Incident lifecycle"
        >
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
            <p className="site-eyebrow">ASTER CLOUD / ILLUSTRATIVE WORKFLOW</p>
            <h3>{step.title}</h3>
            <p>{step.detail}</p>
            <div className="loop-controls">
              <span>{String(active + 1).padStart(2, "0")} / 10</span>
              <button onClick={() => select((active + 1) % steps.length)}>
                Next step <ArrowRight size={16} />
              </button>
            </div>
          </div>
          <div className="signal-stage">
            <div className="stage-orbit" />
            <div className="theater-signal-path" aria-hidden="true">
              <span className="signal-dot" />
            </div>
            {cinematic && <TheaterScene active={active} />}

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
      <div
        className="theater-chapters"
        aria-label="Scroll through the incident lifecycle"
      >
        {steps.map((chapter, index) => (
          <section
            key={chapter.label}
            data-loop-chapter={index}
            className="theater-chapter"
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
      {cinematic && <ProductCanvas active={active} />}
    </div>
  );
}

export function ProductCanvas({ active }: { active: number }) {
  return (
    <div className="product-canvas-card" aria-hidden="false">
      <div className="canvas-header">
        <div className="canvas-traffic-lights" aria-hidden="true">
          <span className="light-dot red" />
          <span className="light-dot yellow" />
          <span className="light-dot green" />
        </div>
        <div className="canvas-title">
          <span>OPSKNIGHT COMMAND</span>
          <span className="canvas-sep">/</span>
          <span>ASTER CLOUD</span>
        </div>
        <div className="canvas-status-badge">
          <span className="signal-dot" />
          <span>{steps[active].label.toUpperCase()}</span>
        </div>
      </div>
      <div className="canvas-body">
        {/* Scene 0: Detect */}
        <div className={`canvas-scene ${active === 0 ? "active" : ""}`}>
          <div className="telemetry-card">
            <div className="telemetry-header">
              <span className="telemetry-source">
                <Image src="/integrations/datadog.svg" width={22} height={22} alt="Datadog" />
                DATADOG INGEST WEBHOOK
              </span>
              <span className="telemetry-severity">CRITICAL</span>
            </div>
            <div className="telemetry-event">Checkout API Latency &gt; 4,500ms</div>
            <div className="telemetry-metrics">
              <div><span>p95 Latency</span><strong>4,820ms</strong></div>
              <div><span>Threshold</span><strong>1,500ms</strong></div>
              <div><span>Service</span><strong>checkout-api</strong></div>
              <div><span>Environment</span><strong>Production US-East</strong></div>
            </div>
            <div className="telemetry-footer">
              <span>Ingested: 14:23:08 UTC</span>
              <span>HTTP 200 OK · Validated</span>
            </div>
          </div>
        </div>

        {/* Scene 1: Correlate */}
        <div className={`canvas-scene ${active === 1 ? "active" : ""}`}>
          <div className="correlation-card">
            <div className="correlation-eyebrow">ALERT DEDUPLICATION &amp; CONVERGENCE</div>
            <div className="correlation-signals">
              <div className="signal-pill"><span>•</span> Latency p95 &gt; 4.5s (Datadog)</div>
              <div className="signal-pill"><span>•</span> 502 Bad Gateway Spike (Cloudflare)</div>
              <div className="signal-pill"><span>•</span> Container OOM checkout-worker (Prometheus)</div>
              <div className="signal-pill"><span>•</span> DB Pool Connection Exhaustion (Postgres)</div>
            </div>
            <div className="correlation-arrow">↳ Grouped by Provider Key <code>service:checkout-api</code></div>
            <div className="correlation-outcome">
              <span className="signal-dot" />
              <strong>1 INCIDENT CREATED</strong>
              <span>(4 repeating alerts deduplicated)</span>
            </div>
          </div>
        </div>

        {/* Scene 2: Create (Triggered) */}
        <div className={`canvas-scene ${active === 2 ? "active" : ""}`}>
          <div className="canvas-screenshot-wrapper">
            {active === 2 && (
              <ProductScreenshot
                name="incident-triggered.png"
                alt="OpsKnight triggered incident view with P1 status, escalation policy and service details"
              />
            )}
          </div>
        </div>

        {/* Scene 3: On-Call */}
        <div className={`canvas-scene ${active === 3 ? "active" : ""}`}>
          <div className="canvas-screenshot-wrapper">
            {active === 3 && (
              <ProductScreenshot
                name="on-call-schedule-detail.png"
                alt="OpsKnight on-call schedule with active rotation layers and responder coverage"
              />
            )}
          </div>
        </div>

        {/* Scene 4: Page (Notification Dispatch) */}
        <div className={`canvas-scene ${active === 4 ? "active" : ""}`}>
          <div className="dispatch-card">
            <div className="dispatch-header">
              <PhoneCall size={24} className="dispatch-icon" />
              <div>
                <strong>VOICE &amp; MULTI-CHANNEL DISPATCH</strong>
                <span>Active responder: Anika Rao (Primary On-Call)</span>
              </div>
            </div>
            <div className="dispatch-channels">
              <div className="dispatch-row">
                <span>Twilio Voice Call</span>
                <span className="dispatch-status">Answered · DTMF Ack active</span>
              </div>
              <div className="dispatch-row">
                <span>Web Push Notification</span>
                <span className="dispatch-status">Delivered · 180ms</span>
              </div>
              <div className="dispatch-row">
                <span>Slack Direct Message</span>
                <span className="dispatch-status">Delivered · 240ms</span>
              </div>
            </div>
            <div className="voice-prompt-box">
              <small>LIVE VOICE CALL SIMULATION</small>
              <p>&ldquo;OpsKnight Alert: P1 Critical on Checkout API. Press 1 to acknowledge.&rdquo;</p>
              <span className="phone-key-badge">Press 1 to Ack</span>
            </div>
          </div>
        </div>

        {/* Scene 5: Acknowledge */}
        <div className={`canvas-scene ${active === 5 ? "active" : ""}`}>
          <div className="canvas-screenshot-wrapper">
            {active === 5 && (
              <ProductScreenshot
                name="incident-acknowledged.png"
                alt="OpsKnight acknowledged incident with responder ownership and response timer"
              />
            )}
          </div>
        </div>

        {/* Scene 6: Coordinate (ChatOps War Room) */}
        <div className={`canvas-scene ${active === 6 ? "active" : ""}`}>
          <div className="canvas-screenshot-wrapper">
            {active === 6 && (
              <ProductScreenshot
                name="teams-chatops-war-room.png"
                alt="OpsKnight Microsoft Teams ChatOps war room with collaborative response actions"
              />
            )}
          </div>
        </div>

        {/* Scene 7: Communicate (Status Page) */}
        <div className={`canvas-scene ${active === 7 ? "active" : ""}`}>
          <div className="canvas-screenshot-wrapper">
            {active === 7 && (
              <ProductScreenshot
                name="status-pages.png"
                alt="OpsKnight public status page with service degradation update and customer messaging"
              />
            )}
          </div>
        </div>

        {/* Scene 8: Resolve */}
        <div className={`canvas-scene ${active === 8 ? "active" : ""}`}>
          <div className="resolution-card">
            <div className="resolution-icon">
              <Check size={36} />
            </div>
            <h3>Checkout API Recovered</h3>
            <p>p95 latency returned to 210ms across all availability zones.</p>
            <div className="resolution-stats">
              <div><span>Total Duration</span><strong>18m 42s</strong></div>
              <div><span>Time to Ack</span><strong>1m 24s</strong></div>
              <div><span>Incident State</span><strong className="resolved-text">RESOLVED</strong></div>
            </div>
            <div className="resolution-note">
              Timeline sealed. Audit log preserved. Triggering postmortem review.
            </div>
          </div>
        </div>

        {/* Scene 9: Learn (Postmortem) */}
        <div className={`canvas-scene ${active === 9 ? "active" : ""}`}>
          <div className="canvas-screenshot-wrapper">
            {active === 9 && (
              <ProductScreenshot
                name="postmortems.png"
                alt="OpsKnight postmortem review with root cause analysis and action items"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function TheaterScene({ active }: { active: number }) {
  const image =
    active === 2
      ? "incident-triggered.png"
      : active === 5
        ? "incident-acknowledged.png"
        : active === 3
          ? "on-call-schedule-detail.png"
          : active === 6
            ? "teams-chatops-war-room.png"
            : active === 7
              ? "status-pages.png"
              : active === 9
                ? "postmortems.png"
                : null;
  if (image)
    return (
      <div className={`theater-product scene-${active}`}>
        <ProductScreenshot
          name={image}
          alt={`Real OpsKnight product evidence for ${steps[active].label.toLowerCase()}`}
        />
      </div>
    );
  if (active === 4)
    return (
      <div className="theater-phone">
        <PhoneCall size={26} />
        <small>ILLUSTRATIVE VOICE PAGE</small>
        <strong>Checkout needs you.</strong>
        <span>Anika Rao · P1 incident</span>
        <span className="phone-response">Acknowledgement input</span>
      </div>
    );
  if (active === 1)
    return (
      <div
        className="converging-signals"
        aria-label="Related signals converge into one incident"
      >
        <span>Latency</span>
        <span>Errors</span>
        <span>Provider key</span>
        <strong>One incident</strong>
      </div>
    );
  if (active === 8)
    return (
      <div className="recovery-scene">
        <Check size={52} />
        <strong>Checkout recovered.</strong>
        <span>Timeline preserved. Follow-up begins.</span>
      </div>
    );
  return (
    <div className="incoming-signal">
      <Image
        src="/integrations/datadog.svg"
        width={48}
        height={48}
        alt="Datadog"
      />
      <strong>Checkout p95 &gt; 4.5s</strong>
      <span>Monitoring signal → OpsKnight</span>
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
