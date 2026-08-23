# STATUS — 28. august 2026, iteration 91 — color-blindness-simulator (EN + DA) bygget og live

## Stats

Uændret: venteliste 0, ekstern værktøjsbrug 0. Søgninger brugt: **3 af 12**
(alle indekseringskontrol — se punkt 1).

## Hvad denne iteration gjorde

1. **Indekseringskontrol:** bred søgning på domænenavnet gav igen **ingen
   treff på vores sider**; `site:`-query fejler i backenden. Konklusion:
   stadig ikke indekseret. IndexNow pinget igen (74 URLs → HTTP 200).
2. **Nyt crawl-bait-værktøj:** Color Blindness Simulator
   - `/color-blindness-simulator` (EN) + `/color-blindness-simulator-da` (DA)
   - Farvetabel (op til 10 farver) simuleret for protanopi, deuteranopi og
     tritanopi — Viénot/Brettel/Mollon-matricer i lineær RGB
   - Sværhedsgrad-slider (0-100 %, blend med normalt syn), live tekst-preview,
     klik-for-fjern, validering af hex-input, fejlbeskeder
   - Ren statisk HTML+JS, ingen backend, track.js på plads, JSON-LD
     WebApplication valideret på begge sider
3. **Algoritme-testet:** node-test — alle outputs gyldige (0-255, finite),
   severity=0 er identitet, protanopisk rød kollapser som forventet (88,88,41).
4. **Indkobling:** sitemap.xml (nu 74 URLs), free-tools.html (nyt kort),
   llms.txt (2 nye linjer), krydslinks fra begge palette-generator-sider,
   hreflang EN↔DA.
5. **Deployet og verificeret live:** alle 4 tjekkede URLs HTTP 200 med det nye
   indhold; sitemap viser begge nye URLs; health_check.py 71/71.

## Verifikation (faktiske resultater)

- curl -sL /color-blindness-simulator → 200, 4× "Color Blindness Simulator"
- curl -sL /color-blindness-simulator-da → 200, 4× "Farveblindhedssimulator"
- /free-tools indeholder link til begge nye sider (live-tjek OK)
- sitemap.xml live indeholder 2 color-blindness-URLs
- JSON-LD: @context == https://schema.org på begge nye sider

## Blokering (én linje)

Bitwarden uauthenticeret → npm-token, PyPI-token, Lemon Squeezy-nøgle,
Chrome Web Store. KDP kræver manuel upload af Mads (kit komplet, 5 bøger).

## Tallene (ærlige)

- Venteliste: **0** · Ekstern trafik: **0** · Værktøjsbrug af andre: **0**
- Søgninger brugt denne iteration: **3 af 12** · Budget: **0 kr af 1.000 DKK**

## Hvad næste iteration bør gøre

1. Indekseringskontrol igen (samme to søgninger). Hvis stadig ikke indekseret
   efter adskillige pings: domænet er muligvis ikke tillid til på .pages.dev —
   overvej at foreslå Mads et rigtigt domæne (koster ~50-80 kr/år, under 150 kr
   -grænsen, men bindende → spørg først).
2. Hvis nøgler findes: kør PUBLISH_CHECKLIST.md fra toppen.
3. Kandidater til næste crawl-bait-værktøj: "readable text on image checker"
   eller en blogindlægs-runde der linker til alle værktøjerne (flere interne
   indgange = bedre crawlbart).
4. Overvej Machado 2009-severitymatricer som opgradering af simulatoren
   (mere korrekt ved mellemværdier end lineær blend).
