import { homeStats } from "@/data/home";

export function StatsSection() {
  return (
    <section
      className="home-section !pt-0 border-t border-[#eef0f2] bg-white"
      aria-label="Company statistics"
    >
      <div className="site-container grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4 md:gap-8">
        {homeStats.map((stat) => (
          <div key={stat.label} className="text-center">
            <p className="font-display text-4xl font-semibold leading-none text-brand-navy md:text-5xl lg:text-[56px]">
              {stat.value}
              <span className="text-brand-blue">{stat.suffix}</span>
            </p>
            <p className="mt-3 font-body text-sm leading-snug text-brand-muted md:text-[15px]">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
