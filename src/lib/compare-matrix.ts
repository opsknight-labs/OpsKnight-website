import { BRAND } from "@/lib/brand";

/**
 * Comparison matrix for OpsKnight and common on-call products.
 *
 * OpsKnight feature cells are grounded in the pinned v2.0.0 release catalog,
 * application routes and published v2.0.0 documentation. Competitor cells are
 * summaries of the public vendor sources listed below and should be re-verified
 * when vendors change packaging, product status or pricing.
 */

export type CompareVendorId =
  | "opsknight"
  | "pagerduty"
  | "incidentio"
  | "opsgenie"
  | "squadcast"
  | "splunk"
  | "grafana";

export type CompareCategory =
  | "deployment"
  | "response"
  | "paging"
  | "collaboration"
  | "status"
  | "analytics"
  | "identity"
  | "integrations";

export type CompareCell = boolean | string;

export const COMPARE_AS_OF = "5 Oct 2026";

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
  category?: CompareCategory;
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
        category: "deployment",
        source: "OpsKnight: Compose, Swarm, Helm, Kustomize. Others: vendor product model as of Oct 2026.",
        values: {
          opsknight: "Self-hosted: Compose, Swarm, Helm, Kustomize (your VPC)",
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
        category: "deployment",
        source: `OpsKnight v2.0.0: ${BRAND.license}. Published v${BRAND.legacyVersion} and earlier retain the licenses shipped with those artifacts, including ${BRAND.legacyLicense} where applicable. Grafana OnCall OSS was AGPLv3; that repo is archived.`,
        values: {
          opsknight: `${BRAND.license} (v2.0.0)`,
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
        category: "deployment",
        source: "OpsKnight v2.0.0: AGPL-3.0-only open source with optional commercial support and implementation services. Vendor packaging changes over time; use the linked vendor pricing pages for current terms.",
        values: {
          opsknight: "AGPL-3.0-only open source; optional commercial support & services",
          pagerduty: "Free / paid Incident Management and Reliability Platform plans; add-ons vary",
          incidentio: "Free and paid Incident Response plans; On-call packaging varies by plan",
          opsgenie: "No new standalone sales; capabilities are moving to Jira Service Management",
          squadcast: "Commercial SolarWinds Incident Response plans",
          splunk: "Commercial Splunk On-Call service",
          grafana: "Commercial Grafana Cloud IRM service",
        },
      },
      {
        feature: "Incident data location",
        category: "deployment",
        values: {
          opsknight: "Application database and backups stay in infrastructure you operate; configured external providers receive only the traffic you enable",
          pagerduty: "PagerDuty cloud",
          incidentio: "Vendor cloud",
          opsgenie: "Atlassian cloud",
          squadcast: "Vendor cloud (data-residency options on higher plans)",
          splunk: "Splunk cloud",
          grafana: "Grafana Cloud region you choose",
        },
      },
      {
        feature: "Product standing (Oct 2026)",
        category: "deployment",
        source: `OpsKnight ${BRAND.releaseLabel} is the stable release under ${BRAND.license}. Atlassian Opsgenie and Grafana status from their public migration/archive pages.`,
        values: {
          opsknight: `${BRAND.releaseLabel} stable release (${BRAND.license})`,
          pagerduty: "Actively sold",
          incidentio: "Actively sold",
          opsgenie: "Standalone: no new purchases; EOL 5 Apr 2027 → Jira Service Management",
          squadcast: "Actively sold (SolarWinds Incident Response)",
          splunk: "Actively sold",
          grafana: "OnCall OSS archived 24 Mar 2026. Current: Grafana Cloud IRM",
        },
      },
      {
        feature: "Runtime topology choice",
        category: "deployment",
        source: "OpsKnight v2.0.0 documents integrated and split runtime roles across Compose, Kubernetes and Swarm. SaaS competitors operate their application runtime for customers.",
        values: {
          opsknight: "Integrated runtime or independently scalable Web, Scheduler, General, Critical, Bulk and Status roles",
          pagerduty: "Vendor-operated SaaS runtime",
          incidentio: "Vendor-operated SaaS runtime",
          opsgenie: "Vendor-operated Atlassian Cloud runtime",
          squadcast: "Vendor-operated SolarWinds runtime",
          splunk: "Vendor-operated Splunk runtime",
          grafana: "Vendor-operated Grafana Cloud runtime",
        },
      },
      {
        feature: "Release / upgrade control",
        category: "deployment",
        source: "OpsKnight operators pin container/chart/source releases and choose upgrade timing. SaaS vendors control production rollout timing for their hosted service.",
        values: {
          opsknight: "Operator pins the release and schedules upgrades",
          pagerduty: "Vendor-managed rollout",
          incidentio: "Vendor-managed rollout",
          opsgenie: "Vendor-managed rollout through end-of-support / migration path",
          squadcast: "Vendor-managed rollout",
          splunk: "Vendor-managed rollout",
          grafana: "Vendor-managed rollout",
        },
      },
      {
        feature: "Database & backup responsibility",
        category: "deployment",
        source: "OpsKnight is self-hosted around PostgreSQL and published backup/recovery guidance. SaaS vendors operate their service storage layer.",
        values: {
          opsknight: "Operator manages PostgreSQL, backups, restore testing and capacity",
          pagerduty: "Vendor operated",
          incidentio: "Vendor operated",
          opsgenie: "Vendor operated",
          squadcast: "Vendor operated",
          splunk: "Vendor operated",
          grafana: "Vendor operated",
        },
      },
    ],
  },
  {
    title: "Incident response",
    rows: [
      {
        feature: "Incident lifecycle",
        category: "response",
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
        category: "paging",
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
        category: "paging",
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
        category: "paging",
        source: "OpsKnight NotificationChannel enum + docs. Vendor contact-method docs.",
        values: {
          opsknight: "Email, SMS (Twilio or AWS SNS), push, Slack, WhatsApp, webhook, Twilio voice calls",
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
        category: "paging",
        source: "OpsKnight v2.0.0 adds Twilio voice paging on incident trigger (single-key DTMF ack, press 1). Others: notification/contact docs.",
        values: {
          opsknight: "Yes — Twilio voice paging on trigger (press 1 to ack)",
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
        category: "collaboration",
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
        category: "collaboration",
        source: "OpsKnight v2.0.0: Native Teams war rooms and incident channels. Others: published Teams apps.",
        values: {
          opsknight: "Native Teams war rooms & incident channels",
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
        category: "collaboration",
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
        category: "analytics",
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
        category: "status",
        source: "OpsKnight v2.0.0: One public/private status page per install with subscribers. Other vendors: status-page product docs.",
        values: {
          opsknight: "v2.0.0: 1 public/private page with custom domain & subscribers",
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
        category: "analytics",
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
        category: "response",
        source: "OpsKnight: installable PWA with push. Vendor App Store / Play apps.",
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
        category: "integrations",
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
        category: "integrations",
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
        category: "integrations",
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
        category: "integrations",
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
        category: "identity",
        source: "OpsKnight v2.0.0: OIDC with PKCE, JIT provisioning, claim-to-role mapping, and SCIM 2.0 user provisioning. Vendor SSO docs for other products.",
        values: {
          opsknight: "OIDC (PKCE, JIT, claim-to-role) + SCIM 2.0 provisioning (v2.0.0)",
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
        category: "identity",
        source: "OpsKnight roles + AuditLog. Other vendors: documented admin controls.",
        values: {
          opsknight: "4 roles (Admin, Responder, Observer, Auditor) + append-only audit log",
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
    detail: "The current OpsKnight runtime supports Twilio voice paging for triggered incidents, including signed gather/status callbacks and durable delivery operations.",
  },
  {
    item: "Microsoft Teams depth",
    detail: "The current runtime supports Teams service destinations, Adaptive Card actions, and incident war rooms; consult the versioned documentation for setup requirements.",
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
