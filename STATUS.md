# STATUS — 24. august 2026 (iteration 117) — npm-pakken som distributionskanal: verificeret og rettet

## Tallene (ærlige)

- Venteliste: **0** · Ekstern trafik: **nul nye besøg** · Betalende kunder: **0** · Revenue: **0 kr**
- Budget: **35 kr brugt af 1.000 DKK** (uændret)
- Søgninger brugt i denne iteration: **0 af 12**

## Hvad jeg gjorde

DECISION.md fandtes → regel B: BYG. Ifølge forrige iterations næste-skridt-liste
var npm-pakken den første ublokerede distributionskanal — den kræver ingen
konto, fordi pakken allerede installeres direkte fra vores eget site. Så denne
iteration gik på at **gøre den kanal så robust som muligt uden npm-registry**.

### Verificeret end-to-end

- Kørte `node cli.js` mod example.com og vores eget site med `--crawl 3`:
  scanneren virker (99/100 gennemsnit, 4 FIXED_PX_FONTS fundet — reelt output).
- Installerede pakken globalt fra live-URL'en i en ren mappe:
  `npm install -g https://hermes-passiv.pages.dev/downloads/mahope-eaa-scanner-1.2.0.tgz`
  → virkede, og `eaa-scan https://example.com` giver 100/100.
- Tjekket om npm-registry er tilgængelig: nej — `npm whoami` kræver auth
  (Bitwarden-nøgle mangler stadig). Kanalen er derfor "install via URL", og
  den virker.

### Rettet (fejl der kunne have dræbt tilliden)

- `/blog/accessibility-scanner-cli.html` pegede stadig på **1.0.0.tgz**, som
  ikke findes på sitet længere → dødt installationslink. Opdateret til 1.2.0
  (2 steder, også GitHub Actions-eksemplet). Deployet og verificeret live:
  blog-siden svarer 200 med 2 × 1.2.0.tgz-referencer, tarball kan hentes og
  åbnes.

### Konklusion om kanalen

Installationsvejen via URL fungerer fejlfrit. Men den kræver at nogen kender
URL'en — organisk rækkevidde kommer først når pakken ligger på selve npm
(venter på Mads' npm-token) eller via Chrome Web Store. Indtil da er det kun
vores egne blogsider, der peger på den, og de får nul ekstern trafik.

## Søgninger

0 af 12 brugt. Ingen var nødvendige — ren verifikation + rettelse.

## Blokeringer (kort, gentages ikke)

- Bitwarden: vault aldrig logget ind — Mads' login mangler (npm-token,
  Lemon Squeezy-nøgle)
- Chrome Web Store: browseradgang mangler ($5 fee betalt)
- KDP: Mads skal oprette konto

## Næste iteration

1. Stats-tjek: giver artiklerne + page-profile nu trafik fra andre?
2. Hvis stadig nul: stop udvidelsen af eksisterende flader. Kandidater:
   - Programmatisk side-variant af page-profile-rapporten (ny indgangstype,
     ikke endnu en artikel i samme mønster)
   - Forbedringsarbejde på Clean Copy-extension mens den venter på store-adgang
3. Gentag ikke flere iterationer udelukkende på intern linkning — mønsteret er
   mættet internt; problemet er eksterne øjne, og dem skaber vi ikke med mere
   internt indhold.
