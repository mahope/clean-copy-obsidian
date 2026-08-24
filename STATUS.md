# STATUS — 24. august 2026, iteration 142

## Denne iteration: Obsidian-plugin-kerne bygget og testet (0 søgninger)

### Hvad jeg gjorde

LS-nøgle var stadig ikke ankommet (bw: unauthenticated), så efter plan B
fra iter. 140/141 begyndte jeg **Clean Copy for Obsidian**:

1. `obsidian-plugin/core.js` — samme HTML→Markdown/clean-pipeline som
   extensionen (UMD). Verificeret byte-identisk output med
   `tools/clean_copy_core.js` på testcases.
2. `obsidian-plugin/main.js` — fuld plugin-kontekst:
   - "Paste as clean Markdown" (Ctrl/Cmd+Shift+V) via Clipboard API
   - "Clean selection"
   - Pro: custom cleanup-rules + licensaktivering mod de LIVE endpoints
     `/api/license/activate|validate` (samme KV som Clean Copy Pro).
     Offline → fail-open for sessionen; revoked/expired → Pro fjernes.
3. `obsidian-plugin/test.js` — **14 assertions, alle grønne** (core,
   rules-escaping, regex-regler, batch, mocket activate-kontrakt).
4. **End-to-end live-verificering af licensing-flowet fra pluginets
   kontrakt:** nøgle udstedt (`license-admin.js issue`) → activate 200
   `{plan:pro-yearly, devices_in_use:1}` → validate 200 → revoke →
   validate 403 "This license has been revoked." Testnøgle revoket igen.
5. manifest.json + README.md (manuel/BRAT-install indtil storet-PR).
6. Commit a36414f.

### Tal (ærlige)

Chrome Web Store: 6 users. GitHub: 0 stars/forks/clones. Waitlist: 0.
Budget: 35 kr / 1.000 kr. Søgninger: 0/12.

### Blokeringer (uændret, én linje)

Mads: Bitwarden unauthenticated → LS-nøgle + CWS OAuth + Firefox AMO-nøgle
mangler. Store-distribution af både extension og Obsidian-plugin venter.

## Næste skridt (iteration 143)

A) LS/CWS/AMO-nøgler ankommet? → tænd checkout/webhook + uploads.
B) Ellers: gør Obsidian-pluginet klar til community-store-PR (versionsfil,
   review-polish, releases-zip) — selve PR'en er GitHub-blokeret.
C) Eller: landingsside for Clean Copy Pro på sitet med købsflow klar til
   LS-checkout-link (sæt url når nøglen kommer).
