# Portfolio v5: Claim, Evidence, No Repeats

Date: 2026-09-25. Builds on `2026-09-23-portfolio-site-design.md` and
DESIGN.md ("The Butter Full Stop"). Visual system, colours, fonts, hero
panel, folder tabs, CV page and contact form stay as they are.

## Goal

A recruiter scanning the page should get the pitch in one line, see where each
skill was actually used, and read each project once. Menu goes from 8 to 6
items.

## Out of scope

Dark-only look, background effects, animated or joke stat counters,
inflated seniority tone, extra social links. No new numbers or production
claims. Customer names stay out (existing tests keep enforcing it).

## Changes

### A. Hero claim line

- Order inside `.hero__text`: role eyebrow (`Software Engineer at
  MaibornWolff`, small, muted) → h1 name (unchanged) → **claim**
  `<p class="hero__claim">Backend services that reach production, and the
  platform under them.</p>` (Gabarito, between body and h1 size, ink colour)
  → existing statement line → actions.
- The butter at-a-glance panel is unchanged.

### B. Experience without repeats

- Selected work (tabs) stays the only place with project detail.
- In Experience, each nested engagement keeps title, dates and tags. The
  bullet lists go and are replaced by the engagement's existing one-line
  summary plus a link `Details in Selected work →` pointing to
  `#panel-<id>`.
- The 3S and Dotcom internships aren't in Selected work, so they keep their
  one sentence each.
- Nothing is lost. Every removed bullet already appears in the matching
  panel (release testing, onboarding, retrospectives, frontend cover,
  Claude Code, JAT, documentation, deployments). cv.html keeps its full
  bullets.
- `js/tabs.js`: clicking a link to `#panel-<id>` (or loading with that
  hash) selects the matching tab and scrolls to the work sheet. Without JS,
  the panels are stacked and the anchor just works.

### C. Skills with evidence

- Each skill group gets a `Used in:` line under its chips, with links to the
  panels, as below. Items only in training get a `learning` chip style
  (dashed border plus visually hidden text "(learning)").

| Group | Used in | Learning chips |
|---|---|---|
| Backend Engineering | T WebPortal (Java, Spring Boot, GraphQL, REST, MySQL) · Travel App (Quarkus) · Industrial control platform (Java) | none |
| Cloud & Architecture | T WebPortal (Azure) · Travel App (AKS) | Landing Zones, Virtual WAN & hub-and-spoke, S2S VPN, Private Endpoints & DNS, Governance & security |
| DevOps / IaC | T WebPortal (GitLab CI/CD) · Travel App (Docker, AKS, ArgoCD, GitLab CI/CD) · this site (GitHub Actions) | Terraform, OpenTofu, Azure Verified Modules |
| AI-Assisted Development | T WebPortal (Claude Code) · Copilot Studio pilot (Copilot Studio, Power Automate, Power Platform) | none |

- "Kubernetes" stays a normal chip (AKS on Travel App); CKA/CKAD preparation
  is listed under Education & certifications.
- The Core/Growing badges and the "Also:" line stay.

### D. "How I work" in About

- About keeps paragraphs 1 and 2. Paragraph 3 shrinks to one lead-in
  sentence ("Curious, proactive and pragmatic; I prefer maintainable
  solutions and small, shippable steps.") followed by a four-item list
  `.strengths`, each with a title and one line:
  1. **Release quality**: release testing before major deployments,
     testing alongside the team's testers.
  2. **Onboarding & documentation**: onboarded a backend colleague; owned
     the Copilot Studio pilot's guides.
  3. **Team practice**: hosted retrospectives and knowledge sharing; Scrum
     Master on the Travel App.
  4. **Stepping in**: covered frontend work when needed; productive in a
     new stack within weeks.
- Layout: 2×2 grid on desktop, one column on mobile, plain text with a
  small butter rule above each title. No icons, no cards.

### E. Education & certifications merged

- The `#learning` section is removed. `#education` becomes "Education &
  certifications": the Master's block first, then the two existing lists
  (Completed / In progress) with their status badges, side by side on
  desktop.
- No credential links or dates for now (none provided; don't invent them).
- Nav labels: About · Work · Skills · Experience · Education · Contact.

## Tests and checks

- Update `tests/content.test.js` (`SECTION_IDS` drops `learning`; the learning
  status test moves under `#education`) and `tests/nav.test.js`.
- New tests: hero claim text present; no `<ul class="bullets">` (or
  equivalent) inside Experience's MaibornWolff engagements; each engagement
  links to an existing panel id; each skill group has a `Used in` line
  whose links resolve; `.strengths` has 4 items; learning chips carry
  hidden "(learning)" text; tabs.js selects the tab for a `#panel-` hash
  (unit test in `tests/tabs.test.js`).
- Run `scripts/check.sh`, `scripts/screenshots.sh` (light, dark, mobile)
  and `scripts/print-check.sh`. Contrast for the new claim, the strengths
  rule and the dashed chip must pass the existing computed-contrast test.
- No push until Nawres reviews the screenshots.
