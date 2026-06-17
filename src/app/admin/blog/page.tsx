import Link from "next/link";
import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/admin/auth";
import { getAllPostsForAdmin } from "@/lib/blog/posts";

export default async function AdminBlogListPage() {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login");
  }

  const posts = await getAllPostsForAdmin();

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <Link
            href="/admin"
            className="font-body text-sm text-brand-muted focus-settle hover:text-brand-navy"
          >
            Back to dashboard
          </Link>
          <h1 className="mt-1 font-display text-2xl font-semibold text-brand-navy">
            Blog Archives
          </h1>
        </div>
        <Link
          href="/admin/blog/new"
          className="rounded-lg bg-brand-navy px-4 py-2 font-body text-sm font-medium text-white focus-settle"
        >
          New post
        </Link>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-brand-blue/10 bg-white">
        <table className="min-w-full text-left font-body text-sm">
          <thead className="border-b border-brand-blue/10 bg-brand-surface">
            <tr>
              <th className="px-4 py-3 font-medium text-brand-navy">Title</th>
              <th className="px-4 py-3 font-medium text-brand-navy">Status</th>
              <th className="px-4 py-3 font-medium text-brand-navy">Date</th>
              <th className="px-4 py-3 font-medium text-brand-navy">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.slug} className="border-b border-brand-blue/5">
                <td className="px-4 py-3 text-brand-navy">{post.title}</td>
                <td className="px-4 py-3 text-brand-muted">{post.status}</td>
                <td className="px-4 py-3 text-brand-muted">
                  {new Date(post.date).toLocaleDateString()}
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <Link
                      href={`/admin/blog/${post.slug}`}
                      className="rounded-lg border border-brand-blue/20 px-3 py-1.5 text-brand-navy focus-settle hover:bg-brand-surface"
                    >
                      Edit
                    </Link>
                    <Link
                      href={`/blog/${post.slug}`}
                      target="_blank"
                      className="rounded-lg border border-brand-blue/20 px-3 py-1.5 text-brand-navy focus-settle hover:bg-brand-surface"
                    >
                      Preview
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
