import { siteMetadata } from "@/lib/site-metadata";
import { BRAND } from "@/lib/brand";
import { TextLink } from "@/components/site/Primitives";

export const metadata = siteMetadata({
  alternates: { canonical: "/terms/" },
  title: "Terms of Service",
  description: `Terms for the ${BRAND.name} website and the licensing boundary between v2.0.0 and historical releases.`,
});

const sections = [
  ["website-scope", "Website terms"],
  ["software", "OpsKnight software"],
  ["historical", "Historical releases"],
  ["services", "Commercial services"],
  ["trademarks", "Trademarks"],
  ["third-parties", "Third-party products"],
  ["changes", "Changes"],
] as const;

export default function TermsPage() {
  return (
    <div className="site-page">
      <section className="interior-hero site-dark legal-hero">
        <div className="site-container">
          <p className="site-eyebrow">
            <span className="signal-dot" /> LEGAL / TERMS
          </p>
          <h1>Terms</h1>
          <p className="site-description">
            Website terms, the current software license, historical release
            rights, brand usage and separately agreed commercial services.
          </p>
          <p className="legal-updated">Last updated · 5 October 2026</p>
        </div>
      </section>

      <section className="site-section legal-reading-section">
        <div className="site-container legal-layout">
          <aside className="legal-meta">
            <div className="legal-meta-facts">
              <span>CURRENT RELEASE</span>
              <strong>v{BRAND.version}</strong>
              <span>LICENSE</span>
              <strong>{BRAND.license}</strong>
            </div>
            <nav aria-label="Terms sections">
              <span>ON THIS PAGE</span>
              {sections.map(([id, label]) => (
                <a key={id} href={`#${id}`}>{label}</a>
              ))}
            </nav>
          </aside>

          <article className="legal-copy">
            <section id="website-scope">
              <h2>Website terms</h2>
              <p>
                These terms cover the public website at {BRAND.domain}. Software
                releases and the website itself have separate licensing
                boundaries.
              </p>
            </section>

            <section id="software">
              <h2>OpsKnight open-source software</h2>
              <p>
                The active OpsKnight v{BRAND.version} release is distributed
                under GNU Affero General Public License version 3 only
                ({BRAND.license}). The AGPL includes obligations for modified
                versions used for remote network interaction, including the
                corresponding-source requirement in section 13.
              </p>
              <TextLink href={BRAND.links.license}>Read the release license</TextLink>
            </section>

            <section id="historical">
              <h2>Historical releases</h2>
              <p>
                OpsKnight v{BRAND.legacyVersion} and earlier published releases
                retain the licenses that accompanied those artifacts, including
                {BRAND.legacyLicense} where applicable. The v2.0.0 transition
                does not retroactively revoke or replace those rights. A
                release, tag, container image, chart or source archive keeps the
                license that accompanied that artifact.
              </p>
              <TextLink href={BRAND.links.licenseTransition}>
                Read the license-transition notice
              </TextLink>
            </section>

            <section id="services">
              <h2>Commercial support &amp; services</h2>
              <p>
                Commercial support, implementation services, sponsorship and
                services that incur external operating or licensing costs may
                have separate terms. Those terms do not change the license
                attached to a published software release.
              </p>
            </section>

            <section id="trademarks">
              <h2>Trademarks and brand assets</h2>
              <p>
                Software licensing does not grant rights to use the OpsKnight
                name, logos or other brand assets as the identity of a fork,
                derivative product or hosted service. Lawful descriptive and
                nominative use is not restricted by this statement.
              </p>
              <TextLink href={BRAND.links.trademarks}>
                Read the trademark policy
              </TextLink>
            </section>

            <section id="third-parties">
              <h2>Third-party products</h2>
              <p>
                Trademarks of other companies, including PagerDuty, Slack and
                Grafana, belong to their owners. OpsKnight is not affiliated
                with them; names and marks appear only to identify products that
                OpsKnight compares or interoperates with.
              </p>
            </section>

            <section id="changes">
              <h2>Changes</h2>
              <p>
                The marketing site is provided as-is and carries no support
                SLA. These terms may be updated, and material changes will be
                dated at the top of this page.
              </p>
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
