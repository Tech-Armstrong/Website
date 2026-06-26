import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AboutReadingProgress } from "@/components/about/AboutReadingProgress";
import { AboutTeamSection } from "@/components/about/AboutTeamSection";
import { AboutUsFeatures } from "@/components/about-us/AboutUsFeatures";
import { AboutUsHero } from "@/components/about-us/AboutUsHero";
import { Footer } from "@/components/layout/Footer";
import { InnerPageBanner } from "@/components/layout/InnerPageBanner";
import { MarketingFeatures } from "@/components/marketing/MarketingFeatures";
import { MarketingQuote } from "@/components/marketing/MarketingQuote";
import {
  aboutProcess,
  aboutProcessQuote,
  aboutResearch,
} from "@/data/about-page";
import { aboutUsPageBanner } from "@/data/about-us";
import { getMarketingPageBySlug } from "@/lib/pages/content";
import { marketingPageMetadata } from "@/lib/pages/metadata";

const ABOUT_PAGE_DESCRIPTION =
  "Learn about Armstrong Capital — our team, advisory process, and research approach. One place for who we are and how we work.";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getMarketingPageBySlug("about-us");

  if (!page) {
    return { title: "Page not found" };
  }

  const base = marketingPageMetadata(page);

  return {
    ...base,
    description: ABOUT_PAGE_DESCRIPTION,
    openGraph: base.openGraph
      ? { ...base.openGraph, description: ABOUT_PAGE_DESCRIPTION }
      : undefined,
  };
}

export default async function AboutUsPage() {
  const page = await getMarketingPageBySlug("about-us");

  if (!page) {
    notFound();
  }

  return (
    <>
      <AboutReadingProgress />

      <InnerPageBanner
        title={aboutUsPageBanner.title}
        backgroundImage={aboutUsPageBanner.backgroundImage}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: page.title }]}
      />

      <main id="main-content">
        <section
          id="about"
          className="scroll-mt-[var(--site-header-offset)]"
          aria-labelledby="about-us-hero-heading"
        >
          <AboutUsHero />
          <AboutUsFeatures />
        </section>

        <section
          id="our-team"
          className="scroll-mt-[var(--site-header-offset)] border-t border-[color:var(--brand-border)] py-12 lg:py-16"
          aria-labelledby="our-team-heading"
        >
          <div className="site-container px-4">
            <AboutTeamSection />
          </div>
        </section>

        <section
          id="our-process"
          className="scroll-mt-[var(--site-header-offset)] border-t border-[color:var(--brand-border)] py-12 lg:py-16"
          aria-labelledby="our-process-heading"
        >
          <div className="site-container mx-auto max-w-5xl px-4">
            <MarketingFeatures
              features={aboutProcess}
              headingId="our-process-heading"
              borderless
            />
          </div>
        </section>

        <section
          id="our-research"
          className="scroll-mt-[var(--site-header-offset)] border-t border-[color:var(--brand-border)] py-12 lg:py-16"
          aria-labelledby="our-research-heading"
        >
          <div className="site-container mx-auto max-w-5xl px-4">
            <MarketingFeatures
              features={aboutResearch}
              headingId="our-research-heading"
              borderless
            />
          </div>
        </section>

        <div className="site-container mx-auto max-w-5xl border-t border-[color:var(--brand-border)] px-4 py-12 lg:py-16">
          <MarketingQuote quote={aboutProcessQuote} />
        </div>
      </main>

      <Footer />
    </>
  );
}
