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

type SnippetTab = "contact_point" | "alertmanager" | "slack_chatops" | "curl";

export function GrafanaMigrationHelper({ className = "" }: { className?: string }) {
  const [activeTab, setActiveTab] = useState<SnippetTab>("contact_point");
  const [copied, setCopied] = useState(false);

  const snippets: Record<
    SnippetTab,
    { title: string; filename: string; language: string; code: string; notes: string }
  > = {
    contact_point: {
      title: "Grafana Contact Point",
      filename: "grafana-contact-point.txt",
      language: "text",
      notes: "Configure these fields in Grafana Alerting → Contact points. Keep Grafana's default Alerting / Alertmanager JSON intact.",
      code: `Type: Webhook
URL: https://opsknight.yourcompany.com/api/integrations/grafana?integrationId=YOUR_INTEGRATION_ID
Method: POST
Resolved messages: enabled
Payload: default Grafana / Alertmanager JSON

Optional HMAC verification:
If you configure an OpsKnight signature secret, configure the matching Grafana
HMAC signature so X-Grafana-Signature can be verified.`,
    },
    alertmanager: {
      title: "Grafana Alertmanager / Mimir",
      filename: "alertmanager-grafana.yml",
      language: "yaml",
      notes: "Direct webhook routing from Grafana Mimir / Cortex Alertmanager to OpsKnight.",
      code: `receivers:
  - name: 'opsknight-oncall'
    webhook_configs:
      - url: 'https://opsknight.yourcompany.com/api/integrations/grafana?integrationId=YOUR_INTEGRATION_ID'
        send_resolved: true

route:
  receiver: 'opsknight-oncall'
  group_by: ['grafana_folder', 'alertname']
  routes:
    - match:
        severity: critical
      receiver: 'opsknight-oncall'`,
    },
    slack_chatops: {
      title: "Slack ChatOps transition",
      filename: "slack-transition.md",
      language: "markdown",
      notes: "Use OpsKnight's generated Slack app manifest instead of copying a static manifest from this comparison page.",
      code: `# Slack ChatOps transition

1. Open Settings → Integrations → Slack in OpsKnight.
2. Copy the generated Slack app manifest.
3. In the Slack API console, create the app from that manifest.
4. Configure the documented OAuth credentials in OpsKnight.
5. Install/connect the intended workspace.
6. Route one non-production service first.
7. Trigger a test incident and verify signed actions, identity, room projection and cleanup.

Do not reuse a Grafana OnCall bot token or hardcode scopes from an old manifest.`,
    },
    curl: {
      title: "Grafana Webhook Test",
      filename: "test-grafana-payload.sh",
      language: "bash",
      notes: "Fire a test Grafana 9/10/11 alerting webhook payload to verify ingestion and severity mapping.",
      code: `curl -X POST https://opsknight.yourcompany.com/api/integrations/grafana?integrationId=YOUR_INTEGRATION_ID \\
  -H "Content-Type: application/json" \\
  -d '{
    "receiver": "opsknight-oncall",
    "status": "firing",
    "alerts": [
      {
        "status": "firing",
        "labels": {
          "alertname": "HighMemoryUsage",
          "instance": "prod-api-worker-01",
          "severity": "critical"
        },
        "annotations": {
          "summary": "High memory consumption detected on worker node",
          "description": "Memory saturation has exceeded 92% threshold for 5m",
          "runbook_url": "https://wiki.yourcompany.com/runbooks/memory-leak"
        },
        "startsAt": "2026-08-21T12:00:00Z",
        "fingerprint": "a1b2c3d4e5f60718"
      }
    ]
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
              <h3 className="text-sm font-bold text-white">Grafana OnCall OSS Migration Blueprint</h3>
              <span className="rounded bg-emerald-500/10 px-2 py-0.5 font-mono text-[10px] font-medium text-emerald-400">
                Active Open Source
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Evaluate OpsKnight as a self-hosted replacement path and validate Grafana alert delivery plus responder workflows before migration.
            </p>
          </div>
        </div>

        <Link
          href={latestDocsHref("integrations/monitoring/grafana")}
          className="inline-flex items-center gap-1 font-mono text-xs font-semibold text-[#d21a1b] hover:underline"
        >
          <span>Grafana webhook docs</span>
          <ExternalLink className="h-3.5 w-3.5" />
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 bg-[#0f172a] px-4 py-2">
        <div className="flex flex-wrap items-center gap-1">
          {(
            [
              { id: "contact_point", label: "Contact Point", icon: Layers },
              { id: "alertmanager", label: "Alertmanager", icon: Code2 },
              { id: "slack_chatops", label: "Slack ChatOps", icon: Code2 },
              { id: "curl", label: "Test Payload", icon: Terminal },
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
            <strong>Trademark Notice</strong>: Grafana and Grafana OnCall are registered trademarks of Grafana Labs. OpsKnight is an independent open-source project and is not affiliated with, endorsed by, or sponsored by Grafana Labs.
          </span>
        </p>
      </div>
    </div>
  );
}
