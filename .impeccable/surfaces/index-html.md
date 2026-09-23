---
version: 1
slug: "index-html"
primary_target: "index.html"
related_targets: ["cv.html"]
---

# Surface brief: index.html (related: cv.html)

Scope: the one-page portfolio (index.html) and its print-first CV page (cv.html). Mode: index.html = Persuade (the visitor decides to contact); cv.html = Read (print-first; inherits the world, no expression beyond legibility).

Audience and job: recruiters and hiring managers deciding in about a minute whether to contact Nawres for a remote, part-time backend or cloud role; tech leads reading closer before an interview. Action: open LinkedIn, email, or print the CV. Proof: the Techem WebPortal engagement since Feb 2024, the beyond-role contributions, the Copilot Studio pilot delivered from zero in weeks, AZ-900. Constraints: calm, credible, not salesy, not playful, no overstated seniority, no generic template; content facts fixed by the spec; no PDF; no build step; Google Fonts only.

Memorable moment: the page reads like the reference docs of a well-built service, and the nav's active tab underline slides between sections as the reader scrolls.

Unresolved: the real portrait (placeholder until assets/photo.jpg arrives).

## Direction contract

THESIS: The profile is written like the reference page for a well-designed service: a stable index, precise entries, one link colour, code only where there is code. It refuses both the dark terminal hero with glowing skill cards and the marketing landing page with a kicker over a slogan.

OWN-WORLD: White paper ground and near-black ink; secondary text is blue-grey tinted from the accent, never neutral grey; one link blue on actions, current nav item, and links. Faces: Source Sans 3 for all text, Source Code Pro for technology names only, set as inline code chips on a pale field. Rules are 1px hairlines; entries open with a hairline, not a card. Fields render as label/value rows with small tracked uppercase labels. Radius 6px on controls, 4px on chips; no shadows, no gradients. Dark theme: ink ground, paper text, lighter link blue; same geometry. 8px module; content max 72rem; prose measure 68ch. Recognisable with content removed: a docs page with hairline entries, code chips and one blue.

STORY: A recruiter lands on a title block that reads like a service's reference entry: the name, the role line, the positioning statement, an Availability field, two actions. They understand backend is the core because it is the first entry in Skills and the first engagement in Experience; cloud and AI read as growth because their entries say so. A tech lead scrolls to Techem and finds specific bullets and technology chips. Both act through LinkedIn, email, or the CV page, which prints as a clean two-page reference.

FIRST VIEWPORT: Desktop 1440: a 56px sticky nav with hairline bottom border: brand left, seven section anchors, CV link and theme toggle right. Below, a two-column title block within 72rem: left column (8 of 12) holds the h1 "Nawres Ben Rhouma" at 3rem/700/-0.02em, under it the role line "Software Engineer at MaibornWolff" at 1.25rem in secondary blue-grey, then the positioning statement at 1.25rem ink in a 60ch measure, then a field row "Availability — Based in Tunis · Open to remote, part-time roles", then the primary action LinkedIn (filled blue) and secondary View CV (outlined). Right column (3 of 12, offset 1) holds the portrait at 240×240, 6px radius, hairline border. The About entry begins under a hairline at the fold. Mobile 390: portrait 96×96 beside the h1 row, everything else stacked in one column; nav anchors scroll horizontally in one row under the brand.

FORM: API reference documentation; position 1 on the ordered grounded list; seed key 07853630; chosen as IMPECCABLE'S PICK; code-led (no image generation available). Signature interaction: the active section indicator (2px blue underline) slides between nav anchors as the reader scrolls, 200ms exponential ease-out; heading anchor links appear on hover. Reduced motion: no slide, instant swap.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
