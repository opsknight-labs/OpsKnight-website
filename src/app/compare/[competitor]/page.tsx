import { BreadcrumbSchema } from "@/components/site/BreadcrumbSchema";
import { siteMetadata } from "@/lib/site-metadata";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import comparisons from "@/../content/product/comparisons.json";
import { PRODUCT } from "@/lib/product";
import { Action, FinalCTA, TextLink } from "@/components/site/Primitives";
const aliases: Record<string, string> = {
  incidentio: "incident-io",
  "grafana-oncall": "grafana",
  victorops: "splunk",
};
const find = (s: string) =>
  comparisons.find((c) => c.slug === (aliases[s] ?? s));
export function generateStaticParams() {
  return [
    ...comparisons.map((c) => ({ competitor: c.slug })),
    ...Object.keys(aliases).map((competitor) => ({ competitor })),
  ];
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ competitor: string }>;
}): Promise<Metadata> {
  const { competitor } = await params;
  const c = find(competitor);
  return siteMetadata({
    title: `OpsKnight and ${c?.name}`,
    description: `Compare operational choices for OpsKnight and ${c?.name}, with dated vendor sources.`,
    alternates: { canonical: `/compare/${c?.slug ?? competitor}/` },
    openGraph: { url: `/compare/${c?.slug ?? competitor}/` },
  });
}
export default async function Compare({
  params,
}: {
  params: Promise<{ competitor: string }>;
}) {
  const { competitor } = await params;
  const c = find(competitor);
  if (!c) notFound();
  return (
    <div className="site-page">
      <BreadcrumbSchema name={c.name} path={`/compare/${c.slug}/`} />
      <section className="interior-hero site-dark">
        <div className="site-container">
          <p className="site-eyebrow">
            <span className="signal-dot" /> COMPARE / VERIFIED {c.asOf}
          </p>
          <h1>
            OpsKnight and
            <br />
            {c.name}.
          </h1>
          <p className="site-description">{c.focus}</p>
          <div className="site-actions">
            <Action href="/install/">Evaluate OpsKnight</Action>
          </div>
        </div>
      </section>
      <section className="site-section">
        <div className="site-container interior-copy">
          <h2>Vendor context.</h2>
          <p>{c.summary}</p>
          <TextLink href={c.source}>{c.sourceLabel}</TextLink>
          <h2 className="mt-12">The OpsKnight operating model.</h2>
          <p>
            OpsKnight {PRODUCT.release.tag} is self-hosted under{" "}
            {PRODUCT.release.license}. You operate the deployment, database,
            upgrades, backups and notification provider configuration.
            Infrastructure and provider costs remain part of that choice.
          </p>
          <h2>Compare the actual workflow.</h2>
          <p>
            Validate schedule coverage, escalation targets, provider delivery,
            ChatOps permissions, customer updates and review workflows against
            your requirements. Plan scope and pricing are separate from whether
            a capability exists.
          </p>
          <p className="site-boundary">
            OpsKnight supports {PRODUCT.boundaries.statusPageLimit} status page
            per installation. Mobile is a {PRODUCT.boundaries.mobileType}.{" "}
            {PRODUCT.boundaries.manualEscalation}
          </p>
          <div className="paired-links">
            <TextLink href="/product/on-call/">On-call</TextLink>
            <TextLink href="/product/chatops/">ChatOps</TextLink>
            <TextLink href="/deploy/">Deployment</TextLink>
          </div>
        </div>
      </section>
      <FinalCTA />
    </div>
  );
}
