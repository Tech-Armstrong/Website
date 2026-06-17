import { notFound, redirect } from "next/navigation";
import { BlogEditor } from "@/components/admin/BlogEditor";
import { isAdminAuthenticated } from "@/lib/admin/auth";
import { getPostBySlugForAdmin } from "@/lib/blog/posts";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function AdminEditBlogPostPage({ params }: PageProps) {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login");
  }

  const { slug } = await params;
  const post = await getPostBySlugForAdmin(slug);

  if (!post) {
    notFound();
  }

  return <BlogEditor post={post} />;
}
