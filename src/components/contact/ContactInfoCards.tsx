"use client";

import { contactInfo } from "@/data/contact";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import type { ReactNode, SVGProps } from "react";

const eyebrowClass =
  "te-subtitle mb-2 inline-block rounded-full rounded-br-none border border-brand-blue/80 bg-brand-blue/[0.06] px-3 py-0.5 font-display text-[11px] font-bold uppercase tracking-wide text-brand-blue sm:text-xs sm:leading-[26px]";

const contactRowClass =
  "rounded-lg bg-[#f8f9fb] px-3.5 py-3 transition-colors hover:bg-brand-blue/[0.06]";

const linkClass =
  "focus-settle mt-1 inline-flex min-h-11 items-center rounded-md font-body text-sm font-medium text-brand-blue transition-colors hover:text-brand-navy";

function buildMapSearchUrl(address: string): string {
  const url = new URL("https://www.google.com/maps/search/");
  url.searchParams.set("api", "1");
  url.searchParams.set("query", address);
  return url.toString();
}

type ContactCardShellProps = {
  children: ReactNode;
  delay: number;
};

function ContactCardShell({ children, delay }: ContactCardShellProps) {
  return (
    <ScrollReveal delay={delay}>
      <article className="lift-card flex h-full flex-col rounded-xl border border-[#e8eaed] bg-white p-5 sm:p-6">
        {children}
      </article>
    </ScrollReveal>
  );
}

type ContactCardHeaderProps = {
  icon: ReactNode;
  eyebrow: string;
  title: string;
};

function ContactCardHeader({ icon, eyebrow, title }: ContactCardHeaderProps) {
  return (
    <header className="mb-4">
      <span className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-lg rounded-br-none bg-brand-blue/10 text-brand-blue">
        {icon}
      </span>
      <span className={eyebrowClass}>{eyebrow}</span>
      <h3 className="font-display text-lg font-semibold text-brand-navy">{title}</h3>
    </header>
  );
}

type ContactRowProps = {
  icon: ReactNode;
  label: string;
  href: string;
  display: string;
  external?: boolean;
};

function ContactRow({ icon, label, href, display, external }: ContactRowProps) {
  return (
    <li>
      <div className={contactRowClass}>
        <div className="flex items-start gap-3">
          <span className="mt-0.5 shrink-0 text-brand-blue" aria-hidden="true">
            {icon}
          </span>
          <div className="min-w-0">
            <p className="font-display text-xs font-bold uppercase tracking-wide text-brand-muted">
              {label}
            </p>
            <a
              href={href}
              className={linkClass}
              {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
              {display}
            </a>
          </div>
        </div>
      </div>
    </li>
  );
}

function phoneIconForLabel(label: string) {
  if (label.toLowerCase().includes("whatsapp")) {
    return <WhatsAppIcon className="h-4 w-4" />;
  }
  return <PhoneIcon className="h-4 w-4" />;
}

export function ContactInfoCards() {
  const [headOffice, branchOffice] = contactInfo.offices;

  const offices = [
    { office: headOffice, eyebrow: "Visit us", icon: <BuildingIcon className="h-4 w-4" /> },
    { office: branchOffice, eyebrow: "Visit us", icon: <MapPinIcon className="h-4 w-4" /> },
  ];

  return (
    <section
      className="grid gap-5 md:grid-cols-3 md:gap-6"
      aria-label="Contact information"
    >
      <ContactCardShell delay={0}>
        <ContactCardHeader
          icon={<PhoneIcon className="h-4 w-4" />}
          eyebrow="Reach us"
          title={contactInfo.eyebrow}
        />
        <ul className="space-y-2.5">
          {contactInfo.phones.map((phone) => (
            <ContactRow
              key={phone.label}
              icon={phoneIconForLabel(phone.label)}
              label={phone.label}
              href={phone.href}
              display={phone.display}
              external={phone.href.startsWith("http")}
            />
          ))}
          <ContactRow
            icon={<MailIcon className="h-4 w-4" />}
            label={contactInfo.email.label}
            href={contactInfo.email.href}
            display={contactInfo.email.display}
          />
        </ul>
      </ContactCardShell>

      {offices.map(({ office, eyebrow, icon }, index) => (
        <ContactCardShell key={office.id} delay={(index + 1) * 60}>
          <ContactCardHeader icon={icon} eyebrow={eyebrow} title={office.label} />
          <div className="flex flex-1 flex-col">
            <div className="flex-1 rounded-lg rounded-br-none border border-[#e8eaed] border-l-[3px] border-l-brand-blue bg-[#fafbfc] p-4">
              <p className="font-body text-sm leading-relaxed text-brand-muted">
                {office.address}
              </p>
            </div>
            <a
              href={buildMapSearchUrl(office.address)}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-settle mt-4 inline-flex min-h-11 items-center gap-1.5 self-start rounded-lg border border-brand-blue/25 bg-brand-blue/[0.06] px-3 py-2 font-display text-sm font-semibold text-brand-blue transition-colors hover:border-brand-blue/40 hover:bg-brand-blue/10 hover:text-brand-navy"
            >
              View on Google Maps
              <ExternalLinkIcon className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </div>
        </ContactCardShell>
      ))}
    </section>
  );
}

function PhoneIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
      />
    </svg>
  );
}

function WhatsAppIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function MailIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
    </svg>
  );
}

function BuildingIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
      />
    </svg>
  );
}

function MapPinIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
      />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

function ExternalLinkIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
    </svg>
  );
}
