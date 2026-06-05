import type { MarketingFeatures as MarketingFeaturesData } from "@/types/marketing-page";
import { SectionTitle } from "@/components/ui/SectionTitle";

type MarketingFeaturesProps = {
  features: MarketingFeaturesData;
  headingId: string;
};

export function MarketingFeatures({ features, headingId }: MarketingFeaturesProps) {
  const { eyebrow, title, items } = features;

  return (
    <section
      className="border-t border-[#eef0f2] pt-8 pb-6"
      aria-labelledby={headingId}
    >
      <SectionTitle
        eyebrow={eyebrow}
        title={title}
        headingId={headingId}
        align="left"
        className="mb-6"
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:gap-5">
        {items.map((item, index) => (
          <article
            key={item.title}
            className="rounded-xl border border-[#e8eaed] bg-white p-5 shadow-sm transition-shadow hover:shadow-md sm:p-6"
          >
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
        ))}
      </div>
    </section>
  );
}
