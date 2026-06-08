import Link from "next/link";

type BlogPaginationProps = {
  currentPage: number;
  totalPages: number;
};

function blogPageHref(page: number): string {
  return page === 1 ? "/blog" : `/blog?page=${page}`;
}

function getPageNumbers(
  currentPage: number,
  totalPages: number,
): Array<number | "ellipsis"> {
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const pages = new Set<number>([1, totalPages, currentPage]);

  if (currentPage > 1) pages.add(currentPage - 1);
  if (currentPage < totalPages) pages.add(currentPage + 1);

  const sorted = [...pages].sort((a, b) => a - b);
  const result: Array<number | "ellipsis"> = [];

  for (let index = 0; index < sorted.length; index += 1) {
    const page = sorted[index];
    const previous = sorted[index - 1];

    if (index > 0 && page - previous > 1) {
      result.push("ellipsis");
    }

    result.push(page);
  }

  return result;
}

const pageLinkClass =
  "focus-settle inline-flex h-10 min-w-10 items-center justify-center rounded-full border border-[#e8eaed] px-3 font-display text-sm font-semibold text-brand-navy transition-colors hover:border-brand-blue hover:text-brand-blue";

const activePageClass =
  "inline-flex h-10 min-w-10 items-center justify-center rounded-full bg-brand-blue px-3 font-display text-sm font-semibold text-white";

const disabledClass =
  "inline-flex h-10 items-center justify-center rounded-full border border-[#e8eaed] px-4 font-display text-sm font-semibold text-brand-muted opacity-50";

export function BlogPagination({ currentPage, totalPages }: BlogPaginationProps) {
  if (totalPages <= 1) return null;

  const pageNumbers = getPageNumbers(currentPage, totalPages);

  return (
    <nav
      className="mt-12 flex flex-wrap items-center justify-center gap-2"
      aria-label="Blog pagination"
    >
      {currentPage > 1 ? (
        <Link href={blogPageHref(currentPage - 1)} className={pageLinkClass}>
          Previous
        </Link>
      ) : (
        <span className={disabledClass} aria-disabled="true">
          Previous
        </span>
      )}

      <div className="flex flex-wrap items-center justify-center gap-1.5 px-1">
        {pageNumbers.map((item, index) =>
          item === "ellipsis" ? (
            <span
              key={`ellipsis-${index}`}
              className="px-1 font-display text-sm text-brand-muted"
              aria-hidden="true"
            >
              …
            </span>
          ) : item === currentPage ? (
            <span
              key={item}
              className={activePageClass}
              aria-current="page"
            >
              {item}
            </span>
          ) : (
            <Link key={item} href={blogPageHref(item)} className={pageLinkClass}>
              {item}
            </Link>
          ),
        )}
      </div>

      {currentPage < totalPages ? (
        <Link href={blogPageHref(currentPage + 1)} className={pageLinkClass}>
          Next
        </Link>
      ) : (
        <span className={disabledClass} aria-disabled="true">
          Next
        </span>
      )}
    </nav>
  );
}
