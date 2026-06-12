"use client";

import Image from "next/image";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import { mediaSpotlights } from "@/data/home";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function MediaSpotlightsSection() {
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

    const interval = setInterval(() => emblaApi.scrollNext(), 5000);
    return () => {
      emblaApi.off("select", update);
      emblaApi.off("reInit", update);
      clearInterval(interval);
    };
  }, [emblaApi]);

  const pageCount = Math.ceil(mediaSpotlights.length / 3);
  const activePage = Math.min(Math.floor(selectedIndex / 3), pageCount - 1);

  return (
    <section
      className="home-section border-t border-[#eef0f2] !pt-4 sm:!pt-5 lg:!pt-6"
      aria-labelledby="media-spotlights-heading"
    >
      <div className="site-container">
        <ScrollReveal className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 font-display text-[11px] font-bold uppercase tracking-[0.12em] text-brand-blue sm:text-xs">
              In the news
            </p>
            <h2
              id="media-spotlights-heading"
              className="font-display text-[28px] font-semibold text-balance leading-tight tracking-tight text-brand-navy sm:text-[32px] md:text-[36px]"
            >
              Media Spotlights
            </h2>
            <p className="mt-2 max-w-xl font-body text-base leading-relaxed text-brand-muted md:mt-3 md:text-[17px] md:leading-[28px]">
              Featured coverage from leading business and financial publications.
            </p>
          </div>
          <Link
            href="/media-spotlight"
            className="theme-btn btn-two shrink-0 self-start !px-8 !py-3 text-base sm:self-auto"
          >
            View More
          </Link>
        </ScrollReveal>

        <ScrollReveal delay={120} className="relative min-w-0 w-full">
        <div
          ref={emblaRef}
          className="min-w-0 overflow-hidden py-1 [mask-image:linear-gradient(to_right,transparent_0,black_0.75rem,black_calc(100%-0.75rem),transparent_100%)] [-webkit-mask-image:linear-gradient(to_right,transparent_0,black_0.75rem,black_calc(100%-0.75rem),transparent_100%)]"
          aria-roledescription="carousel"
        >
          <div className="-ml-4 flex items-stretch md:-ml-5">
            {mediaSpotlights.map((item) => (
              <article
                key={item.href}
                className="media-card h-full min-w-0 flex-[0_0_100%] pl-4 sm:flex-[0_0_50%] md:pl-5 lg:flex-[0_0_33.333%]"
              >
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="lift-card group flex h-full flex-col overflow-hidden rounded-2xl border border-brand-blue/10 bg-white shadow-[var(--elevation-card)] transition-[border-color,box-shadow] duration-300 focus-settle hover:border-brand-blue/25 hover:shadow-[var(--elevation-panel)]"
                >
                  <div className="relative flex min-h-[180px] items-center justify-center overflow-hidden bg-gradient-to-br from-brand-blue/[0.07] via-white to-brand-surface/60 px-6 py-8 sm:min-h-[200px] sm:py-10">
                    <div
                      className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-brand-blue/[0.08]"
                      aria-hidden
                    />
                    <div
                      className="pointer-events-none absolute -bottom-8 -left-8 h-24 w-24 rounded-full bg-brand-navy/[0.04]"
                      aria-hidden
                    />
                    <Image
                      src={item.logo}
                      alt={`${item.title} — publication logo`}
                      width={220}
                      height={80}
                      className="relative z-[1] h-auto max-h-[72px] w-auto max-w-[200px] object-contain transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-1 flex-col border-t border-brand-blue/[0.08] px-5 py-5 sm:px-6 sm:py-6">
                    <h3 className="line-clamp-3 flex-1 font-display text-base font-semibold leading-snug text-brand-navy sm:text-[17px]">
                      {item.title}
                    </h3>
                    <span className="mt-4 inline-flex items-center gap-1 font-display text-sm font-semibold text-brand-blue transition-[gap] duration-300 group-hover:gap-2">
                      Read article
                      <svg
                        viewBox="0 0 24 24"
                        className="h-4 w-4"
                        fill="currentColor"
                        aria-hidden
                      >
                        <path d="M14 3h7v7h-2V6.41l-9.29 9.3-1.42-1.42 9.3-9.29H14V3z" />
                        <path d="M5 5h6V3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-6h-2v6H5V5z" />
                      </svg>
                    </span>
                  </div>
                </a>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-8 flex justify-center gap-2.5" role="tablist" aria-label="Carousel pages">
          {Array.from({ length: pageCount }).map((_, index) => (
            <button
              key={index}
              type="button"
              role="tab"
              aria-selected={activePage === index}
              aria-label={`Go to slide group ${index + 1}`}
              onClick={() => scrollTo(Math.min(index * 3, scrollSnaps.length - 1))}
              className={`focus-settle h-2.5 w-2.5 rounded-full transition-colors ${
                activePage === index
                  ? "bg-brand-blue shadow-[var(--elevation-card)]"
                  : "bg-[#d4d8de] hover:bg-brand-muted/60"
              }`}
            />
          ))}
        </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
