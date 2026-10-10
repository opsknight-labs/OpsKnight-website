import Link from "next/link";
import { PropsWithChildren } from "react";
import { getSidebar } from "@/lib/docs/sidebar";
import { NewDocsSidebar } from "@/components/docs/NewDocsSidebar";
import { DocsSearch } from "@/components/docs/DocsSearch";
import { DocsVersionBanner } from "@/components/docs/DocsVersionBanner";
import { DOC_VERSIONS } from "@/lib/docs/versions";
import { notFound } from "next/navigation";
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import "highlight.js/styles/atom-one-dark.css";

export default async function DocsLayout({
  children,
  params,
}: PropsWithChildren<{ params: Promise<{ version: string }> }>) {
  const { version } = await params;
  if (!DOC_VERSIONS.some((v) => v.id === version)) {
    notFound();
  }
  const sidebar = getSidebar(version);

  return (
    <SidebarProvider defaultOpen>
      <NewDocsSidebar items={sidebar} version={version} versions={DOC_VERSIONS} />
      <SidebarInset className="docs-editorial-shell min-h-screen bg-[#f8fafc]">
        <header className="sticky top-0 z-10 flex h-14 shrink-0 items-center gap-3 border-b border-slate-200 bg-[#0f172a] px-4">
          <SidebarTrigger className="-ml-1 text-slate-400 hover:text-white" />
          <div className="h-4 w-px bg-slate-700" />
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-slate-400 hover:text-white">
              Home
            </Link>
            <span className="text-slate-600">/</span>
            <span className="font-medium text-white">Docs</span>
          </nav>
          <div className="ml-auto flex items-center gap-3">
            <div className="hidden w-64 md:block lg:w-80">
              <DocsSearch version={version} />
            </div>
            <span className="hidden font-mono text-xs text-slate-400 sm:inline">
              {version}
            </span>
          </div>
        </header>
        <DocsVersionBanner version={version} />
        <div className="relative mx-auto w-full max-w-[1600px] p-4 lg:p-10">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
