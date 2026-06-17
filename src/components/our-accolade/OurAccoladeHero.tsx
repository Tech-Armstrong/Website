import Image from "next/image";
import {
  ourAccoladeHero,
  ourAccoladeHeroEyebrow,
} from "@/data/our-accolade";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

function WavyAccent() {
  return (
    <svg
      viewBox="0 0 48 16"
      className="h-4 w-12 shrink-0 overflow-visible text-brand-blue"
      fill="none"
      aria-hidden
    >
      <path
        d="M0 8 C8 2, 16 2, 24 8 S40 14, 48 8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function OurAccoladeHero() {
  const { title, paragraph, images } = ourAccoladeHero;

  return (
    <section
      className="site-container pb-12 pt-12 lg:pb-16 lg:pt-16"
      aria-labelledby="our-accolade-hero-heading"
    >
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12 xl:gap-14">
        <ScrollReveal
          direction="left"
          className="group relative mx-auto aspect-[4/5] w-full max-w-md lg:max-w-none"
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
                alt="Armstrong Capital accolades"
                fill
                sizes="(max-width: 1024px) 280px, 360px"
                className="object-cover"
                priority
              />
            </div>
            <div className="absolute bottom-0 right-0 z-20 aspect-[4/5] w-[58%] overflow-hidden rounded-2xl border-4 border-white shadow-[var(--elevation-panel)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none group-hover:translate-x-1 group-hover:-translate-y-1">
              <Image
                src={images.secondary}
                alt="Award recognition at Armstrong Capital"
                fill
                sizes="(max-width: 1024px) 200px, 260px"
                className="object-cover"
              />
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal direction="right" delay={100}>
          <div className="rounded-2xl border border-brand-blue/10 bg-gradient-to-br from-brand-blue/[0.05] via-white to-white p-6 shadow-[var(--elevation-card)] lg:p-8">
            <SectionTitle
              eyebrow={ourAccoladeHeroEyebrow}
              title={title}
              headingId="our-accolade-hero-heading"
              className="mb-5 lg:mb-6"
              titleClassName="text-[24px] leading-[32px] sm:text-[26px] sm:leading-[34px] md:text-[30px] md:leading-[38px]"
            />
            <WavyAccent />
            <p className="mt-4 font-body text-[15px] leading-relaxed text-brand-navy/85 md:text-base md:leading-[28px]">
              {paragraph}
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
