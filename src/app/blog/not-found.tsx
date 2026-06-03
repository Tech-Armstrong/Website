import Link from "next/link";
import { Footer } from "@/components/layout/Footer";

export default function BlogNotFound() {
  return (
    <>
      <main className="flex min-h-[50vh] flex-col items-center justify-center px-4 py-20 text-center">
        <h1 className="font-display text-3xl font-semibold text-brand-navy">
          Article not found
        </h1>
        <p className="mt-4 font-body text-brand-muted">
          The blog post you are looking for does not exist or has been removed.
        </p>
        <Link
          href="/blog"
          className="theme-btn btn-two mt-8 inline-block"
        >
          Back to blog
        </Link>
      </main>
      <Footer />
    </>
  );
}
