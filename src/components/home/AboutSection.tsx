import Link from "next/link";
import { aboutSection } from "@/data/home";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ExperienceCircle } from "./ExperienceCircle";

export function AboutSection() {
  const { eyebrow, title, description, ctaLabel, ctaHref } = aboutSection;

  return (
    <section className="bg-white px-4 py-20 lg:py-24" aria-labelledby="about-heading">
      <div className="mx-auto grid max-w-[1200px] items-center gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20">
        <ExperienceCircle />

        <div>
          <SectionTitle
            eyebrow={eyebrow}
            title={title}
            headingId="about-heading"
            className="mb-8 [&_h2]:text-[28px] [&_h2]:leading-[36px] md:[&_h2]:text-[32px] md:[&_h2]:leading-[42px]"
          />

          <p className="mb-10 font-body text-base leading-[28px] text-brand-muted md:text-[17px] md:leading-[30px]">
            {description}
          </p>

          <Link href={ctaHref} className="theme-btn btn-two inline-block">
            {ctaLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
