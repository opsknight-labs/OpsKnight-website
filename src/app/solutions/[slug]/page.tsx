import { BreadcrumbSchema } from "@/components/site/BreadcrumbSchema";
import { siteMetadata } from "@/lib/site-metadata";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import solutions from "@/../content/product/solutions.json";
import { PRODUCT, productDocs } from "@/lib/product";
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
  const solution = solutions.find((item) => item.slug === slug);
  return siteMetadata({
    title: solution?.label,
    description: solution?.description,
    alternates: { canonical: "/solutions/" + slug + "/" },
    openGraph: { url: "/solutions/" + slug + "/" },
  });
}

export default async function Solution({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const solution = solutions.find((item) => item.slug === slug);
  if (!solution) notFound();

  const products = solution.products
    .map((productSlug) =>
      PRODUCT.platform.products.find((product) => product.slug === productSlug),
    )
    .filter(Boolean);

  return (
    <div className="site-page">
      <BreadcrumbSchema name={solution.label} path={"/solutions/" + slug + "/"} />
      <section className="interior-hero site-dark">
        <div className="site-container">
          <p className="site-eyebrow">
            <span className="signal-dot" />
            {solution.label.toUpperCase()}
          </p>
          <h1>{solution.headline}</h1>
          <p className="site-description">{solution.description}</p>
          <div className="site-actions">
            <Action href="/deploy/">Deploy OpsKnight</Action>
            <Action href="/integrations/" secondary>
              Explore integrations
            </Action>
          </div>
        </div>
      </section>

      <section className="site-section">
        <div className="site-container solution-story">
          <article>
            <span>01</span>
            <p className="site-eyebrow">THE PROBLEM</p>
            <h2>{solution.problem}</h2>
          </article>
          <article>
            <span>02</span>
            <p className="site-eyebrow">A PRACTICAL START</p>
            <h2>{solution.workflow}</h2>
          </article>
        </div>
      </section>

      <section className="site-section site-white">
        <div className="site-container">
          <div className="section-intro">
            <p className="site-eyebrow">
              <span className="signal-dot" /> PRODUCT SURFACES
            </p>
            <h2>Assemble only what the workflow needs.</h2>
          </div>
          <div className="solution-product-grid">
            {products.map((product, index) =>
              product ? (
                <article key={product.slug}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h3>{product.label}</h3>
                  <p>{product.description}</p>
                  <div className="paired-links">
                    <TextLink href={"/product/" + product.slug + "/"}>
                      Explore product
                    </TextLink>
                    <TextLink href={productDocs(product.docs)}>Read guide</TextLink>
                  </div>
                </article>
              ) : null,
            )}
          </div>
        </div>
      </section>

      <section className="site-section site-light-alt">
        <div className="site-container">
          <div className="section-intro">
            <p className="site-eyebrow">
              <span className="signal-dot" /> IMPLEMENTATION CONTEXT
            </p>
            <h2>Turn the use case into an operating model.</h2>
            <p className="site-description">
              The product workflow is only useful when deployment, integrations,
              access controls and validation are planned together.
            </p>
          </div>
          <div className="solution-evaluation-grid">
            <article>
              <span>DEPLOYMENT</span>
              <h3>How to run it</h3>
              <p>{solution.deployment}</p>
            </article>
            <article>
              <span>INTEGRATIONS</span>
              <h3>What to connect first</h3>
              <p>{solution.integration}</p>
            </article>
            <article>
              <span>SECURITY & OPERATIONS</span>
              <h3>What to decide up front</h3>
              <p>{solution.security}</p>
            </article>
            <article>
              <span>VALIDATION</span>
              <h3>What to prove before production</h3>
              <p>{solution.validation}</p>
            </article>
          </div>
        </div>
      </section>

      <section className="site-section">
        <div className="site-container solution-next">
          <div>
            <p className="site-eyebrow">IMPLEMENTATION PATH</p>
            <h2>Validate the whole journey before production.</h2>
            <p className="site-description">
              Start with the deployment model, connect the required providers,
              configure identity and routing, then exercise a synthetic incident
              from signal to responder action and recovery.
            </p>
          </div>
          <div className="solution-next-links">
            <TextLink href={productDocs("operate/capacity/choose-deployment")}>
              Choose a deployment
            </TextLink>
            <TextLink href="/integrations/">Connect providers</TextLink>
            <TextLink href="/security/">Review security & identity</TextLink>
            <TextLink href={productDocs("operate/reliability/health-center")}>
              Validate Health Center
            </TextLink>
            <TextLink href="/support/">
              Discuss implementation & support
            </TextLink>
          </div>
        </div>
        {slug === "regulated-environments" && (
          <div className="site-container">
            <p className="site-boundary">
              Your deployment and controls determine your compliance posture.
              OpsKnight provides operational controls and evidence workflows; it
              does not claim external compliance certification.
            </p>
          </div>
        )}
      </section>
      <FinalCTA />
    </div>
  );
}
