# Migration audit report

Generated: 2026-06-03

## Route coverage

| Category | WordPress | Next.js | Status |
|----------|-----------|---------|--------|
| Homepage | `/` | `/` | Partial UI (hero, services, CTA, footer only) |
| Marketing pages | 27 public pages | `/[slug]` (27 SSG) | Content from JSON (Elementor HTML) |
| Blog posts | 33 at root slug | `/blog/[slug]` (33 SSG) | Full parity |
| Blog index | `/blog` | `/blog` | Implemented |

Excluded: `home-old-backup`, `career-send-resume`, WP `blog` page (replaced by `/blog`).

## SEO parity

| Check | Before | After |
|-------|--------|-------|
| `metadataBase` + canonical | Missing on home | Fixed |
| Per-route Yoast metadata | Blog only | Blog + marketing pages |
| `sitemap.xml` | Missing (WP 500) | `/sitemap.xml` (64 URLs) |
| `robots.txt` | Missing | `/robots.txt` |
| Article JSON-LD | Blog posts | Blog posts |
| Legacy blog URLs | `/post-slug` | 301 → `/blog/post-slug` (middleware) |
| Legacy paths | `/about`, `/media`, etc. | 301 redirects in middleware |

**Gap:** Homepage missing ~70% of sections (about, why choose, testimonials, stats). SEO title/description present; content depth lower than production.

## Broken links

`npm run audit:site` — **0 broken internal links** after marketing page routes were added.

## Accessibility

| Issue | Severity | Fix |
|-------|----------|-----|
| No skip link | High | `SkipLink` component |
| Missing `#main-content` | High | Added to all main layouts |
| Hero carousel ARIA | Medium | `aria-roledescription`, tabs, reduced motion |
| Focus indicators | Medium | `focus-visible` on controls |
| Footer Terms `href="#"` | Medium | Plain text until page exists |
| WP HTML duplicate headings | Medium | Marketing pages may have h2 after h1 in body |
| Color contrast on muted text | Low | Review `#9ca4af` on dark footer |

Lighthouse accessibility (local dev): Home **85**, Blog **96**, About **94**.

## Lighthouse (localhost dev)

| Page | Performance | Accessibility | Best practices | SEO |
|------|-------------|---------------|----------------|-----|
| `/` | 62 | 85 | 100 | 100 |
| `/blog` | 60 | 96 | 100 | 100 |

**Performance bottlenecks:** Remote hero images (LCP ~8s on dev), client-side carousels (TBT ~420ms), unused JS from Next dev bundles.

**Production expectations:** Scores improve with CDN, local/optimized images, and production build (not `next dev`).

## Mobile responsiveness

Tailwind breakpoints used (`md:`, `lg:`). Hero typography scales 50px → 100px. Services carousel 1/2/4 columns. Footer stacks on mobile.

**Gap:** No global header/navigation or mobile menu (production has megamenu).

## Recommended next steps

1. Migrate homepage sections (about, why choose, testimonials, stats).
2. Add `SiteHeader` with megamenu.
3. Self-host critical images in `/public` or CDN.
4. Replace raw Elementor HTML with structured React sections for marketing pages.
5. Wire appointment form to API/email.
6. Add Terms & Conditions page when copy is available.
