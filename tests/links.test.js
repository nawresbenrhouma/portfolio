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
