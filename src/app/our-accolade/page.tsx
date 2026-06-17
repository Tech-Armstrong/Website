import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Footer } from "@/components/layout/Footer";
import { InnerPageBanner } from "@/components/layout/InnerPageBanner";
import { OurAccoladeAwards } from "@/components/our-accolade/OurAccoladeAwards";
import { OurAccoladeHero } from "@/components/our-accolade/OurAccoladeHero";
import { OurAccoladeQuote } from "@/components/our-accolade/OurAccoladeQuote";
import { ourAccoladePageBanner } from "@/data/our-accolade";
import { getMarketingPageBySlug } from "@/lib/pages/content";
import { marketingPageMetadata } from "@/lib/pages/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getMarketingPageBySlug("our-accolade");

  if (!page) {
    return { title: "Page not found" };
  }

  return marketingPageMetadata(page);
}

export default async function OurAccoladePage() {
  const page = await getMarketingPageBySlug("our-accolade");

  if (!page) {
    notFound();
  }

  return (
    <>
      <InnerPageBanner
        title={ourAccoladePageBanner.title}
        backgroundImage={ourAccoladePageBanner.backgroundImage}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: page.title }]}
      />

      <main id="main-content" className="px-4 pb-12 lg:pb-16">
        <OurAccoladeHero />
        <OurAccoladeAwards />
        <OurAccoladeQuote />
      </main>

      <Footer />
    </>
  );
}
