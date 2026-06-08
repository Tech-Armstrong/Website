"use client";

import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from "react";

type TeamScrollDriveProps = {
  trackRef: RefObject<HTMLDivElement | null>;
  memberCount: number;
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
  className?: string;
  children: ReactNode;
};

function TeamScrollStrip({
  trackRef,
  memberCount,
  setActiveIndex,
  className,
  children,
}: TeamScrollDriveProps) {
  const stripRef = useRef<HTMLDivElement>(null);
  const [maxTranslate, setMaxTranslate] = useState(0);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], [0, -maxTranslate]);

  useLayoutEffect(() => {
    const strip = stripRef.current;
    const viewport = strip?.parentElement;
    if (!strip || !viewport) return;

    const measure = () => {
      setMaxTranslate(Math.max(0, strip.scrollWidth - viewport.clientWidth));
    };

    measure();
    const observer = new ResizeObserver(() => {
      requestAnimationFrame(measure);
    });
    observer.observe(strip);
    observer.observe(viewport);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [memberCount]);

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    const index = Math.min(
      memberCount - 1,
      Math.max(0, Math.floor(progress * memberCount)),
    );
    setActiveIndex((prev) => (prev === index ? prev : index));
  });

  return (
    <motion.div ref={stripRef} style={{ x }} className={className}>
      {children}
    </motion.div>
  );
}

export function TeamScrollDriveGate({
  trackRef,
  memberCount,
  setActiveIndex,
  className,
  children,
}: TeamScrollDriveProps) {
  const [ready, setReady] = useState(false);

  useLayoutEffect(() => {
    let cancelled = false;
    let frameId = 0;

    const tryReady = () => {
      if (cancelled) return;
      if (trackRef.current) {
        setReady(true);
        return;
      }
      frameId = requestAnimationFrame(tryReady);
    };

    setReady(false);
    tryReady();

    return () => {
      cancelled = true;
      cancelAnimationFrame(frameId);
      setReady(false);
    };
  }, [trackRef, memberCount]);

  if (!ready) {
    return <div className={className}>{children}</div>;
  }

  return (
    <TeamScrollStrip
      trackRef={trackRef}
      memberCount={memberCount}
      setActiveIndex={setActiveIndex}
      className={className}
    >
      {children}
    </TeamScrollStrip>
  );
}
