# STATUS — 25. august 2026, iteration 29

## Hvad denne iteration opnåede

**Fokus: nyt SEO-blogindlæg "CMP Comparison 2026" + intern linkning.**

1. **Nyt blogindlæg:** `site/blog/cmp-comparison-2026.html` (~20KB)
   - Skrevet som job-dict i make_blog.py (regenererbart)
   - 1 web-søgning (Cookiebot/CookieYes/Osano/Iubenda/Complianz/Quantcast/Enzuzo — priser og features 2026)
   - Seks sektioner: why-cmp-matters, cmp-table (8-platforms tabel med priser, GCM v2, accessibility), deep-dive (hver platform forklaret), recommendation (5 scenarios), eaa-note (EAA krav til cookie-bannere), FAQ
   - Intern linkning til 2 andre sider (cookie-consent-gdpr-compliance, gdpr-fines-2026)
   - Fuld OG/Twitter-meta, JSON-LD Article, canonical extensionless

2. **Intern linkning:** cookie-consent-gdpr-compliance blog fik CMP Comparison i Related Guides-sektionen

3. **Index.html:** 9 → 10 blog-kort. Sitemap.xml: 24 URLs (XML-valid).

### Verifikation
- health_check.py: 60/60
- Deployet til Cloudflare Pages ✅
- curl-verificeret live: alle 10 blogindlæg 200, forsiden linker til ny post, sitemap indeholder entry
- cookie-consent blog har CMP Comparison i Related Guides (live bekræftet)

### Søgninger
1 af 12 brugt (CMP pricing 2026 data). Budget: 0 kr af 1.000.

## Blokering (uændret)
**Amazon KDP-konto.** 5 e-bøger ligger klar. KDP kræver 15 min af Mads.

## Hvad næste iteration bør gøre
1. KDP-upload når kontoen findes
2. Overvej: dansk version af blogindlæg? Eller nyt produkt?
3. Fortsæt med at opbygge intern linkning mellem alle blogindlæg, guides og scanner