"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import {
  CLIENT_LOGIN_URL,
  LOGO_SRC,
  leftNav,
  rightNav,
  type NavItem,
} from "@/data/navigation";
import { PRIMARY_CTA_LABEL } from "@/data/home";

function renderMobileItem(item: NavItem, onClose: () => void) {
  if (item.type === "link") {
    return (
      <Link
        key={item.label}
        href={item.href}
        className="focus-settle block rounded-md py-2 font-display text-base font-medium text-brand-navy"
        onClick={onClose}
        {...(item.external
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
      >
        {item.label}
      </Link>
    );
  }

  const selfLink = item.groups
    .flatMap((group) => group.links)
    .find((link) => link.label === item.label);

  const headerClassName =
    "mb-2 font-display text-sm font-bold text-brand-blue";

  return (
    <div
      key={item.label}
      className="border-b border-[color:var(--brand-border)] py-3"
    >
      {selfLink ? (
        <Link
          href={selfLink.href}
          className={`focus-settle block ${headerClassName}`}
          onClick={onClose}
          {...(selfLink.external
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
        >
          {item.label}
        </Link>
      ) : (
        <p className={headerClassName}>{item.label}</p>
      )}
      {item.groups.map((group) => {
        const showGroupTitle =
          item.groups.length > 1 &&
          group.title.toLowerCase() !== item.label.toLowerCase();
        const links = group.links.filter((link) => link.href !== selfLink?.href);

        return (
          <div key={group.title} className="mb-3 pl-2">
            {showGroupTitle ? (
              <p className="mb-1 text-xs font-semibold uppercase text-brand-muted">
                {group.title}
              </p>
            ) : null}
            <ul className="space-y-1">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="focus-settle block rounded-md py-1 font-body text-sm text-brand-navy"
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
        );
      })}
    </div>
  );
}

type MobileNavProps = {
  open: boolean;
  onClose: () => void;
};

export function MobileNav({ open, onClose }: MobileNavProps) {
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
  const [rendered, setRendered] = useState(false);
  const [visible, setVisible] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (open) {
      let frame1 = 0;
      let frame2 = 0;
      frame1 = requestAnimationFrame(() => {
        setRendered(true);
        frame2 = requestAnimationFrame(() => setVisible(true));
      });
      return () => {
        cancelAnimationFrame(frame1);
        cancelAnimationFrame(frame2);
      };
    }

    let frame = 0;
    frame = requestAnimationFrame(() => setVisible(false));
    const t = window.setTimeout(() => {
      requestAnimationFrame(() => setRendered(false));
    }, 320);
    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(t);
    };
  }, [open]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open || !visible) return;
    closeButtonRef.current?.focus();
  }, [open, visible]);

  useEffect(() => {
    if (!open) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!mounted || !rendered) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[10000] lg:hidden"
      role="dialog"
      aria-modal="true"
      aria-label="Mobile navigation"
    >
      <button
        type="button"
        className={`mobile-nav-backdrop focus-settle absolute inset-0 bg-brand-navy/50 ${
          visible ? "is-visible" : ""
        }`}
        aria-label="Dismiss menu"
        onClick={onClose}
      />
      <div
        ref={panelRef}
        className={`mobile-nav-panel absolute right-0 top-0 flex h-full w-[min(100%,320px)] flex-col bg-white shadow-2xl ${
          visible ? "is-visible" : ""
        }`}
      >
        <div className="flex items-center justify-between border-b border-[color:var(--brand-border)] px-4 py-4">
          <Image
            src={LOGO_SRC}
            alt="Armstrong Capital"
            width={160}
            height={46}
            className="h-auto w-[140px]"
          />
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            className="focus-settle flex h-10 w-10 items-center justify-center rounded-full text-brand-navy"
            aria-label="Close menu"
          >
            <svg viewBox="0 0 24 24" className="h-6 w-6" stroke="currentColor" strokeWidth="2">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto px-4 py-4">
          {leftNav.slice(1).map((item) => renderMobileItem(item, onClose))}
          {rightNav
            .filter((item) => item.type !== "link" || !item.external)
            .map((item) => renderMobileItem(item, onClose))}
        </nav>
        <div className="border-t border-[color:var(--brand-border)] p-4">
          <Link
            href="/contact"
            className="theme-btn btn-two focus-settle block w-full text-center"
            onClick={onClose}
          >
            {PRIMARY_CTA_LABEL}
          </Link>
          <a
            href={CLIENT_LOGIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="focus-settle mt-3 block rounded-md text-center font-display text-sm font-medium text-brand-blue"
          >
            Client Login
          </a>
        </div>
      </div>
    </div>,
    document.body,
  );
}
