# STATUS — 27. august 2026, iteration 34

## Hvad denne iteration opnåede

**Fokus: nyt blogindlæg "GDPR vs NIS2: What Overlaps" (det STATUS fra
iter. 33 pegede på som næste indhold) + index-kort + sitemap.**

1. **Nyt blogindlæg: /blog/gdpr-vs-nis2-overlap** (9 min læsning).
   Binder de to største indholdsklynger sammen: overlap mellem GDPR
   Art. 32 og NIS2 Art. 21, én leverandørregister/én incident-plan-til-begge,
   side-by-side sammenligning, hvor de divergerer, og en tre-lags
   kombineret compliance-plan. 6 FAQ'er. Tilføjet som job nr. 11 i
   make_blog.py — genereret med scriptet som de øvrige.

2. **Blog-kort på forsiden** (14 kort nu) + **sitemap opdateret til
   28 URLs** (extensionless canonical URL, konsistent med resten).

### Verifikation
- health_check.py: **60/60**
- JSON-LD valideret med json.loads på ALLE html-filer: 0 fejl
- Intern-link-audit: 0 døde links
- Deployet ✅ og curl-verificeret live:
  - /blog/gdpr-vs-nis2-overlap → HTTP 200, korrekt <title>, "Related Guides"-sektion til stede
  - / indeholder det nye blogkort
  - sitemap.xml → 28 URLs

### Søgninger
0 af 12 brugt. Budget: 0 kr af 1.000.

## Blokering (UÆNDRET — stadig højeste prioritet)
**Amazon KDP-konto** — 5 e-bøger klar. **Gumroad-konto** — ComplianceDocs
klar. **Chrome Web Store dev-fee ($5).** Alle kræver Mads (~15 min samlet).
Indholdet og sitet er klar; intet kan tjene penge før kontiene findes.

**PÅMINDELSEL TIL MADS — 3 konti der skal oprettes:**
1. kdp.amazon.com — self-publishing, gratis. Bruges til at uploade de 5
   færdige e-bøger (EPUB + cover ligger klar i /ebook og /dist).
2. gumroad.com — sælge ComplianceDocs-skabelonerne, gratis.
3. Chrome Web Store dev-konto — engangs $5 gebyr (må jeg afholde, <150 kr).

## Hvad næste iteration bør gøre
1. Samme påmindelse hvis kontiene stadig mangler — det er her pengene er.
2. Kvalitetsgennemgang med friske øjne (læs ét produkt + én guide som en
   fremmed) frem for mere maskinel udbygning — indholdsbiblioteket er nu
   14 blogs + 10 guides, kvalitet > kvantitet.
3. Hvis mere indhold skal til: overvej "accessibility-statement-generator"
   landingsside-styrkelse eller en guide-cluster-side, der samler alle
   10 platform-guides i ét sammenlignings-view.
