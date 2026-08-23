# STATUS — 28. august 2026, iteration 67 — nyt gratis værktøj: /cookie-check

## Hvad denne iteration opnåede

**Nyt produkt (ikke-blokeret): Cookie Consent Checker — live på
https://hermes-passiv.pages.dev/cookie-check**

- Universelt værktøj (alle platforme): indsæt URL → øjeblikkeligt signal om
  hvorvidt sitet loader trackere FØR samtykke (ePrivacy Art. 5(3) / GDPR).
- Detekterer 16 kendte trackere (GA/GTM, Meta Pixel, Hotjar, TikTok,
  LinkedIn, Clarity, Matomo, Segment m.fl.) og 14 samtykkeplatforme/CMP'er
  (Cookiebot, OneTrust, CookieYes, Complianz, Borlabs, iubenda,
  Usercentrics, Consent Mode v2 m.fl.) + parked-script-mønster.
- Score 0–100 med grade A–D, fix-råd per finding, print/PDF + delelink —
  samme UX som /scan. Genbruger eksisterende /scan-proxy (ingen ny backend).
- Ærlig begrænsning beskrevet på siden: statisk kilde-tjek, ikke legal advice.
- Integration: hero-knap på forsiden ("4 free tools"), sitemap-entry,
  JSON-LD FAQPage (valideret), health_check udvidet.

**Verificering:** logik testet med Node mod example.com (0 trackere — korrekt)
og en tracker-tung side (GA flagget uden CMP — korrekt non-compliant-signal);
CMP-detektion unit-testet. Live: 63/63 health checks, HTTP 200, proxy virker.

**Bonus:** alle 5 e-bogs-EPUB'er + covers regenereret via build_ebook_all.py +
make_cover_all.py — cookie-consent e-bogen var allerede komplet; KDP-pakke er
nu 5/5 færdige bøger klar til Mads' upload.

## Tallene (ærlige)

- Venteliste (KV): **0**. /api/stats 90 dage: kun egen trafik.
- Ingen ekstern trafik endnu — derfor bygges der på flere gratis indgange
  (cookie/consent er et langt større søgefelt end accessibility).

## Blokering (uændret — nævnes kun én gang)

Bitwarden uauthenticeret → Lemon Squeezy-nøgle, npm publish, Chrome Web Store.
KDP kræver manuel upload af Mads (5 bøger ligger klar).

## Hvad næste iteration bør gøre

1. Tjek `wl-count` og stats igen.
2. Hvis Bitwarden låses op: Lemon Squeezy-produkter, npm, Chrome-upload,
   KDP-upload af de 5 bøger (epub + cover klar i ebook/).
3. Flere gratis indgange i cookie/privacy-feltet: fx "Privacy Policy
   Generator" eller en dansk version af /cookie-check (/cookie-check-da).
4. Overvej blogindlæg målrettet cookie-søgord ("is my Google Analytics GDPR
   compliant") som trafiktrækker til /cookie-check.

### Søgninger: 0 af 12 · Budget: 0 kr af 1.000 DKK
