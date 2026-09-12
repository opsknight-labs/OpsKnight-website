/**
 * OpsKnight brand — single source of truth for marketing copy, SEO, and deploy facts.
 */

import { latestDocsHref } from "@/lib/docs/paths";

/** Bump this when you ship. Footer/about use it. Docs URLs use latestDocsHref, not this. */
const PRODUCT_VERSION = "1.4.0";

export const BRAND = {
  name: "OpsKnight",
  version: PRODUCT_VERSION,
  tagline: "Self-hosted on-call & incident response",
  description:
    "Self-hosted incident command center: on-call rotations, paging, Slack war rooms, status pages, and MTTA/MTTR — on your infrastructure.",
  fullDescription:
    "OpsKnight is a self-hosted incident command center — an alternative to PagerDuty, incident.io, Opsgenie, Squadcast, Splunk On-Call, and Grafana Cloud IRM.",
  domain: "opsknight.com",
  integrationCount: 27,
  integrationCountLabel: "27",
  stack: "Next.js 16, React 19, Prisma, Postgres, Docker Compose / Helm",

  status: "Accepting Contributions",
  statusMessage: `v${PRODUCT_VERSION}`,

  links: {
    github: "https://github.com/opsknight-labs/OpsKnight",
    sponsor: "https://github.com/sponsors/dushyant-rahangdale",
    docs: latestDocsHref(),
    email: "help@opsknight.com",
    status: "https://status.opsknight.com",
    issues: "https://github.com/opsknight-labs/OpsKnight/issues",
    discussions: "https://github.com/opsknight-labs/OpsKnight/discussions",
    releases: "https://github.com/opsknight-labs/OpsKnight/releases",
    contributing:
      "https://github.com/opsknight-labs/OpsKnight/blob/main/CONTRIBUTING.md",
    license: "https://github.com/opsknight-labs/OpsKnight/blob/main/LICENSE",
    security: "https://github.com/opsknight-labs/OpsKnight/security",
    helmCharts: "https://github.com/opsknight-labs/helm-charts",
  },

  assets: {
    logo: "/logo-mark.png",
    logoSvg: "/logo.svg",
    banner: "/banner.png",
    dashboard: "/dashboard-command-center.png",
    dashboardWide: "/dashboard-command-center-1200.jpg",
  },

  seo: {
    title: "OpsKnight | Self-hosted on-call & incident response",
    description:
      "Self-hosted incident command center for on-call, paging, Slack war rooms, status pages, and SLA analytics. Unlimited users. AGPL-3.0-only. PagerDuty Events API v2 ingest adapter.",
    keywords: [
      "incident management",
      "on-call",
      "DevOps",
      "SRE",
      "status page",
      "open source",
      "PagerDuty alternative",
      "incident.io alternative",
      "Opsgenie alternative",
      "Squadcast alternative",
      "incident response",
      "alerting",
      "self-hosted",
    ],
  },

  license: "AGPL-3.0-only",
  licenseUrl: "https://www.gnu.org/licenses/agpl-3.0.html",

  deploy: {
    secretsNote:
      "OpsKnight requires PostgreSQL, NEXTAUTH_SECRET, and ENCRYPTION_KEY. The bundled Docker Compose configuration starts both PostgreSQL and OpsKnight automatically.",
    compose: `curl -sL https://raw.githubusercontent.com/opsknight-labs/OpsKnight/main/docker-compose.yml > docker-compose.yml
docker compose up -d`,
    docker: `# 1. Run PostgreSQL database container
docker run -d --name opsknight-db \\
  -e POSTGRES_DB=opsknight_db \\
  -e POSTGRES_USER=opsknight \\
  -e POSTGRES_PASSWORD=opsknight_secure_password \\
  -v opsknight_postgres_data:/var/lib/postgresql/data \\
  postgres:15-alpine

# 2. Run OpsKnight container connected to database
docker run -d --name opsknight-app -p 3000:3000 \\
  -e DATABASE_URL="postgresql://opsknight:opsknight_secure_password@opsknight-db:5432/opsknight_db" \\
  -e NEXTAUTH_URL="http://localhost:3000" \\
  -e NEXTAUTH_SECRET="$(openssl rand -base64 32)" \\
  -e ENCRYPTION_KEY="$(openssl rand -hex 32)" \\
  --link opsknight-db \\
  ghcr.io/opsknight-labs/opsknight:latest`,
    helm: `git clone https://github.com/opsknight-labs/OpsKnight.git
cd OpsKnight
helm install opsknight ./helm/opsknight \\
  --namespace opsknight \\
  --create-namespace`,
    kustomize: `git clone https://github.com/opsknight-labs/OpsKnight.git
cd OpsKnight/k8s
kubectl apply -k .`,
  },

  authors: [
    {
      name: "Dushyant Rahangdale",
      url: "https://github.com/dushyant-rahangdale",
      twitter: "https://twitter.com/dushyantr_",
    },
  ],
  keywords: [
    "OpsKnight",
    "Incident Response",
    "On-call Management",
    "Status Pages",
    "DevOps",
    "SRE",
    "Open Source",
    "Self-hosted",
  ],
} as const;

export const BRAND_COLORS = {
  canvas: "#f8fafc",
  surface: "#ffffff",
  ink: "#111827",
  muted: "#4b5563",
  chrome: "#0f172a",
  chromeMuted: "#1e293b",
  accent: "#d21a1b",
  accentHover: "#b41516",
  success: "#059669",
  error: "#be123c",
} as const;

export const FEATURES = [
  {
    title: "Incident command",
    description: "Run the incident lifecycle with MTTA and MTTR on your stack.",
    icon: "AlertTriangle",
  },
  {
    title: "On-call scheduling",
    description: "Rotations, overrides, and handoffs across timezones.",
    icon: "Calendar",
  },
  {
    title: "Escalations & paging",
    description: "SMS, email, push, Slack, and WhatsApp on your policies.",
    icon: "GitBranch",
  },
  {
    title: "Status pages",
    description: "Public and private status pages with incident timelines.",
    icon: "Globe",
  },
  {
    title: "Analytics & SLA",
    description: "Measure MTTA, MTTR, and SLA compliance.",
    icon: "BarChart3",
  },
  {
    title: "Mobile PWA",
    description: "Acknowledge and triage from a phone without an app store.",
    icon: "Smartphone",
  },
] as const;

export const COMPETITORS = [
  "PagerDuty",
  "incident.io",
  "Opsgenie",
  "Squadcast",
  "Splunk On-Call",
  "Grafana Cloud IRM",
] as const;
