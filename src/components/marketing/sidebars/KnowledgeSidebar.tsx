import { knowledgeNavLinks } from "@/data/marketing-nav";
import { SidebarCta } from "./SidebarCta";
import { SidebarNav } from "./SidebarNav";

type KnowledgeSidebarProps = {
  activeSlug: string;
};

export function KnowledgeSidebar({ activeSlug }: KnowledgeSidebarProps) {
  return (
    <aside className="space-y-4 lg:sticky lg:top-32 lg:self-start">
      <SidebarNav
        title="Knowledge Hub"
        links={knowledgeNavLinks}
        activeSlug={activeSlug}
        ariaLabel="Knowledge hub pages"
      />
      <SidebarCta />
    </aside>
  );
}
