import { siteMetadata } from "@/lib/site-metadata";
import type { Metadata } from "next";
import { PRODUCT } from "@/lib/product";
import { Action, FinalCTA } from "@/components/site/Primitives";
import { BRAND } from "@/lib/brand";
import { ChangelogView } from "@/components/changelog/ChangelogView";

const pageMetadata: Metadata = {
  title: "What’s New — OpsKnight release history",
  description:
    "Browse OpsKnight releases, new capabilities, security work, fixes, changes and performance improvements.",
  alternates: { canonical: "/changelog/" },
  openGraph: { url: "/changelog/" },
};

export const metadata = siteMetadata(pageMetadata);

export default function Changelog() {
  return (
    <div className="site-page">
      <section className="interior-hero site-dark changelog-hero">
        <div className="site-container">
          <p className="site-eyebrow">
            <span className="signal-dot" /> WHAT’S NEW
          </p>
          <h1>
            Every release.
            <br />
            Every meaningful change.
          </h1>
          <p className="site-description">
            Follow new capabilities, security work, fixes and operational
            improvements across the OpsKnight release history.
          </p>
          <div className="site-actions">
            <Action href={"#"+PRODUCT.release.tag}>Latest release</Action>
            <Action href={BRAND.links.releases} secondary>
              GitHub Releases ↗
            </Action>
          </div>
        </div>
      </section>

      <section className="site-section changelog-section">
        <div className="site-container">
          <ChangelogView />
        </div>
      </section>

      <FinalCTA />
    </div>
  );
}
