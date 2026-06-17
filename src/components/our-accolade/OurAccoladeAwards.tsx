"use client";

import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import {
  ourAccoladeAwardsEyebrow,
  ourAccoladeAwardsSection,
} from "@/data/our-accolade";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

type AwardItem = (typeof ourAccoladeAwardsSection.items)[number];

function TrophyIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-14 w-14 text-brand-muted/35 sm:h-16 sm:w-16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden
    >
      <path
        d="M6 9H4.5a1.5 1.5 0 0 1 0-3H6m12 3h1.5a1.5 1.5 0 0 0 0-3H18M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0V4z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function AwardCard({ item }: { item: AwardItem }) {
  const hasImage = "image" in item && item.image;

  return (
    <article className="lift-card group flex h-full w-full flex-col overflow-hidden rounded-2xl border border-brand-blue/10 bg-gradient-to-b from-white to-brand-blue/[0.04] shadow-[var(--elevation-card)] transition-[border-color,box-shadow] duration-300 hover:border-brand-blue/25 hover:shadow-[var(--elevation-panel)]">
      <div className="flex min-h-[3.5rem] items-center justify-center bg-brand-navy px-4 py-3">
        <h3 className="line-clamp-2 text-center font-display text-[11px] font-semibold uppercase tracking-wide text-white sm:text-xs">
          {item.title}
        </h3>
      </div>
      <div className="flex h-[170px] items-center justify-center bg-brand-surface/80 p-4 sm:h-[180px]">
        <div className="relative aspect-square w-[120px] sm:w-[130px]">
          {hasImage ? (
            <Image
              src={item.image}
              alt={item.title}
              fill
              sizes="130px"
              className="object-contain transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <TrophyIcon />
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

function AwardsGrid({ items }: { items: readonly AwardItem[] }) {
  return (
    <ul className="grid grid-cols-2 items-stretch gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
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

export function OurAccoladeAwards() {
  const { title, items } = ourAccoladeAwardsSection;
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

    const interval = setInterval(() => emblaApi.scrollNext(), 4000);
    return () => {
      emblaApi.off("select", update);
      emblaApi.off("reInit", update);
      clearInterval(interval);
    };
  }, [emblaApi, prefersReducedMotion]);

  return (
    <section
      className="relative overflow-hidden border-t border-[#eef0f2] bg-brand-surface/50 py-12 lg:py-16"
      aria-labelledby="our-accolade-awards-heading"
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
        <ScrollReveal>
          <SectionTitle
            eyebrow={ourAccoladeAwardsEyebrow}
            title={title}
            align="center"
            headingId="our-accolade-awards-heading"
            className="mx-auto mb-8 max-w-2xl lg:mb-10"
            titleClassName="text-[26px] leading-[34px] sm:text-[28px] sm:leading-[36px] md:text-[32px] md:leading-[40px]"
          />
        </ScrollReveal>

        {prefersReducedMotion ? (
          <AwardsGrid items={items} />
        ) : (
          <ScrollReveal delay={120} className="min-w-0 w-full">
            <div className="flex items-center gap-3 lg:gap-4">
              <CarouselNavButton direction="prev" onClick={scrollPrev} />

              <div className="relative min-w-0 flex-1">
                <div
                  ref={emblaRef}
                  className="min-w-0 overflow-hidden py-1 [mask-image:linear-gradient(to_right,transparent_0,black_0.75rem,black_calc(100%-0.75rem),transparent_100%)] [-webkit-mask-image:linear-gradient(to_right,transparent_0,black_0.75rem,black_calc(100%-0.75rem),transparent_100%)]"
                  aria-roledescription="carousel"
                  aria-label="Awards and accreditations"
                >
                  <div className="-ml-4 flex items-stretch md:-ml-5">
                    {items.map((item) => (
                      <div
                        key={item.title}
                        className="flex h-full w-full min-w-0 flex-[0_0_100%] pl-4 sm:flex-[0_0_50%] md:pl-5 lg:flex-[0_0_25%]"
                      >
                        <AwardCard item={item} />
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
