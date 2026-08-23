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
## Iteration 11 (24/8)
- 2 nye e-bøger: "EAA Compliance for Shopify Stores" + "Cookie Consent & Privacy Compliance"
  - Manuscripts (markdown), EPUB, covers bygget og klar til KDP
  - Registeret i build_ebook_all.py + make_cover_all.py
- 5 eksisterende guide-sider udvidet med platformsspecifikke fix-sektioner
  - Hver side har en "Common fixes in [Platform]" tabel med 6-7 issues
- Index opdateret: hero-meta til "5 complete e-books", 2 nye produktkort
- All deployet og verificeret live (alle covers HTTP 200, alle guides viser fix-sektioner)
## Iteration 20 (24/8)
- 2 SEO-blogindlæg: `site/blog/nis2-readiness-guide.html` (NIS2 for web agencies, ~2500 ord) + `site/blog/eaa-accessibility-checklist.html` (EAA/WCAG checkliste, ~3500 ord)
- Begge med fuld OG/Twitter-meta, JSON-LD Article, canonical URLs
- Index.html opdateret med "From the Blog"-sektion der linker til begge indlæg
- Sitemap.xml repareret (malformed scan+statement entry) og udvidet med blog-pages + extensionless URLs
- Deployet og verificeret: alle nye sider 200 med korrekt indhold
## Iteration 12 (24/8)
- WordPress-plugin `eaa-compliance-scanner` bygget (scanner/wp-plugin/):
  PHP-port af scanner_core.py — samme 15 regler, samme rule-IDs og scoring
  som web-scanneren. Admin-side under Tools → EAA Scanner (scanner forside
  eller vilkårlig URL via wp_remote_get), fix-tips som på web-scanneren.
  Kører 100% på brugerens egen server — ingen tredjepartskald.
- Testet med test_engine.php (WP-stubs): dårligt dokument fyrer alle 15
  regler → 0/D; rent dokument 100/A; example.com + eget site 100/A live.
  Lærning undervejs: ABSPATH-guarden blokerer direkte include uden for WP
  (korrekt adfærd) — testen definerer ABSPATH som stub. Første version havde
  en to-pass tokenisering med inkonsistente tekstbuffere — omskrevet til
  én samlet event-stream-pass.
- Zip (10.7KB) lagt på site + ny "WordPress plugin"-sektion på /scan.
  Distribueres fra eget site — ingen wp.org-afhængighed (én af flere
  indpakninger om den universelle kerne, jf. AGENTS.md).
- Deployet og verificeret live: zip 200 + unzip-test OK, /scan viser
  sektionen, health_check.py 60/60.

## Iteration 14 — cookieless måling (24. aug)

- KV-namespace VISITS bundet til Pages; /api/track + /api/stats i _worker.js
- site/track.js beacon på alle 8 sider; cookieless (dagligt saltet IP-hash, IP gemmes aldrig), 90 dages retention
- Stats-token: hp-stats-v1 i STATS_TOKEN-konstanten. Verificeret live.
## Iteration 17 (24/8)

**Hovedfokus: SEO-dybde på platform-guider + Joomla guide**

- Alle 6 eksisterende platform-guider udvidet fra ~300 ord til 1.500-3.100 ord unikt, platformsspecifikt indhold
- WordPress: 2.359 ord — WordPress-statistik, Gutenberg-block-problemer, tema-specifikke fix (Astra/Divi/GeneratePress)
- Shopify: 1.911 ord — Liquid template-problemer, Dawn/OS 2.0 accessibility, Apps der hjælper vs. skader
- Webflow: 2.173 ord — interaktioner/animationer, Designer vs. Editor roller, Custom Code
- Wix: 3.111 ord — Accessibility Wizard analyse, Velo/Velo kode-fælder, App Market risiko
- Squarespace: 2.606 ord — Fluid Engine vs Classic, Custom CSS, template-skift påvirkning
- Drupal: 2.001 ord — Olivero/Claro, Editoria11y, CKEditor checker, Views rendering
- **Ny Joomla guide** (1.485 ord) — Joomla 4+5, JA Accessibility checker, TinyMCE, template-system
- JSON-LD `@context` bug fixet på alle 4 resterende guides (`***@type` → `schema.org`)
- Sitemap, index.html hero-meta ("7 platform-specific guides"), scan.html platform-detection og guide-liste opdateret med Joomla
- Deployet og verificeret: alle 7 guides 200, alle 1.485-3.111 ord, scanner genkender Joomla-platform

**Søgninger: 4 af 12 brugt** — CompliScan positioning research. Budget: 0 kr af 1.000.

**Blokering uændret** — KDP-konto, Gumroad-konto, Chrome Web Store dev-fee. Alt andet er bygget.
