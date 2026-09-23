---
name: Nawres Ben Rhouma — Portfolio
description: A calm butter page where the work sits on a white sheet with folder tabs, set in Gabarito with one terracotta accent.
colors:
  butter-page: "#fbf3d6"
  deep-butter-band: "#f4e7b8"
  warm-sheet: "#fffdf8"
  butter-chip: "#f6efd8"
  espresso-ink: "#2b2417"
  warm-brown-grey: "#5b4e35"
  terracotta: "#a4441f"
  terracotta-fill: "#c4532b"
  burnt-terracotta: "#8f3a1a"
  terracotta-contrast: "#ffffff"
  terracotta-wash: "#f7e3d5"
  butter-hairline: "#e8dcb6"
  control-hairline: "#8f8058"
  focus-terracotta: "#b8471f"
  roasted-ground-dark: "#1b170f"
  roasted-band-dark: "#221c12"
  roasted-sheet-dark: "#332c1e"
  roasted-chip-dark: "#3f3727"
  cream-dark: "#f2e9d3"
  warm-sand-dark: "#cbbd9c"
  lit-terracotta-dark: "#eb8d63"
  lit-terracotta-fill-dark: "#d9703f"
  lit-terracotta-contrast-dark: "#1b170f"
  terracotta-wash-dark: "#4a3120"
  roasted-hairline-dark: "#4a4130"
  control-hairline-dark: "#8f8160"
typography:
  display:
    fontFamily: "Gabarito, Source Sans 3, Segoe UI, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(2.25rem, 1.7rem + 2.2vw, 3rem)"
    fontWeight: 800
    lineHeight: 1.02
    letterSpacing: "-0.03em"
  case-title:
    fontFamily: "Gabarito, Source Sans 3, Segoe UI, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(2.25rem, 1.6rem + 2.6vw, 3.5rem)"
    fontWeight: 800
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Gabarito, Source Sans 3, Segoe UI, Helvetica Neue, Arial, sans-serif"
    fontSize: "1.75rem"
    fontWeight: 800
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Gabarito, Source Sans 3, Segoe UI, Helvetica Neue, Arial, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.01em"
  subtitle:
    fontFamily: "Source Sans 3, Segoe UI, Helvetica Neue, Arial, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 600
    lineHeight: 1.3
  body:
    fontFamily: "Source Sans 3, Segoe UI, Helvetica Neue, Arial, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
  small:
    fontFamily: "Source Sans 3, Segoe UI, Helvetica Neue, Arial, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.6
  control:
    fontFamily: "Source Sans 3, Segoe UI, Helvetica Neue, Arial, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 600
    lineHeight: 1.2
  label:
    fontFamily: "Source Sans 3, Segoe UI, Helvetica Neue, Arial, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
    lineHeight: 1.6
    letterSpacing: "0.06em"
  chip:
    fontFamily: "Source Code Pro, ui-monospace, SF Mono, Menlo, Consolas, monospace"
    fontSize: "0.8125rem"
    fontWeight: 400
    lineHeight: 1.6
  status:
    fontFamily: "Source Code Pro, ui-monospace, SF Mono, Menlo, Consolas, monospace"
    fontSize: "0.6875rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "0.02em"
rounded:
  chip: "6px"
  control: "8px"
  tab-top: "10px 10px 0 0"
  sheet: "12px"
  pill: "999px"
spacing:
  1: "0.25rem"
  2: "0.5rem"
  3: "0.75rem"
  4: "1rem"
  5: "1.5rem"
  6: "2rem"
  7: "3rem"
  8: "4rem"
components:
  sheet:
    backgroundColor: "{colors.warm-sheet}"
    rounded: "{rounded.sheet}"
    padding: "2rem"
  panel:
    backgroundColor: "{colors.warm-sheet}"
    rounded: "0 12px 12px 12px"
    padding: "2rem"
  button-primary:
    backgroundColor: "{colors.terracotta-fill}"
    textColor: "{colors.terracotta-contrast}"
    typography: "{typography.control}"
    rounded: "{rounded.control}"
    padding: "0.5rem 1.125rem"
    height: "2.75rem"
  button-primary-hover:
    backgroundColor: "{colors.burnt-terracotta}"
    textColor: "{colors.terracotta-contrast}"
  button-secondary:
    backgroundColor: "{colors.espresso-ink}"
    textColor: "{colors.butter-page}"
    typography: "{typography.control}"
    rounded: "{rounded.control}"
    padding: "0.5rem 1.125rem"
    height: "2.75rem"
  button-secondary-hover:
    backgroundColor: "{colors.warm-brown-grey}"
    textColor: "{colors.butter-page}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.espresso-ink}"
    typography: "{typography.control}"
    rounded: "{rounded.control}"
    padding: "0.375rem 0.875rem"
    height: "2.75rem"
  button-ghost-hover:
    textColor: "{colors.terracotta}"
  button-mail-compact:
    backgroundColor: "{colors.terracotta-fill}"
    textColor: "{colors.terracotta-contrast}"
    rounded: "{rounded.pill}"
    padding: "0"
    width: "2.75rem"
    height: "2.75rem"
  theme-toggle:
    backgroundColor: "{colors.warm-sheet}"
    textColor: "{colors.espresso-ink}"
    rounded: "{rounded.pill}"
    padding: "0"
    width: "2.75rem"
    height: "2.75rem"
  tab:
    backgroundColor: "rgba(43, 36, 23, 0.08)"
    textColor: "{colors.warm-brown-grey}"
    typography: "{typography.control}"
    rounded: "{rounded.tab-top}"
    padding: "0.75rem 1.125rem"
  tab-selected:
    backgroundColor: "{colors.warm-sheet}"
    textColor: "{colors.terracotta}"
    typography: "{typography.control}"
    rounded: "{rounded.tab-top}"
    padding: "0.95rem 1.125rem 0.75rem"
  chip:
    backgroundColor: "{colors.butter-chip}"
    textColor: "{colors.espresso-ink}"
    typography: "{typography.chip}"
    rounded: "{rounded.chip}"
    padding: "0.125rem 0.5rem"
  status-token:
    backgroundColor: "transparent"
    textColor: "{colors.warm-brown-grey}"
    typography: "{typography.status}"
    rounded: "{rounded.pill}"
    padding: "0.05rem 0.5rem"
  status-token-core:
    textColor: "{colors.terracotta}"
  nav-link:
    backgroundColor: "transparent"
    textColor: "{colors.warm-brown-grey}"
    typography: "{typography.control}"
  nav-link-current:
    textColor: "{colors.espresso-ink}"
---

# Design System: Nawres Ben Rhouma — Portfolio

## Overview

**Creative North Star: "The Butter Sheet"** *(derived from the direction contract)*

A butter-yellow page, warm enough to read as paper rather than as a screen, with the work laid on a white sheet that sits on top of it. The sheet is the event: it carries folder tabs that rise from its top edge, and the selected tab fuses into the sheet the way a tab fuses into a file folder. Everything else — the identity fields, the skills table, the dated timeline, the expandable project notes — either sits on another sheet or lies directly on the butter ground. Depth in this world is one soft drop of warm shadow under a sheet; there is no second layer, no glass, no gradient.

The tone is calm credibility, not spectacle. The heavy Gabarito headline and the single terracotta accent do the shouting; the rest is warm brown ink on butter at a comfortable 1.0625rem with a 68ch measure. Motion is short (150ms and 220ms) and confined to colour, opacity and one sliding nav underline that animates transform only. One chromatic voice runs the whole surface: terracotta on links, the primary action, the selected tab, the current nav item, the hero rule, list markers and the focus ring. Nothing else is coloured.

The confirmed anti-references are two: the plain black-on-white document look this build replaced, and the dark terminal developer-portfolio template. The system also has to stay recognisably its own against the colleague's reference site that inspired the composition — the composition system carries over, the palette and display face do not.

**Key Characteristics:**
- Butter ground, deeper butter band, warm off-white sheets — three tones of the same warmth.
- One accent hue (terracotta), used on roughly a tenth of any screen.
- Gabarito 800 headlines set tight (-0.03em at display size) against a calm Source Sans 3 body.
- Sheets lifted by a single soft warm shadow in light, by a 1px hairline ring in dark — never both.
- Folder tabs on the featured-work sheet as the structural signature.
- 8px spacing module; 76rem content width; 68ch measure.
- Full parity across light, dark, print, no-JavaScript and 320px.

## Colors

A single warm family — butter, espresso and terracotta — split across a light and a dark theme that share role names and geometry, so every component is written once.

### Primary
- **Terracotta** (`#a4441f`): the only chromatic voice, at text weight. Links, the selected folder tab's label, the current nav item's underline, the 4rem hero rule, bullet markers, the `Core` status token, and every hover that promotes a control. Lifts to **Lit Terracotta** (`#eb8d63`) in dark.
- **Terracotta Fill** (`#c4532b`): the same hue one step heavier, used *only* as a background behind white — the "Get in touch" button and the favicon rule. Hovers to **Burnt Terracotta** (`#8f3a1a`). In dark the fill is `#d9703f` hovering up to `#eb8d63`.
- **Terracotta Wash** (`#f7e3d5`): text selection only. `#4a3120` in dark.
- **Focus Terracotta** (`#b8471f`): the 2px focus-visible outline, offset 3px. `#eb8d63` in dark.

### Secondary
- **Espresso Ink** (`#2b2417`): doubles as the secondary button's fill — "View CV" is espresso with butter text, a dark solid that reads as weight rather than as a second colour. In dark the same rule inverts to cream-on-roast automatically.

### Neutral
- **Butter Page** (`#fbf3d6`): the page ground, everywhere below the hero band. `#1b170f` in dark.
- **Deep Butter Band** (`#f4e7b8`): the sticky header and the hero band — one step deeper so the first viewport reads as a tinted plate the sheet floats on. `#221c12` in dark.
- **Warm Sheet** (`#fffdf8`): every sheet, panel, note, theme toggle and CV page. Off-white, never pure white. `#332c1e` in dark.
- **Butter Chip** (`#f6efd8`): the fill behind code chips only. `#3f3727` in dark.
- **Espresso Ink** (`#2b2417`): all body and heading text. **Cream** (`#f2e9d3`) in dark.
- **Warm Brown-Grey** (`#5b4e35`): muted text — labels, dates, meta lines, unselected tabs and nav links, footer. **Warm Sand** (`#cbbd9c`) in dark.
- **Butter Hairline** (`#e8dcb6`): every rule *inside* content — field rows, timeline separators, fact strips, column dividers, the footer top edge. It is also the dark theme's sheet edge. `#4a4130` in dark.
- **Control Hairline** (`#8f8058`): 3.5:1 against the butter ground; outlines of interactive controls only — theme toggle, ghost button, status tokens, skip link, scrollbar. `#8f8160` in dark.

### Named Rules

**The One Terracotta Rule.** There is exactly one chromatic hue on this site. If a new element needs colour to be understood, it does not need colour — it needs weight, a hairline, or a label.

**The Two Terracottas Rule.** `#a4441f` is terracotta *as text on butter*; `#c4532b` is terracotta *as a fill behind white*. They are not interchangeable and neither may be substituted for the other to "match" — the split exists so both directions clear WCAG AA.

**The Strong Hairline Is For Controls Rule.** `#8f8058` outlines things you can operate. `#e8dcb6` rules things you read. A content divider never uses the strong hairline; a control outline never uses the soft one.

## Typography

**Display Font:** Gabarito (700/800, with Source Sans 3 and Segoe UI as fallbacks)
**Body Font:** Source Sans 3 (400/600/700, with Segoe UI and Helvetica Neue as fallbacks)
**Label/Mono Font:** Source Code Pro (400, with ui-monospace and SF Mono as fallbacks)

**Character:** Gabarito is a geometric grotesque with wide, confident bowls; at 800 and -0.03em it gives the name and the case title real physical weight without turning ornamental. Source Sans 3 underneath is quiet, humanist and unfussy — it carries long paragraphs and dense skill lists without competing. Source Code Pro appears only where the string is literally a machine name.

### Hierarchy
- **Display** (Gabarito 800, `clamp(2.25rem, 1.7rem + 2.2vw, 3rem)`, line-height 1.02, -0.03em): the page `h1` and the CV name. Once per page.
- **Case Title** (Gabarito 800, `clamp(2.25rem, 1.6rem + 2.6vw, 3.5rem)`, -0.02em): the selected-work panel title — deliberately one step *above* the display size, because the sheet owns the focal event of the first viewport.
- **Headline** (Gabarito 800, `1.75rem`, line-height 1.1, -0.02em): section `h2`s, set as a baseline-aligned flex row so the `#` anchor can sit beside them.
- **Title** (Gabarito 700, `1.25rem`, line-height 1.1, -0.01em): `h3` — timeline roles, skill groups, learning columns. Steps down to `1.125rem` where a title sits inside a sheet (skill groups, learning columns, note titles, engagement `h4`s, column titles).
- **Subtitle** (Source Sans 3 600, `1.125rem`, line-height 1.3): panel subtitles, the hero statement (`1.25rem`, dropping to `1.125rem` below 640px) and the contact lead.
- **Body** (Source Sans 3 400, `1.0625rem`, line-height 1.6): all prose, capped at a 68ch measure (62ch in the About and Education columns). Tabular numerals are on globally so dates align down the timeline column.
- **Control** (Source Sans 3 600, `0.9375rem`, line-height 1.2): buttons, nav links, folder tabs, fact strips. `0.875rem` for tabs below 900px.
- **Small** (Source Sans 3 400, `0.875rem`): meta lines, dates, notes, the footer.
- **Label** (Source Sans 3 600, `0.75rem`, +0.06em, uppercase): field-row labels, the availability label, timeline date columns, contact row labels.
- **Chip** (Source Code Pro 400, `0.8125rem`; `0.75rem` in the small variant): technology names.
- **Status** (Source Code Pro, `0.6875rem`, +0.02em, uppercase-free): the `Core` / `Growing` / `Completed` / `In progress` tokens.

### Named Rules

**The Gabarito-For-Structure Rule.** Gabarito appears only on things that structure the page: the brand, headings, case and note and column titles. It never sets a paragraph, a button, a chip or a label. Buttons and tabs are Source Sans 3 600 — the display face would make a control look like a headline.

**The Mono-Is-A-Name Rule.** Source Code Pro is used where the string *is* a machine name or a machine state: technology chips, the CV tech lines, status tokens. It is never used for emphasis, for numbers, or for "technical feel".

**The Two-Step Headline Rule.** The `h1` is set a step below the case title. The name identifies; the sheet is the event. Any new hero must keep this relationship rather than inflating the `h1`.

**The No-Kicker Rule.** The uppercase tracked label only ever appears as the *left column of a row* — a `dt`, a date column, a contact-row label. It never sits above a heading as an eyebrow or kicker.

## Layout

A single 76rem content column (`--content-max`), centred, with 2rem side padding that drops to 1rem below 640px. The hero band is the only place with a real grid: 12 columns, the text column spanning 1–5 and the featured-work sheet spanning 6–12, with a 3rem gutter.

Spacing is an 8px module exposed as eight steps (0.25 / 0.5 / 0.75 / 1 / 1.5 / 2 / 3 / 4rem). Sections are separated by 4rem of top padding (3rem below 640px); sheet padding is 2rem, dropping to 1.5rem/1rem on narrow screens. Prose is capped at 68ch; About and Education narrow further to 62ch.

The layout collapses at three widths:
- **1100px** — the hero grid unstacks: text and work sheet each take all 12 columns.
- **900px** — the header wraps to two rows and `--header-height` is redefined from 4rem to 6.5rem, with the nav strip becoming a horizontally scrolling row faded out at its right edge by a mask. The panel's three-column "What I did" breakdown, the fact strip, the skill-group rows, the timeline, the learning columns, the About grid and the Contact grid all go single-column, and their vertical dividers become horizontal ones.
- **640px** — the mail button collapses to a 2.75rem circular icon, contact rows and field rows stack, and the CV tightens its indents.

The sticky header offsets anchor scrolling through `scroll-padding-top` (header height + 1rem; a flat 7.5rem below 900px). Every interactive target is at least 2.75rem tall.

**The 8px Module Rule.** Every margin, padding and gap comes from the eight-step scale. A one-off value is a sign the component is wrong, not the scale.

**The 68ch Measure Rule.** Paragraphs carry `max-width: 68ch` by default, not by opt-in. Widening a column never widens its prose.

## Elevation & Depth

Depth is carried by exactly one device per theme. In light, a sheet is lifted off the butter ground by a single soft warm drop shadow, `0 12px 32px rgba(56, 42, 12, 0.14)` — warm-tinted, never neutral grey, never offset hard. In dark, that same `--shadow` token is redefined as `0 0 0 1px var(--border)`: a 1px hairline ring standing in for the shadow, because a drop shadow on a dark ground reads as smudge rather than lift. Components reference `--shadow` and inherit the right behaviour in both themes without a theme-specific rule.

There is no second elevation level. A sheet is lifted; everything else is flat and separated by hairlines, by the band's tint step, or by whitespace.

### Shadow Vocabulary
- **Sheet lift** (`box-shadow: 0 12px 32px rgba(56, 42, 12, 0.14)`, light): sheets, panels, project notes, the portrait, the CV page.
- **Sheet edge** (`box-shadow: 0 0 0 1px var(--border)`, dark): the same surfaces, same token, dark theme.
- **Tab lift** (`box-shadow: 0 -8px 20px rgba(56, 42, 12, 0.08)`, light only): the one upward-cast shadow in the system, on the selected folder tab, so the tab reads as continuous with the sheet below it. In dark it is replaced by the hairline ring.

### Named Rules

**The Elevation Declared Once Rule.** A surface declares its edge *once*: a shadow or a hairline, never both. If a component needs a visible border in light theme, it is not a sheet — it is a notice (like the CV print hint, which is bordered and unlifted).

**The Warm Shadow Rule.** Shadow colour is `rgba(56, 42, 12, …)`, a brown drawn from the ink, never `rgba(0,0,0,…)`. A neutral shadow turns the butter grey.

## Shapes

Four radii, assigned by function, not by size:
- **Sheets** — gently rounded at **12px** (`--radius-lg`): sheets, panels, notes, the portrait, the CV page.
- **Controls** — **8px** (`--radius`): buttons, the skip link, the print hint, the focus ring's own rounding.
- **Chips** — **6px** (`--radius-sm`): code chips.
- **Pills** — **999px**: the theme toggle, the status tokens, and the mail button in its collapsed circular form.
- **Folder tabs** — **10px on the top corners only** (`10px 10px 0 0`), so the tab's bottom edge can meet the sheet flat.

Borders are always 1px except the focus outline (2px), the nav underline and indicator (2px), the learning column rules (2px espresso) and the hero rule (4px terracotta, 2px radius).

**The Folded Corner Rule.** The featured-work panel's top-left corner is square (`border-radius: 0 12px 12px 12px`) because a tab sits on it. When the tab row is absent — no JavaScript, or a stacked second panel — the panel takes the full 12px on all four corners.

## Components

### Buttons
- **Shape:** gently rounded (8px), minimum height 2.75rem, inline-flex with a 0.5rem gap for an optional icon.
- **Primary:** terracotta fill (`#c4532b`) with white text and a matching border; padding 0.5rem 1.125rem. Hover darkens the fill to `#8f3a1a`. Used for "Get in touch" only — twice on the page, header and contact sheet.
- **Secondary:** espresso fill with butter text (inverting to cream-on-roast in dark). Hover lightens to warm brown-grey. Used for "View CV".
- **Ghost:** transparent with a control hairline border, slightly tighter padding (0.375rem 0.875rem). Hover turns border and text terracotta. Used for the CV page's back link.
- **Hover / Focus:** 150ms transitions on background, border and text colour only — no lift, no scale. Focus is the global 2px terracotta outline at 3px offset.
- **Compact mail button:** below 640px the primary mail button collapses to a 2.75rem circle showing only its drawn SVG envelope; the label is visually hidden and the `aria-label` carries the name.

### Folder Tabs and Panel Sheet (signature)
The tab row sits on the hero band, aligned to its bottom edge, gap 0.25rem, scrolling horizontally with a right-edge fade mask on narrow screens. An unselected tab is a translucent ink wash (`rgba(43, 36, 23, 0.08)`, cream-tinted in dark) with muted text; hover deepens the wash. The selected tab takes the sheet's own background, turns its label terracotta, gains 0.2rem of top padding so it stands taller than its siblings, and casts the upward tab lift so it fuses into the panel below.

The panel is a 12px sheet with a square top-left corner and 2rem of padding, containing: the case title, a subtitle, a `role · employer · dates` meta line, one paragraph, a "What I did" label with a hairline under it, a three-column breakdown separated by vertical hairlines, a chip stack, and a three-fact strip above a top hairline with hairline dividers between cells.

**Progressive enhancement:** the markup ships with no tab semantics. The tab row is `display: none` until JavaScript adds `role="tablist"`, `role="tab"`, `aria-controls`, `aria-selected` and the enhanced class; without JavaScript all three panels simply stack as separate full-radius sheets, 1rem apart. Announcing tabs that cannot be operated would be worse than stacking.

### Chips
- **Style:** butter-chip fill, 1px butter hairline, 6px radius, Source Code Pro at 0.8125rem (0.75rem small), 0.125rem/0.5rem padding, never wrapping.
- **Use:** technology names only, in a wrapping 0.5rem-gap row.
- **Exception:** inside the skills table the same `.tags` list is restyled to flow as comma-separated inline body text at 1rem — a dense list of forty skills as chips would be noise. The chip is for a stack of five, not a taxonomy.

### Status Tokens
- **Style:** a pill outline (999px) in the control hairline, no fill, Source Code Pro at 0.6875rem, sitting inline beside an `h3` with a 0.15em baseline nudge.
- **States:** `Core` takes the terracotta border and label; `Growing` / `In progress` take full-strength ink; `Completed` stays muted. The token is a label on a heading, never a standalone badge.

### Cards / Containers (Sheets)
- **Corner Style:** 12px.
- **Background:** warm sheet.
- **Shadow Strategy:** the single sheet lift; in dark, the hairline ring. See Elevation & Depth.
- **Border:** none in light.
- **Internal Padding:** 2rem (`sheet--pad`), 1.5rem/1rem below 900px.
- **Where sheets are used:** the featured-work panel, About, Skills, project notes, Contact and the CV page. Experience, Learning and Education sit directly on the butter ground with no container — the rhythm of sheet / ground / sheet is what keeps a long page from reading as one slab.

### Field Rows
- **Style:** a two-column definition list (8rem label column) with a top hairline and a hairline under every row; labels are the uppercase tracked label style, values are Source Sans 3 600 with the last value dropping to 400.
- **Responsive:** collapses to a single column below 640px (and inside the About sheet at every width), with the label losing its own bottom rule so label and value read as one block.

### Timeline
A dated list with a 10rem left date column set in the label style, hairlines between items (none above the first), and nested "engagement" blocks indented 1rem behind a left hairline. Bullet markers are terracotta. Below 900px the date column moves above its entry.

### Project Notes
Native `<details>` sheets, 0.75rem apart. The summary is a 1rem/2rem flex row carrying a Gabarito title and a muted meta line, with the list marker suppressed and a CSS-drawn chevron (two 2px borders rotated 45°) pinned right, rotating 180° on open at 150ms. The body is padded to match. No JavaScript involved.

### Navigation
- **Style:** the sticky header sits on the deep butter band with a 1px hairline under it, `z-index: 10`, minimum 4rem tall. Links are Source Sans 3 600 at 0.9375rem in muted ink, full-height padded, with a transparent 2px bottom border.
- **States:** hover brings the text to full ink; the current section gets full ink plus a terracotta underline.
- **Sliding indicator:** when JavaScript runs, a single 2px terracotta bar 100px wide is appended to the nav and positioned with `transform: translateX(…) scaleX(…)` — transform only, 220ms, `cubic-bezier(0.2, 0.8, 0.2, 1)`, no layout. The per-link border is suppressed once the indicator exists, so only one underline is ever visible. The indicator corrects for the strip's horizontal scroll and repositions on resize. Without `IntersectionObserver` nothing appears and the anchors keep working.
- **Mobile:** below 900px the nav wraps to its own full-width row below the brand and actions, scrolling horizontally under a right-edge fade mask.

### Theme Toggle
A 2.75rem circular sheet-coloured button with a control hairline, holding two drawn SVGs (sun and moon) swapped by the `data-theme` attribute. It ships `hidden` and is revealed by JavaScript, so a no-JS visitor never sees a dead control; the theme itself is applied before first paint by an inline head script reading `localStorage` then `prefers-color-scheme`. Hover turns border and icon terracotta. `aria-pressed` tracks the dark state.

### CV Page
On screen the CV inherits every token and renders as a 48rem sheet with hairline-separated entries, a bordered print-hint notice above it, and a ghost back button in a simplified header. In print (`media="print"` only) the world is dropped entirely: A4 with 16mm/18mm margins, black on white, 10.5pt body, no header, no hint, no toggle, no shadow, `break-inside: avoid` on entries, `break-after: avoid` on headings, and external link targets expanded inline as `(url)` — except in the contact line, which already shows readable URLs. The print sheet has to beat the screen stylesheet's class selectors, so its rules are written at matching specificity.

### Motion
Two durations and one curve: 150ms for colour and opacity state changes, 220ms for the nav indicator, both on `cubic-bezier(0.2, 0.8, 0.2, 1)`. `prefers-reduced-motion: reduce` sets every transition and animation duration to 0s and turns off smooth scrolling — the indicator still moves, it just arrives instantly.

## Do's and Don'ts

### Do:
- **Do** keep terracotta to one hue and roughly a tenth of any screen — links, the primary action, the current nav item, the selected tab, the hero rule, list markers, focus.
- **Do** use `#a4441f` for terracotta *text on butter* and `#c4532b` only as a *fill behind white*.
- **Do** declare a surface's edge once: the sheet lift in light, the hairline ring in dark, never both.
- **Do** alternate sheet and bare ground down the page — a long page of nothing but sheets reads as one slab.
- **Do** set every heading in Gabarito (700/800) and every control, label and paragraph in Source Sans 3.
- **Do** reserve Source Code Pro for technology names and status tokens.
- **Do** take every margin, padding and gap from the eight-step 8px scale.
- **Do** cap prose at 68ch (62ch in the About and Education columns).
- **Do** ship enhanced behaviour hidden: the tab row is `display: none` and the theme toggle is `hidden` until JavaScript wires them.
- **Do** draw icons as inline SVG with `aria-hidden="true"` and a text or `aria-label` name beside them.
- **Do** give interactive targets a minimum height of 2.75rem.
- **Do** use `--border-strong` for control outlines and `--border` for content rules.

### Don't:
- **Don't** introduce a second accent hue, a gradient, a tinted glass surface or a second elevation level.
- **Don't** use a neutral black shadow — shadow colour is `rgba(56, 42, 12, …)`.
- **Don't** put a visible border *and* a shadow on the same surface.
- **Don't** set Gabarito on a paragraph, a button, a chip or a label, and don't inflate the `h1` past the case title.
- **Don't** place an uppercase tracked label above a heading as a kicker or eyebrow — labels are row labels.
- **Don't** render a dense taxonomy as chips; chips are for a stack of about five.
- **Don't** animate layout properties. The nav indicator moves on `transform` only.
- **Don't** add semantics in markup that JavaScript has to make true — no `role="tab"` on a row that cannot be operated without script.
- **Don't** let the print stylesheet inherit screen colour, shadow or chrome; print is black on white with no world.
- **Don't** add an external resource beyond Google Fonts.
