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
  "/images/armstrong/b-1-e1755768208421.png";

export const leftNav: NavItem[] = [
  { type: "link", label: "Home", href: "/" },
  { type: "link", label: "About us", href: "/about-us" },
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
  { type: "link", label: "Who we help", href: "/who-we-help" },
  {
    type: "mega",
    label: "Life & Careers",
    groups: [
      {
        title: "Life & Careers",
        links: [
          { label: "Careers", href: "/career" },
          { label: "Life @ Armstrong", href: "/life-at-armstrong" },
        ],
      },
    ],
  },
  {
    type: "link",
    label: "Client Login",
    href: CLIENT_LOGIN_URL,
    external: true,
  },
];
