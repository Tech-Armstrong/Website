"use client";

import { useCallback, useState } from "react";
import { ourTeamMembers } from "@/data/team";
import {
  TeamMemberCard,
  TeamMemberModal,
} from "@/components/marketing/TeamMemberCard";
import type { MarketingTeamMember } from "@/types/marketing-page";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function AboutTeamSection() {
  const [activeMember, setActiveMember] = useState<MarketingTeamMember | null>(
    null,
  );

  const openModal = useCallback((member: MarketingTeamMember) => {
    setActiveMember(member);
  }, []);

  const closeModal = useCallback(() => {
    setActiveMember(null);
  }, []);

  return (
    <>
      <ScrollReveal>
        <div className="mx-auto mb-8 max-w-3xl text-center lg:mb-10">
          <p className="font-body text-sm font-semibold uppercase tracking-wide text-brand-blue">
            Our team
          </p>
          <h2
            id="our-team-heading"
            className="mt-2 font-display text-[28px] font-semibold leading-tight text-brand-navy sm:text-[32px] md:text-[36px]"
          >
            The specialists behind your plan
          </h2>
          <p className="mt-4 font-body text-base leading-relaxed text-brand-muted md:text-[17px] md:leading-[28px]">
            Meet the advisors and researchers who bring discipline, transparency,
            and long-term thinking to every client relationship.
          </p>
        </div>
      </ScrollReveal>

      <div
        className="grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4"
        role="list"
        aria-labelledby="our-team-heading"
      >
        {ourTeamMembers.map((member, index) => (
          <div key={member.name} role="listitem" className="h-full">
            <ScrollReveal delay={index * 60} className="h-full">
              <TeamMemberCard
                member={member}
                onReadMore={openModal}
                className="h-full"
              />
            </ScrollReveal>
          </div>
        ))}
      </div>

      {activeMember ? (
        <TeamMemberModal member={activeMember} onClose={closeModal} />
      ) : null}
    </>
  );
}
