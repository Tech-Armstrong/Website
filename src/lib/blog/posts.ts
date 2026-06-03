import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
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

async function readPostFile(filename: string): Promise<BlogPost | null> {
  if (!filename.endsWith(".json") || filename === "_index.json") {
    return null;
  }

  const filepath = path.join(POSTS_DIR, filename);
  const raw = await readFile(filepath, "utf8");
  const parsed = JSON.parse(raw) as BlogPostRaw;

  if (parsed.status !== "publish" || parsed.type !== "post") {
    return null;
  }

  return enrichPost({
    ...parsed,
    categories: parsed.categories ?? [],
    tags: parsed.tags ?? [],
  });
}

export async function getPostsIndex(): Promise<PostsIndex> {
  const raw = await readFile(INDEX_FILE, "utf8");
  return JSON.parse(raw) as PostsIndex;
}

export async function getAllPosts(): Promise<BlogPost[]> {
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
