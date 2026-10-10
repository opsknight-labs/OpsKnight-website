"use client";

import { useEffect, useMemo, useState, type CSSProperties } from "react";

type Step = {
  num: string;
  label: string;
  title: string;
  detail: string;
  state: string;
  statusType: string;
  context: string;
  event: string;
};

const TIMES = ["T+00:00", "T+00:04", "T+00:05", "T+00:12", "T+00:19", "T+01:24", "T+03:10", "T+06:02", "T+18:40", "T+2d"];
const W = 1000;
const H = 180;
const HEALTHY = 140;
const THRESHOLD = 96;
const xOf = (i: number) => 50 + i * 100;

// p95 latency as a function of x: quiet, spike at the signal, plateau while working, recovery at resolve.
function latency(x: number) {
  const noise = Math.sin(x * 0.11) * 2.2 + Math.sin(x * 0.037) * 3;
  let y = HEALTHY;
  if (x > 34 && x <= 80) y = HEALTHY - ((x - 34) / 46) * 104;
  else if (x > 80 && x <= 640) y = 36 + Math.sin(x * 0.02) * 6;
  else if (x > 640 && x <= 860) y = 36 + ((x - 640) / 220) ** 1.6 * (HEALTHY - 36);
  else if (x > 860) y = HEALTHY;
  return Math.max(14, Math.min(H - 14, y + noise));
}

export function IncidentTimeline({ steps }: { steps: readonly Step[] }) {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);
  const step = steps[active];

  const line = useMemo(() => {
    const pts: string[] = [];
    for (let x = 0; x <= W; x += 6) pts.push(`${x},${latency(x).toFixed(1)}`);
    return `M${pts.join(" L")}`;
  }, []);
  const area = `${line} L${W},${H} L0,${H} Z`;

  useEffect(() => {
    if (!playing) return;
    const timer = window.setTimeout(() => {
      const next = Math.min(active + 1, steps.length - 1);
      setActive(next);
      if (next === steps.length - 1) setPlaying(false);
    }, 2000);
    return () => window.clearTimeout(timer);
  }, [playing, active, steps.length]);

  const go = (i: number) => {
    setPlaying(false);
    setActive(i);
  };

  return (
    <div
      id="ten-steps-disclosure"
      className="tl"
      data-playing={playing || undefined}
      style={{ "--x": xOf(active) / W } as CSSProperties}
    >
      <div className="tl-top">
        <div>
          <h3>Replay the whole incident.</h3>
          <p>One checkout incident, from the first spike in latency to the postmortem. Pick any moment, or let it play.</p>
        </div>
        <button
          type="button"
          className="tl-play"
          aria-pressed={playing}
          onClick={() => {
            if (!playing && active === steps.length - 1) setActive(0);
            setPlaying((p) => !p);
          }}
        >
          <span className="tl-play-icon" aria-hidden="true" />
          {playing ? "Pause" : active === steps.length - 1 ? "Replay" : "Play"}
        </button>
      </div>

      <div className="tl-scope">
        <div className="tl-monitor">
          <span className="tl-axis tl-axis--top" aria-hidden="true">p95 latency · Checkout API</span>
          <span className="tl-axis tl-axis--slo" aria-hidden="true">SLO 2.0s</span>

          <svg className="tl-svg" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" aria-hidden="true">
            <defs>
              <linearGradient id="tl-stroke" x1="0" x2={W} y1="0" y2="0" gradientUnits="userSpaceOnUse">
                <stop offset="0" stopColor="#dc2626" />
                <stop offset=".74" stopColor="#dc2626" />
                <stop offset=".86" stopColor="#059669" />
                <stop offset="1" stopColor="#059669" />
              </linearGradient>
              <linearGradient id="tl-fill" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0" stopColor="#dc2626" stopOpacity=".16" />
                <stop offset="1" stopColor="#dc2626" stopOpacity="0" />
              </linearGradient>
            </defs>
            <line className="tl-slo" x1="0" x2={W} y1={THRESHOLD} y2={THRESHOLD} />
            <path className="tl-ghost" d={line} />
          </svg>
          <svg className="tl-svg tl-svg--live" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" aria-hidden="true">
            <path className="tl-area" d={area} />
            <path className="tl-line" d={line} />
          </svg>

          {steps.map((s, i) => (
            <span
              key={s.num}
              className="tl-dot"
              data-state={i < active ? "past" : i === active ? "current" : "next"}
              style={{ left: `${(xOf(i) / W) * 100}%`, top: `${(latency(xOf(i)) / H) * 100}%` } as CSSProperties}
              aria-hidden="true"
            />
          ))}
          <span className="tl-head" aria-hidden="true">
            <span>{TIMES[active]}</span>
          </span>
        </div>

        <div className="ten-steps-stepper tl-steps" aria-label="Incident lifecycle steps">
          {steps.map((s, i) => (
            <button
              key={s.num}
              type="button"
              aria-pressed={i === active}
              data-state={i < active ? "past" : i === active ? "current" : "next"}
              className={`ten-step-btn tl-step${i === active ? " is-active" : ""}`}
              style={{ left: `${(xOf(i) / W) * 100}%` }}
              onClick={() => go(i)}
            >
              <span className="ten-step-num">{s.num}</span>
              <span className="ten-step-label">{s.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div id="loop-panel" className={`tl-panel tl-panel--${step.statusType}`} data-step={active} aria-live="polite">
        <div key={active} className="tl-entry">
          <div className="tl-entry-copy">
            <p className="tl-entry-meta">
              <span>{TIMES[active]}</span> Step {step.num} of {steps.length}
            </p>
            <h4>{step.title}</h4>
            <p>{step.detail}</p>
          </div>
          <div className="tl-log">
            <span className="tl-log-state">{step.state}</span>
            <code>{step.event}</code>
            <span className="tl-log-context">{step.context}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
