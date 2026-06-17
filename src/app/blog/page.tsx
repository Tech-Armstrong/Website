import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogCard } from "@/components/blog/BlogCard";
import { BlogPagination } from "@/components/blog/BlogPagination";
import { Breadcrumbs } from "@/components/blog/Breadcrumbs";
import { Footer } from "@/components/layout/Footer";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { blogListingMetadata } from "@/lib/blog/metadata";
import {
  getPaginatedPostSummaries,
  parseBlogPageParam,
} from "@/lib/blog/posts";

type BlogPageProps = {
  searchParams: Promise<{ page?: string }>;
};

export const dynamic = "force-dynamic";

export async function generateMetadata({
  searchParams,
}: BlogPageProps): Promise<Metadata> {
  const { page } = await searchParams;
  return blogListingMetadata(parseBlogPageParam(page));
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const { page } = await searchParams;
  const requestedPage = parseBlogPageParam(page);
  const { posts, currentPage, totalPages, totalCount } =
    await getPaginatedPostSummaries(requestedPage);

  if (requestedPage > totalPages && totalCount > 0) {
    notFound();
  }

  return (
    <>
      <main id="main-content" className="px-4 pb-12 pt-28 lg:pb-16 lg:pt-32">
        <div className="mx-auto max-w-[1200px]">
          <ScrollReveal>
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Blog" },
            ]}
          />
          </ScrollReveal>

          <ScrollReveal delay={60}>
          <div className="mb-8 max-w-3xl">
            <span className="te-subtitle mb-[13px] inline-block rounded-full rounded-br-none border border-brand-blue px-[15px] py-[2px] font-display text-xs font-bold uppercase leading-[26px] text-brand-blue">
              Knowledge Hub
            </span>
            <h1 className="font-display text-[36px] font-semibold leading-[46px] text-brand-navy md:text-[42px]">
              Blog
            </h1>
            <p className="mt-4 font-body text-lg leading-relaxed text-brand-muted">
              Investment insights, market perspectives, and financial planning
              guidance from the Armstrong Capital team.
            </p>
          </div>
          </ScrollReveal>

          {totalCount === 0 ? (
            <ScrollReveal delay={120}>
            <div className="not-found-enter flex flex-col items-center gap-4 py-12 text-center">
              <div
                className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-surface text-brand-blue"
                aria-hidden
              >
                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.75">
                  <path d="M4 6h16M4 12h10M4 18h14" strokeLinecap="round" />
                </svg>
              </div>
              <p className="font-body text-brand-muted">No articles published yet.</p>
            </div>
            </ScrollReveal>
          ) : (
            <>
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {posts.map((post, index) => (
                  <ScrollReveal key={post.slug} delay={index * 60}>
                    <BlogCard post={post} />
                  </ScrollReveal>
                ))}
              </div>
              <ScrollReveal delay={posts.length * 60}>
              <BlogPagination
                currentPage={currentPage}
                totalPages={totalPages}
              />
              </ScrollReveal>
            </>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
