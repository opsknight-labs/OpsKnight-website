import { siteMetadata } from "@/lib/site-metadata";
import type { Metadata } from "next";
import { Action, FinalCTA, SectionIntro, TextLink } from "@/components/site/Primitives";
import { BRAND } from "@/lib/brand";
import { PRODUCT } from "@/lib/product";
import {
  Code2,
  Cpu,
  Layers,
  CheckCircle2,
  XCircle,
  HeartHandshake,
  Scale,
  Database,
} from "lucide-react";

const pageMetadata: Metadata = {
  title: "Why OpsKnight — Sovereign Incident Operations & On-Call",
  description:
    "Why OpsKnight exists, the architecture of self-hosted incident response, who it is built for, and our permanent copyleft open-source commitment.",
  alternates: { canonical: "/about/" },
  openGraph: { url: "/about/" },
};
export const metadata = siteMetadata(pageMetadata);

export default function About() {
  return (
    <div className="site-page site-page--about">
      {/* 1. Hero Section */}
      <section className="interior-hero site-dark">
        <div className="site-container">
          <p className="site-eyebrow">
            <span className="signal-dot" /> WHY OPSKNIGHT EXISTS
          </p>
          <h1>
            Operational control
            <br />
            should belong to you.
          </h1>
          <p className="site-description">
            Incident response is critical production infrastructure. OpsKnight unites
            on-call scheduling, multi-channel paging, ChatOps, public status pages,
            telemetry analytics, and blameless postmortems into a single sovereign platform
            you own and operate entirely within your infrastructure.
          </p>
          <div className="site-actions">
            <Action href="/deploy/">Deploy OpsKnight</Action>
            <Action href={BRAND.links.github} secondary>
              Explore the source
            </Action>
          </div>
        </div>
      </section>

      {/* 2. Fact / Authority Strip */}
      <section className="about-facts-strip">
        <div className="site-container">
          <div className="about-facts-grid">
            <div className="about-fact-card">
              <strong>v{PRODUCT.release.version} Stable</strong>
              <span>Release-backed build</span>
            </div>
            <div className="about-fact-card">
              <strong>{PRODUCT.release.license}</strong>
              <span>Permanent copyleft protection</span>
            </div>
            <div className="about-fact-card">
              <strong>100% Self-Hosted</strong>
              <span>Zero external data custody</span>
            </div>
            <div className="about-fact-card">
              <strong>{PRODUCT.inboundIntegrationCount} Inbound Sources</strong>
              <span>Documented request contracts</span>
            </div>
            <div className="about-fact-card">
              <strong>Unlimited Responders</strong>
              <span>Zero per-seat licensing tax</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. The Core Manifesto: The Black-Box SaaS Paradox */}
      <section className="site-section site-white">
        <div className="site-container">
          <SectionIntro
            eyebrow="THE PROBLEM WE SOLVE"
            title="The black-box incident SaaS paradox."
          >
            Engineering organizations have spent a decade containerizing, automating, and securing
            their production infrastructure, yet their critical incident management plane remains
            rented from closed, multi-tenant clouds.
          </SectionIntro>

          <div className="about-manifesto-grid">
            <article className="manifesto-card saas">
              <span className="manifesto-badge">
                <XCircle size={13} /> The Status Quo: Proprietary Incident SaaS
              </span>
              <h3>Why incident SaaS breaks down at scale</h3>
              <ul className="manifesto-points">
                <li>
                  <XCircle size={16} className="text-red-500 shrink-0 mt-1" />
                  <div>
                    <strong>The per-seat responder tax:</strong> $34–$50+/user/month penalizes adding developers, product managers, and stakeholder teams to rotations, creating operational communication silos.
                  </div>
                </li>
                <li>
                  <XCircle size={16} className="text-red-500 shrink-0 mt-1" />
                  <div>
                    <strong>Third-party cloud downtime:</strong> When major cloud providers experience regional outages, external SaaS alerting portals often degrade, blinding teams precisely when coordination is vital.
                  </div>
                </li>
                <li>
                  <XCircle size={16} className="text-red-500 shrink-0 mt-1" />
                  <div>
                    <strong>Opaque deduplication &amp; routing:</strong> Incident correlation and routing logic run inside black-box proprietary engines with no way to inspect or debug unexpected escalations.
                  </div>
                </li>
                <li>
                  <XCircle size={16} className="text-red-500 shrink-0 mt-1" />
                  <div>
                    <strong>Data custody and compliance exposure:</strong> Sensitive stack traces, internal network IPs, customer impact metrics, and employee notes are continuously transmitted to multi-tenant cloud servers.
                  </div>
                </li>
              </ul>
            </article>

            <article className="manifesto-card sovereign">
              <span className="manifesto-badge">
                <CheckCircle2 size={13} /> The Sovereign Standard: OpsKnight
              </span>
              <h3>Built from first principles for infrastructure teams</h3>
              <ul className="manifesto-points">
                <li>
                  <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-1" />
                  <div>
                    <strong>Zero per-seat licensing friction:</strong> Add every engineer, support lead, and executive to incident notifications and response teams with no license procurement friction.
                  </div>
                </li>
                <li>
                  <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-1" />
                  <div>
                    <strong>Runs inside your own boundary:</strong> Deployed in your VPC, private Kubernetes cluster, or on-premises servers. Internal communication and response control planes remain functional regardless of external outages.
                  </div>
                </li>
                <li>
                  <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-1" />
                  <div>
                    <strong>Auditable &amp; deterministic:</strong> Inspect every schema definition, database migration, worker queue lane, and cryptographic signature check directly in the open repository.
                  </div>
                </li>
                <li>
                  <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-1" />
                  <div>
                    <strong>Complete data custody:</strong> Your dedicated PostgreSQL database stores all incident timelines, response metrics, and retro action items under your enterprise backup and retention policies.
                  </div>
                </li>
              </ul>
            </article>
          </div>
        </div>
      </section>

      {/* 4. Who It Is For vs. Who It Is Not For */}
      <section className="site-section site-canvas">
        <div className="site-container">
          <SectionIntro
            eyebrow="QUALIFICATION & BOUNDARIES"
            title="Is OpsKnight the right fit for your team?"
          >
            We believe in honest qualification. OpsKnight is purposefully designed for teams that prioritize
            engineering control, reliability, and security over zero-maintenance outsourcing.
          </SectionIntro>

          <div className="about-fit-grid">
            <article className="about-fit-card positive">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={18} className="text-emerald-600" />
                <span className="site-eyebrow mb-0">WHO OPSKNIGHT IS BUILT FOR</span>
              </div>
              <h3>Teams that value operational control and data sovereignty</h3>
              <p>
                OpsKnight is built for engineering teams who consider incident response to be core infrastructure,
                not a disposable third-party accessory.
              </p>
              <ul className="fit-list">
                <li>
                  <CheckCircle2 size={15} className="text-emerald-600" />
                  <span><strong>SRE, DevOps &amp; Platform Teams:</strong> Engineers who operate Kubernetes, Docker, or bare-metal stacks and demand control over upgrades, databases, and network ingress.</span>
                </li>
                <li>
                  <CheckCircle2 size={15} className="text-emerald-600" />
                  <span><strong>Regulated &amp; Privacy-First Orgs:</strong> Financial services, healthcare, defense, and public-sector teams operating under strict compliance rules where incident data cannot leave the boundary.</span>
                </li>
                <li>
                  <CheckCircle2 size={15} className="text-emerald-600" />
                  <span><strong>Teams Migrating from Deprecated Tools:</strong> Organizations seeking modern self-hosted stability in light of Opsgenie’s end-of-life (April 2027) or Grafana OnCall OSS archive.</span>
                </li>
                <li>
                  <CheckCircle2 size={15} className="text-emerald-600" />
                  <span><strong>High-Growth Engineering Orgs:</strong> Companies wanting to empower every engineer with on-call capability without facing unpredictable, compounding per-seat SaaS invoices.</span>
                </li>
              </ul>
            </article>

            <article className="about-fit-card negative">
              <div className="flex items-center gap-2">
                <XCircle size={18} className="text-amber-600" />
                <span className="site-eyebrow mb-0">WHO OPSKNIGHT IS NOT FOR</span>
              </div>
              <h3>Teams looking for zero-maintenance SaaS outsourcing</h3>
              <p>
                Self-hosting requires engineering stewardship. OpsKnight v{PRODUCT.release.version} is not a
                turnkey hosted SaaS product.
              </p>
              <ul className="fit-list">
                <li>
                  <XCircle size={15} className="text-amber-600" />
                  <span><strong>Zero-Operations Teams:</strong> Teams that do not have infrastructure engineers or do not want to manage container runtimes, PostgreSQL databases, and SSL certificates.</span>
                </li>
                <li>
                  <XCircle size={15} className="text-amber-600" />
                  <span><strong>External Managed SLA Seekers:</strong> Organizations expecting a third-party vendor to guarantee 99.99% uptime for their application servers and manage hardware failover.</span>
                </li>
                <li>
                  <XCircle size={15} className="text-amber-600" />
                  <span><strong>Air-Gapped Telephony Without Gateway:</strong> Environments that require voice and SMS paging but cannot establish outbound network access to providers such as Twilio or dedicated telecom gateways.</span>
                </li>
                <li>
                  <XCircle size={15} className="text-amber-600" />
                  <span><strong>Non-Technical User Bases:</strong> Organizations that prefer proprietary point-and-click drag-and-drop SaaS configurators over version-controlled infrastructure definitions.</span>
                </li>
              </ul>
            </article>
          </div>
        </div>
      </section>

      {/* 5. Four Architectural Pillars */}
      <section className="site-section site-dark">
        <div className="site-container">
          <SectionIntro
            eyebrow="ENGINEERING FOUNDATION"
            title="Built on four core architectural pillars."
          >
            Every line of code and feature in OpsKnight is guided by clear architectural disciplines
            designed to keep production response resilient under stress.
          </SectionIntro>

          <div className="about-pillars-grid">
            <article className="about-pillar-card">
              <div className="about-pillar-icon">
                <Database size={20} />
              </div>
              <h3>01 / Data Sovereignty &amp; Custody</h3>
              <p>
                All incident notes, timelines, responder rotations, and retro evidence live in your dedicated
                PostgreSQL database. Backup with native pg_dump tools, encrypt at rest, and keep audit custody intact.
              </p>
            </article>

            <article className="about-pillar-card">
              <div className="about-pillar-icon">
                <Cpu size={20} />
              </div>
              <h3>02 / The Unified Command Loop</h3>
              <p>
                Eliminate four separate point solutions. Alert ingestion, escalation policies, Microsoft Teams &amp;
                Slack war rooms, public status announcements, and 5-Whys postmortems operate in one coherent platform.
              </p>
            </article>

            <article className="about-pillar-card">
              <div className="about-pillar-icon">
                <Code2 size={20} />
              </div>
              <h3>03 / Deterministic Contracts</h3>
              <p>
                28 inbound integrations feature documented request starters, integration-key authentication with conditional signature verification,
                and transparent payload tracing. Alerts are never silently discarded by black-box filters.
              </p>
            </article>

            <article className="about-pillar-card">
              <div className="about-pillar-icon">
                <Layers size={20} />
              </div>
              <h3>04 / Pragmatic Topology Scaling</h3>
              <p>
                Deploy in 3 minutes via single-node Compose for evaluation. Transition seamlessly to decoupled Web,
                Scheduler, and Critical Worker pods with PgBouncer connection pooling when production demands HA.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* 6. Provenance & The Open Source AGPL Commitment */}
      <section className="site-section site-white">
        <div className="site-container">
          <SectionIntro
            eyebrow="GOVERNANCE & STEWARDSHIP"
            title="Open source from day one. Protected forever."
          >
            How the project is maintained, why copyleft licensing protects the community,
            and how to participate in development.
          </SectionIntro>

          <div className="about-governance-layout">
            <article className="about-governance-card">
              <div className="flex items-center gap-2">
                <Scale size={18} className="text-red-600" />
                <span className="site-eyebrow mb-0">THE AGPL-3.0 COMMITMENT</span>
              </div>
              <h3 className="text-xl font-bold">Why we chose the GNU Affero General Public License</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                In recent years, numerous open-source infrastructure and observability projects launched under
                permissive licenses only to execute a &ldquo;bait-and-switch&rdquo; once they gained adoption—relicensing to
                restrictive proprietary licenses (SSPL, BSL) or abandoning their self-hosted editions.
              </p>
              <p className="text-sm text-slate-600 leading-relaxed">
                OpsKnight v{PRODUCT.release.version} is intentionally licensed under <strong>{PRODUCT.release.license}</strong>.
                This copyleft license permanently protects our community: it ensures that anyone who modifies or hosts
                the platform must share their improvements under the same open-source terms. OpsKnight cannot be enclosed
                into a proprietary walled garden by cloud providers.
              </p>
              <div className="pt-2">
                <TextLink href={BRAND.links.license}>Inspect the AGPL-3.0 License</TextLink>
              </div>
            </article>

            <article className="about-maintainer-card">
              <div className="flex items-center gap-2">
                <HeartHandshake size={18} className="text-red-600" />
                <span className="site-eyebrow mb-0">PROJECT MAINTAINER</span>
              </div>
              <h3 className="text-xl font-bold">Maintained by Dushyant Rahangdale</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                OpsKnight is created and actively maintained by Dushyant Rahangdale alongside community contributors
                worldwide. Issues, architectural proposals, code contributions, and feedback happen in the open.
              </p>
              <div className="flex flex-col gap-2 pt-2">
                <TextLink href={BRAND.links.discussions}>Join GitHub Discussions</TextLink>
                <TextLink href={BRAND.links.contributing}>Contributing Guidelines</TextLink>
                <TextLink href={BRAND.links.sponsor}>Sponsor Project Development</TextLink>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* 7. Core Operating Principles */}
      <section className="site-section site-canvas">
        <div className="site-container">
          <SectionIntro
            eyebrow="OPERATING PRINCIPLES"
            title="Guiding disciplines for resilient response."
          >
            Engineering standards that ensure OpsKnight remains dependable, inspectable, and sovereign when production is under stress.
          </SectionIntro>

          <div className="about-milestones-grid">
            <article className="milestone-card">
              <span className="milestone-tag">PRINCIPLE 01</span>
              <h4>Deterministic Execution</h4>
              <p>
                Alert correlation, escalation steps, and responder paging execute with predictable certainty.
                We reject black-box heuristics and opaque algorithms in the critical paging path.
              </p>
            </article>

            <article className="milestone-card">
              <span className="milestone-tag">PRINCIPLE 02</span>
              <h4>Zero Telemetry Tracking</h4>
              <p>
                OpsKnight contains no phone-home analytics, tracking pixels, or outbound reporting.
                Your incident records, responder contact details, and postmortems stay strictly inside your network boundary.
              </p>
            </article>

            <article className="milestone-card">
              <span className="milestone-tag">PRINCIPLE 03</span>
              <h4>Permanent Open Source</h4>
              <p>
                Protected by AGPL-3.0 copyleft, OpsKnight’s core platform cannot be enclosed into a closed-source monopoly.
                Every database migration, background worker queue, and API contract remains permanently open, auditable, and sovereign.
              </p>
            </article>

            <article className="milestone-card">
              <span className="milestone-tag">PRINCIPLE 04</span>
              <h4>Predictable Operations</h4>
              <p>
                Deploy what you need: from single-node Docker Compose for simple setups to clustered Swarm or Kubernetes
                for high availability, with zero per-seat licensing penalties as your engineering team grows.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* 8. Commercial Support & Professional Services Callout */}
      <section className="site-section site-white">
        <div className="site-container">
          <div className="about-commercial-banner">
            <div className="about-commercial-copy">
              <p className="site-eyebrow">
                <span className="signal-dot" /> COMMERCIAL PEACE OF MIND
              </p>
              <h3>Self-hosting does not mean being on your own.</h3>
              <p>
                Organizations adopting OpsKnight can engage commercial support agreements, high-availability architecture
                reviews, migration assistance from PagerDuty/Opsgenie, and security onboarding directly with the maintainers.
              </p>
            </div>
            <div className="shrink-0 flex flex-col sm:flex-row gap-3">
              <Action href="/support/">Explore Support &amp; Services</Action>
              <Action href="/contact/" secondary>Contact the Maintainer</Action>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Final CTA */}
      <FinalCTA />
    </div>
  );
}
