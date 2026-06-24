import { marketingPages } from "@/data/marketing-pages/pages";
import { clientSegments } from "@/data/segments";

export const whoWeHelpPageBanner = {
  backgroundImage:
    "https://armstrong-cap.com/wp-content/uploads/2024/10/banner-min.jpg",
  title: "Who We Help",
} as const;

export const whoWeHelpIntro = {
  eyebrow: "Client Segments",
  title: "Guidance tailored to where you are in life",
  subtitle:
    "Whether you are starting out, planning for retirement, or navigating a major transition, Armstrong Capital offers research-driven advice shaped around your goals, timeline, and circumstances.",
} as const;

export const whoWeHelpSegments = clientSegments.map((segment) => {
  const slug = segment.href.slice(1);
  const config = marketingPages[slug as keyof typeof marketingPages];
  const hero =
    config && "hero" in config && config.hero ? config.hero : undefined;
  const image =
    hero && "image" in hero && hero.image
      ? hero.image
      : "https://armstrong-cap.com/wp-content/uploads/financial_planning.webp";

  return {
    label: segment.label,
    href: segment.href,
    title: hero?.title ?? segment.label,
    excerpt: hero?.paragraphs[0] ?? "",
    image,
  };
});
