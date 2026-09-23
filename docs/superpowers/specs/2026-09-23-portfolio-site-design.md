# Portfolio Website — Design Spec

Date: 2026-09-23
Owner: Nawres Ben Rhouma
Status: approved with inputs pending (photo, education confirmation)

## 1. Purpose

A personal portfolio website for recruiters and hiring managers. A visitor
should understand within 30 seconds that Nawres is a **Backend Software
Engineer with Java expertise, expanding into Cloud & Platform Engineering and
AI-assisted development**, and then open LinkedIn, send an email, or view the
CV page.

Success criteria:

- Positioning statement is visible in the first viewport on desktop and mobile.
- Every section is reachable from a sticky top navigation in one click.
- Content is faithful to the profile brief. Nothing is inflated; learning
  areas are labelled as learning.
- The CV page prints to at most two A4 pages from the browser's print dialog.
- Site scores well on accessibility and responsive checks (see §8).

## 2. Scope

In scope:

- One long main page (`index.html`) with sticky section navigation.
- One print-ready CV page (`cv.html`).
- Dark / light theme toggle.
- GitHub Pages deployment via GitHub Actions.
- Photo supplied by Nawres, placed in the hero.

Out of scope:

- PDF files of any kind. The CV is an HTML page the visitor prints.
- Blog, German translation, CMS, analytics, contact form, custom domain.
- Any build step or npm runtime dependency.

## 3. Audience and mode

Audience: recruiters and hiring managers scanning quickly, often on mobile.
Content language: English.
Impeccable mode: decided during `impeccable init` (expected Read/Persuade
hybrid: the visitor must understand the profile, then act).

## 4. Content and section order (index.html)

Navigation labels in order: About · Skills · Experience · Projects ·
Learning · Education · Contact. Plus a theme toggle and a "CV" link.

1. **Hero** — name, title "Software Engineer at MaibornWolff", the
   positioning statement above, photo, two calls to action: LinkedIn and
   View CV. Availability line shown here: "Based in Tunis · Open to remote,
   part-time roles". Remote and part-time availability is a primary message
   for the target audience and must be visible in the first viewport.
2. **About** — 3–4 sentences: Java backend core, growth into cloud/platform
   and AI-assisted development, working style (curious, proactive,
   collaborative, pragmatic, MVP-oriented).
3. **Skills** — four groups in this visual order, strongest first:
   1. Backend Engineering: Java, Spring Boot, Quarkus, REST APIs, GraphQL,
      MySQL/SQL, API design, microservice-oriented architecture.
   2. Cloud & Architecture: Microsoft Azure, AKS, Azure Landing Zones,
      Azure networking (Virtual WAN, hub-and-spoke, S2S VPN, Private
      Endpoints/DNS), governance and security.
   3. DevOps / Infrastructure as Code: Docker, Kubernetes, Terraform,
      OpenTofu, Azure Verified Modules, GitLab CI/CD, GitHub Actions, ArgoCD.
   4. AI-Assisted Development: Claude Code, agentic coding, Microsoft
      Copilot Studio, Power Automate, Power Platform.
   Secondary line: Angular, TypeScript (learning), Agile/Scrum/Kanban,
   clean code, documentation, knowledge sharing.
4. **Experience** — timeline. MaibornWolff, Software Engineer, Nov 2022 –
   present, with two nested engagements:
   - Techem WebPortal, Backend Engineer, Feb 2024 – present. Java, Spring
     Boot, GraphQL, Docker, CI/CD. Highlights: backend development and
     maintenance; release testing support; onboarding a backend colleague;
     retrospectives and knowledge-sharing sessions; frontend support when
     needed; Claude Code experiments on legacy repos; co-presented the
     project at a JAT event.
   - Beiersdorf Shared Services, Copilot Studio pilot, Mar 2026 – May 2026.
     Copilot Studio, Power Automate, Power Platform. Highlights: learned a
     new stack quickly; owned documentation and step-by-step guides;
     supported deployments and colleagues.
   Earlier: Dotcom, TravelEase immersion internship, Jul – Aug 2021, Java
   and MySQL.
5. **Projects** — four cards: Techem WebPortal, Beiersdorf Copilot Studio
   pilot, Consommi Tounsi (Spring Boot, Angular, MySQL, Docker, Kubernetes,
   AKS; architecture, backend, frontend, deployment), TravelEase. Each card:
   name, one-line summary, role, tech tags, 2–3 contribution bullets.
6. **Certifications & Learning** — Completed: Microsoft Azure AZ-900,
   Copilot Studio / Power Platform training, Microsoft Agent Academy,
   MaibornWolff Agentic AI training, Agentic Coding School. In progress:
   CKA and CKAD preparation, Terraform/OpenTofu, Azure Landing Zones and
   Verified Modules, Azure networking and governance.
7. **Education** — Master's degree in Cloud Computing, ESPRIT (Tunis),
   graduated 2022. Assumed from the profile brief (ESPRIT academic project,
   MaibornWolff start Nov 2022); Nawres confirms before launch.
8. **Contact** — heading restates availability ("Open to remote, part-time
   opportunities"), then:
   - Email: benrhoumanawres7@gmail.com (mailto link)
   - LinkedIn: https://www.linkedin.com/in/nawres-ben-rhouma21/
   - GitHub: https://github.com/nawresbenrhouma
   - Location: Tunis, Tunisia · remote

Footer: name, year, "Built with plain HTML, CSS and JS."

## 5. CV page (cv.html)

Same facts as §4, condensed into a classic CV layout: header with name,
title, contact line; summary; experience; projects (short); skills;
certifications; education. A small on-screen hint "Print or save as PDF
from your browser" appears above the content and is hidden in print.
`print.css` removes navigation, hint, theme toggle, shadows and colours
that waste ink, sets A4 margins, and prevents page breaks inside entries.

## 6. Architecture

```
portfolio/
  index.html
  cv.html
  css/styles.css     tokens (custom properties), base, layout, components,
                     light and dark themes
  css/print.css      CV print layout, loaded with media="print"
  js/theme.js        theme toggle
  assets/            photo, favicon, social preview image
  .github/workflows/deploy.yml
  README.md
  docs/superpowers/specs/, docs/superpowers/plans/
```

Decisions:

- Content lives directly in HTML. No JSON, no templating, no JS rendering.
  The page is complete without JavaScript.
- All URLs are relative (`css/styles.css`, `#skills`, `cv.html`) so the
  site works at `https://<user>.github.io/portfolio/`.
- Theme: `data-theme="light|dark"` on `<html>`. Default follows
  `prefers-color-scheme`; the toggle overrides and persists to
  `localStorage` in a try/catch. A tiny inline script in `<head>` applies
  the stored theme before first paint to avoid flashing.
- Sticky nav: `position: sticky`, highlights the current section using
  `IntersectionObserver` (progressive enhancement only).
- Fonts: system stack or Google Fonts as impeccable's design pass decides.
  No other external resources.
- Visual tokens, palette, type scale and layout character are decided by
  the impeccable workflow (`init` → PRODUCT.md, then new-work → DESIGN.md,
  then craft-floor before edits). The spec does not pre-decide them.

## 7. Deployment

- Git repo initialised in `portfolio/`, default branch `main`.
- `.github/workflows/deploy.yml` uses `actions/configure-pages`,
  `actions/upload-pages-artifact` (whole repo minus `docs/` is fine) and
  `actions/deploy-pages` on push to `main`.
- Nawres creates the GitHub repo `nawresbenrhouma/portfolio` and
  enables Pages with source "GitHub Actions". The resulting URL is
  `https://nawresbenrhouma.github.io/portfolio/`.

## 8. Verification

- `npx html-validate index.html cv.html` passes.
- Local static server; desktop (1440px) and mobile (390px) screenshots of
  every section, one batched fix round, one confirmation round.
- Impeccable `audit` for accessibility, performance and responsive issues;
  all findings fixed or explicitly accepted.
- Keyboard-only walk through nav, toggle and links.
- Headless Chrome prints `cv.html` to PDF locally as a check only (the file
  is not shipped); result fits two A4 pages.
- Every link resolves; no console errors with JS enabled; page usable with
  JS disabled.

## 9. Open inputs from Nawres

- Photo file: to be placed at `assets/photo.jpg` (or .png). Until it
  arrives, the hero uses a neutral placeholder with the same dimensions
  and the build is not considered launch-ready.
- Confirmation of ESPRIT and 2022 for the Master's degree.
