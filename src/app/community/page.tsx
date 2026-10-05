import { siteMetadata } from "@/lib/site-metadata";
export const metadata = siteMetadata({
  title: "Community",
  description:
    "Discuss workflows, contribute and report product issues in the OpsKnight community.",
  alternates: { canonical: "/community/" },
});
import { BRAND } from "@/lib/brand";
import { Action, TextLink } from "@/components/site/Primitives";
export default function Community() {
  return (
    <div className="site-page">
      <section className="interior-hero site-dark">
        <div className="site-container">
          <p className="site-eyebrow">
            <span className="signal-dot" /> COMMUNITY
          </p>
          <h1>
            Build better
            <br />
            incident operations.
          </h1>
          <p className="site-description">
            Discuss workflows, report issues and contribute to OpsKnight through
            the project’s open-source community.
          </p>
          <div className="site-actions">
            <Action href={BRAND.links.discussions}>Join the discussion</Action>
            <Action href={BRAND.links.github} secondary>
              View source
            </Action>
          </div>
        </div>
      </section>
      <section className="site-section">
        <div className="site-container security-sections">
          <article>
            <h2>Report a product issue.</h2>
            <p>
              Include the release, deployment topology and steps to reproduce.
              Remove secrets and private incident data before sharing logs.
            </p>
            <TextLink href={BRAND.links.issues}>Open GitHub issues</TextLink>
          </article>
          <article>
            <h2>Contribute to the project.</h2>
            <p>
              Start with the contribution guide and discuss larger changes with
              the community.
            </p>
            <TextLink href={BRAND.links.contributing}>
              Read the contribution guide
            </TextLink>
          </article>
          <article>
            <h2>Security reports.</h2>
            <p>
              Use the repository’s security reporting workflow for sensitive
              findings.
            </p>
            <TextLink href={BRAND.links.security}>Security reporting</TextLink>
          </article>
          <article>
            <h2>Support development.</h2>
            <p>
              Sponsorship supports continued work on the platform and its
              documentation.
            </p>
            <TextLink href={BRAND.links.sponsor}>Sponsor OpsKnight</TextLink>
          </article>
        </div>
      </section>
    </div>
  );
}
