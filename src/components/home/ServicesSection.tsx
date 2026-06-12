"use client";

import Image from "next/image";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import { services } from "@/data/home";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function ServicesSection() {
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

    const interval = setInterval(() => emblaApi.scrollNext(), 4000);
    return () => {
      emblaApi.off("select", update);
      emblaApi.off("reInit", update);
      clearInterval(interval);
    };
  }, [emblaApi]);

  return (
    <section
      className="home-section !pt-8 sm:!pt-9 lg:!pt-10"
      aria-labelledby="services-heading"
    >
      <div className="site-container">
        <ScrollReveal>
          <div className="mx-auto mb-8 max-w-4xl text-center">
            <h2
              id="services-heading"
              className="font-display text-[28px] font-semibold leading-tight tracking-tight text-brand-navy sm:text-[34px] md:text-[40px] lg:text-[44px]"
            >
              Strategizing Wealth, Maximizing Opportunities
            </h2>
            <p className="mx-auto mt-3 max-w-2xl font-body text-base leading-relaxed text-brand-muted md:text-[17px] md:leading-[28px]">
              Tailored solutions across planning, investing, and protection.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={150} className="relative min-w-0 w-full">
          <div className="relative min-w-0">
            <div
              ref={emblaRef}
              className="min-w-0 overflow-hidden py-1 [mask-image:linear-gradient(to_right,transparent_0,black_0.75rem,black_calc(100%-0.75rem),transparent_100%)] [-webkit-mask-image:linear-gradient(to_right,transparent_0,black_0.75rem,black_calc(100%-0.75rem),transparent_100%)]"
              aria-roledescription="carousel"
            >
              <div className="-ml-4 flex items-stretch md:-ml-5">
                {services.map((service) => (
                  <article
                    key={service.title}
                    className="h-full min-w-0 flex-[0_0_100%] pl-4 sm:flex-[0_0_50%] md:pl-5 lg:flex-[0_0_25%]"
                  >
                    <Link
                      href={service.href}
                      className="lift-card group flex h-full flex-col overflow-hidden rounded-2xl border border-brand-blue/10 bg-white focus-settle"
                    >
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <Image
                          src={service.image}
                          alt={service.title}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                          className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                        />
                        <div
                          className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-brand-navy/40 to-transparent"
                          aria-hidden
                        />
                      </div>
                      <div className="flex flex-1 flex-col p-5 sm:p-6">
                        <h3 className="line-clamp-2 min-h-[3.25rem] font-display text-lg font-semibold leading-snug text-brand-navy sm:min-h-[3.5rem] sm:text-xl">
                          {service.title}
                        </h3>
                        <p className="mt-2 line-clamp-2 min-h-[2.75rem] font-body text-sm leading-relaxed text-brand-muted">
                          {service.tagline}
                        </p>
                        <span className="mt-auto inline-flex items-center gap-1 pt-4 font-display text-sm font-semibold text-brand-blue transition-[gap] duration-300 group-hover:gap-2">
                          Learn more
                          <svg
                            viewBox="0 0 24 24"
                            className="h-4 w-4"
                            fill="currentColor"
                            aria-hidden
                          >
                            <path d="M9 6l6 6-6 6" />
                          </svg>
                        </span>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            </div>
          </div>

          <div
            className="mt-8 flex justify-center gap-2.5"
            role="tablist"
            aria-label="Services carousel"
          >
            {scrollSnaps.map((_, index) => (
              <button
                key={index}
                type="button"
                role="tab"
                aria-selected={selectedIndex === index}
                aria-label={`Go to service slide ${index + 1}`}
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
      </div>
    </section>
  );
}
