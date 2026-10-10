import { siteMetadata } from "@/lib/site-metadata";
import { BRAND } from "@/lib/brand";
import { TextLink } from "@/components/site/Primitives";
import { LegalLayout } from "@/components/site/LegalLayout";

export const metadata = siteMetadata({
  alternates: { canonical: "/privacy/" },
  title: "Privacy Policy",
  description: `Privacy policy for the ${BRAND.name} website.`,
});

const sections = [
  ["scope", "Website scope"],
  ["self-hosted", "Self-hosted product"],
  ["website", "Website infrastructure"],
  ["messages", "Messages & project services"],
  ["questions", "Questions"],
] as const;

export default function PrivacyPage() {
  return (
    <LegalLayout
      eyebrow="LEGAL / PRIVACY"
      title="Privacy Policy"
      description="How the public OpsKnight website handles data, and where responsibility begins for a self-hosted installation."
      lastUpdated="20 August 2026"
      navLabel="Privacy policy sections"
      sections={sections}
      facts={[
        { label: "SCOPE", value: BRAND.domain },
        {
          label: "CONTACT",
          value: <a href={`mailto:${BRAND.links.email}`}>{BRAND.links.email}</a>,
        },
      ]}
    >
      <section id="scope">
        <h2>Website scope</h2>
        <p>
          Operator of this website: {BRAND.authors[0].name}. This policy covers
          {BRAND.domain} only. It does not cover data inside a self-hosted
          OpsKnight instance; that data stays on the infrastructure of whoever
          runs the software.
        </p>
      </section>
      <section id="self-hosted">
        <h2>Self-hosted product</h2>
        <p>
          When you run OpsKnight, incident data, schedules and users stay on
          your infrastructure. Project maintainers cannot see that data. There
          is no OpsKnight-hosted cloud that stores your incidents.
        </p>
      </section>
      <section id="website">
        <h2>Website infrastructure</h2>
        <p>
          The site source does not load a third-party analytics or advertising
          pixel. Pages are served through Cloudflare Pages. Cloudflare, as the
          CDN, may process request metadata such as IP address, user agent and
          requested URL under its own terms to deliver and protect the site.
          OpsKnight does not sell that data.
        </p>
      </section>
      <section id="messages">
        <h2>Messages and project services</h2>
        <p>
          If you email {BRAND.links.email}, open a GitHub issue, join a
          discussion or submit a contribution, GitHub and your email provider
          process that information under their own policies. Do not put
          secrets, access tokens or private incident data in public project
          channels.
        </p>
      </section>
      <section id="questions">
        <h2>Questions</h2>
        <p>
          For website privacy questions, use the contact route. Product
          security reports have a separate private reporting path.
        </p>
        <div className="paired-links">
          <TextLink href="/contact/">Contact OpsKnight</TextLink>
          <TextLink href={BRAND.links.privateSecurityReport}>
            Private security report
          </TextLink>
        </div>
      </section>
    </LegalLayout>
  );
}
