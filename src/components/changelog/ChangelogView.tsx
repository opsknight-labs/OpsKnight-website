"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowUpRight, Check, Copy, Terminal } from "lucide-react";
import {
  CHANGE_KIND_LABEL,
  type ChangeKind,
  type ReleaseItem,
  releases,
} from "@/lib/changelog";
import { copyText } from "@/lib/client-clipboard";

const FILTERS: { id: "all" | ChangeKind; label: string }[] = [
  { id: "all", label: "All" },
  { id: "added", label: "New" },
  { id: "security", label: "Security" },
  { id: "fixed", label: "Fixes" },
  { id: "changed", label: "Changes" },
  { id: "performance", label: "Performance" },
];

const KIND_TONE: Record<ChangeKind, string> = {
  added: "change-kind-new",
  security: "change-kind-security",
  fixed: "change-kind-fix",
  changed: "change-kind-change",
  performance: "change-kind-performance",
};

function CopyPull({ tag }: { tag: string }) {
  const [copied, setCopied] = useState(false);
  const command = `docker pull ${tag}`;

  return (
    <div className="release-command">
      <Terminal size={15} aria-hidden="true" />
      <code>{command}</code>
      <button
        type="button"
        onClick={async () => {
          const ok = await copyText(command);
          if (!ok) return;
          setCopied(true);
          window.setTimeout(() => setCopied(false), 1600);
        }}
        aria-label="Copy docker pull command"
      >
        {copied ? <Check size={15} /> : <Copy size={15} />}
        <span>{copied ? "Copied" : "Copy"}</span>
      </button>
    </div>
  );
}

function ReleaseArticle({
  release,
  filter,
}: {
  release: ReleaseItem;
  filter: "all" | ChangeKind;
}) {
  const categories = release.categories.filter(
    (category) => filter === "all" || category.type === filter,
  );
  if (!categories.length) return null;

  return (
    <article id={release.slug} className="release-article">
      <div className="release-heading">
        <div>
          <div className="release-title-line">
            <h2>{release.version}</h2>
            {release.badge ? <span className="release-badge">{release.badge}</span> : null}
          </div>
          <p>{release.date}</p>
        </div>
        <a href={release.githubReleaseUrl} target="_blank" rel="noopener noreferrer">
          GitHub release <ArrowUpRight size={14} />
        </a>
      </div>

      <p className="release-summary">{release.summary}</p>
      <CopyPull tag={release.dockerTag} />

      <div className="release-categories">
        {categories.map((category) => (
          <section key={`${release.slug}-${category.title}`}>
            <div className="release-category-title">
              <span className={KIND_TONE[category.type]}>
                {CHANGE_KIND_LABEL[category.type]}
              </span>
              <h3>{category.title}</h3>
            </div>
            <ul>
              {category.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </article>
  );
}

export function ChangelogView() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]["id"]>("all");
  const [active, setActive] = useState(releases[0]?.slug ?? "");

  const visible = useMemo(
    () =>
      releases.filter((release) =>
        release.categories.some(
          (category) => filter === "all" || category.type === filter,
        ),
      ),
    [filter],
  );

  useEffect(() => {
    const nodes = visible
      .map((release) => document.getElementById(release.slug))
      .filter((node): node is HTMLElement => Boolean(node));
    if (!nodes.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const hit = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (hit?.target.id) setActive(hit.target.id);
      },
      { rootMargin: "-18% 0px -68% 0px", threshold: [0, 0.25, 0.5] },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [visible]);

  const jumpTo = (slug: string) => {
    setActive(slug);
    document.getElementById(slug)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="changelog-experience">
      <div className="changelog-filters" aria-label="Release filters">
        <div role="tablist" aria-label="Filter release notes by change type">
          {FILTERS.map((item) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={filter === item.id}
              onClick={() => setFilter(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>
        <label className="changelog-mobile-version">
          <span>Release</span>
          <select value={active} onChange={(event) => jumpTo(event.target.value)}>
            {visible.map((release) => (
              <option key={release.slug} value={release.slug}>
                {release.version}{release.badge ? " · Latest" : ""}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="changelog-grid">
        <nav aria-label="Release versions" className="release-nav">
          <span>VERSIONS</span>
          <ol>
            {releases.map((release) => {
              const shown = visible.some((item) => item.slug === release.slug);
              return (
                <li key={release.slug}>
                  <a
                    href={shown ? `#${release.slug}` : undefined}
                    aria-current={active === release.slug ? "true" : undefined}
                    aria-disabled={!shown}
                    onClick={(event) => {
                      if (!shown) event.preventDefault();
                    }}
                  >
                    {release.version}
                    {release.badge ? <small>{release.badge}</small> : null}
                  </a>
                </li>
              );
            })}
          </ol>
        </nav>

        <div className="release-stream">
          {visible.map((release) => (
            <ReleaseArticle key={release.slug} release={release} filter={filter} />
          ))}
          {!visible.length ? <p className="empty-result">Nothing in this filter.</p> : null}
        </div>
      </div>
    </div>
  );
}
