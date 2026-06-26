"use client";

import type { MarketingFeatures as MarketingFeaturesData } from "@/types/marketing-page";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

type MarketingFeaturesProps = {
  features: MarketingFeaturesData;
  headingId: string;
  borderless?: boolean;
};

export function MarketingFeatures({
  features,
  headingId,
  borderless = false,
}: MarketingFeaturesProps) {
  const { eyebrow, title, items } = features;

  return (
    <section
      className={`pt-8 pb-6${borderless ? "" : " border-t border-[color:var(--brand-border)]"}`}
      aria-labelledby={headingId}
    >
      <ScrollReveal>
        <SectionTitle
          eyebrow={eyebrow}
          title={title}
          headingId={headingId}
          align="left"
          className="mb-6"
        />
      </ScrollReveal>

      <div className="grid gap-4 sm:grid-cols-2 lg:gap-5">
        {items.map((item, index) => (
          <ScrollReveal key={item.title} delay={index * 60}>
            <article className="lift-card h-full rounded-xl border border-[color:var(--brand-border)] bg-white p-5 sm:p-6">
              <span className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-brand-blue/10 font-display text-sm font-bold text-brand-blue">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mb-2 font-display text-lg font-semibold text-brand-navy">
                {item.title}
              </h3>
              <p className="font-body text-[15px] leading-relaxed text-brand-muted">
                {item.description}
              </p>
            </article>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
