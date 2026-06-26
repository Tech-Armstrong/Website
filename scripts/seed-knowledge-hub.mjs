import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { randomUUID } from "node:crypto";
import { join } from "node:path";

const ROOT = process.cwd();
const PAGES_DIR = join(ROOT, "content", "pages");
const OUT_DIR = join(ROOT, "content", "knowledge");

const ARCHIVE_SLUGS = ["research-archives", "market-updates", "newsletters"];

const DEFAULT_HERO = {
  "research-archives": {
    title: "Research Archives",
    paragraphs: [
      "Browse Armstrong Capital's research publications covering market trends, economic analysis, and investment strategy insights.",
    ],
    image: "https://armstrong-cap.com/wp-content/uploads/financial_planning.webp",
  },
  "market-updates": {
    title: "Market Updates",
    paragraphs: [
      "Stay informed with our monthly Money Moves series and timely market commentary from Armstrong Capital's research team.",
    ],
    image:
      "https://armstrong-cap.com/wp-content/uploads/investment_management-min.webp",
  },
  newsletters: {
    title: "Newsletters",
    paragraphs: [
      "Read our latest newsletters featuring market perspectives, portfolio insights, and financial planning guidance.",
    ],
    image: "https://armstrong-cap.com/wp-content/uploads/wealth_management.webp",
  },
};

const MEDIA_SPOTLIGHTS = [
  {
    title:
      "Moneycontrol Mutual Fund Distributor Awards: Honouring Excellence ....",
    href: "https://www.moneycontrol.com/news/business/moneycontrol-mutual-fund-distributor-awards-honouring-excellence-in-the-financial-sector-12804260.html",
    logo: "https://armstrong-cap.com/wp-content/uploads/logo-1.webp",
  },
  {
    title: "Top 3 Visionary Indian Personalities of 2024",
    href: "https://timesofindia.indiatimes.com/business/india-business/top-3-visionary-indian-personalities-of-2024/articleshow/112193811.cms",
    logo: "https://armstrong-cap.com/wp-content/uploads/92222747.svg",
  },
  {
    title: "Indian Leadership Summit & Awards 2024: A Resounding ....",
    href: "https://www.business-standard.com/content/press-releases-ani/indian-leadership-summit-awards-2024-a-resounding-success-in-pune-124022000532_1.html",
    logo: "https://armstrong-cap.com/wp-content/uploads/business-standard.png",
  },
  {
    title: "Manju Mastakar: Empowering Everyone Achieve...",
    href: "https://ciolookindia.com/manju-mastakar-empowering-everyone-achieve-their-financial-goals-via-armstrong-cfs/",
    logo: "https://armstrong-cap.com/wp-content/uploads/CIO-Look-LOGO.webp",
  },
  {
    title: "Armstrong Capital: Where Financial Planning Meets Purpose",
    href: "https://www.outlookindia.com/hub4business/armstrong-capital-where-financial-planning-meets-purpose",
    logo: "https://armstrong-cap.com/wp-content/uploads/outlook.svg",
  },
  {
    title: "Armstrong Capital & Financial Services Pvt. Ltd - ....",
    href: "https://thebusinessfame.in/armstrong-capital-financial-services-pvt-ltd-comprehensive-investment-solutions/",
    logo: "https://armstrong-cap.com/wp-content/uploads/TBF-Logo_Black-1.png",
  },
  {
    title: "Armstrong Capital & Financial Services, A Comprehensive ....",
    href: "https://primeview.co/armstrong-capital-financial-services-a-comprehensive-investment-solution-provider-by-manju-mastakar/",
    logo: "https://armstrong-cap.com/wp-content/uploads/primeview_Logo1-1.png",
  },
  {
    title: "Recession & Rejection that gave birth to the resilient women ....",
    href: "https://entrepreneurinsights.in/armstrong-capital-financial-services-pvt-ltd/",
    logo: "https://armstrong-cap.com/wp-content/uploads/cropped-entrepreneur-insights-new-logo-high-resolution-logo-1-1536x721-1.png",
  },
  {
    title: "Manju Mastakar: A Stock Market Expert Breaking the Stereotype....",
    href: "https://www.mirrorreview.com/manju-mastakar-armstrong-capital-advisory/",
    logo: "https://armstrong-cap.com/wp-content/uploads/MR-logo-768x120-1.webp",
  },
  {
    title: "Armstrong Capital Advisory: The Outstanding Financial .....",
    href: "https://www.insightssuccess.in/armstrong-capital-advisory-the-outstanding-financial-advisory-partner/",
    logo: "https://armstrong-cap.com/wp-content/uploads/Logo-IS.png",
  },
];

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

function parseMarketCardsFromHtml(html) {
  const parts = html.split(/e-con-full market-card/);
  const items = [];

  for (let i = 1; i < parts.length; i++) {
    const chunk = parts[i];
    const imgMatch = chunk.match(/<img[^>]+src="([^"]+)"/i);
    const titleMatch = chunk.match(
      /elementor-heading-title[^>]*>([\s\S]*?)<\/h2>/i,
    );
    const pdfMatch =
      chunk.match(/elementor-icon" href="([^"]+)"/i) ??
      chunk.match(/href="([^"]+\.pdf[^"]*)"/i);

    if (!titleMatch || !pdfMatch) continue;

    items.push({
      id: randomUUID(),
      title: decodeHtml(titleMatch[1]),
      thumbnailUrl: imgMatch?.[1] ?? "",
      pdfUrl: pdfMatch[1],
      sortOrder: items.length,
    });
  }

  return items;
}

function parseArchiveGroups(html) {
  const tabTitles = [
    ...html.matchAll(/e-n-tab-title-text">\s*([^<]+?)\s*<\/span>/gi),
  ].map((match) => match[1].trim());

  if (tabTitles.length === 0) {
    const items = parseMarketCardsFromHtml(html);
    return items.length ? [{ label: "All", items }] : [];
  }

  const panelChunks = html.split(/id="e-n-tab-content-[^"]+"/);
  const groups = [];

  for (let i = 1; i < panelChunks.length && i - 1 < tabTitles.length; i++) {
    const items = parseMarketCardsFromHtml(panelChunks[i]);
    if (items.length === 0) continue;

    groups.push({
      label: tabTitles[i - 1],
      items: items.map((item, index) => ({ ...item, sortOrder: index })),
    });
  }

  if (groups.length === 0) {
    const items = parseMarketCardsFromHtml(html);
    if (items.length) {
      return [{ label: tabTitles[0] ?? "All", items }];
    }
  }

  return groups;
}

function splitArchiveGroupsByYear(groups) {
  const items = groups.flatMap((group) => group.items);
  if (items.length === 0) return groups;

  const buckets = new Map();

  for (const item of items) {
    const year = item.title.match(/\b(20\d{2})\b/)?.[1];
    if (!year) return groups;

    const bucket = buckets.get(year) ?? [];
    bucket.push(item);
    buckets.set(year, bucket);
  }

  if (buckets.size <= 1) return groups;

  return [...buckets.keys()]
    .sort((a, b) => Number(a) - Number(b))
    .map((year) => ({
      label: year,
      items: buckets.get(year).map((item, index) => ({
        ...item,
        sortOrder: index,
      })),
    }));
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

function extractPodcasts(html) {
  const podcasts = [];
  const embeds = [
    ...html.matchAll(/src="(https:\/\/www\.linkedin\.com\/embed\/[^"]+)"/gi),
  ];

  for (const embed of embeds) {
    const index = html.indexOf(embed[1]);
    const after = html.slice(index, index + 2500);
    const titleMatch = after.match(
      /text-editor\.default">[\s\S]*?elementor-widget-container">\s*([^<]+?)\s*</,
    );
    podcasts.push({
      title: decodeHtml(titleMatch?.[1]?.trim() ?? "LinkedIn Podcast"),
      embedUrl: embed[1],
    });
  }

  return podcasts;
}

function readPageJson(slug) {
  const filepath = join(PAGES_DIR, `${slug}.json`);
  return JSON.parse(readFileSync(filepath, "utf8"));
}

function writeKnowledge(filename, data) {
  writeFileSync(join(OUT_DIR, filename), `${JSON.stringify(data, null, 2)}\n`);
}

mkdirSync(OUT_DIR, { recursive: true });
const now = new Date().toISOString();

for (const slug of ARCHIVE_SLUGS) {
  const page = readPageJson(slug);
  let groups = parseArchiveGroups(page.content ?? "");
  if (slug === "newsletters") {
    groups = splitArchiveGroupsByYear(groups);
  }

  writeKnowledge(`${slug}.json`, {
    slug,
    hero: DEFAULT_HERO[slug],
    groups,
    updatedAt: now,
  });

  const count = groups.reduce((sum, group) => sum + group.items.length, 0);
  console.log(`Seeded ${slug}.json (${count} items in ${groups.length} groups)`);
}

const faqsPage = readPageJson("faqs");
writeKnowledge("faqs.json", {
  slug: "faqs",
  faqs: extractFaqs(faqsPage.content ?? ""),
  updatedAt: now,
});
console.log(`Seeded faqs.json (${extractFaqs(faqsPage.content ?? "").length} FAQs)`);

const mediaPage = readPageJson("media-spotlight");
writeKnowledge("media-spotlight.json", {
  slug: "media-spotlight",
  hero: {
    title: "Media Spotlight",
    paragraphs: [
      "Explore press coverage and podcast conversations featuring Armstrong Capital's insights on wealth management and financial planning.",
    ],
  },
  articles: MEDIA_SPOTLIGHTS,
  podcasts: extractPodcasts(mediaPage.content ?? ""),
  updatedAt: now,
});
console.log(
  `Seeded media-spotlight.json (${MEDIA_SPOTLIGHTS.length} articles, ${extractPodcasts(mediaPage.content ?? "").length} podcasts)`,
);

console.log("Knowledge hub seed complete.");
