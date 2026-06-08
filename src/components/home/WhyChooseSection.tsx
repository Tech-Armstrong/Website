"use client";

import Image from "next/image";
import { useState } from "react";
import { whyChooseSection } from "@/data/home";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function WhyChooseSection() {
  const { backgroundImage, eyebrow, title, tabs } = whyChooseSection;
  const [activeIndex, setActiveIndex] = useState(0);
  const active = tabs[activeIndex];

  return (
    <section
      className="home-section bg-brand-surface"
      aria-labelledby="why-choose-heading"
    >
      <div className="site-container">
        <ScrollReveal>
        <div className="relative overflow-hidden rounded-2xl shadow-[0_12px_40px_rgba(20,32,58,0.1)] lg:rounded-3xl">
          <div className="absolute inset-0">
            <Image
              src={backgroundImage}
              alt=""
              fill
              sizes="(max-width: 1200px) 100vw, 1200px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-brand-dark/30" aria-hidden />
          </div>

          <div className="relative flex min-h-[520px] flex-col lg:min-h-[560px] lg:flex-row">
            <div className="flex flex-1 flex-col bg-brand-dark/90 px-6 py-8 sm:px-8 lg:max-w-[68%] lg:px-10 lg:py-10">
              <div className="sec-title light mb-8 flex flex-col items-start">
                <span className="te-subtitle mb-3 inline-block rounded-full rounded-br-none border border-white/30 bg-white/10 px-4 py-0.5 font-display text-[11px] font-bold uppercase tracking-wide text-white sm:text-xs sm:leading-[26px]">
                  {eyebrow}
                </span>
                <h2
                  id="why-choose-heading"
                  className="font-display text-[36px] font-semibold leading-tight text-white md:text-[42px]"
                >
                  {title}
                </h2>
              </div>

              <div
                className="flex flex-col"
                role="tablist"
                aria-label="Why choose Armstrong"
              >
                {tabs.map((tab, index) => {
                  const isActive = index === activeIndex;

                  return (
                    <button
                      key={tab.number}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      aria-controls={`why-choose-panel-${index}`}
                      id={`why-choose-tab-${index}`}
                      onClick={() => setActiveIndex(index)}
                      className={`focus-settle group relative w-full rounded-md text-left transition-all duration-300 ${
                        index < tabs.length - 1 && !isActive
                          ? "border-b border-white/10"
                          : ""
                      }`}
                    >
                      <div
                        className={`flex items-stretch ${
                          isActive ? "py-2" : "py-4"
                        }`}
                      >
                        {isActive ? (
                          <span
                            className="why-choose-badge flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white font-display text-xl font-bold text-brand-blue sm:h-[58px] sm:w-[58px] sm:text-2xl"
                            aria-hidden
                          >
                            {tab.number}
                          </span>
                        ) : null}

                        <span
                          className={`flex flex-1 items-center font-display text-base font-medium sm:text-lg ${
                            isActive
                              ? "rounded-r-full bg-white px-5 py-3.5 font-semibold text-brand-navy sm:px-6 sm:py-4"
                              : "pl-1 text-white/75 group-hover:text-white"
                          }`}
                        >
                          {!isActive ? (
                            <span className="sr-only">{tab.number} </span>
                          ) : null}
                          {tab.title}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="relative z-10 flex items-stretch p-4 lg:absolute lg:inset-y-0 lg:right-0 lg:w-[42%] lg:items-center lg:p-6 xl:w-[40%]">
              <div
                key={activeIndex}
                role="tabpanel"
                id={`why-choose-panel-${activeIndex}`}
                aria-labelledby={`why-choose-tab-${activeIndex}`}
                className="panel-fade-in flex w-full flex-col justify-center rounded-2xl bg-white px-6 py-8 shadow-lg sm:px-8 sm:py-10"
              >
                <h3 className="mb-5 font-display text-xl font-semibold text-brand-navy sm:text-2xl">
                  {active.title}
                </h3>

                <div className="space-y-4 font-body text-[15px] leading-[26px] text-brand-muted">
                  {active.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>

                <blockquote className="mt-6 border-0">
                  <p className="font-display text-base font-semibold leading-relaxed text-brand-navy sm:text-lg">
                    {active.quote}
                  </p>
                  <cite className="mt-3 block font-body text-sm not-italic text-brand-muted">
                    -{active.attribution}
                  </cite>
                </blockquote>
              </div>
            </div>
          </div>
        </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
