"use client";
import { useState, useEffect, useRef } from "react";
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
} from "lucide-react";
import { ProductScreenshot } from "./Primitives";
import { PRODUCT, productDocs } from "@/lib/product";
import { BRAND } from "@/lib/brand";
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
    event: "Voice · Push · SMS · Teams",
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
      id="loop-panel"
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

const PRODUCT_PROOFS = [
  {
    id: "command-center",
    label: "Command Center",
    image: "dashboard-overview.png",
    href: "/product/",
    summary: "Operational overview for active incidents, health and response context.",
    alt: "OpsKnight Command Center showing operational health, active incidents and response context",
  },
  {
    id: "incidents",
    label: "Incidents",
    image: "incident-detail.png",
    href: "/product/incidents/",
    summary: "Ownership, responders, service context and timeline in one incident command view.",
    alt: "OpsKnight incident detail showing status, ownership, responders and timeline",
  },
  {
    id: "on-call",
    label: "On-call",
    image: "on-call-schedule-detail.png",
    href: "/product/on-call/",
    summary: "Schedule layers and responder coverage before the page is sent.",
    alt: "OpsKnight on-call schedule showing rotation layers and responder coverage",
  },
  {
    id: "paging",
    label: "Paging",
    image: "notification-settings.png",
    href: "/product/paging/",
    summary: "Notification configuration and delivery controls for operational paging.",
    alt: "OpsKnight notification settings used to configure paging delivery",
  },
  {
    id: "chatops",
    label: "ChatOps",
    image: "teams-chatops-war-room.png",
    href: "/product/chatops/",
    summary: "Microsoft Teams collaboration evidence for the incident response room.",
    alt: "OpsKnight Microsoft Teams incident war room",
  },
  {
    id: "status",
    label: "Status",
    image: "status-pages.png",
    href: "/product/status-pages/",
    summary: "Customer-facing service health and incident communication from the same response workflow.",
    alt: "OpsKnight public status page with service health and incident updates",
    live: true,
  },
  {
    id: "analytics",
    label: "Analytics",
    image: "analytics-overview.png",
    href: "/product/analytics/",
    summary: "Response metrics and operational trends after the incident is under control.",
    alt: "OpsKnight analytics overview showing incident response metrics",
  },
] as const;

type ProductProofId = (typeof PRODUCT_PROOFS)[number]["id"];

export function ProductProofShowcase() {
  const [activeId, setActiveId] = useState<ProductProofId>(
    PRODUCT_PROOFS[0].id,
  );
  const active =
    PRODUCT_PROOFS.find((proof) => proof.id === activeId) ?? PRODUCT_PROOFS[0];

  return (
    <div className="product-proof-experience">
      <div className="product-proof-tabs" role="tablist" aria-label="OpsKnight product views">
        {PRODUCT_PROOFS.map((proof) => (
          <button
            key={proof.id}
            id={`proof-tab-${proof.id}`}
            type="button"
            role="tab"
            aria-selected={active.id === proof.id}
            aria-controls="product-proof-panel"
            onClick={() => setActiveId(proof.id)}
          >
            {proof.label}
          </button>
        ))}
      </div>
      <div
        id="product-proof-panel"
        className="product-proof-panel"
        role="tabpanel"
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

  return (
    <div className="integration-explorer">
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
        <div className="integration-count">
          <strong>{PRODUCT.inboundIntegrationCount}</strong>
          <span>release-verified inbound integrations</span>
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
        {filtered.length} connections match this view · {PRODUCT.inboundIntegrationCount} inbound alert sources + 3 workflow connections
      </p>

      <div className="integration-results">
        {filtered.map((provider) => (
          <button
            className="integration-item"
            key={provider.id}
            type="button"
            onClick={() => setSelectedId(provider.id)}
            aria-label={`Inspect ${provider.title} integration`}
          >
            <div className="integration-letter">
              <Image src={integrationLogos[provider.id]} alt="" width={36} height={36} />
            </div>
            <div>
              <h3>
                {provider.title}
                <ArrowRight size={17} />
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
                  <section>
                    <span>ENDPOINT</span>
                    <code className="integration-contract-code">
                      {selected.method ?? "POST"} {selected.endpoint}
                    </code>
                  </section>
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
