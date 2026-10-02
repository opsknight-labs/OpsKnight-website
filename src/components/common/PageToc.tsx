"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import Link from "next/link";
import { ArrowUp, Check, Copy, ExternalLink } from "lucide-react";

export type TocSection = {
  id: string;
  title: string;
};

export function PageToc({
  sections,
  specs,
  quickCommand,
  quickCommandLabel,
  docLink,
  docLinkLabel,
}: {
  sections: TocSection[];
  specs?: { label: string; value: string }[];
  quickCommand?: string;
  quickCommandLabel?: string;
  docLink?: string;
  docLinkLabel?: string;
}) {
  const [activeId, setActiveId] = useState<string>(sections[0]?.id || "");
  const [copied, setCopied] = useState(false);
  const isClickScrollingRef = useRef(false);
  const clickTimeoutRef = useRef<NodeJS.Timeout | null>(null);

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

  useEffect(() => {
    if (!sections.length) return;

    let ticking = false;

    const updateActiveSection = () => {
      if (isClickScrollingRef.current) {
        ticking = false;
        return;
      }

      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;

      if (scrollY + viewportHeight >= docHeight - 60) {
        setActiveId(sections[sections.length - 1].id);
        ticking = false;
        return;
      }

      const firstEl = document.getElementById(sections[0].id);
      if (firstEl && scrollY < firstEl.offsetTop - 120) {
        setActiveId(sections[0].id);
        ticking = false;
        return;
      }

      const targetOffset = 110;
      let currentId = sections[0].id;

      for (let i = 0; i < sections.length; i++) {
        const el = document.getElementById(sections[i].id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= targetOffset) {
          currentId = sections[i].id;
        } else {
          break;
        }
      }

      setActiveId(currentId);
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateActiveSection);
        ticking = true;
      }
    };

    updateActiveSection();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
    };
  }, [sections]);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
      e.preventDefault();
      const element = document.getElementById(id);
      if (!element) return;

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

  const handleCopyCommand = () => {
    if (!quickCommand) return;
    navigator.clipboard.writeText(quickCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    window.history.pushState(null, "", window.location.pathname);
    if (sections.length > 0) setActiveId(sections[0].id);
  };

  return (
    <div className="space-y-6">
      {/* On This Page Nav */}
      <div>
        <p className="mb-3 font-mono text-[10px] font-semibold uppercase tracking-wider text-slate-400">
          On this page
        </p>
        <nav className="relative border-l border-slate-200 pl-3">
          <ul className="space-y-2 text-xs">
            {sections.map((sec) => {
              const active = activeId === sec.id;
              return (
                <li key={sec.id}>
                  <a
                    href={`#${sec.id}`}
                    onClick={(e) => handleClick(e, sec.id)}
                    className={`block transition-colors py-0.5 leading-snug ${
                      active
                        ? "font-semibold text-[#d21a1b]"
                        : "text-slate-500 hover:text-slate-900"
                    }`}
                  >
                    {sec.title}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      {/* Quick Specs Box */}
      {specs && specs.length > 0 && (
        <div className="rounded-[14px] border border-slate-200 bg-white p-4 text-xs shadow-sm space-y-3">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-wider text-slate-500">
            Quick Specifications
          </p>
          <div className="space-y-2">
            {specs.map((item) => (
              <div key={item.label} className="flex items-center justify-between text-slate-600">
                <span className="font-mono text-[11px] text-slate-400">{item.label}</span>
                <span className="font-medium text-slate-900 text-right">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quick 1-Liner Action */}
      {quickCommand && (
        <div className="rounded-[14px] border border-slate-200 bg-white p-4 text-xs shadow-sm space-y-2.5">
          <div className="flex items-center justify-between">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-wider text-slate-500">
              {quickCommandLabel || "Quick Command"}
            </p>
            <button
              type="button"
              onClick={handleCopyCommand}
              className="inline-flex items-center gap-1 font-mono text-[10px] font-medium text-[#d21a1b] hover:underline"
            >
              {copied ? (
                <>
                  <Check className="h-3 w-3" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy className="h-3 w-3" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
          <pre className="overflow-x-auto rounded-lg bg-slate-900 p-2.5 font-mono text-[11px] text-emerald-300">
            <code>{quickCommand}</code>
          </pre>
        </div>
      )}

      {/* Side Links & Scroll Top */}
      <div className="pt-2 border-t border-slate-200/80 space-y-2 text-xs">
        {docLink && (
          <Link
            href={docLink}
            className="flex items-center justify-between font-medium text-slate-600 hover:text-[#d21a1b] transition-colors"
          >
            <span>{docLinkLabel || "Documentation"}</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </Link>
        )}
        <button
          type="button"
          onClick={scrollToTop}
          className="flex items-center gap-1.5 text-slate-400 hover:text-slate-700 transition-colors pt-1"
        >
          <ArrowUp className="h-3.5 w-3.5" />
          <span>Scroll to top</span>
        </button>
      </div>
    </div>
  );
}
