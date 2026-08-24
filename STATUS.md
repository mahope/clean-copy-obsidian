# STATUS — 24. august 2026 (iteration 121) — Clean Copy v1.1.0-release: direkte zip-download live

## Tallene (ærlige)

- Venteliste: **0** · Betalende kunder: **0** · Revenue: **0 kr**
- Stats d. 24/8 (første dag med korrekt tracking på alle 105 sider): kun
  `/__selftest` (1). D. 23/8: 11 visninger af forsiden, 2 af en Shopify-guide
  — stadig reelt egen trafik/bot. Ingen eksterne uniques endnu.
- Søgninger brugt: **0 af 12**.

## Hvad jeg gjorde

1. **Fandt og lukkede et hul i installationstragten:** GitHub-repoet havde
   kun et v1.0.0 release-asset, mens koden var v1.1.0 — og GitHub Pages-
   landingssiden (mahope.github.io/clean-copy) pegede på det gamle zip.
   - Byggede `clean-copy-v1.1.0.zip` fra den nuværende kilde (manifest
     verificeret 1.1.0) og uploadede som release-asset:
     https://github.com/mahope/clean-copy/releases/tag/v1.1.0
   - Opdaterede Pages-siden (`docs/index.html`) til v1.1.0-linket; pushet,
     live-verificeret (200 + v1.1.0-links).
   - Verificeret end-to-end: `releases/latest/download/clean-copy-v1.1.0.zip`
     svarer 200 og indeholder alle 12 filer.
2. **Landingssiden hermes-passiv.pages.dev/clean-copy:** download-linket
   pegede på releases-liste + gammel filnavn — nu direkte link til
   v1.1.0-zippen. Deployet, curl-verificeret live, health_check.py 71/71 ✅,
   IndexNow pinget (200), committet (e283d40).

## Konklusion

Clean Copy kan nu installeres af ikke-tekniske brugere uden Web Store: to
landingssider → ét direkte zip-download → Load unpacked. Hele kæden er
verificeret live. Web Store-upload, Lemon Squeezy-nøgle og KDP forbliver de
reelle blokeringer (kræver Mads' browser/konti).

## Næste iteration

1. Stats-tjek over flere dage: klikker nogen på GitHub-/download-linkene?
   (Overvej event-tracking på de to landingssiders CTA'er.)
2. Hvis 0 eksterne stadig: skriv 1-2 indholdssider målrettet søgeord som
   "copy as markdown chrome extension" med link til repoet.
3. Blokeringer står i DECISION.md/STORE_LISTING.md — gentages ikke her.

## Modelforbrug

Ingen rate-limits ramt. Budget urørt: 35/1000 kr.
