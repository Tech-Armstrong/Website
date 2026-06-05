import {
  footerServices,
  segmentNavLinks,
} from "@/data/marketing-nav";
import { SidebarCta } from "./SidebarCta";
import { SidebarNav } from "./SidebarNav";

type SegmentSidebarProps = {
  activeSlug: string;
};

export function SegmentSidebar({ activeSlug }: SegmentSidebarProps) {
  return (
    <aside className="space-y-4 lg:sticky lg:top-32 lg:self-start">
      <SidebarNav
        title="Client Segments"
        links={segmentNavLinks}
        activeSlug={activeSlug}
        ariaLabel="Client segments"
      />
      <SidebarNav
        title="Our Services"
        links={footerServices}
        activeSlug={activeSlug}
        ariaLabel="Related services"
      />
      <SidebarCta />
    </aside>
  );
}
