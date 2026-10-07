import { siteMetadata } from "@/lib/site-metadata";
import type { Metadata } from "next";
import Image from "next/image";
import { Action, SectionIntro, TextLink } from "@/components/site/Primitives";

const pageMetadata: Metadata = {
  title: "Brand",
  description:
    "OpsKnight identity, logo usage, colors, typography, naming and the Incident Signal.",
  alternates: { canonical: "/brand/" },
  openGraph: { url: "/brand/" },
};
export const metadata = siteMetadata(pageMetadata);

const usageRules = [
  ["Clear space", "Give the knight mark breathing room. Do not crowd it with text, borders or partner marks."],
  ["Keep proportions", "Scale the supplied asset as one unit. Do not stretch, squash, rotate or redraw the mark."],
  ["Use contrast", "Use the red mark where it remains legible. Prefer the supplied assets over recoloring the logo."],
  ["Name it OpsKnight", "Write the product name as “OpsKnight”. Avoid alternate spacing, abbreviations or invented product names."],
] as const;

export default function Brand() {
  return (
    <div className="site-page">
      <section className="interior-hero site-dark">
        <div className="site-container">
          <p className="site-eyebrow">
            <span className="signal-dot" /> BRAND / OPSKNIGHT
          </p>
          <h1>
            One identity.
            <br />A clear signal.
          </h1>
          <p className="site-description">
            Incident operations you control. The identity pairs operational
            surfaces with a deliberate red signal and enough restraint for the
            product to remain the focus.
          </p>
          <div className="site-actions">
            <Action href="/logo.svg">Download SVG logo</Action>
            <Action href="/logo.png" secondary>
              Download PNG
            </Action>
          </div>
        </div>
      </section>

      <section className="site-section">
        <div className="site-container">
          <SectionIntro eyebrow="THE MARK" title="Keep the knight recognizable.">
            Use the supplied mark, preserve its proportions and leave clear
            space around it.
          </SectionIntro>
          <div className="brand-logo-stage">
            <Image
              src="/logo.svg"
              width={160}
              height={160}
              alt="OpsKnight red knight shield"
            />
            <div>
              <p>
                Use the original vector wherever possible. The PNG is provided
                for environments that cannot use SVG.
              </p>
              <div className="paired-links">
                <TextLink href="/logo.svg">SVG asset</TextLink>
                <TextLink href="/logo.png">PNG asset</TextLink>
                <TextLink href="/brand/opsknight-mark.webp">Web mark</TextLink>
              </div>
            </div>
          </div>

          <div className="brand-usage-grid">
            {usageRules.map(([title, body]) => (
              <article key={title}>
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="site-section site-white">
        <div className="site-container">
          <SectionIntro eyebrow="COLOR" title="Operational, not decorative." />
          <div className="brand-palette">
            {[
              ["OpsKnight Red", "#D21A1B"],
              ["Command Black", "#0B0F18"],
              ["Ops Slate", "#0F172A"],
              ["Elevated Slate", "#1E293B"],
              ["Canvas", "#F8FAFC"],
              ["Ink", "#111827"],
              ["Operational Green", "#059669"],
              ["Warning", "#D97706"],
            ].map(([name, color]) => (
              <div key={name}>
                <span style={{ background: color }} />
                <strong>{name}</strong>
                <code>{color}</code>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="site-section">
        <div className="site-container">
          <SectionIntro eyebrow="USE IT CORRECTLY" title="Practical rules for product references.">
            Keep the name, mark and product claims recognizable and accurate
            wherever OpsKnight appears in documentation, integrations or partner material.
          </SectionIntro>
          <div className="brand-do-dont">
            <article>
              <span>DO</span>
              <h3>Preserve the supplied identity.</h3>
              <ul>
                <li>Use “OpsKnight” with the exact capitalization.</li>
                <li>Use supplied logo assets with clear space and sufficient contrast.</li>
                <li>Describe the product using capabilities that are current for the referenced release.</li>
                <li>Link to the project or documentation when attribution helps readers verify a claim.</li>
              </ul>
            </article>
            <article>
              <span>DON’T</span>
              <h3>Invent variants or implied endorsements.</h3>
              <ul>
                <li>Do not stretch, rotate, recolor, or redraw the knight mark.</li>
                <li>Do not call a third-party product or service an official OpsKnight offering without permission.</li>
                <li>Do not combine the OpsKnight name with another brand in a way that implies ownership or endorsement.</li>
                <li>Do not reuse old release claims as if they describe the current product.</li>
              </ul>
            </article>
          </div>
        </div>
      </section>

      <section className="site-section site-white">
        <div className="site-container">
          <SectionIntro eyebrow="README & DOCS" title="Present OpsKnight consistently.">
            Use the canonical mark, product name and current-release wording when
            OpsKnight appears in a README, integration guide or partner document.
          </SectionIntro>
          <div className="brand-example-grid">
            <article>
              <span>README LOCKUP</span>
              <h3>Keep the product name and destination obvious.</h3>
              <pre tabIndex={0}><code>{`![OpsKnight](https://opsknight.com/logo.svg)

**OpsKnight** — self-hosted incident management and on-call.

[Install](https://opsknight.com/deploy/) · [Docs](https://opsknight.com/docs/) · [GitHub](https://github.com/opsknight-labs/OpsKnight)`}</code></pre>
            </article>
            <article>
              <span>INTEGRATION ATTRIBUTION</span>
              <h3>Describe interoperability without implying endorsement.</h3>
              <pre tabIndex={0}><code>{`Works with OpsKnight v2.0.0 through the documented webhook/API contract.

OpsKnight is an independent open-source project. Product names and trademarks belong to their respective owners.`}</code></pre>
            </article>
          </div>
        </div>
      </section>

      <section className="site-section">
        <div className="site-container brand-principles-grid">
          <article className="interior-copy">
            <p className="site-eyebrow">THE INCIDENT SIGNAL</p>
            <h2>Red carries meaning.</h2>
            <p>
              A point, a path, an active incident. Use red to explain routing,
              paging, attention and action—not as decoration on every surface.
            </p>
          </article>
          <article className="interior-copy">
            <p className="site-eyebrow">TYPOGRAPHY</p>
            <h2>Type with clarity.</h2>
            <p>
              Manrope leads narrative copy. JetBrains Mono labels versions,
              commands, states and operational details. Large headings should
              create hierarchy, not crowd smaller laptop viewports.
            </p>
          </article>
          <article className="interior-copy">
            <p className="site-eyebrow">TRADEMARK & ATTRIBUTION</p>
            <h2>Identify the project without implying affiliation.</h2>
            <p>
              The OpsKnight name and logo identify this project and product.
              When referencing OpsKnight from another product, company or service,
              keep the attribution clear and do not imply endorsement, certification
              or an official partnership that has not been established.
            </p>
          </article>
          <article className="interior-copy">
            <p className="site-eyebrow">WRITING</p>
            <h2>Specific beats dramatic.</h2>
            <p>
              Describe what the product actually does, its operational
              boundaries and where to verify the behavior. Avoid unsupported
              superlatives or claims that a deployment has not proven.
            </p>
          </article>
        </div>
      </section>
    </div>
  );
}
