"use client";

import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import { offerings, offeringsSection } from "@/data/home";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const VISIBLE_CARDS = 6;
const SLIDE_STEP = 3;

type Offering = (typeof offerings)[number];

type OfferingSlide = {
  items: Offering[];
  startIndex: number;
};

function buildWindowSlides(items: readonly Offering[]): OfferingSlide[] {
  const slides: OfferingSlide[] = [];
  for (let start = 0; start < items.length; start += SLIDE_STEP) {
    const slice = items.slice(start, start + VISIBLE_CARDS);
    if (slice.length === 0) break;
    slides.push({ items: [...slice], startIndex: start });
    if (start + VISIBLE_CARDS >= items.length) break;
  }
  return slides;
}

const offeringSlides = buildWindowSlides(offerings);

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

const OFFERING_ICONS = [
  // Mutual Funds
  <path
    key="mutual-funds"
    d="M4 19V5m0 14h16M8 17V9m4 8V7m4 10v-6"
    strokeLinecap="round"
    strokeLinejoin="round"
  />,
  // AIF
  <path
    key="aif"
    d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3zM12 12l8-4.5M12 12v9M12 12L4 7.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  />,
  // SIF
  <path
    key="sif"
    d="M12 3v18M3 12h18M7.05 7.05l9.9 9.9M16.95 7.05l-9.9 9.9"
    strokeLinecap="round"
    strokeLinejoin="round"
  />,
  // PMS
  <path
    key="pms"
    d="M4 7h16v12H4V7zm4-4h8v4H8V3zm2 8h4m-6 4h8"
    strokeLinecap="round"
    strokeLinejoin="round"
  />,
  // International Equity
  <path
    key="intl-equity"
    d="M3 12h18M12 3c3 3.5 4.5 7.5 4.5 9S15 18.5 12 21c-3-2.5-4.5-6.5-4.5-9S9 6.5 12 3z"
    strokeLinecap="round"
    strokeLinejoin="round"
  />,
  // Corporate FD
  <path
    key="corp-fd"
    d="M3 21h18M5 21V9l7-4 7 4v12M9 21v-6h6v6M9 13h6"
    strokeLinecap="round"
    strokeLinejoin="round"
  />,
  // Domestic equity
  <path
    key="domestic-equity"
    d="M4 19h16M7 15l3-4 3 2 4-6"
    strokeLinecap="round"
    strokeLinejoin="round"
  />,
  // REITs & InvITs
  <path
    key="reit-invits"
    d="M4 21h16M6 21V9l6-4 6 4v12M10 21v-5h4v5M9 13h2M13 13h2"
    strokeLinecap="round"
    strokeLinejoin="round"
  />,
  // Insurance
  <path
    key="insurance"
    d="M12 3l7 4v6c0 4.5-3.2 7.8-7 9-3.8-1.2-7-4.5-7-9V7l7-4z"
    strokeLinecap="round"
    strokeLinejoin="round"
  />,
] as const;

function OfferingIcon({ index, compact = false }: { index: number; compact?: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={cx(
        "text-brand-blue transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none group-hover:scale-110",
        compact ? "h-5 w-5" : "h-6 w-6",
      )}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      aria-hidden
    >
      {OFFERING_ICONS[index]}
    </svg>
  );
}

function OfferingCard({
  offering,
  index,
  compact = false,
}: {
  offering: Offering;
  index: number;
  compact?: boolean;
}) {
  return (
    <Link
      href={offering.href}
      className={cx(
        "focus-settle lift-card group flex h-full flex-col border border-brand-blue/10 bg-gradient-to-b from-white to-brand-blue/[0.04] shadow-[var(--elevation-card)] transition-[border-color,box-shadow] duration-300 hover:border-brand-blue/25 hover:shadow-[var(--elevation-panel)]",
        compact ? "rounded-xl p-3.5 sm:p-4" : "rounded-2xl p-5 sm:p-6",
      )}
    >
      <article className="flex h-full flex-col">
        <div
          className={cx(
            "flex items-center justify-center rounded-xl bg-brand-blue/[0.08]",
            compact ? "mb-2.5 h-9 w-9" : "mb-4 h-12 w-12",
          )}
        >
          <OfferingIcon index={index} compact={compact} />
        </div>
        <h3
          className={cx(
            "font-display font-semibold leading-snug text-brand-navy",
            compact
              ? "line-clamp-2 text-sm sm:text-base"
              : "text-base sm:text-lg",
          )}
        >
          {offering.title}
        </h3>
        <p
          className={cx(
            "flex-1 font-body leading-relaxed text-brand-muted",
            compact
              ? "mt-1.5 line-clamp-2 text-xs sm:text-sm"
              : "mt-2 line-clamp-3 text-sm",
          )}
        >
          {offering.description}
        </p>
        <span
          className={cx(
            "inline-flex items-center gap-1 font-display font-semibold text-brand-blue transition-[gap] duration-300 group-hover:gap-2",
            compact ? "mt-2.5 text-xs sm:text-sm" : "mt-4 text-sm",
          )}
        >
          Learn more
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
            <path d="M9 6l6 6-6 6" />
          </svg>
        </span>
      </article>
    </Link>
  );
}

function OfferingsStaticGrid() {
  return (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">
      {offerings.map((offering, index) => (
        <li key={offering.title} className="h-full">
          <ScrollReveal delay={Math.min(index * 50, 250)} direction="up">
            <OfferingCard offering={offering} index={index} />
          </ScrollReveal>
        </li>
      ))}
    </ul>
  );
}

function CarouselNavButton({
  direction,
  onClick,
}: {
  direction: "prev" | "next";
  onClick: () => void;
}) {
  const label =
    direction === "prev" ? "Previous offering slide" : "Next offering slide";

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="focus-settle hidden h-10 w-10 shrink-0 items-center justify-center rounded-full border border-brand-blue/20 bg-white text-brand-navy shadow-[var(--elevation-card)] transition-colors hover:border-brand-blue/40 hover:bg-brand-blue/[0.04] lg:flex"
    >
      <svg
        viewBox="0 0 24 24"
        className="h-4 w-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        aria-hidden
      >
        {direction === "prev" ? (
          <path d="M15 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
        ) : (
          <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
        )}
      </svg>
    </button>
  );
}

export function OurOfferingsSection() {
  const { eyebrow, title, subtitle } = offeringsSection;
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
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

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotion = () => setPrefersReducedMotion(mq.matches);
    updateMotion();
    mq.addEventListener("change", updateMotion);
    return () => mq.removeEventListener("change", updateMotion);
  }, []);

  useEffect(() => {
    if (!emblaApi || prefersReducedMotion) return;

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
  }, [emblaApi, prefersReducedMotion]);

  return (
    <section
      className="home-section border-t border-[color:var(--brand-border)] bg-brand-surface/50 !pt-6 !pb-6 sm:!pt-8 sm:!pb-8 lg:!pt-10 lg:!pb-10"
      aria-labelledby="offerings-heading"
    >
      <div className="site-container">
        <ScrollReveal className="mx-auto mb-6 max-w-3xl text-center lg:mb-8">
          <p className="mb-2 font-display text-[11px] font-bold uppercase tracking-[0.12em] text-brand-blue sm:text-xs">
            {eyebrow}
          </p>
          <h2
            id="offerings-heading"
            className="font-display text-[clamp(1.75rem,3vw,2.25rem)] font-semibold leading-[1.15] text-brand-navy"
          >
            {title}
          </h2>
          <p className="mx-auto mt-2 max-w-2xl font-body text-sm leading-relaxed text-brand-muted sm:text-base">
            {subtitle}
          </p>
        </ScrollReveal>

        {prefersReducedMotion ? (
          <OfferingsStaticGrid />
        ) : (
          <ScrollReveal delay={100} className="min-w-0 w-full">
            <div className="flex items-center gap-3 lg:gap-4">
              <CarouselNavButton direction="prev" onClick={scrollPrev} />

              <div className="relative min-w-0 flex-1">
                <div
                  ref={emblaRef}
                  className="min-w-0 overflow-hidden py-1"
                  aria-roledescription="carousel"
                  aria-label="Our offerings"
                >
                  <div className="flex items-stretch">
                    {offeringSlides.map((slide, slideIndex) => (
                      <div
                        key={slideIndex}
                        className="min-w-0 flex-[0_0_100%]"
                      >
                        <ul className="grid grid-cols-2 auto-rows-fr items-stretch gap-3 sm:gap-4 md:grid-cols-3 lg:gap-5">
                          {slide.items.map((offering, itemIndex) => (
                            <li key={offering.title} className="h-full min-h-0">
                              <OfferingCard
                                offering={offering}
                                index={slide.startIndex + itemIndex}
                                compact
                              />
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <CarouselNavButton direction="next" onClick={scrollNext} />
            </div>

            <div
              className="mt-5 flex justify-center gap-2.5"
              role="tablist"
              aria-label="Offerings carousel pagination"
            >
              {scrollSnaps.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  role="tab"
                  aria-selected={selectedIndex === index}
                  aria-label={`Go to offering slide ${index + 1}`}
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
        )}
      </div>
    </section>
  );
}
