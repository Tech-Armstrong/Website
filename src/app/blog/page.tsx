import type { Metadata } from "next";
import { BlogCard } from "@/components/blog/BlogCard";
import { Breadcrumbs } from "@/components/blog/Breadcrumbs";
import { Footer } from "@/components/layout/Footer";
import { blogListingMetadata } from "@/lib/blog/metadata";
import { getAllPostSummaries } from "@/lib/blog/posts";

export const metadata: Metadata = blogListingMetadata();

export default async function BlogPage() {
  const posts = await getAllPostSummaries();

  return (
    <>
      <main id="main-content" className="px-4 pb-12 pt-28 lg:pb-16 lg:pt-32">
        <div className="mx-auto max-w-[1200px]">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Blog" },
            ]}
          />

          <div className="mb-12 max-w-3xl">
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

          {posts.length === 0 ? (
            <p className="font-body text-brand-muted">No articles published yet.</p>
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
