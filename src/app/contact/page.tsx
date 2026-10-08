import { BRAND } from "@/lib/brand";
import { enquiryHref } from "@/lib/contact";
import { Action, TextLink } from "@/components/site/Primitives";
import { Mail } from "lucide-react";

const paths = [
  {
    id: "community",
    title: "Community",
    description:
      "Discuss incident workflows, request features, report product issues or contribute to the open-source project.",
    href: "/community/",
    action: "Visit the community",
  },
  {
    id: "support",
    title: "Commercial support",
    description:
      "Discuss deployment help, upgrades, troubleshooting and architecture guidance. Scope, support hours and any service commitments are agreed separately.",
    href: enquiryHref("OpsKnight commercial support enquiry"),
    action: "Email about support",
  },
  {
    id: "implementation",
    title: "Implementation / consulting",
    description:
      "Get help connecting monitoring platforms, designing services and escalation policies, and planning production deployment, high availability and hardening.",
    href: enquiryHref("OpsKnight implementation and consulting enquiry"),
    action: "Email about implementation",
  },
  {
    id: "security",
    title: "Security reports",
    description:
      "Report undisclosed vulnerabilities privately through GitHub's security reporting form. If unavailable, email with the subject Private security report and ask for a secure exchange channel before sending sensitive material.",
    href: BRAND.links.privateSecurityReport,
    action: "Report a vulnerability privately",
  },
  {
    id: "procurement",
    title: "Corporate & security questionnaires",
    description:
      "Contact the maintainer directly for supplier review, security questionnaires, licensing questions and release evidence. Include the release, deployment context, requested evidence and your evaluation deadline. No GitHub Discussions account is needed.",
    href: enquiryHref("OpsKnight supplier and security questionnaire enquiry"),
    action: "Email about your evaluation",
  },
];

export default function Contact() {
  return (
    <div className="site-page">
      <section className="interior-hero site-dark">
        <div className="site-container">
          <p className="site-eyebrow">
            <span className="signal-dot" /> CONTACT OPSKNIGHT
          </p>
          <h1>
            Find the right
            <br />
            conversation.
          </h1>
          <p className="site-description">
            Community, professional assistance and corporate evaluation each
            have a clear path. Reach us directly at{" "}
            <a
              href={enquiryHref("OpsKnight enquiry")}
              className="text-white font-semibold underline underline-offset-4 hover:text-red-400"
            >
              {BRAND.links.email}
            </a>{" "}
            for support, implementation, or procurement enquiries.
          </p>
          <div className="site-actions">
            <Action href={enquiryHref("OpsKnight enquiry")}>
              Email the maintainer
            </Action>
            <Action href="/support/" secondary>
              Support & Services
            </Action>
          </div>
        </div>
      </section>

      <section className="site-section">
        <div className="site-container security-sections">
          {paths.map((path) => (
            <article id={path.id} key={path.id}>
              <h2>{path.title}</h2>
              <p>{path.description}</p>
              <TextLink href={path.href}>{path.action}</TextLink>
              {path.id === "security" && (
                <p>
                  <a href={enquiryHref("Private security report")}>
                    Email fallback
                  </a>{" "}
                  · <a href={BRAND.links.securityPolicy}>Security policy</a>
                </p>
              )}
              {path.id === "procurement" && (
                <p>
                  <a href="/security/#evaluation">
                    Review security & procurement resources
                  </a>
                </p>
              )}
            </article>
          ))}
        </div>

        <div className="site-container contact-direct-wrap">
          <div className="contact-direct-card">
            <div className="contact-direct-header">
              <div className="support-mail-icon-wrap">
                <Mail size={22} className="text-red-600" />
              </div>
              <div>
                <p className="site-eyebrow mb-0">DIRECT INBOX</p>
                <h3 className="text-xl font-bold">General &amp; Commercial Enquiries</h3>
              </div>
            </div>
            <p className="text-sm text-slate-700 leading-relaxed max-w-xl mb-0">
              Prefer writing directly instead of GitHub? Send architecture reviews,
              vendor security questionnaires, or commercial support requests straight to our team.
            </p>
            <div className="contact-direct-actions">
              <div className="support-email-box py-2 px-3">
                <span className="text-xs font-bold tracking-wider uppercase text-slate-700">Official Contact</span>
                <a
                  href={enquiryHref("OpsKnight enquiry")}
                  className="support-email-address text-base"
                >
                  {BRAND.links.email}
                </a>
              </div>
              <Action href={enquiryHref("OpsKnight enquiry")}>
                Send an email
              </Action>
            </div>
          </div>
        </div>
      </section>
      <section className="site-section site-light-alt">
        <div className="site-container contact-issue-guide">
          <div>
            <p className="site-eyebrow">
              <span className="signal-dot" /> REPORTING A PRODUCT ISSUE
            </p>
            <h2>Give maintainers enough context to reproduce it.</h2>
            <p className="site-description">
              For non-sensitive bugs, include the release, deployment type,
              affected page or workflow, exact reproduction steps, expected and
              actual behavior, and sanitized logs or request IDs where useful.
              Remove secrets, tokens, cookies, credentials and private incident data.
            </p>
          </div>
          <div className="issue-evidence-list">
            <span>Release / commit</span>
            <span>Deployment topology</span>
            <span>Reproduction steps</span>
            <span>Expected vs actual</span>
            <span>Sanitized logs / request IDs</span>
            <span>Relevant provider or service</span>
          </div>
        </div>
      </section>
    </div>
  );
}
