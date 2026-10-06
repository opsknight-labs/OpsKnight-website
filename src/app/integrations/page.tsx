import { siteMetadata } from "@/lib/site-metadata";
import type { Metadata } from "next";
import { PRODUCT, productDocs } from "@/lib/product";
import { IntegrationExplorer } from "@/components/site/Experiences";
import { FinalCTA, TextLink } from "@/components/site/Primitives";
const pageMetadata: Metadata = {
  title: "Integrations",
  description:
    "Connect monitoring, cloud and uptime providers with OpsKnight. Explore the release-verified inbound catalog, ChatOps and Jira.",
  alternates: { canonical: "/integrations/" },
  openGraph: { url: "/integrations/" },
};
export const metadata = siteMetadata(pageMetadata);
export default function Integrations() {
  return (
    <div className="site-page">
      <section className="interior-hero site-dark">
        <div className="site-container">
          <p className="site-eyebrow">
            <span className="signal-dot" /> YOUR EXISTING STACK
          </p>
          <h1>
            One response.
            <br />
            Your whole stack.
          </h1>
          <p className="site-description">
            {PRODUCT.inboundIntegrationCount} inbound providers from the release
            catalog. Slack, Microsoft Teams and Jira connect the response to the
            work that follows.
          </p>
        </div>
      </section>
      <section className="site-section">
        <div className="site-container">
          <IntegrationExplorer />
          <p className="site-boundary">
            Authentication, supported actions and signature verification vary by
            provider. Follow the setup guide for the exact contract.
          </p>

          <div className="integration-utility-grid">
            <article>
              <p className="site-eyebrow">
                <span className="signal-dot" /> CUSTOM SYSTEMS
              </p>
              <h2>Don’t see your tool?</h2>
              <p>
                Use OpsKnight’s generic webhook path for internal monitoring,
                scripts and systems that are not in the provider catalog.
              </p>
              <TextLink href={productDocs("integrations/webhooks/webhook")}>
                Read the generic webhook guide
              </TextLink>
            </article>
            <article>
              <p className="site-eyebrow">
                <span className="signal-dot" /> PAGERDUTY COMPATIBILITY
              </p>
              <h2>Moving an Events API v2 sender?</h2>
              <p>
                OpsKnight includes an ingest adapter for PagerDuty Events API
                v2-shaped payloads. It is a compatibility path for event
                ingestion, not emulation of the PagerDuty product.
              </p>
              <TextLink href={productDocs("integrations/webhooks/pagerduty")}>
                View the compatibility guide
              </TextLink>
            </article>
          </div>
        </div>
      </section>
      <FinalCTA />
    </div>
  );
}
