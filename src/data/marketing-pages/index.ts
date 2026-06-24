import {
  getKnowledgeArchive,
  getKnowledgeFaqs,
  getKnowledgeMedia,
} from "@/lib/knowledge";
import { ourTeamMembers } from "@/data/team";
import type { MarketingPageConfig } from "@/types/marketing-page";
import type { KnowledgeArchiveSlug } from "@/types/knowledge-hub";
import { marketingPages } from "./pages";

const KNOWLEDGE_ARCHIVE_SLUGS = new Set<string>([
  "research-archives",
  "market-updates",
  "newsletters",
]);

function mergeConfig(slug: string): MarketingPageConfig | null {
  const base = marketingPages[slug as keyof typeof marketingPages];
  if (!base) return null;

  return { ...base } as MarketingPageConfig;
}

async function overlayKnowledgeData(
  slug: string,
  config: MarketingPageConfig,
): Promise<MarketingPageConfig> {
  if (KNOWLEDGE_ARCHIVE_SLUGS.has(slug)) {
    const archive = await getKnowledgeArchive(slug as KnowledgeArchiveSlug);
    if (archive) {
      return {
        ...config,
        hero: archive.hero,
        archiveGroups: archive.groups,
      };
    }
  }

  if (slug === "media-spotlight") {
    const media = await getKnowledgeMedia();
    if (media) {
      return {
        ...config,
        hero: media.hero,
        mediaArticles: media.articles,
        mediaPodcasts: media.podcasts,
      };
    }
  }

  if (slug === "faqs") {
    const faqs = await getKnowledgeFaqs();
    if (faqs) {
      return {
        ...config,
        faqs: faqs.faqs,
        ...(faqs.hero ? { hero: faqs.hero } : {}),
      };
    }
  }

  if (slug === "our-team") {
    return {
      ...config,
      team: ourTeamMembers.map((member) => ({
        name: member.name,
        role: member.role,
        image: member.image,
        linkedinUrl: member.linkedinUrl,
        bio: member.bio,
      })),
    };
  }

  return config;
}

export const NAVBAR_MARKETING_SLUGS = Object.keys(marketingPages);

export async function getMarketingPageConfig(
  slug: string,
): Promise<MarketingPageConfig | null> {
  const base = mergeConfig(slug);
  if (!base) return null;

  return overlayKnowledgeData(slug, base);
}

export function isMarketingPageSlug(slug: string): boolean {
  return slug in marketingPages;
}
