"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Search } from "lucide-react";
import { PRODUCT } from "@/lib/product";

const featuredIds = [
  "datadog",
  "grafana",
  "prometheus",
  "cloudwatch",
  "sentry",
  "webhook",
] as const;

const featured = featuredIds
  .map((id) => PRODUCT.integrations.find((item) => item.id === id))
  .filter((item): item is (typeof PRODUCT.integrations)[number] => Boolean(item));

export function HomepageIntegrationFinder() {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return featured;
    return PRODUCT.integrations
      .filter((item) =>
        [
          item.title,
          item.category,
          item.direction,
          item.protocol ?? "",
          item.kind,
        ]
          .join(" ")
          .toLowerCase()
          .includes(q),
      )
      .slice(0, 6);
  }, [query]);

  return (
    <div className="home-integration-finder">
      <div className="home-integration-finder-head">
        <div>
          <span>CONNECT THE STACK YOU ALREADY RUN</span>
          <strong>
            {PRODUCT.inboundIntegrationCount} inbound alert sources + Slack, Teams and Jira
          </strong>
        </div>
        <Link href="/integrations/">
          Explore all integrations <ArrowUpRight size={13} />
        </Link>
      </div>

      <label className="home-integration-search">
        <Search size={16} aria-hidden="true" />
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Find your stack..."
          aria-label="Find an OpsKnight integration"
        />
      </label>

      <div className="home-integration-results" aria-live="polite">
        {results.map((item) => (
          <Link key={item.id} href={`/integrations/${item.id}/`}>
            <div>
              <strong>{item.title}</strong>
              <span>
                {item.kind === "inbound" ? "Inbound" : "Workflow"} ·{" "}
                {item.category.replaceAll("-", " ")}
              </span>
            </div>
            <ArrowUpRight size={14} />
          </Link>
        ))}
        {!results.length ? (
          <p>
            No exact match. Generic Webhook can cover internal systems without a
            first-class adapter.
          </p>
        ) : null}
      </div>
    </div>
  );
}
