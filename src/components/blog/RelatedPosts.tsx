import { BlogCard } from "./BlogCard";
import type { BlogPostSummary } from "@/types/blog";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

type RelatedPostsProps = {
  posts: BlogPostSummary[];
};

export function RelatedPosts({ posts }: RelatedPostsProps) {
  if (posts.length === 0) return null;

  return (
    <section className="mt-16 border-t border-[#e5e5e5] pt-12">
      <ScrollReveal>
        <h2 className="mb-8 font-display text-[28px] font-semibold text-brand-navy">
          Related articles
        </h2>
      </ScrollReveal>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post, index) => (
          <ScrollReveal key={post.slug} delay={index * 60}>
            <BlogCard post={post} />
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
