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
