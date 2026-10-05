import { Metadata } from "next";
import Link from "next/link";
import { BRAND } from "@/lib/brand";

export const metadata: Metadata = {
  alternates: { canonical: "/privacy/" },
  title: "Privacy Policy",
  description: `Privacy policy for the ${BRAND.name} website.`,
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#f8fafc] pt-32 pb-24 px-6">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-4xl font-semibold tracking-tight text-[#111827]">
          Privacy Policy
        </h1>
        <p className="mt-4 text-sm text-slate-500">Last updated: August 20, 2026</p>
        <div className="mt-8 space-y-6 text-base leading-relaxed text-[#4b5563]">
          <p>
            Operator of this website: {BRAND.authors[0].name} ({BRAND.links.email}
            ). This policy covers {BRAND.domain} only. It does not cover data
            inside a self-hosted OpsKnight instance — that data stays on the
            machines of whoever runs the software.
          </p>
          <h2 className="pt-2 text-2xl font-semibold text-[#111827]">
            Self-hosted product
          </h2>
          <p>
            When you run OpsKnight, incident data, schedules, and users stay on
            your infrastructure. Project maintainers cannot see that data. There
            is no OpsKnight-hosted cloud that stores your incidents.
          </p>
          <h2 className="pt-2 text-2xl font-semibold text-[#111827]">
            This website
          </h2>
          <p>
            The site source does not load a third-party analytics or advertising
            pixel. Pages are served via Cloudflare Pages. Cloudflare, as CDN,
            may process request metadata (IP address, user agent, URL) under
            their terms to deliver and protect the site. We do not sell that
            data.
          </p>
          <p>
            If you email {BRAND.links.email} or open a GitHub issue, GitHub or
            your mail provider process that message under their policies.
          </p>
          <h2 className="pt-2 text-2xl font-semibold text-[#111827]">Questions</h2>
          <p>
            <Link href="/contact" className="text-[#d21a1b] hover:underline">
              Community
            </Link>
            , {BRAND.links.email}, or the GitHub repository.
          </p>
        </div>
      </div>
    </main>
  );
}
