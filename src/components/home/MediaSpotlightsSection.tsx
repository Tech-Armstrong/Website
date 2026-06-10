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
      className="home-section border-t border-[#eef0f2] bg-white"
      aria-labelledby="media-spotlights-heading"
    >
      <div className="site-container">
        <ScrollReveal className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 font-display text-[11px] font-bold uppercase tracking-wide text-brand-blue sm:text-xs">
              In the news
            </p>
            <h2
              id="media-spotlights-heading"
              className="font-display text-[28px] font-semibold text-balance leading-tight tracking-tight text-brand-navy sm:text-[32px] md:text-[36px]"
            >
              Media Spotlights
            </h2>
          </div>
          <Link
            href="/media-spotlight"
            className="theme-btn btn-two shrink-0 self-start !px-8 !py-3 text-base sm:self-auto"
          >
            View More
          </Link>
        </ScrollReveal>

        <ScrollReveal delay={120} className="min-w-0 w-full">
        <div ref={emblaRef} className="min-w-0 overflow-hidden py-1" aria-roledescription="carousel">
          <div className="flex gap-4 md:gap-5">
            {mediaSpotlights.map((item) => (
              <article
                key={item.href}
                className="media-card min-w-0 flex-[0_0_100%] sm:flex-[0_0_calc(50%-8px)] lg:flex-[0_0_calc(33.333%-14px)]"
              >
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="lift-card flex h-full flex-col overflow-hidden border bg-white focus-settle"
                >
                  <div className="flex min-h-[180px] items-center justify-center bg-brand-surface/60 px-6 py-8 sm:min-h-[200px] sm:py-10">
                    <Image
                      src={item.logo}
                      alt={`${item.title} — publication logo`}
                      width={220}
                      height={80}
                      className="h-auto max-h-[72px] w-auto max-w-[200px] object-contain"
                    />
                  </div>
                  <div className="border-t border-[#eef0f2] px-5 py-5">
                    <h3 className="line-clamp-3 font-body text-[15px] font-medium leading-snug text-brand-navy">
                      {item.title}
                    </h3>
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
                activePage === index ? "bg-brand-blue" : "bg-[#d4d8de] hover:bg-brand-muted/60"
              }`}
            />
          ))}
        </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
