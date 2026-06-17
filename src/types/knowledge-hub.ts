import type {
  MarketingFaqItem,
  MarketingHero,
  MarketingMediaArticle,
  MarketingMediaPodcast,
} from "@/types/marketing-page";

export type KnowledgeArchiveSlug =
  | "research-archives"
  | "market-updates"
  | "newsletters";

export type KnowledgeDownloadItem = {
  id: string;
  title: string;
  pdfUrl: string;
  thumbnailUrl: string;
  sortOrder: number;
};

export type KnowledgeArchiveGroup = {
  label: string;
  items: KnowledgeDownloadItem[];
};

export type KnowledgeArchivePage = {
  slug: KnowledgeArchiveSlug;
  hero: MarketingHero;
  groups: KnowledgeArchiveGroup[];
  updatedAt: string;
};

export type KnowledgeMediaPage = {
  slug: "media-spotlight";
  hero: MarketingHero;
  articles: MarketingMediaArticle[];
  podcasts: MarketingMediaPodcast[];
  updatedAt: string;
};

export type KnowledgeFaqPage = {
  slug: "faqs";
  hero?: MarketingHero;
  faqs: MarketingFaqItem[];
  updatedAt: string;
};

export const KNOWLEDGE_ARCHIVE_SLUGS: KnowledgeArchiveSlug[] = [
  "research-archives",
  "market-updates",
  "newsletters",
];

export const KNOWLEDGE_SECTIONS = [
  { slug: "research-archives", label: "Research Archives", publicPath: "/research-archives" },
  { slug: "market-updates", label: "Market Updates", publicPath: "/market-updates" },
  { slug: "newsletters", label: "Newsletters", publicPath: "/newsletters" },
  { slug: "media-spotlight", label: "Media Spotlight", publicPath: "/media-spotlight" },
  { slug: "faqs", label: "FAQs", publicPath: "/faqs" },
  { slug: "blog", label: "Blog Archives", publicPath: "/blog" },
] as const;
