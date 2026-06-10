# UI Change Checklist

Paste this into any UI task plan. Fill in the bracketed sections before starting work.

---

## Task scope

- **Goal:** [One sentence describing the change]
- **Pages affected:** [e.g. `/`, `/blog`, `/about-us`, marketing slug pages]
- **Out of scope:** [Explicitly list what this task does NOT touch]

---

## Files allowed to change

List only files this task may modify:

- [ ] `path/to/file.tsx`
- [ ] `path/to/other.tsx`

---

## Blast-radius files — OFF-LIMITS

Do **not** edit these unless the task explicitly targets them:

- [ ] `src/app/globals.css`
- [ ] `src/app/layout.tsx`
- [ ] `tailwind.config.*` (none currently; tokens live in globals.css)
- [ ] `src/components/ui/*`
- [ ] `src/components/layout/*`

If a blast-radius file must change: grep every class, CSS variable, and export you will modify; list all usage sites and impact before editing.

---

## Token compliance

- [ ] Colors use only `brand-*` Tailwind classes or CSS variables from globals.css — no new raw hex, rgb(), or palette colors (e.g. `slate-500`)
- [ ] Typography uses `font-display` or `font-body` with an existing role size from [design-system.md](../design-system.md)
- [ ] Spacing, radii, and shadows reuse established values (grep first); new arbitrary values justified
- [ ] Header-dependent offsets use `var(--site-header-offset)` — no hardcoded header heights

---

## Breakpoint matrix

Verify layout and behavior at each width. Check boxes and note any issues.

| Width | Checked | Notes |
|-------|---------|-------|
| 360px | [ ] | |
| 768px | [ ] | |
| 1024px | [ ] | |
| 1440px | [ ] | |

---

## A11y checks

- [ ] Interactive elements have `focus-settle` (or equivalent focus-visible styles)
- [ ] Correct ARIA roles / labels on tabs, dialogs, carousels, accordions
- [ ] Keyboard operable (Tab, Enter, Escape, arrow keys where applicable)
- [ ] `next/image` used with appropriate `sizes` prop
- [ ] Decorative images use `alt=""`
- [ ] `prefers-reduced-motion`: animations and scroll-driven effects disabled or static fallback

---

## Consumer grep audit

Before changing any export, prop, class name, or CSS variable:

```bash
# Example — replace PATTERN with the symbol you are changing
rg "PATTERN" src/
```

| Changed symbol | Usage sites found | Impact / action |
|----------------|-------------------|-----------------|
| [e.g. SectionTitle] | [list files] | [unaffected / updated in same PR] |
| | | |

If you cannot list all consumers confidently, the task is not done.

---

## Regression check

Complete before marking the task done:

1. **Files changed and why**
   - [File]: [reason]

2. **Shared tokens/components touched**
   - [Ideally: none — list any that were]

3. **Downstream consumers (from grep)**
   - [Component/token]: used by [pages/components] — [why unaffected or what was updated]

4. **Breakpoints and reduced-motion**
   - Breakpoints verified: [360 / 768 / 1024 / 1440]
   - Reduced-motion: [describe fallback behavior]
