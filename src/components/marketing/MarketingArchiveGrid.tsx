"use client";

import Image from "next/image";
import { useState } from "react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import type { MarketingArchiveGroup } from "@/types/marketing-page";

type MarketingArchiveGridProps = {
  groups: MarketingArchiveGroup[];
  headingId: string;
};

export function MarketingArchiveGrid({
  groups,
  headingId,
}: MarketingArchiveGridProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const hasTabs = groups.length > 1;
  const activeGroup = groups[activeIndex] ?? groups[0];

  if (!activeGroup || activeGroup.items.length === 0) {
    return null;
  }

  return (
    <section className="pt-6 pb-2" aria-labelledby={headingId}>
      <h2 id={headingId} className="sr-only">
        Download archives
      </h2>

      {hasTabs ? (
        <div
          className="media-spotlight-tabs"
          role="tablist"
          aria-label="Archive year"
        >
          {groups.map((group, index) => (
            <button
              key={group.label}
              type="button"
              role="tab"
              aria-selected={activeIndex === index}
              aria-controls={`archive-panel-${index}`}
              id={`archive-tab-${index}`}
              onClick={() => setActiveIndex(index)}
              className="media-spotlight-tab focus-settle"
            >
              {group.label}
            </button>
          ))}
        </div>
      ) : null}

      <div
        id={hasTabs ? `archive-panel-${activeIndex}` : undefined}
        role={hasTabs ? "tabpanel" : undefined}
        aria-labelledby={hasTabs ? `archive-tab-${activeIndex}` : undefined}
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {activeGroup.items.map((item, index) => (
          <ScrollReveal key={item.id} delay={index * 60}>
            <article className="lift-card group relative overflow-hidden rounded-xl border border-[color:var(--brand-border)] bg-white">
              <div className="relative aspect-[525/286] w-full overflow-hidden bg-brand-surface">
                {item.thumbnailUrl ? (
                  <Image
                    src={item.thumbnailUrl}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.02] motion-reduce:transition-none"
                  />
                ) : null}
                <a
                  href={item.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Download ${item.title}`}
                  className="focus-settle absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-brand-navy text-white shadow-md"
                >
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M12 3v12m0 0l4-4m-4 4l-4-4M4 21h16" />
                  </svg>
                </a>
              </div>
              <div className="p-4">
                <h3 className="font-body text-sm font-medium leading-snug text-brand-navy">
                  {item.title}
                </h3>
              </div>
            </article>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
