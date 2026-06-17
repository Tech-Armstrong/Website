import path from "node:path";
import type { KnowledgeArchiveSlug } from "@/types/knowledge-hub";

export const KNOWLEDGE_DIR = path.join(process.cwd(), "content", "knowledge");

export function knowledgeArchivePath(slug: KnowledgeArchiveSlug): string {
  return path.join(KNOWLEDGE_DIR, `${slug}.json`);
}

export function knowledgeMediaPath(): string {
  return path.join(KNOWLEDGE_DIR, "media-spotlight.json");
}

export function knowledgeFaqsPath(): string {
  return path.join(KNOWLEDGE_DIR, "faqs.json");
}
