/**
 * track.js — cookieless visit counter.
 * No cookies, no localStorage. Sends one beacon per page view.
 */
(function () {
  try {
    var p = location.pathname;
    if (p === '/api/track' || p === '/api/stats') return;
    var body = JSON.stringify({ path: p });
    var sent = false;
    function send() {
      if (sent) return; sent = true;
      fetch('/api/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: body,
        keepalive: true,
      }).catch(function () {});
    }
    if (document.visibilityState === 'visible') send();
    else document.addEventListener('visibilitychange', send, { once: true });
  } catch (e) { /* analytics must never break the page */ }
})();
