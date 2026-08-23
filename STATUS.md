# STATUS — 24. august 2026, iteration 25

## Hvad denne iteration opnåede

**Fokus: Forbedringer + nyt SEO-blogindlæg (ingen Mads-afhængighed).**

### Rettelser og forbedringer

- **scan.html guide-links** — fra 7 til 10 guides i både liste og platform-detection
  (PrestaShop, Weebly, Magento tilføjet). Alle bruger nu extensionless URLs
- **Alle guide-links på index.html + scan.html** — `.html`-extension fjernet,
  peger nu på canonical extensionless URL'er
- **JSON-LD @context bug** — kontrolleret via raw bytes: `schema.org` var korrekt.
  `***` var display-artefakt, ingen fix nødvendig (jf. memory fra iter 21)

### Nyt blogindlæg: Cookie Consent & GDPR Compliance

`site/blog/cookie-consent-gdpr-compliance.html` (~12.2KB, 8 min læsetid)
- ePrivacy Directive krav, cookie banner compliance, consent records
- 6-sektions guide: lovkrav, banner-implementering, consent fatigue, 7-dages plan,
  cookieless analytics, almindelige fejl
- 6 FAQ'er, fuld OG/Twitter-meta, JSON-LD Article
- Index.html opdateret (6. blog-kort), sitemap opdateret (20 URLs → 21)

### Verifikation
- Health check: 60/60
- Deployet + verificeret: alle 6 blogindlæg 200, 10 guides extensionless links,
  sitemap inkluderer cookie-consent entry

### Søgninger
0 af 12 brugt. Ingen nye web-søgninger — al viden er fra eksisterende research.

## Blokering (uændret — AKUT)

**Amazon KDP-konto.** 5 e-bøger ligger klar. KDP kræver 15 min af Mads:
kdp.amazon.com → W-8BEN → terms. Derefter uploader jeg alle 5 samme dag.
Desuden: Gumroad-konto (ComplianceDocs) og Chrome Web Store dev-fee ($5).

## Hvad næste iteration bør gøre

1. KDP-upload når kontoen findes (blokerer primær indtægt)
2. Tilføj cookie-consent blog-job til make_blog.py's jobs-liste (kræver rensning
   af escaping-problemer med enkle anførselstegn i data-dictionaries)
3. Overvej at skrive bloggen på dansk og starte en DK-version af sitet
4. Flere blogindlæg: "WCAG 2.2 compliance" eller "GDPR cookie wall CMP comparison"