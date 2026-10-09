import type { CSSProperties } from "react";
import { Check, Github, Heart } from "lucide-react";
import { Action } from "@/components/site/Primitives";
import { BRAND } from "@/lib/brand";

const STOPS = ["Signal", "Triage", "Page", "Acknowledge", "Mitigate", "Resolve", "Review"];

export function HomeHero({ version, license }: { version: string; license: string }) {
  return (
    <section id="signal" className="site-hero site-hero--center site-dark" aria-labelledby="home-hero-title">
      <nav className="hc-strip" aria-label="Project">
        <div className="site-container hc-strip-inner">
          <a href="/changelog/" className="hc-strip-release">
            <span className="hc-pill-dot" aria-hidden="true" />
            v{version} is out
            <span className="hc-pill-muted">What&apos;s new →</span>
          </a>
          <div className="hc-strip-links">
            <a href={BRAND.links.github} target="_blank" rel="noopener noreferrer">
              <Github size={14} aria-hidden="true" />
              Star on GitHub
            </a>
            <a href={BRAND.links.sponsor} target="_blank" rel="noopener noreferrer" className="hc-pill-sponsor">
              <Heart size={14} aria-hidden="true" />
              Sponsor
            </a>
          </div>
        </div>
      </nav>
      <div className="site-container">
        <div className="hero-editorial-masthead hc-masthead">
          <h1 id="home-hero-title" className="hc-title">
            Own the incident<em>.</em>
          </h1>
          <p className="hc-sub">From first signal to final review.</p>
          <p className="hc-lede">
            Know what happened, who is responding, and what comes next.
            One open-source platform you host and control.
          </p>
          <div className="site-actions hc-actions">
            <Action href="/deploy/">Install OpsKnight</Action>
            <Action href="#incident-loop" secondary>
              See how it works
            </Action>
            <a className="hc-status" href={BRAND.links.status} target="_blank" rel="noopener noreferrer">
              <span className="hc-status-dot" aria-hidden="true" />
              Live status page
            </a>
          </div>
          <ul className="hc-checks">
            <li><Check size={15} aria-hidden="true" /> Self-hosted</li>
            <li><Check size={15} aria-hidden="true" /> {license} open source</li>
            <li><Check size={15} aria-hidden="true" /> Docker or Kubernetes</li>
          </ul>
        </div>
      </div>

      {/* A signal crosses the full width, lighting each step of the response as it passes. */}
      <div className="hc-line" aria-hidden="true">
        <span className="hc-line-pulse" />
        <ol>
          {STOPS.map((stop, i) => (
            <li key={stop} style={{ "--p": (i + 0.5) / STOPS.length } as CSSProperties}>
              <i />
              <span>{stop}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
