import { siteMetadata } from "@/lib/site-metadata";
import type { Metadata } from "next";
import solutions from "@/../content/product/solutions.json";
import { FinalCTA, TextLink } from "@/components/site/Primitives";
const pageMetadata: Metadata = {
  title: "Solutions",
  description:
    "Self-hosted incident workflows for SRE, DevOps, platform and regulated environments.",
  alternates: { canonical: "/use-cases/" },
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
            Built around
            <br />
            the way you operate.
          </h1>
        </div>
      </section>
      <section className="site-section">
        <div className="site-container security-sections">
          {solutions.map((s) => (
            <article key={s.slug}>
              <h2>{s.label}</h2>
              <p>{s.description}</p>
              <TextLink href={`/solutions/${s.slug}/`}>
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
