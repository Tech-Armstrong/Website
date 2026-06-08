"use client";

import { type ReactNode } from "react";
import type { BlogPostSummary } from "@/types/blog";
import {
  BlogPostReadingProvider,
  useBlogPostReading,
} from "./BlogPostReadingContext";
import { ReadingProgressBar } from "./ReadingProgressBar";
import { RelatedPosts } from "./RelatedPosts";

type BlogPostShellProps = {
  readingTimeMinutes: number;
  related: BlogPostSummary[];
  children: ReactNode;
};

function BlogPostArticle({ children }: { children: ReactNode }) {
  const { articleRef } = useBlogPostReading();

  return (
    <article ref={articleRef} className="min-w-0 max-w-[800px]">
      {children}
    </article>
  );
}

export function BlogPostShell({
  readingTimeMinutes,
  related,
  children,
}: BlogPostShellProps) {
  return (
    <BlogPostReadingProvider readingTimeMinutes={readingTimeMinutes}>
      <div
        data-blog-post-grid
        className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_300px] lg:items-start lg:gap-10"
      >
        <ReadingProgressBar />
        <BlogPostArticle>{children}</BlogPostArticle>
        <RelatedPosts posts={related} variant="sidebar" />
      </div>
    </BlogPostReadingProvider>
  );
}
