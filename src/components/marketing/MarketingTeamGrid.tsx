"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { useCallback, useLayoutEffect, useRef, useState, useSyncExternalStore } from "react";
import type { MarketingTeamMember } from "@/types/marketing-page";
import {
  TeamMemberCard,
  TeamMemberModal,
} from "@/components/marketing/TeamMemberCard";

const TeamScrollDriveGate = dynamic(
  () =>
    import("./TeamScrollDrive").then((mod) => mod.TeamScrollDriveGate),
  { ssr: false },
);

/** Fixed scroll runway — same scale as Why Choose (400vh), not per-member 100vh. */
const TEAM_SCROLL_TRACK_VH = 400;

type MarketingTeamGridProps = {
  members: MarketingTeamMember[];
};

function subscribeReducedMotion(onStoreChange: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", onStoreChange);
  return () => mq.removeEventListener("change", onStoreChange);
}

function getReducedMotionSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function TeamDotNav({
  members,
  activeIndex,
  onSelect,
}: {
  members: MarketingTeamMember[];
  activeIndex: number;
  onSelect: (index: number) => void;
}) {
  return (
    <div
      className="mt-4 flex flex-wrap justify-center gap-2 lg:mt-6"
      role="tablist"
      aria-label="Team member navigation"
    >
      {members.map((member, index) => (
        <button
          key={member.name}
          type="button"
          role="tab"
          aria-selected={index === activeIndex}
          aria-controls={`team-carousel-panel-${index}`}
          onClick={() => onSelect(index)}
          className={`team-scroll-dot focus-settle h-2.5 w-2.5 rounded-full transition-colors ${
            index === activeIndex ? "is-active" : ""
          }`}
        >
          <span className="sr-only">{member.name}</span>
        </button>
      ))}
    </div>
  );
}

export function MarketingTeamGrid({ members }: MarketingTeamGridProps) {
  const [activeMember, setActiveMember] = useState<MarketingTeamMember | null>(
    null,
  );
  const [activeIndex, setActiveIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const carouselContentRef = useRef<HTMLDivElement>(null);

  const reduceMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    () => false,
  );
  const pinActive = !reduceMotion;
  const pathname = usePathname();

  useLayoutEffect(() => {
    if (!pinActive) return;
    const content = carouselContentRef.current;
    if (!content) return;

    const updateSlideWidth = () => {
      const contentW = content.clientWidth;
      if (contentW <= 0) return;

      const isLg = window.matchMedia("(min-width: 1024px)").matches;
      const isXl = window.matchMedia("(min-width: 1280px)").matches;
      const gapPx = isLg ? 24 : 16;

      let slidePx: number;
      if (!isLg) {
        slidePx = Math.min(window.innerWidth * 0.85, 360);
      } else {
        const cols = isXl ? 4 : 3;
        const gapCount = cols - 1;
        slidePx = (contentW - gapCount * gapPx) / cols;
      }

      content.style.setProperty("--team-slide-w", `${Math.floor(slidePx)}px`);
      window.dispatchEvent(new Event("resize"));
    };

    updateSlideWidth();
    const observer = new ResizeObserver(() => {
      requestAnimationFrame(updateSlideWidth);
    });
    observer.observe(content);
    window.addEventListener("resize", updateSlideWidth);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateSlideWidth);
    };
  }, [pinActive]);

  const closeModal = useCallback(() => setActiveMember(null), []);
  const openModal = useCallback(
    (member: MarketingTeamMember) => setActiveMember(member),
    [],
  );

  function scrollToMember(index: number) {
    const track = trackRef.current;
    if (!track) return;
    const headerPx = window.matchMedia("(min-width: 1024px)").matches
      ? 128
      : 112;
    const distance = track.offsetHeight - (window.innerHeight - headerPx);
    const progress = (index + 0.5) / members.length;
    window.scrollTo({
      top: track.offsetTop + progress * distance,
      behavior: "smooth",
    });
  }

  return (
    <section
      ref={sectionRef}
      className="border-t border-[color:var(--brand-border)] pt-10 pb-12 lg:pt-12 lg:pb-16"
      aria-label="Our team"
    >
      {pinActive ? (
        <div
          ref={trackRef}
          className="scroll-mt-[var(--site-header-offset)]"
          style={{ height: `${TEAM_SCROLL_TRACK_VH}vh` }}
        >
          <div className="sticky top-[var(--site-header-offset)] flex h-[calc(100dvh-var(--site-header-offset))] w-full flex-col pt-8 pb-6 lg:pt-12 lg:pb-8">
            <div className="flex min-h-0 flex-1 flex-col justify-center">
              <div
                ref={carouselRef}
                className="mt-12 mb-10 w-full overflow-x-clip py-2 lg:mt-16 lg:mb-12"
                aria-roledescription="carousel"
                aria-label="Team members"
              >
                <div
                  ref={carouselContentRef}
                  className="w-full [--team-slide-w:min(85vw,360px)]"
                >
                  <TeamScrollDriveGate
                    key={`${pathname}-team-scroll`}
                    trackRef={trackRef}
                    memberCount={members.length}
                    setActiveIndex={setActiveIndex}
                    className="flex w-max min-w-full gap-4 px-4 sm:gap-5 lg:gap-6 lg:px-0"
                  >
                    {members.map((member, index) => (
                      <div
                        key={member.name}
                        id={`team-carousel-panel-${index}`}
                        role="tabpanel"
                        aria-labelledby={`team-dot-${index}`}
                        aria-hidden={index !== activeIndex}
                        className="w-[var(--team-slide-w)] shrink-0"
                      >
                        <TeamMemberCard member={member} onReadMore={openModal} />
                      </div>
                    ))}
                  </TeamScrollDriveGate>
                </div>
              </div>
              <TeamDotNav
                members={members}
                activeIndex={activeIndex}
                onSelect={scrollToMember}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6 xl:grid-cols-4">
          {members.map((member) => (
            <TeamMemberCard
              key={member.name}
              member={member}
              onReadMore={openModal}
            />
          ))}
        </div>
      )}

      {activeMember ? (
        <TeamMemberModal member={activeMember} onClose={closeModal} />
      ) : null}
    </section>
  );
}
