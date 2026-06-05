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

export type MarketingCareerSection = {
  title: string;
  paragraphs: string[];
  bullets?: string[];
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
  careerSections?: MarketingCareerSection[];
  careerCta?: { label: string; href: string };
  showContactForm?: boolean;
  fullWidth?: boolean;
};
