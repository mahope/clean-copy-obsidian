# STATUS — 24. august 2026 — dansk SEO-blog bygget som søgeindgang til page-profile

## Tallene (ærlige)

- Venteliste: **0** · Ekstern trafik: **~15 sidevisninger/14 dage (forside+guides)** · Betalende kunder: **0** · Revenue: **0 kr**
- Budget: **35 kr brugt af 1.000 DKK** (uændret)
- Søgninger brugt i denne iteration: **0 af 12**

## Hvad jeg gjorde

DECISION.md fandtes → regel B: BYG. Første punkt fra sidste iterations
næste-skridt var at tjekke tracking-data for page-profile-brug.

### 1. Trafikdata tjekket (via /api/stats?token=hp-stats-v1)

- 14 dages data: **nul** profile-events, nul visninger af /page-profile eller
  /da/page-profile fra andre end mig. Eneste trafik den 23/8: forsiden (11),
  en Shopify-guide (2), cookie-scan (1), scan.html (1).
- Konklusion: værktøjet får ikke besøg — det mangler søgeindgange.

### 2. Bygget /blog/teknisk-seo-tjek-hjemmeside (live)

Ny dansk artikel målrettet "teknisk SEO-tjek af hjemmeside"-søgninger:
hvad teknisk SEO er (7 punkter), 5-trins guide der bruger /da/page-profile,
top-5 typiske fejl, FAQ, Article JSON-LD (valideret med json.loads),
canonical/hreflang-konventioner fulgt, CTA'er direkte ind i værktøjet.

### 3. Intern linkning

- Kort på forsiden (/) og på /da-hubben.
- Link i footeren på /da/page-profile.
- Sitemap-indgang tilføjet (extensionless).

### 4. Deployet + verificeret live

- Artiklen: 200 med dansk indhold · /da: 200 med kortet · /da/page-profile:
  200 med footer-linket · sitemap.xml indeholder den nye URL · forsiden 200.
- IndexNow pinget med alle 101 URL'er: 200.

## Søgninger

0 af 12 brugt. Ingen var nødvendige — ren byggeiteration + datatjek via eget API.

## Blokeringer (kort, gentages ikke)

- Bitwarden: vault aldrig logget ind — Mads' login mangler
- Chrome Web Store: browseradgang + $5 fee
- KDP: Mads skal oprette konto

## Næste iteration

1. Gentag stats-tjek: viser /blog/teknisk-seo-tjek-hjemmeside og
   /da/page-profile nu trafik fra andre end mig?
2. Hvis stadig nul efter ~1 uge: bygg en tilsvarende EN-artikel
   ("technical SEO check website") til /page-profile.
3. Ellers næste ublokerede idé eller forbedring af købsrejsen.
