"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { MarketingTeamMember } from "@/types/marketing-page";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

type MarketingTeamGridProps = {
  members: MarketingTeamMember[];
};

function LinkedInIcon() {
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

function TeamMemberModal({
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
      className="team-member-dialog fixed inset-0 z-50 m-auto w-[min(100%-2rem,640px)] max-h-[85vh] overflow-hidden rounded-xl border border-[#e8eaed] bg-white p-0 shadow-xl backdrop:bg-brand-dark/50 open:flex open:flex-col"
      aria-labelledby="team-member-dialog-title"
      onClick={(event) => {
        if (event.target === dialogRef.current) onClose();
      }}
    >
      <div className="flex items-start justify-between gap-4 border-b border-[#eef0f2] px-6 py-5">
        <div>
          <h2
            id="team-member-dialog-title"
            className="font-display text-xl font-semibold text-brand-navy"
          >
            {member.name}
          </h2>
          <p className="mt-1 font-body text-sm text-brand-muted">{member.role}</p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="shrink-0 rounded-lg p-2 text-brand-muted transition-colors hover:bg-[#f4f5f6] hover:text-brand-navy"
          aria-label="Close"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5" aria-hidden>
            <path strokeLinecap="round" d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div className="overflow-y-auto px-6 py-5">
        <div className="space-y-4 font-body text-[15px] leading-relaxed text-brand-muted">
          {paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 40)}>{paragraph}</p>
          ))}
        </div>
        {member.linkedinUrl ? (
          <a
            href={member.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 font-display text-sm font-semibold text-brand-blue transition-colors hover:text-brand-navy"
          >
            <LinkedInIcon />
            View LinkedIn profile
          </a>
        ) : null}
      </div>
    </dialog>
  );
}

export function MarketingTeamGrid({ members }: MarketingTeamGridProps) {
  const [activeMember, setActiveMember] = useState<MarketingTeamMember | null>(
    null,
  );

  const closeModal = useCallback(() => setActiveMember(null), []);

  return (
    <section
      className="border-t border-[#eef0f2] pt-8 pb-6"
      aria-labelledby="our-team-grid-heading"
    >
      <ScrollReveal>
        <SectionTitle
          eyebrow="LEADERSHIP"
          title="Team Behind Company"
          headingId="our-team-grid-heading"
          align="left"
          className="mb-6"
        />
      </ScrollReveal>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {members.map((member, index) => (
          <ScrollReveal key={member.name} delay={index * 60}>
            <article className="lift-card group flex h-full flex-col overflow-hidden rounded-xl border border-[#e8eaed] bg-white">
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
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-display text-lg font-semibold text-brand-navy">
                      {member.name}
                    </h3>
                    <p className="mt-1 font-body text-sm text-brand-muted">
                      {member.role}
                    </p>
                  </div>
                  {member.linkedinUrl ? (
                    <a
                      href={member.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0 rounded-lg p-2 text-brand-blue transition-colors hover:bg-brand-blue/10 hover:text-brand-navy"
                      aria-label={`${member.name} on LinkedIn`}
                    >
                      <LinkedInIcon />
                    </a>
                  ) : null}
                </div>
                {member.bio ? (
                  <button
                    type="button"
                    onClick={() => setActiveMember(member)}
                    className="mt-4 self-start font-display text-sm font-semibold text-brand-blue transition-colors hover:text-brand-navy"
                  >
                    Read more
                  </button>
                ) : null}
              </div>
            </article>
          </ScrollReveal>
        ))}
      </div>
      {activeMember ? (
        <TeamMemberModal member={activeMember} onClose={closeModal} />
      ) : null}
    </section>
  );
}
