"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  CLIENT_LOGIN_URL,
  LOGO_SRC,
  leftNav,
  rightNav,
  type NavItem,
} from "@/data/navigation";

function renderMobileItem(item: NavItem, onClose: () => void) {
  if (item.type === "link") {
    return (
      <Link
        key={item.label}
        href={item.href}
        className="block py-2 font-display text-base font-medium text-brand-navy"
        onClick={onClose}
        {...(item.external
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
      >
        {item.label}
      </Link>
    );
  }

  return (
    <div key={item.label} className="border-b border-[#eee] py-3">
      <p className="mb-2 font-display text-sm font-bold text-brand-blue">
        {item.label}
      </p>
      {item.groups.map((group) => (
        <div key={group.title} className="mb-3 pl-2">
          <p className="mb-1 text-xs font-semibold uppercase text-brand-muted">
            {group.title}
          </p>
          <ul className="space-y-1">
            {group.links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block py-1 font-body text-sm text-brand-navy"
                  onClick={onClose}
                  {...(link.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

type MobileNavProps = {
  open: boolean;
  onClose: () => void;
};

export function MobileNav({ open, onClose }: MobileNavProps) {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] lg:hidden" role="dialog" aria-modal="true">
      <button
        type="button"
        className="absolute inset-0 bg-brand-navy/50"
        aria-label="Close menu"
        onClick={onClose}
      />
      <div className="absolute right-0 top-0 flex h-full w-[min(100%,320px)] flex-col bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-[#eee] px-4 py-4">
          <Image
            src={LOGO_SRC}
            alt="Armstrong Capital"
            width={160}
            height={46}
            className="h-auto w-[140px]"
          />
          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-full text-brand-navy"
            aria-label="Close menu"
          >
            <svg viewBox="0 0 24 24" className="h-6 w-6" stroke="currentColor" strokeWidth="2">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto px-4 py-4">
          <Link
            href="/"
            className="block py-2 font-display text-base font-medium text-brand-navy"
            onClick={onClose}
          >
            Home
          </Link>
          {leftNav.slice(1).map((item) => renderMobileItem(item, onClose))}
          {rightNav.map((item) => renderMobileItem(item, onClose))}
        </nav>
        <div className="border-t border-[#eee] p-4">
          <Link
            href="/contact"
            className="theme-btn btn-two block w-full text-center"
            onClick={onClose}
          >
            Contact Us
          </Link>
          <a
            href={CLIENT_LOGIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 block text-center font-display text-sm font-medium text-brand-blue"
          >
            Client Login
          </a>
        </div>
      </div>
    </div>
  );
}
