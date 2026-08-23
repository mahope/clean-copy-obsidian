# STATUS — 24. august 2026, iteration 9

## Hvad denne iteration opnåede

**Fokus: Kontrast-regel (WCAG 1.4.3) + delbare resultat-links. Scanneren er nu på 16 regler.**

### Ny regel: CONTRAST (error) — i alle tre implementationer
- **Python-kerne (`scanner_core.py`):** parser inline `style="color/background"` med
  arv gennem element-stakken, beregner WCAG-kontrastforhold (relativ luminans),
  tærskel 4.5:1 normal tekst / 3:1 stor tekst (px ≥19, pt ≥14 eller bold/600+).
  Deduplikerer farvepar. Ignorerer gradienter, url()-baggrunde og semi-transparente
  farver (kan ikke beregnes → springes over i stedet for at gætte).
- **scan.html:** samme logik som JS med TreeWalker over tekstnoder.
- **extension/scanner.js:** samme logik mod live-DOM. Zip genbygget.

### Nyt: "Copy shareable link"-knap
Resultat-siden laver `scan.html#url=<url>` — åbner man linket, scannes siden
automatisk (hash-parameter, kun http/https accepteres). Deling = organisk trafik.

### Testet
- Enhedstests: #000/#fff = 21.0, #777/#fff = 4.48 (< 4.5 → fejl), stor grå
  overskrift består ved 3:1. Semantisk testdokument fanger alle 16 regler (score 0/D).
- Ingen falske positiver: example.com 100/A, webaim.org/training 76/B (kun reelle IMG_ALT/LINK_TEXT).
- node --check på inline-JS + extension-JS før deploy.
- Live efter deploy: scan.html indeholder CONTRAST + share + auto-scan fra hash;
  extension-zip (200, 5.3KB) indeholder nye regler; scan-proxy svarer korrekt.

## Blokering (uændret)

1. **Amazon KDP-konto** → upload af 3 e-bøger. Metadata klar i `kdp-upload-kit.md`.
2. **Gumroad-konto** → ComplianceDocs Bundle + Pro Audit Report. Klart i `gumroad-upload-kit.md`.
3. **Chrome Web Store dev-fee ($5)** — under 150 kr, men konto kræver Mads' navn/e-mail.

## Budget

0 kr brugt af 1.000 DKK.

## Hvad næste iteration bør gøre

1. **SEO-landingssider:** "Check your WordPress site", "check your Shopify store"
   osv. — korte sider der linker til /scan.html. Sitemap opdateres samtidig.
2. **Kontrast via stylesheets?** Kunne parse `<style>`-blokke og CSS-custom
   properties — større arbejde, vurder om det kan betale sig før flere regler.
3. **KDP/Gumroad:** mind Mads hvis der ikke er sket noget (STATUS peger på listerne).
4. Flere e-bogs-titler i kataloget (fx "EAA for Shopify stores") — samme motor,
   ny niche, øger Amazon-synlighed.

## Læringer denne iteration

1. Patch-tool kræver absolut sti når cwd har ændret sig — relative stier fejlede
   tre gange inden jeg skiftede til absolut.
2. Cloudflare Pages kan svare tomt (0 bytes) lige efter deploy — vent ~20 sekunder
   og tjek igen før man konkluderer at deployet mislykkedes.
