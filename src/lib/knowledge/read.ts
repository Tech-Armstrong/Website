import { readFile } from "node:fs/promises";
import { unstable_noStore as noStore } from "next/cache";
import type {
  KnowledgeArchivePage,
  KnowledgeArchiveSlug,
  KnowledgeFaqPage,
  KnowledgeMediaPage,
} from "@/types/knowledge-hub";
import {
  knowledgeArchivePath,
  knowledgeFaqsPath,
  knowledgeMediaPath,
} from "./paths";

async function readJsonFile<T>(filepath: string): Promise<T | null> {
  try {
    const raw = await readFile(filepath, "utf8");
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export async function getKnowledgeArchive(
  slug: KnowledgeArchiveSlug,
): Promise<KnowledgeArchivePage | null> {
  noStore();
  return readJsonFile<KnowledgeArchivePage>(knowledgeArchivePath(slug));
}

export async function getKnowledgeMedia(): Promise<KnowledgeMediaPage | null> {
  noStore();
  return readJsonFile<KnowledgeMediaPage>(knowledgeMediaPath());
}

export async function getKnowledgeFaqs(): Promise<KnowledgeFaqPage | null> {
  noStore();
  return readJsonFile<KnowledgeFaqPage>(knowledgeFaqsPath());
}

export async function getKnowledgeArchiveStats(
  slug: KnowledgeArchiveSlug,
): Promise<{ itemCount: number; updatedAt: string | null }> {
  const page = await getKnowledgeArchive(slug);
  if (!page) {
    return { itemCount: 0, updatedAt: null };
  }

  const itemCount = page.groups.reduce(
    (sum, group) => sum + group.items.length,
    0,
  );

  return { itemCount, updatedAt: page.updatedAt };
}

export async function getKnowledgeMediaStats(): Promise<{
  articleCount: number;
  podcastCount: number;
  updatedAt: string | null;
}> {
  const page = await getKnowledgeMedia();
  if (!page) {
    return { articleCount: 0, podcastCount: 0, updatedAt: null };
  }

  return {
    articleCount: page.articles.length,
    podcastCount: page.podcasts.length,
    updatedAt: page.updatedAt,
  };
}

export async function getKnowledgeFaqStats(): Promise<{
  faqCount: number;
  updatedAt: string | null;
}> {
  const page = await getKnowledgeFaqs();
  if (!page) {
    return { faqCount: 0, updatedAt: null };
  }

  return { faqCount: page.faqs.length, updatedAt: page.updatedAt };
}
