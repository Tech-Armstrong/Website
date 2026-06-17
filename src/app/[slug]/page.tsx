import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MarketingPageRenderer } from "@/components/marketing/MarketingPageRenderer";
import {
  getMarketingPageConfig,
  isMarketingPageSlug,
} from "@/data/marketing-pages";
import {
  getMarketingPageBySlug,
  getMarketingPageSlugs,
} from "@/lib/pages/content";
import { marketingPageMetadata } from "@/lib/pages/metadata";

type MarketingPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  const slugs = (await getMarketingPageSlugs()).filter(
    (slug) =>
      slug !== "about-us" &&
      slug !== "beginning-to-invest" &&
      slug !== "our-accolade" &&
      isMarketingPageSlug(slug),
  );
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: MarketingPageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = await getMarketingPageBySlug(slug);

  if (!page) {
    return { title: "Page not found" };
  }

  return marketingPageMetadata(page);
}

export default async function MarketingPage({ params }: MarketingPageProps) {
  const { slug } = await params;
  const page = await getMarketingPageBySlug(slug);
  const config = await getMarketingPageConfig(slug);

  if (!page || !config) {
    notFound();
  }

  return <MarketingPageRenderer page={page} config={config} />;
}
