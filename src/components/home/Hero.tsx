"use client";

import Image from "next/image";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import { heroSlides } from "@/data/home";

function ChatIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-7 w-7"
      aria-hidden="true"
    >
      <path
        d="M12 3C7.03 3 3 6.58 3 11c0 2.02.9 3.86 2.41 5.29L4 21l5.2-1.46C10.45 19.82 11.2 20 12 20c4.97 0 9-3.58 9-8s-4.03-8-9-8Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}

export function Hero() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const handler = () => setReduceMotion(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();

    if (reduceMotion) return;

    const interval = setInterval(() => emblaApi.scrollNext(), 5000);
    return () => {
      emblaApi.off("select", onSelect);
      clearInterval(interval);
    };
  }, [emblaApi, reduceMotion]);

  return (
    <section
      className="banner-section relative w-full overflow-hidden"
      aria-roledescription="carousel"
      aria-label="Featured highlights"
    >
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex">
          {heroSlides.map((slide, index) => (
            <div
              key={slide.id}
              className="relative min-w-0 flex-[0_0_100%]"
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${heroSlides.length}`}
              aria-hidden={selectedIndex !== index}
            >
              <div className="slide-item relative px-4 py-[95px] md:px-6 lg:py-[159px] lg:pb-[170px]">
                <Image
                  src={slide.image}
                  alt=""
                  fill
                  priority={index === 0}
                  sizes="100vw"
                  className="object-cover"
                  aria-hidden
                />
                <div className="absolute inset-0 bg-brand-navy/50" />

                <div className="auto-container relative z-[5] mx-auto w-full max-w-[1200px]">
                  <div className="content-box max-w-[550px]">
                    <h2 className="font-display text-[50px] font-semibold leading-[60px] text-white lg:text-[100px] lg:leading-[100px]">
                      {slide.title}{" "}
                      <span className="hero-outline block lg:inline">
                        {slide.titleOutline}
                      </span>{" "}
                      {slide.titleSuffix}
                    </h2>

                    <div className="lower-box relative mt-0 pl-0 pt-6 md:pl-[115px]">
                      <div
                        className="icon-box absolute left-0 top-2 hidden h-[75px] w-[75px] items-center justify-center rounded-full rounded-br-none bg-brand-green text-white md:flex"
                        aria-hidden
                      >
                        <ChatIcon />
                      </div>
                      <div
                        className="icon-box mb-5 flex h-[75px] w-[75px] items-center justify-center rounded-full rounded-br-none bg-brand-green text-white md:hidden"
                        aria-hidden
                      >
                        <ChatIcon />
                      </div>
                      <p className="mb-[31px] max-w-[360px] whitespace-pre-line text-[19px] leading-[30px] text-[#bdc3cb]">
                        {slide.description}
                      </p>
                      <Link
                        href={slide.ctaHref}
                        className="theme-btn btn-two counsolve-btn inline-block"
                      >
                        {slide.ctaLabel}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="pointer-events-none absolute inset-y-0 left-0 right-0 z-10 mx-auto flex max-w-[1200px] items-center justify-between px-4">
        <button
          type="button"
          onClick={scrollPrev}
          className="pointer-events-auto flex h-11 w-11 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur hover:text-brand-pink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          aria-label="Previous slide"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <button
          type="button"
          onClick={scrollNext}
          className="pointer-events-auto flex h-11 w-11 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur hover:text-brand-pink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          aria-label="Next slide"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
            <path d="M9 6l6 6-6 6" />
          </svg>
        </button>
      </div>

      <div
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 gap-2"
        role="tablist"
        aria-label="Slide navigation"
      >
        {heroSlides.map((_, index) => (
          <button
            key={index}
            type="button"
            role="tab"
            aria-selected={index === selectedIndex}
            aria-controls={`hero-slide-${index}`}
            onClick={() => emblaApi?.scrollTo(index)}
            className={`h-2.5 w-2.5 rounded-full transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
              index === selectedIndex ? "bg-brand-pink" : "bg-white/50"
            }`}
          >
            <span className="sr-only">Slide {index + 1}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
