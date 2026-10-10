"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
export function IncidentSignal() {
  const rail = useRef<HTMLDivElement>(null),
    path = usePathname();
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    const paint = () => {
      frame = 0;
      const distance = document.documentElement.scrollHeight - innerHeight;
      const progress =
        distance > 0 ? Math.min(1, Math.max(0, scrollY / distance)) : 0;
      rail.current?.style.setProperty("--signal-progress", String(progress));
    };
    const update = () => {
      if (!frame) frame = requestAnimationFrame(paint);
    };
    paint();
    if (!media.matches)
      window.addEventListener("scroll", update, { passive: true });
    return () => {
      window.removeEventListener("scroll", update);
      cancelAnimationFrame(frame);
    };
  }, [path]);
  return (
    <div className="incident-signal-rail" ref={rail} aria-hidden="true">
      <div className="signal-trail" />
      <span className="signal-dot" />
      <span className="rail-label">INCIDENT SIGNAL</span>
    </div>
  );
}
