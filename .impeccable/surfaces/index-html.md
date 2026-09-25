---
version: 1
slug: "index-html"
primary_target: "index.html"
related_targets: ["cv.html"]
---

# Surface brief: index.html (related: cv.html)

Scope: the one-page portfolio (index.html) and its print-first CV page (cv.html). Mode: index.html = Persuade; cv.html = Read, print-first, inherits tokens only.

Audience and job: recruiters and hiring managers deciding within a minute whether to contact Nawres for a remote, part-time backend or cloud role; tech leads reading closer before an interview. Action: email ("Get in touch"), LinkedIn, or the CV page. Proof: Techem WebPortal since Feb 2024, the beyond-role contributions, the Copilot Studio pilot delivered from zero in weeks, AZ-900. Constraints: calm, credible, not salesy, not playful, no overstated seniority, no invented numbers; content facts fixed by the spec; no PDF; no build step; Google Fonts only.

Redesign round 2 (2026-09-23): the user rejected the first redesign as too close to an outside portfolio and asked for a mix of outside ideas resolved into a page of their own, with a deep butter yellow accent. Kept from that round: the two-tone name and section headings, alternating section tones, the vertical timeline, the fade-up reveal, the tabbed featured work in its own section, the "What I did" columns. Own: butter-tinted near-white ground, Gabarito, folder tabs, butter yellow, no photo, no invented metrics.

Memorable moment: the name breaking onto a green second line with a full stop, beside a butter at-a-glance panel where the accent becomes a surface; below the fold a white folder-tabbed work sheet on an alternating warm ground.

Unresolved: none. The portrait was removed at the user's request (2026-09-23).

## Direction contract

THESIS: A calm near-white page where a two-tone name, a facts card and a folder-tabbed work sheet do the talking; resolved into one page with a single butter yellow accent. It refuses the plain document look and any copied layout.

OWN-WORLD: Near-white ground with a butter tint (#fffcf2) alternating with a warmer tone (#f6f2e6) section by section; pure white sheets lifted by a soft offset shadow (hairline ring in dark); espresso ink (#2b2417), warm brown-grey body text; one accent, butter yellow (#7a5a00) on the closing words of the name and every h2, links, the primary button, timeline markers, column icons and the selected folder tab, and as a surface in the hero panel. Dark: #1b170f / #201d17 alt / #332c1e sheets, cream text, light butter accent #f0cf5a with #ffe97a action. Faces: Gabarito 700/800 for display and headings; Source Sans 3 for text; Source Code Pro only in chips and status tokens. Radius 12px sheets, 8px controls, pills 999px. 8px module; content max 76rem.

STORY: The visitor lands on the name (surname in green on its own line), the role in small caps, the statement, View work and Get in touch, and beside it a butter panel: Based in, Working on, Since, Open to, with GitHub and LinkedIn at its foot. Availability is stated there once and again only in Contact. Scrolling: About prose in one column on the warm tone, the work section with folder tabs (the one element that fades up), skills, a vertical timeline, a compact grid of other projects, learning columns, education, and a two-column contact sheet under "Let's build something reliable."

FIRST VIEWPORT: Desktop 1440: header on the page ground, brand left, eight anchors, View CV outline button and toggle right. Two columns 7:5. Left: h1 clamp(3rem, 2rem + 3.6vw, 5rem) tight with the accent span on its own line, role line uppercase tracked, statement 1.25rem, primary + outline buttons. Right: the green at-a-glance panel (accent surface, cream text, three label/value pairs stacked: Availability, Working on, Since; icon links on a hairline footer). Mobile: single column, panel full width.

FORM: Brief-pinned by the user; no concept roll. Signature: the accent as a surface (butter panel) beside a two-tone name, plus the folder-tab work sheet with drawn column icons; the work sheet's fade-up is the one authored motion (500ms, skipped under reduced motion and without JS). Tab ARIA added by JS; the tab row is hidden without JS.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance


Round 3 (2026-09-23, user): header brand is a monogram "NB." so the name is not shown twice; a native mailto contact form at the end; GitHub/LinkedIn open in a new tab; "Download CV" links assets/Nawres_Ben_Rhouma_CV.pdf (generated from cv.html by scripts/build-cv-pdf.sh); the client behind the portal is not named ("T WebPortal"); Consommi Tounsi lives on the CV only; the MaibornWolff Travel App and the current MSR PolyCTRL engagement are work tabs; projects grid holds TravelEase and the 3S IaaS internship.

Round 4 (2026-09-24, user): the "Other things I built" projects grid is removed (nav has seven anchors again); the work sheet block is "What I built" with domain columns (Services / Delivery / Team practice, etc.), a one-line intent and technology → outcome pairs; customer names are never published (T WebPortal, "consumer-goods shared services", "industrial electronics manufacturer"; test-guarded on both pages).

Round 5 (2026-09-25, user): hero gains a claim line under the name; project detail lives only in the work sheet (Experience links to panels); skills show where each group was used, with training-only items on a Learning line; About adds four How I work strengths; Learning merged into Education (six nav anchors). Spec: docs/superpowers/specs/2026-09-25-portfolio-v5-design.md.
