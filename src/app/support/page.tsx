import { siteMetadata } from "@/lib/site-metadata";
import { BRAND } from "@/lib/brand";
import { enquiryHref } from "@/lib/contact";
import { Action, SectionIntro, TextLink } from "@/components/site/Primitives";
import { Mail } from "lucide-react";

export const metadata = siteMetadata({
  title: "Support & Services",
  description:
    "Sponsor OpsKnight or discuss commercial support, monitoring integrations, implementation and production architecture guidance.",
  alternates: { canonical: "/support/" },
});

const services = [
  {
    title: "Sponsor OpsKnight",
    description:
      "OpsKnight is independently maintained. Sponsorship funds release infrastructure, cloud environments for production-style testing, security work, documentation and continued open-source development.",
    href: BRAND.links.sponsor,
    action: "Sponsor development",
  },
  {
    title: "Commercial Support",
    description:
      "Discuss deployment help, upgrades, troubleshooting, architecture guidance and security-questionnaire assistance. Engagement scope, availability and any service commitments are agreed in writing before work starts.",
    href: enquiryHref("OpsKnight commercial support enquiry"),
    action: "Discuss support",
  },
  {
    title: "Implementation / Consulting",
    description:
      "Connect your monitoring platforms to OpsKnight and design the operational workflow around your services. Get help with integrations, on-call rotations, escalation policies, production deployment, high availability and hardening.",
    href: enquiryHref("OpsKnight implementation and consulting enquiry"),
    action: "Discuss an implementation",
  },
];

const steps = [
  [
    "Monitoring & alerting architecture",
    "Review alert sources, service boundaries, signal quality and routing.",
  ],
  [
    "OpsKnight integrations",
    "Connect monitoring platforms, map payloads and validate incident ingestion.",
  ],
  [
    "Service, on-call & escalation design",
    "Define ownership, rotations, escalation paths and responder workflows.",
  ],
  [
    "Production deployment",
    "Plan your runtime topology, database, ingress, backups and upgrades.",
  ],
  [
    "High availability & hardening",
    "Review redundancy, recovery, least privilege, secrets and operational readiness together.",
  ],
];

export default function Support() {
  return (
    <div className="site-page">
      <section className="interior-hero site-dark">
        <div className="site-container">
          <p className="site-eyebrow">
            <span className="signal-dot" /> SUPPORT & SERVICES
          </p>
          <h1>
            Open software.
            <br />
            Professional assistance.
          </h1>
          <p className="site-description">
            OpsKnight is open-source software, free to self-host under{" "}
            {BRAND.license}. Organizations can sponsor development or engage
            commercial support, migration, and implementation assistance for their own infrastructure.
          </p>
          <div className="site-actions">
            <Action
              href={enquiryHref("OpsKnight support and services enquiry")}
            >
              Discuss your requirements
            </Action>
            <Action href="/deploy/" secondary>
              Self-host OpsKnight
            </Action>
          </div>
        </div>
      </section>

      <section className="site-section">
        <div className="site-container">
          <SectionIntro
            eyebrow="WAYS TO ENGAGE"
            title="Choose the help you need."
          >
            Support the project or discuss a scoped professional engagement.
          </SectionIntro>
          <div className="security-sections">
            {services.map((service) => (
              <article key={service.title}>
                <h2>{service.title}</h2>
                <p>{service.description}</p>
                <TextLink href={service.href}>{service.action}</TextLink>
              </article>
            ))}
          </div>
          <p className="site-boundary">
            No 24×7 coverage or response-time SLA is advertised. Any support
            hours, response commitments and fees must be established in a
            separate agreement. Your infrastructure and third-party provider
            costs remain your responsibility.
          </p>
        </div>
      </section>

      <section className="site-section site-light-alt">
        <div className="site-container interior-copy">
          <h2>From monitoring signals to a production response.</h2>
          <p>
            Implementation work can follow your existing monitoring stack all
            the way through to a tested incident response workflow.
          </p>
          <ol className="services-process">
            {steps.map(([title, description]) => (
              <li key={title}>
                <h3>{title}</h3>
                <p>{description}</p>
              </li>
            ))}
          </ol>
          <div className="paired-links">
            <TextLink href="/integrations/">Explore integrations</TextLink>
            <TextLink href="/deploy/">Deployment options</TextLink>
            <TextLink href="/security/#evaluation">
              Security & procurement
            </TextLink>
          </div>
        </div>
      </section>

      <section className="site-section">
        <div className="site-container">
          <SectionIntro
            eyebrow="DIRECT ENGAGEMENT"
            title="Start with your environment."
          >
            Share your current monitoring platforms, deployment topology, team size,
            and the assistance you need to discuss scope and timelines.
          </SectionIntro>

          <div className="support-contact-grid">
            <div className="support-contact-card">
              <div className="support-contact-header">
                <div className="support-mail-icon-wrap">
                  <Mail size={22} className="text-red-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Direct Support Inbox</h3>
                  <p className="text-sm text-slate-700">
                    Reach the core maintainers directly for commercial support and architecture assistance.
                  </p>
                </div>
              </div>

              <div className="support-email-box">
                <span className="text-xs font-bold tracking-wider uppercase text-slate-700">Official Contact Email</span>
                <a
                  href={enquiryHref("OpsKnight support and services enquiry")}
                  className="support-email-address"
                >
                  {BRAND.links.email}
                </a>
              </div>

              <p className="text-sm text-slate-600 leading-relaxed">
                We discuss suitable engagement scopes, review high-availability deployment topology,
                plan migrations from legacy SaaS, or assist with procurement security questionnaires.
              </p>

              <div className="pt-2">
                <Action href={enquiryHref("OpsKnight support and services enquiry")}>
                  Discuss an engagement
                </Action>
              </div>

              <p className="support-security-notice">
                <strong>Data protection:</strong> Please remove secrets, API keys, database credentials, encryption tokens, and private incident data before sharing material.
              </p>
            </div>

            <div className="support-checklist-card">
              <h4 className="text-base font-bold mb-4 flex items-center gap-2">
                <span className="signal-dot" />
                What to include in your email:
              </h4>
              <ul className="support-checklist-items">
                <li>
                  <strong>Current monitoring stack</strong>
                  <span>Alert sources in use (e.g., Datadog, Prometheus, Grafana, AWS CloudWatch, New Relic) and estimated signal volume.</span>
                </li>
                <li>
                  <strong>Target deployment model</strong>
                  <span>Preferred runtime topology: single-node Docker Compose, Swarm HA cluster, or Kubernetes with Helm charts.</span>
                </li>
                <li>
                  <strong>Responders &amp; channels</strong>
                  <span>Team size, on-call rotations, and required paging channels (Voice phone calls, SMS, Slack, Microsoft Teams).</span>
                </li>
                <li>
                  <strong>Goals &amp; timeline</strong>
                  <span>Greenfield rollout, migration from PagerDuty/Opsgenie/Squadcast, or dedicated production hardening review.</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="support-alternate-paths">
            <p>
              Looking for open-source community discussions or product issues? Visit the{" "}
              <a href="/community/">community</a>. Corporate supplier review and security questionnaires have a{" "}
              <a href="/contact/#procurement">direct procurement path</a>.
            </p>
            <div className="pt-2">
              <TextLink
                href={enquiryHref(
                  "OpsKnight implementation and consulting enquiry",
                )}
              >
                Contact about an engagement
              </TextLink>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
