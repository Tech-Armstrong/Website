export const SITE_NAME = "Armstrong Capital";
export const SITE_DESCRIPTION =
  "Armstrong Capital and Financial Services Pvt Ltd offers expert financial solutions, investment planning, and wealth management tailored to your goals.";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://armstrong-cap.com";

/** WordPress pages not served at their legacy slug */
export const EXCLUDED_PAGE_SLUGS = new Set([
  "home",
  "home-old-backup",
  "career-send-resume",
  "blog",
  "beginning-to-invest",
  "women-investors",
  "high-net-worth-individuals-hnis",
  "non-resident-indians-nri",
  "pre-retirement-planning",
  "career-transition",
]);
