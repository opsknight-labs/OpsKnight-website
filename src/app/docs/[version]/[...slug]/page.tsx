import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getDocPage, getAllDocSlugs, getDocFilePath } from "@/lib/docs/content";
import { DocsToc } from "@/components/docs/DocsToc";
import { DocsMobileToc } from "@/components/docs/DocsMobileToc";
import { DocsArticleBody } from "@/components/docs/DocsArticleBody";
import { DOC_VERSIONS } from "@/lib/docs/versions";
import { ChevronRight, Clock, BookOpen } from "lucide-react";
import { DocsPrevNext } from "@/components/docs/DocsPrevNext";
import { BRAND } from "@/lib/brand";
import { docsHref } from "@/lib/docs/paths";

export const dynamicParams = false;
// export const dynamic = "force-static";


export async function generateMetadata({
  params,
}: {
  params: Promise<{ version: string; slug: string[] }>;
}): Promise<Metadata> {
  const { version, slug } = await params;
  const doc = await getDocPage(version, slug);
  if (!doc) {
    return {};
  }

  const canonical =
    doc.slug.length > 0
      ? docsHref(version, doc.slug)
      : docsHref(version);
  const title = doc.title;
  const description =
    doc.description ||
    `Learn ${doc.title} in the ${BRAND.name} documentation.`;

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      type: "article",
    },
    twitter: {
      title,
      description,
    },
  };
}

export async function generateStaticParams() {
  const params = [];
  for (const version of DOC_VERSIONS) {
    const slugs = getAllDocSlugs(version.id);
    for (const slug of slugs) {
      if (slug.length > 0) {
        params.push({ version: version.id, slug });
      }
    }
  }
  return params;
}

function estimateReadTime(html: string): number {
  // Strip HTML tags and count words
  const text = html.replace(/<[^>]*>/g, " ");
  const words = text.split(/\s+/).filter(Boolean).length;
  // Average reading speed: 200 words per minute
  return Math.max(1, Math.ceil(words / 200));
}

export default async function DocsPage({
  params,
}: {
  params: Promise<{ version: string; slug: string[] }>;
}) {
  const { version, slug } = await params;
  const doc = await getDocPage(version, slug);
  if (!doc) notFound();

  const section = slug[0];
  const readTime = estimateReadTime(doc.html);
  const filePath = getDocFilePath(version, slug);
  const githubDocPath = filePath?.includes("content/docs/")
    ? filePath.split("content/docs/")[1]
    : `${version}/README.md`;
  const editUrl = `${BRAND.links.github}/blob/main/docs/${githubDocPath}`;

  const breadcrumbs = [
    { label: "Docs", href: docsHref(version) },
    ...slug.map((s, i) => ({
      label: s.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase()),
      href: docsHref(version, slug.slice(0, i + 1)),
    })),
  ];

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_17rem] xl:grid-cols-[minmax(0,1fr)_18.5rem]">
      <article className="space-y-6 min-w-0">
        {/* Article Header */}
        <div className="overflow-hidden rounded-[14px] border border-slate-200 bg-white">
          {/* Breadcrumbs */}
          <div className="px-6 py-3 border-b border-slate-200 bg-slate-50">
            <nav className="flex items-center gap-1.5 text-xs">
              {breadcrumbs.map((crumb, i) => (
                <span key={crumb.href} className="flex items-center gap-1.5">
                  {i > 0 && <ChevronRight className="w-3 h-3 text-slate-400" />}
                  {i === breadcrumbs.length - 1 ? (
                    <span className="text-slate-900 font-semibold">{crumb.label}</span>
                  ) : (
                    <Link href={crumb.href} className="text-slate-500 hover:text-[#d21a1b] transition-colors">
                      {crumb.label}
                    </Link>
                  )}
                </span>
              ))}
            </nav>
          </div>

          {/* Title Section */}
          <div className="px-6 sm:px-8 py-6">
            {/* Meta badges */}
            <div className="flex flex-wrap items-center gap-3 mb-4">
              {section && (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-600">
                  <BookOpen className="w-3 h-3 text-[#d21a1b]" />
                  {section.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                </span>
              )}
              <span className="flex items-center gap-1.5 text-xs text-slate-500">
                <Clock className="w-3 h-3" />
                {readTime} min read
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-semibold text-slate-900 tracking-tight">
              {doc.title}
            </h1>

            {doc.description && (
              <p className="mt-3 text-slate-600 text-lg leading-relaxed max-w-3xl">
                {doc.description}
              </p>
            )}
          </div>
        </div>

        {/* Mobile Quick Jump TOC */}
        <DocsMobileToc headings={doc.headings} />

        {/* Article Body */}
        <div className="rounded-[14px] border border-slate-200 bg-white px-6 py-8 sm:px-10">
          <DocsArticleBody html={doc.html} />
          <DocsPrevNext version={version} currentPath={docsHref(version, slug)} />
        </div>

        {/* Footer Navigation */}
        <div className="flex items-center justify-between p-4 rounded-[12px] border border-slate-200 bg-white">
          <p className="text-xs text-slate-500">
            Last updated for {version}
          </p>
          <Link
            href={editUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-[#d21a1b] transition-colors font-medium"
          >
            Edit this page on GitHub
            <ChevronRight className="w-3 h-3" />
          </Link>
        </div>
      </article>

      {/* Table of Contents Sidebar */}
      <aside className="hidden lg:block">
        <div
          className="sticky top-20 pl-2 max-h-[calc(100vh-6rem)] overflow-y-auto custom-scrollbar"
          data-toc-container
        >
          <DocsToc headings={doc.headings} editUrl={editUrl} />
        </div>
      </aside>
    </div>
  );
}
