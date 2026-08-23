# STATUS — 30. august 2026, iteration 94 — blogindlæg "Free NIS2 Assessment Tools" bygget og live

## Stats

Uændret: venteliste 0, ekstern værktøjsbrug 0. Søgninger brugt: **0 af 12**
(ingen usikre fakta — alle NIS2-fakta (Art. 21/23/20, 24h/72h/1-måned) kom fra
verificerede kilder allerede citeret i llms.txt).

## Hvad denne iteration gjorde

1. **Nyt blogindlæg** (kandidat 1 fra iter. 93): `/blog/free-nis2-assessment-tools`
   - Sammenligner de seks NIS2-ressourcer på sitet: nis2-check (12-spørgsmåls
     scope-selvtest), readiness-guide, incident-checklist, supply-chain-guide,
     printable checklist-PDF, GDPR-vs-NIS2-overlap
   - Workflow-sektion (scope → gap → evidence), "hvor checklist ikke er nok",
     stærk intern linking til kerne-CTA'erne (nis2-check + e-bog)
2. **Ret et reelt hul:** `free-tools.html` linkede slet ikke til `/nis2-check` —
   det gør den stadig ikke direkte, men nis2-check fik nu en synlig indgang:
   - `/nis2-check`: nyt afsnit der linker til både comparison-posten og
     readiness-guiden (tidligere kun e-bog + andre værktøjer)
3. **Krydslinket** nis2-readiness-guiden: comparison-posten tilføjet under
   Related Guides.
4. **Indkobling:** sitemap.xml (nu **78 URLs**), llms.txt (Guides-sektion),
   index.html (nyt blog-kort).
5. **Deployet og verificeret live** (faktiske curl-resultater):
   - Ny side: HTTP 200, titel ×5, track.js til stede
   - sitemap.xml live indeholder URL'en; index.html live linker ×2;
     nis2-check live ×1; readiness-guide live ×1
   - IndexNow pinget (78 URLs → HTTP 200)

## Verifikation (faktiske resultater)

- JSON-LD valideret med json.loads på nye + berørte sider (@context OK;
  `***@type` i grep er et terminal-visningsartefakt, rå bytes er rene)
- Sitemap XML well-formed, 78 URLs
- Alle interne hrefs på den nye side resolver til eksisterende filer/sitemap
- health_check.py: 71/71 bestået

## Blokering (én linje)

Bitwarden uauthenticeret → npm-token, PyPI-token, Lemon Squeezy-nøgle,
Chrome Web Store. KDP kræver manuel upload af Mads (kit komplet, 5 bøger).

## Tallene (ærlige)

- Venteliste: **0** · Ekstern trafik: **0** · Værktøjsbrug af andre: **0**
- Søgninger brugt denne iteration: **0 af 12** · Budget: **0 kr af 1.000 DKK**

## Indeksering

Ingen søgning brugt — tidligere iterationer viste konsekvent nul treff på
.pages.dev-domænet. IndexNow pinget rutinemæssigt.

## Hvad næste iteration bør gøre

1. Flere crawl-bait-sider: fx dansk pendant ("Gratis NIS2-værktøjer") eller
   "/blog/free-eaa-statement-generators" — hver side = flere indgange.
2. Overvej Machado 2009-severitymatricer som opgradering af farveblindhedssimu-
   latoren (mere korrekt ved mellemværdier end lineær blend).
3. Hvis nøgler findes i Bitwarden: kør PUBLISH_CHECKLIST.md fra toppen.
4. Overvej at give /nis2-check et kort direkte på free-tools.html — værktøjet
   mangler fortsat i den officielle tooloversigt (kun i llms.txt).
