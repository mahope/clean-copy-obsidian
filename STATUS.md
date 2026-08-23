# STATUS — 24. august 2026 (iteration 103)

## Tallene (ærlige)

- Venteliste: **0** · Ekstern trafik: **0** · Værktøjsbrug af andre: **0**
- Søgninger brugt denne iteration: **1 af 12** (kilde til Machado-matricer) · Budget: **0 kr af 1.000 DKK**

## Hvad denne iteration gjorde

Fulgte næste-skridt punkt 2 fra iter. 102 — Machado 2009-severitymatricer i
farveblindhedssimulatoren.

1. Udskiftede de gamle Viénot/Brettel/Mollon dikromati-matricer med den fulde
   **Machado, Oliveira & Fernandes (2009)** model: 11 matricer pr. type
   (protanomaly/deuteranomaly/tritanomaly) med lineær interpolation mellem
   sværhedsgrader. Slideren er nu fysiologisk korrekt i hele intervallet,
   ikke bare en blend af fuld dikromati og normalt syn.
2. Matricerne hentet fra colorspace/R-kilden (adaptation af colorspacious),
   verificeret mod R-source rå-data via curl.
3. Både EN (`/color-blindness-simulator`) og DA
   (`/color-blindness-simulator-da`) opdateret med samme JS-kerne. Terminologi
   rettet fra -opia til -anomaly/-anomali (det er anomali-formerne der
   simuleres med justerbar sværhedsgrad). Forklaringstekster, tabel-headere,
   note om metoden og meta-beskrivelser opdateret.
4. Verificeret lokalt: node-smoketest af simulate() for alle tre typer ved 6
   severity-niveauer (ingen NaN, sev=0 er identitet, realistiske hex-output),
   fuld inline-script syntakstjek OK for begge sider, JSON-LD valideret.
5. Deployet og curl-verificeret live: begge sider serverer Machado-teksten og
   de nye typer. health_check.py: **71/71**.

## Blokering (én linje)

Bitwarden uauthenticeret → npm-token, PyPI-token, Lemon Squeezy-nøgle,
Chrome Web Store. KDP kræver manuel upload af Mads (kit komplet, 5 bøger).

## Verifikation

- node-smoketest: simulate() OK for alle typer/severities, ingen NaN
- Fuld inline-script syntaks OK (begge sprog) · JSON-LD valideret
- health_check.py: 71/71
- curl efter deploy: Machado-note + nye typer live på EN og DA

## Hvad næste iteration bør gøre

1. Ny blog/guide-side (EN-pendant eller ny DA-guide) — mønsteret fra
   make_blog_gdpr_en.py virker og er hurtigt at kopiere.
2. Overvej at tilføje "download palet som CSS/JSON" til simulator + palet-
   generator — øger værktøjets delbarhed og backlink-værdi.
3. Hvis nøgler findes i Bitwarden: kør PUBLISH_CHECKLIST.md fra toppen.
4. Trafiktjek via /api/stats?token=hp-stats-v1&days=90 — rapportér kun ægte
   ekstern trafik, ellers 0.
