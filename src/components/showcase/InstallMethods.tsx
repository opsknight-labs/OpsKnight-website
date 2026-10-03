"use client";

import { useState } from "react";
import Link from "next/link";
import { Copy, Check } from "lucide-react";
import { BRAND } from "@/lib/brand";
import { latestDocsHref } from "@/lib/docs/paths";
import { SecretsGenerator } from "@/components/showcase/SecretsGenerator";

type DeployTab = "compose" | "docker" | "helm" | "kustomize" | "swarm";

const TABS: { id: DeployTab; label: string }[] = [
  { id: "compose", label: "Compose" },
  { id: "docker", label: "Docker" },
  { id: "helm", label: "Helm" },
  { id: "kustomize", label: "Kustomize" },
  { id: "swarm", label: "Swarm" },
];

export function InstallMethods() {
  const [active, setActive] = useState<DeployTab>("compose");
  const [copied, setCopied] = useState(false);

  const commands: Record<DeployTab, string> = {
    compose: BRAND.deploy.compose,
    docker: BRAND.deploy.docker,
    helm: BRAND.deploy.helm,
    kustomize: BRAND.deploy.kustomize,
    swarm: BRAND.deploy.swarm,
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(commands[active]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="run" className="border-b border-slate-200 bg-white py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="mb-3 font-mono text-[11px] font-medium tracking-wide text-slate-500">
            Install
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-[#111827] sm:text-4xl">
            Run it where your systems already live.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#4b5563]">
            Compose, Docker, Helm, Kustomize, or Swarm. Postgres, {`NEXTAUTH_SECRET`},{" "}
            {`ENCRYPTION_KEY`}, and {`API_KEY_SECRET`} are required. There is no hosted cloud.
          </p>
        </div>

        <div className="mt-10 overflow-hidden rounded-[16px] border border-slate-800 bg-[#0f172a] shadow-xl">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 bg-slate-900/90 px-4 py-3">
            <div
              role="tablist"
              aria-label="Deployment methods"
              className="flex flex-wrap items-center gap-1 rounded-xl border border-slate-800 bg-[#0f172a] p-1"
            >
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  id={`tab-${tab.id}`}
                  role="tab"
                  aria-selected={active === tab.id}
                  aria-controls={`tabpanel-${tab.id}`}
                  type="button"
                  onClick={() => setActive(tab.id)}
                  className={`rounded-lg px-3 py-1.5 font-mono text-xs font-semibold transition-all ${
                    active === tab.id
                      ? "bg-slate-800 text-white"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2 font-mono text-[11px] text-slate-400">
                <span className="rounded bg-slate-800 px-2 py-0.5 text-slate-300">0.5 vCPU</span>
                <span className="rounded bg-slate-800 px-2 py-0.5 text-slate-300">512MB RAM</span>
              </div>
              <button
                type="button"
                onClick={handleCopy}
                className="flex items-center gap-1.5 rounded-lg bg-slate-800 px-3 py-1.5 font-mono text-xs font-semibold text-slate-200 hover:bg-slate-700 transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-[#059669]" />
                    <span className="text-[#059669]">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5 text-slate-400" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>
          <pre
            id={`tabpanel-${active}`}
            role="tabpanel"
            aria-labelledby={`tab-${active}`}
            tabIndex={0}
            className="overflow-x-auto p-4 font-mono text-xs leading-relaxed text-slate-200 sm:p-5 sm:text-[13px] max-h-[340px] custom-scrollbar"
          >
            {commands[active]}
          </pre>
          <p className="border-t border-slate-800 px-4 py-3 text-[11px] leading-relaxed text-slate-400">
            {BRAND.deploy.secretsNote}
          </p>
        </div>

        {/* First-boot deployment requirements & secret generator callout */}
        <div className="mt-6">
          <SecretsGenerator />
        </div>

        <p className="mt-6 text-sm text-[#4b5563]">
          Need the longer walkthrough?{" "}
          <Link href="/install" className="font-medium text-[#d21a1b] hover:underline">
            Install page
          </Link>
          {" · "}
          <Link href={latestDocsHref("start/production-install")} className="font-medium text-[#d21a1b] hover:underline">
            Docs
          </Link>
          {" · "}
          <Link href={BRAND.links.helmCharts} className="font-medium text-[#d21a1b] hover:underline">
            Helm charts
          </Link>
        </p>
      </div>
    </section>
  );
}
