import { redirect } from "next/navigation";
import { MediaEditor } from "@/components/admin/MediaEditor";
import { isAdminAuthenticated } from "@/lib/admin/auth";
import { getKnowledgeMedia } from "@/lib/knowledge";

export default async function AdminMediaSpotlightPage() {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login");
  }

  const existing = await getKnowledgeMedia();

  const page = existing ?? {
    slug: "media-spotlight" as const,
    hero: {
      title: "Media Spotlight",
      paragraphs: [
        "Explore press coverage and podcast conversations featuring Armstrong Capital's insights on wealth management and financial planning.",
      ],
    },
    articles: [],
    podcasts: [],
    updatedAt: new Date().toISOString(),
  };

  return <MediaEditor initialPage={page} />;
}
