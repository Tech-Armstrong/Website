import { aboutUsFeatures, aboutUsWhyChoose } from "@/data/about-us";
import { SectionTitle } from "@/components/ui/SectionTitle";

export function AboutUsFeatures() {
  const { eyebrow, title, description } = aboutUsWhyChoose;

  return (
    <section
      className="border-t border-[#eef0f2] bg-brand-surface py-16 lg:py-20"
      aria-labelledby="about-us-features-heading"
    >
      <div className="site-container">
        <SectionTitle
          eyebrow={eyebrow}
          title={title}
          headingId="about-us-features-heading"
          align="center"
          className="mx-auto mb-6 max-w-3xl"
        />
        <p className="mx-auto mb-12 max-w-3xl text-center font-body text-base leading-relaxed text-brand-muted md:text-[17px] md:leading-[30px]">
          {description}
        </p>

        <div className="grid gap-6 sm:grid-cols-2 lg:gap-8">
          {aboutUsFeatures.map((feature) => (
            <article
              key={feature.number}
              className="rounded-2xl border border-[#e8eaed] bg-white p-6 shadow-sm transition-shadow hover:shadow-md sm:p-8"
            >
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
          ))}
        </div>
      </div>
    </section>
  );
}
