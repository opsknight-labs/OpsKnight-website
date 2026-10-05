import { siteMetadata } from "@/lib/site-metadata";
import { BRAND } from "@/lib/brand";
import { enquiryHref } from "@/lib/contact";
import { Action, SectionIntro, TextLink } from "@/components/site/Primitives";
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
            support and implementation expertise for their own infrastructure.
          </p>
          <div className="site-actions">
            <Action
              href={enquiryHref("OpsKnight support and services enquiry")}
            >
              Discuss your requirements
            </Action>
            <Action href="/install/" secondary>
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
        <div className="site-container interior-copy">
          <h2>Start with your environment.</h2>
          <p>
            Email {BRAND.links.email} with your current monitoring platforms,
            deployment topology, services, team size and the assistance you
            need. We can discuss a suitable scope and next steps. Remove secrets
            and private incident data before sharing material.
          </p>
          <TextLink
            href={enquiryHref(
              "OpsKnight implementation and consulting enquiry",
            )}
          >
            Contact about an engagement
          </TextLink>
          <p>
            For community discussions and product issues, visit the{" "}
            <a href="/community/">community</a>. Procurement and supplier
            questionnaires have a{" "}
            <a href="/contact/#procurement">direct contact path</a>.
          </p>
        </div>
      </section>
    </div>
  );
}
