"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Check, Copy } from "lucide-react";
import { copyText } from "@/lib/client-clipboard";

export function HomeInstall({ command }: { command: string }) {
  const [copied, setCopied] = useState(false);

  return (
    <div className="home-install">
      <div className="home-install-head">
        <span>Docker Compose</span>
        <button
          type="button"
          onClick={async () => {
            if (await copyText(command)) {
              setCopied(true);
              window.setTimeout(() => setCopied(false), 2000);
            }
          }}
          aria-label={copied ? "Install commands copied" : "Copy install commands"}
        >
          {copied ? <Check size={14} aria-hidden="true" /> : <Copy size={14} aria-hidden="true" />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre tabIndex={0} aria-label="Docker Compose quick start commands">
        <code>
          {command.split("\n").map((line, i) => (
            <span key={i} className={line.startsWith("#") ? "is-comment" : undefined}>
              {line}
              {"\n"}
            </span>
          ))}
        </code>
      </pre>
      <p className="home-install-next">
        Then open <code>http://localhost:3000/setup</code>, enter the bootstrap code,
        and create the first administrator.
      </p>
      <div className="home-install-foot">
        <span>Kubernetes, Swarm and split runtime are covered too.</span>
        <Link href="/deploy/" className="site-text-link">
          Deployment guides <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
