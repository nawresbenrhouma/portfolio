# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

static HTML/CSS/JS, no build step, GitHub Pages (user decision during brainstorming).

## Users

Primary: recruiters and hiring managers for remote, part-time backend or cloud roles, scanning between other candidates on phone or laptop, deciding within about a minute whether to contact Nawres.

Secondary (confirmed): tech leads who will run the interview and read more closely: they check depth, dates and specifics.

## Product Purpose

A personal portfolio site for Nawres Ben Rhouma with one long main page and a print-ready CV page. Success: within the first screen the visitor understands she is a solid Java backend engineer actively growing into Azure platform work, sees she is based in Tunis and open to remote, part-time roles, and then opens LinkedIn, sends an email, or prints the CV.

## Positioning

Backend Software Engineer with Java expertise, expanding into Cloud & Platform Engineering and AI-assisted development. The differentiator a neighbouring profile cannot copy: three-plus years on one production client project (Techem WebPortal) plus a documented habit of taking on testing, onboarding, documentation, retrospectives and presentations beyond the assigned role, and a fast learning record (Copilot Studio pilot delivered within weeks from zero).

## Operating Context

Visitors arrive from LinkedIn, a CV link, or an application email. Reading happens in short bursts, often on a phone, sometimes in a dim room in the evening, sometimes on an office laptop in daylight. Tech leads may open the page during or before an interview call. The CV page is printed to PDF by the visitor from the browser; no PDF file is shipped.

## Capabilities and Constraints

- Two surfaces: `index.html` (sections: hero, about, skills, experience, projects, certifications & learning, education, contact; sticky section navigation) and `cv.html` (print target).
- Dark/light toggle, persisted per browser; page fully usable without JavaScript.
- Only permitted external resources: Google Fonts. No analytics, no contact form, no PDF files.
- All URLs relative; site lives at https://benrhoumanawres7-ai.github.io/portfolio/.
- Content facts are fixed in the design spec (docs/superpowers/specs/2026-09-23-portfolio-site-design.md). No new claims, employers, dates or skills.
- Language: English. The word "Junior" never appears; the public title is "Software Engineer at MaibornWolff".
- Skills hierarchy is fixed: Backend Engineering → Cloud & Architecture → DevOps / Infrastructure as Code → AI-Assisted Development.
- Open decision: none on product truth; visual world decided in new-work.

## Brand Commitments

- Name: Nawres Ben Rhouma. Title: Software Engineer at MaibornWolff.
- Voice: confident, precise, warm; credible and calm. Not salesy, not playful, not informal, no emoji, no hype words.
- Must not look like a generic developer-portfolio template.
- Must not imply lead, architect or senior scope.
- Photo: a real portrait supplied by Nawres at assets/photo.jpg (pending; placeholder until then).

## Evidence on Hand

- Profile brief with employers, projects, dates, skills, certifications (captured in the spec).
- Portrait photo: pending from Nawres.
- No testimonials, metrics, logos, or client quotes exist; none may be invented. Client names (Techem, Beiersdorf) are factual project references, not endorsements.

## Product Principles

1. Backend first, trajectory visible: every page level shows Java backend as the core and cloud/AI as the direction of growth, in that order.
2. Truthful scope: state what was done, at the level it was done; learning stays labelled as learning.
3. One-minute legibility: a recruiter gets name, role, positioning, availability and a way to act in the first screen; a tech lead finds specifics one scroll further.
4. Calm credibility over spectacle: restraint in motion and tone; craft shows in typography, spacing and detail.
5. Works everywhere: phone, laptop, print, no-JS, dark and light.

## Accessibility & Inclusion

WCAG AA contrast on all text, keyboard-operable navigation and toggle, visible focus, reduced-motion respected, semantic headings and landmarks.
