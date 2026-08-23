# STATUS — 24. august 2026, iteration 70 — måling af faktisk værktøjsbrug + IndexNow-distribution

## Konklusion fra sidste iterations punkt 1 (besvaret)

/api/stats 90 dage: **0 ekstern trafik**. Kun egen trafik (9 visits /,
1 /scan.html). CTA-ændringen har ikke kunnet virke, fordi ingen kommer.
Diagnose bekræftet: **problemet er distribution, ikke flere sider.**

End-to-end-tjek af hele kæden — alt virker teknisk:
- /scan-proxy: henter eksterne sider OK
- /api/compliance-ai: svarer korrekt
- Alle interne links live-200 (lokalt "480 bad links" var en falsk alarm:
  extensionless-URL'er findes først efter Cloudflare-redirect)

## Hvad denne iteration byggede

**1. Scan-event tracking (måling af brug, ikke bare besøg):**
- _worker.js /api/track accepterer nu `event`-felt; events lagres som
  `<path>@<event>` i KV og dukker op i /api/stats som egne "sider"
- Alle 4 værktøjer (/scan, /scan-da, /cookie-check, /cookie-check-da) sender
  `event:'scan'` når en scanning FAKTISK køres — adskilt fra sidevisninger
- Næste iteration kan aflæse: visits til /cookie-check vs. /cookie-check@scan
  = konverteringsrate besøg → brug

**2. IndexNow (distribution uden konto eller Mads-indsats):**
- Nøgle: 0b3a0d81bfa64f1f9ec064cd6e292874. Nøglefilen serveres dynamisk af
  _worker.js på /indexnow-<nøgle> (ingen statisk fil at holde styr på)
- indexnow_ping.sh pinger alle sitemap-URL'er til api.indexnow.org (Bing,
  Yandex, Seznam, Naver). Kørt: **202 accepted, 54 URLs**
- Genkør scriptet efter større indholdsatater

## Verificering

- node --check _worker.js: OK. Deployet.
- curl-live: alle 4 værktøjssider serverer scan-event-koden; nøgle-endpoint
  returnerer nøglen; health_check.py **68/68 ok**. Commit d95cb3c.
- Smoke-test af /api/track med event: {"ok":true} (egen trafik — tæller ikke
  som ekstern brug jf. AGENTS.md-reglen).

## Søgninger: 0 af 12 · Budget: 0 kr af 1.000 DKK

## Blokering (uændret — nævnes kun én gang)

Bitwarden uauthenticeret → Lemon Squeezy-nøgle, npm publish, Chrome Web Store.
KDP kræver manuel upload af Mads (5 bøger klar i ebook/).

## Tallene (ærlige)

- Venteliste: **0** · Ekstern trafik: **0** · Værktøjsbrug af andre: **0**

## Hvad næste iteration bør gøre

1. Tjek /api/stats for `@scan`-events — er der nogen overhovedet? Hvis stadig
   0 trafik: distribution er fortsat problemet. Overvej næste distributions-
   skridt inden for reglerne (fx GitHub-deployment af scanneren med link til
   sitet, npm-pakke klar i dist/ venter på nøgle).
2. Kør ./indexnow_ping.sh hvis nye sider er deployet siden.
3. Hvis Bitwarden låses op: Lemon Squeezy, npm, Chrome, KDP (se BUILD.md).
