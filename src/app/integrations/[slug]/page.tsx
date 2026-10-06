import { BreadcrumbSchema } from "@/components/site/BreadcrumbSchema";
import { siteMetadata } from "@/lib/site-metadata";
import Link from "next/link";
import Image from "next/image";
import { integrationLogos } from "@/lib/integration-logos";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PRODUCT, productDocs } from "@/lib/product";
import { Action, FinalCTA, TextLink } from "@/components/site/Primitives";
export function generateStaticParams() {
  return PRODUCT.integrations.map((p) => ({ slug: p.id }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = PRODUCT.integrations.find((p) => p.id === slug);
  return siteMetadata({
    title: `${p?.title} integration`,
    description: `Connect ${p?.title} to self-hosted OpsKnight incident operations. Explore the supported workflow and setup guide.`,
    alternates: { canonical: `/integrations/${slug}/` },
    openGraph: { url: `/integrations/${slug}/` },
  });
}
export default async function Integration({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = PRODUCT.integrations.find((p) => p.id === slug);
  if (!p) notFound();
  return (
    <div className="site-page">
      <BreadcrumbSchema name={p.title} path={`/integrations/${slug}/`} />
      <section className="interior-hero site-dark">
        <div className="site-container">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href="/integrations/">Integrations</Link>
            <span>/</span>
            <span>{p.title}</span>
          </nav>
          <p className="site-eyebrow">
            <span className="signal-dot" />
            {p.category.toUpperCase().replaceAll("-", " ")} /{" "}
            {p.direction.toUpperCase()}
          </p>
          <div className="integration-letter">
            <Image src={integrationLogos[p.id]} alt="" width={40} height={40} />
          </div>
          <h1>
            {p.title}.<br />
            Connected to the response.
          </h1>
          <p className="site-description">
            Bring {p.title} into your self-hosted incident workflow. Keep
            configuration and credentials on infrastructure you control.
          </p>
          <div className="site-actions">
            <Action href={productDocs(p.docs)}>View setup guide</Action>
            <Action href="/install/" secondary>
              Deploy OpsKnight
            </Action>
          </div>
        </div>
      </section>
      <section className="site-section">
        <div className="site-container">
          <div className="section-intro">
            <p className="site-eyebrow"><span className="signal-dot" /> RELEASE CONTRACT</p>
            <h2>What this connection actually accepts.</h2>
            <p className="site-description">
              Generated from the pinned v{PRODUCT.release.version} provider catalog rather than a generic marketing template.
            </p>
          </div>
          <div className="integration-contract-grid">
            <article><span>DIRECTION</span><h3>{p.direction.replaceAll("-", " ")}</h3><p>{p.kind === "inbound" ? "Alert source into OpsKnight." : "Workflow connection; see the setup guide for provider-specific interactions."}</p></article>
            <article><span>ENDPOINT</span><h3>{p.endpoint ? `${p.method ?? "POST"} ${p.endpoint}` : "Provider workflow"}</h3><p>{p.protocol ? `Protocol: ${p.protocol}` : "No inbound alert endpoint is claimed for this connection."}</p></article>
            <article><span>LIFECYCLE</span><h3>{p.actions.length ? p.actions.join(" · ") : "See setup guide"}</h3><p>Only actions present in the release catalog are shown.</p></article>
            <article><span>AUTHENTICATION</span><h3>{p.authentication.length ? p.authentication.join(", ") : "See setup guide"}</h3><p>Signature verification: {p.signature.replaceAll("-", " ")}.</p></article>
          </div>

          {p.endpoint ? (
            <div className="integration-contract-detail">
              <div>
                <h3>Request contract</h3>
                <dl>
                  <div><dt>Integration identifier</dt><dd>{p.integrationId ?? "See setup guide"}</dd></div>
                  <div><dt>Body limit</dt><dd>{p.bodyLimitBytes ? `${Math.round(p.bodyLimitBytes / 1048576)} MiB` : "Not specified"}</dd></div>
                  <div><dt>Rate limit</dt><dd>{p.rateLimit ? `${p.rateLimit.requests} requests / ${p.rateLimit.windowSeconds}s / integration` : "Not specified"}</dd></div>
                  <div><dt>Correlation</dt><dd>{p.correlation ?? "Provider-specific"}</dd></div>
                  <div><dt>Recovery</dt><dd>{p.recovery ?? "Provider-specific"}</dd></div>
                </dl>
              </div>
              <div>
                <h3>Accepted credential forms</h3>
                {p.acceptedCredentials.length ? (
                  <div className="integration-chip-row">
                    {p.acceptedCredentials.map((credential) => <strong key={credential}>{credential}</strong>)}
                  </div>
                ) : <p className="site-description">See the setup guide for the provider-specific authentication contract.</p>}
              </div>
            </div>
          ) : null}

          {p.errors.length ? (
            <div className="integration-errors-table">
              <div className="integration-errors-head"><h3>Common endpoint outcomes</h3><span>HTTP</span></div>
              {p.errors.map((error) => <div key={error.status}><code>{error.status}</code><p>{error.meaning}</p></div>)}
            </div>
          ) : null}

          {p.id === "webhook" ? (
            <div className="integration-code-example">
              <div>
                <p className="site-eyebrow">GENERIC WEBHOOK · VERIFIED DEFAULT FIELDS</p>
                <h3>A minimal payload using the source defaults.</h3>
                <p>The adapter reads <code>summary</code>, <code>severity</code>, <code>dedup_key</code>, <code>source</code> and <code>status</code> by default.</p>
              </div>
              <pre>{`{
  "summary": "Database connection pool exhausted",
  "severity": "critical",
  "dedup_key": "db-pool-prod",
  "source": "payments-api",
  "status": "triggered"
}`}</pre>
            </div>
          ) : null}

          <div className="integration-contract-footer">
            <p>Provider acceptance, incident correlation, and downstream notification delivery are separate outcomes. Test a non-production trigger/recovery pair before relying on the path.</p>
            <TextLink href={productDocs(p.docs)}>Read the {p.title} documentation</TextLink>
          </div>
        </div>
      </section>
      <FinalCTA />
    </div>
  );
}
