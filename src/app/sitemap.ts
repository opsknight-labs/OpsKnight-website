import type { MetadataRoute } from "next";
import { BRAND } from "@/lib/brand";
import { COMPETITORS } from "@/lib/competitors";
import { DOC_VERSIONS } from "@/lib/docs/versions";
import { getAllDocSlugs } from "@/lib/docs/content";

export const dynamic = "force-static";

const baseUrl = `https://${BRAND.domain}`;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
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
      "/install",
      "/brand",
      "/use-cases",
      "/security",
      ...COMPETITORS.map((c) => c.href),
    ].map((route) => ({
      url: `${baseUrl}${route}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];

  for (const version of DOC_VERSIONS) {
    routes.push({
      url: `${baseUrl}/docs/${version.id}/`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    });

    const slugs = getAllDocSlugs(version.id);
    for (const slug of slugs) {
      if (slug.length === 0) continue;
      routes.push({
        url: `${baseUrl}/docs/${version.id}/${slug.join("/")}/`,
        lastModified,
        changeFrequency: "monthly",
        priority: 0.6,
      });
    }
  }

  return routes;
}
