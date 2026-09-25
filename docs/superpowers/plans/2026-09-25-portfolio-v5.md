# Portfolio v5 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Give the page a one-line claim, tie every skill to where it was used, describe each project once, add a "How I work" list, and merge Learning into Education (menu goes from 7 section links to 6).

**Architecture:** Static site, no build step. All content lives in `index.html`, styles in `css/styles.css`, progressive-enhancement scripts in `js/`. Tests are `node --test` files in `tests/` that read the HTML/CSS as text or drive the scripts through small fakes. `cv.html` is not touched.

**Tech Stack:** Plain HTML, CSS, vanilla JS (UMD-style IIFEs exporting for Node), `node:test`, html-validate via `npx`.

**Spec:** `docs/superpowers/specs/2026-09-25-portfolio-v5-design.md`

## Global Constraints

- Never write the names or URLs of any outside portfolio into any file, test, or commit message.
- Commit messages are plain sentences with no `Co-Authored-By` or other AI trailers; the author is the repo's configured personal identity.
- Customer names are never published: no Techem, Beiersdorf, MSR-Electronic, MSR PolyCTRL, PolyCTRL (already test-guarded).
- No invented numbers, metrics or production claims; all copy comes from the spec or text already on the page.
- No new external resources, no build step, no new dependencies.
- Visual system is unchanged: existing tokens only (no new colours), Gabarito / Source Sans 3 / Source Code Pro.
- Everything must still work without JavaScript (all panels stacked, anchors jump).
- Do not push to `origin`. Nawres reviews screenshots first.
- Run all tests with `node --test` from the repo root; `scripts/check.sh` runs tests plus html-validate.

## Review Focus

1. **Clicking an Experience "Details" link after manually switching tabs** (same hash, no `hashchange`): the linked panel must still show. Pinned in Task 2 by the click-listener test.
2. **Loading the page with `#panel-copilot` in the URL** (shared link): that tab is selected and scrolled to, not tab 1. Pinned in Task 2.
3. **Unknown or unrelated hash** (`#about`, `#panel-nope`): first tab stays selected, nothing scrolls, no error. Pinned in Task 2.
4. **Screen-reader link list:** four "Details in Selected work" links must be distinguishable. Pinned in Task 3 by asserting a visually hidden project name inside each link.
5. **Narrow screens:** the skill meta lines use `grid-column: 2` and must fall back to one column under 900px or they create an implicit second column. Pinned in Task 4 by a CSS test on the 900px block.

---

### Task 1: Hero claim line

**Files:**
- Modify: `index.html:63-66` (hero text block)
- Modify: `css/styles.css:343-363` (hero rules)
- Test: `tests/content.test.js` (append at end)

**Interfaces:**
- Consumes: nothing.
- Produces: `.hero__claim` class; hero order eyebrow → h1 → claim → statement → actions.

- [ ] **Step 1: Write the failing test** (append to `tests/content.test.js`)

```js
// v5 (2026-09-25)
test('index.html: hero reads role, name, claim, statement in that order', () => {
  const html = readHtml('index.html');
  const hero = html.slice(html.indexOf('<div class="hero__text">'), html.indexOf('<div class="hero__actions">'));
  const order = ['<p class="hero__role">', '<h1 id="hero-title">', '<p class="hero__claim">', '<p class="hero__statement">'].map((s) => hero.indexOf(s));
  assert.ok(order.every((p) => p >= 0), `missing hero part: ${order}`);
  assert.deepEqual([...order].sort((a, b) => a - b), order, 'hero parts out of order');
  assert.match(hero, /<p class="hero__claim">Backend services that reach production, and the platform under them\.<\/p>/);
});

test('styles.css: hero claim is set in the display face', () => {
  const s = readFile('css/styles.css');
  assert.match(s, /\.hero__claim\s*{[^}]*font-family:\s*var\(--font-display\)/);
});
```

- [ ] **Step 2: Run to verify it fails**

Run: `node --test tests/content.test.js`
Expected: FAIL on "missing hero part" (claim absent) and on the CSS test.

- [ ] **Step 3: Implement**

In `index.html`, replace the three lines after `<div class="hero__text">` with:

```html
          <p class="hero__role">Software Engineer at MaibornWolff</p>
          <h1 id="hero-title">Nawres <span class="accent">Ben Rhouma.</span></h1>
          <p class="hero__claim">Backend services that reach production, and the platform under them.</p>
          <p class="hero__statement">Backend Software Engineer with Java expertise, expanding into Cloud &amp; Platform Engineering and AI-assisted development.</p>
```

In `css/styles.css`, change `.hero__role`'s `margin-bottom: var(--space-5);` to `margin-bottom: var(--space-4);`, set `.hero__statement` to:

```css
.hero__statement {
  font-size: 1.125rem;
  line-height: 1.5;
  color: var(--text-muted);
  max-width: 32em;
  margin-bottom: var(--space-5);
}
```

and add directly after `.hero__role { … }`:

```css
.hero__claim {
  font-family: var(--font-display);
  font-size: clamp(1.375rem, 1.1rem + 1vw, 1.75rem);
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.01em;
  max-width: 22em;
  margin-bottom: var(--space-3);
  text-wrap: balance;
}
```

In the `@media (max-width: 640px)` block, replace `.hero__statement { font-size: 1.125rem; }` with `.hero__statement { font-size: 1rem; }`.

- [ ] **Step 4: Run to verify it passes**

Run: `node --test`
Expected: all pass (the existing hero test still matches role/h1/buttons).

- [ ] **Step 5: Commit**

```bash
git add index.html css/styles.css tests/content.test.js
git commit -m "Hero: role eyebrow above the name and a one-line claim"
```

---

### Task 2: Tabs follow links to a panel

**Files:**
- Modify: `js/tabs.js`
- Test: `tests/tabs.test.js`

**Interfaces:**
- Consumes: markup contract that each `.tab` has `data-panel="panel-<id>"` and each panel has `id="panel-<id>"` (already true).
- Produces: `initTabs(doc, win)` returns `{ select(index, focus), showPanel(panelId, scroll) → boolean }`. `win` is optional (existing callers pass only `doc`). Any `a[href^="#panel-"]` on the page selects its panel on click, before the browser follows the link. Task 3 and Task 4 add such links.

- [ ] **Step 1: Write the failing tests**

In `tests/tabs.test.js`, give `el()` a scroll spy by adding `scrolled: false, scrollIntoView() { this.scrolled = true; },` to the returned object, and change `fakeDoc` to accept links:

```js
function fakeDoc(links = []) {
```

and its `querySelectorAll` to:

```js
    querySelectorAll(sel) { return sel === '.tab' ? buttons : sel === '.panel' ? panels : sel === 'a[href^="#panel-"]' ? links : []; },
```

Then append:

```js
function fakeWin(hash = '') {
  const listeners = {};
  return { location: { hash }, addEventListener(t, fn) { listeners[t] = fn; }, _fire(t) { listeners[t] && listeners[t](); } };
}

test('loading with a #panel- hash selects that tab and scrolls to it', () => {
  const doc = fakeDoc();
  tabs.initTabs(doc, fakeWin('#panel-copilot'));
  assert.deepEqual(doc._panels.map((p) => p.hidden), [true, false, true]);
  assert.ok(doc._panels[1].scrolled);
});

test('an unrelated or unknown hash keeps the first tab and does not scroll', () => {
  for (const hash of ['#about', '#panel-nope', '']) {
    const doc = fakeDoc();
    tabs.initTabs(doc, fakeWin(hash));
    assert.deepEqual(doc._panels.map((p) => p.hidden), [false, true, true], hash);
    assert.ok(doc._panels.every((p) => !p.scrolled), hash);
  }
});

test('hashchange to a panel selects it (back/forward navigation)', () => {
  const doc = fakeDoc();
  const win = fakeWin('');
  tabs.initTabs(doc, win);
  win.location.hash = '#panel-consommi';
  win._fire('hashchange');
  assert.equal(doc._buttons[2].getAttribute('aria-selected'), 'true');
  assert.ok(doc._panels[2].scrolled);
});

test('a link to a panel shows it on click, even when the hash is already set', () => {
  const link = el({ href: '#panel-copilot' });
  const doc = fakeDoc([link]);
  tabs.initTabs(doc, fakeWin('#panel-copilot'));
  doc._buttons[0].fire('click');
  assert.equal(doc._panels[1].hidden, true, 'user switched away manually');
  link.fire('click');
  assert.equal(doc._panels[1].hidden, false, 'same-hash click still shows the panel');
});

test('showPanel returns false for an unknown panel id', () => {
  const api = tabs.initTabs(fakeDoc());
  assert.equal(api.showPanel('panel-nope', false), false);
  assert.equal(api.showPanel('panel-copilot', false), true);
});
```

- [ ] **Step 2: Run to verify they fail**

Run: `node --test tests/tabs.test.js`
Expected: the five new tests FAIL (hash ignored, `showPanel` undefined); the old five pass.

- [ ] **Step 3: Implement** in `js/tabs.js`

Change the signature to `function initTabs(doc, win) {`. Replace the lines from `panels.forEach(function (panel) { panel.setAttribute('tabindex', '0'); });` to `return { select: select };` with:

```js
    panels.forEach(function (panel) { panel.setAttribute('tabindex', '0'); });

    function showPanel(id, scroll) {
      for (var i = 0; i < tabs.length; i++) {
        if (tabs[i].getAttribute('data-panel') !== id) continue;
        select(i, false);
        var panel = panelFor(tabs[i]);
        if (scroll && panel && panel.scrollIntoView) panel.scrollIntoView();
        return true;
      }
      return false;
    }

    // Links elsewhere on the page (Experience, Skills) point at a panel. Show it
    // on click, before the browser follows the link, so the jump lands on a
    // visible panel even when the hash is already set.
    Array.prototype.slice.call(doc.querySelectorAll('a[href^="#panel-"]')).forEach(function (link) {
      link.addEventListener('click', function () { showPanel(link.getAttribute('href').slice(1), false); });
    });

    select(0, false);

    // A shared link or back/forward navigation to #panel-… selects that panel.
    if (win) {
      var fromHash = function () {
        var hash = win.location && win.location.hash;
        if (hash && hash.indexOf('#panel-') === 0) showPanel(hash.slice(1), true);
      };
      fromHash();
      win.addEventListener('hashchange', fromHash);
    }
    return { select: select, showPanel: showPanel };
```

Change the browser bootstrap line `initTabs(root.document);` to `initTabs(root.document, root);`. Update the header comment's first sentence to: `// Selected-work tabs. Progressive enhancement: without JavaScript every panel` (unchanged) and add a final line to that comment block: `// Links and hashes pointing at #panel-… select the matching tab.`

- [ ] **Step 4: Run to verify they pass**

Run: `node --test tests/tabs.test.js`
Expected: 10 pass.

- [ ] **Step 5: Commit**

```bash
git add js/tabs.js tests/tabs.test.js
git commit -m "Tabs: links and hashes pointing at a panel select its tab"
```

---

### Task 3: Experience without repeated detail

**Files:**
- Modify: `index.html` (the four `<article class="engagement">` blocks inside `#experience`)
- Modify: `css/styles.css` (after `.engagement .tags { … }`)
- Test: `tests/content.test.js` (append)

**Interfaces:**
- Consumes: Task 2 click/hash handling for `a[href^="#panel-"]`; panel ids `panel-webportal`, `panel-travelapp`, `panel-industrial`, `panel-copilot`.
- Produces: `.engagement__summary`, `.engagement__more` classes.

- [ ] **Step 1: Write the failing test** (append)

```js
test('index.html: Experience engagements carry a summary and a link to their panel, no repeated bullets', () => {
  const html = readHtml('index.html');
  const exp = html.slice(html.indexOf('<section id="experience"'), html.indexOf('</section>', html.indexOf('<section id="experience"')));
  const engagements = exp.split('<article class="engagement">').slice(1).map((s) => s.slice(0, s.indexOf('</article>')));
  assert.equal(engagements.length, 4);
  const targets = [];
  for (const e of engagements) {
    assert.doesNotMatch(e, /class="bullets"/, 'detail lives in Selected work');
    assert.match(e, /<p class="engagement__summary">[^<]{20,}<\/p>/);
    const m = e.match(/<a class="engagement__more" href="#(panel-[a-z]+)">Details<span class="visually-hidden"> on [^<]+<\/span> in Selected work<span aria-hidden="true"> →<\/span><\/a>/);
    assert.ok(m, 'details link with a hidden project name');
    assert.ok(html.includes(`<article class="panel" id="${m[1]}">`), `${m[1]} exists`);
    targets.push(m[1]);
  }
  assert.deepEqual(targets.sort(), ['panel-copilot', 'panel-industrial', 'panel-travelapp', 'panel-webportal']);
});
```

- [ ] **Step 2: Run to verify it fails**

Run: `node --test tests/content.test.js`
Expected: FAIL "detail lives in Selected work".

- [ ] **Step 3: Implement**

In `index.html`, in each engagement replace the whole `<ul class="bullets">…</ul>` with a summary and link. Keep the `<h4>` and tag list unchanged.

Industrial control platform:
```html
              <p class="engagement__summary">Current engagement: fullstack development on a control platform for an industrial electronics manufacturer.</p>
              <a class="engagement__more" href="#panel-industrial">Details<span class="visually-hidden"> on the industrial control platform</span> in Selected work<span aria-hidden="true"> →</span></a>
```

Copilot Studio pilot:
```html
              <p class="engagement__summary">Helped business users adopt Copilot Studio for AI workflow automation; productive in the new stack within weeks and owner of the documentation.</p>
              <a class="engagement__more" href="#panel-copilot">Details<span class="visually-hidden"> on the Copilot Studio pilot</span> in Selected work<span aria-hidden="true"> →</span></a>
```

T WebPortal:
```html
              <p class="engagement__summary">Backend development and maintenance in an agile, cross-functional team, plus release testing, onboarding and team practice.</p>
              <a class="engagement__more" href="#panel-webportal">Details<span class="visually-hidden"> on T WebPortal</span> in Selected work<span aria-hidden="true"> →</span></a>
```

Travel App:
```html
              <p class="engagement__summary">Internal tool for business-travel requests and approvals, built by a team of two to four; principal developer and Scrum Master.</p>
              <a class="engagement__more" href="#panel-travelapp">Details<span class="visually-hidden"> on the Travel App</span> in Selected work<span aria-hidden="true"> →</span></a>
```

In `css/styles.css`, after `.engagement .tags { margin-bottom: var(--space-3); }` add:

```css
.engagement__summary { max-width: var(--measure); margin-bottom: var(--space-2); }
.engagement__more { font-size: var(--text-small); font-weight: 600; }
```

- [ ] **Step 4: Run to verify it passes**

Run: `node --test`
Expected: all pass (`TravelEase` is still in the Dotcom entry; `REQUIRED_INDEX` intact).

- [ ] **Step 5: Commit**

```bash
git add index.html css/styles.css tests/content.test.js
git commit -m "Experience: one summary per engagement with a link to its Selected work panel"
```

---

### Task 4: Skills with evidence

**Files:**
- Modify: `index.html` (the four `<article class="skill-group…">` blocks)
- Modify: `css/styles.css` (skills block around line 528, and the `@media (max-width: 900px)` block)
- Test: `tests/content.test.js`, `tests/css.test.js` (append)

**Interfaces:**
- Consumes: Task 2 panel link handling; panel ids as in Task 3.
- Produces: `.skill-group__meta`, `.skill-group__meta--learning`, `.skill-group__label`.

- [ ] **Step 1: Write the failing tests**

Append to `tests/content.test.js`:

```js
test('index.html: every skill group says where it was used; training-only items sit on a Learning line', () => {
  const html = readHtml('index.html');
  const skills = html.slice(html.indexOf('<section id="skills"'), html.indexOf('<section id="experience"'));
  const groups = skills.split('<article class="skill-group').slice(1).map((s) => s.slice(0, s.indexOf('</article>')));
  assert.equal(groups.length, 4);
  for (const g of groups) {
    const used = g.match(/<p class="skill-group__meta"><span class="skill-group__label">Used in<\/span>([\s\S]*?)<\/p>/);
    assert.ok(used, 'Used in line present');
    const hrefs = [...used[1].matchAll(/href="#([^"]+)"/g)].map((m) => m[1]);
    assert.ok(hrefs.length >= 1, 'at least one project link');
    for (const id of hrefs) assert.ok(html.includes(`<article class="panel" id="${id}">`), `#${id} exists`);
  }
  const [, cloud, devops] = groups;
  const list = (g) => g.slice(g.indexOf('<ul class="tags">'), g.indexOf('</ul>'));
  const learning = (g) => (g.match(/<p class="skill-group__meta skill-group__meta--learning"><span class="skill-group__label">Learning<\/span>([^<]*)<\/p>/) || [])[1] || '';
  for (const item of ['Azure Landing Zones', 'Governance &amp; security']) {
    assert.ok(!list(cloud).includes(item) && learning(cloud).includes(item), `${item} is on the Learning line`);
  }
  for (const item of ['Terraform', 'OpenTofu', 'Azure Verified Modules']) {
    assert.ok(!list(devops).includes(item) && learning(devops).includes(item), `${item} is on the Learning line`);
  }
  assert.ok(list(devops).includes('Kubernetes'), 'Kubernetes stays: used on AKS');
});
```

Append to `tests/css.test.js`:

```js
test('skill meta lines sit in the list column and fall back to one column on narrow screens', () => {
  const s = css();
  assert.match(s, /\.skill-group > \.skill-group__meta\s*{[^}]*grid-column:\s*2/);
  const narrow = s.slice(s.indexOf('@media (max-width: 900px)'), s.indexOf('@media (max-width: 640px)'));
  assert.match(narrow, /\.skill-group > \.skill-group__meta\s*{[^}]*grid-column:\s*auto/);
});
```

- [ ] **Step 2: Run to verify they fail**

Run: `node --test tests/content.test.js tests/css.test.js`
Expected: both new tests FAIL.

- [ ] **Step 3: Implement**

Replace the four skill-group articles in `index.html` with:

```html
        <article class="skill-group skill-group--primary">
          <h3>Backend Engineering <span class="status status--core">Core</span></h3>
          <ul class="tags">
            <li>Java</li><li>Spring Boot</li><li>Quarkus</li><li>REST APIs</li><li>GraphQL</li><li>MySQL / SQL</li><li>API design</li><li>Microservice-oriented architecture</li>
          </ul>
          <p class="skill-group__meta"><span class="skill-group__label">Used in</span> <a href="#panel-webportal">T WebPortal</a> · <a href="#panel-travelapp">Travel App</a> · <a href="#panel-industrial">Industrial control platform</a></p>
        </article>
        <article class="skill-group">
          <h3>Cloud &amp; Architecture <span class="status status--growing">Growing</span></h3>
          <ul class="tags">
            <li>Microsoft Azure</li><li>Azure Kubernetes Service</li>
          </ul>
          <p class="skill-group__meta"><span class="skill-group__label">Used in</span> <a href="#panel-webportal">T WebPortal</a> · <a href="#panel-travelapp">Travel App</a></p>
          <p class="skill-group__meta skill-group__meta--learning"><span class="skill-group__label">Learning</span> Azure Landing Zones, Virtual WAN &amp; hub-and-spoke, Site-to-Site VPN, Private Endpoints &amp; Private DNS, Governance &amp; security</p>
        </article>
        <article class="skill-group">
          <h3>DevOps / Infrastructure as Code</h3>
          <ul class="tags">
            <li>Docker</li><li>Kubernetes</li><li>GitLab CI/CD</li><li>GitHub Actions</li><li>ArgoCD</li>
          </ul>
          <p class="skill-group__meta"><span class="skill-group__label">Used in</span> <a href="#panel-webportal">T WebPortal</a> · <a href="#panel-travelapp">Travel App</a> · this site's GitHub Actions deploy</p>
          <p class="skill-group__meta skill-group__meta--learning"><span class="skill-group__label">Learning</span> Terraform, OpenTofu, Azure Verified Modules</p>
        </article>
        <article class="skill-group">
          <h3>AI-Assisted Development <span class="status status--growing">Growing</span></h3>
          <ul class="tags">
            <li>Claude Code</li><li>Agentic coding</li><li>Microsoft Copilot Studio</li><li>Power Automate</li><li>Power Platform</li>
          </ul>
          <p class="skill-group__meta"><span class="skill-group__label">Used in</span> <a href="#panel-webportal">T WebPortal</a> · <a href="#panel-copilot">Copilot Studio pilot</a></p>
        </article>
```

In `css/styles.css`, after `.skill-group .tags li:last-child::after { content: ""; }` add:

```css
.skill-group > .skill-group__meta { grid-column: 2; margin: 0; font-size: var(--text-small); color: var(--text-muted); }
.skill-group__label {
  margin-right: var(--space-2);
  font-size: var(--text-label);
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text);
}
```

In the `@media (max-width: 900px)` block, after `.skill-group { grid-template-columns: 1fr; gap: var(--space-2); }` add:

```css
  .skill-group > .skill-group__meta { grid-column: auto; }
```

- [ ] **Step 4: Run to verify they pass**

Run: `node --test`
Expected: all pass (the existing "skill groups in the required order" and status-token tests are unaffected).

- [ ] **Step 5: Commit**

```bash
git add index.html css/styles.css tests/content.test.js tests/css.test.js
git commit -m "Skills: each group links to the projects it was used in; training-only items on a Learning line"
```

---

### Task 5: "How I work" strengths in About

**Files:**
- Modify: `index.html` (`#about` sheet)
- Modify: `css/styles.css` (after `.about__text { … }`, and the 900px block)
- Test: `tests/content.test.js` (append)

**Interfaces:**
- Consumes: nothing.
- Produces: `.strengths`, `.strengths__title` classes.

- [ ] **Step 1: Write the failing test** (append)

```js
test('index.html: About keeps two paragraphs, a lead-in and four How-I-work strengths', () => {
  const html = readHtml('index.html');
  const about = html.slice(html.indexOf('<section id="about"'), html.indexOf('<section id="work"'));
  const text = about.slice(about.indexOf('<div class="about__text">'), about.indexOf('<ul class="strengths"'));
  assert.equal((text.match(/<p>/g) || []).length, 3, 'two paragraphs plus the lead-in');
  assert.match(about, /<p>Curious, proactive and pragmatic; I prefer maintainable solutions and small, shippable steps\.<\/p>/);
  const titles = [...about.matchAll(/<h3 class="strengths__title">([^<]+)<\/h3>/g)].map((m) => m[1]);
  assert.deepEqual(titles, ['Release quality', 'Onboarding &amp; documentation', 'Team practice', 'Stepping in']);
  assert.match(about, /<ul class="strengths" aria-label="How I work">/);
});
```

- [ ] **Step 2: Run to verify it fails**

Run: `node --test tests/content.test.js`
Expected: FAIL (no lead-in, no strengths list).

- [ ] **Step 3: Implement**

In `index.html`, replace the third About paragraph (`<p>I am curious, proactive and pragmatic. …</p>`) with the lead-in, and add the list after the closing `</div>` of `.about__text` (still inside the sheet):

```html
          <p>Curious, proactive and pragmatic; I prefer maintainable solutions and small, shippable steps.</p>
        </div>
        <ul class="strengths" aria-label="How I work">
          <li><h3 class="strengths__title">Release quality</h3><p>Release testing before major deployments, and testing features alongside the team's testers.</p></li>
          <li><h3 class="strengths__title">Onboarding &amp; documentation</h3><p>Onboarded a backend colleague; owned the step-by-step guides on the Copilot Studio pilot.</p></li>
          <li><h3 class="strengths__title">Team practice</h3><p>Hosted retrospectives and knowledge sharing; Scrum Master on the Travel App.</p></li>
          <li><h3 class="strengths__title">Stepping in</h3><p>Covered frontend work when the team needed it; productive in a new stack within weeks.</p></li>
        </ul>
```

(The existing `</div>` that closed `.about__text` is the one shown above; do not leave a duplicate.)

In `css/styles.css`, after `.about__text { max-width: var(--measure); }` add:

```css
.strengths {
  list-style: none;
  margin: var(--space-6) 0 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--space-5) var(--space-6);
}
.strengths li { border-top: 2px solid var(--accent); padding-top: var(--space-3); }
.strengths__title { font-size: 1.0625rem; margin-bottom: var(--space-1); }
.strengths p { margin: 0; font-size: var(--text-small); color: var(--text-muted); }
```

In the `@media (max-width: 900px)` block add `  .strengths { grid-template-columns: 1fr; }`.

The accent top rule is `--accent`, whose contrast is already test-guarded on every surface; no new tokens.

- [ ] **Step 4: Run to verify it passes**

Run: `node --test`
Expected: all pass (the "About is prose only" test checks only for `<dl class="fields">`).

- [ ] **Step 5: Commit**

```bash
git add index.html css/styles.css tests/content.test.js
git commit -m "About: two paragraphs, a lead-in and four How I work strengths"
```

---

### Task 6: Merge Learning into Education; docs

**Files:**
- Modify: `index.html` (nav list, remove `#learning`, rebuild `#education`)
- Modify: `css/styles.css:505` (`.education`)
- Modify: `tests/content.test.js:24` and `:265-269`, `tests/nav.test.js` (last test)
- Modify: `DESIGN.md` (Navigation, Learning Columns, Timeline, Skills Table, About sections), `.impeccable/surfaces/index-html.md`, `.impeccable/index-brief-body.md`

**Interfaces:**
- Consumes: nothing.
- Produces: final nav of six links: About · Work · Skills · Experience · Education · Contact.

- [ ] **Step 1: Update the tests first**

In `tests/content.test.js` set:

```js
const SECTION_IDS = ['about', 'work', 'skills', 'experience', 'education', 'contact'];
```

Replace the test `'index.html: learning items carry status tokens'` with:

```js
test('index.html: Education holds the degree and the certification lists with status tokens', () => {
  const html = readHtml('index.html');
  assert.doesNotMatch(html, /id="learning"|href="#learning"/);
  const edu = html.slice(html.indexOf('<section id="education"'), html.indexOf('<section id="contact"'));
  assert.match(edu, /<span id="education-title">Education &amp; <span class="accent">certifications\.<\/span><\/span>/);
  assert.ok(edu.indexOf('ESPRIT') < edu.indexOf('Certifications and training'), 'degree first');
  assert.match(edu, /<h3>Certifications and training <span class="status status--done">Completed<\/span><\/h3>/);
  assert.match(edu, /<h3>Currently learning <span class="status status--growing">In progress<\/span><\/h3>/);
});
```

In `tests/nav.test.js`, in the last test replace `assert.ok(hrefs.length >= 7);` with:

```js
  assert.deepEqual(hrefs, ['about', 'work', 'skills', 'experience', 'education', 'contact']);
```

- [ ] **Step 2: Run to verify they fail**

Run: `node --test tests/content.test.js tests/nav.test.js`
Expected: FAIL (learning nav link and section still present).

- [ ] **Step 3: Implement**

In `index.html`: delete the nav item `<li><a class="site-nav__link" href="#learning">Learning</a></li>` and the whole `<section id="learning" …>…</section>`. Replace the `#education` section with:

```html
    <section id="education" class="section section--alt" aria-labelledby="education-title">
      <h2><span id="education-title">Education &amp; <span class="accent">certifications.</span></span> <a class="heading-anchor" href="#education" aria-label="Link to Education & certifications">#</a></h2>
      <div class="education">
        <div class="education__degree">
          <p><strong>Master's degree in Cloud Computing</strong> · ESPRIT, Tunis · 2022</p>
          <p>Foundations in software engineering, cloud computing, distributed systems, databases, containerisation, deployment and modern software architecture.</p>
        </div>
        <div class="learning">
          <div class="learning__column">
            <h3>Certifications and training <span class="status status--done">Completed</span></h3>
            <ul class="bullets">
              <li>Microsoft Azure Fundamentals (AZ-900)</li>
              <li>Microsoft Copilot Studio &amp; Power Platform training</li>
              <li>Microsoft Agent Academy</li>
              <li>MaibornWolff Agentic AI training</li>
              <li>Agentic Coding School</li>
            </ul>
          </div>
          <div class="learning__column">
            <h3>Currently learning <span class="status status--growing">In progress</span></h3>
            <ul class="bullets">
              <li>CKA and CKAD preparation</li>
              <li>Terraform / OpenTofu</li>
              <li>Azure Landing Zones and Azure Verified Modules</li>
              <li>Azure networking, governance and security</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
```

In `css/styles.css`, replace `.education { max-width: 62ch; }` with:

```css
.education__degree { max-width: 62ch; margin-bottom: var(--space-6); }
```

Section tones still alternate: about (alt), work, skills (alt), experience, education (alt), contact.

- [ ] **Step 4: Run to verify they pass**

Run: `node --test`
Expected: all pass.

- [ ] **Step 5: Update the design docs**

`DESIGN.md`:
- Navigation: "eight anchors" → "six anchors (About, Work, Skills, Experience, Education, Contact)".
- Rename "### Learning Columns" to "### Education & Certifications" and change its text to: "The degree first, capped at 62ch, then two columns on the bare page ground, no sheet, each opening with a 2px ink rule, a title with a status token and a bullet list. Only the Education section uses a 2px ink rule as a heading device; the About strengths use a 2px accent rule."
- Timeline: replace "their own heading, date span, chips and bullets" with "their own heading, date span, chips, a one-line summary and a 'Details in Selected work' link to the matching panel; project detail lives only in the work sheet".
- Skills Table: append "Under the list, a small muted 'Used in' line links to the projects where the group was used, and groups with training-only items add a 'Learning' line, so used and studied are never mixed."
- About section (the paragraph starting "No boxes, no field rows"): replace with "Two paragraphs and a one-line lead-in on a padded white sheet, followed by the four 'How I work' strengths in a 2×2 grid (one column under 900px), each under a 2px accent rule with a title and one muted line. No icons, no cards."
- Hero: in the section that describes the hero text, add "Order: small uppercase role eyebrow, the two-tone name, the Gabarito claim line ('Backend services that reach production, and the platform under them.'), then the muted statement and the actions."

Append this line to both `.impeccable/surfaces/index-html.md` and `.impeccable/index-brief-body.md`:

```
Round 5 (2026-09-25, user): hero gains a claim line under the name; project detail lives only in the work sheet (Experience links to panels); skills show where each group was used, with training-only items on a Learning line; About adds four How I work strengths; Learning merged into Education (six nav anchors). Spec: docs/superpowers/specs/2026-09-25-portfolio-v5-design.md.
```

- [ ] **Step 6: Commit**

```bash
git add index.html css/styles.css tests/content.test.js tests/nav.test.js DESIGN.md .impeccable/surfaces/index-html.md .impeccable/index-brief-body.md
git commit -m "Education and certifications merged into one section; six nav anchors; design docs updated"
```

---

### Task 7: Full verification

**Files:** none modified unless a check fails.

- [ ] **Step 1: Automated checks**

Run: `scripts/check.sh`
Expected: `== all checks passed ==` (node tests plus html-validate on both pages).

- [ ] **Step 2: Screenshots**

Run: `scripts/screenshots.sh`
Expected: PNGs in `.qa/` for index and cv at 1440/390/320, light and dark, with no horizontal overflow reported. Open `index-1440-light.png`, `index-390-light.png`, `index-1440-dark.png` and check: claim line sits between name and statement; skill meta lines align under the list column on desktop and stack on mobile; strengths are 2×2 on desktop and one column on mobile; Experience engagements show summary + link; Education shows degree above the two columns.

- [ ] **Step 3: Print**

Run: `scripts/print-check.sh`
Expected: passes as before.

- [ ] **Step 4: Manual link behaviour**

Run: `python3 -m http.server 8088` and open `http://localhost:8088/#panel-copilot`: the Copilot tab is selected and in view. Click the Work tab "T WebPortal", scroll to Experience, click the Copilot "Details" link: the Copilot panel shows. Stop the server.

- [ ] **Step 5: Name scan**

Run: `git log origin/main..HEAD --format='%B' | grep -ciE 'co-authored|claude'` → expected `0`.
Scan the repo for any outside-portfolio names you know from the conversation using `git grep -niE '<names>'` in your shell only; never write the pattern into a file. Expected: no output.

- [ ] **Step 6: Report**

Tell Nawres the checks passed, attach the three screenshots, and ask for approval before pushing.
