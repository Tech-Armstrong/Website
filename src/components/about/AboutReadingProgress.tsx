"use client";

import { useLayoutEffect, useState } from "react";

const TRACK_INSET_X = 12;

export function AboutReadingProgress() {
  const [{ progress, headerBottom, trackLeft, trackWidth }, setState] = useState({
    progress: 0,
    headerBottom: 0,
    trackLeft: 0,
    trackWidth: 0,
  });

  useLayoutEffect(() => {
    let ticking = false;

    const update = () => {
      const header = document.querySelector("[data-header-shell]");
      const shellRect = header?.getBoundingClientRect();
      const nextHeaderBottom = shellRect?.bottom ?? 0;
      const nextTrackLeft = (shellRect?.left ?? 0) + TRACK_INSET_X;
      const nextTrackWidth = Math.max(
        0,
        (shellRect?.width ?? 0) - TRACK_INSET_X * 2,
      );

      const max = document.documentElement.scrollHeight - window.innerHeight;
      const nextProgress =
        max > 0
          ? Math.min(100, Math.max(0, (window.scrollY / max) * 100))
          : 0;

      setState({
        progress: nextProgress,
        headerBottom: nextHeaderBottom,
        trackLeft: nextTrackLeft,
        trackWidth: nextTrackWidth,
      });
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        update();
        ticking = false;
      });
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    const header = document.querySelector("[data-header-shell]");
    const resizeObserver =
      typeof ResizeObserver !== "undefined" && header
        ? new ResizeObserver(onScroll)
        : null;
    if (header && resizeObserver) {
      resizeObserver.observe(header);
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      resizeObserver?.disconnect();
    };
  }, []);

  return (
    <>
      {trackWidth > 0 ? (
        <div
          className="pointer-events-none fixed z-[10000] h-[3px] overflow-hidden rounded-b-2xl bg-brand-blue/15 sm:rounded-b-[1.25rem]"
          style={{
            top: headerBottom,
            left: trackLeft,
            width: trackWidth,
          }}
          aria-hidden="true"
        >
          <div
            className="h-full bg-brand-blue transition-[width] duration-150 ease-out motion-reduce:transition-none"
            style={{ width: `${progress}%` }}
          />
        </div>
      ) : null}
      <div
        role="progressbar"
        aria-label="Page reading progress"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(progress)}
        className="sr-only"
      >
        {Math.round(progress)}% of page read
      </div>
    </>
  );
}
