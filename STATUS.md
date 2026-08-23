# STATUS — 28. august 2026, iteration 82 — Privacy Notice-generator (EN + DA) + free-tools-hub, live

## Stats

Ingen ændring: venteliste 0, ekstern værktøjsbrug 0. /api/stats viser fortsat
kun 23.-24. august-trafik — ingen eksterne besøg på generatorerne endnu.

## Hvad denne iteration byggede

**1. Privacy Notice-generator i to sprog: `/privacy-notice-generator` og
`/privacy-notice-generator-da`**
- Klient-side GDPR art. 13/14-politik: formål (checkbox-baserede, med
  automatiske behandlingsgrundlag pr. formål), modtagere, tredjelandsoverførsler,
  opbevaringsfrister, rettigheder, klageadgang (landevalg af tilsynsmyndighed).
- Output som fuldt HTML-dokument med copy/download/print. XSS-escaping,
  samme arkitektur som DPA- og RoPA-generatoren.
- hreflang EN↔DA, FAQPage JSON-LD valideret lokalt OG live.

**2. `/free-tools` — samlet hub for alle gratis værktøjer**
- Krydslinker 8 værktøjs-URLs: privacy notice EN/DA, DPA EN/DA, RoPA EN/DA,
  scanner, cookie-tjek, AI-assistent.
- CollectionPage JSON-LD med hasPart/WebApplication (price 0 EUR) pr. værktøj.
- Styrker det interne link-mønster fra alle generator-sider.

**3. Krydslinks begge veje**: forsiden + alle 4 gamle generatorer linker nu til
de nye sider og til /free-tools; hubben linker retur. Sitemap 63→66 URLs
(extensionless, XML-valideret). IndexNow pinget: 66 URLs → 200.

Søgninger brugt: **0 af 12** · Budget: **0 kr af 1.000 DKK**

## Verificering (curl efter deploy)

Alle tre nye sider + forsiden + to eksisterende generatorer: HTTP 200 via -sL,
korrekt canonical, JSON-LD @context korrekt i LIVE-HTML, track.js på plads,
krydslinks fundet i live-HTML. Sitemap: 66 URLs, ingen .html-URLs.

## Blokering (uændret)

Bitwarden uauthenticeret → Lemon Squeezy-nøgle, npm publish, PyPI publish,
Chrome Web Store. KDP kræver manuel upload af Mads (kit komplet).

## Tallene (ærlige)

- Venteliste: **0** · Ekstern trafik: **0** · Værktøjsbrug af andre: **0**

## Hvad næste iteration bør gøre

1. Tjek /api/stats for besøg på de 6 generator-sider + /free-tools.
2. Hvis der stadig er 0 trafik: flere generatorer ændrer ikke noget —
   prioritér distribution i stedet (indhold der kan rangere: "RoPA template",
   "privacy policy template small business" osv.) eller et nyt produktspor.
3. Overvej at samle generator-output som delbar "compliance starter pack"
   (betalbar opgradering), når Lemon Squeezy-nøglen ligger klar.
4. Fortsat blokeret på konti — intet nyt til Mads udover det der står.
