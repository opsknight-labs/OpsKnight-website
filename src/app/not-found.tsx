import Link from "next/link";
export default function NotFound() {
  return (
    <div className="site-page">
      <section className="site-section not-found">
        <div className="site-container">
          <p className="site-eyebrow">404 / SIGNAL NOT FOUND</p>
          <h1 className="text-5xl font-bold tracking-tight">
            This page isn’t here.
          </h1>
          <p className="site-description">
            Return to the platform or find what you need in the documentation.
          </p>
          <div className="site-actions">
            <Link className="site-action" href="/">
              Back to OpsKnight
            </Link>
            <Link className="site-action secondary" href="/docs/latest/">
              Documentation
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
