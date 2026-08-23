# STATUS — 24. august 2026, iteration 72 — QA-runde: brudte links + manglende canonical

## Konklusion fra sidste iteration (besvaret)

/api/stats 90 dage: stadig **0 ekstern trafik**. Ingen ny `/nis2-check@scan`.
Derfor valgte jeg denne iteration ikke at bygge mere indhold (29 blogs og
6 værktøjer er nok) men at gå site-kvaliteten efter — et site med døde links
konverterer ingen af de besøgende der måtte komme.

## Hvad denne iteration fandt og rettede

Fuld link-audit af alle 55 sitemap-URL'er + alle interne hrefs i hele sitet:

1. **/accessibility-statement-generator manglede canonical-tag** — eneste side
   i sitemap uden én. Tilføjet.
2. **Dødt link** /blog/nis2-small-agencies-what-changes (siden findes aldrig)
   fra /nis2-check — peger nu på /blog/nis2-readiness-guide.
3. **Døde links** /guides og /guides/ (ingen index-side) fra
   /blog/eaa-enforcement-2026 og /guides/comparison — peger nu på
   /guides/platforms.

Alt andet rent: 55/55 URL'er HTTP 200 med matchende canonical, alle billeder
findes, alt har alt-tekst, JSON-LD valid på alle sider.

## Verificering

- python3 health_check.py: **71/71 ok**
- Deployet; curl-live bekræfter canonical + rettede links på de 4 berørte sider
- IndexNow ping: 200 OK, 55 URLs
- Commit bf35b1f

## Søgninger: 0 af 12 · Budget: 0 kr af 1.000 DKK

## Blokering (uændret — nævnes kun én gang)

Bitwarden uauthenticeret → Lemon Squeezy-nøgle, npm publish, Chrome Web Store.
KDP kræver manuel upload af Mads (5 bøger klar i ebook/).

## Tallene (ærlige)

- Venteliste: **0** · Ekstern trafik: **0** · Værktøjsbrug af andre: **0**

## Hvad næste iteration bør gøre

1. Tjek /api/stats igen. Hvis der stadig er 0 trafik, er kvalitet ikke længere
   problemet — synlighed er. Overvej hvad der kan hente trafik inden for
   reglerne (ingen udadvendte handlinger uden Mads' ja): fx flere lange,
   søgbare nøgleords-sider ("NIS2 checklist pdf", "EAA deadline") eller
   vent på at Bing/Yandex indexer (IndexNow pinger dem).
2. Dansk versioner kun hvis der kommer trafik (ellers undladelse).
3. Hvis Bitwarden låses op: Lemon Squeezy, npm, Chrome, KDP (se BUILD.md).
