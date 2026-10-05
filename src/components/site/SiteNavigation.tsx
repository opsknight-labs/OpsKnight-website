"use client";
import Link from "next/link";
import Image from "next/image";
import { Github, Search, ArrowUpRight } from "lucide-react";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { PRODUCT } from "@/lib/product";
import { IncidentSignal } from "./IncidentSignal";
import { BRAND } from "@/lib/brand";
const solutions = [
  ["Self-hosted operations", "self-hosted-incident-management"],
  ["SRE teams", "sre"],
  ["Platform engineering", "platform-engineering"],
  ["Regulated environments", "regulated-environments"],
];
export function SiteNavigation() {
  const path = usePathname();
  const header = useRef<HTMLElement>(null);
  useEffect(() => {
    function closeMenus(event: Event) {
      if (event.type === "keydown" && (event as KeyboardEvent).key !== "Escape")
        return;
      if (
        event.type === "pointerdown" &&
        header.current?.contains(event.target as Node)
      )
        return;
      header.current
        ?.querySelectorAll<HTMLDetailsElement>("details[open]")
        .forEach((menu) => {
          menu.open = false;
          if (event.type === "keydown")
            menu.querySelector<HTMLElement>("summary")?.focus();
        });
    }
    document.addEventListener("keydown", closeMenus);
    document.addEventListener("pointerdown", closeMenus);
    return () => {
      document.removeEventListener("keydown", closeMenus);
      document.removeEventListener("pointerdown", closeMenus);
    };
  }, []);
  return (
    <>
    <IncidentSignal />
    <header className="site-nav" ref={header}>
      <a className="site-skip" href="#main-content">
        Skip to content
      </a>
      <div className="site-container nav-inner">
        <Link className="site-wordmark" href="/" aria-label="OpsKnight home">
          <Image
            src="/brand/opsknight-mark.webp"
            width={32}
            height={32}
            alt=""
          />
          OpsKnight
        </Link>
        <nav aria-label="Main navigation" className="desktop-nav">
          <details name="site-navigation" key={`product-${path}`}>
            <summary>
              Product <span>⌄</span>
            </summary>
            <div className="site-mega">
              <div>
                <p className="site-eyebrow">THE INCIDENT LIFECYCLE</p>
                <h3>
                  From signal
                  <br />
                  to resolution.
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "12px" }}>
                  <Link href="/product/">Overview of all capabilities →</Link>
                  <Link href="/#incident-loop">Explore the workflow →</Link>
                </div>
              </div>
              <div className="mega-links">
                {PRODUCT.platform.products.map((p) => (
                  <Link key={p.slug} href={`/product/${p.slug}/`}>
                    {p.label}
                    <ArrowUpRight size={14} />
                  </Link>
                ))}
              </div>
            </div>
          </details>
          <details name="site-navigation" key={`solutions-${path}`}>
            <summary>
              Solutions <span>⌄</span>
            </summary>
            <div className="site-small-menu">
              {solutions.map(([name, slug]) => (
                <Link key={slug} href={`/solutions/${slug}/`}>
                  {name}
                </Link>
              ))}
            </div>
          </details>
          <Link href="/integrations/">Integrations</Link>
          <Link href={BRAND.links.docs}>Docs</Link>
          <Link href="/security/">Security</Link>
          <Link href="/support/">Support & Services</Link>
          <details name="site-navigation" key={`community-${path}`}>
            <summary>
              Community <span>⌄</span>
            </summary>
            <div className="site-small-menu">
              <Link href="/community/">Community hub</Link>
              <Link href="/contact/">Contact</Link>
              <Link href={BRAND.links.github}>GitHub</Link>
              <Link href={BRAND.links.discussions}>Discussions</Link>
              <Link href={BRAND.links.contributing}>Contributing</Link>
              <Link href="/changelog/">What’s new</Link>
              <Link href="/about/">About</Link>
            </div>
          </details>
        </nav>
        <div className="nav-actions">
          <button
            aria-label="Search website"
            onClick={() =>
              window.dispatchEvent(new Event("open-global-search"))
            }
          >
            <Search size={18} />
          </button>
          <Link
            className="nav-github"
            href={BRAND.links.github}
            aria-label="GitHub"
          >
            <Github size={19} />
          </Link>
          <Link className="nav-install" href="/install/">
            Install <ArrowUpRight size={14} />
          </Link>
          <details className="mobile-nav" key={path}>
            <summary aria-label="Open navigation">☰</summary>
            <nav aria-label="Mobile navigation">
              <Link href="/">Home</Link>
              <Link href="/product/">Product Overview</Link>
              {PRODUCT.platform.products.map((p) => (
                <Link key={p.slug} href={`/product/${p.slug}/`}>
                  {p.label}
                </Link>
              ))}
              <Link href="/integrations/">Integrations</Link>
              <Link href="/deploy/">Deploy</Link>
              <Link href="/security/">Security</Link>
              <Link href={BRAND.links.docs}>Docs</Link>
              <Link href="/support/">Support & Services</Link>
              <Link href="/community/">Community</Link>
              <Link href="/contact/">Contact</Link>
              <Link href="/about/">About</Link>
            </nav>
          </details>
        </div>
      </div>
    </header>
    </>
  );
}
export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-container">
        <div className="footer-top">
          <div>
            <Link className="site-wordmark" href="/">
              OpsKnight
              <span className="signal-dot" />
            </Link>
            <p>Incident operations you control.</p>
          </div>
          <div className="footer-links">
            <div>
              <span>PLATFORM</span>
              <Link href="/product/incidents/">Product</Link>
              <Link href="/integrations/">Integrations</Link>
              <Link href="/security/">Security</Link>
              <Link href="/deploy/">Deployment</Link>
            </div>
            <div>
              <span>RESOURCES</span>
              <Link href={BRAND.links.docs}>Documentation</Link>
              <Link href="/changelog/">What’s new</Link>
              <Link href="/compare/">Compare</Link>
              <Link href="/brand/">Brand</Link>
              <Link href="/support/">Support & Services</Link>
              <Link href="/contact/">Contact</Link>
            </div>
            <div>
              <span>COMMUNITY</span>
              <Link href="/community/">Community hub</Link>
              <Link href={BRAND.links.github}>Source code</Link>
              <Link href={BRAND.links.discussions}>Discussions</Link>
              <Link href={BRAND.links.contributing}>Contributing</Link>
              <Link href={BRAND.links.sponsor}>Sponsor</Link>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>
            v{PRODUCT.release.version} · {PRODUCT.release.license} · Self-hosted
          </span>
          <div>
            <Link href="/privacy/">Privacy</Link>
            <Link href="/terms/">Terms</Link>
            <Link href="/about/">About</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
