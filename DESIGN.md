---
name: Nawres Ben Rhouma — Portfolio
description: A personal profile set as the reference documentation of a well-built service — paper ground, hairline entries, code chips, one blue.
colors:
  paper: "#ffffff"
  pale-field: "#f4f6f9"
  near-black-ink: "#111318"
  blue-grey-annotation: "#5b6472"
  reference-blue: "#1f5fbf"
  reference-blue-contrast: "#ffffff"
  blue-wash: "#e6eefb"
  hairline: "#e1e5eb"
  control-hairline: "#8a939f"
  ink-ground-dark: "#0f1115"
  raised-ink-dark: "#171a20"
  paper-text-dark: "#e6e8ec"
  blue-grey-annotation-dark: "#a0a8b6"
  lit-reference-blue-dark: "#7faeff"
  lit-reference-blue-contrast-dark: "#0f1115"
  blue-wash-dark: "#1a2740"
  hairline-dark: "#2a303a"
  control-hairline-dark: "#5a6474"
typography:
  display:
    fontFamily: "Source Sans 3, Segoe UI, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(2rem, 1.35rem + 2.2vw, 3rem)"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Source Sans 3, Segoe UI, Helvetica Neue, Arial, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.01em"
  title:
    fontFamily: "Source Sans 3, Segoe UI, Helvetica Neue, Arial, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "normal"
  lead:
    fontFamily: "Source Sans 3, Segoe UI, Helvetica Neue, Arial, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 400
    lineHeight: 1.45
    letterSpacing: "normal"
  body:
    fontFamily: "Source Sans 3, Segoe UI, Helvetica Neue, Arial, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  small:
    fontFamily: "Source Sans 3, Segoe UI, Helvetica Neue, Arial, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  label:
    fontFamily: "Source Sans 3, Segoe UI, Helvetica Neue, Arial, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
    lineHeight: 1.6
    letterSpacing: "0.06em"
  control:
    fontFamily: "Source Sans 3, Segoe UI, Helvetica Neue, Arial, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "normal"
  code:
    fontFamily: "Source Code Pro, ui-monospace, SF Mono, Menlo, Consolas, monospace"
    fontSize: "0.8125rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
rounded:
  sm: "4px"
  md: "6px"
spacing:
  "1": "0.25rem"
  "2": "0.5rem"
  "3": "0.75rem"
  "4": "1rem"
  "5": "1.5rem"
  "6": "2rem"
  "7": "3rem"
  "8": "4rem"
components:
  button-primary:
    backgroundColor: "{colors.reference-blue}"
    textColor: "{colors.reference-blue-contrast}"
    typography: "{typography.control}"
    rounded: "{rounded.md}"
    padding: "0.5rem 1rem"
    height: "2.75rem"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.reference-blue}"
    typography: "{typography.control}"
    rounded: "{rounded.md}"
    padding: "0.5rem 1rem"
    height: "2.75rem"
  button-secondary-hover:
    backgroundColor: "{colors.blue-wash}"
    textColor: "{colors.reference-blue}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.near-black-ink}"
    typography: "{typography.control}"
    rounded: "{rounded.md}"
    padding: "0.375rem 0.875rem"
    height: "2.75rem"
  button-ghost-hover:
    backgroundColor: "transparent"
    textColor: "{colors.reference-blue}"
  theme-toggle:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.near-black-ink}"
    rounded: "{rounded.md}"
    padding: "0"
    width: "2.75rem"
    height: "2.75rem"
  nav-link:
    backgroundColor: "transparent"
    textColor: "{colors.blue-grey-annotation}"
    typography: "{typography.control}"
    padding: "1rem 0"
  nav-link-current:
    backgroundColor: "transparent"
    textColor: "{colors.near-black-ink}"
    typography: "{typography.control}"
  code-chip:
    backgroundColor: "{colors.pale-field}"
    textColor: "{colors.near-black-ink}"
    typography: "{typography.code}"
    rounded: "{rounded.sm}"
    padding: "0.125rem 0.5rem"
  code-chip-small:
    backgroundColor: "{colors.pale-field}"
    textColor: "{colors.near-black-ink}"
    rounded: "{rounded.sm}"
    padding: "0.125rem 0.5rem"
    size: "0.75rem"
  status-core:
    backgroundColor: "transparent"
    textColor: "{colors.reference-blue}"
    rounded: "{rounded.sm}"
    padding: "0.05rem 0.45rem"
    size: "0.6875rem"
  status-growing:
    backgroundColor: "transparent"
    textColor: "{colors.near-black-ink}"
    rounded: "{rounded.sm}"
    padding: "0.05rem 0.45rem"
    size: "0.6875rem"
  status-done:
    backgroundColor: "transparent"
    textColor: "{colors.blue-grey-annotation}"
    rounded: "{rounded.sm}"
    padding: "0.05rem 0.45rem"
    size: "0.6875rem"
---

# Design System: Nawres Ben Rhouma — Portfolio

## Overview

**Creative North Star: "The Reference Page"**

*(North star, overview voice and colour names below are derived from PRODUCT.md's brand commitments and the direction contract's OWN-WORLD block, not confirmed with the user in this pass.)*

A person's profile written like the reference documentation of a well-built service. The page behaves the way good API docs behave: a stable index across the top, precise entries underneath, one link colour that means "you can act here", and monospace only where there is actually code. Nothing is sold; everything is stated and dated. The visual work is done by hairlines, an 8px module and a disciplined type ramp — never by a panel, a glow or a second hue.

Density is documentary rather than airy: entries sit close together, separated by a single 1px rule, with generous vertical air only between top-level sections (`--space-7`, 48px). Text is the material. The one photograph on the site is treated as a field value — a 240px square with a hairline border and the same 6px radius as a button — not as a hero image. Both themes ship as the same page with ten custom properties swapped: paper-and-ink by day, ink-and-paper by night, with identical geometry.

Two refusals are structural, not stylistic. It refuses the dark terminal hero with glowing skill cards: there are no cards, no glow, and the skills read as a typed reference table of comma-separated technologies. And it refuses the marketing landing page: no kicker above the headline, no slogan, no gradient, no shadow. Calm credibility over spectacle — craft has to show in the typography, the spacing and the detail, because there is nothing else in the room.

**Key Characteristics:**

- Paper ground and near-black ink, one blue, nothing else chromatic
- Entries open on a 1px hairline; no card ever closes a box around content
- Source Sans 3 for every word; Source Code Pro only for real technology names and status annotations
- Label/value field rows with 0.75rem uppercase tracked labels as the signature structure
- Flat by rule: `--shadow: none`, depth carried by hairlines and one pale field
- 8px module, 72rem content maximum, 68ch prose measure
- Dark theme is a token swap, not a second design

## Colors

A white-paper-and-ink palette with exactly one chromatic voice; secondary text is tinted toward that voice rather than left neutral grey.

### Primary

- **Reference Blue** (light): the single action colour. It appears on links, the primary button, the 2px sliding nav indicator and the current nav anchor's underline, the focus ring, text selection, the `Core` status token, and the favicon field — and nowhere else. On a 1440 viewport it covers well under 5% of the page, which is the point.
- **Lit Reference Blue** (dark): the same role at dark-theme luminance. Only the value changes; every usage rule is identical.
- **Blue Wash** (light) / **Deep Blue Wash** (dark): the secondary button's hover fill. It is the accent's only tinted surface; it never becomes a section background.

### Neutral

- **Paper** (light) / **Ink Ground** (dark): the page ground, the sticky header ground, and the theme toggle's ground. The header is deliberately the same colour as the page, separated only by its hairline.
- **Pale Field** (light) / **Raised Ink** (dark): the only secondary surface in the system. It fills code chips, the CV print hint, and the portrait's empty box. It is a *field*, not an elevation.
- **Near-Black Ink** (light) / **Paper Text** (dark): all headings, body copy, field values and chip text.
- **Blue-Grey Annotation** (light) / **Light Blue-Grey Annotation** (dark): every secondary string — uppercase field labels, date rulers, project role lines, list markers, the footer, the heading anchor at rest, and idle nav anchors. Both values carry a blue tint sampled toward the accent.
- **Hairline** (light) / **Dark Hairline** (dark): every rule in the system — section tops, entry tops, field-row separators, the header's bottom edge, the nested-engagement indent rule, the chip border, the portrait border.
- **Control Hairline** (light) / **Dark Control Hairline** (dark): a stronger stroke reserved for interactive outlines only — the ghost button, the theme toggle, the status token border. It meets the 3:1 non-text contrast requirement and is never used for text or for a content rule.

### Named Rules

**The One Blue Rule.** The accent is the only chromatic colour in the system. It marks links, the primary action, the current section, and focus — nothing decorative. If a new element is blue for any reason other than "you can act here" or "you are here", it is wrong.

**The Tinted Annotation Rule.** Secondary text is never neutral grey. `--text-muted` is blue-grey tinted toward the accent in both themes; a `#666`-class grey anywhere in this system is a defect.

**The Same-Geometry Rule.** Dark theme swaps ten custom properties (`--bg`, `--bg-elevated`, `--text`, `--text-muted`, `--accent`, `--accent-contrast`, `--accent-soft`, `--border`, `--border-strong`, `--focus`) and `color-scheme`. No size, weight, radius, border-width or spacing value differs between themes. A new colour must be added to both blocks in the same commit.

## Typography

**Display / Body Font:** Source Sans 3 (fallback: Segoe UI, Helvetica Neue, Arial, sans-serif) — weights 400, 600, 700, loaded from Google Fonts with `display=swap`.
**Code Font:** Source Code Pro (fallback: ui-monospace, SF Mono, Menlo, Consolas, monospace) — weights 400, 500.

**Character:** One humanist sans does all the talking, tightened at display sizes (-0.02em on the h1, -0.01em on the h2) so the name reads as a masthead rather than a paragraph. The monospace is not a second voice; it is a typographic quotation mark that says "this string is a literal" — a technology name, a status annotation, a tech line on the CV. Numerals are tabular throughout (`font-variant-numeric: tabular-nums`) so date ranges align down the timeline ruler.

### Hierarchy

- **Display** (700, `clamp(2rem, 1.35rem + 2.2vw, 3rem)`, 1.2, -0.02em): the name, once per page. Balanced wrapping (`text-wrap: balance`).
- **Headline** (700, 1.5rem, 1.2, -0.01em): section titles. Set on a baseline-aligned flex row so the hover-revealed `#` anchor sits beside the text.
- **Title** (600, 1.125rem, 1.2): employer and project entry names; also the CV's nested engagement headings.
- **Lead** (400, 1.25rem, 1.45, capped at 34em): the positioning statement in the title block only. Drops to 1.125rem below 640px.
- **Body** (400, 1.0625rem, 1.6, capped at `--measure` 68ch): all prose and bullets. Sub-headings inside an entry (h4) take body size at 600.
- **Small** (400, 0.875rem, 1.6): project role lines, engagement dates, footer, CV contact line, print hint.
- **Label** (600, 0.75rem, 0.06em, uppercase): field labels, timeline date ruler, contact labels, skill-group leads. This is the only uppercase in the system.
- **Control** (600, 0.9375rem, 1.2): buttons and nav anchors.
- **Code** (400, 0.8125rem): technology chips. Small chips 0.75rem; inline `code` inherits at 0.9em; the CV tech line 0.8125rem; the status token 0.6875rem at weight 500.

### Named Rules

**The Two-Face Rule.** Source Sans 3 sets every word a human wrote. Source Code Pro appears only on strings that are literals — technology names, status annotations, the CV tech line. Prose never goes monospace for emphasis, and a chip never holds a phrase that is not a real product or language name.

**The One Uppercase Rule.** Uppercase exists at exactly one specification — 0.75rem / 600 / 0.06em / `--text-muted` — and only as a field label or column lead beside its value. Headings, buttons and body text are never uppercased, and no uppercase line is ever placed *above* a heading.

**The 68ch Rule.** Paragraphs are capped at `--measure` (68ch) by default; the lead statement is capped tighter at 34em and the hero field block at 40rem. A full-width paragraph is a defect, not a layout choice.

## Layout

One centred column, `--content-max` 72rem, with `--space-5` (24px) inline padding falling to `--space-4` (16px) below 640px. Sections are separated by their own 1px top rule and `--space-7` (48px) of vertical padding, dropping to `--space-6` (32px) below 640px.

The title block is an explicit 12-column grid: text on columns 1–8, the 240px portrait on columns 10–12, right-aligned. Everything else is a two-column label/body grid with a fixed first column — 7rem for field and contact rows, 10rem for the timeline date ruler, 19rem for skill-group names, 10rem for the CV skills list. That repeated "ruler column plus body" shape is the page's spatial signature.

Spacing comes exclusively from the 8px-derived scale `--space-1`..`--space-8` (4, 8, 12, 16, 24, 32, 48, 64px). The sticky header is 3.5rem tall on desktop and 6rem below 900px, and `scroll-padding-top` tracks it so anchored sections never land under the header.

Two breakpoints carry the whole responsive story. **Below 900px** the header wraps, the nav becomes a horizontally scrolling row with a right-edge mask hinting at overflow, the title block collapses to a text column plus a 96px portrait beside the statement (the text wrapper dissolves with `display: contents` so the h1 can span both columns), and the skills, projects and timeline grids all become single-column. **Below 640px** padding tightens, the lead drops a step, and the field and contact rows stack label over value. The CV column is capped independently at 48rem at every width.

### Named Rules

**The 8px Module Rule.** Every gap, pad and offset is a `--space-*` token. An arbitrary pixel value in a new rule is a bug unless it is a deliberate optical correction and says so in a comment.

**The Hairline Entry Rule.** A new entry opens with a 1px `--border` rule across its top and carries no other frame. Sections, timeline items, project entries, skill rows, field rows and contact rows all obey this. Nothing in this system is boxed on four sides except a control.

**The Ruler Column Rule.** Structured data is a two-column grid with the label, date or group name in a fixed-width left ruler and the content in `minmax(0, 1fr)` beside it. Below 900px the ruler stacks above its content rather than shrinking.

## Elevation & Depth

This system is flat by declaration: `--shadow: none` is a token and there is no shadow vocabulary anywhere in the build — not on the sticky header, not on hover, not on the portrait, not in print. Depth is communicated by exactly two devices: the 1px hairline, which separates without lifting, and the single pale field (`--bg-elevated`), which marks a surface as secondary without implying height. The sticky header shares the page's own background and is legible only because of its bottom hairline. Layering is ordinal, not physical: `z-index: 10` for the header and `100` for the skip link is the entire stack.

### Named Rules

**The Flat Rule.** No `box-shadow`, no `filter: drop-shadow`, no gradient, no blur, in either theme and in any state. If an element needs to separate from its ground, it gets a hairline or the pale field. `--shadow: none` is normative, not a placeholder waiting to be filled in.

## Shapes

Two radii and nothing else. **6px** (`--radius`) on things you interact with or that behave like an object: buttons, the theme toggle, the skip link, the print hint, and the portrait. **4px** (`--radius-sm`) on the small typed objects: code chips, status tokens, and the `:focus-visible` outline. Content surfaces — sections, entries, timeline items, tables of skills — have no radius because they have no box.

Strokes are all 1px. Content rules use `--border`; interactive outlines use `--border-strong`; the nav indicator and the current-anchor underline are the only 2px strokes in the system, both in accent, both horizontal. The portrait is a square (1:1, `object-fit: cover`), not a circle — a field value rendered at its declared dimensions. Vertical rules exist in exactly one place: the 1px `--border` line that indents a nested engagement entry inside a timeline item.

### Named Rules

**The Two-Radius Rule.** 6px for controls, 4px for chips and focus rings, 0 for content. A third radius, a pill, or a circle requires a reason the page can state.

## Components

### Buttons

- **Shape:** softly rounded (6px), 1px border, minimum height 44px (2.75rem) on every variant.
- **Primary:** accent fill with `--accent-contrast` text and an accent border, 0.5rem/1rem padding, 0.9375rem/600 label. Used for the one action that matters most on a surface — LinkedIn in the title block.
- **Secondary:** transparent ground, accent text, accent border, same padding and metrics as primary. Used for "View CV".
- **Ghost:** transparent ground, ink text, `--border-strong` border, tighter padding (0.375rem/0.875rem) at the same 44px height. Used for header-level navigation (CV, back to Portfolio) where the button must not compete with the brand.
- **Hover / Focus:** primary brightens (`filter: brightness(1.08)`); secondary fills with `--accent-soft`; ghost's border and text both shift to accent. All transitions run 150ms `cubic-bezier(0.2, 0.8, 0.2, 1)` on background, border and colour only. Focus is the global 2px `--focus` outline at 3px offset.

### Chips

- **Style:** code chips are Source Code Pro 0.8125rem on `--bg-elevated`, 1px `--border`, 4px radius, 0.125rem/0.5rem padding, no wrap. `--small` drops to 0.75rem.
- **Rule of use:** a chip holds a real technology, product or language name and nothing else. It is never a filter, never selectable, never a topic label.
- **The inline exception:** inside a skill group the chip styling is deliberately stripped — background, border, radius and padding all removed — and the list renders as comma-separated Source Code Pro at 0.875rem. Skills read as a typed reference table, not a pill cloud. The primary group renders its terms at weight 500 in full ink.

### Status tokens

- **Style:** Source Code Pro 0.6875rem/500, 1px `--border-strong`, 4px radius, 0.05rem/0.45rem padding, baseline-nudged 0.15em, sitting inline after a heading.
- **Variants:** `Core` takes accent text and an accent border (the only place a status is chromatic); `Growing` / `In progress` take ink text; `Completed` takes muted text. They annotate the stability of a skill area or a learning track, the way a reference page annotates an API's stability.

### Field rows

- **Style:** a definition-list grid with a 7rem label column, hairline on top and beneath every row, `--space-3` vertical padding, the label in the uppercase label ramp and the value in ink at weight 600 (the last value drops to 400).
- **Where:** the title block's Role / Availability / Focus, and the contact list. This is the system's signature structure — the thing that survives when the content is removed.
- **Narrow:** below 640px the row stacks, the label loses its bottom rule, and the value picks up `--space-1` of top padding so the pair still reads as one entry.

### Entries (timeline, projects, learning, CV)

- **Corner style:** none. Entries are not cards.
- **Border:** a 1px `--border` rule on top; the first timeline item drops its rule and its top padding so the list starts flush under the heading.
- **Background:** the page ground, always.
- **Internal padding:** `--space-4` to `--space-5` vertically; a nested engagement adds `--space-4` of left padding against a 1px vertical hairline.
- **Projects** are a two-column grid of these entries (`--space-6` gap), collapsing to one column below 900px.

### Navigation

- **Style:** a sticky 3.5rem header — brand at 700 in ink, seven anchors at 0.9375rem/600 in muted blue-grey, actions pinned right — over the page's own ground with a single hairline bottom border.
- **States:** hover lifts an anchor to full ink; the current section takes full ink plus a 2px accent bottom border.
- **Signature behaviour:** an IntersectionObserver picks the most-visible section and a single 2px accent indicator slides beneath its anchor, animated by `transform` only (translate + scaleX from a fixed 100px base, so no layout runs) over 220ms `cubic-bezier(0.2, 0.8, 0.2, 1)`. When the indicator is present the per-link border yields to it; without JavaScript the anchors still work and the `aria-current` border carries the state.
- **Mobile:** below 900px the anchor row moves to its own line, scrolls horizontally with hidden scrollbars, and fades under a right-edge mask that hints at more.

### Theme toggle

A 44×44 square control (6px radius, `--border-strong` outline, page ground) holding an 18px inline stroked SVG — sun in light, moon in dark, swapped by `[data-theme]` in CSS rather than by script. It ships `hidden` and is revealed by `js/theme.js`, so a no-JS visitor never sees a dead control; the theme itself is resolved before first paint by an inline head script and persisted in `localStorage`. Hover shifts border and icon to accent.

### Heading anchor

Section headings carry a trailing `#` link in muted weight 400, at `opacity: 0`, revealed on heading hover or on its own `:focus-visible`, turning accent on hover. It is a docs-native affordance for "link to this entry", not an icon.

### CV surface

The CV inherits the world and adds nothing: a 48rem column, a hairline-ruled header block, `cv-entry` blocks with a top rule and a flex head that pushes dates right, nested entries indented `--space-5`, and a 10rem/1fr skills definition grid. In print (`css/print.css`, loaded `media="print"` only) the world converts honestly rather than being re-designed: A4 with 16/18mm margins, header and toggle and print hint hidden, pure black on white, 10.5pt body, mm-based rhythm, `break-inside: avoid` on entries and `break-after: avoid` on headings, and external link hrefs appended in parentheses after their text — except on the contact line, which already prints readable URLs.

### Named Rules

**The 44px Target Rule.** Every button and the theme toggle stand at least 2.75rem (44px) tall regardless of their label size. Density never comes out of the touch target.

**The Progressive Control Rule.** Any control that needs JavaScript ships `hidden` and is revealed by its script; any enhancement that needs an API ships as a no-op when the API is missing. The page is fully readable and navigable with scripts off.

**The Transform-Only Motion Rule.** Animated properties are limited to `transform`, `opacity`, `color`, `background-color` and `border-color`, at 150ms (`--motion-fast`) for state and 220ms (`--motion-base`) for the indicator, always on `cubic-bezier(0.2, 0.8, 0.2, 1)`. Under `prefers-reduced-motion: reduce` all durations collapse to 0s and smooth scrolling is turned off; the indicator then swaps instantly instead of sliding.

## Do's and Don'ts

### Do:

- **Do** open every new entry with a 1px `--border` hairline on its top edge, and let the page ground show through.
- **Do** build structured data as a ruler grid: a fixed label column (7rem / 10rem / 19rem) beside `minmax(0, 1fr)`, stacking below 900px.
- **Do** take every colour from the ten theme custom properties, and add any new one to `:root`, `[data-theme="dark"]` and the `prefers-color-scheme` block together.
- **Do** reserve Source Code Pro for real technology names and status annotations, set as 0.8125rem chips on `--bg-elevated` with a 4px radius.
- **Do** cap prose at `--measure` (68ch) and the page at `--content-max` (72rem).
- **Do** give every interactive element a 44px minimum height and the global 2px `--focus` ring at 3px offset.
- **Do** keep motion to `--motion-fast` / `--motion-base` on `cubic-bezier(0.2, 0.8, 0.2, 1)`, animating transform and colour only, and let the reduced-motion block zero it.
- **Do** use the uppercase label ramp (0.75rem / 600 / 0.06em / muted) only as a label beside or above its own value.

### Don't:

- **Don't** add a shadow, gradient, blur or drop-shadow in any state or either theme — `--shadow: none` is the rule, not a default.
- **Don't** introduce a second accent hue, or use the accent for anything that is not a link, the primary action, the current section, focus, or the `Core` status.
- **Don't** close a box around content: no four-sided borders, no filled panels, no radius on sections, entries, timeline items or project blocks.
- **Don't** set prose in Source Code Pro, and don't put a phrase that is not a real product, language or tool name inside a chip.
- **Don't** place a kicker or eyebrow line above a heading; the heading is the entry point and the label ramp belongs beside a value, not above a title.
- **Don't** use a coloured or thick vertical bar as decoration — the only vertical rule in this system is the 1px `--border` line that indents a nested engagement.
- **Don't** use a text character or icon font as an icon; icons are inline stroked SVG at 1.125rem with `currentColor`. (The `#` heading anchor is a documentation link affordance, not an icon.)
- **Don't** uppercase a heading, a button label or body text.
- **Don't** let the content column exceed 72rem, or a paragraph run the full width of the grid.
- **Don't** ship a control that only works with JavaScript without hiding it until its script reveals it.
