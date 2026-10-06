import { siteMetadata } from "@/lib/site-metadata";
import { BRAND } from "@/lib/brand";
import { TextLink } from "@/components/site/Primitives";

export const metadata = siteMetadata({
  alternates: { canonical: "/privacy/" },
  title: "Privacy Policy",
  description: `Privacy policy for the ${BRAND.name} website.`,
});

export default function PrivacyPage() {
  return (
    <div className="site-page">
      <section className="interior-hero site-dark legal-hero">
        <div className="site-container">
          <p className="site-eyebrow"><span className="signal-dot" /> WEBSITE POLICY</p>
          <h1>Privacy, without ambiguity.</h1>
          <p className="site-description">
            What the OpsKnight website processes, what the self-hosted product keeps under your control,
            and where third-party infrastructure is involved.
          </p>
        </div>
      </section>
      <section className="site-section">
        <div className="site-container legal-layout">
          <aside className="legal-meta">
            <span>LAST UPDATED</span>
            <strong>20 August 2026</strong>
            <span>SCOPE</span>
            <strong>{BRAND.domain}</strong>
            <span>CONTACT</span>
            <a href={`mailto:${BRAND.links.email}`}>{BRAND.links.email}</a>
          </aside>
          <article className="legal-copy">
            <section>
              <h2>Scope</h2>
              <p>
                Operator of this website: {BRAND.authors[0].name}. This policy covers {BRAND.domain} only.
                It does not cover data inside a self-hosted OpsKnight instance; that data stays on the
                infrastructure of whoever runs the software.
              </p>
            </section>
            <section>
              <h2>Self-hosted product</h2>
              <p>
                When you run OpsKnight, incident data, schedules and users stay on your infrastructure.
                Project maintainers cannot see that data. There is no OpsKnight-hosted cloud that stores
                your incidents.
              </p>
            </section>
            <section>
              <h2>This website</h2>
              <p>
                The site source does not load a third-party analytics or advertising pixel. Pages are
                served through Cloudflare Pages. Cloudflare, as the CDN, may process request metadata such
                as IP address, user agent and requested URL under its own terms to deliver and protect the site.
                OpsKnight does not sell that data.
              </p>
            </section>
            <section>
              <h2>Messages and project services</h2>
              <p>
                If you email {BRAND.links.email}, open a GitHub issue, join a discussion or submit a
                contribution, GitHub and your email provider process that information under their own policies.
                Do not put secrets, access tokens or private incident data in public project channels.
              </p>
            </section>
            <section>
              <h2>Questions</h2>
              <p>
                For website privacy questions, use the contact route. Product security reports have a separate
                private reporting path.
              </p>
              <div className="paired-links">
                <TextLink href="/contact/">Contact OpsKnight</TextLink>
                <TextLink href={BRAND.links.privateSecurityReport}>Private security report</TextLink>
              </div>
            </section>
          </article>
        </div>
      </section>
    </div>
  );
}
