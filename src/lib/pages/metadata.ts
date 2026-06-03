import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "@/lib/site/config";
import type { MarketingPage } from "./content";

export function marketingPageMetadata(page: MarketingPage): Metadata {
  const yoast = page.yoast;
  const title = yoast?.title ?? `${page.title} | ${SITE_NAME}`;
  const description =
    yoast?.description ?? page.plainTextExcerpt ?? page.title;
  const canonical = yoast?.canonical ?? `${SITE_URL}/${page.slug}`;
  const ogImage = yoast?.og_image?.[0]?.url;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title: yoast?.og_title ?? page.title,
      description: yoast?.og_description ?? description,
      url: `${SITE_URL}/${page.slug}`,
      siteName: SITE_NAME,
      type: "website",
      images: ogImage ? [{ url: ogImage }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: yoast?.og_title ?? page.title,
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
