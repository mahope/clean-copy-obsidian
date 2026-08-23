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
