import Image from "next/image";
import Link from "next/link";
import {
  footerAssets,
  footerSegments,
  footerServices,
} from "@/data/home";

function YoutubeIcon() {
  return (
    <svg viewBox="0 0 576 512" className="h-4 w-4 fill-current" aria-hidden>
      <path d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 448 512" className="h-4 w-4 fill-current" aria-hidden>
      <path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z" />
    </svg>
  );
}

const socialLinkClass =
  "flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-brand-blue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

const sectionTitleClass =
  "mb-4 font-display text-xl font-semibold leading-snug text-white";

export function Footer() {
  const { logo, ctaBackground } = footerAssets;

  return (
    <footer className="mt-12 overflow-visible bg-brand-dark pt-28 pb-10 text-white lg:mt-16 lg:pt-40">
      <div className="site-container px-4">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          {/* CTA card + social */}
          <div className="md:col-span-2 lg:col-span-5">
            <section
              aria-labelledby="footer-cta-heading"
              className="relative overflow-hidden rounded-[30px] rounded-br-none bg-cover bg-center px-8 py-16 shadow-xl lg:-mt-32"
              style={{ backgroundImage: `url(${ctaBackground})` }}
            >
              <div className="footer-cta-overlay absolute inset-0" aria-hidden />
              <div className="relative z-[1] text-center">
                <Image
                  src={logo}
                  alt="Armstrong Capital"
                  width={525}
                  height={150}
                  className="mx-auto mb-6 h-auto w-full max-w-[280px]"
                />
                <div className="mx-auto mb-6 h-[3px] w-16 bg-white" aria-hidden />
                <h2
                  id="footer-cta-heading"
                  className="font-display text-2xl font-semibold leading-[34px] text-white"
                >
                  Thinking &<br />
                  Planning for your<br />
                  Future
                </h2>
                <Link
                  href="/contact"
                  className="theme-btn btn-two mt-8 inline-block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  Appointment
                </Link>
              </div>
            </section>

            <div className="mt-8 lg:mt-10">
              <h3 className={sectionTitleClass}>Follow us on</h3>
              <div className="flex gap-3">
                <a
                  href="http://www.youtube.com/@ArmstrongCapital"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={socialLinkClass}
                  aria-label="YouTube"
                >
                  <YoutubeIcon />
                </a>
                <a
                  href="https://www.linkedin.com/company/armstrong-capital-advisory-pvt-ltd/posts/?feedView=all"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={socialLinkClass}
                  aria-label="LinkedIn"
                >
                  <LinkedInIcon />
                </a>
              </div>
            </div>
          </div>

          {/* Get in touch */}
          <div className="md:col-span-2 lg:col-span-3 lg:pl-2">
            <h3 className={sectionTitleClass}>Get in Touch</h3>
            <p className="footer-text mb-6 font-body text-[15px] leading-[26px]">
              Armstrong Capital &amp; Financial Services Pvt. Ltd.
              <br />
              AMFI Registration Number: ARN- 105949
              <br />
              ARN Validity – 09-Oct-2027
            </p>
            <h4 className="mb-3 font-display text-lg font-semibold text-white">
              Quick Contact
            </h4>
            <ul className="space-y-2 font-body text-base footer-text">
              <li>
                E :{" "}
                <a href="mailto:reachus@armstrong-cap.com" className="footer-link">
                  reachus@armstrong-cap.com
                </a>
              </li>
              <li>
                P :{" "}
                <a href="tel:+919739041588" className="footer-link">
                  +919739041588
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="lg:col-span-2">
            <h3 className={sectionTitleClass}>Services</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/blog" className="footer-link font-body text-base">
                  Blog
                </Link>
              </li>
              {footerServices.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="footer-link font-body text-base">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Segments */}
          <div className="lg:col-span-2">
            <h3 className={sectionTitleClass}>Segments</h3>
            <ul className="space-y-2">
              {footerSegments.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="footer-link font-body text-base">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-center md:flex-row md:text-left">
          <p className="footer-text font-body text-base">
            Copyright © 2026{" "}
            <Link href="/" className="footer-link">
              Armstrong.
            </Link>{" "}
            All Rights Reserved.
          </p>
          <ul className="flex flex-wrap justify-center gap-6 md:justify-end">
            <li>
              <span className="footer-text font-body text-base">
                Terms &amp; Conditions
              </span>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
