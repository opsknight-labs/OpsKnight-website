import { siteMetadata } from "@/lib/site-metadata";
import type { Metadata } from "next";
import { Action, FinalCTA, TextLink } from "@/components/site/Primitives";
import { BRAND } from "@/lib/brand";
import { PRODUCT } from "@/lib/product";

const pageMetadata: Metadata = {
  title: "Why OpsKnight",
  description:
    "Why OpsKnight exists, who self-hosted incident operations are for, and how the open-source project is maintained.",
  alternates: { canonical: "/about/" },
  openGraph: { url: "/about/" },
};
export const metadata = siteMetadata(pageMetadata);

export default function About() {
  return (
    <div className="site-page">
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
            Incident response is part of your infrastructure. OpsKnight brings
            on-call, paging, collaboration, customer communication and learning
            into a platform you can run yourself.
          </p>
          <div className="site-actions">
            <Action href={BRAND.links.github}>Explore the source</Action>
            <Action href="/deploy/" secondary>
              Deploy OpsKnight
            </Action>
          </div>
        </div>
      </section>

      <section className="about-facts">
        <div className="site-container">
          <span>v{PRODUCT.release.version}</span>
          <span>{PRODUCT.release.license}</span>
          <span>Self-hosted</span>
          <span>{PRODUCT.inboundIntegrationCount} inbound integrations</span>
        </div>
      </section>

      <section className="site-section">
        <div className="site-container">
          <div className="about-fit-grid">
            <article>
              <p className="site-eyebrow">WHO IT IS FOR</p>
              <h2>Teams that want to own the response stack.</h2>
              <p>
                SRE, DevOps and platform teams that are comfortable operating
                application infrastructure and want incident data, deployment
                decisions and upgrade timing under their control.
              </p>
            </article>
            <article>
              <p className="site-eyebrow">WHO IT IS NOT FOR</p>
              <h2>Teams looking for a zero-operations managed SaaS.</h2>
              <p>
                OpsKnight {PRODUCT.release.version} is self-hosted. Your team
                owns the runtime, database, backups, provider accounts,
                networking and production operations.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="site-section site-white">
        <div className="site-container about-story-grid">
          <article>
            <p className="site-eyebrow">THE MISSION</p>
            <h2>Make serious incident operations inspectable.</h2>
            <p>
              Alerts are only the beginning. Ownership, escalation,
              collaboration, customer updates, evidence and follow-up should be
              understandable as one operational workflow—not hidden behind a
              black-box service.
            </p>
          </article>
          <article>
            <p className="site-eyebrow">OPEN SOURCE MODEL</p>
            <h2>Built in the open.</h2>
            <p>
              OpsKnight {PRODUCT.release.version} is distributed under{" "}
              {PRODUCT.release.license}. The code, release documentation and
              operational guidance can be inspected before you deploy it.
            </p>
            <TextLink href={BRAND.links.license}>Read the licence</TextLink>
          </article>
          <article>
            <p className="site-eyebrow">THE PROJECT</p>
            <h2>Maintained with the community.</h2>
            <p>
              OpsKnight is created and maintained by Dushyant Rahangdale.
              Issues, discussions and contributions remain part of the product
              feedback loop.
            </p>
            <div className="paired-links">
              <TextLink href={BRAND.links.discussions}>Discussions</TextLink>
              <TextLink href={BRAND.links.contributing}>Contributing</TextLink>
              <TextLink href={BRAND.links.sponsor}>Sponsor development</TextLink>
            </div>
          </article>
          <article>
            <p className="site-eyebrow">PROFESSIONAL HELP</p>
            <h2>Adoption can still have a human path.</h2>
            <p>
              Organizations that want deployment, migration, implementation or
              evaluation help can use Support & Services without changing the
              open-source operating model.
            </p>
            <TextLink href="/support/">Explore Support & Services</TextLink>
          </article>
        </div>
      </section>
      <FinalCTA />
    </div>
  );
}
