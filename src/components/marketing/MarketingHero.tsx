import Image from "next/image";
import type { MarketingHero as MarketingHeroData } from "@/types/marketing-page";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

type MarketingHeroProps = {
  hero: MarketingHeroData;
  headingId: string;
  compact?: boolean;
};

export function MarketingHero({
  hero,
  headingId,
  compact = false,
}: MarketingHeroProps) {
  const { title, paragraphs, image } = hero;

  return (
    <section
      className={compact ? "pb-4" : "pb-8"}
      aria-labelledby={headingId}
    >
      <div
        className={`grid items-center gap-6 ${image ? "lg:grid-cols-2 lg:gap-8" : ""}`}
      >
        {image ? (
          <ScrollReveal direction="left">
            <div className="relative mx-auto aspect-[4/3] w-full max-w-lg overflow-hidden rounded-xl shadow-md lg:max-w-none">
              <Image
                src={image}
                alt=""
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                priority
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-brand-dark/30 to-transparent"
                aria-hidden
              />
            </div>
          </ScrollReveal>
        ) : null}

        <ScrollReveal direction={image ? "right" : "up"} delay={image ? 80 : 0}>
          <div className={image ? "" : compact ? "max-w-2xl" : "max-w-3xl"}>
            <h1
              id={headingId}
              className={
                compact
                  ? "font-display text-[clamp(2rem,4vw,2.75rem)] font-semibold leading-[1.1] text-brand-navy"
                  : "font-display text-[clamp(2rem,4vw,2.75rem)] font-semibold leading-[1.1] text-brand-navy"
              }
            >
              {title}
            </h1>
            <div
              className={
                compact
                  ? "mt-3 space-y-3 font-body text-[15px] leading-[24px] text-brand-muted md:text-base md:leading-[26px]"
                  : "mt-4 space-y-4 font-body text-base leading-relaxed text-brand-muted md:text-[17px] md:leading-[28px]"
              }
            >
              {paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
