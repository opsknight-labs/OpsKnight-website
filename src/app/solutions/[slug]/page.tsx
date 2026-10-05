import { BreadcrumbSchema } from "@/components/site/BreadcrumbSchema";
import { siteMetadata } from "@/lib/site-metadata";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import solutions from "@/../content/product/solutions.json";
import { PRODUCT } from "@/lib/product";
import { Action, FinalCTA, TextLink } from "@/components/site/Primitives";
export function generateStaticParams() {
  return solutions.map((s) => ({ slug: s.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const s = solutions.find((s) => s.slug === slug);
  return siteMetadata({
    title: s?.label,
    description: s?.description,
    alternates: { canonical: `/solutions/${slug}/` },
    openGraph: { url: `/solutions/${slug}/` },
  });
}
export default async function Solution({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const s = solutions.find((s) => s.slug === slug);
  if (!s) notFound();
  return (
    <div className="site-page">
      <BreadcrumbSchema name={s.label} path={`/solutions/${slug}/`} />
      <section className="interior-hero site-dark">
        <div className="site-container">
          <p className="site-eyebrow">
            <span className="signal-dot" />
            {s.label.toUpperCase()}
          </p>
          <h1>{s.headline}</h1>
          <p className="site-description">{s.description}</p>
          <div className="site-actions">
            <Action href="/install/">Deploy OpsKnight</Action>
          </div>
        </div>
      </section>
      <section className="site-section">
        <div className="site-container interior-copy">
          <h2>The operational problem.</h2>
          <p>{s.problem}</p>
          <h2>A practical starting point.</h2>
          <p>{s.workflow}</p>
          <div className="paired-links">
            {s.products.map((slug) => (
              <TextLink key={slug} href={`/product/${slug}/`}>
                {PRODUCT.platform.products.find((p) => p.slug === slug)?.label}
              </TextLink>
            ))}
          </div>
          {slug === "regulated-environments" && (
            <p className="site-boundary">
              Your deployment and controls determine your compliance posture.
              OpsKnight does not claim external compliance certification.
            </p>
          )}
        </div>
      </section>
      <FinalCTA />
    </div>
  );
}
