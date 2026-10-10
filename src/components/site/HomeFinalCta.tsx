import { ArrowUpRight, Github, Heart } from "lucide-react";
import { Action } from "@/components/site/Primitives";
import { BRAND } from "@/lib/brand";

export function HomeFinalCta() {
  return (
    <section className="site-dark home-cta" aria-labelledby="home-cta-title">
      <div className="site-container home-cta-inner">
        <span className="home-cta-line" aria-hidden="true">
          <i /><i /><i />
        </span>
        <h2 id="home-cta-title">Your next incident is yours to own.</h2>
        <p>Install OpsKnight on infrastructure you control, and run the whole response from one place.</p>
        <div className="site-actions home-cta-actions">
          <Action href="/deploy/">Install OpsKnight</Action>
          <a className="home-cta-ghost" href={BRAND.links.github} target="_blank" rel="noopener noreferrer">
            <Github size={16} aria-hidden="true" /> Star on GitHub
          </a>
          <a className="home-cta-ghost" href={BRAND.links.sponsor} target="_blank" rel="noopener noreferrer">
            <Heart size={16} aria-hidden="true" /> Sponsor
          </a>
        </div>
        <a className="home-cta-status" href={BRAND.links.status} target="_blank" rel="noopener noreferrer">
          <span aria-hidden="true" /> Live status page <ArrowUpRight size={13} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
