import { BlogCard } from "./BlogCard";
import type { BlogPostSummary } from "@/types/blog";

type RelatedPostsProps = {
  posts: BlogPostSummary[];
};

export function RelatedPosts({ posts }: RelatedPostsProps) {
  if (posts.length === 0) return null;

  return (
    <section className="mt-16 border-t border-[#e5e5e5] pt-12">
      <h2 className="mb-8 font-display text-[28px] font-semibold text-brand-navy">
        Related articles
      </h2>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  );
}
