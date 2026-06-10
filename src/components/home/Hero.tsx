"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useSyncExternalStore, useState } from "react";
import { heroSlides } from "@/data/home";

function subscribeReducedMotion(onStoreChange: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", onStoreChange);
  return () => mq.removeEventListener("change", onStoreChange);
}

function getReducedMotionSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function HeroTypewriter({
  text,
  onComplete,
}: {
  text: string;
  onComplete?: () => void;
}) {
  const reduceMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    () => false,
  );
  const [displayed, setDisplayed] = useState("");
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    if (reduceMotion) {
      setDisplayed(text);
      return;
    }

    setDisplayed("");
    let i = 0;
    let completeCalled = false;
    const id = setInterval(() => {
      i += 1;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(id);
        if (!completeCalled) {
          completeCalled = true;
          onCompleteRef.current?.();
        }
      }
    }, 55);

    return () => clearInterval(id);
  }, [text, reduceMotion]);

  return (
    <span className="hero-typewriter" aria-label={text}>
      {displayed}
      {!reduceMotion && displayed.length < text.length ? (
        <span className="hero-typewriter-cursor" aria-hidden>
          |
        </span>
      ) : null}
    </span>
  );
}

export function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const advanceTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const slide = heroSlides[activeIndex];

  const reduceMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    () => false,
  );

  const advanceSlide = useCallback(() => {
    setActiveIndex((i) => (i + 1) % heroSlides.length);
  }, []);

  const handleTypewriterComplete = useCallback(() => {
    if (reduceMotion) return;
    if (advanceTimeoutRef.current) clearTimeout(advanceTimeoutRef.current);
    advanceTimeoutRef.current = setTimeout(advanceSlide, 3000);
  }, [reduceMotion, advanceSlide]);

  useEffect(() => {
    return () => {
      if (advanceTimeoutRef.current) clearTimeout(advanceTimeoutRef.current);
    };
  }, [activeIndex]);

  useEffect(() => {
    if (!reduceMotion) return;
    const id = setInterval(advanceSlide, 5000);
    return () => clearInterval(id);
  }, [reduceMotion, advanceSlide]);

  return (
    <section
      className="banner-section relative w-full overflow-hidden"
      aria-label="Featured highlights"
    >
      <div className="slide-item relative flex min-h-[min(82vh,680px)] items-center px-4 py-24 sm:min-h-[min(76vh,640px)] sm:py-28 md:px-6 lg:min-h-[580px] lg:py-28">
        <div className="absolute inset-0" aria-hidden>
          <Image
            key={slide.image}
            src={slide.image}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="hero-overlay absolute inset-0" />
        </div>

        <div className="site-container relative z-[5] w-full">
          <div className="max-w-xl lg:max-w-[550px]" aria-live="polite">
            <div className="content-box">
              <h2 className="font-display text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl md:text-[56px] lg:text-[64px] lg:leading-[1.08]">
                <span className="block">
                  <HeroTypewriter
                    key={activeIndex}
                    text={slide.title}
                    onComplete={handleTypewriterComplete}
                  />
                </span>
                <span className="hero-outline block">{slide.titleOutline}</span>
                <span className="block">{slide.titleSuffix}</span>
              </h2>

              <div className="lower-box mt-6 md:mt-8">
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
    </section>
  );
}
