import { BRAND } from "@/lib/brand";

/**
 * Comparison matrix for OpsKnight and common on-call products.
 *
 * OpsKnight feature cells are grounded primarily in the last published v1.4.0
 * application/docs unless a row explicitly describes the v1.5 development line.
 * License/current-line metadata reflects the active v1.5 Community transition.
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

export const COMPARE_AS_OF = "13 Sep 2026";

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
        source: "OpsKnight: Compose/Helm. Others: vendor product model as of Sep 2026.",
        values: {
          opsknight: "Self-hosted Community (your VPC)",
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
        source: `OpsKnight v1.5 Community: ${BRAND.license}. Published v${BRAND.legacyVersion} and earlier retain the licenses shipped with those artifacts, including ${BRAND.legacyLicense} where applicable. Grafana OnCall OSS was AGPLv3; that repo is archived.`,
        values: {
          opsknight: `${BRAND.license} (v1.5 Community)`,
          pagerduty: "Proprietary",
          incidentio: "Proprietary",
          opsgenie: "Proprietary",
          squadcast: "Proprietary",
          splunk: "Proprietary",
          grafana: "Cloud: proprietary. Archived OSS OnCall: AGPLv3",
        },
      },
      {
        feature: "Commercial model",
        source: "OpsKnight Community and commercial offerings have separate licensing boundaries. Vendor pricing references should be confirmed on vendor sites.",
        values: {
          opsknight: "Self-hosted Community; Enterprise/hosted capabilities may be packaged separately",
          pagerduty: "Professional $25/user/mo or $21 annual; Business/Enterprise and add-ons vary",
          incidentio: "Per-seat responder/on-call plans; packaging varies by tier",
          opsgenie: "No new sales; capabilities moving to Jira Service Management",
          squadcast: "Per-user commercial plans",
          splunk: "Commercial Splunk On-Call plans",
          grafana: "Grafana Cloud IRM commercial usage/user pricing",
        },
      },
      {
        feature: "Incident data location",
        values: {
          opsknight: "Your Postgres / VPC for Community self-hosting",
          pagerduty: "PagerDuty cloud",
          incidentio: "Vendor cloud",
          opsgenie: "Atlassian cloud",
          squadcast: "Vendor cloud (data-residency options on higher plans)",
          splunk: "Splunk cloud",
          grafana: "Grafana Cloud region you choose",
        },
      },
      {
        feature: "Product standing (Sep 2026)",
        source: "OpsKnight v1.5 is the active development line; v1.4.0 remains the last published Apache-era stable release. Atlassian Opsgenie and Grafana status from their public migration/archive pages.",
        values: {
          opsknight: `${BRAND.releaseLabel}; v${BRAND.legacyVersion} remains historical stable`,
          pagerduty: "Actively sold",
          incidentio: "Actively sold",
          opsgenie: "Standalone: no new purchases; EOL 5 Apr 2027 → Jira Service Management",
          squadcast: "Actively sold (SolarWinds Incident Response)",
          splunk: "Actively sold",
          grafana: "OnCall OSS archived 24 Mar 2026. Current: Grafana Cloud IRM",
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
          squadcast: "Push, email, SMS, voice (plan-dependent)",
          splunk: "Push, SMS, phone, email; WhatsApp available in paging policy",
          grafana: "IRM: mobile push, Slack, Teams, Telegram, SMS, phone, email",
        },
      },
      {
        feature: "Native voice / phone calls",
        source: "OpsKnight Community baseline has no VOICE channel. Others: notification/contact docs.",
        values: {
          opsknight: false,
          pagerduty: "Yes — phone contact method",
          incidentio: "Yes — phone escalations; live call routing on Pro/Enterprise",
          opsgenie: "Yes — voice on historical paid plans",
          squadcast: "Yes — phone calls",
          splunk: "Yes — phone paging",
          grafana: "Yes on Cloud IRM",
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
          grafana: "IRM Slack app: notifications and incident ChatOps",
        },
      },
      {
        feature: "Microsoft Teams ChatOps",
        source: "OpsKnight published v1.4 baseline: outgoing webhook formatter only. Current development may evolve; verify v1.5 docs before release. Others: published Teams apps.",
        values: {
          opsknight: "Published baseline: outgoing webhook payload only",
          pagerduty: "Native Teams app: channel cards, ack/resolve, service mapping",
          incidentio: "Native Teams app (Pro/Enterprise): dedicated channel, lifecycle in Teams",
          opsgenie: "Teams V2 integration: ack/close/snooze from channel",
          squadcast: "Native Teams app: incident channels; ack/reassign/resolve",
          splunk: "VictorOps Teams app: bi-directional ack/resolve/snooze",
          grafana: "IRM Teams app: alert cards + incident bot",
        },
      },
      {
        feature: "Video bridge on incident",
        source: "OpsKnight: Jitsi generator + Zoom/Meet URL templates. Vendor collaboration docs.",
        values: {
          opsknight: "Jitsi; Zoom/Meet via URL template",
          pagerduty: "Zoom integration + stored conference bridges from Slack",
          incidentio: "Workflows can create Zoom; call transcription in product",
          opsgenie: "Zoom / conference integrations in directory",
          squadcast: "Incident communication channels as configured",
          splunk: "War-room automation (bring your conference tool)",
          grafana: "IRM incident collaboration tools",
        },
      },
      {
        feature: "Postmortems + action items",
        source: "OpsKnight Postmortem + ActionItem models. Vendor PIR docs.",
        values: {
          opsknight: "Timeline-based postmortems and action items",
          pagerduty: "Post-incident review / timeline tools (plus add-on AI products)",
          incidentio: "Post-incident process + AI draft from timeline (plan-dependent)",
          opsgenie: "Incident notes; typical PIR in Confluence / JSM",
          squadcast: "Postmortem templates and action items",
          splunk: "Post-incident reviews in the product",
          grafana: "Cloud IRM can auto-create PIR documents",
        },
      },
      {
        feature: "Status page",
        source: "OpsKnight published Community baseline: one page per install. Other vendors: status-page product docs.",
        values: {
          opsknight: "Community baseline: one public/private page with custom domain and subscribers",
          pagerduty: "Internal / external / private Status Pages (plan-gated; custom domain on external)",
          incidentio: "Public, internal, customer pages (counts by plan); custom domain",
          opsgenie: "Pair with Atlassian Statuspage (separate product)",
          squadcast: "Status pages on applicable paid plans",
          splunk: "No first-party customer status page; use a third-party page",
          grafana: "No IRM-native public status page; third-party integrations",
        },
      },
      {
        feature: "MTTA / MTTR / SLA",
        source: "OpsKnight SLA definitions/analytics. Other vendors: reporting products.",
        values: {
          opsknight: "MTTA/MTTR and SLA definitions in-app",
          pagerduty: "Analytics API and Insights",
          incidentio: "Insights / trends in the product",
          opsgenie: "Reporting on paid plans",
          squadcast: "Analytics; SLO features on higher plans",
          splunk: "MTTA/MTTR reports in product",
          grafana: "IRM reporting inside Grafana Cloud",
        },
      },
      {
        feature: "Mobile",
        source: "OpsKnight: installable PWA. Vendor App Store / Play apps.",
        values: {
          opsknight: "Installable PWA with push; no App Store listing",
          pagerduty: "iOS and Android apps",
          incidentio: "iOS and Android apps",
          opsgenie: "iOS and Android apps",
          squadcast: "iOS and Android apps",
          splunk: "iOS and Android apps",
          grafana: "Grafana IRM iOS and Android",
        },
      },
    ],
  },
  {
    title: "Integrations & platform",
    rows: [
      {
        feature: "Inbound monitoring webhooks",
        source: `OpsKnight published docs catalog: ${BRAND.integrationCountLabel} native parsers. Other vendors: integration directories.`,
        values: {
          opsknight: `${BRAND.integrationCountLabel} native parsers + generic JSON`,
          pagerduty: "Events API v2 + large integration directory",
          incidentio: "Alert sources catalog",
          opsgenie: "Large historical integration directory",
          squadcast: "Service webhooks + integration directory",
          splunk: "REST + third-party integrations",
          grafana: "Alertmanager, Grafana Alerting, webhooks, IRM integration catalog",
        },
      },
      {
        feature: "PagerDuty Events API v2 ingest",
        source: "OpsKnight docs: POST /api/integrations/pagerduty/v2/enqueue. PagerDuty: events.pagerduty.com/v2/enqueue.",
        values: {
          opsknight: "Yes — ingest adapter (routing_key payload). Not a PagerDuty clone",
          pagerduty: "Native Events API v2",
          incidentio: "No direct Events API v2 ingest adapter",
          opsgenie: "Own API / migrators",
          squadcast: "Migrator/tooling and native webhooks",
          splunk: "Own REST / integrations",
          grafana: "Migration tooling; IRM ingest is not PD /v2/enqueue",
        },
      },
      {
        feature: "Jira Cloud",
        source: "OpsKnight published integration and vendor Jira integration guides.",
        values: {
          opsknight: "Bi-directional issue sync",
          pagerduty: "Bidirectional Jira Cloud extension",
          incidentio: "Follow-ups export + incident/Jira workflows",
          opsgenie: "Built-in Jira / JSM ecosystem",
          squadcast: "Bidirectional Jira Cloud extension",
          splunk: "Jira add-ons and webhooks",
          grafana: "Jira in IRM ITSM integrations",
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
        source: "OpsKnight v1.4 published baseline includes OIDC. v1.5 Community/Enterprise packaging should be read from the v1.5 release documentation when published. Vendor SSO docs for other products.",
        values: {
          opsknight: "Published baseline: OIDC; v1.5 packaging may distinguish Community and Enterprise capabilities",
          pagerduty: "SAML 2.0 IdP; Google OAuth; OIDC for private status pages",
          incidentio: "Slack SSO; SAML/SCIM on applicable plans",
          opsgenie: "SSO/SAML on historical paid plans",
          squadcast: "SAML 2.0",
          splunk: "SAML 2.0 and SCIM 2.0",
          grafana: "Grafana Cloud auth; enterprise SSO by plan",
        },
      },
      {
        feature: "RBAC + audit log",
        source: "OpsKnight roles + AuditLog. Other vendors: documented admin controls.",
        values: {
          opsknight: "Roles + audit log; advanced governance can be packaged separately",
          pagerduty: "Roles + audit / analytics (plan-dependent)",
          incidentio: "Roles; custom RBAC + audit logs on Enterprise",
          opsgenie: "Roles + audit on paid plans",
          squadcast: "RBAC; advanced roles on higher plans",
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
    detail: "Published Community channels include email, SMS, push, Slack, WhatsApp, and webhooks; verify v1.5 docs for the final release capability set.",
  },
  {
    item: "Microsoft Teams depth",
    detail: "The published baseline is outgoing webhook integration; Teams ChatOps is an area of active product development.",
  },
  {
    item: "Enterprise identity packaging",
    detail: "The published baseline includes OIDC. Advanced SSO/SCIM/governance can be separated into Enterprise packaging for v1.5 and later.",
  },
  {
    item: "OpsKnight-hosted cloud",
    detail: "A managed OpsKnight Cloud service is not currently offered; Community is self-hosted.",
  },
  {
    item: "Multiple independent status pages per team",
    detail: "The published Community baseline has one status page per install. Additional pages are a natural future commercial capability.",
  },
  {
    item: "AI alert correlation / auto postmortems",
    detail: "Postmortems are currently authored from the incident timeline rather than generated automatically.",
  },
];

export const HONEST_BLURB: Record<string, { title: string; body: string }> = {
  pagerduty: {
    title: "PagerDuty",
    body: "Vendor-hosted incident and on-call with commercial plans and add-ons. Native voice, Slack/Teams apps, Status Pages, and Events API v2. OpsKnight Community is self-hosted and supports the Events API v2 payload shape at your URL; commercial OpsKnight capabilities can be packaged separately.",
  },
  incidentio: {
    title: "incident.io",
    body: "Vendor-hosted response that runs in Slack or Microsoft Teams, with status pages and commercial responder/on-call packaging. OpsKnight Community is self-hosted; verify v1.5 documentation for the exact Community and Enterprise capability boundary.",
  },
  opsgenie: {
    title: "Opsgenie",
    body: "Atlassian’s standalone Opsgenie is closed to new purchases. Support ends 5 April 2027; alerting/on-call is moving into Jira Service Management. OpsKnight is independent self-hosted Community software with separately defined commercial boundaries.",
  },
  squadcast: {
    title: "Squadcast",
    body: "SolarWinds Incident Response (Squadcast) is commercial SaaS with voice, Slack/Teams apps, and status-page capabilities by plan. OpsKnight Community is self-hosted and its v1.5 Community source is licensed under AGPL-3.0-only.",
  },
  splunk: {
    title: "Splunk On-Call",
    body: `Formerly VictorOps. Vendor-hosted on-call with phone/SMS/push and Slack/Teams apps. OpsKnight Community is a separate ${BRAND.license} self-hosted stack, not a Splunk add-on.`,
  },
  grafana: {
    title: "Grafana Cloud IRM",
    body: `Grafana OnCall OSS was archived on 24 March 2026. The current Grafana product is Cloud IRM. OpsKnight v1.5 Community is ${BRAND.license} self-hosted incident response; published v${BRAND.legacyVersion} artifacts retain their historical license.`,
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

export const COMPARE_FOOTNOTE = `As of ${COMPARE_AS_OF}. OpsKnight feature cells are grounded primarily in the published v${BRAND.legacyVersion} application/docs unless otherwise stated; v${BRAND.version} is the active Community development line and uses ${BRAND.license}. Vendor columns summarize public documentation and packaging, not a contract. Confirm current vendor pricing and OpsKnight v1.5 release packaging before making a purchasing decision.`;
