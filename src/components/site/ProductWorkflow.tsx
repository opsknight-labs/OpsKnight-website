"use client";
import { useState } from "react";
import { PRODUCT } from "@/lib/product";
import { ProductScreenshot } from "./Primitives";
const flows: Record<
  string,
  { label: string; stages: string[]; detail: string }[]
> = {
  paging: [
    {
      label: "Critical",
      stages: [
        "Triggered incident",
        "Eligible responder",
        "Provider admission",
        "Attempt & feedback",
      ],
      detail:
        "Time-sensitive responder work retains a stable delivery identity. Provider acceptance is separate from confirmed delivery.",
    },
    {
      label: "Transactional",
      stages: [
        "Account operation",
        "Verified endpoint",
        "Provider admission",
        "Attempt & feedback",
      ],
      detail:
        "Authentication, invitations and verification work have a distinct traffic class.",
    },
    {
      label: "Public incident",
      stages: [
        "Published incident",
        "Audience projection",
        "Provider admission",
        "Subscriber outcome",
      ],
      detail:
        "Customer-facing incident work has its own delivery precedence and audience boundary.",
    },
    {
      label: "Bulk",
      stages: [
        "Broad broadcast",
        "Eligible audience",
        "Capacity admission",
        "Delivery evidence",
      ],
      detail:
        "Bulk work respects provider capacity and should be monitored separately from critical response work.",
    },
  ],
  "on-call": [
    {
      label: "Schedule",
      stages: ["Service", "Escalation step", "Effective rotation", "Responder"],
      detail:
        "Schedules resolve the responder at execution time. Inspect coverage in the intended time zone.",
    },
    {
      label: "Override",
      stages: [
        "Defined interval",
        "Temporary coverage",
        "Effective schedule",
        "Responder",
      ],
      detail:
        "An override changes coverage for its interval. Validate the resulting target before relying on the swap.",
    },
    {
      label: "Escalation",
      stages: [
        "Primary target",
        "Configured delay",
        "Backup target",
        "Viable final target",
      ],
      detail:
        "Validate delays, channels and available endpoints with a synthetic incident, including an empty schedule scenario.",
    },
  ],
  "status-pages": [
    {
      label: "Publication",
      stages: [
        "Internal incident",
        "Approved public fields",
        "Status projection",
        "Customer page",
      ],
      detail:
        "Selected fields cross the privacy boundary. Verify the public page while signed out.",
    },
    {
      label: "Delivery",
      stages: [
        "Published update",
        "Eligible subscribers",
        "Asynchronous attempts",
        "Delivery evidence",
      ],
      detail:
        "Successful page rendering does not prove subscriber or webhook delivery.",
    },
    {
      label: "Resolution",
      stages: [
        "Service restored",
        "Resolution update",
        "Public verification",
        "Preserved history",
      ],
      detail: `${PRODUCT.release.version} supports one status page per installation. This is a technical limit.`,
    },
  ],
};
export function ProductWorkflow({ slug }: { slug: string }) {
  const [active, setActive] = useState(0);
  if (slug === "chatops") return <ChatOpsPresentation />;
  const choices = flows[slug];
  if (!choices) return null;
  const selected = choices[active];
  return (
    <div className="product-workflow">
      <p className="site-eyebrow">ILLUSTRATIVE OPERATIONAL FLOW</p>
      <div
        className="workflow-choices"
        role="group"
        aria-label={`${slug} workflow options`}
      >
        {choices.map((choice, index) => (
          <button
            key={choice.label}
            aria-pressed={active === index}
            onClick={() => setActive(index)}
          >
            {choice.label}
          </button>
        ))}
      </div>
      <ol className="product-signal-flow">
        {selected.stages.map((stage, index) => (
          <li key={stage}>
            <span className="signal-dot" />
            <small>{String(index + 1).padStart(2, "0")}</small>
            <strong>{stage}</strong>
          </li>
        ))}
      </ol>
      <p className="workflow-description">{selected.detail}</p>
    </div>
  );
}
function ChatOpsPresentation() {
  const [provider, setProvider] = useState("Slack");
  return (
    <div className="product-workflow">
      <p className="site-eyebrow">ONE INCIDENT / TWO COLLABORATION PROVIDERS</p>
      <div
        className="workflow-choices"
        role="group"
        aria-label="Collaboration provider"
      >
        {["Slack", "Microsoft Teams"].map((name) => (
          <button
            key={name}
            aria-pressed={provider === name}
            onClick={() => setProvider(name)}
          >
            {name}
          </button>
        ))}
      </div>
      <div className="chatops-presentation">
        <div>
          <h3>{provider}. Connected to the incident.</h3>
          <p>
            Provision a room, project incident context, coordinate the response
            and reconcile provider drift.
          </p>
          <p className="site-boundary">
            {provider === "Slack"
              ? "Standard Slack incident actions do not expose manual Escalate. Supported lifecycle actions remain permission- and phase-bound."
              : "Manual escalation is available only where Teams capabilities permit it on an active open incident; it is omitted after acknowledgement or resolution."}
          </p>
          <ol className="chatops-steps">
            <li>Confirm destination and identity links</li>
            <li>Create or reconcile the recorded room</li>
            <li>Verify projected state and authorized actions</li>
            <li>Resolve and complete provider cleanup</li>
          </ol>
        </div>
        <ProductScreenshot
          name="teams-chatops-war-room.png"
          alt="Certified Microsoft Teams war-room product evidence; provider-specific presentation, not a Slack screenshot"
        />
      </div>
    </div>
  );
}
