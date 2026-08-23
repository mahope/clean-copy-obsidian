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