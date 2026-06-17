"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { saveKnowledgeArchiveAction } from "@/lib/admin/actions/knowledge-archive";
import type {
  KnowledgeArchivePage,
  KnowledgeArchiveSlug,
} from "@/types/knowledge-hub";
import { isDirtyState } from "./admin-dirty";
import { AdminFileUpload } from "./AdminFileUpload";
import { AdminHeroEditor } from "./AdminHeroEditor";
import { AdminSaveBar } from "./AdminSaveBar";

type ArchiveEditorProps = {
  initialPage: KnowledgeArchivePage;
  slug: KnowledgeArchiveSlug;
  title: string;
  publicPath: string;
};

export function ArchiveEditor({
  initialPage,
  slug,
  title,
  publicPath,
}: ArchiveEditorProps) {
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

    const result = await saveKnowledgeArchiveAction(slug, page);

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
            {title}
          </h1>
          <p className="mt-2 font-body text-sm text-brand-muted">
            Changes go live on the public site after you save.
          </p>
        </div>

        <AdminHeroEditor
          hero={page.hero}
          uploadSection={slug}
          onChange={(hero) => setPage({ ...page, hero })}
        />

        <section className="rounded-2xl border border-brand-blue/10 bg-white p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="font-display text-lg font-semibold text-brand-navy">
              Archive groups
            </h2>
            <button
              type="button"
              onClick={() =>
                setPage({
                  ...page,
                  groups: [
                    ...page.groups,
                    { label: `${new Date().getFullYear()}`, items: [] },
                  ],
                })
              }
              className="rounded-lg border border-brand-blue/20 px-3 py-2 font-body text-sm text-brand-navy focus-settle"
            >
              Add group
            </button>
          </div>

          <div className="mt-4 space-y-6">
            {page.groups.map((group, groupIndex) => (
              <div
                key={`${group.label}-${groupIndex}`}
                className="rounded-xl border border-brand-blue/10 p-4"
              >
                <div className="flex flex-wrap items-center gap-3">
                  <input
                    value={group.label}
                    onChange={(event) => {
                      const groups = [...page.groups];
                      groups[groupIndex] = {
                        ...group,
                        label: event.target.value,
                      };
                      setPage({ ...page, groups });
                    }}
                    aria-label="Group label"
                    className="rounded-lg border border-brand-blue/20 px-3 py-2 font-body text-sm text-brand-navy focus-settle"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const groups = page.groups.filter(
                        (_, index) => index !== groupIndex,
                      );
                      setPage({ ...page, groups });
                    }}
                    className="rounded-lg border border-brand-accent/30 px-3 py-2 font-body text-sm text-brand-accent focus-settle"
                  >
                    Delete group
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const groups = [...page.groups];
                      groups[groupIndex] = {
                        ...group,
                        items: [
                          ...group.items,
                          {
                            id: crypto.randomUUID(),
                            title: "",
                            pdfUrl: "",
                            thumbnailUrl: "",
                            sortOrder: group.items.length,
                          },
                        ],
                      };
                      setPage({ ...page, groups });
                    }}
                    className="rounded-lg border border-brand-blue/20 px-3 py-2 font-body text-sm text-brand-navy focus-settle"
                  >
                    Add item
                  </button>
                </div>

                <div className="mt-4 space-y-4">
                  {group.items.map((item, itemIndex) => (
                    <div
                      key={item.id}
                      className="grid gap-3 rounded-lg bg-brand-surface p-3 md:grid-cols-2"
                    >
                      <div className="md:col-span-2">
                        <label className="mb-1 block font-body text-xs font-medium text-brand-navy">
                          Title
                        </label>
                        <input
                          value={item.title}
                          onChange={(event) => {
                            const groups = [...page.groups];
                            const items = [...group.items];
                            items[itemIndex] = {
                              ...item,
                              title: event.target.value,
                            };
                            groups[groupIndex] = { ...group, items };
                            setPage({ ...page, groups });
                          }}
                          className="w-full rounded-lg border border-brand-blue/20 px-3 py-2 font-body text-sm text-brand-navy focus-settle"
                        />
                      </div>
                      <div>
                        <label className="mb-1 block font-body text-xs font-medium text-brand-navy">
                          PDF URL
                        </label>
                        <input
                          value={item.pdfUrl}
                          onChange={(event) => {
                            const groups = [...page.groups];
                            const items = [...group.items];
                            items[itemIndex] = {
                              ...item,
                              pdfUrl: event.target.value,
                            };
                            groups[groupIndex] = { ...group, items };
                            setPage({ ...page, groups });
                          }}
                          className="w-full rounded-lg border border-brand-blue/20 px-3 py-2 font-body text-sm text-brand-navy focus-settle"
                        />
                        <div className="mt-2">
                          <AdminFileUpload
                            section={slug}
                            accept="application/pdf"
                            label="Upload PDF"
                            onUploaded={(url) => {
                              const groups = [...page.groups];
                              const items = [...group.items];
                              items[itemIndex] = { ...item, pdfUrl: url };
                              groups[groupIndex] = { ...group, items };
                              setPage({ ...page, groups });
                            }}
                          />
                        </div>
                      </div>
                      <div>
                        <label className="mb-1 block font-body text-xs font-medium text-brand-navy">
                          Thumbnail URL
                        </label>
                        <input
                          value={item.thumbnailUrl}
                          onChange={(event) => {
                            const groups = [...page.groups];
                            const items = [...group.items];
                            items[itemIndex] = {
                              ...item,
                              thumbnailUrl: event.target.value,
                            };
                            groups[groupIndex] = { ...group, items };
                            setPage({ ...page, groups });
                          }}
                          className="w-full rounded-lg border border-brand-blue/20 px-3 py-2 font-body text-sm text-brand-navy focus-settle"
                        />
                        <div className="mt-2">
                          <AdminFileUpload
                            section={slug}
                            accept="image/jpeg,image/png,image/webp"
                            label="Upload thumbnail"
                            onUploaded={(url) => {
                              const groups = [...page.groups];
                              const items = [...group.items];
                              items[itemIndex] = {
                                ...item,
                                thumbnailUrl: url,
                              };
                              groups[groupIndex] = { ...group, items };
                              setPage({ ...page, groups });
                            }}
                          />
                        </div>
                      </div>
                      <div className="md:col-span-2 flex gap-2">
                        <button
                          type="button"
                          disabled={itemIndex === 0}
                          onClick={() => {
                            const groups = [...page.groups];
                            const items = [...group.items];
                            [items[itemIndex - 1], items[itemIndex]] = [
                              items[itemIndex],
                              items[itemIndex - 1],
                            ];
                            groups[groupIndex] = {
                              ...group,
                              items: items.map((entry, index) => ({
                                ...entry,
                                sortOrder: index,
                              })),
                            };
                            setPage({ ...page, groups });
                          }}
                          className="rounded-lg border border-brand-blue/20 px-3 py-2 font-body text-sm text-brand-navy focus-settle disabled:opacity-40"
                        >
                          Move up
                        </button>
                        <button
                          type="button"
                          disabled={itemIndex === group.items.length - 1}
                          onClick={() => {
                            const groups = [...page.groups];
                            const items = [...group.items];
                            [items[itemIndex], items[itemIndex + 1]] = [
                              items[itemIndex + 1],
                              items[itemIndex],
                            ];
                            groups[groupIndex] = {
                              ...group,
                              items: items.map((entry, index) => ({
                                ...entry,
                                sortOrder: index,
                              })),
                            };
                            setPage({ ...page, groups });
                          }}
                          className="rounded-lg border border-brand-blue/20 px-3 py-2 font-body text-sm text-brand-navy focus-settle disabled:opacity-40"
                        >
                          Move down
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            const groups = [...page.groups];
                            groups[groupIndex] = {
                              ...group,
                              items: group.items.filter(
                                (_, index) => index !== itemIndex,
                              ),
                            };
                            setPage({ ...page, groups });
                          }}
                          className="rounded-lg border border-brand-accent/30 px-3 py-2 font-body text-sm text-brand-accent focus-settle"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
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
        previewHref={publicPath}
        message={message}
        error={error}
      />
    </>
  );
}
