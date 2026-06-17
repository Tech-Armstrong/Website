import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AboutUsFeatures } from "@/components/about-us/AboutUsFeatures";
import { AboutUsHero } from "@/components/about-us/AboutUsHero";
import { AboutUsQuote } from "@/components/about-us/AboutUsQuote";
import { Footer } from "@/components/layout/Footer";
import { InnerPageBanner } from "@/components/layout/InnerPageBanner";
import { aboutUsPageBanner } from "@/data/about-us";
import { getMarketingPageBySlug } from "@/lib/pages/content";
import { marketingPageMetadata } from "@/lib/pages/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getMarketingPageBySlug("about-us");

  if (!page) {
    return { title: "Page not found" };
  }

  return marketingPageMetadata(page);
}

export default async function AboutUsPage() {
  const page = await getMarketingPageBySlug("about-us");

  if (!page) {
    notFound();
  }

  return (
    <>
      <InnerPageBanner
        title={aboutUsPageBanner.title}
        backgroundImage={aboutUsPageBanner.backgroundImage}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: page.title }]}
      />

      <main id="main-content" className="px-4 pb-12 lg:pb-16">
        <AboutUsHero />
        <AboutUsFeatures />
        <AboutUsQuote />
      </main>

      <Footer />
    </>
  );
}
