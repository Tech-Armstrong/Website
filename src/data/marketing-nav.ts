import { leftNav, rightNav, type NavItem } from "@/data/navigation";
import { footerServices } from "@/data/home";
import { clientSegments } from "@/data/segments";

function megaLinks(items: NavItem[], label: string) {
  return items
    .filter((item): item is Extract<NavItem, { type: "mega" }> =>
      item.type === "mega" && item.label === label,
    )
    .flatMap((item) => item.groups.flatMap((g) => g.links));
}

export const aboutNavLinks = megaLinks(leftNav, "About us");

export const knowledgeNavLinks = megaLinks(rightNav, "Knowledge Hub").filter(
  (link) => link.href !== "/blog",
);

export const segmentNavLinks = clientSegments;

export const serviceNavLinks = megaLinks(leftNav, "Services");

export { footerServices };
