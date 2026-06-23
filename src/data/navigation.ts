export type NavLink = {
  label: string;
  href: string;
  external?: boolean;
};

export type NavGroup = {
  title: string;
  links: NavLink[];
};

export type NavItem =
  | { type: "link"; label: string; href: string; external?: boolean }
  | { type: "mega"; label: string; groups: NavGroup[] };

export const CLIENT_LOGIN_URL = "https://armstrongcap.themfbox.com/";

export const LOGO_SRC =
  "https://armstrong-cap.com/wp-content/uploads/b-1-e1755768208421.png";

export const leftNav: NavItem[] = [
  { type: "link", label: "Home", href: "/" },
  {
    type: "mega",
    label: "About us",
    groups: [
      {
        title: "Overview",
        links: [
          { label: "About us", href: "/about-us" },
          { label: "Our Team", href: "/our-team" },
          { label: "Our Process", href: "/our-process" },
          { label: "Our Research", href: "/our-research" },
          { label: "Our Accolade", href: "/our-accolade" },
        ],
      },
    ],
  },
  {
    type: "mega",
    label: "Services",
    groups: [
      {
        title: "Services",
        links: [
          { label: "Wealth Management", href: "/wealth-management" },
          { label: "Investment Management", href: "/investment-management" },
          { label: "Financial Planning", href: "/financial-planning" },
          { label: "Retirement Planning", href: "/retirement-planning" },
          { label: "Education Planning", href: "/education-planning" },
          { label: "Risk Management", href: "/risk-management" },
        ],
      },
    ],
  },
  {
    type: "mega",
    label: "Who we help",
    groups: [
      {
        title: "Segments",
        links: [
          { label: "Beginning To Invest", href: "/beginning-to-invest" },
          { label: "Women Investors", href: "/women-investors" },
          {
            label: "High-Net-Worth Individuals",
            href: "/high-net-worth-individuals-hnis",
          },
          { label: "Non-Resident Indians (NRI)", href: "/non-resident-indians-nri" },
          { label: "Pre-Retirement Planning", href: "/pre-retirement-planning" },
          { label: "Career Transition", href: "/career-transition" },
        ],
      },
    ],
  },
];

export const rightNav: NavItem[] = [
  {
    type: "mega",
    label: "Knowledge Hub",
    groups: [
      {
        title: "Resources",
        links: [
          { label: "Blog Archives", href: "/blog" },
          { label: "Research Archives", href: "/research-archives" },
          { label: "Market Updates", href: "/market-updates" },
          { label: "Newsletters", href: "/newsletters" },
          { label: "Media Spotlight", href: "/media-spotlight" },
          { label: "Faq's", href: "/faqs" },
        ],
      },
    ],
  },
  { type: "link", label: "Career", href: "/career" },
  {
    type: "link",
    label: "Client Login",
    href: CLIENT_LOGIN_URL,
    external: true,
  },
];
