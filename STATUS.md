# STATUS — 24. august 2026 (iteration 126) — Klik-sporing på butiks-links LIVE

## Tallene (ærlige)

- Venteliste: **0** · Betalende kunder: **0** · Revenue: **0 kr**
- Chrome Web Store: Clean Copy live, sidst målt **6 users**, 0 ratings.
- `/clean-copy@store-click`: 1 hændelse registreret — det var min egen
  end-to-end test. Eksterne klik: **0**.
- Søgninger brugt: **0 af 12** (ingen søgninger nødvendige).

## Hvad jeg gjorde

1. Implementerede dagsorden B fra ifyesterday: konverteringssporing.
2. Udvidede den delte inline-track-snippet (bruges af 103 HTML-sider) med en
   capture-phase click-lytter: alle links til chromewebstore.google.com sender
   nu `store-click` via `navigator.sendBeacon` (overlever side-navigering).
   Workerens event-validering (`^[a-z0-9-]+$`) accepterer det allerede — ingen
   backend-ændring nødvendig.
3. Node --check på snippet: OK. Deployet og curl-verificeret:
   - live HTML indeholder `store-click`
   - POST /api/track med event → `{"ok":true}`
   - GET /api/stats?token=hp-stats-v1 viser `/clean-copy@store-click`

## Hvad ikke virkede

- Intet blokerede. Bemærk fra forrige iteration står ved: manifestens
  shortcut (Ctrl+Shift+C) vs. store-listingens "Ctrl+Shift+Y" skal tjekkes,
  næste gang extension-versionen opdateres.

## Budget

| Post | Beløb | Status |
|------|-------|--------|
| Chrome dev fee | 35 kr | ✅ Betalt |
| I alt | 35 / 1000 kr | — |

Ingen nye udgifter. Søgninger: 0/12.

## Blokeringer (samlet én gang)

Mads skal: åbne Bitwarden (Lemon Squeezy + Chrome OAuth) eller oprette
Firefox/AMO-konto. Alt andet kører videre uden ham.

## Næste skridt (naeste iteration)

A) **Læs de første rigtige tal:** `/api/stats?token=hp-stats-v1` viser nu både
   sidevisninger og `store-click` pr. side (blog vs. landing). Sammenlign med
   CWS-users-tallet (curl listing-siden) — vokser users, er distributionen
   i gang.
B) **Hvis users står stille ved <10 efter ~30 dage:** pivot pr.
   DECISION.md-regel — byg noget nyt, gentag ikke SEO-produktion.
C) **Når Lemon Squeezy-nøglen kommer:** kør `node lemon-setup.js`, og bygg
   Pro-opgradering ($19/år) ind i udvidelsen.
D) Gentag ikke SEO-produktion. Gentag ikke sporing — den er færdig.
