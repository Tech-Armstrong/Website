import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { decodeHtmlEntities, excerptFromHtml } from "@/lib/blog/html";
import { EXCLUDED_PAGE_SLUGS } from "@/lib/site/config";
import type { YoastMetadata } from "@/types/blog";

const PAGES_DIR = path.join(process.cwd(), "content", "pages");

export type MarketingPage = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  plainTextExcerpt: string;
  content: string;
  date: string;
  modified: string;
  link: string;
  yoast: YoastMetadata | null;
};

type PageRaw = {
  id: number;
  slug: string;
  status: string;
  type: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  modified: string;
  link: string;
  yoast: YoastMetadata | null;
};

function enrichPage(raw: PageRaw): MarketingPage {
  return {
    id: raw.id,
    slug: raw.slug,
    title: decodeHtmlEntities(raw.title),
    excerpt: raw.excerpt,
    plainTextExcerpt: excerptFromHtml(raw.excerpt || raw.content, 200),
    content: raw.content,
    date: raw.date,
    modified: raw.modified,
    link: raw.link,
    yoast: raw.yoast,
  };
}

async function readPageFile(filename: string): Promise<MarketingPage | null> {
  if (!filename.endsWith(".json") || filename === "_index.json") {
    return null;
  }

  const raw = JSON.parse(
    await readFile(path.join(PAGES_DIR, filename), "utf8"),
  ) as PageRaw;

  if (raw.status !== "publish" || raw.type !== "page") {
    return null;
  }

  if (EXCLUDED_PAGE_SLUGS.has(raw.slug)) {
    return null;
  }

  return enrichPage(raw);
}

export async function getAllMarketingPages(): Promise<MarketingPage[]> {
  const files = await readdir(PAGES_DIR);
  const pages = await Promise.all(files.map(readPageFile));

  return pages
    .filter((page): page is MarketingPage => page !== null)
    .sort(
      (a, b) => new Date(b.modified).getTime() - new Date(a.modified).getTime(),
    );
}

export async function getMarketingPageSlugs(): Promise<string[]> {
  const pages = await getAllMarketingPages();
  return pages.map((page) => page.slug);
}

export async function getMarketingPageBySlug(
  slug: string,
): Promise<MarketingPage | null> {
  const pages = await getAllMarketingPages();
  return pages.find((page) => page.slug === slug) ?? null;
}
