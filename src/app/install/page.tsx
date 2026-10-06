import { siteMetadata } from "@/lib/site-metadata";
import type { Metadata } from "next";
import { DeploymentChooser } from "@/components/site/Experiences";
import { SectionIntro, TextLink } from "@/components/site/Primitives";
import { productDocs, PRODUCT } from "@/lib/product";

const pageMetadata: Metadata = {
  title: "Deploy OpsKnight",
  description:
    "Choose and plan a self-hosted OpsKnight deployment with topology guidance, workload planning shapes and production-readiness checks.",
  alternates: { canonical: "/install/" },
  openGraph: { url: "/install/" },
};
export const metadata = siteMetadata(pageMetadata);

const planningProfiles = [
  {
    name: "Small",
    users: "40 users",
    shape: "12 services · 100 SSE sessions · 1,000 status subscribers",
    start: "Integrated Compose",
    detail: "Use when one host and no high availability are acceptable.",
  },
  {
    name: "Medium",
    users: "120 users",
    shape: "32 services · 500 SSE sessions · 10,000 status subscribers",
    start: "Split Compose or Helm Split",
    detail:
      "Evaluate split roles when notification lanes need separate ownership or Kubernetes / HA is required.",
  },
  {
    name: "Large",
    users: "400 users",
    shape: "80 services · 2,500 SSE sessions · 100,000 status subscribers",
    start: "Split + PgBouncer + external PostgreSQL",
    detail:
      "Independent scaling, connection control and failure isolation usually matter more at this shape.",
  },
  {
    name: "Storm",
    users: "1,000 users",
    shape: "200 services · 5,000 SSE sessions · 100,000 status subscribers",
    start: "Multi-replica Split",
    detail:
      "Use PgBouncer and external HA PostgreSQL, then certify your real burst and fanout mix.",
  },
] as const;

const productionChecks = [
  {
    title: "Public URL & TLS",
    body: "Set the canonical Application URL, reverse proxy and HTTPS before exposing a production install.",
    docs: "operate/deploy/application-url-and-host-routing",
  },
  {
    title: "PostgreSQL & backups",
    body: "Choose database ownership, calculate the connection budget and prove backup / restore.",
    docs: "operate/data/backup-and-restore",
  },
  {
    title: "Secrets & providers",
    body: "Use production secrets and validate notification-provider credentials and callbacks.",
    docs: "operate/security/hardening",
  },
  {
    title: "Health & recovery",
    body: "Validate readiness, worker health, queue age and recovery before relying on the platform.",
    docs: "operate/reliability/health-center",
  },
] as const;

export default function Install() {
  return (
    <div className="site-page">
      <section className="interior-hero site-dark">
        <div className="site-container">
          <p className="site-eyebrow">
            <span className="signal-dot" /> DEPLOY / {PRODUCT.release.tag}
          </p>
          <h1>
            Choose the topology.
            <br />
            Prove it in your environment.
          </h1>
          <p className="site-description">
            Start simple, then split and scale only when availability,
            isolation or workload ownership requires it. Your OpsKnight product
            deployment stays entirely in infrastructure you control.
          </p>
        </div>
      </section>

      <section className="site-section">
        <div className="site-container">
          <SectionIntro
            eyebrow="DEPLOYMENT CHOOSER"
            title="Where will OpsKnight run?"
          >
            Pick a starting topology from the way your team already operates,
            not from an invented requests-per-second threshold.
          </SectionIntro>
          <DeploymentChooser />
          <div className="paired-links">
            <TextLink href={productDocs("operate/deploy/docker-compose")}>
              Fastest path: Docker Compose
            </TextLink>
            <TextLink href="/deploy/architecture/">
              Explore runtime architecture
            </TextLink>
          </div>
        </div>
      </section>

      <section className="site-section site-white">
        <div className="site-container">
          <SectionIntro
            eyebrow="PLANNING SHAPES"
            title="A useful starting point. Not a capacity promise."
          >
            These profiles come from the current load-fixture model. They help
            you choose what to evaluate; they are not certified user limits.
          </SectionIntro>
          <div className="deployment-profile-grid">
            {planningProfiles.map((profile) => (
              <article key={profile.name}>
                <div>
                  <span>{profile.name.toUpperCase()}</span>
                  <strong>{profile.users}</strong>
                </div>
                <p>{profile.shape}</p>
                <h3>{profile.start}</h3>
                <p>{profile.detail}</p>
              </article>
            ))}
          </div>
          <p className="site-boundary">
            Current benchmark artifacts are historical evidence and the tested
            topologies are not published as certified production capacity.
            Validate your alert bursts, provider quotas, realtime sessions,
            status fanout, database budget and recovery requirements.
          </p>
          <div className="paired-links">
            <TextLink href={productDocs("operate/capacity/choose-deployment")}>
              Read deployment planning
            </TextLink>
            <TextLink href={productDocs("operate/capacity/benchmark-results")}>
              Inspect benchmark evidence
            </TextLink>
            <TextLink href={productDocs("operate/capacity/sizing")}>
              Build a capacity budget
            </TextLink>
          </div>
        </div>
      </section>

      <section className="site-section">
        <div className="site-container">
          <SectionIntro
            eyebrow="BEFORE PRODUCTION"
            title="Treat deployment as an operational system."
          >
            The application, database, proxy, providers, secrets and recovery
            process all need to work together.
          </SectionIntro>
          <div className="production-check-grid">
            {productionChecks.map((check, index) => (
              <article key={check.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{check.title}</h3>
                <p>{check.body}</p>
                <TextLink href={productDocs(check.docs)}>Open guide</TextLink>
              </article>
            ))}
          </div>
          <div className="deployment-topology-links">
            <TextLink href={productDocs("operate/deploy/compose")}>Compose</TextLink>
            <TextLink href={productDocs("operate/deploy/split-runtime")}>
              Split runtime
            </TextLink>
            <TextLink href={productDocs("operate/deploy/swarm")}>Swarm</TextLink>
            <TextLink href={productDocs("operate/deploy/helm")}>Helm</TextLink>
            <TextLink href={productDocs("operate/deploy/kustomize")}>
              Kustomize
            </TextLink>
          </div>
        </div>
      </section>
    </div>
  );
}
