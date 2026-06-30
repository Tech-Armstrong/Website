export const heroSlides = [
  {
    id: 1,
    title: "Comprehensive",
    titleOutline: "Investment",
    titleSuffix: "Solutions",
    description:
      "Committed to our clients.\nPowered by research.\nDriven to perform.",
    image:
      "/images/armstrong/banner-2.webp",
  },
  {
    id: 2,
    title: "Innovative",
    titleOutline: "Financial",
    titleSuffix: "Solutions",
    description:
      '"Experience cutting-edge financial strategies and personalized solutions for confident, clear navigation of your wealth."',
    image:
      "/images/armstrong/banner-2.webp",
  },
  {
    id: 3,
    title: "Bespoke",
    titleOutline: "Wealth",
    titleSuffix: "Solutions",
    description:
      '"Our bespoke approach combines detailed research with personalized strategies to meet your unique financial goals."',
    image:
      "/images/armstrong/2024/07/Nature-Spiral-Bokeh-Micro1.jpg",
  },
] as const;

export const heroButtons = {
  primary: { label: "Book a consultation", href: "/contact" },
  secondary: { label: "See how we work", href: "/about-us#our-process" },
} as const;

export const offeringsSection = {
  eyebrow: "What we offer",
  title: "Our offerings",
  subtitle:
    "From mutual funds and equities to PMS, AIFs, and insurance, coordinated solutions across your full investment spectrum.",
} as const;

export const offerings = [
  {
    title: "Mutual Funds",
    description:
      "Research-backed fund selection across asset classes for every goal and risk profile.",
    href: "/contact",
  },
  {
    title: "Alternative Investment Funds (AIF)",
    description:
      "Access curated alternative strategies for qualified investors seeking diversification beyond traditional markets.",
    href: "/contact",
  },
  {
    title: "Specialised Investment Funds (SIF)",
    description:
      "Targeted specialised strategies for investors who need focused exposure beyond standard mutual fund categories.",
    href: "/contact",
  },
  {
    title: "Portfolio Management Services (PMS)",
    description:
      "Discretionary portfolio management tailored to your goals, with direct oversight from experienced strategists.",
    href: "/contact",
  },
  {
    title: "International Equity",
    description:
      "Build global diversification with international equity allocations aligned to your risk tolerance and horizon.",
    href: "/contact",
  },
  {
    title: "Corporate Fixed Deposits",
    description:
      "Earn competitive returns on corporate FDs selected for credit quality, tenure fit, and portfolio balance.",
    href: "/contact",
  },
  {
    title: "Domestic equity",
    description:
      "Participate in India's growth story with disciplined equity strategies grounded in research and risk management.",
    href: "/contact",
  },
  {
    title: "REITs & InvITs",
    description:
      "Access income-oriented real estate and infrastructure exposure through listed REITs and InvITs as part of a diversified portfolio.",
    href: "/contact",
  },
  {
    title: "Insurance",
    description:
      "Protect what you have built with life, health, and asset coverage integrated into your financial plan.",
    href: "/contact",
  },
] as const;

export const services = [
  {
    title: "Wealth Management",
    href: "/wealth-management",
    tagline:
      "Holistic planning and investment strategies for lasting prosperity.",
    image:
      "/images/armstrong/wealth_management.webp",
  },
  {
    title: "Investment Management",
    href: "/investment-management",
    tagline:
      "Disciplined portfolio management aligned with your goals and risk profile.",
    image:
      "/images/armstrong/investment_management-min.webp",
  },
  {
    title: "Financial Planning",
    href: "/financial-planning",
    tagline:
      "Personalized plans that balance today's needs with tomorrow's ambitions.",
    image:
      "/images/armstrong/financial_planning.webp",
  },
  {
    title: "Retirement Planning",
    href: "/retirement-planning",
    tagline:
      "Build confidence for the lifestyle you envision after your career.",
    image:
      "/images/armstrong/retirement_planning-min.webp",
  },
  {
    title: "Education Planning",
    href: "/education-planning",
    tagline:
      "Structured savings strategies to fund your child's educational future.",
    image:
      "/images/armstrong/educational_planning-min.webp",
  },
  {
    title: "Risk Management",
    href: "/risk-management",
    tagline:
      "Protect what you've built with thoughtful, proactive risk strategies.",
    image:
      "/images/armstrong/risk_management-min.webp",
  },
] as const;

export const aboutSection = {
  image:
    "/images/armstrong/2024/10/image-6-min.jpg",
  years: 16,
  ringText: [
    "Handling tough Financial tasks",
    "Giving Futures to your Investment",
    "not Just Promise, a result delivered",
    "Giving wings to financial dreams",
  ] as const,
  eyebrow: "About Armstrong",
  title: "A wealth manager's job is to manage risk and build discipline.",
  description:
    "Founded in 2010 by Manju Mastakar, Armstrong Capital advises families, HNIs, and NRIs across India and abroad. Our team of seven specialists builds goal-based plans grounded in our own fund research, then reviews them with you as markets and your life change. We earn a regulated, disclosed commission, so our incentives stay aligned with your long-term returns.",
  ctaLabel: "Meet the team",
  ctaHref: "/about-us#our-team",
} as const;

export const whyChooseSection = {
  backgroundImage:
    "/images/armstrong/why_choose_bg-min.webp",
  eyebrow: "Why Choose",
  title: "Armstrong",
  tabs: [
    {
      number: "01",
      title: "Experience And Expertise",
      paragraphs: [
        "With years of experience and a team of seasoned experts, we offer you a wealth of knowledge and insights.",
        "Our professionals have a deep understanding of the financial landscape, allowing us to provide you with professional guidance and strategic advice.",
      ],
      quote:
        "Good fortune is what happens when opportunity meets with planning.",
      attribution: "Thomas Edison",
    },
    {
      number: "02",
      title: "Bespoke Financial Solutions",
      paragraphs: [
        "We believe in the power of tailored solutions.",
        "Your financial journey is unique, and we treat it as such.",
        "Our personalized approach ensures that your goals, aspirations, and financial circumstances are at the forefront of every decision we make.",
      ],
      quote:
        "Your financial journey is a story waiting to be written. Craft it with bespoke solutions that echo your unique aspirations.",
      attribution: "Suze Orman",
    },
    {
      number: "03",
      title: "Diverse Portfolio",
      paragraphs: [
        "In finance's ever-changing landscape, diversity is your ally.",
        "Our wide portfolio spans from mutual funds to innovative solutions, your pathway to financial success.",
      ],
      quote:
        "The only certainty in finance is uncertainty. Diversify your portfolio to weather the storms and capture the sunshine of financial success.",
      attribution: "John Templeton",
    },
    {
      number: "04",
      title: "Proactive Portfolio Oversight",
      paragraphs: [
        "Our vigilant team proactively monitors your portfolio to ensure it stays aligned with your financial goals..",
        "We don't wait for market fluctuations; we anticipate and act upon them to safeguard your investments..",
      ],
      quote:
        "The key to successful investing is not just building a portfolio but also regularly fine-tuning it. Review, realign, and let your investments thrive.",
      attribution: "Warren Buffett",
    },
    {
      number: "05",
      title: "Transparency And Trust",
      paragraphs: [
        "Trust is the cornerstone of our client relationships.",
        "We maintain the highest standards of transparency and integrity in everything we do.",
        "With us, you'll always know where you stand and the reasons behind our recommendations.",
      ],
      quote: "The best way to find out if you can trust somebody is to trust them.",
      attribution: "Ernest Hemingway",
    },
  ],
} as const;

export const mediaSpotlights = [
  {
    title:
      "Moneycontrol Mutual Fund Distributor Awards: Honouring Excellence",
    href: "https://www.moneycontrol.com/news/business/moneycontrol-mutual-fund-distributor-awards-honouring-excellence-in-the-financial-sector-12804260.html",
    logo: "/images/armstrong/logo-1.webp",
  },
  {
    title: "Top 3 Visionary Indian Personalities of 2024",
    href: "https://timesofindia.indiatimes.com/business/india-business/top-3-visionary-indian-personalities-of-2024/articleshow/112193811.cms",
    logo: "/images/armstrong/92222747.svg",
  },
  {
    title: "Indian Leadership Summit & Awards 2024: A Resounding Success",
    href: "https://www.business-standard.com/content/press-releases-ani/indian-leadership-summit-awards-2024-a-resounding-success-in-pune-124022000532_1.html",
    logo: "/images/armstrong/business-standard.png",
  },
  {
    title: "Manju Mastakar: Empowering Everyone to Achieve Their Financial Goals",
    href: "https://ciolookindia.com/manju-mastakar-empowering-everyone-achieve-their-financial-goals-via-armstrong-cfs/",
    logo: "/images/armstrong/CIO-Look-LOGO.webp",
  },
  {
    title: "Armstrong Capital: Where Financial Planning Meets Purpose",
    href: "https://www.outlookindia.com/hub4business/armstrong-capital-where-financial-planning-meets-purpose",
    logo: "/images/armstrong/outlook.svg",
  },
  {
    title: "Armstrong Capital & Financial Services Pvt. Ltd",
    href: "https://thebusinessfame.in/armstrong-capital-financial-services-pvt-ltd-comprehensive-investment-solutions/",
    logo: "/images/armstrong/TBF-Logo_Black-1.png",
  },
  {
    title: "Armstrong Capital & Financial Services: A Comprehensive Investment Solution",
    href: "https://primeview.co/armstrong-capital-financial-services-a-comprehensive-investment-solution-provider-by-manju-mastakar/",
    logo: "/images/armstrong/primeview_Logo1-1.png",
  },
  {
    title:
      "Recession & Rejection that gave birth to the resilient women entrepreneur",
    href: "https://entrepreneurinsights.in/armstrong-capital-financial-services-pvt-ltd/",
    logo: "/images/armstrong/cropped-entrepreneur-insights-new-logo-high-resolution-logo-1-1536x721-1.png",
  },
  {
    title: "Manju Mastakar: A Stock Market Expert Breaking the Stereotype",
    href: "https://www.mirrorreview.com/manju-mastakar-armstrong-capital-advisory/",
    logo: "/images/armstrong/MR-logo-768x120-1.webp",
  },
  {
    title: "Armstrong Capital Advisory: The Outstanding Financial Advisory Partner",
    href: "https://www.insightssuccess.in/armstrong-capital-advisory-the-outstanding-financial-advisory-partner/",
    logo: "/images/armstrong/Logo-IS.png",
  },
] as const;

export const awardsSection = {
  eyebrow: "Recognition",
  title: "Awards & partners",
  subtitle:
    "Industry honors and AMC partnerships that reflect our commitment to clients.",
} as const;

export const homeStats = [
  { value: "500", suffix: "+", label: "Crores of Assets Managed" },
  { value: "2500", suffix: "+", label: "Financial Plans" },
  { value: "4", suffix: "K", label: "Strategies Planned" },
  { value: "15", suffix: "+", label: "Clients in Countries" },
] as const;

export const footerAssets = {
  logo:
    "/images/armstrong/Group-1707483555-1024x292.png",
  ctaBackground:
    "/images/armstrong/coffee_banner-1.webp",
} as const;

export const footerServices = services.map(({ title, href }) => ({
  label: title,
  href,
}));

export const footerSegments = [
  {
    label: "Beginning To Invest",
    href: "/who-we-help#beginning-to-invest",
  },
  { label: "Women Investors", href: "/who-we-help#women-investors" },
  {
    label: "High-Net-Worth-Individuals",
    href: "/who-we-help#high-net-worth-individuals-hnis",
  },
  {
    label: "Non–Resident Indians (NRI)",
    href: "/who-we-help#non-resident-indians-nri",
  },
  {
    label: "Pre-Retirement Planning",
    href: "/who-we-help#pre-retirement-planning",
  },
  { label: "Career Transition", href: "/who-we-help#career-transition" },
] as const;

export const PRIMARY_CTA_LABEL = "Book a consultation";
