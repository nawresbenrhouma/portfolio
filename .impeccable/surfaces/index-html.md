---
version: 1
slug: "index-html"
primary_target: "index.html"
related_targets: ["cv.html"]
---

# Surface brief: index.html (related: cv.html)

Scope: the one-page portfolio (index.html) and its print-first CV page (cv.html). Mode: index.html = Persuade; cv.html = Read, print-first, inherits tokens only.

Audience and job: recruiters and hiring managers deciding within a minute whether to contact Nawres for a remote, part-time backend or cloud role; tech leads reading closer before an interview. Action: email ("Get in touch"), LinkedIn, or the CV page. Proof: Techem WebPortal since Feb 2024, the beyond-role contributions, the Copilot Studio pilot delivered from zero in weeks, AZ-900. Constraints: calm, credible, not salesy, not playful, no overstated seniority, no invented numbers; content facts fixed by the spec; no PDF; no build step; Google Fonts only.

Redesign (2026-09-23): the user rejected the "API Reference" world as too plain and pinned a reference site (alabenkhalifa.dev/portfolio) as inspiration, with the instruction "same system, own identity" and "butter yellow, same warmth and calm as the reference". The old look is anti-reference. The reference belongs to a MaibornWolff colleague in Tunis, so the palette, display face and details must be recognisably different while the composition system carries over.

Memorable moment: a white "Selected work" sheet floating on a butter ground, one case study at a time behind three tabs, its title set huge in Gabarito.

Unresolved: none.

## Direction contract

THESIS: A calm butter-and-terracotta page where the work sits on a white sheet in the first viewport: one featured engagement, told fully, with two more a tab away. It refuses the plain document look it replaces and the dark terminal template alike.

OWN-WORLD: Butter ground (#fbf3d6) with a deeper butter hero band (#f4e7b8); warm off-white sheets (#fffdf8) lifted by a soft offset shadow (0 12px 32px rgba(56,42,12,.14)) and a 1px warm hairline (#e8dcb6); espresso ink (#2b2417) and warm brown-grey body text (#5b4e35); one accent, terracotta (#c4532b, hover #a4441f), on links, the Get-in-touch button, tab underline and current nav item; espresso as the secondary button. Dark theme: ground #1f1a11, band #262013, sheet #2b251a, cream text #f2e9d3, terracotta lifted to #e8865c. Faces: Gabarito 700/800 for display and headings, tight (-0.03em) at display size; Source Sans 3 for text; Source Code Pro for technology names in chips. Radius 12px on sheets, 8px on controls, 6px on chips. 8px module; content max 76rem. Recognisable with content removed: a butter page, a white sheet with a tab row and a terracotta underline, heavy dark headline.

STORY: The visitor lands on the name and the Techem case study side by side and understands within seconds that this is a working backend engineer with a real production engagement. The tabs show breadth without leaving the fold. Scrolling gives the identity fields, a typed skills table on a sheet, a dated timeline, expandable project notes, learning, education and a contact sheet with the same three actions. Everything ends on "Get in touch".

FIRST VIEWPORT: Desktop 1440: header on the butter band, brand left, seven section anchors, "Get in touch" terracotta button and theme toggle right. Below, a two-column band: left 5 of 12: h1 "Nawres Ben Rhouma" in Gabarito 800 at clamp(2.75rem, 2rem + 2.6vw, 4rem), a 4rem terracotta rule, the positioning statement at 1.25rem, the availability line as a label/value row, the actions "View CV" (espresso) and LinkedIn / GitHub links with drawn SVG icons, then the portrait at 10rem with 12px radius. Right 7 of 12: the "Selected work" sheet, tab row across its top (Techem WebPortal / Copilot Studio pilot / Consommi Tounsi), then inside: the case title at 2.5rem, a subtitle, a role · employer · dates line, one paragraph, a "What I did" three-column breakdown with bold labels and one-line notes, a hairline, and a three-fact strip. Mobile 390: header brand + button + toggle, nav strip beneath; the text column, then the portrait at 6rem beside the statement, then the sheet full width with the tab row scrolling horizontally.

FORM: Reference-portfolio system (tinted page, white sheet, tabbed featured work, date-column timeline), brief-pinned by the user; no concept roll (a user-pinned direction beats the roll). Signature interaction: the tab underline slides between tabs on the sheet (transform only, 220ms, cubic-bezier(0.2,0.8,0.2,1)) and the section nav underline slides as before; reduced motion swaps instantly. Without JavaScript the three panels stack, all visible.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
