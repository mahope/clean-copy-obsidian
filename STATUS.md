# STATUS — 24. august 2026, iteration 71 — NIS2 Self-Assessment (nyt gratis værktøj)

## Konklusion fra sidste iteration (besvaret)

/api/stats 90 dage: stadig **0 ekstern trafik**. Det ene `@scan`-event er
egen smoke-test. Distribution er fortsat problemet — så denne iteration
byggede en **ny distributionsindgang** i stedet for at pudse de gamle.

## Hvad denne iteration byggede

**/nis2-check — Free NIS2 Self-Assessment (værktøj #6):**
- 12 spørgsmål i browseren (ren JS, ingenting sendes nogen steder)
- Afgør scope efter Direktiv (EU) 2022/2555: Annex I essential vs
  Annex II important, størrelsestærskler (50+ / €10M), size-uafhængige
  tilfælde (digital infra/MSP, kritiske udbydere)
- Lister pligter med artikelhenvisninger: Art. 21 risikostyring,
  Art. 23 incident-rapportering (24h/72h/1 måned), Art. 20
  ledelsesansvar + national registrering
- Readiness-score A–D med konkrete næste skridt; print/PDF + delelink
- Scan-event tracking (`@scan`) indbygget fra start — konverterings-
  måling besøg → brug virker med det samme
- FAQPage JSON-LD valideret (@context korrekt)

**Distribution:**
- Forside: hero-knap + "6 free tools" tæller opdateret
- sitemap.xml: 55 URL'er (nis2-check, prioritet 0.9)
- IndexNow ping kørt efter deploy: **200 OK, 55 URLs**
- health_check.py udvidet til /nis2-check: **71/71 ok**

## Verificering

- JS-logik testet mod 5 scope-scenarier (essential/important/out) — alle korrekte
- node --check på inline-script: OK · JSON-LD parsed og valideret
- Deployet; curl-live: HTTP 200, indhold + track.js serveret
- Commit 4d1ddbb

## Søgninger: 1 af 12 · Budget: 0 kr af 1.000 DKK

## Blokering (uændret — nævnes kun én gang)

Bitwarden uauthenticeret → Lemon Squeezy-nøgle, npm publish, Chrome Web Store.
KDP kræver manuel upload af Mads (5 bøger klar i ebook/).

## Tallene (ærlige)

- Venteliste: **0** · Ekstern trafik: **0** · Værktøjsbrug af andre: **0**

## Hvad næste iteration bør gøre

1. Tjek /api/stats for `/nis2-check@scan` og øvrig trafik. IndexNow pinger
   Bing/Yandex m.fl., men Google læser ikke IndexNow — overvej om en
   robots-venlig struktur + tid er nok, eller hvad der ellers kan gøres
   inden for reglerne (ingen udadvendte handlinger uden Mads' ja).
2. Dansk version /nis2-check-da hvis det engelske får trafik (ikke før —
    undgå mere indhold uden målgruppe).
3. Hvis Bitwarden låses op: Lemon Squeezy, npm, Chrome, KDP (se BUILD.md).
4. Kør ./indexnow_ping.sh hvis nye sider deployes.
