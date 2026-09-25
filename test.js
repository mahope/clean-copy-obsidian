/**
 * tests for the Obsidian plugin core + license flow (Node, no framework).
 * Run: node obsidian-plugin/test.js
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

// ── main.js: license flow against a scripted fake API ──
// Loads the real main.js with a stubbed `obsidian` module, so the shipped
// license code is what gets tested (payload, 7-day grace, re-activation).
(async () => {
  const Module = require('module');
  const notices = [];
  let responses = [];
  const calls = [];
  const obsidianStub = {
    Plugin: function () {},
    PluginSettingTab: function () {},
    Setting: function () {},
    Notice: function (msg) { notices.push(msg); },
    requestUrl: async (opts) => {
      calls.push({ url: opts.url, body: JSON.parse(opts.body), method: opts.method });
      const r = responses.shift();
      if (!r) throw new Error('unexpected request ' + opts.url);
      if (r === 'network') throw new Error('net::ERR_INTERNET_DISCONNECTED');
      return { status: r[0], json: r[1] };
    },
  };
  const origLoad = Module._load;
  Module._load = function (req, ...rest) { return req === 'obsidian' ? obsidianStub : origLoad.call(this, req, ...rest); };
  const PluginClass = require('./main.js');
  Module._load = origLoad;
  const L = PluginClass.License;

  const KEY = '0123456789abcdef0123456789abcdef';
  const DAY = 24 * 60 * 60 * 1000;
  function newPlugin(settings) {
    const p = new PluginClass({}, {});
    p.settings = Object.assign({ licenseKey: '', proActive: false, validatedAt: null, expiresAt: null, rules: [{ find: 'foo', replace: 'bar' }], defaultMode: 'markdown', deviceId: 'dev-1' }, settings);
    p.saveData = async () => {};
    return p;
  }
  function reset(r) { responses = r; calls.length = 0; notices.length = 0; }

  // pure helpers
  assert.strictEqual(L.normalizeKey('  ' + KEY.toUpperCase() + '\n'), KEY);
  assert.ok(L.isValidKey(KEY) && !L.isValidKey(KEY.slice(1)) && !L.isValidKey('z'.repeat(32)));
  assert.strictEqual(L.BUY_URL, 'https://buy.stripe.com/6oU4gy76PgvgdBIdAXbMQ00');
  assert.ok(L.isValidDeviceId(L.newDeviceId()));

  // activate: normalised key, product and mahope.tools in the payload
  let p = newPlugin();
  reset([[200, { ok: true, activated: true, plan: 'clean-copy-pro', expires_at: '2027-09-24T00:00:00Z', devices_in_use: 1 }]]);
  let res = await p.activateLicense('  ' + KEY.toUpperCase() + ' ');
  assert.deepStrictEqual(res, { ok: true });
  assert.strictEqual(calls[0].url, 'https://mahope.tools/api/license/activate');
  assert.deepStrictEqual(calls[0].body, { license_key: KEY, device_id: 'dev-1', product: 'clean-copy-pro' });
  assert.ok(p.isPro());
  assert.strictEqual(p.settings.licenseKey, KEY);
  assert.strictEqual(p.convert('<p>foo</p>'), 'bar', 'Pro rules apply once activated');

  // activate: bad format never hits the network; 404/403/409 give clear messages
  p = newPlugin();
  reset([]);
  res = await p.activateLicense('not-a-key');
  assert.strictEqual(res.ok, false);
  assert.strictEqual(calls.length, 0);
  for (const [resp, re] of [[[404, { ok: false }], /not found/i], [[403, { ok: false, error: 'This license key is for another product.' }], /another product/],
    [[409, { ok: false }], /device limit/i], ['network', /could not be reached/]]) {
    reset([resp]);
    res = await newPlugin().activateLicense(KEY);
    assert.strictEqual(res.ok, false);
    assert.match(res.message, re);
  }

  // validate: not_activated -> activate again instead of dropping the key
  p = newPlugin({ licenseKey: KEY, proActive: true, validatedAt: Date.now() - 2 * DAY });
  reset([[200, { ok: true, valid: false, reason: 'not_activated' }], [200, { ok: true, activated: true, expires_at: null }]]);
  await p.validateLicensePeriodic();
  assert.deepStrictEqual(calls.map((c) => c.url.split('/').pop()), ['validate', 'activate']);
  assert.ok(calls.every((c) => c.body.product === 'clean-copy-pro'));
  assert.ok(p.settings.proActive && p.isPro());
  assert.ok(Date.now() - p.settings.validatedAt < 1000, 'validatedAt refreshed');

  // validate: not due yet -> no request
  reset([]);
  await p.validateLicensePeriodic();
  assert.strictEqual(calls.length, 0);

  // validate: offline keeps Pro inside the 7-day grace, locks it after
  p = newPlugin({ licenseKey: KEY, proActive: true, validatedAt: Date.now() - 6 * DAY });
  reset(['network']);
  await p.validateLicensePeriodic();
  assert.ok(p.isPro(), 'offline within grace keeps Pro');
  p = newPlugin({ licenseKey: KEY, proActive: true, validatedAt: Date.now() - 8 * DAY });
  reset([[503, { ok: false, error: 'Service temporarily unavailable.' }]]);
  await p.validateLicensePeriodic();
  assert.ok(p.settings.proActive, 'temporary errors never drop the key');
  assert.ok(!p.isPro(), 'but Pro is locked after 7 days without a successful check');
  assert.strictEqual(p.convert('<p>foo</p>'), 'foo', 'rules off while locked');
  reset([[200, { ok: true, valid: true, expires_at: '2027-09-24T00:00:00Z' }]]);
  await p.validateLicensePeriodic();
  assert.ok(p.isPro(), 'a successful check unlocks Pro again');

  // validate: expired/revoked (403) turns Pro off with a notice
  p = newPlugin({ licenseKey: KEY, proActive: true, validatedAt: Date.now() - 2 * DAY });
  reset([[403, { ok: false, error: 'License expired. Renew at https://cleancopy.tools/' }]]);
  await p.validateLicensePeriodic();
  assert.ok(!p.settings.proActive && !p.isPro());
  assert.match(notices[0], /expired/);

  // deactivate calls the API, and turns Pro off even when offline
  p = newPlugin({ licenseKey: KEY, proActive: true, validatedAt: Date.now() });
  reset([[200, { ok: true, deactivated: true, devices_in_use: 0 }]]);
  assert.strictEqual(await p.deactivateLicense(), true);
  assert.strictEqual(calls[0].url, 'https://mahope.tools/api/license/deactivate');
  assert.deepStrictEqual(calls[0].body, { license_key: KEY, device_id: 'dev-1', product: 'clean-copy-pro' });
  assert.ok(!p.settings.proActive && !p.isPro());
  p = newPlugin({ licenseKey: KEY, proActive: true, validatedAt: Date.now() });
  reset(['network']);
  assert.strictEqual(await p.deactivateLicense(), false);
  assert.ok(!p.settings.proActive);

  console.log('All Clean Copy Obsidian tests passed.');
})().catch(e => { console.error(e); process.exit(1); });
