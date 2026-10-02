import type { Metadata } from "next";
import Link from "next/link";
import { BRAND } from "@/lib/brand";
import { CopyBlock } from "@/components/brand/CopyBlock";
import { PageToc } from "@/components/common/PageToc";
import { latestDocsHref } from "@/lib/docs/paths";

const title = "Security & Hardening";
const description =
  "Cryptographic envelope encryption (AES-256-CBC), timing-safe webhook verification, OIDC SSO, and VPC network isolation in OpsKnight.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/security" },
  openGraph: { title, description, url: "/security" },
};

const ENCRYPTED_FIELDS = [
  { provider: "Jira Cloud", fields: "apiToken, webhookSecret", purpose: "Two-way issue synchronization" },
  { provider: "SSO / OIDC", fields: "clientSecret", purpose: "OAuth2/OIDC client secrets" },
  { provider: "Slack ChatOps", fields: "botToken, signingSecret, clientSecret", purpose: "War room bot & interactive actions" },
  { provider: "Microsoft Teams", fields: "botToken, clientSecret, tenantId", purpose: "Teams war room bot & interactive actions" },
  { provider: "SCIM 2.0", fields: "token (hashed/salted)", purpose: "SCIM directory synchronization token" },
  { provider: "Twilio", fields: "authToken, whatsappAuthToken", purpose: "SMS, WhatsApp & voice paging keys" },
  { provider: "AWS SNS / SES", fields: "secretAccessKey", purpose: "High-volume delivery credentials" },
  { provider: "Email (Resend / SendGrid / SMTP)", fields: "apiKey, password", purpose: "Incident reports & status updates" },
  { provider: "Web Push", fields: "vapidPrivateKey", purpose: "Browser push notification keys" },
];

const SIGNATURE_PROVIDERS = [
  { name: "GitHub", header: "x-hub-signature-256", algorithm: "HMAC-SHA256", format: "sha256=<hex_digest>" },
  { name: "Slack ChatOps", header: "x-slack-signature", algorithm: "HMAC-SHA256", format: "v0=<hex_digest> (with timestamp)" },
  { name: "Microsoft Teams", header: "x-ms-client-principal / HMAC", algorithm: "Azure Bot signed payloads", format: "Bot Framework token" },
  { name: "ManageEngine", header: "x-opsknight-signature", algorithm: "HMAC-SHA256", format: "<hex_digest>" },
  { name: "Sentry", header: "sentry-hook-signature", algorithm: "HMAC-SHA256", format: "<hex_digest>" },
  { name: "Grafana", header: "x-grafana-signature", algorithm: "HMAC-SHA256", format: "<hex_digest>" },
  { name: "GitLab", header: "x-gitlab-token", algorithm: "Constant-time token", format: "<secret_token>" },
  { name: "Generic Webhooks", header: "x-signature / x-webhook-signature", algorithm: "HMAC-SHA256", format: "<hex_digest>" },
];

const TOC_SECTIONS = [
  { id: "envelope-encryption", title: "Two-Tier Envelope Encryption" },
  { id: "webhook-verification", title: "Inbound Webhook Verification" },
  { id: "identity-sso", title: "Identity, OIDC SSO & Roles" },
  { id: "network-isolation", title: "VPC Network Isolation & Zero Telemetry" },
  { id: "what-this-is-not", title: "What this is not" },
];

const SECURITY_SPECS = [
  { label: "Storage Cipher", value: "AES-256-CBC (V2)" },
  { label: "Master Key", value: "256-bit Hex (Env)" },
  { label: "Ingest Verification", value: "HMAC-SHA256 (Constant-time)" },
  { label: "Anti-Replay Window", value: "300 seconds" },
  { label: "Identity", value: "OIDC SSO + SCIM 2.0 + RBAC (incl. Auditor)" },
  { label: "External Telemetry", value: "None (0 beacons)" },
];

export default function SecurityPage() {
  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* Header */}
      <section className="border-b border-slate-200 pt-28 pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="mb-3 font-mono text-[11px] font-medium tracking-wide text-slate-500">
              Security · {BRAND.version} · {BRAND.license}
            </p>
            <h1 className="text-3xl font-semibold tracking-tight text-[#111827] sm:text-5xl sm:leading-[1.12]">
              Incident data and credentials stay on your network.
            </h1>
            <p className="mt-5 text-base leading-relaxed text-[#4b5563] sm:text-lg">
              OpsKnight operates on a fail-closed, zero-trust security model. There is no external cloud, no telemetry beacons, and no vendor phone-home. Operational credentials are encrypted at rest with AES-256-CBC envelope encryption, and inbound alert webhooks are authenticated with constant-time cryptographic verification.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Layout with Sticky Right Rail */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_18rem] xl:grid-cols-[minmax(0,1fr)_20rem]">
            
            {/* Main Content Column */}
            <article className="min-w-0 space-y-12 max-w-3xl">
              
              {/* 1. Envelope Encryption */}
              <div id="envelope-encryption" className="scroll-mt-28">
                <h2 className="text-xl font-semibold text-[#111827]">
                  Two-Tier Envelope Encryption (AES-256-CBC)
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-[#4b5563]">
                  Credentials entered into the Web Console (Slack bot tokens, SMTP passwords, Twilio keys, OIDC client secrets) are encrypted before touching PostgreSQL. OpsKnight uses a two-tier Envelope Encryption model (V2):
                </p>
                <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-[#4b5563]">
                  <li>
                    The master key is configured strictly through the <code className="font-mono text-xs text-[#111827]">ENCRYPTION_KEY</code> environment variable (never stored in the database).
                  </li>
                  <li>
                    Each secret is encrypted with a unique, dynamically generated Data Encryption Key (DEK).
                  </li>
                  <li>
                    Ciphertext is stored as <code className="font-mono text-xs text-[#111827]">v2:&lt;dekIv&gt;:&lt;encryptedDek&gt;:&lt;payloadIv&gt;:&lt;encryptedPayload&gt;</code>.
                  </li>
                </ul>

                <div className="mt-6">
                  <p className="mb-2 text-xs font-medium text-slate-700">Generate a 32-byte (256-bit) master encryption key:</p>
                  <CopyBlock label="bash" value="openssl rand -hex 32" />
                </div>

                <div className="mt-6 overflow-hidden rounded-[14px] border border-slate-200 bg-white">
                  <div className="border-b border-slate-200 bg-slate-50 px-4 py-2.5">
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-600 font-mono">
                      Fields Encrypted at Rest in PostgreSQL
                    </h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="border-b border-slate-200 bg-slate-50/50 font-mono text-[11px] text-slate-500">
                        <tr>
                          <th className="px-4 py-2.5">Provider / Subsystem</th>
                          <th className="px-4 py-2.5">Encrypted Field(s)</th>
                          <th className="px-4 py-2.5">Purpose</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 font-mono text-slate-700">
                        {ENCRYPTED_FIELDS.map((item) => (
                          <tr key={item.provider}>
                            <td className="px-4 py-2.5 font-sans font-medium text-slate-900">{item.provider}</td>
                            <td className="px-4 py-2.5 text-[#d21a1b]">{item.fields}</td>
                            <td className="px-4 py-2.5 font-sans text-slate-500">{item.purpose}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                <p className="mt-3">
                  <Link
                    href={latestDocsHref("security/encryption")}
                    className="text-sm font-semibold text-[#d21a1b] hover:underline"
                  >
                    Envelope encryption &amp; key rotation docs →
                  </Link>
                </p>
              </div>

              {/* 2. Webhook Verification */}
              <div id="webhook-verification" className="scroll-mt-28 border-t border-slate-200 pt-10">
                <h2 className="text-xl font-semibold text-[#111827]">
                  Inbound Webhook Verification &amp; Anti-Replay
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-[#4b5563]">
                  Every inbound monitoring integration route enforces cryptographic authentication before payloads reach incident business logic:
                </p>
                <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-[#4b5563]">
                  <li>
                    <strong>Timing-Safe Equality</strong>: Secret tokens and signatures are evaluated using <code className="font-mono text-xs text-[#111827]">crypto.timingSafeEqual</code> with dummy buffer evaluation on length mismatches to eliminate timing side-channel leaks.
                  </li>
                  <li>
                    <strong>Outbound Anti-Replay</strong>: Outbound notifications bind signatures to Unix timestamps (<code className="font-mono text-xs text-[#111827]">X-OpsKnight-Timestamp</code> + <code className="font-mono text-xs text-[#111827]">X-OpsKnight-Signature</code>) with a strict 300-second expiration window.
                  </li>
                </ul>

                <div className="mt-6 overflow-hidden rounded-[14px] border border-slate-200 bg-white">
                  <div className="border-b border-slate-200 bg-slate-50 px-4 py-2.5">
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-600 font-mono">
                      Supported Inbound Signature Verifiers
                    </h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="border-b border-slate-200 bg-slate-50/50 font-mono text-[11px] text-slate-500">
                        <tr>
                          <th className="px-4 py-2.5">Provider</th>
                          <th className="px-4 py-2.5">Signature Header</th>
                          <th className="px-4 py-2.5">Algorithm</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 font-mono text-slate-700">
                        {SIGNATURE_PROVIDERS.map((p) => (
                          <tr key={p.name}>
                            <td className="px-4 py-2.5 font-sans font-medium text-slate-900">{p.name}</td>
                            <td className="px-4 py-2.5 text-slate-600">{p.header}</td>
                            <td className="px-4 py-2.5 text-slate-600">{p.algorithm}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                <p className="mt-3">
                  <Link
                    href={latestDocsHref("operate/security/hardening")}
                    className="text-sm font-semibold text-[#d21a1b] hover:underline"
                  >
                    Webhook signature verification docs →
                  </Link>
                </p>
              </div>

              {/* 3. Identity, SSO & RBAC */}
              <div id="identity-sso" className="scroll-mt-28 border-t border-slate-200 pt-10">
                <h2 className="text-xl font-semibold text-[#111827]">
                  Identity, OIDC SSO &amp; Role Governance
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-[#4b5563]">
                  OpsKnight supports local accounts and OpenID Connect (OIDC) single sign-on with Google Workspace, Okta, Azure AD, Keycloak, and Authentik.
                </p>
                <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-[#4b5563]">
                  <li>
                    <strong>Workspace Roles</strong>: <code className="font-mono text-xs text-[#111827]">USER</code> (scoped to assigned teams/services), <code className="font-mono text-xs text-[#111827]">RESPONDER</code> (global response), <code className="font-mono text-xs text-[#111827]">AUDITOR</code> (read-oriented compliance &amp; session registry inspection), and <code className="font-mono text-xs text-[#111827]">ADMIN</code> (system settings and user governance).
                  </li>
                  <li>
                    <strong>SCIM 2.0 Provisioning</strong>: Inbound Users &amp; Groups synchronization with bearer token rotation, PATCH operations, and auto-deprovisioning.
                  </li>
                  <li>
                    <strong>Team Roles</strong>: Independent team-level classification (<code className="font-mono text-xs text-[#111827]">MEMBER</code>, <code className="font-mono text-xs text-[#111827]">ADMIN</code>, <code className="font-mono text-xs text-[#111827]">OWNER</code>) with last-owner demotion protection.
                  </li>
                  <li>
                    <strong>Auto-Provisioning &amp; Allowlisting</strong>: Restrict sign-in to verified corporate email domains and map OIDC claims to workspace roles.
                  </li>
                </ul>
                <p className="mt-3">
                  <Link
                    href={latestDocsHref("operate/security/sso-oidc")}
                    className="text-sm font-semibold text-[#d21a1b] hover:underline"
                  >
                    OIDC SSO &amp; SCIM configuration guide →
                  </Link>
                </p>
              </div>

              {/* 4. Production Network Isolation */}
              <div id="network-isolation" className="scroll-mt-28 border-t border-slate-200 pt-10">
                <h2 className="text-xl font-semibold text-[#111827]">
                  VPC Network Isolation &amp; Zero Telemetry
                </h2>
                <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-[#4b5563]">
                  <li>
                    <strong>Zero External Telemetry</strong>: No Google Analytics, no PostHog, no Sentry phone-home, no tracking pixels. All logs and audit trails remain in your PostgreSQL database.
                  </li>
                  <li>
                    <strong>Database Isolation</strong>: Keep PostgreSQL (port 5432) on private internal container networks or VPC security groups.
                  </li>
                  <li>
                    <strong>TLS Reverse Proxying</strong>: Always terminate TLS at Nginx, Caddy, or an Ingress Controller and forward <code className="font-mono text-xs text-[#111827]">X-Forwarded-Proto</code> and <code className="font-mono text-xs text-[#111827]">X-Forwarded-Host</code>.
                  </li>
                  <li>
                    <strong>Non-Root Containers</strong>: Container images run as unprivileged users, compatible with Kubernetes restricted pod security standards.
                  </li>
                </ul>
              </div>

              {/* 5. What this is not */}
              <div id="what-this-is-not" className="scroll-mt-28 rounded-[14px] border border-slate-200 bg-white p-6">
                <h2 className="text-lg font-semibold text-[#111827]">What this is not</h2>
                <p className="mt-3 text-sm leading-relaxed text-[#4b5563]">
                  There is no hosted SaaS cloud holding your encryption keys. If you lose your <code className="font-mono text-xs text-[#111827]">ENCRYPTION_KEY</code>, encrypted secrets cannot be recovered. Always store backups of your environment secrets in a dedicated secrets manager (AWS Secrets Manager, HashiCorp Vault, GCP Secret Manager).
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-4">
                <Link
                  href="/install"
                  className="inline-flex h-11 items-center rounded-[12px] bg-[#d21a1b] px-6 text-sm font-semibold text-white hover:bg-[#b41516]"
                >
                  Deploy OpsKnight
                </Link>
                <Link
                  href={latestDocsHref("operate/security/hardening")}
                  className="text-sm font-semibold text-[#d21a1b] hover:underline"
                >
                  Full security documentation
                </Link>
              </div>

            </article>

            {/* Sticky Right Rail on Large Screens */}
            <aside className="hidden lg:block">
              <div className="sticky top-24 pl-4 border-l border-slate-200/80">
                <PageToc
                  sections={TOC_SECTIONS}
                  specs={SECURITY_SPECS}
                  quickCommand="openssl rand -hex 32"
                  quickCommandLabel="Keygen 1-Liner"
                  docLink={latestDocsHref("operate/security/hardening")}
                  docLinkLabel="Security Reference Docs"
                />
              </div>
            </aside>

          </div>
        </div>
      </section>
    </div>
  );
}
