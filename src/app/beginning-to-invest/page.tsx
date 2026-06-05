import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MarketingPageRenderer } from "@/components/marketing/MarketingPageRenderer";
import { getMarketingPageConfig } from "@/data/marketing-pages";
import { getMarketingPageBySlug } from "@/lib/pages/content";
import { marketingPageMetadata } from "@/lib/pages/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getMarketingPageBySlug("beginning-to-invest");

  if (!page) {
    return { title: "Page not found" };
  }

  return marketingPageMetadata(page);
}

export default async function BeginningToInvestPage() {
  const page = await getMarketingPageBySlug("beginning-to-invest");
  const config = getMarketingPageConfig("beginning-to-invest");

  if (!page || !config) {
    notFound();
  }

  return <MarketingPageRenderer page={page} config={config} />;
}
