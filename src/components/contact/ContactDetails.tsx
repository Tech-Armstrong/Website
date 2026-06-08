import { contactInfo } from "@/data/contact";
import { buildMapSearchUrl } from "@/lib/google/embed";

export function ContactDetails() {
  return (
    <section
      className="rounded-xl border border-[#e8eaed] bg-white p-4 md:p-5"
      aria-labelledby="contact-details-heading"
    >
      <p className="font-display text-xs font-bold uppercase tracking-wide text-brand-blue">
        {contactInfo.eyebrow}
      </p>
      <h2
        id="contact-details-heading"
        className="mt-2 font-display text-[22px] font-semibold leading-tight text-brand-navy sm:text-[24px]"
      >
        {contactInfo.title}
      </h2>
      <p className="mt-2 font-body text-[15px] leading-[24px] text-brand-muted">
        {contactInfo.subtitle}
      </p>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        {contactInfo.phones.map((phone) => (
          <div key={phone.label}>
            <p className="font-display text-xs font-bold uppercase tracking-wide text-brand-muted">
              {phone.label}
            </p>
            <a
              href={phone.href}
              className="mt-1 inline-block font-body text-[15px] font-medium text-brand-blue transition-colors hover:text-brand-navy"
              {...(phone.href.startsWith("http")
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
            >
              {phone.display}
            </a>
          </div>
        ))}

        <div>
          <p className="font-display text-xs font-bold uppercase tracking-wide text-brand-muted">
            {contactInfo.email.label}
          </p>
          <a
            href={contactInfo.email.href}
            className="mt-1 inline-block font-body text-[15px] font-medium text-brand-blue transition-colors hover:text-brand-navy"
          >
            {contactInfo.email.display}
          </a>
        </div>
      </div>

      <div className="mt-6 border-t border-[#eef0f2] pt-5">
        <p className="font-display text-xs font-bold uppercase tracking-wide text-brand-blue">
          {contactInfo.addressTitle}
        </p>
        <p className="mt-1 font-body text-sm text-brand-muted">
          {contactInfo.addressSubtitle}
        </p>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {contactInfo.offices.map((office) => (
            <div
              key={office.id}
              className="rounded-lg border border-[#eef0f2] bg-brand-surface/60 p-3"
            >
              <p className="font-display text-sm font-semibold text-brand-navy">
                {office.label}
              </p>
              <p className="mt-1 font-body text-sm leading-relaxed text-brand-muted">
                {office.address}
              </p>
              <a
                href={buildMapSearchUrl(office.address)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-1 font-display text-sm font-semibold text-brand-blue transition-colors hover:text-brand-navy"
              >
                View on Google Maps
                <span aria-hidden="true">→</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
