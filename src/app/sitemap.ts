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

function getRouteLastModified(route: string): Date {
  if (
    route === "/" ||
    route.startsWith("/about") ||
    route.startsWith("/support") ||
    route.startsWith("/contact") ||
    route.startsWith("/deploy")
  ) {
    return new Date("2026-10-09T00:00:00Z");
  }
  if (route.startsWith("/compare")) {
    return new Date("2026-10-08T00:00:00Z");
  }
  if (route.startsWith("/solutions")) {
    return new Date("2026-10-07T00:00:00Z");
  }
  if (route.startsWith("/security")) {
    return new Date("2026-10-05T00:00:00Z");
  }
  if (
    route.startsWith("/changelog") ||
    route.startsWith("/product") ||
    route.startsWith("/integrations") ||
    route.startsWith("/legal") ||
    route.startsWith("/privacy") ||
    route.startsWith("/terms") ||
    route.startsWith("/brand")
  ) {
    return new Date(PRODUCT.release.publishedAt);
  }
  return new Date(site.updatedAt);
}

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: getRouteLastModified("/"),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/compare/`,
      lastModified: getRouteLastModified("/compare"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact/`,
      lastModified: getRouteLastModified("/contact"),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    ...[
      "/changelog",
      "/integrations",
      "/about",
      "/legal",
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
      url: `${baseUrl}${route}/`,
      lastModified: getRouteLastModified(route),
      changeFrequency: "monthly" as const,
      priority: route.startsWith("/product") ? 0.8 : route.startsWith("/compare") ? 0.7 : 0.6,
    })),
  ];

  for (const version of DOC_VERSIONS) {
    const docsModified =
      version.id === PRODUCT.release.tag
        ? new Date(PRODUCT.release.publishedAt)
        : new Date("2025-06-15T00:00:00Z");
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
