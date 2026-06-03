import { homeStats } from "@/data/home";

export function StatsSection() {
  return (
    <section className="bg-white px-4 pb-20 lg:pb-24" aria-label="Company statistics">
      <div className="mx-auto grid max-w-[1200px] grid-cols-2 gap-8 md:grid-cols-4 md:gap-6">
        {homeStats.map((stat) => (
          <div key={stat.label} className="text-center">
            <p className="font-display text-[40px] font-light leading-none text-[#c5cad1] md:text-[48px] lg:text-[56px]">
              {stat.value}
              <span className="text-[32px] md:text-[40px]">{stat.suffix}</span>
            </p>
            <p className="mt-3 font-body text-sm text-brand-muted md:text-[15px]">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
