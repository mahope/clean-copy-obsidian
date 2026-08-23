# STATUS — 24. august 2026, iteration 17

## Hvad denne iteration opnåede

**Fokus: SEO-dybde på platform-guider + ny Joomla guide.** Sitet har 7 guides nu — alle udvidet fra ~300 til 1.500-3.100 ord, hver med platformsspecifikt, unikt indhold.

### 1. Alle 6 guides udvidet med SEO-dybt indhold
- WordPress (2.359 ord): WP-statistik, Gutenberg-problemer, tema-specifikke fix
- Shopify (1.911 ord): Liquid templates, Dawn/OS 2.0, Apps der hjælper vs. skader
- Webflow (2.173 ord): Interaktioner/animationer, Designer/Editor roller, Custom Code
- Wix (3.111 ord): Accessibility Wizard-analyse, Velo/Velo kodefælder, App Market-risiko
- Squarespace (2.606 ord): Fluid Engine vs Classic, Custom CSS, template-skift påvirkning
- Drupal (2.001 ord): Olivero/Claro, Editoria11y, CKEditor checker, Views rendering

Hver guide har nu:
- Platform-specifik intro (statistik, adoption, reelle udfordringer)
- "Platform-specific tools & fixes" sektion
- "Maintaining compliance" sektion
- Udvidet "Go deeper" med relevante ressourcer
- Flere FAQ-spørgsmål

### 2. Ny Joomla guide (1.485 ord)
- Joomla 4+5 improvements, JA Accessibility checker, TinyMCE checker
- Registeret i sitemap.xml, index.html, scan.html platform-detection
- Verificeret live: 200, korrekt indhold, scanner genkender Joomla

### 3. Bug fix: JSON-LD @context
- `https://***@type` → `https://schema.org` på alle 4 resterende guides (Shopify, Wix, Webflow, Squarespace)
- WordPress, Drupal og Joomla var allerede rettet af subagenterne
- Dette betyder at Google faktisk kan læse FAQPage-schemaet nu

### 4. Deployet og verificeret
- Alle 7 guides svarer 200 med 1.485-3.111 ord hver
- Homepage viser "7 platform-specific guides"
- Scanner genkender Joomla via meta generator
- Sitemap indeholder Joomla
- health_check.py: 60/60

## Søgninger
4 af 12 brugt. CompliScan AI research (platform checker competition). Ikke gentaget.

## Blokering (uændret)
1. **Amazon KDP-konto** → 5 e-bøger klar til upload.
2. **Gumroad-konto** → ComplianceDocs Bundle + Pro Audit Report.
3. **Chrome Web Store dev-fee ($5)** — kræver Mads' navn/e-mail.

Alt andet er bygget. Sitet har nu 7 SEO-udvidede guides, en fungerende scanner med platform-genkendelse, tæller og tracker på alle sider.

## Hvad næste iteration bør gøre
1. **Mind Mads om kontiene** — det er stadig den eneste vej til indtægt.
2. **Aflæs /api/stats** om 1-2 uger for at se om guid-udvidelserne trækker søgetrafik.
3. **Tilføj PrestaShop guide** (næststørste EU e-commerce platform efter WooCommerce, CompliScan dækker den).
4. **Byg "Accessibility Statement Generator"** — interaktivt værktøj der genererer EAA-compliant statements. Lead magnet uden at kræve nogen konto.