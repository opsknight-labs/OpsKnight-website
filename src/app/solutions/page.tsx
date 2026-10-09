import { siteMetadata } from "@/lib/site-metadata";
import type { Metadata } from "next";
import solutions from "@/../content/product/solutions.json";
import { PRODUCT } from "@/lib/product";
import { FinalCTA, TextLink } from "@/components/site/Primitives";

const pageMetadata: Metadata = {
  title: "Solutions",
  description:
    "Self-hosted incident workflows for SRE, DevOps, platform, on-call and regulated operating models.",
  alternates: { canonical: "/solutions/" },
};
export const metadata = siteMetadata(pageMetadata);

export default function Solutions() {
  const productName = (slug: string) =>
    PRODUCT.platform.products.find((product) => product.slug === slug)?.label ?? slug;

  return (
    <div className="site-page site-page--solutions site-page--solutions-index">
      <section className="interior-hero site-dark">
        <div className="site-container">
          <p className="site-eyebrow">
            <span className="signal-dot" /> SOLUTIONS
          </p>
          <h1>
            Start from the
            <br />
            operating problem.
          </h1>
          <p className="site-description">
            OpsKnight is one platform, but teams approach it from different
            problems: ownership, on-call, reliability, platform control or
            regulated infrastructure.
          </p>
        </div>
      </section>

      <section className="site-section">
        <div className="site-container">
          <div className="section-intro">
            <p className="site-eyebrow">
              <span className="signal-dot" /> CHOOSE YOUR STARTING POINT
            </p>
            <h2>Different teams. One operational foundation.</h2>
            <p className="site-description">
              Each path connects a real operating problem to the product
              surfaces, deployment choices, integrations, security decisions and
              validation steps required to run it well.
            </p>
          </div>

          <div className="solutions-grid solutions-discovery-grid">
            {solutions.map((solution, index) => (
              <article key={solution.slug}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h2>{solution.label}</h2>
                <p>{solution.problem}</p>
                <small>{solution.description}</small>
                <div className="solution-product-tags" aria-label={solution.label + " product areas"}>
                  {solution.products.map((slug) => (
                    <span key={slug}>{productName(slug)}</span>
                  ))}
                </div>
                <TextLink href={"/solutions/" + solution.slug + "/"}>
                  Explore the workflow
                </TextLink>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="site-section site-light-alt">
        <div className="site-container">
          <div className="section-intro">
            <p className="site-eyebrow">
              <span className="signal-dot" /> EVALUATION PATH
            </p>
            <h2>Turn the use case into a deployment decision.</h2>
          </div>
          <div className="solution-entry-grid">
            <article>
              <span>01 / DEPLOY</span>
              <h3>Choose the operating model.</h3>
              <p>Start simple, then move to split runtime or Kubernetes only when availability or scaling requires it.</p>
              <TextLink href="/deploy/">Compare deployment paths</TextLink>
            </article>
            <article>
              <span>02 / CONNECT</span>
              <h3>Connect the systems you already use.</h3>
              <p>Begin with the alert source that defines service health, then add collaboration and issue tracking deliberately.</p>
              <TextLink href="/integrations/">Explore integrations</TextLink>
            </article>
            <article>
              <span>03 / CONTROL</span>
              <h3>Define identity and responsibility.</h3>
              <p>Plan OIDC, SCIM, roles, secrets, network boundaries, backups and recovery before production exposure.</p>
              <TextLink href="/security/">Review security</TextLink>
            </article>
            <article>
              <span>04 / PROVE</span>
              <h3>Run the whole journey.</h3>
              <p>Validate a synthetic incident from signal to responder action, public communication, recovery and follow-up.</p>
              <TextLink href="/support/">Implementation & support</TextLink>
            </article>
          </div>
        </div>
      </section>

      <FinalCTA />
    </div>
  );
}
