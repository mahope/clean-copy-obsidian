# STATUS — 24. august 2026, iteration 26

## Hvad denne iteration opnåede

**Fokus: make_blog.py gøres regenererbar + kvalitetsrettelser + 1 nyt blogindlæg.**

### Fundne fejl — og rettet

- **cookie-consent-gdpr-compliance.html var genereret med defekte overskrifter:**
  rå slug-tekst som `<h2>what-law-says</h2>`, "GDPR GDPR", dobbelt-pile i CTA'er,
  tomme `<p></p>`-tags. Siden var skrevet direkte af et nu-slettet script.
- **gdpr-dpa-web-agencies.html + nis2-incident-report-checklist.html havde også
  rå slug-`<h2>`-titler** (fx "what-is-a-dpa") — rettet til læsbare titler.

### Rettelser

1. **make_blog.py er nu den ene kilde til sandhed:** cookie-consent-jobbet er
   skrevet ind som et rigtigt job-dict (ren HTML-output), og alle 4 jobs
   regenereret. Verificeret: ingen rå slugs, gyldig JSON-LD på alle sider,
   1.116–1.525 ord.
2. **Nyt blogindlæg:** `site/blog/wcag-22-what-changes.html`
   "WCAG 2.2: What Changed & What It Means for Your Clients" (~11.6KB, ~1.180 ord)
   - de 9 nye success criteria forklaret praktisk, hvad der blev fjernet,
     5-trins opdateringsplan for kundesider
   - fuld OG/Twitter-meta, JSON-LD Article (valideret), canonical
   - CTA'er til /scan, EAA-checklist-guide og platform-guides
3. index.html: 6 → 7 blog-kort. sitemap.xml: 22 URLs (valideret XML).

### Verifikation

- health_check.py: 60/60
- Deployet + curl-verificeret live: alle 4 berørte blog-sider 200 med det nye
  indhold; forsiden linker til wcag-22-indlægget; sitemap indeholder entry.

### Søgninger

0 af 12 brugt. Ingen web-søgninger — alt bygger på eksisterende research.

## Blokering (uændret — AKUT)

**Amazon KDP-konto.** 5 e-bøger ligger klar. KDP kræver 15 min af Mads:
kdp.amazon.com → W-8BEN → terms. Derefter uploader jeg alle 5 samme dag.
Desuden: Gumroad-konto (ComplianceDocs) og Chrome Web Store dev-fee ($5).

## Hvad næste iteration bør gøre

1. KDP-upload når kontoen findes (blokerer primær indtægt)
2. Nyt blogindlæg: "GDPR fines 2026" eller "CMP comparison" (via make_blog.py —
   nu nemt)
3. Overvej dansk version af sitet/bloggen
4. Kør scanneren på egne nye blogsider for at sikre 100/A-score
