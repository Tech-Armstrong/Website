"use client";

import Image from "next/image";
import { useEffect, useRef, type KeyboardEvent } from "react";
import type { MarketingTeamMember } from "@/types/marketing-page";

export function LinkedInIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-4 w-4"
      aria-hidden
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

export function TeamMemberModal({
  member,
  onClose,
}: {
  member: MarketingTeamMember;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    dialog.showModal();
    const handleCancel = (event: Event) => {
      event.preventDefault();
      onClose();
    };
    dialog.addEventListener("cancel", handleCancel);
    return () => dialog.removeEventListener("cancel", handleCancel);
  }, [onClose]);

  const paragraphs = member.bio?.split("\n\n").filter(Boolean) ?? [];

  return (
    <dialog
      ref={dialogRef}
      className="team-member-dialog fixed inset-0 z-50 m-auto w-[min(100%-2rem,640px)] max-h-[85vh] overflow-hidden rounded-xl border border-[color:var(--brand-border)] bg-white p-0 shadow-xl backdrop:bg-brand-dark/50 open:flex open:flex-col"
      aria-labelledby="team-member-dialog-title"
      onClick={(event) => {
        if (event.target === dialogRef.current) onClose();
      }}
    >
      <div className="flex items-start justify-between gap-4 border-b border-[color:var(--brand-border)] px-6 py-5">
        <div className="min-w-0">
          <h2
            id="team-member-dialog-title"
            className="font-display text-xl font-semibold text-brand-navy"
          >
            {member.name}
          </h2>
          <p className="mt-1 font-body text-sm text-brand-muted">{member.role}</p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          {member.linkedinUrl ? (
            <a
              href={member.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${member.name} on LinkedIn`}
              className="rounded-lg p-2 text-brand-blue transition-colors hover:bg-brand-blue/10 hover:text-brand-navy"
            >
              <LinkedInIcon />
            </a>
          ) : null}
          <button
          type="button"
          onClick={onClose}
          className="shrink-0 rounded-lg p-2 text-brand-muted transition-colors hover:bg-[#f4f5f6] hover:text-brand-navy"
          aria-label="Close"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="h-5 w-5"
            aria-hidden
          >
            <path strokeLinecap="round" d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
        </div>
      </div>
      <div className="overflow-y-auto px-6 py-5">
        <div className="space-y-4 font-body text-[15px] leading-relaxed text-brand-muted">
          {paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 40)}>{paragraph}</p>
          ))}
        </div>
      </div>
    </dialog>
  );
}

type TeamMemberCardProps = {
  member: MarketingTeamMember;
  onReadMore: (member: MarketingTeamMember) => void;
  className?: string;
};

export function TeamMemberCard({
  member,
  onReadMore,
  className = "",
}: TeamMemberCardProps) {
  const hasBio = Boolean(member.bio);

  function handleCardActivate() {
    if (hasBio) onReadMore(member);
  }

  function handleCardKeyDown(event: KeyboardEvent<HTMLElement>) {
    if (!hasBio) return;
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onReadMore(member);
    }
  }

  return (
    <article
      className={`lift-card group flex h-full flex-col overflow-hidden rounded-xl border border-[color:var(--brand-border)] bg-white ${hasBio ? "cursor-pointer" : ""} ${className}`}
      {...(hasBio
        ? {
            role: "button" as const,
            tabIndex: 0,
            onClick: handleCardActivate,
            onKeyDown: handleCardKeyDown,
            "aria-label": `Read more about ${member.name}`,
          }
        : {})}
    >
      {member.image ? (
        <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#f4f5f6]">
          <Image
            src={member.image}
            alt={member.name}
            fill
            sizes="(max-width: 640px) 100vw, 33vw"
            className="object-cover object-top transition-transform duration-300 group-hover:scale-[1.02]"
          />
        </div>
      ) : null}
      <div className="flex flex-1 flex-col p-5">
        <div className="flex min-h-[4.5rem] items-start justify-between gap-3">
          <div>
            <h3 className="font-display text-lg font-semibold text-brand-navy">
              {member.name}
            </h3>
            <p className="mt-1 line-clamp-2 font-body text-sm text-brand-muted">
              {member.role}
            </p>
          </div>
          {member.linkedinUrl ? (
            <a
              href={member.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(event) => event.stopPropagation()}
              className="shrink-0 rounded-lg p-2 text-brand-blue transition-colors hover:bg-brand-blue/10 hover:text-brand-navy"
              aria-label={`${member.name} on LinkedIn`}
            >
              <LinkedInIcon />
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}
