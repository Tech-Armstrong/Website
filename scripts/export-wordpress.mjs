/**
 * Export WordPress pages and posts (with featured images + metadata) to JSON.
 *
 * Usage:
 *   node scripts/export-wordpress.mjs
 *   WP_BASE_URL=https://armstrong-cap.com node scripts/export-wordpress.mjs
 */

import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

const BASE_URL = (process.env.WP_BASE_URL ?? "https://armstrong-cap.com").replace(
  /\/$/,
  "",
);
const API = `${BASE_URL}/wp-json/wp/v2`;
const PER_PAGE = 100;

const CONTENT_DIR = path.join(ROOT, "content");
const PAGES_DIR = path.join(CONTENT_DIR, "pages");
const POSTS_DIR = path.join(CONTENT_DIR, "posts");

/** @type {Map<number, object|null>} */
const mediaCache = new Map();

/**
 * @param {string} url
 * @param {RequestInit} [init]
 */
async function fetchJson(url, init) {
  const res = await fetch(url, {
    ...init,
    headers: {
      Accept: "application/json",
      ...init?.headers,
    },
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`HTTP ${res.status} for ${url}\n${body.slice(0, 500)}`);
  }

  return /** @type {Promise<{ data: unknown; headers: Headers }>} */ ({
    data: await res.json(),
    headers: res.headers,
  });
}

/**
 * @param {"pages"|"posts"} type
 */
async function fetchAll(type) {
  /** @type {object[]} */
  const items = [];
  let page = 1;
  let totalPages = 1;

  while (page <= totalPages) {
    const url = `${API}/${type}?per_page=${PER_PAGE}&page=${page}&status=publish`;
    const { data, headers } = await fetchJson(url);

    if (!Array.isArray(data)) {
      throw new Error(`Expected array from ${url}`);
    }

    items.push(...data);

    totalPages = Number(headers.get("X-WP-TotalPages") ?? 1);
    const total = headers.get("X-WP-Total");
    console.log(
      `  Fetched ${type} page ${page}/${totalPages} (${data.length} items, ${total ?? "?"} total)`,
    );
    page += 1;
  }

  return items;
}

/**
 * @param {number} mediaId
 */
async function fetchFeaturedMedia(mediaId) {
  if (!mediaId) return null;

  if (mediaCache.has(mediaId)) {
    return mediaCache.get(mediaId) ?? null;
  }

  try {
    const { data } = await fetchJson(`${API}/media/${mediaId}`);
    const featured = normalizeMedia(/** @type {Record<string, unknown>} */ (data));
    mediaCache.set(mediaId, featured);
    return featured;
  } catch (err) {
    console.warn(`  Warning: could not fetch media ${mediaId}: ${err.message}`);
    mediaCache.set(mediaId, null);
    return null;
  }
}

/**
 * @param {Record<string, unknown>} media
 */
function normalizeMedia(media) {
  const details = /** @type {Record<string, unknown>} */ (
    media.media_details ?? {}
  );
  const sizes = /** @type {Record<string, unknown>} */ (details.sizes ?? {});

  return {
    id: media.id,
    slug: media.slug,
    link: media.link,
    title: getRendered(media.title),
    alt_text: media.alt_text ?? "",
    caption: getRendered(media.caption),
    description: getRendered(media.description),
    mime_type: media.mime_type,
    media_type: media.media_type,
    source_url: media.source_url,
    width: details.width ?? null,
    height: details.height ?? null,
    file: details.file ?? null,
    sizes: Object.fromEntries(
      Object.entries(sizes).map(([key, val]) => {
        const size = /** @type {Record<string, unknown>} */ (val);
        return [
          key,
          {
            source_url: size.source_url,
            width: size.width,
            height: size.height,
            mime_type: size.mime_type,
          },
        ];
      }),
    ),
    date: media.date,
    modified: media.modified,
  };
}

/**
 * @param {unknown} field
 */
function getRendered(field) {
  if (field && typeof field === "object" && "rendered" in field) {
    return /** @type {{ rendered: string }} */ (field).rendered;
  }
  return "";
}

/**
 * @param {Record<string, unknown>} item
 * @param {"page"|"post"} contentType
 */
async function normalizeContentItem(item, contentType) {
  const featuredMediaId = Number(item.featured_media ?? 0);
  const featuredImage = await fetchFeaturedMedia(featuredMediaId);

  return {
    id: item.id,
    type: contentType,
    slug: item.slug,
    status: item.status,
    link: item.link,
    date: item.date,
    date_gmt: item.date_gmt,
    modified: item.modified,
    modified_gmt: item.modified_gmt,
    guid: item.guid,
    title: getRendered(item.title),
    excerpt: getRendered(item.excerpt),
    content: getRendered(item.content),
    author: item.author,
    featured_media_id: featuredMediaId || null,
    featured_image: featuredImage,
    parent: item.parent ?? 0,
    menu_order: item.menu_order ?? 0,
    template: item.template ?? "",
    comment_status: item.comment_status,
    ping_status: item.ping_status,
    meta: item.meta ?? {},
    categories: item.categories ?? undefined,
    tags: item.tags ?? undefined,
    class_list: item.class_list ?? [],
    yoast: item.yoast_head_json ?? null,
    _links: item._links ?? {},
    exported_at: new Date().toISOString(),
    source_url: `${API}/${contentType === "page" ? "pages" : "posts"}/${item.id}`,
  };
}

/**
 * @param {string} slug
 */
function safeFilename(slug) {
  return String(slug)
    .replace(/[<>:"/\\|?*]/g, "-")
    .replace(/\s+/g, "-")
    .toLowerCase();
}

/**
 * @param {object[]} items
 * @param {string} dir
 * @param {"page"|"post"} contentType
 */
async function writeItems(items, dir, contentType) {
  /** @type {object[]} */
  const manifest = [];

  for (const item of items) {
    const normalized = await normalizeContentItem(
      /** @type {Record<string, unknown>} */ (item),
      contentType,
    );
    const filename = `${safeFilename(normalized.slug)}.json`;
    const filepath = path.join(dir, filename);

    await writeFile(filepath, JSON.stringify(normalized, null, 2), "utf8");

    manifest.push({
      id: normalized.id,
      slug: normalized.slug,
      title: normalized.title,
      link: normalized.link,
      modified: normalized.modified,
      featured_media_id: normalized.featured_media_id,
      file: filename,
    });

    console.log(`  Wrote ${path.relative(ROOT, filepath)}`);
  }

  const indexPath = path.join(dir, "_index.json");
  await writeFile(
    indexPath,
    JSON.stringify(
      {
        exported_at: new Date().toISOString(),
        base_url: BASE_URL,
        count: manifest.length,
        items: manifest,
      },
      null,
      2,
    ),
    "utf8",
  );

  console.log(`  Wrote ${path.relative(ROOT, indexPath)}`);
  return manifest.length;
}

async function main() {
  console.log(`Exporting WordPress content from ${BASE_URL}\n`);

  await mkdir(PAGES_DIR, { recursive: true });
  await mkdir(POSTS_DIR, { recursive: true });

  console.log("Fetching pages...");
  const pages = await fetchAll("pages");
  console.log(`\nWriting ${pages.length} pages to content/pages/`);
  const pageCount = await writeItems(pages, PAGES_DIR, "page");

  console.log("\nFetching posts...");
  const posts = await fetchAll("posts");
  console.log(`\nWriting ${posts.length} posts to content/posts/`);
  const postCount = await writeItems(posts, POSTS_DIR, "post");

  const summary = {
    exported_at: new Date().toISOString(),
    base_url: BASE_URL,
    pages: pageCount,
    posts: postCount,
    unique_media_cached: mediaCache.size,
  };

  await writeFile(
    path.join(CONTENT_DIR, "_export-summary.json"),
    JSON.stringify(summary, null, 2),
    "utf8",
  );

  console.log("\nDone.");
  console.log(JSON.stringify(summary, null, 2));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
