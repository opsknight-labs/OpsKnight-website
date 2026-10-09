import type { Metadata } from "next";
import Script from "next/script";
import { Manrope, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import "./site.css";
import { PRODUCT } from "@/lib/product";
import { BRAND } from "@/lib/brand";
import { ConditionalNavbar } from "@/components/layout/ConditionalNavbar";
import { ConditionalFooter } from "@/components/layout/ConditionalFooter";
import { ClientCommandPalette } from "@/components/navigation/ClientCommandPalette";

const baseUrl = `https://${BRAND.domain}`;
const mergedKeywords = Array.from(
  new Set([...(BRAND.keywords || []), ...(BRAND.seo.keywords || [])]),
);
const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: BRAND.name,
    url: `${baseUrl}/`,
    logo: `${baseUrl}${BRAND.assets.logo}`,
    sameAs: [BRAND.links.github],
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: BRAND.name,
    url: `${baseUrl}/`,
    description: BRAND.seo.description,
    publisher: {
      "@type": "Organization",
      name: BRAND.name,
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "OpsKnight",
    applicationCategory: "DevOpsApplication, BusinessApplication",
    softwareVersion: PRODUCT.release.version,
    datePublished: PRODUCT.release.date,
    operatingSystem: "Linux, POSIX (Docker, Kubernetes, Docker Swarm)",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    license: BRAND.licenseUrl,
    url: `${baseUrl}/`,
    codeRepository: BRAND.links.github,
    downloadUrl: `${BRAND.links.github}/releases/tag/${PRODUCT.release.tag}`,
    softwareRequirements: "PostgreSQL; Docker Compose or a supported container orchestration platform",
    description: BRAND.seo.description,
  },
];

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: BRAND.seo.title,
    template: `%s | ${BRAND.name}`,
  },
  description: BRAND.seo.description,
  keywords: mergedKeywords,
  applicationName: BRAND.name,
  creator: BRAND.authors?.[0]?.name,
  publisher: BRAND.name,
  authors: BRAND.authors
    ? BRAND.authors.map((author) => ({ ...author }))
    : undefined,
  category: "Technology",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: BRAND.seo.title,
    description: BRAND.seo.description,
    url: baseUrl,
    siteName: BRAND.name,
    images: [
      {
        url: "/social/opsknight.png",
        width: 1200,
        height: 630,
        alt: `${BRAND.name} — ${BRAND.tagline}`,
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: BRAND.seo.title,
    description: BRAND.seo.description,
    images: ["/social/opsknight.png"],
    creator: BRAND.authors[0]?.twitter
      ? `@${BRAND.authors[0].twitter.split("twitter.com/")[1]?.replace(/\/.*/, "")}`
      : undefined,
  },
  icons: {
    icon: [{url:"/brand/favicon.png",type:"image/png",sizes:"48x48"}],
    apple: "/brand/apple-touch-icon.png",
  },
  metadataBase: new URL(baseUrl),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${manrope.variable} ${jetBrainsMono.variable} antialiased bg-background text-foreground`}
        suppressHydrationWarning
      >
        <Script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <ConditionalNavbar />
        <main id="main-content">{children}</main>
        <ConditionalFooter />
        <ClientCommandPalette />
      </body>
    </html>
  );
}
