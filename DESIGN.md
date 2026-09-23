---
name: Nawres Ben Rhouma — Portfolio
description: A near-white butter page where a two-tone name, a facts card and a folder-tabbed work sheet do the talking, with one forest green accent.
colors:
  butter-ground: "#fffcf2"
  warm-band: "#f6f2e6"
  sheet-white: "#ffffff"
  butter-raised: "#f7f0da"
  espresso-ink: "#2b2417"
  bark-muted: "#5b4e35"
  forest-accent: "#2f6b3a"
  forest-action: "#2f6b3a"
  forest-action-hover: "#245530"
  accent-contrast: "#ffffff"
  forest-soft: "#e6f0e6"
  sand-border: "#e8dcb6"
  sand-border-strong: "#8f8058"
  focus-forest: "#2f6b3a"
  butter-ground-dark: "#1b170f"
  warm-band-dark: "#201d17"
  sheet-dark: "#332c1e"
  butter-raised-dark: "#3f3727"
  cream-ink-dark: "#f2e9d3"
  bark-muted-dark: "#cbbd9c"
  mint-accent-dark: "#86cf8f"
  mint-action-dark: "#5fae6c"
  mint-action-hover-dark: "#86cf8f"
  accent-contrast-dark: "#1b170f"
  mint-soft-dark: "#24352a"
  border-dark: "#4a4130"
  border-strong-dark: "#8f8160"
  focus-mint-dark: "#86cf8f"
typography:
  display:
    fontFamily: "Gabarito, Source Sans 3, Segoe UI, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(3rem, 2rem + 3.6vw, 5rem)"
    fontWeight: 800
    lineHeight: 0.98
    letterSpacing: "-0.04em"
  panel-title:
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
  role-line:
    fontFamily: "Source Sans 3, Segoe UI, Helvetica Neue, Arial, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
    lineHeight: 1.6
    letterSpacing: "0.12em"
  code:
    fontFamily: "Source Code Pro, ui-monospace, SF Mono, Menlo, Consolas, monospace"
    fontSize: "0.8125rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
rounded:
  sheet: "12px"
  control: "8px"
  sm: "6px"
  folder-tab: "10px 10px 0 0"
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
  button-primary:
    backgroundColor: "{colors.forest-action}"
    textColor: "{colors.accent-contrast}"
    rounded: "{rounded.control}"
    padding: "0.5rem 1.125rem"
    height: "2.75rem"
  button-primary-hover:
    backgroundColor: "{colors.forest-action-hover}"
    textColor: "{colors.accent-contrast}"
  button-secondary:
    backgroundColor: "{colors.espresso-ink}"
    textColor: "{colors.butter-ground}"
    rounded: "{rounded.control}"
    padding: "0.5rem 1.125rem"
    height: "2.75rem"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.espresso-ink}"
    rounded: "{rounded.control}"
    padding: "0.5rem 1.125rem"
    height: "2.75rem"
  button-outline-hover:
    backgroundColor: "transparent"
    textColor: "{colors.forest-accent}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.espresso-ink}"
    rounded: "{rounded.control}"
    padding: "0.375rem 0.875rem"
    height: "2.75rem"
  pill:
    backgroundColor: "{colors.forest-soft}"
    textColor: "{colors.forest-accent}"
    rounded: "{rounded.pill}"
    padding: "0.35rem 0.9rem"
    typography: "{typography.small}"
  theme-toggle:
    backgroundColor: "{colors.sheet-white}"
    textColor: "{colors.espresso-ink}"
    rounded: "{rounded.pill}"
    height: "2.75rem"
    width: "2.75rem"
  tab:
    backgroundColor: "rgba(43, 36, 23, 0.08)"
    textColor: "{colors.bark-muted}"
    rounded: "{rounded.folder-tab}"
    padding: "0.75rem 1.125rem"
  tab-selected:
    backgroundColor: "{colors.sheet-white}"
    textColor: "{colors.forest-accent}"
    rounded: "{rounded.folder-tab}"
    padding: "0.95rem 1.125rem 0.75rem"
  sheet:
    backgroundColor: "{colors.sheet-white}"
    textColor: "{colors.espresso-ink}"
    rounded: "{rounded.sheet}"
    padding: "2rem"
  panel:
    backgroundColor: "{colors.sheet-white}"
    textColor: "{colors.espresso-ink}"
    rounded: "0 12px 12px 12px"
    padding: "2rem"
  facts-card:
    backgroundColor: "{colors.sheet-white}"
    textColor: "{colors.espresso-ink}"
    rounded: "{rounded.sheet}"
    padding: "1rem 1.5rem"
  chip:
    backgroundColor: "{colors.butter-raised}"
    textColor: "{colors.espresso-ink}"
    rounded: "{rounded.sm}"
    padding: "0.125rem 0.5rem"
    typography: "{typography.code}"
  status:
    backgroundColor: "transparent"
    textColor: "{colors.bark-muted}"
    rounded: "{rounded.pill}"
    padding: "0.05rem 0.5rem"
  status-core:
    backgroundColor: "transparent"
    textColor: "{colors.forest-accent}"
    rounded: "{rounded.pill}"
    padding: "0.05rem 0.5rem"
---

# Design System: Nawres Ben Rhouma — Portfolio

## Overview

**Creative North Star: "The Green Full Stop"** *(derived from the direction contract; no user was available to confirm)*

A near-white page that behaves like good paper: butter-tinted, quiet, and generous with air. Everything structural is achieved by tone and edge rather than by decoration — the ground alternates between two warm near-whites section by section, and pure white sheets float on top of it carrying the content that needs to be read closely. The one thing that raises its voice is forest green, and it is spent almost entirely on endings: the surname and its full stop, the second clause of every section heading, the timeline markers, the selected folder tab. The name ends in green; so does the page's argument.

The density is document-like without being a document. Headings are set in Gabarito at 800 and tracked tight, so they read as built rather than typed; body text is Source Sans 3 at 1.0625rem on a 1.6 line, capped at a 68ch measure so no line becomes a scanning chore. Source Code Pro appears only where content is literally a token — a technology chip, a status marker — which keeps the monospace signal honest.

What the world refuses is equally load-bearing. It refuses the plain-document look (hence the sheets, the alternating ground, the folder tabs) and it refuses the copy of either reference that seeded it (hence the butter tint, Gabarito, and green in place of the references' orange and blue). It carries no photography and no invented metrics; credibility comes from typography, spacing and detail rather than from imagery or numbers.

**Key Characteristics:**
- Butter-tinted near-white ground (#fffcf2) alternating with a warmer tone (#f6f2e6), full-bleed, section by section
- Pure white sheets on a single soft offset shadow in light; a hairline ring in dark
- One accent, forest green (#2f6b3a) in light and mint (#86cf8f) in dark, spent on endings
- Gabarito 700/800 display and headings; Source Sans 3 body; Source Code Pro only in chips and status tokens
- 8px module, 76rem content maximum, 68ch measure
- One authored entrance motion, JS-only and reduced-motion aware; every surface works with JavaScript off

## Colors

Two warm near-whites, an espresso ink, and a single forest green that never shares the stage with a second hue.

### Primary
- **Forest Green** (`#2f6b3a`): the only accent. It lands on the closing words of the name and of every section heading, on links, on the primary button, on the availability pill and its dot, on timeline markers, on bullet markers, on the selected folder tab's label, on the last value in the facts card, and on the focus ring. In dark it becomes **Mint** (`#86cf8f`) so it can carry text weight on a dark ground.
- **Forest Action** (`#2f6b3a` → hover `#245530`): the filled primary button. Dark ships a separate, slightly lighter **Mint Action** (`#5fae6c`) whose hover resolves up to the full mint, because the light green would flare against the dark ground.
- **Forest Soft** (`#e6f0e6`): the accent's only tinted surface — the availability pill, and the selection highlight. Dark uses **Mint Soft** (`#24352a`).
- **Accent Contrast** (`#ffffff` light / `#1b170f` dark): text on any filled accent surface. Never hand-pick a white here; the token flips with the theme.

### Neutral
- **Butter Ground** (`#fffcf2` light / `#1b170f` dark): the page. Near-white with a warm tint, never pure white.
- **Warm Band** (`#f6f2e6` light / `#201d17` dark): the alternate section tone. Applied full-bleed to `.section--alt`, so section rhythm is legible from the scrollbar alone.
- **Sheet White** (`#ffffff` light / `#332c1e` dark): the lifted content surface — panels, cards, the timeline bodies, the note sheets, the CV page.
- **Butter Raised** (`#f7f0da` light / `#3f3727` dark): the one small tinted fill, used for technology chips.
- **Espresso Ink** (`#2b2417` light / `#f2e9d3` dark): all primary text, the brand mark, and the secondary (inverted) button's ground.
- **Bark Muted** (`#5b4e35` light / `#cbbd9c` dark): labels, dates, meta lines, nav links at rest, secondary prose.
- **Sand Border** (`#e8dcb6` light / `#4a4130` dark): hairlines — field rows, section rules, the header underline, column dividers.
- **Sand Border Strong** (`#8f8058` light / `#8f8160` dark): control outlines only. It sits around 3.5:1 on the butter ground, which is enough for a non-text UI boundary and not enough for text.

### Named Rules
**The Green Full Stop Rule.** The accent is reserved for the ending: the surname and its period, the second clause of every `h2`, and the small terminal signals (timeline dots, list markers, the selected tab, the last facts value). It never tints a large surface, never appears twice in the same role on one screen, and never acquires a companion hue.

**The Hairline Two-Tier Rule.** Content separation uses Sand Border; interactive outlines use Sand Border Strong. Never put Sand Border Strong under text or Sand Border around a control.

**The Warm White Rule.** There is no pure white ground. White appears only as a sheet lifted off the butter page; if a surface is the page itself, it is tinted.

## Typography

**Display Font:** Gabarito (700/800, with Source Sans 3 and the system sans as fallback)
**Body Font:** Source Sans 3 (400/600/700, with Segoe UI / Helvetica Neue / Arial)
**Label/Mono Font:** Source Code Pro (400, with ui-monospace / SF Mono / Menlo / Consolas)

**Character:** Gabarito's slightly condensed, geometric caps give the name and headings an engineered confidence at heavy weights and tight tracking; Source Sans 3 underneath is plain, legible and unmannered, so the page reads calm rather than designed-at. Source Code Pro appears in one-word doses only and reads as data, not as decoration.

### Hierarchy
- **Display** (800, `clamp(3rem, 2rem + 3.6vw, 5rem)`, line-height 0.98, tracking -0.04em): the hero name only. Set in two tones with the surname in the accent, ending in a full stop.
- **Panel Title** (800, `clamp(2.25rem, 1.6rem + 2.6vw, 3.5rem)`, tracking -0.02em): the project name inside a work panel. Deliberately near-display scale — the folder sheet is the page's second hero.
- **Headline** (800, 1.75rem, line-height 1.1, tracking -0.02em): section `h2`. Always two clauses, the second wrapped in an accent span, ending in a full stop; a `#` heading anchor follows, invisible until hover or focus.
- **Title** (700, 1.25rem, tracking -0.01em): `h3` — timeline roles, skill groups, learning columns.
- **Body** (400, 1.0625rem, line-height 1.6): all prose, capped at a 68ch measure. The hero statement and the contact lead step up to 1.25rem.
- **Small** (400, 0.875rem): meta lines, dates, notes, footer, the print hint.
- **Label** (600, 0.75rem, 0.06em, uppercase): field labels, contact labels, timeline dates; facts-card labels track slightly wider (0.08em).
- **Role Line** (600, 0.75rem, 0.12em, uppercase): the hero role directly under the name — the widest tracking on the page, used once.

### Named Rules
**The Two-Tone Heading Rule.** Every `h1` and `h2` is written as two clauses: a plain first half in ink and a closing half in the accent, terminated by a full stop. Headings are statements, not labels.

**The Mono Reserve Rule.** Source Code Pro is permitted in exactly two places: technology chips and status tokens. Prose, headings, dates and labels never use it.

**The Balanced Measure Rule.** Headings carry `text-wrap: balance`; paragraphs carry a 68ch cap (62ch inside About and Education). Nothing on the page runs the full 76rem as text.

## Layout

The page is a stack of full-bleed sections, each a three-column grid — a flexible gutter of at least 2rem, a centred content column capped at 76rem, and a matching gutter — so the alternating background tone reaches the viewport edges while the content stays aligned. The hero sits outside that grid on its own padding and splits 7:5 into text and a facts card. The work section narrows its content to 60rem so the tabbed sheet keeps the tab row scannable.

Spacing is an 8px module (0.25 / 0.5 / 0.75 / 1 / 1.5 / 2 / 3 / 4rem). Section padding is 4rem vertical, dropping to 3rem below 640px. Sheets pad at 2rem, tightening to 1.5rem/1rem on narrow screens. A sticky header 4rem tall pins the brand, eight section anchors, the View CV button and the theme toggle; `scroll-padding-top` is kept in sync with it.

Three breakpoints, each doing one job. At 1100px the hero collapses to a single column. At 900px the header wraps — the nav becomes a masked horizontal scroll strip on its own row and the header grows to 6.5rem — the facts card goes full width with labels above values, the panel and skill grids become single-column, divider borders rotate from left edges to top edges, and the timeline rail tightens. At 640px the section gutters drop to 1rem and field rows stack.

### Named Rules
**The Alternating Ground Rule.** Section tone alternates via `.section--alt` across the full bleed. Never tint only the content column; never run two alternate sections back to back.

**The Edge-to-Center Rule.** Content lives in the middle column of the section grid at a 76rem cap. New sections adopt the grid rather than inventing their own container.

## Elevation & Depth

Depth is tonal first and shadowed second. The page ground, the alternate band and the white sheet form a three-step tonal ladder that does most of the structural work; a single soft, warm-tinted drop shadow then lifts sheets off the page. There is exactly one elevation level — nothing is lifted higher than anything else. In dark mode the shadow token is replaced by a 1px hairline ring in the border colour, because a dark-on-dark drop shadow reads as smudge rather than lift.

### Shadow Vocabulary
- **Sheet lift** (`box-shadow: 0 12px 32px rgba(56, 42, 12, 0.14)`): every white sheet — hero facts card, work panels, skills and about and contact sheets, timeline bodies, note sheets, the CV page.
- **Sheet lift, dark** (`box-shadow: 0 0 0 1px var(--border)`): the same token in dark mode, resolved as a hairline ring.
- **Folder fuse** (`box-shadow: 0 -8px 20px rgba(56, 42, 12, 0.08)`): the selected folder tab only, thrown upward so the tab appears continuous with the sheet below it.

### Named Rules
**The One Elevation Rule.** There is a single shadow token and a single altitude. Hover never raises a surface; state is shown in colour and border, never in lift.

**The Dark Hairline Rule.** In dark mode, elevation is a 1px ring, not a shadow. Do not port a light-mode drop shadow into the dark palette.

## Shapes

Four radii and nothing else: 12px on sheets, cards, panels and note sheets; 8px on buttons, the skip link and the print hint; 6px on chips and the focus ring; 999px on the availability pill, the status tokens and the circular theme toggle. Folder tabs take a 10px top-only radius (`10px 10px 0 0`), and the panel beneath the tab row squares its top-left corner (`0 12px 12px 12px`) so tab and sheet fuse into one silhouette.

Borders are hairlines at 1px in two weights (see The Hairline Two-Tier Rule). Two deliberate exceptions carry meaning: the learning columns open with a 2px rule in full ink, and the vertical timeline rail is a 2px line in the border colour with 1rem accent discs punched through it, each ringed by 4px of the current section ground so the marker reads as sitting on the rail rather than beside it.

### Named Rules
**The Four Radii Rule.** 12 / 8 / 6 / 999. Any new corner picks one of them; nothing on this page is square except a table edge or a fused tab corner.

## Components

### Buttons
- **Shape:** gently curved (8px radius), 2.75rem minimum height, 0.5rem × 1.125rem padding, 0.9375rem semibold body type, 150ms colour transitions.
- **Primary:** forest green fill with accent-contrast text and a matching border; hover deepens to `#245530` (dark: mint action lifting to full mint). Used once per section at most — "View work", "Get in touch".
- **Secondary:** inverted — espresso ink fill, page-coloured text; hover softens to the muted ink. Used for the CV link in the contact sheet.
- **Outline:** transparent with a Sand Border Strong outline and ink text; hover swaps both border and text to the accent. The hero's second action.
- **Ghost:** the outline treatment at a tighter 0.375rem × 0.875rem — the header's View CV and the CV page's back link.
- **Focus:** the global 2px accent outline, offset 3px, 6px radius. No button defines its own focus style.

### Icon Links
Inline SVG (currentColor, 20px) plus a label in semibold ink, 2.75rem tall, no underline; hover turns the whole pair accent. GitHub and LinkedIn in the hero.

### Availability Pill
A pill-radius chip on the accent-soft tint with accent text and a 0.5rem accent dot, sitting above the name. It carries location and availability, appears once on the page, and is the only tinted accent surface.

### Facts Card
A two-column `<dl>` on a white sheet: uppercase tracked labels left, semibold values right-aligned, each row divided by a hairline and the last row's divider removed. The final value is accent-coloured. Below 900px it becomes a full-width single column with labels above values, left-aligned.

### Folder Tabs and Panel (signature)
The structural signature. A horizontally scrollable row of tabs sits on the section ground in a low-opacity ink wash; the selected tab switches to the sheet colour, gains accent text, grows 0.2rem of top padding and throws an upward shadow so it fuses into the panel below. The panel is a white sheet with its top-left corner squared off to complete the folder silhouette. Inside: a near-display panel title, a semibold subtitle, a muted meta line, a body paragraph, a "What I did" label under a hairline rule, a three-column note grid with left-edge dividers, a row of chips, and a fact strip separated by hairlines. Progressive enhancement is part of the component: the markup ships without tab semantics, the tab row is hidden by default and shown only when JavaScript adds `role="tablist"` and the ARIA wiring, and without JavaScript the panels simply stack as separate sheets, each with a full 12px radius.

### Chips and Status Tokens
- **Chips:** Source Code Pro at 0.8125rem (0.75rem in the small variant) on the butter-raised tint with a hairline border and a 6px radius; inline, wrapping, never interactive.
- **Status tokens:** pill-radius outlines at 0.6875rem monospace with no fill, attached inline to a heading. Three states: core (accent text and border), growing (ink text on the strong hairline), done (muted). They label honesty about depth — never used as a badge or a count.

### Field Rows
A two-column `<dl>` on the page ground: an 8rem label column in uppercase tracked muted type, a value column in semibold, hairlines top and between rows. Below 640px labels stack above values. Used in About and, in a 7rem variant, in the contact list.

### Skills Table
Full-width rows on a sheet: a 19rem heading column and a free-flowing list column, divided by hairlines, first row unpadded and last row undivided. Inside a skill group the chip styling is deliberately dropped — items become plain inline text separated by muted commas, so a long skill list reads as a sentence rather than a wall of boxes.

### Timeline
An ordered list with a 2px hairline rail and 1rem accent discs, each ringed by 4px of the current ground (the ring colour follows `.section--alt`). Dates sit above the sheet as an uppercase tracked label; the entry body is a white sheet. Nested engagements inside a body indent behind a left hairline with their own heading, date span, chips and bullets. Bullet markers are accent-coloured.

### Note Sheets
Native `<details>` on white sheets: the summary is a flex heading with a title and a muted meta line, the default marker is suppressed, and a 0.6rem chevron drawn from two borders rotates on open. Body content is bullets plus chips. No JavaScript involved.

### Learning Columns
Two columns on the bare page ground — no sheet — each opening with a 2px ink rule, a title with a status token, and a bullet list. The only place a 2px rule is used as a heading device.

### Contact Sheet
A white sheet split 1 : 1.4 — an intro column with a 1.25rem lead and the two actions, and a list column of label/value rows on hairlines with long URLs allowed to break anywhere. Collapses to one column below 900px.

### Navigation
The sticky header carries the brand in Gabarito 700, eight anchors in muted semibold 0.9375rem, the ghost View CV button and the circular theme toggle. The current section is marked by `aria-current="true"` and a 2px accent underline; when JavaScript is present, a single 100px-wide accent indicator is injected and slid under the active link by transform only (220ms), and the static underline is suppressed so the two never double. Below 900px the nav moves to its own row as a horizontally scrollable strip with a right-edge fade mask, and the indicator corrects for the strip's scroll offset.

### Theme Toggle
A 2.75rem circle on the sheet colour with a strong hairline border, holding a sun or moon inline SVG; hover turns border and glyph accent. It ships `hidden` and is revealed by JavaScript, carries `aria-pressed`, and the stored theme is applied by an inline head script before first paint so there is no flash.

### CV Page
The same tokens on a single 48rem sheet: a header block with the name, a muted title line, a small contact line and a bold availability line, then hairline-divided entries with a flex head (role left, dates right) and nested entries indented. Print is a separate stylesheet loaded at `media="print"`: A4 with 16mm/18mm margins, header and toggle and print hint removed, the sheet flattened to plain paper in black on white at 10.5pt, headings ruled and kept with their content, entries protected from breaking, and external links expanded to show their URL after the text — except in the contact line, which already shows readable URLs.

### Motion
One authored entrance: sections tagged `data-reveal` fade up 14px over 500ms on the shared ease-out curve, once, then stop being observed. It is added by JavaScript only, so nothing is ever hidden without JS, and it is skipped entirely when reduced motion is requested. Everything else is state feedback: 150ms colour and border transitions, a 220ms nav indicator slide, and a 150ms chevron rotation. Under `prefers-reduced-motion: reduce` all transitions and animations are forced to zero and smooth scrolling is disabled.

## Do's and Don'ts

### Do:
- **Do** keep the accent on endings — the closing clause, the terminal marker, the selected state — per The Green Full Stop Rule.
- **Do** write every section heading as two clauses with the second in an accent span and a full stop at the end.
- **Do** alternate section tone with `.section--alt` full-bleed, and put new content in the section grid's middle column at the 76rem cap.
- **Do** lift content on the single sheet shadow (`0 12px 32px rgba(56, 42, 12, 0.14)`) and let the dark theme resolve it to a hairline ring.
- **Do** spend the 8px module: 4rem section padding, 2rem sheet padding, 1.5rem between grouped blocks.
- **Do** ship every enhancement as an enhancement — tabs, the nav indicator, the reveal and the toggle each have a defined no-JS state.
- **Do** keep text within the 68ch measure and hairlines at 1px.
- **Do** use the accent-contrast token on any filled accent surface instead of hard-coding white.

### Don't:
- **Don't** introduce a second accent hue, a gradient, or a tinted accent surface beyond the availability pill.
- **Don't** use pure white as a page ground, or a shadow anywhere in dark mode.
- **Don't** raise a surface on hover or add a second elevation level; state is colour and border only.
- **Don't** set body copy, headings, dates or labels in Source Code Pro — chips and status tokens only.
- **Don't** put Sand Border Strong (`#8f8058`) under text; it is a control outline, not a text or divider colour.
- **Don't** add a radius outside 12 / 8 / 6 / 999 (the folder tab's 10px top corners are the one fused exception).
- **Don't** add a second authored motion, or any motion that survives `prefers-reduced-motion: reduce`.
- **Don't** ship a component whose content only exists once JavaScript runs.
- **Don't** add photography, logos, testimonials or metric callouts; this world carries none.
