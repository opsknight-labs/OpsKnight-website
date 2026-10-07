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
import { IncidentLifecycleSwitcher } from "@/components/site/IncidentLifecycleSwitcher";
import Image from "next/image";
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

  const productionChecks: Record<string, string[]> = {
    incidents: [
      "Verify service ownership and responder permissions on a test service.",
      "Confirm response-policy and support-hours context before interpreting SLA timing.",
      "Exercise acknowledgement, assignment, resolution and postmortem handoff end to end.",
    ],
    "on-call": [
      "Verify the effective responder across the intended timezone and a DST boundary.",
      "Test an override plus an empty-schedule condition before relying on the rotation.",
      "Run a synthetic incident through escalation and inspect delivery evidence.",
    ],
    paging: [
      "Validate every required provider credential and responder endpoint.",
      "Test admission, retry or rate-limit handling, and a permanent-failure path.",
      "Monitor critical queue age and provider callbacks separately from provider acceptance.",
    ],
    chatops: [
      "Verify linked identities and OpsKnight permissions for each collaboration provider.",
      "Test room provisioning, reconciliation, and stale-card behavior on a non-production incident.",
      "Confirm supported actions by lifecycle phase instead of assuming Slack and Teams parity.",
    ],
    "status-pages": [
      "Verify approved public fields while signed out through the audience hostname.",
      "Test subscriber or webhook delivery separately from successful page rendering.",
      "Confirm the one-page-per-install boundary and validate DNS/TLS when using a custom domain.",
    ],
    analytics: [
      "Record the selected time window and service scope with every shared metric.",
      "Verify the MTTA or MTTR population before drawing conclusions from the number.",
      "Open the source incidents or postmortems before turning a pattern into a root-cause claim.",
    ],
    postmortems: [
      "Preserve incident evidence links and distinguish observed facts from hypotheses.",
      "Give every follow-up action a clear owner and due date.",
      "Verify remediation is complete rather than treating publication as the finish line.",
    ],
    mobile: [
      "Test the actual browser and installed PWA responders are expected to use.",
      "Verify browser permission, device registration, and product authorization separately.",
      "Send a test Web Push on the physical device before relying on it for response.",
    ],
    security: [
      "Pilot allowed, denied, deactivated, and existing-account identity cases.",
      "Verify effective RBAC, session revocation, and audit evidence after provisioning.",
      "Preserve required encryption keys outside database backups and test recovery.",
    ],
    operations: [
      "Budget PostgreSQL connections before adding worker or web replicas.",
      "Test backup, restore, and the documented upgrade path before production changes.",
      "Run a synthetic incident after topology or recovery changes before declaring the platform healthy.",
    ],
  };
  const checks = productionChecks[slug] ?? [];
  const primaryStory = p.story[0];
  const operationalStories = p.story.slice(1);

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
      <section className="site-section product-value-section">
        <div className="site-container product-value-grid">
          <div className="product-value-copy">
            <p className="site-eyebrow">
              <span className="signal-dot" /> WHAT IT SOLVES
            </p>
            <h2>{primaryStory?.title ?? p.headline}</h2>
            <p>{primaryStory?.body ?? p.description}</p>
            {primaryStory ? (
              <TextLink href={productDocs(primaryStory.docs)}>
                Understand the capability
              </TextLink>
            ) : null}
            <div className="product-outcome-list">
              {p.features.map((feature, index) => (
                <div key={feature}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{feature}</strong>
                </div>
              ))}
            </div>
          </div>
          <div className="product-value-proof">
            {slug === "incidents" ? (
              <IncidentLifecycleSwitcher />
            ) : slug === "mobile" ? (
              <figure className="product-shot">
                <div className="shot-label">
                  <span className="signal-dot" /> OPSKNIGHT MOBILE PWA{" "}
                  <span>iOS &amp; Android · Light &amp; Dark · Push Paging</span>
                </div>
                <Image
                  src="/product/mobile.webp"
                  width={2400}
                  height={1350}
                  alt="OpsKnight mobile PWA on iPhone: responder home and incident triage in light mode, push notifications on the lock screen, incident response and on-call in dark mode"
                  priority
                  sizes="(max-width: 768px) 100vw, 1200px"
                />
                <figcaption>
                  OpsKnight mobile PWA: responder home, triage, push notifications, incident response and on-call.
                </figcaption>
              </figure>
            ) : slug === "status-pages" ? (
              <figure className="product-shot">
                <div className="shot-label">
                  <span className="signal-dot" /> PUBLIC STATUS PAGE{" "}
                  <span>Real-time uptime, components, history and maintenance</span>
                </div>
                <Image
                  src="/product/status-page.webp"
                  width={1920}
                  height={1080}
                  alt="OpsKnight public status page displaying real-time system status, operational services, uptime history, and active incident announcements"
                  priority
                  sizes="(max-width: 768px) 100vw, 1200px"
                />
                <figcaption>
                  OpsKnight public status page displaying real-time system status, operational services, uptime history, and active incident announcements.
                </figcaption>
              </figure>
            ) : p.screenshot ? (
              <ProductScreenshot
                name={p.screenshot}
                alt={`OpsKnight ${p.label.toLowerCase()} product view`}
                priority
              />
            ) : (
              <div className="product-no-shot">
                <span className="site-eyebrow">PRODUCT WORKFLOW</span>
                <strong>{p.label}</strong>
                <p>{p.description}</p>
              </div>
            )}
          </div>
        </div>
        {slug === "status-pages" && (
          <div className="site-container">
            <div className="status-live-banner">
              <span>
                <span className="live-dot" /> Live product proof
              </span>
              <p>
                Open the public OpsKnight status page to verify the customer-facing
                experience separately from this synthetic product view.
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
          </div>
        )}
      </section>

      <section className="site-section site-dark product-workflow-section">
        <div className="site-container">
          <div className="product-layer-heading">
            <p className="site-eyebrow">HOW IT WORKS</p>
            <h2>A concrete operational path, not a feature list.</h2>
          </div>
          <ProductWorkflow slug={slug} />
        </div>
      </section>

      <section className="site-section product-depth-section">
        <div className="site-container">
          <SectionIntro
            eyebrow="OPERATIONAL DEPTH"
            title={`${p.label}, beyond the happy path.`}
          >
            The details below are the parts teams need when evaluating how the
            capability behaves during real response, failure, and handoff.
          </SectionIntro>
          <div className="product-depth-grid">
            {operationalStories.map((chapter, index) => (
              <article key={chapter.title} className="product-depth-card">
                <span className="product-depth-index">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3>{chapter.title}</h3>
                <p>{chapter.body}</p>
                <TextLink href={productDocs(chapter.docs)}>
                  Read the operational guide
                </TextLink>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="site-section site-light-alt product-readiness-section">
        <div className="site-container product-readiness-grid">
          <div>
            <p className="site-eyebrow">
              <span className="signal-dot" /> KNOW BEFORE PRODUCTION
            </p>
            <h2>Validate the boundary, not just the happy path.</h2>
            <p className="site-description">
              Use a test service and representative provider configuration before
              treating {p.label.toLowerCase()} as production incident infrastructure.
            </p>
            {boundary && <p className="site-boundary">{boundary}</p>}
          </div>
          <ol className="product-readiness-list">
            {checks.map((check, index) => (
              <li key={check}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{check}</strong>
              </li>
            ))}
          </ol>
        </div>
      </section>

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
      <section className="product-docs-band site-white">
        <div className="site-container product-docs-band-inner">
          <div>
            <span>DOCUMENTATION</span>
            <strong>Setup, authorization, limits, and troubleshooting.</strong>
          </div>
          <TextLink href={productDocs(p.docs)}>
            Explore {p.label.toLowerCase()} documentation
          </TextLink>
        </div>
      </section>
      <FinalCTA />
    </div>
  );
}
