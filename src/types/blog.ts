export type FeaturedImage = {
  id: number;
  slug: string;
  link: string;
  title: string;
  alt_text: string;
  caption: string;
  description: string;
  mime_type: string;
  media_type: string;
  source_url: string;
  width: number | null;
  height: number | null;
  file: string | null;
  sizes: Record<
    string,
    {
      source_url?: string;
      width?: number;
      height?: number;
      mime_type?: string;
    }
  >;
  date: string;
  modified: string;
};

export type YoastMetadata = {
  title?: string;
  description?: string;
  canonical?: string;
  og_title?: string;
  og_description?: string;
  og_url?: string;
  og_image?: Array<{ url: string; width?: number; height?: number }>;
  article_published_time?: string;
  article_modified_time?: string;
  twitter_card?: string;
  robots?: Record<string, string>;
  schema?: Record<string, unknown>;
};

export type BlogPostRaw = {
  id: number;
  type: string;
  slug: string;
  status: string;
  link: string;
  date: string;
  date_gmt: string;
  modified: string;
  modified_gmt: string;
  title: string;
  excerpt: string;
  content: string;
  author: number;
  featured_media_id: number | null;
  featured_image: FeaturedImage | null;
  categories: number[];
  tags: number[];
  yoast: YoastMetadata | null;
};

export type BlogPost = BlogPostRaw & {
  readingTimeMinutes: number;
  plainTextExcerpt: string;
};

export type BlogPostSummary = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  plainTextExcerpt: string;
  date: string;
  modified: string;
  featured_image: FeaturedImage | null;
  readingTimeMinutes: number;
  categories: number[];
  tags: number[];
};

export type PostsIndex = {
  exported_at: string;
  base_url: string;
  count: number;
  items: Array<{
    id: number;
    slug: string;
    title: string;
    link: string;
    modified: string;
    featured_media_id: number | null;
    file: string;
  }>;
};
