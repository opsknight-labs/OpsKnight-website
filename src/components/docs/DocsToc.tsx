"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { ArrowUp, Pencil, Copy, Check, ListFilter } from "lucide-react";

export type TocItem = {
  depth: number;
  text: string;
  id: string;
};

export function DocsToc({
  headings,
  editUrl,
}: {
  headings: TocItem[];
  editUrl?: string;
}) {
  const [activeId, setActiveId] = useState<string>(headings[0]?.id || "");
  const [copied, setCopied] = useState(false);
  const isClickScrollingRef = useRef(false);
  const clickTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const activeLinkRef = useRef<HTMLAnchorElement | null>(null);

  // Manual wheel/touch event immediately cancels click-scrolling lock
  useEffect(() => {
    const handleManualScroll = () => {
      if (isClickScrollingRef.current) {
        isClickScrollingRef.current = false;
        if (clickTimeoutRef.current) {
          clearTimeout(clickTimeoutRef.current);
        }
      }
    };

    window.addEventListener("wheel", handleManualScroll, { passive: true });
    window.addEventListener("touchstart", handleManualScroll, { passive: true });
    return () => {
      window.removeEventListener("wheel", handleManualScroll);
      window.removeEventListener("touchstart", handleManualScroll);
    };
  }, []);

  // Robust scroll spy that doesn't jump or clobber clicked state
  useEffect(() => {
    if (!headings.length) return;

    let ticking = false;

    const updateActiveHeading = () => {
      if (isClickScrollingRef.current) {
        ticking = false;
        return;
      }

      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;

      // Bottom of page detection: always activate the last heading
      if (scrollY + viewportHeight >= docHeight - 60) {
        setActiveId(headings[headings.length - 1].id);
        ticking = false;
        return;
      }

      // Top of page: before first heading reaches top offset
      const firstEl = document.getElementById(headings[0].id);
      if (firstEl && scrollY < firstEl.offsetTop - 120) {
        setActiveId(headings[0].id);
        ticking = false;
        return;
      }

      // Find the last heading whose top has reached or passed offset
      const targetOffset = 110;
      let currentId = headings[0].id;

      for (let i = 0; i < headings.length; i++) {
        const el = document.getElementById(headings[i].id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= targetOffset) {
          currentId = headings[i].id;
        } else {
          break;
        }
      }

      setActiveId(currentId);
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateActiveHeading);
        ticking = true;
      }
    };

    // Run on initial load
    updateActiveHeading();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
    };
  }, [headings]);

  // Keep active link visible within the TOC container if scrollable
  useEffect(() => {
    if (!activeId || !activeLinkRef.current) return;
    const link = activeLinkRef.current;
    const container = link.closest("[data-toc-container]") as HTMLElement | null;
    if (!container) return;

    const linkRect = link.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    if (linkRect.top < containerRect.top + 20) {
      container.scrollTop -= containerRect.top - linkRect.top + 20;
    } else if (linkRect.bottom > containerRect.bottom - 20) {
      container.scrollTop += linkRect.bottom - containerRect.bottom + 20;
    }
  }, [activeId]);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
      e.preventDefault();
      const element = document.getElementById(id);
      if (!element) return;

      // Lock scroll spy immediately so the indicator sticks firmly to clicked item
      setActiveId(id);
      isClickScrollingRef.current = true;

      if (clickTimeoutRef.current) {
        clearTimeout(clickTimeoutRef.current);
      }

      const offsetPosition =
        element.getBoundingClientRect().top + window.scrollY - 90;
      window.scrollTo({ top: Math.max(0, offsetPosition), behavior: "smooth" });
      window.history.pushState(null, "", `#${id}`);

      clickTimeoutRef.current = setTimeout(() => {
        isClickScrollingRef.current = false;
      }, 1000);
    },
    []
  );

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    window.history.pushState(null, "", window.location.pathname);
    if (headings.length > 0) setActiveId(headings[0].id);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!headings.length) return null;

  return (
    <nav className="space-y-6 text-sm">
      <div>
        <p className="mb-3 flex items-center gap-1.5 font-mono text-[11px] font-semibold uppercase tracking-wider text-slate-400">
          <ListFilter className="h-3.5 w-3.5 text-slate-500" />
          On this page
        </p>
        <ul className="relative space-y-0.5 border-l border-slate-200">
          {headings.map((item) => {
            const isActive = item.id === activeId;
            const isSubItem = item.depth >= 3;
            const isDeepItem = item.depth >= 4;

            return (
              <li key={item.id} className="relative">
                <Link
                  ref={isActive ? activeLinkRef : undefined}
                  href={`#${item.id}`}
                  onClick={(e) => handleClick(e, item.id)}
                  className={`-ml-px block border-l-2 py-1.5 text-left transition-colors ${
                    isDeepItem
                      ? "pl-7 text-[11px]"
                      : isSubItem
                        ? "pl-5 text-[12px]"
                        : "pl-3.5 text-[13px]"
                  } ${
                    isActive
                      ? "border-[#d21a1b] font-semibold text-[#111827] bg-red-50/40 rounded-r-md"
                      : "border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-900"
                  }`}
                >
                  <span className="line-clamp-2 leading-snug">{item.text}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Quick Action Utilities */}
      <div className="space-y-2 border-t border-slate-200/80 pt-4 text-xs">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-wider text-slate-400">
          Quick Actions
        </p>

        <div className="flex flex-col space-y-1 text-slate-600">
          <button
            type="button"
            onClick={handleScrollToTop}
            className="flex items-center gap-2 rounded-md py-1 text-left text-slate-600 hover:text-[#d21a1b] transition-colors"
          >
            <ArrowUp className="h-3.5 w-3.5 text-slate-400" />
            <span>Scroll to top</span>
          </button>

          <button
            type="button"
            onClick={handleCopyLink}
            className="flex items-center gap-2 rounded-md py-1 text-left text-slate-600 hover:text-[#d21a1b] transition-colors"
          >
            {copied ? (
              <Check className="h-3.5 w-3.5 text-emerald-500" />
            ) : (
              <Copy className="h-3.5 w-3.5 text-slate-400" />
            )}
            <span>{copied ? "Link copied!" : "Copy page URL"}</span>
          </button>

          {editUrl && (
            <Link
              href={editUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-md py-1 text-left text-slate-600 hover:text-[#d21a1b] transition-colors"
            >
              <Pencil className="h-3.5 w-3.5 text-slate-400" />
              <span>Edit on GitHub</span>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
