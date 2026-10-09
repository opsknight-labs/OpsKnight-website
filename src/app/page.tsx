import "./homepage-art-direction.css";
import { siteMetadata } from "@/lib/site-metadata";
import type { Metadata } from "next";
import Image from "next/image";
import { ArrowUpRight, Github } from "lucide-react";
import { PRODUCT } from "@/lib/product";
import { BRAND } from "@/lib/brand";
import { HomepageIntegrationFinder } from "@/components/site/HomepageIntegrationFinder";
import {
  Action,
  SectionIntro,
  TextLink,
  TrustStrip,
  FinalCTA,
} from "@/components/site/Primitives";
import {
  IncidentLoop,
  ArchitectureViewer,
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

export default function Home() {
  return (
    <div className="site-page site-page--home">
      {/* 1. Hero: a single balanced introduction, with the product visible immediately. */}
      <section className="site-hero site-dark" aria-labelledby="home-hero-title">
        <div className="site-container">
          <div className="hero-layout">
            <div className="hero-copy">
              <p className="hero-lead-in">Self-hosted incident operations</p>
              <h1 id="home-hero-title">
                Own the incident<span className="hero-period">.</span>
              </h1>
              <p className="hero-subtitle">Every signal. One clear response.</p>
              <p className="hero-description">
                Bring on-call, paging, incident response and ChatOps together
                in a platform that runs on your infrastructure.
              </p>
              <div className="site-actions">
                <Action href="/deploy/">Install OpsKnight</Action>
                <Action href="#incident-loop" secondary>
                  Explore the platform
                </Action>
              </div>
              <a className="hero-release-link" href="/changelog/">
                See what&apos;s new in {PRODUCT.release.tag}
                <ArrowUpRight size={15} aria-hidden="true" />
              </a>
            </div>

            <figure className="hero-product hero-framed">
              <div className="hero-image-window">
                <Image
                  src="/product/hero-composite.webp"
                  width={2400}
                  height={1350}
                  alt="OpsKnight Command Center with incident overview and mobile responder interfaces, showing representative demo data"
                  priority
                  sizes="(max-width: 767px) 100vw, (max-width: 1023px) 90vw, (max-width: 1440px) 54vw, 710px"
                />
              </div>
              <figcaption className="hero-image-caption">
                <span><strong>OpsKnight Command Center</strong> · Product preview using demo data</span>
                <a href="#product-proof">
                  View more product screens
                  <ArrowUpRight size={15} aria-hidden="true" />
                </a>
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* 2. Trust Strip */}
      <TrustStrip />

      {/* 3. The OpsKnight Experience: One Incident. Four Acts. */}
      <section id="incident-loop" className="site-section site-dark incident-story-section">
        <div className="site-container">
          <SectionIntro
            eyebrow="THE OPSKNIGHT EXPERIENCE"
            title="When something breaks, everything connects."
          >
            An alert becomes an incident. An incident finds its responder. Your team
            coordinates the recovery. Every response becomes an opportunity to improve.
          </SectionIntro>
          <IncidentLoop />
        </div>
      </section>

      {/* 4. Real Product Proof — Screenshots lead the product evidence */}
      <section id="product-proof" className="site-section site-dark product-proof-section">
        <div className="site-container">
          <SectionIntro
            eyebrow="REAL PRODUCT PROOF"
            title="The product behind the response."
          >
            The workflow illustration explains how response moves. These are
            real v{PRODUCT.release.version} product views captured from the
            release-backed demo environment.
          </SectionIntro>
          <ProductProofShowcase />
        </div>
      </section>

      {/* 5. Core Capabilities — Editorial Feature Index */}
      <section className="site-section site-white capabilities-section">
        <div className="site-container">
          <div className="section-heading-row">
            <SectionIntro
              eyebrow="PRODUCT CAPABILITIES"
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
                  src="/product/incident-detail.webp"
                  width={1200}
                  height={645}
                  alt="OpsKnight Incident Command workspace showing responder assignment, telemetry metrics, and event timeline"
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
              <div className="editorial-capability-row" role="listitem">
                <div className="editorial-capability-copy">
                  <div className="editorial-capability-head">
                    <span className="editorial-capability-num">02</span>
                    <h3>On-Call &amp; Escalation</h3>
                  </div>
                  <p>
                    Design timezone-aware primary and secondary rotations with DST-safe
                    handoffs and self-service shift overrides.
                  </p>
                </div>
                <TextLink href="/product/on-call/">Explore on-call</TextLink>
              </div>

              <div className="editorial-capability-row" role="listitem">
                <div className="editorial-capability-copy">
                  <div className="editorial-capability-head">
                    <span className="editorial-capability-num">03</span>
                    <h3>Multi-Channel Paging</h3>
                  </div>
                  <p>
                    Dispatch urgent pages across voice calls, push notifications, SMS,
                    and Teams with verified delivery intents and Quiet Hours.
                  </p>
                </div>
                <TextLink href="/product/paging/">Explore paging</TextLink>
              </div>

              <div className="editorial-capability-row" role="listitem">
                <div className="editorial-capability-copy">
                  <div className="editorial-capability-head">
                    <span className="editorial-capability-num">04</span>
                    <h3>Slack &amp; Teams ChatOps</h3>
                  </div>
                  <p>
                    Coordinate in native chat channels with automated war rooms,
                    two-way lifecycle sync, interactive cards, and participant tracking.
                  </p>
                </div>
                <TextLink href="/product/chatops/">Explore ChatOps</TextLink>
              </div>

              <div className="editorial-capability-row" role="listitem">
                <div className="editorial-capability-copy">
                  <div className="editorial-capability-head">
                    <span className="editorial-capability-num">05</span>
                    <h3>Decoupled Status Pages</h3>
                  </div>
                  <p>
                    Publish real-time service health, 90-day availability history,
                    and scoped maintenance notices without exposing internal response chatter.
                  </p>
                </div>
                <TextLink href="/product/status-pages/">Explore status pages</TextLink>
              </div>

              <div className="editorial-capability-row" role="listitem">
                <div className="editorial-capability-copy">
                  <div className="editorial-capability-head">
                    <span className="editorial-capability-num">06</span>
                    <h3>Analytics &amp; Postmortems</h3>
                  </div>
                  <p>
                    Track MTTA/MTTR response velocity, pinpoint noisy monitor flapping,
                    and conduct blameless 5-Whys retrospectives.
                  </p>
                </div>
                <TextLink href="/product/analytics/">Explore analytics</TextLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Production Architecture */}
      <section className="site-section site-dark">
        <div className="site-container">
          <SectionIntro
            eyebrow="PRODUCTION ARCHITECTURE"
            title="Start simple. Scale the pieces that need it."
          >
            An integrated runtime to get started in minutes. Dedicated runtime
            roles when your deployment requires independent scaling and high throughput.
          </SectionIntro>
          <ArchitectureViewer />
          <div className="reliability-story">
            <div>
              <p className="site-eyebrow">RELIABILITY IS VISIBLE</p>
              <h3>The incident platform has to survive the incident too.</h3>
            </div>
            <div>
              <p>
                Critical, transactional and bulk traffic classes. Delivery
                attempts, retries, worker health, Prometheus metrics and
                structured logs.
              </p>
              <TextLink href="/product/operations/">
                Explore operations &amp; scaling
              </TextLink>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Security & Integrations */}
      <section className="site-section site-white security-section">
        <div className="site-container">
          <SectionIntro
            eyebrow="SECURITY &amp; ECOSYSTEM"
            title="Your infrastructure. Your users. Your keys."
          >
            Connect your enterprise identity provider with OIDC and SCIM 2.0.
            Enforce role-based access control and audit every operator event on
            systems strictly under your governance.
          </SectionIntro>

          <div className="security-architecture-grid">
            <div className="security-pillar-item">
              <span className="security-pillar-num">01 / IDENTITY</span>
              <h3>OIDC &amp; SCIM 2.0</h3>
              <p>
                Federated authentication with Okta, Microsoft Entra, Google, and Auth0.
                Automated JIT user creation and SCIM 2.0 group provisioning.
              </p>
            </div>
            <div className="security-pillar-item">
              <span className="security-pillar-num">02 / ACCESS</span>
              <h3>RBAC &amp; Auditor Role</h3>
              <p>
                Least-privilege authorization with workspace roles, scoped API tokens,
                and a canonical signed-in session registry with one-click revocation.
              </p>
            </div>
            <div className="security-pillar-item">
              <span className="security-pillar-num">03 / ENCRYPTION</span>
              <h3>AES-256-GCM Envelope</h3>
              <p>
                Integration secrets and notification credentials encrypted at rest.
                All operational state stored in your self-hosted PostgreSQL database.
              </p>
            </div>
            <div className="security-pillar-item">
              <span className="security-pillar-num">04 / AUDIT</span>
              <h3>Evidence Ledgers</h3>
              <p>
                Immutable operator event stream, DSAR export and erasure tooling,
                retention holds, and verifiable evidence export packages.
              </p>
            </div>
          </div>

          <div className="security-integrations-block">
            <div className="security-integrations-head">
              <p className="site-eyebrow">
                <span className="signal-dot" /> CERTIFIED INTEGRATION CATALOG
              </p>
              <h3>Connect to 28 release-tested inbound sources.</h3>
              <p className="site-description">
                OpsKnight validates signatures, deduplicates alerts, and normalizes
                payloads across standard monitoring, cloud, and telemetry platforms.
              </p>
            </div>
            <HomepageIntegrationFinder />
          </div>
        </div>
      </section>

      {/* 8. Why OpsKnight (Compare) */}
      <section className="site-section site-dark homepage-compare">
        <div className="site-container compare-teaser-grid">
          <div className="compare-editorial-copy">
            <p className="site-eyebrow">
              <span className="signal-dot" /> THE OWNERSHIP QUESTION
            </p>
            <h2>Incident response. <em>On your terms.</em></h2>
            <p className="site-description">
              Keep the software, response workflows and operational data under
              your own control. Compare the alternatives on the details that matter.
            </p>
            <div className="compare-vendors" aria-label="Products covered in the comparison">
              <span>PagerDuty</span>
              <span>incident.io</span>
              <span>Opsgenie</span>
              <span>Grafana Cloud IRM</span>
            </div>
            <TextLink href="/compare/">View full capability comparison</TextLink>
          </div>
          <div className="compare-difference-stack">
            <article>
              <span>01</span>
              <div>
                <strong>You operate it.</strong>
                <p>Run OpsKnight on infrastructure and deployment topologies you control.</p>
              </div>
            </article>
            <article>
              <span>02</span>
              <div>
                <strong>Your incident data stays with you.</strong>
                <p>The application, database, backups and network boundary remain under your governance.</p>
              </div>
            </article>
            <article>
              <span>03</span>
              <div>
                <strong>The software is open source.</strong>
                <p>Inspect the code, pin releases, and evaluate the product before adopting it.</p>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* 9. Built in the Open */}
      <section className="site-section homepage-open-source">
        <div className="site-container open-source-story">
          <div className="open-source-intro">
            <div className="open-source-heading-label">
              <Github size={27} aria-hidden="true" />
              <span>PUBLIC SOURCE / OPERATOR CONTROL</span>
            </div>
            <SectionIntro
              eyebrow="BUILT IN THE OPEN"
              title="The source is part of the promise."
            >
              Read the code, pin a release and examine what runs inside
              your infrastructure. No opaque control plane required.
            </SectionIntro>
          </div>
          <div className="open-source-details">
            <p className="open-source-ledger-label">RELEASE LEDGER / VERIFIED PRODUCT FACTS</p>
            <div className="release-strip">
            <div>
              <small>LATEST RELEASE</small>
              <strong>{PRODUCT.release.tag}</strong>
            </div>
            <div>
              <small>RELEASED</small>
              <strong>{PRODUCT.release.date}</strong>
            </div>
            <div>
              <small>LICENSE</small>
              <strong>{PRODUCT.release.license}</strong>
            </div>
          </div>
            <div className="paired-links">
              <TextLink href={BRAND.links.github}>View source on GitHub</TextLink>
              <TextLink href="/changelog/">Read release notes</TextLink>
              <TextLink href="/support/">Commercial support</TextLink>
              <TextLink href={BRAND.links.sponsor}>Sponsor development</TextLink>
            </div>
          </div>
        </div>
      </section>

      {/* 10. Final CTA */}
      <FinalCTA />
    </div>
  );
}
