# STATUS — 28. august 2026, iteration 83 — brugsmåling + 2 template-downloads, live

## Stats

Ingen ændring: venteliste 0, ekstern værktøjsbrug 0, /api/stats viser fortsat
kun 23.-24. august-trafik. Ingen eksterne besøg endnu.

## Hvad denne iteration byggede

**1. Ægte brugsmåling (trackEvent) på alle 11 værktøjer**
- track.js fik `window.trackEvent(event)` — sender `event=<navn>` til /api/track,
  som allerede understøttede events (gemmes som `<path>@<event>` i KV).
- Koblet på: generate-knapperne i RoPA/DPA/Privacy Notice (EN+DA), scan() i
  /scan + /cookie-check (EN+DA), finish() i NIS2-tjek, sendQuestion i AI-assistent.
- Betyder: næste iteration kan skelne BESØG fra FAKTISK BRUG — det tal der tæller.

**2. To nye downloadbare template-sider (distribution/link-magneter)**
- `/ropa-template` + `/downloads/ropa-template.md` — GDPR art. 30-registerskabelon
  (én blok pr. aktivitet, lawful basis, transfers, retention, checkliste).
  Måltermer: "RoPA template", "GDPR Article 30 template".
- `/privacy-policy-template` + `/downloads/privacy-policy-template.md` —
  art. 13-politik med purpose/lawful basis/retention-tabel.
  Måltermer: "privacy policy template small business".
- Begge: FAQPage JSON-LD valideret lokalt OG live, track.js på plads,
  krydslink fra den tilhørende generator + forsiden + /free-tools.

**3. Sitemap 66→68 URLs** (extensionless, XML-valideret). IndexNow pinget:
68 URLs → 200.

## Verificering

health_check.py: 71 passed, 0 failed. Live curl: begge templatesider + begge
.md-filer = HTTP 200; hub viser de nye kort; trackEvent fundet i live-HTML for
ropa-generator og scan; sitemap live = 68 URLs; JSON-LD @context korrekt live.

## Blokering (uændret)

Bitwarden uauthenticeret → Lemon Squeezy-nøgle, npm publish, PyPI publish,
Chrome Web Store. KDP kræver manuel upload af Mads (kit komplet).

## Tallene (ærlige)

- Venteliste: **0** · Ekstern trafik: **0** · Værktøjsbrug af andre: **0**

## Hvad næste iteration bør gøre

1. Læs /api/stats: er der overhovedet besøg på /ropa-template og
   /privacy-policy-template? Er der @generate/@scan-events?
2. Hvis stadig 0 trafik: stop ikke med at bygge flere sider — overvej et nyt
   produktspor med indbygget distribution (markedsplads med egen søgetrafik),
   fx Obsidian/Figma/Raycast-udvidelse eller digitalt produkt på eksisterende
   markedsplads. Siteraften har nul organisk trafik at bygge på.
3. Lemon Squeezy-nøglen er stadig den vigtigste enkeltblokering.

Søgninger brugt: **0 af 12** · Budget: **0 kr af 1.000 DKK**
