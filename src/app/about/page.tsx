import { siteMetadata } from "@/lib/site-metadata";
import type { Metadata } from "next";
import { Action, FinalCTA, TextLink } from "@/components/site/Primitives";
import { BRAND } from "@/lib/brand";
const pageMetadata: Metadata = {
  title: "Why OpsKnight",
  description:
    "Open-source incident operations built for teams that want to own their operational infrastructure and data.",
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
            on-call, paging, collaboration and learning into a platform you can
            run yourself.
          </p>
          <div className="site-actions">
            <Action href={BRAND.links.github}>Explore the source</Action>
          </div>
        </div>
      </section>
      <section className="site-section">
        <div className="site-container interior-copy">
          <h2>Built in the open.</h2>
          <p>
            OpsKnight is an open-source, self-hosted project created by Dushyant
            Rahangdale. Its code and documentation are available for inspection,
            contribution and deployment on your own infrastructure.
          </p>
          <h2>A complete incident workflow.</h2>
          <p>
            Alerts are the beginning. Teams also need ownership, escalation, a
            place to coordinate, a clear customer update and a review that leads
            to action. OpsKnight connects those steps.
          </p>
          <h2>Join the project.</h2>
          <p>
            Report issues, discuss workflows and contribute improvements through
            the project’s GitHub community.
          </p>
          <div className="paired-links">
            <TextLink href={BRAND.links.discussions}>Discussions</TextLink>
            <TextLink href={BRAND.links.contributing}>Contributing</TextLink>
            <TextLink href={BRAND.links.sponsor}>Sponsor development</TextLink>
          </div>
        </div>
      </section>
      <FinalCTA />
    </div>
  );
}
