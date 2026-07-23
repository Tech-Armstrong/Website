"use client";

import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import type { MarketingCareerSection } from "@/types/marketing-page";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { CareerApplyCta } from "./CareerApplyCta";

type MarketingCareerSectionsProps = {
  sections: MarketingCareerSection[];
  cta?: { label: string; href: string };
  ariaLabel?: string;
};

function SectionImageCarousel({
  images,
}: {
  images: NonNullable<MarketingCareerSection["images"]>;
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: true,
    slidesToScroll: 1,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollTo = useCallback(
    (index: number) => emblaApi?.scrollTo(index),
    [emblaApi],
  );

  useEffect(() => {
    if (!emblaApi) return;

    const update = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
      setScrollSnaps(emblaApi.scrollSnapList());
    };

    emblaApi.on("select", update);
    emblaApi.on("reInit", update);
    update();

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) {
      return () => {
        emblaApi.off("select", update);
        emblaApi.off("reInit", update);
      };
    }

    const interval = setInterval(() => emblaApi.scrollNext(), 3500);
    return () => {
      emblaApi.off("select", update);
      emblaApi.off("reInit", update);
      clearInterval(interval);
    };
  }, [emblaApi]);

  return (
    <div className="relative mx-auto aspect-[4/3] w-full max-w-lg overflow-hidden rounded-xl shadow-md lg:max-w-none">
      <div
        ref={emblaRef}
        className="h-full w-full overflow-hidden"
        aria-roledescription="carousel"
        aria-label="Section photos"
      >
        <div className="flex h-full">
          {images.map((image) => (
            <div
              key={image.src}
              className="relative min-w-0 flex-[0_0_100%]"
              role="group"
              aria-roledescription="slide"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brand-dark/30 to-transparent"
        aria-hidden
      />
      {scrollSnaps.length > 1 ? (
        <div
          className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-2"
          role="tablist"
          aria-label="Photo carousel pagination"
        >
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              type="button"
              role="tab"
              aria-selected={index === selectedIndex}
              aria-label={`Show photo ${index + 1}`}
              onClick={() => scrollTo(index)}
              className={`h-2 w-2 rounded-full transition-colors focus-settle ${
                index === selectedIndex
                  ? "bg-white"
                  : "bg-white/50 hover:bg-white/80"
              }`}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}

function SectionImages({
  images,
  imageLeft,
}: {
  images: NonNullable<MarketingCareerSection["images"]>;
  imageLeft: boolean;
}) {
  const direction = imageLeft ? "left" : "right";

  return (
    <ScrollReveal direction={direction}>
      {images.length === 1 ? (
        <div className="relative mx-auto aspect-[4/3] w-full max-w-lg overflow-hidden rounded-xl shadow-md lg:max-w-none">
          <Image
            src={images[0].src}
            alt={images[0].alt}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-brand-dark/30 to-transparent"
            aria-hidden
          />
        </div>
      ) : (
        <SectionImageCarousel images={images} />
      )}
    </ScrollReveal>
  );
}

function SectionCopy({
  section,
  headingId,
  delay,
  direction,
}: {
  section: MarketingCareerSection;
  headingId: string;
  delay: number;
  direction: "left" | "right" | "up";
}) {
  return (
    <ScrollReveal direction={direction} delay={delay}>
      <div>
        <h2
          id={headingId}
          className="font-display text-[clamp(1.5rem,3vw,2rem)] font-semibold leading-[1.15] text-brand-navy"
        >
          {section.title}
        </h2>
        <div className="mt-4 space-y-4 font-body text-base leading-relaxed text-brand-muted md:text-[17px] md:leading-[28px]">
          {section.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        {section.bullets?.length ? (
          <ul className="mt-4 list-disc space-y-2 pl-5 font-body text-[15px] leading-relaxed text-brand-muted md:text-base">
            {section.bullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>
        ) : null}
        {section.tagline ? (
          <p className="mt-4 font-body text-[15px] italic leading-relaxed text-brand-navy md:text-base">
            {section.tagline}
          </p>
        ) : null}
      </div>
    </ScrollReveal>
  );
}

export function MarketingCareerSections({
  sections,
  cta,
  ariaLabel = "Career opportunities",
}: MarketingCareerSectionsProps) {
  return (
    <section className="space-y-10 pb-6 pt-2 sm:space-y-14" aria-label={ariaLabel}>
      {sections.map((section, index) => {
        const images = section.images ?? [];
        const hasImages = images.length > 0;
        const imageLeft = index % 2 === 0;
        const headingId = `section-${section.title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")}`;

        if (!hasImages) {
          return (
            <article
              key={section.title}
              className="border-t border-[color:var(--brand-border)] pt-8"
            >
              <SectionCopy
                section={section}
                headingId={headingId}
                delay={index * 40}
                direction="up"
              />
            </article>
          );
        }

        return (
          <article
            key={section.title}
            className="border-t border-[color:var(--brand-border)] pt-8"
            aria-labelledby={headingId}
          >
            <div className="grid items-center gap-6 lg:grid-cols-2 lg:gap-8">
              {imageLeft ? (
                <>
                  <SectionImages images={images} imageLeft />
                  <SectionCopy
                    section={section}
                    headingId={headingId}
                    delay={80}
                    direction="right"
                  />
                </>
              ) : (
                <>
                  <SectionCopy
                    section={section}
                    headingId={headingId}
                    delay={0}
                    direction="left"
                  />
                  <SectionImages images={images} imageLeft={false} />
                </>
              )}
            </div>
          </article>
        );
      })}
      {cta ? <CareerApplyCta label={cta.label} href={cta.href} /> : null}
    </section>
  );
}
