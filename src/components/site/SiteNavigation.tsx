"use client";

import Link from "next/link";
import Image from "next/image";
import {
  ArrowUpRight,
  ChevronDown,
  Github,
  Search,
} from "lucide-react";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { PRODUCT } from "@/lib/product";
import { IncidentSignal } from "./IncidentSignal";
import { BRAND } from "@/lib/brand";

const resources = [
  ["Solutions", "/solutions/"],
  ["Support & Services", "/support/"],
  ["Community", "/community/"],
  ["What’s New", "/changelog/"],
  ["About", "/about/"],
  ["Brand", "/brand/"],
  ["Contact", "/contact/"],
] as const;

const mobileResources = [
  ["Documentation", BRAND.links.docs],
  ["What’s New", "/changelog/"],
  ["Solutions", "/solutions/"],
  ["Support & Services", "/support/"],
  ["Community", "/community/"],
  ["About", "/about/"],
] as const;

const productGroups = [
  {
    label: "RESPOND",
    slugs: ["incidents", "on-call", "paging"],
  },
  {
    label: "COORDINATE",
    slugs: ["chatops", "status-pages", "postmortems", "analytics"],
  },
  {
    label: "OPERATE",
    slugs: ["security", "operations", "mobile"],
  },
] as const;

const mobileProductSlugs = ["incidents", "on-call", "paging", "chatops"] as const;

export function SiteNavigation() {
  const path = usePathname();
  const header = useRef<HTMLElement>(null);

  const normalizePath = (value: string) =>
    value.length > 1 ? value.replace(/\/+$/, "") : value;

  const isActive = (href: string) => {
    if (!href.startsWith("/")) return false;
    const current = normalizePath(path);
    const target = normalizePath(href);
    return target === "/"
      ? current === "/"
      : current === target || current.startsWith(`${target}/`);
  };

  const resourcesActive = resources.some(([, href]) => isActive(href));
  const showIncidentSignal = path === "/" || path.startsWith("/product/");

  useEffect(() => {
    function closeMenus(event: Event) {
      if (event.type === "keydown" && (event as KeyboardEvent).key !== "Escape") {
        return;
      }
      if (
        event.type === "pointerdown" &&
        header.current?.contains(event.target as Node)
      ) {
        return;
      }

      header.current
        ?.querySelectorAll<HTMLDetailsElement>("details[open]")
        .forEach((menu) => {
          menu.open = false;
          if (event.type === "keydown") {
            menu.querySelector<HTMLElement>("summary")?.focus();
          }
        });
    }

    document.addEventListener("keydown", closeMenus);
    document.addEventListener("pointerdown", closeMenus);
    return () => {
      document.removeEventListener("keydown", closeMenus);
      document.removeEventListener("pointerdown", closeMenus);
    };
  }, []);

  const productBySlug = (slug: string) =>
    PRODUCT.platform.products.find((product) => product.slug === slug);

  return (
    <>
      {showIncidentSignal ? <IncidentSignal /> : null}
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
            <details
              name="site-navigation"
              key={`product-${path}`}
              className={isActive("/product/") ? "nav-active" : undefined}
            >
              <summary>
                Product
                <ChevronDown className="nav-chevron" size={14} aria-hidden="true" />
              </summary>
              <div className="site-mega">
                <div className="mega-product-head">
                  <p className="site-eyebrow">PRODUCT</p>
                  <h3>Incident operations, end to end.</h3>
                  <p>
                    Find the surface you need without digging through the whole
                    product map.
                  </p>
                </div>

                <div className="mega-product-groups">
                  {productGroups.map((group) => (
                    <section key={group.label}>
                      <span>{group.label}</span>
                      {group.slugs.map((slug) => {
                        const product = productBySlug(slug);
                        if (!product) return null;
                        return (
                          <Link
                            key={product.slug}
                            href={`/product/${product.slug}/`}
                            aria-current={
                              isActive(`/product/${product.slug}/`) ? "page" : undefined
                            }
                          >
                            {product.label}
                          </Link>
                        );
                      })}
                    </section>
                  ))}
                </div>

                <div className="mega-product-foot">
                  <Link href="/product/">
                    Explore the complete platform <ArrowUpRight size={14} />
                  </Link>
                  <Link href="/#incident-loop">Follow the incident lifecycle →</Link>
                </div>
              </div>
            </details>

            <Link
              href="/integrations/"
              aria-current={isActive("/integrations/") ? "page" : undefined}
            >
              Integrations
            </Link>
            <Link
              href="/compare/"
              aria-current={isActive("/compare/") ? "page" : undefined}
            >
              Compare
            </Link>
            <Link
              href="/deploy/"
              aria-current={isActive("/deploy/") ? "page" : undefined}
            >
              Deploy
            </Link>
            <Link
              href="/security/"
              aria-current={isActive("/security/") ? "page" : undefined}
            >
              Security
            </Link>
            <Link
              className="nav-whats-new"
              href="/changelog/"
              aria-current={isActive("/changelog/") ? "page" : undefined}
            >
              What’s New
            </Link>
            <Link
              href={BRAND.links.docs}
              aria-current={isActive(BRAND.links.docs) ? "page" : undefined}
            >
              Docs
            </Link>

            <details
              className={`resources-menu ${resourcesActive ? "nav-active" : ""}`}
              name="site-navigation"
              key={`resources-${path}`}
            >
              <summary>
                Resources
                <ChevronDown className="nav-chevron" size={14} aria-hidden="true" />
              </summary>
              <div className="site-small-menu">
                {resources.map(([name, href]) => (
                  <Link
                    key={href}
                    href={href}
                    aria-current={isActive(href) ? "page" : undefined}
                  >
                    {name}
                  </Link>
                ))}
                <div className="resource-menu-divider" />
                <a
                  href={BRAND.links.status}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="live-dot" /> Live OpsKnight status
                  <ArrowUpRight size={13} />
                </a>
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
            <Link className="nav-install" href="/deploy/">
              Install <ArrowUpRight size={14} />
            </Link>

            <details className="mobile-nav" key={path}>
              <summary aria-label="Open navigation">
                <span className="mobile-menu-icon" aria-hidden="true">
                  <span />
                  <span />
                </span>
              </summary>

              <div className="mobile-menu-panel">
                <div className="mobile-menu-head">
                  <div>
                    <span className="site-eyebrow">NAVIGATE</span>
                    <strong>OpsKnight</strong>
                  </div>
                  <a
                    className="mobile-live-status"
                    href={BRAND.links.status}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="live-dot" /> Live status ↗
                  </a>
                </div>

                <nav aria-label="Mobile navigation" className="mobile-menu-grid">
                  <section className="mobile-menu-section">
                    <span>PRODUCT</span>
                    {mobileProductSlugs.map((slug) => {
                      const product = productBySlug(slug);
                      if (!product) return null;
                      return (
                        <Link
                          key={product.slug}
                          href={`/product/${product.slug}/`}
                          aria-current={
                            isActive(`/product/${product.slug}/`) ? "page" : undefined
                          }
                        >
                          {product.label}
                        </Link>
                      );
                    })}
                    <Link href="/product/" className="mobile-more-link">
                      More products →
                    </Link>
                  </section>

                  <section className="mobile-menu-section">
                    <span>EXPLORE</span>
                    <Link href="/integrations/">Integrations</Link>
                    <Link href="/compare/">Compare</Link>
                    <Link href="/deploy/">Deploy</Link>
                    <Link href="/security/">Security</Link>
                  </section>

                  <section className="mobile-menu-section">
                    <span>RESOURCES</span>
                    {mobileResources.map(([name, href]) => (
                      <Link
                        key={href}
                        href={href}
                        aria-current={isActive(href) ? "page" : undefined}
                      >
                        {name}
                      </Link>
                    ))}
                  </section>
                </nav>

                <div className="mobile-menu-actions">
                  <Link className="mobile-install" href="/deploy/">
                    Install OpsKnight <ArrowUpRight size={14} />
                  </Link>
                  <Link href={BRAND.links.github}>
                    <Github size={16} /> GitHub
                  </Link>
                </div>
              </div>
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
            </div>
            <div>
              <span>EXPLORE</span>
              <Link href="/integrations/">Integrations</Link>
              <Link href="/compare/">Compare</Link>
              <Link href="/deploy/">Deploy</Link>
              <Link href="/security/">Security</Link>
              <Link href="/changelog/">What’s New</Link>
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
            <div>
              <span>LEGAL</span>
              <Link href="/legal/">Legal & policies</Link>
              <Link href="/privacy/">Privacy</Link>
              <Link href="/terms/">Terms</Link>
              <Link href={BRAND.links.license}>License</Link>
              <Link href={BRAND.links.trademarks}>Trademarks</Link>
              <Link href={BRAND.links.securityPolicy}>Security policy</Link>
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
