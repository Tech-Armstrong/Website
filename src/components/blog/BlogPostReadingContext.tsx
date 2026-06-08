"use client";

import {
  createContext,
  useContext,
  useRef,
  type ReactNode,
  type RefObject,
} from "react";
import {
  useArticleReadingProgress,
  type ArticleReadingProgress,
} from "./useArticleReadingProgress";

type BlogPostReadingContextValue = ArticleReadingProgress & {
  articleRef: RefObject<HTMLElement | null>;
  readingTimeMinutes: number;
};

const BlogPostReadingContext =
  createContext<BlogPostReadingContextValue | null>(null);

type BlogPostReadingProviderProps = {
  readingTimeMinutes: number;
  children: ReactNode;
};

export function BlogPostReadingProvider({
  readingTimeMinutes,
  children,
}: BlogPostReadingProviderProps) {
  const articleRef = useRef<HTMLElement>(null);
  const reading = useArticleReadingProgress(articleRef, readingTimeMinutes);

  return (
    <BlogPostReadingContext.Provider
      value={{ ...reading, articleRef, readingTimeMinutes }}
    >
      {children}
    </BlogPostReadingContext.Provider>
  );
}

export function useBlogPostReading(): BlogPostReadingContextValue {
  const context = useContext(BlogPostReadingContext);
  if (!context) {
    throw new Error(
      "useBlogPostReading must be used within BlogPostReadingProvider",
    );
  }
  return context;
}
