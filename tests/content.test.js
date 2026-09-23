const test = require('node:test');
const assert = require('node:assert/strict');
const { readHtml, readFile } = require('./helpers');

const REQUIRED_INDEX = [
  'Nawres Ben Rhouma',
  'Software Engineer at MaibornWolff',
  'Backend Software Engineer with Java expertise, expanding into Cloud &amp; Platform Engineering and AI-assisted development.',
  'Based in Tunis · Open to remote, part-time roles',
  'mailto:benrhoumanawres7@gmail.com',
  'https://www.linkedin.com/in/nawres-ben-rhouma21/',
  'https://github.com/nawresbenrhouma',
  'Tunis, Tunisia · remote',
  'Techem WebPortal',
  'Beiersdorf',
  'Consommi Tounsi',
  'TravelEase',
  'AZ-900',
  'ESPRIT',
  'Master',
];

const SECTION_IDS = ['about', 'work', 'skills', 'experience', 'projects', 'learning', 'education', 'contact'];

for (const page of ['index.html', 'cv.html']) {
  test(`${page}: forbidden content absent`, () => {
    const html = readHtml(page);
    assert.doesNotMatch(html, /junior/i, 'the word Junior must not appear');
    assert.doesNotMatch(html, /\.pdf\b/i, 'no PDF references');
    assert.doesNotMatch(html, /\s(href|src)="\/(?!\/)/, 'no root-relative URLs');
    // Only loaded resources count: scripts, stylesheets and preconnects. Canonical / Open Graph URLs are metadata.
    const external = [...html.matchAll(/<(?:script[^>]*\ssrc|link[^>]*rel="(?:stylesheet|preconnect)"[^>]*\shref)="(https?:[^"]+)"/g)].map((m) => m[1]);
    for (const url of external) {
      assert.match(url, /^https:\/\/fonts\.g(oogleapis|static)\.com(\/|$)/, `unexpected external resource ${url}`);
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
    const pos = html.indexOf(`<h3>${g}`);
    assert.ok(pos > last, `skill group "${g}" missing or out of order`);
    last = pos;
  }
});

test('index.html: enhancement hooks present', () => {
  const html = readHtml('index.html');
  assert.match(html, /<button[^>]*data-theme-toggle[^>]*hidden/);
  assert.match(html, /<script src="js\/tabs\.js" defer><\/script>/);
  assert.match(html, /<script src="js\/theme\.js" defer><\/script>/);
  assert.match(html, /<script src="js\/nav\.js" defer><\/script>/);
  assert.match(html, /<link rel="stylesheet" href="css\/styles\.css">/);
});

test('cv.html: required facts and structure present', () => {
  const html = readHtml('cv.html');
  for (const s of [
    'Nawres Ben Rhouma',
    'Software Engineer at MaibornWolff',
    'benrhoumanawres7@gmail.com',
    'linkedin.com/in/nawres-ben-rhouma21',
    'github.com/nawresbenrhouma',
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
  assert.ok((html.match(/class="cv-entry\b/g) || []).length >= 5, 'at least five cv-entry articles');
  assert.match(html, /<a class="button button--ghost" href="index\.html">/);
});

test('index.html: Open Graph and canonical tags', () => {
  const html = readHtml('index.html');
  const base = 'https://nawresbenrhouma.github.io/portfolio/';
  assert.match(html, new RegExp(`<link rel="canonical" href="${base}">`));
  assert.match(html, /<meta property="og:title" content="Nawres Ben Rhouma · Backend Software Engineer">/);
  assert.match(html, /<meta property="og:description" content="[^"]+">/);
  assert.match(html, new RegExp(`<meta property="og:image" content="${base}assets/og.png">`));
  assert.match(html, /<meta name="twitter:card" content="summary_large_image">/);
  assert.ok(require('node:fs').existsSync(require('node:path').resolve(__dirname, '../assets/og.png')), 'assets/og.png missing');
});

// Findings from the technical audit (2026-09-23)
test('no-JS dark path: <html> carries no hard-coded data-theme', () => {
  for (const page of ['index.html', 'cv.html']) {
    assert.match(readHtml(page), /<html lang="en">/, `${page}: <html> must not preset data-theme`);
  }
});

test('index.html: skip link lands on main content, heading anchors have unique names', () => {
  const html = readHtml('index.html');
  assert.match(html, /<a class="skip-link" href="#top">/);
  const labels = [...html.matchAll(/class="heading-anchor"[^>]*aria-label="([^"]+)"/g)].map((m) => m[1]);
  assert.ok(labels.length >= 7);
  assert.equal(new Set(labels).size, labels.length, 'duplicate heading-anchor labels');
});

test('cv.html: nested engagements are h4 under the h3 employer entry', () => {
  const html = readHtml('cv.html');
  assert.match(html, /cv-entry--nested">\s*<header class="cv-entry__head">\s*<h4>Techem WebPortal/);
  assert.match(html, /cv-entry--nested">\s*<header class="cv-entry__head">\s*<h4>Beiersdorf/);
});

// Finish-review fixes (2026-09-23)
test('index.html: hero is a pill, two-line name, role line, statement, two actions and a facts card', () => {
  const html = readHtml('index.html');
  assert.match(html, /<p class="pill"><span class="pill__dot" aria-hidden="true"><\/span>Based in Tunis · Open to remote, part-time roles<\/p>/);
  assert.match(html, /<h1 id="hero-title">Nawres <span class="accent">Ben Rhouma\.<\/span><\/h1>/);
  assert.match(html, /<p class="hero__role">Software Engineer at MaibornWolff<\/p>/);
  assert.match(html, /<a class="button button--primary" href="#work">View work<\/a>/);
  assert.match(html, /<a class="button button--outline" href="mailto:benrhoumanawres7@gmail\.com">Get in touch<\/a>/);
  assert.match(html, /<dl class="facts-card">[\s\S]*<dt>Location<\/dt>\s*<dd>Tunis, Tunisia<\/dd>[\s\S]*<dt>Open to<\/dt>\s*<dd>Remote · part-time<\/dd>/);
  assert.match(html, /<section id="work" class="section section--work" aria-labelledby="work-title" data-reveal>/);
  assert.doesNotMatch(html, /button--mail/, 'no icon-only mail button any more');
});

test('index.html: section headings are two-tone with the accent on the closing words', () => {
  const html = readHtml('index.html');
  for (const [id, text] of [['about', 'growing outward.'], ['work', 'Selected work.'], ['contact', 'reliable.']]) {
    assert.match(html, new RegExp(`<h2 id="${id}-title">[^<]*<span class="accent">${text.replace('.', '\\.')}</span>`), `${id} heading`);
  }
});

test('index.html: About keeps the Role / Availability / Focus field rows', () => {
  const html = readHtml('index.html');
  const about = html.slice(html.indexOf('<section id="about"'), html.indexOf('<section id="skills"'));
  assert.match(about, /<dl class="fields">/);
  assert.match(about, /<dt>Role<\/dt>\s*<dd>Software Engineer at MaibornWolff<\/dd>/);
  assert.match(about, /<dt>Availability<\/dt>\s*<dd>Based in Tunis · Open to remote, part-time roles<\/dd>/);
});

test('index.html: selected-work tabs ship as plain markup; ARIA is added by JS', () => {
  const html = readHtml('index.html');
  const tabs = [...html.matchAll(/<button class="tab" type="button" id="tab-([a-z]+)" data-panel="panel-\1">([^<]+)<\/button>/g)];
  assert.deepEqual(tabs.map((m) => m[1]), ['techem', 'copilot', 'consommi']);
  assert.deepEqual(tabs.map((m) => m[2]), ['Techem WebPortal', 'Copilot Studio pilot', 'Consommi Tounsi']);
  assert.match(html, /<div class="tabs__list" data-tablist-label="Selected work">/);
  for (const id of ['techem', 'copilot', 'consommi']) {
    assert.match(html, new RegExp(`<article class="panel" id="panel-${id}">`), `panel ${id}`);
  }
  assert.doesNotMatch(html, /role="tab(list|panel)?"|aria-selected|aria-controls/, 'no static tab ARIA: it is inert without JS');
  assert.match(html, /<script src="js\/tabs\.js" defer><\/script>/);
});

test('index.html: project notes are native expandable entries with real headings', () => {
  const html = readHtml('index.html');
  const notes = [...html.matchAll(/<details class="note">\s*<summary><h3 class="note__heading">/g)];
  assert.equal(notes.length, 4, 'every note summary carries an h3 so heading navigation reaches the projects');
  assert.match(html, /<h3 class="note__heading"><span class="note__title">TravelEase<\/span>/);
});

test('index.html: no invented numbers in the work sheet', () => {
  const html = readHtml('index.html');
  const start = html.indexOf('<section id="work"');
  const work = html.slice(start, html.indexOf('<section id="skills"'));
  assert.ok(start > 0 && work.length > 500, 'work section not found: the guard would assert nothing');
  assert.doesNotMatch(work, /\b\d{2,3}(,\d{3})?\s*(users|services|microservices|%|engineers)\b/i);
});

test('index.html: skills are typed rows with status tokens, no relocated eyebrows', () => {
  const html = readHtml('index.html');
  assert.doesNotMatch(html, /skill-group__lead/);
  assert.match(html, /<h3>Backend Engineering <span class="status status--core">Core<\/span><\/h3>/);
  assert.match(html, /<h3>Cloud &amp; Architecture <span class="status status--growing">Growing<\/span><\/h3>/);
  assert.match(html, /<h3>AI-Assisted Development <span class="status status--growing">Growing<\/span><\/h3>/);
  assert.match(html, /<h3>DevOps \/ Infrastructure as Code<\/h3>/);
});

test('index.html: learning items carry status tokens', () => {
  const html = readHtml('index.html');
  assert.match(html, /<h3>Certifications and training <span class="status status--done">Completed<\/span><\/h3>/);
  assert.match(html, /<h3>Currently learning <span class="status status--growing">In progress<\/span><\/h3>/);
});

// Whole-branch review fixes (2026-09-23)
test('index.html: skip link target is focusable', () => {
  assert.match(readHtml('index.html'), /<main id="top" tabindex="-1">/);
});

test('deploy workflow publishes only the site files', () => {
  const yml = readFile('.github/workflows/deploy.yml');
  assert.match(yml, /path:\s*_site/);
  assert.match(yml, /cp -r index\.html cv\.html css js assets \.nojekyll _site\//);
  assert.doesNotMatch(yml, /path:\s*\.\s*$/m);
});

test('plan document contains no broken node --test invocations', () => {
  const plan = readFile('docs/superpowers/plans/2026-09-23-portfolio-site.md');
  assert.doesNotMatch(plan, /node --test[a-z]/, 'node --test glued to a filename');
});

test('cv.html: indexable by search engines (user decision 2026-09-23)', () => {
  assert.doesNotMatch(readHtml('cv.html'), /<meta name="robots" content="noindex">/);
});

test('index.html: no portrait on the page and no photo files shipped', () => {
  const html = readHtml('index.html');
  assert.doesNotMatch(html, /hero__photo|photo-\d+\.jpg|photo-placeholder/);
  const fs = require('node:fs'); const path = require('node:path');
  for (const f of ['assets/photo-480.jpg', 'assets/photo-768.jpg', 'assets/photo.jpg', 'docs/photo-original.jpg']) {
    assert.ok(!fs.existsSync(path.resolve(__dirname, '..', f)), `${f} must not exist`);
  }
});
