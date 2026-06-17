import { readFile, readdir, unlink, writeFile } from "node:fs/promises";
import path from "node:path";
import { unstable_noStore as noStore } from "next/cache";
import { writeJsonAtomic } from "@/lib/knowledge/write-json";
import { calculateReadingTimeMinutes } from "./reading-time";
import { decodeHtmlEntities, excerptFromHtml, stripHtml } from "./html";
import type {
  BlogPost,
  BlogPostRaw,
  BlogPostSummary,
  PostsIndex,
} from "@/types/blog";

const POSTS_DIR = path.join(process.cwd(), "content", "posts");
const INDEX_FILE = path.join(POSTS_DIR, "_index.json");

function enrichPost(raw: BlogPostRaw): BlogPost {
  const readingTimeMinutes = calculateReadingTimeMinutes(
    raw.content,
    raw.excerpt,
  );

  return {
    ...raw,
    title: decodeHtmlEntities(raw.title),
    readingTimeMinutes,
    plainTextExcerpt: excerptFromHtml(raw.excerpt || raw.content, 200),
  };
}

function toSummary(post: BlogPost): BlogPostSummary {
  return {
    id: post.id,
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    plainTextExcerpt: post.plainTextExcerpt,
    date: post.date,
    modified: post.modified,
    featured_image: post.featured_image,
    readingTimeMinutes: post.readingTimeMinutes,
    categories: post.categories,
    tags: post.tags,
  };
}

async function readPostFileRaw(filename: string): Promise<BlogPostRaw | null> {
  if (!filename.endsWith(".json") || filename === "_index.json") {
    return null;
  }

  const filepath = path.join(POSTS_DIR, filename);
  const raw = await readFile(filepath, "utf8");
  const parsed = JSON.parse(raw) as BlogPostRaw;

  if (parsed.type !== "post") {
    return null;
  }

  return {
    ...parsed,
    categories: parsed.categories ?? [],
    tags: parsed.tags ?? [],
  };
}

async function readPostFile(filename: string): Promise<BlogPost | null> {
  const parsed = await readPostFileRaw(filename);
  if (!parsed || parsed.status !== "publish") {
    return null;
  }

  return enrichPost(parsed);
}

export async function getPostsIndex(): Promise<PostsIndex> {
  noStore();
  const raw = await readFile(INDEX_FILE, "utf8");
  return JSON.parse(raw) as PostsIndex;
}

export async function getAllPosts(): Promise<BlogPost[]> {
  noStore();
  const files = await readdir(POSTS_DIR);
  const posts = await Promise.all(files.map(readPostFile));

  return posts
    .filter((post): post is BlogPost => post !== null)
    .sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );
}

export async function getAllPostSummaries(): Promise<BlogPostSummary[]> {
  const posts = await getAllPosts();
  return posts.map(toSummary);
}

export async function getAllPostSlugs(): Promise<string[]> {
  const posts = await getAllPosts();
  return posts.map((post) => post.slug);
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const posts = await getAllPosts();
  return posts.find((post) => post.slug === slug) ?? null;
}

export async function getAdjacentPosts(slug: string): Promise<{
  newer: BlogPostSummary | null;
  older: BlogPostSummary | null;
}> {
  const posts = await getAllPostSummaries();
  const index = posts.findIndex((post) => post.slug === slug);

  if (index === -1) {
    return { newer: null, older: null };
  }

  return {
    newer: index > 0 ? posts[index - 1] : null,
    older: index < posts.length - 1 ? posts[index + 1] : null,
  };
}

export const BLOG_PAGE_SIZE = 9;

export type PaginatedPostSummaries = {
  posts: BlogPostSummary[];
  currentPage: number;
  totalPages: number;
  totalCount: number;
};

export function parseBlogPageParam(value: string | undefined): number {
  if (!value) return 1;

  const parsed = Number.parseInt(value, 10);
  if (!Number.isFinite(parsed) || parsed < 1) return 1;

  return parsed;
}

export async function getPaginatedPostSummaries(
  page: number,
): Promise<PaginatedPostSummaries> {
  noStore();
  const allPosts = await getAllPostSummaries();
  const totalCount = allPosts.length;
  const totalPages = Math.max(1, Math.ceil(totalCount / BLOG_PAGE_SIZE));

  if (totalCount === 0) {
    return {
      posts: [],
      currentPage: 1,
      totalPages: 0,
      totalCount: 0,
    };
  }

  const currentPage = Math.min(Math.max(1, page), totalPages);
  const start = (currentPage - 1) * BLOG_PAGE_SIZE;
  const posts = allPosts.slice(start, start + BLOG_PAGE_SIZE);

  return {
    posts,
    currentPage,
    totalPages,
    totalCount,
  };
}

export async function getAllPostsForAdmin(): Promise<BlogPostRaw[]> {
  const files = await readdir(POSTS_DIR);
  const posts = await Promise.all(files.map(readPostFileRaw));

  return posts
    .filter((post): post is BlogPostRaw => post !== null)
    .sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );
}

export async function getPostBySlugForAdmin(
  slug: string,
): Promise<BlogPostRaw | null> {
  const posts = await getAllPostsForAdmin();
  return posts.find((post) => post.slug === slug) ?? null;
}

function postFilename(slug: string): string {
  return `${slug}.json`;
}

async function rebuildPostsIndex(): Promise<void> {
  const posts = await getAllPostsForAdmin();
  const published = posts.filter((post) => post.status === "publish");

  const index: PostsIndex = {
    exported_at: new Date().toISOString(),
    base_url: "https://armstrong-cap.com",
    count: published.length,
    items: published.map((post) => ({
      id: post.id,
      slug: post.slug,
      title: post.title,
      link: post.link || `https://armstrong-cap.com/${post.slug}/`,
      modified: post.modified,
      featured_media_id: post.featured_media_id,
      file: postFilename(post.slug),
    })),
  };

  await writeJsonAtomic(INDEX_FILE, index);
}

export async function writePost(post: BlogPostRaw): Promise<void> {
  const filepath = path.join(POSTS_DIR, postFilename(post.slug));
  await writeJsonAtomic(filepath, post);
  await rebuildPostsIndex();
}

export async function deletePost(slug: string): Promise<void> {
  const filepath = path.join(POSTS_DIR, postFilename(slug));
  await unlink(filepath);
  await rebuildPostsIndex();
}

export function slugifyTitle(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

export function nextPostId(posts: BlogPostRaw[]): number {
  return posts.reduce((max, post) => Math.max(max, post.id), 0) + 1;
}
