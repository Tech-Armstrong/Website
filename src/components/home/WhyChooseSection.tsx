"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useRef, useState, useSyncExternalStore } from "react";
import { whyChooseSection } from "@/data/home";

const WhyChooseScrollDriveGate = dynamic(
  () =>
    import("./WhyChooseScrollDrive").then(
      (mod) => mod.WhyChooseScrollDriveGate,
    ),
  { ssr: false },
);

function subscribeDesktop(onStoreChange: () => void) {
  const mq = window.matchMedia("(min-width: 1024px)");
  mq.addEventListener("change", onStoreChange);
  return () => mq.removeEventListener("change", onStoreChange);
}

function getDesktopSnapshot() {
  return window.matchMedia("(min-width: 1024px)").matches;
}

function subscribeReducedMotion(onStoreChange: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", onStoreChange);
  return () => mq.removeEventListener("change", onStoreChange);
}

function getReducedMotionSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getTouchSnapshot() {
  return window.matchMedia("(pointer: coarse)").matches;
}

function subscribeTouch(onStoreChange: () => void) {
  const mq = window.matchMedia("(pointer: coarse)");
  mq.addEventListener("change", onStoreChange);
  return () => mq.removeEventListener("change", onStoreChange);
}

function getSiteHeaderOffsetPx() {
  const rem = parseFloat(
    getComputedStyle(document.documentElement).getPropertyValue(
      "--site-header-offset",
    ),
  );
  return Number.isFinite(rem) ? rem * 16 : 112;
}

export function WhyChooseSection() {
  const { backgroundImage, eyebrow, title, tabs } = whyChooseSection;
  const [activeIndex, setActiveIndex] = useState(0);
  const active = tabs[activeIndex];
  const trackRef = useRef<HTMLDivElement>(null);

  const isDesktop = useSyncExternalStore(
    subscribeDesktop,
    getDesktopSnapshot,
    () => false,
  );
  const reduceMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    () => false,
  );
  const isTouch = useSyncExternalStore(
    subscribeTouch,
    getTouchSnapshot,
    () => false,
  );
  const desktopPinActive = isDesktop && !reduceMotion && !isTouch;
  const mobilePinActive = !isDesktop && !reduceMotion;
  const scrollDriveActive = desktopPinActive || mobilePinActive;

  function handleTabClick(index: number) {
    if (scrollDriveActive) {
      const track = trackRef.current;
      if (!track) return;
      const visibleHeight = desktopPinActive
        ? window.innerHeight
        : window.innerHeight - getSiteHeaderOffsetPx();
      const distance = track.offsetHeight - visibleHeight;
      const p = (index + 0.5) / tabs.length;
      window.scrollTo({
        top: track.offsetTop + p * distance,
        behavior: "smooth",
      });
      return;
    }
    setActiveIndex(index);
  }

  const trackClassName = [
    mobilePinActive &&
      "max-lg:h-[400vh] max-lg:scroll-mt-[var(--site-header-offset)]",
    desktopPinActive && "lg:h-[400vh]",
  ]
    .filter(Boolean)
    .join(" ");

  const stickyClassName = [
    mobilePinActive &&
      "max-lg:sticky max-lg:top-[var(--site-header-offset)] max-lg:flex max-lg:h-[calc(100dvh-var(--site-header-offset))] max-lg:max-h-[calc(100svh-var(--site-header-offset))] max-lg:min-h-0 max-lg:flex-col max-lg:py-2 max-lg:pb-[max(0.5rem,env(safe-area-inset-bottom))]",
    desktopPinActive &&
      "lg:sticky lg:top-0 lg:flex lg:h-screen lg:w-full lg:items-center",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section
      className="home-section bg-brand-surface"
      aria-labelledby="why-choose-heading"
    >
      <div className="site-container">
        <div ref={trackRef} className={trackClassName || undefined}>
          <div className={stickyClassName || undefined}>
            <div
              className={`relative w-full overflow-hidden rounded-2xl shadow-[0_12px_40px_rgba(20,32,58,0.1)] lg:rounded-3xl${
                mobilePinActive
                  ? " why-choose-mobile-pin max-lg:flex max-lg:min-h-0 max-lg:flex-1 max-lg:flex-col"
                  : ""
              }`}
            >
              <div className="pointer-events-none absolute inset-0">
                <Image
                  src={backgroundImage}
                  alt=""
                  fill
                  sizes="(max-width: 1200px) 100vw, 1200px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-brand-dark/30" aria-hidden />
              </div>

              <div
                className={`relative z-[1] flex flex-col lg:flex-row ${
                  mobilePinActive
                    ? "max-lg:grid max-lg:min-h-0 max-lg:flex-1 max-lg:grid-rows-[minmax(0,1fr)_minmax(11rem,0.85fr)] max-lg:overflow-hidden lg:min-h-[560px]"
                    : "min-h-[520px] lg:min-h-[560px]"
                }`}
              >
                <div
                  className={`flex min-w-0 flex-col overflow-hidden bg-brand-dark/90 px-6 py-8 sm:px-8 lg:w-[58%] lg:max-w-[58%] lg:shrink-0 lg:px-10 lg:py-10 xl:w-[60%] xl:max-w-[60%] ${
                    mobilePinActive
                      ? "max-lg:flex max-lg:h-full max-lg:min-h-0 max-lg:flex-col max-lg:px-5 max-lg:py-3"
                      : !scrollDriveActive && !isDesktop
                        ? "max-lg:min-h-[360px]"
                        : ""
                  }`}
                >
                  <div
                    className={`sec-title light flex flex-col items-start ${
                      mobilePinActive ? "mb-8 max-lg:mb-2 max-lg:shrink-0" : "mb-8"
                    }`}
                  >
                    <span
                      className={`te-subtitle mb-3 inline-block rounded-full rounded-br-none border border-white/30 bg-white/10 px-4 py-0.5 font-display text-[11px] font-bold uppercase tracking-wide text-white sm:text-xs sm:leading-[26px] ${
                        mobilePinActive ? "max-lg:mb-1.5" : ""
                      }`}
                    >
                      {eyebrow}
                    </span>
                    <h2
                      id="why-choose-heading"
                      className={`font-display text-[36px] font-semibold leading-tight text-white md:text-[42px] ${
                        mobilePinActive ? "max-lg:text-[30px]" : ""
                      }`}
                    >
                      {title}
                    </h2>
                  </div>

                  <div
                    className={`flex flex-col ${
                      mobilePinActive
                        ? "max-lg:min-h-0 max-lg:flex-1 max-lg:overflow-y-auto max-lg:overscroll-contain max-lg:[-webkit-overflow-scrolling:touch]"
                        : ""
                    }`}
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
                          onClick={() => handleTabClick(index)}
                          className={`focus-settle touch-manipulation group relative w-full min-w-0 rounded-md text-left transition-all duration-300 ${
                            index < tabs.length - 1 && !isActive
                              ? "border-b border-white/10"
                              : ""
                          } ${
                            mobilePinActive
                              ? "max-lg:flex max-lg:min-h-[2.75rem] max-lg:flex-1"
                              : ""
                          }`}
                        >
                          <div
                            className={`flex min-w-0 items-stretch ${
                              mobilePinActive
                                ? "max-lg:h-full max-lg:items-center"
                                : isActive
                                  ? "py-2"
                                  : "py-4"
                            }`}
                          >
                            {isActive ? (
                              <span
                                className={`why-choose-badge flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white font-display text-xl font-bold text-brand-blue sm:h-[58px] sm:w-[58px] sm:text-2xl ${
                                  mobilePinActive
                                    ? "max-lg:h-11 max-lg:w-11 max-lg:text-lg"
                                    : ""
                                }`}
                                aria-hidden
                              >
                                {tab.number}
                              </span>
                            ) : null}

                            <span
                              className={`flex min-w-0 flex-1 items-center font-display font-medium ${
                                isActive
                                  ? "rounded-r-full bg-white px-5 py-3.5 text-base font-semibold text-brand-navy sm:px-6 sm:py-4 sm:text-lg max-lg:px-4 max-lg:py-2.5"
                                  : mobilePinActive
                                    ? "pl-1 text-base text-white/75 group-hover:text-white max-lg:text-sm max-lg:leading-snug sm:text-lg"
                                    : "pl-1 text-base text-white/75 group-hover:text-white sm:text-lg"
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

                <div
                  className={`relative z-10 flex items-stretch p-4 lg:absolute lg:inset-y-0 lg:right-0 lg:w-[42%] lg:items-center lg:p-6 xl:w-[40%] ${
                    mobilePinActive
                      ? "max-lg:min-h-0 max-lg:overflow-y-auto max-lg:overscroll-contain max-lg:p-3 max-lg:[-webkit-overflow-scrolling:touch]"
                      : ""
                  }`}
                >
                  <div
                    key={activeIndex}
                    role="tabpanel"
                    id={`why-choose-panel-${activeIndex}`}
                    aria-labelledby={`why-choose-tab-${activeIndex}`}
                    className={`panel-fade-in flex w-full flex-col justify-center rounded-2xl bg-white px-6 py-8 shadow-lg sm:px-8 sm:py-10${
                      mobilePinActive ? " max-lg:py-5" : ""
                    }${desktopPinActive ? " lg:min-h-[480px]" : ""}`}
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
          </div>
        </div>
        {scrollDriveActive ? (
          <WhyChooseScrollDriveGate
            trackRef={trackRef}
            tabCount={tabs.length}
            setActiveIndex={setActiveIndex}
          />
        ) : null}
      </div>
    </section>
  );
}
