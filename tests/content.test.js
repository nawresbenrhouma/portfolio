const test = require('node:test');
const assert = require('node:assert/strict');
const { readHtml, readFile } = require('./helpers');

const REQUIRED_INDEX = [
  'Nawres Ben Rhouma',
  'Backend Software Engineer with Java expertise, expanding into Cloud &amp; Platform Engineering and AI-assisted development.',
  'Based in Tunis<br>Open to remote, part-time roles',
  'mailto:benrhoumanawres7@gmail.com',
  'https://www.linkedin.com/in/nawres-ben-rhouma21/',
  'https://github.com/nawresbenrhouma',
  'Tunis, Tunisia · remote',
  'T WebPortal',
  'Copilot Studio pilot',
  'Travel App',
  'Industrial control platform',
  'TravelEase',
  'AZ-900',
  'ESPRIT',
  'Master',
];

const SECTION_IDS = ['about', 'work', 'skills', 'experience', 'education', 'contact'];

for (const page of ['index.html', 'cv.html']) {
  test(`${page}: forbidden content absent`, () => {
    const html = readHtml(page);
    assert.doesNotMatch(html, /junior/i, 'the word Junior must not appear');
    assert.doesNotMatch(html, /Techem|Beiersdorf|MSR-Electronic|MSR PolyCTRL|PolyCTRL/, 'customer names are not published');
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
  assert.doesNotMatch(html, /Techem|Beiersdorf|MSR-Electronic|PolyCTRL/, 'customer names are not published');
  for (const s of [
    'Nawres Ben Rhouma',
    'Software Engineer at MaibornWolff',
    'benrhoumanawres7@gmail.com',
    'linkedin.com/in/nawres-ben-rhouma21',
    'github.com/nawresbenrhouma',
    'Tunis, Tunisia · remote',
    'Open to remote, part-time roles',
    'T WebPortal',
    'Travel App',
    'Industrial control platform',
    'Copilot Studio pilot',
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
  assert.equal(labels.length, 6);
  assert.equal(new Set(labels).size, labels.length, 'duplicate heading-anchor labels');
});

test('cv.html: nested engagements are h4 under the h3 employer entry', () => {
  const html = readHtml('cv.html');
  assert.match(html, /cv-entry--nested">\s*<header class="cv-entry__head">\s*<h4>T WebPortal/);
  assert.match(html, /cv-entry--nested">\s*<header class="cv-entry__head">\s*<h4>Industrial control platform/);
  assert.match(html, /cv-entry--nested">\s*<header class="cv-entry__head">\s*<h4>Copilot Studio pilot/);
});

// Finish-review fixes (2026-09-23)
test('index.html: hero is a two-line name, role, statement, actions and a green facts panel', () => {
  const html = readHtml('index.html');
  assert.doesNotMatch(html, /class="pill"/, 'no availability pill; availability lives in the panel');
  assert.match(html, /<h1 id="hero-title">Nawres <span class="accent">Ben Rhouma\.<\/span><\/h1>/);
  assert.match(html, /<p class="hero__role">Software Engineer<\/p>/);
  assert.match(html, /<a class="button button--primary" href="#work">View work<\/a>/);
  assert.match(html, /<a class="button button--outline" href="assets\/Nawres_Ben_Rhouma_CV\.pdf" download>Download CV<\/a>/);
  assert.ok(require('node:fs').existsSync(require('node:path').resolve(__dirname, '../assets/Nawres_Ben_Rhouma_CV.pdf')), 'CV PDF ships');
  assert.match(html, /<a class="site-header__brand" href="#top" aria-label="Nawres Ben Rhouma, home">NB\.<\/a>/, 'header shows a monogram, not the full name twice');
  assert.match(html, /<aside class="panel-green" aria-label="At a glance">/);
  assert.match(html, /<dl class="glance">\s*<dt>Availability<\/dt>\s*<dd>Based in Tunis<br>Open to remote, part-time roles<\/dd>\s*<dt>Working on<\/dt>\s*<dd>Software development · Azure platform · AI-assisted development<\/dd>\s*<\/dl>/, 'two pairs only, no Since');
  assert.doesNotMatch(html.slice(html.indexOf('<dl class="glance">'), html.indexOf('</dl>', html.indexOf('<dl class="glance">'))), /Tunis, Tunisia/, 'location is stated once in the panel');
  assert.match(html, /<div class="panel-green__links">[\s\S]*iconlink[\s\S]*<\/div>/, 'GitHub and LinkedIn live in the panel');
  assert.match(html, /<section id="work" class="section section--work" aria-labelledby="work-title">/);
  assert.doesNotMatch(html, /facts-card/);
});

test('index.html: section headings are two-tone with the accent on the closing words', () => {
  const html = readHtml('index.html');
  for (const [id, text] of [['about', 'growing outward.'], ['work', 'up close.'], ['contact', 'reliable.']]) {
    assert.match(html, new RegExp(`<h2><span id="${id}-title">[^<]*<span class="accent">${text.replace('.', '\\.')}</span>`), `${id} heading`);
  }
});

test('index.html: About is prose only; availability is stated once outside contact', () => {
  const html = readHtml('index.html');
  const about = html.slice(html.indexOf('<section id="about"'), html.indexOf('<section id="work"'));
  assert.doesNotMatch(about, /<dl class="fields">/);
  const main = html.slice(html.indexOf('<main'), html.indexOf('<section id="contact"'));
  assert.equal((main.match(/Open to remote, part-time roles/g) || []).length, 1, 'availability said once before the contact section');
});

test('index.html: selected-work tabs ship as plain markup; ARIA is added by JS', () => {
  const html = readHtml('index.html');
  const tabs = [...html.matchAll(/<button class="tab" type="button" id="tab-([a-z]+)" data-panel="panel-\1">([^<]+)<\/button>/g)];
  assert.deepEqual(tabs.map((m) => m[1]), ['webportal', 'travelapp', 'industrial', 'copilot']);
  assert.deepEqual(tabs.map((m) => m[2]), ['T WebPortal', 'Travel App', 'Industrial control platform', 'Copilot Studio pilot']);
  assert.match(html, /<div class="tabs__list" data-tablist-label="Selected work">/);
  for (const id of ['webportal', 'travelapp', 'industrial', 'copilot']) {
    assert.match(html, new RegExp(`<article class="panel" id="panel-${id}">`), `panel ${id}`);
  }
  assert.doesNotMatch(html, /role="tab(list|panel)?"|aria-selected|aria-controls/, 'no static tab ARIA: it is inert without JS');
  assert.match(html, /<script src="js\/tabs\.js" defer><\/script>/);
});

test('index.html: no projects section; the work tabs carry the projects', () => {
  const html = readHtml('index.html');
  assert.doesNotMatch(html, /id="projects"|class="projects"|Other things I/);
  assert.doesNotMatch(html, /href="#projects"/);
});

test('index.html: section headings are two-tone with the accent on the closing words', () => {
  const html = readHtml('index.html');
  for (const [id, text] of [['about', 'growing outward.'], ['work', 'up close.'], ['contact', 'reliable.']]) {
    assert.match(html, new RegExp(`<h2><span id="${id}-title">[^<]*<span class="accent">${text.replace('.', '\\.')}</span>`), `${id} heading`);
  }
});

test('index.html: About is prose only; availability is stated once outside contact', () => {
  const html = readHtml('index.html');
  const about = html.slice(html.indexOf('<section id="about"'), html.indexOf('<section id="work"'));
  assert.doesNotMatch(about, /<dl class="fields">/);
  const main = html.slice(html.indexOf('<main'), html.indexOf('<section id="contact"'));
  assert.equal((main.match(/Open to remote, part-time roles/g) || []).length, 1, 'availability said once before the contact section');
});

test('index.html: selected-work tabs ship as plain markup; ARIA is added by JS', () => {
  const html = readHtml('index.html');
  const tabs = [...html.matchAll(/<button class="tab" type="button" id="tab-([a-z]+)" data-panel="panel-\1">([^<]+)<\/button>/g)];
  assert.deepEqual(tabs.map((m) => m[1]), ['webportal', 'travelapp', 'industrial', 'copilot']);
  assert.deepEqual(tabs.map((m) => m[2]), ['T WebPortal', 'Travel App', 'Industrial control platform', 'Copilot Studio pilot']);
  assert.match(html, /<div class="tabs__list" data-tablist-label="Selected work">/);
  for (const id of ['webportal', 'travelapp', 'industrial', 'copilot']) {
    assert.match(html, new RegExp(`<article class="panel" id="panel-${id}">`), `panel ${id}`);
  }
  assert.doesNotMatch(html, /role="tab(list|panel)?"|aria-selected|aria-controls/, 'no static tab ARIA: it is inert without JS');
  assert.match(html, /<script src="js\/tabs\.js" defer><\/script>/);
});

test('index.html: only the work sheet reveals; What-I-did columns carry drawn icons', () => {
  const html = readHtml('index.html');
  assert.equal((html.match(/ data-reveal>/g) || []).length, 1, 'one authored motion, on one element');
  assert.match(html, /<div class="work" data-reveal>/);
  assert.ok((html.match(/<svg class="col__icon"/g) || []).length >= 12, 'three drawn icons per panel');
  assert.equal((html.match(/<h4 class="panel__label">What I built<\/h4>/g) || []).length, 4, 'block named What I built');
  assert.ok((html.match(/<p class="col__intent">/g) || []).length >= 12, 'each column has a one-line intent');
});

test('index.html: GitHub and LinkedIn open in a new tab safely', () => {
  const html = readHtml('index.html');
  const ext = [...html.matchAll(/<a [^>]*href="https:\/\/(?:github\.com|www\.linkedin\.com)[^"]*"[^>]*>/g)].map((m) => m[0]);
  assert.ok(ext.length >= 4);
  for (const a of ext) {
    assert.match(a, /target="_blank"/, a);
    assert.match(a, /rel="[^"]*noopener[^"]*"/, a);
  }
});

test('index.html: contact form posts to Formspree, with a honeypot and a live status region', () => {
  const html = readHtml('index.html');
  assert.match(html, /<form class="contact-form" action="https:\/\/formspree\.io\/f\/[a-z0-9]{6,}" method="POST">/i, 'Formspree endpoint with a real form ID');
  for (const name of ['name', 'email', 'message']) assert.match(html, new RegExp(`<(input|textarea)[^>]*name="${name}"[^>]*required`), name);
  assert.match(html, /<input type="text" name="_gotcha" class="visually-hidden" tabindex="-1" autocomplete="off" aria-hidden="true">/, 'honeypot');
  assert.match(html, /<label for="cf-name">/);
  assert.match(html, /<button class="button button--primary" type="submit">Send message<\/button>/);
  assert.match(html, /<p class="contact-form__note" role="status" aria-live="polite">/);
  assert.match(html, /<script src="js\/form\.js" defer><\/script>/);
  assert.doesNotMatch(html, /action="mailto:/);
});

test('index.html: no invented numbers in the work sheet', () => {
  const html = readHtml('index.html');
  const start = html.indexOf('<section id="work"');
  const work = html.slice(start, html.indexOf('<section id="skills"'));
  assert.ok(start > 0 && work.length > 500, 'work section not found: the guard would assert nothing');
  assert.doesNotMatch(work, /Live since/, 'no production-date claim about the client system');
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

test('index.html: Education holds the degree and the certification lists with status tokens', () => {
  const html = readHtml('index.html');
  assert.doesNotMatch(html, /id="learning"|href="#learning"/);
  const edu = html.slice(html.indexOf('<section id="education"'), html.indexOf('<section id="contact"'));
  assert.match(edu, /<span id="education-title">Education &amp; <span class="accent">certifications\.<\/span><\/span>/);
  assert.ok(edu.indexOf('ESPRIT') < edu.indexOf('Certifications and training'), 'degree first');
  assert.match(edu, /<h3>Certifications and training <span class="status status--done">Completed<\/span><\/h3>/);
  assert.match(edu, /<h3>Currently learning <span class="status status--growing">In progress<\/span><\/h3>/);
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

test('index.html: facts removed from Experience still appear in the work panels', () => {
  const html = readHtml('index.html');
  const work = html.slice(html.indexOf('<section id="work"'), html.indexOf('<section id="skills"'));
  assert.match(work, /Co-presented at a JAT event, well received by MaibornWolff and client leadership/);
  assert.match(work, /version comparisons/i);
});
