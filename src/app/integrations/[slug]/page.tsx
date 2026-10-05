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
        <div className="site-container interior-copy">
          <h2>The release contract.</h2>
          <p>
            Direction: {p.direction}.{" "}
            {p.actions.length
              ? `Accepted actions: ${p.actions.join(", ")}.`
              : "Supported interactions are described in the setup guide."}
          </p>
          <p>
            Authentication:{" "}
            {p.authentication.length
              ? p.authentication.join(", ")
              : "See provider setup guide"}
            . Signature verification: {p.signature.replaceAll("-", " ")}.
          </p>
          <p>
            Follow the documentation for provider payloads, authorization,
            configuration and troubleshooting. Provider acceptance and final
            notification delivery are separate outcomes.
          </p>
          <TextLink href={productDocs(p.docs)}>
            Read the {p.title} documentation
          </TextLink>
        </div>
      </section>
      <FinalCTA />
    </div>
  );
}
