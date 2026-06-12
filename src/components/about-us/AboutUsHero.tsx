import Image from "next/image";
import { aboutUsHero } from "@/data/about-us";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function AboutUsHero() {
  const { title, paragraphs, images } = aboutUsHero;

  return (
    <section className="pb-16 lg:pb-20" aria-labelledby="about-us-hero-heading">
      <div className="site-container grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
        <ScrollReveal direction="left" className="relative mx-auto aspect-[4/5] w-full max-w-md lg:max-w-none">
          <div
            className="absolute -left-4 -top-4 h-[85%] w-[85%] bg-contain bg-left-top bg-no-repeat opacity-90 sm:-left-6 sm:-top-6"
            style={{ backgroundImage: `url(${images.shape})` }}
            aria-hidden
          />
          <div className="relative ml-auto h-full w-[78%]">
            <div className="relative z-10 mb-4 aspect-[4/5] w-[72%] overflow-hidden rounded-2xl shadow-lg">
              <Image
                src={images.primary}
                alt="Armstrong Capital team collaboration"
                fill
                sizes="(max-width: 1024px) 280px, 360px"
                className="object-cover"
                priority
              />
            </div>
            <div className="absolute bottom-0 right-0 z-20 aspect-square w-[55%] overflow-hidden rounded-2xl border-4 border-white shadow-xl">
              <Image
                src={images.secondary}
                alt="Professional financial advisory setting"
                fill
                sizes="(max-width: 1024px) 200px, 260px"
                className="object-cover"
              />
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal direction="right" delay={100}>
          <div>
            <h2
              id="about-us-hero-heading"
              className="font-display text-[28px] font-semibold leading-tight text-brand-navy sm:text-[32px] md:text-[36px] md:leading-[44px]"
            >
              {title}
            </h2>
            <div className="mt-6 space-y-5 font-body text-base leading-relaxed text-brand-muted md:text-[17px] md:leading-[30px]">
              {paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
