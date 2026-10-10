/**
 * OpsKnight brand — single source of truth for marketing copy, SEO, and deploy facts.
 */

import { PRODUCT } from "@/lib/product";
import { latestDocsHref } from "@/lib/docs/paths";

/**
 * v2.0.0 is the first stable AGPL release.
 * v1.4.0 and earlier retain their historical Apache-2.0 license.
 */
const PRODUCT_VERSION = PRODUCT.release.version;
const PRODUCT_LICENSE = PRODUCT.release.license;
const LEGACY_STABLE_VERSION = "1.4.0";
const LEGACY_STABLE_LICENSE = "Apache-2.0";

export const BRAND = {
  name: "OpsKnight",
  version: PRODUCT_VERSION,
  releaseLabel: `v${PRODUCT_VERSION}`,
  legacyVersion: LEGACY_STABLE_VERSION,
  legacyLicense: LEGACY_STABLE_LICENSE,
  tagline: "Incident operations you control",
  description:
    "Self-hosted incident management and on-call. Detect, page, coordinate, communicate and learn on infrastructure you control.",
  fullDescription:
    "OpsKnight brings incident management, on-call, paging, ChatOps, status pages and postmortems together on infrastructure you control.",
  domain: "opsknight.com",
  integrationCount: PRODUCT.inboundIntegrationCount,
  integrationCountLabel: String(PRODUCT.inboundIntegrationCount),
  ecosystemCount: PRODUCT.integrations.length,
  ecosystemCountLabel: String(PRODUCT.integrations.length),
  stack:
    "Next.js 16, React 19, Prisma, Postgres, Docker Compose / Helm / Swarm",

  status: "Stable",
  statusMessage: `v${PRODUCT_VERSION} stable`,

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
    // v2.0.0 stable release license.
    license: `https://github.com/opsknight-labs/OpsKnight/blob/${PRODUCT.release.tag}/LICENSE`,
    // Backward-compatible alias for pages that still use the development key.
    developmentLicense:
      "https://github.com/opsknight-labs/OpsKnight/blob/main/LICENSE",
    // Historical v1.4 release license (Apache-2.0); do not use for current product marketing.
    legacyLicense:
      "https://github.com/opsknight-labs/OpsKnight/blob/v1.4.0/LICENSE",
    licenseTransition:
      "https://github.com/opsknight-labs/OpsKnight/blob/main/LICENSE-TRANSITION.md",
    trademarks:
      "https://github.com/opsknight-labs/OpsKnight/blob/main/TRADEMARKS.md",
    security: "https://github.com/opsknight-labs/OpsKnight/security",
    securityPolicy: `https://github.com/opsknight-labs/OpsKnight/blob/${PRODUCT.release.tag}/SECURITY.md`,
    vulnerabilityResponse: `https://github.com/opsknight-labs/OpsKnight/blob/${PRODUCT.release.tag}/docs/security/vulnerability-response.md`,
    sbom: `https://github.com/opsknight-labs/OpsKnight/blob/${PRODUCT.release.tag}/docs/security/sbom.md`,
    supportedVersions: `https://github.com/opsknight-labs/OpsKnight/blob/${PRODUCT.release.tag}/docs/security/supported-versions.md`,
    sharedResponsibility: `https://github.com/opsknight-labs/OpsKnight/blob/${PRODUCT.release.tag}/docs/compliance/shared-responsibility.md`,
    privateSecurityReport:
      "https://github.com/opsknight-labs/OpsKnight/security/advisories/new",
    helmCharts: "https://github.com/opsknight-labs/helm-charts",
  },

  assets: {
    logo: "/brand/opsknight-mark.webp",
    logoSvg: "/logo.svg",
    logoMark: "/logo-mark.png",
    banner: "/banner.png",
    /** Updated to v2.0.0 UI screenshot */
    dashboard: "/v2-incidents-list.png",
    dashboardWide: "/dashboard-command-center-1200.jpg",
  },

  seo: {
    title: "OpsKnight | Incident operations you control",
    description: `OpsKnight ${PRODUCT.release.tag}: self-hosted incident management and on-call, with paging, ChatOps, status pages and postmortems under ${PRODUCT_LICENSE}.`,
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
      "Microsoft Teams ChatOps",
      "incident response",
      "alerting",
      "self-hosted",
    ],
  },

  /** License of the v2.0.0 stable release (AGPL-3.0-only). */
  license: PRODUCT_LICENSE,
  licenseUrl: "https://www.gnu.org/licenses/agpl-3.0.html",
  /** Kept as an alias while older website components are migrated. */
  developmentLicense: PRODUCT_LICENSE,
  developmentLicenseUrl: "https://www.gnu.org/licenses/agpl-3.0.html",
  legacyLicenseUrl: "https://www.apache.org/licenses/LICENSE-2.0",

  deploy: {
    secretsNote:
      "OpsKnight requires PostgreSQL 14+, NEXTAUTH_SECRET, ENCRYPTION_KEY, and API_KEY_SECRET. The bundled Docker Compose starts both PostgreSQL and OpsKnight automatically. For split runtime, PgBouncer pooling, or Swarm HA, see the deployment docs.",
    compose: `git clone https://github.com/opsknight-labs/OpsKnight.git
cd OpsKnight
cp env.example .env
# Set NEXTAUTH_SECRET, ENCRYPTION_KEY, and API_KEY_SECRET in .env
docker compose -f deploy/compose/docker-compose.yml up -d`,
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
  -e DIRECT_DATABASE_URL="postgresql://opsknight:opsknight_secure_password@opsknight-db:5432/opsknight_db" \\
  -e NEXTAUTH_URL="http://localhost:3000" \\
  -e NEXTAUTH_SECRET="$(openssl rand -base64 32)" \\
  -e ENCRYPTION_KEY="$(openssl rand -hex 32)" \\
  -e API_KEY_SECRET="$(openssl rand -base64 32)" \\
  --link opsknight-db \\
  ghcr.io/opsknight-labs/opsknight:${PRODUCT_VERSION}`,
    helm: `# 1. Create namespace & production secrets
kubectl create namespace opsknight
kubectl -n opsknight create secret generic opsknight-secrets \\
  --from-literal=DATABASE_URL='postgresql://opsknight:<password>@postgres:5432/opsknight?sslmode=require&connection_limit=20' \\
  --from-literal=DIRECT_DATABASE_URL='postgresql://opsknight:<password>@postgres:5432/opsknight?sslmode=require&connection_limit=5' \\
  --from-literal=NEXTAUTH_SECRET="$(openssl rand -base64 32)" \\
  --from-literal=ENCRYPTION_KEY="$(openssl rand -hex 32)" \\
  --from-literal=API_KEY_SECRET="$(openssl rand -base64 32)"

# 2. Deploy OpsKnight Helm Chart with production HA values
helm upgrade --install opsknight deploy/kubernetes/helm/opsknight \\
  --namespace opsknight \\
  -f deploy/kubernetes/helm/opsknight/examples/values-enterprise-ha.yaml`,
    kustomize: `# 1. Create base infrastructure & run migration job
kubectl apply -k deploy/kubernetes/kustomize/base
kubectl delete -f deploy/kubernetes/kustomize/migration-job.yaml --ignore-not-found
kubectl apply -f deploy/kubernetes/kustomize/migration-job.yaml
kubectl -n opsknight wait --for=condition=complete job/opsknight-migration --timeout=15m

# 2. Deploy integrated profile (or profiles/split-pgbouncer)
kubectl apply -k deploy/kubernetes/kustomize/profiles/integrated/`,
    swarm: `git clone https://github.com/opsknight-labs/OpsKnight.git
cd OpsKnight/deploy/swarm
# Initialize Docker Swarm (if not already active)
docker swarm init
# Deploy multi-node HA cluster with automatic Raft secrets & validation
export OPSKNIGHT_IMAGE="ghcr.io/opsknight-labs/opsknight:${PRODUCT_VERSION}"
./scripts/deploy.sh`,
    split: `git clone https://github.com/opsknight-labs/OpsKnight.git
cd OpsKnight
cp env.example .env
# Set NEXTAUTH_SECRET, ENCRYPTION_KEY, and API_KEY_SECRET in .env
export OPSKNIGHT_IMAGE="ghcr.io/opsknight-labs/opsknight:${PRODUCT_VERSION}"

# Deploy 6 dedicated split roles + migration runner
docker compose \\
  -f deploy/compose/docker-compose.yml \\
  -f deploy/compose/docker-compose.split.yml \\
  up -d`,
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
    title: "Voice calls & escalations",
    description:
      "Automated voice phone calls, SMS, push, Slack, Teams, and WhatsApp on your policies.",
    icon: "PhoneCall",
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
