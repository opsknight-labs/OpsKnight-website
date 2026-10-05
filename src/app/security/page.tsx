import { siteMetadata } from "@/lib/site-metadata";
import type { Metadata } from "next";
import { BRAND } from "@/lib/brand";
import { enquiryHref } from "@/lib/contact";
import { PRODUCT, productDocs } from "@/lib/product";
import { Action, FinalCTA, TextLink } from "@/components/site/Primitives";
const pageMetadata: Metadata = {
  title: "Security & identity",
  description:
    "OpsKnight security: self-hosted data, OIDC, SCIM, scoped authorization, session management and operational evidence.",
  alternates: { canonical: "/security/" },
  openGraph: { url: "/security/" },
};
export const metadata = siteMetadata(pageMetadata);
export default function Security() {
  return (
    <div className="site-page">
      <section className="interior-hero site-dark">
        <div className="site-container">
          <p className="site-eyebrow">
            <span className="signal-dot" /> SECURITY AT OPSKNIGHT
          </p>
          <h1>
            Your infrastructure.
            <br />
            Your users. Your keys.
          </h1>
          <p className="site-description">
            Keep the data plane self-hosted. Connect identity, control access
            and inspect operational evidence.
          </p>
          <div className="site-actions">
            <Action href={productDocs("operate/security/hardening")}>
              Read the hardening guide
            </Action>
            <Action href="/install/" secondary>
              Deploy OpsKnight
            </Action>
          </div>
        </div>
      </section>
      <section className="site-section">
        <div className="site-container">
          <div className="security-sections">
            {PRODUCT.security.sections.map((s) => (
              <article key={s.title}>
                <h2>{s.title}</h2>
                <p>{s.description}</p>
                <TextLink href={productDocs(s.docs)}>
                  Explore {s.title.toLowerCase()}
                </TextLink>
              </article>
            ))}
          </div>
          <p className="site-boundary">
            Compliance framework mappings and evidence tools support your own
            review. They do not confer external certification.
          </p>
        </div>
      </section>
      <section className="site-section site-light-alt" id="evaluation">
        <div className="site-container">
          <h2>For security & procurement teams</h2>
          <p className="site-description">
            Review the release-specific policies and deployment responsibilities
            before adopting OpsKnight. Contact the maintainer directly for
            supplier and security questionnaires.
          </p>
          <div className="security-sections">
            {[
              [
                "Security policy",
                "Private reporting channels and best-effort handling targets. These are not contractual response SLAs.",
                BRAND.links.securityPolicy,
              ],
              [
                "Vulnerability-response process",
                "Triage, severity assessment, remediation and coordinated disclosure.",
                BRAND.links.vulnerabilityResponse,
              ],
              [
                "SBOM & release evidence",
                "Source inventories and container attestations have different scopes. Check availability and association with the exact release or image digest; a workflow setting alone is not evidence of publication.",
                BRAND.links.sbom,
              ],
              [
                "Supported-version policy",
                "Maintenance scope and end-of-life policy; no fixed multi-year support or per-minor backport guarantee.",
                BRAND.links.supportedVersions,
              ],
              [
                "Shared responsibility",
                "Understand what the project provides and what your organization must operate, configure and secure.",
                BRAND.links.sharedResponsibility,
              ],
              [
                "Software licence",
                `${PRODUCT.release.tag} is distributed under ${PRODUCT.release.license}. Review the licence attached to your release.`,
                BRAND.links.license,
              ],
            ].map(([title, description, href]) => (
              <article key={title}>
                <h3>{title}</h3>
                <p>{description}</p>
                <TextLink href={href}>Read {title.toLowerCase()}</TextLink>
              </article>
            ))}
          </div>
          <div className="paired-links">
            <TextLink
              href={enquiryHref(
                "OpsKnight supplier and security questionnaire enquiry",
              )}
            >
              Email about your evaluation
            </TextLink>
            <TextLink href="/contact/#security">
              Report a vulnerability privately
            </TextLink>
            <TextLink href="/support/">Professional assistance</TextLink>
          </div>
          <p className="site-boundary">
            These materials support your evaluation; they do not assert external
            certification or a compliance guarantee. Include the version and
            deployment context when requesting evidence.
          </p>
        </div>
      </section>
      <FinalCTA />
    </div>
  );
}
