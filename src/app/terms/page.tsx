import { siteMetadata } from "@/lib/site-metadata";
import { BRAND } from "@/lib/brand";
import { TextLink } from "@/components/site/Primitives";

export const metadata = siteMetadata({
  alternates: { canonical: "/terms/" },
  title: "Terms of Service",
  description: `Terms for the ${BRAND.name} website and the licensing boundary between v2.0.0 and historical releases.`,
});

export default function TermsPage() {
  return (
    <div className="site-page">
      <section className="interior-hero site-dark legal-hero">
        <div className="site-container">
          <p className="site-eyebrow"><span className="signal-dot" /> WEBSITE TERMS</p>
          <h1>Clear boundaries for the site and software.</h1>
          <p className="site-description">
            Website terms, the v2.0.0 software license, historical release rights,
            brand usage, and separately agreed commercial services.
          </p>
        </div>
      </section>
      <section className="site-section">
        <div className="site-container legal-layout">
          <aside className="legal-meta">
            <span>LAST UPDATED</span>
            <strong>5 October 2026</strong>
            <span>CURRENT RELEASE</span>
            <strong>v{BRAND.version}</strong>
            <span>LICENSE</span>
            <strong>{BRAND.license}</strong>
          </aside>
          <article className="legal-copy">
            <section>
              <h2>Website scope</h2>
              <p>
                These terms cover the public website at {BRAND.domain}. Software releases and the website
                itself have separate licensing boundaries.
              </p>
            </section>
            <section>
              <h2>OpsKnight v{BRAND.version}</h2>
              <p>
                The active OpsKnight v{BRAND.version} release is distributed under GNU Affero General Public
                License version 3 only ({BRAND.license}). The AGPL includes obligations for modified versions
                used for remote network interaction, including the corresponding-source requirement in section 13.
              </p>
              <TextLink href={BRAND.links.license}>Read the release license</TextLink>
            </section>
            <section>
              <h2>Commercial services</h2>
              <p>
                Commercial support, implementation services, sponsorship and services that incur external
                operating or licensing costs may have separate terms. Those terms do not change the license
                attached to a published software release.
              </p>
            </section>
            <section>
              <h2>Historical releases</h2>
              <p>
                OpsKnight v{BRAND.legacyVersion} and earlier published releases retain the licenses that
                accompanied those artifacts, including {BRAND.legacyLicense} where applicable. The v2.0.0
                transition does not retroactively revoke or replace those rights. A release, tag, container
                image, chart or source archive keeps the license that accompanied that artifact.
              </p>
              <TextLink href={BRAND.links.licenseTransition}>Read the license-transition notice</TextLink>
            </section>
            <section>
              <h2>Trademarks and brand assets</h2>
              <p>
                Software licensing does not grant rights to use the OpsKnight name, logos or other brand
                assets as the identity of a fork, derivative product or hosted service. Lawful descriptive
                and nominative use is not restricted by this statement.
              </p>
              <TextLink href={BRAND.links.trademarks}>Read the trademark policy</TextLink>
            </section>
            <section>
              <h2>Website</h2>
              <p>
                The marketing site is provided as-is and carries no support SLA. This website repository is
                not made available under the OpsKnight software license merely because it describes the software.
                Trademarks of other companies, including PagerDuty, Slack and Grafana, belong to their owners.
                OpsKnight is not affiliated with them; names and marks appear only to identify products that
                OpsKnight compares or interoperates with.
              </p>
            </section>
            <section>
              <h2>Changes</h2>
              <p>These terms may be updated. Material changes will be dated at the top of this page.</p>
              <div className="paired-links">
                <TextLink href="/contact/">Questions about these terms</TextLink>
                <TextLink href="/brand/">Brand guidance</TextLink>
              </div>
            </section>
          </article>
        </div>
      </section>
    </div>
  );
}
