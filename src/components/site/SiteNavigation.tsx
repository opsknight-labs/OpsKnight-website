"use client";
import Link from "next/link";
import Image from "next/image";
import { Github, Search, ArrowUpRight } from "lucide-react";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { PRODUCT } from "@/lib/product";
import { IncidentSignal } from "./IncidentSignal";
import { BRAND } from "@/lib/brand";

const resources = [
  ["Support & Services", "/support/"],
  ["Community", "/community/"],
  ["What’s new", "/changelog/"],
  ["About", "/about/"],
  ["Brand", "/brand/"],
  ["Contact", "/contact/"],
] as const;

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
                  <Link href="/#incident-loop">Explore the workflow →</Link>
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
            <Link href="/integrations/">Integrations</Link>
            <Link href="/compare/">Compare</Link>
            <Link href="/deploy/">Deploy</Link>
            <Link href="/security/">Security</Link>
            <Link href={BRAND.links.docs}>Docs</Link>
            <details
              className="resources-menu"
              name="site-navigation"
              key={`resources-${path}`}
            >
              <summary>
                Resources <span>⌄</span>
              </summary>
              <div className="site-small-menu">
                {resources.map(([name, href]) => (
                  <Link key={href} href={href}>
                    {name}
                  </Link>
                ))}
                <Link href={BRAND.links.status}>Live status ↗</Link>
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
                {PRODUCT.platform.products.map((p) => (
                  <Link key={p.slug} href={`/product/${p.slug}/`}>
                    {p.label}
                  </Link>
                ))}
                <Link href="/integrations/">Integrations</Link>
                <Link href="/compare/">Compare</Link>
                <Link href="/deploy/">Deploy</Link>
                <Link href="/security/">Security</Link>
                <Link href={BRAND.links.docs}>Docs</Link>
                <Link href="/support/">Support & Services</Link>
                <Link href="/community/">Community</Link>
                <Link href="/changelog/">What’s new</Link>
                <Link href="/about/">About</Link>
                <Link href="/contact/">Contact</Link>
                <Link href={BRAND.links.status}>Live status ↗</Link>
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
              <span>PRODUCT</span>
              <Link href="/product/incidents/">Incidents</Link>
              <Link href="/product/on-call/">On-call</Link>
              <Link href="/product/paging/">Paging</Link>
              <Link href="/product/chatops/">ChatOps</Link>
              <Link href="/product/status-pages/">Status</Link>
              <Link href="/product/analytics/">Analytics</Link>
            </div>
            <div>
              <span>EXPLORE</span>
              <Link href="/integrations/">Integrations</Link>
              <Link href="/compare/">Compare</Link>
              <Link href="/deploy/">Deploy</Link>
              <Link href="/security/">Security</Link>
              <Link href="/changelog/">What’s new</Link>
            </div>
            <div>
              <span>RESOURCES</span>
              <Link href={BRAND.links.docs}>Documentation</Link>
              <Link href="/support/">Support & Services</Link>
              <Link href="/community/">Community</Link>
              <Link href="/contact/">Contact</Link>
              <Link href="/brand/">Brand</Link>
            </div>
            <div>
              <span>PROJECT</span>
              <Link href={BRAND.links.github}>GitHub</Link>
              <Link href={BRAND.links.contributing}>Contributing</Link>
              <Link href={BRAND.links.sponsor}>Sponsor</Link>
              <Link href="/about/">About</Link>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <a
            className="footer-live-status"
            href={BRAND.links.status}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="live-dot" /> Live status
          </a>
          <span>
            v{PRODUCT.release.version} · {PRODUCT.release.license} · Self-hosted
          </span>
          <div>
            <Link href="/privacy/">Privacy</Link>
            <Link href="/terms/">Terms</Link>
            <Link href={BRAND.links.license}>License</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
