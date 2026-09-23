# Portfolio Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and deploy a one-page static portfolio site plus a print-ready CV page for Nawres Ben Rhouma, aimed at recruiters, hosted on GitHub Pages.

**Architecture:** Two hand-written HTML pages with content directly in the markup, one stylesheet driven by CSS custom properties with light/dark themes, a print stylesheet, and two tiny progressive-enhancement scripts (theme toggle, active-nav highlighting). Visual identity is decided by the impeccable skill (PRODUCT.md, DESIGN.md) before any styling is written. No build step; tests are `node --test` scripts using only Node built-ins plus `npx html-validate` and headless Google Chrome for screenshots and print checks.

**Tech Stack:** HTML5, CSS (custom properties, grid/flex), vanilla JS, Node 24 test runner (`node --test`), `npx html-validate`, Google Chrome headless, GitHub Actions + GitHub Pages, impeccable skill (installed at `~/.claude/skills/impeccable`).

**Spec:** `docs/superpowers/specs/2026-09-23-portfolio-site-design.md`

## Global Constraints

- No build step and no runtime npm dependencies. `npx` may be used for dev-time checks only; there is no `package.json` with dependencies.
- All URLs in HTML/CSS are relative (`css/styles.css`, `#skills`, `cv.html`, `assets/photo.jpg`). Never a leading `/`. Site must work at `https://benrhoumanawres7-ai.github.io/portfolio/`.
- No PDF files are shipped or referenced. The CV is `cv.html`, printed by the visitor.
- Content language is English. The word "Junior" appears nowhere in shipped HTML.
- Public title is exactly "Software Engineer at MaibornWolff". Positioning statement is exactly: "Backend Software Engineer with Java expertise, expanding into Cloud & Platform Engineering and AI-assisted development."
- Availability line in hero is exactly: "Based in Tunis · Open to remote, part-time roles".
- Contact values: email `benrhoumanawres7@gmail.com`, LinkedIn `https://www.linkedin.com/in/nawres-ben-rhouma21/`, GitHub `https://github.com/benrhoumanawres7-ai`, location "Tunis, Tunisia · remote".
- Only permitted external resources: `fonts.googleapis.com` / `fonts.gstatic.com` if DESIGN.md chooses a Google Font. No other external scripts, styles, images or fetches.
- Pages must be complete and readable with JavaScript disabled. JS only enhances (theme toggle, active nav link).
- Commits in this repo use the personal identity `Nawres Ben Rhouma <benrhoumanawres7@gmail.com>` (set in Task 1). Every commit message ends with the line `Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>`.
- Content facts come only from the spec §4 and §5. Do not add claims, employers, dates, or skills not in the spec. Learning items stay under "In progress".
- Skill order in the Skills section is fixed: Backend Engineering, Cloud & Architecture, DevOps / Infrastructure as Code, AI-Assisted Development.

## Review Focus

1. **JavaScript disabled:** every section readable, nav anchors jump to sections, theme follows the system preference via CSS `prefers-color-scheme` alone, the toggle button is hidden. Pinned in Task 5 (CSS default theme test) and Task 6 (no-JS nav test).
2. **`localStorage` throws** (Safari private mode, blocked site data): theme still resolves from the system preference and the toggle still works for the session. Pinned in Task 5 test `resolveTheme falls back when storage throws`.
3. **320px-wide viewport:** no horizontal scrolling, nav collapses without overlapping the toggle, project cards stack. Pinned in Task 9 screenshot at 320px and the `scrollWidth <= innerWidth` check.
4. **`prefers-reduced-motion: reduce`:** no smooth scrolling and no transitions/animations. Pinned in Task 5 test `styles.css contains a reduced-motion block that disables transitions and smooth scroll`.
5. **Printing the CV:** no page break inside an entry, external links show their URL after the link text, nav/toggle/hint hidden, output is at most two A4 pages. Pinned in Task 7 print test using Chrome `--print-to-pdf` and `mdls` page count.

---

## File Structure

```
portfolio/
  .gitignore                     ignores .qa/, .DS_Store, node_modules/
  .nojekyll                      GitHub Pages: serve files as-is
  .htmlvalidate.json             html-validate config (recommended preset)
  README.md                      what this is, how to run checks, how to deploy
  index.html                     main page, all content inline
  cv.html                        print-ready CV
  css/styles.css                 tokens + themes + layout + components
  css/print.css                  CV print rules (media="print")
  js/theme.js                    theme toggle; CommonJS export for tests
  js/nav.js                      active section highlighting
  assets/photo-placeholder.svg   neutral placeholder until photo arrives
  assets/photo.jpg               real photo (supplied by Nawres, Task 10)
  assets/favicon.svg
  assets/og.html + assets/og.png social preview source and rendered image
  scripts/check.sh               runs all checks
  scripts/screenshots.sh         desktop/mobile/320 screenshots into .qa/
  scripts/print-check.sh         prints cv.html to .qa/cv.pdf, reports pages
  tests/helpers.js               read files, extract ids/hrefs
  tests/content.test.js          content facts and constraints
  tests/links.test.js            every relative href/src/anchor resolves
  tests/theme.test.js            theme.js logic with stubs
  tests/nav.test.js              nav.js logic with stubs
  tests/css.test.js              token/theme/reduced-motion rules present
  .github/workflows/deploy.yml   GitHub Pages deploy
  PRODUCT.md, DESIGN.md          written by impeccable in Task 4
  docs/superpowers/specs/, docs/superpowers/plans/
```

Responsibilities: `index.html` and `cv.html` own content; `styles.css` owns all visual decisions for screens; `print.css` owns paper; each JS file owns one behaviour; `tests/` own verification; `scripts/` own manual QA commands.

---

### Task 1: Repository scaffold and check harness

**Files:**
- Create: `.gitignore`, `.nojekyll`, `.htmlvalidate.json`, `README.md`, `scripts/check.sh`, `tests/helpers.js`, `tests/links.test.js`, `assets/photo-placeholder.svg`
- Modify: repo git config (local user.email)

**Interfaces:**
- Produces: `tests/helpers.js` exporting `readHtml(name)`, `extractIds(html)`, `extractLinks(html)` used by Tasks 2, 3, 6. `scripts/check.sh` used by every later task's verify step.

- [ ] **Step 1: Set the repo-local git identity and confirm it**

```bash
git config user.name "Nawres Ben Rhouma"
git config user.email "benrhoumanawres7@gmail.com"
git config user.email
```
Expected output: `benrhoumanawres7@gmail.com`

- [ ] **Step 2: Create ignore files and validator config**

`.gitignore`:
```
.DS_Store
.qa/
node_modules/
```

`.nojekyll`: empty file (`touch .nojekyll`).

`.htmlvalidate.json`:
```json
{
  "extends": ["html-validate:recommended"],
  "rules": {
    "no-inline-style": "off",
    "require-sri": "off"
  }
}
```

- [ ] **Step 3: Write the test helpers**

`tests/helpers.js`:
```js
const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.resolve(__dirname, '..');

function readFile(rel) {
  return fs.readFileSync(path.join(ROOT, rel), 'utf8');
}

function readHtml(name) {
  return readFile(name);
}

function extractIds(html) {
  return [...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]);
}

// Returns [{attr:'href'|'src', value}] for every href/src in the markup.
function extractLinks(html) {
  return [...html.matchAll(/\s(href|src)="([^"]*)"/g)].map((m) => ({ attr: m[1], value: m[2] }));
}

function fileExists(rel) {
  return fs.existsSync(path.join(ROOT, rel));
}

module.exports = { ROOT, readFile, readHtml, extractIds, extractLinks, fileExists };
```

- [ ] **Step 4: Write the failing link test**

`tests/links.test.js`:
```js
const test = require('node:test');
const assert = require('node:assert/strict');
const { readHtml, extractIds, extractLinks, fileExists } = require('./helpers');

const PAGES = ['index.html', 'cv.html'];

for (const page of PAGES) {
  test(`${page}: every relative link and anchor resolves`, () => {
    const html = readHtml(page);
    const ownIds = new Set(extractIds(html));
    for (const { value } of extractLinks(html)) {
      if (value === '' || value.startsWith('mailto:') || value.startsWith('data:')) continue;
      if (/^https?:\/\//.test(value)) continue;
      assert.ok(!value.startsWith('/'), `${page}: root-relative URL not allowed: ${value}`);
      const [file, hash] = value.split('#');
      if (file) {
        assert.ok(fileExists(file), `${page}: missing file ${file}`);
      }
      if (hash !== undefined) {
        const targetIds = file ? new Set(extractIds(readHtml(file))) : ownIds;
        assert.ok(targetIds.has(hash), `${page}: missing anchor #${hash} in ${file || page}`);
      }
    }
  });
}
```

- [ ] **Step 5: Run the test to verify it fails**

Run: `node --test tests/`
Expected: FAIL, both tests error with `ENOENT ... index.html` (pages do not exist yet).

- [ ] **Step 6: Create the placeholder photo**

`assets/photo-placeholder.svg`:
```svg
<svg xmlns="http://www.w3.org/2000/svg" width="480" height="480" viewBox="0 0 480 480" role="img" aria-label="Portrait placeholder">
  <rect width="480" height="480" fill="#d9d9d9"/>
  <circle cx="240" cy="190" r="80" fill="#a8a8a8"/>
  <path d="M90 430c20-90 90-130 150-130s130 40 150 130z" fill="#a8a8a8"/>
</svg>
```

- [ ] **Step 7: Write the check script and README**

`scripts/check.sh`:
```bash
#!/usr/bin/env bash
# Runs every automated check. Exit code is non-zero on any failure.
set -euo pipefail
cd "$(dirname "$0")/.."
echo "== node tests =="
node --test tests/
echo "== html-validate =="
npx --yes html-validate index.html cv.html
echo "== all checks passed =="
```
Then `chmod +x scripts/check.sh`.

`README.md`:
```markdown
# Nawres Ben Rhouma — Portfolio

Static portfolio site: `index.html` (main page) and `cv.html` (print-ready CV).
No build step. Plain HTML, CSS and JavaScript.

## Run locally

    python3 -m http.server 8080
    # open http://localhost:8080/

## Checks

    scripts/check.sh          # node tests + html-validate
    scripts/screenshots.sh    # desktop / mobile / 320px screenshots into .qa/
    scripts/print-check.sh    # prints cv.html to .qa/cv.pdf and reports page count

## Deploy

Pushing to `main` runs `.github/workflows/deploy.yml`, which publishes the
repo to GitHub Pages at https://benrhoumanawres7-ai.github.io/portfolio/.
In the repo settings, Pages → Source must be "GitHub Actions".

## Design context

`PRODUCT.md` and `DESIGN.md` are maintained by the impeccable skill and
describe the product intent and the visual system. Read them before changing
the look.
```

- [ ] **Step 8: Commit**

```bash
git add .gitignore .nojekyll .htmlvalidate.json README.md scripts/check.sh tests/helpers.js tests/links.test.js assets/photo-placeholder.svg
git commit -m "Scaffold repo, check harness and link test

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

---

### Task 2: Main page content (index.html, unstyled)

**Files:**
- Create: `index.html`, `tests/content.test.js`

**Interfaces:**
- Produces: section ids `about`, `skills`, `experience`, `projects`, `learning`, `education`, `contact`; `<nav class="site-nav" aria-label="Sections">` with `a.site-nav__link[href="#…"]`; `<button data-theme-toggle hidden>`; `<html lang="en" data-theme="light">`; stylesheet link `css/styles.css`; scripts `js/theme.js` and `js/nav.js` with `defer`. Tasks 5 and 6 rely on these hooks exactly.

- [ ] **Step 1: Write the failing content test**

`tests/content.test.js`:
```js
const test = require('node:test');
const assert = require('node:assert/strict');
const { readHtml } = require('./helpers');

const REQUIRED_INDEX = [
  'Nawres Ben Rhouma',
  'Software Engineer at MaibornWolff',
  'Backend Software Engineer with Java expertise, expanding into Cloud &amp; Platform Engineering and AI-assisted development.',
  'Based in Tunis · Open to remote, part-time roles',
  'mailto:benrhoumanawres7@gmail.com',
  'https://www.linkedin.com/in/nawres-ben-rhouma21/',
  'https://github.com/benrhoumanawres7-ai',
  'Tunis, Tunisia · remote',
  'Techem WebPortal',
  'Beiersdorf',
  'Consommi Tounsi',
  'TravelEase',
  'AZ-900',
  'ESPRIT',
  'Master',
];

const SECTION_IDS = ['about', 'skills', 'experience', 'projects', 'learning', 'education', 'contact'];

for (const page of ['index.html', 'cv.html']) {
  test(`${page}: forbidden content absent`, () => {
    const html = readHtml(page);
    assert.doesNotMatch(html, /junior/i, 'the word Junior must not appear');
    assert.doesNotMatch(html, /\.pdf\b/i, 'no PDF references');
    assert.doesNotMatch(html, /\s(href|src)="\/(?!\/)/, 'no root-relative URLs');
    // Only loaded resources count: scripts, stylesheets and preconnects. Canonical / Open Graph URLs are metadata.
    const external = [...html.matchAll(/<(?:script[^>]*\ssrc|link[^>]*rel="(?:stylesheet|preconnect)"[^>]*\shref)="(https?:[^"]+)"/g)].map((m) => m[1]);
    for (const url of external) {
      assert.match(url, /^https:\/\/fonts\.g(oogleapis|static)\.com\//, `unexpected external resource ${url}`);
    }
    assert.match(html, /<html lang="en"/);
  });
}

test('index.html: required facts present', () => {
  const html = readHtml('index.html');
  for (const s of REQUIRED_INDEX) assert.ok(html.includes(s), `missing: ${s}`);
});

test('index.html: sections and nav links exist in order', () => {
  const html = readHtml('index.html');
  let last = -1;
  for (const id of SECTION_IDS) {
    const pos = html.indexOf(`<section id="${id}"`);
    assert.ok(pos > last, `section #${id} missing or out of order`);
    last = pos;
    assert.ok(html.includes(`class="site-nav__link" href="#${id}"`), `nav link to #${id} missing`);
  }
});

test('index.html: skill groups in the required order', () => {
  const html = readHtml('index.html');
  const groups = ['Backend Engineering', 'Cloud &amp; Architecture', 'DevOps / Infrastructure as Code', 'AI-Assisted Development'];
  let last = -1;
  for (const g of groups) {
    const pos = html.indexOf(`<h3>${g}</h3>`);
    assert.ok(pos > last, `skill group "${g}" missing or out of order`);
    last = pos;
  }
});

test('index.html: enhancement hooks present', () => {
  const html = readHtml('index.html');
  assert.match(html, /<button[^>]*data-theme-toggle[^>]*hidden/);
  assert.match(html, /<script src="js\/theme\.js" defer><\/script>/);
  assert.match(html, /<script src="js\/nav\.js" defer><\/script>/);
  assert.match(html, /<link rel="stylesheet" href="css\/styles\.css">/);
  assert.match(html, /<img[^>]*class="hero__photo"[^>]*alt="Portrait of Nawres Ben Rhouma"/);
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `node --test tests/content.test.js`
Expected: FAIL with `ENOENT` for index.html.

- [ ] **Step 3: Write index.html**

`index.html` (complete content; class names are the hooks Task 5 styles):
```html
<!doctype html>
<html lang="en" data-theme="light">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <title>Nawres Ben Rhouma · Backend Software Engineer</title>
  <meta name="description" content="Backend Software Engineer with Java expertise, expanding into Cloud & Platform Engineering and AI-assisted development. Based in Tunis, open to remote, part-time roles.">
  <meta name="color-scheme" content="light dark">
  <link rel="icon" href="assets/favicon.svg" type="image/svg+xml">
  <link rel="stylesheet" href="css/styles.css">
  <script>
    (function () {
      try {
        var t = localStorage.getItem('theme');
        if (t !== 'dark' && t !== 'light') {
          t = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        }
        document.documentElement.setAttribute('data-theme', t);
      } catch (e) { /* keep the default attribute */ }
    })();
  </script>
</head>
<body>
  <a class="skip-link" href="#about">Skip to content</a>

  <header class="site-header">
    <a class="site-header__brand" href="#top">Nawres Ben Rhouma</a>
    <nav class="site-nav" aria-label="Sections">
      <ul class="site-nav__list">
        <li><a class="site-nav__link" href="#about">About</a></li>
        <li><a class="site-nav__link" href="#skills">Skills</a></li>
        <li><a class="site-nav__link" href="#experience">Experience</a></li>
        <li><a class="site-nav__link" href="#projects">Projects</a></li>
        <li><a class="site-nav__link" href="#learning">Learning</a></li>
        <li><a class="site-nav__link" href="#education">Education</a></li>
        <li><a class="site-nav__link" href="#contact">Contact</a></li>
      </ul>
    </nav>
    <div class="site-header__actions">
      <a class="button button--ghost" href="cv.html">CV</a>
      <button class="theme-toggle" type="button" data-theme-toggle hidden aria-pressed="false" aria-label="Switch to dark theme">
        <span class="theme-toggle__icon" aria-hidden="true"></span>
      </button>
    </div>
  </header>

  <main id="top">
    <section class="hero" aria-labelledby="hero-title">
      <div class="hero__text">
        <p class="hero__eyebrow">Software Engineer at MaibornWolff</p>
        <h1 id="hero-title">Nawres Ben Rhouma</h1>
        <p class="hero__statement">Backend Software Engineer with Java expertise, expanding into Cloud &amp; Platform Engineering and AI-assisted development.</p>
        <p class="hero__availability">Based in Tunis · Open to remote, part-time roles</p>
        <div class="hero__actions">
          <a class="button button--primary" href="https://www.linkedin.com/in/nawres-ben-rhouma21/" rel="me noopener">LinkedIn</a>
          <a class="button button--secondary" href="cv.html">View CV</a>
        </div>
      </div>
      <img class="hero__photo" src="assets/photo-placeholder.svg" width="480" height="480" alt="Portrait of Nawres Ben Rhouma">
    </section>

    <section id="about" class="section" aria-labelledby="about-title">
      <h2 id="about-title">About</h2>
      <p>I build backend services in Java: Spring Boot and Quarkus, REST and GraphQL APIs, relational data models, and the CI/CD and container setup that gets them into production. Since November 2022 I have worked at MaibornWolff, mostly on the Techem WebPortal within an agile, cross-functional team.</p>
      <p>From that backend core I keep widening the circle: Azure platform engineering, Infrastructure as Code with Terraform and OpenTofu, Kubernetes, and AI-assisted development with tools like Claude Code and Microsoft Copilot Studio.</p>
      <p>I am curious, proactive and pragmatic. I volunteer for testing, onboarding, documentation and knowledge sharing, prefer maintainable solutions over clever ones, and like breaking big problems into small, shippable steps.</p>
    </section>

    <section id="skills" class="section" aria-labelledby="skills-title">
      <h2 id="skills-title">Skills</h2>
      <div class="skill-groups">
        <article class="skill-group skill-group--primary">
          <h3>Backend Engineering</h3>
          <p class="skill-group__lead">Core expertise</p>
          <ul class="tags">
            <li>Java</li><li>Spring Boot</li><li>Quarkus</li><li>REST APIs</li><li>GraphQL</li><li>MySQL / SQL</li><li>API design</li><li>Microservice-oriented architecture</li>
          </ul>
        </article>
        <article class="skill-group">
          <h3>Cloud &amp; Architecture</h3>
          <p class="skill-group__lead">Growing focus</p>
          <ul class="tags">
            <li>Microsoft Azure</li><li>Azure Kubernetes Service</li><li>Azure Landing Zones</li><li>Virtual WAN &amp; hub-and-spoke</li><li>Site-to-Site VPN</li><li>Private Endpoints &amp; Private DNS</li><li>Governance &amp; security</li>
          </ul>
        </article>
        <article class="skill-group">
          <h3>DevOps / Infrastructure as Code</h3>
          <p class="skill-group__lead">Daily tooling</p>
          <ul class="tags">
            <li>Docker</li><li>Kubernetes</li><li>Terraform</li><li>OpenTofu</li><li>Azure Verified Modules</li><li>GitLab CI/CD</li><li>GitHub Actions</li><li>ArgoCD</li>
          </ul>
        </article>
        <article class="skill-group">
          <h3>AI-Assisted Development</h3>
          <p class="skill-group__lead">Modern workflow</p>
          <ul class="tags">
            <li>Claude Code</li><li>Agentic coding</li><li>Microsoft Copilot Studio</li><li>Power Automate</li><li>Power Platform</li>
          </ul>
        </article>
      </div>
      <p class="skills__secondary"><strong>Also:</strong> Angular, TypeScript (learning), Agile / Scrum / Kanban, clean code, documentation, knowledge sharing.</p>
    </section>

    <section id="experience" class="section" aria-labelledby="experience-title">
      <h2 id="experience-title">Experience</h2>
      <ol class="timeline">
        <li class="timeline__item">
          <div class="timeline__meta">
            <span class="timeline__dates">Nov 2022 – present</span>
          </div>
          <div class="timeline__body">
            <h3>Software Engineer · MaibornWolff</h3>
            <p>Joined after completing a Master's in Cloud Computing. Grew from a backend-focused role into cloud, DevOps, AI-assisted development and platform engineering across several client projects.</p>

            <article class="engagement">
              <h4>Techem WebPortal · Backend Engineer <span class="engagement__dates">Feb 2024 – present</span></h4>
              <ul class="tags tags--small">
                <li>Java</li><li>Spring Boot</li><li>GraphQL</li><li>Docker</li><li>CI/CD</li>
              </ul>
              <ul class="bullets">
                <li>Backend development and maintenance in an agile, cross-functional team.</li>
                <li>Supported release testing before major production deployments and volunteered to test features alongside the team's testers.</li>
                <li>Onboarded a new backend colleague, explaining the project infrastructure and context.</li>
                <li>Hosted retrospectives and knowledge-sharing sessions; supported the Product Owner with Scrum meetings when needed.</li>
                <li>Took over frontend tasks when the frontend colleagues were overloaded.</li>
                <li>Experimented with Claude Code to improve readability and quality in older repositories.</li>
                <li>Co-presented the project at a JAT event, well received by MaibornWolff and Techem leadership.</li>
              </ul>
            </article>

            <article class="engagement">
              <h4>Beiersdorf Shared Services · Copilot Studio pilot <span class="engagement__dates">Mar 2026 – May 2026</span></h4>
              <ul class="tags tags--small">
                <li>Microsoft Copilot Studio</li><li>Power Automate</li><li>Power Platform</li>
              </ul>
              <ul class="bullets">
                <li>Joined full-time without prior hands-on experience in the stack; completed training and became productive within a short timeframe.</li>
                <li>Took ownership of the documentation process: step-by-step guides, version comparisons, maintainability.</li>
                <li>Supported deployments and joined colleagues' meetings to help them deliver.</li>
              </ul>
            </article>
          </div>
        </li>
        <li class="timeline__item">
          <div class="timeline__meta">
            <span class="timeline__dates">Jul 2021 – Aug 2021</span>
          </div>
          <div class="timeline__body">
            <h3>Immersion Intern · Dotcom</h3>
            <p>Contributed to TravelEase, a transportation application for transfers between traveller destinations, developing key features in Java with MySQL.</p>
          </div>
        </li>
      </ol>
    </section>

    <section id="projects" class="section" aria-labelledby="projects-title">
      <h2 id="projects-title">Projects</h2>
      <div class="cards">
        <article class="card">
          <h3>Techem WebPortal</h3>
          <p class="card__role">Backend Engineer · MaibornWolff, 2024 – present</p>
          <p>Customer web portal for Techem, developed by an agile, cross-functional team.</p>
          <ul class="tags tags--small"><li>Java</li><li>Spring Boot</li><li>GraphQL</li><li>Docker</li><li>CI/CD</li></ul>
          <ul class="bullets">
            <li>Backend features and maintenance.</li>
            <li>Release testing, onboarding and knowledge sharing beyond the core role.</li>
            <li>Presented the project at a JAT event.</li>
          </ul>
        </article>
        <article class="card">
          <h3>Copilot Studio Pilot</h3>
          <p class="card__role">Engineer · Beiersdorf Shared Services, 2026</p>
          <p>Pilot of Microsoft Copilot Studio and Power Platform for AI workflow automation.</p>
          <ul class="tags tags--small"><li>Copilot Studio</li><li>Power Automate</li><li>Power Platform</li></ul>
          <ul class="bullets">
            <li>Learned the stack from scratch and delivered within weeks.</li>
            <li>Owned the documentation and step-by-step guides.</li>
            <li>Supported deployments for the team.</li>
          </ul>
        </article>
        <article class="card">
          <h3>Consommi Tounsi</h3>
          <p class="card__role">Architecture, backend, frontend, deployment · ESPRIT academic project</p>
          <p>E-commerce platform to support local commerce in Tunisia by showcasing Tunisian projects and businesses.</p>
          <ul class="tags tags--small"><li>Spring Boot</li><li>Angular</li><li>MySQL</li><li>Docker</li><li>Kubernetes</li><li>AKS</li></ul>
          <ul class="bullets">
            <li>Designed the application architecture.</li>
            <li>Implemented backend and frontend features.</li>
            <li>Containerised and deployed to Azure Kubernetes Service.</li>
          </ul>
        </article>
        <article class="card">
          <h3>TravelEase</h3>
          <p class="card__role">Developer · Dotcom internship, 2021</p>
          <p>Transportation application that facilitates transfers between destinations for travellers.</p>
          <ul class="tags tags--small"><li>Java</li><li>MySQL</li></ul>
          <ul class="bullets">
            <li>Developed key application features.</li>
            <li>First professional Java backend experience.</li>
          </ul>
        </article>
      </div>
    </section>

    <section id="learning" class="section" aria-labelledby="learning-title">
      <h2 id="learning-title">Certifications &amp; Learning</h2>
      <div class="learning">
        <div class="learning__column">
          <h3>Completed</h3>
          <ul class="bullets">
            <li>Microsoft Azure Fundamentals (AZ-900)</li>
            <li>Microsoft Copilot Studio &amp; Power Platform training</li>
            <li>Microsoft Agent Academy</li>
            <li>MaibornWolff Agentic AI training</li>
            <li>Agentic Coding School</li>
          </ul>
        </div>
        <div class="learning__column">
          <h3>In progress</h3>
          <ul class="bullets">
            <li>CKA and CKAD preparation</li>
            <li>Terraform / OpenTofu</li>
            <li>Azure Landing Zones and Azure Verified Modules</li>
            <li>Azure networking, governance and security</li>
          </ul>
        </div>
      </div>
    </section>

    <section id="education" class="section" aria-labelledby="education-title">
      <h2 id="education-title">Education</h2>
      <p><strong>Master's degree in Cloud Computing</strong> · ESPRIT, Tunis · 2022</p>
      <p>Foundations in software engineering, cloud computing, distributed systems, databases, containerisation, deployment and modern software architecture.</p>
    </section>

    <section id="contact" class="section" aria-labelledby="contact-title">
      <h2 id="contact-title">Contact</h2>
      <p class="contact__lead">Open to remote, part-time opportunities.</p>
      <ul class="contact__list">
        <li><span class="contact__label">Email</span> <a href="mailto:benrhoumanawres7@gmail.com">benrhoumanawres7@gmail.com</a></li>
        <li><span class="contact__label">LinkedIn</span> <a href="https://www.linkedin.com/in/nawres-ben-rhouma21/" rel="me noopener">linkedin.com/in/nawres-ben-rhouma21</a></li>
        <li><span class="contact__label">GitHub</span> <a href="https://github.com/benrhoumanawres7-ai" rel="me noopener">github.com/benrhoumanawres7-ai</a></li>
        <li><span class="contact__label">Location</span> Tunis, Tunisia · remote</li>
      </ul>
    </section>
  </main>

  <footer class="site-footer">
    <p>© 2026 Nawres Ben Rhouma · Built with plain HTML, CSS and JS.</p>
  </footer>

  <script src="js/theme.js" defer></script>
  <script src="js/nav.js" defer></script>
</body>
</html>
```

- [ ] **Step 4: Create a temporary favicon so the link test passes**

`assets/favicon.svg` (Task 8 may restyle it per DESIGN.md):
```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="12" fill="#1f2937"/><text x="32" y="42" text-anchor="middle" font-family="system-ui, sans-serif" font-size="28" font-weight="700" fill="#ffffff">NB</text></svg>
```

- [ ] **Step 5: Run content and link tests**

Run: `node --test tests/content.test.js tests/links.test.js`
Expected: index tests PASS; the two `cv.html` tests FAIL with ENOENT (Task 3 fixes that). Also the links test will fail on `css/styles.css`, `js/theme.js`, `js/nav.js` not existing. Create empty stand-ins now so the harness is green between tasks:

```bash
mkdir -p css js
printf '/* filled in Task 5 */\n' > css/styles.css
printf '// filled in Task 5\n' > js/theme.js
printf '// filled in Task 6\n' > js/nav.js
```
Re-run: only the `cv.html` tests fail.

- [ ] **Step 6: Validate the markup**

Run: `npx --yes html-validate index.html`
Expected: no errors. Fix any reported issue in the markup (not by disabling rules).

- [ ] **Step 7: Commit**

```bash
git add index.html tests/content.test.js assets/favicon.svg css/styles.css js/theme.js js/nav.js
git commit -m "Add main page content and content tests

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

---

### Task 3: CV page content (cv.html, unstyled)

**Files:**
- Create: `cv.html`
- Modify: `tests/content.test.js` (add cv.html fact test)

**Interfaces:**
- Produces: `<body class="cv">`, `<p class="print-hint">`, `<main class="cv__main">`, `article.cv-entry` items; `css/print.css` linked with `media="print"` (file created in Task 7, stub now).

- [ ] **Step 1: Add the failing cv.html test**

Append to `tests/content.test.js`:
```js
test('cv.html: required facts and structure present', () => {
  const html = readHtml('cv.html');
  for (const s of [
    'Nawres Ben Rhouma',
    'Software Engineer at MaibornWolff',
    'benrhoumanawres7@gmail.com',
    'linkedin.com/in/nawres-ben-rhouma21',
    'github.com/benrhoumanawres7-ai',
    'Tunis, Tunisia · remote',
    'Open to remote, part-time roles',
    'Techem WebPortal',
    'Beiersdorf',
    'Consommi Tounsi',
    'TravelEase',
    'AZ-900',
    'ESPRIT',
  ]) assert.ok(html.includes(s), `missing: ${s}`);
  assert.match(html, /<link rel="stylesheet" href="css\/print\.css" media="print">/);
  assert.match(html, /<p class="print-hint">/);
  assert.ok((html.match(/class="cv-entry"/g) || []).length >= 5, 'at least five cv-entry articles');
  assert.match(html, /<a class="button button--ghost" href="index\.html">/);
});
```

- [ ] **Step 2: Run to verify it fails**

Run: `node --test tests/content.test.js`
Expected: cv tests FAIL with ENOENT.

- [ ] **Step 3: Write cv.html and the print.css stub**

`cv.html`:
```html
<!doctype html>
<html lang="en" data-theme="light">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <title>CV · Nawres Ben Rhouma</title>
  <meta name="description" content="CV of Nawres Ben Rhouma, Backend Software Engineer (Java, Spring Boot, Quarkus) expanding into Azure platform engineering and AI-assisted development.">
  <meta name="robots" content="noindex">
  <meta name="color-scheme" content="light dark">
  <link rel="icon" href="assets/favicon.svg" type="image/svg+xml">
  <link rel="stylesheet" href="css/styles.css">
  <link rel="stylesheet" href="css/print.css" media="print">
  <script>
    (function () {
      try {
        var t = localStorage.getItem('theme');
        if (t !== 'dark' && t !== 'light') {
          t = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        }
        document.documentElement.setAttribute('data-theme', t);
      } catch (e) { /* keep the default attribute */ }
    })();
  </script>
</head>
<body class="cv">
  <header class="site-header site-header--cv">
    <a class="button button--ghost" href="index.html">← Portfolio</a>
    <button class="theme-toggle" type="button" data-theme-toggle hidden aria-pressed="false" aria-label="Switch to dark theme">
      <span class="theme-toggle__icon" aria-hidden="true"></span>
    </button>
  </header>

  <p class="print-hint">Print this page or choose “Save as PDF” in your browser's print dialog.</p>

  <main class="cv__main">
    <header class="cv__header">
      <h1>Nawres Ben Rhouma</h1>
      <p class="cv__title">Software Engineer at MaibornWolff · Backend Engineering, Cloud &amp; Platform, AI-assisted development</p>
      <p class="cv__contact">
        <a href="mailto:benrhoumanawres7@gmail.com">benrhoumanawres7@gmail.com</a> ·
        <a href="https://www.linkedin.com/in/nawres-ben-rhouma21/">linkedin.com/in/nawres-ben-rhouma21</a> ·
        <a href="https://github.com/benrhoumanawres7-ai">github.com/benrhoumanawres7-ai</a> ·
        Tunis, Tunisia · remote
      </p>
      <p class="cv__availability">Open to remote, part-time roles</p>
    </header>

    <section class="cv-section" aria-labelledby="cv-summary">
      <h2 id="cv-summary">Summary</h2>
      <p>Backend Software Engineer with Java expertise (Spring Boot, Quarkus, REST, GraphQL, SQL), expanding into Azure platform engineering, Infrastructure as Code and AI-assisted development. Three-plus years at MaibornWolff on client projects in agile, cross-functional teams. Known for taking on testing, onboarding, documentation and knowledge sharing beyond the core role.</p>
    </section>

    <section class="cv-section" aria-labelledby="cv-experience">
      <h2 id="cv-experience">Experience</h2>

      <article class="cv-entry">
        <header class="cv-entry__head">
          <h3>Software Engineer · MaibornWolff</h3>
          <span class="cv-entry__dates">Nov 2022 – present</span>
        </header>
        <p>Backend development with Java, Spring Boot and Quarkus; REST and GraphQL APIs; SQL; Docker, Kubernetes and CI/CD; Azure and Infrastructure as Code; AI-assisted development.</p>
      </article>

      <article class="cv-entry cv-entry--nested">
        <header class="cv-entry__head">
          <h3>Techem WebPortal · Backend Engineer</h3>
          <span class="cv-entry__dates">Feb 2024 – present</span>
        </header>
        <p class="cv-entry__tech">Java · Spring Boot · GraphQL · Docker · CI/CD</p>
        <ul>
          <li>Backend development and maintenance in an agile, cross-functional team.</li>
          <li>Supported release testing before production deployments; onboarded a new backend colleague.</li>
          <li>Hosted retrospectives and knowledge-sharing sessions; supported the Product Owner with Scrum meetings.</li>
          <li>Covered frontend tasks when needed; applied Claude Code to improve readability in older repositories.</li>
          <li>Co-presented the project at a JAT event.</li>
        </ul>
      </article>

      <article class="cv-entry cv-entry--nested">
        <header class="cv-entry__head">
          <h3>Beiersdorf Shared Services · Copilot Studio pilot</h3>
          <span class="cv-entry__dates">Mar 2026 – May 2026</span>
        </header>
        <p class="cv-entry__tech">Microsoft Copilot Studio · Power Automate · Power Platform</p>
        <ul>
          <li>Joined without prior hands-on experience in the stack; trained and became productive within a short timeframe.</li>
          <li>Owned documentation: step-by-step guides and version comparisons.</li>
          <li>Supported deployments and colleagues' meetings.</li>
        </ul>
      </article>

      <article class="cv-entry">
        <header class="cv-entry__head">
          <h3>Immersion Intern · Dotcom (TravelEase)</h3>
          <span class="cv-entry__dates">Jul 2021 – Aug 2021</span>
        </header>
        <p>Developed key features of a transportation application for traveller transfers. Java, MySQL.</p>
      </article>
    </section>

    <section class="cv-section" aria-labelledby="cv-projects">
      <h2 id="cv-projects">Selected Projects</h2>
      <article class="cv-entry">
        <header class="cv-entry__head">
          <h3>Consommi Tounsi · ESPRIT academic project</h3>
        </header>
        <p>E-commerce platform supporting local commerce in Tunisia. Architecture, backend and frontend, deployment to Azure Kubernetes Service. Spring Boot, Angular, MySQL, Docker, Kubernetes, AKS.</p>
      </article>
    </section>

    <section class="cv-section" aria-labelledby="cv-skills">
      <h2 id="cv-skills">Skills</h2>
      <dl class="cv-skills">
        <dt>Backend</dt><dd>Java, Spring Boot, Quarkus, REST APIs, GraphQL, MySQL / SQL, API design, microservice-oriented architecture</dd>
        <dt>Cloud &amp; Architecture</dt><dd>Microsoft Azure, AKS, Azure Landing Zones, Virtual WAN, hub-and-spoke, Site-to-Site VPN, Private Endpoints / Private DNS, governance and security</dd>
        <dt>DevOps / IaC</dt><dd>Docker, Kubernetes, Terraform, OpenTofu, Azure Verified Modules, GitLab CI/CD, GitHub Actions, ArgoCD</dd>
        <dt>AI-assisted</dt><dd>Claude Code, agentic coding, Microsoft Copilot Studio, Power Automate, Power Platform</dd>
        <dt>Also</dt><dd>Angular, TypeScript (learning), Agile / Scrum / Kanban, clean code, documentation, knowledge sharing</dd>
      </dl>
    </section>

    <section class="cv-section" aria-labelledby="cv-learning">
      <h2 id="cv-learning">Certifications &amp; Learning</h2>
      <p><strong>Completed:</strong> Microsoft Azure Fundamentals (AZ-900); Microsoft Copilot Studio &amp; Power Platform training; Microsoft Agent Academy; MaibornWolff Agentic AI training; Agentic Coding School.</p>
      <p><strong>In progress:</strong> CKA and CKAD preparation; Terraform / OpenTofu; Azure Landing Zones and Azure Verified Modules; Azure networking, governance and security.</p>
    </section>

    <section class="cv-section" aria-labelledby="cv-education">
      <h2 id="cv-education">Education</h2>
      <article class="cv-entry">
        <header class="cv-entry__head">
          <h3>Master's degree in Cloud Computing · ESPRIT, Tunis</h3>
          <span class="cv-entry__dates">2022</span>
        </header>
      </article>
    </section>
  </main>

  <script src="js/theme.js" defer></script>
</body>
</html>
```

`css/print.css` stub: `printf '/* filled in Task 7 */\n' > css/print.css`

- [ ] **Step 4: Run all checks**

Run: `scripts/check.sh`
Expected: all node tests PASS, html-validate reports no errors for both pages.

- [ ] **Step 5: Commit**

```bash
git add cv.html css/print.css tests/content.test.js
git commit -m "Add CV page content

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

---

### Task 4: Design context via impeccable (PRODUCT.md, DESIGN.md)

**Files:**
- Create: `PRODUCT.md`, `DESIGN.md` (written by following the impeccable skill's `init` and `new-work` references)

**Interfaces:**
- Produces: `DESIGN.md` must state concrete values for every token listed in Task 5 Step 3 (colour roles for light and dark, font families and loading method, type scale, spacing scale, radius, shadow, max content width, motion durations). Task 5 copies those values verbatim.

- [ ] **Step 1: Load the skill and run its context command**

Invoke the `impeccable` skill through the Skill tool. Then, with cwd at the project root:

```bash
~/.claude/skills/impeccable/scripts/impeccable context --target index.html
```
Follow the directives it prints (it will report no PRODUCT.md / DESIGN.md).

- [ ] **Step 2: Run `init` to write PRODUCT.md**

Read `~/.claude/skills/impeccable/reference/init.md` and follow it. Inputs to give it, taken from the spec: product = personal portfolio for recruiters; audience = recruiters and hiring managers, often on mobile, scanning; primary action = open LinkedIn or view CV; positioning statement and availability line verbatim from Global Constraints; tone = confident, precise, warm, not salesy; content hierarchy Backend → Cloud & Architecture → DevOps/IaC → AI-assisted; platform = web, static, GitHub Pages; constraints = no PDF, no build step, Google Fonts only external resource; surfaces = `index.html` (mode: Read/Persuade hybrid), `cv.html` (mode: Read, print-first).

- [ ] **Step 3: Run new-work to write DESIGN.md**

Read `~/.claude/skills/impeccable/reference/new-work.md` and follow it for a greenfield surface. Requirements DESIGN.md must satisfy (checked in Step 4):
- One committed visual world with a stated point of view, not a generic template.
- Light and dark palettes, each with these roles: `bg`, `bg-elevated`, `text`, `text-muted`, `accent`, `accent-contrast`, `border`, `focus`. All text/background pairs meet WCAG AA (4.5:1 body, 3:1 large text).
- Font choice: at most two families; if Google Fonts, the exact `<link>` tags to use; always a system fallback stack.
- Type scale (at least: display, h1, h2, h3, body, small) as `rem` values, and a fluid rule for display/h1 using `clamp()`.
- Spacing scale (`--space-1` … `--space-8`), `--radius`, `--shadow`, `--content-max` (px), `--motion-fast` and `--motion-base` durations.
- Layout intent per section (hero, skills grid, timeline, cards, learning columns, contact) at desktop and at ≤640px.
- Photo treatment (shape, size, border) for the hero.

- [ ] **Step 4: Verify DESIGN.md is complete**

```bash
for k in bg bg-elevated text text-muted accent accent-contrast border focus space-1 space-8 radius shadow content-max motion-fast motion-base clamp; do
  grep -q -- "$k" DESIGN.md && echo "ok  $k" || echo "MISSING $k"
done
```
Expected: every line prints `ok`. Fix DESIGN.md until it does.

- [ ] **Step 5: Commit**

```bash
git add PRODUCT.md DESIGN.md
git commit -m "Add product and design context from impeccable

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

---

### Task 5: Stylesheet and theme toggle

**Files:**
- Create: `tests/css.test.js`, `tests/theme.test.js`
- Modify: `css/styles.css` (replace stub), `js/theme.js` (replace stub), `index.html` and `cv.html` `<head>` only if DESIGN.md requires Google Font `<link>` tags

**Interfaces:**
- Consumes: DESIGN.md token values (Task 4); HTML hooks from Tasks 2–3 (`[data-theme-toggle]`, `.site-header`, `.site-nav__link`, `.hero*`, `.section`, `.skill-group*`, `.tags`, `.timeline*`, `.engagement*`, `.cards`, `.card*`, `.learning*`, `.contact__*`, `.site-footer`, `.skip-link`, `.button*`, `.cv*`, `.print-hint`).
- Produces: `js/theme.js` exporting `{ resolveTheme, applyTheme, initTheme }` via CommonJS when `module` exists, otherwise on `window.PortfolioTheme`; on load in a browser it calls `initTheme` and un-hides the toggle. `styles.css` defines `:root` tokens, `[data-theme="dark"]` overrides, a `prefers-color-scheme` block for no-JS, a `prefers-reduced-motion` block, and `.site-nav__link[aria-current="true"]` styling used by Task 6.

- [ ] **Step 1: Write the failing CSS structure test**

`tests/css.test.js`:
```js
const test = require('node:test');
const assert = require('node:assert/strict');
const { readFile } = require('./helpers');

const css = () => readFile('css/styles.css');

test('styles.css defines all required tokens on :root', () => {
  const s = css();
  for (const t of ['--bg', '--bg-elevated', '--text', '--text-muted', '--accent', '--accent-contrast', '--border', '--focus',
    '--space-1', '--space-8', '--radius', '--shadow', '--content-max', '--motion-fast', '--motion-base', '--font-body', '--font-heading']) {
    assert.match(s, new RegExp(`:root\\s*{[^}]*${t}\\s*:`), `${t} missing on :root`);
  }
});

test('styles.css overrides colour tokens for dark theme and for system preference without JS', () => {
  const s = css();
  assert.match(s, /\[data-theme="dark"\]\s*{[^}]*--bg\s*:/);
  assert.match(s, /@media\s*\(prefers-color-scheme:\s*dark\)\s*{\s*:root:not\(\[data-theme="light"\]\)\s*{[^}]*--bg\s*:/);
});

test('styles.css contains a reduced-motion block that disables transitions and smooth scroll', () => {
  const s = css();
  const block = s.match(/@media\s*\(prefers-reduced-motion:\s*reduce\)\s*{([\s\S]*?)}\s*}/);
  assert.ok(block, 'reduced-motion media block missing');
  assert.match(block[1], /scroll-behavior:\s*auto/);
  assert.match(block[1], /transition(-duration)?:\s*(none|0s|0ms)/);
});

test('styles.css styles the essentials', () => {
  const s = css();
  for (const sel of ['.skip-link', '.site-header', '.site-nav__link[aria-current="true"]', '.theme-toggle', '.hero__photo',
    '.skill-group--primary', '.timeline', '.card', '.contact__list', '.print-hint', ':focus-visible']) {
    assert.ok(s.includes(sel), `selector ${sel} missing`);
  }
  assert.match(s, /html\s*{[^}]*scroll-behavior:\s*smooth/);
  assert.match(s, /\.site-header\s*{[^}]*position:\s*sticky/);
});
```

- [ ] **Step 2: Write the failing theme test**

`tests/theme.test.js`:
```js
const test = require('node:test');
const assert = require('node:assert/strict');
const path = require('node:path');

const theme = require(path.resolve(__dirname, '../js/theme.js'));

function fakeDoc(initial = 'light') {
  const attrs = { 'data-theme': initial };
  const listeners = {};
  const button = {
    attrs: {},
    hidden: true,
    setAttribute(k, v) { this.attrs[k] = v; },
    addEventListener(type, fn) { listeners[type] = fn; },
    click() { listeners.click && listeners.click(); },
  };
  return {
    documentElement: {
      setAttribute(k, v) { attrs[k] = v; },
      getAttribute(k) { return attrs[k]; },
    },
    querySelector(sel) { return sel === '[data-theme-toggle]' ? button : null; },
    _button: button,
  };
}

const storageOf = (obj) => ({ getItem: (k) => (k in obj ? obj[k] : null), setItem: (k, v) => { obj[k] = v; } });
const throwingStorage = { getItem() { throw new Error('blocked'); }, setItem() { throw new Error('blocked'); } };
const mediaDark = () => ({ matches: true });
const mediaLight = () => ({ matches: false });

test('resolveTheme prefers stored value', () => {
  assert.equal(theme.resolveTheme({ storage: storageOf({ theme: 'dark' }), matchMedia: mediaLight }), 'dark');
});

test('resolveTheme falls back to system preference when nothing stored', () => {
  assert.equal(theme.resolveTheme({ storage: storageOf({}), matchMedia: mediaDark }), 'dark');
  assert.equal(theme.resolveTheme({ storage: storageOf({}), matchMedia: mediaLight }), 'light');
});

test('resolveTheme falls back when storage throws', () => {
  assert.equal(theme.resolveTheme({ storage: throwingStorage, matchMedia: mediaDark }), 'dark');
});

test('resolveTheme ignores garbage stored values', () => {
  assert.equal(theme.resolveTheme({ storage: storageOf({ theme: 'blue' }), matchMedia: mediaLight }), 'light');
});

test('initTheme applies theme, reveals toggle, and toggling flips and persists', () => {
  const store = {};
  const doc = fakeDoc();
  const env = { document: doc, storage: storageOf(store), matchMedia: mediaLight };
  assert.equal(theme.initTheme(env), 'light');
  assert.equal(doc._button.hidden, false);
  assert.equal(doc._button.attrs['aria-pressed'], 'false');
  doc._button.click();
  assert.equal(doc.documentElement.getAttribute('data-theme'), 'dark');
  assert.equal(store.theme, 'dark');
  assert.equal(doc._button.attrs['aria-pressed'], 'true');
  assert.equal(doc._button.attrs['aria-label'], 'Switch to light theme');
  doc._button.click();
  assert.equal(doc.documentElement.getAttribute('data-theme'), 'light');
  assert.equal(store.theme, 'light');
});

test('toggle still works for the session when storage throws', () => {
  const doc = fakeDoc();
  theme.initTheme({ document: doc, storage: throwingStorage, matchMedia: mediaLight });
  doc._button.click();
  assert.equal(doc.documentElement.getAttribute('data-theme'), 'dark');
});
```

- [ ] **Step 3: Run both tests to verify they fail**

Run: `node --test tests/css.test.js tests/theme.test.js`
Expected: FAIL (tokens missing; `theme.resolveTheme is not a function`).

- [ ] **Step 4: Write js/theme.js**

```js
// Theme toggle. Progressive enhancement: the inline <head> script already
// applied the stored/system theme before paint; this file wires the button.
(function (root) {
  'use strict';
  var KEY = 'theme';

  function readStored(storage) {
    try { return storage.getItem(KEY); } catch (e) { return null; }
  }
  function writeStored(storage, value) {
    try { storage.setItem(KEY, value); } catch (e) { /* storage unavailable: session-only */ }
  }
  function systemTheme(matchMedia) {
    try { return matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'; } catch (e) { return 'light'; }
  }

  function resolveTheme(env) {
    var stored = readStored(env.storage);
    return stored === 'dark' || stored === 'light' ? stored : systemTheme(env.matchMedia);
  }

  function applyTheme(doc, theme) {
    doc.documentElement.setAttribute('data-theme', theme);
    var button = doc.querySelector('[data-theme-toggle]');
    if (button) {
      button.setAttribute('aria-pressed', String(theme === 'dark'));
      button.setAttribute('aria-label', theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
    }
  }

  function initTheme(env) {
    var theme = resolveTheme(env);
    applyTheme(env.document, theme);
    var button = env.document.querySelector('[data-theme-toggle]');
    if (button) {
      button.hidden = false;
      button.addEventListener('click', function () {
        var next = env.document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        writeStored(env.storage, next);
        applyTheme(env.document, next);
      });
    }
    return theme;
  }

  var api = { resolveTheme: resolveTheme, applyTheme: applyTheme, initTheme: initTheme };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = api;
  } else {
    root.PortfolioTheme = api;
    initTheme({
      document: root.document,
      storage: root.localStorage,
      matchMedia: root.matchMedia ? root.matchMedia.bind(root) : function () { return { matches: false }; },
    });
  }
})(typeof window !== 'undefined' ? window : globalThis);
```

Note: in the browser the `else` branch runs because `module` is undefined. In Node, `module.exports` exists so no auto-init happens. If `localStorage` access itself throws on property read (some hardened browsers), the `env.storage` argument is `undefined` and `readStored` catches the resulting TypeError.

- [ ] **Step 5: Write css/styles.css from DESIGN.md**

Before editing, read `~/.claude/skills/impeccable/reference/craft-floor.md` (required by the skill before any UI edit).

Structure the file exactly in this order, filling every value from DESIGN.md. The skeleton below shows the required selectors and the token names; the *values* (colours, fonts, sizes, layout details) come from DESIGN.md and must not be invented here.

```css
/* 1. Tokens (values from DESIGN.md) */
:root {
  --bg: …; --bg-elevated: …; --text: …; --text-muted: …; --accent: …; --accent-contrast: …; --border: …; --focus: …;
  --font-body: …; --font-heading: …;
  --text-display: clamp(…); --text-h1: clamp(…); --text-h2: …rem; --text-h3: …rem; --text-body: …rem; --text-small: …rem;
  --space-1: …; --space-2: …; --space-3: …; --space-4: …; --space-5: …; --space-6: …; --space-7: …; --space-8: …;
  --radius: …; --shadow: …; --content-max: …px; --motion-fast: …ms; --motion-base: …ms;
  color-scheme: light;
}
[data-theme="dark"] { --bg: …; --bg-elevated: …; --text: …; --text-muted: …; --accent: …; --accent-contrast: …; --border: …; --focus: …; color-scheme: dark; }
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) { /* same dark values, for JS-off visitors */ --bg: …; --bg-elevated: …; --text: …; --text-muted: …; --accent: …; --accent-contrast: …; --border: …; --focus: …; color-scheme: dark; }
}

/* 2. Base */
*, *::before, *::after { box-sizing: border-box; }
html { scroll-behavior: smooth; scroll-padding-top: var(--header-height, 4rem); }
body { margin: 0; background: var(--bg); color: var(--text); font-family: var(--font-body); font-size: var(--text-body); line-height: 1.6; }
img { max-width: 100%; height: auto; }
:focus-visible { outline: 3px solid var(--focus); outline-offset: 3px; }
.skip-link { position: absolute; left: var(--space-3); top: -100%; … } .skip-link:focus { top: var(--space-3); }

/* 3. Header + nav (sticky, wraps at narrow widths, never overlaps toggle) */
.site-header { position: sticky; top: 0; z-index: 10; … }
.site-nav__list { list-style: none; display: flex; flex-wrap: wrap; gap: …; margin: 0; padding: 0; }
.site-nav__link { … } .site-nav__link[aria-current="true"] { … }
.theme-toggle { … } .theme-toggle[hidden] { display: none; }

/* 4. Buttons */
.button, .button--primary, .button--secondary, .button--ghost { … }

/* 5. Hero (photo treatment per DESIGN.md; stacks at ≤640px) */
.hero { … } .hero__photo { … } .hero__availability { … }

/* 6. Sections, skills, timeline, cards, learning, contact, footer */
.section { max-width: var(--content-max); margin-inline: auto; padding: … var(--space-4); }
.skill-groups { display: grid; … } .skill-group--primary { … } .tags { … } .tags--small { … }
.timeline { … } .engagement { … }
.cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 18rem), 1fr)); … } .card { … }
.learning { … } .contact__list { … } .site-footer { … }

/* 7. CV page on screen */
.cv__main { … } .cv-entry { … } .cv-skills { … } .print-hint { … }

/* 8. Motion */
.button, .site-nav__link, .theme-toggle, .card { transition: … var(--motion-fast); }
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after { transition-duration: 0s !important; animation-duration: 0s !important; }
}

/* 9. Narrow screens (≤640px and a 320px sanity pass) */
@media (max-width: 640px) { … }
```

Every `…` above is a required value from DESIGN.md; none may remain in the committed file (Step 7 greps for it). If DESIGN.md chose a Google Font, add its `<link rel="preconnect">` and stylesheet `<link>` tags to the `<head>` of both pages, directly above the `css/styles.css` link.

- [ ] **Step 6: Run the tests until they pass**

Run: `node --test tests/css.test.js tests/theme.test.js`
Expected: all PASS.

- [ ] **Step 7: Full check and visual sanity**

```bash
scripts/check.sh
! grep -n '…' css/styles.css   # must print nothing and exit 0
python3 -m http.server 8080 >/dev/null 2>&1 &
sleep 1
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --disable-gpu --hide-scrollbars \
  --window-size=1440,4000 --screenshot=/tmp/desktop.png http://localhost:8080/index.html
kill %1
```
Open `/tmp/desktop.png` with the Read tool and confirm the page is styled (not raw HTML), the hero has the photo, and nothing overlaps. This is a sanity look only; the batched QA round is Task 9.

- [ ] **Step 8: Commit**

```bash
git add css/styles.css js/theme.js tests/css.test.js tests/theme.test.js index.html cv.html
git commit -m "Style the site from DESIGN.md and add theme toggle

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

---

### Task 6: Active section highlighting in the nav

**Files:**
- Create: `tests/nav.test.js`
- Modify: `js/nav.js` (replace stub)

**Interfaces:**
- Consumes: `a.site-nav__link[href^="#"]` and `section[id]` from Task 2; `.site-nav__link[aria-current="true"]` styling from Task 5.
- Produces: `js/nav.js` exporting `{ createSectionObserver }` via CommonJS in Node; in the browser it self-initialises with the real `IntersectionObserver` when available and otherwise does nothing.

- [ ] **Step 1: Write the failing test**

`tests/nav.test.js`:
```js
const test = require('node:test');
const assert = require('node:assert/strict');
const path = require('node:path');
const { readHtml } = require('./helpers');

const nav = require(path.resolve(__dirname, '../js/nav.js'));

function fakeLink(id) {
  return { attrs: { href: `#${id}` }, getAttribute(k) { return this.attrs[k]; }, setAttribute(k, v) { this.attrs[k] = v; }, removeAttribute(k) { delete this.attrs[k]; } };
}

function fakeDoc(ids) {
  const links = ids.map(fakeLink);
  const sections = ids.map((id) => ({ id }));
  return {
    querySelectorAll(sel) { return sel === 'a.site-nav__link[href^="#"]' ? links : sections; },
    getElementById(id) { return sections.find((s) => s.id === id) || null; },
    _links: links,
    _sections: sections,
  };
}

class FakeIO {
  constructor(cb, opts) { this.cb = cb; this.opts = opts; this.observed = []; FakeIO.last = this; }
  observe(el) { this.observed.push(el); }
  trigger(entries) { this.cb(entries, this); }
}

test('createSectionObserver observes every linked section', () => {
  const doc = fakeDoc(['about', 'skills', 'contact']);
  nav.createSectionObserver(doc, FakeIO);
  assert.deepEqual(FakeIO.last.observed.map((s) => s.id), ['about', 'skills', 'contact']);
});

test('the most visible intersecting section gets aria-current, others lose it', () => {
  const doc = fakeDoc(['about', 'skills', 'contact']);
  nav.createSectionObserver(doc, FakeIO);
  const [about, skills] = doc._sections;
  FakeIO.last.trigger([
    { target: about, isIntersecting: true, intersectionRatio: 0.2 },
    { target: skills, isIntersecting: true, intersectionRatio: 0.7 },
  ]);
  assert.equal(doc._links[1].getAttribute('aria-current'), 'true');
  assert.equal(doc._links[0].getAttribute('aria-current'), undefined);
  FakeIO.last.trigger([{ target: skills, isIntersecting: false, intersectionRatio: 0 }, { target: about, isIntersecting: true, intersectionRatio: 0.9 }]);
  assert.equal(doc._links[0].getAttribute('aria-current'), 'true');
  assert.equal(doc._links[1].getAttribute('aria-current'), undefined);
});

test('no IntersectionObserver: returns null and touches nothing', () => {
  const doc = fakeDoc(['about']);
  assert.equal(nav.createSectionObserver(doc, undefined), null);
  assert.equal(doc._links[0].getAttribute('aria-current'), undefined);
});

test('index.html works without JS: every nav link is a plain anchor to an existing section', () => {
  const html = readHtml('index.html');
  const hrefs = [...html.matchAll(/class="site-nav__link" href="#([^"]+)"/g)].map((m) => m[1]);
  assert.ok(hrefs.length >= 7);
  for (const id of hrefs) assert.ok(html.includes(`<section id="${id}"`), `#${id} target missing`);
});
```

- [ ] **Step 2: Run to verify it fails**

Run: `node --test tests/nav.test.js`
Expected: FAIL, `nav.createSectionObserver is not a function`.

- [ ] **Step 3: Write js/nav.js**

```js
// Highlights the nav link of the section currently most visible.
// Progressive enhancement: without IntersectionObserver nothing happens and
// the anchors keep working as plain links.
(function (root) {
  'use strict';

  function createSectionObserver(doc, IO) {
    if (typeof IO !== 'function') return null;
    var links = Array.prototype.slice.call(doc.querySelectorAll('a.site-nav__link[href^="#"]'));
    var byId = {};
    var sections = [];
    links.forEach(function (link) {
      var id = link.getAttribute('href').slice(1);
      var section = doc.getElementById(id);
      if (section) { byId[id] = link; sections.push(section); }
    });
    var ratios = {};
    var observer = new IO(function (entries) {
      entries.forEach(function (entry) {
        ratios[entry.target.id] = entry.isIntersecting ? entry.intersectionRatio : 0;
      });
      var bestId = null, best = 0;
      Object.keys(ratios).forEach(function (id) {
        if (ratios[id] > best) { best = ratios[id]; bestId = id; }
      });
      links.forEach(function (link) {
        if (bestId && link === byId[bestId]) link.setAttribute('aria-current', 'true');
        else link.removeAttribute('aria-current');
      });
    }, { rootMargin: '-20% 0px -60% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] });
    sections.forEach(function (s) { observer.observe(s); });
    return observer;
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { createSectionObserver: createSectionObserver };
  } else {
    createSectionObserver(root.document, root.IntersectionObserver);
  }
})(typeof window !== 'undefined' ? window : globalThis);
```

- [ ] **Step 4: Run the tests**

Run: `scripts/check.sh`
Expected: all PASS, html-validate clean.

- [ ] **Step 5: Manual check in a real browser**

Run `python3 -m http.server 8080`, open `http://localhost:8080/`, scroll, confirm the nav highlight follows the sections and that clicking a nav link scrolls to the section with the sticky header not covering its heading (`scroll-padding-top` from Task 5). Stop the server.

- [ ] **Step 6: Commit**

```bash
git add js/nav.js tests/nav.test.js
git commit -m "Highlight the active section in the sticky nav

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

---

### Task 7: CV print stylesheet and print check

**Files:**
- Create: `scripts/print-check.sh`
- Modify: `css/print.css` (replace stub), `tests/css.test.js` (add print rules test)

**Interfaces:**
- Consumes: `body.cv`, `.site-header--cv`, `.print-hint`, `.theme-toggle`, `.cv-entry`, `.cv-section`, `.cv-entry__head` from Task 3.
- Produces: `scripts/print-check.sh` prints `pages: N` and exits non-zero if N > 2; used by Task 9.

- [ ] **Step 1: Add the failing print test**

Append to `tests/css.test.js`:
```js
test('print.css hides chrome, keeps entries together, shows link URLs, sets A4', () => {
  const p = readFile('css/print.css');
  assert.match(p, /@page\s*{[^}]*size:\s*A4/);
  for (const sel of ['.site-header', '.print-hint', '.theme-toggle']) {
    assert.match(p, new RegExp(`${sel.replace('.', '\\.')}[^{]*{[^}]*display:\\s*none`), `${sel} not hidden in print`);
  }
  assert.match(p, /\.cv-entry\s*{[^}]*break-inside:\s*avoid/);
  assert.match(p, /h2,?\s*h3[^{]*{[^}]*break-after:\s*avoid/);
  assert.match(p, /a\[href\^="http"\]::after\s*{[^}]*content:\s*" \(" attr\(href\) "\)"/);
  assert.match(p, /(color|background)[^;]*:\s*(#000|black|#fff|white|none)/);
});
```

- [ ] **Step 2: Run to verify it fails**

Run: `node --test tests/css.test.js`
Expected: the new test FAILS (stub file).

- [ ] **Step 3: Write css/print.css**

```css
/* Print layout for cv.html. Loaded with media="print" only. */
@page { size: A4; margin: 16mm 18mm; }

.site-header, .print-hint, .theme-toggle { display: none !important; }

html { scroll-behavior: auto; }
body.cv {
  background: #fff;
  color: #000;
  font-size: 10.5pt;
  line-height: 1.4;
}
.cv__main { max-width: none; margin: 0; padding: 0; box-shadow: none; background: none; }
.cv__header { border-bottom: 1px solid #000; padding-bottom: 4mm; margin-bottom: 5mm; }
h1 { font-size: 20pt; margin: 0 0 2mm; }
h2 { font-size: 12.5pt; margin: 6mm 0 2mm; border-bottom: 1px solid #999; padding-bottom: 1mm; }
h3 { font-size: 11pt; margin: 3mm 0 1mm; }
h2, h3 { break-after: avoid; }
.cv-section { break-inside: auto; }
.cv-entry { break-inside: avoid; margin-bottom: 3mm; }
.cv-entry__head { display: flex; justify-content: space-between; gap: 4mm; align-items: baseline; }
.cv-entry__dates { white-space: nowrap; color: #333; }
.cv-entry--nested { margin-left: 5mm; }
ul { margin: 1mm 0 2mm; padding-left: 5mm; }
li { margin: 0 0 0.6mm; }
.cv-skills { display: grid; grid-template-columns: 30mm 1fr; column-gap: 3mm; row-gap: 1mm; margin: 0; }
.cv-skills dt { font-weight: 700; } .cv-skills dd { margin: 0; }
a { color: #000; text-decoration: none; }
a[href^="http"]::after { content: " (" attr(href) ")"; font-size: 8.5pt; color: #444; }
.cv__contact a[href^="http"]::after { content: ""; } /* contact line already shows readable URLs */
.cv__availability { font-weight: 700; }
```

- [ ] **Step 4: Write scripts/print-check.sh**

```bash
#!/usr/bin/env bash
# Prints cv.html with headless Chrome and reports the page count (must be <= 2).
set -euo pipefail
cd "$(dirname "$0")/.."
mkdir -p .qa
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
python3 -m http.server 8089 >/dev/null 2>&1 &
SERVER=$!
trap 'kill $SERVER' EXIT
sleep 1
"$CHROME" --headless=new --disable-gpu --no-pdf-header-footer \
  --print-to-pdf="$PWD/.qa/cv.pdf" http://localhost:8089/cv.html >/dev/null 2>&1
PAGES=$(mdls -name kMDItemNumberOfPages -raw .qa/cv.pdf)
echo "pages: $PAGES"
[ "$PAGES" -le 2 ] || { echo "cv.html prints to more than 2 pages"; exit 1; }
```
Then `chmod +x scripts/print-check.sh`.

- [ ] **Step 5: Run the tests and the print check**

Run: `node --test tests/css.test.js && scripts/print-check.sh`
Expected: tests PASS; output `pages: 1` or `pages: 2`. If `mdls` returns `(null)` (Spotlight not indexed yet), fall back to `python3 -c "import re,sys;print(len(re.findall(rb'/Type\s*/Page[^s]', open('.qa/cv.pdf','rb').read())))"`. Open `.qa/cv.pdf` with the Read tool and confirm: no nav, no hint, entries not split across pages, URLs visible after links.

- [ ] **Step 6: Commit**

```bash
git add css/print.css scripts/print-check.sh tests/css.test.js
git commit -m "Add CV print stylesheet and print check

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

---

### Task 8: Social preview, favicon per DESIGN.md, and GitHub Pages deploy

**Files:**
- Create: `assets/og.html`, `assets/og.png`, `.github/workflows/deploy.yml`
- Modify: `assets/favicon.svg` (colours from DESIGN.md), `index.html` `<head>` (Open Graph tags), `tests/content.test.js` (OG test)

**Interfaces:**
- Produces: `assets/og.png` 1200×630 referenced by `<meta property="og:image">` with an absolute URL (allowed exception: Open Graph requires absolute URLs; the content test permits `https://benrhoumanawres7-ai.github.io/portfolio/` only in `og:` and `canonical` meta).

- [ ] **Step 1: Add the failing OG test**

Append to `tests/content.test.js`:
```js
test('index.html: Open Graph and canonical tags', () => {
  const html = readHtml('index.html');
  const base = 'https://benrhoumanawres7-ai.github.io/portfolio/';
  assert.match(html, new RegExp(`<link rel="canonical" href="${base}">`));
  assert.match(html, /<meta property="og:title" content="Nawres Ben Rhouma · Backend Software Engineer">/);
  assert.match(html, /<meta property="og:description" content="[^"]+">/);
  assert.match(html, new RegExp(`<meta property="og:image" content="${base}assets/og.png">`));
  assert.match(html, /<meta name="twitter:card" content="summary_large_image">/);
  assert.ok(require('node:fs').existsSync(require('node:path').resolve(__dirname, '../assets/og.png')), 'assets/og.png missing');
});
```

- [ ] **Step 2: Run to verify it fails**

Run: `node --test tests/content.test.js`
Expected: the OG test FAILS.

- [ ] **Step 3: Add the head tags**

Insert into `index.html` `<head>` directly after the `<meta name="description" …>` line:
```html
  <link rel="canonical" href="https://benrhoumanawres7-ai.github.io/portfolio/">
  <meta property="og:type" content="website">
  <meta property="og:title" content="Nawres Ben Rhouma · Backend Software Engineer">
  <meta property="og:description" content="Java backend engineer expanding into Cloud & Platform Engineering and AI-assisted development. Based in Tunis, open to remote, part-time roles.">
  <meta property="og:url" content="https://benrhoumanawres7-ai.github.io/portfolio/">
  <meta property="og:image" content="https://benrhoumanawres7-ai.github.io/portfolio/assets/og.png">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta name="twitter:card" content="summary_large_image">
```

- [ ] **Step 4: Build the social image from HTML**

`assets/og.html` (uses the same tokens; copy the light-theme values from DESIGN.md into the inline style so the file is self-contained):
```html
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>OG image source</title>
<style>
  html, body { margin: 0; width: 1200px; height: 630px; }
  body { display: flex; flex-direction: column; justify-content: center; padding: 80px; box-sizing: border-box;
         background: /* --bg from DESIGN.md */; color: /* --text */; font-family: /* --font-heading, fallback */; }
  .eyebrow { font-size: 28px; color: /* --text-muted */; margin: 0 0 16px; }
  h1 { font-size: 84px; line-height: 1.05; margin: 0 0 24px; }
  p { font-size: 34px; line-height: 1.3; margin: 0; max-width: 960px; }
  .bar { position: absolute; left: 0; top: 0; bottom: 0; width: 24px; background: /* --accent */; }
</style>
</head>
<body>
  <div class="bar"></div>
  <p class="eyebrow">Software Engineer at MaibornWolff · Tunis · remote, part-time</p>
  <h1>Nawres Ben Rhouma</h1>
  <p>Backend Software Engineer with Java expertise, expanding into Cloud &amp; Platform Engineering and AI-assisted development.</p>
</body>
</html>
```
Render it:
```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --disable-gpu --hide-scrollbars \
  --window-size=1200,630 --screenshot="$PWD/assets/og.png" "file://$PWD/assets/og.html"
sips -g pixelWidth -g pixelHeight assets/og.png
```
Expected: `pixelWidth: 1200`, `pixelHeight: 630`. Open the PNG with the Read tool and check the text is not clipped.

- [ ] **Step 5: Restyle the favicon with DESIGN.md colours**

Edit `assets/favicon.svg`: replace the `rect` fill with the DESIGN.md `accent` colour and the text fill with `accent-contrast`. Keep the "NB" initials.

- [ ] **Step 6: Write the deploy workflow**

`.github/workflows/deploy.yml`:
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 24
      - run: node --test tests/
      - run: npx --yes html-validate index.html cv.html

  deploy:
    needs: test
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - uses: actions/checkout@v4
      - uses: actions/configure-pages@v5
      - uses: actions/upload-pages-artifact@v3
        with:
          path: .
      - id: deployment
        uses: actions/deploy-pages@v4
```

- [ ] **Step 7: Run all checks**

Run: `scripts/check.sh`
Expected: all PASS.

- [ ] **Step 8: Commit**

```bash
git add index.html assets/og.html assets/og.png assets/favicon.svg .github/workflows/deploy.yml tests/content.test.js
git commit -m "Add social preview, favicon colours and GitHub Pages workflow

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

---

### Task 9: Batched visual QA and impeccable audit

**Files:**
- Create: `scripts/screenshots.sh`
- Modify: whatever the audit round finds (`css/styles.css`, `index.html`, `cv.html`, `css/print.css`)

**Interfaces:**
- Consumes: everything above.
- Produces: `.qa/` screenshots (gitignored); commit of batched fixes.

- [ ] **Step 1: Write scripts/screenshots.sh**

```bash
#!/usr/bin/env bash
# Captures index.html and cv.html at desktop, mobile and 320px, light and dark, into .qa/.
set -euo pipefail
cd "$(dirname "$0")/.."
mkdir -p .qa
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
python3 -m http.server 8088 >/dev/null 2>&1 &
SERVER=$!
trap 'kill $SERVER' EXIT
sleep 1
for page in index cv; do
  for size in 1440x4200 390x6000 320x6500; do
    w=${size%x*}; h=${size#*x}
    "$CHROME" --headless=new --disable-gpu --hide-scrollbars --window-size="$w,$h" \
      --screenshot="$PWD/.qa/${page}-${w}-light.png" "http://localhost:8088/${page}.html" >/dev/null 2>&1
    "$CHROME" --headless=new --disable-gpu --hide-scrollbars --window-size="$w,$h" \
      --force-dark-mode --enable-features=WebContentsForceDark:inversion_method/cielab_based \
      --screenshot="$PWD/.qa/${page}-${w}-dark.png" "http://localhost:8088/${page}.html" >/dev/null 2>&1
  done
done
ls -1 .qa
```
`chmod +x scripts/screenshots.sh`. Note: `--force-dark-mode` exercises the `prefers-color-scheme: dark` path (no JS storage involved), which is the JS-off dark behaviour we want to see.

- [ ] **Step 2: Capture and inspect in one batch**

Run `scripts/screenshots.sh`, then open every `.qa/*.png` with the Read tool. Record every defect in a single list before fixing anything. Check specifically:
- 1440: hero fills the first viewport with statement, availability line, both buttons and photo; sections have consistent rhythm; timeline and cards align to the grid.
- 390 and 320: no horizontal scrollbar; nav wraps into two rows or a compact row without overlapping the CV button and toggle; cards stack; tags wrap; text ≥ 16px equivalent for body.
- Dark: every text/background pair legible; borders visible; photo placeholder not glaring.
- cv.html on screen: readable, hint visible, back link visible.

Horizontal overflow at 320px is judged from `.qa/index-320-light.png`: headless Chrome clips the capture at the window width, so any element wider than the viewport shows as text or a card cut off at the right edge. Additionally, in a real browser at 320px wide (Chrome DevTools device toolbar), run in the console:
```js
document.documentElement.scrollWidth <= window.innerWidth
```
Expected: `true` on both pages.

- [ ] **Step 3: Run the impeccable audit**

Invoke the `impeccable` skill, read `~/.claude/skills/impeccable/reference/audit.md`, and run its audit on `index.html` and `cv.html` (accessibility, performance, responsive). Add every finding to the same defect list.

- [ ] **Step 4: Fix everything in one batch**

Read `~/.claude/skills/impeccable/reference/craft-floor.md` again, then apply all fixes from the list. Run `scripts/check.sh` and `scripts/print-check.sh` after the edits; both must pass.

- [ ] **Step 5: One confirmation round, then stop**

Run `scripts/screenshots.sh` again and inspect only the screenshots affected by the fixes. If something is still wrong, fix it and stop after this second round (the skill's bounded-pass rule). Keyboard check in a real browser: Tab from the top reaches skip link, nav links, CV button, theme toggle, hero buttons; focus ring visible on each; Enter on the toggle flips the theme.

- [ ] **Step 6: Commit**

```bash
git add scripts/screenshots.sh css/styles.css css/print.css index.html cv.html
git commit -m "QA round: responsive, theme and accessibility fixes

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

---

### Task 10: Real photo, publish, verify live

**Files:**
- Create: `assets/photo.jpg` (supplied), `assets/photo-480.jpg`, `assets/photo-960.jpg`
- Modify: `index.html` hero `<img>`, `tests/content.test.js`

**Interfaces:**
- Consumes: photo file dropped by Nawres at `assets/photo.jpg` (or `.png`, then convert). If it is not there yet, do Steps 5–8 only and leave the placeholder; report that the site is live with a placeholder.

- [ ] **Step 1: Add the failing photo test**

Append to `tests/content.test.js`:
```js
test('index.html: hero uses the real photo with responsive sources', () => {
  const html = readHtml('index.html');
  assert.match(html, /<img class="hero__photo" src="assets\/photo-480\.jpg" srcset="assets\/photo-480\.jpg 480w, assets\/photo-960\.jpg 960w" sizes="[^"]+" width="480" height="480" alt="Portrait of Nawres Ben Rhouma" loading="eager" decoding="async">/);
});
```
Run: `node --test tests/content.test.js` → this test FAILS.

- [ ] **Step 2: Produce square, resized variants**

```bash
ls -la assets/photo.*                    # confirm the file exists; convert PNG → JPG if needed:
# sips -s format jpeg assets/photo.png --out assets/photo.jpg
W=$(sips -g pixelWidth assets/photo.jpg | awk '/pixelWidth/{print $2}')
H=$(sips -g pixelHeight assets/photo.jpg | awk '/pixelHeight/{print $2}')
S=$(( W < H ? W : H ))
sips -c "$S" "$S" assets/photo.jpg --out assets/photo-square.jpg          # centre crop to square
sips -Z 960 assets/photo-square.jpg --out assets/photo-960.jpg
sips -Z 480 assets/photo-square.jpg --out assets/photo-480.jpg
rm assets/photo-square.jpg
ls -la assets/photo-*.jpg                # each should be well under 300 KB
```
If a file is over 300 KB: `sips -s formatOptions 75 assets/photo-960.jpg --out assets/photo-960.jpg`.
Open `assets/photo-480.jpg` with the Read tool and confirm the crop keeps the face centred; if not, crop manually with `sips -c` plus `--cropOffset`.

- [ ] **Step 3: Update the hero image tag**

Replace the hero `<img …>` in `index.html` with:
```html
      <img class="hero__photo" src="assets/photo-480.jpg" srcset="assets/photo-480.jpg 480w, assets/photo-960.jpg 960w" sizes="(max-width: 640px) 60vw, 320px" width="480" height="480" alt="Portrait of Nawres Ben Rhouma" loading="eager" decoding="async">
```
Keep `assets/photo-placeholder.svg` in the repo? No: delete it and remove nothing else (the links test will catch any remaining reference).

- [ ] **Step 4: Run all checks and commit**

```bash
scripts/check.sh && scripts/screenshots.sh
git rm -q assets/photo-placeholder.svg
git add index.html assets/photo.jpg assets/photo-480.jpg assets/photo-960.jpg tests/content.test.js
git commit -m "Use the real portrait photo in the hero

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```
Look at `.qa/index-1440-light.png` and `.qa/index-390-light.png` once to confirm the photo renders.

- [ ] **Step 5: Create the GitHub repo under the personal account**

`gh` on this machine is logged in as the work account `nawresbrh-mw`. Do **not** push with it. Either:

(a) Nawres runs in this session:
```
! gh auth login --hostname github.com --web
```
choosing the `benrhoumanawres7-ai` account, then the executor continues; or

(b) the executor creates the repo and pushes only after `gh auth status` shows `benrhoumanawres7-ai` as the active account:
```bash
gh auth status 2>&1 | grep -q "Active account: true" && gh api user --jq .login
# must print: benrhoumanawres7-ai
gh repo create benrhoumanawres7-ai/portfolio --public --source=. --remote=origin --push
```

- [ ] **Step 6: Enable Pages via Actions**

```bash
gh api -X POST repos/benrhoumanawres7-ai/portfolio/pages -f build_type=workflow 2>/dev/null \
  || gh api -X PUT repos/benrhoumanawres7-ai/portfolio/pages -f build_type=workflow
gh run watch --exit-status
```
Expected: the `Deploy to GitHub Pages` run finishes green (test job then deploy job).

- [ ] **Step 7: Verify the live site**

```bash
curl -s -o /dev/null -w "%{http_code}\n" https://benrhoumanawres7-ai.github.io/portfolio/
curl -s -o /dev/null -w "%{http_code}\n" https://benrhoumanawres7-ai.github.io/portfolio/cv.html
curl -s -o /dev/null -w "%{http_code}\n" https://benrhoumanawres7-ai.github.io/portfolio/css/styles.css
curl -s -o /dev/null -w "%{http_code}\n" https://benrhoumanawres7-ai.github.io/portfolio/assets/og.png
```
Expected: four lines of `200` (Pages can take a minute after the run; retry once). Then a headless screenshot of the live URL at 1440 and 390 and a Read of both images to confirm styling loaded at the subpath.

- [ ] **Step 8: Update README status and commit**

Add to `README.md` under Deploy: `Live: https://benrhoumanawres7-ai.github.io/portfolio/`. Commit:
```bash
git add README.md
git commit -m "Record live URL

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
git push
```

---

## Self-review notes

- Spec coverage: §4 sections and order → Task 2; §5 CV → Tasks 3, 7; §6 architecture (relative URLs, theme, sticky nav, fonts, impeccable) → Tasks 2, 4, 5, 6; §7 deployment → Tasks 8, 10; §8 verification → Tasks 1, 7, 9, 10; §9 open inputs → Task 10 (photo) and Global Constraints (ESPRIT 2022 assumption stays until Nawres confirms; if she corrects it, edit the two Education blocks and the content test strings).
- Names used consistently: `resolveTheme/applyTheme/initTheme`, `createSectionObserver`, `readHtml/extractIds/extractLinks/fileExists/readFile`, `[data-theme-toggle]`, `.site-nav__link`, `.cv-entry`, `.print-hint`.
- The only absolute URLs in shipped HTML are the canonical/Open Graph tags in Task 8; the content test forbids root-relative `/` paths, not absolute `https://` ones, so they pass.
