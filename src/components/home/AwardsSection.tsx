"use client";

import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import { awardsSection } from "@/data/home";
import { ourAccoladeAwardsSection } from "@/data/our-accolade";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const CARDS_PER_SLIDE = 6;
const awards = ourAccoladeAwardsSection.items.slice(0, 12);

type AwardItem = (typeof awards)[number];

function chunk<T>(items: readonly T[], size: number): T[][] {
  const slides: T[][] = [];
  for (let i = 0; i < items.length; i += size) {
    slides.push(items.slice(i, i + size));
  }
  return slides;
}

const awardSlides = chunk(awards, CARDS_PER_SLIDE);

function AwardCard({ item }: { item: AwardItem }) {
  return (
    <article className="lift-card group flex h-full w-full flex-col overflow-hidden rounded-2xl border border-brand-blue/10 bg-gradient-to-b from-white to-brand-blue/[0.04] shadow-[var(--elevation-card)] transition-[border-color,box-shadow] duration-300 hover:border-brand-blue/25 hover:shadow-[var(--elevation-panel)]">
      <div className="flex min-h-[3.5rem] items-center justify-center bg-brand-navy px-4 py-3">
        <h3 className="line-clamp-2 text-center font-display text-[11px] font-semibold uppercase tracking-wide text-white sm:text-xs">
          {item.title}
        </h3>
      </div>
      <div className="flex h-[150px] items-center justify-center bg-brand-surface/80 p-4 sm:h-[170px] lg:h-[180px]">
        <div className="relative aspect-square w-[120px] lg:w-[140px]">
          <Image
            src={item.image}
            alt={item.title}
            fill
            sizes="(max-width: 1024px) 120px, 140px"
            className="object-contain transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none group-hover:scale-105"
          />
        </div>
      </div>
    </article>
  );
}

function AwardsStaticGrid({ items }: { items: readonly AwardItem[] }) {
  return (
    <ul className="grid grid-cols-2 items-stretch gap-4 sm:gap-5 md:grid-cols-3 lg:gap-6">
      {items.map((item, index) => (
        <li key={item.title} className="h-full">
          <ScrollReveal delay={Math.min(index * 40, 200)}>
            <AwardCard item={item} />
          </ScrollReveal>
        </li>
      ))}
    </ul>
  );
}

function CarouselNavButton({
  direction,
  onClick,
}: {
  direction: "prev" | "next";
  onClick: () => void;
}) {
  const label =
    direction === "prev" ? "Previous award slide" : "Next award slide";

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="focus-settle hidden h-10 w-10 shrink-0 items-center justify-center rounded-full border border-brand-blue/20 bg-white text-brand-navy shadow-[var(--elevation-card)] transition-colors hover:border-brand-blue/40 hover:bg-brand-blue/[0.04] lg:flex"
    >
      <svg
        viewBox="0 0 24 24"
        className="h-4 w-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        aria-hidden
      >
        {direction === "prev" ? (
          <path d="M15 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
        ) : (
          <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
        )}
      </svg>
    </button>
  );
}

export function AwardsSection() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
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

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotion = () => setPrefersReducedMotion(mq.matches);
    updateMotion();
    mq.addEventListener("change", updateMotion);
    return () => mq.removeEventListener("change", updateMotion);
  }, []);

  useEffect(() => {
    if (!emblaApi || prefersReducedMotion) return;

    const update = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
      setScrollSnaps(emblaApi.scrollSnapList());
    };

    emblaApi.on("select", update);
    emblaApi.on("reInit", update);
    update();

    const interval = setInterval(() => emblaApi.scrollNext(), 5000);
    return () => {
      emblaApi.off("select", update);
      emblaApi.off("reInit", update);
      clearInterval(interval);
    };
  }, [emblaApi, prefersReducedMotion]);

  return (
    <section
      className="home-section relative overflow-hidden border-t border-[color:var(--brand-border)] bg-brand-surface/50"
      aria-labelledby="awards-heading"
    >
      <div
        className="pointer-events-none absolute -right-24 top-8 h-64 w-64 rounded-full border border-brand-blue/10"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-16 bottom-12 h-48 w-48 rounded-full border border-brand-blue/[0.06]"
        aria-hidden
      />

      <div className="site-container relative">
        <ScrollReveal className="mb-10 text-center lg:mb-12">
          <p className="mb-2 font-display text-[11px] font-bold uppercase tracking-[0.12em] text-brand-blue sm:text-xs">
            {awardsSection.eyebrow}
          </p>
          <h2
            id="awards-heading"
            className="font-display text-[clamp(1.75rem,3vw,2.25rem)] font-semibold leading-[1.15] text-brand-navy"
          >
            {awardsSection.title}
          </h2>
          <p className="mx-auto mt-2 max-w-xl font-body text-base leading-relaxed text-brand-muted">
            {awardsSection.subtitle}
          </p>
        </ScrollReveal>

        {prefersReducedMotion ? (
          <AwardsStaticGrid items={awards} />
        ) : (
          <ScrollReveal delay={100} className="min-w-0 w-full">
            <div className="flex items-center gap-3 lg:gap-4">
              <CarouselNavButton direction="prev" onClick={scrollPrev} />

              <div className="relative min-w-0 flex-1">
                <div
                  ref={emblaRef}
                  className="min-w-0 overflow-hidden py-1"
                  aria-roledescription="carousel"
                  aria-label="Awards and partners"
                >
                  <div className="flex items-stretch">
                    {awardSlides.map((slideItems, slideIndex) => (
                      <div
                        key={slideIndex}
                        className="min-w-0 flex-[0_0_100%]"
                      >
                        <ul className="grid grid-cols-2 grid-rows-3 items-stretch gap-4 md:grid-cols-3 md:grid-rows-2 md:gap-5 lg:gap-6">
                          {slideItems.map((item) => (
                            <li key={item.title} className="h-full min-h-0">
                              <AwardCard item={item} />
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <CarouselNavButton direction="next" onClick={scrollNext} />
            </div>

            <div
              className="mt-8 flex justify-center gap-2.5"
              role="tablist"
              aria-label="Awards carousel pagination"
            >
              {scrollSnaps.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  role="tab"
                  aria-selected={selectedIndex === index}
                  aria-label={`Go to award slide ${index + 1}`}
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
        )}
      </div>
    </section>
  );
}
