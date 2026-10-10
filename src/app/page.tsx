import "./homepage-art-direction.css";
import { siteMetadata } from "@/lib/site-metadata";
import type { Metadata } from "next";
import Image from "next/image";
import { ArrowUpRight, Code2, Database, KeyRound, Lock, ScrollText, Server, ShieldCheck } from "lucide-react";
import { PRODUCT } from "@/lib/product";
import { BRAND } from "@/lib/brand";
import { HomepageIntegrationFinder } from "@/components/site/HomepageIntegrationFinder";
import { HomeChapterRail } from "@/components/site/HomeChapterRail";
import { HomeArchitecture } from "@/components/site/HomeArchitecture";
import { HomeHero } from "@/components/site/HomeHero";
import { HomeInstall } from "@/components/site/HomeInstall";
import { HomeFinalCta } from "@/components/site/HomeFinalCta";
import {
  SectionIntro,
  TextLink,
  TrustStrip,
} from "@/components/site/Primitives";
import {
  IncidentLoop,
  ProductProofShowcase,
} from "@/components/site/Experiences";

const pageMetadata: Metadata = {
  title: "OpsKnight — Incident operations you control",
  description:
    "Self-hosted incident management and on-call. Detect, page, coordinate, communicate and learn on infrastructure you own.",
  alternates: { canonical: "/" },
  openGraph: { url: "/" },
};

export const metadata = siteMetadata(pageMetadata);

// Mirrors the Quick start in the OpsKnight README.
const QUICK_START = `git clone https://github.com/opsknight-labs/OpsKnight.git
cd OpsKnight
cp env.example .env

printf 'NEXTAUTH_SECRET=%s\\n' "$(openssl rand -base64 32)" >> .env
printf 'API_KEY_SECRET=%s\\n' "$(openssl rand -base64 32)" >> .env
printf 'ENCRYPTION_KEY=%s\\n' "$(openssl rand -hex 32)" >> .env
printf 'POSTGRES_PASSWORD=%s\\n' "$(openssl rand -base64 32)" >> .env

OPSKNIGHT_IMAGE=ghcr.io/opsknight-labs/opsknight:${PRODUCT.release.version} \\
  docker compose -f deploy/compose/docker-compose.yml pull
OPSKNIGHT_IMAGE=ghcr.io/opsknight-labs/opsknight:${PRODUCT.release.version} \\
  docker compose -f deploy/compose/docker-compose.yml up -d

docker compose -f deploy/compose/docker-compose.yml exec -T opsknight-app \\
  node scripts/create-bootstrap-code.mjs`;

const HOME_CHAPTERS = [
  { id: "signal", label: "Signal" },
  { id: "incident-loop", label: "Response" },
  { id: "product-proof", label: "Product" },
  { id: "capabilities", label: "Capabilities" },
  { id: "architecture", label: "Architecture" },
  { id: "security-ecosystem", label: "Security" },
  { id: "ownership", label: "Ownership" },
  { id: "open-source", label: "Open source" },
  { id: "faq", label: "Questions" },
] as const;

const CAPABILITIES = [
  ["02", "On-Call & Escalation", "Design timezone-aware primary and secondary rotations with DST-safe handoffs and self-service shift overrides.", "/product/on-call/", "Explore on-call"],
  ["03", "Multi-Channel Paging", "Dispatch urgent pages across voice calls, push notifications, SMS, and Teams with verified delivery intents and Quiet Hours.", "/product/paging/", "Explore paging"],
  ["04", "Slack & Teams ChatOps", "Coordinate in native chat channels with automated war rooms, two-way lifecycle sync, interactive cards, and participant tracking.", "/product/chatops/", "Explore ChatOps"],
  ["05", "Decoupled Status Pages", "Publish real-time service health, 90-day availability history, and scoped maintenance notices without exposing internal response chatter.", "/product/status-pages/", "Explore status pages"],
  ["06", "Analytics & Postmortems", "Track MTTA/MTTR response velocity, pinpoint noisy monitor flapping, and conduct blameless 5-Whys retrospectives.", "/product/analytics/", "Explore analytics"],
] as const;

const SECURITY_SPECS = [
  [KeyRound, "Identity", "OIDC and SCIM 2.0", "Sign in with Okta, Entra, Google or Auth0. Users and groups provision themselves."],
  [ShieldCheck, "Access", "Roles, scoped tokens, an auditor seat", "Least privilege by default. Any signed-in session can be revoked in one click."],
  [Lock, "Encryption", "AES-256-GCM at rest", "Integration secrets and credentials are envelope-encrypted. State lives in your PostgreSQL."],
  [ScrollText, "Audit", "An evidence trail", "Immutable operator events, DSAR export and erasure, retention holds and exportable evidence."],
] as const;

const OWNERSHIP = [
  [Server, "You run it.", "On your own infrastructure, in whatever topology suits you: Compose, Swarm or Kubernetes."],
  [Database, "Your data stays put.", "Application, database, backups and network boundary stay under your governance."],
  [Code2, "You can read every line.", "It's open source. Inspect it, pin a release, and evaluate before you commit."],
] as const;

const FAQ = [
  [
    "Is OpsKnight free to use?",
    `The software is open source under ${PRODUCT.release.license}, so you can run it on your own infrastructure without a licence fee. Commercial support is available if your team wants it.`,
  ],
  [
    "What do I need to run it?",
    "Git, Docker with Docker Compose, and openssl. The bundled Compose stack starts PostgreSQL and OpsKnight together; the quick start above generates the secrets for you.",
  ],
  [
    "Can it run with high availability?",
    "Yes. Use the split runtime on Docker, Swarm or Kubernetes with an external, managed PostgreSQL. The bundled database is meant for evaluation and is not clustered.",
  ],
  [
    "Which tools does it connect to?",
    `${PRODUCT.inboundIntegrationCount} release-tested inbound alert sources, plus Slack, Microsoft Teams and Jira. A generic webhook covers internal systems without a dedicated adapter.`,
  ],
  [
    "Where is my incident data stored?",
    "In your own PostgreSQL database. Integration secrets and notification credentials are envelope-encrypted with AES-256-GCM at rest.",
  ],
] as const;

export default function Home() {
  return (
    <div className="site-page site-page--home">
      <HomeChapterRail chapters={HOME_CHAPTERS} />
      {/* 1. Command Center introduction with a guided spotlight tour. */}
      <HomeHero version={PRODUCT.release.version} license={PRODUCT.release.license} />

      {/* 2. Trust Strip */}
      <TrustStrip />
      <div className="home-status-utility">
        <div className="site-container">
          <a href={BRAND.links.status} target="_blank" rel="noopener noreferrer">
            Live OpsKnight status
            <ArrowUpRight size={14} aria-hidden="true" />
          </a>
        </div>
      </div>

      {/* 3. The OpsKnight Experience: One Incident. Four Acts. */}
      <section id="incident-loop" className="site-section site-white incident-story-section home-chapter">
        <div className="site-container">
          <SectionIntro
            eyebrow="The response"
            title="When something breaks, everything connects."
          >
            An alert becomes an incident. The incident finds its responder. The team
            works the problem together, and every response leaves you better prepared.
          </SectionIntro>
          <IncidentLoop />
        </div>
      </section>

      {/* 4. Real Product Proof — Screenshots lead the product evidence */}
      <section id="product-proof" className="site-section site-dark product-proof-section home-chapter">
        <div className="site-container">
          <SectionIntro
            eyebrow="The product"
            title="The product behind the response."
          >
            Every screen here is OpsKnight v{PRODUCT.release.version} itself,
            running on demo data. Nothing is mocked up.
          </SectionIntro>
          <ProductProofShowcase />
        </div>
      </section>

      {/* 5. Core Capabilities — Editorial Feature Index */}
      <section id="capabilities" className="site-section site-white capabilities-section home-chapter">
        <div className="site-container">
          <div className="section-heading-row">
            <SectionIntro
              eyebrow="Capabilities"
              title="Built for the entire incident lifecycle."
            >
              The core incident platform runs on your infrastructure, connects
              to your identity, and keeps the application data plane under your
              operating control.
            </SectionIntro>
            <TextLink href="/product/incidents/">Browse all features</TextLink>
          </div>

          <div className="capabilities-editorial-layout">
            {/* Left: Featured Capability */}
            <div className="capability-featured-card">
              <div className="capability-featured-header">
                <span className="capability-featured-badge">FEATURED CAPABILITY</span>
                <h3>Incident Command &amp; Live Timeline</h3>
                <p>
                  Keep ownership, responders, synchronized ChatOps war rooms, and
                  immutable audit timelines organized from first alert to final resolution.
                </p>
                <TextLink href="/product/incidents/">Explore Incident Command</TextLink>
              </div>
              <div className="capability-featured-visual">
                <Image
                  src="/product/incident-response.webp"
                  width={2400}
                  height={1290}
                  alt="OpsKnight incident response workspace showing the active incident, responders, and live timeline"
                  sizes="(max-width: 1024px) 100vw, 560px"
                />
                <div className="capability-featured-meta">
                  <span>Assigned commander</span>
                  <span>Correlated telemetry</span>
                  <span>Immutable audit log</span>
                </div>
              </div>
            </div>

            {/* Right: Editorial Index with thin horizontal dividers */}
            <div className="capabilities-editorial-index" role="list">
              {CAPABILITIES.map(([num, title, body, href, linkText]) => (
                <div key={href} className="editorial-capability-row" role="listitem">
                  <div className="editorial-capability-copy">
                    <div className="editorial-capability-head">
                      <span className="editorial-capability-num">{num}</span>
                      <h3>{title}</h3>
                    </div>
                    <p>{body}</p>
                  </div>
                  <TextLink href={href}>{linkText}</TextLink>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. Production Architecture */}
      <section id="architecture" className="site-section site-dark home-architecture home-chapter">
        <div className="site-container">
          <div className="home-arch-head">
            <SectionIntro
              eyebrow="Architecture"
              title="Start simple. Scale the pieces that need it."
            >
              One process to get going in minutes. Separate runtime roles when a
              part of the system needs to scale on its own.
            </SectionIntro>
            <figure className="home-arch-note">
              <blockquote>
                The incident platform has to survive the incident too.
              </blockquote>
              <figcaption>
                <p>
                  Critical, transactional and bulk traffic run in separate lanes,
                  with retries, worker health, Prometheus metrics and structured
                  logs you can watch.
                </p>
                <TextLink href="/product/operations/">Operations &amp; scaling</TextLink>
              </figcaption>
            </figure>
          </div>
          <HomeArchitecture />
        </div>
      </section>

      {/* 7. Security & Integrations */}
      <section id="security-ecosystem" className="site-section site-white home-security home-chapter">
        <div className="site-container">
          <div className="home-spec">
            <SectionIntro
              eyebrow="Security"
              title="Your infrastructure. Your users. Your keys."
            >
              Bring your own identity provider, keep every record in your own
              database, and keep a trail of every change.
            </SectionIntro>
            <dl className="home-spec-list">
              {SECURITY_SPECS.map(([Icon, term, title, body]) => (
                <div key={term}>
                  <dt>
                    <span className="home-icon" aria-hidden="true"><Icon size={16} /></span>
                    {term}
                  </dt>
                  <dd>
                    <strong>{title}</strong>
                    <span>{body}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="home-integrations">
            <div className="home-integrations-head">
              <h3>Plugs into the stack you already run.</h3>
              <p>
                {PRODUCT.inboundIntegrationCount} release-tested alert sources. Signatures verified, duplicates
                folded, payloads normalised.
              </p>
            </div>
            <HomepageIntegrationFinder />
          </div>
        </div>
      </section>

      {/* 8. Ownership */}
      <section id="ownership" className="site-section site-dark home-ownership home-chapter">
        <div className="site-container">
          <div className="home-split-head">
            <SectionIntro eyebrow="Ownership" title="Incident response, on your terms." />
            <p className="home-ownership-compare">
              <span>Weighing PagerDuty, incident.io, Opsgenie or Grafana Cloud IRM?</span>
              <TextLink href="/compare/">See the comparison</TextLink>
            </p>
          </div>
          <ol className="home-ownership-points">
            {OWNERSHIP.map(([Icon, title, body]) => (
              <li key={title}>
                <span className="home-icon home-icon--dark" aria-hidden="true"><Icon size={18} /></span>
                <strong>{title}</strong>
                <p>{body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 9. Open source and install */}
      <section id="open-source" className="site-section homepage-open-source home-chapter">
        <div className="site-container home-open">
          <div className="home-open-copy">
            <SectionIntro
              eyebrow="Open source"
              title="The source is part of the promise."
            >
              Read the code, pin a release, and know exactly what runs inside
              your infrastructure. No opaque control plane.
            </SectionIntro>
            <dl className="home-open-facts">
              <div>
                <dt>Latest release</dt>
                <dd>{PRODUCT.release.tag}</dd>
              </div>
              <div>
                <dt>Released</dt>
                <dd>{PRODUCT.release.date}</dd>
              </div>
              <div>
                <dt>License</dt>
                <dd>{PRODUCT.release.license}</dd>
              </div>
            </dl>
            <div className="home-open-links">
              <TextLink href={BRAND.links.github}>Source on GitHub</TextLink>
              <TextLink href="/changelog/">Release notes</TextLink>
              <TextLink href="/support/">Commercial support</TextLink>
              <TextLink href={BRAND.links.sponsor}>Sponsor development</TextLink>
            </div>
          </div>
          <HomeInstall command={QUICK_START} />
        </div>
      </section>

      {/* 10. Questions */}
      <section id="faq" className="site-section site-white home-faq home-chapter">
        <div className="site-container home-faq-grid">
          <SectionIntro eyebrow="Questions" title="What teams ask before they install.">
            Still unsure? The <a href={BRAND.links.docs}>documentation</a> covers
            every deployment option in detail.
          </SectionIntro>
          <div className="home-faq-list">
            {FAQ.map(([q, a], i) => (
              <details key={q} open={i === 0}>
                <summary>{q}</summary>
                <p>{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 11. Final call to action */}
      <HomeFinalCta />
    </div>
  );
}
