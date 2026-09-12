import { Metadata } from "next";
import { BRAND } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `Terms for the ${BRAND.name} website and the licensing boundary between stable releases and the current development line.`,
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
            These terms cover the public website at {BRAND.domain}. Software
            releases and the website itself have separate licensing boundaries.
          </p>

          <h2 className="pt-2 text-2xl font-semibold text-[#111827]">
            Published stable release
          </h2>
          <p>
            The currently published stable release, OpsKnight v{BRAND.version},
            remains licensed under{" "}
            <a
              href={BRAND.links.license}
              className="text-[#d21a1b] hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {BRAND.license}
            </a>
            . A release, tag, container image, chart, or source archive keeps the
            license that accompanied that artifact; a later change on the
            development branch does not retroactively change those rights.
          </p>

          <h2 className="pt-2 text-2xl font-semibold text-[#111827]">
            Current development line
          </h2>
          <p>
            The current development line for the next major Community release is
            intended to be distributed under{" "}
            <a
              href={BRAND.links.developmentLicense}
              className="text-[#d21a1b] hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              GNU Affero General Public License version 3 only
            </a>{" "}
            ({BRAND.developmentLicense}) once the application license transition
            is merged and released. The AGPL includes obligations for modified
            versions used for remote network interaction, including the
            corresponding-source requirement in section 13.
          </p>
          <p>
            The repository{" "}
            <a
              href={BRAND.links.licenseTransition}
              className="text-[#d21a1b] hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              license-transition notice
            </a>{" "}
            explains the historical boundary and release requirements. The
            applicable license text shipped with a particular software artifact
            controls its software grant.
          </p>

          <h2 className="pt-2 text-2xl font-semibold text-[#111827]">
            Trademarks and brand assets
          </h2>
          <p>
            Software licensing does not grant rights to use the OpsKnight name,
            logos, or other brand assets as the identity of a fork, derivative
            product, or hosted service. Lawful descriptive and nominative use is
            not restricted by this statement. See the{" "}
            <a
              href={BRAND.links.trademarks}
              className="text-[#d21a1b] hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              trademark policy
            </a>{" "}
            for the project policy.
          </p>

          <h2 className="pt-2 text-2xl font-semibold text-[#111827]">
            Website
          </h2>
          <p>
            The marketing site is provided as-is. There is no support SLA. This
            website repository is not made available under the OpsKnight
            Community software license merely because it describes the Community
            product. Trademarks of other companies, including PagerDuty, Slack,
            and Grafana, belong to their owners. OpsKnight is not affiliated with
            them; names and marks appear only to identify products we compare or
            interoperate with.
          </p>

          <h2 className="pt-2 text-2xl font-semibold text-[#111827]">Changes</h2>
          <p>
            We may update these terms. Material changes will be dated at the top
            of this page.
          </p>
        </div>
      </div>
    </main>
  );
}
