"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Copy,
  Check,
  Terminal,
  Layers,
  ShieldAlert,
  ExternalLink,
  Code2,
  GitBranch,
} from "lucide-react";
import { latestDocsHref } from "@/lib/docs/paths";
import { copyText } from "@/lib/client-clipboard";

type SnippetTab = "alertmanager" | "concept_map" | "terraform" | "curl";

export function OpsgenieMigrationHelper({ className = "" }: { className?: string }) {
  const [activeTab, setActiveTab] = useState<SnippetTab>("alertmanager");
  const [copied, setCopied] = useState(false);

  const snippets: Record<
    SnippetTab,
    { title: string; filename: string; language: string; code: string; notes: string }
  > = {
    alertmanager: {
      title: "Prometheus Alertmanager",
      filename: "alertmanager.yml",
      language: "yaml",
      notes: "Replace opsgenie_configs in Alertmanager with OpsKnight's native Prometheus webhook receiver.",
      code: `receivers:
  - name: 'opsknight-primary'
    webhook_configs:
      - url: 'https://opsknight.yourcompany.com/api/integrations/prometheus?integrationId=YOUR_INTEGRATION_ID'
        send_resolved: true

route:
  receiver: 'opsknight-primary'
  group_by: ['alertname', 'cluster', 'service']
  group_wait: 30s
  group_interval: 5m
  repeat_interval: 4h
  routes:
    - match:
        severity: critical
      receiver: 'opsknight-primary'`,
    },
    concept_map: {
      title: "Concept Mapping Guide",
      filename: "migration-mapping.md",
      language: "markdown",
      notes: "Direct structural mapping from Opsgenie primitives to OpsKnight self-hosted primitives.",
      code: `# Opsgenie to OpsKnight Architecture Translation

| Opsgenie Primitive         | OpsKnight Equivalent           | Configuration Location         |
| -------------------------- | ------------------------------ | ------------------------------ |
| **Team**                   | **Team**           | Teams                |
| **Escalation Policy**      | **Escalation Policy**          | Escalation Policies  |
| **Schedule / Rotations**   | **On-Call Schedule**    | Schedules            |
| **Integrations / API Key** | **Service Integration**   | Services → Integrations  |
| **Incoming Alert Rules**   | **Adapter correlation key** | Provider-specific integration   |
| **Slack App**              | **Slack ChatOps integration**      | Settings → Integrations   |`,
    },
    terraform: {
      title: "Terraform / OpenTofu",
      filename: "main.tf",
      language: "hcl",
      notes: "Route monitoring webhooks directly to OpsKnight using standard webhook resources.",
      code: `# Route alerts to OpsKnight webhook endpoint
resource "datadog_webhook" "opsknight_alerts" {
  name = "opsknight-sre-oncall"
  url  = "https://opsknight.yourcompany.com/api/integrations/datadog?integrationId=YOUR_INTEGRATION_ID"

  custom_headers = jsonencode({
    "x-integration-key" = var.opsknight_service_key
    "Content-Type"      = "application/json"
  })

  payload = jsonencode({
    "event_type" = "$EVENT_TYPE"
    "alert_id"   = "$ALERT_ID"
    "title"      = "$EVENT_TITLE"
    "body"       = "$EVENT_MSG"
    "hostname"   = "$HOSTNAME"
  })
}`,
    },
    curl: {
      title: "Test Ingest cURL",
      filename: "test-alert.sh",
      language: "bash",
      notes: "Send a sample test payload to verify inbound webhook ingestion and escalation triggering.",
      code: `curl -X POST https://opsknight.yourcompany.com/api/integrations/webhook?integrationId=YOUR_INTEGRATION_ID \\
  -H "Content-Type: application/json" \\
  -H "x-integration-key: YOUR_OPSKNIGHT_SERVICE_INTEGRATION_KEY" \\
  -d '{
    "summary": "Database connection pool saturated",
    "source": "payments-api",
    "severity": "critical",
    "status": "triggered",
    "dedup_key": "db-pool-exhausted-prod"
  }'`,
    },
  };

  const handleCopy = async () => {
    const ok = await copyText(snippets[activeTab].code);
    if (!ok) return;
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const current = snippets[activeTab];

  return (
    <div className={`overflow-hidden rounded-2xl border border-slate-800 bg-[#0f172a] shadow-xl ${className}`}>
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 bg-slate-900/90 px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#d21a1b]/15 text-[#d21a1b]">
            <GitBranch className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-white">Opsgenie Migration Blueprint</h3>
              <span className="rounded bg-emerald-500/10 px-2 py-0.5 font-mono text-[10px] font-medium text-emerald-400">
                Self-Hosted Alternative
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Map Opsgenie concepts to OpsKnight, then validate schedules, routing and paging before changing production senders.
            </p>
          </div>
        </div>

        <Link
          href={latestDocsHref("integrations/monitoring/prometheus")}
          className="inline-flex items-center gap-1 font-mono text-xs font-semibold text-[#d21a1b] hover:underline"
        >
          <span>Webhook documentation</span>
          <ExternalLink className="h-3.5 w-3.5" />
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 bg-[#0f172a] px-4 py-2">
        <div className="flex flex-wrap items-center gap-1">
          {(
            [
              { id: "alertmanager", label: "Alertmanager", icon: Layers },
              { id: "concept_map", label: "Concept Mapping", icon: Code2 },
              { id: "terraform", label: "Terraform", icon: Code2 },
              { id: "curl", label: "Test cURL", icon: Terminal },
            ] as const
          ).map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-mono text-xs font-semibold transition-colors ${
                  active
                    ? "bg-slate-800 text-white"
                    : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center gap-1.5 rounded-lg bg-slate-800 px-3 py-1.5 font-mono text-xs font-semibold text-slate-200 hover:bg-slate-700 transition-colors"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 text-emerald-400" />
              <span className="text-emerald-400">Copied</span>
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5 text-slate-400" />
              <span>Copy snippet</span>
            </>
          )}
        </button>
      </div>

      {/* Snippet Context Bar */}
      <div className="flex items-center justify-between border-b border-slate-800/80 bg-slate-900/40 px-5 py-2 text-[11px] text-slate-400 font-mono">
        <span>{current.filename}</span>
        <span className="uppercase text-slate-500">{current.language}</span>
      </div>

      {/* Code Viewer */}
      <pre className="overflow-x-auto p-5 font-mono text-xs leading-relaxed text-slate-200 sm:text-[13px] max-h-[380px] custom-scrollbar bg-[#090d16]">
        <code>{current.code}</code>
      </pre>

      {/* Contextual Notes */}
      <div className="border-t border-slate-800 bg-slate-900/60 p-4 text-xs text-slate-300">
        <p className="leading-relaxed">{current.notes}</p>
      </div>

      {/* Strict Legal Disclaimer */}
      <div className="border-t border-slate-800/60 bg-[#0f172a] px-5 py-3 text-[11px] text-slate-500">
        <p className="flex items-start gap-1.5">
          <ShieldAlert className="h-3.5 w-3.5 shrink-0 text-slate-400 mt-0.5" />
          <span>
            <strong>Trademark Notice</strong>: Opsgenie and Jira Service Management are registered trademarks of Atlassian Pty Ltd. OpsKnight is an independent open-source project and is not affiliated with, endorsed by, or sponsored by Atlassian.
          </span>
        </p>
      </div>
    </div>
  );
}
