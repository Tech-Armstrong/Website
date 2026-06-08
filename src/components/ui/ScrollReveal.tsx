"use no memo";
"use client";

import { div as MotionDiv } from "framer-motion/client";
import { useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from "react";

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right" | "none";
};

const settleEase = [0.22, 1, 0.36, 1] as const;

const hiddenByDirection = {
  up: { opacity: 0, y: 28, x: 0 },
  left: { opacity: 0, x: -28, y: 0 },
  right: { opacity: 0, x: 28, y: 0 },
  none: { opacity: 0, x: 0, y: 0 },
} as const;

const visibleTarget = { opacity: 1, x: 0, y: 0 };

function subscribeReducedMotion(onStoreChange: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", onStoreChange);
  return () => mq.removeEventListener("change", onStoreChange);
}

function getReducedMotionSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function isInViewport(el: HTMLElement) {
  const rect = el.getBoundingClientRect();
  const viewHeight = window.innerHeight || document.documentElement.clientHeight;
  return rect.top < viewHeight * 0.92 && rect.bottom > 0;
}

export function ScrollReveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const reduceMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    () => false,
  );

  useEffect(() => {
    if (reduceMotion) {
      setVisible(true);
      return;
    }

    const el = ref.current;
    if (!el) return;

    let revealed = false;

    const reveal = () => {
      if (revealed) return;
      revealed = true;
      setVisible(true);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          reveal();
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );

    observer.observe(el);

    if (isInViewport(el)) {
      requestAnimationFrame(reveal);
    }

    return () => observer.disconnect();
  }, [reduceMotion]);

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  const hiddenTarget = hiddenByDirection[direction];
  const hiddenClass =
    !visible && direction === "up"
      ? "opacity-0 translate-y-7"
      : !visible && direction === "left"
        ? "opacity-0 -translate-x-7"
        : !visible && direction === "right"
          ? "opacity-0 translate-x-7"
          : !visible
            ? "opacity-0"
            : "";

  return (
    <MotionDiv
      ref={ref}
      className={`${hiddenClass} ${className}`.trim()}
      initial={false}
      animate={visible ? visibleTarget : hiddenTarget}
      transition={{
        duration: 0.65,
        delay: delay / 1000,
        ease: settleEase,
      }}
    >
      {children}
    </MotionDiv>
  );
}
