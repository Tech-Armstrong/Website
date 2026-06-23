import Image from "next/image";
import Link from "next/link";
import { ourTeamMembers } from "@/data/team";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { LinkedInIcon } from "@/components/marketing/TeamMemberCard";

const teaserMembers = [
  ourTeamMembers[0],
  ourTeamMembers[1],
  ourTeamMembers[2],
  ourTeamMembers[3],
];

export function TeamTeaser() {
  return (
    <section
      className="home-section border-t border-[color:var(--brand-border)]"
      aria-labelledby="team-teaser-heading"
    >
      <div className="site-container">
        <ScrollReveal className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 font-display text-[11px] font-bold uppercase tracking-[0.12em] text-brand-blue sm:text-xs">
              Our team
            </p>
            <h2
              id="team-teaser-heading"
              className="font-display text-[clamp(1.75rem,3vw,2.25rem)] font-semibold leading-[1.15] text-brand-navy"
            >
              Specialists behind your plan
            </h2>
            <p className="mt-2 max-w-xl font-body text-base leading-relaxed text-brand-muted">
              Seven advisors with deep experience across markets, planning, and
              client service.
            </p>
          </div>
          <Link
            href="/our-team"
            className="focus-settle shrink-0 font-display text-base font-semibold text-brand-blue"
          >
            Meet the full team
          </Link>
        </ScrollReveal>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {teaserMembers.map((member, index) => (
            <ScrollReveal key={member.name} delay={index * 80}>
              <article className="lift-card overflow-hidden rounded-2xl border border-[color:var(--brand-border)] bg-brand-surface">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover object-top"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-display text-lg font-semibold text-brand-navy">
                    {member.name}
                  </h3>
                  <p className="mt-1 font-body text-sm text-brand-muted">
                    {member.role}
                  </p>
                  {member.linkedinUrl ? (
                    <a
                      href={member.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="focus-settle mt-3 inline-flex items-center gap-1.5 font-body text-sm font-medium text-brand-blue"
                      aria-label={`${member.name} on LinkedIn`}
                    >
                      <LinkedInIcon />
                      LinkedIn
                    </a>
                  ) : null}
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
