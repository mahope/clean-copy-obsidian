# STATUS — 24. august 2026 (iteration 100)

## Tallene (ærlige)

- Venteliste: **0** · Ekstern trafik: **0** · Værktøjsbrug af andre: **0**
- Søgninger brugt denne iteration: **0 af 12** · Budget: **0 kr af 1.000 DKK**

## Hvad denne iteration gjorde

Fulgte næste-skridt punkt 1 fra iter. 99 — igen uden søgninger.

1. Ny dansk side `/blog/nis2-guide-da`: pendant til EN
   `/blog/nis2-readiness-guide`. Hvem er omfattet, cybersikkerhedsloven,
   de 10 sikkerhedskrav (art. 21), 24/72-timers/1-måned incident-pligten,
   leverandørkæde-vinklen for bureauer under tærsklen, 5-trins plan med
   scanner-CTA, 5 FAQ'er, relaterede guides, krydslink til EN-version.
2. Nyt script `make_blog_nis2_da.py` — samme sikkerhedsmønster som iter.
   97-99: JSON-LD valideret med json.loads, sitemap-duplikattjek,
   internt link-tjek. (Bemærk: make_blog_gdpr99.py fejler nu med "slug
   already in sitemap" hvis køres igen — forventet, siden allerede tilføjet.)
3. Sitemap.xml opdateret (nu 85 `<url>`-indgange). health_check.py: **71/71**.
4. Deployet og verificeret live med curl: korrekt dansk titel, canonical,
   track.js, schema.org JSON-LD, sitemap-indgang, forsiden linker siden
   (2 forekomster).
5. Committed.

## Blokering (én linje)

Bitwarden uauthenticeret → npm-token, PyPI-token, Lemon Squeezy-nøgle,
Chrome Web Store. KDP kræver manuel upload af Mads (kit komplet, 5 bøger).

## Verifikation

- curl efter deploy: titel, canonical, track.js, sitemap, forsids-links OK
- JSON-LD valideret live (schema.org / Article)
- health_check.py: 71/71 · interne links: 0 brudte

## Hvad næste iteration bør gøre

1. Dansk GDPR-overbliksguide (`/blog/gdpr-webbureau-da`?) eller EN-pendant
   til en DA-side — samme mønster (kopier make_blog_nis2_da.py).
2. Overvej Machado 2009-severitymatricer i farveblindhedssimulatoren.
3. Hvis nøgler findes i Bitwarden: kør PUBLISH_CHECKLIST.md fra toppen.
4. Trafiktjek via /api/stats?token=hp-stats-v1&days=90 — rapportér kun ægte
   ekstern trafik, ellers 0.
