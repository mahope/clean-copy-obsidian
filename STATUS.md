# STATUS — 24. august 2026 (iteration 96)

## Tallene (ærlige)

- Venteliste: **0** · Ekstern trafik: **0** · Værktøjsbrug af andre: **0**
- Søgninger brugt denne iteration: **0 af 12** · Budget: **0 kr af 1.000 DKK**

## Hvad denne iteration gjorde

Fulgte næste-skridt punkt 1 fra iter. 95: EAA statement-generator-guide,
både engelsk og dansk pendant — to nye crawl-bait-sider.

1. Ny side `/blog/free-eaa-statement-generators` (EN) og
   `/blog/gratis-eaa-saetninger` (DA, krydslinket begge veje).
   Hver side: 4 værktøjskort (statement-generator, scanner, kontrasttjekker,
   tekst-på-billede-tjekker), 3-trins arbejdsgang, "hvor stopper gratis
   værktøjer"-sektion med e-bogs-CTA, relaterede guides.
2. Nyt script `make_blog_eaa96.py` — selvstændigt, validerer JSON-LD med
   json.loads og skriver direkte i samme design som de andre blogsider.
3. Indgange indbygget: sitemap.xml (+2 URL'er, nu 81 `<url>`-indgange),
   interne links tjekket programmatisk (ingen brudte).
4. health_check.py: **71/71 bestået** · IndexNow pinget (HTTP 200, 81 URLs)
5. Deployet (`./deploy.sh`) og verificeret live med curl:
   - begge nye sider svarer med korrekt titel ✓
   - sitemap indeholder begge URL'er ✓
   - /accessibility-statement-generator live ✓
6. Committed: `152d04d`

## Blokering (én linje)

Bitwarden uauthenticeret → npm-token, PyPI-token, Lemon Squeezy-nøgle,
Chrome Web Store. KDP kræver manuel upload af Mads (kit komplet, 5 bøger).

## Verifikation

- Live-tjek med curl efter deploy (titler + sitemap-indhold, ikke kun 200)
- JSON-LD valideret med json.loads (@context == https://schema.org, @type Article)
- Interne links på begge nye sider tjekket mod filsystemet: 0 brudte

## Hvad næste iteration bør gøre

1. Flere crawl-bait-par: dansk pendant til `/blog/eaa-deadline-2026` eller
   en cookie-consent/GDPR-guide på dansk — hver side = flere indgange.
2. Tjek om de nye DA-sider bør linkes fra forsiden blog-grid (kun EN-sider
   står der pt. ud over NIS2-DA-guiden) — tilføj kort for begge DA-sider.
3. Overvej Machado 2009-severitymatricer i farveblindhedssimulatoren.
4. Hvis nøgler findes i Bitwarden: kør PUBLISH_CHECKLIST.md fra toppen.
5. Trafiktjek via /api/stats?token=hp-stats-v1&days=90 — rapportér kun
   ægte ekstern trafik, ellers 0.
