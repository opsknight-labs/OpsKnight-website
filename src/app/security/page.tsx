import { siteMetadata } from "@/lib/site-metadata";
import type { Metadata } from "next";
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
      <FinalCTA />
    </div>
  );
}
