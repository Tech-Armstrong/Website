import { contactInfo } from "@/data/contact";
import { buildMapSearchUrl } from "@/lib/google/embed";

const cardClass =
  "lift-card flex h-full flex-col rounded-xl border border-[#e8eaed] bg-white p-4";

export function ContactInfoCards() {
  const [headOffice, branchOffice] = contactInfo.offices;

  return (
    <section
      className="grid gap-4 md:grid-cols-3"
      aria-label="Contact information"
    >
      <article className={cardClass}>
        <h3 className="font-display text-lg font-semibold text-brand-navy">
          {contactInfo.eyebrow}
        </h3>
        <ul className="mt-3 space-y-3">
          {contactInfo.phones.map((phone) => (
            <li key={phone.label}>
              <p className="font-display text-xs font-bold uppercase tracking-wide text-brand-muted">
                {phone.label}
              </p>
              <a
                href={phone.href}
                className="focus-settle mt-1 inline-block rounded-md font-body text-sm font-medium text-brand-blue transition-colors hover:text-brand-navy"
                {...(phone.href.startsWith("http")
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
              >
                {phone.display}
              </a>
            </li>
          ))}
          <li>
            <p className="font-display text-xs font-bold uppercase tracking-wide text-brand-muted">
              {contactInfo.email.label}
            </p>
            <a
              href={contactInfo.email.href}
              className="focus-settle mt-1 inline-block rounded-md font-body text-sm font-medium text-brand-blue transition-colors hover:text-brand-navy"
            >
              {contactInfo.email.display}
            </a>
          </li>
        </ul>
      </article>

      {[headOffice, branchOffice].map((office) => (
        <article key={office.id} className={cardClass}>
          <h3 className="font-display text-lg font-semibold text-brand-navy">
            {office.label}
          </h3>
          <p className="mt-3 flex-1 font-body text-sm leading-relaxed text-brand-muted">
            {office.address}
          </p>
          <a
            href={buildMapSearchUrl(office.address)}
            target="_blank"
            rel="noopener noreferrer"
            className="focus-settle mt-3 inline-flex items-center gap-1 rounded-md font-display text-sm font-semibold text-brand-blue transition-colors hover:text-brand-navy"
          >
            View on Google Maps
            <span aria-hidden="true">→</span>
          </a>
        </article>
      ))}
    </section>
  );
}
