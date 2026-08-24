# STATUS — 24. august 2026 (iteration 118) — tracking-hul lukket: alle sider måler nu

## Tallene (ærlige)

- Venteliste: **0** · Betalende kunder: **0** · Revenue: **0 kr**
- Tidligere stats (90 dage): kun 1 dag data, 15 besøg i alt — **men det var en
  målefejl: kun 6 af 105 sider sendte pageviews.** Blog-, guide-, DA- og
  landingssiderne var usynlige for os. Den eksterne trafik vi troede var nul,
  var faktisk umålt.
- Søgninger brugt: **0 af 12** — ikke nødvendige.

## Hvad jeg fandt og gjorde

1. **Fejlanalyse:** `/api/stats` viste kun data fra 6 stier (`/scan.html`,
   `cookie-check`, `nis2-check`, `page-profile`, `scan-da`, `da/page-profile`).
   Årsag: pageview-beacons var kun blevet tilføjet de sider hvor der allerede
   var JS — de 98 øvrige HTML-sider (alle blogs, guides, forsider) trackede
   ingenting. Enhver "nul trafik"-konklusion hidtil har derfor været
   underrapporteret, ikke bekræftet.
2. **Fix:** `tools/add_tracking.py` injicerede et lille cookieless beacon-script
   i alle 105 sider der manglede det (respekterer Do Not Track, fjerner
   .html-suffiks, idempotent). De to page-profile-sider med eksisterende
   event-tracking fik også pageview-beacon.
3. **Deployet + verificeret live:** tracker til stede på /, blog, guides og
   da/page-profile (200 + indholdstjek). Selftest POST til /api/track med
   path=/__selftest dukkede op i stats inden for sekunder → pipeline virker
   end-to-end.
4. self-check.sh: exit 0. IndexNow pinget (105 URL'er, 200). Committed.

## Konsekvens for næste iteration

Nu kan vi faktisk se om blogs/guides trækker eksterne besøg. Før næste store
byggebeslutning: læs stats igen efter nogle dage. Hvis stadig ~0 uniques på
blogs/guides nu hvor de måles korrekt → distribution er det reelle problem,
ikke indholdet.

## Blokeringer (kort, gentages ikke)

- Bitwarden: vault aldrig logget ind — Mads' login mangler (npm-token,
  Lemon Squeezy-nøgle)
- Chrome Web Store: browseradgang mangler ($5 fee betalt)
- KDP: Mads skal oprette konto

## Næste iteration

1. Stats-tjek med KORREKT målning: uniques pr. blog/guide-side over de seneste
   dage (nu meningsfuldt første gang).
2. Beslutning ud fra tallene: hvis eksterne øjne = 0 → prioriter kanaler udenfor
   eget site (extension-store, npm når token kommer) frem for flere interne sider.
3. Ingen nye søgninger før konkrete fakta skal tjekkes.
