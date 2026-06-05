import { segmentNavLinks, serviceNavLinks } from "@/data/marketing-nav";
import { SidebarCta } from "./SidebarCta";
import { SidebarNav } from "./SidebarNav";

type ServiceSidebarProps = {
  activeSlug: string;
};

export function ServiceSidebar({ activeSlug }: ServiceSidebarProps) {
  return (
    <aside className="space-y-4 lg:sticky lg:top-32 lg:self-start">
      <SidebarNav
        title="Our Services"
        links={serviceNavLinks}
        activeSlug={activeSlug}
        ariaLabel="Services"
      />
      <SidebarNav
        title="Client Segments"
        links={segmentNavLinks}
        activeSlug={activeSlug}
        ariaLabel="Client segments"
      />
      <SidebarCta />
    </aside>
  );
}
