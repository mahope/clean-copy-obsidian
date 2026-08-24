/**
 * _worker.js — Cloudflare Pages Worker
 *
 * Two responsibilities:
 * 1. GET /scan-proxy?url=... — fetches a URL server-side (no CORS)
 * 2. Everything else — serves static assets from Pages
 *
 * This file replaces the `functions/` directory approach for
 * maximum compatibility with existing Pages projects.
 */

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;

    // === Route: scan-proxy ===
    if (path === '/scan-proxy') {
      return handleScanProxy(request, url);
    }

    // === Route: AI Compliance Assistant ===
    if (path === '/api/compliance-ai') return handleComplianceAI(request, env);

    // === Route: page profiler ===
    if (path === '/api/profile') return handleProfile(request, url);

    // === Route: waitlist signup ===
    if (path === '/api/waitlist') return handleWaitlist(request, env);

    // === Route: cookieless visit tracking ===
    if (path === '/api/track') return handleTrack(request, env);
    if (path === '/api/stats') return handleStats(url, env);

    // === Route: IndexNow key verification (key file generated on the fly) ===
    if (path.startsWith('/indexnow-')) {
      return new Response(path.slice('/indexnow-'.length), {
        headers: { 'Content-Type': 'text/plain; charset=utf-8' },
      });
    }

    // === Route: everything else — serve static assets ===
    try {
      const response = await env.ASSETS.fetch(request);
      // If the asset exists, return it
      if (response.status !== 404) return response;
    } catch {
      // ASSETS.fetch throws when no matching asset
    }

    // Fallback: serve index.html (SPA-like behavior for deep links)
    const indexResponse = await env.ASSETS.fetch(new Request(
      new URL('/index.html', request.url),
      request
    ));
    return indexResponse;
  },
};

/**
 * Handle the scan-proxy endpoint.
 * Fetches a URL server-side and returns the HTML as JSON.
 */
async function handleScanProxy(request, url) {
  const targetUrlParam = url.searchParams.get('url');

  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
  };

  // Preflight
  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers });
  }

  // Validate URL parameter
  if (!targetUrlParam) {
    return new Response(
      JSON.stringify({ ok: false, error: 'Missing ?url= parameter' }),
      { status: 400, headers }
    );
  }

  let targetUrl;
  try {
    targetUrl = new URL(targetUrlParam);
    if (!['http:', 'https:'].includes(targetUrl.protocol)) {
      throw new Error('Invalid protocol');
    }
  } catch {
    return new Response(
      JSON.stringify({ ok: false, error: 'Invalid URL — must start with http:// or https://' }),
      { status: 400, headers }
    );
  }

  try {
    const response = await fetch(targetUrl.toString(), {
      method: 'GET',
      headers: {
        'User-Agent': 'HermesPassiv-Scanner/1.0 (compliance scanner; +https://hermes-passiv.pages.dev)',
        'Accept': 'text/html,application/xhtml+xml,*/*',
      },
      redirect: 'follow',
    });

    const contentType = response.headers.get('content-type') || '';
    if (!contentType.includes('text/html') && !contentType.includes('application/xhtml')) {
      return new Response(
        JSON.stringify({
          ok: false,
          error: `Target returned ${contentType} — not an HTML page. Only HTML pages can be scanned.`,
        }),
        { status: 400, headers }
      );
    }

    const text = await response.text();
    const MAX_SIZE = 500 * 1024;
    if (text.length > MAX_SIZE) {
      return new Response(
        JSON.stringify({
          ok: false,
          error: `Page is too large (${(text.length / 1024).toFixed(0)} KB). Maximum is 500 KB.`,
        }),
        { status: 413, headers }
      );
    }

    return new Response(
      JSON.stringify({ ok: true, html: text, url: targetUrl.toString(), size: text.length }),
      { status: 200, headers }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({
        ok: false,
        error: `Could not fetch the page: ${err.message || 'Unknown error'}`,
        url: targetUrl.toString(),
      }),
      { status: 502, headers }
    );
  }
}
/**
 * Handle the page-profile endpoint.
 * GET /api/profile?url=... — fetches the page server-side and returns
 * a structured profile (meta, OG, JSON-LD, headings, alt, security)
 * with a 21-point weighted score and letter grade. Mirrors the CLI.
 */
async function handleProfile(request, url) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
  };

  if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers });

  const targetUrlParam = url.searchParams.get('url');
  if (!targetUrlParam) {
    return new Response(JSON.stringify({ ok: false, error: 'Missing ?url= parameter' }), { status: 400, headers });
  }

  let targetUrl;
  try {
    targetUrl = new URL(targetUrlParam);
    if (!['http:', 'https:'].includes(targetUrl.protocol)) throw new Error('bad protocol');
  } catch {
    return new Response(JSON.stringify({ ok: false, error: 'Invalid URL — must start with http:// or https://' }), { status: 400, headers });
  }
  // never profile ourselves — infinite loop risk
  if (/(^|\.)hermes-passiv\.pages\.dev$/.test(targetUrl.hostname)) {
    return new Response(JSON.stringify({ ok: false, error: 'Cannot profile this site itself.' }), { status: 400, headers });
  }

  let resp;
  try {
    resp = await fetch(targetUrl.toString(), {
      method: 'GET',
      headers: { 'User-Agent': 'HermesPassiv-PageProfile/1.0 (+https://hermes-passiv.pages.dev/page-profile)', Accept: 'text/html,application/xhtml+xml,*/*' },
      redirect: 'follow',
    });
  } catch (err) {
    return new Response(JSON.stringify({ ok: false, error: `Could not fetch the page: ${err.message || 'unknown error'}` }), { status: 502, headers });
  }

  const html = await resp.text();
  const MAX_SIZE = 500 * 1024;
  if (resp.status >= 400) {
    return new Response(JSON.stringify({ ok: false, error: `The page returned HTTP ${resp.status}. Check that the URL is correct and publicly reachable.` }), { status: 200, headers });
  }
  if (html.length > MAX_SIZE) {
    return new Response(JSON.stringify({ ok: false, error: `Page is too large (${(html.length / 1024).toFixed(0)} KB). Maximum is 500 KB.` }), { status: 413, headers });
  }

  const profile = analyzeHtml(html, {
    finalUrl: resp.url,
    status: resp.status,
    hsts: resp.headers.has('strict-transport-security'),
    csp: resp.headers.has('content-security-policy'),
    xfo: resp.headers.has('x-frame-options'),
    xcto: resp.headers.has('x-content-type-options'),
  });
  const scored = scoreProfile(profile);

  return new Response(JSON.stringify({ ok: true, url: targetUrl.toString(), final_url: resp.url, status: resp.status, ...profile, ...scored }), { status: 200, headers });
}

const PP_WEIGHTS = {
  title_present: 2, title_length_ok: 1,
  meta_description_present: 2, meta_description_length_ok: 1,
  canonical_present: 1.5,
  og_title_present: 1, og_description_present: 1, og_image_present: 1,
  twitter_card_present: 0.5,
  json_ld_present: 1,
  h1_count_ok: 1,
  images_alt_ok: 2,
  hsts_present: 1, csp_present: 1, xfo_present: 0.5, xcto_present: 0.5,
  lang_present: 1, charset_present: 0.5,
  https: 1,
  no_hreflang_issues: 0.5,
};
const PP_MAX = Object.values(PP_WEIGHTS).reduce((a, b) => a + b, 0);

function analyzeHtml(html, net) {
  const getAttr = (attrs, name) => {
    for (let i = 0; i < attrs.length; i++) if (attrs[i][0] === name || attrs[i][0].toLowerCase() === name) return attrs[i][1];
    return null;
  };
  const meta = { title: null, description: null, canonical: null, language: null, charset: null, og: {}, twitter: {}, hreflang: [] };
  const headings = { h1: [], h2: [], h3: [], h4: [], h5: [], h6: [] };
  const images = { total: 0, with_alt: 0, without_alt: 0 };
  let jsonLdBlocks = 0;
  const jsonLdTypes = [];
  let currentHeading = null;

  // charset from early bytes/meta
  const csMatch = html.slice(0, 2048).match(/<meta[^>]+charset\s*=\s*["']?([\w-]+)/i);
  if (csMatch) meta.charset = csMatch[1].toLowerCase();

  // JSON-LD blocks via regex over raw HTML (script content not needed beyond @type)
  const ldRe = /<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  let m;
  while ((m = ldRe.exec(html)) !== null) {
    jsonLdBlocks++;
    try {
      const data = JSON.parse(m[1].trim());
      const items = Array.isArray(data) ? data : [data];
      for (const item of items) {
        if (item && typeof item === 'object' && item['@type']) {
          if (Array.isArray(item['@type'])) jsonLdTypes.push(...item['@type'].map(String));
          else jsonLdTypes.push(String(item['@type']));
        }
      }
    } catch { /* invalid JSON-LD counts as block but no type */ }
  }

  // tag-level parsing with a simple regex scanner (Workers have no DOMParser)
  const tagRe = /<(\/?)(title|meta|link|h[1-6]|img|html)\b([^>]*)>/gi;
  while ((m = tagRe.exec(html)) !== null) {
    const closing = m[1] === '/';
    const tag = m[2].toLowerCase();
    const attrStr = m[3];
    // parse attributes
    const attrs = [];
    const attrRe = /([:\w-]+)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/g;
    let am;
    while ((am = attrRe.exec(attrStr)) !== null) attrs.push([am[1].toLowerCase(), am[2] ?? am[3] ?? am[4] ?? '']);

    if (closing) {
      if (tag === 'title') meta.title = (meta.titleRaw || '').trim().slice(0, 300) || null;
      if (currentHeading) { headings[currentHeading].push((headings[currentHeading + '_raw'] || '').trim()); delete headings[currentHeading + '_raw']; currentHeading = null; }
      continue;
    }

    if (tag === 'title') { meta.titleRaw = ''; continue; }
    if (tag === 'html') { const lang = getAttr(attrs, 'lang'); if (lang && !meta.language) meta.language = lang; continue; }

    if (tag === 'meta') {
      const name = (getAttr(attrs, 'name') || '').toLowerCase();
      const prop = (getAttr(attrs, 'property') || '').toLowerCase();
      const content = getAttr(attrs, 'content');
      const httpEquiv = (getAttr(attrs, 'http-equiv') || '').toLowerCase();
      if (name === 'description' && content && !meta.description) meta.description = content.trim();
      else if (prop === 'og:title' && content) meta.og.title = content;
      else if (prop === 'og:description' && content) meta.og.description = content;
      else if (prop === 'og:image' && content) meta.og.image = content;
      else if (name === 'twitter:card' && content) meta.twitter.card = content;
      else if (httpEquiv === 'content-type' && content && !meta.charset) {
        const c = content.match(/charset=([\w-]+)/i); if (c) meta.charset = c[1].toLowerCase();
      }
      continue;
    }

    if (tag === 'link') {
      const rel = (getAttr(attrs, 'rel') || '').toLowerCase();
      const href = getAttr(attrs, 'href');
      if (rel === 'canonical' && href && !meta.canonical) meta.canonical = href;
      else if (rel === 'alternate' && href && getAttr(attrs, 'hreflang')) meta.hreflang.push({ lang: getAttr(attrs, 'hreflang'), href });
      continue;
    }

    if (/^h[1-6]$/.test(tag)) { currentHeading = tag; headings[tag + '_raw'] = ''; continue; }

    if (tag === 'img') {
      images.total++;
      if (getAttr(attrs, 'alt') !== null && getAttr(attrs, 'alt').trim() !== '') images.with_alt++;
      else images.without_alt++;
      continue;
    }
  }

  // capture text inside the currently-open title/heading tags between matches:
  // simpler approach — extract title and heading texts with dedicated scans
  if (!meta.title) {
    const t = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
    if (t) meta.title = t[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim().slice(0, 300) || null;
  }
  delete meta.titleRaw;
  for (const lvl of ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']) {
    delete headings[lvl + '_raw'];
    headings[lvl] = headings[lvl].filter(Boolean);
    if (headings[lvl].length === 0) {
      // fallback scan for this level
      const re = new RegExp(`<${lvl}[^>]*>([\\s\\S]*?)</${lvl}>`, 'gi');
      let hm; const texts = [];
      while ((hm = re.exec(html)) !== null && texts.length < 50) {
        const txt = hm[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
        if (txt) texts.push(txt);
      }
      headings[lvl] = texts;
    } else {
      headings[lvl] = headings[lvl].filter(Boolean);
    }
  }

  return {
    title: meta.title,
    title_length: meta.title ? meta.title.length : 0,
    meta_description: meta.description,
    meta_description_length: meta.description ? meta.description.length : 0,
    canonical: meta.canonical,
    language: meta.language,
    charset: meta.charset,
    og: meta.og,
    twitter: meta.twitter,
    json_ld_count: jsonLdBlocks,
    json_ld_types: [...new Set(jsonLdTypes)].slice(0, 20),
    headings,
    images,
    hreflang_count: meta.hreflang.length,
    security: { hsts: !!net.hsts, csp: !!net.csp, xfo: !!net.xfo, xcto: !!net.xcto },
    https: net.finalUrl.startsWith('https://'),
  };
}

function scoreProfile(r) {
  let s = 0;
  const penalties = [];
  if (r.title) {
    s += PP_WEIGHTS.title_present;
    if (r.title_length >= 20 && r.title_length <= 70) s += PP_WEIGHTS.title_length_ok;
    else penalties.push(`Title length (${r.title_length} chars) outside recommended 20-70`);
  } else penalties.push('Missing <title>');

  if (r.meta_description) {
    s += PP_WEIGHTS.meta_description_present;
    if (r.meta_description_length >= 50 && r.meta_description_length <= 165) s += PP_WEIGHTS.meta_description_length_ok;
    else penalties.push(`Meta description length (${r.meta_description_length} chars) outside recommended 50-165`);
  } else penalties.push('Missing meta description');

  if (r.canonical) s += PP_WEIGHTS.canonical_present;
  if (r.og.title) s += PP_WEIGHTS.og_title_present;
  if (r.og.description) s += PP_WEIGHTS.og_description_present;
  if (r.og.image) s += PP_WEIGHTS.og_image_present;
  if (r.twitter.card) s += PP_WEIGHTS.twitter_card_present;
  if (r.json_ld_count > 0) s += PP_WEIGHTS.json_ld_present;

  const h1c = r.headings.h1.length;
  if (h1c === 1) s += PP_WEIGHTS.h1_count_ok;
  else if (h1c > 1) penalties.push(`Multiple H1 tags (${h1c}) — should be exactly 1`);
  else penalties.push('Missing H1 tag');

  if (r.images.total > 0) {
    const ratio = r.images.with_alt / r.images.total;
    if (ratio >= 0.9) s += PP_WEIGHTS.images_alt_ok;
    else if (ratio >= 0.5) s += PP_WEIGHTS.images_alt_ok * 0.5;
    else penalties.push(`Low alt-text coverage: ${r.images.with_alt}/${r.images.total} images have alt`);
  } else s += PP_WEIGHTS.images_alt_ok;

  if (r.security.hsts) s += PP_WEIGHTS.hsts_present;
  if (r.security.csp) s += PP_WEIGHTS.csp_present;
  if (r.security.xfo) s += PP_WEIGHTS.xfo_present;
  if (r.security.xcto) s += PP_WEIGHTS.xcto_present;
  if (r.language) s += PP_WEIGHTS.lang_present;
  if (r.charset) s += PP_WEIGHTS.charset_present;
  if (r.https) s += PP_WEIGHTS.https;
  if (r.hreflang_count > 0) s += PP_WEIGHTS.no_hreflang_issues;

  s = Math.round(s * 10) / 10;
  const pct = (s / PP_MAX) * 100;
  const grade = pct >= 90 ? 'A' : pct >= 75 ? 'B' : pct >= 55 ? 'C' : pct >= 35 ? 'D' : 'F';
  return { score: s, max_score: PP_MAX, grade, penalties };
}

/**
 * Handle the AI Compliance Assistant endpoint.
 * Accepts a user question, calls OpenRouter (Ox Alpha / fallback),
 * and returns the answer as JSON.
 */
async function handleComplianceAI(request, env) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
  };

  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers });
  }

  if (request.method !== 'POST') {
    return new Response(
      JSON.stringify({ ok: false, error: 'POST only' }),
      { status: 405, headers }
    );
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return new Response(
      JSON.stringify({ ok: false, error: 'Invalid JSON body' }),
      { status: 400, headers }
    );
  }

  const question = (body.question || '').trim().slice(0, 2000);
  if (!question) {
    return new Response(
      JSON.stringify({ ok: false, error: 'Missing question' }),
      { status: 400, headers }
    );
  }

  const harmful = /(how\s+to\s+hack|exploit|sql\s+injection|malware|illegal)/i;
  if (harmful.test(question)) {
    return new Response(
      JSON.stringify({ ok: false, error: 'I can only answer compliance-related questions. Please rephrase.' }),
      { status: 400, headers }
    );
  }

  const apiKey = env.OPENROUTER_API_KEY;
  if (!apiKey) {
    return new Response(
      JSON.stringify({ ok: false, error: 'AI service not configured. Contact the site owner.' }),
      { status: 503, headers }
    );
  }

  const systemPrompt = `You are a practical EU digital compliance expert for small web agencies (1-50 employees). You answer questions about:

1. **EAA (European Accessibility Act)** — WCAG 2.1/2.2 AA requirements, accessibility statements, enforcement since June 2025, exemptions for micro-enterprises
2. **NIS2 Directive** — cybersecurity requirements for digital service providers, vendor security assessments, incident reporting (24h/72h), supply chain security
3. **GDPR** — data processing agreements, controller vs processor roles, cookie consent, subject access requests, data breach notification
4. **Practical compliance** — documentation templates, contract clauses, audit checklists, implementing compliance without a dedicated team

Guidelines:
- Be PRACTICAL and ACTIONABLE. Give specific steps, not just theory.
- Reference exact regulation articles where relevant (e.g., NIS2 Art. 20, GDPR Art. 28, EAA Annex I).
- If you don't know something, say so honestly — don't make up regulation numbers.
- Keep answers concise but complete. Aim for 2-5 paragraphs unless the question needs more.
- Use plain English, not legalese.
- IMPORTANT: You are NOT a lawyer. Always include a brief disclaimer when giving specific legal interpretation.
- End with a practical next-step suggestion where appropriate.

The user's site is: https://hermes-passiv.pages.dev — a free resource with an EAA scanner, platform guides, and compliance templates. Mention it only when directly relevant to their question.`;

  const openRouterUrl = 'https://openrouter.ai/api/v1/chat/completions';
  const payload = {
    model: 'openrouter/auto',
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: question },
    ],
    max_tokens: 1500,
    temperature: 0.3,
  };

  try {
    const orResponse = await fetch(openRouterUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://hermes-passiv.pages.dev',
        'X-Title': 'Hermes Passiv Compliance AI',
      },
      body: JSON.stringify(payload),
    });

    if (!orResponse.ok) {
      const errText = await orResponse.text().catch(() => 'Unknown error');
      return new Response(
        JSON.stringify({ ok: false, error: 'The AI service is temporarily unavailable. Please try again in a moment.' }),
        { status: 502, headers }
      );
    }

    const data = await orResponse.json();
    const answer = (data.choices?.[0]?.message?.content || '').trim();

    if (!answer) {
      return new Response(
        JSON.stringify({ ok: false, error: 'The AI returned an empty response. Please rephrase your question.' }),
        { status: 502, headers }
      );
    }

    headers['Content-Type'] = 'application/json';
    return new Response(
      JSON.stringify({ ok: true, answer }),
      { status: 200, headers }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ ok: false, error: 'Network error contacting the AI service. Please try again.' }),
      { status: 502, headers }
    );
  }
}
/**
 * Cookieless visit tracking.
 *
 * Privacy: no cookies, no localStorage, no cross-site identifiers.
 * A daily salt (rotates at 00:00 UTC) is hashed with the visitor IP so
 * unique counts work without ever storing an IP address. Keys are
 * aggregated per path per day and expire after 90 days.
 */

const STATS_TOKEN = 'hp-stats-v1'; // change to something secret before sharing stats URL

function dailySalt() {
  return new Date().toISOString().slice(0, 10); // YYYY-MM-DD (UTC)
}

async function visitorHash(request) {
  const ip = request.headers.get('cf-connecting-ip') || 'unknown';
  const ua = request.headers.get('user-agent') || '';
  const data = new TextEncoder().encode(dailySalt() + '|' + ip + '|' + ua);
  const digest = await crypto.subtle.digest('SHA-256', data);
  return [...new Uint8Array(digest)].map(b => b.toString(16).padStart(2, '0')).join('');
}

function jsonResp(obj, status = 200) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'no-store',
    },
  });
}

/**
 * Waitlist signup — POST { email }
 * Stored in the same VISITS KV namespace under wl:<email-hash>.
 * One entry per email (dedupe). No personal data beyond the email itself.
 */
async function handleWaitlist(request, env) {
  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type' } });
  }
  if (request.method !== 'POST') {
    return jsonResp({ ok: false, error: 'POST only' }, 405);
  }
  try {
    const body = await request.json();
    const email = String(body.email || '').trim().toLowerCase();
    // basic validation — no regex overreach
    const valid = /^[^\s@]{1,64}@[^\s@]+\.[^\s@]{2,}$/.test(email);
    if (!valid) {
      return jsonResp({ ok: false, error: 'Please enter a valid email address.' }, 400);
    }

    const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode('wl:' + email));
    const key = 'wl:' + [...new Uint8Array(digest)].map(b => b.toString(16).padStart(2, '0')).join('');

    const isNew = !(await env.VISITS.get(key));
    if (isNew) {
      // store the email so Mads can import the list later; KV value = email
      await env.VISITS.put(key, email, { expirationTtl: 365 * 86400 });
      // counter for quick reads
      const cKey = 'wl-count';
      const prev = parseInt((await env.VISITS.get(cKey)) || '0', 10);
      await env.VISITS.put(cKey, String(prev + 1), { expirationTtl: 365 * 86400 });
    }
    // always answer ok — do not leak whether an address was already signed up
    return jsonResp({ ok: true });
  } catch {
    return jsonResp({ ok: false, error: 'Something went wrong. Please try again.' }, 500);
  }
}

async function handleTrack(request, env) {
  if (request.method !== 'POST') {
    return jsonResp({ ok: false, error: 'POST only' }, 405);
  }
  try {
    const body = await request.json();
    let p = String(body.path || '/');
    // keep keys tidy: strip query strings, cap length
    p = p.split('?')[0].slice(0, 120) || '/';
    // event type: default pageview; tools send event=scan on actual use
    let ev = String(body.event || 'pageview').slice(0, 24);
    if (!/^[a-z0-9-]+$/.test(ev)) ev = 'pageview';
    if (ev !== 'pageview') p = p + '@' + ev;
    const day = dailySalt();

    const vh = await visitorHash(request);
    const uniqueKey = `u:${day}:${p}:${vh}`;
    const isNew = !(await env.VISITS.get(uniqueKey));
    if (isNew) {
      await env.VISITS.put(uniqueKey, '1', { expirationTtl: 90 * 86400 });
    }

    const totKey = `t:${day}:${p}`;
    const prev = parseInt((await env.VISITS.get(totKey)) || '0', 10);
    await env.VISITS.put(totKey, String(prev + 1), { expirationTtl: 90 * 86400 });

    return jsonResp({ ok: true });
  } catch {
    // never let analytics break anything
    return jsonResp({ ok: false }, 202);
  }
}

async function handleStats(url, env) {
  if (url.searchParams.get('token') !== STATS_TOKEN) {
    return jsonResp({ ok: false, error: 'unauthorized' }, 401);
  }
  const days = Math.min(parseInt(url.searchParams.get('days') || '30', 10) || 30, 90);
  const out = {};
  let cursor = null;
  do {
    const page = await env.VISITS.list({ cursor });
    for (const k of page.keys) {
      // key formats: t:<day>:<path> (total) and u:<day>:<path>:<hash> (unique)
      const parts = k.name.split(':');
      if (parts.length < 3) continue;
      const kind = parts[0], day = parts[1];
      if (!out[day]) out[day] = {};
      if (kind === 't') {
        const p = parts.slice(2).join(':');
        out[day][p] = out[day][p] || {};
      }
    }
    cursor = page.list_complete ? null : page.cursor;
  } while (cursor);

  // second pass: read values (list doesn't return values)
  for (const day of Object.keys(out)) {
    for (const p of Object.keys(out[day])) {
      const v = parseInt((await env.VISITS.get(`t:${day}:${p}`)) || '0', 10);
      const prefix = `u:${day}:${p}:`;
      const upage = await env.VISITS.list({ prefix });
      out[day][p] = { visits: v, uniques: upage.keys.length };
    }
  }

  // keep only requested window, newest first
  const cutoff = new Date(Date.now() - days * 86400 * 1000).toISOString().slice(0, 10);
  const filtered = {};
  for (const day of Object.keys(out).sort().reverse()) {
    if (day >= cutoff) filtered[day] = out[day];
  }
  // waitlist count (honest metric)
  let waitlist = null;
  try { waitlist = parseInt((await env.VISITS.get('wl-count')) || '0', 10); } catch {}

  return jsonResp({ ok: true, days, stats: filtered, waitlist });
}
