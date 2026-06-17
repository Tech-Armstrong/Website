import Link from "next/link";
import { logoutAction } from "@/lib/admin/actions/auth";
import { isAdminAuthenticated } from "@/lib/admin/auth";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const authenticated = await isAdminAuthenticated();

  return (
    <div className="min-h-screen bg-brand-surface">
      {authenticated ? (
        <header className="border-b border-brand-blue/10 bg-white">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
            <div className="flex items-center gap-4">
              <Link
                href="/admin"
                className="font-display text-lg font-semibold text-brand-navy focus-settle"
              >
                Knowledge Hub Admin
              </Link>
              <Link
                href="/"
                className="font-body text-sm text-brand-muted focus-settle hover:text-brand-navy"
              >
                View site
              </Link>
            </div>
            <form action={logoutAction}>
              <button
                type="submit"
                className="rounded-lg border border-brand-blue/20 px-3 py-2 font-body text-sm text-brand-navy focus-settle hover:bg-brand-surface"
              >
                Sign out
              </button>
            </form>
          </div>
        </header>
      ) : null}
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">{children}</main>
    </div>
  );
}
