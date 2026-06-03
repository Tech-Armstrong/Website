import Image from "next/image";
import Link from "next/link";
import { formatReadingTime } from "@/lib/blog/reading-time";
import type { BlogPostSummary } from "@/types/blog";

type BlogCardProps = {
  post: BlogPostSummary;
};

function formatDate(date: string): string {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

export function BlogCard({ post }: BlogCardProps) {
  const image = post.featured_image;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#e5e5e5] bg-white transition-shadow hover:shadow-md">
      <Link href={`/blog/${post.slug}`} className="relative block aspect-[16/10] overflow-hidden bg-brand-surface">
        {image?.source_url ? (
          <Image
            src={image.source_url}
            alt={image.alt_text || post.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-brand-navy/5 font-display text-sm text-brand-muted">
            Armstrong Blog
          </div>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-6">
        <div className="mb-3 flex flex-wrap items-center gap-3 text-sm text-brand-muted">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span aria-hidden="true">·</span>
          <span>{formatReadingTime(post.readingTimeMinutes)}</span>
        </div>

        <h2 className="mb-3 font-display text-xl font-semibold leading-snug text-brand-navy">
          <Link
            href={`/blog/${post.slug}`}
            className="transition-colors hover:text-brand-blue"
          >
            {post.title}
          </Link>
        </h2>

        <p className="mb-5 flex-1 font-body text-[15px] leading-relaxed text-brand-muted">
          {post.plainTextExcerpt}
        </p>

        <Link
          href={`/blog/${post.slug}`}
          className="inline-flex items-center gap-2 font-display text-sm font-semibold text-brand-blue"
        >
          Read article
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  );
}
