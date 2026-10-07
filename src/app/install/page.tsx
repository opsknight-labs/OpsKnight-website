import { siteMetadata } from "@/lib/site-metadata";
import type { Metadata } from "next";
import { DeploymentChooser } from "@/components/site/Experiences";
import { SectionIntro, TextLink, Action, FinalCTA } from "@/components/site/Primitives";
import { productDocs, PRODUCT } from "@/lib/product";
import {
  Shield,
  Server,
  Layers,
  CheckCircle2,
} from "lucide-react";

export const metadata: Metadata = siteMetadata({
  title: "Deploy OpsKnight — Self-Hosted Production Topologies",
  description:
    "Deploy OpsKnight on your infrastructure with Docker Compose, Kubernetes/Helm, or Docker Swarm. Complete operational guide with secrets generation, hardware sizing, and production checklist.",
  alternates: { canonical: "/deploy/" },
  openGraph: { url: "/deploy/" },
});

export default function Install() {
  return (
    <div className="site-page">
      {/* Interior Hero */}
      <section className="interior-hero site-dark">
        <div className="site-container">
          <p className="site-eyebrow">
            <span className="signal-dot" /> DEPLOY / {PRODUCT.release.tag}
          </p>
          <h1>
            Your infrastructure.
            <br />
            Your operational control.
          </h1>
          <p className="site-description">
            OpsKnight deploys entirely inside your VPC or private cloud. Start with an integrated
            single-node container, scale across a Docker Swarm, or deploy to production Kubernetes
            with isolated worker roles and PgBouncer connection pooling.
          </p>
          <div className="site-actions">
            <Action href="#prerequisites">Secrets & Prerequisites</Action>
            <Action href="#topologies" secondary>
              Deployment Topologies
            </Action>
          </div>
        </div>
      </section>

      {/* Interactive Deployment Chooser */}
      <section className="site-section">
        <div className="site-container">
          <SectionIntro
            eyebrow="DEPLOYMENT CHOOSER"
            title="Where will OpsKnight run?"
          >
            Select your target runtime to review architecture, container roles, and operational commands.
          </SectionIntro>
          <DeploymentChooser />
          <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-4 text-xs text-slate-600">
            <p>
              <strong>Production notice:</strong> OpsKnight ships with sensible container defaults.
              Before handling mission-critical outages, verify database durability, TLS termination,
              and secrets persistence across restarts.
            </p>
          </div>
        </div>
      </section>

      {/* Prerequisites & Cryptographic Secrets Generation */}
      <section id="prerequisites" className="site-section bg-slate-50 border-y border-slate-200">
        <div className="site-container space-y-8">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-wider text-[#d21a1b]">
              Essential Security Setup
            </span>
            <h2 className="text-2xl font-bold text-slate-900 mt-1">
              Prerequisites & Secrets Generation
            </h2>
            <p className="text-sm text-slate-600 mt-2 leading-relaxed">
              OpsKnight requires three distinct cryptographic secrets before first boot. These secrets
              protect user authentication sessions, API tokens, and AES-256-GCM encryption of third-party
              integration credentials (Twilio keys, Slack tokens, Jira secrets) in PostgreSQL.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-[16px] border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-2 text-slate-900 font-bold text-sm">
                <Shield size={16} className="text-[#d21a1b]" /> NEXTAUTH_SECRET
              </div>
              <p className="text-xs text-slate-600 mb-3">
                Signs and verifies user session cookies and OIDC/PKCE state tokens.
              </p>
              <div
                className="rounded-lg bg-slate-900 p-3 font-mono text-[11px] text-slate-200 overflow-x-auto focus:outline-none focus:ring-1 focus:ring-red-500"
                tabIndex={0}
                role="region"
                aria-label="NEXTAUTH_SECRET generation command"
              >
                openssl rand -base64 32
              </div>
            </div>

            <div className="rounded-[16px] border border-red-200 bg-red-50/30 p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-2 text-slate-900 font-bold text-sm">
                <Shield size={16} className="text-[#d21a1b]" /> ENCRYPTION_KEY
              </div>
              <p className="text-xs text-slate-600 mb-3">
                64-character hex key for AES-256-GCM at-rest encryption in PostgreSQL.
              </p>
              <div
                className="rounded-lg bg-slate-900 p-3 font-mono text-[11px] text-slate-200 overflow-x-auto focus:outline-none focus:ring-1 focus:ring-red-500"
                tabIndex={0}
                role="region"
                aria-label="ENCRYPTION_KEY generation command"
              >
                openssl rand -hex 32
              </div>
              <p className="mt-2 text-[10px] text-red-600 font-semibold">
                ⚠️ Store securely in Vault/KMS. Losing this makes encrypted credentials unrecoverable.
              </p>
            </div>

            <div className="rounded-[16px] border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-2 text-slate-900 font-bold text-sm">
                <Shield size={16} className="text-[#d21a1b]" /> API_KEY_SECRET
              </div>
              <p className="text-xs text-slate-600 mb-3">
                Independent secret key used to hash and validate ingestion API keys.
              </p>
              <div
                className="rounded-lg bg-slate-900 p-3 font-mono text-[11px] text-slate-200 overflow-x-auto focus:outline-none focus:ring-1 focus:ring-red-500"
                tabIndex={0}
                role="region"
                aria-label="API_KEY_SECRET generation command"
              >
                openssl rand -base64 32
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Starter Guides by Topology */}
      <section id="topologies" className="site-section">
        <div className="site-container space-y-12">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-wider text-[#d21a1b]">
              Ready-to-Use Topology Guides
            </span>
            <h2 className="text-2xl font-bold text-slate-900 mt-1">
              Production Deployment Methods
            </h2>
            <p className="text-sm text-slate-600 mt-2 leading-relaxed">
              OpsKnight supports multiple container runtimes. Choose your preferred orchestration
              layer below for step-by-step setup commands.
            </p>
          </div>

          <div className="space-y-8">
            {/* Docker Compose */}
            <div className="rounded-[16px] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-slate-100 p-2 text-slate-800">
                    <Server size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">Docker Compose</h3>
                    <p className="text-xs text-slate-500">
                      Ideal for evaluations, staging environments, and single-VM production installs.
                    </p>
                  </div>
                </div>
                <TextLink href={productDocs("start/quickstart")}>Full Quickstart ↗</TextLink>
              </div>

              <div className="space-y-3 font-mono text-xs">
                <div
                  className="rounded-xl bg-slate-900 p-4 text-slate-200 space-y-2 overflow-x-auto focus:outline-none focus:ring-1 focus:ring-red-500"
                  tabIndex={0}
                  role="region"
                  aria-label="Docker Compose deployment commands"
                >
                  <p className="text-slate-400"># 1. Clone repository and initialize environment</p>
                  <p>git clone https://github.com/opsknight-labs/opsknight.git</p>
                  <p>cd opsknight &amp;&amp; cp env.example .env</p>
                  <p className="text-slate-400 mt-2"># 2. Configure .env with your generated secrets</p>
                  <p className="text-slate-400"># NEXTAUTH_SECRET, ENCRYPTION_KEY, POSTGRES_PASSWORD</p>
                  <p className="text-slate-400 mt-2"># 3. Pull and launch containers in background</p>
                  <p>docker compose -f deploy/compose/docker-compose.yml pull</p>
                  <p>docker compose -f deploy/compose/docker-compose.yml up -d --wait</p>
                  <p className="text-slate-400 mt-2"># 4. Verify system readiness probe</p>
                  <p className="text-emerald-400">curl --fail http://localhost:3000/api/health?mode=readiness</p>
                </div>
              </div>
            </div>

            {/* Kubernetes & Helm */}
            <div className="rounded-[16px] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-slate-100 p-2 text-slate-800">
                    <Layers size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">Kubernetes &amp; Helm</h3>
                    <p className="text-xs text-slate-500">
                      Standard enterprise cloud-native deployment with Helm charts or Kustomize manifests.
                    </p>
                  </div>
                </div>
                <TextLink href={productDocs("operate/deploy/helm-operations")}>Helm Guide ↗</TextLink>
              </div>

              <div className="space-y-3 font-mono text-xs">
                <div
                  className="rounded-xl bg-slate-900 p-4 text-slate-200 space-y-2 overflow-x-auto focus:outline-none focus:ring-1 focus:ring-red-500"
                  tabIndex={0}
                  role="region"
                  aria-label="Kubernetes Helm deployment commands"
                >
                  <p className="text-slate-400"># 1. Create dedicated namespace and production Secret</p>
                  <p>kubectl create namespace opsknight</p>
                  <p>kubectl create secret generic opsknight-secrets -n opsknight \</p>
                  <p>&nbsp;&nbsp;--from-literal=DATABASE_URL=&quot;postgresql://user:pass@postgres-host:5432/opsknight?sslmode=require&quot; \</p>
                  <p>&nbsp;&nbsp;--from-literal=NEXTAUTH_SECRET=&quot;$NEXTAUTH_SECRET&quot; \</p>
                  <p>&nbsp;&nbsp;--from-literal=ENCRYPTION_KEY=&quot;$ENCRYPTION_KEY&quot; \</p>
                  <p>&nbsp;&nbsp;--from-literal=API_KEY_SECRET=&quot;$API_KEY_SECRET&quot;</p>
                  <p className="text-slate-400 mt-2"># 2. Deploy using official Helm chart</p>
                  <p>helm repo add opsknight https://charts.opsknight.com</p>
                  <p>helm upgrade --install opsknight opsknight/opsknight -n opsknight -f values-production.yaml</p>
                </div>
              </div>
            </div>

            {/* Docker Swarm */}
            <div className="rounded-[16px] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-slate-100 p-2 text-slate-800">
                    <Server size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">Docker Swarm (HA Clustering)</h3>
                    <p className="text-xs text-slate-500">
                      High availability clustering across bare-metal or cloud VMs with zero-downtime rolling updates.
                    </p>
                  </div>
                </div>
                <TextLink href={productDocs("operate/deploy/swarm-operations")}>Swarm Guide ↗</TextLink>
              </div>

              <div className="space-y-3 font-mono text-xs">
                <div
                  className="rounded-xl bg-slate-900 p-4 text-slate-200 space-y-2 overflow-x-auto focus:outline-none focus:ring-1 focus:ring-red-500"
                  tabIndex={0}
                  role="region"
                  aria-label="Docker Swarm deployment commands"
                >
                  <p className="text-slate-400"># 1. Provision Swarm secrets natively</p>
                  <p>printf &quot;%s&quot; &quot;$NEXTAUTH_SECRET&quot; | docker secret create opsknight_nextauth_secret_v1 -</p>
                  <p>printf &quot;%s&quot; &quot;$ENCRYPTION_KEY&quot; | docker secret create opsknight_encryption_key_v1 -</p>
                  <p className="text-slate-400 mt-2"># 2. Deploy the high-availability stack</p>
                  <p>docker stack deploy -c deploy/swarm/docker-stack.yml opsknight</p>
                  <p className="text-slate-400 mt-2"># 3. Check service replicas and rollouts</p>
                  <p>docker stack services opsknight</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hardware Sizing & Database Connection Budget */}
      <section className="site-section bg-slate-50/70 border-y border-slate-200">
        <div className="site-container space-y-8">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-wider text-[#d21a1b]">
              Capacity &amp; Sizing
            </span>
            <h2 className="text-2xl font-bold text-slate-900 mt-1">
              Hardware &amp; Database Sizing Matrix
            </h2>
            <p className="text-sm text-slate-600 mt-2 leading-relaxed">
              OpsKnight is lightweight and efficient. Size your compute and PostgreSQL connection pools
              based on anticipated alert throughput and concurrent responders.
            </p>
          </div>

          <div
            className="overflow-x-auto rounded-[16px] border border-slate-200 bg-white shadow-sm focus:outline-none focus:ring-1 focus:ring-red-500"
            tabIndex={0}
            role="region"
            aria-label="Hardware and database sizing matrix"
          >
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-slate-700 font-semibold uppercase tracking-wider">
                  <th className="p-4">Profile</th>
                  <th className="p-4">Target Load</th>
                  <th className="p-4">App Compute</th>
                  <th className="p-4">PostgreSQL Size</th>
                  <th className="p-4">DB Pool Budget</th>
                  <th className="p-4">Architecture</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-600">
                <tr>
                  <td className="p-4 font-bold text-slate-900">Evaluation / Small</td>
                  <td className="p-4">&lt; 50 alerts/min</td>
                  <td className="p-4">1-2 vCPU, 2-4 GB RAM</td>
                  <td className="p-4">PostgreSQL 15+ (2 vCPU, 4 GB)</td>
                  <td className="p-4">25 connections</td>
                  <td className="p-4">Integrated Single Container</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-slate-900">Medium Production</td>
                  <td className="p-4">50 - 300 alerts/min</td>
                  <td className="p-4">2-4 vCPU, 4-8 GB RAM</td>
                  <td className="p-4">PostgreSQL 15+ (4 vCPU, 8 GB)</td>
                  <td className="p-4">50-80 connections</td>
                  <td className="p-4">Integrated HA (2 Replicas)</td>
                </tr>
                <tr className="bg-red-50/20">
                  <td className="p-4 font-bold text-[#d21a1b]">High-Volume / Enterprise</td>
                  <td className="p-4">300 - 2,000+ alerts/min</td>
                  <td className="p-4">8+ vCPU, 16+ GB RAM</td>
                  <td className="p-4">Dedicated RDS/Cloud SQL + PgBouncer</td>
                  <td className="p-4">120+ connections (pooled)</td>
                  <td className="p-4 font-semibold text-slate-900">
                    Split-Runtime Roles (Web + Critical Worker + Scheduler)
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-500">
            For detailed connection pooling equations and benchmark test results, see{" "}
            <TextLink href={productDocs("operate/capacity/sizing")}>
              Capacity and connection budget documentation
            </TextLink>
            .
          </p>
        </div>
      </section>

      {/* Production Readiness Checklist */}
      <section className="site-section">
        <div className="site-container space-y-8">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-wider text-[#d21a1b]">
              Go-Live Verification
            </span>
            <h2 className="text-2xl font-bold text-slate-900 mt-1">
              Production Readiness Checklist
            </h2>
            <p className="text-sm text-slate-600 mt-2 leading-relaxed">
              Verify these operational invariants before cutting over production alerting webhooks:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <CheckCircle2 size={18} className="text-emerald-500 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-slate-900">Cryptographic Keys Preserved</h4>
                <p className="text-xs text-slate-600 mt-0.5">
                  <code>ENCRYPTION_KEY</code> and <code>NEXTAUTH_SECRET</code> are stored in an external
                  secret manager and backed up safely.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <CheckCircle2 size={18} className="text-emerald-500 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-slate-900">HTTPS &amp; Reverse Proxy</h4>
                <p className="text-xs text-slate-600 mt-0.5">
                  TLS is terminated with valid certificates; reverse proxy buffering is disabled on
                  Server-Sent Events (SSE) routes (<code>/api/incidents/stream</code>).
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <CheckCircle2 size={18} className="text-emerald-500 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-slate-900">PostgreSQL Backups &amp; PITR</h4>
                <p className="text-xs text-slate-600 mt-0.5">
                  Automated point-in-time recovery (PITR) is active with tested backup restoration
                  procedures.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <CheckCircle2 size={18} className="text-emerald-500 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-slate-900">Health Probes Active</h4>
                <p className="text-xs text-slate-600 mt-0.5">
                  Kubelet or load balancer probes monitor <code>/api/health?mode=liveness</code> and{" "}
                  <code>/api/health?mode=readiness</code>.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <CheckCircle2 size={18} className="text-emerald-500 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-slate-900">Twilio Webhook Reachability</h4>
                <p className="text-xs text-slate-600 mt-0.5">
                  If using phone voice dispatch, <code>NEXT_PUBLIC_APP_URL</code> is externally reachable
                  by Twilio for single-key DTMF voice acknowledgment callbacks.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <CheckCircle2 size={18} className="text-emerald-500 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-slate-900">Enterprise Commercial Support</h4>
                <p className="text-xs text-slate-600 mt-0.5">
                  Need deployment assistance, 24/7 escalation coverage, or architecture review? Explore our{" "}
                  <TextLink href="/support/">commercial support &amp; implementation services</TextLink>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FinalCTA />
    </div>
  );
}
