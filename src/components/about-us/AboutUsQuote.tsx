import { aboutUsQuote } from "@/data/about-us";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function AboutUsQuote() {
  return (
    <section className="py-12 lg:py-16" aria-label="Featured quote">
      <div className="site-container">
        <ScrollReveal direction="none">
          <blockquote className="relative overflow-hidden rounded-2xl bg-brand-dark px-8 py-10 text-center sm:px-12 sm:py-12 lg:rounded-3xl">
            <span
              className="mx-auto mb-4 block font-display text-4xl leading-none text-brand-blue/40"
              aria-hidden
            >
              &ldquo;
            </span>
            <p className="font-display text-xl font-semibold leading-snug text-white sm:text-2xl md:text-[28px] md:leading-[38px]">
              {aboutUsQuote.text}
            </p>
            <cite className="mt-4 block font-body text-sm not-italic text-white/70 sm:text-base">
              — {aboutUsQuote.attribution}
            </cite>
          </blockquote>
        </ScrollReveal>
      </div>
    </section>
  );
}
