import { siteMetadata } from "@/lib/site-metadata";
import type { Metadata } from "next";
import solutions from "@/../content/product/solutions.json";
import { FinalCTA, TextLink } from "@/components/site/Primitives";

const pageMetadata: Metadata = {
  title: "Solutions",
  description:
    "Self-hosted incident workflows for SRE, DevOps, platform, on-call and regulated operating models.",
  alternates: { canonical: "/solutions/" },
};
export const metadata = siteMetadata(pageMetadata);

export default function Solutions() {
  return (
    <div className="site-page">
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
        <div className="site-container solutions-grid">
          {solutions.map((solution, index) => (
            <article key={solution.slug}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h2>{solution.label}</h2>
              <p>{solution.problem}</p>
              <small>{solution.description}</small>
              <TextLink href={"/solutions/" + solution.slug + "/"}>
                Explore the workflow
              </TextLink>
            </article>
          ))}
        </div>
      </section>
      <FinalCTA />
    </div>
  );
}
