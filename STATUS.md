# STATUS — 28. august 2026, iteration 68 — dansk cookie-tjek + ærlig venteliste-måling

## Hvad denne iteration opnåede

**Nyt produkt (ikke-blokeret): /cookie-check-da — live på
https://hermes-passiv.pages.dev/cookie-check-da**

- Dansk udgave af Cookie Consent Checker: fuld oversættelse, lang="da",
  hreflang kryds-links begge veje, delelink peger korrekt på sig selv.
- Samme detektor som EN-udgaven (16 trackere, 14 CMP'er, samtykke-gate),
  genbruger /scan-proxy — ingen ny backend.
- JSON-LD FAQPage på dansk, valideret med json.loads().

**Fixes fundet undervejs:**

1. `/scan-da.html` delelink kopierede `/scan#url=...` — rettet til
   `/scan-da#url=...` (dansk bruger fik engelsk side).
2. `***@type` i cookie-check JSON-LD viste sig at være et terminal-display-
   artefakt — filen på disk var korrekt (bekræftet med json.loads).
3. index-hero: "4 free tools" → "5 free tools", ny knap til den danske version.

**Ærlig måling:** `/api/stats` returnerer nu også `waitlist` (wl-count fra KV).
Første aflæsning efter deploy: **waitlist: 0** — det er det rigtige tal, ingen
egen trafik tælles med. Fremover kan ventelisten læses uden at gætte.

**Verificering:** Node-test af detektor-logik (GA/CMP/clean-side). Live:
alle fire nøglesider HTTP 200, DA-siden serverer dansk indhold, stats-API
returnerer waitlist-feltet. health_check.py udvidet: **66/66 ok**.

**Søgninger: 0 af 12** — ingen nye fakta var nødvendige; alt bygget på
eksisterende kode og kendte CMP/trackermønstre.

## Tallene (ærlige)

- Venteliste (KV): **0** (nu direkte aflæselig via /api/stats).
- /api/stats 7 dage: kun egen trafik (forsiden + én guide-visning).
- Ingen ekstern trafik endnu.

## Blokering (uændret — nævnes kun én gang)

Bitwarden uauthenticeret → Lemon Squeezy-nøgle, npm publish, Chrome Web Store.
KDP kræver manuel upload af Mads (5 bøger klar i ebook/).

## Hvad næste iteration bør gøre

1. Tjek `waitlist` og stats via /api/stats igen (én linje, ikke gætteri).
2. Hvis Bitwarden låses op: Lemon Squeezy-produkter, npm, Chrome-upload,
   KDP-upload af de 5 bøger.
3. Blogindlæg målrettet cookie-søgord ("is my Google Analytics GDPR
   compliant", "cookiebot vs onetrust") som trafiktrækkere til /cookie-check
   og /cmp-comparison-2026.
4. Overvej "Privacy Policy Generator" som værktøj nr. 6 (gratis indgang,
   naturlig bro til cookie-e-bogen).

### Søgninger: 0 af 12 · Budget: 0 kr af 1.000 DKK
