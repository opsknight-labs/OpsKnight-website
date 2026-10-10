import { BreadcrumbSchema } from "@/components/site/BreadcrumbSchema";
import { siteMetadata } from "@/lib/site-metadata";
import Link from "next/link";
import { PRODUCT } from "@/lib/product";
import {
  Action,
  SectionIntro,
  TextLink,
  FinalCTA,
} from "@/components/site/Primitives";
import {
  ShieldAlert,
  CalendarDays,
  PhoneCall,
  MessageSquare,
  Globe,
  BarChart3,
  FileText,
  Smartphone,
  ShieldCheck,
  Cpu,
} from "lucide-react";

export const metadata = siteMetadata({
  title: "Product Overview — OpsKnight",
  description:
    "Explore the complete OpsKnight platform: incident command, on-call schedules, multi-channel paging, ChatOps, status pages, postmortems, and self-hosted operations.",
  alternates: { canonical: "/product/" },
  openGraph: { url: "/product/" },
});

const ICON_MAP: Record<string, React.ComponentType<{ size?: number }>> = {
  incidents: ShieldAlert,
  "on-call": CalendarDays,
  paging: PhoneCall,
  chatops: MessageSquare,
  "status-pages": Globe,
  analytics: BarChart3,
  postmortems: FileText,
  mobile: Smartphone,
  security: ShieldCheck,
  operations: Cpu,
};

export default function ProductOverviewPage() {
  return (
    <div className="site-page site-page--product site-page--product-index">
      <BreadcrumbSchema name="Product Overview" path="/product/" />
      <section className="interior-hero site-dark">
        <div className="site-container">
          <nav aria-label="Breadcrumb" className="breadcrumb">
            <Link href="/">OpsKnight</Link>
            <span>/</span>
            <span>Product</span>
          </nav>
          <p className="site-eyebrow">
            <span className="signal-dot" />
            PLATFORM CAPABILITIES
          </p>
          <h1>The incident operations platform you control.</h1>
          <p className="site-description">
            From the first alert to continuous learning. Ten core capabilities
            engineered to run securely on infrastructure you own and govern.
          </p>
          <div className="site-actions">
            <Action href="/install/">Install OpsKnight</Action>
            <Action href="/#incident-loop" secondary>
              See the incident loop
            </Action>
          </div>
        </div>
      </section>

      <section className="site-section site-white">
        <div className="site-container">
          <SectionIntro
            eyebrow="CAPABILITIES"
            title="Ten components, one integrated engine."
          >
            Deploy everything in an integrated container or scale independent
            worker roles for high-throughput operational demands.
          </SectionIntro>

          <div className="pillars-grid" style={{ marginTop: "40px" }}>
            {PRODUCT.platform.products.map((p, index) => {
              const Icon = ICON_MAP[p.slug] ?? ShieldAlert;
              return (
                <div key={p.slug} className="pillar-card">
                  <div className="pillar-header">
                    <p className="site-eyebrow">
                      <span className="signal-dot" />
                      {String(index + 1).padStart(2, "0")} / {p.label.toUpperCase()}
                    </p>
                    <div className="pillar-icon">
                      <Icon size={20} />
                    </div>
                  </div>
                  <h3>{p.label}</h3>
                  <p>{p.description}</p>
                  <TextLink href={`/product/${p.slug}/`}>
                    Explore {p.label.toLowerCase()}
                  </TextLink>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <FinalCTA />
    </div>
  );
}
