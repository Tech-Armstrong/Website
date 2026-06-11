"use client";

import { div as MotionDiv, span as MotionSpan } from "framer-motion/client";
import Image from "next/image";
import Link from "next/link";
import {
  useCallback,
  useEffect,
  useRef,
  useSyncExternalStore,
  useState,
  type ReactNode,
} from "react";
import { heroSlides } from "@/data/home";

const settleEase = [0.22, 1, 0.36, 1] as const;
const revealHidden = { opacity: 0, y: 20 };
const revealVisible = { opacity: 1, y: 0 };

function subscribeReducedMotion(onStoreChange: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", onStoreChange);
  return () => mq.removeEventListener("change", onStoreChange);
}

function getReducedMotionSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function HeroReveal({
  children,
  className = "",
  delay = 0,
  show,
  as = "span",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  show: boolean;
  as?: "span" | "div";
}) {
  const reduceMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    () => false,
  );

  if (reduceMotion) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  const MotionTag = as === "div" ? MotionDiv : MotionSpan;

  return (
    <MotionTag
      className={className}
      initial={false}
      animate={show ? revealVisible : revealHidden}
      transition={{
        duration: 0.4,
        delay: show ? delay / 1000 : 0,
        ease: settleEase,
      }}
    >
      {children}
    </MotionTag>
  );
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
  const [restRevealed, setRestRevealed] = useState(false);
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
    setRestRevealed(true);
    if (reduceMotion) return;
    if (advanceTimeoutRef.current) clearTimeout(advanceTimeoutRef.current);
    advanceTimeoutRef.current = setTimeout(advanceSlide, 3200);
  }, [reduceMotion, advanceSlide]);

  useEffect(() => {
    setRestRevealed(false);
  }, [activeIndex]);

  useEffect(() => {
    if (reduceMotion) {
      setRestRevealed(true);
    }
  }, [activeIndex, reduceMotion]);

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
      className="banner-section relative w-full overflow-hidden min-h-[100svh] min-h-[100dvh] lg:min-h-[580px]"
      aria-label="Featured highlights"
    >
      <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden>
        <Image
          key={slide.image}
          src={slide.image}
          alt=""
          fill
          priority
          sizes="100vw"
          className="h-full min-h-full w-full min-w-full object-cover object-center"
        />
        <div className="hero-overlay absolute inset-0" />
      </div>

      <div className="slide-item relative z-[5] flex min-h-[inherit] items-center px-4 pb-10 pt-[calc(var(--site-header-offset)+1.5rem)] sm:px-6 sm:pb-12 lg:min-h-0 lg:px-6 lg:py-28 lg:pt-28">
        <div className="site-container w-full">
          <div className="max-w-xl lg:max-w-[550px]" aria-live="polite">
            <div className="content-box">
              <h2 className="font-display text-[2.75rem] font-semibold leading-[1.08] tracking-tight text-white sm:text-5xl md:text-[56px] lg:text-[64px] lg:leading-[1.08]">
                <span className="block">
                  <HeroTypewriter
                    key={activeIndex}
                    text={slide.title}
                    onComplete={handleTypewriterComplete}
                  />
                </span>
                <HeroReveal
                  show={restRevealed}
                  delay={0}
                  className="hero-outline block"
                >
                  {slide.titleOutline}
                </HeroReveal>
                <HeroReveal show={restRevealed} delay={120} className="block">
                  {slide.titleSuffix}
                </HeroReveal>
              </h2>

              <HeroReveal
                show={restRevealed}
                delay={240}
                as="div"
                className="lower-box mt-6 md:mt-8"
              >
                <p className="mb-8 max-w-md whitespace-pre-line text-lg leading-relaxed text-white/85 sm:leading-[30px]">
                  {slide.description}
                </p>
                <Link
                  href={slide.ctaHref}
                  className="theme-btn btn-two counsolve-btn inline-block max-lg:!px-8 max-lg:!py-4 max-lg:text-lg"
                >
                  {slide.ctaLabel}
                </Link>
              </HeroReveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
