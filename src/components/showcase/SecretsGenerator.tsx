"use client";

import { useState, useEffect } from "react";
import { Copy, Check, RefreshCw, Key, ShieldCheck, Terminal, Database } from "lucide-react";

function generateBase64Secret(): string {
  if (typeof window === "undefined" || !window.crypto) return "";
  const bytes = new Uint8Array(32);
  window.crypto.getRandomValues(bytes);
  let binary = "";
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

function generateHexSecret(): string {
  if (typeof window === "undefined" || !window.crypto) return "";
  const bytes = new Uint8Array(32);
  window.crypto.getRandomValues(bytes);
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export function SecretsGenerator({
  className = "",
}: {
  className?: string;
}) {
  const [nextAuthSecret, setNextAuthSecret] = useState<string>("");
  const [encryptionKey, setEncryptionKey] = useState<string>("");
  const [apiKeySecret, setApiKeySecret] = useState<string>("");
  const [copiedNextAuth, setCopiedNextAuth] = useState(false);
  const [copiedEncryption, setCopiedEncryption] = useState(false);
  const [copiedApiKey, setCopiedApiKey] = useState(false);
  const [copiedEnv, setCopiedEnv] = useState(false);
  const [copiedOneLiner, setCopiedOneLiner] = useState(false);
  const [mode, setMode] = useState<"generator" | "openssl">("generator");
  const [isRotating, setIsRotating] = useState(false);

  const generateNewSecrets = () => {
    setIsRotating(true);
    setNextAuthSecret(generateBase64Secret());
    setEncryptionKey(generateHexSecret());
    setApiKeySecret(generateBase64Secret());
    setTimeout(() => setIsRotating(false), 250);
  };

  useEffect(() => {
    generateNewSecrets();
  }, []);

  const copyToClipboard = (text: string, setter: (val: boolean) => void) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setter(true);
    setTimeout(() => setter(false), 2000);
  };

  const envBlock = `# First-Boot Secrets
NEXTAUTH_SECRET="${nextAuthSecret}"
ENCRYPTION_KEY="${encryptionKey}"
API_KEY_SECRET="${apiKeySecret}"`;

  const opensslOneLiner = `echo "NEXTAUTH_SECRET=$(openssl rand -base64 32)" >> .env && echo "ENCRYPTION_KEY=$(openssl rand -hex 32)" >> .env && echo "API_KEY_SECRET=$(openssl rand -base64 32)" >> .env`;

  return (
    <div
      className={`overflow-hidden rounded-[14px] border border-slate-800 bg-[#0f172a] text-slate-200 shadow-sm ${className}`}
    >
      {/* Compact Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/90 bg-slate-900/80 px-3.5 py-2.5 sm:px-4">
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-md bg-[#d21a1b]/15 text-[#d21a1b]">
            <Key className="h-3.5 w-3.5" />
          </span>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-white">First-Boot Secrets</span>
            <span className="rounded bg-emerald-500/10 px-1.5 py-0.2 font-mono text-[10px] font-medium text-emerald-400">
              Required
            </span>
          </div>
        </div>

        {/* Action Controls & Mode Switcher */}
        <div className="flex items-center gap-1.5">
          <div className="flex items-center rounded-md border border-slate-800 bg-[#0b1120] p-0.5 font-mono text-[10px]">
            <button
              type="button"
              onClick={() => setMode("generator")}
              className={`rounded px-2 py-0.5 transition-colors ${
                mode === "generator"
                  ? "bg-slate-800 font-semibold text-white"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Generator
            </button>
            <button
              type="button"
              onClick={() => setMode("openssl")}
              className={`rounded px-2 py-0.5 transition-colors ${
                mode === "openssl"
                  ? "bg-slate-800 font-semibold text-white"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              OpenSSL
            </button>
          </div>

          {mode === "generator" && (
            <>
              <button
                type="button"
                onClick={generateNewSecrets}
                title="Regenerate random values"
                className="flex h-6 w-6 items-center justify-center rounded-md border border-slate-800 bg-slate-900 text-slate-400 transition-colors hover:bg-slate-800 hover:text-white"
              >
                <RefreshCw
                  className={`h-3 w-3 ${isRotating ? "rotate-180 duration-200" : ""}`}
                />
              </button>

              <button
                type="button"
                onClick={() => copyToClipboard(envBlock, setCopiedEnv)}
                className="inline-flex h-6 items-center gap-1 rounded-md bg-[#d21a1b] px-2 font-mono text-[10px] font-semibold text-white transition-colors hover:bg-[#b41516]"
              >
                {copiedEnv ? (
                  <>
                    <Check className="h-3 w-3" />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3 w-3" />
                    <span>Copy .env</span>
                  </>
                )}
              </button>
            </>
          )}
        </div>
      </div>

      {/* Content Area */}
      <div className="p-3 sm:p-3.5">
        {mode === "generator" ? (
          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
            {/* NEXTAUTH_SECRET Card */}
            <div className="rounded-lg border border-slate-800/80 bg-[#0b1120] p-2.5">
              <div className="mb-1 flex items-center justify-between">
                <span className="flex items-center gap-1 font-mono text-[11px] font-medium text-slate-300">
                  <ShieldCheck className="h-3 w-3 text-slate-400" />
                  NEXTAUTH_SECRET
                </span>
                <button
                  type="button"
                  onClick={() => copyToClipboard(nextAuthSecret, setCopiedNextAuth)}
                  className="flex items-center gap-1 font-mono text-[10px] text-slate-400 transition-colors hover:text-white"
                >
                  {copiedNextAuth ? (
                    <>
                      <Check className="h-3 w-3 text-[#059669]" />
                      <span className="text-[#059669]">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3 w-3" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
              <p className="truncate font-mono text-[11px] text-slate-300">
                {nextAuthSecret || "Generating..."}
              </p>
            </div>

            {/* ENCRYPTION_KEY Card */}
            <div className="rounded-lg border border-slate-800/80 bg-[#0b1120] p-2.5">
              <div className="mb-1 flex items-center justify-between">
                <span className="flex items-center gap-1 font-mono text-[11px] font-medium text-slate-300">
                  <Key className="h-3 w-3 text-slate-400" />
                  ENCRYPTION_KEY
                </span>
                <button
                  type="button"
                  onClick={() => copyToClipboard(encryptionKey, setCopiedEncryption)}
                  className="flex items-center gap-1 font-mono text-[10px] text-slate-400 transition-colors hover:text-white"
                >
                  {copiedEncryption ? (
                    <>
                      <Check className="h-3 w-3 text-[#059669]" />
                      <span className="text-[#059669]">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3 w-3" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
              <p className="truncate font-mono text-[11px] text-slate-300">
                {encryptionKey || "Generating..."}
              </p>
            </div>

            {/* API_KEY_SECRET Card */}
            <div className="rounded-lg border border-slate-800/80 bg-[#0b1120] p-2.5 sm:col-span-2 lg:col-span-1">
              <div className="mb-1 flex items-center justify-between">
                <span className="flex items-center gap-1 font-mono text-[11px] font-medium text-slate-300">
                  <Key className="h-3 w-3 text-slate-400" />
                  API_KEY_SECRET
                </span>
                <button
                  type="button"
                  onClick={() => copyToClipboard(apiKeySecret, setCopiedApiKey)}
                  className="flex items-center gap-1 font-mono text-[10px] text-slate-400 transition-colors hover:text-white"
                >
                  {copiedApiKey ? (
                    <>
                      <Check className="h-3 w-3 text-[#059669]" />
                      <span className="text-[#059669]">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3 w-3" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
              <p className="truncate font-mono text-[11px] text-slate-300">
                {apiKeySecret || "Generating..."}
              </p>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between rounded-lg border border-slate-800/80 bg-[#0b1120] p-2.5 font-mono text-xs">
              <div className="flex min-w-0 items-center gap-2 overflow-x-auto">
                <Terminal className="h-3.5 w-3.5 shrink-0 text-[#d21a1b]" />
                <code className="text-slate-200 text-[11px] whitespace-nowrap">
                  {opensslOneLiner}
                </code>
              </div>
              <button
                type="button"
                onClick={() => copyToClipboard(opensslOneLiner, setCopiedOneLiner)}
                className="ml-2 flex shrink-0 items-center gap-1 font-mono text-[10px] text-slate-300 hover:text-white"
              >
                {copiedOneLiner ? (
                  <>
                    <Check className="h-3 w-3 text-[#059669]" />
                    <span className="text-[#059669]">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3 w-3" />
                    <span>Copy 1-liner</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Minimal Postgres Note */}
        <div className="mt-2.5 flex items-center justify-between border-t border-slate-800/70 pt-2 text-[10px] text-slate-400">
          <div className="flex items-center gap-1.5">
            <Database className="h-3 w-3 text-slate-500 shrink-0" />
            <span>
              <strong className="text-slate-300">PostgreSQL 14+</strong> is required (bundled in Compose).
            </span>
          </div>
          <span className="hidden font-mono text-[10px] text-slate-500 sm:inline">
            AES-256 &amp; NextAuth JWT
          </span>
        </div>
      </div>
    </div>
  );
}
