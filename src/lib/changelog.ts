import { PRODUCT } from "@/lib/product";
import { BRAND } from "@/lib/brand";

export type ChangeKind =
  | "added"
  | "security"
  | "fixed"
  | "changed"
  | "performance";

export interface ChangeCategory {
  type: ChangeKind;
  title: string;
  items: string[];
}

export interface ReleaseItem {
  version: string;
  slug: string;
  badge?: string;
  date: string;
  summary: string;
  dockerTag: string;
  githubReleaseUrl: string;
  categories: ChangeCategory[];
}

export const CHANGE_KIND_LABEL: Record<ChangeKind, string> = {
  added: "New",
  security: "Security",
  fixed: "Fix",
  changed: "Change",
  performance: "Performance",
};

export const releases: ReleaseItem[] = [
  {
    version: PRODUCT.release.tag,
    slug: PRODUCT.release.tag,
    badge: "Latest",
    date: new Intl.DateTimeFormat("en", {
      month: "long",
      day: "numeric",
      year: "numeric",
      timeZone: "UTC",
    }).format(new Date(PRODUCT.release.date + "T00:00:00Z")),
    summary:
      "A major milestone release introducing split production runtimes, Microsoft Teams ChatOps, Twilio voice paging, incident response policy engine, SCIM 2.0 provisioning, Docker Swarm HA, ManageEngine ingestion, and a durable notification delivery control plane.",
    dockerTag: `ghcr.io/opsknight-labs/opsknight:${PRODUCT.release.version}`,
    githubReleaseUrl: `${BRAND.links.releases}/tag/${PRODUCT.release.tag}`,
    categories: [
      {
        type: "added",
        title: "Runtime & High Availability",
        items: [
          "Split production runtime: independently scalable Web, Scheduler, General Worker, Critical Worker, Bulk Worker, and Status Projector processes.",
          "Docker Swarm deployment stacks (integrated and split) with Raft secrets, zero-downtime topology switching, and direct-database lifecycle.",
          "PgBouncer pooling overlays, published sizing profiles (Small, Medium, Large, Storm), and load/correctness scenarios for deployment planning. Benchmark results are planning evidence, not guaranteed capacity.",
        ],
      },
      {
        type: "added",
        title: "ChatOps & Paging",
        items: [
          "Native Microsoft Teams ChatOps: Entra/Azure Bot integration, Adaptive Cards, incident war rooms, identity linking, and up to 3 Teams destinations per service.",
          "Twilio voice paging (VOICE channel) for triggered-incident escalation with responder acknowledgement input and signed webhook callbacks.",
          "Up to 3 Slack channel destinations per service with improved war room participant sync.",
        ],
      },
      {
        type: "added",
        title: "Governance & Delivery Control",
        items: [
          "Incident response policy engine: versioned SLA policies, classification, and support-hours rules at workspace and service scope.",
          "SCIM 2.0 provisioning: Users, Groups, discovery endpoints, team membership, and bearer token rotation.",
          "Auditor role with session registry (browser, OS, device, activity tracking, and instant revoke controls).",
          "Durable notification delivery control plane: logical intents, traffic classes, admission/defer behavior, and operator evidence ledgers.",
          "Native ManageEngine OpManager webhook parser joining the certified 28-contract inbound catalog.",
        ],
      },
      {
        type: "changed",
        title: "Core Platform Rebuilds",
        items: [
          "Status Page V3 with custom themes, announcements, subscriber verify/unsubscribe, API tokens, and snapshot exports.",
          "Responder-grade installable mobile PWA with per-device Web Push registration and iOS recovery flows.",
          "Custom dashboard templates, configurable widgets, live refresh, PDF export, and fullscreen NOC mode.",
          "First stable release distributed under AGPL-3.0-only; historical v1.4.0 and earlier artifacts retain Apache-2.0.",
        ],
      },
      {
        type: "performance",
        title: "Performance & Scale",
        items: [
          "Integrated and split runtime roles let operators scale Web, Scheduler, Critical, General, Bulk, and Status processing independently where the deployment model supports it.",
          "PgBouncer pooling overlays and published sizing profiles reduce database-connection pressure and give operators a documented starting point for capacity planning.",
          "Load and correctness scenarios exercise alert ingestion, incident lifecycle, escalation, notifications, status fan-out, realtime traffic, user workload, security-under-load, recovery, and queue-drain behavior. Results are planning evidence, not guaranteed capacity.",
        ],
      },
      {
        type: "changed",
        title: "2.0 Release Boundaries",
        items: [
          "One supported status page per installation; multiple independent status pages are not a released 2.0 capability.",
          "Service Objectives/SLO UI is deferred and its route redirects; it is not advertised as a released feature.",
          "Mobile is an installable PWA with Web Push, not a native App Store or Google Play application.",
          "Voice paging is for initial triggered-incident alerting and responder acknowledgement; later lifecycle updates do not place additional calls.",
          "OpsKnight remains self-hosted; v2.0.0 does not introduce a hosted OpsKnight Cloud service.",
          "The 28 inbound contracts are the total supported inbound catalog, not 28 integrations newly introduced in 2.0.",
        ],
      },
    ],
  },
  {
    version: "v1.4.0",
    slug: "v1.4.0",
    date: "August 23, 2026",
    summary:
      "A safer release foundation with reliable delayed paging, an administrator Health Center, hardened upgrades, complete versioned docs, and multi-architecture stable images.",
    dockerTag: "ghcr.io/opsknight-labs/opsknight:1.4.0",
    githubReleaseUrl:
      "https://github.com/opsknight-labs/OpsKnight/releases/tag/v1.4.0",
    categories: [
      {
        type: "fixed",
        title: "Paging reliability",
        items: [
          "Delayed escalation steps retain their configured delay instead of paging the fallback team immediately.",
          "Orphaned escalations recover through one atomic processing claim.",
          "Fallback delivery no longer duplicates service notifications.",
        ],
      },
      {
        type: "added",
        title: "Operational confidence",
        items: [
          "The administrator Health Center consolidates supported database, scheduler, worker, paging, provider, integration, URL, encryption, and version signals.",
          "The release contract validates installation, upgrades, migration failure, restore, incident delivery, deployment rendering, and documentation coverage.",
          "Stable images publish for linux/amd64 and linux/arm64; the continuously updated test image remains amd64-only.",
        ],
      },
      {
        type: "security",
        title: "Release hardening",
        items: [
          "Disabled accounts cannot be reactivated through OIDC linking.",
          "First-administrator bootstrap is serialized and public readiness errors are redacted.",
          "Next.js, Auth.js, Nodemailer, and vulnerable transitive dependencies are updated to patched releases.",
        ],
      },
    ],
  },
  {
    version: "v1.3.1",
    slug: "v1.3.1",
    date: "August 18, 2026",
    summary:
      "Six more inbound alert sources, signed webhooks, and the official GHCR image — so you can pull a tagged build instead of assembling from source.",
    dockerTag: "ghcr.io/opsknight-labs/opsknight:1.3.1",
    githubReleaseUrl:
      "https://github.com/opsknight-labs/OpsKnight/releases/tag/v1.3.1",
    categories: [
      {
        type: "added",
        title: "More ways alerts arrive",
        items: [
          "Zabbix problem, recovery, and update webhooks with severity mapping.",
          "PagerDuty Events API v2 ingest: trigger, acknowledge, and resolve.",
          "GitLab CI pipeline failures, with auto-resolve when the branch goes green.",
          "Vercel production errors and deployment state, including successful deploys.",
          "Nagios Core & XI macros, including scheduled downtime and flapping.",
          "Icinga 2 host and service state, including acknowledgments.",
        ],
      },
      {
        type: "security",
        title: "Signed ingest",
        items: [
          "HMAC checks on native webhook routes, compared in constant time.",
          "Outbound webhook timestamps bound into HMAC so old payloads cannot be replayed.",
          "SHA-256 fingerprints so the same alert is not opened twice.",
        ],
      },
      {
        type: "added",
        title: "Run it from a tagged image",
        items: [
          "Public image at ghcr.io/opsknight-labs/opsknight:1.3.1 (linux/amd64).",
        ],
      },
    ],
  },
  {
    version: "v1.2.0",
    slug: "v1.2.0",
    date: "August 16, 2026",
    summary:
      "When an incident is serious, OpsKnight can open a Slack room, invite who is on call, and drop a video link. A Node 20 clock bug that paged the whole roster is fixed.",
    dockerTag: "ghcr.io/opsknight-labs/opsknight:1.2.0",
    githubReleaseUrl:
      "https://github.com/opsknight-labs/OpsKnight/releases/tag/v1.2.0",
    categories: [
      {
        type: "added",
        title: "Slack rooms for the incident",
        items: [
          "A dedicated channel per qualifying incident, with on-call people invited.",
          "Acknowledge, assign to me, and resolve from Slack.",
          "Slash commands for ack, resolve, notes, who is on call, and postmortem.",
          "Pin a Slack message with an emoji to save it as an incident note.",
          "Optional video link: Jitsi, Zoom, or Google Meet.",
        ],
      },
      {
        type: "fixed",
        title: "Who actually gets paged",
        items: [
          "On Node 20, midnight could be read as hour 24, so nobody was “on call” and the whole schedule was paged. That is fixed.",
          "Slack requests without a valid signature are rejected.",
          "Acknowledge from Slack now stops the escalation chain.",
        ],
      },
    ],
  },
  {
    version: "v1.1.0",
    slug: "v1.1.0",
    date: "April 4, 2026",
    summary:
      "On-call layers, overrides, and a master encryption key you set in the environment — so secrets are not stuck in an old local key.",
    dockerTag: "ghcr.io/opsknight-labs/opsknight:1.1.0",
    githubReleaseUrl:
      "https://github.com/opsknight-labs/OpsKnight/releases/tag/v1.1.0",
    categories: [
      {
        type: "added",
        title: "On-call that matches how teams actually work",
        items: [
          "Timezone-aware rotations with layered coverage.",
          "Overrides without rebuilding the whole schedule.",
        ],
      },
      {
        type: "security",
        title: "Encryption key in the environment",
        items: [
          "ENCRYPTION_KEY from the environment, with a fallback path for older installs.",
        ],
      },
    ],
  },
  {
    version: "v1.0.0",
    slug: "v1.0.0",
    date: "February 1, 2026",
    summary:
      "First public release: incidents, on-call, paging, status pages, postmortems, and analytics — Apache-2.0, you run it.",
    dockerTag: "ghcr.io/opsknight-labs/opsknight:1.0.0",
    githubReleaseUrl:
      "https://github.com/opsknight-labs/OpsKnight/releases/tag/v1.0.0",
    categories: [
      {
        type: "added",
        title: "The product ships",
        items: [
          "Incident timeline, acknowledge, assign, and resolve.",
          "On-call schedules and escalation policies.",
          "Pages over email, SMS, push, Slack, WhatsApp, and webhooks — not native voice.",
          "Public and private status pages.",
          "Postmortems, action items, and response-time views.",
          "Docker Compose and Helm.",
        ],
      },
    ],
  },
];
