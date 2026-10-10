#!/usr/bin/env node
import { readFileSync } from "node:fs";
import Fuse from "fuse.js";

const indexPath = process.env.DOCS_SEARCH_INDEX || "out/api/docs/v2.0.0/search";
const { results } = JSON.parse(readFileSync(indexPath, "utf8"));
const fuse = new Fuse(results, {
  keys: [
    { name: "title", weight: 0.4 },
    { name: "keywords", weight: 0.3 },
    { name: "headings", weight: 0.15 },
    { name: "description", weight: 0.1 },
    { name: "text", weight: 0.05 },
  ],
  threshold: 0.35,
  minMatchCharLength: 2,
});

const expectations = [
  ["install OpsKnight", "/start/quickstart/"],
  ["Docker Compose", "/start/quickstart/"],
  ["create service", "/start/create-first-service/"],
  ["on-call schedule", "/start/configure-on-call/"],
  ["escalation policy", "/guides/escalation/configure-policy/"],
  ["Datadog webhook", "/integrations/monitoring/datadog/"],
  ["Alertmanager webhook", "/integrations/monitoring/prometheus/"],
  ["Grafana contact point", "/integrations/monitoring/grafana/"],
  ["CloudWatch alerts", "/integrations/cloud/cloudwatch/"],
  ["Azure Monitor", "/integrations/cloud/azure/"],
  ["Google Cloud Monitoring", "/integrations/cloud/google-cloud-monitoring/"],
  ["slack oauth", "/integrations/communication/slack/connect-with-oauth/"],
  ["slack not sending", "/integrations/communication/slack/troubleshooting/"],
  ["connect Teams", "/integrations/communication/microsoft-teams/connect/"],
  ["Teams card action failing", "/integrations/communication/microsoft-teams/troubleshooting/"],
  ["connect Jira", "/integrations/issue-tracking/jira/connect/"],
  ["Twilio voice", "/integrations/communication/voice/"],
  ["WhatsApp notifications", "/integrations/communication/voice/"],
  ["notification failed", "/troubleshooting/notifications/not-delivered/"],
  ["API token", "/reference/api/authentication/"],
  ["rotate API key", "/reference/api/authentication/"],
  ["incident API", "/reference/api/incidents/"],
  ["OIDC setup", "/guides/identity/configure-oidc/"],
  ["SCIM provisioning", "/guides/identity/configure-scim/"],
  ["Kubernetes install", "/operate/deploy/kubernetes/"],
  ["HA install", "/operate/deploy/split-runtime/"],
  ["scale workers", "/operate/deploy/split-runtime/"],
  ["backup OpsKnight", "/operate/data/backup-and-restore/"],
  ["upgrade OpsKnight", "/operate/upgrades/upgrade/"],
  ["worker queue stalled", "/troubleshooting/workers/unhealthy/"],
];

const failures = [];
for (const [query, expected] of expectations) {
  const top = fuse.search(query).slice(0, 3).map(result => result.item.href);
  if (!top.some(href => href.endsWith(expected))) failures.push(`${query}: expected ${expected}; got ${top.join(", ") || "no results"}`);
}
if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}
console.log(`Documentation search quality passed for ${expectations.length} user intents.`);
