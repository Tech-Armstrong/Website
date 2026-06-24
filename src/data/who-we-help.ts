export const whoWeHelpPageBanner = {
  backgroundImage:
    "https://armstrong-cap.com/wp-content/uploads/2024/10/banner-min.jpg",
  title: "Who We Help",
} as const;

export const whoWeHelpIntro = {
  eyebrow: "Client Segments",
  title: "Guidance tailored to where you are in life",
  subtitle:
    "Whether you are starting out, planning for retirement, or navigating a major transition, Armstrong Capital offers research-driven advice shaped around your goals, timeline, and circumstances.",
} as const;

export const whoWeHelpSegments = [
  {
    anchor: "beginning-to-invest",
    title: "Beginning to Invest",
    // TODO(client image): replace with a distinct photo for this segment
    image: "https://armstrong-cap.com/wp-content/uploads/financial_planning.webp",
    description:
      "Start early and build a strong foundation. We design plans that balance growth with the lifestyle you want today — guiding every milestone from your first investment to long-term security.",
    items: [
      "Tailored financial planning",
      "Personalized one-on-one consultations",
      "You stay in control (non-discretionary)",
      "Asset protection & full transparency",
    ],
  },
  {
    anchor: "women-investors",
    title: "Women Investors",
    // TODO(client image): replace with a distinct photo for this segment
    image: "https://armstrong-cap.com/wp-content/uploads/financial_planning.webp",
    description:
      "Financial strategies that adapt through life's transitions — career breaks, motherhood, separation, or loss — so you stay confident and secure at every stage.",
    items: [
      "Whole-family financial analysis",
      "Cash-flow projections",
      "Maternity & sabbatical planning",
      "Widowhood & divorce support",
    ],
  },
  {
    anchor: "high-net-worth-individuals-hnis",
    title: "High-Net-Worth Individuals (HNIs)",
    // TODO(client image): replace with a distinct photo for this segment
    image: "https://armstrong-cap.com/wp-content/uploads/wealth_management.webp",
    description:
      "A precise, proactive approach to growing and preserving substantial wealth — optimizing returns, managing tax, and securing your legacy across generations.",
    items: [
      "Consolidated portfolio view",
      "International investment advisory",
      "Core & satellite strategy",
      "Diversified, multi-asset portfolios",
    ],
  },
  {
    anchor: "non-resident-indians-nri",
    title: "Non-Resident Indians (NRI)",
    // TODO(client image): replace with a distinct photo for this segment
    image: "https://armstrong-cap.com/wp-content/uploads/investment_management-min.webp",
    description:
      "Cross-border wealth, handled with care. We review your assets in India and abroad and craft strategies for tax, retirement, and investing — whatever your residency.",
    items: [
      "Cross-border tax guidance",
      "Retirement planning, India or abroad",
      "Investment diversification",
      "NRO / NRE / FCNR strategy",
    ],
  },
  {
    anchor: "pre-retirement-planning",
    title: "Pre-Retirement Planning",
    // TODO(client image): replace with a distinct photo for this segment
    image: "https://armstrong-cap.com/wp-content/uploads/retirement_planning-min.webp",
    description:
      "Move from your earning years to a fulfilling retirement with confidence. We turn your corpus into dependable income while planning for inflation, healthcare, and life goals.",
    items: [
      "Retirement benefit consolidation",
      "Annuity allocation",
      "Life-goal corpus estimation",
      "Tax-efficient annuities",
    ],
  },
  {
    anchor: "career-transition",
    title: "Career Transition",
    // TODO(client image): replace with a distinct photo for this segment
    image: "https://armstrong-cap.com/wp-content/uploads/financial_planning.webp",
    description:
      "Changing careers or starting a venture? We build the financial blueprint — budgeting, safety nets, and contingencies — so you can take the leap with stability.",
    items: [
      "Budgeting & cash-flow management",
      "Emergency fund establishment",
      "Contingency planning",
    ],
  },
] as const;
