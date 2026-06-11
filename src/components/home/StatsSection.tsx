"use client";

import { homeStats } from "@/data/home";
import { CountUp } from "@/components/ui/CountUp";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function StatsSection() {
  return (
    <section
      className="border-t border-[#eef0f2] px-4 py-10 md:py-12 lg:py-14"
      aria-label="Company statistics"
    >
      <div className="site-container grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4 md:gap-8">
        {homeStats.map((stat, index) => (
          <ScrollReveal key={stat.label} delay={index * 80} direction="up">
            <div className="lift-card rounded-2xl bg-white px-4 py-6 text-center sm:px-5 sm:py-8">
              <p className="font-display text-4xl font-semibold tabular-nums leading-none text-brand-navy md:text-5xl lg:text-[52px]">
                <CountUp value={Number(stat.value)} />
                <span className="text-brand-blue">{stat.suffix}</span>
              </p>
              <p className="mt-3 font-body text-sm leading-snug text-balance text-brand-muted md:text-[15px]">
                {stat.label}
              </p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
