"use client";
import { useState } from "react";
import { PRODUCT } from "@/lib/product";
const flows: Record<
  string,
  { label: string; stages: string[]; detail: string }[]
> = {
  incidents: [
    {
      label: "Triage",
      stages: ["Incoming signal", "Service context", "Priority & urgency", "Incident owner"],
      detail:
        "Start with the signal, attach it to the affected service, classify the incident and make ownership explicit before the response fragments across tools.",
    },
    {
      label: "Response",
      stages: ["Acknowledge", "Assign responder", "Investigate", "Record timeline"],
      detail:
        "Acknowledgement changes the response state; assignment identifies the current owner. Notes, watchers and timeline entries preserve the operational record.",
    },
    {
      label: "Recovery",
      stages: ["Service restored", "Resolve incident", "Preserve evidence", "Create follow-up"],
      detail:
        "Resolution closes the active response but keeps the timeline, delivery evidence and follow-up work available for learning.",
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
      stages: ["Defined interval", "Temporary coverage", "Effective schedule", "Responder"],
      detail:
        "An override changes coverage for its interval. Validate the resulting target before relying on the swap.",
    },
    {
      label: "Escalation",
      stages: ["Primary target", "Configured delay", "Backup target", "Viable final target"],
      detail:
        "Validate delays, channels and available endpoints with a synthetic incident, including an empty schedule scenario.",
    },
  ],
  paging: [
    {
      label: "Critical",
      stages: ["Triggered incident", "Eligible responder", "Provider admission", "Attempt & feedback"],
      detail:
        "Time-sensitive responder work retains a stable delivery identity. Provider acceptance is separate from confirmed delivery.",
    },
    {
      label: "Transactional",
      stages: ["Account operation", "Verified endpoint", "Provider admission", "Attempt & feedback"],
      detail:
        "Authentication, invitations and verification work have a distinct traffic class.",
    },
    {
      label: "Public incident",
      stages: ["Published incident", "Audience projection", "Provider admission", "Subscriber outcome"],
      detail:
        "Customer-facing incident work has its own delivery precedence and audience boundary.",
    },
    {
      label: "Bulk",
      stages: ["Broad broadcast", "Eligible audience", "Capacity admission", "Delivery evidence"],
      detail:
        "Bulk work respects provider capacity and should be monitored separately from critical response work.",
    },
  ],
  "status-pages": [
    {
      label: "Publication",
      stages: ["Internal incident", "Approved public fields", "Status projection", "Customer page"],
      detail:
        "Selected fields cross the privacy boundary. Verify the public page while signed out.",
    },
    {
      label: "Delivery",
      stages: ["Published update", "Eligible subscribers", "Asynchronous attempts", "Delivery evidence"],
      detail:
        "Successful page rendering does not prove subscriber or webhook delivery.",
    },
    {
      label: "Resolution",
      stages: ["Service restored", "Resolution update", "Public verification", "Preserved history"],
      detail: `${PRODUCT.release.version} supports one status page per installation. This is a technical limit.`,
    },
  ],
  analytics: [
    {
      label: "Response time",
      stages: ["Select time window", "Filter population", "Inspect MTTA", "Inspect MTTR"],
      detail:
        "Timing metrics only make sense with the selected incident population and time window visible. Use them to identify a pattern, not to infer root cause automatically.",
    },
    {
      label: "Service trend",
      stages: ["Choose service", "Review incident volume", "Compare response trend", "Open source incidents"],
      detail:
        "Service-level trends help locate repeated operational friction while preserving a path back to the incidents that produced the numbers.",
    },
    {
      label: "Review",
      stages: ["Identify pattern", "Validate evidence", "Create follow-up", "Track improvement"],
      detail:
        "Analytics should feed an owned operational change. Keep the evidence and scope attached to the decision.",
    },
  ],
  postmortems: [
    {
      label: "Evidence",
      stages: ["Resolved incident", "Timeline", "Impact & detection", "Contributing factors"],
      detail:
        "Begin with the incident record and distinguish observed facts from hypotheses before writing the review.",
    },
    {
      label: "Review",
      stages: ["Draft", "5 Whys / analysis", "Team review", "Publish"],
      detail:
        "Use the review to explain system behavior and response friction rather than assigning blame to an individual.",
    },
    {
      label: "Action",
      stages: ["Create action", "Assign owner", "Set due date", "Verify completion"],
      detail:
        "A postmortem is useful when the follow-up work has a clear owner and can be verified as complete.",
    },
  ],
  security: [
    {
      label: "Identity",
      stages: ["OIDC provider", "PKCE / sign-in", "JIT or SCIM", "Effective role"],
      detail:
        "Authentication, provisioning and authorization are separate controls. Validate the effective role after identity mapping.",
    },
    {
      label: "Access",
      stages: ["Role policy", "Resource scope", "Session", "Audit event"],
      detail:
        "Review what the identity can actually read or change, then verify the session and audit trail produced by the action.",
    },
    {
      label: "Operations",
      stages: ["Secrets", "TLS / proxy", "Backups", "Key recovery"],
      detail:
        "Self-hosting keeps control with the operator and also makes secret management, recovery and network hardening operator responsibilities.",
    },
  ],
  operations: [
    {
      label: "Integrated",
      stages: ["Web + background work", "PostgreSQL", "Health Center", "Metrics & logs"],
      detail:
        "The integrated runtime is the simplest operating model. Monitor database capacity, provider health and background work together.",
    },
    {
      label: "Split",
      stages: ["Web", "Scheduler", "Worker roles", "Shared PostgreSQL"],
      detail:
        "Split runtime roles let you scale constrained responsibilities independently, but splitting processes is not the same thing as high availability.",
    },
    {
      label: "Recovery",
      stages: ["Backup", "Restore test", "Upgrade plan", "Synthetic validation"],
      detail:
        "Treat recovery as a tested workflow: restore data, preserve required keys, validate migrations and run a synthetic incident before declaring the platform healthy.",
    },
  ],
  mobile: [
    {
      label: "Install",
      stages: ["Supported browser", "Install PWA", "Sign in", "Open incident"],
      detail:
        "OpsKnight mobile is an installable PWA rather than a separate App Store or Play Store application.",
    },
    {
      label: "Push",
      stages: ["Grant permission", "Register device", "Send test", "Inspect delivery"],
      detail:
        "Browser permission, device registration and product authorization are separate checks. Test on the actual device you expect responders to use.",
    },
    {
      label: "Respond",
      stages: ["Receive page", "Open incident", "Acknowledge / triage", "Continue response"],
      detail:
        "Mobile response keeps the same installation identity and incident state as the desktop experience; browser and OS behavior still affect notification delivery.",
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
        <div className="chatops-provider-panel" aria-label={`${provider} incident collaboration flow`}>
          <div className="chatops-provider-head">
            <span className="signal-dot" />
            <strong>{provider}</strong>
            <small>INCIDENT COLLABORATION</small>
          </div>
          <div className="chatops-provider-incident">
            <span>P1</span>
            <div>
              <strong>Checkout API latency</strong>
              <small>Northstar Systems · Commerce Reliability</small>
            </div>
          </div>
          <div className="chatops-provider-actions">
            <span>ACKNOWLEDGE</span>
            <span>ASSIGN</span>
            <span>RESOLVE</span>
          </div>
          <div className="chatops-provider-foot">
            <span>Identity + permissions checked before action</span>
            <span>OpsKnight remains system of record</span>
          </div>
        </div>
      </div>
    </div>
  );
}
