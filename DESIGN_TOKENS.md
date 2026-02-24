# Design tokens

Design tokens are **Tailwind-first**: they live in `src/app/globals.css` in the `@theme` block and in `:root` / `.dark`. No separate token files; no `tailwind.config`. Change the look by editing that single file (and font loading in `src/app/layout.tsx`).

---

## Where tokens live

| Category   | Defined in       | Mapped in `@theme` as        |
|-----------|------------------|------------------------------|
| Colors    | `:root` / `.dark`| `--color-*`                  |
| Spacing   | `@theme`         | `--spacing-*`                |
| Radii     | `@theme`         | `--radius-*`                 |
| Shadows   | `@theme`         | `--shadow-*`                 |
| Typography| `@theme` + layout| `--font-*`, `--font-size-*`, `--leading-*` |
| Breakpoints | Tailwind defaults (sm/md/lg/xl) | — |

---

## Colors (semantic)

**Light theme (Light Steel + accent blue):**

- `background`, `foreground` — page and primary text
- `brand` / `primary`, `primary-foreground` — accent (links, nav, selection)
- `primary-hover`, `primary-active` — hover/active accent states
- `card`, `card-foreground` — surfaces and inner containers
- `muted`, `muted-foreground` — muted backgrounds and metadata
- `border`, `input`, `ring` — borders, inputs, focus ring
- `destructive` / `danger`, `success`, `warning` — feedback
- `sidebar-*`, `chart-*` — sidebar and charts

**Usage:** Prefer utilities (e.g. `bg-background`, `text-primary`, `border-border`) over raw hex. Edit values in `:root` (light) and `.dark` (dark) in `globals.css`.

---

## Spacing (8px scale)

From design report: 8 / 16 / 24 / 32 / 48 / 64 / 96.

| Token    | Value   | Use case                          |
|----------|--------|-----------------------------------|
| `--spacing-page`   | 1rem (16px)  | Overall page padding              |
| `--spacing-section`| 3rem (48px)  | Vertical gap between big sections |
| `--spacing-stack`  | 1rem (16px)  | Gap between stacked items         |
| `--spacing-gutter` | 1rem (16px)  | Horizontal container padding     |

**Usage:** `p-[var(--spacing-page)]`, `gap-[var(--spacing-stack)]`, `mb-[var(--spacing-section)]`, or extend Tailwind theme if you want `p-page`-style utilities.

---

## Radii

| Token           | Derivation      | Use case   |
|-----------------|-----------------|------------|
| `--radius`      | 0.625rem base   | —          |
| `--radius-sm/md/lg/xl` | From base | General UI |
| `--radius-card` | `var(--radius-lg)`  | Cards      |
| `--radius-button` | `var(--radius-md)` | Buttons    |
| `--radius-input`  | `var(--radius-md)` | Inputs     |

**Usage:** `rounded-lg`, `rounded-md`, or `rounded-[var(--radius-card)]`.

---

## Shadows

Subtle (design report: no heavy decoration).

| Token             | Use case      |
|-------------------|---------------|
| `--shadow-card`   | Cards         |
| `--shadow-dropdown` | Dropdowns, popovers |
| `--shadow-focus`  | Focus ring    |

**Usage:** `shadow-card`, `shadow-dropdown`, `shadow-focus` (if Tailwind generates them) or `shadow-[var(--shadow-card)]`.

---

## Typography

- **Sans (body & UI):** Inter — set via `--font-sans-family` in layout.
- **Heading:** Source Serif 4 — `--font-heading-family`.
- **Mono (code):** JetBrains Mono — `--font-mono-family`.

Optional: `--font-size-body` (1rem), `--font-size-caption` (0.875rem), `--leading-body` (1.6). Body and headings use these in `@layer base`.

---

## Breakpoints

Default Tailwind: `sm` 640px, `md` 768px, `lg` 1024px, `xl` 1280px. No custom breakpoint tokens unless you add `--breakpoint-xs` (e.g. 375px) in `@theme`.

---

## Responsiveness

Build with a **responsive skeleton** by default:

- Use layout primitives that adapt: `flex` + `flex-wrap`, `grid` with responsive columns, `max-w-*` containers, fluid `gap-*` / `p-*`.
- **Mobile-first:** Default styles = mobile; then add `sm:`, `md:`, `lg:`, `xl:`.
- **Test at 5 widths:** 320px, 375px, 768px, 1024px, 1440px.

**Anti-break rules:**

- **Text/code:** `break-words`, `truncate` / `line-clamp-*`, `min-w-0` on flex children.
- **Images:** `w-full h-auto` or fixed card with `aspect-[16/9] object-cover`.
- **Containers:** `px-4 sm:px-6 lg:px-8`, `max-w-* mx-auto`; avoid hardcoded widths (e.g. `width: 900px`) unless inside an adaptive container.
- **Page wrapper:** `overflow-x-hidden`; inner sections `max-w-* mx-auto`.

**Definition of done (per feature):**

- No horizontal scroll at any width
- Text never overlaps or clips
- Buttons remain tappable (~44px height)
- Nav works on mobile (menu or stacked)
- Images don’t stretch oddly
- Forms usable with one thumb

---

## Editing tokens

1. **Colors (light/dark):** Edit `:root` and `.dark` in `src/app/globals.css`.
2. **Radius, spacing, shadows, type scale:** Edit the `@theme inline` block in `src/app/globals.css`.
3. **Font families:** Load fonts in `src/app/layout.tsx` and set the same variable names used in `@theme` (`--font-sans-family`, `--font-heading-family`, `--font-mono-family`).

Design once. Scale forever.
