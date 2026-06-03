import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogPostContent } from "@/components/blog/BlogPostContent";
import { BlogPostHeader } from "@/components/blog/BlogPostHeader";
import { Breadcrumbs } from "@/components/blog/Breadcrumbs";
import { RelatedPosts } from "@/components/blog/RelatedPosts";
import { Footer } from "@/components/layout/Footer";
import {
  articleJsonLd,
  blogPostMetadata,
} from "@/lib/blog/metadata";
import {
  getAllPostSlugs,
  getAllPostSummaries,
  getPostBySlug,
} from "@/lib/blog/posts";
import { getRelatedPosts } from "@/lib/blog/related";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return { title: "Article not found" };
  }

  return blogPostMetadata(post);
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const allSummaries = await getAllPostSummaries();
  const related = getRelatedPosts(post, allSummaries, 3);
  const jsonLd = articleJsonLd(post);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main id="main-content" className="px-4 pb-12 pt-28 lg:pb-16 lg:pt-32">
        <article className="mx-auto max-w-[800px]">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Blog", href: "/blog" },
              { label: post.title },
            ]}
          />

          <BlogPostHeader post={post} />
          <BlogPostContent html={post.content} />
          <RelatedPosts posts={related} />
        </article>
      </main>

      <Footer />
    </>
  );
}
