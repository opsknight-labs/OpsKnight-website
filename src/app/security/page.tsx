import { siteMetadata } from "@/lib/site-metadata";
import type { Metadata } from "next";
import { BRAND } from "@/lib/brand";
import { enquiryHref } from "@/lib/contact";
import { PRODUCT, productDocs } from "@/lib/product";
import { Action, FinalCTA, TextLink } from "@/components/site/Primitives";
import {
  KeyRound,
  Lock,
  UserCheck,
  Network,
  CheckCircle2,
} from "lucide-react";

export const metadata: Metadata = siteMetadata({
  title: "Security & Identity Architecture — OpsKnight",
  description:
    "OpsKnight security architecture: self-hosted data custody, OIDC PKCE, SCIM 2.0 lifecycle controls, RBAC, AES-256-GCM encrypted configuration, sessions, audit evidence, and explicit outbound trust boundaries.",
  alternates: { canonical: "/security/" },
  openGraph: { url: "/security/" },
});

export default function Security() {
  return (
    <div className="site-page">
      {/* Interior Hero */}
      <section className="interior-hero site-dark">
        <div className="site-container">
          <p className="site-eyebrow">
            <span className="signal-dot" /> SECURITY / IDENTITY / OPERATIONS
          </p>
          <h1>
            Your infrastructure.
            <br />
            Your users. Your keys.
          </h1>
          <p className="site-description">
            Keep the incident management plane self-hosted, connect enterprise identity deliberately,
            enforce role-based access, encrypt sensitive configuration at rest, and preserve audit evidence.
            External identity, notification, ChatOps, webhook, and observability providers remain explicit
            trust boundaries that you configure and operate.
          </p>
          <div className="site-actions">
            <Action href={productDocs("operate/security/hardening")}>Read the Hardening Guide</Action>
            <Action href="#evaluator-breakdown" secondary>
              Technical Architecture
            </Action>
          </div>
        </div>
      </section>

      {/* Trust-center style evaluator architecture */}
      <section id="evaluator-breakdown" className="site-section security-trust-section">
        <div className="site-container">
          <div className="security-trust-intro">
            <p className="site-eyebrow">
              <span className="signal-dot" /> TECHNICAL EVALUATION
            </p>
            <h2>Control boundaries you can verify.</h2>
            <p>
              Self-hosting keeps the application and primary incident database inside infrastructure
              you operate. It does not make every workflow air-gapped: the providers you configure
              for identity, notifications, ChatOps, webhooks, email, voice, or observability create
              deliberate external dependencies that should be reviewed and restricted.
            </p>
          </div>

          <div className="security-control-stack">
            <article>
              <div className="security-control-title">
                <KeyRound size={22} aria-hidden="true" />
                <div>
                  <span>01 / IDENTITY &amp; PROVISIONING</span>
                  <h3>Authenticate, provision, then authorize.</h3>
                </div>
              </div>
              <div className="security-control-body">
                <p>
                  OIDC with PKCE handles sign-in. SCIM 2.0 can manage user and group lifecycle.
                  Effective OpsKnight permissions still come from the role and scope applied after identity mapping.
                </p>
                <ul>
                  <li><CheckCircle2 size={14} /> Pilot allowed, denied, deactivated, and existing-account paths.</li>
                  <li><CheckCircle2 size={14} /> Verify effective RBAC after provisioning or group changes.</li>
                  <li><CheckCircle2 size={14} /> Preserve a tested break-glass access path before enforcing SSO-only policy.</li>
                </ul>
                <TextLink href={productDocs("guides/identity/configure-oidc")}>
                  Configure identity
                </TextLink>
              </div>
            </article>

            <article>
              <div className="security-control-title">
                <Lock size={22} aria-hidden="true" />
                <div>
                  <span>02 / SECRETS &amp; CRYPTOGRAPHY</span>
                  <h3>Protect encrypted configuration and the keys that unlock it.</h3>
                </div>
              </div>
              <div className="security-control-body">
                <p>
                  Sensitive configuration is stored with authenticated AES-256-GCM encryption.
                  Key rotation and recovery are operational responsibilities: encryption keys must be
                  preserved outside database backups and restored with the data that depends on them.
                </p>
                <ul>
                  <li><CheckCircle2 size={14} /> Use high-entropy session and encryption keys.</li>
                  <li><CheckCircle2 size={14} /> Rotate through the documented keyring procedure.</li>
                  <li><CheckCircle2 size={14} /> Test restore with the required keys before relying on backup recovery.</li>
                </ul>
                <TextLink href={productDocs("operate/security/hardening")}>
                  Review hardening
                </TextLink>
              </div>
            </article>

            <article>
              <div className="security-control-title">
                <UserCheck size={22} aria-hidden="true" />
                <div>
                  <span>03 / AUTHORIZATION &amp; EVIDENCE</span>
                  <h3>Least privilege is an effective-permission question.</h3>
                </div>
              </div>
              <div className="security-control-body">
                <p>
                  Admin, responder, user, and auditor behavior should be validated against the resources
                  each role can actually read or change. Session revocation and audit events provide evidence
                  for access reviews; they do not replace your wider compliance program.
                </p>
                <ul>
                  <li><CheckCircle2 size={14} /> Test the dedicated Auditor role as read-only evidence access.</li>
                  <li><CheckCircle2 size={14} /> Revoke active sessions when identity or access changes require it.</li>
                  <li><CheckCircle2 size={14} /> Export and retain evidence according to your own policy.</li>
                </ul>
                <TextLink href={productDocs("concepts/permissions")}>
                  Review roles &amp; permissions
                </TextLink>
              </div>
            </article>

            <article>
              <div className="security-control-title">
                <Network size={22} aria-hidden="true" />
                <div>
                  <span>04 / NETWORK &amp; OUTBOUND TRUST</span>
                  <h3>Self-hosted does not mean “no egress.”</h3>
                </div>
              </div>
              <div className="security-control-body">
                <p>
                  OpsKnight does not require a vendor-hosted incident control plane, but enabled features
                  can call systems outside the application network. Put PostgreSQL behind private network
                  controls, terminate HTTPS at the supported edge, and allow outbound traffic only to
                  providers your deployment actually uses.
                </p>
                <ul>
                  <li><CheckCircle2 size={14} /> Inventory identity, notification, ChatOps, webhook, and observability destinations.</li>
                  <li><CheckCircle2 size={14} /> Keep platform and PostgreSQL telemetry under operator control; any external observability exporter is an explicit outbound trust boundary.</li>
                  <li><CheckCircle2 size={14} /> Restrict database exposure and review proxy/TLS boundaries.</li>
                  <li><CheckCircle2 size={14} /> Verify provider failures and rate limits without weakening critical-response traffic.</li>
                </ul>
                <TextLink href="/deploy/">
                  Review deployment boundaries
                </TextLink>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Security Capability Documentation Cards */}
      <section className="site-section bg-slate-50 border-y border-slate-200">
        <div className="site-container">
          <div className="max-w-2xl mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Capability Verification
            </span>
            <h2 className="text-xl font-bold text-slate-900 mt-1">Operational Security Modules</h2>
            <p className="text-xs text-slate-600 mt-1">
              Explore documented security implementation details from the v2.0.0 codebase.
            </p>
          </div>

          <div className="security-sections">
            {PRODUCT.security.sections.map((s) => (
              <article key={s.title}>
                <h2>{s.title}</h2>
                <p>{s.description}</p>
                <TextLink href={productDocs(s.docs)}>
                  Explore {s.title.toLowerCase()}
                </TextLink>
              </article>
            ))}
          </div>

          <p className="site-boundary mt-6">
            Compliance framework mappings and evidence tools support your own internal review. They
            do not confer external third-party certification.
          </p>
        </div>
      </section>

      {/* Procurement, Governance & Vendor Assessment */}
      <section className="site-section site-light-alt" id="evaluation">
        <div className="site-container space-y-8">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-wider text-[#d21a1b]">
              Governance &amp; Procurement
            </span>
            <h2 className="text-2xl font-bold text-slate-900 mt-1">
              For security &amp; procurement teams
            </h2>
            <p className="text-sm text-slate-600 mt-2 leading-relaxed">
              Review release policies, supply chain integrity, and deployment responsibilities
              before adopting OpsKnight. Contact the maintainers directly for supplier security
              questionnaires and enterprise support agreements.
            </p>
          </div>

          <div className="security-sections">
            {[
              [
                "Security policy",
                "Private vulnerability reporting channels and coordinated disclosure practices. Rapid review for CVE disclosures.",
                BRAND.links.securityPolicy,
              ],
              [
                "Vulnerability-response process",
                "Structured triage, severity assessment, code remediation, regression testing, and coordinated public release notes.",
                BRAND.links.vulnerabilityResponse,
              ],
              [
                "SBOM & release evidence",
                "Software Bill of Materials (SBOM) and container image provenance attestations generated during release builds.",
                BRAND.links.sbom,
              ],
              [
                "Supported-version policy",
                "Maintenance scope, security patching policies, and release lifecycles across major and minor version tags.",
                BRAND.links.supportedVersions,
              ],
              [
                "Shared responsibility",
                "Clear demarcation of operational duties: host operating system, TLS, and database backups remain customer-owned.",
                BRAND.links.sharedResponsibility,
              ],
              [
                "Software licence",
                `Open-source under ${PRODUCT.release.license}. Commercial use is permitted subject to the licence terms.`,
                BRAND.links.license,
              ],
            ].map(([title, description, href]) => (
              <article key={title}>
                <h3>{title}</h3>
                <p>{description}</p>
                <TextLink href={href}>Read {title.toLowerCase()}</TextLink>
              </article>
            ))}
          </div>

          <div className="paired-links pt-4">
            <TextLink
              href={enquiryHref("OpsKnight supplier and security questionnaire enquiry")}
            >
              Email about your security questionnaire
            </TextLink>
            <TextLink href="/contact/#security">Report a vulnerability privately</TextLink>
            <TextLink href="/support/">Commercial support</TextLink>
          </div>

          <p className="site-boundary">
            These materials support your technical evaluation; they do not assert external compliance
            guarantees. Include your version tag and deployment environment when requesting evidence.
          </p>
        </div>
      </section>

      <FinalCTA />
    </div>
  );
}
