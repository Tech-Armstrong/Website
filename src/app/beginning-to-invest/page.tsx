import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BeginningToInvestFeatures } from "@/components/beginning-to-invest/BeginningToInvestFeatures";
import { BeginningToInvestHero } from "@/components/beginning-to-invest/BeginningToInvestHero";
import { BeginningToInvestQuote } from "@/components/beginning-to-invest/BeginningToInvestQuote";
import { Breadcrumbs } from "@/components/blog/Breadcrumbs";
import { Footer } from "@/components/layout/Footer";
import { SegmentSidebar } from "@/components/segments/SegmentSidebar";
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

  if (!page) {
    notFound();
  }

  return (
    <>
      <main id="main-content" className="pb-10 pt-28 lg:pb-12 lg:pt-32">
        <div className="site-container px-4">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: page.title },
            ]}
          />

          <header className="sr-only">
            <h1>{page.title}</h1>
          </header>

          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-start lg:gap-8">
            <div className="min-w-0">
              <BeginningToInvestHero />
              <BeginningToInvestFeatures />
              <BeginningToInvestQuote />
            </div>
            <SegmentSidebar activeSlug="beginning-to-invest" />
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
