import { aboutNavLinks } from "@/data/marketing-nav";
import { SidebarCta } from "./SidebarCta";
import { SidebarNav } from "./SidebarNav";

type AboutSidebarProps = {
  activeSlug: string;
};

export function AboutSidebar({ activeSlug }: AboutSidebarProps) {
  return (
    <aside className="space-y-4 lg:sticky lg:top-32 lg:self-start">
      <SidebarNav
        title="About Armstrong"
        links={aboutNavLinks}
        activeSlug={activeSlug}
        ariaLabel="About us pages"
      />
      <SidebarCta />
    </aside>
  );
}
