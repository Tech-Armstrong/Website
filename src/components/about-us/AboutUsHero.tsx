import Image from "next/image";
import { aboutUsCredential, aboutUsHero } from "@/data/about-us";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function AboutUsHero() {
  const { titleLine1, titleLine2, paragraphs, image, imageAlt } = aboutUsHero;

  return (
    <section
      className="site-container pb-16 pt-12 lg:pb-20 lg:pt-16"
      aria-labelledby="about-us-hero-heading"
    >
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12 xl:gap-14">
        <ScrollReveal direction="left">
          <div className="relative mx-auto aspect-[4/3] w-full max-w-lg overflow-hidden rounded-2xl shadow-[var(--elevation-panel)] lg:max-w-none">
            <Image
              src={image}
              alt={imageAlt}
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

        <ScrollReveal direction="right" delay={100}>
          <div>
            <h2
              id="about-us-hero-heading"
              className="font-display text-[clamp(2rem,4vw,2.75rem)] font-semibold leading-[1.1] text-brand-navy"
            >
              {titleLine1}
              <br />
              {titleLine2}
            </h2>
            <p className="mt-4 font-body text-sm font-medium text-brand-blue">
              {aboutUsCredential}
            </p>
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
