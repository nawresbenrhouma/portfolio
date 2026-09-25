---
name: Nawres Ben Rhouma — Portfolio
description: A near-white butter page where a name that breaks on its colour change sits beside a solid green at-a-glance panel, and one folder-tabbed work sheet carries the proof.
colors:
  butter-ground: "#fffcf2"
  warm-band: "#f6f2e6"
  sheet-white: "#ffffff"
  butter-raised: "#f7f0da"
  espresso-ink: "#2b2417"
  bark-muted: "#5b4e35"
  forest-accent: "#7a5a00"
  forest-action: "#7a5a00"
  forest-action-hover: "#ffe97a"
  accent-contrast: "#ffffff"
  forest-soft: "#fbf0c4"
  sand-border: "#e8dcb6"
  sand-border-strong: "#8f8058"
  focus-forest: "#7a5a00"
  butter-ground-dark: "#1b170f"
  warm-band-dark: "#201d17"
  sheet-dark: "#332c1e"
  butter-raised-dark: "#3f3727"
  cream-ink-dark: "#f2e9d3"
  bark-muted-dark: "#cbbd9c"
  light butter-accent-dark: "#f0cf5a"
  light butter-action-dark: "#fff0a6"
  light butter-action-hover-dark: "#ffe97a"
  accent-contrast-dark: "#1b170f"
  light butter-soft-dark: "#3a3115"
  border-dark: "#4a4130"
  border-strong-dark: "#8f8160"
  focus-light butter-dark: "#f0cf5a"
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
  glance-value:
    fontFamily: "Gabarito, Source Sans 3, Segoe UI, Helvetica Neue, Arial, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 700
    lineHeight: 1.25
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
  glance-label:
    fontFamily: "Source Sans 3, Segoe UI, Helvetica Neue, Arial, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
    lineHeight: 1.6
    letterSpacing: "0.08em"
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
  panel-green:
    backgroundColor: "{colors.forest-accent}"
    textColor: "{colors.accent-contrast}"
    rounded: "{rounded.sheet}"
    padding: "2rem"
  glance-term:
    backgroundColor: "transparent"
    textColor: "{colors.accent-contrast}"
    typography: "{typography.glance-label}"
  glance-value:
    backgroundColor: "transparent"
    textColor: "{colors.accent-contrast}"
    typography: "{typography.glance-value}"
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
    height: "2.75rem"
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
  project-card:
    backgroundColor: "{colors.sheet-white}"
    textColor: "{colors.espresso-ink}"
    rounded: "{rounded.sheet}"
    padding: "1.5rem 2rem"
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

**Creative North Star: "The Butter Full Stop"** *(derived from the direction contract; no user was available to confirm)*

A near-white page that behaves like good paper: butter-tinted, quiet, and generous with air. Everything structural is achieved by tone and edge rather than by decoration — the ground alternates between two warm near-whites section by section, and pure white sheets float on top of it carrying the content that needs to be read closely. The one thing that raises its voice is butter yellow, and it is spent on endings: the surname and its full stop, the second clause of every section heading, the timeline markers, the selected folder tab, the drawn column icons.

Once, and only once, that green stops being ink and becomes a surface. In the hero's right column a solid butter panel holds four at-a-glance facts in Gabarito over small tracked labels, with the profile links on a translucent hairline footer. It is the page's single loud object, and its weight is what lets the rest of the page stay pale. The name beside it is set so that its colour change *is* its line break — "Nawres" in ink, "Ben Rhouma." in green on the next line — so the split reads as a typographic decision rather than a highlight.

The density is document-like without being a document. Headings are Gabarito at 800, tracked tight, so they read as built rather than typed; body text is Source Sans 3 at 1.0625rem on a 1.6 line, and the About sheet is sized to its own measure rather than to the grid, so the biography reads as one column of a printed page. Source Code Pro appears only where content is literally a token — a technology chip, a status marker. What the world refuses is equally load-bearing: no photography, no logos, no invented metrics, no second hue, and no motion that does not carry meaning. Three authored moments exist, each tied to the story: the hero stack assembles once, the work sheet fades up, and a butter trace runs down the experience rail as the reader scrolls.

**Key Characteristics:**
- Butter-tinted near-white ground (#fffcf2) alternating with a warmer tone (#f6f2e6), full-bleed, section by section
- Pure white sheets on a single soft offset shadow in light; a hairline ring in dark
- One accent, butter yellow (#7a5a00) in light and light butter (#f0cf5a) in dark, used as ink everywhere and as a surface exactly once
- Gabarito 700/800 display and headings; Source Sans 3 body; Source Code Pro only in chips and status tokens
- 8px module, 76rem content maximum, 68ch measure
- Three authored moments (stack assembly, work reveal, experience trace), each reduced-motion and print safe; every surface works with JavaScript off
- A drawn stack in the hero (Services / Platform / Cloud) illustrating the claim "the platform under them"
- Pinned split headings on wide screens; the last heading is a display-scale sign-off

## Colors

Two warm near-whites, an espresso ink, and a single butter yellow that never shares the stage with a second hue.

### Primary
- **Forest Green** (`#7a5a00`): the only accent. As ink it lands on the closing words of the name and of every section heading, on links, on timeline and bullet markers, on the drawn column icons, on the selected folder tab's label and on the focus ring. As a surface it appears exactly once, filling the hero's at-a-glance panel. In dark it becomes **Mint** (`#f0cf5a`) so it can carry text weight on a dark ground. Filled surfaces (the panel and the primary button) keep the same pastel butter (`#fff0a6`, hover `#ffe97a`) in both themes, with dark ink on top.
- **Forest Action** (`#7a5a00` → hover `#ffe97a`): the filled primary button. Dark ships a separate, slightly lighter **Mint Action** (`#ffe97a`) whose hover resolves up to the full light butter, because the light green would flare against the dark ground.
- **Accent Contrast** (`#ffffff` light / `#1b170f` dark): everything set on the butter panel — labels, values, links, its hairline divider at 28% white. Never hand-pick a white here; in dark the panel's text switches to the page ground colour so it stays legible on light butter.
- **Forest Soft** (`#fbf0c4` light / `#3a3115` dark): reduced to a single job — the text selection highlight.

### Neutral
- **Butter Ground** (`#fffcf2` light / `#1b170f` dark): the page. Near-white with a warm tint, never pure white.
- **Warm Band** (`#f6f2e6` light / `#201d17` dark): the alternate section tone. Applied full-bleed to `.section--alt`, so section rhythm is legible from the scrollbar alone.
- **Sheet White** (`#ffffff` light / `#332c1e` dark): the lifted content surface — work panels, project cards, timeline bodies, the about/skills/contact sheets, the CV page.
- **Butter Raised** (`#f7f0da` light / `#3f3727` dark): the one small tinted fill, used for technology chips.
- **Espresso Ink** (`#2b2417` light / `#f2e9d3` dark): all primary text, the brand mark, the Education columns' 2px rule, and the secondary (inverted) button's ground.
- **Bark Muted** (`#5b4e35` light / `#cbbd9c` dark): labels, dates, meta lines, nav links at rest, secondary prose.
- **Sand Border** (`#e8dcb6` light / `#4a4130` dark): hairlines — section rules, the header underline, column dividers, contact rows.
- **Sand Border Strong** (`#8f8058` light / `#8f8160` dark): control outlines only. It sits around 3.5:1 on the butter ground, which is enough for a non-text UI boundary and not enough for text.

### Named Rules
**The Butter Full Stop Rule.** The accent is reserved for the ending: the surname and its period, the second clause of every `h2`, and the small terminal signals (timeline dots, list markers, column icons, the selected tab). It never appears twice in the same role on one screen and never acquires a companion hue.

**The Accent-as-Surface Rule.** Green fills exactly one object per page — the at-a-glance panel. A second filled green area would turn the accent into a theme colour and cost the first one its weight. Everywhere else the accent is ink, a 1rem marker, or a 2px line. One exception inside a drawing: the Services plate of the hero stack is filled butter, because the drawing's point is which layer is the core; it is geometry at small scale, not a second surface.

**The Hairline Two-Tier Rule.** Content separation uses Sand Border; interactive outlines use Sand Border Strong. Never put Sand Border Strong under text or Sand Border around a control. On the butter panel the divider is neither — it is 28% white (30% of the dark ink in dark mode), because a hairline on a saturated surface must be drawn from that surface's own contrast.

**The Warm White Rule.** There is no pure white ground. White appears only as a sheet lifted off the butter page; if a surface is the page itself, it is tinted.

## Typography

**Display Font:** Gabarito (700/800, with Source Sans 3 and the system sans as fallback)
**Body Font:** Source Sans 3 (400/600/700, with Segoe UI / Helvetica Neue / Arial)
**Label/Mono Font:** Source Code Pro (400, with ui-monospace / SF Mono / Menlo / Consolas)

**Character:** Gabarito's slightly condensed, geometric caps give the name and headings an engineered confidence at heavy weights and tight tracking; Source Sans 3 underneath is plain, legible and unmannered, so the page reads calm rather than designed-at. Source Code Pro appears in one-word doses only and reads as data, not as decoration.

### Hierarchy
- **Display** (800, `clamp(3rem, 2rem + 3.6vw, 5rem)`, line-height 0.98, tracking -0.04em): the hero name only. The accent span is `display: block`, so the second line and the colour change are the same event.
- **Panel Title** (800, `clamp(2.25rem, 1.6rem + 2.6vw, 3.5rem)`, tracking -0.02em): the project name inside a work panel. Deliberately near-display scale — the folder sheet is the page's second hero.
- **Headline** (800, `clamp(1.875rem, 1.4rem + 1vw, 2.25rem)`, line-height 1.1, tracking -0.025em): section `h2`. Always two clauses, the second wrapped in an accent span on its own line, ending in a full stop. No permalink anchor follows it.
- **Title** (700, 1.25rem, tracking -0.01em): `h3` — timeline roles, project cards, skill groups, Education columns.
- **Glance Value** (Gabarito 700, 1.25rem, line-height 1.25): the three values on the butter panel. The only place display type is used at body scale, which is what makes the panel read as a summary rather than a list.
- **Body** (400, 1.0625rem, line-height 1.6): all prose, capped at a 68ch measure. The About sheet takes the same cap plus its own 2rem padding on each side, so the sheet ends where the text ends.
- **Small** (400, 0.875rem): meta lines, dates, project meta, footer, the print hint.
- **Label** (600, 0.75rem, 0.06em, uppercase): contact labels and timeline dates. The glance panel's terms track slightly wider (0.08em) and sit at 80% opacity on the green.
- **Role Line** (600, 0.75rem, 0.12em, uppercase): the hero role as an eyebrow directly above the name — the widest tracking on the page, used once.
- **Claim** (Gabarito 700, `clamp(1.375rem, 1.1rem + 1vw, 1.75rem)`, tracking -0.01em, balanced): the one-line claim under the name — "Backend services that reach production, and the platform under them." The positioning statement follows it in muted 1.125rem, then the actions.

### Named Rules
**The Two-Tone Heading Rule.** Every `h1` and `h2` is written as two clauses: a plain first half in ink and a closing half in the accent, terminated by a full stop. Headings are statements, not labels.

**The Colour Break Rule.** In the hero the colour change carries the line break. Do not add a `<br>`, and do not tint a word mid-line; if a name or heading must break, break it where the colour changes.

**The Mono Reserve Rule.** Source Code Pro is permitted in exactly two places: technology chips and status tokens. Headings carry no visible permalink. Prose, headings, dates and labels never use it.

**The Balanced Measure Rule.** Headings carry `text-wrap: balance`; paragraphs carry a 68ch cap (62ch in Education). Where a sheet holds nothing but prose, the sheet is sized to that measure plus its padding rather than stretched to the grid — a full-width sheet around a 68ch column is a box, not a layout.

## Layout

The page is a stack of full-bleed sections, each a three-column grid — a flexible gutter of at least 2rem, a centred content column capped at 76rem, and a matching gutter — so the alternating background tone reaches the viewport edges while the content stays aligned. The hero sits outside that grid on its own 4rem/2rem padding and splits 7:5 into text and the butter panel, vertically centred against each other.

Spacing is an 8px module (0.25 / 0.5 / 0.75 / 1 / 1.5 / 2 / 3 / 4rem). Section padding is 4rem vertical, dropping to 3rem below 640px. Sheets pad at 2rem, tightening to 1.5rem/1rem on narrow screens. A sticky header 4rem tall pins the brand, eight section anchors, the View CV button and the theme toggle; `scroll-padding-top` is kept in sync with it.

One multi-column block carries real content rather than boxes: the projects grid runs two equal columns of cards at a 1.5rem gap, collapsing to one at 900px. The About sheet takes the opposite approach — it is capped at the 68ch measure plus its own padding, so a prose-only sheet never stretches to the full 76rem.

Three breakpoints, each doing one job. At 1100px the hero collapses to a single column and the butter panel takes the full width under the name. At 900px the header wraps — the nav becomes a masked horizontal scroll strip on its own row and the header grows to 6.5rem — the projects grid goes to one column, the panel and skill grids go single-column, divider borders rotate from left edges to top edges, and the timeline rail tightens. At 640px the section gutters drop to 1rem and the contact rows stack.

### Named Rules
**The Alternating Ground Rule.** Section tone alternates via `.section--alt` across the full bleed. Never tint only the content column; never run two alternate sections back to back.

**The Edge-to-Center Rule.** Content lives in the middle column of the section grid at a 76rem cap. New sections adopt the grid rather than inventing their own container.

**The One Collapse Rule.** Every multi-column block collapses at 900px — the project grid, the panel's three notes, the skill rows, the contact split. Do not introduce a block with its own breakpoint.

### Pinned Split and Sign-off
From 1100px up, About, Skills, Experience and Education split into a 19rem heading column and a 57rem content column (76rem total). The heading sticks below the header while its section scrolls past. Selected work stays full-width (it is the page's second hero) and Contact closes on a sign-off: the heading at `clamp(2.75rem, 1.5rem + 5vw, 6rem)`, line-height 0.98. Every section heading breaks at its colour change, like the name. Below 1100px all sections stack as before.

### The Hero Stack
Three axonometric plates (Services, Platform, Cloud) drawn at 2px in ink, with HTML labels on leader lines. Services is butter with a deep-butter side, Platform is sheet white, Cloud is the alternate band. A 3px accent trace pins through all three and ends in a dot on Cloud. Labels list only skills already on the page. Below 1100px the panel comes first and the drawing follows it; below 640px the sub-labels hide.

## Elevation & Depth

Depth is tonal first and shadowed second. The page ground, the alternate band and the white sheet form a three-step tonal ladder that does most of the structural work; a single soft, warm-tinted drop shadow then lifts sheets off the page. There is exactly one elevation level — nothing is lifted higher than anything else, and the butter panel is lifted on the same shadow as the white sheets, so it reads as the same kind of object in a different colour. In dark mode the shadow token is replaced by a 1px hairline ring in the border colour, because a dark-on-dark drop shadow reads as smudge rather than lift.

### Shadow Vocabulary
- **Sheet lift** (`box-shadow: 0 12px 32px rgba(56, 42, 12, 0.14)`): every lifted surface — the green at-a-glance panel, work panels, project cards, the about/skills/contact sheets, timeline bodies, the CV page.
- **Sheet lift, dark** (`box-shadow: 0 0 0 1px var(--border)`): the same token in dark mode, resolved as a hairline ring.
- **Folder fuse** (`box-shadow: 0 -8px 20px rgba(56, 42, 12, 0.08)`): the selected folder tab only, thrown upward so the tab appears continuous with the sheet below it.

### Named Rules
**The One Elevation Rule.** There is a single shadow token and a single altitude. Hover never raises a surface; state is shown in colour and border, never in lift.

**The Dark Hairline Rule.** In dark mode, elevation is a 1px ring, not a shadow. Do not port a light-mode drop shadow into the dark palette.

## Shapes

Four radii and nothing else: 12px on every lifted surface (the butter panel, sheets, work panels, project cards); 8px on buttons, the skip link and the print hint; 6px on chips and the focus ring; 999px on the status tokens and the circular theme toggle. Folder tabs take a 10px top-only radius (`10px 10px 0 0`), and the panel beneath the tab row squares its top-left corner (`0 12px 12px 12px`) so tab and sheet fuse into one silhouette.

Borders are hairlines at 1px in two weights (see The Hairline Two-Tier Rule). Three deliberate exceptions carry meaning: the Education columns open with a 2px rule in full ink; the vertical timeline rail is a 2px line in the border colour with 1rem accent discs punched through it, each ringed by 4px of the current section ground; and the panel's column icons are drawn at 2px stroke so they sit at the same weight as those rules rather than as filled glyphs.

### Named Rules
**The Four Radii Rule.** 12 / 8 / 6 / 999. Any new corner picks one of them; nothing on this page is square except a table edge or a fused tab corner.

**The Drawn Line Rule.** Icons are single-stroke line drawings at 2px with round caps and joins, sized 20–22px, coloured by `currentColor` or the accent, and always `aria-hidden` beside a real text label. No filled glyphs, no icon fonts, no icon without its word.

## Components

For each component: a short character line, then shape, colour assignment, states and distinctive behaviour.

### Buttons
- **Shape:** gently curved (8px radius), 2.75rem minimum height, 0.5rem × 1.125rem padding, 0.9375rem semibold body type, 150ms colour transitions.
- **Primary:** butter yellow fill with accent-contrast text and a matching border; hover deepens to `#ffe97a` (dark: light butter action lifting to full light butter). Used once per section at most — "View work", "Get in touch".
- **Secondary:** inverted — espresso ink fill, page-coloured text; hover softens to the muted ink. Used for the CV link in the contact sheet.
- **Outline:** transparent with a Sand Border Strong outline and ink text; hover swaps both border and text to the accent. The hero's second action.
- **Ghost:** the outline treatment at a tighter 0.375rem × 0.875rem — the header's View CV and the CV page's back link.
- **Focus:** the global 2px accent outline, offset 3px, 6px radius. No button defines its own focus style.

### At-a-Glance Panel (signature)
The page's single loud object and the hero's right column: a solid accent-filled `<aside>` at 12px radius and 2rem padding, lifted on the standard sheet shadow. Inside, a `<dl>` of three stacked pairs at a 1rem gap — an uppercase tracked term at 0.75rem/0.08em held at 80% opacity, and a Gabarito 700 value at 1.25rem directly under it (Availability, Working on, Since) — followed by a links footer separated by a 28%-white hairline, carrying the GitHub and LinkedIn icon links. On the panel, links take the contrast colour and answer hover with an underline instead of a colour change, because there is no second colour available on a filled surface. In dark mode the panel's text and links switch to the page ground colour and the divider becomes 30% of the dark ink. Below 1100px it sits full width beneath the name.

### Icon Links
Inline SVG (currentColor, 20px) plus a label in semibold ink, 2.75rem tall, no underline; on the page ground hover turns the pair accent, inside the butter panel it underlines instead.

### Folder Tabs and Panel (signature)
The structural signature. A horizontally scrollable row of tabs sits on the section ground in a low-opacity ink wash, each tab holding the same 2.75rem minimum target as every other control; the selected tab switches to the sheet colour, gains accent text, grows 0.2rem of top padding and throws an upward shadow so it fuses into the panel below. The panel is a white sheet with its top-left corner squared off to complete the folder silhouette. Inside: a near-display panel title, a semibold subtitle, a muted meta line, a body paragraph, a "What I did" label under a hairline rule, a three-column note grid with left-edge dividers, a row of chips, and a fact strip separated by hairlines. Progressive enhancement is part of the component: the markup ships without tab semantics, the tab row is hidden by default and shown only when JavaScript adds `role="tablist"` and the ARIA wiring, and without JavaScript the panels simply stack as separate sheets, each with a full 12px radius.

### Column Notes
Inside a work panel, the paragraph is followed by a short list of three or four plain bullets (the shared `.bullets` style with accent markers, capped at the measure), then the technology chips. No column grid, icons or "What I built" label: the user replaced them with the list on 2026-09-25 to keep the specifics in about a third of the space.

### Project Cards
A two-column grid of compact white sheets at 1.5rem gap, each padded 1.5rem × 2rem: an `h3` title, a muted small meta line, one sentence of description, and a row of small chips. One card is one project — no expansion, no link-out, no image. Collapses to one column at 900px.

### Chips and Status Tokens
- **Chips:** Source Code Pro at 0.8125rem (0.75rem in the small variant) on the butter-raised tint with a hairline border and a 6px radius; inline, wrapping, never interactive.
- **Status tokens:** pill-radius outlines at 0.6875rem monospace with no fill, attached inline to a heading. Three states: core (accent text and border), growing (ink text on the strong hairline), done (muted). They label honesty about depth — never used as a badge or a count.

### About Prose
No boxes, no field rows: two paragraphs and a one-line lead-in on a padded white sheet. No icons, no cards, no strengths list (removed by the user, 2026-09-25). The sheet itself is capped at the measure plus its own padding (`calc(68ch + 2 × 2rem)`) and the prose at the measure, so the card ends where the reading line ends instead of stretching to the 76rem grid. The prose needs no breakpoint of its own.

### Skills Table
Full-width rows on a sheet: a 19rem heading column and a free-flowing list column, divided by hairlines, first row unpadded and last row undivided. Inside a skill group the chip styling is deliberately dropped — items become plain inline text separated by muted commas, so a long skill list reads as a sentence rather than a wall of boxes. Under the list, a small muted "Used in" line links to the projects where the group was used, and groups with training-only items add a "Learning" line, so used and studied are never mixed.

### Timeline
An ordered list with a 2px hairline rail and 1rem accent discs, each ringed by 4px of the current ground (the ring colour follows `.section--alt`). Dates sit above the sheet as an uppercase tracked label; the entry body is a white sheet. Nested engagements inside a body indent behind a left hairline with their own heading, date span, chips, a one-line summary and a "Details in Selected work" link to the matching panel; project detail lives only in the work sheet. Bullet markers are accent-coloured.

### Education & Certifications
The degree first, capped at 62ch, then two columns on the bare page ground, no sheet, each opening with a 2px ink rule, a title with a status token and a bullet list. Only the Education section uses a 2px ink rule as a heading device; the About strengths use a 2px accent rule.

### Contact Sheet
A white sheet split 1 : 1.4 — an intro column with a 1.25rem lead and the two actions, and a list column of label/value rows on hairlines with long URLs allowed to break anywhere. Collapses to one column below 900px.

### Navigation
The sticky header carries the brand in Gabarito 700, six anchors (About, Work, Skills, Experience, Education, Contact) in muted semibold 0.9375rem, the ghost View CV button and the circular theme toggle. The current section is marked by `aria-current="true"` and a 2px accent underline; when JavaScript is present, a single 100px-wide accent indicator is injected and slid under the active link by transform only (220ms), and the static underline is suppressed so the two never double. Below 900px the nav moves to its own row as a horizontally scrollable strip with a right-edge fade mask, and the indicator corrects for the strip's scroll offset.

### Theme Toggle
A 2.75rem circle on the sheet colour with a strong hairline border, holding a sun or moon inline SVG; hover turns border and glyph accent. It ships `hidden` and is revealed by JavaScript, carries `aria-pressed`, and the stored theme is applied by an inline head script before first paint so there is no flash.

### CV Page
The same tokens on a single 48rem sheet: a header block with the name, a muted title line, a small contact line and a bold availability line, then hairline-divided entries with a flex head (role left, dates right) and nested entries indented. Print is a separate stylesheet loaded at `media="print"`: A4 with 16mm/18mm margins, header and toggle and print hint removed, the sheet flattened to plain paper in black on white at 10.5pt, headings ruled and kept with their content, entries protected from breaking, and external links expanded to show their URL after the text — except in the contact line, which already shows readable URLs.

### Motion
One authored entrance, on one element: the work block fades up 14px over 500ms on the shared ease-out curve as it enters, once, and is then unobserved. Two further moments are authored. The hero stack assembles once on load in pure CSS: Cloud, Platform and Services drop 22px into place at 100/260/420ms on an expo ease-out, then the trace draws down and its end dot lands. After it lands, a request dot runs down the trace twice (2.4s each, linear) and each layer's top face lights butter with an accent edge as the dot passes; hovering the drawing replays it in a loop, and hovering a layer or its label lifts that layer 8px (the individual `translate` property, so it composes with the entrance transform) and turns the label accent. It stops after two passes so nothing moves for longer than about five seconds unasked. The experience trace is a scroll-driven animation (`animation-timeline`), used only inside `@supports (animation-timeline: view())`: the rail fills in butter up to the middle of the viewport, and each stop goes from a hollow accent ring to a filled dot (the fill grows from the centre via `background-size`) as the trace reaches it. Keyframes never hold theme colours at rest: a finished or filling animation freezes `var()` in Safari, so the pings are flash-only with no fill-mode and the stops animate size, not colour. Switching theme replays the stack's request pass (js/theme.js). Where it is unsupported the rail stays drawn with every stop lit. The class is added by JavaScript only, so nothing is ever hidden without JS, and the observer is never initialised when reduced motion is requested. Everything else is state feedback: 150ms colour and border transitions, a 220ms nav indicator slide.

Under `prefers-reduced-motion: reduce` the suppression is scoped rather than blanket: smooth scrolling is disabled, the reveal is pinned to its visible end state with no transition, the stack is drawn fully assembled, the trace is not drawn (stops stay lit), and the nav indicator stops sliding — but colour and border transitions are deliberately kept, so a hover or a press still acknowledges itself. A `@media print` rule pins the reveal to its visible state as well, so a printed page never loses the work block.

**The Single Reveal Rule.** One element on the page carries the authored entrance. A page where every section fades is a page with no emphasis; the reveal belongs to the block that holds the proof.

**The Scoped Stillness Rule.** Reduced motion removes movement, not feedback. Switch off transforms, entrances and sliding indicators; leave colour and border transitions alone.

**The Print-Safe State Rule.** Any element that starts hidden or displaced must be pinned to its resolved state under `@media print`. A block that only appears after a scroll event does not exist on paper.

## Do's and Don'ts

### Do:
- **Do** keep the accent on endings — the closing clause, the terminal marker, the selected state — per The Butter Full Stop Rule.
- **Do** let the green fill exactly one object per page, and set everything on it from the accent-contrast token.
- **Do** write every section heading as two clauses with the second in an accent span and a full stop at the end.
- **Do** alternate section tone with `.section--alt` full-bleed, and put new content in the section grid's middle column at the 76rem cap.
- **Do** lift every surface — white or green — on the single sheet shadow (`0 12px 32px rgba(56, 42, 12, 0.14)`), and let the dark theme resolve it to a hairline ring.
- **Do** spend the 8px module: 4rem section padding, 2rem sheet padding, 1.5rem between grouped blocks.
- **Do** collapse every multi-column block at 900px, and size a prose-only sheet to its measure instead of to the grid.
- **Do** draw icons as 2px single-stroke lines beside a real word, hidden from assistive technology.
- **Do** ship every enhancement as an enhancement — tabs, the nav indicator, the reveal and the toggle each have a defined no-JS state, and a defined print and reduced-motion state.
- **Do** give every interactive control a 2.75rem minimum target (buttons, icon links, the toggle, folder tabs).

### Don't:
- **Don't** introduce a second accent hue, a gradient, or a second filled accent surface.
- **Don't** use pure white as a page ground, or a shadow anywhere in dark mode.
- **Don't** raise a surface on hover or add a second elevation level; state is colour and border only.
- **Don't** set body copy, headings, dates or labels in Source Code Pro — chips and status tokens only.
- **Don't** put Sand Border Strong (`#8f8058`) under text; it is a control outline, not a text or divider colour, and it never appears on the butter panel.
- **Don't** add a radius outside 12 / 8 / 6 / 999 (the folder tab's 10px top corners are the one fused exception).
- **Don't** add a fourth authored moment, or any transform-based motion that is not switched off under `prefers-reduced-motion: reduce`.
- **Don't** ship a component whose content only exists once JavaScript runs.
- **Don't** hide content behind a disclosure control that a scanning recruiter would have to open.
- **Don't** add photography, logos, testimonials or metric callouts; this world carries none.
