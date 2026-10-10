import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeHighlight from "rehype-highlight";
import rehypeStringify from "rehype-stringify";
import type { Node } from "unist";
import { visit } from "unist-util-visit";

import path from "node:path";
import { resolveDocLink } from "./link-resolver.mjs";

type RenderOptions = {
  imageBasePath?: string;
  docVersion?: string;
  docRelDir?: string;
};

type HastElement = {
  type: "element";
  tagName: string;
  properties?: Record<string, unknown>;
  children?: Array<HastElement | { type: "text"; value: string } | Node>;
};

function classList(node: { properties?: Record<string, unknown> } | undefined): string[] {
  const value = node?.properties?.className;
  if (Array.isArray(value)) return value.map(String);
  if (typeof value === "string") return value.split(/\s+/).filter(Boolean);
  return [];
}

function setClass(node: HastElement, classes: string[]) {
  node.properties = { ...node.properties, className: classes };
}

function addClass(node: HastElement, ...classes: string[]) {
  setClass(node, [...new Set([...classList(node), ...classes])]);
}

function textContent(node: Node | undefined): string {
  if (!node) return "";
  if ((node as { type?: string }).type === "text") {
    return String((node as { value?: string }).value ?? "");
  }
  const children = (node as HastElement).children;
  if (!Array.isArray(children)) return "";
  return children.map((child) => textContent(child as Node)).join("");
}

function languageFromCode(code: HastElement): string {
  const fromClass = classList(code)
    .find((name) => name.startsWith("language-"))
    ?.replace(/^language-/, "")
    .toLowerCase();
  if (fromClass && fromClass !== "plaintext") return fromClass;

  const snippet = textContent(code).trim();
  if (/^(GET|POST|PUT|PATCH|DELETE|HEAD|OPTIONS)\s+\S+/i.test(snippet)) return "http";
  if (/^\$\s/.test(snippet) || /^(npm|pnpm|yarn|npx|curl|docker|kubectl|helm)\s/.test(snippet)) {
    return "bash";
  }
  return "text";
}

function rehypeDocImagePaths(options: RenderOptions) {
  const basePath = options.imageBasePath?.replace(/\/$/, "");
  if (!basePath) return () => {};
  return (tree: unknown) => {
    visit(tree as Node, "element", (node: HastElement) => {
      if (node.tagName !== "img") return;
      const src = node.properties?.src;
      if (typeof src !== "string") return;
      if (!src.startsWith("./assets/") && !src.startsWith("../assets/")) return;
      const normalized = src.replace(/^\.{1,2}\//, "");
      node.properties = { ...node.properties, src: `${basePath}/${normalized}` };
    });
  };
}

function rehypeDocLinkPaths(options: RenderOptions) {
  const version = options.docVersion;
  const relDir = options.docRelDir ?? "";

  return (tree: unknown) => {
    visit(tree as Node, "element", (node: HastElement) => {
      if (node.tagName !== "a") return;
      const href = node.properties?.href;
      if (typeof href !== "string") return;
      if (
        href.startsWith("http://") ||
        href.startsWith("https://") ||
        href.startsWith("#") ||
        href.startsWith("mailto:")
      ) {
        return;
      }

      // Check if this is an image or static asset link
      if (/\.(png|jpe?g|svg|webp|gif|drawio)$/i.test(href)) {
        const imgBase = path.basename(href);
        node.properties = {
          ...node.properties,
          href: `/docs/${version}/assets/${imgBase}`,
          target: "_blank",
          rel: "noopener noreferrer",
        };
        return;
      }

      const [pathAndSearch, hash] = href.split("#");
      const [rawPathname, search] = pathAndSearch.split("?");

      // Remove .md suffix and leading ./
      let clean = rawPathname.replace(/\.mdx?$/i, "").replace(/^\.\//, "");

      if (clean.startsWith("/")) {
        // Absolute path from site root
        if (!clean.startsWith("/docs") && version) {
          clean = `/docs/${version}${clean}`;
        }
      } else if (version) {
        const resolved = resolveDocLink(rawPathname, version, relDir);
        if (!resolved) {
          // Preserve historical text while preventing navigation to missing pages.
          node.tagName = "span";
          const properties = { ...node.properties };
          delete properties.href;
          node.properties = { ...properties, title: "This referenced page is not included in this documentation release." };
          return;
        }
        clean = resolved;
      }

      // Ensure trailing slash on directory/page links so Next.js static router navigates to index.html
      if (!clean.endsWith("/") && !/\.[a-z0-9]+$/i.test(clean)) {
        clean = `${clean}/`;
      }

      const finalHref = `${clean}${search ? `?${search}` : ""}${hash ? `#${hash}` : ""}`;
      node.properties = { ...node.properties, href: finalHref };
    });
  };
}

/** Page chrome already shows the title — drop the duplicate markdown H1. */
function rehypeDropLeadingH1() {
  return (tree: HastElement) => {
    const children = tree.children;
    if (!Array.isArray(children)) return;
    const index = children.findIndex((child) => (child as HastElement).tagName === "h1");
    if (index === -1 || index > 2) return;
    children.splice(index, 1);
    const next = children[index] as HastElement | undefined;
    if (next?.tagName === "hr") children.splice(index, 1);
  };
}

function rehypeLeadParagraph() {
  return (tree: HastElement) => {
    const children = tree.children;
    if (!Array.isArray(children)) return;
    const first = children.find((child) => (child as HastElement).type === "element") as
      | HastElement
      | undefined;
    if (first?.tagName === "p") addClass(first, "docs-lead");
  };
}

function rehypeCallouts() {
  return (tree: unknown) => {
    visit(tree as Node, "element", (node: HastElement) => {
      if (node.tagName !== "blockquote") return;
      const raw = textContent(node).trim();
      
      // Match GitHub-style [!NOTE], [!WARNING], etc., or standard "Note:", "**Note**:"
      const ghMatch = /^\[!(NOTE|WARNING|TIP|IMPORTANT|CAUTION)\]\s*/i.exec(raw);
      const standardMatch = /^(\*\*)?(Note|Warning|Tip|Important|Caution|Info)(\*\*)?\s*[:—-]\s*/i.exec(raw);
      
      if (!ghMatch && !standardMatch) return;
      
      const kind = (ghMatch ? ghMatch[1] : standardMatch![2]).toLowerCase();
      const variant =
        kind === "warning"
          ? "warning"
          : kind === "tip"
            ? "success"
            : kind === "important" || kind === "caution"
              ? "danger"
              : "info";

      node.tagName = "div";
      setClass(node, ["docs-callout", `docs-callout-${variant}`]);
      const label = kind.charAt(0).toUpperCase() + kind.slice(1);
      
      const firstP = node.children?.find((child) => (child as HastElement).tagName === "p") as
        | HastElement
        | undefined;
      if (!firstP) return;

      const prefixRegex = ghMatch
        ? /^\[!(NOTE|WARNING|TIP|IMPORTANT|CAUTION)\]\s*/i
        : /^(\*\*)?(Note|Warning|Tip|Important|Caution|Info)(\*\*)?\s*[:—-]\s*/i;
      
      const rest = textContent(firstP).replace(prefixRegex, "");
      firstP.children = [
        {
          type: "element",
          tagName: "span",
          properties: { className: ["docs-callout-label"] },
          children: [{ type: "text", value: label }],
        } as HastElement,
        { type: "text", value: rest ? ` ${rest}` : "" },
      ];
    });
  };
}

function rehypeTableWrap() {
  return (tree: unknown) => {
    visit(tree as Node, "element", (node: HastElement, index, parent: HastElement | undefined) => {
      if (node.tagName !== "table" || !parent || typeof index !== "number") return;
      if (classList(parent).includes("docs-table-wrap")) return;
      parent.children![index] = {
        type: "element",
        tagName: "div",
        properties: { className: ["docs-table-wrap"] },
        children: [node],
      };
    });
  };
}

function rehypeCodeFrames() {
  return (tree: unknown) => {
    visit(tree as Node, "element", (node: HastElement, index, parent: HastElement | undefined) => {
      if (node.tagName !== "pre" || !parent || typeof index !== "number") return;
      if (classList(parent).includes("docs-code")) return;

      const code = node.children?.find((child) => (child as HastElement).tagName === "code") as
        | HastElement
        | undefined;
      const lang = code ? languageFromCode(code) : "text";
      addClass(node, "docs-code-pre");

      parent.children![index] = {
        type: "element",
        tagName: "div",
        properties: { className: ["docs-code"] },
        children: [
          {
            type: "element",
            tagName: "div",
            properties: { className: ["docs-code-bar"] },
            children: [
              {
                type: "element",
                tagName: "span",
                properties: { className: ["docs-code-lang"] },
                children: [{ type: "text", value: lang }],
              },
              {
                type: "element",
                tagName: "button",
                properties: {
                  type: "button",
                  className: ["docs-code-copy"],
                  "aria-label": "Copy code",
                },
                children: [{ type: "text", value: "Copy" }],
              },
            ],
          },
          node,
        ],
      };
    });
  };
}

export async function renderMarkdown(markdown: string, options: RenderOptions = {}) {
  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, { behavior: "wrap" })
    .use(rehypeHighlight)
    .use(rehypeDocImagePaths, options)
    .use(rehypeDocLinkPaths, options)
    .use(rehypeDropLeadingH1)
    .use(rehypeLeadParagraph)
    .use(rehypeCallouts)
    .use(rehypeTableWrap)
    .use(rehypeCodeFrames)
    // @ts-expect-error rehype typings don't align with unified's overloaded use signature
    .use(rehypeStringify)
    .process(markdown);

  return String(file);
}

export function extractHeadings(markdown: string) {
  const lines = markdown.split("\n");
  const headings: { depth: number; text: string; id: string }[] = [];

  for (const line of lines) {
    const match = /^(#{2,3})\s+(.*)/.exec(line.trim());
    if (!match) continue;
    const depth = match[1].length;
    const text = match[2].trim();
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-");
    headings.push({ depth, text, id });
  }

  return headings;
}
