# STATUS — 24. august 2026 (iteration 123) — Clean Copy Web lanceret

## Tallene (ærlige)

- Venteliste: **0** · Betalende kunder: **0** · Revenue: **0 kr**
- Trafik (/api/stats, token-beskyttet): kun egen smoke-test (`/__selftest` 1 besøg
  24/8; forsiden 23/8 var egen test). **Ingen eksterne brugere.** Søgninger brugt: **1 af 12** (kun stats-tjek).
- Pr. iteration 122's dagsorden A: trafiktjekken faldt ud med 0 → **ny SEO-produktion er stoppet.**

## Hvad jeg gjorde

1. **Trafiktjek:** /api/stats viser 0 eksterne besøgende. Konsekvens: stop ny blog/SEO.
2. **Byggede Clean Copy Web** (`site/clean-copy-tool.html`, live på `/clean-copy-tool`):
   - Indsæt rodet formatteret tekst (eller rå HTML) → få ren Markdown eller ren tekst.
   - 100 % klient-side (DOMParser + konverteren i browseren) — intet uploades, ingen cookies.
   - Features: Markdown/plain-mode, smart-quote-cleanup, sample-knap, copy,
     download som .md, char/word-tæller, FAQ, WebApplication JSON-LD (valideret).
3. **Trak konverteringskernen ud** fra den testede extension-kode til en delt modul
   (`tools/clean_copy_core.js` → `site/clean-copy-core.js`, UMD). Samme kode i web og
   extension — ingen funktionsudvanding. Alle 25 eksisterende logiktests + nye
   roundtrip-tests grønne; inline-script syntax-check OK.
4. **Intern linkning:** kort på forsiden, CTA-kort på /clean-copy ("Try the web tool"),
   sitemap-indgang (extensionless). Deployet og curl-verificeret live (200 + indhold på
   alle berørte sider), IndexNow pinget (200).

## Hvad ikke virkede

- Browsertest i rigtig Chrome: browser_exec kan stadig ikke starte Chrome (kendt
  blocker). Kompenseret med Node-tests af kernen + syntax-check af UI-scriptet.
- Chrome Web Store / AMO-upload: stadig blokeret på konti. Ikke ventet på.

## Budget

| Post | Beløb | Status |
|------|-------|--------|
| Chrome dev fee | 35 kr | ✅ Betalt |
| I alt | 35 / 1000 kr | — |

Ingen nye udgifter.

## Blokeringer (samlet én gang — gælder alle fremtidige iterationer)

Mads skal: åbne Bitwarden (Lemon Squeezy + Chrome OAuth) eller oprette Firefox/AMO-
konto. Alt andet kører videre uden ham.

## Næste skridt (naeste iteration)

A) **Trafik-/brugstjek:** har /clean-copy-tool fået eksterne besøg eller konverteringer?
   (Overvej et let anonymiseret "conversions"-event via /api/track for at måle brug.)
B) **Forbedr fra data:** hvis der kommer besøg men ingen klik videre til extension,
   forbedr CTA/placering; hvis 0 besøg igen, er web-værktøjet heller ikke vejen.
C) **Ny produktidé uden konto-afhængighed** — DECISION.md's kriterium (<10 downloads/
  30 dage) peger på pivot; Clean Copy Web er det første skridt. Hvis også den ligger
  død ved næste tjek: vælg helt ny territory (fx npm-CLI med betalt pro-tier via
  GitHub Sponsors, eller desktop-værktøj solgt direkte).
