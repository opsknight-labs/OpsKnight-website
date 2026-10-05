import { siteMetadata } from "@/lib/site-metadata";
import type { Metadata } from "next";
import { PRODUCT } from "@/lib/product";
import { Action, FinalCTA } from "@/components/site/Primitives";
import { BRAND } from "@/lib/brand";
const pageMetadata: Metadata = {
  title: "What’s new",
  description:
    "Release notes generated from the OpsKnight product release metadata.",
  alternates: { canonical: "/changelog/" },
  openGraph: { url: "/changelog/" },
};
export const metadata = siteMetadata(pageMetadata);
export default function Changelog() {
  return (
    <div className="site-page">
      <section className="interior-hero site-dark">
        <div className="site-container">
          <p className="site-eyebrow">
            <span className="signal-dot" /> WHAT’S NEW / {PRODUCT.release.date}
          </p>
          <h1>OpsKnight {PRODUCT.release.tag}.</h1>
          <p className="site-description">
            The latest release. Generated from the product changelog, with the
            complete details available in the source repository.
          </p>
          <div className="site-actions">
            <Action href={`${BRAND.links.releases}/tag/${PRODUCT.release.tag}`}>
              Read complete release notes
            </Action>
          </div>
        </div>
      </section>
      <section className="site-section">
        <div className="site-container release-highlights">
          {PRODUCT.release.highlights.map((h) => (
            <article key={h.title}>
              <h2>{h.title}</h2>
              <p>{h.description}</p>
            </article>
          ))}
        </div>
      </section>
      <FinalCTA />
    </div>
  );
}
