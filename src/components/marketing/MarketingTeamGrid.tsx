import Image from "next/image";
import type { MarketingTeamMember } from "@/types/marketing-page";

type MarketingTeamGridProps = {
  members: MarketingTeamMember[];
};

export function MarketingTeamGrid({ members }: MarketingTeamGridProps) {
  return (
    <section className="border-t border-[#eef0f2] pt-8 pb-6" aria-label="Leadership team">
      <h2 className="mb-6 font-display text-xl font-semibold text-brand-navy">
        Leadership
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
        {members.map((member) => (
          <article
            key={member.name}
            className="rounded-xl border border-[#e8eaed] bg-white p-5 shadow-sm"
          >
            {member.image ? (
              <div className="relative mb-4 aspect-square w-full overflow-hidden rounded-lg">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  sizes="(max-width: 640px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>
            ) : null}
            <h3 className="font-display text-lg font-semibold text-brand-navy">
              {member.name}
            </h3>
            <p className="mt-1 font-body text-sm text-brand-muted">{member.role}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
