"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import {
  deleteBlogPostAction,
  saveBlogPostAction,
  type BlogFormInput,
} from "@/lib/admin/actions/blog";
import type { BlogPostRaw } from "@/types/blog";
import { isDirtyState } from "./admin-dirty";
import { AdminFileUpload } from "./AdminFileUpload";
import { AdminSaveBar } from "./AdminSaveBar";

type BlogEditorProps = {
  post?: BlogPostRaw;
};

function buildInitialForm(post?: BlogPostRaw): BlogFormInput {
  return {
    title: post?.title ?? "",
    slug: post?.slug ?? "",
    excerpt: post?.excerpt ?? "",
    content: post?.content ?? "",
    status: post?.status === "draft" ? "draft" : "publish",
    date: post?.date?.slice(0, 10) ?? new Date().toISOString().slice(0, 10),
    featuredImageUrl: post?.featured_image?.source_url ?? "",
  };
}

export function BlogEditor({ post }: BlogEditorProps) {
  const router = useRouter();
  const initialForm = useMemo(() => buildInitialForm(post), [post]);
  const [form, setForm] = useState(initialForm);
  const [savedBaseline, setSavedBaseline] = useState(initialForm);
  const [savedSlug, setSavedSlug] = useState(post?.slug ?? "");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const isDirty = isDirtyState(savedBaseline, form);
  const previewHref = savedSlug ? `/blog/${savedSlug}` : "/blog";

  async function handleSave() {
    setPending(true);
    setMessage(null);
    setError(null);

    const result = await saveBlogPostAction(form, post?.slug);

    if (result.ok) {
      setSavedBaseline(form);
      if (result.slug) {
        setSavedSlug(result.slug);
        if (result.slug !== post?.slug) {
          router.replace(`/admin/blog/${result.slug}`);
        }
      }
      setMessage("Saved successfully.");
      router.refresh();
    } else {
      setError(result.error ?? "Save failed.");
    }

    setPending(false);
  }

  async function handleDelete() {
    if (!post?.slug) return;
    if (!window.confirm("Delete this blog post? This cannot be undone.")) {
      return;
    }

    setPending(true);
    const result = await deleteBlogPostAction(post.slug);
    setPending(false);

    if (result.ok) {
      router.push("/admin/blog");
      router.refresh();
    } else {
      setError(result.error ?? "Delete failed.");
    }
  }

  return (
    <>
      <div className="space-y-6 pb-28">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <Link
              href="/admin/blog"
              className="font-body text-sm text-brand-muted focus-settle hover:text-brand-navy"
            >
              Back to blog list
            </Link>
            <h1 className="mt-1 font-display text-2xl font-semibold text-brand-navy">
              {post ? "Edit blog post" : "New blog post"}
            </h1>
            <p className="mt-2 font-body text-sm text-brand-muted">
              Changes go live on the public site after you save. Use status
              &quot;Published&quot; for posts to appear on /blog.
            </p>
          </div>
          {post ? (
            <button
              type="button"
              onClick={handleDelete}
              disabled={pending}
              className="rounded-lg border border-brand-accent/30 px-3 py-2 font-body text-sm text-brand-accent focus-settle disabled:opacity-60"
            >
              Delete
            </button>
          ) : null}
        </div>

        <section className="rounded-2xl border border-brand-blue/10 bg-white p-5">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="md:col-span-2">
              <label className="mb-1 block font-body text-sm font-medium text-brand-navy">
                Title
              </label>
              <input
                value={form.title}
                onChange={(event) =>
                  setForm({ ...form, title: event.target.value })
                }
                className="w-full rounded-lg border border-brand-blue/20 px-3 py-2 font-body text-sm text-brand-navy focus-settle"
              />
            </div>
            <div>
              <label className="mb-1 block font-body text-sm font-medium text-brand-navy">
                Slug
              </label>
              <input
                value={form.slug}
                onChange={(event) =>
                  setForm({ ...form, slug: event.target.value })
                }
                className="w-full rounded-lg border border-brand-blue/20 px-3 py-2 font-body text-sm text-brand-navy focus-settle"
              />
            </div>
            <div>
              <label className="mb-1 block font-body text-sm font-medium text-brand-navy">
                Publish date
              </label>
              <input
                type="date"
                value={form.date}
                onChange={(event) =>
                  setForm({ ...form, date: event.target.value })
                }
                className="w-full rounded-lg border border-brand-blue/20 px-3 py-2 font-body text-sm text-brand-navy focus-settle"
              />
            </div>
            <div>
              <label className="mb-1 block font-body text-sm font-medium text-brand-navy">
                Status
              </label>
              <select
                value={form.status}
                onChange={(event) =>
                  setForm({
                    ...form,
                    status: event.target.value as "publish" | "draft",
                  })
                }
                className="w-full rounded-lg border border-brand-blue/20 px-3 py-2 font-body text-sm text-brand-navy focus-settle"
              >
                <option value="publish">Published</option>
                <option value="draft">Draft</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="mb-1 block font-body text-sm font-medium text-brand-navy">
                Featured image URL
              </label>
              <input
                value={form.featuredImageUrl ?? ""}
                onChange={(event) =>
                  setForm({ ...form, featuredImageUrl: event.target.value })
                }
                className="w-full rounded-lg border border-brand-blue/20 px-3 py-2 font-body text-sm text-brand-navy focus-settle"
              />
              <div className="mt-2">
                <AdminFileUpload
                  section="blog"
                  accept="image/jpeg,image/png,image/webp"
                  label="Upload featured image"
                  onUploaded={(url) =>
                    setForm({ ...form, featuredImageUrl: url })
                  }
                />
              </div>
            </div>
            <div className="md:col-span-2">
              <label className="mb-1 block font-body text-sm font-medium text-brand-navy">
                Excerpt (HTML allowed)
              </label>
              <textarea
                value={form.excerpt}
                onChange={(event) =>
                  setForm({ ...form, excerpt: event.target.value })
                }
                rows={3}
                className="w-full rounded-lg border border-brand-blue/20 px-3 py-2 font-body text-sm text-brand-navy focus-settle"
              />
            </div>
            <div className="md:col-span-2">
              <label className="mb-1 block font-body text-sm font-medium text-brand-navy">
                Content (HTML)
              </label>
              <textarea
                value={form.content}
                onChange={(event) =>
                  setForm({ ...form, content: event.target.value })
                }
                rows={16}
                className="w-full rounded-lg border border-brand-blue/20 px-3 py-2 font-body text-sm text-brand-navy focus-settle"
              />
            </div>
          </div>
        </section>
      </div>

      <AdminSaveBar
        isDirty={isDirty}
        pending={pending}
        onSave={handleSave}
        previewHref={previewHref}
        message={message}
        error={error}
      />
    </>
  );
}
