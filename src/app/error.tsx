"use client";

import Link from "next/link";
import { Footer } from "@/components/layout/Footer";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <>
      <main
        id="main-content"
        className="not-found-enter flex min-h-[50vh] flex-col items-center justify-center px-4 py-20 text-center"
      >
        <div
          className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-brand-surface font-display text-2xl font-bold text-brand-blue"
          aria-hidden
        >
          !
        </div>
        <h1 className="font-display text-3xl font-semibold text-brand-navy">
          Something went wrong
        </h1>
        <p className="mt-4 max-w-md font-body text-brand-muted">
          We could not load this page. Try again or return to the homepage.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <button
            type="button"
            onClick={() => reset()}
            className="theme-btn btn-two focus-settle active:scale-[0.98]"
          >
            Try again
          </button>
          <Link
            href="/"
            className="theme-btn btn-two focus-settle border border-brand-blue bg-transparent text-brand-blue hover:bg-brand-blue hover:text-white active:scale-[0.98]"
          >
            Home
          </Link>
        </div>
        {process.env.NODE_ENV === "development" && error.message ? (
          <p className="mt-6 max-w-lg text-left font-mono text-xs text-brand-muted">
            {error.message}
          </p>
        ) : null}
      </main>
      <Footer />
    </>
  );
}
