# BUILD — Hvad er bygget, hvad mangler

|**Dato:** 2026-08-24 (iteration 8 — scanner udvidet til 15 regler, fix-tips og print-knap)

## Bygget ✅

### Scanner-udvidelser (iteration 8, 24. aug)
- 3 nye regler i alle tre implementationer (scanner_core.py, scan.html,
  extension/scanner.js): BUTTON_TEXT (error), DUP_ID (error),
  TARGET_BLANK (warning) → 15 regler i alt
- IMG_ALT-bug rettet i kernen (præcedens-fejl talte tomme alt som OK)
- Hver finding på scan-siden viser nu et konkret "Fix:"-tip
- "Print / save as PDF"-knap på scanningsresultatet
- Extension-zip genbygget med det opdaterede regelsæt

### Site CSS-forbedringer (iteration 7, 24. aug)
- `btn-secondary` CSS-klasse tilføjet (erstatter inline style)
- `btn` CSS-klasse tilføjet (til scan.html)
- `tagline` CSS-klasse tilføjet (til scan.html)
- `site-footer` CSS tilføjet (konsistent footer-styling)
- Alle deployet og verificeret

### Scan page rettelser (iteration 7, 24. aug)
- Dødt link `/#books` → `/#products` (fandtes ikke på index.html)
- Scorecard bg ændret fra `#fff` til `var(--color-surface-2)` (dark theme)
- Header ændret til `class="hero"` med badge + styling
- Footer fik tilbage-link til forsiden
- Alle deployet og verificeret

### E-bog: "NIS2 Compliance for Small Web Agencies"
- `ebook/nis2-for-agencies.md` — Fuldt manuskript (~22KB, 11 chapters)
- `ebook/nis2-for-agencies.html` — KDP-klart HTML-format
- `ebook/nis2-for-agencies.epub` — EPUB 3 (15.7KB, XML-valid)
- `ebook/cover.jpg` — Professionelt cover (1600×2560, dark navy/teal)

### E-bog: "EAA Compliance Checklist for WordPress Sites"
- `ebook/eaa-checklist.md` — Fuldt manuskript (~16KB, 5 chapters + appendices)
- `ebook/eaa-checklist.html` — KDP-klart HTML-format
- `ebook/eaa-checklist.epub` — EPUB 3 (12.3KB, XML-valid)
- `ebook/eaa-cover.jpg` — Professionelt cover (1600×2560)

### E-bog: "GDPR Compliance for Small Web Agencies" **(ny i iteration 4)**
- `ebook/gdpr-for-agencies.md` — Fuldt manuskript (~20KB, 8 chapters + 3 appendices)
- `ebook/gdpr-for-agencies.epub` — EPUB 3 (16.3KB, 12 chapters, XML-valid)
- `ebook/gdpr-cover.jpg` — Professionelt cover (1600×2560, dark navy/teal)

### ComplianceDocs (Gumroad-bundle)
- `products/dpa-template.md` — GDPR DPA template (Annex A–C, fill-in)
- `products/eaa-statement-template.md` — EAA accessibility statement
- `products/nis2-contract-clauses.md` — 8 contract clauses
- `products/vendor-assessment-checklist.md` — 10 Q&A + scorecard
- `products/compliance-bundle.html` — Samlet HTML-bundle (40KB, alle 4 templates)

### Landingsside (Cloudflare Pages) — https://hermes-passiv.pages.dev
- `site/index.html` — 3 e-bøger med cover-billeder, chapter previews, compliance quiz, template library
- `site/style.css` — Opdateret
- `site/nis2-cover.jpg` / `site/eaa-cover.jpg` / `site/gdpr-cover.jpg` — Cover-billeder på sitet
- `site/sitemap.xml` — SEO sitemap
- `site/robots.txt` — SEO robots
- Deployet til Cloudflare ✅ (3 e-bøger vises korrekt, HTTP 200)
- Interaktiv "Compliance Readiness Quiz" (7 spørgsmål, 3 niveauer af anbefalinger)

### Byggeværktøjer
- `build-all.sh` — Kører alle builds på én gang (1 kommando)
- `build_ebook_all.py` — Markdown→EPUB (generisk, 3 bøger nu registreret)
- `build_bundle.py` — Markdown→HTML bundle
- `make_cover_all.py` — KDP cover (Pillow, 3 covers nu registreret)
- `health_check.py` — 60 tjek: filer, EPUB, cover, site HTTP+indhold
- `build_bundle_pdf.py` — markdown→PDF generator (fpdf2)

### Universel EAA/WCAG-scanner **(ny i iteration 5)**
- `scanner/scanner_core.py` — Platform-uafhængig kerne: HTML ind (streng eller
  URL med redirect-håndtering) → JSON-rapport med score/grade ud. 11 regler
  (alt-tekst, form-labels, titel, lang, viewport, headings, iframes, tabeller,
  aria-hidden+focusable, fixed px fonts). Ingen CMS-antagelser.
- `scanner/scan.py` — CLI-wrapper: `python scanner/scan.py <url> [--json]`
- `scanner/extension/` — Chrome/Edge MV3-udvidelse (samme regelsæt i JS):
  manifest.json + popup.html + scanner.js + icon128.png. Klar til Chrome Web
  Store ($5 engangs, <150 kr).
- `site/scan.html` — Live scanner-side: indsæt URL → instant rapport
  (klient-side fetch, ingen server). Linket fra hero på forsiden.
  OBS: Cloudflare Pages redirecter `/scan.html` → `/scan` (308) — kernen
  følger redirects korrekt.
- Verificeret: fanger alle 11 fejltyper på et dårligt testdokument (score 13/D),
  grøn på rene sider (example.com, eget site).

### Pro EAA Compliance Audit Report **(ny i iteration 6)**
- `scanner/scan_pro.py` — PDF-rapportgenerator: URL ind → 3-5 siders
  professionel PDF med executive summary, detailed findings, recommendations
  og methodology. Bruger scanner_core som scan-engine.
- `products/pro-audit-gumroad.md` — Gumroad-produktbeskrivelse ($29)
- Site opdateret: `site/scan.html` viser Pro-opgraderingssektion
- Testet: ren side (100/A), fejlbehæftet side Instagram (83/B, 1 error)

### CORS-proxy til webscanner **(ny i iteration 7)**
- `site/_worker.js` — Cloudflare Pages Worker der fungerer som CORS-proxy.
  Browserens JS kan ikke fetche vilkårlige URLs pga. CORS; worker'en henter
  siden server-side og returnerer HTML som JSON.
- Endpoint: `GET /scan-proxy?url=https://eksempel.dk`
- Fordele: virker på ALLE websites, ingen CORS-begrænsning, kører på
  Cloudflares edge (hurtig). Koster 0 kr (inkluderet i Pages gratisniveau).
- `site/scan.html` — Opdateret til at bruge proxy i stedet for direkte `fetch(url)`
- Verificeret: example.com (559 bytes), instagram.com (475KB) — begge returnerer HTML korrekt

### Upload-kits (iteration 3)
- `kdp-upload-kit.md` — ALLE KDP-metadata for alle 3 bøger
- `gumroad-upload-kit.md` — Gumroad-opsætning

## Mangler 🚧

### Mads-afhængigt (skal han tage stilling til)
1. **Amazon KDP-konto** — opret på https://kdp.amazon.com (gratis). W-8BEN skatteinfo.
   - Upload alle 3 e-bøger (EPUB + cover + metadata)
   - Tilføj KDP-links til landingssiden efter upload
2. **Gumroad-konto** — til ComplianceDocs-bundlet (4 templates). Kan vente.

### Tredje distributionskanal
- Lulu undersøgt (1 søgning): 80% royalty direkte, ~30% via partnere. Kræver også konto i Mads' navn — ingen fordel ift. KDP. Konklusion: alle seriøse platforme kræver en konto; kanal #3 venter på bedre timing.

## Vedligeholdelse
- Alle 3 e-bøger opdateres via `build_ebook_all.py` (1 kommando)
- Covers via `make_cover_all.py` (1 kommando)
- Alt verificeres via `health_check.py` (1 kommando, 60 tjek)
- Deploy: `./deploy.sh`
- Sitet indeholder interaktiv quiz — ingen server-side, ingen vedligehold
## Iteration 9 (24/8)
- CONTRAST-regel (WCAG 1.4.3): inline farvepar med arv, kontrastberegning
  4.5:1 / 3:1 (stor tekst). I scanner_core.py, scan.html og extension.
- "Copy shareable link" + auto-scan fra #url=-hash på scan.html.
- Extension-zip genbygget. Verificeret live.
