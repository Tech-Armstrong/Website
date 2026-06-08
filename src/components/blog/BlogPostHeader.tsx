import Image from "next/image";
import { formatReadingTime } from "@/lib/blog/reading-time";
import type { BlogPost } from "@/types/blog";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

type BlogPostHeaderProps = {
  post: BlogPost;
};

function formatDate(date: string): string {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

export function BlogPostHeader({ post }: BlogPostHeaderProps) {
  const image = post.featured_image;

  return (
    <header className="mb-10">
      <ScrollReveal>
        <div className="mb-6 flex flex-wrap items-center gap-3 text-sm text-brand-muted">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span aria-hidden="true">·</span>
          <span>{formatReadingTime(post.readingTimeMinutes)}</span>
          {post.modified !== post.date && (
            <>
              <span aria-hidden="true">·</span>
              <span>Updated {formatDate(post.modified)}</span>
            </>
          )}
        </div>

        <h1 className="font-display text-[32px] font-semibold leading-tight text-brand-navy md:text-[42px] md:leading-[1.15]">
          {post.title}
        </h1>
      </ScrollReveal>

      {image?.source_url && (
        <ScrollReveal delay={100}>
          <div className="relative mt-8 aspect-[16/9] w-full overflow-hidden rounded-2xl bg-brand-surface">
            <Image
              src={image.source_url}
              alt={image.alt_text || post.title}
              fill
              priority
              sizes="(max-width: 1200px) 100vw, 1200px"
              className="object-cover"
            />
          </div>
        </ScrollReveal>
      )}
    </header>
  );
}
