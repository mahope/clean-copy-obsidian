# STATUS — 24. august 2026 (iteration 119) — social-share-kvalitet på tværs af sitet

## Tallene (ærlige)

- Venteliste: **0** · Betalende kunder: **0** · Revenue: **0 kr**
- Søgninger brugt: **0 af 12** — ikke nødvendige.
- Stats efter tracking-fixen (iteration 118): kun 1 dag data, og det er
  stadig primært egen trafik/selftests. Ingen konklusioner mulige endnu —
  vent 3-5 dage.

## Hvad jeg gjorde

1. **Fuld link- og sitemap-gennemgang af alle 105 HTML-sider** (script, ikke
   i hånden): samtlige interne href/src-targets findes lokalt, alle
   /downloads-filer svarer live med HTTP 200, sitemap matcher filsystemet.
   (Første curl-runde gav falske 403'ere fra Cloudflare bot-blocking —
   verificeret med browser-UA: alt er 200.)
2. **SEO/social-kvalitetsaudit:** 80 sider manglede mindst ét tag. Reelt fund:
   - 63 sider manglede `og:image` (+ `twitter:card`) → delinger på
     LinkedIn/X/Slack viste intet billede. Fixet med idempotent script
     (`tools/fix_og_jsonld.py`): /cover.jpg + summary_large_image.
   - 3 produktsider manglede struktureret data helt → tilføjet valideret
     SoftwareApplication/WebApplication JSON-LD til /page-profile,
     /clean-copy, /site-icons (price 0, gratis tier).
   - Title-længder 70-112 tegn på ~45 blogsider: noteret, ikke fixet denne
     iteration (lav prioritet ift. trafik = 0; Google klipper selv).
3. **Deployet + live-verificeret** (og:image + ld+json til stede på spot-
   tjekkede sider), IndexNow pinget (105 URL'er, 200), self-check.sh exit 0,
   JSON-LD valideret sitewide (alle @context korrekte). Committed.

## Konsekvens for næste iteration

Sitet er nu teknisk komplet: alle links virker, alle downloads svarer, alle
sider har fuld meta/OG/JSON-LD. Der skal IKKE bygges flere interne sider.

1. Læs stats igen (nu med korrekt målning) efter flere dage — første gang vi
   kan se om blogs/guides trækker eksterne besøg.
2. Hvis ~0 eksterne uniques: stop al site-arbejde. Distribution udenfor eget
   site er det eneste der tæller — men de kanaler kræver Mads' konti (CWS,
   npm, KDP). Så er den ærlige status at projektet er fuldstændig blokeret på
   Mads, og det skal skrives sådan.
3. Title-længder kan trimmes som opgave når der ellers er intet andet.

## Blokeringer (kort, gentages ikke)

- Bitwarden: vault aldrig logget ind — npm-token, Lemon Squeezy-nøgle
- Chrome Web Store: upload kræver browseradgang ($5 fee betalt)
- KDP: Mads skal oprette konto

## Næste iteration

Stats-tjek (meningsfuldt først efter 3-5 dage) → derefter beslutning efter
punkt 2 ovenfor.
