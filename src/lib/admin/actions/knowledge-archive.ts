"use server";

import { requireAdmin } from "@/lib/admin/guard";
import {
  getKnowledgeArchive,
  writeKnowledgeArchive,
} from "@/lib/knowledge";
import { revalidatePublicPath } from "@/lib/admin/revalidate-public";
import type { KnowledgeArchivePage, KnowledgeArchiveSlug } from "@/types/knowledge-hub";

export type SaveActionResult = {
  ok: boolean;
  error?: string;
};

export async function saveKnowledgeArchiveAction(
  slug: KnowledgeArchiveSlug,
  page: KnowledgeArchivePage,
): Promise<SaveActionResult> {
  try {
    await requireAdmin();

    if (page.slug !== slug) {
      return { ok: false, error: "Slug mismatch." };
    }

    const payload: KnowledgeArchivePage = {
      ...page,
      updatedAt: new Date().toISOString(),
    };

    await writeKnowledgeArchive(payload);
    revalidatePublicPath(`/${slug}`);

    return { ok: true };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : "Save failed.",
    };
  }
}

export async function loadKnowledgeArchiveAction(
  slug: KnowledgeArchiveSlug,
): Promise<KnowledgeArchivePage | null> {
  await requireAdmin();
  return getKnowledgeArchive(slug);
}
