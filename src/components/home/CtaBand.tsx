import Link from "next/link";
import { ctaBand } from "@/data/home";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function CtaBand() {
  return (
    <section
      className="border-t border-[color:var(--brand-border)] bg-brand-dark px-4 py-12 sm:py-14"
      aria-labelledby="cta-band-heading"
    >
      <div className="site-container">
        <ScrollReveal className="mx-auto max-w-2xl text-center">
          <h2
            id="cta-band-heading"
            className="font-display text-[clamp(1.75rem,3vw,2.25rem)] font-semibold leading-[1.15] text-white"
          >
            {ctaBand.title}
          </h2>
          <p className="mt-3 font-body text-base leading-relaxed text-white/80">
            {ctaBand.subtitle}
          </p>
          <Link
            href={ctaBand.ctaHref}
            className="theme-btn btn-two focus-settle mt-6 inline-block"
          >
            {ctaBand.ctaLabel}
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
