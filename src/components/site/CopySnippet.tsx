"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { copyText } from "@/lib/client-clipboard";

export function CopySnippet({
  label,
  code,
}: {
  label: string;
  code: string;
}) {
  const [copied, setCopied] = useState(false);

  return (
    <div className="copy-snippet">
      <div className="copy-snippet-head">
        <span>{label}</span>
        <button
          type="button"
          onClick={async () => {
            const ok = await copyText(code);
            if (!ok) return;
            setCopied(true);
            window.setTimeout(() => setCopied(false), 1600);
          }}
          aria-label={`Copy ${label}`}
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre><code>{code}</code></pre>
    </div>
  );
}
