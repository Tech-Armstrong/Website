"use client";

import { useScroll, useMotionValueEvent } from "framer-motion";
import { useLayoutEffect, useState, type RefObject } from "react";

type WhyChooseScrollDriveProps = {
  trackRef: RefObject<HTMLDivElement | null>;
  tabCount: number;
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
};

export function WhyChooseScrollDrive({
  trackRef,
  tabCount,
  setActiveIndex,
}: WhyChooseScrollDriveProps) {
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const i = Math.min(tabCount - 1, Math.max(0, Math.floor(p * tabCount)));
    setActiveIndex((prev) => (prev === i ? prev : i));
  });

  return null;
}

/** Gate mount until trackRef is hydrated — avoids motion useScroll invariant. */
export function WhyChooseScrollDriveGate({
  trackRef,
  tabCount,
  setActiveIndex,
}: WhyChooseScrollDriveProps) {
  const [ready, setReady] = useState(false);

  useLayoutEffect(() => {
    if (trackRef.current) {
      setReady(true);
      return;
    }
    setReady(false);
  }, [trackRef]);

  if (!ready) return null;

  return (
    <WhyChooseScrollDrive
      trackRef={trackRef}
      tabCount={tabCount}
      setActiveIndex={setActiveIndex}
    />
  );
}
