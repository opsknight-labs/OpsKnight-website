import { BreadcrumbSchema } from "@/components/site/BreadcrumbSchema";
import { siteMetadata } from "@/lib/site-metadata";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PRODUCT, productDocs } from "@/lib/product";
import { BRAND } from "@/lib/brand";
import {
  Action,
  ProductScreenshot,
  FinalCTA,
  SectionIntro,
  TextLink,
} from "@/components/site/Primitives";
import { ProductWorkflow } from "@/components/site/ProductWorkflow";
import { ArchitectureViewer } from "@/components/site/Experiences";
export function generateStaticParams() {
  return PRODUCT.platform.products.map((p) => ({ slug: p.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = PRODUCT.platform.products.find((p) => p.slug === slug);
  return siteMetadata({
    title: p?.label,
    description: p?.description,
    alternates: { canonical: `/product/${slug}/` },
    openGraph: {
      url: `/product/${slug}/`,
      images: [
        { url: `/social/product-${slug}.png`, width: 1200, height: 630 },
      ],
    },
    twitter: {
      card: "summary_large_image",
      images: [`/social/product-${slug}.png`],
    },
  });
}
export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = PRODUCT.platform.products.find((p) => p.slug === slug);
  if (!p) notFound();
  let boundary = "";
  if (slug === "status-pages")
    boundary = `${PRODUCT.boundaries.statusPageLimit} status page per OpsKnight ${PRODUCT.release.version} installation.`;
  if (slug === "on-call" || slug === "chatops")
    boundary = PRODUCT.boundaries.manualEscalation;
  if (slug === "paging") boundary = PRODUCT.notifications.voiceScope;
  if (slug === "mobile")
    boundary =
      "Mobile is an installable progressive web app (PWA). Device and browser notification behavior is documented in the mobile guides.";
  return (
    <div className="site-page">
      <BreadcrumbSchema name={p.label} path={`/product/${slug}/`} />
      <section className="interior-hero site-dark">
        <div className="site-container">
          <nav aria-label="Breadcrumb" className="breadcrumb">
            <Link href="/">OpsKnight</Link>
            <span>/</span>
            <span>Product</span>
            <span>/</span>
            <span>{p.label}</span>
          </nav>
          <p className="site-eyebrow">
            <span className="signal-dot" />
            {p.label.toUpperCase()}
          </p>
          <h1>{p.headline}</h1>
          <p className="site-description">{p.description}</p>
          <div className="site-actions">
            <Action href="/deploy/">Install OpsKnight</Action>
            <Action href={productDocs(p.docs)} secondary>
              Read the documentation
            </Action>
          </div>
        </div>
      </section>
      <section className="site-section">
        <div className="site-container">
          {p.screenshot ? (
            <ProductScreenshot
              name={p.screenshot}
              alt={`OpsKnight ${p.label.toLowerCase()} product view`}
              priority
            />
          ) : slug === "mobile" ? (
            <div className="interior-copy">
              <h2>Install. Enable notifications. Respond.</h2>
              <p>
                Use your installation’s mobile routes, register your device for
                Web Push and keep incident context accessible from your phone.
              </p>
              <TextLink
                href={productDocs("guides/mobile/install-and-notifications")}
              >
                Install and configure notifications
              </TextLink>
            </div>
          ) : null}
          <div className="feature-list">
            {p.features.map((f, i) => (
              <div key={f}>
                <span>{String(i + 1).padStart(2, "0")}</span>
                <h3>{f}</h3>
              </div>
            ))}
          </div>
          {slug === "status-pages" && (
            <div className="status-live-banner">
              <span>
                <span className="live-dot" /> Live product proof
              </span>
              <p>
                Open the public OpsKnight status page to verify the customer-facing
                status experience separately from this synthetic product view.
              </p>
              <a
                href={BRAND.links.status}
                target="_blank"
                rel="noopener noreferrer"
                className="site-action secondary"
              >
                View live status ↗
              </a>
            </div>
          )}
          {boundary && <p className="site-boundary">{boundary}</p>}
        </div>
      </section>
      <section className="site-section site-dark product-workflow-section">
        <div className="site-container">
          <ProductWorkflow slug={slug} />
        </div>
      </section>
      {p.story.map((chapter, index) => (
        <section
          className={`site-section product-chapter ${index % 2 ? "site-light-alt" : "site-white"}`}
          key={chapter.title}
        >
          <div className="site-container product-chapter-grid">
            <div className="chapter-marker">
              <span className="signal-dot" />
              {String(index + 1).padStart(2, "0")} / {p.label.toUpperCase()}
            </div>
            <div className="interior-copy">
              <h2>{chapter.title}</h2>
              <p>{chapter.body}</p>
              <TextLink href={productDocs(chapter.docs)}>
                Explore the workflow
              </TextLink>
            </div>
          </div>
        </section>
      ))}
      {slug === "operations" && (
        <section className="site-section site-dark">
          <div className="site-container">
            <SectionIntro
              eyebrow="RUNTIME OPTIONS"
              title="Choose how the pieces run."
            />
            <ArchitectureViewer />
          </div>
        </section>
      )}
      <section className="site-section site-white">
        <div className="site-container interior-copy">
          <p className="site-eyebrow">FROM CAPABILITY TO OPERATIONS</p>
          <h2>Put it to work in your environment.</h2>
          <p>
            The documentation covers setup, authorization, supported workflows
            and operational limits for {p.label.toLowerCase()}. Start with the
            guide and validate the behavior on a test service.
          </p>
          <TextLink href={productDocs(p.docs)}>
            Explore {p.label.toLowerCase()} documentation
          </TextLink>
        </div>
      </section>
      <FinalCTA />
    </div>
  );
}
