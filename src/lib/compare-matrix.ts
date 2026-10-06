import { PRODUCT } from "@/lib/product";

export type CompareVendorId =
  | "opsknight"
  | "pagerduty"
  | "incidentio"
  | "opsgenie"
  | "grafana";

export type CompareSectionId = "ownership" | "response" | "platform" | "identity";

export const COMPARE_AS_OF = "6 Oct 2026";

export const COMPARE_VENDORS: {
  id: CompareVendorId;
  label: string;
  shortLabel: string;
}[] = [
  { id: "opsknight", label: "OpsKnight", shortLabel: "OpsKnight" },
  { id: "pagerduty", label: "PagerDuty", shortLabel: "PagerDuty" },
  { id: "incidentio", label: "incident.io", shortLabel: "incident.io" },
  { id: "opsgenie", label: "Opsgenie", shortLabel: "Opsgenie" },
  { id: "grafana", label: "Grafana Cloud IRM", shortLabel: "Grafana IRM" },
];

export type CompareRow = {
  feature: string;
  note?: string;
  values: Record<CompareVendorId, string>;
};

export type CompareSection = {
  id: CompareSectionId;
  title: string;
  rows: CompareRow[];
};

export const COMPARE_SECTIONS: CompareSection[] = [
  {
    id: "ownership",
    title: "Ownership & operating model",
    rows: [
      {
        feature: "Deployment",
        values: {
          opsknight: "Self-hosted on infrastructure you operate",
          pagerduty: "Vendor SaaS",
          incidentio: "Vendor SaaS",
          opsgenie: "Atlassian Cloud; standalone product reaches end of support 5 Apr 2027",
          grafana: "Grafana Cloud IRM; OnCall OSS was archived 24 Mar 2026",
        },
      },
      {
        feature: "Software / source model",
        values: {
          opsknight: `${PRODUCT.release.license}; source available`,
          pagerduty: "Commercial vendor service",
          incidentio: "Commercial vendor service",
          opsgenie: "Commercial Atlassian service",
          grafana: "Grafana Cloud service; archived OnCall OSS is a separate project",
        },
      },
      {
        feature: "Operational data",
        values: {
          opsknight: "Your database, backups and infrastructure",
          pagerduty: "Operated in PagerDuty’s service",
          incidentio: "Operated in incident.io’s service",
          opsgenie: "Operated in Atlassian Cloud",
          grafana: "Operated in the selected Grafana Cloud stack",
        },
      },
    ],
  },
  {
    id: "response",
    title: "On-call & incident response",
    rows: [
      {
        feature: "Incident / alert lifecycle",
        values: {
          opsknight: "Triggered, acknowledged and resolved with incident timeline",
          pagerduty: "Triggered, acknowledged and resolved incident workflow",
          incidentio: "Incident response workflow with responder coordination",
          opsgenie: "Alert acknowledgement / closure; product is in migration period",
          grafana: "Firing, acknowledged, resolved and silenced alert groups",
        },
      },
      {
        feature: "On-call schedules",
        values: {
          opsknight: "Layers, rotations, overrides and time zones",
          pagerduty: "Schedules, layers and overrides",
          incidentio: "On-call schedules and cover",
          opsgenie: "On-call schedules",
          grafana: "Schedules, rotations, layers and overrides",
        },
      },
      {
        feature: "Escalation",
        values: {
          opsknight: "Policy steps can target users, teams or schedules",
          pagerduty: "Escalation policies",
          incidentio: "On-call escalation paths",
          opsgenie: "Escalation policies",
          grafana: "Multi-step escalation chains and manual escalation",
        },
      },
      {
        feature: "Paging channels",
        note: "Provider and plan constraints can apply.",
        values: {
          opsknight: "Email, SMS, push, Slack, Teams, WhatsApp, voice and webhook",
          pagerduty: "Push, phone, SMS, email, Slack and WhatsApp",
          incidentio: "Mobile app, phone, SMS, Slack, email and WhatsApp",
          opsgenie: "Push, email, SMS and voice; Slack / Teams integrations",
          grafana: "Mobile push, phone, SMS, email, Slack, Teams, Telegram and webhooks",
        },
      },
      {
        feature: "Voice / phone paging",
        values: {
          opsknight: "Twilio voice paging on the triggered-incident path with acknowledgement input",
          pagerduty: "Phone notification method",
          incidentio: "Phone-call notification rules",
          opsgenie: "Voice notification support during supported product life",
          grafana: "Phone notifications with response actions",
        },
      },
      {
        feature: "Slack & Microsoft Teams",
        values: {
          opsknight: "Incident notifications, actions and war-room workflows",
          pagerduty: "Slack and Microsoft Teams integrations",
          incidentio: "Slack and Microsoft Teams incident workflows",
          opsgenie: "Slack and Microsoft Teams integrations",
          grafana: "Slack and Microsoft Teams alert / incident integrations",
        },
      },
      {
        feature: "Customer status pages",
        values: {
          opsknight: `${PRODUCT.boundaries.statusPageLimit} status page per installation`,
          pagerduty: "PagerDuty Status Pages",
          incidentio: "Public status pages with optional sub-pages",
          opsgenie: "Typically paired with Atlassian Statuspage",
          grafana: "IRM is not positioned as a public status-page product",
        },
      },
      {
        feature: "Mobile response",
        values: {
          opsknight: `${PRODUCT.boundaries.mobileType}; installable from the browser`,
          pagerduty: "Native mobile app",
          incidentio: "Native mobile app",
          opsgenie: "Native mobile app during supported product life",
          grafana: "Grafana mobile app with IRM response",
        },
      },
    ],
  },
  {
    id: "platform",
    title: "Integrations & platform",
    rows: [
      {
        feature: "Inbound alert integrations",
        values: {
          opsknight: `${PRODUCT.inboundIntegrationCount} release-verified inbound integrations + generic webhook`,
          pagerduty: "Events API plus integration directory",
          incidentio: "Alert-source integrations",
          opsgenie: "Integration directory",
          grafana: "IRM integrations, routes and webhooks",
        },
      },
      {
        feature: "PagerDuty Events API v2 path",
        values: {
          opsknight: "Compatibility ingest adapter for Events API v2-shaped payloads",
          pagerduty: "Native Events API v2",
          incidentio: "Use incident.io alert-source ingestion",
          opsgenie: "Use Opsgenie / Atlassian ingestion",
          grafana: "Use Grafana IRM integrations / API",
        },
      },
      {
        feature: "Jira workflow",
        values: {
          opsknight: "Jira Cloud integration",
          pagerduty: "Jira Cloud integration",
          incidentio: "Jira integration",
          opsgenie: "Part of the Atlassian / Jira ecosystem",
          grafana: "IRM supports ITSM integrations including Jira workflows",
        },
      },
      {
        feature: "API / automation",
        values: {
          opsknight: "REST API keys plus documented webhook contracts",
          pagerduty: "REST and Events APIs",
          incidentio: "API and workflow automation",
          opsgenie: "REST API during supported product life",
          grafana: "IRM APIs and Terraform-supported configuration",
        },
      },
    ],
  },
  {
    id: "identity",
    title: "Identity & governance",
    rows: [
      {
        feature: "Single sign-on",
        values: {
          opsknight: "OIDC with PKCE, JIT and claim-to-role mapping",
          pagerduty: "SSO options including SAML",
          incidentio: "SAML and OIDC providers",
          opsgenie: "SSO options during supported product life",
          grafana: "Grafana Cloud authentication / SSO options",
        },
      },
      {
        feature: "Provisioning",
        values: {
          opsknight: "SCIM 2.0 user provisioning",
          pagerduty: "SCIM available in supported account configurations",
          incidentio: "SCIM provisioning",
          opsgenie: "Atlassian identity lifecycle options",
          grafana: "Grafana Cloud identity and team administration",
        },
      },
      {
        feature: "Roles & audit",
        values: {
          opsknight: "Roles, permissions and audit log",
          pagerduty: "Roles and administrative audit capabilities",
          incidentio: "Roles, permissions and audit capabilities by plan",
          opsgenie: "Roles and logs during supported product life",
          grafana: "Grafana Cloud roles, teams and audit capabilities",
        },
      },
    ],
  },
];

export const COMPARE_SOURCES = [
  {
    vendor: "PagerDuty",
    label: "Notification rules",
    href: "https://support.pagerduty.com/main/docs/notification-rules",
  },
  {
    vendor: "PagerDuty",
    label: "Contact methods",
    href: "https://support.pagerduty.com/main/docs/contact-information",
  },
  {
    vendor: "PagerDuty",
    label: "Status Pages",
    href: "https://support.pagerduty.com/main/docs/status-pages-overview",
  },
  {
    vendor: "incident.io",
    label: "On-call notifications",
    href: "https://docs.incident.io/on-call/notifications",
  },
  {
    vendor: "incident.io",
    label: "Status pages",
    href: "https://docs.incident.io/status-pages/overview",
  },
  {
    vendor: "incident.io",
    label: "SSO / SCIM",
    href: "https://docs.incident.io/admin/saml-sso",
  },
  {
    vendor: "Opsgenie",
    label: "End-of-support migration",
    href: "https://support.atlassian.com/opsgenie/docs/choose-the-right-path-and-schedule-migration/",
  },
  {
    vendor: "Grafana",
    label: "Grafana Cloud IRM",
    href: "https://grafana.com/products/cloud/irm/",
  },
  {
    vendor: "Grafana",
    label: "Notification channels",
    href: "https://grafana.com/docs/grafana-cloud/observe-and-act/respond-to-incidents/notify-responders/notification-channels/",
  },
  {
    vendor: "Grafana",
    label: "Escalation chains",
    href: "https://grafana.com/docs/grafana-cloud/observe-and-act/respond-to-incidents/escalation-and-routing/escalation-chains/",
  },
  {
    vendor: "Grafana",
    label: "OnCall OSS archive notice",
    href: "https://grafana.com/docs/oncall/latest/set-up/open-source/",
  },
] as const;
