import { Metadata } from "next";
import { BRAND } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `Terms for the ${BRAND.name} website. The community software is licensed under AGPL-3.0-only.`,
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#f8fafc] pt-32 pb-24 px-6">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-4xl font-semibold tracking-tight text-[#111827]">
          Terms of Service
        </h1>
        <p className="mt-4 text-sm text-slate-500">Last updated: September 13, 2026</p>
        <div className="mt-8 space-y-6 text-base leading-relaxed text-[#4b5563]">
          <p>
            These terms cover the public website at {BRAND.domain}. The
            OpsKnight community software is governed by the{" "}
            <a
              href={BRAND.links.license}
              className="text-[#d21a1b] hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              GNU Affero General Public License version 3 only
            </a>{" "}
            (AGPL-3.0-only) in the source repository. Earlier OpsKnight
            releases remain under the license that accompanied those releases.
          </p>
          <h2 className="pt-2 text-2xl font-semibold text-[#111827]">
            Community software license
          </h2>
          <p>
            The current community development line is licensed under
            AGPL-3.0-only. The license includes copyleft obligations for
            modified versions used to provide remote network interaction,
            including the corresponding-source requirement in section 13.
            The repository license text controls the software grant.
          </p>
          <p>
            The software license does not grant rights to use the OpsKnight
            name, logos, or other brand assets as the identity of a fork,
            derivative product, or hosted service. Lawful descriptive and
            nominative references are not restricted by this statement.
          </p>
          <h2 className="pt-2 text-2xl font-semibold text-[#111827]">
            Website
          </h2>
          <p>
            The marketing site is provided as-is. There is no support SLA.
            This website repository is not made available under the OpsKnight
            community software license merely because it describes the
            community product. Trademarks of other companies (including
            PagerDuty, Slack, and Grafana) belong to their owners. OpsKnight is
            not affiliated with them. Names and marks appear only to identify
            products we compare or ingest from.
          </p>
          <h2 className="pt-2 text-2xl font-semibold text-[#111827]">Changes</h2>
          <p>
            We may update these terms. Material changes will be dated at the
            top of this page.
          </p>
        </div>
      </div>
    </main>
  );
}
