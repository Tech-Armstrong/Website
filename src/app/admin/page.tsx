import Link from "next/link";
import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/admin/auth";
import {
  getKnowledgeArchiveStats,
  getKnowledgeFaqStats,
  getKnowledgeMediaStats,
} from "@/lib/knowledge";
import { getAllPostsForAdmin } from "@/lib/blog/posts";
import { KNOWLEDGE_SECTIONS } from "@/types/knowledge-hub";

function formatUpdatedAt(value: string | null): string {
  if (!value) return "Not yet saved";
  return new Date(value).toLocaleString();
}

export default async function AdminDashboardPage() {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login");
  }

  const [
    researchStats,
    marketStats,
    newsletterStats,
    mediaStats,
    faqStats,
    posts,
  ] = await Promise.all([
    getKnowledgeArchiveStats("research-archives"),
    getKnowledgeArchiveStats("market-updates"),
    getKnowledgeArchiveStats("newsletters"),
    getKnowledgeMediaStats(),
    getKnowledgeFaqStats(),
    getAllPostsForAdmin(),
  ]);

  const statsBySlug: Record<
    string,
    { countLabel: string; updatedAt: string | null }
  > = {
    "research-archives": {
      countLabel: `${researchStats.itemCount} downloads`,
      updatedAt: researchStats.updatedAt,
    },
    "market-updates": {
      countLabel: `${marketStats.itemCount} downloads`,
      updatedAt: marketStats.updatedAt,
    },
    newsletters: {
      countLabel: `${newsletterStats.itemCount} downloads`,
      updatedAt: newsletterStats.updatedAt,
    },
    "media-spotlight": {
      countLabel: `${mediaStats.articleCount} articles, ${mediaStats.podcastCount} podcasts`,
      updatedAt: mediaStats.updatedAt,
    },
    faqs: {
      countLabel: `${faqStats.faqCount} questions`,
      updatedAt: faqStats.updatedAt,
    },
    blog: {
      countLabel: `${posts.length} posts`,
      updatedAt: posts[0]?.modified ?? null,
    },
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-semibold text-brand-navy">
          Knowledge Hub Admin
        </h1>
        <p className="mt-2 font-body text-sm text-brand-muted">
          Manage downloads, media links, FAQs, and blog content for the Knowledge Hub.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {KNOWLEDGE_SECTIONS.map((section) => {
          const stats = statsBySlug[section.slug];
          const editHref =
            section.slug === "blog"
              ? "/admin/blog"
              : section.slug === "media-spotlight" ||
                  section.slug === "faqs"
                ? `/admin/knowledge/${section.slug}`
                : `/admin/knowledge/${section.slug}`;

          return (
            <article
              key={section.slug}
              className="rounded-2xl border border-brand-blue/10 bg-white p-5 shadow-[var(--elevation-card)]"
            >
              <h2 className="font-display text-lg font-semibold text-brand-navy">
                {section.label}
              </h2>
              <p className="mt-2 font-body text-sm text-brand-muted">
                {stats.countLabel}
              </p>
              <p className="mt-1 font-body text-xs text-brand-muted">
                Updated: {formatUpdatedAt(stats.updatedAt)}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Link
                  href={editHref}
                  className="rounded-lg bg-brand-navy px-3 py-2 font-body text-sm font-medium text-white focus-settle"
                >
                  Edit
                </Link>
                <Link
                  href={section.publicPath}
                  target="_blank"
                  className="rounded-lg border border-brand-blue/20 px-3 py-2 font-body text-sm text-brand-navy focus-settle hover:bg-brand-surface"
                >
                  Preview
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
