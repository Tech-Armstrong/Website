import Link from "next/link";
import { aboutSection } from "@/data/home";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { ExperienceCircle } from "./ExperienceCircle";

export function AboutSection() {
  const { heading, title, paragraphs, ctaLabel, ctaHref } = aboutSection;

  return (
    <section
      className="home-section border-t border-[#eef0f2]"
      aria-labelledby="about-heading"
    >
      <div className="site-container grid items-center gap-10 lg:grid-cols-2 lg:gap-12 xl:gap-14">
        <ScrollReveal direction="left" mobileDirection="up" className="order-2 lg:order-1">
          <ExperienceCircle />
        </ScrollReveal>

        <ScrollReveal direction="right" mobileDirection="up" delay={120} className="order-1 lg:order-2 lg:py-4">
          <div className="mb-6 lg:mb-8">
            <h2
              id="about-heading"
              className="font-display text-[26px] font-semibold leading-[34px] text-brand-navy sm:text-[30px] sm:leading-[38px] md:text-[32px] md:leading-[40px]"
            >
              {heading}
            </h2>
            <p className="mt-3 max-w-prose font-display text-xl font-medium leading-snug text-brand-navy/90 md:mt-4 md:text-[22px] md:leading-[32px]">
              {title}
            </p>
          </div>

          <div className="mb-6 max-w-prose space-y-5 font-body text-[17px] leading-relaxed text-brand-muted md:text-lg md:leading-[30px] lg:mb-8">
            {paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <Link href={ctaHref} className="theme-btn btn-two inline-block">
            {ctaLabel}
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
