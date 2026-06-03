/**
 * Site migration audit: routes, internal links, SEO files.
 * Usage: node scripts/audit-site.mjs
 */

import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const EXCLUDED_PAGES = new Set([
  "home",
  "home-old-backup",
  "career-send-resume",
  "blog",
]);

async function loadJson(filePath) {
  return JSON.parse(await readFile(filePath, "utf8"));
}

async function getImplementedRoutes() {
  const routes = new Set(["/", "/blog"]);

  const postsIndex = await loadJson(
    path.join(ROOT, "content", "posts", "_index.json"),
  );
  for (const item of postsIndex.items) {
    routes.add(`/blog/${item.slug}`);
  }

  const pagesDir = path.join(ROOT, "content", "pages");
  const files = await readdir(pagesDir);
  for (const file of files) {
    if (!file.endsWith(".json") || file === "_index.json") continue;
    const page = await loadJson(path.join(pagesDir, file));
    if (page.status === "publish" && !EXCLUDED_PAGES.has(page.slug)) {
      routes.add(`/${page.slug}`);
    }
  }

  routes.add("/sitemap.xml");
  routes.add("/robots.txt");

  return routes;
}

function extractInternalHrefs(source) {
  const hrefs = new Set();
  const re = /href=["'](\/[^"'#?]*)/g;
  let match;
  while ((match = re.exec(source)) !== null) {
    hrefs.add(match[1].replace(/\/$/, "") || "/");
  }
  return hrefs;
}

async function scanSourceLinks() {
  const srcDir = path.join(ROOT, "src");
  const hrefs = new Set();

  async function walk(dir) {
    const entries = await readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        await walk(full);
      } else if (/\.(tsx|ts|jsx|js)$/.test(entry.name)) {
        const content = await readFile(full, "utf8");
        for (const href of extractInternalHrefs(content)) {
          hrefs.add(href);
        }
      }
    }
  }

  await walk(srcDir);
  return hrefs;
}

async function main() {
  const routes = await getImplementedRoutes();
  const hrefs = await scanSourceLinks();

  const broken = [...hrefs].filter((href) => !routes.has(href));

  const pagesIndex = await loadJson(
    path.join(ROOT, "content", "pages", "_index.json"),
  );
  const missingPages = pagesIndex.items
    .filter((item) => !EXCLUDED_PAGES.has(item.slug))
    .filter((item) => !routes.has(`/${item.slug}`))
    .map((item) => item.slug);

  const postsIndex = await loadJson(
    path.join(ROOT, "content", "posts", "_index.json"),
  );
  const missingBlogRedirects = postsIndex.items
    .filter((item) => !routes.has(`/${item.slug}`))
    .map((item) => `/${item.slug} → /blog/${item.slug}`);

  const report = {
    generated_at: new Date().toISOString(),
    implemented_route_count: routes.size,
    broken_internal_links: broken,
    missing_marketing_pages: missingPages,
    legacy_blog_paths_needing_redirect: missingBlogRedirects.length,
    seo_files: {
      sitemap: routes.has("/sitemap.xml"),
      robots: routes.has("/robots.txt"),
    },
  };

  console.log(JSON.stringify(report, null, 2));

  if (broken.length > 0) {
    console.error("\nBroken internal links:", broken.join(", "));
    process.exitCode = 1;
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
