"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { saveKnowledgeMediaAction } from "@/lib/admin/actions/knowledge-media";
import type { KnowledgeMediaPage } from "@/types/knowledge-hub";
import { isDirtyState } from "./admin-dirty";
import { AdminFileUpload } from "./AdminFileUpload";
import { AdminHeroEditor } from "./AdminHeroEditor";
import { AdminSaveBar } from "./AdminSaveBar";

type MediaEditorProps = {
  initialPage: KnowledgeMediaPage;
};

export function MediaEditor({ initialPage }: MediaEditorProps) {
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

    const result = await saveKnowledgeMediaAction(page);

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
            Media Spotlight
          </h1>
          <p className="mt-2 font-body text-sm text-brand-muted">
            Changes go live on the public site after you save.
          </p>
        </div>

        <AdminHeroEditor
          hero={page.hero}
          uploadSection="media-spotlight"
          onChange={(hero) => setPage({ ...page, hero })}
        />

        <section className="rounded-2xl border border-brand-blue/10 bg-white p-5">
          <div className="flex items-center justify-between gap-3">
            <h2 className="font-display text-lg font-semibold text-brand-navy">
              Press articles
            </h2>
            <button
              type="button"
              onClick={() =>
                setPage({
                  ...page,
                  articles: [
                    ...page.articles,
                    { title: "", href: "", logo: "" },
                  ],
                })
              }
              className="rounded-lg border border-brand-blue/20 px-3 py-2 font-body text-sm text-brand-navy focus-settle"
            >
              Add article
            </button>
          </div>

          <div className="mt-4 space-y-4">
            {page.articles.map((article, index) => (
              <div
                key={`${article.href}-${index}`}
                className="grid gap-3 rounded-lg bg-brand-surface p-3 md:grid-cols-2"
              >
                <div className="md:col-span-2">
                  <label className="mb-1 block font-body text-xs font-medium text-brand-navy">
                    Title
                  </label>
                  <input
                    value={article.title}
                    onChange={(event) => {
                      const articles = [...page.articles];
                      articles[index] = { ...article, title: event.target.value };
                      setPage({ ...page, articles });
                    }}
                    className="w-full rounded-lg border border-brand-blue/20 px-3 py-2 font-body text-sm text-brand-navy focus-settle"
                  />
                </div>
                <div>
                  <label className="mb-1 block font-body text-xs font-medium text-brand-navy">
                    External URL
                  </label>
                  <input
                    value={article.href}
                    onChange={(event) => {
                      const articles = [...page.articles];
                      articles[index] = { ...article, href: event.target.value };
                      setPage({ ...page, articles });
                    }}
                    className="w-full rounded-lg border border-brand-blue/20 px-3 py-2 font-body text-sm text-brand-navy focus-settle"
                  />
                </div>
                <div>
                  <label className="mb-1 block font-body text-xs font-medium text-brand-navy">
                    Logo URL
                  </label>
                  <input
                    value={article.logo ?? ""}
                    onChange={(event) => {
                      const articles = [...page.articles];
                      articles[index] = {
                        ...article,
                        logo: event.target.value || undefined,
                      };
                      setPage({ ...page, articles });
                    }}
                    className="w-full rounded-lg border border-brand-blue/20 px-3 py-2 font-body text-sm text-brand-navy focus-settle"
                  />
                  <div className="mt-2">
                    <AdminFileUpload
                      section="media-spotlight"
                      accept="image/jpeg,image/png,image/webp,image/svg+xml"
                      label="Upload logo"
                      onUploaded={(url) => {
                        const articles = [...page.articles];
                        articles[index] = { ...article, logo: url };
                        setPage({ ...page, articles });
                      }}
                    />
                  </div>
                </div>
                <div className="md:col-span-2">
                  <button
                    type="button"
                    onClick={() =>
                      setPage({
                        ...page,
                        articles: page.articles.filter((_, i) => i !== index),
                      })
                    }
                    className="rounded-lg border border-brand-accent/30 px-3 py-2 font-body text-sm text-brand-accent focus-settle"
                  >
                    Delete article
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-brand-blue/10 bg-white p-5">
          <div className="flex items-center justify-between gap-3">
            <h2 className="font-display text-lg font-semibold text-brand-navy">
              Podcasts
            </h2>
            <button
              type="button"
              onClick={() =>
                setPage({
                  ...page,
                  podcasts: [...page.podcasts, { title: "", embedUrl: "" }],
                })
              }
              className="rounded-lg border border-brand-blue/20 px-3 py-2 font-body text-sm text-brand-navy focus-settle"
            >
              Add podcast
            </button>
          </div>

          <div className="mt-4 space-y-4">
            {page.podcasts.map((podcast, index) => (
              <div
                key={`${podcast.embedUrl}-${index}`}
                className="grid gap-3 rounded-lg bg-brand-surface p-3 md:grid-cols-2"
              >
                <div>
                  <label className="mb-1 block font-body text-xs font-medium text-brand-navy">
                    Title
                  </label>
                  <input
                    value={podcast.title}
                    onChange={(event) => {
                      const podcasts = [...page.podcasts];
                      podcasts[index] = { ...podcast, title: event.target.value };
                      setPage({ ...page, podcasts });
                    }}
                    className="w-full rounded-lg border border-brand-blue/20 px-3 py-2 font-body text-sm text-brand-navy focus-settle"
                  />
                </div>
                <div>
                  <label className="mb-1 block font-body text-xs font-medium text-brand-navy">
                    LinkedIn embed URL
                  </label>
                  <input
                    value={podcast.embedUrl}
                    onChange={(event) => {
                      const podcasts = [...page.podcasts];
                      podcasts[index] = {
                        ...podcast,
                        embedUrl: event.target.value,
                      };
                      setPage({ ...page, podcasts });
                    }}
                    className="w-full rounded-lg border border-brand-blue/20 px-3 py-2 font-body text-sm text-brand-navy focus-settle"
                  />
                </div>
                <div className="md:col-span-2">
                  <button
                    type="button"
                    onClick={() =>
                      setPage({
                        ...page,
                        podcasts: page.podcasts.filter((_, i) => i !== index),
                      })
                    }
                    className="rounded-lg border border-brand-accent/30 px-3 py-2 font-body text-sm text-brand-accent focus-settle"
                  >
                    Delete podcast
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
        previewHref="/media-spotlight"
        message={message}
        error={error}
      />
    </>
  );
}
