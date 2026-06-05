import { beginningToInvestQuote } from "@/data/beginning-to-invest";

export function BeginningToInvestQuote() {
  return (
    <section className="pt-6 pb-2" aria-label="Featured quote">
      <blockquote className="relative overflow-hidden rounded-xl bg-brand-dark px-6 py-8 text-center sm:px-8 sm:py-9">
        <p className="font-display text-xl font-semibold leading-snug text-white sm:text-2xl md:text-[22px] md:leading-[32px]">
          {beginningToInvestQuote.text}
        </p>
        <cite className="mt-3 block font-body text-sm not-italic text-white/70 sm:text-base">
          — {beginningToInvestQuote.attribution}
        </cite>
      </blockquote>
    </section>
  );
}
