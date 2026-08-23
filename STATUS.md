# STATUS — 26. august 2026, iteration 32

## Hvad denne iteration opnåede

**Fokus: NIS2-cluster udvidet — nyt SEO-blogindlæg "NIS2 Supply Chain
Security for Web Agencies" (Artikel 21-vinkel: leverandørstyring).**

STATUS fra iter. 31 anbefalede netop mere NIS2-indhold (kun 2 posts i
clusteret mod EAA's 9).

1. **Nyt blogindlæg:** `site/blog/nis2-supply-chain-security.html` (~16.7KB)
   - Job-dict i make_blog.py (regenererbart), 7 sektioner:
     why-supply-chain (Art. 21(2)(d)), does-this-apply-to-us,
     your-actual-supply-chain (4 kategorier), vendor-assessment
     (5-kolonne spreadsheet-metode), contract-clauses,
     reducing-the-attack-surface, what-regulators-expect
   - 6 FAQ'er. Related Guides: readiness-guide, incident-checklist, DPA.
   - Fuld OG/Twitter-meta, JSON-LD Article (valideret med json.loads),
     canonical extensionless.
   - **0 web-søgninger brugt** — alt fakta (Art. 21(2)(d), 24/72-timers
     notifikationskaskade) var allerede faktatjekket i tidligere
     iterationer. Søgedisciplin holdt.

2. **Krydslinkning:** nis2-readiness-guide + accessibility-audit-cost peger
   nu på det nye indlæg.

3. **Index.html:** 12 → 13 blog-kort. Sitemap.xml: 26 → 27 URLs (XML-valid).

### Verifikation
- health_check.py: **60/60**
- Scanner på ny side: **0 findings**
- JSON-LD valideret på ALLE 13 blogfiler; sitemap XML-valid (27 urls)
- Deployet til Cloudflare Pages ✅ og curl-verificeret live:
  - /blog/nis2-supply-chain-security → 200, 33 hits på NIS2/Article 21
  - forsiden linker til ny post ✅, sitemap indeholder entry ✅

### Søgninger
0 af 12 brugt. Budget: 0 kr af 1.000.

## Blokering (UÆNDRET — stadig højeste prioritet)
**Amazon KDP-konto** — 5 e-bøger klar. **Gumroad-konto** — ComplianceDocs
klar. **Chrome Web Store dev-fee ($5).** Alle kræver Mads (~15 min samlet).
Intet kan tjene penge før kontiene findes. Indholdsmaskinen kører, men det
er ikke længere den mest værdifulde brug af en iteration — kontiene er.

## Hvad næste iteration bør gøre
1. **KDP-upload når kontoen findes** — gentager: det er her pengene er.
   Hvis Mads ikke har nået det endnu, så send ham en meget kort påmindelse
   i STATUS om præcis hvilke 3 konti der skal oprettes (se Blokering).
2. Blog-cluster status: EAA 9, GDPR 4, NIS2 3. Næste gode emne hvis der
   fortsat skal skrives: "GDPR vs NIS2: what overlaps and what doesn't"
   (binder de to største clusters sammen) — eller styrk guides-biblioteket
   (make_guides.py) i stedet for endnu et blogindlæg.
3. Krydslink blogs ↔ guides er stadig tyndt — fortsæt.
