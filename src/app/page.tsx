import { siteMetadata } from "@/lib/site-metadata";
import type { Metadata } from "next";
import {
  ArrowUpRight,
  ShieldAlert,
  CalendarDays,
  PhoneCall,
  MessageSquare,
  Globe,
  BarChart3,
  Check,
  ShieldCheck,
  Github,
} from "lucide-react";
import { PRODUCT, productProof } from "@/lib/product";
import { BRAND } from "@/lib/brand";
import {
  Action,
  SectionIntro,
  ProductScreenshot,
  TextLink,
  TrustStrip,
  FeatureCard,
  ShowcaseSection,
  FinalCTA,
} from "@/components/site/Primitives";
import {
  HeroSignal,
  IncidentLoop,
  ArchitectureViewer,
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
    <div className="site-page">
      {/* 1. Hero */}
      <section className="site-hero site-dark">
        <div className="site-container">
          <div className="hero-topline">
            <span>
              <span className="signal-dot" /> INCIDENT OPERATIONS, UNDER YOUR
              CONTROL
            </span>
            <a href="/changelog/">
              {PRODUCT.release.tag} is here <ArrowUpRight size={13} />
            </a>
          </div>
          <div className="hero-copy">
            <h1>
              Own the incident<span className="hero-period">.</span>
            </h1>
            <p className="hero-subtitle">
              From first alert to final postmortem.
            </p>
            <p className="hero-description">
              On-call, paging, ChatOps, status and incident operations.
              <br className="desktop-break" /> On infrastructure you control.
            </p>
            <div className="site-actions">
              <Action href="/install/">Install OpsKnight</Action>
              <Action href="#incident-loop" secondary>
                Explore the platform
              </Action>
            </div>
            <p className="site-proof">{productProof}</p>
          </div>
          <div className="hero-product">
            <HeroSignal />
            <ProductScreenshot
              name="dashboard-overview.png"
              alt="OpsKnight operations command center showing system health, active incidents and on-call coverage"
              priority
            />
            <div className="hero-product-foot">
              <span>YOUR INFRASTRUCTURE. YOUR COMMAND CENTER.</span>
              <span>01 — OPERATIONS DASHBOARD</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Trust Strip */}
      <TrustStrip />

      {/* 3. The Incident Loop */}
      <section id="incident-loop" className="site-section">
        <div className="site-container">
          <SectionIntro
            eyebrow="THE INCIDENT LOOP"
            title="Something broke. Now what?"
          >
            Follow one incident from the first signal to the work that prevents
            the next one.
          </SectionIntro>
          <IncidentLoop />
        </div>
      </section>

      {/* 4. Core Capabilities (Pillars Grid) */}
      <section className="site-section site-white">
        <div className="site-container">
          <div className="section-heading-row">
            <SectionIntro
              eyebrow="PRODUCT PILLARS"
              title="Built for the entire incident lifecycle."
            >
              Every capability runs on your infrastructure, connects to your
              identity, and keeps your operational data strictly yours.
            </SectionIntro>
            <TextLink href="/product/incidents/">Browse all features</TextLink>
          </div>
          <div className="pillars-grid">
            <FeatureCard
              eyebrow="01 / COMMAND"
              title="Incident Command"
              description="Keep ownership, responders, timeline, notes and action items organized from first alert to resolution."
              href="/product/incidents/"
              linkText="Explore command"
              icon={ShieldAlert}
            />
            <FeatureCard
              eyebrow="02 / ON-CALL"
              title="On-Call & Escalation"
              description="Build rotations, schedule overrides and multi-step escalation policies around the engineers responsible for each service."
              href="/product/on-call/"
              linkText="Explore on-call"
              icon={CalendarDays}
            />
            <FeatureCard
              eyebrow="03 / PAGING"
              title="Multi-Channel Paging"
              description="Route urgent pages through voice, SMS, push, Slack, and Teams. Inspect delivery evidence, retries, and worker lanes."
              href="/product/paging/"
              linkText="Explore paging"
              icon={PhoneCall}
            />
            <FeatureCard
              eyebrow="04 / CHATOPS"
              title="Slack & Teams War Rooms"
              description="Coordinate directly where your team already communicates with two-way sync, interactive cards, and participant tracking."
              href="/product/chatops/"
              linkText="Explore ChatOps"
              icon={MessageSquare}
            />
            <FeatureCard
              eyebrow="05 / STATUS"
              title="Customer Status Pages"
              description="Publish service health, maintenance, and scoped updates to customers without exposing your internal response timeline."
              href="/product/status-pages/"
              linkText="Explore status page"
              icon={Globe}
            />
            <FeatureCard
              eyebrow="06 / ANALYTICS"
              title="Analytics & Postmortems"
              description="Turn every outage into an organizational asset with MTTA/MTTR metrics, service health trends, and blameless 5 Whys retrospectives."
              href="/product/analytics/"
              linkText="Explore analytics"
              icon={BarChart3}
            />
          </div>
        </div>
      </section>

      {/* 5. Visual Showcases — Command Center & Status Page */}
      <ShowcaseSection
        eyebrow="COMMAND CENTER"
        title="One clear place to run the incident."
        description="Ownership, responders, service context, and timeline. The complete response state in a single, high-fidelity view."
        screenshotName="incident-detail.png"
        screenshotAlt="The incident command view: status, ownership, responders and service context"
        linkHref="/product/incidents/"
        linkText="Deep dive into incident command"
        annotations={[
          "Status & ownership",
          "Response timeline",
          "Notes & action items",
          "Service context",
        ]}
      />

      <ShowcaseSection
        eyebrow="ON-CALL ROTATIONS"
        title="Responsibility, before the alert."
        description="Build multi-layer schedules and temporary overrides. Let the escalation engine route to the right responder with verified delivery."
        screenshotName="on-call-schedule-detail.png"
        screenshotAlt="OpsKnight schedule detail with rotation and coverage context"
        linkHref="/product/on-call/"
        linkText="Deep dive into on-call policies"
        annotations={[
          "Primary & secondary tiers",
          "Timezone-aware rotations",
          "One-click overrides",
          "Audited handoffs",
        ]}
        reverse
      />

      <ShowcaseSection
        eyebrow="COMMUNICATION & STATUS"
        title="See OpsKnight's status page in action."
        description="Publish incident updates, maintain subscriber transparency, and showcase system health directly from your installation."
        screenshotName="status-pages.png"
        screenshotAlt="OpsKnight status page with operational components and incident updates"
        linkHref="/product/status-pages/"
        linkText="Explore status-page features"
        secondaryHref="https://status.opsknight.com"
        secondaryText="View live status ↗"
        annotations={[
          "Public & private status",
          "Component degradation",
          "Email & webhook subscribers",
          "Live incident updates",
        ]}
      />

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
                Explore operations & scaling
              </TextLink>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Security, Integrations & Open Source */}
      <section className="site-section site-white">
        <div className="site-container security-story">
          <div>
            <div className="security-mark">
              <ShieldCheck size={64} />
            </div>
            <SectionIntro
              eyebrow="SECURITY & ECOSYSTEM"
              title="Your infrastructure. Your users. Your keys."
            />
          </div>
          <div>
            <p className="site-description">
              Connect your enterprise identity provider with OIDC and SCIM 2.0.
              Enforce role-based access control and audit every operator event on
              systems you control.
            </p>
            <div className="security-tokens">
              {[
                "OIDC",
                "SCIM 2.0",
                "RBAC",
                "Auditor Role",
                "Session Registry",
                "Scoped API Keys",
                "Envelope Encryption",
                "Audit Log Stream",
              ].map((t) => (
                <span key={t}>
                  <Check size={15} />
                  {t}
                </span>
              ))}
            </div>
            <div className="ecosystem-line">
              <strong>
                OpsKnight
                <span className="signal-dot" />
              </strong>
              <div>
                {[
                  "Datadog",
                  "Prometheus",
                  "Grafana",
                  "CloudWatch",
                  "Sentry",
                  "GitHub",
                  "Slack",
                  "Microsoft Teams",
                  "Jira",
                ].map((n) => (
                  <span key={n}>{n}</span>
                ))}
              </div>
            </div>
            <div className="section-heading-row" style={{ marginTop: "24px" }}>
              <p className="site-description" style={{ margin: 0 }}>
                {PRODUCT.inboundIntegrationCount} inbound monitoring and alerting
                integrations, verified against the release catalog.
              </p>
              <TextLink href="/integrations/">Explore all integrations</TextLink>
            </div>
          </div>
        </div>
      </section>

      <section className="site-section">
        <div className="site-container open-source-story">
          <Github size={48} />
          <SectionIntro
            eyebrow="BUILT IN THE OPEN"
            title="Inspectable, verifiable, and free of vendor lock-in."
          >
            Source code you can audit. Releases you can pin. Operational data
            strictly under your governance.
          </SectionIntro>
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
            <TextLink href="/support/">Enterprise Support & Services</TextLink>
            <TextLink href={BRAND.links.sponsor}>Sponsor development</TextLink>
          </div>
        </div>
      </section>

      {/* 8. Final CTA */}
      <FinalCTA />
    </div>
  );
}
