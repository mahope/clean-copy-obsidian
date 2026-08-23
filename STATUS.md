# STATUS — 27. august 2026, iteration 41

## Hvad denne iteration opnåede

**Fokus: indhold der trækker søgetrafik til scanneren — blogindlæg om CLI-scanning (punkt 2 fra iter. 40).**

1. **Nyt blogindlæg: "Automated Accessibility Scanning from the Command Line"**
   (`/blog/accessibility-scanner-cli`, ~11.7 KB):
   - Hvorfor CLI-scanning (scriptbar, lokal, CI-klar)
   - Alle 16 regler med WCAG-referencer
   - Installationsvejledning for både npm- og Python-udgaven
   - Komplet GitHub Actions-workflow-eksempel med `--fail-on`
   - Ærlig sektion om automatiseringens grænser (~30-50% af WCAG)
   - 5 FAQ'er + interne links til EAA/WCAG-indlæg
2. **Kort på forsiden** (15. blog-kort) + **sitemap.xml opdateret** (31 URL'er).
3. **Verificeret:** health_check 60/60 · JSON-LD validerer på alle sider ·
   deployet · live curl-check: indlæg 200 og indeholder CLI-dokumentation,
   forsiden linker til det, sitemap-entry live.
0 søgninger brugt. Budget: 0 kr af 1.000 DKK.

## Blokering (UÆNDRET)

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
2. Flere indgange til CLI'en: GitHub Actions marketplace-action eller en
   workflow-skabelon-fil til download; evt. flere sprog på scansiden.
3. Forbedring af købsrejsen på index.html (klar når betaling åbner).
