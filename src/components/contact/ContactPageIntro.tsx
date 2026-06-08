import { contactInfo } from "@/data/contact";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function ContactPageIntro() {
  return (
    <ScrollReveal>
      <header className="max-w-2xl">
        <span className="te-subtitle mb-3 inline-block rounded-full rounded-br-none border border-brand-blue/80 bg-brand-blue/[0.06] px-4 py-0.5 font-display text-[11px] font-bold uppercase tracking-wide text-brand-blue sm:text-xs sm:leading-[26px]">
          {contactInfo.eyebrow}
        </span>
        <h2 className="font-display text-[24px] font-semibold leading-tight text-brand-navy sm:text-[26px] md:text-[28px] md:leading-[34px]">
          {contactInfo.title}
        </h2>
        <p className="mt-3 font-body text-[15px] leading-relaxed text-brand-muted md:text-base md:leading-[26px]">
          {contactInfo.subtitle}
        </p>
      </header>
    </ScrollReveal>
  );
}
