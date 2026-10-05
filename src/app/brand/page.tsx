import { siteMetadata } from "@/lib/site-metadata";
import type { Metadata } from "next";
import Image from "next/image";
import { Action, SectionIntro, TextLink } from "@/components/site/Primitives";
const pageMetadata: Metadata = {
  title: "Brand",
  description:
    "OpsKnight identity, colors, typography and the Incident Signal.",
  alternates: { canonical: "/brand/" },
  openGraph: { url: "/brand/" },
};
export const metadata = siteMetadata(pageMetadata);
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
            Incident operations you control. Our identity pairs operational
            surfaces with a deliberate red signal and room to breathe.
          </p>
          <div className="site-actions">
            <Action href="/logo.svg">Download the logo</Action>
            <Action href="/logo.png" secondary>
              PNG logo
            </Action>
          </div>
        </div>
      </section>
      <section className="site-section">
        <div className="site-container">
          <SectionIntro
            eyebrow="THE MARK"
            title="Keep the knight recognizable."
          />
          <div className="brand-logo-stage">
            <Image
              src="/logo.svg"
              width={160}
              height={160}
              alt="OpsKnight red knight shield"
            />
            <p>
              Use the original mark. Preserve its proportions and give it clear
              space.
            </p>
          </div>
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
      <section className="site-section site-white">
        <div className="site-container interior-copy">
          <p className="site-eyebrow">THE INCIDENT SIGNAL</p>
          <h2>Red carries meaning.</h2>
          <p>
            A point, a path, an active incident. Use red to explain routing,
            paging, attention and action. Motion should show what happens to the
            signal.
          </p>
          <h2>Type with clarity.</h2>
          <p>
            Manrope leads the story. JetBrains Mono labels versions, commands
            and operational details. Large headings, concise copy and strong
            contrast keep the product in focus.
          </p>
          <TextLink href="/">See the identity in use</TextLink>
        </div>
      </section>
    </div>
  );
}
