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
  assert.match(html, /<script src="js\/theme\.js" defer><\/script>/);
  assert.match(html, /<script src="js\/nav\.js" defer><\/script>/);
  assert.match(html, /<link rel="stylesheet" href="css\/styles\.css">/);
  assert.match(html, /<img[^>]*class="hero__photo"[^>]*alt="Portrait of Nawres Ben Rhouma"/);
});

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
  assert.ok((html.match(/class="cv-entry\b/g) || []).length >= 5, 'at least five cv-entry articles');
  assert.match(html, /<a class="button button--ghost" href="index\.html">/);
});

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
test('index.html: hero identity reads as reference field rows', () => {
  const html = readHtml('index.html');
  assert.match(html, /<dl class="hero__fields">/);
  assert.match(html, /<dt>Role<\/dt>\s*<dd>Software Engineer at MaibornWolff<\/dd>/);
  assert.match(html, /<dt>Availability<\/dt>\s*<dd>Based in Tunis · Open to remote, part-time roles<\/dd>/);
  assert.doesNotMatch(html, /hero__role|hero__availability/);
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
