"use client";

import { useEffect, useState, useRef, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  FileText,
  Rocket,
  ShieldCheck,
  Zap,
  CornerDownLeft,
  X,
} from "lucide-react";
import Fuse from "fuse.js";
import { BRAND } from "@/lib/brand";

type SearchItem = {
  title: string;
  href: string;
  category: string;
  icon?: string;
  keywords?: string;
};

const STATIC_QUICK_LINKS: SearchItem[] = [
  { title: "Deploy & Install Hub", href: "/install", category: "Deployment", keywords: "docker compose helm kustomize kubernetes systemd cloud run ecs" },
  { title: "Security & Hardening Architecture", href: "/security", category: "Security", keywords: "encryption aes-256 webhook hmac oidc sso rbac timingSafeEqual" },
  { title: "Monitoring Integrations (40+)", href: "/integrations", category: "Product", keywords: "prometheus datadog sentry grafana aws cloudwatch zabbix alerts" },
  { title: "Compare Matrix & ROI Calculator", href: "/compare", category: "Compare", keywords: "pricing cost calculator pagerduty opsgenie incident.io splunk" },
  { title: "PagerDuty Drop-in Ingest Adapter", href: "/compare/pagerduty", category: "Compare", keywords: "events api v2 drop in migration alertmanager" },
  { title: "Opsgenie Sunset Migration Guide", href: "/compare/opsgenie", category: "Compare", keywords: "atlassian opsgenie deprecation escalation routes" },
  { title: "Grafana OnCall OSS Migration Guide", href: "/compare/grafana-oncall", category: "Compare", keywords: "grafana labs archived contact points" },
  { title: "Changelog & Releases", href: "/changelog", category: "Resources", keywords: "versions v1.4 v1.3 updates release notes" },
  { title: "Brand Assets & Guidelines", href: "/brand", category: "Resources", keywords: "logos icons colors typography svg png" },
  { title: "Use Cases & Architecture", href: "/use-cases", category: "Product", keywords: "on-prem enterprise self hosted privacy" },
  { title: "About OpsKnight & Mission", href: "/about", category: "Company", keywords: "maintainers team license apache-2.0" },
  { title: "Community & Discussions", href: "/contact", category: "Company", keywords: "github issues questions discord" },
];

export function GlobalCommandPalette() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [docEntries, setDocEntries] = useState<SearchItem[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Global Keyboard shortcut (Cmd/Ctrl + K) & custom event listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === "Escape" && isOpen) {
        e.preventDefault();
        setIsOpen(false);
      }
    };

    const handleCustomOpen = () => {
      setIsOpen(true);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("open-global-search", handleCustomOpen);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("open-global-search", handleCustomOpen);
    };
  }, [isOpen]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSelectedIndex(0);
    } else {
      setQuery("");
    }
  }, [isOpen]);

  // Fetch documentation search index
  useEffect(() => {
    const fetchDocIndex = async () => {
      try {
        const res = await fetch(`/api/docs/v1.4/search`);
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data.results)) {
            const formatted: SearchItem[] = data.results.map((r: { title: string; href: string; text?: string }) => {
              const parts = r.href.split("/").filter(Boolean);
              const section = parts.length > 2 ? parts[2].replace(/-/g, " ").toUpperCase() : "DOCS";
              return {
                title: r.title,
                href: r.href,
                category: section,
                keywords: r.text?.slice(0, 150),
              };
            });
            setDocEntries(formatted);
          }
        }
      } catch {
        // Fallback silently if offline or build-time
      }
    };

    fetchDocIndex();
  }, []);

  const allItems = useMemo(() => {
    return [...STATIC_QUICK_LINKS, ...docEntries];
  }, [docEntries]);

  const fuse = useMemo(() => {
    return new Fuse(allItems, {
      keys: [
        { name: "title", weight: 0.6 },
        { name: "keywords", weight: 0.3 },
        { name: "category", weight: 0.1 },
      ],
      threshold: 0.35,
    });
  }, [allItems]);

  const filteredItems = useMemo(() => {
    if (!query.trim()) {
      return STATIC_QUICK_LINKS.slice(0, 8);
    }
    return fuse.search(query).slice(0, 10).map((res) => res.item);
  }, [query, fuse]);

  const navigateTo = useCallback(
    (href: string) => {
      setIsOpen(false);
      router.push(href);
    },
    [router]
  );

  const handleListKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < filteredItems.length - 1 ? prev + 1 : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : filteredItems.length - 1));
    } else if (e.key === "Enter" && filteredItems[selectedIndex]) {
      e.preventDefault();
      navigateTo(filteredItems[selectedIndex].href);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-16 sm:pt-24 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-150"
      onClick={() => setIsOpen(false)}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Site and Documentation Search"
        className="w-full max-w-2xl overflow-hidden rounded-2xl border border-slate-700/80 bg-[#0f172a] shadow-2xl shadow-black/60 animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleListKeyDown}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 border-b border-slate-800 bg-slate-900/90 px-4 py-3.5">
          <Search className="h-4 w-4 shrink-0 text-slate-400" />
          <input
            ref={inputRef}
            type="text"
            role="combobox"
            aria-expanded="true"
            aria-controls="search-results-list"
            aria-activedescendant={
              filteredItems[selectedIndex]
                ? `search-opt-${selectedIndex}`
                : undefined
            }
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Search docs, integrations, deployment guides, or compare..."
            className="flex-1 bg-transparent text-sm text-slate-100 placeholder-slate-400 focus:outline-none"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="rounded p-1 text-slate-400 hover:bg-slate-800 hover:text-white"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
          <kbd className="hidden sm:inline-block rounded bg-slate-800 px-2 py-0.5 font-mono text-[10px] text-slate-400">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div
          id="search-results-list"
          role="listbox"
          aria-label="Search results"
          ref={listRef}
          className="max-h-[380px] overflow-y-auto p-2 space-y-1 custom-scrollbar"
        >
          {filteredItems.length === 0 ? (
            <div className="py-12 text-center text-xs text-slate-400">
              No results found for &ldquo;<span className="text-slate-200">{query}</span>&rdquo;
            </div>
          ) : (
            filteredItems.map((item, index) => {
              const isSelected = index === selectedIndex;
              const isDoc = item.href.startsWith("/docs");
              return (
                <div
                  key={`${item.href}-${item.title}`}
                  id={`search-opt-${index}`}
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => navigateTo(item.href)}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`flex cursor-pointer items-center justify-between gap-3 rounded-xl px-3.5 py-2.5 transition-all text-xs ${
                    isSelected
                      ? "bg-[#d21a1b] text-white shadow-sm"
                      : "text-slate-200 hover:bg-slate-800/80"
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${
                        isSelected ? "bg-white/20 text-white" : "bg-slate-800 text-slate-400"
                      }`}
                    >
                      {item.category === "Security" ? (
                        <ShieldCheck className="h-3.5 w-3.5" />
                      ) : item.category === "Deployment" ? (
                        <Rocket className="h-3.5 w-3.5" />
                      ) : isDoc ? (
                        <FileText className="h-3.5 w-3.5" />
                      ) : (
                        <Zap className="h-3.5 w-3.5" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <div className="font-semibold truncate">{item.title}</div>
                      <div
                        className={`text-[10px] font-mono truncate ${
                          isSelected ? "text-red-100" : "text-slate-400"
                        }`}
                      >
                        {item.href}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span
                      className={`rounded px-1.5 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-wider ${
                        isSelected ? "bg-black/20 text-white" : "bg-slate-800 text-slate-400"
                      }`}
                    >
                      {item.category}
                    </span>
                    {isSelected && <CornerDownLeft className="h-3.5 w-3.5 text-white" />}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer Navigation Hints */}
        <div className="flex items-center justify-between border-t border-slate-800 bg-slate-900/60 px-4 py-2 text-[11px] font-mono text-slate-400">
          <div className="flex items-center gap-3">
            <span>↑↓ Navigate</span>
            <span>↵ Open</span>
            <span>Esc Close</span>
          </div>
          <span>v{BRAND.version}</span>
        </div>
      </div>
    </div>
  );
}
