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
    const measure = () => {
      const strip = stripRef.current;
      const viewport = strip?.parentElement;
      if (!strip || !viewport) return;
      setMaxTranslate(Math.max(0, strip.scrollWidth - viewport.clientWidth));
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [children, memberCount]);

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
    if (trackRef.current) {
      setReady(true);
      return;
    }
    setReady(false);
  }, [trackRef]);

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
