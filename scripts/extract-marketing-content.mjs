import { mkdirSync, readFileSync, writeFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const PAGES_DIR = join(process.cwd(), "content", "pages");
const OUT_FILE = join(process.cwd(), "src", "data", "marketing-pages", "pages.ts");

const SLUG_CATEGORIES = {
  "beginning-to-invest": "segment",
  "women-investors": "segment",
  "high-net-worth-individuals-hnis": "segment",
  "non-resident-indians-nri": "segment",
  "pre-retirement-planning": "segment",
  "career-transition": "segment",
  "wealth-management": "service",
  "investment-management": "service",
  "financial-planning": "service",
  "retirement-planning": "service",
  "education-planning": "service",
  "risk-management": "service",
  values: "about",
  "our-team": "about",
  "our-accolade": "about",
  "our-plan": "about",
  "our-process": "about",
  "our-customer-journey": "about",
  "our-research": "about",
  "research-archives": "knowledge",
  "market-updates": "knowledge",
  newsletters: "knowledge",
  "media-spotlight": "knowledge",
  faqs: "knowledge",
  career: "career",
  contact: "contact",
};

const SERVICE_IMAGES = {
  "wealth-management":
    "https://armstrong-cap.com/wp-content/uploads/wealth_management.webp",
  "investment-management":
    "https://armstrong-cap.com/wp-content/uploads/investment_management-min.webp",
  "financial-planning":
    "https://armstrong-cap.com/wp-content/uploads/financial_planning.webp",
  "retirement-planning":
    "https://armstrong-cap.com/wp-content/uploads/retirement_planning-min.webp",
  "education-planning":
    "https://armstrong-cap.com/wp-content/uploads/educational_planning-min.webp",
  "risk-management":
    "https://armstrong-cap.com/wp-content/uploads/risk_management-min.webp",
};

const SEGMENT_IMAGES = {
  "beginning-to-invest":
    "https://armstrong-cap.com/wp-content/uploads/financial_planning.webp",
  "women-investors":
    "https://armstrong-cap.com/wp-content/uploads/financial_planning.webp",
  "high-net-worth-individuals-hnis":
    "https://armstrong-cap.com/wp-content/uploads/wealth_management.webp",
  "non-resident-indians-nri":
    "https://armstrong-cap.com/wp-content/uploads/investment_management-min.webp",
  "pre-retirement-planning":
    "https://armstrong-cap.com/wp-content/uploads/retirement_planning-min.webp",
  "career-transition":
    "https://armstrong-cap.com/wp-content/uploads/financial_planning.webp",
};

const DEFAULT_IMAGE =
  "https://armstrong-cap.com/wp-content/uploads/financial_planning.webp";

function decodeHtml(text) {
  return text
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#8217;/g, "'")
    .replace(/&#8211;/g, "–")
    .replace(/&hellip;/g, "...")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function extractH2Titles(html) {
  return [...html.matchAll(/<h2[^>]*class="[^"]*elementor-heading-title[^"]*"[^>]*>([\s\S]*?)<\/h2>/gi)]
    .map((m) => decodeHtml(m[1]))
    .filter(Boolean);
}

function extractParagraphs(html) {
  const blocks = [
    ...html.matchAll(
      /elementor-widget-text-editor[\s\S]*?elementor-widget-container[^>]*>([\s\S]*?)<\/div>\s*<\/div>/gi,
    ),
  ];
  const paras = [];
  for (const block of blocks) {
    const text = decodeHtml(block[1]);
    if (text.length > 40 && !text.includes("home-quote-area")) {
      paras.push(text);
    }
  }
  return [...new Set(paras)];
}

function extractFeatures(html) {
  const items = [];
  const boxes = [
    ...html.matchAll(
      /town-title[^>]*>\s*<h3[^>]*>([\s\S]*?)<\/h3>[\s\S]*?town-text[^>]*>\s*<p[^>]*>([\s\S]*?)<\/p>/gi,
    ),
  ];
  for (const box of boxes) {
    items.push({
      title: decodeHtml(box[1]),
      description: decodeHtml(box[2]),
    });
  }

  if (items.length === 0) {
    const chooseBlocks = [
      ...html.matchAll(
        /chooseus-block-three[\s\S]*?<h3[^>]*>([\s\S]*?)<\/h3>[\s\S]*?<p[^>]*>([\s\S]*?)<\/p>/gi,
      ),
    ];
    for (const block of chooseBlocks) {
      items.push({
        title: decodeHtml(block[1]),
        description: decodeHtml(block[2]),
      });
    }
  }

  if (items.length === 0) {
    const growthBlocks = [
      ...html.matchAll(
        /growth-block-one[\s\S]*?<h3[^>]*>([\s\S]*?)<\/h3>[\s\S]*?<p[^>]*>([\s\S]*?)<\/p>/gi,
      ),
    ];
    for (const block of growthBlocks) {
      items.push({
        title: decodeHtml(block[1]),
        description: decodeHtml(block[2]),
      });
    }
  }

  return items;
}

function extractQuote(html) {
  const match = html.match(/home-quote-area[\s\S]*?<h5[^>]*>([\s\S]*?)<\/h5>[\s\S]*?<em[^>]*>([\s\S]*?)<\/em>/i);
  if (!match) return null;
  const text = decodeHtml(match[1]);
  const attribution = decodeHtml(match[2]).replace(/^[-–—]\s*/, "");
  if (!text) return null;
  return { text, attribution };
}

function extractFaqs(html) {
  const items = [];
  const blocks = html.split(/<li class="accordion block/);
  for (const block of blocks.slice(1)) {
    const qMatch = block.match(/<h4[^>]*>([\s\S]*?)<\/h4>/i);
    const aMatch = block.match(
      /class="acc-content[^"]*"[^>]*>([\s\S]*?)<\/div>\s*<\/li>/i,
    );
    if (qMatch && aMatch) {
      items.push({
        question: decodeHtml(qMatch[1]),
        answer: decodeHtml(aMatch[1]),
      });
    }
  }
  return items;
}

function extractTeam(html) {
  const members = [];
  const seen = new Set();

  const slideBlocks = [
    ...html.matchAll(
      /swiper-slide[\s\S]*?<img[^>]+src="([^"]+)"[\s\S]*?elementor-heading-title[^>]*>([\s\S]*?)<\/[\s\S]*?elementor-heading-title[^>]*>([\s\S]*?)<\/[\s\S]*?(?:href="(https:\/\/www\.linkedin\.com\/in\/[^"]+)")?/gi,
    ),
  ];

  for (const block of slideBlocks) {
    const name = decodeHtml(block[2]).trim();
    const role = decodeHtml(block[3]).trim();
    if (!name || !role || seen.has(name)) continue;
    seen.add(name);
    members.push({
      name,
      role,
      image: block[1],
      ...(block[4] ? { linkedinUrl: block[4] } : {}),
    });
  }

  if (members.length > 0) return members;

  const blocks = [
    ...html.matchAll(
      /counsolve_team[\s\S]*?<h3[^>]*>([\s\S]*?)<\/h3>[\s\S]*?<span[^>]*>([\s\S]*?)<\/span>/gi,
    ),
  ];
  for (const block of blocks) {
    members.push({
      name: decodeHtml(block[1]),
      role: decodeHtml(block[2]),
    });
  }
  return members;
}

function extractMediaArticles(html) {
  const articles = [];
  const cards = [
    ...html.matchAll(
      /<a[^>]+href="(https?:\/\/[^"]+)"[^>]*>[\s\S]*?<img[^>]+src="([^"]+)"[\s\S]*?<\/a>/gi,
    ),
  ];
  for (const card of cards.slice(0, 15)) {
    if (card[1].includes("armstrong-cap.com/wp-content")) continue;
    articles.push({
      title: decodeHtml(card[0].match(/alt="([^"]*)"/)?.[1] ?? "Press coverage"),
      href: card[1],
      logo: card[2],
    });
  }
  return articles;
}

function extractPodcasts(html) {
  const podcasts = [];
  const embeds = [...html.matchAll(/src="(https:\/\/www\.linkedin\.com\/embed\/[^"]+)"/gi)];
  for (const embed of embeds) {
    podcasts.push({
      title: "LinkedIn Podcast",
      embedUrl: embed[1],
    });
  }
  return podcasts;
}

function extractFeatureSectionTitle(html) {
  const titles = extractH2Titles(html);
  const featureTitle = titles.find((t) =>
    /what we can do|why choose|our plans|we are in continuous/i.test(t),
  );
  return featureTitle ?? "What We Can Do for You";
}

function buildConfig(slug, raw) {
  const category = SLUG_CATEGORIES[slug];
  if (!category) return null;

  const html = raw.content ?? "";
  const h2s = extractH2Titles(html);
  const paragraphs = extractParagraphs(html);
  const features = extractFeatures(html);
  const quote = extractQuote(html);

  const config = { slug, category };

  if (category === "contact") {
    config.showContactForm = true;
    config.fullWidth = true;
    return config;
  }

  if (slug === "faqs") {
    const faqs = extractFaqs(html);
    config.fullWidth = true;
    config.faqs = faqs;
    config.hero = {
      title: "Frequently Asked Questions",
      paragraphs: [
        "Find answers to common questions about Armstrong Capital's services, processes, and approach to wealth management.",
      ],
    };
    return config;
  }

  const heroTitle = slug === "our-team" ? raw.title : (h2s[0] ?? raw.title);
  const heroParagraphs = paragraphs.slice(0, category === "career" ? 3 : 2);

  if (heroTitle || heroParagraphs.length) {
    config.hero = {
      title: heroTitle,
      paragraphs:
        heroParagraphs.length > 0
          ? heroParagraphs
          : [decodeHtml(raw.excerpt ?? "").slice(0, 300)],
      image:
        SERVICE_IMAGES[slug] ??
        SEGMENT_IMAGES[slug] ??
        (category === "about" || category === "knowledge" ? DEFAULT_IMAGE : undefined),
    };
  }

  if (features.length > 0 && slug !== "our-team") {
    config.features = {
      eyebrow: category === "service" ? "Our Services" : "Our Approach",
      title: extractFeatureSectionTitle(html),
      items: features,
    };
  }

  if (quote) config.quote = quote;

  if (slug === "our-team") {
    const team = extractTeam(html);
    if (team.length) config.team = team;
  }

  if (slug === "our-plan" && features.length) {
    config.plans = features;
    delete config.features;
  }

  if (slug === "faqs") {
    config.faqs = extractFaqs(html);
    config.fullWidth = true;
  }

  if (slug === "media-spotlight") {
    config.mediaArticles = extractMediaArticles(html);
    config.mediaPodcasts = extractPodcasts(html);
    delete config.hero?.image;
  }

  if (slug === "career") {
    config.hero = {
      title: "Experience Working With Armstrong Capital",
      paragraphs: [
        "Join a finance services firm that values growth, collaboration, and work-life balance. Armstrong Capital offers opportunities for graduates, placement interns, and experienced professionals.",
        "We are in continuous search for individuals who could be assets in our balance sheet.",
      ],
      image: DEFAULT_IMAGE,
    };
    config.careerSections = [
      {
        title: "Long-Term Internship",
        paragraphs: [
          "A 6–8 month program for recent graduates to master the financial landscape, build client engagement skills, and apply theoretical knowledge to real-world scenarios.",
        ],
      },
      {
        title: "Placement Internship",
        paragraphs: [
          "An enriching experience covering client communication, marketing, financial planning, fund research, and data analysis under expert guidance.",
        ],
      },
      {
        title: "Experienced Professionals",
        paragraphs: [
          "Join forward-thinking professionals tackling complex financial challenges in wealth management, financial planning, and client advisory.",
        ],
      },
    ];
    config.features = {
      eyebrow: "Why Choose Us",
      title: "Why Choose Armstrong",
      items: features.length > 0 ? features : [],
    };
    config.careerCta = { label: "Send Resume", href: "/career-send-resume" };
  }

  return config;
}

const files = readdirSync(PAGES_DIR).filter(
  (f) => f.endsWith(".json") && f !== "_index.json",
);

const configs = {};
for (const file of files) {
  const raw = JSON.parse(readFileSync(join(PAGES_DIR, file), "utf8"));
  const slug = raw.slug;
  if (!SLUG_CATEGORIES[slug]) continue;
  const config = buildConfig(slug, raw);
  if (config) configs[slug] = config;
}

const output = `// Auto-generated by scripts/extract-marketing-content.mjs — do not edit by hand
import type { MarketingPageConfig } from "@/types/marketing-page";

export const marketingPages = ${JSON.stringify(configs, null, 2)} as const satisfies Record<string, MarketingPageConfig>;

`;

mkdirSync(join(process.cwd(), "src", "data", "marketing-pages"), { recursive: true });
writeFileSync(OUT_FILE, output, "utf8");
console.log(`Wrote ${Object.keys(configs).length} page configs to ${OUT_FILE}`);
