import Link from "next/link";
import { Footer } from "@/components/layout/Footer";

export default function NotFound() {
  return (
    <>
      <main
        id="main-content"
        className="flex min-h-[50vh] flex-col items-center justify-center px-4 py-20 text-center"
      >
        <h1 className="font-display text-3xl font-semibold text-brand-navy">
          Page not found
        </h1>
        <p className="mt-4 max-w-md font-body text-brand-muted">
          The page you requested does not exist. Try the homepage or our blog.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link href="/" className="theme-btn btn-two">
            Home
          </Link>
          <Link
            href="/blog"
            className="theme-btn btn-two border border-brand-blue bg-transparent text-brand-blue hover:bg-brand-blue hover:text-white"
          >
            Blog
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
