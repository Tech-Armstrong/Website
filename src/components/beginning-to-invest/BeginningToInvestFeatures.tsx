import {
  beginningToInvestFeatures,
  beginningToInvestServices,
} from "@/data/beginning-to-invest";
import { SectionTitle } from "@/components/ui/SectionTitle";

export function BeginningToInvestFeatures() {
  const { eyebrow, title } = beginningToInvestFeatures;

  return (
    <section
      className="border-t border-[#eef0f2] pt-8 pb-6"
      aria-labelledby="beginning-to-invest-features-heading"
    >
      <SectionTitle
        eyebrow={eyebrow}
        title={title}
        headingId="beginning-to-invest-features-heading"
        align="left"
        className="mb-6"
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:gap-5">
        {beginningToInvestServices.map((service) => (
          <article
            key={service.number}
            className="rounded-xl border border-[#e8eaed] bg-white p-5 shadow-sm transition-shadow hover:shadow-md sm:p-6"
          >
            <span className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-brand-blue/10 font-display text-sm font-bold text-brand-blue">
              {service.number}
            </span>
            <h3 className="mb-2 font-display text-lg font-semibold text-brand-navy">
              {service.title}
            </h3>
            <p className="font-body text-[15px] leading-relaxed text-brand-muted">
              {service.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
