import Image from "next/image";
import type { MarketingHero as MarketingHeroData } from "@/types/marketing-page";

type MarketingHeroProps = {
  hero: MarketingHeroData;
  headingId: string;
};

export function MarketingHero({ hero, headingId }: MarketingHeroProps) {
  const { title, paragraphs, image } = hero;

  return (
    <section className="pb-8" aria-labelledby={headingId}>
      <div
        className={`grid items-center gap-6 ${image ? "lg:grid-cols-2 lg:gap-8" : ""}`}
      >
        {image ? (
          <div className="relative mx-auto aspect-[4/3] w-full max-w-lg overflow-hidden rounded-xl shadow-md lg:max-w-none">
            <Image
              src={image}
              alt=""
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              priority
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-brand-dark/30 to-transparent"
              aria-hidden
            />
          </div>
        ) : null}

        <div className={image ? "" : "max-w-3xl"}>
          <h2
            id={headingId}
            className="font-display text-[26px] font-semibold leading-tight text-brand-navy sm:text-[28px] md:text-[30px] md:leading-[38px]"
          >
            {title}
          </h2>
          <div className="mt-4 space-y-4 font-body text-base leading-relaxed text-brand-muted md:text-[17px] md:leading-[28px]">
            {paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
