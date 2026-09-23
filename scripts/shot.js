#!/usr/bin/env node
// Screenshot a page with real device emulation through the Chrome DevTools
// protocol and report horizontal overflow. No dependencies (Node >= 22).
//   node scripts/shot.js <url> <out.png> <width> [--dark] [--nojs] [--scroll=<y>]  (scroll = viewport-only capture)
const { spawn } = require('node:child_process');
const http = require('node:http');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const [url, out, widthArg, ...flags] = process.argv.slice(2);
if (!url || !out || !widthArg) {
  console.error('usage: shot.js <url> <out.png> <width> [--dark]');
  process.exit(2);
}
const width = Number(widthArg);
const dark = flags.includes('--dark');
const nojs = flags.includes('--nojs');
const scrollArg = flags.find((f) => f.startsWith('--scroll='));
const scrollY = scrollArg ? Number(scrollArg.split('=')[1]) : 0;
const port = 9300 + Math.floor(Math.random() * 500);
const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'shot-'));
const chrome = spawn(CHROME, ['--headless=new', '--disable-gpu', '--no-first-run', '--hide-scrollbars',
  `--remote-debugging-port=${port}`, `--user-data-dir=${profile}`, 'about:blank'], { stdio: 'ignore' });

function getJson(u) {
  return new Promise((res, rej) => http.get(u, (r) => { let d = ''; r.on('data', (c) => d += c); r.on('end', () => res(JSON.parse(d))); }).on('error', rej));
}
async function pageWs() {
  for (let i = 0; i < 100; i++) {
    try { const t = (await getJson(`http://127.0.0.1:${port}/json`)).find((x) => x.type === 'page'); if (t) return t.webSocketDebuggerUrl; } catch (e) { /* not up yet */ }
    await new Promise((r) => setTimeout(r, 100));
  }
  throw new Error('Chrome did not start');
}
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

(async () => {
  const ws = new WebSocket(await pageWs());
  await new Promise((r) => { ws.onopen = r; });
  let id = 0; const pending = new Map();
  ws.onmessage = (e) => { const m = JSON.parse(e.data); if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id); } };
  const send = (method, params = {}) => new Promise((res) => { const i = ++id; pending.set(i, res); ws.send(JSON.stringify({ id: i, method, params })); });

  const mobile = width < 800;
  await send('Emulation.setDeviceMetricsOverride', { width, height: 900, deviceScaleFactor: 2, mobile });
  if (dark) await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-color-scheme', value: 'dark' }] });
  await send('Page.enable');
  if (nojs) await send('Emulation.setScriptExecutionDisabled', { value: true });
  await send('Page.navigate', { url });
  await sleep(1800);
  if (scrollY) { await send('Runtime.evaluate', { expression: `window.scrollTo(0, ${scrollY})` }); await sleep(600); }
  const ev = await send('Runtime.evaluate', { expression: 'JSON.stringify({sw:document.documentElement.scrollWidth,iw:window.innerWidth,h:document.documentElement.scrollHeight,bg:getComputedStyle(document.body).backgroundColor,theme:document.documentElement.getAttribute("data-theme")})', returnByValue: true });
  const { sw, iw, h, bg, theme } = JSON.parse(ev.result.result.value);
  if (!scrollY) { await send('Emulation.setDeviceMetricsOverride', { width, height: Math.min(h, 16000), deviceScaleFactor: 2, mobile }); await sleep(400); }
  const shot = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: !scrollY });
  fs.writeFileSync(out, Buffer.from(shot.result.data, 'base64'));
  console.log(`${out}: width=${width} scrollWidth=${sw} innerWidth=${iw} height=${h} bg=${bg} data-theme=${theme} ${sw > iw ? 'OVERFLOW' : 'ok'}`);
  ws.close();
  await new Promise((r) => { chrome.on('exit', r); chrome.kill(); });
  fs.rmSync(profile, { recursive: true, force: true });
})().catch((e) => { console.error(e); chrome.kill(); process.exit(1); });
