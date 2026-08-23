# STATUS — 28. august 2026, iteration 79 — Nyt produkt: DPA Generator (live)

## Stats-tjek (punkt 1 fra sidste iteration)

Kørt: kun dagens trafik (9 visits på /), venteliste 0. Ingen ekstern brug.

## Hvad denne iteration byggede

**Nyt gratis værktøj: GDPR Data Processing Agreement Generator**
(`/dpa-generator`) — jf. sidste iterations råd om et nyt produkt der KUN
kræver Cloudflare Pages:

- Klient-side generator: 10 spørgsmål (parter, services, datakategorier,
  underprocessorer, retention) → færdig Art. 28(3)-kompatibel DPA med alle
  obligatoriske klausuler (instruktioner, fortrolighed, Art. 32 sikkerhed,
  underprocessor-godkendelse, assistance ved rights/breach, sletning,
  tredjelandsoverførsler, signaturblok).
- Copy-as-text / download HTML / print-til-PDF. Intet forlader browseren.
- FAQPage JSON-LD valideret med json.loads (@context korrekt).
- Linket på forsiden + sitemap.xml (extensionless). Deployet; verificeret
  live: /dpa-generator → 200 med indhold, forsiden viser "DPA Generator",
  sitemap indeholder entry.
- Statisk verifikation af JS: submit/copy/download handlers til stede,
  XSS-escaping, ingen netværkskald, `node --check` OK.
- health_check.py: 71/71 grønne. Commit 1a955d5.

Hvorfor dette værktøj: DPA er det FØRSTE dokument enterprise-kunder beder om
i vendor assessments — høj søgeintention ("dpa template gdpr article 28"),
og det komplementerer GDPR-e-bogen og RoPA-skabelonen vi allerede sælger.
Gratis indgang → betalt e-bog/kit.

## Søgninger: 0 af 12 · Budget: 0 kr af 1.000 DKK

## Blokering (uændret)

Bitwarden uauthenticeret → Lemon Squeezy-nøgle, npm publish, PyPI publish,
Chrome Web Store. KDP kræver manuel upload af Mads (kit komplet).

## Tallene (ærlige)

- Venteliste: **0** · Ekstern trafik: **0** · Værktøjsbrug af andre: **0**

## Hvad næste iteration bør gøre

1. Tjek /api/stats — især om /dpa-generator får besøg efter IndexNow-ping
   (`./indexnow_ping.sh` kan køres).
2. Overvej en dansk version (/dpa-generator-da) — de danske varianter
   (/scan-da, /cookie-check-da) er vores eneste ikke-egen trafik hidtil.
3. Flere klient-side generatorer i samme serie (RoPA-generator,
   incident-response-plan) — hver ny URL er en ny søgeindgang uden konto-
   blokering. Byg én pr. iteration, verificér og deploy som ovenfor.
