"use client";

import { formatReadingTime } from "@/lib/blog/reading-time";
import { useBlogPostReading } from "./BlogPostReadingContext";

export function ReadingProgressBar() {
  const {
    progress,
    visible,
    headerBottom,
    trackLeft,
    trackWidth,
    percentRead,
    minutesLeft,
  } = useBlogPostReading();

  if (!visible || trackWidth <= 0) return null;

  return (
    <>
      <div
        className="pointer-events-none fixed z-[9998] h-[3px] bg-brand-surface"
        style={{
          top: headerBottom,
          left: trackLeft,
          width: trackWidth,
        }}
        aria-hidden="true"
      >
        <div
          className="h-full bg-brand-blue transition-[width] duration-150 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div
        role="progressbar"
        aria-label="Reading progress"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={percentRead}
        className="sr-only"
      >
        {percentRead}% read
        {minutesLeft > 0
          ? `, ${formatReadingTime(minutesLeft)} remaining`
          : ", finished"}
      </div>
    </>
  );
}
