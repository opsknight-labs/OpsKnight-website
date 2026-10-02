import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { getDocFilePath } from "./content";

export type SidebarItem = {
  title: string;
  href?: string;
  children?: SidebarItem[];
};

const DOCS_ROOT = path.join(process.cwd(), "content", "docs");
const ROOT_SECTION_ORDER = new Map<string, number>([
  ["getting-started", 1],
  ["core-concepts", 2],
  ["administration", 3],
  ["integrations", 4],
  ["api", 5],
  ["deployment", 6],
  ["security", 7],
  ["architecture", 8],
  ["mobile", 9],
]);

const V2_ROOT_SECTION_ORDER = new Map<string, number>([
  ["start", 1],
  ["concepts", 2],
  ["guides", 3],
  ["integrations", 4],
  ["operate", 5],
  ["reference", 6],
  ["troubleshooting", 7],
  ["develop", 8],
]);

function readTitle(filePath: string) {
  const content = fs.readFileSync(filePath, "utf8");
  const { data, content: body } = matter(content);
  if (typeof data.title === "string" && data.title.trim()) return data.title.trim();
  const titleLine = body.split("\n").find(line => line.startsWith("# "));
  if (titleLine) return titleLine.replace(/^#\s+/, "").trim();
  return path.basename(filePath).replace(/\.mdx?$/, "");
}

function readOrder(filePath: string) {
  const content = fs.readFileSync(filePath, "utf8");
  const { data } = matter(content);
  if (typeof data.order === "number") return data.order;
  if (typeof data.order === "string") {
    const parsed = Number(data.order);
    if (Number.isFinite(parsed)) return parsed;
  }
  return undefined;
}

function getPreferredOrder(baseHref: string[], entryName: string, version: string) {
  if (baseHref.length === 0) {
    return (version.startsWith("v2") ? V2_ROOT_SECTION_ORDER : ROOT_SECTION_ORDER).get(entryName);
  }
  return undefined;
}

function buildTree(dirPath: string, baseHref: string[], version: string): SidebarItem[] {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  const items: Array<SidebarItem & { order?: number }> = [];

  for (const entry of entries) {
    if (entry.name.startsWith(".")) continue;
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      const children = buildTree(fullPath, [...baseHref, entry.name], version);
      if (!children.length) continue;
      const indexPath = getDocFilePath(version, [...baseHref, entry.name]);
      const title = indexPath ? readTitle(indexPath) : entry.name.replace(/-/g, " ");
      const order =
        indexPath ? readOrder(indexPath) : getPreferredOrder(baseHref, entry.name, version);
      items.push({
        title,
        href: indexPath ? `/docs/${version}/${[...baseHref, entry.name].join("/")}/` : undefined,
        children,
        order,
      });
    } else if (entry.isFile() && entry.name.match(/\.mdx?$/)) {
      const slug = entry.name.replace(/\.mdx?$/, "");
      if (slug.toLowerCase() === "readme") {
        continue;
      }
      const href = `/docs/${version}/${[...baseHref, slug].join("/")}/`;
      const title = readTitle(fullPath);
      const order = readOrder(fullPath);
      items.push({ title, href, order });
    }
  }

  items.sort((a, b) => {
    const orderA = a.order ?? Number.POSITIVE_INFINITY;
    const orderB = b.order ?? Number.POSITIVE_INFINITY;
    if (orderA !== orderB) return orderA - orderB;
    return a.title.localeCompare(b.title);
  });

  return items.map(item => {
    const { order, ...rest } = item;
    void order;
    return rest;
  });
}

export function getSidebar(version: string): SidebarItem[] {
  const root = path.join(DOCS_ROOT, version);
  return buildTree(root, [], version);
}
