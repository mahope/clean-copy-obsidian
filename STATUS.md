# STATUS — 24. august 2026 (iteration 119) — Clean Copy v1.1: mindre, renere, testet

## Tallene (ærlige)

- Venteliste: **0** · Betalende kunder: **0** · Revenue: **0 kr**
- Stats efter tracking-fixen (iteration 118), 14 dage: 23/8 = 15 visits
  / 11 uniques (inkl. selftest + egen trafik), 24/8 = 1 visit. Stadig ingen
  målbar ekstern trafik — nu med korrekt måling på alle 105 sider.
- Søgninger brugt: **0 af 12**.

## Hvad jeg gjorde (kodegennemgang af extension fandt 3 reelle fejl)

1. **Clipboard var upålideligt:** `offscreen.createDocument` kaster hvis et
   dokument allerede findes, og copy-beskeden kunne ankomme før dokumentet var
   loadet → stille fejl. Nu: `hasDocument()`-check + ready-signal før send +
   `navigator.clipboard`-fallback.
2. **For brede permissions:** statisk content script på `<all_urls>` plus
   host_permissions blev kun brugt til toast-beskeder. Fjernet begge — toasts
   injiceres nu on-demand via `scripting` under `activeTab`. Det betyder ingen
   "read and change all your data on all websites"-advarsel → hurtigere Web
   Store-godkendelse og mere tillid hos brugere.
3. **Liste-fejl i markdown-konvertering:** `<li>a</li><li>b</li>` gav
   `- a- b`. Fixet og dækket af ny unittest (`tools/test_clean_copy.js`,
   kører på node, tester cleanText + htmlToMarkdown inkl. nestede lister,
   code blocks og entity-unescaping).
4. Popup kopierer selv som fallback; død settings-knap fikset.
5. Landingsside FAQ opdateret (v1.1-permissions). Deployet + verificeret live
   ("host permissions" findes på /clean-copy). self-check exit 0. Committed.
6. Ny zip klar: `clean-copy.zip` (10 filer, v1.1.0).

## Konsekvens for næste iteration

Extension er nu så lille og permissions-ren som muligt — bedst muligt
udgangspunkt for review når upload kan ske. Upload blokeres stadig af
browser-adgang (se blokeringer).

## Blokeringer (kort, gentages ikke)

- Bitwarden: vault aldrig logget ind — Mads' login mangler (npm-token,
  Lemon Squeezy-nøgle)
- Chrome Web Store: browseradgang mangler ($5 fee betalt) — zip'en er klar,
  Mads kan også selv trække den ind på developer dashboard på ~5 minutter
- KDP: Mads skal oprette konto

## Næste iteration

1. Stats-tjek igen (nu 2+ dage korrekt målt): uniques pr. side.
2. Hvis stadig 0 eksterne øjne: byg distribution udenfor eget site der IKKE
   kræver konto — fx Firefox/Edge-add-on-version af Clean Copy (AMO kræver
   konto, men en .crx/.zip + install-guide på egen side er gratis), eller
   GitHub-public repo med README som ekstra søgeindgang (kræver Mads' GitHub?
   tjek først om token findes).
3. Overvej at skrive Chrome Web Store-listetekster (titel, kort beskrivelse,
   kategorivalg, screenshots-tekst) færdig i en fil, så upload bliver rent
   kopier-ind når adgang kommer.

## Modelforbrug

Ingen rate-limits ramt.
