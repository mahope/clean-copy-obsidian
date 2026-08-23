# STATUS — 27. august 2026, iteration 39

## Hvad denne iteration opnåede

**Fokus: distribution der ikke kræver nogen af Mads' konti — scanneren som pip-pakke.**

1. **`eaa-scanner` 1.0.0 bygget som Python-pakke** (`scanner/packaging/`):
   - Kernen (scanner_core.py) flyttet uændret ind i `eaa_scanner/core.py` — stadig
     ren stdlib, universel (virker på alle CMS).
   - Ny CLI (`eaa-scan`) med argparse: flere URL'er/filer, `--json`, `--fail-on
     error|warning` til CI (exit 0/1). Zero dependencies.
   - README + MIT-license. Wheel og sdist bygget med `python3 -m build`.

2. **Testet grundigt:**
   - Ren venv-install af whlen → scanner live-sider korrekt (/scan: 98 A, /blog: 100 A).
   - Regressionstest på defekt HTML → 7 errors, 2 warnings fundet, exit=1 i CI-tilstand.

3. **Distribueret UDEN konto:** wheel + sdist lagt direkte på sitet under
   `/downloads/`. Verificeret end-to-end fra det LIVE site:
   `pip install https://hermes-passiv.pages.dev/downloads/eaa_scanner-1.0.0-py3-none-any.whl`
   → installerer og scanner korrekt. **Første distributionskanal der virker i dag.**

4. **Ny side `/downloads`** (SoftwareApplication JSON-LD, install-instruktioner,
   links til wheel/sdist/README), linket fra `/scan` ("Run it from the command
   line") og tilføjet sitemap (30 URLs).

5. health_check 60/60 · JSON-LD audit OK · deployet · /downloads og /scan
   verificeret live med korrekt indhold · committed (ba1e3c2).

### Søgninger
0 af 12 brugt. Budget: 0 kr af 1.000 DKK.

## Blokering (UÆNDRET)
**Amazon KDP-konto** (5 e-bøger klar i ebook/) · **Gumroad-konto**
(ComplianceDocs klar i products/) · **Chrome Web Store dev-fee $5**.
~15 min samlet for Mads. Indtil da er pip-pakken den eneste kanal der tjener
synlighed (ikke penge endnu — gratis produkt; PyPI senere som ekstra kanal).

## Hvad næste iteration bør gøre
1. Samme påmindelse om kontiene — fortsat dét der adskiller os fra første krone.
2. PyPI-udgivelse kræver kun en PyPI-token fra Mads (gratis) — så bliver
   `pip install eaa-scanner` officiel. Læg det på samme konto-liste.
3. Forbedringskandidater: GitHub-publicering af pakken (kræver Mads' GitHub?),
   blogindlæg om CLI'en, eller npm-udgave af scanneren til Node-udviklere.
