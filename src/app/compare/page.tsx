import { siteMetadata } from "@/lib/site-metadata";
import type { Metadata } from "next";
import comparisons from "@/../content/product/comparisons.json";
import { FinalCTA, TextLink } from "@/components/site/Primitives";
const pageMetadata: Metadata = {
  title: "Compare incident platforms",
  description:
    "Assess incident platforms by deployment ownership, operational workflow and sourced vendor information.",
  alternates: { canonical: "/compare/" },
  openGraph: { url: "/compare/" },
};
export const metadata = siteMetadata(pageMetadata);
export default function Compare() {
  return (
    <div className="site-page">
      <section className="interior-hero site-dark">
        <div className="site-container">
          <p className="site-eyebrow">
            <span className="signal-dot" /> CHOOSE WITH CONTEXT
          </p>
          <h1>
            Find the platform
            <br />
            that fits your operations.
          </h1>
          <p className="site-description">
            Compare deployment ownership, response workflows and operating
            responsibilities. Vendor details are dated and linked to primary
            sources.
          </p>
        </div>
      </section>
      <section className="site-section">
        <div className="site-container security-sections">
          {comparisons.map((c) => (
            <article key={c.slug}>
              <h2>{c.name}</h2>
              <p>{c.focus}</p>
              <TextLink href={`/compare/${c.slug}/`}>
                Explore the comparison
              </TextLink>
            </article>
          ))}
        </div>
      </section>
      <FinalCTA />
    </div>
  );
}
