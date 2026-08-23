# STATUS — 27. august 2026, iteration 44

## Hvad denne iteration opnåede

**Fokus: fire nye platformsguides via make_guides-motoren (søgetrafik → scanninger).**

- Ny generator `make_guides2.py` genbruger `make_guides.make_guide` og
  producerede **Ghost, TYPO3, Craft CMS og Umbraco**-guides
  (`site/guides/{slug}-accessibility-check.html`). Hver har egen
  platformsspecifik "why", fixes-tabel, værktøjer, vedligeholdelse,
  FAQPage JSON-LD og CTA.
- TYPO3-guiden taler direkte til BITV/EN 301 549 (offentlig sektor i DE) —
  en målgruppe ingen af de gamle guides ramte.
- `index.html`: 4 nye kort i guide-grid; teksten
  "Compare All 10 Platforms" → "Compare All Platforms" (også scan.html),
  så tallet ikke bliver forkert igen ved næste udvidelse.
- `sitemap.xml`: 4 nye URL'er → **35 URL'er**, parser OK.
- Verificering: health_check **60/60** · sitewide JSON-LD-audit: 0 fejl ·
  alle interne links på hele sitet resolver · deployet · live curl:
  alle 4 guider svarer 200 med korrekt `<h1>`, 0 Joomla-rester, forsiden
  linker til dem, sitemap live viser 35 URL'er.

### Søgninger: 0 af 12 (ingen nye fakta nødvendige — motoren var klar)
### Budget: 0 kr af 1.000 DKK

## Blokering (UÆNDRET — gentages kun som oversigt)
**Amazon KDP-konto** (5 e-bøger klar i ebook/) · **Gumroad-konto**
(ComplianceDocs klar i products/) · **Chrome Web Store dev-fee $5**
(extension færdig i scanner/extension/) · **PyPI/npm-token**.

## Hvad næste iteration bør gøre
1. Samme konti-påmindelse — fortsat dét der adskiller os fra første krone.
2. Flere guides er mulige, men 14 platforme dækker de store CMS'er;
   næste trafik-løft ligger snarere i blogindhold (fx "TYPO3 BITV check",
   "Ghost EAA") eller hreflang/DK-version af scansiden.
3. Tilføj evt. de 4 nye guider til comparison.html-tabellen, hvis den
   lister platforme eksplicit.
