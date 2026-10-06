import { siteMetadata } from "@/lib/site-metadata";
import type { Metadata } from "next";
import comparisons from "@/../content/product/comparisons.json";
import { ComparisonMatrix } from "@/components/comparison/ComparisonMatrix";
import { FinalCTA, TextLink } from "@/components/site/Primitives";

const pageMetadata: Metadata = {
  title: "Compare incident platforms",
  description:
    "Compare OpsKnight with PagerDuty, incident.io, Opsgenie and Grafana Cloud IRM across ownership, on-call, paging, integrations and identity.",
  alternates: { canonical: "/compare/" },
  openGraph: { url: "/compare/" },
};
export const metadata = siteMetadata(pageMetadata);

export default function Compare() {
  return (
    <div className="site-page">
      <section className="interior-hero site-dark compare-hero">
        <div className="site-container">
          <p className="site-eyebrow">
            <span className="signal-dot" /> CHOOSE WITH CONTEXT
          </p>
          <h1>
            Compare the operating model.
            <br />
            Not just the checkbox.
          </h1>
          <p className="site-description">
            See what changes across ownership, on-call, paging, collaboration,
            integrations and identity. The matrix is deliberately source-backed
            and avoids pricing claims that can age overnight.
          </p>
        </div>
      </section>

      <section className="site-section compare-matrix-section">
        <div className="site-container">
          <ComparisonMatrix />
        </div>
      </section>

      <section className="site-section site-white compare-direct">
        <div className="site-container">
          <div className="section-intro">
            <p className="site-eyebrow">
              <span className="signal-dot" /> DIRECT COMPARISONS
            </p>
            <h2>Go deeper on the product you already use.</h2>
            <p className="site-description">
              Each page keeps the vendor context and migration decision separate
              from OpsKnight’s self-hosted operating model.
            </p>
          </div>
          <div className="compare-links">
            {comparisons.map((item) => (
              <article key={item.slug} className="compare-link-card">
                <div>
                  <span>VERIFIED {item.asOf}</span>
                  <h3>{item.name}</h3>
                  <p>{item.focus}</p>
                </div>
                <TextLink href={`/compare/${item.slug}/`}>
                  Explore comparison
                </TextLink>
              </article>
            ))}
          </div>
        </div>
      </section>

      <FinalCTA />
    </div>
  );
}
