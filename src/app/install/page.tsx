import { siteMetadata } from "@/lib/site-metadata";
import type { Metadata } from "next";
import { DeploymentChooser } from "@/components/site/Experiences";
import { SectionIntro, TextLink } from "@/components/site/Primitives";
import { productDocs, PRODUCT } from "@/lib/product";
const pageMetadata: Metadata = {
  title: "Deploy OpsKnight",
  description:
    "Choose Docker Compose, Kubernetes or Docker Swarm for your self-hosted OpsKnight installation.",
  alternates: { canonical: "/install/" },
  openGraph: { url: "/install/" },
};
export const metadata = siteMetadata(pageMetadata);
export default function Install() {
  return (
    <div className="site-page">
      <section className="interior-hero site-dark">
        <div className="site-container">
          <p className="site-eyebrow">
            <span className="signal-dot" /> DEPLOY / {PRODUCT.release.tag}
          </p>
          <h1>
            Your infrastructure.
            <br />
            Your starting point.
          </h1>
          <p className="site-description">
            Start with the deployment that fits your environment. The
            documentation covers prerequisites, secrets, database setup and
            upgrades.
          </p>
        </div>
      </section>
      <section className="site-section">
        <div className="site-container">
          <SectionIntro
            eyebrow="DEPLOYMENT CHOOSER"
            title="Where will OpsKnight run?"
          />
          <DeploymentChooser />
          <p className="site-boundary">
            Configure production secrets, HTTPS, backups and your public
            application URL before handling real incidents. Notification
            providers require their own accounts and configuration.
          </p>
          <div className="paired-links">
            <TextLink href={productDocs("operate/capacity/choose-deployment")}>
              Deployment planning
            </TextLink>
            <TextLink href="/deploy/architecture/">
              Explore runtime architecture
            </TextLink>
          </div>
        </div>
      </section>
    </div>
  );
}
