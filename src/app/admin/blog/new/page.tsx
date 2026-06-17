import { redirect } from "next/navigation";
import { BlogEditor } from "@/components/admin/BlogEditor";
import { isAdminAuthenticated } from "@/lib/admin/auth";

export default async function AdminNewBlogPostPage() {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login");
  }

  return <BlogEditor />;
}
