import { activeSocialLinks } from "@/data/social";
import { SocialIcon } from "@/components/icons/SocialIcons";

export function SocialSidebar() {
  if (activeSocialLinks.length === 0) return null;

  return (
    <nav
      aria-label="Social media"
      className="fixed right-0 top-1/2 z-[9000] hidden -translate-y-1/2 lg:flex"
    >
      <div className="flex flex-col gap-3 rounded-l-2xl bg-brand-dark px-2.5 py-4 shadow-[var(--elevation-panel)]">
        {activeSocialLinks.map((link) => (
          <a
            key={link.id}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.label}
            className="focus-settle flex h-10 w-10 items-center justify-center rounded-lg text-brand-blue transition-colors hover:bg-brand-blue hover:text-white"
          >
            <SocialIcon platform={link.id} className="h-[18px] w-[18px]" />
          </a>
        ))}
      </div>
    </nav>
  );
}
