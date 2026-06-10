"use client";

import Image from "next/image";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import { useEffect, useSyncExternalStore, useState } from "react";
import { heroSlides } from "@/data/home";

function subscribeReducedMotion(onStoreChange: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", onStoreChange);
  return () => mq.removeEventListener("change", onStoreChange);
}

function getReducedMotionSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

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
  const reduceMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    () => false,
  );

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
              id={`hero-slide-${index}`}
              className="relative min-w-0 flex-[0_0_100%]"
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${heroSlides.length}`}
              aria-hidden={selectedIndex !== index}
            >
              <div className="slide-item relative flex min-h-[min(82vh,680px)] items-center px-4 py-24 sm:min-h-[min(76vh,640px)] sm:py-28 md:px-6 lg:min-h-[580px] lg:py-28">
                <Image
                  src={slide.image}
                  alt={`${slide.title} ${slide.titleOutline} ${slide.titleSuffix}`}
                  fill
                  priority={index === 0}
                  sizes="100vw"
                  className="object-cover"
                />
                <div className="hero-overlay absolute inset-0" aria-hidden />

                <div className="site-container relative z-[5]">
                  <div
                    className={`content-box max-w-xl transition-opacity duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] lg:max-w-[550px] ${
                      selectedIndex === index ? "hero-content-animate opacity-100" : "opacity-0"
                    }`}
                  >
                    <h2 className="font-display text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl md:text-[56px] lg:text-[64px] lg:leading-[1.08]">
                      {slide.title}{" "}
                      <span className="hero-outline block sm:inline">
                        {slide.titleOutline}
                      </span>{" "}
                      {slide.titleSuffix}
                    </h2>

                    <div
                      className={`lower-box relative mt-6 pl-0 md:mt-8 md:pl-[115px] ${
                        selectedIndex === index ? "hero-content-animate hero-content-animate-delay-1" : ""
                      }`}
                    >
                      <div
                        className="icon-box absolute left-0 top-0 hidden h-16 w-16 items-center justify-center rounded-full rounded-br-none bg-brand-green text-white shadow-lg md:flex lg:h-[75px] lg:w-[75px]"
                        aria-hidden
                      >
                        <ChatIcon />
                      </div>
                      <div
                        className="icon-box mb-5 flex h-16 w-16 items-center justify-center rounded-full rounded-br-none bg-brand-green text-white shadow-lg md:hidden"
                        aria-hidden
                      >
                        <ChatIcon />
                      </div>
                      <p className="mb-8 max-w-md whitespace-pre-line text-base leading-relaxed text-white/85 sm:text-lg sm:leading-[30px]">
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
            className={`focus-settle h-2.5 w-2.5 rounded-full transition-colors ${
              index === selectedIndex ? "bg-brand-pink scale-110" : "bg-white/40 hover:bg-white/60"
            }`}
          >
            <span className="sr-only">Slide {index + 1}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
