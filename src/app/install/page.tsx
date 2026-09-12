import type { Metadata } from "next";
import Link from "next/link";
import { BRAND } from "@/lib/brand";
import { CopyBlock } from "@/components/brand/CopyBlock";
import { SecretsGenerator } from "@/components/showcase/SecretsGenerator";
import { PageToc } from "@/components/common/PageToc";
import { latestDocsHref } from "@/lib/docs/paths";

const title = "Install OpsKnight";
const description =
  `Deploy OpsKnight v${BRAND.version} Community with Docker Compose, Helm, Kustomize, Cloud Run, ECS, or Linux Systemd. ${BRAND.license}, self-hosted on your infrastructure.`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/install" },
  openGraph: { title, description, url: "/install" },
};

const TOC_SECTIONS = [
  { id: "prerequisites", title: "Prerequisites & Secrets" },
  { id: "docker-compose", title: "Docker Compose Starter" },
  { id: "kubernetes-helm", title: "Kubernetes (Helm Chart)" },
  { id: "other-topologies", title: "Other Supported Topologies" },
  { id: "hardware-sizing", title: "Hardware Sizing Matrix" },
  { id: "what-this-is-not", title: "Community boundary" },
];

const INSTALL_SPECS = [
  { label: "Min Compute", value: "1 vCPU · 1 GB RAM" },
  { label: "Database", value: "PostgreSQL 14+" },
  { label: "Default Port", value: "3000 (HTTP)" },
  { label: "License", value: BRAND.license },
  { label: "External Telemetry", value: "None (0 beacons)" },
];

export default function InstallPage() {
  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <section className="border-b border-slate-200 pt-28 pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="mb-3 font-mono text-[11px] font-medium tracking-wide text-slate-500">
              Install · {BRAND.releaseLabel} · {BRAND.license}
            </p>
            <h1 className="text-3xl font-semibold tracking-tight text-[#111827] sm:text-5xl sm:leading-[1.12]">
              Run it on machines you already operate.
            </h1>
            <p className="mt-5 text-base leading-relaxed text-[#4b5563] sm:text-lg">
              OpsKnight Community is self-hosted. Compose is the shortest path. Helm is the
              production path. After boot, open port 3000 and create the first admin
              on <span className="font-mono text-sm">/setup</span>. Full steps live
              in the docs — this page is the operational checklist.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_18rem] xl:grid-cols-[minmax(0,1fr)_20rem]">
            <article className="min-w-0 space-y-12 max-w-3xl">
              <div id="prerequisites" className="scroll-mt-28">
                <h2 className="text-xl font-semibold text-[#111827]">Prerequisites</h2>
                <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-[#4b5563]">
                  <li>Docker Engine 20+ and Compose 2+, or a Kubernetes 1.24+ cluster</li>
                  <li>PostgreSQL 14+ (Compose automatically provisions PostgreSQL 15)</li>
                  <li>
                    <code className="font-mono text-xs text-[#111827]">NEXTAUTH_SECRET</code>{" "}
                    and{" "}
                    <code className="font-mono text-xs text-[#111827]">ENCRYPTION_KEY</code>{" "}
                    configured before first start
                  </li>
                  <li>A stable HTTPS reverse proxy in production (for auth callbacks and webhook ingestion)</li>
                </ul>
                <div className="mt-6">
                  <SecretsGenerator />
                </div>
              </div>

              <div id="docker-compose" className="scroll-mt-28 border-t border-slate-200 pt-10">
                <h2 className="text-xl font-semibold text-[#111827]">Docker Compose (Recommended Starter)</h2>
                <p className="mt-3 mb-4 text-sm leading-relaxed text-[#4b5563]">
                  Clone the repository, copy <span className="font-mono text-xs text-[#111827]">env.example</span>{" "}
                  to <span className="font-mono text-xs text-[#111827]">.env</span>, inject your generated secrets,
                  and launch the stack:
                </p>
                <CopyBlock
                  label="compose"
                  value={`git clone https://github.com/opsknight-labs/OpsKnight.git
cd OpsKnight
cp env.example .env
# set NEXTAUTH_SECRET and ENCRYPTION_KEY in .env
docker compose up -d`}
                />
                <p className="mt-3 text-xs text-slate-500">
                  Then navigate to <span className="font-mono text-[#111827]">http://localhost:3000/setup</span> to initialize the primary administrator account.
                </p>
                <p className="mt-3">
                  <Link
                    href={latestDocsHref("deployment/docker")}
                    className="text-sm font-semibold text-[#d21a1b] hover:underline"
                  >
                    Docker Compose deployment guide →
                  </Link>
                </p>
              </div>

              <div id="kubernetes-helm" className="scroll-mt-28 border-t border-slate-200 pt-10">
                <h2 className="text-xl font-semibold text-[#111827]">Kubernetes (Helm Chart)</h2>
                <p className="mt-3 mb-4 text-sm leading-relaxed text-[#4b5563]">
                  For versioned, repeatable Kubernetes deployments with Horizontal Pod Autoscaling (HPA) and Ingress TLS:
                </p>
                <CopyBlock
                  label="helm"
                  value={`helm repo add opsknight https://charts.opsknight.com
helm repo update
helm upgrade --install opsknight opsknight/opsknight \
  --namespace opsknight \
  --create-namespace`}
                />
                <p className="mt-3">
                  <Link
                    href={latestDocsHref("deployment/helm")}
                    className="text-sm font-semibold text-[#d21a1b] hover:underline"
                  >
                    Helm configuration &amp; values.yaml guide →
                  </Link>
                </p>
              </div>

              <div id="other-topologies" className="scroll-mt-28 border-t border-slate-200 pt-10">
                <h2 className="text-xl font-semibold text-[#111827]">Other Supported Topologies</h2>
                <ul className="mt-4 space-y-3 text-sm text-[#4b5563]">
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-[#111827]">· Kustomize &amp; GitOps:</span>
                    <span>
                      Declarative base and overlay manifests designed for ArgoCD and Flux pipelines.{" "}
                      <Link href={latestDocsHref("deployment/kustomize")} className="font-medium text-[#d21a1b] hover:underline">
                        Kustomize guide
                      </Link>
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-[#111827]">· Cloud &amp; Serverless Containers:</span>
                    <span>
                      Deploy to AWS ECS / Fargate with RDS PostgreSQL, or GCP Cloud Run with Cloud SQL.{" "}
                      <Link href={latestDocsHref("deployment/docker")} className="font-medium text-[#d21a1b] hover:underline">
                        Cloud deployment guide
                      </Link>
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-[#111827]">· Linux Systemd / Bare Metal:</span>
                    <span>
                      Run as a native Node 20 LTS daemon service behind an Nginx or Caddy TLS reverse proxy.{" "}
                      <Link href={latestDocsHref("getting-started/installation")} className="font-medium text-[#d21a1b] hover:underline">
                        Installation walkthrough
                      </Link>
                    </span>
                  </li>
                </ul>
              </div>

              <div id="hardware-sizing" className="scroll-mt-28 border-t border-slate-200 pt-10">
                <h2 className="text-xl font-semibold text-[#111827]">Hardware Sizing Matrix</h2>
                <p className="mt-3 mb-4 text-sm leading-relaxed text-[#4b5563]">
                  Recommended capacity for OpsKnight and PostgreSQL based on monthly alert volume:
                </p>
                <div className="overflow-hidden rounded-[14px] border border-slate-200 bg-white">
                  <table className="w-full text-left text-xs">
                    <thead className="border-b border-slate-200 bg-slate-50 font-mono text-[11px] uppercase tracking-wider text-slate-500">
                      <tr>
                        <th className="px-4 py-2.5">Tier</th>
                        <th className="px-4 py-2.5">Alert Volume</th>
                        <th className="px-4 py-2.5">Compute</th>
                        <th className="px-4 py-2.5">Topology</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-mono text-slate-700">
                      <tr>
                        <td className="px-4 py-2.5 font-sans font-medium text-slate-900">Starter / Eval</td>
                        <td className="px-4 py-2.5 text-slate-500">&lt; 10k / mo</td>
                        <td className="px-4 py-2.5 text-slate-700">1 vCPU · 1 GB RAM</td>
                        <td className="px-4 py-2.5 text-slate-600 font-sans">Docker Compose ($5 VPS)</td>
                      </tr>
                      <tr className="bg-slate-50/40">
                        <td className="px-4 py-2.5 font-sans font-medium text-slate-900">Team / Growth</td>
                        <td className="px-4 py-2.5 text-slate-500">10k – 100k / mo</td>
                        <td className="px-4 py-2.5 text-slate-700">2 vCPU · 2 GB RAM</td>
                        <td className="px-4 py-2.5 text-slate-600 font-sans">2x Replicas + Managed DB</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2.5 font-sans font-medium text-slate-900">Enterprise scale</td>
                        <td className="px-4 py-2.5 text-slate-500">100k+ / mo</td>
                        <td className="px-4 py-2.5 text-slate-700">4+ vCPU · 4–8 GB</td>
                        <td className="px-4 py-2.5 text-slate-600 font-sans">Kubernetes (HPA) + PgBouncer</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div id="what-this-is-not" className="scroll-mt-28 rounded-[14px] border border-slate-200 bg-white p-6">
                <h2 className="text-lg font-semibold text-[#111827]">Community and commercial boundary</h2>
                <p className="mt-3 text-sm leading-relaxed text-[#4b5563]">
                  This page installs the self-hosted OpsKnight Community application under {BRAND.license}.
                  Separately licensed Enterprise modules, support, or hosted offerings may be documented and
                  packaged independently. Check the current release documentation for exact Community feature
                  availability and limits. The canonical installation reference is the{" "}
                  <Link href={latestDocsHref("getting-started/installation")} className="font-medium text-[#111827] underline">
                    installation guide
                  </Link>
                  .
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-4">
                <Link
                  href={latestDocsHref("getting-started")}
                  className="inline-flex h-11 items-center rounded-[12px] bg-[#d21a1b] px-6 text-sm font-semibold text-white hover:bg-[#b41516]"
                >
                  Getting Started Docs
                </Link>
                <Link
                  href="/security"
                  className="text-sm font-semibold text-[#d21a1b] hover:underline"
                >
                  Security &amp; hardening architecture →
                </Link>
              </div>
            </article>

            <aside className="hidden lg:block">
              <div className="sticky top-24 pl-4 border-l border-slate-200/80">
                <PageToc
                  sections={TOC_SECTIONS}
                  specs={INSTALL_SPECS}
                  quickCommand="docker compose up -d"
                  quickCommandLabel="Quick Launch"
                  docLink={latestDocsHref("deployment")}
                  docLinkLabel="Deployment Docs Hub"
                />
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
