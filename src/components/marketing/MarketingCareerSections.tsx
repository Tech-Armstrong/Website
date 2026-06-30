import type { MarketingCareerSection } from "@/types/marketing-page";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { CareerApplyCta } from "./CareerApplyCta";

type MarketingCareerSectionsProps = {
  sections: MarketingCareerSection[];
  cta?: { label: string; href: string };
};

export function MarketingCareerSections({ sections, cta }: MarketingCareerSectionsProps) {
  return (
    <section className="border-t border-[color:var(--brand-border)] pt-8 pb-6" aria-label="Career opportunities">
      <div className="space-y-8">
        {sections.map((section, index) => (
          <ScrollReveal key={section.title} delay={index * 80}>
            <article>
              <h3 className="mb-3 font-display text-xl font-semibold text-brand-navy">
                {section.title}
              </h3>
              <div className="space-y-3 font-body text-[15px] leading-relaxed text-brand-muted">
                {section.paragraphs.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
              {section.bullets?.length ? (
                <ul className="mt-3 list-disc space-y-1 pl-5 font-body text-[15px] text-brand-muted">
                  {section.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              ) : null}
            </article>
          </ScrollReveal>
        ))}
      </div>
      {cta ? <CareerApplyCta label={cta.label} /> : null}
    </section>
  );
}
