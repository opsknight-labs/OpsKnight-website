import type { Metadata } from "next";
export function siteMetadata(page: Metadata): Metadata {
  const title = typeof page.title === "string" ? page.title : "OpsKnight";
  const description = page.description ?? "Incident operations you control.";
  const image = "/social/opsknight.png";
  return {
    ...page,
    title: title.startsWith("OpsKnight") ? {absolute:title} : page.title,
    openGraph: {
      title,
      description,
      images: [
        { url: image, width: 1200, height: 630, alt: `OpsKnight — ${title}` },
      ],
      ...page.openGraph,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      ...page.twitter,
    },
  };
}
