import type { Metadata } from "next";
import Link from "next/link";
import { BRAND } from "@/lib/brand";
import { CopyBlock } from "@/components/brand/CopyBlock";
import { PageToc } from "@/components/common/PageToc";
import { latestDocsHref } from "@/lib/docs/paths";

const title = "Security & Hardening";
const description =
  "Authenticated AES-256-GCM envelope encryption for new protected secrets, timing-safe webhook verification, OIDC SSO, and self-hosted network control in OpsKnight.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/security" },
  openGraph: { title, description, url: "/security" },
};

const ENCRYPTED_FIELDS = [
  {
    provider: "Jira Cloud",
    fields: "apiToken, webhookSecret",
    purpose: "Two-way issue synchronization",
  },
  {
    provider: "SSO / OIDC",
    fields: "clientSecret",
    purpose: "OAuth2/OIDC client secrets",
  },
  {
    provider: "Slack ChatOps",
    fields: "botToken, signingSecret, clientSecret",
    purpose: "War room bot & interactive actions",
  },
  {
    provider: "Twilio",
    fields: "authToken, whatsappAuthToken",
    purpose: "SMS & WhatsApp paging keys",
  },
  {
    provider: "AWS SNS / SES",
    fields: "secretAccessKey",
    purpose: "High-volume delivery credentials",
  },
  {
    provider: "Email (Resend / SendGrid / SMTP)",
    fields: "apiKey, password",
    purpose: "Incident reports & status updates",
  },
  {
    provider: "Web Push",
    fields: "vapidPrivateKey",
    purpose: "Browser push notification keys",
  },
];

const SIGNATURE_PROVIDERS = [
  {
    name: "GitHub",
    header: "x-hub-signature-256",
    algorithm: "HMAC-SHA256",
    format: "sha256=<hex_digest>",
  },
  {
    name: "Slack ChatOps",
    header: "x-slack-signature",
    algorithm: "HMAC-SHA256",
    format: "v0=<hex_digest> (with timestamp)",
  },
  {
    name: "Sentry",
    header: "sentry-hook-signature",
    algorithm: "HMAC-SHA256",
    format: "<hex_digest>",
  },
  {
    name: "Grafana",
    header: "x-grafana-signature",
    algorithm: "HMAC-SHA256",
    format: "<hex_digest>",
  },
  {
    name: "GitLab",
    header: "x-gitlab-token",
    algorithm: "Constant-time token",
    format: "<secret_token>",
  },
  {
    name: "Generic Webhooks",
    header: "x-signature / x-webhook-signature",
    algorithm: "HMAC-SHA256",
    format: "<hex_digest>",
  },
];

const TOC_SECTIONS = [
  { id: "envelope-encryption", title: "Two-Tier Envelope Encryption" },
  { id: "webhook-verification", title: "Inbound Webhook Verification" },
  { id: "identity-sso", title: "Identity, OIDC SSO & Roles" },
  { id: "network-isolation", title: "VPC Network Isolation & Zero Telemetry" },
  { id: "what-this-is-not", title: "What this is not" },
];

const SECURITY_SPECS = [
  { label: "New Secret Writes", value: "AES-256-GCM (V3)" },
  { label: "Master Key", value: "256-bit Hex (Env)" },
  { label: "Ingest Verification", value: "HMAC-SHA256 (Constant-time)" },
  { label: "Anti-Replay Window", value: "300 seconds" },
  { label: "Identity", value: "OIDC SSO + RBAC" },
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
              OpsKnight is self-hosted and does not require an
              OpsKnight-operated SaaS control plane. New protected credential
              writes use authenticated AES-256-GCM envelope encryption, while
              legacy AES-CBC ciphertext remains readable during migration.
              Inbound alert webhooks support constant-time cryptographic
              verification.
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
                  Authenticated Envelope Encryption (AES-256-GCM)
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-[#4b5563]">
                  Supported credentials entered into the Web Console (including
                  Slack bot tokens, SMTP passwords, Twilio keys, and OIDC client
                  secrets) are encrypted before storage. New values use the
                  authenticated V3 envelope format:
                </p>
                <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-[#4b5563]">
                  <li>
                    Configure an ordered{" "}
                    <code className="font-mono text-xs text-[#111827]">
                      ENCRYPTION_KEYS
                    </code>{" "}
                    keyring for controlled rotation, or the legacy single{" "}
                    <code className="font-mono text-xs text-[#111827]">
                      ENCRYPTION_KEY
                    </code>{" "}
                    variable. Keep production keys outside the database.
                  </li>
                  <li>
                    Each secret uses a random Data Encryption Key (DEK).
                    AES-256-GCM authenticates both the protected value and the
                    encrypted DEK with key-ID-bound associated data.
                  </li>
                  <li>
                    New ciphertext is stored as{" "}
                    <code className="font-mono text-xs text-[#111827]">
                      v3:&lt;keyId&gt;:&lt;dekIv&gt;:&lt;encryptedDek&gt;:&lt;dekTag&gt;:&lt;payloadIv&gt;:&lt;encryptedPayload&gt;:&lt;payloadTag&gt;
                    </code>
                    . Existing V1/V2 AES-CBC values remain readable; do not
                    remove their keys until migration and backup recovery are
                    verified.
                  </li>
                </ul>

                <div className="mt-6">
                  <p className="mb-2 text-xs font-medium text-slate-700">
                    Generate a 32-byte (256-bit) master encryption key:
                  </p>
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
                            <td className="px-4 py-2.5 font-sans font-medium text-slate-900">
                              {item.provider}
                            </td>
                            <td className="px-4 py-2.5 text-[#d21a1b]">
                              {item.fields}
                            </td>
                            <td className="px-4 py-2.5 font-sans text-slate-500">
                              {item.purpose}
                            </td>
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
              <div
                id="webhook-verification"
                className="scroll-mt-28 border-t border-slate-200 pt-10"
              >
                <h2 className="text-xl font-semibold text-[#111827]">
                  Inbound Webhook Verification &amp; Anti-Replay
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-[#4b5563]">
                  Supported inbound monitoring integrations validate configured
                  signatures or secret tokens before accepted payloads reach
                  incident-processing logic:
                </p>
                <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-[#4b5563]">
                  <li>
                    <strong>Timing-Safe Equality</strong>: Secret tokens and
                    signatures are evaluated using{" "}
                    <code className="font-mono text-xs text-[#111827]">
                      crypto.timingSafeEqual
                    </code>{" "}
                    with dummy buffer evaluation on length mismatches to
                    eliminate timing side-channel leaks.
                  </li>
                  <li>
                    <strong>Outbound Anti-Replay</strong>: Outbound
                    notifications bind signatures to Unix timestamps (
                    <code className="font-mono text-xs text-[#111827]">
                      X-OpsKnight-Timestamp
                    </code>{" "}
                    +{" "}
                    <code className="font-mono text-xs text-[#111827]">
                      X-OpsKnight-Signature
                    </code>
                    ) with a strict 300-second expiration window.
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
                            <td className="px-4 py-2.5 font-sans font-medium text-slate-900">
                              {p.name}
                            </td>
                            <td className="px-4 py-2.5 text-slate-600">
                              {p.header}
                            </td>
                            <td className="px-4 py-2.5 text-slate-600">
                              {p.algorithm}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                <p className="mt-3">
                  <Link
                    href={latestDocsHref("security/webhook-verification")}
                    className="text-sm font-semibold text-[#d21a1b] hover:underline"
                  >
                    Webhook signature verification docs →
                  </Link>
                </p>
              </div>

              {/* 3. Identity, SSO & RBAC */}
              <div
                id="identity-sso"
                className="scroll-mt-28 border-t border-slate-200 pt-10"
              >
                <h2 className="text-xl font-semibold text-[#111827]">
                  Identity, OIDC SSO &amp; Role Governance
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-[#4b5563]">
                  OpsKnight supports local accounts and OpenID Connect (OIDC)
                  single sign-on with Google Workspace, Okta, Azure AD,
                  Keycloak, and Authentik.
                </p>
                <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-[#4b5563]">
                  <li>
                    <strong>Workspace Roles</strong>:{" "}
                    <code className="font-mono text-xs text-[#111827]">
                      USER
                    </code>{" "}
                    (scoped operations),{" "}
                    <code className="font-mono text-xs text-[#111827]">
                      RESPONDER
                    </code>{" "}
                    (global response),{" "}
                    <code className="font-mono text-xs text-[#111827]">
                      AUDITOR
                    </code>{" "}
                    (organization-wide read access to defined evidence), and{" "}
                    <code className="font-mono text-xs text-[#111827]">
                      ADMIN
                    </code>{" "}
                    (system settings and user governance).
                  </li>
                  <li>
                    <strong>Team Roles</strong>: Independent team-level
                    classification (
                    <code className="font-mono text-xs text-[#111827]">
                      MEMBER
                    </code>
                    ,{" "}
                    <code className="font-mono text-xs text-[#111827]">
                      ADMIN
                    </code>
                    ,{" "}
                    <code className="font-mono text-xs text-[#111827]">
                      OWNER
                    </code>
                    ) with last-owner demotion protection.
                  </li>
                  <li>
                    <strong>Auto-Provisioning &amp; Allowlisting</strong>:
                    Restrict sign-in to verified corporate email domains.
                  </li>
                  <li>
                    <strong>MFA</strong>: OpsKnight does not provide a native
                    server-verified second factor. Enforce MFA through the
                    configured OIDC provider or a trusted access proxy.
                  </li>
                  <li>
                    <strong>SCIM</strong>: The current lifecycle API supports
                    Users, not Groups. SCIM deprovisioning disables access but
                    is not a complete personal-data erasure workflow.
                  </li>
                </ul>
                <p className="mt-3">
                  <Link
                    href={latestDocsHref("security/oidc-setup")}
                    className="text-sm font-semibold text-[#d21a1b] hover:underline"
                  >
                    OIDC SSO configuration guide →
                  </Link>
                </p>
              </div>

              {/* 4. Production Network Isolation */}
              <div
                id="network-isolation"
                className="scroll-mt-28 border-t border-slate-200 pt-10"
              >
                <h2 className="text-xl font-semibold text-[#111827]">
                  VPC Network Isolation &amp; Zero Telemetry
                </h2>
                <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-[#4b5563]">
                  <li>
                    <strong>No built-in analytics beacon</strong>: OpsKnight
                    does not require an OpsKnight-hosted telemetry service.
                    Operators choose and control any monitoring, log shipping,
                    delivery providers, identity providers, and integrations
                    they configure.
                  </li>
                  <li>
                    <strong>Database Isolation</strong>: Keep PostgreSQL (port
                    5432) on private internal container networks or VPC security
                    groups.
                  </li>
                  <li>
                    <strong>TLS Reverse Proxying</strong>: Always terminate TLS
                    at Nginx, Caddy, or an Ingress Controller and forward{" "}
                    <code className="font-mono text-xs text-[#111827]">
                      X-Forwarded-Proto
                    </code>{" "}
                    and{" "}
                    <code className="font-mono text-xs text-[#111827]">
                      X-Forwarded-Host
                    </code>
                    .
                  </li>
                  <li>
                    <strong>Non-Root Containers</strong>: Container images run
                    as unprivileged users, compatible with Kubernetes restricted
                    pod security standards.
                  </li>
                </ul>
              </div>

              {/* 5. What this is not */}
              <div
                id="what-this-is-not"
                className="scroll-mt-28 rounded-[14px] border border-slate-200 bg-white p-6"
              >
                <h2 className="text-lg font-semibold text-[#111827]">
                  What this is not
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-[#4b5563]">
                  There is no OpsKnight-hosted SaaS cloud holding your
                  encryption keys. Losing every key needed by current ciphertext
                  and backups makes protected secrets unrecoverable. Store the
                  complete keyring and deployment secrets in a dedicated secrets
                  manager, separately from database backups. These product
                  capabilities do not certify a deployment as CRA/GDPR
                  compliant, SOC 2 attested, or ISO certified.
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
                  href={latestDocsHref("security")}
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
                  docLink={latestDocsHref("security")}
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
