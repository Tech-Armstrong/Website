import type { Metadata } from "next";
import type { BlogPost } from "@/types/blog";
import { stripHtml } from "./html";

import { SITE_NAME, SITE_URL } from "@/lib/site/config";

export function blogListingMetadata(): Metadata {
  const title = "Blog | Investment Insights & Financial Planning";
  const description =
    "Expert articles on mutual funds, portfolio strategy, market updates, and wealth management from Armstrong Capital.";

  return {
    title,
    description,
    alternates: { canonical: `${SITE_URL}/blog` },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/blog`,
      siteName: SITE_NAME,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export function blogPostMetadata(post: BlogPost): Metadata {
  const yoast = post.yoast;
  const title =
    yoast?.title ?? `${post.title} | ${SITE_NAME}`;
  const description =
    yoast?.description ??
    post.plainTextExcerpt ??
    stripHtml(post.excerpt).slice(0, 160);

  const ogImage =
    yoast?.og_image?.[0]?.url ??
    post.featured_image?.source_url ??
    undefined;

  const canonical =
    yoast?.canonical ?? `${SITE_URL}/blog/${post.slug}`;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title: yoast?.og_title ?? post.title,
      description: yoast?.og_description ?? description,
      url: `${SITE_URL}/blog/${post.slug}`,
      siteName: SITE_NAME,
      type: "article",
      publishedTime: yoast?.article_published_time ?? post.date,
      modifiedTime: yoast?.article_modified_time ?? post.modified,
      images: ogImage ? [{ url: ogImage }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: yoast?.og_title ?? post.title,
      description,
      images: ogImage ? [ogImage] : undefined,
    },
    robots: yoast?.robots
      ? {
          index: yoast.robots.index === "index",
          follow: yoast.robots.follow === "follow",
        }
      : undefined,
  };
}

export function articleJsonLd(post: BlogPost): Record<string, unknown> {
  const image =
    post.featured_image?.source_url ??
    post.yoast?.og_image?.[0]?.url ??
    undefined;

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.plainTextExcerpt,
    datePublished: post.date,
    dateModified: post.modified,
    author: {
      "@type": "Organization",
      name: SITE_NAME,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/blog/${post.slug}`,
    },
    image: image ? [image] : undefined,
    timeRequired: `PT${post.readingTimeMinutes}M`,
  };
}
