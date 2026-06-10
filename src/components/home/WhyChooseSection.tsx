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
      // Legacy Safari / older WebViews
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

/**
 * Resolve --site-header-offset to pixels. Handles rem (using the real root
 * font size instead of assuming 16px) and px values, with a safe default.
 */
function getSiteHeaderOffsetPx() {
  const root = document.documentElement;
  const raw = getComputedStyle(root)
    .getPropertyValue("--site-header-offset")
    .trim();
  const value = parseFloat(raw);
  if (!Number.isFinite(value)) return 112;
  if (raw.endsWith("rem")) {
    const rootFontSize = parseFloat(getComputedStyle(root).fontSize) || 16;
    return value * rootFontSize;
  }
  return value;
}

export function WhyChooseSection() {
  const { backgroundImage, eyebrow, title, tabs } = whyChooseSection;
  const [activeIndex, setActiveIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const isTouch = useMediaQuery("(pointer: coarse)");

  const desktopPinActive = isDesktop && !reduceMotion && !isTouch;
  const mobilePinActive = !isDesktop && !reduceMotion;
  const scrollDriveActive = desktopPinActive || mobilePinActive;

  // Defensive: never index past the end if the tabs data changes length.
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
      const visibleHeight = desktopPinActive
        ? window.innerHeight
        : window.innerHeight - getSiteHeaderOffsetPx();
      // offsetTop is relative to the offsetParent, not the document, so it
      // breaks inside positioned ancestors. Use a document-relative position.
      const trackTop = track.getBoundingClientRect().top + window.scrollY;
      const distance = Math.max(track.offsetHeight - visibleHeight, 0);
      const progress = (index + 0.5) / tabCount;
      window.scrollTo({
        top: Math.max(trackTop + progress * distance, 0),
        behavior: "smooth",
      });
    },
    [desktopPinActive, tabCount],
  );

  function handleTabClick(index: number) {
    if (scrollDriveActive) {
      scrollToTab(index);
      return;
    }
    setActiveIndex(index);
  }

  // WAI-ARIA tabs pattern: arrow keys, Home, and End move between tabs.
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

  if (tabCount === 0) return null;

  // The pinned track must be tall enough for one viewport per tab. The
  // previous hardcoded 400vh silently broke whenever tabs.length !== 4.
  const trackStyle = scrollDriveActive
    ? { height: `${tabCount * 100}vh` }
    : undefined;

  const trackClassName = cx(
    mobilePinActive && "max-lg:scroll-mt-[var(--site-header-offset)]",
  );

  const stickyClassName = cx(
    mobilePinActive &&
      "max-lg:sticky max-lg:top-[var(--site-header-offset)] max-lg:flex max-lg:h-[calc(100dvh-var(--site-header-offset))] max-lg:max-h-[calc(100svh-var(--site-header-offset))] max-lg:min-h-0 max-lg:flex-col max-lg:py-2 max-lg:pb-[max(0.5rem,env(safe-area-inset-bottom))]",
    desktopPinActive &&
      "lg:sticky lg:top-0 lg:flex lg:h-screen lg:w-full lg:items-center",
  );

  return (
    <section
      className="home-section bg-brand-surface"
      aria-labelledby="why-choose-heading"
    >
      <div className="site-container">
        <div
          ref={trackRef}
          className={trackClassName || undefined}
          style={trackStyle}
        >
          <div className={stickyClassName || undefined}>
            <div
              className={cx(
                "relative w-full overflow-hidden rounded-2xl shadow-[0_12px_40px_rgba(20,32,58,0.1)] lg:rounded-3xl",
                mobilePinActive &&
                  "why-choose-mobile-pin max-lg:flex max-lg:min-h-0 max-lg:flex-1 max-lg:flex-col",
              )}
            >
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

              <div
                className={cx(
                  "relative z-[1] flex flex-col lg:flex-row",
                  mobilePinActive
                    ? "max-lg:grid max-lg:min-h-0 max-lg:flex-1 max-lg:grid-rows-[minmax(0,1fr)_minmax(0,1fr)] max-lg:overflow-hidden lg:min-h-[560px]"
                    : "min-h-[520px] lg:min-h-[560px]",
                )}
              >
                <div
                  className={cx(
                    "flex min-w-0 flex-col overflow-hidden bg-brand-dark/90 px-6 py-8 sm:px-8 lg:w-[58%] lg:max-w-[58%] lg:shrink-0 lg:px-10 lg:py-10 xl:w-[60%] xl:max-w-[60%]",
                    mobilePinActive &&
                      "max-lg:flex max-lg:h-full max-lg:min-h-0 max-lg:flex-col max-lg:px-5 max-lg:py-3",
                    !scrollDriveActive && !isDesktop && "max-lg:min-h-[360px]",
                  )}
                >
                  <div
                    className={cx(
                      "sec-title light mb-8 flex flex-col items-start",
                      mobilePinActive && "max-lg:mb-2 max-lg:shrink-0",
                    )}
                  >
                    <span
                      className={cx(
                        "te-subtitle mb-3 inline-block rounded-full rounded-br-none border border-white/30 bg-white/10 px-4 py-0.5 font-display text-[11px] font-bold uppercase tracking-wide text-white sm:text-xs sm:leading-[26px]",
                        mobilePinActive && "max-lg:mb-1.5",
                      )}
                    >
                      {eyebrow}
                    </span>
                    <h2
                      id="why-choose-heading"
                      className={cx(
                        "font-display text-[36px] font-semibold leading-tight text-white md:text-[42px]",
                        mobilePinActive && "max-lg:text-[30px]",
                      )}
                    >
                      {title}
                    </h2>
                  </div>

                  <div
                    className={cx(
                      "flex flex-col",
                      mobilePinActive &&
                        "max-lg:min-h-0 max-lg:flex-1 max-lg:overflow-hidden",
                    )}
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
                            "focus-settle group relative w-full min-w-0 touch-manipulation rounded-md text-left transition-all duration-300",
                            // Keep the divider in the layout when active
                            // (transparent) so rows don't shift by 1px.
                            !isLast &&
                              (isActive
                                ? "border-b border-transparent"
                                : "border-b border-white/10"),
                            mobilePinActive &&
                              "max-lg:flex max-lg:min-h-[2.75rem] max-lg:flex-1",
                          )}
                        >
                          <div
                            className={cx(
                              "flex min-w-0 items-stretch",
                              mobilePinActive
                                ? "max-lg:h-full max-lg:items-center"
                                : isActive
                                  ? "py-2"
                                  : "py-4",
                            )}
                          >
                            {isActive ? (
                              <span
                                className={cx(
                                  "why-choose-badge flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white font-display text-xl font-bold text-brand-blue sm:h-[58px] sm:w-[58px] sm:text-2xl",
                                  mobilePinActive &&
                                    "max-lg:h-11 max-lg:w-11 max-lg:text-lg",
                                )}
                                aria-hidden
                              >
                                {tab.number}
                              </span>
                            ) : null}

                            <span
                              className={cx(
                                "flex min-w-0 flex-1 items-center font-display font-medium",
                                isActive
                                  ? "truncate rounded-r-full bg-white px-5 py-3.5 text-base font-semibold text-brand-navy max-lg:px-4 max-lg:py-2.5 sm:px-6 sm:py-4 sm:text-lg"
                                  : cx(
                                      "pl-1 text-base text-white/75 group-hover:text-white sm:text-lg",
                                      mobilePinActive &&
                                        "max-lg:text-sm max-lg:leading-snug",
                                    ),
                              )}
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
                  className={cx(
                    "relative z-10 flex items-stretch p-4 lg:absolute lg:inset-y-0 lg:right-0 lg:w-[42%] lg:items-center lg:p-6 xl:w-[40%]",
                    mobilePinActive &&
                      "max-lg:flex max-lg:min-h-0 max-lg:flex-1 max-lg:flex-col max-lg:overflow-hidden max-lg:p-3",
                  )}
                >
                  <div
                    key={safeIndex}
                    role="tabpanel"
                    id={`why-choose-panel-${safeIndex}`}
                    aria-labelledby={`why-choose-tab-${safeIndex}`}
                    className={cx(
                      "panel-fade-in flex w-full flex-col justify-center rounded-2xl bg-white px-6 py-8 shadow-lg sm:px-8 sm:py-10",
                      mobilePinActive &&
                        "max-lg:h-full max-lg:min-h-0 max-lg:flex-1 max-lg:justify-start max-lg:overflow-hidden max-lg:py-5",
                      desktopPinActive && "lg:min-h-[480px]",
                    )}
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
            tabCount={tabCount}
            setActiveIndex={setActiveIndex}
          />
        ) : null}
      </div>
    </section>
  );
}