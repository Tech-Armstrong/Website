"use client";

import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import { aboutUsFeatures, aboutUsWhyChoose } from "@/data/about-us";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

function WavyAccent() {
  return (
    <svg
      viewBox="0 0 48 12"
      className="h-3 w-12 text-brand-blue"
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

export function AboutUsFeatures() {
  const { title, description } = aboutUsWhyChoose;
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: true,
    slidesToScroll: 1,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollTo = useCallback(
    (index: number) => emblaApi?.scrollTo(index),
    [emblaApi],
  );

  useEffect(() => {
    if (!emblaApi) return;

    const update = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
      setScrollSnaps(emblaApi.scrollSnapList());
    };

    emblaApi.on("select", update);
    emblaApi.on("reInit", update);
    update();

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) {
      return () => {
        emblaApi.off("select", update);
        emblaApi.off("reInit", update);
      };
    }

    const interval = setInterval(() => emblaApi.scrollNext(), 2500);
    return () => {
      emblaApi.off("select", update);
      emblaApi.off("reInit", update);
      clearInterval(interval);
    };
  }, [emblaApi]);

  return (
    <section
      className="site-container border-t border-[#eef0f2] py-12 lg:py-16"
      aria-labelledby="about-us-features-heading"
    >
      <ScrollReveal>
        <div className="mx-auto mb-6 max-w-3xl text-center">
          <h2
            id="about-us-features-heading"
            className="font-display text-[28px] font-semibold leading-tight text-brand-navy sm:text-[32px] md:text-[36px]"
          >
            {title}
          </h2>
        </div>
      </ScrollReveal>
      <ScrollReveal delay={80}>
        <p className="mx-auto mb-10 max-w-3xl text-center font-body text-base leading-relaxed text-brand-muted md:mb-12 md:text-[17px] md:leading-[30px]">
          {description}
        </p>
      </ScrollReveal>

      <ScrollReveal delay={120} className="min-w-0 w-full">
        <div
          ref={emblaRef}
          className="min-w-0 overflow-hidden py-1"
          aria-roledescription="carousel"
        >
          <div className="-ml-4 flex items-stretch md:-ml-5">
            {aboutUsFeatures.map((feature) => (
              <article
                key={feature.number}
                className="flex min-w-0 flex-[0_0_100%] pl-4 sm:flex-[0_0_50%] md:pl-5 lg:flex-[0_0_25%]"
              >
                <div className="relative flex h-full w-full min-h-[260px] flex-col rounded-2xl border border-[#e8eaed] bg-white p-6 pt-8 shadow-sm sm:min-h-[280px]">
                  <WavyAccent />
                  <span className="absolute right-4 top-4 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-navy font-display text-sm font-bold text-white">
                    {feature.number}
                  </span>
                  <h3 className="mt-4 min-h-[4.5rem] pr-12 font-display text-xl font-semibold leading-snug text-brand-navy">
                    {feature.titleMain}{" "}
                    <span className="font-normal">{feature.titleAccent}</span>
                  </h3>
                  <p className="mt-auto pt-3 font-body text-[15px] leading-relaxed text-brand-muted">
                    {feature.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div
          className="mt-8 flex justify-center gap-2.5 lg:hidden"
          role="tablist"
          aria-label="Why choose us carousel"
        >
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              type="button"
              role="tab"
              aria-selected={selectedIndex === index}
              aria-label={`Go to slide ${index + 1}`}
              onClick={() => scrollTo(index)}
              className={`focus-settle h-2.5 w-2.5 rounded-full transition-colors ${
                selectedIndex === index
                  ? "bg-brand-blue shadow-[var(--elevation-card)]"
                  : "bg-brand-muted/30 hover:bg-brand-muted/60"
              }`}
            />
          ))}
        </div>
      </ScrollReveal>
    </section>
  );
}
