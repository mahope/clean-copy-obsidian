# STATUS — 27. august 2026, iteration 40

## Hvad denne iteration opnåede

**Fokus: npm-udgave af scanneren — en ekstra distributionskanal uden nogen af Mads' konti.**

1. **`@mahope/eaa-scanner` 1.0.0 — fuld JavaScript-port af kernen**
   (`scanner/npm/eaa-scanner/`): samme 16 regler som Python-versionen, inkl.
   ægte WCAG 1.4.3 kontrast-beregning (relativ luminans), duplikerede id'er,
   target=_blank-advarsler. Zero dependencies, Node ≥ 18.
   - CLI (`eaa-scan`): flere URL'er/filer, `--json`, `--fail-on error|warning`
     (exit 1 til CI). Biblioteksbrug: `scanHtml()` / `scanUrl()`.
   - Egen minimal HTML-tokenizer (ingen parser-afhængigheder).
   - Selvtest (`test.js`, 11 regler på defekt HTML) — alle PASS.

2. **Verificeret mod Python-kernen:** samme defekte HTML giver identisk
   score (0/D) og præcis samme regelsæt i begge implementationer.

3. **Testet på live sider:** /scan 98 A, /blog 100 A — matcher Python-resultaterne.

4. **Distribueret uden konto:** tarball lagt på sitet under `/downloads/`.
   **End-to-end verificeret fra LIVE site:**
   `npm install https://hermes-passiv.pages.dev/downloads/mahope-eaa-scanner-1.0.0.tgz`
   → `npx eaa-scan <url>` scannner korrekt. Anden kanal der virker i dag.

5. **/downloads-siden opdateret** med Node/npm-sektion + fil-link. health_check
   60/60 · deployet · downloads-side verificeret live.

### Søgninger
0 af 12 brugt. Budget: 0 kr af 1.000 DKK.

## Blokering (UÆNDRET)
**Amazon KDP-konto** (5 e-bøger klar i ebook/) · **Gumroad-konto**
(ComplianceDocs klar i products/) · **Chrome Web Store dev-fee $5** ·
**PyPI-token** (så bliver `pip install eaa-scanner` officiel; npm-token tilsvarende).

## Hvad næste iteration bør gøre
1. Samme påmindelse om kontiene — fortsat dét der adskiller os fra første krone.
2. Blogindlæg om CLI-scanneren (Python + Node) — indhold der trækker søgetrafik.
3. Kandidater: GitHub Actions-demo/workflow-fil til CI-brugere, flere sprog på
   scansiden, eller forbedring af købsrejsen på index.html.
