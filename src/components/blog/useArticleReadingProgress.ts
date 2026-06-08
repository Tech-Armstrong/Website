"use client";

import { useEffect, useState, type RefObject } from "react";

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function getDocumentTop(element: Element): number {
  return element.getBoundingClientRect().top + window.scrollY;
}

function getDocumentBottom(element: Element): number {
  return element.getBoundingClientRect().bottom + window.scrollY;
}

export type ArticleReadingProgress = {
  progress: number;
  visible: boolean;
  headerBottom: number;
  trackLeft: number;
  trackWidth: number;
  percentRead: number;
  minutesLeft: number;
  remainingLabel: string;
};

export function useArticleReadingProgress(
  articleRef: RefObject<HTMLElement | null>,
  readingTimeMinutes: number,
): ArticleReadingProgress {
  const [state, setState] = useState({
    progress: 0,
    visible: false,
    headerBottom: 0,
    trackLeft: 0,
    trackWidth: 0,
  });

  useEffect(() => {
    let ticking = false;

    function updateProgress() {
      const article = articleRef.current;
      const header = document.querySelector("[data-header-shell]");
      const headerBottom = header?.getBoundingClientRect().bottom ?? 0;

      const track = document.querySelector<HTMLElement>("[data-blog-post-grid]");
      const trackRect = track?.getBoundingClientRect();
      const articleRect = article?.getBoundingClientRect();

      const trackLeft = trackRect?.left ?? articleRect?.left ?? 0;
      const trackWidth = trackRect?.width ?? articleRect?.width ?? 0;

      if (!article) {
        setState((prev) => ({
          ...prev,
          headerBottom,
          trackLeft,
          trackWidth,
        }));
        return;
      }

      const articleStart = getDocumentTop(article);

      const content = article.querySelector<HTMLElement>("[data-blog-content]");
      const articleEnd = content
        ? getDocumentBottom(content)
        : getDocumentBottom(article);

      const viewportBottom = window.scrollY + window.innerHeight;
      const trackLength = Math.max(articleEnd - articleStart, 1);

      let progress = ((viewportBottom - articleStart) / trackLength) * 100;

      if (viewportBottom >= articleEnd - 1) {
        progress = 100;
      }

      progress = clamp(progress, 0, 100);

      const visible =
        progress > 0 ||
        window.scrollY >= articleStart - window.innerHeight * 0.25;

      setState({
        progress,
        visible,
        headerBottom,
        trackLeft,
        trackWidth,
      });
    }

    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        updateProgress();
        ticking = false;
      });
    }

    updateProgress();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    const article = articleRef.current;
    const track = document.querySelector("[data-blog-post-grid]");
    const resizeObserver =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(onScroll)
        : null;

    if (resizeObserver) {
      if (article) resizeObserver.observe(article);
      if (track) resizeObserver.observe(track);
      const content = article?.querySelector("[data-blog-content]");
      if (content) resizeObserver.observe(content);
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      resizeObserver?.disconnect();
    };
  }, [articleRef]);

  const percentRead = Math.round(state.progress);
  const minutesLeft =
    state.progress >= 99.5
      ? 0
      : Math.max(0, Math.ceil(readingTimeMinutes * (1 - state.progress / 100)));
  const remainingLabel =
    minutesLeft === 0
      ? "Done"
      : minutesLeft === 1
        ? "~1 min left"
        : `~${minutesLeft} min left`;

  return {
    ...state,
    percentRead,
    minutesLeft,
    remainingLabel,
  };
}
