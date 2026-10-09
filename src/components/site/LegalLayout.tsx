import type { ReactNode } from "react";

type LegalSection = readonly [id: string, label: string];
type LegalFact = {
  label: string;
  value: ReactNode;
};

export function LegalLayout({
  eyebrow,
  title,
  description,
  lastUpdated,
  navLabel,
  sections,
  facts,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  lastUpdated: string;
  navLabel: string;
  sections: readonly LegalSection[];
  facts: readonly LegalFact[];
  children: ReactNode;
}) {
  return (
    <div className="site-page site-page--legal site-page--legal-document">
      <section className="legal-document-hero">
        <div className="site-container">
          <p className="site-eyebrow">
            <span className="signal-dot" /> {eyebrow}
          </p>
          <h1>{title}</h1>
          <p className="site-description">{description}</p>
          <p className="legal-updated">Last updated · {lastUpdated}</p>
        </div>
      </section>

      <section className="site-section legal-reading-section">
        <div className="site-container legal-layout">
          <aside className="legal-meta">
            <div className="legal-meta-facts">
              {facts.map((fact) => (
                <div className="legal-meta-fact" key={fact.label}>
                  <span>{fact.label}</span>
                  <strong>{fact.value}</strong>
                </div>
              ))}
            </div>
            <nav aria-label={navLabel}>
              <span>ON THIS PAGE</span>
              {sections.map(([id, label]) => (
                <a key={id} href={`#${id}`}>
                  {label}
                </a>
              ))}
            </nav>
          </aside>

          <article className="legal-copy">{children}</article>
        </div>
      </section>
    </div>
  );
}
