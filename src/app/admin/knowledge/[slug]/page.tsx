import { notFound, redirect } from "next/navigation";
import { ArchiveEditor } from "@/components/admin/ArchiveEditor";
import { isAdminAuthenticated } from "@/lib/admin/auth";
import { getKnowledgeArchive } from "@/lib/knowledge";
import {
  KNOWLEDGE_ARCHIVE_SLUGS,
  KNOWLEDGE_SECTIONS,
  type KnowledgeArchivePage,
  type KnowledgeArchiveSlug,
} from "@/types/knowledge-hub";

type PageProps = {
  params: Promise<{ slug: string }>;
};

const DEFAULT_HERO = {
  "research-archives": {
    title: "Research Archives",
    paragraphs: [
      "Browse Armstrong Capital's research publications covering market trends, economic analysis, and investment strategy insights.",
    ],
    image: "https://armstrong-cap.com/wp-content/uploads/financial_planning.webp",
  },
  "market-updates": {
    title: "Market Updates",
    paragraphs: [
      "Stay informed with our monthly Money Moves series and timely market commentary from Armstrong Capital's research team.",
    ],
    image:
      "https://armstrong-cap.com/wp-content/uploads/investment_management-min.webp",
  },
  newsletters: {
    title: "Newsletters",
    paragraphs: [
      "Read our latest newsletters featuring market perspectives, portfolio insights, and financial planning guidance.",
    ],
    image: "https://armstrong-cap.com/wp-content/uploads/wealth_management.webp",
  },
} as const;

function isArchiveSlug(slug: string): slug is KnowledgeArchiveSlug {
  return KNOWLEDGE_ARCHIVE_SLUGS.includes(slug as KnowledgeArchiveSlug);
}

export default async function AdminKnowledgeArchivePage({ params }: PageProps) {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login");
  }

  const { slug } = await params;

  if (!isArchiveSlug(slug)) {
    notFound();
  }

  const section = KNOWLEDGE_SECTIONS.find((entry) => entry.slug === slug);
  const existing = await getKnowledgeArchive(slug);

  const page =
    existing ??
    ({
      slug,
      hero: {
        ...DEFAULT_HERO[slug],
        paragraphs: [...DEFAULT_HERO[slug].paragraphs],
      },
      groups: [],
      updatedAt: new Date().toISOString(),
    } satisfies KnowledgeArchivePage);

  return (
    <ArchiveEditor
      initialPage={page}
      slug={slug}
      title={section?.label ?? slug}
      publicPath={section?.publicPath ?? `/${slug}`}
    />
  );
}
