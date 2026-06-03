import type { BlogPost, BlogPostSummary } from "@/types/blog";

function sharedCount(a: number[], b: number[]): number {
  const setB = new Set(b);
  return a.filter((id) => setB.has(id)).length;
}

/**
 * Related posts: prefer shared categories/tags, then recency.
 */
export function getRelatedPosts(
  current: Pick<BlogPost, "slug" | "categories" | "tags" | "date">,
  all: BlogPostSummary[],
  limit = 3,
): BlogPostSummary[] {
  const candidates = all.filter((post) => post.slug !== current.slug);

  const scored = candidates
    .map((post) => {
      const categoryScore = sharedCount(current.categories, post.categories) * 10;
      const tagScore = sharedCount(current.tags, post.tags) * 5;
      const recency = new Date(post.date).getTime();
      return { post, score: categoryScore + tagScore, recency };
    })
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return b.recency - a.recency;
    });

  const withShared = scored.filter((item) => item.score > 0);
  const pool = withShared.length > 0 ? withShared : scored;

  return pool.slice(0, limit).map((item) => item.post);
}
