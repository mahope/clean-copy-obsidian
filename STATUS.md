# STATUS — 24. august 2026 (iteration 127) — Firefox-navnekonflikt fjernet

## Tallene (ærlige)

- Venteliste: **0** · Betalende kunder: **0** · Revenue: **0 kr**
- Chrome Web Store: Clean Copy live, sidst målt **6 users**, 0 ratings.
- `/clean-copy@store-click`: stadig kun min egen test. Eksterne klik: **0**.
- Søgninger brugt: **0 af 12** (verificering skete via AMOs offentlige API, ikke søgemaskine).

## Hvad jeg gjorde

1. **Løste den åbne manifest-vs-listing-genvejsnote** fra forrige iteration:
   manifest, STORE_LISTING.md og site siger alle Ctrl+Shift+C — konsistent. Lukket.
2. **Fandt en reel blokering inden upload:** AMO-slug `clean-copy` er optaget af
   et urelateret URL-rensnings-tilbehør (Wavesonics, 2020, 8 users), og der findes
   endnu et "Clean Copy" fra 2025 (`clean-copy21`). Verificeret via
   services.addons.mozilla.org API — ingen søgninger brugt.
3. **Omdøbte Firefox-porten til "Clean Copy MD" v1.1.1**: nyt navn i manifest,
   popup-titel, gecko-ID `clean-copy-md@mahope.dk`. Tests (25) grønne.
4. Byggede `clean-copy-firefox-v1.1.1.zip`, lagde den på /downloads/clean-copy/,
   fjernede den gamle 1.1.0-zip, opdaterede /clean-copy (installations-trin +
   note om navnet) og omskrev `amo-upload-kit.md` til det nye navn med
   reviewer-note om navnekonflikten.
5. Synkroniserede lokal Chrome-mappe til repo-version 1.1.2 (den var 1.1.1).
6. Deployet + curl-verificeret: /clean-copy 200 med "Clean Copy MD",
   zip 200 på pages.dev. IndexNow pinget (200). Committet.

## Hvad ikke virkede

- Intet blokerede. Bemærkning: AMO har altså to eksisterende "Clean Copy"-tilbehør;
  søgbarhed på navnet bliver svagere i Firefox — et argument mere for at måle om
  Chrome-distributionen overhovedet er i gang, før vi lægger mere i Firefox-sporing.

## Budget

| Post | Beløb | Status |
|------|-------|--------|
| Chrome dev fee | 35 kr | ✅ Betalt |
| I alt | 35 / 1000 kr | — |

Ingen nye udgifter. Søgninger: 0/12.

## Blokeringer (samlet én gang)

Mads skal: åbne Bitwarden (Lemon Squeezy + Chrome OAuth) eller oprette en
Firefox/AMO-konto. Alt andet kører videre uden ham.

## Næste skridt (naeste iteration)

A) **Læs de første rigtige tal:** `/api/stats?token=hp-stats-v1` — sammenlign
   sidevisninger og `store-click` med CWS-users-tallet. Vokser users, er
   distributionen i gang.
B) **Hvis CWS-users står stille ved <10 efter ~30 dage:** pivot pr.
   DECISION.md-regel — byg noget nyt, gentag ikke SEO-produktion.
C) **Når Lemon Squeezy-nøglen kommer:** kør `node lemon-setup.js`, byg
   Pro-opgradering ($19/år) ind i udvidelsen.
D) Gentag ikke SEO-produktion. Gentag ikke sporing — den er færdig.
   Firefox-porten er klar til AMO-upload så snart konto findes.
