import Link from "next/link";
import { PRIMARY_CTA_LABEL } from "@/data/home";

export function SidebarCta() {
  return (
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
        {PRIMARY_CTA_LABEL}
      </Link>
    </div>
  );
}
