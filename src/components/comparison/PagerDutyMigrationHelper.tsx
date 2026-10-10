"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Copy,
  Check,
  Zap,
  Terminal,
  Layers,
  ShieldAlert,
  ExternalLink,
  Code2,
} from "lucide-react";
import { latestDocsHref } from "@/lib/docs/paths";
import { BRAND } from "@/lib/brand";
import { copyText } from "@/lib/client-clipboard";

type SnippetTab = "contract" | "datadog" | "prometheus" | "curl";

export function PagerDutyMigrationHelper({ className = "" }: { className?: string }) {
  const [activeTab, setActiveTab] = useState<SnippetTab>("contract");
  const [copied, setCopied] = useState(false);

  const snippets: Record<SnippetTab, { title: string; filename: string; language: string; code: string; notes: string }> = {
    contract: {
      title: "Events API v2 contract",
      filename: "events-api-v2.txt",
      language: "text",
      notes: "Use this compatibility path only when the sender already emits PagerDuty Events API v2 JSON. Otherwise use OpsKnight's native adapter for that provider.",
      code: `POST https://opsknight.yourcompany.com/api/integrations/pagerduty/v2/enqueue

Required lifecycle fields
routing_key   = YOUR_OPSKNIGHT_ROUTING_KEY
event_action = trigger | acknowledge | resolve
dedup_key    = stable identity reused across lifecycle events

Trigger payload also requires payload.summary, payload.severity and payload.source.
Validate trigger, acknowledge and resolve behavior before repointing production.`,
    },
    datadog: {
      title: "Datadog native adapter",
      filename: "datadog-webhook.json",
      language: "json",
      notes: "For Datadog, prefer the native v2.0.0 adapter rather than translating Datadog into PagerDuty payloads.",
      code: `{
  "url": "https://opsknight.yourcompany.com/api/integrations/datadog?integrationId=YOUR_INTEGRATION_ID",
  "headers": {
    "x-integration-key": "YOUR_OPSKNIGHT_INTEGRATION_KEY"
  },
  "payload": {
    "title": "$EVENT_TITLE",
    "text": "$TEXT_ONLY_MSG",
    "alert_type": "$ALERT_TYPE",
    "aggregation_key": "$ALERT_CYCLE_KEY",
    "host": "$HOSTNAME",
    "source_type_name": "datadog",
    "alert": {
      "id": "$ALERT_ID",
      "title": "$EVENT_TITLE",
      "status": "$ALERT_STATUS",
      "message": "$TEXT_ONLY_MSG"
    }
  }
}`,
    },
    prometheus: {
      title: "Prometheus native adapter",
      filename: "alertmanager.yml",
      language: "yaml",
      notes: "For Alertmanager, use the native Prometheus integration and keep the standard Alertmanager body intact.",
      code: `receivers:
  - name: 'opsknight-primary'
    webhook_configs:
      - url: 'https://opsknight.yourcompany.com/api/integrations/prometheus?integrationId=YOUR_INTEGRATION_ID'
        send_resolved: true

route:
  receiver: 'opsknight-primary'`,
    },
    curl: {
      title: "Events API v2 trigger & resolve",
      filename: "events-api-v2.sh",
      language: "bash",
      notes: "Use one stable dedup_key for the trigger and recovery test before changing production senders.",
      code: `# Trigger
curl -X POST "https://opsknight.yourcompany.com/api/integrations/pagerduty/v2/enqueue" \\\n  -H "Content-Type: application/json" \\\n  -d '{
    "routing_key": "YOUR_OPSKNIGHT_ROUTING_KEY",
    "event_action": "trigger",
    "dedup_key": "disk-usage-srv-01",
    "payload": {
      "summary": "Disk usage exceeded 95%",
      "severity": "critical",
      "source": "srv-01.prod.internal"
    }
  }'

# Resolve with the same dedup_key
curl -X POST "https://opsknight.yourcompany.com/api/integrations/pagerduty/v2/enqueue" \\\n  -H "Content-Type: application/json" \\\n  -d '{
    "routing_key": "YOUR_OPSKNIGHT_ROUTING_KEY",
    "event_action": "resolve",
    "dedup_key": "disk-usage-srv-01"
  }'`,
    },
  };

  const currentSnippet = snippets[activeTab];

  const handleCopy = async () => {
    const ok = await copyText(currentSnippet.code);
    if (!ok) return;
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={`overflow-hidden rounded-2xl border border-slate-800 bg-[#0f172a] text-slate-200 shadow-xl ${className}`}
    >
      <div className="border-b border-slate-800 bg-slate-900/90 px-5 py-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#d21a1b]/15 text-[#d21a1b]">
              <Zap className="h-4.5 w-4.5" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-semibold text-white sm:text-base">
                  Validated Events API v2 transition
                </h3>
                <span className="rounded bg-emerald-500/10 px-2 py-0.5 font-mono text-[10px] font-medium text-emerald-400">
                  Compatibility Endpoint
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Reuse an existing Events API v2 payload only after validating the sender, routing key and lifecycle behavior in staging.
              </p>
            </div>
          </div>

          <Link
            href={latestDocsHref("integrations/webhooks/pagerduty")}
            className="inline-flex items-center gap-1 font-mono text-xs font-semibold text-[#d21a1b] hover:underline"
          >
            <span>Ingest adapter docs</span>
            <ExternalLink className="h-3 w-3" />
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12">
        <div className="border-b border-slate-800 bg-slate-900/40 p-5 lg:col-span-5 lg:border-b-0 lg:border-r space-y-4">
          <p className="font-mono text-[11px] font-medium uppercase tracking-wider text-slate-400">
            Select Your Source Stack
          </p>

          <div className="space-y-1.5">
            {(
              [
                { id: "contract", label: "Events API v2", icon: Layers },
                { id: "datadog", label: "Datadog native", icon: Zap },
                { id: "prometheus", label: "Prometheus native", icon: Code2 },
                { id: "curl", label: "cURL validation", icon: Terminal },
              ] as const
            ).map((item) => {
              const Icon = item.icon;
              const active = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveTab(item.id)}
                  className={`flex w-full items-center justify-between rounded-xl px-3.5 py-2.5 text-left text-xs font-medium transition-colors ${
                    active
                      ? "bg-slate-800 font-semibold text-white border border-slate-700/80 shadow-sm"
                      : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`h-4 w-4 ${active ? "text-[#d21a1b]" : "text-slate-500"}`} />
                    <span>{item.label}</span>
                  </div>
                  {active && <span className="h-1.5 w-1.5 rounded-full bg-[#d21a1b]" />}
                </button>
              );
            })}
          </div>

          <div className="rounded-xl border border-slate-800 bg-[#0f172a] p-3.5 text-xs text-slate-300 space-y-2">
            <p className="font-semibold text-white flex items-center gap-1.5">
              <span>Migration guidance</span>
            </p>
            <p className="text-[11px] leading-relaxed text-slate-400">
              {currentSnippet.notes}
            </p>
            <div className="pt-2 border-t border-slate-800/80 flex flex-col gap-1 text-[11px] font-mono text-slate-400">
              <div className="flex items-center gap-1.5 text-emerald-400">
                <Check className="h-3 w-3" />
                <span>Standard routing_key &amp; dedup_key support</span>
              </div>
              <div className="flex items-center gap-1.5 text-emerald-400">
                <Check className="h-3 w-3" />
                <span>Automatic trigger / resolve lifecycle</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-between bg-[#0f172a] p-5 lg:col-span-7 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
            <span className="font-mono text-xs font-medium text-slate-400">
              {currentSnippet.filename}
            </span>
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-1 rounded-lg border border-slate-800 bg-slate-900 px-2.5 py-1 font-mono text-xs text-slate-300 hover:text-white transition-colors"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5 text-slate-400" />
                  <span>Copy Snippet</span>
                </>
              )}
            </button>
          </div>

          <pre className="flex-1 overflow-x-auto rounded-xl bg-[#0b1120] p-4 font-mono text-[11px] leading-relaxed text-emerald-300 max-h-[340px] custom-scrollbar">
            <code>{currentSnippet.code}</code>
          </pre>

          <div className="pt-2 text-[11px] font-mono text-slate-500">
            Endpoint: <code className="text-slate-300">POST /api/integrations/pagerduty/v2/enqueue</code>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-800 bg-[#0f172a] px-5 py-3 text-[11px] leading-relaxed text-slate-500">
        <div className="flex items-start gap-2">
          <ShieldAlert className="mt-0.5 h-3.5 w-3.5 shrink-0 text-slate-400" />
          <p>
            <strong className="font-semibold text-slate-400">Trademark &amp; Compatibility Notice:</strong>{" "}
            PagerDuty® is a registered trademark of PagerDuty, Inc. OpsKnight is an independent
            open-source project licensed under {BRAND.license} and is not affiliated with, endorsed by, or
            sponsored by PagerDuty, Inc. Compatibility refers solely to an ingest adapter supporting the
            public Events API v2 JSON payload schema.
          </p>
        </div>
      </div>
    </div>
  );
}
