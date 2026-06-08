import Link from "next/link";
import { Footer } from "@/components/layout/Footer";

export default function BlogNotFound() {
  return (
    <>
      <main className="not-found-enter flex min-h-[50vh] flex-col items-center justify-center px-4 py-20 text-center">
        <div
          className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-brand-surface font-display text-lg font-bold text-brand-blue"
          aria-hidden
        >
          404
        </div>
        <h1 className="font-display text-3xl font-semibold text-brand-navy">
          Article not found
        </h1>
        <p className="mt-4 font-body text-brand-muted">
          The blog post you are looking for does not exist or has been removed.
        </p>
        <Link
          href="/blog"
          className="theme-btn btn-two focus-settle mt-8 inline-block active:scale-[0.98]"
        >
          Back to blog
        </Link>
      </main>
      <Footer />
    </>
  );
}
