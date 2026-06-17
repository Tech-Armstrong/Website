import type {
  KnowledgeArchivePage,
  KnowledgeFaqPage,
  KnowledgeMediaPage,
} from "@/types/knowledge-hub";
import {
  knowledgeArchivePath,
  knowledgeFaqsPath,
  knowledgeMediaPath,
} from "./paths";
import { writeJsonAtomic } from "./write-json";

export async function writeKnowledgeArchive(
  page: KnowledgeArchivePage,
): Promise<void> {
  await writeJsonAtomic(knowledgeArchivePath(page.slug), page);
}

export async function writeKnowledgeMedia(
  page: KnowledgeMediaPage,
): Promise<void> {
  await writeJsonAtomic(knowledgeMediaPath(), page);
}

export async function writeKnowledgeFaqs(page: KnowledgeFaqPage): Promise<void> {
  await writeJsonAtomic(knowledgeFaqsPath(), page);
}
