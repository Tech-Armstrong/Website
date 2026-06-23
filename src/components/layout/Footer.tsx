import Image from "next/image";
import Link from "next/link";
import { SocialIcon } from "@/components/icons/SocialIcons";
import { getSocialLink } from "@/data/social";
import {
  footerAssets,
  footerSegments,
  footerServices,
  PRIMARY_CTA_LABEL,
} from "@/data/home";

const socialLinkBaseClass =
  "focus-settle flex h-9 w-9 items-center justify-center rounded-full text-white transition-colors active:scale-[0.98]";

const sectionTitleClass =
  "mb-4 font-display text-xl font-semibold leading-snug text-white";

export function Footer() {
  const { logo, ctaBackground } = footerAssets;
  const youtubeLink = getSocialLink("youtube");
  const linkedInLink = getSocialLink("linkedin");

  return (
    <footer className="mt-10 overflow-x-clip bg-brand-dark pt-20 pb-8 text-white lg:mt-12 lg:overflow-visible">
      <div className="site-container px-4">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-12 lg:items-start lg:gap-8">
          <div className="md:col-span-2 lg:col-span-3">
            <section
              aria-labelledby="footer-cta-heading"
              className="relative mx-auto w-full max-w-[280px] overflow-hidden rounded-[30px] rounded-br-none bg-cover bg-center px-5 py-8 shadow-xl lg:mx-0"
              style={{ backgroundImage: `url(${ctaBackground})` }}
            >
              <div className="footer-cta-overlay absolute inset-0" aria-hidden />
              <div className="relative z-[1] text-center">
                <Image
                  src={logo}
                  alt="Armstrong Capital"
                  width={525}
                  height={150}
                  className="mx-auto mb-4 h-auto w-full max-w-[180px]"
                />
                <div className="mx-auto mb-4 h-[3px] w-12 bg-white" aria-hidden />
                <h2
                  id="footer-cta-heading"
                  className="font-display text-lg font-semibold leading-[26px] text-white"
                >
                  Thinking &<br />
                  Planning for your<br />
                  Future
                </h2>
                <Link
                  href="/contact"
                  className="theme-btn btn-two focus-settle mt-5 inline-block !px-5 !py-2.5 text-sm active:scale-[0.98]"
                >
                  {PRIMARY_CTA_LABEL}
                </Link>
              </div>
            </section>
          </div>

          <div className="md:col-span-2 lg:col-span-4">
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

          <div className="lg:col-span-3">
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

        <div className="mt-8 flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-t border-white/10 pt-6">
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-display text-sm font-semibold text-white">
              Follow us on
            </span>
            <div className="flex gap-2">
              {youtubeLink?.href ? (
                <a
                  href={youtubeLink.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${socialLinkBaseClass} footer-social-youtube`}
                  aria-label={youtubeLink.label}
                >
                  <SocialIcon platform="youtube" />
                </a>
              ) : null}
              {linkedInLink?.href ? (
                <a
                  href={linkedInLink.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${socialLinkBaseClass} footer-social-linkedin`}
                  aria-label={linkedInLink.label}
                >
                  <SocialIcon platform="linkedin" />
                </a>
              ) : null}
            </div>
          </div>

          <p className="footer-text font-body text-sm md:text-base">
            Copyright © 2026{" "}
            <Link href="/" className="footer-link">
              Armstrong.
            </Link>{" "}
            All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
