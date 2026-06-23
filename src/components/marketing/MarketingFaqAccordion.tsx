"use client";

import { useState } from "react";
import type { MarketingFaqItem } from "@/types/marketing-page";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

type MarketingFaqAccordionProps = {
  faqs: MarketingFaqItem[];
};

export function MarketingFaqAccordion({ faqs }: MarketingFaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="pt-6 pb-2" aria-label="Frequently asked questions">
      <div className="space-y-3">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;

          return (
            <ScrollReveal key={faq.question} delay={index * 50}>
            <div
              className="overflow-hidden rounded-xl border border-[color:var(--brand-border)] bg-white shadow-sm"
            >
              <button
                type="button"
                className="focus-settle flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-display text-base font-semibold text-brand-navy transition-colors hover:text-brand-blue"
                aria-expanded={isOpen}
                onClick={() => setOpenIndex(isOpen ? null : index)}
              >
                <span>{faq.question}</span>
                <span className="shrink-0 text-brand-blue" aria-hidden>
                  {isOpen ? "−" : "+"}
                </span>
              </button>
              <div className={`faq-answer-grid ${isOpen ? "is-open" : ""}`}>
                <div className="faq-answer-inner">
                  <div className="border-t border-[color:var(--brand-border)] px-5 py-4 font-body text-[15px] leading-relaxed text-brand-muted">
                    {faq.answer}
                  </div>
                </div>
              </div>
            </div>
            </ScrollReveal>
          );
        })}
      </div>
    </section>
  );
}
