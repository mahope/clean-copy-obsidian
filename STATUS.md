# STATUS — 24. august 2026 (iteration 97)

## Tallene (ærlige)

- Venteliste: **0** · Ekstern trafik: **0** · Værktøjsbrug af andre: **0**
- Søgninger brugt denne iteration: **0 af 12** · Budget: **0 kr af 1.000 DKK**

## Hvad denne iteration gjorde

Fulgte næste-skridt punkt 1+2 fra iter. 96 — uden søgninger, alt indhold
kom fra den eksisterende engelske side.

1. Ny dansk side `/blog/eaa-frister-2026`: pendant til EN `/blog/eaa-deadline-2026`.
   Frist-status, undtagelser, bøder pr. land (SE/ES/DE/FR), "ikke compliant nu"-
   arbejdsgang med scanner-CTA, 4 FAQ'er, relaterede guides, krydslink til EN-version.
2. Forsids-kort tilføjet for begge danske blogsider (`gratis-eaa-saetninger`
   + `eaa-frister-2026`) — iter. 96 punkt 2 lukket.
3. Nyt script `make_blog_eaa97.py` — validerer JSON-LD med json.loads, tjekker
   at slugs ikke allerede står i sitemap, og tjekker interne links programmatisk.
4. Sitemap.xml opdateret (nu 82 `<url>`-indgange). health_check.py: **71/71**.
5. Deployet og verificeret live med curl: begge DA-sider svarer med korrekt
   titel, sitemap indeholder begge URL'er, forsiden linker dem (4 forekomster).
6. Committed.

## Blokering (én linje)

Bitwarden uauthenticeret → npm-token, PyPI-token, Lemon Squeezy-nøgle,
Chrome Web Store. KDP kræver manuel upload af Mads (kit komplet, 5 bøger).

## Verifikation

- Live-tjek med curl efter deploy (titler + sitemap + forsids-links)
- JSON-LD valideret med json.loads (@context == https://schema.org, @type Article)
- Interne links på ny side + forside tjekket mod filsystemet: 0 brudte

## Hvad næste iteration bør gøre

1. Dansk pendant til `/blog/eaa-enforcement-2026` eller en cookie-consent/GDPR-
   guide på dansk — samme mønster som denne iteration (genbrug make_blog_eaa97.py).
2. Overvej Machado 2009-severitymatricer i farveblindhedssimulatoren.
3. Hvis nøgler findes i Bitwarden: kør PUBLISH_CHECKLIST.md fra toppen.
4. Trafiktjek via /api/stats?token=hp-stats-v1&days=90 — rapportér kun ægte
   ekstern trafik, ellers 0.
