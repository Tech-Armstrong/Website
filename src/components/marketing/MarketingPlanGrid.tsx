import type { MarketingPlanItem } from "@/types/marketing-page";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

type MarketingPlanGridProps = {
  plans: MarketingPlanItem[];
};

export function MarketingPlanGrid({ plans }: MarketingPlanGridProps) {
  return (
    <section className="border-t border-[#eef0f2] pt-8 pb-6" aria-label="Our plans">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
        {plans.map((plan, index) => (
          <ScrollReveal key={plan.title} delay={index * 60}>
            <article className="lift-card h-full rounded-xl border border-[#e8eaed] bg-white p-5 sm:p-6">
              <span className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-brand-blue/10 font-display text-sm font-bold text-brand-blue">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mb-2 font-display text-lg font-semibold text-brand-navy">
                {plan.title}
              </h3>
              <p className="font-body text-[15px] leading-relaxed text-brand-muted">
                {plan.description}
              </p>
            </article>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
