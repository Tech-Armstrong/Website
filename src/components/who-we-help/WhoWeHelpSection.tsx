import Image from "next/image";
import Link from "next/link";
import { PRIMARY_CTA_LABEL } from "@/data/home";
import {
  whoWeHelpIntro,
  whoWeHelpSegments,
} from "@/data/who-we-help";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

function LearnMoreLink() {
  return (
    <span className="mt-4 inline-flex items-center gap-1 font-display text-sm font-semibold text-brand-blue transition-[gap] group-hover:gap-2">
      Learn more
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
        <path d="M9 6l6 6-6 6" />
      </svg>
    </span>
  );
}

export function WhoWeHelpSection() {
  const { eyebrow, title, subtitle } = whoWeHelpIntro;

  return (
    <section aria-labelledby="who-we-help-heading">
      <ScrollReveal className="mx-auto mb-12 max-w-3xl text-center lg:mb-16">
        <p className="mb-2 font-display text-[11px] font-bold uppercase tracking-[0.12em] text-brand-blue sm:text-xs">
          {eyebrow}
        </p>
        <h2
          id="who-we-help-heading"
          className="font-display text-[clamp(1.75rem,3vw,2.25rem)] font-semibold leading-[1.15] text-brand-navy"
        >
          {title}
        </h2>
        <p className="mx-auto mt-3 max-w-2xl font-body text-base leading-relaxed text-brand-muted md:text-[17px] md:leading-[28px]">
          {subtitle}
        </p>
      </ScrollReveal>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        {whoWeHelpSegments.map((segment, index) => (
          <ScrollReveal key={segment.href} delay={index * 60}>
            <Link
              href={segment.href}
              className="lift-card focus-settle group flex h-full flex-col overflow-hidden rounded-2xl border border-[color:var(--brand-border)] bg-white"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-brand-surface">
                <Image
                  src={segment.image}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-[1.02] motion-reduce:transition-none"
                />
              </div>
              <div className="flex flex-1 flex-col p-5 sm:p-6">
                <h3 className="font-display text-lg font-semibold leading-snug text-brand-navy">
                  {segment.title}
                </h3>
                <p className="mt-2 flex-1 font-body text-[15px] leading-relaxed text-brand-muted line-clamp-4">
                  {segment.excerpt}
                </p>
                <LearnMoreLink />
              </div>
            </Link>
          </ScrollReveal>
        ))}
      </div>

      <ScrollReveal delay={whoWeHelpSegments.length * 60 + 40}>
        <div className="mt-14 text-center lg:mt-16">
          <p className="font-body text-base text-brand-muted md:text-[17px] md:leading-[28px]">
            Not sure which path fits you? Speak with our team for a personalized
            consultation.
          </p>
          <Link
            href="/contact"
            className="theme-btn btn-two focus-settle mt-6 inline-block"
          >
            {PRIMARY_CTA_LABEL}
          </Link>
        </div>
      </ScrollReveal>
    </section>
  );
}
