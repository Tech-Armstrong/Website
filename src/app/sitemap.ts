import type { MetadataRoute } from "next";
import { getAllPostSlugs } from "@/lib/blog/posts";
import { getMarketingPageSlugs } from "@/lib/pages/content";
import { SITE_URL } from "@/lib/site/config";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [pageSlugs, postSlugs] = await Promise.all([
    getMarketingPageSlugs(),
    getAllPostSlugs(),
  ]);

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];

  const pageRoutes: MetadataRoute.Sitemap = pageSlugs.map((slug) => ({
    url: `${SITE_URL}/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const postRoutes: MetadataRoute.Sitemap = postSlugs.map((slug) => ({
    url: `${SITE_URL}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...pageRoutes, ...postRoutes];
}
