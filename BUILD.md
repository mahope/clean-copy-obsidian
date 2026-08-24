# BUILD — Hvad er bygget, hvad mangler

**Dato:** 2026-08-24 (iteration 108 — stifter-beslutning: compliance parkeret)

## Compliance-produkt: FÆRDIGT OG PARKERET

Efter 107 iterationer, 0 eksterne brugere, og verificeret mætning af alle distributionskanaler
(PH kræver 8-12 uger, HN har allerede en konkurrent, meta-tools er commodity, alle betalingskanaler
kræver Mads' konto). **Byg ikke mere indhold til dette produkt.** Det er klart til at tage imod
penge så snart Mads åbner KDP-konto + Bitwarden (Lemon Squeezy/npm/Chrome). Alt andet er bygget.

### Mangler (udelukkende Mads-afhængigt)
1. KDP-konto → upload 5 e-bøger (15 min)
2. Bitwarden → Lemon Squeezy API-nøgle → opret produkter+checkout
3. Bitwarden → npm login → publish @mahope/eaa-scanner
4. Bitwarden → Chrome Web Store OAuth → publish extension

### Konverterings-CTA + Waitlist på e-bøger **(ny i iteration 107)**
- Waitlist API eksisterede allerede i `_worker.js` (`/api/waitlist` → POST email → KV storage med 365d TTL, dedup, tæller)
- Waitlist UI (formular + JS) eksisterede i bunden af `index.html` men var ALDRIG forbundet til produktkortene
- Nu: alle 5 e-bogskort har "📬 Coming to Amazon KDP" badge + "Notify me →" knap der scroller til waitlist
- `style.css`: `.product-cta`, `.coming-badge` klasser
- **Første gang en besøgende kan udtrykke købsinteresse — og første gang vi kan måle reel demand**

### Hero ryddet: 14 → 6 knapper **(iteration 107)**
- Før: 14 links i hero — overvældende
- Nu: `See E-Books →`, `🔍 Free EAA Scanner`, `🧰 All Free Tools`, `🇩🇰 Dansk`, `🤖 Compliance AI`, `📬 Get notified`
- Alle værktøjs-links findes stadig på `/free-tools`

### Desktop App: EAA Compliance Scanner (Electron) **(ny i iteration 56)**
- `desktop/` — Ny desktop-applikation (Electron): native macOS-scanner med 16 WCAG 2.1 AA-regler, offline-brug, save-as-PDF
- Genbruger `scanner-core.js` (npm-pakkens kernemotor) direkte — nul porting, identisk output
- `desktop/main.js` — Electron main process: IPC-handlers for scan-url, save-pdf, open-external; fuld menu-bar (File, Edit, View, Help)
- `desktop/preload.js` — contextBridge: scanUrl, savePdf, openExternal til renderer
- `desktop/index.html` — renderer-UI: URL-input, scan-knap, scorecard (A-D), summary (errors/warnings/notices), findings med fix-tips, PDF-save, dark theme
- `desktop/style.css` — dark theme, responsive, tilpasset eletron-app-stil
- `desktop/icon.png` — 512×512 shield/checkmark-icon (512+128px)
- `desktop/LICENSE.txt` — fri software-licens med Pro-klausul
- Verificeret: `node --check` alle 4 JS-filer OK; end-to-end test mod example.com → 100/A/0 findings; `npm install` + `npm start` kører (macOS, Apple Silicon)
- Distribueret som kildekode-zip (17 KB) via /downloads — Cloudflare Pages 25 MB grænse
- `site/downloads.html` opdateret med desktop-sektion + JSON-LD SoftwareApplication
- Deployet + live-verificeret (HTTP 200, zip download OK, health_check 60/60)
- Pro-licens ($29/år) klar til Lemon Squeezy når API-nøgle er tilgængelig

### Blog: "Automated Accessibility Scanning from the Command Line" **(ny i iteration 41)**
- `site/blog/accessibility-scanner-cli.html` via `make_blog.py` (nyt job-dict)
- 16 regler med WCAG-referencer, npm+Python-installation, komplet
  GitHub Actions-workflow-eksempel, ærlig sektion om automatiseringens grænser,
  5 FAQ'er, interne links til EAA/WCAG-indlæg
- Kort på forsiden + sitemap.xml-entry (31 URL'er) · health_check 60/60 ·
  JSON-LD valideret · deployet og live-verificeret

### npm-pakke: @mahope/eaa-scanner 1.0.0 **(iteration 40)**
- `scanner/npm/eaa-scanner/index.js` — fuld JS-port af scannerkernen:
  samme 16 regler som Python, inkl. WCAG 1.4.3 kontrastberegning.
  Egen HTML-tokenizer, zero dependencies, Node ≥ 18.
- `scanner/npm/eaa-scanner/cli.js` — `eaa-scan` CLI: flere targets,
  `--json`, `--fail-on error|warning` til CI (exit 0/1).
- `scanner/npm/eaa-scanner/test.js` — selvtest (11 forventede regler på
  defekt HTML); verificeret identisk output med Python-kernen (0/D).
- Distribueret fra eget site: `npm install https://hermes-passiv.pages.dev/
  downloads/mahope-eaa-scanner-1.0.0.tgz` — verificeret live end-to-end.
- `/downloads`-siden opdateret med Node-sektion og fil-link.

## Iteration 55 (27/8) — AI Compliance Assistant (nyt format)

**Nyt produkt, nyt format:** AI-drevet compliance Q&A chat (EAA/NIS2/GDPR)
- `site/_worker.js` — ny route `/api/compliance-ai` (POST → OpenRouter proxy):
  system prompt med compliance-ekspertise, input-validering, harmful filter,
  fejlhåndtering (API-key mangler, OpenRouter ned, tomt svar, netværksfejl)
- `site/compliance-ai.html` (~15 KB) — chat-grænseflade: dark theme, auto-resize
  input, Enter-send, typing indicator, markdown-formattering, forslagschips,
  FAQ-sektion, JSON-LD WebApplication, SEO meta
- Cloudflare Pages secret `OPENROUTER_API_KEY` sat via wrangler (0 kr)
- Integration: index.html (hero-knap + "3 free tools"), sitemap (52 URL'er)
- Verificeret: 60/60 health_check, live worker-svarer korrekt, sitemap valid

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

## Iteration 26 (24/8)

- make_blog.py er nu regenererbar kilde til ALLE 4 blogindlæg: cookie-consent-
  jobbet indskrevet som rigtigt job-dict (det gamle script var slettet og havde
  produceret defekt output: rå slug-h2'er, "GDPR GDPR", dobbelte pile, tomme <p>)
- Slug-h2 rettet på gdpr-dpa + nis2-incident blogs
- Nyt blogindlæg: site/blog/wcag-22-what-changes.html (WCAG 2.2, ~11.6KB)
- Index 7 blog-kort, sitemap 22 URLs. health_check 60/60, deployet + verificeret.

## Iteration 25 (24/8) — forbedringer + cookie consent blog

- Guide-links extensionless: index.html + scan.html (alle 10 guides, fjernet .html)
- 3 manglende guides tilføjet på scan.html (PrestaShop, Weebly, Magento) — både i guide-liste og JS platform detection
- Nyt blogindlæg: "Cookie Consent & GDPR Compliance for Web Agencies" (~12.2KB, site/blog/)
- Index.html: 5 → 6 blog-kort, sitemap: 20 → 21 URLs
- health_check 60/60, deployet og live-verificeret
- Budget: 0 kr. Blokering: uændret (KDP-konto fra Mads)
## Iteration 27 (24/8)

- Nyt SEO-blogindlæg: site/blog/gdpr-fines-2026.html ("GDPR Fines in 2026",
  ~13.4KB, ~1.290 ord) — job-dict i make_blog.py. Faktatjekket via 1 søgning:
  Meta €1,2Mrd (under appeal), TikTok €530M nr. 2, Amazons €746M annulleret
  marts 2026, €1,2Mrd/år 2025, to-tier bodsystem Art. 83.
- Index.html: 7 → 8 blog-kort. sitemap.xml: 22 URLs (XML-valid).
- Scanner-tjek af ALLE 8 blogsider live: samtlige 100/A.
- health_check.py 60/60. Deployet + curl-verificeret (200, indhold OK,
  index linker, sitemap indeholder entry).


## Iteration 83 (28/8) — brugsmåling + template-downloads

- **trackEvent**: track.js fik `window.trackEvent(event)`; koblet på alle 11
  værktøjer (generate, scan, finish, ask). /api/track gemmer `<path>@<event>`
  — næste iteration kan måle ægte brug, ikke kun besøg.
- **/ropa-template** + `/downloads/ropa-template.md` og
  **/privacy-policy-template** + `/downloads/privacy-policy-template.md`:
  downloadebare GDPR-skabeloner som link-magneter på søgte termer.
- Sitemap 68 URLs, IndexNow pinget (200), health_check 71/71,
  deployet og live-verificeret.

## Iteration 91 (28/8) — Color Blindness Simulator

- `/color-blindness-simulator` (EN) + `/color-blindness-simulator-da` (DA):
  simuler protanopi, deuteranopi og tritanopi på op til 10 farver.
  Viénot/Brettel/Mollon-matricer i lineær RGB, severity-slider (0-100 %),
  live tekst-preview, aria-labels, fejlbeskeder, track.js, JSON-LD WebApplication.
- Node-test: gyldige outputs, severity=0 = identitet, protanopisk rød → (88,88,41).
- Indkobling: sitemap (74 URLs), free-tools.html-kort, llms.txt,
  krydslinks fra palette-generator-siderne, hreflang EN↔DA.
- health_check.py 71/71 · deployet + curl-verificeret live · IndexNow pinget
  (74 URLs → 200). Indeksering: stadig ingen treff i søgemaskinen bag backenden.
