"use client";

import Link from "next/link";
import { useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import { ArrowRight } from "lucide-react";
import { productDocs } from "@/lib/product";
import { ARCHITECTURE_MODES } from "@/components/site/Experiences";

const SUMMARY: Record<string, string> = {
  compose: "Everything in one container, next to PostgreSQL. The quickest way to evaluate.",
  split: "Each role runs as its own process, so an urgent page never waits behind bulk traffic.",
  kubernetes: "Helm or Kustomize, with every role scaling on its own.",
  swarm: "A Swarm stack with built-in secrets, health checks and rolling updates.",
};

const UNIT: Record<string, string> = {
  compose: "One container",
  split: "Separate processes",
  kubernetes: "Deployments",
  swarm: "Services",
};

type Lane = "urgent" | "bulk" | "request" | "background";

const LANES: { id: Lane; label: string }[] = [
  { id: "urgent", label: "Urgent paging" },
  { id: "bulk", label: "Bulk ingestion" },
  { id: "request", label: "Requests" },
  { id: "background", label: "Background work" },
];

const laneOf = (name: string): Lane =>
  /critical|notification/i.test(name)
    ? "urgent"
    : /bulk/i.test(name)
      ? "bulk"
      : /^web/i.test(name)
        ? "request"
        : "background";

const shortName = (name: string) => name.replace(/ \((Deployment)\)$| Service$/, "");

type Wire = { d: string; lane: Lane; leg: "in" | "out" | "pool"; i: number };

function centre(el: HTMLElement, side: "left" | "right" | "top" | "bottom") {
  const x = el.offsetLeft;
  const y = el.offsetTop;
  const w = el.offsetWidth;
  const h = el.offsetHeight;
  if (side === "left") return [x, y + h / 2];
  if (side === "right") return [x + w, y + h / 2];
  if (side === "top") return [x + w / 2, y];
  return [x + w / 2, y + h];
}

function curve([x1, y1]: number[], [x2, y2]: number[]) {
  const dx = (x2 - x1) / 2;
  return `M${x1} ${y1} C${x1 + dx} ${y1} ${x2 - dx} ${y2} ${x2} ${y2}`;
}

export function HomeArchitecture() {
  const [active, setActive] = useState(0);
  const [wires, setWires] = useState<Wire[]>([]);
  const [box, setBox] = useState({ w: 0, h: 0 });
  const mapRef = useRef<HTMLDivElement>(null);
  const mode = ARCHITECTURE_MODES[active];
  const integrated = mode.id === "compose";

  useLayoutEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    const draw = () => {
      if (window.matchMedia("(max-width: 899px)").matches) {
        setWires([]);
        return;
      }
      const ingress = map.querySelector<HTMLElement>("[data-node~='ingress']");
      const first = map.querySelector<HTMLElement>("[data-node~='store-entry']");
      const pool = map.querySelector<HTMLElement>("[data-node~='pool']");
      const db = map.querySelector<HTMLElement>("[data-node~='db']");
      const roles = [...map.querySelectorAll<HTMLElement>("[data-role]")];
      if (!ingress || !first || !db) return;
      const next: Wire[] = [];
      roles.forEach((role, i) => {
        const lane = role.dataset.lane as Lane;
        next.push({ d: curve(centre(ingress, "right"), centre(role, "left")), lane, leg: "in", i });
        next.push({ d: curve(centre(role, "right"), centre(first, "left")), lane, leg: "out", i });
      });
      if (pool) {
        const [x1, y1] = centre(pool, "bottom");
        const [x2, y2] = centre(db, "top");
        next.push({ d: `M${x1} ${y1} L${x2} ${y2}`, lane: "background", leg: "pool", i: 0 });
      }
      setBox({ w: map.offsetWidth, h: map.offsetHeight });
      setWires(next);
    };
    draw();
    const ro = new ResizeObserver(draw);
    ro.observe(map);
    return () => ro.disconnect();
  }, [active]);

  return (
    <div className="topo">
      <div className="topo-tabs" role="tablist" aria-label="Runtime architecture">
        {ARCHITECTURE_MODES.map((m, i) => (
          <button
            key={m.id}
            id={`arch-tab-${i}`}
            type="button"
            role="tab"
            aria-selected={i === active}
            aria-controls="arch-panel"
            tabIndex={i === active ? 0 : -1}
            onClick={() => setActive(i)}
            onKeyDown={(e) => {
              const next =
                e.key === "ArrowRight"
                  ? (i + 1) % ARCHITECTURE_MODES.length
                  : e.key === "ArrowLeft"
                    ? (i + ARCHITECTURE_MODES.length - 1) % ARCHITECTURE_MODES.length
                    : null;
              if (next !== null) {
                e.preventDefault();
                setActive(next);
                document.getElementById(`arch-tab-${next}`)?.focus();
              }
            }}
          >
            {m.name}
          </button>
        ))}
      </div>

      <div
        id="arch-panel"
        role="tabpanel"
        aria-labelledby={`arch-tab-${active}`}
        tabIndex={0}
        className="topo-panel"
      >
        <p key={`s-${mode.id}`} className="topo-summary">{SUMMARY[mode.id] ?? mode.desc}</p>

        <div key={mode.id} ref={mapRef} className="topo-map" data-integrated={integrated || undefined}>
          <svg
            className="topo-wires"
            width={box.w}
            height={box.h}
            viewBox={`0 0 ${box.w || 1} ${box.h || 1}`}
            aria-hidden="true"
          >
            {wires.map((w, k) => (
              <path key={`b${k}`} d={w.d} className="topo-wire-base" pathLength={100} />
            ))}
            {wires.map((w, k) => (
              <g key={`f${k}`} className={`topo-flow topo-flow--${w.lane}`} data-leg={w.leg}>
                <path d={w.d} pathLength={100} style={{ "--i": w.i } as CSSProperties} />
                {w.lane === "bulk" && (
                  <path d={w.d} pathLength={100} className="topo-flow-echo" style={{ "--i": w.i } as CSSProperties} />
                )}
              </g>
            ))}
          </svg>

          <div className="topo-stage">
            <span className="topo-stage-label">Edge</span>
            <div className="topo-node" data-node="ingress">
              <strong>Ingress</strong>
              <span>HTTPS · TLS</span>
            </div>
          </div>

          <div className="topo-stage topo-stage--runtime">
            <span className="topo-stage-label">
              {UNIT[mode.id]} <em>{mode.roles.length}</em>
            </span>
            <ul className="topo-roles">
              {mode.roles.map((role, i) => {
                const lane = laneOf(role.name);
                return (
                  <li
                    key={role.name}
                    data-role
                    data-lane={lane}
                    style={{ "--i": i } as CSSProperties}
                  >
                    <i aria-hidden="true" />
                    <strong>{shortName(role.name)}</strong>
                    <span>{role.desc}</span>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="topo-stage">
            <span className="topo-stage-label">State</span>
            <div className="topo-store">
              {mode.pooling && (
                <div className="topo-node" data-node="pool store-entry">
                  <strong>PgBouncer</strong>
                  <span>Connection pool</span>
                </div>
              )}
              <div className="topo-node topo-node--db" data-node={mode.pooling ? "db" : "db store-entry"}>
                <strong>PostgreSQL 16+</strong>
                <span>State &amp; audit</span>
              </div>
            </div>
          </div>
        </div>

        <ul className="topo-legend" aria-label="Traffic classes">
          {LANES.map((l) => (
            <li key={l.id} data-lane={l.id}>{l.label}</li>
          ))}
        </ul>

        <div className="topo-foot">
          <p>{mode.haNote}</p>
          <Link className="site-text-link" href={productDocs(mode.docs)}>
            Deployment guide <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
