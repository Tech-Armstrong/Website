import Image from "next/image";
import { aboutSection } from "@/data/home";

const RING_OFFSETS = ["4%", "27%", "52%", "75%"] as const;

export function ExperienceCircle() {
  const { image, years, ringText } = aboutSection;

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[420px] lg:max-w-[480px]">
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 420 420"
        aria-hidden
      >
        <defs>
          <path
            id="about-ring"
            d="M 210,32 A 178,178 0 1,1 209.5,32"
            fill="none"
          />
        </defs>
        {ringText.map((text, index) => (
          <text
            key={text}
            fill="currentColor"
            className="font-display text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-navy sm:text-[11px]"
          >
            <textPath href="#about-ring" startOffset={RING_OFFSETS[index]}>
              {text}
            </textPath>
          </text>
        ))}
      </svg>

      <div className="absolute inset-[14%] overflow-hidden rounded-full border border-[#d8dce3] bg-white shadow-[inset_0_0_0_1px_rgba(39,46,57,0.06)]">
        <Image
          src={image}
          alt="Balanced stones on a pebble beach"
          fill
          sizes="(max-width: 1024px) 320px, 380px"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center rounded-full bg-brand-navy/45 text-center text-white">
          <span className="font-display text-[56px] font-bold leading-none sm:text-[64px] lg:text-[72px]">
            {years}
          </span>
          <span className="mt-1 font-display text-[11px] font-semibold uppercase tracking-[0.18em] sm:text-xs">
            Years Experience
          </span>
        </div>
      </div>
    </div>
  );
}
