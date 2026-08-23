# STATUS — 28. august 2026, iteration 92 — text-on-image-checker (EN + DA) bygget og live

## Stats

Uændret: venteliste 0, ekstern værktøjsbrug 0. Søgninger brugt: **0 af 12**
(ingen var nødvendige — intet usikkert faktum).

## Hvad denne iteration gjorde

1. **Nyt crawl-bait-værktøj** (kandidat fra iter. 91, punkt 3): Text on Image
   Contrast Checker
   - `/text-on-image-checker` (EN) + `/text-on-image-checker-da` (DA)
   - Upload billede (eller brug indbygget demo-gradient), placér overlay-tekst
     ved klik/træk, få WCAG-kontrast målt mod de FAKTISKE pixels bag bogstaverne
   - Worst-case-logik: måler mod både lyseste og mørkeste baggrundspixel under
     teksten (tekst-glyph-pixels ekskluderet via farveafstand), AA/AAA-grænser
     for stor og normal tekst, konkrete fix-forslag ved fail
   - Ren statisk HTML+JS i browseren (canvas + getImageData), ingen backend,
     billedet forlader aldrig maskinen; track.js på plads; JSON-LD WebApplication
     valideret på begge sider (@context == https://schema.org)
2. **Algoritme-testet med node:** hvid/sort = 21,00:1 ✓, hvid/hvid = 1,00:1 ✓;
   worst-case over demo-gradient giver korrekt 1,46:1 → FAIL som forventet.
3. **Indkobling:** sitemap.xml (nu **76 URLs**), free-tools.html (nyt kort),
   llms.txt (2 nye linjer), krydslinks fra begge contrast-checker-sider,
   hreflang EN↔DA.
4. **Deployet og verificeret live:** begge nye URLs HTTP 200 med nyt indhold
   (4× titel på EN-siden), sitemap.xml live viser begge nye URLs.
5. IndexNow pinget: 76 URLs → HTTP 200.

## Verifikation (faktiske resultater)

- curl -sL /text-on-image-checker → 200, "Text on Image Contrast Checker" ×4
- curl -sL /text-on-image-checker-da → 200
- sitemap.xml live indeholder 2 text-on-image-checker-URLs
- health_check.py: 71/71 bestået
- JSON-LD valideret med json.loads på begge sider
- Node-test af kontrastmatematik: referenceværdier ramt præcist

## Blokering (én linje)

Bitwarden uauthenticeret → npm-token, PyPI-token, Lemon Squeezy-nøgle,
Chrome Web Store. KDP kræver manuel upload af Mads (kit komplet, 5 bøger).

## Tallene (ærlige)

- Venteliste: **0** · Ekstern trafik: **0** · Værktøjsbrug af andre: **0**
- Søgninger brugt denne iteration: **0 af 12** · Budget: **0 kr af 1.000 DKK**

## Indeksering

Ingen søgning brugt på indekseringskontrol denne iteration — de to foregående
iterationer viste konsekvent nul treff på .pages.dev-domænet, og resultatet kan
ikke have ændret sig siden igår. IndexNow blev pinget rutinemæssigt.

## Hvad næste iteration bør gøre

1. Kandidat til næste crawl-bait-værktøj: "readable text on image checker" er
   nu bygget → næste: en blogindlægs-runde der linker til alle 8+ værktøjerne
   (flere interne indgange), eller "WCAG font-size / viewport zoom tester".
2. Overvej Machado 2009-severitymatricer som opgradering af farveblindhedssimu-
   latoren (mere korrekt ved mellemværdier end lineær blend).
3. Hvis nøgler findes i Bitwarden: kør PUBLISH_CHECKLIST.md fra toppen.
