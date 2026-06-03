const ENTITY_MAP: Record<string, string> = {
  "&amp;": "&",
  "&lt;": "<",
  "&gt;": ">",
  "&quot;": '"',
  "&#39;": "'",
  "&apos;": "'",
  "&nbsp;": " ",
  "&hellip;": "…",
  "&#8217;": "'",
  "&#8216;": "'",
  "&#8220;": "\u201C",
  "&#8221;": "\u201D",
  "&#8230;": "…",
};

export function decodeHtmlEntities(text: string): string {
  return text
    .replace(/&#(\d+);/g, (_, code) =>
      String.fromCharCode(Number.parseInt(code, 10)),
    )
    .replace(/&#x([0-9a-f]+);/gi, (_, code) =>
      String.fromCharCode(Number.parseInt(code, 16)),
    )
    .replace(
      /&(amp|lt|gt|quot|apos|nbsp|hellip);/gi,
      (match) => ENTITY_MAP[match.toLowerCase()] ?? match,
    );
}

export function stripHtml(html: string): string {
  return decodeHtmlEntities(
    html
      .replace(/<script[\s\S]*?<\/script>/gi, "")
      .replace(/<style[\s\S]*?<\/style>/gi, "")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim(),
  );
}

/** Add noopener to external links in migrated HTML */
export function enhanceContentHtml(html: string): string {
  return html.replace(
    /<a\s+([^>]*href=["']https?:\/\/[^"']+["'][^>]*)>/gi,
    (match, attrs) => {
      if (/target=/i.test(attrs)) return match;
      if (/rel=/i.test(attrs)) {
        return `<a ${attrs.replace(/rel=["']([^"']*)["']/i, 'rel="$1 noopener noreferrer"')}>`;
      }
      return `<a ${attrs} target="_blank" rel="noopener noreferrer">`;
    },
  );
}

export function excerptFromHtml(html: string, maxLength = 160): string {
  const plain = stripHtml(html);
  if (plain.length <= maxLength) return plain;
  return `${plain.slice(0, maxLength).trimEnd()}…`;
}
