import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import { Check, GitMerge, MessageSquare, PhoneCall, Smartphone, Users } from "lucide-react";

const d = (i: number) => ({ "--d": i } as CSSProperties);

function IncidentHead({
  service = "Checkout API",
  status,
  tone,
  sev = true,
}: {
  service?: string;
  status: ReactNode;
  tone: "alert" | "ack" | "ok" | "neutral";
  sev?: boolean;
}) {
  return (
    <div className="ic-head">
      <div className="ic-id">
        <span className="incident-id-badge">#cm4q7xk2</span>
        <span className="ic-service">{service}</span>
        {sev && <span className="ic-sev">P1</span>}
      </div>
      <div className={`act-status-badge ic-status ic-status--${tone}`}>
        <i aria-hidden="true" />
        {status}
      </div>
    </div>
  );
}

const LATENCY = "0,30 14,29 28,31 42,28 56,30 70,27 84,22 98,12 112,6 126,4 140,5";
const RECOVERY = "0,6 14,4 28,7 42,10 56,16 70,22 84,26 98,28 112,29 126,28 140,29";

export function DetectCard() {
  return (
    <div className="act-card ic-card">
      <IncidentHead tone="alert" status={<span>INGRESS · SIGNAL CORRELATED</span>} />
      <ol className="ic-feed">
        <li style={d(0)}>
          <span className="ic-feed-icon">
            <Image src="/integrations/datadog.svg" width={18} height={18} alt="" />
          </span>
          <div className="ic-feed-body">
            <p className="ic-feed-meta">Datadog · 14:22:07</p>
            <strong>Checkout API · Elevated latency</strong>
            <span>p95 latency &gt; 4.5s (threshold 2.0s)</span>
          </div>
          <svg className="ic-spark ic-spark--alert" viewBox="0 0 140 34" aria-hidden="true">
            <polyline points={LATENCY} pathLength={100} />
          </svg>
        </li>
        <li style={d(1)}>
          <span className="ic-feed-icon ic-feed-icon--muted">
            <GitMerge size={15} />
          </span>
          <div className="ic-feed-body">
            <p className="ic-feed-meta">Correlated · 14:22:11</p>
            <strong>Related signal folded in</strong>
            <span>
              Key <code>checkout-api-latency</code>
            </span>
          </div>
        </li>
        <li style={d(2)} className="ic-feed-incident">
          <span className="ic-feed-icon ic-feed-icon--alert">P1</span>
          <div className="ic-feed-body">
            <p className="ic-feed-meta">Incident opened · 14:22:12</p>
            <strong>Elevated checkout error rate</strong>
            <span>Checkout API · Commerce Reliability</span>
          </div>
        </li>
      </ol>
    </div>
  );
}

const CHANNELS = [
  { icon: PhoneCall, name: "Voice call", done: "Answered", t: "+0:04" },
  { icon: Smartphone, name: "Mobile push", done: "Delivered", t: "+0:02" },
  { icon: MessageSquare, name: "SMS", done: "Delivered", t: "+0:03" },
  { icon: Users, name: "Microsoft Teams", done: "Card posted", t: "+0:02" },
];

export function RespondCard() {
  return (
    <div className="act-card ic-card">
      <IncidentHead tone="ack" status={<span>ACKNOWLEDGED · 00:01:24</span>} />
      <div className="ic-person">
        <span className="ic-avatar ic-avatar--ring">MC</span>
        <div>
          <strong>Maya Chen</strong>
          <span>Commerce primary · Americas rotation</span>
        </div>
        <span className="ic-tag ic-tag--ok">On call</span>
      </div>
      <ul className="ic-channels">
        {CHANNELS.map(({ icon: Icon, name, done, t }, i) => (
          <li key={name} style={d(i)}>
            <Icon size={15} aria-hidden="true" />
            <span className="ic-channel-name">{name}</span>
            <span className="ic-channel-time">{t}</span>
            <span className="ic-channel-state">
              <span className="ic-sending">Sending</span>
              <span className="ic-done">
                <Check size={13} aria-hidden="true" /> {done}
              </span>
            </span>
          </li>
        ))}
      </ul>
      <p className="ic-foot">
        Owned by <strong>Maya Chen</strong>. Escalation timer cancelled.
      </p>
    </div>
  );
}

const CHAT = [
  { who: "Maya Chen", init: "MC", t: "14:24", msg: "Investigating checkout latency spike after deployment v2.4.1." },
  { who: "Daniel Vance", init: "DV", t: "14:26", msg: "Read replicas healthy. Isolating third-party gateway pool." },
  { who: "OpsKnight", init: "OK", t: "14:27", msg: "Attached APM trace evidence to the incident timeline.", bot: true },
];

export function CoordinateCards() {
  return (
    <div className="ic-stack">
      <div className="coordinate-card internal-room ic-card">
        <IncidentHead service="War Room" tone="neutral" sev={false} status={<span>inc-x9t2bq7e-g1</span>} />
        <ul className="ic-chat">
          {CHAT.map((c, i) => (
            <li key={c.t} style={d(i)} data-bot={c.bot || undefined}>
              <span className="ic-avatar ic-avatar--sm">{c.init}</span>
              <div className="ic-chat-body">
                <span className="ic-typing" aria-hidden="true"><i /><i /><i /></span>
                <p className="ic-chat-meta">
                  <strong>{c.who}</strong> {c.t}
                </p>
                <p className="ic-chat-msg">{c.msg}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="coordinate-card public-status ic-card ic-card--float">
        <div className="ic-status-page">
          <p className="ic-feed-meta">status.northstar.io</p>
          <div className="ic-status-row">
            <strong>Checkout &amp; Billing API</strong>
            <span className="ic-tag ic-tag--warn">DEGRADED</span>
          </div>
          <div className="ic-uptime" aria-hidden="true">
            {Array.from({ length: 30 }, (_, i) => (
              <i key={i} data-bad={i === 29 || undefined} />
            ))}
          </div>
          <p className="ic-status-update">
            <span>Update · 14:28 UTC</span>
            Investigating elevated checkout latency. Next update in 15 minutes.
          </p>
        </div>
      </div>
    </div>
  );
}

export function RecoverCard() {
  return (
    <div className="act-card ic-card">
      <IncidentHead tone="ok" status={<span>RESOLVED · 14:38 UTC</span>} />
      <div className="ic-metrics">
        <div style={d(0)}>
          <span>Time to acknowledge</span>
          <strong>1m 24s</strong>
        </div>
        <div style={d(1)}>
          <span>Time to resolve</span>
          <strong>18m 40s</strong>
        </div>
        <div style={d(2)}>
          <span>p95 latency</span>
          <strong className="ic-ok ic-count">
            <span className="sr-only">42ms</span>
          </strong>
          <svg className="ic-spark ic-spark--ok" viewBox="0 0 140 34" aria-hidden="true">
            <polyline points={RECOVERY} pathLength={100} />
          </svg>
        </div>
      </div>
      <ul className="ic-checklist">
        {[
          ["Timeline preserved", "Every event and audit entry, timestamped"],
          ["Response metrics recorded", "Measured against your reliability objectives"],
          ["Postmortem opened", "3 follow-up actions, each with an owner"],
        ].map(([title, body], i) => (
          <li key={title} style={d(i)}>
            <span className="ic-check">
              <Check size={12} aria-hidden="true" />
            </span>
            <div>
              <strong>{title}</strong>
              <span>{body}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
