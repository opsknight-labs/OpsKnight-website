import Link from "next/link";
import { Github, Mail, Heart } from "lucide-react";
import { BRAND } from "@/lib/brand";
import { latestDocsHref } from "@/lib/docs/paths";
import { BrandLockup } from "@/components/brand/BrandLockup";

const footerLinks = {
  product: [
    { label: "Product", href: "/#product-tour" },
    { label: "Integrations", href: "/integrations" },
    { label: "Use cases", href: "/use-cases" },
    { label: "Compare", href: "/compare" },
    { label: "Changelog", href: "/changelog" },
    { label: "Status page", href: BRAND.links.status },
  ],
  resources: [
    { label: "Install", href: "/install" },
    { label: "Security & Hardening", href: "/security" },
    { label: "Documentation", href: BRAND.links.docs },
    { label: "Quickstart", href: latestDocsHref("start/quickstart") },
    { label: "Helm charts", href: BRAND.links.helmCharts },
    { label: "Brand", href: "/brand" },
  ],
  community: [
    { label: "Community", href: "/community/" },
    { label: "GitHub Discussions", href: BRAND.links.discussions },
    { label: "Issues", href: BRAND.links.issues },
    { label: "Contributing", href: BRAND.links.contributing },
    { label: "Sponsor", href: BRAND.links.sponsor },
  ],
  legal: [
    { label: "About", href: "/about" },
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
    { label: `${BRAND.license} License`, href: BRAND.links.license },
  ],
};

export function Footer() {
  return (
    <footer className="relative border-t border-slate-800 bg-[#0f172a] pt-16 pb-10">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-[#d21a1b] via-[#d21a1b]/30 to-transparent"
        aria-hidden
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-6 lg:gap-8">
          <div className="lg:col-span-2">
            <BrandLockup size={28} className="mb-5" />
            <p className="mb-3 max-w-sm text-sm leading-relaxed text-slate-400">
              The desk that holds the watch. On-call, paging, war rooms, and
              status pages on infrastructure you run.
            </p>
            <p className="mb-6 font-mono text-xs text-slate-500">
              {BRAND.license} · {BRAND.version} · {BRAND.integrationCountLabel} integrations
            </p>
            <div className="flex items-center gap-4 text-slate-400">
              <a
                href={BRAND.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d21a1b]"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href={`mailto:${BRAND.links.email}`}
                className="hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d21a1b]"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
              <a
                href={BRAND.links.sponsor}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d21a1b]"
                aria-label="Sponsor"
              >
                <Heart className="h-5 w-5" />
              </a>
            </div>
          </div>

          {(
            [
              ["Product", footerLinks.product],
              ["Resources", footerLinks.resources],
              ["Community", footerLinks.community],
              ["Legal", footerLinks.legal],
            ] as const
          ).map(([title, links]) => (
            <div key={title}>
              <h3 className="mb-4 text-sm font-semibold text-white">{title}</h3>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-400 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d21a1b]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center justify-between gap-3 border-t border-slate-800 pt-8 md:flex-row">
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} {BRAND.name}. {BRAND.license}. Other
            product names are trademarks of their owners. No affiliation.
          </p>
          <a
            href={BRAND.links.status}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-slate-400 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d21a1b]"
          >
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#059669]" />
            Live status demo
          </a>
        </div>
      </div>
    </footer>
  );
}
