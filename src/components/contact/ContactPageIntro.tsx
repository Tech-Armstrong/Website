import { contactInfo } from "@/data/contact";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function ContactPageIntro() {
  return (
    <ScrollReveal>
      <header className="max-w-2xl">
        <span className="te-subtitle mb-3 inline-block rounded-full rounded-br-none border border-brand-blue/80 bg-brand-blue/[0.06] px-4 py-0.5 font-display text-[11px] font-bold uppercase tracking-wide text-brand-blue sm:text-xs sm:leading-[26px]">
          {contactInfo.eyebrow}
        </span>
        <h1 className="font-display text-[clamp(2rem,4vw,2.75rem)] font-semibold leading-[1.1] text-brand-navy">
          {contactInfo.title}
        </h1>
        <p className="mt-3 font-body text-[15px] leading-relaxed text-brand-muted md:text-base md:leading-[26px]">
          {contactInfo.subtitle}
        </p>
      </header>
    </ScrollReveal>
  );
}
