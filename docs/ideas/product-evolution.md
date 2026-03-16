# Product Evolution — Idea & Plan

## My Idea

Product Evolution is a dedicated section on the Projects page that replaces "Coming soon." and shows how each of your products evolved over time. The list of projects is configurable—you can add, remove, or reorder projects at will (e.g. via a data file or CMS); product names like CODEX or FastSite are just examples. The section includes a header, a tab bar generated from that list to switch between projects, and per-project content: a project header with status and four metric cards (one flagship), plus a version timeline of collapsible cards. Each version card has a problem/solution case study with optional screenshots (or dashed placeholders), captions, and technology tags. The goal is to communicate engineering judgment—why and what changed—not just output. The section uses a dedicated Product Evolution palette expressed as design tokens and participates in the site’s light/dark theming, and is desktop-only.

**Design tokens.** Implementation must take the project’s design tokens into consideration. Colors, spacing, typography, and radii must use the existing design system (e.g. `src/app/globals.css`, `@theme`, and semantic tokens in `:root` / `.dark`) where they fit. Any Product Evolution–specific values (e.g. section background, card surface, **separate** gold and amber accents, problem red, solution green, section serif) must be defined as **tokens** (CSS variables or Tailwind @theme) in the design system—not hardcoded in components. This keeps the section consistent with the rest of the site and makes future theme changes (e.g. tweaking the gold or the dark background) a single place change. Components should reference tokens (e.g. `var(--pe-gold)`, `var(--pe-amber)`, or theme utilities), not raw hex/rem values.

---

## My User Stories

Each story includes the file path(s) where the work lives and success criteria for "done."

---

**1.** As a visitor, I want to see a clear section title and subtitle so that I understand this page is about how products evolved.

- **File path(s):** `src/app/projects/page.tsx`, `src/components/product-evolution/section-header.tsx` (or equivalent), `src/app/globals.css` (design tokens and section-specific styles).
- **Success criteria:**
  - Section shows an eyebrow label (e.g. "Projects") in gold/amber.
  - Section shows a large serif heading (e.g. "Product Evolution").
  - Section shows a short muted subtitle explaining the page (e.g. problem-first, iterated over time).
  - Heading uses a serif font; other text uses the site’s sans-serif.
  - Colors and typography use design tokens (no hardcoded hex or font names in components).

---

**2.** As a visitor, I want to switch between products via tabs so that I can focus on one product at a time. (Tabs are generated from the configurable project list.)

- **File path(s):** `src/app/projects/page.tsx`, `src/components/product-evolution/tab-bar.tsx` (or equivalent), `src/data/product-evolution.ts` (or wherever the project list is defined), `src/app/globals.css` (tokens for accent and border).
- **Success criteria:**
  - A horizontal tab bar renders one tab per project from the project list.
  - Only one tab is active at a time; clicking a tab shows that project’s content.
  - Active tab has a gold/amber underline and brighter text; inactive tabs are muted (all from design tokens).
  - Tab bar has a subtle bottom border separating it from the content below (token-based).
  - Adding or removing a project in the data source adds or removes a tab without code changes.
  - Tab colors and borders use design tokens, not hardcoded values.

---

**3.** As a visitor, I want to see each project's full name, description, status badge, and four key metrics (with one flagship) so that I understand what it is and its impact.

- **File path(s):** `src/app/projects/page.tsx`, `src/components/product-evolution/project-header.tsx`, `src/components/product-evolution/metric-card.tsx`, `src/data/product-evolution.ts`, `src/app/globals.css` (tokens for status colors, card, accent).
- **Success criteria:**
  - For the selected project, the full name and description are visible on the left; a status badge (Active / In progress / Shipped) on the right with correct color (green / amber / gray) from tokens.
  - Exactly four metric cards are shown in a row in the normal case; each shows label and value (with optional short trend text), and at least one metric is marked as the flagship.
  - One of the four cards is the flagship: gold border and gold-tinted background; others use default card styling (all from design tokens).
  - All content is sourced from the project data (no hardcoded copy for a specific project).
  - Spacing, card background, borders, and status/accent colors use design tokens.

---

**4.** As a visitor, I want to see a version history list (newest first) with version badge, name, date, and "Current" so that I can choose which version to read.

- **File path(s):** `src/components/product-evolution/version-timeline.tsx`, `src/components/product-evolution/version-card.tsx` (header row), `src/data/product-evolution.ts`, `src/app/globals.css` (tokens for card, accent, muted text).
- **Success criteria:**
  - A "Version history" label appears above the list.
  - Versions are ordered newest first (e.g. v3.0 above v2.0 above v1.0).
  - Each version card header shows: version badge (e.g. "v3.0"), version name, optional "Current" pill when it is the latest, date on the right, chevron on the right.
  - The current (latest) version card has a subtle gold border; others use the default border (colors from design tokens).
  - Order and content come from the project data.
  - Card background, borders, badge and pill colors use design tokens.

---

**5.** As a visitor, I want to open a version and read "The Problem" and "The Solution" with optional screenshots so that I understand why that version was built and what changed.

- **File path(s):** `src/components/product-evolution/version-card.tsx`, `src/components/product-evolution/case-study-column.tsx` (or inline), `src/data/product-evolution.ts`, `public/screenshots/` (asset paths), `src/app/globals.css` (tokens for problem/solution colors, divider, spacing).
- **Success criteria:**
  - When a version card is open, a two-column case study is visible: left = "The Problem", right = "The Solution".
  - Each column has an uppercase label with a colored dot (red/coral for Problem, green for Solution), a paragraph of copy, then an image area, then an italic caption (problem/solution colors from design tokens). Problem/solution copy, caption, and tech tags are required for each version in Epic 3; screenshot paths remain optional.
  - If a screenshot path is provided for that version/side, the image is displayed (e.g. from `public/screenshots/`); otherwise the area is left empty in Epic 3 and a dashed placeholder is added later in Epic 4.
  - Columns are separated by a vertical divider; layout is readable and aligned with the design.
  - Label colors, divider, and spacing use design tokens.

---

**6.** As a visitor, I want to expand/collapse only the versions I care about so that the page doesn't feel overwhelming (current open by default).

- **File path(s):** `src/components/product-evolution/version-card.tsx`, `src/app/projects/page.tsx` (or parent that holds open/closed state).
- **Success criteria:**
  - The latest version (isCurrent) is open by default; all older versions are closed by default.
  - Clicking a version card’s header row toggles that card open or closed; the chevron rotates (e.g. 180°) when open.
  - Only the header row is the click target for toggle; body content does not toggle when clicked.
  - Multiple cards can be open at once, or only one—behavior is consistent and matches the design.

---

**7.** As a visitor, I want to see technology tags per version so that I can judge tech choices.

- **File path(s):** `src/components/product-evolution/version-card.tsx`, `src/data/product-evolution.ts`, `src/app/globals.css` (tokens for border, muted background, radius).
- **Success criteria:**
  - When a version card is open, a horizontal row of pill-shaped tags appears below the case study content.
  - Tags show the technologies used in that version (e.g. Next.js, pg_trgm, Gemini API); content comes from project data, and the list is intentionally small and bounded (e.g. 1–5 tags) so it stays scannable.
  - The tags row has a subtle top border separating it from the case study (token-based).
  - Tags are visually consistent (e.g. muted background, rounded pills) using design tokens for border, background, and radius.

---

**8.** As a content owner, I want to publish the page when some screenshots are missing so that I can ship early and add images later (dashed placeholders).

- **File path(s):** `src/components/product-evolution/screenshot-placeholder.tsx` (or equivalent), `src/components/product-evolution/version-card.tsx`, `src/data/product-evolution.ts`, `src/app/globals.css` (tokens for problem/solution tint colors).
- **Success criteria:**
  - If no screenshot path is provided for a version’s problem or solution, a dashed placeholder box is shown instead of an image.
  - Problem placeholder has a red/coral tint; solution placeholder has a green tint (colors from design tokens).
  - Placeholder displays hint text (e.g. "Add screenshot — e.g. …") from data or a sensible default.
  - No broken image icons or 404s when a screenshot is missing; adding a path later shows the image without layout changes.
  - Placeholder border and background tints use design tokens, not hardcoded hex.

---

**9.** As a visitor, I want the section optimized for desktop so that it matches the intended editorial layout (mobile out of scope).

- **File path(s):** `src/app/projects/page.tsx`, `src/app/globals.css` (design tokens and section wrapper), any component that affects layout.
- **Success criteria:**
  - The Product Evolution section is laid out and styled for desktop viewport (e.g. full width, 4-column metrics, two-column case study) using spacing and layout tokens where applicable.
  - No mobile-specific layout or breakpoints are required; on narrow screens, a basic fallback (e.g. stacking two-column layouts vertically) is acceptable without extra polish.
  - Documented or agreed that "desktop-only" is in scope; mobile adaptation is out of scope for this idea.
  - Section background, max-width, and spacing use design tokens.

---

**10.** As a visitor, I want to open a URL that goes directly to one project (e.g. `/projects#codex` or by project slug) so that I can share or bookmark it.

- **File path(s):** `src/app/projects/page.tsx` (URL parsing and initial state), `src/components/product-evolution/tab-bar.tsx` (if tab state is synced from URL).
- **Success criteria:**
  - Visiting `/projects#<project-slug>` or `/projects?project=<project-slug>` selects the tab for that project on load (if the slug exists in the project list).
  - If the slug is invalid or missing, the first project (or a defined default) is selected; no crash or blank content.
  - After load, changing the tab does not require updating the URL for Epic 1; a later epic may optionally update the URL when the tab changes for shareable links.
  - Any project in the configurable list can be deep-linked by its slug.

---

## Epics (dependency order)

Epics are ordered so that foundation work comes first; each epic only depends on earlier epics.

---

### Epic 1: Section identity & navigation

**Summary.** Establishes the Product Evolution section header and a data-driven tab bar so visitors know what the page is and can switch between projects (any number of projects, from a single source of truth), and derives the initially selected project from the URL hash/query when possible.

**Produces.**

- Section wrapper and layout for `/projects`.
- Section header (eyebrow, serif title, subtitle).
- Tab bar component that renders one tab per project from the project list, plus active-tab state.
- Initial tab selection derived from the URL hash/query when it matches a known project slug, with a safe fallback to the first project.
- Route `/projects` with "Coming soon." replaced by this section.
- Design tokens (in `globals.css` or @theme) for the section: e.g. background, card surface, separate gold and amber accents, muted text, borders, problem/solution tints, section serif—referenced by components, not hardcoded.

**Depends on.** None.

**User stories.** 1, 2, 10 (initial selection from URL only).

---

### Epic 2: Project overview

**Summary.** Renders the selected project’s header (name, description, status badge), four metric cards (one flagship), and the version timeline list with card headers only.

**Produces.**

- Project header component (name, description, status badge).
- Metrics grid and metric card component (label, value, trend, progress bar; flagship styling).
- Version timeline container and version card header row (version badge, name, "Current" pill, date, chevron).
- Data structure for projects, metrics, and versions (typed project/version model and a single source—e.g. data file or config—so projects can be added or reordered at will).
- Use of existing or new design tokens for status colors (active/in progress/shipped), card, flagship accent, spacing.

**Depends on.** Epic 1 (active project from tabs).

**User stories.** 3, 4.

---

### Epic 3: Version deep-dive (case study)

**Summary.** Adds expand/collapse to version cards and renders the problem/solution case study and technology tags when a card is open.

**Produces.**

- Collapsible version card body and open/closed state (current version open by default).
- Case study two-column layout (Problem left, Solution right) with labels, copy, and captions.
- Screenshot image display when asset is present.
- Technology tags row below the case study.
- Use of design tokens for problem/solution label colors, divider, tag styling.

**Depends on.** Epic 2 (version list and card headers exist).

**User stories.** 5, 6, 7.

---

### Epic 4: Content & publishing flexibility

**Summary.** Supports missing screenshots via placeholders and keeps the experience desktop-only as specified.

**Produces.**

- Screenshot placeholder component (dashed box, problem vs solution tint, hint text)—tints and borders from design tokens.
- Convention for asset paths (e.g. `public/screenshots/{project}-v{n}-{problem|solution}.png`).
- Desktop-only layout/behavior or documented scope (no mobile adaptation); section spacing/layout tokens as needed.

**Depends on.** Epic 3 (placeholders live inside the case study; desktop scope applies to the whole section).

**User stories.** 8, 9.

---

### Epic 5: Deep linking

**Summary.** Enhances deep linking behavior beyond the initial selection implemented in Epic 1, keeping tab state and URL in sync and improving accessibility.

**Produces.**

- Optional: URL updates (hash/query) when the active tab changes so shareable links always reflect the current project.
- Optional: scroll-to-content or focus for accessibility when navigating directly to a project via URL.

**Depends on.** Epic 1 (tabs and initial project selection from URL).

**User stories.** 10 (URL updates and accessibility enhancements).
