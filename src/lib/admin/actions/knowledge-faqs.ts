"use server";

import { requireAdmin } from "@/lib/admin/guard";
import { getKnowledgeFaqs, writeKnowledgeFaqs } from "@/lib/knowledge";
import { revalidatePublicPath } from "@/lib/admin/revalidate-public";
import type { KnowledgeFaqPage } from "@/types/knowledge-hub";
import type { SaveActionResult } from "./knowledge-archive";

export async function saveKnowledgeFaqsAction(
  page: KnowledgeFaqPage,
): Promise<SaveActionResult> {
  try {
    await requireAdmin();

    const payload: KnowledgeFaqPage = {
      ...page,
      slug: "faqs",
      updatedAt: new Date().toISOString(),
    };

    await writeKnowledgeFaqs(payload);
    revalidatePublicPath("/faqs");

    return { ok: true };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : "Save failed.",
    };
  }
}

export async function loadKnowledgeFaqsAction(): Promise<KnowledgeFaqPage | null> {
  await requireAdmin();
  return getKnowledgeFaqs();
}
