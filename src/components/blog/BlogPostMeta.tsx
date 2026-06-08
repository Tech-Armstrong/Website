import { formatReadingTime } from "@/lib/blog/reading-time";

type BlogPostMetaProps = {
  readingTimeMinutes: number;
};

export function BlogPostMeta({ readingTimeMinutes }: BlogPostMetaProps) {
  return (
    <p className="mt-4 text-sm text-brand-muted">
      {formatReadingTime(readingTimeMinutes)}
    </p>
  );
}
