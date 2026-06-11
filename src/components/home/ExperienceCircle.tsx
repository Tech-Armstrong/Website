import Image from "next/image";
import { useId } from "react";
import { aboutSection } from "@/data/home";

export function ExperienceCircle() {
  const { image, years, ringText } = aboutSection;
  const ringPathId = useId().replace(/:/g, "");
  const ringLabel = ringText.join(" • ");

  return (
    <div className="relative mx-auto w-full max-w-[420px] lg:max-w-[480px]">
      <div className="relative aspect-square w-full">
        <svg
          className="absolute inset-0 hidden h-full w-full lg:block"
          viewBox="0 0 420 420"
          aria-hidden
        >
          <circle
            cx="210"
            cy="210"
            r="198"
            fill="none"
            stroke="currentColor"
            className="text-brand-blue/15"
            strokeWidth="1"
          />
          <defs>
            <path
              id={ringPathId}
              d="M 210,32 A 178,178 0 1,1 209.5,32"
              fill="none"
            />
          </defs>
          <g className="about-ring-spin" style={{ transformOrigin: "210px 210px" }}>
            <text
              fill="currentColor"
              className="font-display text-[10px] font-semibold uppercase tracking-[0.22em] text-brand-navy"
            >
              <textPath href={`#${ringPathId}`} startOffset="0%">
                {ringLabel}
              </textPath>
            </text>
          </g>
        </svg>

        <div className="absolute inset-[14%] overflow-hidden rounded-full border border-[#e8eaed] bg-white shadow-[var(--elevation-panel)]">
          <Image
            src={image}
            alt="Balanced stones on a pebble beach"
            fill
            sizes="(max-width: 1024px) 320px, 380px"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center rounded-full bg-brand-navy/40 text-center text-white">
            <span className="font-display text-[56px] font-bold leading-none sm:text-[64px] lg:text-[72px]">
              {years}
            </span>
            <span className="mt-1 font-display text-[11px] font-semibold uppercase tracking-[0.18em] sm:text-xs">
              Years Experience
            </span>
          </div>
        </div>
      </div>

      <ul
        className="about-ring-static mt-6 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:hidden"
        aria-label="Experience highlights"
      >
        {ringText.map((text) => (
          <li
            key={text}
            className="lift-card rounded-lg border border-[#e8eaed] bg-brand-surface/80 px-3 py-2 font-display text-[11px] font-semibold uppercase tracking-wide text-brand-navy"
          >
            {text}
          </li>
        ))}
      </ul>
    </div>
  );
}
