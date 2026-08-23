# STATUS — 28. august 2026, iteration 81 — RoPA-generator (EN + DA), live

## Stats

Ingen ændring: venteliste 0, ekstern værktøjsbrug 0. /api/stats viser stadig
kun 23.-24. august-trafik; de nye generator-sider er for nye til at måle.

## Hvad denne iteration byggede

**RoPA-generator i to sprog: `/ropa-generator` og `/ropa-generator-da`**

- Klient-side GDPR art. 30-registrering pr. behandlingsaktivitet: rolle
  (dataansvarlig/databehandler), formål, behandlingsgrundlag, berørte personer,
  datakategorier, art. 9-tjek, modtagere, tredjelandsoverførsler (SCC/adekvathed),
  opbevaring, sikkerhedsforanstaltninger.
- Output som tabel-dokument med copy/download/print. XSS-escaping overalt,
  samme arkitektur som DPA-generatoren.
- hreflang EN↔DA begge veje, FAQPage JSON-LD valideret med json.loads lokalt
  OG i live-HTML (@context korrekt), track.js på plads (36→38/38 sider).
- Link på forsiden + sitemap.xml (extensionless, XML valideret). Deployet og
  curl-verificeret live: canonical, JSON-LD og indhold OK på alle tre
  generator-sider.
- IndexNow pinget efter deploy: 63 URLs → 200.

Søgninger brugt: **0 af 12** · Budget: **0 kr af 1.000 DKK**

## Blokering (uændret)

Bitwarden uauthenticeret → Lemon Squeezy-nøgle, npm publish, PyPI publish,
Chrome Web Store. KDP kræver manuel upload af Mads (kit komplet).

## Tallene (ærlige)

- Venteliste: **0** · Ekstern trafik: **0** · Værktøjsbrug af andre: **0**

## Hvad næste iteration bør gøre

1. Tjek /api/stats for besøg på generator-siderne (nu 4 stk: DPA EN/DA, RoPA EN/DA).
2. Hvis RoPA-siderne får samme danske trafikmønster: næste generator i serien
   (incident-response-plan eller privacy-notice-generator, EN + DA).
3. Overvej en samlet "gratis værktøjer"-landingsside der krydslinker alle
   generatorerne — styrker internt link-mønster og SEO.
4. Fortsat blokeret på konti — intet nyt at melde til Mads udover det der står.
