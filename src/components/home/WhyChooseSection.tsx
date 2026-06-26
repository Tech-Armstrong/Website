"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import {
  useCallback,
  useRef,
  useState,
  useSyncExternalStore,
  type KeyboardEvent,
} from "react";
import { whyChooseSection } from "@/data/home";

const WhyChooseScrollDriveGate = dynamic(
  () =>
    import("./WhyChooseScrollDrive").then(
      (mod) => mod.WhyChooseScrollDriveGate,
    ),
  { ssr: false },
);

/** Join conditional class names without empty-string artifacts. */
function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

/**
 * SSR-safe media query hook. Returns `serverFallback` on the server and
 * during hydration, then the live value on the client. Includes a fallback
 * for older Safari (<14) where MediaQueryList lacks addEventListener.
 */
function useMediaQuery(query: string, serverFallback = false) {
  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      const mq = window.matchMedia(query);
      if (typeof mq.addEventListener === "function") {
        mq.addEventListener("change", onStoreChange);
        return () => mq.removeEventListener("change", onStoreChange);
      }
      mq.addListener(onStoreChange);
      return () => mq.removeListener(onStoreChange);
    },
    [query],
  );

  const getSnapshot = useCallback(
    () => window.matchMedia(query).matches,
    [query],
  );

  const getServerSnapshot = useCallback(
    () => serverFallback,
    [serverFallback],
  );

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export function WhyChooseSection() {
  const { backgroundImage, eyebrow, title, tabs } = whyChooseSection;
  const [activeIndex, setActiveIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const isTouch = useMediaQuery("(pointer: coarse)");

  const isMobileLayout = !isDesktop;
  const desktopPinActive = isDesktop && !reduceMotion && !isTouch;
  const scrollDriveActive = desktopPinActive;

  const tabCount = tabs.length;
  const safeIndex = Math.min(Math.max(activeIndex, 0), tabCount - 1);
  const active = tabs[safeIndex];

  const scrollToTab = useCallback(
    (index: number) => {
      const track = trackRef.current;
      if (!track) {
        setActiveIndex(index);
        return;
      }
      const trackTop = track.getBoundingClientRect().top + window.scrollY;
      const distance = Math.max(track.offsetHeight - window.innerHeight, 0);
      const progress = (index + 0.5) / tabCount;
      window.scrollTo({
        top: Math.max(trackTop + progress * distance, 0),
        behavior: "smooth",
      });
    },
    [tabCount],
  );

  function handleTabClick(index: number) {
    if (scrollDriveActive) {
      scrollToTab(index);
      return;
    }
    setActiveIndex(index);
  }

  function handleTabKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next: number | null = null;
    switch (event.key) {
      case "ArrowDown":
      case "ArrowRight":
        next = (index + 1) % tabCount;
        break;
      case "ArrowUp":
      case "ArrowLeft":
        next = (index - 1 + tabCount) % tabCount;
        break;
      case "Home":
        next = 0;
        break;
      case "End":
        next = tabCount - 1;
        break;
      default:
        return;
    }
    event.preventDefault();
    handleTabClick(next);
    tabRefs.current[next]?.focus();
  }

  const trackStyle = scrollDriveActive
    ? { height: `${tabCount * 100}vh` }
    : undefined;

  const stickyClassName = cx(
    desktopPinActive &&
      "lg:sticky lg:top-0 lg:flex lg:h-screen lg:w-full lg:items-center",
  );

  return (
    <section
      className="home-section !pt-6 sm:!pt-7 lg:!pt-8 !pb-5 sm:!pb-6 lg:!pb-7"
      aria-labelledby="why-choose-heading"
    >
      <div className="site-container">
        <div ref={trackRef} style={trackStyle}>
          <div className={stickyClassName || undefined}>
            <div className="relative w-full overflow-hidden rounded-2xl shadow-[var(--elevation-panel)] lg:rounded-3xl">
              <div className="pointer-events-none absolute inset-0">
                <Image
                  src={backgroundImage}
                  alt=""
                  fill
                  sizes="(max-width: 1200px) 100vw, 1200px"
                  className="object-cover"
                />
                <div
                  className="absolute inset-0 bg-brand-dark/30"
                  aria-hidden
                />
              </div>

              <div className="relative z-[1] flex flex-col lg:min-h-[400px] lg:flex-row">
                <div className="flex min-w-0 flex-col bg-brand-dark/90 px-4 py-4 sm:px-8 lg:w-[58%] lg:max-w-[58%] lg:shrink-0 lg:px-8 lg:py-6 xl:w-[60%] xl:max-w-[60%]">
                  <div className="sec-title light mb-4 flex flex-col items-start lg:mb-5">
                    <h2
                      id="why-choose-heading"
                      className="font-display text-[24px] font-semibold leading-tight text-white lg:text-[28px] lg:leading-tight xl:text-[32px]"
                    >
                      {eyebrow} {title}
                    </h2>
                  </div>

                  <div
                    className="flex flex-col gap-1 lg:gap-0"
                    role="tablist"
                    aria-label="Why choose Armstrong"
                    aria-orientation="vertical"
                  >
                    {tabs.map((tab, index) => {
                      const isActive = index === safeIndex;
                      const isLast = index === tabCount - 1;

                      return (
                        <button
                          key={tab.number}
                          ref={(node) => {
                            tabRefs.current[index] = node;
                          }}
                          type="button"
                          role="tab"
                          aria-selected={isActive}
                          aria-controls={`why-choose-panel-${index}`}
                          id={`why-choose-tab-${index}`}
                          tabIndex={isActive ? 0 : -1}
                          onClick={() => handleTabClick(index)}
                          onKeyDown={(event) => handleTabKeyDown(event, index)}
                          className={cx(
                            "focus-settle group relative w-full min-w-0 touch-manipulation text-left transition-all duration-300",
                            isMobileLayout &&
                              cx(
                                "rounded-md border-l-4 px-3 py-3",
                                isActive
                                  ? "border-brand-blue bg-white/10"
                                  : "border-transparent",
                              ),
                            !isMobileLayout &&
                              cx(
                                "rounded-md",
                                !isLast &&
                                  (isActive
                                    ? "border-b border-transparent"
                                    : "border-b border-white/10"),
                              ),
                          )}
                        >
                          <div
                            className={cx(
                              "min-w-0",
                              isMobileLayout
                                ? "flex items-center gap-3"
                                : "grid grid-cols-[3rem_minmax(0,1fr)] items-center gap-x-2",
                              !isMobileLayout && (isActive ? "py-1.5" : "py-2.5"),
                            )}
                          >
                            {isMobileLayout ? (
                              <span
                                className={cx(
                                  "w-9 shrink-0 font-display text-sm font-bold",
                                  isActive ? "text-white" : "text-white/60",
                                )}
                                aria-hidden
                              >
                                {tab.number}
                              </span>
                            ) : (
                              <span
                                className={cx(
                                  "flex h-11 w-11 shrink-0 items-center justify-center rounded-full sm:h-12 sm:w-12",
                                  isActive &&
                                    "bg-white font-display text-base font-bold text-brand-blue sm:text-lg",
                                )}
                                aria-hidden
                              >
                                {isActive ? tab.number : null}
                              </span>
                            )}

                            <span
                              className={cx(
                                "flex min-w-0 items-center font-display font-medium",
                                isMobileLayout && "flex-1",
                                isMobileLayout
                                  ? cx(
                                      "text-left text-sm leading-snug sm:text-base",
                                      isActive
                                        ? "font-semibold text-white"
                                        : "text-white/75 group-hover:text-white",
                                    )
                                  : isActive
                                    ? "truncate rounded-r-full bg-white px-5 py-2.5 text-sm font-semibold text-brand-navy shadow-[var(--elevation-card)] sm:px-6 sm:py-3 sm:text-base"
                                    : "text-sm text-white/75 group-hover:text-white sm:text-base",
                              )}
                            >
                              {!isMobileLayout && !isActive ? (
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

                <div className="relative z-10 flex items-stretch p-3 max-lg:pt-0 lg:absolute lg:inset-y-0 lg:right-0 lg:w-[42%] lg:items-center lg:p-5 xl:w-[40%]">
                  <div
                    key={safeIndex}
                    role="tabpanel"
                    id={`why-choose-panel-${safeIndex}`}
                    aria-labelledby={`why-choose-tab-${safeIndex}`}
                    className={cx(
                      "lift-card panel-fade-in flex w-full flex-col justify-center rounded-2xl border border-brand-blue/10 bg-gradient-to-br from-white via-white to-brand-blue/[0.05] px-4 py-4 shadow-[var(--elevation-panel)] max-lg:justify-start sm:px-6 sm:py-6 lg:px-5 lg:py-5",
                      desktopPinActive && "lg:min-h-[320px]",
                    )}
                  >
                    <div className="mb-3 flex items-start gap-3 sm:mb-4 sm:gap-4">
                      <span
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-blue font-display text-sm font-bold text-white sm:h-10 sm:w-10 sm:text-base"
                        aria-hidden
                      >
                        {active.number}
                      </span>
                      <h3 className="pt-0.5 font-display text-base font-semibold leading-snug text-brand-navy sm:pt-1 sm:text-xl">
                        {active.title}
                      </h3>
                    </div>

                    <div className="space-y-2 sm:space-y-3">
                      {active.paragraphs.map((paragraph, index) => (
                        <p
                          key={paragraph}
                          className={
                            index === 0
                              ? "font-display text-base font-semibold leading-snug text-brand-navy"
                              : "font-body text-[14px] leading-relaxed text-brand-navy/85 sm:text-[15px]"
                          }
                        >
                          {paragraph}
                        </p>
                      ))}
                    </div>

                    <blockquote className="relative mt-4 rounded-xl border-l-4 border-brand-blue bg-brand-blue/[0.06] px-3 py-2.5 sm:mt-4 sm:px-4 sm:py-3">
                      <span
                        className="pointer-events-none absolute left-3 top-1.5 font-display text-3xl leading-none text-brand-blue/25"
                        aria-hidden
                      >
                        &ldquo;
                      </span>
                      <p className="relative font-display text-sm font-semibold leading-relaxed text-brand-navy sm:text-[15px]">
                        {active.quote}
                      </p>
                      <cite className="relative mt-1.5 block font-body text-xs font-medium not-italic text-brand-blue sm:mt-2 sm:text-sm">
                        — {active.attribution}
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
            tabCount={tabCount}
            setActiveIndex={setActiveIndex}
          />
        ) : null}
      </div>
    </section>
  );
}
