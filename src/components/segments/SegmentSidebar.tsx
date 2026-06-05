import Link from "next/link";
import { footerSegments, footerServices } from "@/data/home";

type SegmentSidebarProps = {
  activeSlug: string;
};

export function SegmentSidebar({ activeSlug }: SegmentSidebarProps) {
  return (
    <aside className="space-y-4 lg:sticky lg:top-32 lg:self-start">
      <nav
        className="rounded-xl border border-[#e8eaed] bg-white p-5 shadow-sm"
        aria-label="Client segments"
      >
        <h2 className="mb-3 font-display text-base font-semibold text-brand-navy">
          Client Segments
        </h2>
        <ul className="space-y-0.5">
          {footerSegments.map((segment) => {
            const isActive = segment.href === `/${activeSlug}`;

            return (
              <li key={segment.href}>
                <Link
                  href={segment.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`block rounded-lg px-3 py-2 font-body text-sm transition-colors ${
                    isActive
                      ? "bg-brand-blue/10 font-semibold text-brand-blue"
                      : "text-brand-navy hover:bg-brand-surface hover:text-brand-blue"
                  }`}
                >
                  {segment.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <nav
        className="rounded-xl border border-[#e8eaed] bg-white p-5 shadow-sm"
        aria-label="Related services"
      >
        <h2 className="mb-3 font-display text-base font-semibold text-brand-navy">
          Our Services
        </h2>
        <ul className="space-y-0.5">
          {footerServices.map((service) => (
            <li key={service.href}>
              <Link
                href={service.href}
                className="block rounded-lg px-3 py-2 font-body text-sm text-brand-navy transition-colors hover:bg-brand-surface hover:text-brand-blue"
              >
                {service.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="rounded-xl bg-brand-blue p-5 text-white shadow-sm">
        <h2 className="font-display text-base font-semibold">
          Ready to get started?
        </h2>
        <p className="mt-1.5 font-body text-sm leading-relaxed text-white/85">
          Speak with our advisors and build a financial plan tailored to your
          goals.
        </p>
        <Link
          href="/contact"
          className="mt-4 inline-block rounded-full bg-white px-5 py-2 font-display text-sm font-semibold text-brand-blue transition-colors hover:bg-brand-surface"
        >
          Contact Us
        </Link>
      </div>
    </aside>
  );
}
