"use server";

import { requireAdmin } from "@/lib/admin/guard";
import { revalidateBlogPaths } from "@/lib/admin/revalidate-public";
import {
  deletePost,
  getAllPostsForAdmin,
  getPostBySlugForAdmin,
  nextPostId,
  slugifyTitle,
  writePost,
} from "@/lib/blog/posts";
import type { BlogPostRaw, FeaturedImage } from "@/types/blog";
import type { SaveActionResult } from "./knowledge-archive";

export type BlogFormInput = {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  status: "publish" | "draft";
  date: string;
  featuredImageUrl?: string;
};

function buildFeaturedImage(url: string | undefined): FeaturedImage | null {
  if (!url) return null;

  return {
    id: 0,
    slug: "",
    link: "",
    title: "",
    alt_text: "",
    caption: "",
    description: "",
    mime_type: "image/jpeg",
    media_type: "image",
    source_url: url,
    width: null,
    height: null,
    file: null,
    sizes: {},
    date: new Date().toISOString(),
    modified: new Date().toISOString(),
  };
}

function toIsoDate(value: string): string {
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return new Date().toISOString().slice(0, 19);
  }
  return parsed.toISOString().slice(0, 19);
}

export async function loadBlogPostsAction(): Promise<BlogPostRaw[]> {
  await requireAdmin();
  return getAllPostsForAdmin();
}

export async function loadBlogPostAction(
  slug: string,
): Promise<BlogPostRaw | null> {
  await requireAdmin();
  return getPostBySlugForAdmin(slug);
}

export async function saveBlogPostAction(
  input: BlogFormInput,
  originalSlug?: string,
): Promise<SaveActionResult & { slug?: string }> {
  try {
    await requireAdmin();

    const title = input.title.trim();
    const slug = (input.slug || slugifyTitle(title)).trim();

    if (!title || !slug) {
      return { ok: false, error: "Title and slug are required." };
    }

    const posts = await getAllPostsForAdmin();
    const existing = originalSlug
      ? posts.find((post) => post.slug === originalSlug)
      : posts.find((post) => post.slug === slug);

    if (!originalSlug && posts.some((post) => post.slug === slug)) {
      return { ok: false, error: "A post with this slug already exists." };
    }

    if (originalSlug && originalSlug !== slug) {
      await deletePost(originalSlug);
    }

    const now = toIsoDate(new Date().toISOString());
    const date = toIsoDate(input.date || now);
    const featuredImage = buildFeaturedImage(input.featuredImageUrl);

    const post: BlogPostRaw = {
      id: existing?.id ?? nextPostId(posts),
      type: "post",
      slug,
      status: input.status,
      link: `https://armstrong-cap.com/${slug}/`,
      date,
      date_gmt: date,
      modified: now,
      modified_gmt: now,
      title,
      excerpt: input.excerpt,
      content: input.content,
      author: existing?.author ?? 1,
      featured_media_id: featuredImage?.id ?? null,
      featured_image: featuredImage,
      categories: existing?.categories ?? [],
      tags: existing?.tags ?? [],
      yoast: existing?.yoast ?? null,
    };

    await writePost(post);
    revalidateBlogPaths(slug);

    return { ok: true, slug };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : "Save failed.",
    };
  }
}

export async function deleteBlogPostAction(slug: string): Promise<SaveActionResult> {
  try {
    await requireAdmin();
    await deletePost(slug);
    revalidateBlogPaths(slug);
    return { ok: true };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : "Delete failed.",
    };
  }
}
