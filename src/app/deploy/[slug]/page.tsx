import { BreadcrumbSchema } from "@/components/site/BreadcrumbSchema";
import { siteMetadata } from "@/lib/site-metadata";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PRODUCT, productDocs } from "@/lib/product";
import { ArchitectureViewer } from "@/components/site/Experiences";
import { Action, FinalCTA } from "@/components/site/Primitives";
export function generateStaticParams() {
  return [
    ...PRODUCT.deployments.models.map((m) => ({ slug: m.id })),
    { slug: "architecture" },
  ];
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  return siteMetadata({
    title: `Deployment: ${slug}`,
    description:
      "Explore supported OpsKnight runtime topologies and deployment guides.",
    alternates: { canonical: `/deploy/${slug}/` },
    openGraph: { url: `/deploy/${slug}/` },
  });
}
export default async function Deployment({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const m = PRODUCT.deployments.models.find((m) => m.id === slug);
  if (!m && slug !== "architecture") notFound();
  return (
    <div className="site-page">
      <BreadcrumbSchema
        name={m?.title ?? "Architecture"}
        path={`/deploy/${slug}/`}
      />
      <section className="interior-hero site-dark">
        <div className="site-container">
          <p className="site-eyebrow">
            <span className="signal-dot" /> DEPLOYMENT
          </p>
          <h1>
            {m
              ? `${m.title}. On your terms.`
              : "A runtime that fits your operations."}
          </h1>
          <p className="site-description">
            {m?.description ??
              "Start integrated. Separate runtime roles when independent scaling and operational isolation matter."}
          </p>
          <div className="site-actions">
            <Action
              href={productDocs(m?.docs ?? "operate/deploy/architecture")}
            >
              Read the deployment guide
            </Action>
          </div>
        </div>
      </section>
      <section className="site-section site-dark">
        <div className="site-container">
          <ArchitectureViewer />
        </div>
      </section>
      <FinalCTA />
    </div>
  );
}
