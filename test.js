/**
 * tests for the Obsidian plugin core + license flow (Node, no framework).
 * Run: node test.js
 */
const assert = require('assert');
const Core = require('./core.js');

// ── core: identical behaviour to extension core ──
assert.strictEqual(Core.cleanText('a\u00A0b  c\n\n\n\nd'), 'a b c\n\nd');
assert.strictEqual(Core.htmlToMarkdown('<h2>Hi</h2><p>Some <b>bold</b> text</p>'),
  '## Hi\n\nSome **bold** text');
assert.ok(Core.htmlToMarkdown('<ul><li>a</li><li>b</li></ul>').includes('- a\n- b'));
assert.ok(Core.htmlToMarkdown('<ol><li>one</li><li>two</li></ol>').includes('1. one\n2. two'));
assert.ok(Core.htmlToMarkdown('<pre><code>x &lt; y</code></pre>').includes('```\nx < y\n```'));
assert.ok(Core.htmlToMarkdown('<a href="https://x.dk">link</a>').includes('[link](https://x.dk)'));

// Pro rules
const rules = [{ find: 'TODO', replace: 'DONE' }];
assert.ok(Core.batchConvert(['<p>TODO now</p>'], 'markdown', rules)[0].content.includes('DONE now'));
// literal rules are escaped, so metacharacters don't throw; invalid REGEX does
assert.strictEqual(Core.batchConvert(['<p>(x)</p>'], 'markdown', [{ find: '(', replace: '-' }])[0].content, '-x)');
assert.throws(() => Core.compileRules([{ find: '[', replace: 'x', regex: true }]), /invalid pattern/);
// regex rule
const rr = [{ find: '\\d+', replace: '#', regex: true }];
assert.strictEqual(Core.batchConvert(['<p>abc 123</p>'], 'markdown', rr)[0].content, 'abc #');

// wikilinks mode: internal links -> [[WikiLink]], external stay Markdown,
// images and fenced code are untouched
const wl = Core.batchConvert(
  ['<p>See <a href="/other">Other</a> and <a href="https://x.example/y">Ext</a> <img src="a.png" alt="im"></p><pre><code>[z](w)</code></pre>'],
  'wikilinks', [])[0].content;
assert.ok(wl.includes('[[Other]]'), wl);
assert.ok(wl.includes('[Ext](https://x.example/y)'), wl);
assert.ok(wl.includes('![im](a.png)'), wl);
assert.ok(wl.includes('[z](w)'), wl);
// scheme-less relative + root-relative both convert
const wl2 = Core.batchConvert(['<a href="sub/page">Sub</a>'], 'wikilinks', [])[0].content;
assert.strictEqual(wl2, '[[Sub]]');

// csv mode: tables -> RFC 4180 rows, prose dropped, fallback to plain text
const csv = Core.batchConvert(
  ['<p>intro</p><table><tr><th>Name</th><th>Note</th></tr><tr><td>A</td><td>has, comma and "q"</td></tr></table>'],
  'csv', [])[0].content;
assert.ok(csv.startsWith('Name,Note'), csv);
assert.ok(csv.includes('"has, comma and ""q"""'), csv);
assert.strictEqual(Core.batchConvert(['<p>no table</p>'], 'csv', [])[0].content.trim(), 'no table');

// batch never throws
const batch = Core.batchConvert([null, '<p>ok</p>'], 'markdown', []);
assert.deepStrictEqual(batch.map(b => b.ok), [true, true]);

// ── main.js: the real plugin class against a fake Obsidian API ──
// Locks the license contract: endpoint, request shape, and the seven-day
// offline rule. `requestUrl` is the only thing the plugin calls.
const Module = require('module');
const MAIN_JS = require('fs').readFileSync(require('path').join(__dirname, 'main.js'), 'utf8');
assert.ok(!MAIN_JS.includes('hermes-passiv.pages.dev'), 'main.js must not use the old license host');

const notices = [];
const requests = [];
let respond = null;
const fakeObsidian = {
  Plugin: function () {},
  PluginSettingTab: function () {},
  Notice: function (msg) { notices.push(msg); },
  Setting: function () {},
  requestUrl: async (opts) => { requests.push(opts); return respond(opts); },
};
fakeObsidian.Plugin.prototype = {};
fakeObsidian.PluginSettingTab.prototype = {};
const realLoad = Module._load;
Module._load = function (request, ...rest) {
  return request === 'obsidian' ? fakeObsidian : realLoad.call(this, request, ...rest);
};
const PluginClass = require('./main.js');
Module._load = realLoad;

const KEY = 'a1'.repeat(16);
const DAY = 24 * 60 * 60 * 1000;
function makePlugin(over) {
  const plugin = new PluginClass({}, {});
  plugin.settings = Object.assign({
    licenseKey: KEY.toUpperCase(), deviceId: 'd'.repeat(32), proActive: false,
    licenseCheckedAt: 0, expiresAt: null, rules: [], defaultMode: 'markdown',
  }, over || {});
  plugin.saveData = async () => {};
  return plugin;
}
const answer = (status, data) => async () => ({ status, json: data });

(async () => {
  // activate: right endpoint, right payload, Pro on, timestamp stored
  let plugin = makePlugin();
  respond = answer(200, { ok: true, activated: true, plan: 'pro-yearly', expires_at: '2027-08-24T00:00:00Z' });
  assert.strictEqual(await plugin.activateLicense(), true);
  assert.strictEqual(requests[0].url, 'https://mahope.tools/api/license/activate');
  assert.strictEqual(requests[0].method, 'POST');
  assert.deepStrictEqual(JSON.parse(requests[0].body),
    { license_key: KEY, device_id: 'd'.repeat(32), product: 'clean-copy-pro' });
  assert.strictEqual(plugin.settings.proActive, true);
  assert.ok(plugin.settings.licenseCheckedAt > 0);
  assert.strictEqual(plugin.settings.expiresAt, '2027-08-24T00:00:00Z');

  // activate: unknown key answers 404 -> Pro stays off, the server's message is shown
  const before = requests.length;
  plugin = makePlugin();
  respond = answer(404, { ok: false, error: 'License key not found. Check for typos or contact support.' });
  assert.strictEqual(await plugin.activateLicense(), false);
  assert.strictEqual(plugin.settings.proActive, false);
  assert.ok(notices.includes('License key not found. Check for typos or contact support.'), JSON.stringify(notices));

  // activate: malformed key never touches the network
  const count = requests.length;
  plugin = makePlugin({ licenseKey: 'not-a-key' });
  assert.strictEqual(await plugin.activateLicense(), false);
  assert.strictEqual(requests.length, count);
  assert.ok(before < requests.length);

  // validate: a revoked key (403) loses Pro at once
  plugin = makePlugin({ proActive: true, licenseCheckedAt: Date.now() - DAY });
  respond = answer(403, { ok: false, error: 'revoked' });
  await plugin.validateLicensePeriodic();
  assert.strictEqual(plugin.settings.proActive, false);
  assert.strictEqual(requests[requests.length - 1].url, 'https://mahope.tools/api/license/validate');

  // validate: a server outage keeps Pro up to seven days after the last good check
  plugin = makePlugin({ proActive: true, licenseCheckedAt: Date.now() - 6 * DAY });
  respond = answer(503, {});
  await plugin.validateLicensePeriodic();
  assert.strictEqual(plugin.settings.proActive, true);
  // ...but not longer
  plugin = makePlugin({ proActive: true, licenseCheckedAt: Date.now() - 8 * DAY });
  await plugin.validateLicensePeriodic();
  assert.strictEqual(plugin.settings.proActive, false);
  // a request that never gets an answer counts as an outage, not as a lost license
  plugin = makePlugin({ proActive: true, licenseCheckedAt: Date.now() - DAY });
  respond = async () => { throw new Error('offline'); };
  await plugin.validateLicensePeriodic();
  assert.strictEqual(plugin.settings.proActive, true);

  // launch: settings saved by 1.0.11 have no check time; an offline first start must keep Pro
  const launch = async (saved) => {
    const pl = new PluginClass({}, {});
    pl.loadData = async () => JSON.parse(JSON.stringify(saved));
    pl.saveData = async (d) => { Object.assign(saved, JSON.parse(JSON.stringify(d))); };
    pl.addCommand = () => {};
    pl.addSettingTab = () => {};
    pl.onload();
    await new Promise((r) => setTimeout(r, 30));
    return { pl, saved };
  };
  let stored = { licenseKey: KEY, deviceId: 'd'.repeat(32), proActive: true };
  respond = answer(503, {});
  let run = await launch(stored);
  assert.strictEqual(run.pl.settings.proActive, true, 'upgrade from 1.0.11, offline: Pro stays on');
  assert.ok(Math.abs(run.pl.settings.licenseCheckedAt - Date.now()) < 60 * 1000);

  // an outage that outlasts the seven days switches Pro off, and the next launch tries again by itself
  stored = { licenseKey: KEY, deviceId: 'd'.repeat(32), proActive: true, licenseCheckedAt: Date.now() - 8 * DAY };
  respond = answer(503, {});
  run = await launch(stored);
  assert.strictEqual(run.pl.settings.proActive, false);
  assert.strictEqual(stored.licenseRecheck, true);
  respond = answer(200, { ok: true, valid: true, expires_at: '2027-08-24T00:00:00Z' });
  const n = requests.length;
  run = await launch(stored);
  assert.strictEqual(requests.length, n + 1, 'the lapse is re-checked at launch');
  assert.strictEqual(run.pl.settings.proActive, true, 'Pro comes back on its own when the server answers');
  assert.strictEqual(stored.licenseRecheck, false);

  // a lapse caused by an answer (revoked key) is not retried at every launch
  stored = { licenseKey: KEY, deviceId: 'd'.repeat(32), proActive: true, licenseCheckedAt: Date.now() - DAY };
  respond = answer(403, { ok: false, error: 'revoked' });
  run = await launch(stored);
  assert.strictEqual(run.pl.settings.proActive, false);
  assert.strictEqual(stored.licenseRecheck, false);
  const m = requests.length;
  await launch(stored);
  assert.strictEqual(requests.length, m, 'no request when nothing is active and nothing is pending');

  console.log('All Clean Copy Obsidian tests passed.');
})().catch(e => { console.error(e); process.exit(1); });
