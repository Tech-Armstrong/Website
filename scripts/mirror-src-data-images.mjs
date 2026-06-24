import {
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  writeFileSync,
} from "node:fs";
import { dirname, join } from "node:path";

const ROOT = process.cwd();
const DATA_DIR = join(ROOT, "src", "data");
const PUBLIC_ARMSTRONG = join(ROOT, "public", "images", "armstrong");

const REMOTE_PREFIX = "https://armstrong-cap.com/wp-content/uploads";
const LOCAL_PREFIX = "/images/armstrong";

const URL_REGEX =
  /https:\/\/armstrong-cap\.com\/wp-content\/uploads\/[^\s"'`)]+/g;
const TEMPLATE_PATH_REGEX = /\$\{UPLOADS\}(\/[^\s`"']+)/g;

function walkTsFiles(dir) {
  const files = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...walkTsFiles(full));
    } else if (entry.name.endsWith(".ts")) {
      files.push(full);
    }
  }
  return files;
}

function remoteToLocal(url) {
  const relative = url.slice(`${REMOTE_PREFIX}/`.length);
  return `${LOCAL_PREFIX}/${relative}`;
}

function collectUrlsFromFile(content) {
  const urls = new Set();

  for (const match of content.matchAll(URL_REGEX)) {
    urls.add(match[0]);
  }

  for (const match of content.matchAll(TEMPLATE_PATH_REGEX)) {
    urls.add(`${REMOTE_PREFIX}${match[1]}`);
  }

  return urls;
}

async function downloadAsset(url) {
  const localUrl = remoteToLocal(url);
  const diskPath = join(ROOT, "public", ...localUrl.slice(1).split("/"));

  if (existsSync(diskPath)) {
    return { url, localUrl, status: "exists" };
  }

  mkdirSync(dirname(diskPath), { recursive: true });

  const response = await fetch(url);
  if (!response.ok) {
    return { url, localUrl, status: "failed", error: `${response.status}` };
  }

  const buffer = Buffer.from(await response.arrayBuffer());
  writeFileSync(diskPath, buffer);

  return { url, localUrl, status: "downloaded" };
}

function rewriteFile(content) {
  let next = content;

  next = next.replaceAll(
    `const UPLOADS = "${REMOTE_PREFIX}"`,
    `const UPLOADS = "${LOCAL_PREFIX}"`,
  );

  const urls = [...content.matchAll(URL_REGEX)].map((match) => match[0]);
  const uniqueUrls = [...new Set(urls)].sort((a, b) => b.length - a.length);

  for (const url of uniqueUrls) {
    next = next.replaceAll(url, remoteToLocal(url));
  }

  return next;
}

async function main() {
  const dataFiles = walkTsFiles(DATA_DIR);
  const allUrls = new Set();

  for (const file of dataFiles) {
    const content = readFileSync(file, "utf8");
    for (const url of collectUrlsFromFile(content)) {
      allUrls.add(url);
    }
  }

  console.log(`Found ${allUrls.size} unique remote asset(s) in src/data`);

  const results = [];
  for (const url of [...allUrls].sort()) {
    results.push(await downloadAsset(url));
  }

  const failed = results.filter((result) => result.status === "failed");
  const downloaded = results.filter((result) => result.status === "downloaded");
  const existed = results.filter((result) => result.status === "exists");

  console.log(
    `Downloaded: ${downloaded.length}, already present: ${existed.length}, failed: ${failed.length}`,
  );

  if (failed.length > 0) {
    for (const item of failed) {
      console.error(`FAILED ${item.url} (${item.error})`);
    }
    process.exitCode = 1;
    return;
  }

  let filesUpdated = 0;
  for (const file of dataFiles) {
    const original = readFileSync(file, "utf8");
    const rewritten = rewriteFile(original);
    if (rewritten !== original) {
      writeFileSync(file, rewritten, "utf8");
      filesUpdated += 1;
      console.log(`Updated ${file.replace(ROOT + "\\", "").replace(ROOT + "/", "")}`);
    }
  }

  console.log(`Rewrote ${filesUpdated} file(s) under src/data`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
