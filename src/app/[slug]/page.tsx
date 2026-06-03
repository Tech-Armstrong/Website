import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/blog/Breadcrumbs";
import { BlogPostContent } from "@/components/blog/BlogPostContent";
import { Footer } from "@/components/layout/Footer";
import { marketingPageMetadata } from "@/lib/pages/metadata";
import {
  getMarketingPageBySlug,
  getMarketingPageSlugs,
} from "@/lib/pages/content";

type MarketingPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await getMarketingPageSlugs();
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

  if (!page) {
    notFound();
  }

  return (
    <>
      <main id="main-content" className="px-4 pb-12 pt-28 lg:pb-16 lg:pt-32">
        <article className="mx-auto max-w-[1200px]">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: page.title },
            ]}
          />

          <header className="mb-10">
            <h1 className="font-display text-[32px] font-semibold leading-tight text-brand-navy md:text-[42px]">
              {page.title}
            </h1>
          </header>

          <BlogPostContent html={page.content} />
        </article>
      </main>

      <Footer />
    </>
  );
}
