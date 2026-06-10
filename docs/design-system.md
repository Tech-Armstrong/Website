# Armstrong Design System

Reference extracted from `src/app/globals.css`, `src/app/layout.tsx`, and representative components. Use this doc when scoping UI changes and consumer-grep audits.

---

## Color tokens

Defined in `:root` and exposed to Tailwind via `@theme inline` in [`src/app/globals.css`](../src/app/globals.css).

| Token (CSS var / Tailwind) | Value | Intended role |
|----------------------------|-------|---------------|
| `--brand-navy` / `brand-navy` | `#272e39` | Primary body text, default foreground |
| `--brand-blue` / `brand-blue` | `#0a6d9c` | Accent, links, CTAs, focus rings, active nav |
| `--brand-pink` / `brand-pink` | `#f66587` | Active indicators (e.g. team scroll dots) |
| `--brand-green` / `brand-green` | `#7ab036` | Secondary accent (available, sparse use) |
| `--brand-dark` / `brand-dark` | `#14203a` | Dark panels, footer, hero overlay base, theme-color |
| `--brand-muted` / `brand-muted` | `#5f6b7a` | Secondary / meta text |
| `--brand-surface` / `brand-surface` | `#f7f7f7` | Subtle backgrounds, skeletons, placeholders |

### Layout & elevation variables

| Token | Value | Role |
|-------|-------|------|
| `--container-max` | `1200px` | Max width for `.site-container` |
| `--site-header-offset` | `7rem` (default), `8rem` at `min-width: 1024px` | Fixed header clearance for sticky/pinned sections |
| `--elevation-card` | `0 1px 2px -1px rgba(39,46,57,0.08), 0 2px 8px -2px rgba(10,109,156,0.08)` | Default card shadow (`.lift-card`) |
| `--elevation-card-hover` | `0 2px 4px -1px rgba(39,46,57,0.1), 0 8px 24px -4px rgba(10,109,156,0.14)` | Card hover shadow |
| `--elevation-header` | `0 8px 30px rgba(39,46,57,0.12)` | Header shell default |
| `--elevation-header-scrolled` | `0 4px 20px rgba(39,46,57,0.1)` | Header shell when scrolled |
| `--elevation-pop` | `0 8px 40px -8px rgba(20,32,58,0.18)` | Nav dropdown popover |

### Motion tokens

| Token | Value | Role |
|-------|-------|------|
| `--ease-settle` | `cubic-bezier(0.22, 1, 0.36, 1)` | Primary motion curve ("Settle & Lift") |
| `--ease-settle-soft` | `cubic-bezier(0.33, 1, 0.68, 1)` | Softer settle variant |
| `--dur-1` | `120ms` | Micro transitions |
| `--dur-2` | `200ms` | Focus, dropdown open |
| `--dur-3` | `320ms` | Card lift, nav panel |
| `--dur-4` | `480ms` | Page enter (e.g. not-found) |

**Rule:** Component code should use `brand-*` Tailwind classes or CSS variables above. Raw hex/rgb in components is legacy drift — do not add more.

---

## Typography

### Font families

Loaded in [`src/app/layout.tsx`](../src/app/layout.tsx):

| Role | Next font | CSS variable | Tailwind class | Weights |
|------|-----------|--------------|----------------|---------|
| Display / headings | Urbanist | `--font-urbanist` | `font-display` | 400, 500, 600, 700 |
| Body / UI copy | Mulish | `--font-mulish` | `font-body` | 400, 500, 600, 700 |

Body default: `font-body antialiased` on `<body>`, color `var(--brand-navy)`.

### Type scale by role

Values observed in [`SectionTitle`](../src/components/ui/SectionTitle.tsx), [`Hero`](../src/components/home/Hero.tsx), [`BlogPostHeader`](../src/components/blog/BlogPostHeader.tsx), [`BlogCard`](../src/components/blog/BlogCard.tsx), [`StatsSection`](../src/components/home/StatsSection.tsx):

| Role | Size / weight / leading | Source |
|------|-------------------------|--------|
| **Hero display** | `text-4xl` → `sm:text-5xl` → `md:text-[56px]` → `lg:text-[64px] lg:leading-[1.08]`; `font-display font-semibold` | Hero h2 |
| **Section h2** | `text-[26px] leading-[34px]` → `sm:text-[30px] sm:leading-[38px]` → `md:text-[32px] md:leading-[40px]`; semibold | SectionTitle |
| **Page h1 (blog)** | `text-[32px]` → `md:text-[42px] md:leading-[1.15]`; semibold | BlogPostHeader |
| **Card h2** | `text-xl font-semibold leading-snug` | BlogCard |
| **Eyebrow** | `text-[11px]` → `sm:text-xs sm:leading-[26px]`; bold uppercase; brand-blue pill border/bg | SectionTitle |
| **Body** | `text-base leading-relaxed` or `text-[15px]` / `text-[17px]` with relaxed leading | AboutSection, BlogCard |
| **Caption / meta** | `text-sm` or `text-xs`; `text-brand-muted` | BlogCard date, RelatedPosts |
| **Stats numerals** | `text-4xl` → `md:text-5xl` → `lg:text-[52px]`; tabular-nums semibold | StatsSection |

### Theme button (globals.css)

`.theme-btn`: Urbanist, `18px` / `28px` line-height, weight 600, padding `16px 40px`, asymmetric radius `35px 35px 0 35px`.

---

## Spacing & layout

### `.site-container`

```css
width: 100%;
max-width: var(--container-max); /* 1200px */
margin-inline: auto;
```

Used in: Hero, home sections (About, Services, Stats, Testimonials, Why Choose, Media), Footer, about-us pages, blog post content, MarketingPageShell, loading skeleton.

### `.home-section`

Homepage section rhythm:

| Breakpoint | Padding |
|------------|---------|
| Default | `padding-inline: 1rem`; `padding-block: 4rem` |
| `sm` (640px+) | `padding-block: 5rem` |
| `lg` (1024px+) | `padding-block: 6rem` |

Used by AboutSection, ServicesSection, MediaSpotlightsSection, WhyChooseSection.

### Inner-page header clearance

Marketing, blog, and about-us pages use main padding instead of the CSS variable directly:

- `pt-28 lg:pt-32` on `<main id="main-content">` ([MarketingPageShell](../src/components/marketing/MarketingPageShell.tsx), blog pages, about-us)
- Pairs with `--site-header-offset`: `7rem` (112px) default, `8rem` (128px) at `lg`

Home page Hero is full-bleed; no top padding on main.

### Card radii & shadows

| Pattern | Classes | Used for |
|---------|---------|----------|
| Marketing / contact cards | `rounded-xl` + `border border-[#e8eaed]` + `.lift-card` | MarketingFeatures, ContactInfoCards, TeamMemberCard |
| Blog / feature cards | `rounded-2xl` + `.lift-card` | BlogCard, AboutUsFeatures |
| Large dark panels | `rounded-2xl lg:rounded-3xl` | AboutUsQuote, TestimonialsSection, WhyChooseSection outer shell |
| Header shell | `rounded-2xl sm:rounded-[1.25rem]` | SiteHeader |

**Shadows:** Prefer `--elevation-*` via `.lift-card`, `.header-shell`, `.testimonial-panel`. Nav dropdown uses `shadow-[var(--elevation-pop)]`.

### Section dividers

Many sections use `border-t border-[#eef0f2]` — not yet tokenized (see inconsistencies).

---

## Breakpoint strategy

Primary breakpoint: **`lg` (1024px)**.

| At `lg` | Behavior |
|---------|----------|
| Header | Taller `--site-header-offset` (8rem); desktop nav visible |
| Home sections | Taller `.home-section` block padding (6rem) |
| Grids | Multi-column layouts (e.g. About 2-col, Services carousel, marketing sidebar `lg:grid-cols-[minmax(0,1fr)_280px]`) |
| Scroll-drive | Desktop pin activates (Why Choose, Team grid) when not reduced-motion |

### max-lg mobile-pin pattern (Why Choose)

In [`WhyChooseSection`](../src/components/home/WhyChooseSection.tsx):

```
max-lg:scroll-mt-[var(--site-header-offset)]
max-lg:sticky max-lg:top-[var(--site-header-offset)]
max-lg:h-[calc(100dvh-var(--site-header-offset))]
max-lg:max-h-[calc(100svh-var(--site-header-offset))]
```

Companion CSS class `.why-choose-mobile-pin` in globals.css tightens typography and spacing below 1024px (and further at `max-height: 500px`).

### `--site-header-offset` usage

| Location | Usage |
|----------|--------|
| globals.css | Defined; comment notes match to `pt-28` / `lg:pt-32` |
| WhyChooseSection | Sticky top, scroll-mt, viewport height calc; `getSiteHeaderOffsetPx()` for scroll-to-tab |
| MarketingTeamGrid | `scroll-mt`, sticky top, `h-[calc(100dvh-var(--site-header-offset))]` |

---

## Motion

### Global wrapper

[`MotionProvider`](../src/components/ui/MotionProvider.tsx) wraps the app in `layout.tsx`:

- `reducedMotion="user"` (respects OS preference)
- Default transition: `duration: 0.65`, ease `[0.22, 1, 0.36, 1]`

### Scroll reveal

[`ScrollReveal`](../src/components/ui/ScrollReveal.tsx):

- IntersectionObserver (`threshold: 0.12`, `rootMargin: 0px 0px -40px 0px`)
- Framer-motion animate from offset (28px up/left/right)
- `prefers-reduced-motion`: renders plain `<div>`, no animation
- Desktop breakpoint at 1024px for optional `mobileDirection`

Legacy CSS classes `.scroll-reveal*` exist in globals.css but pages import the React component.

### Scroll-drive pattern

| Component | Mechanism | Reduced-motion |
|-----------|-----------|----------------|
| WhyChooseScrollDrive | Framer `useScroll` on track ref → maps progress to tab index | Disables pin + scroll-drive (`scrollDriveActive = false`) |
| TeamScrollDrive | Same pattern for team carousel | `pinActive = !reduceMotion` in MarketingTeamGrid |

Track height scales with item count (Why Choose: one viewport per tab; Team: fixed `400vh` runway).

### panel-fade-in

```css
@keyframes panel-fade-in {
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
}
.panel-fade-in { animation: panel-fade-in 0.4s cubic-bezier(0.22, 1, 0.36, 1) both; }
```

Used on Why Choose tab panels and not-found enter.

### Reduced-motion policy

`@media (prefers-reduced-motion: reduce)` in globals.css:

- Sets all animation/transition durations to ~0
- Forces `.scroll-reveal`, `.panel-fade-in`, `.hover-lift`, `.lift-card:hover`, nav panels, FAQ grid to static state
- Component gates additionally disable: Hero typewriter, testimonial auto-advance interval, scroll-pin sections

### Other motion utilities

| Class | Purpose |
|-------|---------|
| `.focus-settle` | Focus-visible: 2px brand-blue outline + soft glow |
| `.hover-lift` / `.lift-card` | translateY(-4px) + elevation on hover |
| `.testimonial-fade-in` | Horizontal fade for testimonial avatars |
| `.about-ring-spin` | 28s rotating ring (disabled under reduced-motion) |

---

## Component inventory

Shared components and where they are consumed. Run grep on these before changing exports, props, or class names.

### Global chrome (every page)

| Component | File | Mounted from |
|-----------|------|--------------|
| SiteHeader | `src/components/layout/SiteHeader.tsx` | `src/app/layout.tsx` |
| MobileNav | `src/components/layout/MobileNav.tsx` | SiteHeader |
| NavDropdown | `src/components/layout/NavDropdown.tsx` | SiteHeader |
| SkipLink | `src/components/layout/SkipLink.tsx` | `src/app/layout.tsx` |
| MotionProvider | `src/components/ui/MotionProvider.tsx` | `src/app/layout.tsx` |
| CalendlyBadge | `src/components/integrations/CalendlyBadge.tsx` | `src/app/layout.tsx` |

### `src/components/ui/`

| Component | Consumers |
|-----------|-----------|
| **ScrollReveal** | AboutSection, ServicesSection, StatsSection, MediaSpotlightsSection, TestimonialsSection, AboutUsHero, AboutUsFeatures, AboutUsQuote, blog/page, BlogPostHeader, BlogPostContent, RelatedPosts, ContactPageIntro, ContactInfoCards, MarketingPageShell, MarketingHero, MarketingFeatures, MarketingPlanGrid, MarketingCareerSections, MarketingFaqAccordion, MarketingMediaTabs, MarketingQuote, MarketingPageRenderer, about-us/page |
| **SectionTitle** | AboutSection, ServicesSection, AboutUsFeatures, MarketingFeatures |
| **CountUp** | StatsSection |

### `src/components/layout/`

| Component | Consumers |
|-----------|-----------|
| **Footer** | `src/app/page.tsx`, blog routes, about-us, MarketingPageShell, error.tsx, not-found.tsx, blog/not-found.tsx |

### `src/components/blog/`

| Component | Consumers |
|-----------|-----------|
| **Breadcrumbs** | blog/page, blog/[slug], about-us/page, MarketingPageShell |
| **BlogCard** | blog/page |
| **BlogPostShell** | blog/[slug]/page |
| **BlogPostHeader, BlogPostContent, BlogPostShare, RelatedPosts** | blog/[slug]/page |

### `src/components/marketing/`

| Component | Consumers |
|-----------|-----------|
| **MarketingPageRenderer** | `src/app/[slug]/page.tsx`, `src/app/beginning-to-invest/page.tsx` |
| **MarketingPageShell** | MarketingPageRenderer |
| **Sidebars** (AboutSidebar, ServiceSidebar, SegmentSidebar, KnowledgeSidebar) | MarketingPageRenderer (by category) |
| **MarketingHero, MarketingFeatures, MarketingPlanGrid, MarketingTeamGrid, MarketingFaqAccordion, MarketingMediaTabs, MarketingQuote, MarketingCareerSections** | MarketingPageRenderer (conditional on page config) |

### `src/components/home/` (home page only)

| Component | Mounted from |
|-----------|--------------|
| Hero, StatsSection, AboutSection, ServicesSection, WhyChooseSection, MediaSpotlightsSection, TestimonialsSection | `src/app/page.tsx` |

### Global CSS classes (grep before rename)

| Class | Used across |
|-------|-------------|
| `.site-container` | Home sections, Footer, marketing shell, about-us, blog |
| `.home-section` | AboutSection, ServicesSection, MediaSpotlightsSection, WhyChooseSection |
| `.lift-card` | BlogCard, marketing cards, contact cards, team cards |
| `.focus-settle` | Links, buttons, nav, pagination site-wide |
| `.theme-btn.btn-two` | Hero CTA, footer CTA |
| `.panel-fade-in` | WhyChooseSection tab panels |

### Page → component map

| Route | Top-level components |
|-------|---------------------|
| `/` | Hero, StatsSection, AboutSection, ServicesSection, WhyChooseSection, MediaSpotlightsSection, TestimonialsSection, Footer |
| `/about-us` | AboutUsHero, AboutUsFeatures, AboutUsQuote, Breadcrumbs, Footer |
| `/blog`, `/blog/[slug]` | BlogCard / BlogPostShell + blog subcomponents, Footer |
| `/[slug]`, `/beginning-to-invest` | MarketingPageRenderer → shell + conditional marketing blocks, Footer |
| All routes | SiteHeader, SkipLink, MotionProvider (layout) |

---

This file is the source of truth. If code and this doc disagree, flag it — don't silently pick one.
