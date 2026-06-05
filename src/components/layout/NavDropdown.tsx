"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import type { NavGroup } from "@/data/navigation";

type NavDropdownProps = {
  label: string;
  groups: NavGroup[];
  align?: "left" | "right";
};

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
    >
      <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const CLOSE_DELAY_MS = 250;

export function NavDropdown({ label, groups, align = "left" }: NavDropdownProps) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearCloseTimer = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  const openMenu = () => {
    clearCloseTimer();
    setOpen(true);
  };

  const scheduleClose = () => {
    clearCloseTimer();
    closeTimerRef.current = setTimeout(() => setOpen(false), CLOSE_DELAY_MS);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        clearCloseTimer();
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      clearCloseTimer();
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className="relative"
      onMouseEnter={openMenu}
      onMouseLeave={scheduleClose}
      onFocus={openMenu}
      onBlur={(event) => {
        if (!rootRef.current?.contains(event.relatedTarget as Node)) {
          scheduleClose();
        }
      }}
    >
      <button
        type="button"
        className="flex items-center gap-1 font-display text-[15px] font-medium text-brand-navy transition-colors hover:text-brand-blue"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
      >
        {label}
        <Chevron open={open} />
      </button>

      <div
        id={panelId}
        className={`absolute top-full z-50 pt-3 ${
          align === "right" ? "right-0" : "left-0"
        } ${
          open
            ? "visible pointer-events-auto opacity-100"
            : "invisible pointer-events-none opacity-0"
        } transition-opacity duration-200`}
        role="menu"
        onMouseEnter={openMenu}
        onMouseLeave={scheduleClose}
      >
        <div className="min-w-[280px] rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-xl">
          <div
            className={`grid gap-6 ${
              groups.length > 1 ? "sm:grid-cols-2" : "grid-cols-1"
            }`}
          >
          {groups.map((group) => (
            <div key={group.title}>
              <p className="mb-3 font-display text-xs font-bold uppercase tracking-wide text-brand-blue">
                {group.title}
              </p>
              <ul className="space-y-2">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="block font-body text-sm text-brand-navy transition-colors hover:text-brand-blue"
                      role="menuitem"
                      onClick={() => setOpen(false)}
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
        </div>
      </div>
    </div>
  );
}
