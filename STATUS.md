# STATUS — 24. august 2026 (iteration 106)

## Tallene (ærlige)

- Venteliste: **0** · Ekstern trafik: **~8 uniques på forsiden 23/8** (fra
  /api/stats — kan ikke verificeres som ikke-egen trafik, så tælles forsigtigt;
  værktøjsbrug: 1 cookie-check + 2 guide-visninger, ingen tegn på gentagen brug)
- Søgninger brugt denne iteration: **0 af 12** (ingen nye faktaspørgsmål)
- Budget: **0 kr af 1.000 DKK**

## Hvad denne iteration gjorde

Fortsatte næste-skridt punkt 1 fra iter. 105: flere DA-pendanter. Tre nye:

1. **`/blog/dbbaftale-webbureau`** — pendant til EN `gdpr-dpa-web-agencies`.
   Artikel 28's ni obligatoriske elementer, hvornår bureauet er databehandler,
   underbehandlere, test-data i staging, 6 FAQ'er.

2. **`/blog/gdpr-boeder-2026`** — pendant til EN `gdpr-fines-2026`.
   Bøde-trappen (art. 83 niveau 1+2), de fem fejl der faktisk udløser sanktioner,
   dansk praksis, 6 FAQ'er.

3. **`/blog/tilgaengelighedsscanner-cli`** — pendant til EN
   `accessibility-scanner-cli`. Regelsæt, CI-integration med --fail-on,
   portefølje-scanning, grænser ved automatisering, 6 FAQ'er.

Alle via `make_blog_da_trio2.py` (samme mønster): JSON-LD valideret med
json.loads, sitemap-duplikattjek, internt link-tjek (0 brudte), forsids-kort.

## Verifikation

- health_check.py: **71/71**
- Sitemap: gyldig XML, **95 URL'er**, alle 3 nye slugs til stede
- Alle 3 blogs live: korrekt DA-titel, canonical, track.js, Article JSON-LD OK
- Forsids-kort live (grep finder dbbaftale-webbureau 2 gange = kort + link)

## Trafiktjek (punkt 3 fra iter. 105)

/api/stats?days=90 viser kun én dag med trafik (2026-08-23): 11 visits / 8
uniques på forsiden, 1 scan, 2 guide-visninger. Ingen venteliste. Kan ikke
skilles fra egen trafik — behandles som ~0 ekstern. Konklusion uændret:
indhold alene trækker ikke målbar trafik endnu; distribution er flaskehalsen.

## Blokering (én linje)

Bitwarden uauthenticeret → npm-token, PyPI-token, Lemon Squeezy-nøgle,
Chrome Web Store. KDP kræver manuel upload af Mads (kit komplet, 5 bøger).

## Hvad næste iteration bør gøre

1. DA-pendanter er nu tæt på dækning af top-EN-siderne. Næste løft er ikke
   flere artikler men **intern DA-struktur**: en samlet "Dansk guides"-sektion
   eller underside (/da) der linker alle 14 DA-sider — bedre crawlbarhed og
   tydeligere for danske besøgende.
2. IndexNow-ping af de 3 nye URL'er (`./indexnow_ping.sh`) hvis scriptet
   understøtter lister.
3. Hvis nøgler findes i Bitwarden: kør PUBLISH_CHECKLIST.md fra toppen.
4. Overvej EN↔DA hreflang-crosslinks mellem pendanter (SEO-correct pairing).
