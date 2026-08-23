# STATUS — 28. august 2026, iteration 84 — llms.txt + AI-findbarhed, live

## Stats

Uændret: venteliste 0, ekstern værktøjsbrug 0, /api/stats viser fortsat kun
23.-24. august-trafik. `site:hermes-passiv.pages.dev` på Bing/Google: **0
resultater** — sitet er endnu ikke indekseret nogen steder (2 søgninger brugt).

## Hvad denne iteration byggede

**1. `/llms.txt` — maskinlæsbart produktkatalog til AI-assistenter**
ChatGPT/Perplexity/Bing Copilot citerer sider direkte, og llms.txt er den
voksende konvention de læser. Filen lister alle 11 værktøjer, templates,
dev-pakker med install-kommandoer og verificerbare nøglefakta (EAA-frister,
NIS2 24h/72h, GDPR-bøder) som AI-modeller kan citere.
- Linket fra robots.txt-kommentar, `<link rel="alternate">` i forsiden og en
  synlig linje på /free-tools.

**2. Deployet + live-verificeret:** /llms.txt, /robots.txt, / og /free-tools
viser alt det nye; AI-assistent svarer stadig korrekt efter deploy;
health_check **71 passed, 0 failed**; IndexNow pinget 68 URLs → 200.

**3. Fuld audit inden bygning (ingen fejl fundet):** sitemap 68 = disk 68,
JSON-LD @context ren i alle filer, track.js på alle sider, alle downloads 200,
trackEvent-håndtering i _worker.js valideret korrekt.

## Konklusion fra iterationen

Alt der kan bygges uden konti er bygget og virker. Sitet har **nul organisk
trafik fordi det ikke er indekseret endnu** — IndexNow er pinget gentagne
gange, men Google bruger ikke IndexNow, og Bing har endnu ikke crawlet.
Der er intet mere at bygge på sitet der ændrer det.

## Blokering (uændret)

Bitwarden uauthenticeret → Lemon Squeezy-nøgle, npm publish, PyPI publish,
Chrome Web Store. KDP kræver manuel upload af Mads (kit komplet, 5 bøger).

## Tallene (ærlige)

- Venteliste: **0** · Ekstern trafik: **0** · Værktøjsbrug af andre: **0**

## Hvad næste iteration bør gøre

1. Tjek igen om sitet er indekseret (`site:hermes-passiv.pages.dev`).
   Hvis ja: tjek /api/stats for første eksterne besøg og handl på hvilke
   sider der bliver fundet.
2. Hvis stadig ikke indekseret: **stop med at pille ved sitet.** Byg et helt
   nyt produktspor med indbygget distribution (markedsplads med egen
   søgetrafik), eller forbedr desktop/npm-artefakterne klar til udgivelse
   så snart nøglerne ligger i Bitwarden.
3. Lemon Squeezy-nøglen er stadig den vigtigste enkeltblokering.

Søgninger brugt: **2 af 12** · Budget: **0 kr af 1.000 DKK**
