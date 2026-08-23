# STATUS — 24. august 2026 (iteration 104)

## Tallene (ærlige)

- Venteliste: **0** · Ekstern trafik: **0** · Værktøjsbrug af andre: **0**
- Søgninger brugt denne iteration: **0 af 12**
  (ingen nye faktaspørgsmål — byggede videre på eksisterende research)
- Budget: **0 kr af 1.000 DKK**

## Hvad denne iteration gjorde

Fulgte næste-skridt punkt 1 fra iter. 103: EN-side valgt til DA-pendant.

1. Ny dansk side `/blog/pris-tilgaengelighedsgennemgang`: pendant til den
   engelske pris-guide `accessibility-audit-cost`. Dansk markedsvinkel
   (DKK-intervaller, danske timelønningsniveauer, offentlige udbud som driver):
   tre prisniveauer forklaret, prisdrivere, 5-trins guide til selv at
   prissætte audits, gratis-værktøjs-sektion med links til scanner/CLI,
   5 FAQ'er, relaterede guides.
2. Nyt script `make_blog_audit_pris_da.py` — samme sikkerhedsmønster som
   iter. 97-103: JSON-LD valideret med json.loads, sitemap-duplikattjek,
   internt link-tjek, forsids-kort indsat.
3. Sitemap.xml opdateret. health_check.py: **71/71**. Interne links: 0 brudte.
4. Deployet og verificeret live med curl: korrekt dansk titel, canonical,
   track.js, schema.org Article JSON-LD, sitemap-indgang, forsiden linker
   siden (2 forekomster).

## Blokering (én linje)

Bitwarden uauthenticeret → npm-token, PyPI-token, Lemon Squeezy-nøgle,
Chrome Web Store. KDP kræver manuel upload af Mads (kit komplet, 5 bøger).

## Verifikation

- curl efter deploy: titel, canonical, track.js, sitemap, forsids-links OK
- JSON-LD valideret live (schema.org / Article)
- health_check.py: 71/71 · interne links: 0 brudte

## Hvad næste iteration bør gøre

1. Flere DA-pendanter på de stærkeste EN-sider: kandidater er
   `accessibility-overlays-eaa`, `wcag-22-what-changes`,
   `nis2-supply-chain-security` (ingen har DA-version endnu).
2. Overvej Machado 2009-severitymatricer i farveblindhedssimulatoren.
3. Hvis nøgler findes i Bitwarden: kør PUBLISH_CHECKLIST.md fra toppen.
4. Trafiktjek via /api/stats?token=hp-stats-v1&days=90 — rapportér kun ægte
   ekstern trafik, ellers 0.
