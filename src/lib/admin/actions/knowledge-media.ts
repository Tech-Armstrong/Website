"use server";

import { requireAdmin } from "@/lib/admin/guard";
import {
  getKnowledgeMedia,
  writeKnowledgeMedia,
} from "@/lib/knowledge";
import { revalidatePublicPath } from "@/lib/admin/revalidate-public";
import type { KnowledgeMediaPage } from "@/types/knowledge-hub";
import type { SaveActionResult } from "./knowledge-archive";

export async function saveKnowledgeMediaAction(
  page: KnowledgeMediaPage,
): Promise<SaveActionResult> {
  try {
    await requireAdmin();

    const payload: KnowledgeMediaPage = {
      ...page,
      slug: "media-spotlight",
      updatedAt: new Date().toISOString(),
    };

    await writeKnowledgeMedia(payload);
    revalidatePublicPath("/media-spotlight");

    return { ok: true };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : "Save failed.",
    };
  }
}

export async function loadKnowledgeMediaAction(): Promise<KnowledgeMediaPage | null> {
  await requireAdmin();
  return getKnowledgeMedia();
}
