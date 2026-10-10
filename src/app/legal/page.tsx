import { siteMetadata } from "@/lib/site-metadata";
import { BRAND } from "@/lib/brand";
import { TextLink } from "@/components/site/Primitives";

export const metadata = siteMetadata({
  alternates: { canonical: "/legal/" },
  title: "Legal & Policies",
  description:
    "OpsKnight website policies, software licensing, trademark guidance, security reporting and shared-responsibility references.",
});

const policies = [
  {
    title: "Privacy",
    body: "How the public OpsKnight website handles request data and where the self-hosted product boundary begins.",
    href: "/privacy/",
  },
  {
    title: "Website terms",
    body: "Terms for the public website, published software releases, historical licenses and commercial services.",
    href: "/terms/",
  },
  {
    title: "Software license",
    body: `The current v${BRAND.version} release is distributed under ${BRAND.license}.`,
    href: BRAND.links.license,
  },
  {
    title: "Trademark policy",
    body: "How to reference the OpsKnight name and marks without implying ownership, endorsement or affiliation.",
    href: BRAND.links.trademarks,
  },
  {
    title: "Security policy",
    body: "Supported reporting channels, disclosure expectations and the security policy shipped with the current release.",
    href: BRAND.links.securityPolicy,
  },
  {
    title: "Vulnerability reporting",
    body: "Use GitHub private vulnerability reporting for security issues that should not be disclosed publicly.",
    href: BRAND.links.privateSecurityReport,
  },
  {
    title: "Shared responsibility",
    body: "What OpsKnight provides and what remains the operator’s responsibility in a self-hosted deployment.",
    href: BRAND.links.sharedResponsibility,
  },
] as const;

export default function LegalPage() {
  return (
    <div className="site-page site-page--legal site-page--legal-index">
      <section className="interior-hero site-dark legal-hero">
        <div className="site-container">
          <p className="site-eyebrow">
            <span className="signal-dot" /> LEGAL &amp; POLICIES
          </p>
          <h1>
            Clear product boundaries.
            <br />
            Clear operating responsibility.
          </h1>
          <p className="site-description">
            Website policies, software licensing, brand usage, security
            reporting and self-hosted responsibility in one place.
          </p>
        </div>
      </section>

      <section className="site-section">
        <div className="site-container legal-index-grid">
          {policies.map((policy) => (
            <article key={policy.title}>
              <span>POLICY</span>
              <h2>{policy.title}</h2>
              <p>{policy.body}</p>
              <TextLink href={policy.href}>Open policy</TextLink>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
