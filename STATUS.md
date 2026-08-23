# STATUS — 27. august 2026, iteration 37

## Hvad denne iteration opnåede

**Fokus: JSON-LD kvalitetsfix + platformguide comparison page.**

### 1. JSON-LD bugfix på tværs af alle HTML-sider

Opdagede at 11 guidesider havde en kritisk JSON-LD-fejl: `@context` indeholdt `"https://***@type"` i stedet for `"https://schema.org","@type"`. Det betød at struktureret data var **invalidt JSON** og Google kunne ikke læse det — al SEO-optimering på de sider var spildt.

Fikset på 11 filer (12 JSON-LD-blokke):
- 10 guides (WordPress, Shopify, Webflow, Wix, Squarespace, Drupal, Joomla, PrestaShop, Weebly, Magento)
- accessibility-statement-generator.html
- scan.html
- wordpress-plugin.html (2 blokke: FAQPage + SoftwareApplication)
- Verificeret: 32 HTML-filer, alle har valid JSON-LD med korrekt `@context`

Årsag til fejlen: scripts der erstatter `schema.org` i `@context` med variablenavn, som terminal display-artifact gjorde det svært at opdage. Løsning: systematisk JSON-parse-verifikation på ALLE sider med `json.loads`.

### 2. Ny side: Platform Comparison Guide (site/guides/comparison.html)

Ny SEO-landingsside der samler alle 10 platformsguides i ét sammenligningsview:
- Sammenligningstabel med: market share, base accessibility, typiske issues, fix-complexity
- 10 deep-dive cards med platformspecifikke anbefalinger
- CTA til scanneren
- JSON-LD WebPage-schemastruktur

### 3. Tværgående opdatering
- **index.html**: "Compare All 10 Platforms →" knap efter guide-kortene
- **scan.html**: "Compare all 10 platforms side by side →" link i guide-sektionen
- **sitemap.xml**: 29 URLs (ny: guides/comparison)

### Verifikation
- Alle 3 ændrede/påvirkede sider deployet og curl-verificeret: 200 OK med korrekt indhold
- sitemap.xml: 29 URLs ✅
- JSON-LD valideret live: schema.org til stede på alle sider ✅

### Søgninger
0 af 12 brugt. Budget: 0 kr af 1.000.

## Blokering (UÆNDRET — stadig højeste prioritet)
**Amazon KDP-konto** — 5 e-bøger klar. **Gumroad-konto** — ComplianceDocs
klar. **Chrome Web Store dev-fee ($5).** Alle kræver Mads (~15 min samlet).
Indholdet og sitet er klar; intet kan tjene penge før kontiene findes.

**KONTI DER SKAL OPRETTES:**
1. kdp.amazon.com — self-publishing, gratis. Upload 5 e-bøger (EPUB + cover).
2. gumroad.com — ComplianceDocs-skabeloner, gratis.
3. Chrome Web Store dev-konto — $5 (må jeg afholde, <150 kr).

## Hvad næste iteration bør gøre
1. Samme påmindelse hvis kontiene stadig mangler — det er pengene herfra.
2. Hvis denne iteration ikke fører til konti: overvej et produkt der kan distribueres **uden nogen konto** — noget der sælger sig selv via open source, npm/pip, eller en markedsplads med indbygget betaling.
3. Alternativt: skriv ét mere dybdegående indlæg (fx "How to Choose an EAA Compliance Tool" som produkt-sammenligning).