import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { PRODUCT, productImage, productProof } from "@/lib/product";
import { BRAND } from "@/lib/brand";
export function Action({
  href,
  children,
  secondary = false,
}: {
  href: string;
  children: React.ReactNode;
  secondary?: boolean;
}) {
  return (
    <Link href={href} className={`site-action ${secondary ? "secondary" : ""}`}>
      {children}
      <ArrowUpRight size={17} />
    </Link>
  );
}
export function SectionIntro({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="section-intro">
      <p className="site-eyebrow">
        <span className="signal-dot" />
        {eyebrow}
      </p>
      <h2>{title}</h2>
      {children && <p className="site-description">{children}</p>}
    </div>
  );
}
export function ProductScreenshot({
  name,
  alt,
  priority = false,
}: {
  name: string;
  alt: string;
  priority?: boolean;
}) {
  const evidence =
    PRODUCT.screenshots.assets[
      name.replace(/\.png$/, "") as keyof typeof PRODUCT.screenshots.assets
    ];
  return (
    <figure
      className={`product-shot ${name === "mobile.png" ? "mobile-product-shot" : ""}`}
    >
      <div className="shot-label">
        <span className="signal-dot" /> OPSKNIGHT / PRODUCT VIEW{" "}
        <span>v{PRODUCT.release.version}</span>
      </div>
      <Image
        src={productImage(name)}
        width={evidence.width}
        height={evidence.height}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        style={{ aspectRatio: `${evidence.width} / ${evidence.height}` }}
        sizes={name === "mobile.png" ? "390px" : "(max-width: 768px) 100vw, 1200px"}
      />
      <figcaption>{alt}</figcaption>
    </figure>
  );
}
export function TextLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link className="site-text-link" href={href}>
      {children}
      <ArrowRight size={16} />
    </Link>
  );
}
export function FinalCTA() {
  return (
    <section className="site-dark final-cta">
      <div className="site-container">
        <p className="site-eyebrow">
          <span className="signal-dot" /> TAKE CONTROL
        </p>
        <h2>
          Your incidents
          <br />
          should belong to you.
        </h2>
        <p>Run OpsKnight on infrastructure you control.</p>
        <div className="site-actions">
          <Action href="/deploy/">Install OpsKnight</Action>
          <Action href={BRAND.links.github} secondary>
            View source
          </Action>
        </div>
        <p className="site-proof">{productProof}</p>
      </div>
    </section>
  );
}

export function TrustStrip() {
  return (
    <div className="trust-strip">
      <div className="site-container">
        <span>Self-hosted</span>
        <span>{PRODUCT.release.license}</span>
        <span>Docker + Kubernetes</span>
        <span>Slack + Teams</span>
        <span>OIDC + SCIM</span>
        <span>Prometheus</span>
      </div>
    </div>
  );
}

export function FeatureCard({
  eyebrow,
  title,
  description,
  href,
  linkText,
  icon: Icon,
}: {
  eyebrow: string;
  title: string;
  description: string;
  href: string;
  linkText: string;
  icon?: React.ComponentType<{ size?: number; className?: string }>;
}) {
  return (
    <div className="pillar-card">
      <div className="pillar-header">
        <p className="site-eyebrow">
          <span className="signal-dot" />
          {eyebrow}
        </p>
        {Icon && (
          <div className="pillar-icon">
            <Icon size={20} />
          </div>
        )}
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
      <TextLink href={href}>{linkText}</TextLink>
    </div>
  );
}

export function ShowcaseSection({
  eyebrow,
  title,
  description,
  screenshotName,
  screenshotAlt,
  linkHref,
  linkText,
  secondaryHref,
  secondaryText,
  annotations,
  reverse = false,
  dark = false,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  screenshotName: string;
  screenshotAlt: string;
  linkHref: string;
  linkText: string;
  secondaryHref?: string;
  secondaryText?: string;
  annotations?: string[];
  reverse?: boolean;
  dark?: boolean;
}) {
  return (
    <section className={`site-section ${dark ? "site-dark" : "site-white"} showcase-section`}>
      <div className="site-container">
        <div className={`showcase-grid ${reverse ? "reverse" : ""}`}>
          <div className="showcase-content">
            <SectionIntro eyebrow={eyebrow} title={title}>
              {description}
            </SectionIntro>
            <div style={{ display: "flex", gap: "16px", alignItems: "center", flexWrap: "wrap", marginTop: "16px" }}>
              <TextLink href={linkHref}>{linkText}</TextLink>
              {secondaryHref && secondaryText && (
                <a
                  href={secondaryHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="site-action secondary"
                  style={{ fontSize: "13px", padding: "8px 16px", textDecoration: "none" }}
                >
                  {secondaryText}
                </a>
              )}
            </div>
          </div>
          <div className="showcase-visual">
            <ProductScreenshot name={screenshotName} alt={screenshotAlt} />
            {annotations && annotations.length > 0 && (
              <div className="annotation-strip">
                {annotations.map((a) => (
                  <span key={a}>{a}</span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
