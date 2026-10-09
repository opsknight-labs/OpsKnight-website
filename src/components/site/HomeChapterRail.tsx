"use client";

import { useEffect, useState } from "react";

type Chapter = { id: string; label: string };

export function HomeChapterRail({ chapters }: { chapters: readonly Chapter[] }) {
  const [active, setActive] = useState(chapters[0]?.id);

  useEffect(() => {
    const targets = chapters
      .map((c) => document.getElementById(c.id))
      .filter((el): el is HTMLElement => el !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, [chapters]);

  const activeIndex = Math.max(0, chapters.findIndex((c) => c.id === active));
  const current = chapters[activeIndex];

  return (
    <nav className="home-chapter-rail" aria-label="Page chapters" data-chapter={current?.id}>
      <ol>
        {chapters.map((c, i) => (
          <li key={c.id} data-state={i < activeIndex ? "past" : i === activeIndex ? "current" : "next"}>
            <a href={`#${c.id}`} aria-current={i === activeIndex ? "location" : undefined}>
              <span className="sr-only">{c.label}</span>
            </a>
          </li>
        ))}
      </ol>
      {current && (
        <p key={current.id} className="home-chapter-current" aria-hidden="true">
          <span>{String(activeIndex).padStart(2, "0")}</span> {current.label}
        </p>
      )}
    </nav>
  );
}
