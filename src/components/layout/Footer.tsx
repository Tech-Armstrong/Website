import Image from "next/image";
import Link from "next/link";
import {
  footerSegments,
  footerServices,
} from "@/data/home";

const LOGO =
  "https://armstrong-cap.com/wp-content/uploads/Group-1707483555-1024x292.png";
const CTA_BG =
  "https://armstrong-cap.com/wp-content/uploads/coffee_banner-1.webp";

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

export function Footer() {
  return (
    <footer className="mt-[50px] bg-brand-dark pt-20 pb-8 text-white">
      <div className="mx-auto max-w-[1200px] px-4">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-6">
          {/* CTA card */}
          <div className="lg:col-span-5">
            <div
              className="relative -mt-[150px] overflow-hidden rounded-[30px] rounded-br-none bg-cover bg-center px-[30px] py-20"
              style={{ backgroundImage: `url(${CTA_BG})` }}
            >
              <div className="absolute inset-0 bg-black/50" />
              <div className="relative z-[1] text-center">
                <Image
                  src={LOGO}
                  alt="Armstrong Capital"
                  width={525}
                  height={150}
                  className="mx-auto mb-6 h-auto w-full max-w-[280px]"
                />
                <div className="mx-auto mb-6 h-[3px] w-16 bg-white" />
                <h2 className="font-display text-2xl font-semibold leading-[34px] text-white">
                  Thinking &<br />
                  Planning for your<br />
                  Future
                </h2>
                <Link
                  href="/contact"
                  className="theme-btn btn-two mt-8 inline-block"
                >
                  Appointment
                </Link>
              </div>
            </div>

            <div className="mt-8 lg:mt-10">
              <h3 className="mb-4 font-display text-2xl font-semibold leading-[34px]">
                Follow us on
              </h3>
              <div className="flex gap-3">
                <a
                  href="http://www.youtube.com/@ArmstrongCapital"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-brand-blue"
                  aria-label="YouTube"
                >
                  <YoutubeIcon />
                </a>
                <a
                  href="https://www.linkedin.com/company/armstrong-capital-advisory-pvt-ltd/posts/?feedView=all"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-brand-blue"
                  aria-label="LinkedIn"
                >
                  <LinkedInIcon />
                </a>
              </div>
            </div>
          </div>

          {/* Get in touch */}
          <div className="lg:col-span-3 lg:pl-4">
            <h3 className="mb-4 font-display text-2xl font-semibold leading-[34px]">
              Get in Touch
            </h3>
            <p className="mb-6 font-body text-[15px] leading-[26px] text-[#c8c8c8]">
              Armstrong Capital &amp; Financial Services Pvt. Ltd.
              <br />
              AMFI Registration Number: ARN- 105949
              <br />
              ARN Validity – 09-Oct-2027
            </p>
            <h4 className="mb-3 font-display text-xl font-semibold leading-[34px]">
              Quick Contact
            </h4>
            <ul className="space-y-2 font-body text-base text-brand-muted">
              <li>
                E :{" "}
                <a
                  href="mailto:reachus@armstrong-cap.com"
                  className="text-[#c8c8c8] hover:text-white"
                >
                  reachus@armstrong-cap.com
                </a>
              </li>
              <li>
                P :{" "}
                <a
                  href="tel:+919739041588"
                  className="text-[#c8c8c8] hover:text-white"
                >
                  +919739041588
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="lg:col-span-2">
            <h3 className="mb-4 font-display text-2xl font-semibold leading-[34px]">
              Services
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/blog"
                  className="font-body text-base text-brand-muted transition-colors hover:text-white"
                >
                  Blog
                </Link>
              </li>
              {footerServices.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="font-body text-base text-brand-muted transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Segments */}
          <div className="lg:col-span-2">
            <h3 className="mb-4 font-display text-2xl font-semibold leading-[34px]">
              Segments
            </h3>
            <ul className="space-y-2">
              {footerSegments.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="font-body text-base text-brand-muted transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 md:flex-row">
          <p className="font-body text-base text-[#c8c8c8]">
            Copyright © 2026{" "}
            <Link href="/" className="hover:text-white">
              Armstrong.
            </Link>{" "}
            All Rights Reserved.
          </p>
          <ul className="flex flex-wrap gap-6">
            <li>
              <span className="font-body text-base text-brand-muted">
                Terms &amp; Conditions
              </span>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
