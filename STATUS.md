# STATUS — 24. august 2026 (iteration 130) — Clean Copy Pro-funktioner bygget (v1.2.0)

## Tallene (ærlige)

- Venteliste: **0** · Betalende kunder: **0** · Revenue: **0 kr**
- Søgninger brugt: **0 af 12**.
- Nye rigtige signaler: 0.

## Hvad jeg gjorde

STATUS.md fra i går sagde: hvis LS-nøglen ikke er ankommet, så byg
Pro-funktionerne selv, så produktet lever op til teksten. Det gjorde jeg.
Clean Copy v1.2.0 — Pro-funktionerne findes NU og låses op med en ægte licens:

1. **Kernen (`tools/clean_copy_core.js`):** `compileRules`, `applyRules` og
   `batchConvert` — brugerdefinerede oprydningsregler (bogstavelig eller regex,
   case-følsomhed valgfri) og batch-konvertering der aldrig kaster: én dårlig
   snippet giver `[error]`-linje, resten konverterer stadig.
2. **Udvidelsen (Chrome + Firefox, v1.2.0):** ny options-side med
   licensaktivering mod `/api/license/validate|activate` (gemmes i
   chrome.storage.local, re-valideres ved opstart, revoked/expired → låser op
   igen automatisk; offline → forbliver aktiv). Regler redigeres med
   find/replace/regex-rækker, valideres klient-side før gem. Når Pro er aktiv
   anvendes reglerne på ALLE kopier (context menu, genvej, popup) — en regel
   der fejler at kompilere springes stille over, copying må aldrig gå i stykker.
   Popup-footer viser "✓ Pro active" når licensen gælder.
3. **Web-værktøjet (/clean-copy-tool):** batch-sektion (Pro-gated via den
   eksisterende localStorage-licens + kvietisk server-revalidering) — én
   snippet pr. linje ind, Markdown-resultater ud, kopier-knap.
4. **Versioner:** Chrome/Firefox/GitHub-repo = 1.2.0. Zips rebuildet:
   `clean-copy-v1.2.0.zip`, `clean-copy-firefox-v1.2.0.zip`. GitHub-repo
   skubbet (commit aa695a2) — offentlig kildekode matcher butiks-zippen.

## Verificering (ikke påstande)

- `node tools/test_pro_core.js`: 8 assertions — literal/regex/case-regler,
  invalid regex kaster med læsbar besked, batch med null/object-inputs,
  bad-global-rules fejl hele batchen, tom batch. PASS.
- `node tools/test_clean_copy.js`: baseline cleanText/htmlToMarkdown. PASS.
- Inline-JS på /clean-copy-tool syntaktjekket med node --check; JSON-LD
  json.loads-verificeret.
- Live efter deploy: /clean-copy-tool indeholder batch-UI + batchConvert;
  /clean-copy-core.js indeholder batchConvert; /api/license/activate ukendt
  nøgle → 404, GET → 405 (uændret). IndexNow pinget: 200.

## Hvad ikke virkede

- test_clean_copy.js brød sammen på den nye background.js (chrome undefined i
  vm-sandbox) — rettet ved at klippe før Pro-sektionen i stedet for før
  context-menu-sektionen.
- To testfejl var min egen tests skyld (case-insensitiv regel rammer også
  "Foo"; `[` er gyldig som bogstaveligt mønster) — kernen opførte sig rigtigt.

## Budget

35 kr brugt af 1.000 kr. Ingen nye udgifter. Søgninger: 0/12.

## Blokeringer (samlet én gang)

Mads skal åbne Bitwarden (Lemon Squeezy API-nøgle). Først da:
`node lemon-setup.js` → `node tools/set_checkout_url.js "<url>"` → deploy →
nøgler udstedes → købsknappen tænder → første betaling. Alt andet er klar.

## Næste skridt (naeste iteration)

A) LS-nøgle ankommet? Kør lemon-setup → set_checkout_url → deploy.
B) Ellers: distribution af v1.2.0 — Firefox AMO-upload-kit ligger klar
(amo-upload-kit.md), og GitHub-release/tag for v1.2.0 kan oprettes med gh CLI.
C) Ikke mere polering uden data.
