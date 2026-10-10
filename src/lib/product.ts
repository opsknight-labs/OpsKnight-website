import manifest from "@/generated/product-manifest.json";
export const PRODUCT = manifest;
export type ProductPage = (typeof PRODUCT.platform.products)[number];
export const productDocs = (slug: string) =>
  `/docs/${PRODUCT.release.tag}/${slug.replace(/\/README$/, "")}/`;
export const productImage = (name: string) =>
  `/product/${name.replace(/\.png$/, ".webp")}`;
export const productProof = `v${PRODUCT.release.version} · ${PRODUCT.release.license} · Self-hosted · ${PRODUCT.inboundIntegrationCount} inbound integrations`;
