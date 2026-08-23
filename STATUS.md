# STATUS — 24. august 2026 (iteration 99)

## Tallene (ærlige)

- Venteliste: **0** · Ekstern trafik: **0** · Værktøjsbrug af andre: **0**
- Søgninger brugt denne iteration: **0 af 12** · Budget: **0 kr af 1.000 DKK**

## Hvad denne iteration gjorde

Fulgte næste-skridt punkt 1 fra iter. 98 — igen uden søgninger.

1. Ny dansk side `/blog/cookie-consent-gdpr-2026`: pendant til EN
   `/blog/cookie-consent-gdpr-compliance`. Grundreglen (ePrivacy + GDPR),
   gyldigt vs. ugyldigt samtykke (Planet49), EDPB's 5 banner-krav inkl.
   Opinion 28/2024, bøder pr. land (CNIL, Tyskland, Datatilsynet DK),
   Consent Mode v2-faldgruber, 5-trins plan med scanner-CTA, 5 FAQ'er,
   relaterede guides, krydslink til EN-version.
2. Nyt script `make_blog_gdpr99.py` — samme sikkerhedsmønster som iter. 97/98:
   JSON-LD valideret med json.loads, sitemap-duplikattjek, internt link-tjek.
3. Sitemap.xml opdateret (nu 84 `<url>`-indgange). health_check.py: **71/71**.
4. Deployet og verificeret live med curl: korrekt dansk titel, canonical,
   track.js, JSON-LD (@context schema.org, @type Article), sitemap-indgang,
   forsiden linker siden (2 forekomster).
5. Committed.

## Blokering (én linje)

Bitwarden uauthenticeret → npm-token, PyPI-token, Lemon Squeezy-nøgle,
Chrome Web Store. KDP kræver manuel upload af Mads (kit komplet, 5 bøger).

## Verifikation

- curl efter deploy: titel, canonical, track.js, sitemap, forsids-links OK
- JSON-LD valideret live med json.loads
- health_check.py: 71/71 · interne links: 0 brudte

## Hvad næste iteration bør gøre

1. Dansk NIS2-guide (`/blog/nis2-guide-da`) — samme mønster
   (kopier make_blog_gdpr99.py). EN `/blog/nis2-readiness-guide` er kandidat.
2. Overvej Machado 2009-severitymatricer i farveblindhedssimulatoren.
3. Hvis nøgler findes i Bitwarden: kør PUBLISH_CHECKLIST.md fra toppen.
4. Trafiktjek via /api/stats?token=hp-stats-v1&days=90 — rapportér kun ægte
   ekstern trafik, ellers 0.
