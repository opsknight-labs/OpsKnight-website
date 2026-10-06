import type { MetadataRoute } from "next";
import site from "@/../content/product/site.json";
import { PRODUCT } from "@/lib/product";
import solutions from "@/../content/product/solutions.json";
import comparisons from "@/../content/product/comparisons.json";
import { BRAND } from "@/lib/brand";
import { DOC_VERSIONS } from "@/lib/docs/versions";
import { getAllDocSlugs } from "@/lib/docs/content";

export const dynamic = "force-static";

const baseUrl = `https://${BRAND.domain}`;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(site.updatedAt);
  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/compare`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    ...[
      "/changelog",
      "/integrations",
      "/about",
      "/privacy",
      "/terms",
      "/brand",
      "/solutions",
      "/security",
      "/support",
      "/community",
      "/deploy",
      "/deploy/architecture",
      ...PRODUCT.platform.products.map((p) => `/product/${p.slug}`),
      ...PRODUCT.integrations.map((p) => `/integrations/${p.id}`),
      ...PRODUCT.deployments.models.map((p) => `/deploy/${p.id}`),
      ...solutions.map((p) => `/solutions/${p.slug}`),
      ...comparisons.map((p) => `/compare/${p.slug}`),
    ].map((route) => ({
      url: `${baseUrl}${route}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];

  for (const version of DOC_VERSIONS) {
    const docsModified =
      version.id === PRODUCT.release.tag
        ? new Date(PRODUCT.release.date)
        : undefined;
    routes.push({
      url: `${baseUrl}/docs/${version.id}/`,
      lastModified: docsModified,
      changeFrequency: "weekly",
      priority: 0.8,
    });

    const slugs = getAllDocSlugs(version.id);
    for (const slug of slugs) {
      if (slug.length === 0) continue;
      routes.push({
        url: `${baseUrl}/docs/${version.id}/${slug.join("/")}/`,
        lastModified: docsModified,
        changeFrequency: "monthly",
        priority: 0.6,
      });
    }
  }

  return routes;
}
