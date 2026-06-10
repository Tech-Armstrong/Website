"use client";

import Image from "next/image";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import { services } from "@/data/home";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

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

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) {
      return () => {
        emblaApi.off("select", update);
        emblaApi.off("reInit", update);
      };
    }

    const interval = setInterval(() => emblaApi.scrollNext(), 4000);
    return () => {
      emblaApi.off("select", update);
      emblaApi.off("reInit", update);
      clearInterval(interval);
    };
  }, [emblaApi]);

  return (
    <section
      className="home-section bg-brand-surface"
      aria-labelledby="services-heading"
    >
      <div className="site-container">
        <ScrollReveal>
          <SectionTitle
            align="center"
            eyebrow="Our Services"
            headingId="services-heading"
            title={
              <>
                <strong className="font-semibold text-brand-navy">
                  Strategizing Wealth
                </strong>
                <br />
                Maximizing Opportunities
              </>
            }
            className="mx-auto mb-12 max-w-2xl"
          />
        </ScrollReveal>

        <ScrollReveal delay={150} className="relative min-w-0 w-full px-12 sm:px-14">
          <div ref={emblaRef} className="min-w-0 overflow-hidden">
            <div className="flex gap-4 md:gap-5">
              {services.map((service) => (
                <div
                  key={service.title}
                  className="min-w-0 flex-[0_0_100%] sm:flex-[0_0_calc(50%-8px)] lg:flex-[0_0_calc(25%-15px)]"
                >
                  <div className="service-card flex h-full flex-col gap-5 border bg-white px-6 pb-6 pt-7 sm:gap-6 sm:px-7 sm:pb-7 sm:pt-8">
                    <h3 className="text-center font-display text-lg font-semibold text-brand-navy sm:text-xl">
                      {service.title}
                    </h3>
                    <Link
                      href={service.href}
                      className="group block overflow-hidden rounded-xl focus-settle"
                    >
                      <div className="relative aspect-square w-full overflow-hidden rounded-xl">
                        <Image
                          src={service.image}
                          alt={service.title}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                          className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                        />
                      </div>
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
            className="focus-settle absolute left-0 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#e8eaed] bg-white text-brand-navy shadow-md transition-colors hover:border-brand-blue hover:text-brand-blue disabled:pointer-events-none disabled:opacity-35 sm:h-11 sm:w-11"
            aria-label="Previous services"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            type="button"
            onClick={scrollNext}
            disabled={!canScrollNext}
            className="focus-settle absolute right-0 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#e8eaed] bg-white text-brand-navy shadow-md transition-colors hover:border-brand-blue hover:text-brand-blue disabled:pointer-events-none disabled:opacity-35 sm:h-11 sm:w-11"
            aria-label="Next services"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
              <path d="M9 6l6 6-6 6" />
            </svg>
          </button>
        </ScrollReveal>
      </div>
    </section>
  );
}
