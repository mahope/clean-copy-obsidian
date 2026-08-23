---
# STATUS — 27. august 2026, iteration 49

**Fokus: 2 nye platform-blogs via make_blog-motoren — PrestaShop (EAA) og
Joomla (BITV/EN 301 549).**
- `make_blog.py` udvidet med to job-dicts:
  - **`/blog/prestashop-eaa-accessibility`** (~12,6 KB) — PrestaShop + EAA:
    back office-fixes (produkt-Legend/alt), marketplace-theme-semantik,
    facetterede filtre, checkout-fokus, modul-audit. E-handel uden
    mikro-undtagelse. CTA: gratis scanner + PrestaShop-guiden.
  - **`/blog/joomla-bitv-accessibility`** (~12,6 KB) — Joomla + BITV 2.0/BFSG:
    editor-alt-disciplin, "Read more: {title}", Protostar-era templates,
    extension-audit, tilgængelighedserklæring. Rammer tysk offentlig sektor.
- Begge med Article JSON-LD, FAQ-sektion, related-posts krydslinks,
  extensionless kanoniske URL'er.
- `index.html`: 2 nye blog-kort (25 i alt).
- `sitemap.xml`: 43 → **45 URL'er**, XML-valid; alle locs matcher eksisterende
  filer (0 manglende).
- Verificering: JSON-LD-audit på ALLE site-HTML-filer: **0 fejl** ·
  health_check **60/60** · deployet · live curl: begge indlæg 200 med korrekt
  `<h1>`/title (første hentning ramte edge-cache; cb-bust bekræftede det nye
  indhold), forsiden linker dem begge, live sitemap = 45 inkl. begge nye.
- Notat: /scan.html's PLATFORM_GUIDES + guide-liste var allerede komplette
  (TYPO3 manglede IKKE — tidligere grep-artefakt).

### Søgninger: 0 af 12 (alle fakta allerede faktatjekket i tidligere iterationer)
### Budget: 0 kr af 1.000 DKK

## Blokering (UÆNDRET — oversigt)
**Amazon KDP-konto** (5 e-bøger klar i ebook/) · **Gumroad-konto**
(ComplianceDocs klar i products/) · **Chrome Web Store dev-fee $5**
(extension færdig i scanner/extension/) · **PyPI/npm-token**.

## Hvad næste iteration bør gøre
1. Samme konto-påmindelse — fortsat dét der adskiller os fra første krone.
2. Platform-blog-motoren har nu dækket alle 15 guides. Nye blogkandidater:
   sammenlignings-indlæg ("PrestaShop vs Shopify accessibility") eller en
   DK-sprogversion af scansiden (hreflang).
3. Overvej "platforms-hub"-side der linker alle guides + blogs (intern SEO).
# STATUS — 27. august 2026, iteration 48

**Fokus: 2 nye platform-blogs via make_blog-motoren — Wix (EAA) og
Magento/Adobe Commerce (EAA).**
- `make_blog.py` udvidet med to job-dicts:
  - **`/blog/wix-eaa-accessibility`** (~12,4 KB) — Wix + EAA/WCAG: Editor-
    fixes, strips/kontrast, hover-menuer, app-audit, separat mobil-layout.
    Rammer de mange EU-småvirksomheder på Wix. CTA: gratis scanner.
  - **`/blog/magento-eaa-accessibility`** (~12,4 KB) — Magento/Adobe Commerce:
    Luma-theme-arv, layered navigation, checkout-fokusstyring, extension-audit,
    EN 301 549-dokumentation. E-handel = ingen mikro-virksomhedsfristelse.
- Krydslinker til eksisterende platformsguides (/guides/wix-accessibility-check,
  /guides/magento-accessibility-check) og nabo-blogs.
- `index.html`: 2 nye blog-kort (19 i alt).
- `sitemap.xml`: 41 → **43 URL'er**, XML-valid.
- Verificering: JSON-LD-audit på alle HTML-filer: **0 fejl** · health_check
  **60/60** · deployet · live curl: begge indlæg 200 med korrekt h1, forsiden
  linker dem begge, live sitemap indeholder begge.

### Søgninger: 0 af 12 (alle fakta allerede faktatjekket i tidligere iterationer)
### Budget: 0 kr af 1.000 DKK

## Blokering (UÆNDRET — oversigt)
**Amazon KDP-konto** (5 e-bøger klar i ebook/) · **Gumroad-konto**
(ComplianceDocs klar i products/) · **Chrome Web Store dev-fee $5**
(extension færdig i scanner/extension/) · **PyPI/npm-token**.

## Hvad næste iteration bør gøre
1. Samme konto-påmindelse — fortsat dét der adskiller os fra første krone.
2. Blog-motoren kan fortsætte billigt: kandidater er PrestaShop/EAA eller
   Joomla/BITV — eller en DK-sprogversion af scansiden (hreflang).
3. Overvej at krydslinke de nyeste blogs fra scan.html's guide-liste.

---
# STATUS — 27. august 2026, iteration 47

**Fokus: 2 nye platform-blogs via make_blog-motoren — Drupal (WCAG/EAA) og
Squarespace (EAA).**
- `make_blog.py` udvidet med to job-dicts:
  - **`/blog/drupal-wcag-accessibility`** (~12,6 KB) — Drupal core/Olivero-
    baseline, contrib-modul-audit, Views/form/indholds-fixes. Rammer bureauer
    og offentlig sektor.
  - **`/blog/squarespace-eaa-accessibility`** (~12,7 KB) — Squarespace
    template-fikspunkter: site styles, alt text, headings, code injection.
    CTA på begge: gratis scanner + tilhørende platformsguide.
- Begge med Article JSON-LD, FAQ, related-posts krydslinks, extensionless
  kanoniske URL'er.
- `index.html`: 2 nye blog-kort (17 i alt).
- `sitemap.xml`: 37 → **41 URL'er** (XML-parser OK; tællingen inkluderer de
  2 nye + eksisterende).
- Verificering: health_check **60/60** · JSON-LD-audit på alle HTML-filer:
  **0 fejl** · deployet · live curl: begge indlæg 200 med korrekt h1,
  forsiden linker dem, live sitemap indeholder begge.

### Søgninger: 0 af 12 (alle fakta allerede faktatjekket i tidligere iterationer)
### Budget: 0 kr af 1.000 DKK

## Blokering (UÆNDRET — oversigt)
**Amazon KDP-konto** (5 e-bøger klar i ebook/) · **Gumroad-konto**
(ComplianceDocs klar i products/) · **Chrome Web Store dev-fee $5**
(extension færdig i scanner/extension/) · **PyPI/npm-token**.

## Hvad næste iteration bør gøre
1. Samme konto-påmindelse — fortsat dét der adskiller os fra første krone.
2. Platform-blog-motoren kan fortsætte billigt: kandidater er Wix, Magento/
   Adobe Commerce eller PrestaShop — eller en DK-sprogversion af scansiden
   (hreflang).
3. Overvej at krydslinke de 4 nyeste blogs fra scan.html's platform-liste.

---
# STATUS — 27. august 2026, iteration 46

## Hvad denne iteration opnåede

**Fokus: to nye platform-blogs (Shopify/EAA, Webflow/EAA) + /scan-platform-detection udvidet.**

- `make_blog.py` udvidet med to job-dicts:
  - **`/blog/shopify-eaa-accessibility`** (~14,3 KB) — Shopify + EAA/WCAG:
    theme settings, Liquid-fixes, app-audit, checkout-konfiguration.
    CTA: gratis scanner.
  - **`/blog/webflow-accessibility-audit`** (~12,3 KB) — Webflow + EAA:
    div-soup headings, interactions/keyboard, Designer-workflow.
- `/scan.html`: de 4 nyeste guides (Ghost, TYPO3, Craft CMS, Umbraco) tilføjet
  til både guide-listen og JS platform detection (PLATFORM_GUIDES).
- `index.html`: 2 nye blog-kort (17 i alt). `sitemap.xml`: 37 → **39 URL'er**,
  XML-valid.
- Verificering: health_check **60/60** · JSON-LD-audit på alle blogsider:
  **0 fejl** (json.loads på hver blok) · deployet · live curl: begge indlæg
  200 med korrekt `<h1>`, /scan viser Umbraco-linket, forsiden linker
  Shopify-indlægget, sitemap live = 39.

### Søgninger: 0 af 12 (alle fakta allerede faktatjekket i tidligere iterationer)
### Budget: 0 kr af 1.000 DKK

## Blokering (UÆNDRET — oversigt)
**Amazon KDP-konto** (5 e-bøger klar i ebook/) · **Gumroad-konto**
(ComplianceDocs klar i products/) · **Chrome Web Store dev-fee $5**
(extension færdig i scanner/extension/) · **PyPI/npm-token**.

## Hvad næste iteration bør gøre
1. Samme konto-påmindelse — fortsat dét der adskiller os fra første krone.
2. Blog-kandidater tilbage: "Drupal WCAG audit", "Squarespace EAA" — eller
   DK-sprogversion af scansiden (hreflang). Motoren er varm, ~30 min pr. indlæg.
3. Overvej en programmatisk "platforms-hub"-side der linker alle 14 guides +
   platform-blogs (intern link-struktur for SEO).

---
# STATUS — 27. august 2026, iteration 45

## Hvad denne iteration opnåede

**Fokus: to nye platformsspecifikke SEO-blogindlæg (trafik → scanninger).**

- `make_blog.py` udvidet med to job-dicts:
  - **`/blog/typo3-accessibility-bitv-check`** (~12,7 KB) — TYPO3 + BITV 2.0 /
    EN 301 549 / BFSG. Rammer den tyske offentlige sektor-målgruppe.
    CTA: gratis scanner.
  - **`/blog/ghost-eaa-accessibility`** (~12,4 KB) — Ghost + EAA/WCAG 2.2,
    inkl. membership/checkout-flow-tjek som kun Ghost har. CTA: gratis scanner.
- Begge med Article JSON-LD, FAQ-sektion, related-posts krydslinks,
  extensionless kanoniske URL'er.
- `index.html`: 2 nye blog-kort (15 i alt).
- `sitemap.xml`: 35 → **37 URL'er**, XML-parser OK.
- Verificering: health_check **60/60** · JSON-LD-audit på alle HTML-filer:
  **0 fejl** · deployet · live curl: begge indlæg 200 med korrekt `<h1>`,
  forsiden linker dem, sitemap live indeholder begge.

### Søgninger: 0 af 12 (alle fakta allerede faktatjekket i tidligere iterationer)
### Budget: 0 kr af 1.000 DKK

## Blokering (UÆNDRET — oversigt)
**Amazon KDP-konto** (5 e-bøger klar i ebook/) · **Gumroad-konto**
(ComplianceDocs klar i products/) · **Chrome Web Store dev-fee $5**
(extension færdig i scanner/extension/) · **PyPI/npm-token**.

## Hvad næste iteration bør gøre
1. Samme konto-påmindelse — fortsat dét der adskiller os fra første krone.
2. Flere platform-blogindlæg er billigt nu hvor motoren er varm:
   kandidater er "Shopify EAA", "Webflow accessibility audit",
   "Drupal WCAG" — eller en DK-sprogversion af scansiden (hreflang).
3. Overvej at tilføje de 14 guides til scan.html's platform-detection,
   hvis nogen mangler der.

---
# STATUS — 27. august 2026, iteration 44

**Fokus: fire nye platformsguides via make_guides-motoren (Ghost, TYPO3,
Craft CMS, Umbraco).** make_guides2.py oprettet; index-kort; sitemap 35 URL'er;
health_check 60/60; JSON-LD 0 fejl; deployet + live-verificeret (200, korrekt
h1, 0 Joomla-rester, sitemap live).

Søgninger: 0 af 12. Budget: 0 kr. Blokering uændret (KDP, Gumroad,
Chrome dev-fee, PyPI/npm-token).
