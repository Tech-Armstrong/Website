import { mediaSpotlights } from "@/data/home";
import type { MarketingPageConfig } from "@/types/marketing-page";
import { marketingPages } from "./pages";

const overrides: Record<string, Partial<MarketingPageConfig>> = {
  "our-team": {
    hero: {
      title: "Our Team At Armstrong Capital",
      paragraphs: [
        "At Armstrong Capital, we're committed to eliminating every barrier between where you are today and where you want to be tomorrow. As one of Bangalore's leading wealth management firms, we invite you to learn more about the expert team dedicated to your financial success.",
        "Our well-structured organization ensures that every client receives personalized attention through dedicated relationship managers and service managers.",
      ],
      image:
        "https://armstrong-cap.com/wp-content/uploads/financial_planning.webp",
    },
  },
  "research-archives": {
    hero: {
      title: "Research Archives",
      paragraphs: [
        "Browse Armstrong Capital's research publications covering market trends, economic analysis, and investment strategy insights.",
      ],
      image:
        "https://armstrong-cap.com/wp-content/uploads/financial_planning.webp",
    },
  },
  "market-updates": {
    hero: {
      title: "Market Updates",
      paragraphs: [
        "Stay informed with our monthly Money Moves series and timely market commentary from Armstrong Capital's research team.",
      ],
      image:
        "https://armstrong-cap.com/wp-content/uploads/investment_management-min.webp",
    },
  },
  newsletters: {
    hero: {
      title: "Newsletters",
      paragraphs: [
        "Read our latest newsletters featuring market perspectives, portfolio insights, and financial planning guidance.",
      ],
      image:
        "https://armstrong-cap.com/wp-content/uploads/wealth_management.webp",
    },
  },
  "media-spotlight": {
    hero: {
      title: "Media Spotlight",
      paragraphs: [
        "Explore press coverage and podcast conversations featuring Armstrong Capital's insights on wealth management and financial planning.",
      ],
    },
    mediaArticles: mediaSpotlights.map((item) => ({
      title: item.title,
      href: item.href,
      logo: item.logo,
    })),
  },
};

function mergeConfig(slug: string): MarketingPageConfig | null {
  const base = marketingPages[slug as keyof typeof marketingPages];
  if (!base) return null;

  const patch = overrides[slug];
  if (!patch) return base as MarketingPageConfig;

  return { ...base, ...patch } as MarketingPageConfig;
}

export const NAVBAR_MARKETING_SLUGS = Object.keys(marketingPages);

export function getMarketingPageConfig(slug: string): MarketingPageConfig | null {
  return mergeConfig(slug);
}

export function isMarketingPageSlug(slug: string): boolean {
  return slug in marketingPages;
}
