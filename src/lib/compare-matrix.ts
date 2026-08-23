import { BRAND } from "@/lib/brand";

/**
 * Compare matrix for OpsKnight v1.4.0 vs common on-call products.
 *
 * As of 23 Aug 2026. OpsKnight cells: v1.4.0 app + docs/v1.4.
 * Other cells: vendor documentation and public pricing pages cited in
 * COMPARE_SOURCE_LINKS — not placeholders, not a paid feature audit of every plan.
 */

export type CompareVendorId =
  | "opsknight"
  | "pagerduty"
  | "incidentio"
  | "opsgenie"
  | "squadcast"
  | "splunk"
  | "grafana";

export type CompareCell = boolean | string;

export const COMPARE_AS_OF = "23 Aug 2026";

export const COMPARE_VENDORS: {
  id: CompareVendorId;
  label: string;
  highlight?: boolean;
}[] = [
  { id: "opsknight", label: BRAND.name, highlight: true },
  { id: "pagerduty", label: "PagerDuty" },
  { id: "incidentio", label: "incident.io" },
  { id: "opsgenie", label: "Opsgenie" },
  { id: "squadcast", label: "Squadcast" },
  { id: "splunk", label: "Splunk On-Call" },
  { id: "grafana", label: "Grafana Cloud IRM" },
];

export type CompareRow = {
  feature: string;
  source?: string;
  values: Record<CompareVendorId, CompareCell>;
};

export type CompareSection = {
  title: string;
  rows: CompareRow[];
};

export const COMPARE_SOURCE_LINKS: { label: string; href: string }[] = [
  { label: "PagerDuty notification rules", href: "https://support.pagerduty.com/main/docs/notification-rules" },
  { label: "PagerDuty contact methods", href: "https://support.pagerduty.com/main/docs/contact-information" },
  { label: "PagerDuty Microsoft Teams", href: "https://support.pagerduty.com/main/docs/microsoft-teams" },
  { label: "PagerDuty Slack", href: "https://www.pagerduty.com/integrations/slack/" },
  { label: "PagerDuty Status Pages", href: "https://support.pagerduty.com/main/docs/status-pages-overview" },
  { label: "PagerDuty Jira Cloud", href: "https://support.pagerduty.com/main/docs/jira-cloud" },
  { label: "PagerDuty SSO (SAML 2.0)", href: "https://support.pagerduty.com/main/docs/sso" },
  { label: "incident.io pricing", href: "https://incident.io/pricing" },
  { label: "incident.io on-call notifications", href: "https://docs.incident.io/on-call/notifications" },
  { label: "incident.io SAML SSO", href: "https://docs.incident.io/admin/saml-sso" },
  { label: "incident.io status pages", href: "https://docs.incident.io/status-pages/overview" },
  { label: "incident.io Jira", href: "https://docs.incident.io/integrations/jira" },
  { label: "Atlassian Opsgenie migration / EOL", href: "https://www.atlassian.com/software/opsgenie/migration" },
  { label: "Opsgenie Microsoft Teams", href: "https://support.atlassian.com/opsgenie/docs/integrate-opsgenie-with-microsoft-teams/" },
  { label: "Opsgenie + Statuspage", href: "https://support.atlassian.com/opsgenie/docs/integrate-opsgenie-with-statuspage/" },
  { label: "Squadcast pricing", href: "https://www.squadcast.com/pricing" },
  { label: "Squadcast notifications", href: "https://support.incidents.cloud.solarwinds.com/notifications/understanding-incident-notifications" },
  { label: "Squadcast Slack", href: "https://www.squadcast.com/integrations/slack" },
  { label: "Squadcast Microsoft Teams", href: "https://www.squadcast.com/integrations/microsoft-teams" },
  { label: "Squadcast Jira Cloud", href: "https://www.squadcast.com/integrations/jira-cloud" },
  { label: "Splunk On-Call notifications", href: "https://help.splunk.com/en/splunk-cloud-platform/alert-and-respond/splunk-on-call/notifications" },
  { label: "Splunk On-Call Slack", href: "https://help.splunk.com/en/splunk-enterprise/alert-and-respond/splunk-on-call/integrations-with-splunk-on-call/slack-integration-for-splunk-on-call" },
  { label: "Splunk On-Call Microsoft Teams", href: "https://docs.splunk.com/observability/en/sp-oncall/spoc-integrations/microsoft-teams-integration-guide.html" },
  { label: "Grafana OnCall OSS archive", href: "https://grafana.com/docs/oncall/latest/set-up/open-source/" },
  { label: "Grafana Cloud IRM", href: "https://grafana.com/products/cloud/irm/" },
  { label: "Grafana IRM notifications", href: "https://grafana.com/docs/grafana-cloud/alerting-and-irm/irm/manage/notifications/" },
  { label: "Grafana IRM Microsoft Teams", href: "https://grafana.com/docs/grafana-cloud/observe-and-act/respond-to-incidents/integrations/chat-and-collaboration/ms-teams/" },
  { label: "Grafana IRM mobile app", href: "https://grafana.com/docs/grafana-cloud/alerting-and-irm/irm/mobile-app/" },
];

export const COMPARE_SECTIONS: CompareSection[] = [
  {
    title: "How you run it",
    rows: [
      {
        feature: "Deployment",
        source: "OpsKnight: Compose/Helm. Others: vendor product model as of Aug 2026.",
        values: {
          opsknight: "Self-hosted (your VPC)",
          pagerduty: "Vendor SaaS",
          incidentio: "Vendor SaaS (GCP)",
          opsgenie: "Vendor SaaS (Atlassian Cloud)",
          squadcast: "Vendor SaaS (SolarWinds Incident Response)",
          splunk: "Vendor SaaS (Splunk Observability)",
          grafana: "Grafana Cloud SaaS (current product)",
        },
      },
      {
        feature: "Software license",
        source: "OpsKnight LICENSE Apache-2.0. Grafana OnCall OSS was AGPLv3; that repo is archived.",
        values: {
          opsknight: "Apache-2.0",
          pagerduty: "Proprietary",
          incidentio: "Proprietary",
          opsgenie: "Proprietary",
          squadcast: "Proprietary",
          splunk: "Proprietary",
          grafana: "Cloud: proprietary. Archived OSS OnCall: AGPLv3",
        },
      },
      {
        feature: "User pricing model",
        source: "Public list pages as of 20 Aug 2026.",
        values: {
          opsknight: "$0 software; unlimited users in the product",
          pagerduty: "Professional $25/user/mo or $21 annual (pagerduty.com/pricing). Business/Enterprise not extracted as a single number here; add-ons extra",
          incidentio: "Per seat: Responder + optional On-call. Team from $15/user/mo annual; On-call +$10. Pro $25 + $20 On-call",
          opsgenie: "No new sales. Existing per-user Cloud. Features moving to JSM. Support ends 5 Apr 2027",
          squadcast: "Per user. Pro from $15/user/mo annual; Premium from $24 (squadcast.com/pricing)",
          splunk: "Public starting SKU $5/user/mo annual, up to 10 seats; larger is sales",
          grafana: "Cloud IRM: $19/mo platform includes 3 active users, then $20/extra (IRM product page)",
        },
      },
      {
        feature: "Incident data location",
        values: {
          opsknight: "Your Postgres / VPC",
          pagerduty: "PagerDuty cloud",
          incidentio: "Vendor cloud",
          opsgenie: "Atlassian cloud",
          squadcast: "Vendor cloud (data-residency options on higher plans)",
          splunk: "Splunk cloud",
          grafana: "Grafana Cloud region you choose",
        },
      },
      {
        feature: "Product standing (Aug 2026)",
        source: "Atlassian Opsgenie migration page; Grafana OnCall OSS docs archive date 24 Mar 2026.",
        values: {
          opsknight: `Ships ${BRAND.version}`,
          pagerduty: "Actively sold",
          incidentio: "Actively sold",
          opsgenie: "Standalone: no new purchases; EOL 5 Apr 2027 → Jira Service Management",
          squadcast: "Actively sold (SolarWinds Incident Response)",
          splunk: "Actively sold",
          grafana: "OnCall OSS archived 24 Mar 2026 (Cloud Connection for SMS/push/voice ended). Current: Grafana Cloud IRM",
        },
      },
    ],
  },
  {
    title: "Incident response",
    rows: [
      {
        feature: "Incident lifecycle",
        source: "OpsKnight Prisma IncidentStatus. Others: core incident/alert products.",
        values: {
          opsknight: "Open, ack, snooze, suppress, resolve",
          pagerduty: "Triggered, acknowledged, resolved (plus snooze / reassign)",
          incidentio: "Declare → roles, updates, resolve (Slack/Teams-native)",
          opsgenie: "Alert ack / close / snooze; incident module on higher plans",
          squadcast: "Triggered, ack, reassign, resolve",
          splunk: "Triggered, ack, snooze, reroute, resolve",
          grafana: "Alert groups + incidents in Cloud IRM",
        },
      },
      {
        feature: "On-call schedules",
        source: "OpsKnight layers/overrides. Others: documented schedule products.",
        values: {
          opsknight: "Layers, rotations, overrides, timezones",
          pagerduty: "Schedules, layers, overrides",
          incidentio: "Schedules, cover, holidays, shadows",
          opsgenie: "Schedules and routing rules",
          squadcast: "Schedules and escalations",
          splunk: "Teams, rotations, paging policies",
          grafana: "Schedules, shifts, swaps (IRM + mobile)",
        },
      },
      {
        feature: "Escalation policies",
        values: {
          opsknight: "Steps: user, schedule, or team",
          pagerduty: true,
          incidentio: true,
          opsgenie: true,
          squadcast: true,
          splunk: true,
          grafana: "Escalation chains",
        },
      },
      {
        feature: "Outbound paging channels",
        source: "OpsKnight NotificationChannel enum + docs. Vendor contact-method docs.",
        values: {
          opsknight: "Email, SMS (Twilio or AWS SNS), push, Slack, WhatsApp (Twilio), webhook. No voice",
          pagerduty: "Push, phone, SMS, email, Slack; WhatsApp in Early Access",
          incidentio: "Mobile app, phone, SMS, Slack, email, WhatsApp (WhatsApp not on Basic)",
          opsgenie: "Push, email, SMS, voice (plan caps); Slack and Teams apps",
          squadcast: "Push, email, SMS, voice (SMS/voice caps on Pro; unlimited Premium+)",
          splunk: "Push, SMS, phone, email; WhatsApp available in paging policy",
          grafana: "IRM: mobile push, Slack, Teams, Telegram, SMS, phone, email",
        },
      },
      {
        feature: "Native voice / phone calls",
        source: "OpsKnight has no VOICE channel. Others: notification/contact docs.",
        values: {
          opsknight: false,
          pagerduty: "Yes — phone contact method",
          incidentio: "Yes — phone escalations; live call routing on Pro/Enterprise",
          opsgenie: "Yes — voice (not on Free; unlimited Standard/Enterprise historically)",
          squadcast: "Yes — phone calls",
          splunk: "Yes — phone paging (ack/resolve via keypad)",
          grafana: "Yes on Cloud IRM. OSS Cloud Connection for calls ended 24 Mar 2026",
        },
      },
      {
        feature: "Slack ChatOps war rooms",
        source: "OpsKnight Slack OAuth war rooms from v1.2. Vendor Slack apps.",
        values: {
          opsknight: "Channel per incident; ack/assign/resolve from Slack",
          pagerduty: "Slack app: dedicated incident channels, ack/resolve, conference bridge",
          incidentio: "Core product: /inc, auto channel, timeline in Slack",
          opsgenie: "Slack app: bidirectional alert actions",
          squadcast: "Slack app: war rooms; ack/reassign/resolve; postmortems from channel",
          splunk: "Slack app: cards to ack/reroute/resolve/snooze; channel mapping",
          grafana: "IRM Slack app: notifications and incident ChatOps (successor to OnCall Slack)",
        },
      },
      {
        feature: "Microsoft Teams ChatOps",
        source: "OpsKnight: outgoing webhook formatter only. Others: published Teams apps.",
        values: {
          opsknight: "Outgoing webhook payload only — no Teams app",
          pagerduty: "Native Teams app: channel cards, ack/resolve, service mapping",
          incidentio: "Native Teams app (Pro/Enterprise): dedicated channel, lifecycle in Teams",
          opsgenie: "Teams V2 integration: ack/close/snooze from channel",
          squadcast: "Native Teams app: incident channels; ack/reassign/resolve",
          splunk: "VictorOps Teams app: bi-directional ack/resolve/snooze; optional per-incident channels",
          grafana: "IRM Teams app: alert cards + incident bot (threads, tasks, notes)",
        },
      },
      {
        feature: "Video bridge on incident",
        source: "OpsKnight: Jitsi generator + Zoom/Meet URL templates. Vendor collab docs.",
        values: {
          opsknight: "Jitsi; Zoom/Meet via URL template",
          pagerduty: "Zoom integration + stored conference bridges from Slack",
          incidentio: "Workflows can create Zoom; call transcription in product",
          opsgenie: "Zoom / conference integrations in directory (not a built-in Jitsi)",
          squadcast: "Incident communication channels (Zoom/Meet/Jitsi as configured)",
          splunk: "War-room automation (bring your conference tool)",
          grafana: "IRM `incident talk` — find an online discussion place",
        },
      },
      {
        feature: "Postmortems + action items",
        source: "OpsKnight Postmortem + ActionItem models. Vendor PIR docs.",
        values: {
          opsknight: "You write from the timeline; no model-generated report",
          pagerduty: "Post-incident review / timeline tools (plus add-on AI products)",
          incidentio: "Post-incident process + AI draft from timeline (plan-dependent)",
          opsgenie: "Incident notes; typical PIR in Confluence / JSM, not a first-class Opsgenie writer",
          squadcast: "Postmortem templates and action items (deeper on Premium+)",
          splunk: "Post-incident reviews in the product",
          grafana: "Cloud IRM can auto-create PIR documents",
        },
      },
      {
        feature: "Status page",
        source: "OpsKnight: one page per install. PD Status Pages overview. incident.io status-pages docs. Atlassian Statuspage is a separate SKU.",
        values: {
          opsknight: "Included: one public/private page, custom domain, subscribers",
          pagerduty: "Internal / external / private Status Pages (plan-gated; custom domain on external)",
          incidentio: "Included: public, internal, customer pages (counts by plan); custom domain",
          opsgenie: "Not a full status product — pair with Atlassian Statuspage (separate)",
          squadcast: "Status pages included from Premium (public/private; not a Pro-line item)",
          splunk: "No first-party customer status page; use a third-party page",
          grafana: "No IRM-native public status page; Statuspage / Grafana Cloud status integrations",
        },
      },
      {
        feature: "MTTA / MTTR / SLA",
        source: "OpsKnight SLADefinition. PD Analytics API. Others: reporting products.",
        values: {
          opsknight: "MTTA/MTTR and SLA definitions in-app",
          pagerduty: "Analytics API and Insights (MTTA/MTTR; daily rollup)",
          incidentio: "Insights / trends in the product",
          opsgenie: "Reporting on paid plans",
          squadcast: "Analytics; SLO tracker on Premium+",
          splunk: "MTTA/MTTR reports in product",
          grafana: "IRM reporting inside Grafana Cloud",
        },
      },
      {
        feature: "Mobile",
        source: "OpsKnight: PWA only. Vendor App Store / Play apps.",
        values: {
          opsknight: "Installable PWA (push, biometrics). No App Store listing",
          pagerduty: "iOS and Android apps",
          incidentio: "iOS and Android apps (On-call seat for paging on mobile)",
          opsgenie: "iOS and Android apps",
          squadcast: "iOS and Android apps",
          splunk: "iOS and Android apps",
          grafana: "Grafana IRM iOS and Android (Cloud). OSS push relay ended 24 Mar 2026",
        },
      },
    ],
  },
  {
    title: "Integrations & platform",
    rows: [
      {
        feature: "Inbound monitoring webhooks",
        source: `OpsKnight docs v1.4 catalog: ${BRAND.integrationCountLabel} native parsers. Others: vendor directories — counts change; we do not copy a marketing number we did not count.`,
        values: {
          opsknight: `${BRAND.integrationCountLabel} native parsers + generic JSON`,
          pagerduty: "Events API v2 + large integration directory",
          incidentio: "Alert sources catalog (Datadog, Grafana, etc.)",
          opsgenie: "Large integration directory (historically 200+ listed)",
          squadcast: "Service webhooks + integration directory (own payload, not PD v2)",
          splunk: "REST + third-party integrations",
          grafana: "Alertmanager, Grafana Alerting, webhooks, IRM integration catalog",
        },
      },
      {
        feature: "PagerDuty Events API v2 ingest",
        source: "OpsKnight docs: POST /api/integrations/pagerduty/v2/enqueue. PD: events.pagerduty.com/v2/enqueue. Others ingest their own formats or run a migrator.",
        values: {
          opsknight: "Yes — ingest adapter (routing_key payload). Not a PD clone",
          pagerduty: "Native Events API v2",
          incidentio: "No Events API v2 ingest adapter. Can sit alongside PD or replace it",
          opsgenie: "Own API / migrators — not Events API v2 ingest",
          squadcast: "Migrator tool; incoming webhooks use Squadcast JSON, not PD enqueue",
          splunk: "Own REST / integrations — not Events API v2 ingest",
          grafana: "Migrators from PD exist; IRM ingest is not PD /v2/enqueue",
        },
      },
      {
        feature: "Jira Cloud",
        source: "OpsKnight v1.4 bi-directional sync. Vendor Jira integration guides.",
        values: {
          opsknight: "Bi-directional issue sync",
          pagerduty: "Bidirectional Jira Cloud extension (status + notes mapping)",
          incidentio: "Follow-ups export + optional incident tickets; status sync is limited (docs)",
          opsgenie: "Built-in Jira / JSM (same Atlassian family)",
          squadcast: "Bidirectional Jira Cloud extension",
          splunk: "Jira Cloud / Server add-ons and webhooks",
          grafana: "Jira in IRM ITSM integrations (issue workflows)",
        },
      },
      {
        feature: "REST API keys",
        values: {
          opsknight: true,
          pagerduty: "REST API + Events API keys",
          incidentio: "API tokens",
          opsgenie: "REST API keys",
          squadcast: "API keys",
          splunk: "API ID + API key",
          grafana: "Grafana service accounts / IRM API",
        },
      },
      {
        feature: "SSO",
        source: "OpsKnight v1.4: OIDC only, no SAML. Vendor SSO docs.",
        values: {
          opsknight: "OIDC (Okta, Google, Microsoft, Auth0, generic). No SAML",
          pagerduty: "SAML 2.0 IdP; Google OAuth; OIDC for private status pages",
          incidentio: "Slack SSO on all plans; SAML on newer Pro + Enterprise; SCIM on Enterprise",
          opsgenie: "SSO/SAML on Standard and Enterprise (legacy packaging)",
          squadcast: "SAML 2.0",
          splunk: "SAML 2.0 and SCIM 2.0",
          grafana: "Grafana Cloud auth (SAML/SSO on Cloud plans)",
        },
      },
      {
        feature: "RBAC + audit log",
        source: "OpsKnight USER/ADMIN/RESPONDER + AuditLog. Others: documented admin controls.",
        values: {
          opsknight: "Roles + audit log",
          pagerduty: "Base roles + audit / analytics (plan-dependent)",
          incidentio: "Roles; custom RBAC + audit logs on Enterprise",
          opsgenie: "Roles + audit on paid plans",
          squadcast: "RBAC; stakeholder roles on Premium+",
          splunk: "Team admin roles + org SSO",
          grafana: "Grafana Cloud roles + IRM permissions",
        },
      },
    ],
  },
];

export const OPKNIGHT_GAPS = [
  {
    item: "Native voice / phone paging",
    detail: "Channels are email, SMS (Twilio or SNS), push, Slack, WhatsApp, and webhooks.",
  },
  {
    item: "Native Microsoft Teams app",
    detail: "Teams can receive a formatted outgoing webhook; there is no Teams ChatOps product.",
  },
  {
    item: "SAML SSO",
    detail: "SSO in v1.4.0 is OIDC only.",
  },
  {
    item: "OpsKnight-hosted cloud",
    detail: "There is no paid Enterprise Cloud. You operate the container.",
  },
  {
    item: "Multiple independent status pages per team",
    detail: "A status page with custom domain and privacy modes ships today. Multi-page/team custom domains is on the public roadmap.",
  },
  {
    item: "AI alert correlation / auto postmortems",
    detail: "Listed as upcoming on ROADMAP.md. Postmortems are authored from the incident timeline, not generated by a model.",
  },
];

export const HONEST_BLURB: Record<string, { title: string; body: string }> = {
  pagerduty: {
    title: "PagerDuty",
    body: "Vendor-hosted incident and on-call, sold per user with plan add-ons. Native voice, Slack/Teams apps, Status Pages, and Events API v2. OpsKnight is software you host: same Events API v2 payload shape at your URL, no per-seat meter, no native voice.",
  },
  incidentio: {
    title: "incident.io",
    body: "Vendor-hosted response that runs in Slack or Microsoft Teams, with included status pages and per-seat Responder/On-call pricing. OpsKnight is not a hosted incident.io clone: you operate it, paging is text/chat/push, Teams is webhook-only.",
  },
  opsgenie: {
    title: "Opsgenie",
    body: "Atlassian’s standalone Opsgenie is closed to new purchases. Support ends 5 April 2027; alerting/on-call is moving into Jira Service Management. Status for customers is typically Atlassian Statuspage, a separate product. OpsKnight is independent software you host.",
  },
  squadcast: {
    title: "Squadcast",
    body: "SolarWinds Incident Response (Squadcast): per-user SaaS with voice, Slack/Teams apps, and status pages from Premium. Incoming alerts use Squadcast webhooks, not PagerDuty Events API v2 ingest. OpsKnight is self-hosted with no seat meter.",
  },
  splunk: {
    title: "Splunk On-Call",
    body: "Formerly VictorOps. Vendor-hosted on-call with phone/SMS/push and Slack/Teams apps. No first-party customer status page. OpsKnight is a separate Apache-2.0 stack you run, not a Splunk add-on.",
  },
  grafana: {
    title: "Grafana Cloud IRM",
    body: "Grafana OnCall OSS was archived on 24 March 2026; Cloud Connection for OSS SMS, push, and voice ended that day. The current Grafana product is Cloud IRM (paid after a small free user allotment). OpsKnight remains Apache-2.0 self-hosted on-call + incidents + one status page in one app.",
  },
};

export function vendorIdFromCompareSlug(slug: string): CompareVendorId | null {
  switch (slug) {
    case "pagerduty":
      return "pagerduty";
    case "incidentio":
    case "incident-io":
      return "incidentio";
    case "opsgenie":
      return "opsgenie";
    case "squadcast":
      return "squadcast";
    case "splunk":
    case "victorops":
      return "splunk";
    case "grafana-oncall":
      return "grafana";
    default:
      return null;
  }
}

export const COMPARE_FOOTNOTE = `As of ${COMPARE_AS_OF}. OpsKnight column: v${BRAND.version} application and docs. Other columns: vendor documentation and public pricing pages listed below — not a contract, not every add-on SKU, and not list prices we invent. Confirm packaging on each vendor’s site before you buy.`;
