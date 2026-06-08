import { SITE_URL } from "@/lib/site/config";

export function blogPostShareUrl(slug: string): string {
  return `${SITE_URL}/blog/${slug}`;
}

export function whatsAppShareUrl(url: string, title: string): string {
  return `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`;
}

export function linkedInShareUrl(url: string): string {
  return `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
}
