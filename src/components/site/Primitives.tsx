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
      <picture>
        <source
          type="image/webp"
          srcSet={[
            ...[400, 800, 1200]
              .filter((width) => width < evidence.width)
              .map(
                (width) =>
                  `${productImage(name).replace(/\.webp$/, `-${width}.webp`)} ${width}w`,
              ),
            `${productImage(name)} ${evidence.width}w`,
          ].join(", ")}
          sizes={
            name === "mobile.png" ? "390px" : "(max-width: 768px) 100vw, 1200px"
          }
        />
        <Image
          src={productImage(name)}
          width={evidence.width}
          height={evidence.height}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          style={{ aspectRatio: `${evidence.width} / ${evidence.height}` }}
          sizes="(max-width: 768px) 100vw, 1200px"
        />
      </picture>
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
          <Action href="/install/">Install OpsKnight</Action>
          <Action href={BRAND.links.github} secondary>
            View source
          </Action>
        </div>
        <p className="site-proof">{productProof}</p>
      </div>
    </section>
  );
}
