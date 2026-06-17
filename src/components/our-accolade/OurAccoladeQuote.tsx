import { ourAccoladeQuote } from "@/data/our-accolade";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function OurAccoladeQuote() {
  return (
    <section className="py-12 lg:py-16" aria-label="Featured quote">
      <div className="site-container">
        <ScrollReveal direction="none">
          <div className="relative mx-auto max-w-4xl">
            <div
              className="pointer-events-none absolute left-1/2 top-1/2 h-[120%] w-[120%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-brand-blue/10"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute left-1/2 top-1/2 h-[105%] w-[105%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-brand-blue/[0.06]"
              aria-hidden
            />

            <blockquote className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-dark via-brand-dark to-brand-navy/90 px-8 py-10 text-center sm:px-12 sm:py-12 lg:rounded-3xl">
              <span
                className="pointer-events-none absolute left-4 top-1/2 hidden -translate-y-1/2 font-display text-[72px] font-bold uppercase tracking-widest text-white/[0.04] lg:block xl:left-8 xl:text-[90px]"
                aria-hidden
              >
                Praise
              </span>

              <span
                className="mx-auto mb-4 block font-display text-5xl leading-none text-brand-blue/40 sm:text-6xl"
                aria-hidden
              >
                &ldquo;
              </span>
              <p className="relative font-display text-xl font-semibold leading-snug text-white sm:text-2xl md:text-[28px] md:leading-[38px]">
                {ourAccoladeQuote.text}
              </p>
              <div
                className="mx-auto my-5 h-px w-16 bg-white/20"
                aria-hidden
              />
              <cite className="relative block font-body text-sm not-italic text-white/70 sm:text-base">
                — {ourAccoladeQuote.attribution}
              </cite>
            </blockquote>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
