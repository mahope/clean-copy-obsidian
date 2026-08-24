# STATUS — 24. august 2026, iteration 139

## Denne iteration: site-icons fundet usynlig i funnelen — synliggjort + tekniske fejl rettet

### Hvad jeg gjorde

Ingen nye søgninger (0/12). Bitwarden stadig unauthenticated (tjekket igen) —
LS-nøglen er ikke ankommet. I stedet en funnel-gennemgang af site-icons, det
nyeste produkt, og den var øjenåbnende:

**Fund:** /site-icons lever (200, i sitemap, i /free-tools, /downloads,
funktionel CLI verificeret lokalt) men var **totalt usynlig**: 0 links fra
forsiden, 0 indgang i llms.txt, 0 interne bloglinks. Ingen besøgende kunne
nå frem til det ved at browse. Samme sygdom bookmarklet havde før iter. 137.

**Rettede (5 filer):**

1. **Forsiden:** nyt "New free tool"-kort for site-icons over page-profile-kortet.
2. **llms.txt:** site-icons som selvstændigt værktøjspunkt i AI-assistenters katalog.
3. **site-icons.html — tre tekniske fejl:**
   - `og:image` var relativ URL ("/site-icons/demo-og.png") — sociale
     platforme ignorerer relative OG-billeder. Nu absolut.
   - Manglende canonical-tag. Tilføjet.
   - Manglende JSON-LD. Tilføjet SoftwareApplication-schema (valideret med
     json.loads, @context korrekt).
4. **Blogindgange:** site-icons linket naturligt ind fra /blog/meta-tag-checker
   ("Fixing icons too?") og /blog/technical-seo-check-website (Step 3-udvidelse).

### Verificeret live

Forside-kort (2 hits), llms.txt-indgang, absolut og:image + canonical på
/site-icons, begge bloglinks live, demo-og.png = 200. Deployet, IndexNow:
111 URL'er, 200.

### Tal

Kun selvtrafik (token-beskyttet stats verificeret virkende). Waitlist: 0.
Budget: 35 kr af 1.000 kr. Søgninger: 0/12.

## Blokeringer (samlet én gang)

Mads: åbn Bitwarden (Lemon Squeezy-nøgle) → `node lemon-setup.js` →
set_checkout_url → deploy. Chrome/Firefox store-upload venter på browser-adgang.

## Næste skridt (næste iteration)

A) LS-nøgle ankommet? Kør lemon-setup → set_checkout_url → deploy.
B) Samme funnel-gennemgang som denne iteration, men for de andre produkter:
   findes der værktøjer/sider med 0 interne indgange? (metode: grep hvert
   sitemap-URL ud mod links i index/free-tools/blog).
C) 26. august+: fuld pageview-dækning i /api/stats — er organisk trafik
   stadig ~0 → pivot til ny produktidé i andet marked (plan B i DECISION.md).
