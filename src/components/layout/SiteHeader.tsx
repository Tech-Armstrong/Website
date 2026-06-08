"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { leftNav, LOGO_SRC, rightNav, type NavItem } from "@/data/navigation";
import { MobileNav } from "./MobileNav";
import { NavDropdown } from "./NavDropdown";

function isActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function NavLinkItem({
  href,
  label,
  active,
  external,
}: {
  href: string;
  label: string;
  active: boolean;
  external?: boolean;
}) {
  const className = `focus-settle rounded-md font-display text-[15px] font-medium transition-colors ${
    active
      ? "text-brand-blue"
      : "text-brand-navy hover:text-brand-blue"
  }`;

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {label}
      </a>
    );
  }

  return (
    <Link href={href} className={className} aria-current={active ? "page" : undefined}>
      {label}
    </Link>
  );
}

function renderNavItem(item: NavItem, pathname: string, align: "left" | "right") {
  if (item.type === "link") {
    return (
      <NavLinkItem
        key={item.label}
        href={item.href}
        label={item.label}
        active={isActive(pathname, item.href)}
        external={item.external}
      />
    );
  }

  return (
    <NavDropdown
      key={item.label}
      label={item.label}
      groups={item.groups}
      align={align}
    />
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        setScrolled((prev) => {
          if (!prev && y > 24) return true;
          if (prev && y < 8) return false;
          return prev;
        });
        ticking = false;
      });
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const desktopNavItems = [
    ...leftNav.slice(1),
    ...rightNav.filter((item) => item.type !== "link" || !item.external),
  ];

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-[9999] px-3 pt-3 sm:px-4 sm:pt-4 lg:px-6">
        <div className="pointer-events-auto mx-auto max-w-[1320px]">
          <div
            data-header-shell
            data-scrolled={scrolled ? "true" : "false"}
            className={`header-shell flex items-center gap-2 rounded-2xl bg-white px-3 sm:gap-4 sm:rounded-[1.25rem] sm:px-4 lg:gap-6 lg:px-5 ${
              scrolled ? "py-2 sm:py-2.5" : "py-2.5 sm:py-3"
            }`}
          >
            <Link
              href="/"
              className="focus-settle flex shrink-0 items-center justify-center rounded-md"
              aria-label="Armstrong Capital — Home"
            >
              <Image
                src={LOGO_SRC}
                alt="Armstrong Capital"
                width={200}
                height={57}
                priority
                className={`header-logo w-auto ${
                  scrolled
                    ? "h-[32px] sm:h-[40px] lg:h-[44px]"
                    : "h-[40px] sm:h-[48px] lg:h-[52px]"
                }`}
              />
            </Link>

            <div className="hidden min-w-0 flex-1 items-center justify-end gap-4 lg:flex lg:gap-5 xl:gap-6">
              <nav
                className="flex flex-wrap items-center justify-end gap-4 lg:gap-5 xl:gap-6"
                aria-label="Primary"
              >
                {desktopNavItems.map((item) => renderNavItem(item, pathname, "right"))}
              </nav>
              <Link
                href="/contact"
                className="theme-btn btn-two focus-settle shrink-0 !px-5 !py-2.5 text-base"
              >
                Contact Us
              </Link>
            </div>

            <button
              type="button"
              className="focus-settle ml-auto flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-brand-navy lg:hidden"
              aria-label="Open menu"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen(true)}
            >
              <svg viewBox="0 0 24 24" className="h-6 w-6" stroke="currentColor" strokeWidth="2">
                <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
