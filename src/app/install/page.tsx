import { siteMetadata } from "@/lib/site-metadata";
import type { Metadata } from "next";
import { DeploymentChooser } from "@/components/site/Experiences";
import {
  SectionIntro,
  TextLink,
  Action,
  FinalCTA,
} from "@/components/site/Primitives";
import { productDocs, PRODUCT } from "@/lib/product";
import {
  CheckCircle2,
  Database,
  Gauge,
  KeyRound,
  Network,
  Server,
  ShieldCheck,
} from "lucide-react";

export const metadata: Metadata = siteMetadata({
  title: "Deploy OpsKnight — Self-Hosted Production Topologies",
  description:
    "Choose and validate an OpsKnight deployment using the maintained Compose, Swarm, Helm, and Kustomize paths. Size from workload shape and measured saturation rather than invented limits.",
  alternates: { canonical: "/deploy/" },
  openGraph: { url: "/deploy/" },
});

const topologyRows = [
  {
    name: "Integrated Compose",
    fit: "Simplest single-host operation",
    ha: "No",
    scaling: "No",
    pooler: "No",
    docs: "start/quickstart",
  },
  {
    name: "Split Compose",
    fit: "Single-host workload isolation",
    ha: "No",
    scaling: "Yes",
    pooler: "Optional",
    docs: "operate/deploy/split-runtime",
  },
  {
    name: "Split + PgBouncer",
    fit: "Isolation plus web connection pooling",
    ha: "No",
    scaling: "Yes",
    pooler: "Enabled",
    docs: "operate/capacity/choose-deployment",
  },
  {
    name: "Docker Swarm",
    fit: "Docker-native multi-node application operation",
    ha: "Application tier",
    scaling: "Yes",
    pooler: "Optional in Split",
    docs: "operate/deploy/swarm",
  },
  {
    name: "Kubernetes Helm",
    fit: "Packaged, schema-validated Kubernetes",
    ha: "When configured",
    scaling: "Yes",
    pooler: "Optional in Split",
    docs: "operate/deploy/helm/install",
  },
  {
    name: "Kubernetes Kustomize",
    fit: "GitOps and environment-owned overlays",
    ha: "When configured",
    scaling: "Yes",
    pooler: "Optional in Split",
    docs: "operate/deploy/kustomize",
  },
] as const;

const signals = [
  ["Critical notification age rises", "Critical delivery lane", "Inspect provider/DB pressure, then scale critical workers if that lane is constrained."],
  ["Bulk queue grows", "Bulk worker lane", "Scale bulk workers without consuming critical-delivery capacity."],
  ["General job age rises", "General background work", "Scale general workers after checking downstream dependencies."],
  ["API latency rises", "Web tier", "Scale web replicas only after checking PostgreSQL latency and connections."],
  ["DB connections approach budget", "PostgreSQL / pools", "Reduce pools, add supported PgBouncer, or scale PostgreSQL."],
  ["Provider 429s rise", "Provider quota", "Reduce provider concurrency and honor retry timing."],
  ["Status projection lag rises", "Status projector", "Scale the projector and inspect its direct DB pool."],
  ["SSE latency/disconnects rise", "Web / realtime path", "Inspect proxy timeouts, web capacity, and database pressure."],
] as const;

export default function DeployPage() {
  return (
    <div className="site-page">
      <section className="interior-hero site-dark">
        <div className="site-container">
          <p className="site-eyebrow">
            <span className="signal-dot" /> DEPLOY / {PRODUCT.release.tag}
          </p>
          <h1>
            Run OpsKnight
            <br />
            on infrastructure you operate.
          </h1>
          <p className="site-description">
            Start with the maintained Compose quickstart, then choose Split,
            Swarm, Helm, or Kustomize when isolation, availability, platform
            standards, or connection pressure require it.
          </p>
          <div className="site-actions">
            <Action href={productDocs("start/quickstart")}>
              Open the quickstart
            </Action>
            <Action
              href={productDocs("operate/capacity/choose-deployment")}
              secondary
            >
              Choose a topology
            </Action>
          </div>
        </div>
      </section>

      <section className="site-section">
        <div className="site-container">
          <SectionIntro
            eyebrow="DEPLOYMENT CHOOSER"
            title="Choose from operational requirements, not an invented traffic threshold."
          >
            Split mode exists for independent scaling, failure isolation and
            notification-lane protection. Multi-node availability requires the
            surrounding database, proxy, storage and recovery design to match.
          </SectionIntro>
          <DeploymentChooser />
        </div>
      </section>

      <section className="site-section site-light-alt">
        <div className="site-container">
          <SectionIntro
            eyebrow="FASTEST START"
            title="Bring up an isolated Compose evaluation."
          >
            The maintained quickstart runs the integrated application and
            PostgreSQL on one Docker host. It is an evaluation or small-test
            path, not a multi-node HA claim.
          </SectionIntro>

          <div className="deploy-quickstart-grid">
            <article>
              <span>01 / CONFIGURE</span>
              <h3>Pin the release and set the minimum contract.</h3>
              <p>
                Use an explicit {PRODUCT.release.version} image tag or immutable
                digest. Configure the database password, public URL values,
                <code> NEXTAUTH_SECRET</code> and the stable 64-hex-character
                <code> ENCRYPTION_KEY</code>. Other provider or API secrets are
                conditional on the features you enable.
              </p>
              <pre tabIndex={0}><code>{`OPSKNIGHT_IMAGE=ghcr.io/opsknight-labs/opsknight:2.0.0
POSTGRES_PASSWORD=<unique-password>
NEXTAUTH_URL=http://localhost:3000
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXTAUTH_SECRET=<random-base64-secret>
ENCRYPTION_KEY=<64-hex-character-key>`}</code></pre>
            </article>

            <article>
              <span>02 / START &amp; VERIFY</span>
              <h3>Use the maintained Compose path.</h3>
              <p>
                Pull the pinned image, wait for health, inspect the services,
                and require readiness to return HTTP 200 before setup.
              </p>
              <pre tabIndex={0}><code>{`docker compose -f deploy/compose/docker-compose.yml pull
docker compose -f deploy/compose/docker-compose.yml up -d --wait
docker compose -f deploy/compose/docker-compose.yml ps
curl --fail --show-error 'http://localhost:3000/api/health?mode=readiness'`}</code></pre>
            </article>
          </div>

          <div className="paired-links">
            <TextLink href={productDocs("start/quickstart")}>
              Follow the Compose quickstart
            </TextLink>
            <TextLink href={productDocs("start/initial-setup")}>
              Complete initial setup safely
            </TextLink>
          </div>
        </div>
      </section>

      <section className="site-section">
        <div className="site-container">
          <SectionIntro
            eyebrow="PRODUCTION FOUNDATIONS"
            title="The topology is only one part of production readiness."
          >
            Public routing, database durability, secrets, migrations and
            recovery remain operator responsibilities in a self-hosted system.
          </SectionIntro>

          <div className="deploy-foundations-grid">
            <article>
              <Network size={22} />
              <h3>Public HTTPS &amp; Application URL</h3>
              <p>
                DNS, TLS, proxy or ingress, <code>NEXTAUTH_URL</code>, normally
                <code> NEXT_PUBLIC_APP_URL</code>, and the saved Application URL
                must resolve to the same browser-facing origin.
              </p>
              <TextLink href={productDocs("operate/deploy/application-url-and-host-routing")}>
                Host-routing contract
              </TextLink>
            </article>
            <article>
              <Database size={22} />
              <h3>PostgreSQL &amp; recovery</h3>
              <p>
                Budget aggregate connections, keep migrations on the direct
                database route where required, automate backups, and test a
                restore with the matching encryption secrets.
              </p>
              <TextLink href={productDocs("operate/data/backup-and-restore")}>
                Backup and restore
              </TextLink>
            </article>
            <article>
              <KeyRound size={22} />
              <h3>Secrets that survive restarts</h3>
              <p>
                Keep <code>NEXTAUTH_SECRET</code> and
                <code> ENCRYPTION_KEY</code> stable and protected. Add
                provider, metrics, SCIM, voice, or API secrets only when the
                corresponding capability requires them.
              </p>
              <TextLink href={productDocs("reference/configuration")}>
                Configuration reference
              </TextLink>
            </article>
            <article>
              <ShieldCheck size={22} />
              <h3>Migrations &amp; readiness gates</h3>
              <p>
                A successful container start is not acceptance. Require
                migration success, readiness, canonical-host behavior, and an
                end-to-end synthetic incident before production cutover.
              </p>
              <TextLink href={productDocs("operate/deploy")}>
                Production acceptance
              </TextLink>
            </article>
          </div>
        </div>
      </section>

      <section className="site-section site-light-alt">
        <div className="site-container">
          <SectionIntro
            eyebrow="SUPPORTED TOPOLOGIES"
            title="Pick the operating model that matches your platform."
          >
            The v2.0.0 deployment guide does not publish a certified
            requests-per-second threshold for choosing between these paths.
          </SectionIntro>

          <div
            className="deploy-topology-table-wrap"
            role="region"
            aria-label="OpsKnight deployment topology comparison"
            tabIndex={0}
          >
            <table className="deploy-topology-table">
              <thead>
                <tr>
                  <th>Topology</th>
                  <th>Best fit</th>
                  <th>Multi-node HA</th>
                  <th>Independent scaling</th>
                  <th>PgBouncer</th>
                  <th>Capacity status</th>
                </tr>
              </thead>
              <tbody>
                {topologyRows.map((row) => (
                  <tr key={row.name}>
                    <td>
                      <strong>{row.name}</strong>
                      <TextLink href={productDocs(row.docs)}>Guide</TextLink>
                    </td>
                    <td>{row.fit}</td>
                    <td>{row.ha}</td>
                    <td>{row.scaling}</td>
                    <td>{row.pooler}</td>
                    <td><span className="capacity-uncertified">Not certified</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="site-boundary">
            Docker Swarm can replace application tasks across hosts, but bundled
            PostgreSQL is not highly available. A Swarm HA objective requires
            external HA PostgreSQL, an external TLS load balancer, durable
            backups, and at least three managers.
          </p>
        </div>
      </section>

      <section className="site-section">
        <div className="site-container">
          <SectionIntro
            eyebrow="MAINTAINED INSTALL PATHS"
            title="Use the gates each orchestrator already provides."
          />

          <div className="deploy-method-grid">
            <article>
              <Server size={22} />
              <span>DOCKER SWARM</span>
              <h3>Use the maintained deploy orchestrator.</h3>
              <p>
                The script validates manager/capacity prerequisites, creates
                secrets, owns migration, deploys the stack, waits for
                convergence, and checks readiness. Routine raw
                <code> docker stack deploy</code> bypasses those gates.
              </p>
              <pre tabIndex={0}><code>{`# Split mode (default)
./deploy/swarm/scripts/deploy.sh

# Integrated mode
SWARM_RUNTIME_MODE=integrated ./deploy/swarm/scripts/deploy.sh`}</code></pre>
              <TextLink href={productDocs("operate/deploy/swarm/install")}>
                Swarm installation guide
              </TextLink>
            </article>

            <article>
              <Server size={22} />
              <span>KUBERNETES / HELM</span>
              <h3>Render and validate the maintained chart.</h3>
              <p>
                Create the namespace and externally managed Secret, render the
                local chart, validate it, then install the reviewed production
                values. The published v2 docs do not require a hosted chart
                repository.
              </p>
              <pre tabIndex={0}><code>{`helm lint deploy/kubernetes/helm/opsknight -f values.production.yaml
helm template opsknight deploy/kubernetes/helm/opsknight \\
  --namespace opsknight -f values.production.yaml > rendered.yaml
kubectl apply --dry-run=server -f rendered.yaml

helm upgrade --install opsknight deploy/kubernetes/helm/opsknight \\
  --namespace opsknight --create-namespace \\
  --values values.production.yaml --wait --timeout 15m`}</code></pre>
              <TextLink href={productDocs("operate/deploy/helm/install")}>
                Helm installation guide
              </TextLink>
            </article>
          </div>
        </div>
      </section>

      <section className="site-section site-dark">
        <div className="site-container">
          <SectionIntro
            eyebrow="CAPACITY"
            title="Build a budget from workload shape and measured saturation."
          >
            Until a matching benchmark is certified, do not turn a measured
            peak into a production promise.
          </SectionIntro>

          <div className="deploy-capacity-grid">
            <article>
              <Gauge size={24} />
              <h3>Describe the workload first.</h3>
              <ul>
                <li>Peak and sustained alert ingestion</li>
                <li>Incident deduplication ratio</li>
                <li>Notifications and escalations per incident</li>
                <li>Concurrent users and SSE streams</li>
                <li>Status subscribers and fan-out</li>
                <li>External provider rate limits</li>
              </ul>
            </article>
            <article>
              <Database size={24} />
              <h3>Budget PostgreSQL connections.</h3>
              <p>
                Sum each runtime role&apos;s replicas × pool size plus migration,
                administration, monitoring and safety headroom. PgBouncer can
                pool supported web traffic in Split mode, but direct-role pools
                still count.
              </p>
              <TextLink href={productDocs("operate/capacity/sizing")}>
                Build a capacity budget
              </TextLink>
            </article>
          </div>

          <div className="deploy-signal-table">
            <div className="deploy-signal-head">
              <span>SIGNAL</span>
              <span>LIKELY CONSTRAINT</span>
              <span>FIRST RESPONSE</span>
            </div>
            {signals.map(([signal, owner, response]) => (
              <div key={signal}>
                <strong>{signal}</strong>
                <span>{owner}</span>
                <p>{response}</p>
              </div>
            ))}
          </div>
          <TextLink href={productDocs("operate/capacity/scaling-signals")}>
            Read scaling signals
          </TextLink>
        </div>
      </section>

      <section className="site-section">
        <div className="site-container">
          <SectionIntro
            eyebrow="GO-LIVE ACCEPTANCE"
            title="Prove the deployment before production alerting depends on it."
          />
          <div className="deploy-acceptance-grid">
            {[
              "Pin the exact image tag or digest and preserve the reviewed deployment configuration.",
              "Require migration success and public readiness through the intended HTTPS origin.",
              "Verify DNS, TLS/proxy host, authentication URLs, and saved Application URL agree.",
              "Verify database backups and an isolated restore with the required stable secrets.",
              "Run a synthetic alert through notification, acknowledgement, resolution, and status projection.",
              "Observe queue/worker/database/provider signals and repeat the affected checks after topology or release changes.",
            ].map((item) => (
              <div key={item}>
                <CheckCircle2 size={18} />
                <p>{item}</p>
              </div>
            ))}
          </div>

          <div className="deploy-support-note">
            <div>
              <p className="site-eyebrow">OPTIONAL PROFESSIONAL HELP</p>
              <h3>Commercial support &amp; implementation services</h3>
              <p>
                Deployment assistance, architecture review, upgrades,
                troubleshooting and implementation can be scoped separately.
                No 24×7 coverage or response-time SLA is advertised on this
                website; any service commitment must be agreed in writing.
              </p>
            </div>
            <TextLink href="/support/">Discuss support &amp; services</TextLink>
          </div>
        </div>
      </section>

      <FinalCTA />
    </div>
  );
}
