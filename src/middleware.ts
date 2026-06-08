import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import postSlugs from "../content/posts/_index.json";

const BLOG_SLUGS = new Set(
  postSlugs.items.map((item: { slug: string }) => item.slug),
);

/** Legacy WordPress paths → Next.js routes */
const LEGACY_REDIRECTS: Record<string, string> = {
  "/about": "/about-us",
  "/high-net-worth-individuals": "/high-net-worth-individuals-hnis",
  "/non-resident-indians": "/non-resident-indians-nri",
  "/media": "/media-spotlight",
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const blogPageMatch = pathname.match(/^\/blog\/page\/(\d+)\/?$/);
  if (blogPageMatch) {
    return NextResponse.redirect(
      new URL(`/blog?page=${blogPageMatch[1]}`, request.url),
      301,
    );
  }

  if (pathname in LEGACY_REDIRECTS) {
    return NextResponse.redirect(
      new URL(LEGACY_REDIRECTS[pathname], request.url),
      301,
    );
  }

  const singleSegment = pathname.match(/^\/([^/]+)\/?$/);
  if (singleSegment) {
    const slug = singleSegment[1];

    if (BLOG_SLUGS.has(slug)) {
      return NextResponse.redirect(new URL(`/blog/${slug}`, request.url), 301);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
