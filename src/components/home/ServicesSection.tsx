"use client";

import Image from "next/image";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import { services } from "@/data/home";
import { SectionTitle } from "@/components/ui/SectionTitle";

export function ServicesSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: true,
    slidesToScroll: 1,
  });
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    const update = () => {
      setCanScrollPrev(emblaApi.canScrollPrev());
      setCanScrollNext(emblaApi.canScrollNext());
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
  }, [emblaApi]);

  return (
    <section className="bg-brand-surface px-4 py-20 lg:px-4">
      <div className="mx-auto max-w-[1200px]">
        <SectionTitle
          align="center"
          eyebrow="Our Services"
          title={
            <>
              <strong>Strategizing Wealth</strong>
              <br />
              Maximizing Opportunities!
            </>
          }
          className="mb-10 [&_.te-subtitle]:before:bg-[#F4F1FA]"
        />

        <div className="relative">
          <div ref={emblaRef} className="overflow-hidden">
            <div className="flex gap-5">
              {services.map((service) => (
                <div
                  key={service.title}
                  className="min-w-0 flex-[0_0_100%] sm:flex-[0_0_calc(50%-10px)] lg:flex-[0_0_calc(25%-15px)]"
                >
                  <div className="service-card flex flex-col gap-10 border border-[#c6c6c6] bg-white px-[30px] pb-[30px] pt-10">
                    <h3 className="mx-auto w-[60%] text-center font-display text-2xl font-semibold text-black">
                      {service.title}
                    </h3>
                    <Link href={service.href} className="block overflow-hidden">
                      <Image
                        src={service.image}
                        alt={service.title}
                        width={370}
                        height={370}
                        className="h-auto w-full object-cover"
                      />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={scrollPrev}
            disabled={!canScrollPrev}
            className="absolute left-0 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[#c6c6c6] bg-white text-brand-navy shadow-sm hover:border-brand-blue hover:text-brand-blue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue disabled:opacity-40"
            aria-label="Previous services"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            type="button"
            onClick={scrollNext}
            disabled={!canScrollNext}
            className="absolute right-0 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[#c6c6c6] bg-white text-brand-navy shadow-sm hover:border-brand-blue hover:text-brand-blue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue disabled:opacity-40"
            aria-label="Next services"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
              <path d="M9 6l6 6-6 6" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
