import Image from "next/image";
import { aboutUsHero } from "@/data/about-us";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function AboutUsHero() {
  const { titleLine1, titleLine2, paragraphs, images } = aboutUsHero;

  return (
    <section
      className="site-container pb-16 pt-12 lg:pb-20 lg:pt-16"
      aria-labelledby="about-us-hero-heading"
    >
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12 xl:gap-14">
        <ScrollReveal
          direction="left"
          className="relative mx-auto aspect-[4/5] w-full max-w-md lg:max-w-none"
        >
          <div
            className="pointer-events-none absolute -left-2 -top-2 h-[92%] w-[92%] bg-contain bg-left-top bg-no-repeat sm:-left-4 sm:-top-4"
            style={{ backgroundImage: `url(${images.shape})` }}
            aria-hidden
          />
          <div className="relative ml-auto h-full w-[82%]">
            <div className="relative z-10 aspect-[4/5] w-[68%] overflow-hidden rounded-2xl shadow-[var(--elevation-panel)]">
              <Image
                src={images.primary}
                alt="Armstrong Capital team collaboration"
                fill
                sizes="(max-width: 1024px) 280px, 360px"
                className="object-cover"
                priority
              />
            </div>
            <div className="absolute bottom-0 right-0 z-20 aspect-[4/5] w-[58%] overflow-hidden rounded-2xl border-4 border-white shadow-[var(--elevation-panel)]">
              <Image
                src={images.secondary}
                alt="Professional financial advisory setting"
                fill
                sizes="(max-width: 1024px) 200px, 260px"
                className="object-cover"
              />
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal direction="right" delay={100}>
          <div>
            <h2
              id="about-us-hero-heading"
              className="font-display text-2xl font-semibold leading-tight text-brand-navy sm:text-[26px] md:text-[30px] md:leading-[38px]"
            >
              {titleLine1}
              <br />
              {titleLine2}
            </h2>
            <div className="mt-5 space-y-4 font-body text-[15px] leading-relaxed text-brand-navy/85 md:text-base md:leading-[28px]">
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
