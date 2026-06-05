import Link from "next/link";
import { aboutSection } from "@/data/home";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { ExperienceCircle } from "./ExperienceCircle";

export function AboutSection() {
  const { eyebrow, title, description, ctaLabel, ctaHref } = aboutSection;

  return (
    <section
      className="home-section border-t border-[#eef0f2] bg-white"
      aria-labelledby="about-heading"
    >
      <div className="site-container grid items-center gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20">
        <ScrollReveal direction="left" className="order-2 lg:order-1">
          <ExperienceCircle />
        </ScrollReveal>

        <ScrollReveal direction="right" delay={120} className="order-1 lg:order-2 lg:py-4">
          <SectionTitle
            eyebrow={eyebrow}
            title={title}
            headingId="about-heading"
            className="mb-6 lg:mb-8"
          />

          <p className="mb-8 max-w-prose font-body text-base leading-relaxed text-brand-muted md:text-[17px] md:leading-[28px] lg:mb-10">
            {description}
          </p>

          <Link href={ctaHref} className="theme-btn btn-two inline-block">
            {ctaLabel}
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
