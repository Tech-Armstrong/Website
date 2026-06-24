import type { NavLink } from "@/data/navigation";

export const WHO_WE_HELP_HREF = "/who-we-help";

export const clientSegments: NavLink[] = [
  { label: "Beginning To Invest", href: "/beginning-to-invest" },
  { label: "Women Investors", href: "/women-investors" },
  {
    label: "High-Net-Worth Individuals",
    href: "/high-net-worth-individuals-hnis",
  },
  { label: "Non-Resident Indians (NRI)", href: "/non-resident-indians-nri" },
  { label: "Pre-Retirement Planning", href: "/pre-retirement-planning" },
  { label: "Career Transition", href: "/career-transition" },
];

export const clientSegmentHrefs = clientSegments.map((segment) => segment.href);
