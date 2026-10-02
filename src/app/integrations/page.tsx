import { Metadata } from 'next';
import { BRAND } from '@/lib/brand';
import { latestDocsHref } from '@/lib/docs/paths';
import IntegrationsGrid from './IntegrationsGrid';
import { Blocks, ShieldCheck, Webhook } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Integrations Ecosystem | OpsKnight',
  description: `Connect your observability stack with ${BRAND.integrationCountLabel} native integrations. HMAC-signed ingest, no plugins.`,
};

export default function IntegrationsPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pt-32 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden font-sans">
      
      <div className="max-w-7xl mx-auto relative z-10 space-y-20">
        
        {/* Header */}
        <header className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-600 text-xs font-semibold mb-4">
            <Blocks className="w-3.5 h-3.5" />
            {BRAND.integrationCountLabel} native integrations · no plugins
          </div>
          <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-slate-900 mb-6">
            Integrations
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            APM, cloud, metrics daemons, CI, and chat — first-party handlers with HMAC verification.
          </p>
        </header>

        {/* Integrations Explorer Grid */}
        <IntegrationsGrid />

        {/* Custom Webhook / SDK Ingestion Section */}
        <section className="p-8 sm:p-12 rounded-3xl bg-white border border-slate-200 shadow-xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-6 space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-600 text-xs font-bold uppercase tracking-wider">
                <Webhook className="w-3.5 h-3.5" />
                Custom Ingestion API
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
                Need a custom internal tool integration?
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                OpsKnight supports generic JSON webhooks with SHA-256 fingerprint deduplication. Send a single HTTP POST request from internal cron jobs, Kubernetes operators, or custom monitoring scripts.
              </p>
              
              <div className="flex flex-wrap gap-4 text-xs font-semibold pt-2 text-slate-700">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  HMAC-SHA256 Signed
                </div>
                <div className="flex items-center gap-1.5">
                  <Blocks className="w-4 h-4 text-slate-700" />
                  Auto-Deduplication
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href={latestDocsHref("integrations/webhooks/webhook")}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#d21a1b] hover:bg-[#b41516] text-white text-xs font-bold transition-all shadow-md shadow-red-700/20"
                >
                  Read Custom Webhook Documentation
                </Link>
              </div>
            </div>

            {/* Code Snippet Box */}
            <div className="lg:col-span-6">
              <div className="rounded-2xl bg-slate-950 border border-slate-800 p-5 font-mono text-xs text-slate-300 shadow-2xl space-y-2">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-[11px] text-slate-400">
                  <span>POST /api/webhooks/custom</span>
                  <span className="text-emerald-400 font-bold">200 OK</span>
                </div>
                <pre className="text-emerald-300 overflow-x-auto py-2">
{`curl -X POST https://opsknight.yourdomain.com/api/webhooks/custom \\
  -H "Content-Type: application/json" \\
  -H "X-OpsKnight-Token: YOUR_INTEGRATION_SECRET" \\
  -d '{
    "service_id": "svc_api_gateway",
    "title": "Database connection pool exhausted",
    "severity": "CRITICAL",
    "details": "Active connections: 500/500 on postgres-primary",
    "dedup_key": "db-pool-exhausted-prod"
  }'`}
                </pre>
              </div>
            </div>

          </div>
        </section>

      </div>
    </div>
  );
}
