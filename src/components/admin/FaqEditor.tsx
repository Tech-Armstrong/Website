"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { saveKnowledgeFaqsAction } from "@/lib/admin/actions/knowledge-faqs";
import type { KnowledgeFaqPage } from "@/types/knowledge-hub";
import { isDirtyState } from "./admin-dirty";
import { AdminSaveBar } from "./AdminSaveBar";

type FaqEditorProps = {
  initialPage: KnowledgeFaqPage;
};

export function FaqEditor({ initialPage }: FaqEditorProps) {
  const router = useRouter();
  const [page, setPage] = useState(initialPage);
  const [savedBaseline, setSavedBaseline] = useState(initialPage);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const isDirty = isDirtyState(savedBaseline, page);

  async function handleSave() {
    setPending(true);
    setMessage(null);
    setError(null);

    const result = await saveKnowledgeFaqsAction(page);

    if (result.ok) {
      setSavedBaseline(page);
      setMessage("Saved successfully.");
      router.refresh();
    } else {
      setError(result.error ?? "Save failed.");
    }

    setPending(false);
  }

  return (
    <>
      <div className="space-y-6 pb-28">
        <div>
          <Link
            href="/admin"
            className="font-body text-sm text-brand-muted focus-settle hover:text-brand-navy"
          >
            Back to dashboard
          </Link>
          <h1 className="mt-1 font-display text-2xl font-semibold text-brand-navy">
            FAQs
          </h1>
          <p className="mt-2 font-body text-sm text-brand-muted">
            Changes go live on the public site after you save.
          </p>
        </div>

        <section className="rounded-2xl border border-brand-blue/10 bg-white p-5">
          <div className="flex items-center justify-between gap-3">
            <h2 className="font-display text-lg font-semibold text-brand-navy">
              Questions
            </h2>
            <button
              type="button"
              onClick={() =>
                setPage({
                  ...page,
                  faqs: [...page.faqs, { question: "", answer: "" }],
                })
              }
              className="rounded-lg border border-brand-blue/20 px-3 py-2 font-body text-sm text-brand-navy focus-settle"
            >
              Add FAQ
            </button>
          </div>

          <div className="mt-4 space-y-4">
            {page.faqs.map((faq, index) => (
              <div
                key={`faq-${index}`}
                className="space-y-3 rounded-lg bg-brand-surface p-3"
              >
                <div>
                  <label className="mb-1 block font-body text-xs font-medium text-brand-navy">
                    Question
                  </label>
                  <input
                    value={faq.question}
                    onChange={(event) => {
                      const faqs = [...page.faqs];
                      faqs[index] = { ...faq, question: event.target.value };
                      setPage({ ...page, faqs });
                    }}
                    className="w-full rounded-lg border border-brand-blue/20 px-3 py-2 font-body text-sm text-brand-navy focus-settle"
                  />
                </div>
                <div>
                  <label className="mb-1 block font-body text-xs font-medium text-brand-navy">
                    Answer
                  </label>
                  <textarea
                    value={faq.answer}
                    onChange={(event) => {
                      const faqs = [...page.faqs];
                      faqs[index] = { ...faq, answer: event.target.value };
                      setPage({ ...page, faqs });
                    }}
                    rows={4}
                    className="w-full rounded-lg border border-brand-blue/20 px-3 py-2 font-body text-sm text-brand-navy focus-settle"
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    disabled={index === 0}
                    onClick={() => {
                      const faqs = [...page.faqs];
                      [faqs[index - 1], faqs[index]] = [faqs[index], faqs[index - 1]];
                      setPage({ ...page, faqs });
                    }}
                    className="rounded-lg border border-brand-blue/20 px-3 py-2 font-body text-sm text-brand-navy focus-settle disabled:opacity-40"
                  >
                    Move up
                  </button>
                  <button
                    type="button"
                    disabled={index === page.faqs.length - 1}
                    onClick={() => {
                      const faqs = [...page.faqs];
                      [faqs[index], faqs[index + 1]] = [faqs[index + 1], faqs[index]];
                      setPage({ ...page, faqs });
                    }}
                    className="rounded-lg border border-brand-blue/20 px-3 py-2 font-body text-sm text-brand-navy focus-settle disabled:opacity-40"
                  >
                    Move down
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setPage({
                        ...page,
                        faqs: page.faqs.filter((_, i) => i !== index),
                      })
                    }
                    className="rounded-lg border border-brand-accent/30 px-3 py-2 font-body text-sm text-brand-accent focus-settle"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <AdminSaveBar
        isDirty={isDirty}
        pending={pending}
        onSave={handleSave}
        previewHref="/faqs"
        message={message}
        error={error}
      />
    </>
  );
}
