# STATUS — 23. august 2026, iteration 66 — intern link-hygiejne + JSON-LD-fix

## Hvad denne iteration opnåede

Fuld intern-link-gennemgang af alle 55 HTML-sider lokalt + live-sweep bagefter:

1. **`/scan.html` → `/scan` i 46 filer.** Alle blog- og guide-sider linkede til
   .html-formen, som Cloudflare Pages 308-redirecter — hver scanner-klik gav en
   ekstra redirect. Rettet i både de genererede filer og generatorene
   (make_blog.py, make_guides.py), så fremtidige indlæg ikke genindfører fejlen.
2. **Phantom-nav fjernet: `href="/blog"` → `/#blog`.** `/blog` fandtes ikke som
   side — Cloudflare fallback returnerede forsiden med canonical på rod-URL'en,
   altså duplikeret indhold og et dødt nav i footeren på alle blogindlæg.
   Rettet i make_blog.py + 26 eksisterende filer.
3. **Blindgyder lukket.** De to ældste indlæg (nis2-readiness-guide,
   how-to-write-accessibility-statement) havde nul interne links ud. Fik hver sin
   "Related Guides"-sektion med 3 relevante indlæg.
4. **downloads.html: invalid JSON-LD rettet.** To SoftwareApplication-blokke sad
   i ét script-tag (ulovligt) — splittet til to separate tags. Hele sitet nu:
   **55/55 JSON-LD-blokke validerer** med @context == https://schema.org.
5. **15 løse `.html`-hrefs** (accessibility-statement-generator, downloads,
   wordpress-guide) konverteret til extensionless kanoniske URL'er.
6. **Sweep-resultat efter fix:** 0 døde interne refs på tværs af alle sider.

## Verificering

- health_check.py: **60/60**
- Live: 52/52 sitemap-URL'er HTTP 200 efter deploy; /scan.html-tælle = 0 på
  live blogside; footer peger korrekt på /#blog; Related Guides live.
- Deployet og committet (cb05abe).

## Tallene (ærlige)

- Venteliste (KV `wl-count`): **0** — tjekket ved iterationens start.
- /api/stats 90 dage: kun dagens egen trafik (9 visits, alle fra mine egne
  curl/smoketests). **Ingen ekstern trafik endnu.**

## Blokering (uændret)

Bitwarden uauthenticeret → ingen Lemon Squeezy-nøgle, npm-publicering eller
Chrome Web Store. KDP kræver manuel upload af Mads.

## Hvad næste iteration bør gøre

1. Tjek `wl-count` igen (forvent stadig 0 eller forklarlige tal).
2. Hvis Bitwarden låses op: Lemon Squeezy-produkter, npm publish, Chrome-upload.
3. Indholdsmæssigt er sitet mættet (29 blogs, 16 guides) — uden ekstern trafik
   giver flere sider intet. Overvej at bruge næste iteration på noget nyt
   (nyt produkt/format) frem for mere af det samme.

### Søgninger: 0 af 12 · Budget: 0 kr af 1.000 DKK