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
  title: "Security, Identity & Compliance Architecture — OpsKnight",
  description:
    "OpsKnight security architecture: self-hosted custody, OIDC PKCE, SCIM 2.0 user lifecycle, AES-256-GCM encryption, immutable audit trails, and zero external telemetry beacons.",
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
            <span className="signal-dot" /> SECURITY &amp; COMPLIANCE ARCHITECTURE
          </p>
          <h1>
            Your infrastructure.
            <br />
            Your users. Your keys.
          </h1>
          <p className="site-description">
            Keep the incident management plane self-hosted. Connect enterprise identity via OIDC
            and SCIM 2.0, enforce role-based access with dedicated auditor privileges, encrypt credentials
            at rest with AES-256-GCM, and inspect comprehensive audit logs with zero external telemetry.
          </p>
          <div className="site-actions">
            <Action href={productDocs("operate/security/hardening")}>Read the Hardening Guide</Action>
            <Action href="#evaluator-breakdown" secondary>
              Technical Architecture
            </Action>
          </div>
        </div>
      </section>

      {/* Technical Evaluator Architectural Pillars */}
      <section id="evaluator-breakdown" className="site-section">
        <div className="site-container space-y-12">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-wider text-[#d21a1b]">
              Technical Evaluator Deep-Dive
            </span>
            <h2 className="text-2xl font-bold text-slate-900 mt-1">
              Engineered for Enterprise Defense-in-Depth
            </h2>
            <p className="text-sm text-slate-600 mt-2 leading-relaxed">
              Security in OpsKnight is rooted in architectural boundaries. By self-hosting on your own
              VPC or bare metal, incident details, vulnerability discussions, and infrastructure
              topologies never traverse multi-tenant SaaS environments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Identity & Access */}
            <div className="rounded-[16px] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="rounded-lg bg-red-100 p-2 text-[#d21a1b]">
                  <KeyRound size={20} />
                </div>
                <h3 className="text-base font-bold text-slate-900">
                  Identity &amp; Automated Lifecycle (OIDC + SCIM 2.0)
                </h3>
              </div>
              <p className="text-xs leading-relaxed text-slate-600 mb-4">
                Integrate with your central identity provider (Okta, Microsoft Entra ID, Google
                Workspace, Keycloak) using standard OpenID Connect with PKCE authorization code flow.
                SCIM 2.0 endpoints automate user provisioning, group mapping, and instant de-provisioning.
              </p>
              <ul className="space-y-2 text-xs text-slate-700 mb-4">
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />
                  <span>OIDC PKCE with signed state verification and session binding</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />
                  <span>SCIM 2.0 user &amp; group push with automated role assignment</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />
                  <span>Central administrator revocation of active signed-in sessions</span>
                </li>
              </ul>
              <TextLink href={productDocs("guides/identity/configure-oidc")}>
                Configure OIDC documentation ↗
              </TextLink>
            </div>

            {/* Cryptography & Data at Rest */}
            <div className="rounded-[16px] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="rounded-lg bg-red-100 p-2 text-[#d21a1b]">
                  <Lock size={20} />
                </div>
                <h3 className="text-base font-bold text-slate-900">
                  Authenticated Cryptography (AES-256-GCM)
                </h3>
              </div>
              <p className="text-xs leading-relaxed text-slate-600 mb-4">
                Sensitive third-party credentials—including Twilio auth tokens, Slack bot tokens, and
                webhook signing secrets—are encrypted before database insertion using authenticated
                AES-256-GCM encryption with unique per-record initialization vectors (IV).
              </p>
              <ul className="space-y-2 text-xs text-slate-700 mb-4">
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />
                  <span>AES-256-GCM at rest with Galois message authentication tag verification</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />
                  <span>Dual-key keyring rotation supported via <code>ENCRYPTION_KEYS</code></span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />
                  <span>Zero plain-text credential persistence in logs or database tables</span>
                </li>
              </ul>
              <TextLink href={productDocs("operate/security/hardening")}>
                Security hardening guide ↗
              </TextLink>
            </div>

            {/* Granular RBAC & Auditor Role */}
            <div className="rounded-[16px] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="rounded-lg bg-red-100 p-2 text-[#d21a1b]">
                  <UserCheck size={20} />
                </div>
                <h3 className="text-base font-bold text-slate-900">
                  Granular RBAC &amp; Dedicated Auditor Role
                </h3>
              </div>
              <p className="text-xs leading-relaxed text-slate-600 mb-4">
                Enforce least-privilege access across your engineering organization. In addition to
                Admin and Responder roles, OpsKnight includes a dedicated read-only <strong>Auditor</strong> role
                designed specifically for internal compliance, security, and external audit teams.
              </p>
              <ul className="space-y-2 text-xs text-slate-700 mb-4">
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />
                  <span>Auditor role: view incidents, schedules, and audit trails without modify rights</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />
                  <span>Scoped service permissions: isolate team paging schedules and alert routing</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />
                  <span>API token scoping: generate narrow-scope tokens for specific automation jobs</span>
                </li>
              </ul>
              <TextLink href={productDocs("concepts/permissions")}>
                Permission concepts &amp; roles ↗
              </TextLink>
            </div>

            {/* Network Isolation & Zero External Beacons */}
            <div className="rounded-[16px] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="rounded-lg bg-red-100 p-2 text-[#d21a1b]">
                  <Network size={20} />
                </div>
                <h3 className="text-base font-bold text-slate-900">
                  Network Isolation &amp; Zero External Telemetry
                </h3>
              </div>
              <p className="text-xs leading-relaxed text-slate-600 mb-4">
                OpsKnight respects strict air-gap and private VPC requirements. The binary executes
                with <strong>zero outbound phone-home telemetry</strong>, license validation pings, or usage
                tracking beacons to OpsKnight servers.
              </p>
              <ul className="space-y-2 text-xs text-slate-700 mb-4">
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />
                  <span>0 phone-home beacons, 0 analytics scripts, 0 third-party cookies</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />
                  <span>Egress restricted exclusively to your configured notification providers</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />
                  <span>Runs entirely inside private subnets with internal PostgreSQL clustering</span>
                </li>
              </ul>
              <TextLink href="/deploy/architecture/">Explore runtime network model ↗</TextLink>
            </div>
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
                `${PRODUCT.release.tag} is distributed under ${PRODUCT.release.license}. Complete commercial freedom with source code auditability.`,
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
            <TextLink href="/support/">Enterprise commercial support</TextLink>
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
