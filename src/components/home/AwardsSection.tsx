import Image from "next/image";
import { awardsSection } from "@/data/home";
import { ourAccoladeAwardsSection } from "@/data/our-accolade";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

// Show an even number so the grid never leaves a lone trailing item.
const awards = ourAccoladeAwardsSection.items.slice(0, 12);

export function AwardsSection() {
  return (
    <section
      className="home-section border-t border-[color:var(--brand-border)]"
      aria-labelledby="awards-heading"
    >
      <div className="site-container">
        <ScrollReveal className="mb-8 text-center">
          <p className="mb-2 font-display text-[11px] font-bold uppercase tracking-[0.12em] text-brand-blue sm:text-xs">
            {awardsSection.eyebrow}
          </p>
          <h2
            id="awards-heading"
            className="font-display text-[clamp(1.75rem,3vw,2.25rem)] font-semibold leading-[1.15] text-brand-navy"
          >
            {awardsSection.title}
          </h2>
          <p className="mx-auto mt-2 max-w-xl font-body text-base leading-relaxed text-brand-muted">
            {awardsSection.subtitle}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 lg:gap-6">
            {awards.map((award) => (
              <li key={award.title}>
                <div className="lift-card flex h-full flex-col items-center justify-center gap-3 rounded-xl border border-[color:var(--brand-border)] bg-brand-surface p-5 text-center">
                  <div className="flex h-16 w-full items-center justify-center">
                    <Image
                      src={award.image}
                      alt={award.title}
                      width={160}
                      height={64}
                      className="h-auto max-h-14 w-auto max-w-full object-contain"
                    />
                  </div>
                  <span className="font-display text-xs font-semibold leading-snug text-brand-navy sm:text-sm">
                    {award.title}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </ScrollReveal>
      </div>
    </section>
  );
}
