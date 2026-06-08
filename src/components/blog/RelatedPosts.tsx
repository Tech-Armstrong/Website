import Image from "next/image";
import Link from "next/link";
import { BlogCard } from "./BlogCard";
import { formatReadingTime } from "@/lib/blog/reading-time";
import type { BlogPostSummary } from "@/types/blog";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

type RelatedPostsProps = {
  posts: BlogPostSummary[];
  variant?: "grid" | "sidebar";
};

function RelatedSidebarItem({ post }: { post: BlogPostSummary }) {
  const image = post.featured_image;

  return (
    <article className="group">
      <Link
        href={`/blog/${post.slug}`}
        className="focus-settle flex gap-3 rounded-lg"
      >
        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-brand-surface">
          {image?.source_url ? (
            <Image
              src={image.source_url}
              alt={image.alt_text || post.title}
              fill
              sizes="64px"
              className="object-cover transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-brand-navy/5 font-display text-[10px] text-brand-muted">
              Blog
            </div>
          )}
        </div>

        <div className="min-w-0 flex-1 pt-0.5">
          <h3 className="font-display text-sm font-semibold leading-snug text-brand-navy transition-colors group-hover:text-brand-blue">
            {post.title}
          </h3>
          <p className="mt-1 text-xs text-brand-muted">
            {formatReadingTime(post.readingTimeMinutes)}
          </p>
        </div>
      </Link>
    </article>
  );
}

export function RelatedPosts({ posts, variant = "grid" }: RelatedPostsProps) {
  if (posts.length === 0) return null;

  if (variant === "sidebar") {
    return (
      <aside className="mt-12 lg:sticky lg:top-32 lg:mt-0 lg:self-start">
        <ScrollReveal direction="right" delay={100}>
          <section>
            <h2 className="mb-6 border-l-2 border-brand-blue pl-3 font-display text-lg font-semibold text-brand-navy">
              Related articles
            </h2>
            <div className="space-y-5">
              {posts.map((post) => (
                <RelatedSidebarItem key={post.slug} post={post} />
              ))}
            </div>
          </section>
        </ScrollReveal>
      </aside>
    );
  }

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
