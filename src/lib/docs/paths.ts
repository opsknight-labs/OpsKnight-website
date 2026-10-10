import manifest from "@/generated/product-manifest.json";

/** Link directly to exported release pages; /docs/latest remains a Cloudflare redirect for bookmarks. */
export const DOCS_CHANNEL = manifest.release.tag;

/** Docs URLs must end with `/` so Next's RSC fetch uses `index.txt`, not a sibling `.txt`. */
export function withTrailingSlash(path: string) {
  if (!path || path.startsWith("#") || /^[a-z]+:/i.test(path)) return path;
  const [withoutHash, hash] = path.split("#");
  const [pathname, search] = withoutHash.split("?");
  if (/\.[a-z0-9]+$/i.test(pathname)) return path;
  const slashed = pathname.endsWith("/") ? pathname : `${pathname}/`;
  return `${slashed}${search ? `?${search}` : ""}${hash ? `#${hash}` : ""}`;
}

export function docsHref(version: string, slug: string[] = []) {
  const parts = ["docs", version, ...slug.filter(Boolean)].join("/");
  return withTrailingSlash(`/${parts}`);
}

/** Newest published docs tree. Pass a path like "getting-started/installation". */
export function latestDocsHref(slugPath = "") {
  const slug = slugPath
    .replace(/^\/+|\/+$/g, "")
    .split("/")
    .filter(Boolean);
  return docsHref(DOCS_CHANNEL, slug);
}

export function pathsMatch(href: string | undefined, active: string) {
  if (!href) return false;
  const a = withTrailingSlash(href);
  const b = withTrailingSlash(active);
  return b === a;
}

export function pathIsAncestor(parentHref: string | undefined, active: string) {
  if (!parentHref) return false;
  const a = withTrailingSlash(parentHref);
  const b = withTrailingSlash(active);
  return b !== a && b.startsWith(a);
}
