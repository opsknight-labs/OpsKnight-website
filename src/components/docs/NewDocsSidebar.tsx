"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  Boxes,
  ChevronDown,
  Code2,
  ExternalLink,
  HelpCircle,
  Lightbulb,
  Plug,
  Rocket,
  Server,
  Settings,
  Shield,
  Smartphone,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { SidebarItem } from "@/lib/docs/sidebar";
import { DocsVersionSwitcher } from "@/components/docs/DocsVersionSwitcher";
import { DocsSearch } from "@/components/docs/DocsSearch";
import { pathsMatch, pathIsAncestor } from "@/lib/docs/paths";
import { cn } from "@/lib/utils";
import { BRAND } from "@/lib/brand";
import { BrandLockup } from "@/components/brand/BrandLockup";
import type { DocsVersion } from "@/lib/docs/types";

const SECTION_ICONS: Record<string, React.ElementType> = {
  // v1.x root sections
  "getting-started": Rocket,
  "core-concepts": Lightbulb,
  administration: Settings,
  deployment: Server,
  architecture: Boxes,
  mobile: Smartphone,

  // v2.x root sections
  start: Rocket,
  concepts: Lightbulb,
  guides: BookOpen,
  operate: Server,
  reference: Code2,
  troubleshooting: HelpCircle,
  develop: Boxes,

  // Common sections
  integrations: Plug,
  api: Code2,
  security: Shield,
};

function getSectionKeyFromHref(href?: string) {
  if (!href) return undefined;
  const parts = href.split("/").filter(Boolean);
  if (parts.length < 3) return undefined;
  return parts[2];
}

function pathMatches(href: string | undefined, active: string) {
  return pathsMatch(href, active);
}

function sectionContainsPath(item: SidebarItem, active: string): boolean {
  if (pathMatches(item.href, active)) return true;
  if (item.href && pathIsAncestor(item.href, active)) return true;
  return item.children?.some((child) => sectionContainsPath(child, active)) ?? false;
}

function NavLink({
  item,
  activePath,
  nested = false,
  activeRef,
}: {
  item: SidebarItem;
  activePath: string;
  nested?: boolean;
  activeRef?: React.RefObject<HTMLAnchorElement | null>;
}) {
  const isDirectActive = pathMatches(item.href, activePath);
  const containsActive = sectionContainsPath(item, activePath);
  const [isOpen, setIsOpen] = React.useState(containsActive);

  React.useEffect(() => {
    if (containsActive) setIsOpen(true);
  }, [containsActive]);

  if (item.children && item.children.length > 0) {
    return (
      <div className={nested ? "ml-1.5 mt-1" : "mt-1"}>
        <div
          className={cn(
            "flex w-full items-center justify-between rounded-md transition-colors group",
            isDirectActive ? "bg-white/10" : "hover:bg-white/5"
          )}
        >
          {item.href ? (
            <Link
              ref={isDirectActive ? activeRef : undefined}
              href={item.href}
              onClick={() => setIsOpen(true)}
              className={cn(
                "flex-1 truncate px-2 py-1.5 text-[12px] font-medium transition-colors text-left",
                isDirectActive
                  ? "text-white font-bold"
                  : containsActive
                    ? "text-[#fca5a5]"
                    : "text-slate-400 group-hover:text-white"
              )}
            >
              {item.title}
            </Link>
          ) : (
            <span className="flex-1 truncate px-2 py-1 text-[11px] font-medium uppercase tracking-wide text-slate-500">
              {item.title}
            </span>
          )}

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen((v) => !v);
            }}
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded p-1 text-slate-400 hover:bg-white/10 hover:text-white"
            aria-label={isOpen ? `Collapse ${item.title}` : `Expand ${item.title}`}
          >
            <ChevronDown
              className={cn(
                "h-3.5 w-3.5 text-slate-500 transition-transform duration-200",
                isOpen && "rotate-180"
              )}
            />
          </button>
        </div>

        {isOpen && (
          <ul className="mt-0.5 space-y-0.5 border-l border-white/10 pl-2">
            {item.children.map((child) => (
              <li key={child.title}>
                <NavLink item={child} activePath={activePath} nested activeRef={activeRef} />
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }

  if (!item.href) {
    return (
      <span className="block px-2 py-1.5 text-[13px] text-slate-500">{item.title}</span>
    );
  }

  const active = pathMatches(item.href, activePath);
  return (
    <Link
      ref={active ? activeRef : undefined}
      href={item.href}
      className={cn(
        "block rounded-md border-l-2 px-2 py-1.5 text-[13px] leading-snug transition-colors",
        nested ? "ml-0" : "ml-1",
        active
          ? "border-[#d21a1b] bg-white/10 text-white font-medium"
          : "border-transparent text-slate-400 hover:bg-white/5 hover:text-white"
      )}
    >
      {item.title}
    </Link>
  );
}

function CollapsibleSection({
  item,
  activePath,
  activeRef,
}: {
  item: SidebarItem;
  activePath: string;
  activeRef?: React.RefObject<HTMLAnchorElement | null>;
}) {
  const sectionKey =
    getSectionKeyFromHref(item.children?.[0]?.href) ||
    getSectionKeyFromHref(item.href);
  const Icon = (sectionKey && SECTION_ICONS[sectionKey]) || BookOpen;
  const isDirectActive = pathMatches(item.href, activePath);
  const containsActive = sectionContainsPath(item, activePath);
  const [isOpen, setIsOpen] = React.useState(containsActive);

  React.useEffect(() => {
    if (containsActive) setIsOpen(true);
  }, [containsActive]);

  return (
    <SidebarGroup className="p-0">
      <div
        className={cn(
          "flex w-full items-center justify-between rounded-lg transition-colors group",
          isDirectActive ? "bg-white/10" : "hover:bg-white/5"
        )}
      >
        {item.href ? (
          <Link
            ref={isDirectActive ? activeRef : undefined}
            href={item.href}
            onClick={() => setIsOpen(true)}
            className="flex min-w-0 flex-1 items-center gap-2 px-2 py-2 text-left"
          >
            <Icon
              className={cn(
                "h-4 w-4 shrink-0 transition-colors",
                isDirectActive
                  ? "text-red-400"
                  : containsActive
                    ? "text-[#fca5a5]"
                    : "text-slate-500 group-hover:text-slate-300"
              )}
            />
            <span
              className={cn(
                "min-w-0 flex-1 truncate text-[12px] font-semibold tracking-wide transition-colors",
                isDirectActive
                  ? "text-white font-bold"
                  : containsActive
                    ? "text-white"
                    : "text-slate-300 group-hover:text-white"
              )}
            >
              {item.title}
            </span>
          </Link>
        ) : (
          <div className="flex min-w-0 flex-1 items-center gap-2 px-2 py-2 text-left">
            <Icon
              className={cn(
                "h-4 w-4 shrink-0",
                containsActive ? "text-[#fca5a5]" : "text-slate-500"
              )}
            />
            <span
              className={cn(
                "min-w-0 flex-1 truncate text-[12px] font-semibold tracking-wide",
                containsActive ? "text-white" : "text-slate-300"
              )}
            >
              {item.title}
            </span>
          </div>
        )}

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen((v) => !v);
          }}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md p-1.5 text-slate-400 hover:bg-white/10 hover:text-white"
          aria-label={isOpen ? `Collapse ${item.title}` : `Expand ${item.title}`}
        >
          <ChevronDown
            className={cn(
              "h-4 w-4 shrink-0 text-slate-500 transition-transform duration-200",
              isOpen && "rotate-180"
            )}
          />
        </button>
      </div>

      {isOpen && (
        <SidebarGroupContent className="pb-2">
          <SidebarMenu>
            {item.children?.map((child) => (
              <SidebarMenuItem key={child.title}>
                <NavLink item={child} activePath={activePath} activeRef={activeRef} />
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      )}
    </SidebarGroup>
  );
}

export function NewDocsSidebar({
  items,
  version,
  versions,
}: {
  items: SidebarItem[];
  version: string;
  versions: DocsVersion[];
}) {
  const pathname = usePathname();
  const activePath = pathname?.split("#")[0] ?? "";
  const activeItemRef = React.useRef<HTMLAnchorElement | null>(null);

  React.useEffect(() => {
    if (activeItemRef.current) {
      activeItemRef.current.scrollIntoView({
        block: "nearest",
        inline: "nearest",
        behavior: "smooth",
      });
    }
  }, [activePath]);

  return (
    <Sidebar className="border-r border-white/10 [&_[data-sidebar=sidebar]]:!bg-[#0f172a]">
      <SidebarHeader className="shrink-0 border-b border-white/10 pb-3">
        <BrandLockup href="/" size={32} subtitle="Documentation" className="px-2 pt-1" />
        <div className="mt-3 px-1">
          <DocsVersionSwitcher currentVersion={version} versions={versions} />
        </div>
        <div className="mt-2 px-1 md:hidden">
          <DocsSearch version={version} />
        </div>
      </SidebarHeader>
      <SidebarContent className="custom-scrollbar px-2 py-2">
        {items.map((item) =>
          item.children && item.children.length > 0 ? (
            <CollapsibleSection
              key={item.title}
              item={item}
              activePath={activePath}
              activeRef={activeItemRef}
            />
          ) : (
            <div key={item.title} className="px-1">
              <NavLink item={item} activePath={activePath} activeRef={activeItemRef} />
            </div>
          )
        )}
      </SidebarContent>
      <SidebarFooter className="shrink-0 border-t border-white/10">
        <div className="flex flex-col gap-1.5">
          <Link
            href="/"
            className="rounded-lg px-2 py-1.5 text-xs text-slate-400 hover:bg-white/5 hover:text-white"
          >
            Home
          </Link>
          <Link
            href="/changelog"
            className="rounded-lg px-2 py-1.5 text-xs text-slate-400 hover:bg-white/5 hover:text-white"
          >
            Changelog
          </Link>
          <Link
            href={BRAND.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-xs text-slate-400 hover:bg-white/5 hover:text-white"
          >
            GitHub
            <ExternalLink className="h-3 w-3" />
          </Link>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
