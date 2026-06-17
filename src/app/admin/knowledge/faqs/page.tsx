import { redirect } from "next/navigation";
import { FaqEditor } from "@/components/admin/FaqEditor";
import { isAdminAuthenticated } from "@/lib/admin/auth";
import { getKnowledgeFaqs } from "@/lib/knowledge";

export default async function AdminFaqsPage() {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login");
  }

  const existing = await getKnowledgeFaqs();

  const page = existing ?? {
    slug: "faqs" as const,
    faqs: [],
    updatedAt: new Date().toISOString(),
  };

  return <FaqEditor initialPage={page} />;
}
