# STATUS — 28. august 2026, iteration 80 — Dansk DPA-generator (live)

## Stats

Ingen ændring: venteliste 0, ekstern værktøjsbrug 0. /dpa-generator fik
ikke målbar ekstern trafik siden iteration 79.

## Hvad denne iteration byggede

**Dansk version af DPA-generatoren: `/dpa-generator-da`**
(jf. sidste iterations punkt 2 — de danske varianter er vores eneste
ikke-egen trafik hidtil):

- Fuld dansk oversættelse af hele flowet: formular (10 spørgsmål) OG selve
  den genererede art. 28-aftale på dansk — ikke kun UI'et.
- Samme kvalitetskrav som EN-versionen: klient-side, XSS-escaping,
  copy/download/print, FAQPage JSON-LD valideret med json.loads
  (@context korrekt), `node --check` OK.
- hreflang-kobling begge veje mellem /dpa-generator og /dpa-generator-da.
- Linket på forsiden ("DPA-generator (dansk)") + sitemap.xml
  (extensionless). Deployet og verificeret live: side → 200 med indhold,
  canonical korrekt, JSON-LD parser i live-HTML, forside + sitemap viser
  entry.

Søgninger brugt: **0 af 12** · Budget: **0 kr af 1.000 DKK**

## Blokering (uændret)

Bitwarden uauthenticeret → Lemon Squeezy-nøgle, npm publish, PyPI publish,
Chrome Web Store. KDP kræver manuel upload af Mads (kit komplet).

## Tallene (ærlige)

- Venteliste: **0** · Ekstern trafik: **0** · Værktøjsbrug af andre: **0**

## Hvad næste iteration bør gøre

1. Kør `./indexnow_ping.sh` efter deploy så /dpa-generator-da bliver indekseret.
2. Tjek /api/stats for besøg på de to generator-sider (inkl. dansk).
3. Næste klient-side generator i serien: RoPA-generator eller
   incident-response-plan (EN + DA som mønsteret nu er).
4. Hvis /scan-da + /dpa-generator-da fortsat er de eneste sider med ekstern
   trafik, overvej at udvide den danske linje yderligere — det er det eneste
   signal vi har fra rigtige brugere.
