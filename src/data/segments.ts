import type { NavLink } from "@/data/navigation";

export const WHO_WE_HELP_HREF = "/who-we-help";

export const clientSegments: NavLink[] = [
  {
    label: "Beginning To Invest",
    href: "/who-we-help#beginning-to-invest",
  },
  { label: "Women Investors", href: "/who-we-help#women-investors" },
  {
    label: "High-Net-Worth Individuals",
    href: "/who-we-help#high-net-worth-individuals-hnis",
  },
  {
    label: "Non-Resident Indians (NRI)",
    href: "/who-we-help#non-resident-indians-nri",
  },
  {
    label: "Pre-Retirement Planning",
    href: "/who-we-help#pre-retirement-planning",
  },
  { label: "Career Transition", href: "/who-we-help#career-transition" },
];

export const clientSegmentHrefs = clientSegments.map((segment) => segment.href);
