import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifySessionTokenEdge } from "./lib/admin/auth-edge";

const ADMIN_SESSION_COOKIE = "admin_session";

/** Legacy WordPress paths → Next.js routes */
const LEGACY_REDIRECTS: Record<string, string> = {
  "/about": "/about-us",
  "/high-net-worth-individuals": "/high-net-worth-individuals-hnis",
  "/non-resident-indians": "/non-resident-indians-nri",
  "/media": "/media-spotlight",
};

let blogSlugCache: { slugs: Set<string>; fetchedAt: number } | null = null;
const BLOG_SLUG_CACHE_MS = 3000;

async function isAuthenticated(request: NextRequest): Promise<boolean> {
  const token = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;
  return verifySessionTokenEdge(token);
}

async function getBlogSlugs(request: NextRequest): Promise<Set<string>> {
  const now = Date.now();
  if (blogSlugCache && now - blogSlugCache.fetchedAt < BLOG_SLUG_CACHE_MS) {
    return blogSlugCache.slugs;
  }

  try {
    const response = await fetch(
      new URL("/api/internal/blog-slugs", request.url),
      { cache: "no-store" },
    );

    if (!response.ok) {
      return blogSlugCache?.slugs ?? new Set();
    }

    const slugs = (await response.json()) as string[];
    blogSlugCache = { slugs: new Set(slugs), fetchedAt: now };
    return blogSlugCache.slugs;
  } catch {
    return blogSlugCache?.slugs ?? new Set();
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/api/internal/")) {
    return NextResponse.next();
  }

  if (pathname.startsWith("/admin") || pathname.startsWith("/api/admin")) {
    const authenticated = await isAuthenticated(request);
    const isLoginRoute = pathname === "/admin/login";

    if (!authenticated && !isLoginRoute) {
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("next", pathname);
      return NextResponse.redirect(loginUrl);
    }

    if (authenticated && isLoginRoute) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
  }

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
    const blogSlugs = await getBlogSlugs(request);

    if (blogSlugs.has(slug)) {
      return NextResponse.redirect(new URL(`/blog/${slug}`, request.url), 301);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|pdf)$).*)",
  ],
};
