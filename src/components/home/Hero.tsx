"use client";

import Image from "next/image";
import Link from "next/link";
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
  const [activeIndex, setActiveIndex] = useState(0);
  const reduceMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    () => false,
  );

  useEffect(() => {
    if (reduceMotion) return;

    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [reduceMotion]);

  return (
    <section
      className="banner-section relative w-full overflow-hidden"
      aria-label="Featured highlights"
    >
      <div className="slide-item relative flex min-h-[min(82vh,680px)] items-center px-4 py-24 sm:min-h-[min(76vh,640px)] sm:py-28 md:px-6 lg:min-h-[580px] lg:py-28">
        <div className="absolute inset-0" aria-hidden>
          <Image
            src={heroSlides[0].image}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="hero-overlay absolute inset-0" />
        </div>

        <div className="site-container relative z-[5] w-full">
          <div
            className="relative min-h-[320px] max-w-xl sm:min-h-[340px] lg:min-h-[360px] lg:max-w-[550px]"
            aria-live="polite"
          >
            {heroSlides.map((item, index) => (
              <div
                key={item.id}
                className={`hero-text-layer ${index === activeIndex ? "is-active" : ""}`}
                aria-hidden={index !== activeIndex}
              >
                <div className="content-box">
                  <h2 className="font-display text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl md:text-[56px] lg:text-[64px] lg:leading-[1.08]">
                    {item.title}{" "}
                    <span className="hero-outline block sm:inline">
                      {item.titleOutline}
                    </span>{" "}
                    {item.titleSuffix}
                  </h2>

                  <div className="lower-box relative mt-6 pl-0 md:mt-8 md:pl-[115px]">
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
                      {item.description}
                    </p>
                    <Link
                      href={item.ctaHref}
                      className="theme-btn btn-two counsolve-btn inline-block"
                      tabIndex={index === activeIndex ? 0 : -1}
                    >
                      {item.ctaLabel}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
