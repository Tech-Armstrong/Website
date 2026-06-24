import Image from "next/image";
import Link from "next/link";
import { PRIMARY_CTA_LABEL } from "@/data/home";
import {
  whoWeHelpIntro,
  whoWeHelpSegments,
} from "@/data/who-we-help";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

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

      <div className="space-y-14 lg:space-y-20">
        {whoWeHelpSegments.map((segment, index) => {
          const imageFirst = index % 2 === 0;
          const imageDirection = imageFirst ? "left" : "right";
          const textDirection = imageFirst ? "right" : "left";
          const stagger = index * 40;
          const headingId = `${segment.anchor}-heading`;

          return (
            <article
              key={segment.anchor}
              id={segment.anchor}
              className="grid scroll-mt-[calc(var(--site-header-offset)+1rem)] items-center gap-8 lg:grid-cols-2 lg:gap-12"
              aria-labelledby={headingId}
            >
              <ScrollReveal
                direction={imageDirection}
                mobileDirection="up"
                delay={stagger}
                className={imageFirst ? "" : "lg:order-2"}
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-[var(--elevation-panel)]">
                  <Image
                    src={segment.image}
                    alt=""
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
              </ScrollReveal>

              <ScrollReveal
                direction={textDirection}
                mobileDirection="up"
                delay={stagger + 60}
                className={imageFirst ? "" : "lg:order-1"}
              >
                <div>
                  <h3
                    id={headingId}
                    className="font-display text-xl font-semibold text-brand-navy sm:text-2xl"
                  >
                    {segment.title}
                  </h3>
                  <p className="mt-3 font-body leading-relaxed text-brand-muted">
                    {segment.description}
                  </p>
                  <ul className="mt-5 space-y-2" role="list">
                    {segment.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2.5 font-body text-[15px] text-brand-navy"
                      >
                        <svg
                          viewBox="0 0 20 20"
                          className="mt-0.5 h-4 w-4 shrink-0 text-brand-blue"
                          fill="currentColor"
                          aria-hidden
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            </article>
          );
        })}
      </div>

      <ScrollReveal delay={whoWeHelpSegments.length * 40 + 40}>
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
