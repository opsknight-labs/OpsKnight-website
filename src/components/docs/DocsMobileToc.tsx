"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronDown, ListFilter } from "lucide-react";
import type { TocItem } from "@/components/docs/DocsToc";

export function DocsMobileToc({ headings }: { headings: TocItem[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeText, setActiveText] = useState<string>(headings[0]?.text || "");
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

      if (scrollY + viewportHeight >= docHeight - 60) {
        setActiveText(headings[headings.length - 1].text);
        ticking = false;
        return;
      }

      const firstEl = document.getElementById(headings[0].id);
      if (firstEl && scrollY < firstEl.offsetTop - 120) {
        setActiveText(headings[0].text);
        ticking = false;
        return;
      }

      const targetOffset = 110;
      let currentText = headings[0].text;

      for (let i = 0; i < headings.length; i++) {
        const el = document.getElementById(headings[i].id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= targetOffset) {
          currentText = headings[i].text;
        } else {
          break;
        }
      }

      setActiveText(currentText);
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateActiveHeading);
        ticking = true;
      }
    };

    updateActiveHeading();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
    };
  }, [headings]);

  const handleSelect = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (!element) return;

    const found = headings.find((h) => h.id === id);
    if (found) {
      setActiveText(found.text);
    }
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
  };

  if (!headings.length) return null;

  return (
    <div className="mb-6 block lg:hidden">
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-slate-50/80 shadow-sm">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex w-full items-center justify-between px-4 py-2.5 text-left text-xs font-medium text-slate-700 hover:bg-slate-100/80 transition-colors"
        >
          <div className="flex items-center gap-2 truncate pr-2">
            <ListFilter className="h-3.5 w-3.5 shrink-0 text-[#d21a1b]" />
            <span className="font-semibold text-slate-900">On this page:</span>
            <span className="truncate text-slate-600">
              {activeText || headings[0]?.text || "Jump to section"}
            </span>
          </div>
          <ChevronDown
            className={`h-4 w-4 shrink-0 text-slate-400 transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {isOpen && (
          <div className="border-t border-slate-200 bg-white p-3 max-h-60 overflow-y-auto custom-scrollbar">
            <ul className="space-y-1">
              {headings.map((item) => {
                const isSub = item.depth >= 3;
                return (
                  <li key={item.id}>
                    <button
                      type="button"
                      onClick={() => handleSelect(item.id)}
                      className={`block w-full text-left py-1 text-xs rounded px-2 transition-colors ${
                        isSub
                          ? "pl-5 text-slate-500 hover:text-slate-900 hover:bg-slate-50"
                          : "font-medium text-slate-800 hover:text-[#d21a1b] hover:bg-red-50/50"
                      }`}
                    >
                      {item.text}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
