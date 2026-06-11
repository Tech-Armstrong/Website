import { aboutUsFeatures, aboutUsWhyChoose } from "@/data/about-us";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function AboutUsFeatures() {
  const { eyebrow, title, description } = aboutUsWhyChoose;

  return (
    <section
      className="border-t border-[#eef0f2] py-16 lg:py-20"
      aria-labelledby="about-us-features-heading"
    >
      <div className="site-container">
        <ScrollReveal>
          <SectionTitle
            eyebrow={eyebrow}
            title={title}
            headingId="about-us-features-heading"
            align="center"
            className="mx-auto mb-6 max-w-3xl"
          />
        </ScrollReveal>
        <ScrollReveal delay={80}>
          <p className="mx-auto mb-12 max-w-3xl text-center font-body text-base leading-relaxed text-brand-muted md:text-[17px] md:leading-[30px]">
            {description}
          </p>
        </ScrollReveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:gap-8">
          {aboutUsFeatures.map((feature, index) => (
            <ScrollReveal key={feature.number} delay={index * 60}>
              <article className="lift-card h-full rounded-2xl border border-[#e8eaed] bg-white p-6 shadow-sm sm:p-8">
                <span className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-blue/10 font-display text-sm font-bold text-brand-blue">
                  {feature.number}
                </span>
                <h3 className="mb-3 font-display text-xl font-semibold text-brand-navy">
                  {feature.title}
                </h3>
                <p className="font-body text-[15px] leading-relaxed text-brand-muted">
                  {feature.description}
                </p>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
