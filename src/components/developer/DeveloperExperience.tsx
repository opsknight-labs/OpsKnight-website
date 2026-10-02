'use client';

import { useState } from 'react';
import { Check, Copy } from 'lucide-react';

const tabs = [
  { id: 'compose', label: 'Docker Compose' },
  { id: 'run', label: 'Docker Run' },
  { id: 'helm', label: 'Kubernetes Helm' },
  { id: 'env', label: 'Environment Variables' },
];

const codeSnippets: Record<string, string> = {
  compose: `version: '3.8'
services:
  opsknight:
    image: ghcr.io/opsknight-labs/opsknight:2.0.0
    restart: always
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgresql://user:pass@postgres:5432/opsknight
      - NEXTAUTH_SECRET=your-random-secret-key
      - NEXTAUTH_URL=http://localhost:3000
      - ENCRYPTION_KEY=64-character-hex-encryption-key`,
  run: `docker run -d \\
  --name opsknight \\
  -p 3000:3000 \\
  -e DATABASE_URL="postgresql://user:pass@host:5432/opsknight" \\
  -e NEXTAUTH_SECRET="generate-a-secure-secret-here" \\
  -e NEXTAUTH_URL="http://localhost:3000" \\
  -e ENCRYPTION_KEY="64-character-hex-encryption-key" \\
  ghcr.io/opsknight-labs/opsknight:2.0.0`,
  helm: `helm repo add opsknight https://charts.opsknight.com
helm repo update
helm install opsknight opsknight/opsknight \\
  --set database.url="postgresql://user:pass@postgres:5432/opsknight" \\
  --set app.secret="your-secure-secret" \\
  --set app.encryptionKey="64-character-hex-encryption-key"`,
  env: `# Core Application Configuration
DATABASE_URL="postgresql://user:password@localhost:5432/opsknight?schema=public"
NEXTAUTH_URL="https://opsknight.yourdomain.com"
NEXTAUTH_SECRET="openssl-rand-base64-32"
ENCRYPTION_KEY="openssl-rand-hex-32"

# Multi-Channel ChatOps & Telephony
SLACK_BOT_TOKEN="xoxb-your-slack-bot-token"
SLACK_SIGNING_SECRET="your-slack-signing-secret"
TEAMS_BOT_APP_ID="your-azure-app-id"
TEAMS_BOT_APP_PASSWORD="your-azure-app-password"
TWILIO_ACCOUNT_SID="ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
TWILIO_AUTH_TOKEN="your-twilio-auth-token"
TWILIO_FROM_NUMBER="+15550199"`,
};

export function DeveloperExperience() {
  const [activeTab, setActiveTab] = useState('compose');
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(codeSnippets[activeTab] || '');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="bg-[#0f172a] py-24 px-6 md:px-12 lg:px-24 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold mb-6">
            Developer Experience
          </span>
          <h2 className="text-3xl md:text-5xl font-semibold text-white mb-6">
            Two commands to production.
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            No complex microservices. No cloud lock-in. One optimized binary and container that boots in seconds.
          </p>
        </div>

        <div className="w-full max-w-4xl mx-auto">
          <div className="rounded-xl bg-[#0d1117] border border-white/10 overflow-hidden shadow-2xl relative">
            <div className="flex items-center justify-between px-4 pt-3 pb-0 border-b border-white/10 bg-[#161b22]">
              <div className="flex gap-4 overflow-x-auto no-scrollbar">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`pb-3 text-sm font-medium transition-colors border-b-2 whitespace-nowrap ${
                      activeTab === tab.id
                        ? 'border-red-500 text-white'
                        : 'border-transparent text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
              <div className="pb-3 pl-4 hidden sm:block">
                <button
                  onClick={handleCopy}
                  className="text-slate-400 hover:text-white transition-colors flex items-center gap-1.5 text-xs bg-white/5 px-2.5 py-1 rounded border border-white/10"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-red-400" />
                      <span className="text-red-400 font-medium">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Mobile copy button */}
            <div className="absolute right-4 top-[3.25rem] sm:hidden">
              <button
                onClick={handleCopy}
                className="text-slate-400 hover:text-white transition-colors bg-white/5 p-1.5 rounded border border-white/10 backdrop-blur-sm"
                aria-label="Copy code"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-red-400" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>

            <div className="p-6 overflow-x-auto">
              <pre className="font-mono text-sm text-slate-300">
                <code>{codeSnippets[activeTab]}</code>
              </pre>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-slate-900/60 border border-white/5 rounded-xl p-4 text-center">
              <div className="text-slate-500 text-xs mb-1">Memory footprint</div>
              <div className="text-white text-sm font-medium">&lt; 512MB RAM</div>
            </div>
            <div className="bg-slate-900/60 border border-white/5 rounded-xl p-4 text-center">
              <div className="text-slate-500 text-xs mb-1">Startup time</div>
              <div className="text-white text-sm font-medium">&lt; 3 seconds</div>
            </div>
            <div className="bg-slate-900/60 border border-white/5 rounded-xl p-4 text-center">
              <div className="text-slate-500 text-xs mb-1">Architecture</div>
              <div className="text-white text-sm font-medium">ARM64 &amp; AMD64</div>
            </div>
            <div className="bg-slate-900/60 border border-white/5 rounded-xl p-4 text-center">
              <div className="text-slate-500 text-xs mb-1">Database</div>
              <div className="text-white text-sm font-medium">PostgreSQL 14+</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
