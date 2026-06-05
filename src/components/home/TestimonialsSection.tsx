"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { testimonials } from "@/data/home";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { StatsSection } from "./StatsSection";

function QuoteIcon() {
  return (
    <svg
      viewBox="0 0 64 64"
      className="h-16 w-16 text-white/20 md:h-20 md:w-20"
      aria-hidden
    >
      <path
        fill="currentColor"
        d="M14 36c0-8 5-14 14-16l2 6c-6 2-8 5-8 8h8v14H14V36zm28 0c0-8 5-14 14-16l2 6c-6 2-8 5-8 8h8v14H42V36z"
      />
    </svg>
  );
}

function UsersIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
      <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5C15 14.17 10.33 13 8 13zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
    </svg>
  );
}

export function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(3);
  const active = testimonials[activeIndex];
  const total = testimonials.length;

  const goPrev = useCallback(() => {
    setActiveIndex((i) => (i === 0 ? total - 1 : i - 1));
  }, [total]);

  const goNext = useCallback(() => {
    setActiveIndex((i) => (i === total - 1 ? 0 : i + 1));
  }, [total]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;

    const interval = setInterval(goNext, 6000);
    return () => clearInterval(interval);
  }, [goNext]);

  const displayAvatar =
    "avatar" in active && active.avatar
      ? active.avatar
      : "https://armstrong-cap.com/wp-content/uploads/2023/06/image-4.png";

  return (
    <>
      <section className="home-section !pb-8 !pt-8 lg:!pt-12" aria-labelledby="praise-heading">
        <div className="site-container">
          <ScrollReveal>
          <div className="testimonial-panel relative overflow-hidden rounded-2xl bg-brand-dark px-6 py-10 sm:px-10 lg:rounded-3xl lg:px-12 lg:py-12">
            <span
              className="testimonial-praise-label pointer-events-none absolute left-4 top-1/2 hidden -translate-y-1/2 font-display text-[72px] font-bold uppercase tracking-widest text-white/[0.07] lg:block xl:left-8 xl:text-[90px]"
              aria-hidden
            >
              Praise
            </span>

            <div className="relative grid gap-10 lg:grid-cols-[1fr_220px] lg:items-center xl:grid-cols-[1fr_260px]">
              <div className="lg:pl-16 xl:pl-24">
                <h2 id="praise-heading" className="sr-only">
                  Client testimonials
                </h2>

                <div key={activeIndex} className="testimonial-fade-in">
                <div className="mb-6 flex items-start justify-between gap-4">
                  <p className="font-display text-2xl font-semibold text-white md:text-[26px]">
                    {active.name}
                  </p>
                  <QuoteIcon />
                </div>

                <blockquote>
                  <p className="max-w-[720px] font-body text-base leading-[28px] text-white/80 md:text-[17px]">
                    {active.quote}
                  </p>
                </blockquote>
                </div>

                <div className="mt-10 flex items-center gap-6">
                  <p className="font-display text-sm font-semibold text-white">
                    {String(activeIndex + 1).padStart(2, "0")}{" "}
                    <span className="text-white/50">/ {String(total).padStart(2, "0")}</span>
                  </p>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={goPrev}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 text-white transition-colors hover:border-white hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                      aria-label="Previous testimonial"
                    >
                      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M15 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                    <span className="h-px w-16 bg-white/30" aria-hidden />
                    <button
                      type="button"
                      onClick={goNext}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 text-white transition-colors hover:border-white hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                      aria-label="Next testimonial"
                    >
                      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center gap-5 lg:items-end">
                <ul className="space-y-4 text-center lg:text-right">
                  <li className="flex items-center justify-center gap-2 lg:justify-end">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white">
                      <UsersIcon />
                    </span>
                    <span className="font-display text-sm font-semibold text-white">
                      2.5k Clients Rated
                    </span>
                  </li>
                  <li>
                    <span className="font-display text-sm font-semibold text-white">
                      Avg.Rating 4.8/5
                    </span>
                  </li>
                </ul>

                <div
                  key={`avatar-${activeIndex}`}
                  className="testimonial-fade-in relative overflow-hidden rounded-2xl ring-2 ring-white/20 ring-offset-2 ring-offset-brand-dark"
                >
                  <Image
                    src={displayAvatar}
                    alt={active.name}
                    width={200}
                    height={200}
                    className="h-[180px] w-[180px] object-cover lg:h-[200px] lg:w-[200px]"
                  />
                </div>
              </div>
            </div>

            <div
              className="pointer-events-none absolute -bottom-16 -right-16 h-48 w-48 rounded-full border border-white/[0.06]"
              aria-hidden
            />
          </div>
          </ScrollReveal>
        </div>
      </section>

      <StatsSection />
    </>
  );
}
