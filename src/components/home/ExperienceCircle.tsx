import Image from "next/image";
import { useId } from "react";
import { aboutSection } from "@/data/home";

export function ExperienceCircle() {
  const { image, ringText } = aboutSection;
  const ringPathId = useId().replace(/:/g, "");
  const ringLabel = ringText.join(" • ");

  return (
    <div className="relative mx-auto w-full max-w-[420px] lg:max-w-[480px]">
      <div className="relative aspect-square w-full">
        <svg
          className="absolute inset-0 h-full w-full"
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

        <div className="absolute inset-[14%] overflow-hidden rounded-full border border-[color:var(--brand-border)] bg-white shadow-[var(--elevation-panel)]">
          <Image
            src={image}
            alt="Balanced stones on a pebble beach"
            fill
            sizes="(max-width: 1024px) 320px, 380px"
            className="object-cover"
            priority
          />
        </div>
      </div>

      {/* Accessible text equivalent of the (decorative, aria-hidden) rotating ring */}
      <ul className="sr-only" aria-label="Experience highlights">
        {ringText.map((text) => (
          <li key={text}>{text}</li>
        ))}
      </ul>
    </div>
  );
}
