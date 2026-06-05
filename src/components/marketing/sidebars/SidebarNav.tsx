import Link from "next/link";

type SidebarLink = {
  label: string;
  href: string;
};

type SidebarNavProps = {
  title: string;
  links: readonly SidebarLink[];
  activeSlug: string;
  ariaLabel: string;
};

export function SidebarNav({
  title,
  links,
  activeSlug,
  ariaLabel,
}: SidebarNavProps) {
  return (
    <nav
      className="rounded-xl border border-[#e8eaed] bg-white p-5 shadow-sm"
      aria-label={ariaLabel}
    >
      <h2 className="mb-3 font-display text-base font-semibold text-brand-navy">
        {title}
      </h2>
      <ul className="space-y-0.5">
        {links.map((link) => {
          const slug = link.href.replace(/^\//, "");
          const isActive = slug === activeSlug;

          return (
            <li key={link.href}>
              <Link
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={`block rounded-lg px-3 py-2 font-body text-sm transition-colors ${
                  isActive
                    ? "bg-brand-blue/10 font-semibold text-brand-blue"
                    : "text-brand-navy hover:bg-brand-surface hover:text-brand-blue"
                }`}
              >
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
