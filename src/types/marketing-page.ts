export type MarketingPageCategory =
  | "segment"
  | "service"
  | "about"
  | "knowledge"
  | "career"
  | "contact";

export type MarketingHero = {
  title: string;
  paragraphs: string[];
  image?: string;
};

export type MarketingFeatureItem = {
  title: string;
  description: string;
};

export type MarketingFeatures = {
  eyebrow: string;
  title: string;
  items: MarketingFeatureItem[];
};

export type MarketingQuote = {
  text: string;
  attribution: string;
};

export type MarketingTeamMember = {
  name: string;
  role: string;
  image?: string;
  linkedinUrl?: string;
  bio?: string;
};

export type MarketingPlanItem = {
  title: string;
  description: string;
};

export type MarketingFaqItem = {
  question: string;
  answer: string;
};

export type MarketingMediaArticle = {
  title: string;
  href: string;
  logo?: string;
};

export type MarketingMediaPodcast = {
  title: string;
  embedUrl: string;
};

export type MarketingGalleryImage = {
  src: string;
  alt: string;
};

export type MarketingGallery = {
  eyebrow?: string;
  title: string;
  images: MarketingGalleryImage[];
};

export type MarketingCareerSection = {
  title: string;
  paragraphs: string[];
  bullets?: string[];
  tagline?: string;
  images?: MarketingGalleryImage[];
};

export type MarketingArchiveGroup = {
  label: string;
  items: MarketingArchiveItem[];
};

export type MarketingArchiveItem = {
  id: string;
  title: string;
  pdfUrl: string;
  thumbnailUrl: string;
  sortOrder: number;
};

export type MarketingPageConfig = {
  slug: string;
  category: MarketingPageCategory;
  hero?: MarketingHero;
  features?: MarketingFeatures;
  quote?: MarketingQuote;
  team?: MarketingTeamMember[];
  plans?: MarketingPlanItem[];
  faqs?: MarketingFaqItem[];
  mediaArticles?: MarketingMediaArticle[];
  mediaPodcasts?: MarketingMediaPodcast[];
  archiveGroups?: MarketingArchiveGroup[];
  careerSections?: MarketingCareerSection[];
  careerCta?: { label: string; href: string };
  gallery?: MarketingGallery;
  showContactForm?: boolean;
  fullWidth?: boolean;
};
