import Image from "next/image";
import Link from "next/link";
import { offerings, offeringsSection } from "@/data/home";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

function LearnMoreLink({ href }: { href: string }) {
  return (
    <Link
      href={href}
      className="focus-settle mt-6 inline-flex items-center gap-1 font-display text-sm font-semibold text-brand-blue transition-[gap] hover:gap-2"
    >
      Learn more
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
        <path d="M9 6l6 6-6 6" />
      </svg>
    </Link>
  );
}

export function OurOfferingsSection() {
  const { eyebrow, title, subtitle } = offeringsSection;

  return (
    <section
      className="home-section border-t border-[color:var(--brand-border)] bg-brand-surface !pt-10 sm:!pt-12 lg:!pt-14"
      aria-labelledby="offerings-heading"
    >
      <div className="site-container">
        <ScrollReveal className="mx-auto mb-12 max-w-3xl text-center lg:mb-16">
          <p className="mb-2 font-display text-[11px] font-bold uppercase tracking-[0.12em] text-brand-blue sm:text-xs">
            {eyebrow}
          </p>
          <h2
            id="offerings-heading"
            className="font-display text-[clamp(1.75rem,3vw,2.25rem)] font-semibold leading-[1.15] text-brand-navy"
          >
            {title}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl font-body text-base leading-relaxed text-brand-muted md:text-[17px] md:leading-[28px]">
            {subtitle}
          </p>
        </ScrollReveal>

        <div className="space-y-14 lg:space-y-20">
          {offerings.map((offering, index) => {
            const imageFirst = index % 2 === 0;
            const imageDirection = imageFirst ? "left" : "right";
            const textDirection = imageFirst ? "right" : "left";
            const stagger = index * 40;

            return (
              <article
                key={offering.href}
                className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12"
                aria-labelledby={`offering-${index}-heading`}
              >
                <ScrollReveal
                  direction={imageDirection}
                  mobileDirection="up"
                  delay={stagger}
                  className={imageFirst ? "" : "lg:order-2"}
                >
                  <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-[var(--elevation-panel)]">
                    <Image
                      src={offering.image}
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
                      id={`offering-${index}-heading`}
                      className="font-display text-xl font-semibold text-brand-navy sm:text-2xl"
                    >
                      {offering.title}
                    </h3>
                    <p className="mt-3 font-body leading-relaxed text-brand-muted">
                      {offering.description}
                    </p>
                    <ul className="mt-5 space-y-2" role="list">
                      {offering.items.map((item) => (
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
                    <LearnMoreLink href={offering.href} />
                  </div>
                </ScrollReveal>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
