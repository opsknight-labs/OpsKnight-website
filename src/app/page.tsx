import { siteMetadata } from "@/lib/site-metadata";
import type { Metadata } from "next";
import {
  ArrowUpRight,
  PhoneCall,
  Check,
  Github,
  ShieldCheck,
} from "lucide-react";
import { PRODUCT, productProof } from "@/lib/product";
import { BRAND } from "@/lib/brand";
import {
  Action,
  SectionIntro,
  ProductScreenshot,
  TextLink,
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
              name="incident-detail.png"
              alt="OpsKnight incident detail with ownership, response actions and incident context"
              priority
            />
            <div className="hero-product-foot">
              <span>YOUR INFRASTRUCTURE. YOUR COMMAND CENTER.</span>
              <span>01 — INCIDENT RESPONSE</span>
            </div>
          </div>
        </div>
      </section>
      <div className="trust-strip">
        <div className="site-container">
          <span>Self-hosted</span>
          <span>{PRODUCT.release.license}</span>
          <span>Docker + Kubernetes</span>
          <span>Slack + Teams</span>
          <span>OIDC + SCIM</span>
          <span>Prometheus</span>
        </div>
      </div>
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
      <section className="site-section site-white">
        <div className="site-container">
          <div className="section-heading-row">
            <SectionIntro
              eyebrow="01 / INCIDENT COMMAND"
              title="One place to run the incident."
            >
              Ownership, responders, service context and the timeline. The
              complete response, in view.
            </SectionIntro>
            <TextLink href="/product/incidents/">
              Explore incident command
            </TextLink>
          </div>
          <ProductScreenshot
            name="incident-detail.png"
            alt="The incident command view: status, ownership, responders and service context"
          />
          <div className="annotation-strip">
            <span>Status & ownership</span>
            <span>Response timeline</span>
            <span>Notes & action items</span>
            <span>Service context</span>
          </div>
        </div>
      </section>
      <section className="site-section">
        <div className="site-container">
          <div className="section-heading-row">
            <SectionIntro
              eyebrow="02 / ON-CALL & ESCALATION"
              title="Responsibility, before the alert."
            >
              Build rotations and overrides. Let the escalation policy find the
              right responder when it matters.
            </SectionIntro>
            <TextLink href="/product/on-call/">Explore on-call</TextLink>
          </div>
          <div className="schedule-composition">
            <ProductScreenshot
              name="on-call-schedule-detail.png"
              alt="OpsKnight schedule detail with rotation and coverage context"
            />
            <div className="escalation-rail">
              <p className="site-eyebrow">ILLUSTRATIVE POLICY</p>
              {[
                ["0m", "Primary", "Anika Rao"],
                ["5m", "Secondary", "Sofia Reyes"],
                ["10m", "Fallback", "Platform Team"],
              ].map(([time, label, name]) => (
                <div key={time}>
                  <span>{time}</span>
                  <div>
                    <small>{label}</small>
                    <strong>{name}</strong>
                  </div>
                  <span className="signal-dot" />
                </div>
              ))}
            </div>
          </div>
          <p className="site-boundary">{PRODUCT.boundaries.manualEscalation}</p>
        </div>
      </section>
      <section className="site-section site-dark paging-section">
        <div className="site-container">
          <div className="paging-layout">
            <div>
              <SectionIntro
                eyebrow="03 / PAGING"
                title="Reach the responder. Not just their inbox."
              >
                Route the page through your configured channels. Inspect
                attempts, retries and delivery evidence.
              </SectionIntro>
              <div className="channel-list">
                {PRODUCT.notifications.channels.map((c) => (
                  <span key={c}>{c}</span>
                ))}
              </div>
              <TextLink href="/product/paging/">
                Explore the delivery control plane
              </TextLink>
            </div>
            <div className="phone-stage">
              <div className="phone">
                <div className="phone-island" />
                <p className="phone-time">09:41</p>
                <span className="phone-brand">OPSKNIGHT</span>
                <div className="phone-icon">
                  <PhoneCall size={32} />
                </div>
                <h3>Critical incident</h3>
                <p>Checkout unavailable</p>
                <small>Illustrative voice page</small>
                <div className="phone-keypad">
                  <span>1</span>
                  <p>Acknowledgement input</p>
                </div>
                <div className="phone-bottom">
                  <span />
                  <PhoneCall size={20} />
                  <span />
                </div>
              </div>
            </div>
          </div>
          <div className="voice-footnote">
            <h3>Critical pages can call.</h3>
            <p>
              Connect your own {PRODUCT.notifications.voiceProvider} account.{" "}
              {PRODUCT.notifications.voiceScope}
            </p>
          </div>
        </div>
      </section>
      <section className="site-section site-white">
        <div className="site-container">
          <SectionIntro
            eyebrow="04 / CHATOPS"
            title="Bring response into the room."
          >
            Slack and Microsoft Teams. Linked identities, incident actions and
            war rooms that keep your team connected.
          </SectionIntro>
          <div className="chatops-composition">
            <div className="chat-story">
              <span className="chat-hash">#</span>
              <p className="site-eyebrow">SLACK / ILLUSTRATIVE CONVERSATION</p>
              <h3>inc-1042-checkout</h3>
              <div className="chat-message">
                <div className="chat-avatar">OK</div>
                <div>
                  <strong>
                    OpsKnight <small>APP</small>
                  </strong>
                  <p>P1 · Checkout API unavailable</p>
                  <p>Anika Rao acknowledged the incident.</p>
                  <div className="chat-buttons">
                    <span>Acknowledge</span>
                    <span>Assign</span>
                    <span>Resolve</span>
                  </div>
                </div>
              </div>
              <div className="chat-message">
                <div className="chat-avatar human">AC</div>
                <div>
                  <strong>Anika Rao</strong>
                  <p>
                    Investigating the checkout error rate. Response context is
                    linked to the incident.
                  </p>
                </div>
              </div>
            </div>
            <ProductScreenshot
              name="teams-chatops-war-room.png"
              alt="Microsoft Teams war room connected to an OpsKnight incident"
            />
          </div>
          <TextLink href="/product/chatops/">
            Explore Slack and Teams workflows
          </TextLink>
        </div>
      </section>
      <section className="site-section">
        <div className="site-container">
          <SectionIntro
            eyebrow="05 / CUSTOMER COMMUNICATION"
            title="Clarity for your customers."
          >
            Publish what customers need to know. Keep the internal response
            timeline inside OpsKnight.
          </SectionIntro>
          <div className="status-composition">
            <ProductScreenshot
              name="status-pages.png"
              alt="Aster Cloud public status page showing service availability, incident updates and uptime history"
            />
            <div className="status-copy">
              <h3>One clear, public view.</h3>
              <p>
                Components, incident updates, maintenance, subscribers, uptime
                and branding.
              </p>
              <p className="site-boundary">
                {PRODUCT.boundaries.statusPageLimit} status page per OpsKnight{" "}
                {PRODUCT.release.version} installation.
              </p>
              <TextLink href="/product/status-pages/">
                Explore the status page
              </TextLink>
            </div>
          </div>
        </div>
      </section>
      <section className="site-section site-white">
        <div className="site-container">
          <SectionIntro
            eyebrow="06 / ANALYTICS & POSTMORTEMS"
            title="Every incident should make the next one easier."
          >
            Understand response times and service trends. Turn the review into
            action items with owners and due dates.
          </SectionIntro>
          <ProductScreenshot
            name="analytics-overview.png"
            alt="OpsKnight analytics with incident volume and response performance"
          />
          <div className="annotation-strip">
            <span>MTTA / MTTR</span>
            <span>Service trends</span>
            <span>SLA outcomes</span>
            <span>Postmortem action items</span>
          </div>
          <div className="paired-links">
            <TextLink href="/product/analytics/">Explore analytics</TextLink>
            <TextLink href="/product/postmortems/">
              Explore postmortems
            </TextLink>
          </div>
        </div>
      </section>
      <section className="site-section site-dark">
        <div className="site-container">
          <SectionIntro
            eyebrow="07 / PRODUCTION ARCHITECTURE"
            title="Start simple. Scale the pieces that need it."
          >
            An integrated runtime to get started. Dedicated runtime roles when
            your deployment needs independent scaling.
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
                Explore operations
              </TextLink>
            </div>
          </div>
        </div>
      </section>
      <section className="site-section site-white">
        <div className="site-container security-story">
          <div>
            <div className="security-mark">
              <ShieldCheck size={64} />
            </div>
            <SectionIntro
              eyebrow="08 / SECURITY & IDENTITY"
              title="Your infrastructure. Your users. Your keys."
            />
          </div>
          <div>
            <p className="site-description">
              Connect your identity provider. Provision users with SCIM. Control
              access with roles and inspect sessions and audit events.
            </p>
            <div className="security-tokens">
              {[
                "OIDC",
                "SCIM 2.0",
                "RBAC",
                "Auditor",
                "Sessions",
                "API keys",
                "Encryption",
                "Audit events",
              ].map((t) => (
                <span key={t}>
                  <Check size={15} />
                  {t}
                </span>
              ))}
            </div>
            <TextLink href="/security/">Explore security</TextLink>
          </div>
        </div>
      </section>
      <section className="site-section">
        <div className="site-container">
          <SectionIntro
            eyebrow="09 / YOUR EXISTING STACK"
            title="Connect the tools already watching."
          >
            Bring monitoring, cloud, uptime and webhook events into one response
            workflow.
          </SectionIntro>
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
          <div className="section-heading-row">
            <p className="site-description">
              {PRODUCT.inboundIntegrationCount} inbound providers, generated
              from the release catalog.
              <br />
              ChatOps and issue tracking are listed separately.
            </p>
            <TextLink href="/integrations/">Explore all integrations</TextLink>
          </div>
        </div>
      </section>
      <section className="site-section site-white">
        <div className="site-container open-source-story">
          <Github size={48} />
          <SectionIntro
            eyebrow="BUILT IN THE OPEN"
            title="Run on your infrastructure."
          >
            Source you can inspect. A release you can pin. Operational data
            under your control.
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
            <TextLink href={BRAND.links.github}>View source</TextLink>
            <TextLink href="/changelog/">Read the release</TextLink>
            <TextLink href={BRAND.links.sponsor}>Support development</TextLink>
          </div>
        </div>
      </section>
      <FinalCTA />
    </div>
  );
}
