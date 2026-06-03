import { stripHtml } from "./html";

const WORDS_PER_MINUTE = 200;

export function countWords(text: string): number {
  const trimmed = text.trim();
  if (!trimmed) return 0;
  return trimmed.split(/\s+/).length;
}

export function calculateReadingTimeMinutes(
  contentHtml: string,
  excerptHtml = "",
): number {
  const words = countWords(stripHtml(contentHtml || excerptHtml));
  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
}

export function formatReadingTime(minutes: number): string {
  return minutes === 1 ? "1 min read" : `${minutes} min read`;
}
