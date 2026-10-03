"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Terminal, Server, Globe2, Radio } from "lucide-react";
import { cn } from "@/lib/utils";

// Deterministic star field matching the login animation specification
function generateStars(count: number) {
  let seed = 1337;
  const rand = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
  return Array.from({ length: count }, (_, i) => {
    const r = rand();
    const size = r < 0.82 ? 1 : r < 0.96 ? 1.5 : 2;
    return {
      id: i,
      top: rand() * 100,
      left: rand() * 100,
      size,
      opacity: 0.25 + rand() * 0.45,
      duration: 3 + rand() * 5,
      delay: -(rand() * 8),
    };
  });
}

const STARS = generateStars(70);

const CONTINENTS_IMG_URL = "url('/earth-continents.svg')";
const CITY_LIGHTS_IMG_URL = "url('/earth-city-lights.svg')";
const CLOUDS_IMG_URL = "url('/earth-clouds.webp')";

const TILE_W = 800;
const CONTINENT_PERIOD_S = 55;
const CLOUD_PERIOD_S = 68;

const LIFECYCLE_S = 36;
const TRIGGERED_UNTIL_S = 9;
const ACKNOWLEDGED_UNTIL_S = 22;
const RESOLVED_UNTIL_S = 30;

type Phase = "triggered" | "acknowledged" | "resolved" | "idle";

const PHASE_COLOR = new Map<Phase, string>([
  ["triggered", "#ef4444"],
  ["acknowledged", "#f59e0b"],
  ["resolved", "#10b981"],
  ["idle", "#64748b"],
]);

type IncidentMarker = {
  u: number;
  v: number;
  id: string;
  service: string;
  responder: string;
  location: string;
  phaseOffsetS: number;
};

const INCIDENT_MARKERS: IncidentMarker[] = [
  {
    u: 185,
    v: 140,
    id: "INC-2481",
    service: "Payments API",
    responder: "A. Fernandes",
    location: "New York",
    phaseOffsetS: 0,
  },
  {
    u: 406,
    v: 116,
    id: "INC-3390",
    service: "Auth Gateway",
    responder: "M. Okafor",
    location: "London",
    phaseOffsetS: 7.2,
  },
  {
    u: 680,
    v: 126,
    id: "INC-5127",
    service: "Checkout Service",
    responder: "K. Tanaka",
    location: "Tokyo",
    phaseOffsetS: 14.4,
  },
  {
    u: 562,
    v: 158,
    id: "INC-6642",
    service: "Notification Queue",
    responder: "P. Sharma",
    location: "Mumbai",
    phaseOffsetS: 21.6,
  },
  {
    u: 288,
    v: 258,
    id: "INC-7215",
    service: "Search Cluster",
    responder: "L. Moreira",
    location: "São Paulo",
    phaseOffsetS: 28.8,
  },
];

type NetworkRoute = {
  id: string;
  fromId: string;
  toId: string;
  color: string;
};

const NETWORK_ROUTES: NetworkRoute[] = [
  { id: "route-ny-lon", fromId: "INC-2481", toId: "INC-3390", color: "#38bdf8" },
  { id: "route-lon-mum", fromId: "INC-3390", toId: "INC-6642", color: "#ef4444" },
  { id: "route-mum-tok", fromId: "INC-6642", toId: "INC-5127", color: "#38bdf8" },
  { id: "route-ny-sp", fromId: "INC-2481", toId: "INC-7215", color: "#f59e0b" },
];

function phaseAt(localS: number): { phase: Phase; phaseProgress: number } {
  if (localS < TRIGGERED_UNTIL_S) {
    return { phase: "triggered", phaseProgress: localS / TRIGGERED_UNTIL_S };
  }
  if (localS < ACKNOWLEDGED_UNTIL_S) {
    return {
      phase: "acknowledged",
      phaseProgress: (localS - TRIGGERED_UNTIL_S) / (ACKNOWLEDGED_UNTIL_S - TRIGGERED_UNTIL_S),
    };
  }
  if (localS < RESOLVED_UNTIL_S) {
    return {
      phase: "resolved",
      phaseProgress: (localS - ACKNOWLEDGED_UNTIL_S) / (RESOLVED_UNTIL_S - ACKNOWLEDGED_UNTIL_S),
    };
  }
  return {
    phase: "idle",
    phaseProgress: (localS - RESOLVED_UNTIL_S) / (LIFECYCLE_S - RESOLVED_UNTIL_S),
  };
}

function formatClock(totalSeconds: number): string {
  const s = Math.max(0, Math.floor(totalSeconds));
  return `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
}

const STRIP_GEOMETRY: React.CSSProperties = {
  top: 0,
  height: "100%",
  left: `${-TILE_W}px`,
  width: `calc(100% + ${TILE_W}px)`,
  backgroundRepeat: "repeat-x",
  backgroundSize: "800px 400px",
  backgroundPosition: "0 0%",
  willChange: "transform",
};

export function MissionControlSection() {
  const globeRef = useRef<HTMLDivElement | null>(null);
  const continentsRef = useRef<HTMLDivElement | null>(null);
  const lightsRef = useRef<HTMLDivElement | null>(null);
  const cloudsRef = useRef<HTMLDivElement | null>(null);
  const cloudShadowRef = useRef<HTMLDivElement | null>(null);
  const routePathsRef = useRef(new Map<string, SVGPathElement | null>());
  const routePacketsRef = useRef(new Map<string, SVGCircleElement | null>());

  const [activeIncident, setActiveIncident] = useState<IncidentMarker>(INCIDENT_MARKERS[0]);
  const [activePhase, setActivePhase] = useState<Phase>("triggered");
  const [activeElapsed, setActiveElapsed] = useState("00:04");

  useEffect(() => {
    let rafId: number;
    let boxW = 500;
    let boxH = 500;

    const updateDimensions = () => {
      if (globeRef.current) {
        boxW = globeRef.current.clientWidth || 500;
        boxH = globeRef.current.clientHeight || 500;
      }
    };
    updateDimensions();

    const resizeObserver = new ResizeObserver(updateDimensions);
    if (globeRef.current) resizeObserver.observe(globeRef.current);

    const startTime = performance.now();

    const frame = (time: number) => {
      const elapsedS = (time - startTime) / 1000;

      // Rotate continents, lights, and clouds
      const continentOffset = ((elapsedS / CONTINENT_PERIOD_S) % 1) * TILE_W;
      const cloudOffset = ((elapsedS / CLOUD_PERIOD_S) % 1) * TILE_W;

      if (continentsRef.current) {
        continentsRef.current.style.transform = `translate3d(${continentOffset}px, 0, 0)`;
      }
      if (lightsRef.current) {
        lightsRef.current.style.transform = `translate3d(${continentOffset}px, 0, 0)`;
      }
      if (cloudsRef.current) {
        cloudsRef.current.style.transform = `translate3d(${cloudOffset}px, 0, 0)`;
      }
      if (cloudShadowRef.current) {
        cloudShadowRef.current.style.transform = `translate3d(${cloudOffset}px, 0, 0)`;
      }

      // Calculate city coordinates on visible sphere
      const placements = new Map<
        string,
        { bx: number; by: number; alpha: number; phase: Phase }
      >();

      for (const m of INCIDENT_MARKERS) {
        const uCurrent = (m.u + continentOffset) % TILE_W;
        const lonDeg = (uCurrent / TILE_W) * 360 - 180;
        const latDeg = 90 - (m.v / 400) * 180;

        const lambda = (lonDeg * Math.PI) / 180;
        const phi = (latDeg * Math.PI) / 180;

        const cosPhi = Math.cos(phi);
        const sinPhi = Math.sin(phi);
        const cosLambda = Math.cos(lambda);
        const sinLambda = Math.sin(lambda);

        // Perspective projection on front hemisphere
        const alpha = cosPhi * cosLambda;
        const bx = boxW * 0.5 + boxW * 0.49 * cosPhi * sinLambda;
        const by = boxH * 0.5 - boxH * 0.49 * sinPhi;

        const localS = (elapsedS + m.phaseOffsetS) % LIFECYCLE_S;
        const { phase } = phaseAt(localS);

        placements.set(m.id, { bx, by, alpha, phase });
      }

      // Update network route curves
      for (const r of NETWORK_ROUTES) {
        const pFrom = placements.get(r.fromId);
        const pTo = placements.get(r.toId);
        const pathEl = routePathsRef.current.get(r.id);
        const packetEl = routePacketsRef.current.get(r.id);

        if (pFrom && pTo && pFrom.alpha > 0.05 && pTo.alpha > 0.05) {
          const midX = (pFrom.bx + pTo.bx) / 2;
          const midY = (pFrom.by + pTo.by) / 2 - 25;
          const d = `M ${pFrom.bx.toFixed(1)} ${pFrom.by.toFixed(1)} Q ${midX.toFixed(1)} ${midY.toFixed(1)} ${pTo.bx.toFixed(1)} ${pTo.by.toFixed(1)}`;

          if (pathEl) {
            pathEl.setAttribute("d", d);
            pathEl.style.opacity = "0.75";
          }

          if (packetEl) {
            const travel = (elapsedS * 0.6) % 1;
            const t = travel;
            const px = (1 - t) * (1 - t) * pFrom.bx + 2 * (1 - t) * t * midX + t * t * pTo.bx;
            const py = (1 - t) * (1 - t) * pFrom.by + 2 * (1 - t) * t * midY + t * t * pTo.by;
            packetEl.setAttribute("cx", px.toFixed(1));
            packetEl.setAttribute("cy", py.toFixed(1));
            packetEl.style.opacity = "1";
          }
        } else {
          if (pathEl) pathEl.style.opacity = "0";
          if (packetEl) packetEl.style.opacity = "0";
        }
      }

      // Update primary active state card periodically
      const currentIdx = Math.floor(elapsedS / 6) % INCIDENT_MARKERS.length;
      const cur = INCIDENT_MARKERS[currentIdx];
      const localS = (elapsedS + cur.phaseOffsetS) % LIFECYCLE_S;
      const { phase } = phaseAt(localS);

      setActiveIncident(cur);
      setActivePhase(phase);
      setActiveElapsed(formatClock(Math.min(localS, RESOLVED_UNTIL_S)));

      rafId = requestAnimationFrame(frame);
    };

    rafId = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
    };
  }, []);

  const phaseColor = PHASE_COLOR.get(activePhase) ?? "#ef4444";

  return (
    <section className="relative overflow-hidden border-b border-slate-800 bg-[#04060d] py-20 text-white md:py-28">
      {/* Subtle starfield */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        {STARS.map((s) => (
          <span
            key={s.id}
            className="absolute rounded-full bg-white"
            style={{
              top: `${s.top}%`,
              left: `${s.left}%`,
              width: s.size,
              height: s.size,
              opacity: s.opacity,
            }}
          />
        ))}
        {/* Soft radial glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(210,26,27,0.12),transparent_70%)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-14">
          {/* Left Column: Narrative Copy */}
          <div className="lg:col-span-6">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-950/40 px-3.5 py-1 text-xs font-semibold text-red-400">
              <Radio className="h-3.5 w-3.5 text-red-500 animate-pulse" />
              <span>Worldwide Incident Command</span>
            </div>

            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-5xl lg:text-[3.1rem] leading-[1.14]">
              You are not{" "}
              <span className="font-serif italic font-normal text-red-500">
                the only one awake.
              </span>
            </h2>

            <p className="mt-5 text-base leading-relaxed text-slate-300 sm:text-lg">
              When production goes down at 2:00 AM in New York, London, or Tokyo, alerts never get lost in Slack channels or silenced by phone focus modes.
            </p>

            <p className="mt-3 text-sm leading-relaxed text-slate-400">
              OpsKnight places automated telephone voice calls directly to whoever is on rotation, opens dedicated war rooms, notifies subscribers on your status page, and tracks SLA resolution timelines — completely self-hosted on your own PostgreSQL.
            </p>

            {/* Architecture Invariants */}
            <div className="mt-8 grid grid-cols-2 gap-4 border-t border-slate-800/80 pt-6">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold text-white">
                  <ShieldCheck className="h-4 w-4 text-emerald-400" />
                  <span>Zero Cloud Phone-Home</span>
                </div>
                <p className="mt-1 text-xs leading-normal text-slate-400">
                  Incident details and customer PII remain inside your private VPC.
                </p>
              </div>

              <div>
                <div className="flex items-center gap-2 text-xs font-semibold text-white">
                  <Server className="h-4 w-4 text-sky-400" />
                  <span>Direct Wholesale Telephony</span>
                </div>
                <p className="mt-1 text-xs leading-normal text-slate-400">
                  Connect your Twilio account directly. Zero per-seat or paging markups.
                </p>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/install"
                className="inline-flex h-11 items-center justify-center rounded-[12px] bg-[#d21a1b] px-6 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#b41516] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
              >
                Deploy On Your Servers
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link
                href="/docs/v2.0.0/start"
                className="inline-flex h-11 items-center justify-center rounded-[12px] border border-slate-700 bg-slate-900/60 px-5 text-sm font-semibold text-slate-200 transition-colors hover:border-slate-600 hover:bg-slate-800"
              >
                <Terminal className="mr-2 h-4 w-4 text-slate-400" />
                Read Architecture Docs
              </Link>
            </div>
          </div>

          {/* Right Column: Globe Animation + Live Incident Pill */}
          <div className="relative flex flex-col items-center justify-center lg:col-span-6">
            {/* Live Incident Status HUD Pill */}
            <div className="mb-4 w-full max-w-sm rounded-[14px] border border-slate-800 bg-[#0a0f1d]/90 p-4 shadow-xl backdrop-blur-md">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className="h-2 w-2 rounded-full animate-ping"
                    style={{ backgroundColor: phaseColor }}
                  />
                  <span className="font-mono text-xs font-bold text-white">
                    {activeIncident.id}
                  </span>
                  <span className="text-xs text-slate-400">· {activeIncident.location}</span>
                </div>
                <span
                  className="font-mono text-xs font-semibold"
                  style={{ color: phaseColor }}
                >
                  {activeElapsed}
                </span>
              </div>

              <div className="mt-2.5 flex items-center justify-between text-xs">
                <span className="font-medium text-slate-200">{activeIncident.service}</span>
                <span className="text-slate-400">
                  {activePhase === "triggered" && "Paging on-call rotation…"}
                  {activePhase === "acknowledged" && `${activeIncident.responder} acknowledged`}
                  {activePhase === "resolved" && `${activeIncident.responder} resolved`}
                  {activePhase === "idle" && "All systems operational"}
                </span>
              </div>

              {/* Progress bar */}
              <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-slate-800">
                <div
                  className="h-full transition-all duration-500 ease-out"
                  style={{
                    backgroundColor: phaseColor,
                    width:
                      activePhase === "triggered"
                        ? "33%"
                        : activePhase === "acknowledged"
                          ? "66%"
                          : "100%",
                  }}
                />
              </div>
            </div>

            {/* Earth Canvas Disc */}
            <div
              className="relative aspect-square w-full max-w-[440px] sm:max-w-[480px] lg:max-w-[500px]"
              aria-hidden="true"
            >
              {/* Outer Atmosphere Glow */}
              <div
                className="pointer-events-none absolute inset-0 rounded-full"
                style={{
                  margin: "-4%",
                  background:
                    "radial-gradient(circle at 35% 30%, rgba(56,189,248,0.20) 50%, rgba(14,165,233,0.06) 68%, transparent 76%)",
                  filter: "blur(20px)",
                }}
              />

              {/* Globe Container */}
              <div
                ref={globeRef}
                className="relative h-full w-full overflow-hidden rounded-full shadow-[0_0_60px_10px_rgba(56,189,248,0.25),0_0_0_1.5px_rgba(186,230,253,0.22),inset_0_0_60px_rgba(0,0,0,0.65)]"
              >
                {/* Ocean Background */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "radial-gradient(circle at 35% 30%, #175472 0%, #0c334b 35%, #071e30 65%, #030c16 100%)",
                  }}
                />

                {/* Rotating Continents */}
                <div
                  ref={continentsRef}
                  className="pointer-events-none absolute opacity-90"
                  style={{
                    ...STRIP_GEOMETRY,
                    backgroundImage: CONTINENTS_IMG_URL,
                  }}
                />

                {/* Night-side City Lights */}
                <div
                  className="pointer-events-none absolute inset-0 overflow-hidden mix-blend-screen"
                  style={{
                    WebkitMaskImage:
                      "radial-gradient(circle at 32% 28%, transparent 42%, rgba(0,0,0,0.5) 64%, #000 84%)",
                    maskImage:
                      "radial-gradient(circle at 32% 28%, transparent 42%, rgba(0,0,0,0.5) 64%, #000 84%)",
                  }}
                >
                  <div
                    ref={lightsRef}
                    className="absolute"
                    style={{
                      ...STRIP_GEOMETRY,
                      backgroundImage: CITY_LIGHTS_IMG_URL,
                      filter: "drop-shadow(0 0 2px rgba(255,190,120,0.85))",
                    }}
                  />
                </div>

                {/* Cloud Shadow */}
                <div
                  ref={cloudShadowRef}
                  className="pointer-events-none absolute opacity-30 mix-blend-multiply"
                  style={{
                    ...STRIP_GEOMETRY,
                    left: `calc(${-TILE_W}px + 2.5px)`,
                    top: "3.5px",
                    backgroundImage: CLOUDS_IMG_URL,
                    filter: "brightness(0) blur(2px)",
                  }}
                />

                {/* Clouds */}
                <div
                  ref={cloudsRef}
                  className="pointer-events-none absolute opacity-85 mix-blend-screen"
                  style={{
                    ...STRIP_GEOMETRY,
                    backgroundImage: CLOUDS_IMG_URL,
                  }}
                />

                {/* Network Routing Overlay */}
                <svg className="pointer-events-none absolute inset-0 h-full w-full overflow-visible mix-blend-screen">
                  {NETWORK_ROUTES.map((route) => (
                    <g key={route.id}>
                      <path
                        ref={(el) => {
                          routePathsRef.current.set(route.id, el);
                        }}
                        fill="none"
                        stroke={route.color}
                        strokeWidth="1.5"
                        strokeDasharray="4 3"
                        className="transition-opacity duration-300"
                        style={{ opacity: 0 }}
                      />
                      <circle
                        ref={(el) => {
                          routePacketsRef.current.set(route.id, el);
                        }}
                        r="3"
                        fill="#ffffff"
                        style={{
                          opacity: 0,
                          filter: "drop-shadow(0 0 4px #ffffff)",
                        }}
                      />
                    </g>
                  ))}
                </svg>
              </div>

              {/* Orbiting Satellite Indicator */}
              <div
                className="pointer-events-none absolute inset-[-5%] animate-[spin_60s_linear_infinite] rounded-full border border-dashed border-indigo-300/15"
              >
                <span className="absolute top-0 left-1/2 -translate-x-1/2 h-1.5 w-1.5 rounded-full bg-sky-300 shadow-[0_0_8px_2px_rgba(186,230,253,0.6)]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
