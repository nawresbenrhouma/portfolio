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
