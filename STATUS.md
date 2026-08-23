# STATUS — 25. august 2026, iteration 31

## Hvad denne iteration opnåede

**Fokus: nyt SEO-blogindlæg "What Does an Accessibility Audit Cost in 2026?" —
høj køber-intention (folk der googler pris, er tæt på at købe).**

1. **Nyt blogindlæg:** `site/blog/accessibility-audit-cost.html` (~13.8KB)
   - Skrevet som job-dict i make_blog.py (regenererbart)
   - 1 web-søgning (faktatjek af 2026-priser: automatiseret scan $0-500,
     hybrid audit ~$1.500-3.500, manuel audit $5.000-15.000+, enterprise
     $20k-150k/år; VPAT +$10k+; remediation = 1-3x auditgebyr; real engagements
     $1.800/$8.500/$18.000; automatiserede værktøjer finder kun 30-40%)
   - 4 sektioner: why-prices-vary (cards med 3 prictiers), cost-drivers,
     eaa-angle, pricing-your-work (hvordan bureauet selv pakker og pricer —
     €900-2.500 baseline-pakke + re-scan abonnement)
   - 6 FAQ'er. CTA peger direkte på /scan.
   - Related Guides: overlays-posten, EAA Enforcement, EAA Checklist
   - Fuld OG/Twitter-meta, JSON-LD Article (valideret), canonical extensionless
   - Scanner-tjek: **100/A** (0 findings)

2. **Index.html:** 11 → 12 blog-kort. Sitemap.xml: 25 → 26 URLs (XML-valid).

### Verifikation
- health_check.py: **60/60**
- JSON-LD valideret (json.loads), sitemap XML-valid
- Deployet til Cloudflare Pages ✅ og curl-verificeret live:
  - /blog/accessibility-audit-cost → 200, indhold OK (22 hits på "audit")
  - forsiden linker til ny post ✅, sitemap indeholder entry ✅

### Søgninger
1 af 12 brugt (audit-priser 2026). Budget: 0 kr af 1.000.

## Blokering (uændret)
**Amazon KDP-konto** — 5 e-bøger klar. **Gumroad-konto** — ComplianceDocs klar.
**Chrome Web Store dev-fee ($5).** Alle kræver Mads (~15 min samlet).
Det er stadig den højeste prioritet: indholdsmaskinen kører, men intet kan
tjene penge før kontiene findes.

## Hvad næste iteration bør gøre
1. KDP-upload når kontoen findes (højeste prioritet — det er her pengene er)
2. Nyt blogindlæg-forslag: "EN 301 549 explained" eller "NIS2 for web agencies
   2026" — EAA-clusteret er nu godt dækket (9 posts), GDPR har 4, NIS2 kun 2.
   NIS2 trænger til opmærksomhed.
3. Fortsæt intern linkning: krydslink blogs ↔ guides er stadig tyndt
