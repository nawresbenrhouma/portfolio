# Surface brief: index.html (related: cv.html)

Scope: the one-page portfolio (index.html) and its print-first CV page (cv.html). Mode: index.html = Persuade; cv.html = Read, print-first, inherits tokens only.

Audience and job: recruiters and hiring managers deciding within a minute whether to contact Nawres for a remote, part-time backend or cloud role; tech leads reading closer before an interview. Action: email ("Get in touch"), LinkedIn, or the CV page. Proof: Techem WebPortal since Feb 2024, the beyond-role contributions, the Copilot Studio pilot delivered from zero in weeks, AZ-900. Constraints: calm, credible, not salesy, not playful, no overstated seniority, no invented numbers; content facts fixed by the spec; no PDF; no build step; Google Fonts only.

Redesign round 2 (2026-09-23): the user judged the first redesign "a copy paste from Ala's portfolio" and asked for a mixture of alabenkhalifa.dev/portfolio and wissem-ayed.github.io/Portfolio, with a deep forest green accent chosen over the references' orange and blue. From Wissem: the availability pill, the two-tone name and section headings, the facts card in the hero, alternating section tones, the vertical timeline, the fade-up reveal. From Ala: the tabbed featured work (moved out of the hero into its own section), the "What I did" columns, the fact strip. Own: butter-tinted near-white ground, Gabarito, folder tabs, forest green, no photo, no invented metrics.

Memorable moment: the name in espresso and forest green with a full stop, a facts card beside it, and below the fold a white folder-tabbed work sheet on an alternating warm ground.

Unresolved: none. The portrait was removed at the user's request (2026-09-23).

## Direction contract

THESIS: A calm near-white page where a two-tone name, a facts card and a folder-tabbed work sheet do the talking; the mix of two references resolved into one page with a single forest green accent. It refuses the plain document look and the copy of either reference.

OWN-WORLD: Near-white ground with a butter tint (#fffcf2) alternating with a warmer tone (#f6f2e6) section by section; pure white sheets lifted by a soft offset shadow (hairline ring in dark); espresso ink (#2b2417), warm brown-grey body text; one accent, forest green (#2f6b3a) on the closing words of the name and every h2, links, the primary button, the pill, timeline markers and the selected folder tab. Dark: #1b170f / #201d17 alt / #332c1e sheets, cream text, mint accent #86cf8f with #5fae6c action. Faces: Gabarito 700/800 for display and headings; Source Sans 3 for text; Source Code Pro only in chips and status tokens. Radius 12px sheets, 8px controls, pills 999px. 8px module; content max 76rem.

STORY: The visitor lands on a pill (location and availability), the name with the surname in green, the role in small caps, the statement, View work and Get in touch, and a facts card with Location, Role, Company, Focus, Open to. Scrolling: About (fields | prose) on the warm tone, then the work section with folder tabs, then skills, a vertical timeline, project notes, learning columns, education, and a two-column contact sheet under "Let's build something reliable." Sections fade up once as they enter.

FIRST VIEWPORT: Desktop 1440: header on the page ground, brand left, eight anchors, View CV outline button and toggle right. Two columns 7:5. Left: pill, h1 clamp(3rem, 2rem + 3.6vw, 5rem) tight, role line uppercase tracked, statement 1.25rem, primary + outline buttons, GitHub/LinkedIn icon links. Right: the facts card, five label/value rows, last value in green. Mobile: single column, card full width with labels above values.

FORM: Mixture of the two user-pinned references, brief-pinned by the user; no concept roll. Signature: two-tone name and headings plus the folder-tab work sheet; the section reveal is the one authored motion (500ms fade-up, skipped under reduced motion and without JS). Tab ARIA added by JS; the tab row is hidden without JS.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
