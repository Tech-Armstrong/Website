"use client";

import Image from "next/image";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import { mediaSpotlights } from "@/data/home";

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
      className="bg-white px-4 py-20 lg:py-24"
      aria-labelledby="media-spotlights-heading"
    >
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h2
            id="media-spotlights-heading"
            className="font-display text-[32px] font-semibold text-brand-navy md:text-[36px]"
          >
            Media Spotlights
          </h2>
          <Link
            href="/media-spotlight"
            className="theme-btn btn-two shrink-0 self-start !px-8 !py-3 text-base sm:self-center"
          >
            View More
          </Link>
        </div>

        <div ref={emblaRef} className="overflow-hidden" aria-roledescription="carousel">
          <div className="flex gap-5">
            {mediaSpotlights.map((item) => (
              <article
                key={item.href}
                className="media-card min-w-0 flex-[0_0_100%] sm:flex-[0_0_calc(50%-10px)] lg:flex-[0_0_calc(33.333%-14px)]"
              >
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-full flex-col overflow-hidden rounded-2xl border border-[#e5e5e5] bg-white transition-colors hover:border-brand-blue"
                >
                  <div className="flex min-h-[200px] items-center justify-center px-6 py-10">
                    <Image
                      src={item.logo}
                      alt=""
                      width={220}
                      height={80}
                      className="h-auto max-h-[72px] w-auto max-w-[200px] object-contain"
                    />
                  </div>
                  <div className="border-t border-[#eee] px-5 py-5">
                    <h3 className="line-clamp-3 font-body text-[15px] font-medium leading-snug text-brand-navy">
                      {item.title}
                    </h3>
                  </div>
                </a>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-8 flex justify-center gap-2" role="tablist" aria-label="Carousel pages">
          {Array.from({ length: pageCount }).map((_, index) => (
            <button
              key={index}
              type="button"
              role="tab"
              aria-selected={activePage === index}
              aria-label={`Go to slide group ${index + 1}`}
              onClick={() => scrollTo(Math.min(index * 3, scrollSnaps.length - 1))}
              className={`h-2.5 w-2.5 rounded-full transition-colors ${
                activePage === index ? "bg-brand-blue" : "bg-[#d4d8de]"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
