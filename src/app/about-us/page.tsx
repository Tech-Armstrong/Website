import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AboutUsFeatures } from "@/components/about-us/AboutUsFeatures";
import { AboutUsHero } from "@/components/about-us/AboutUsHero";
import { AboutUsQuote } from "@/components/about-us/AboutUsQuote";
import { Breadcrumbs } from "@/components/blog/Breadcrumbs";
import { Footer } from "@/components/layout/Footer";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
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
      <main id="main-content" className="px-4 pb-12 pt-28 lg:pb-16 lg:pt-32">
        <div className="site-container">
          <ScrollReveal>
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: page.title },
            ]}
          />
          </ScrollReveal>

          <header className="sr-only">
            <h1>{page.title}</h1>
          </header>

          <AboutUsHero />
          <AboutUsFeatures />
          <AboutUsQuote />
        </div>
      </main>

      <Footer />
    </>
  );
}
