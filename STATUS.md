# STATUS — 24. august 2026, iteration 73 — SEO-nøgleordssider (synlighedsrunde)

## Konklusion fra sidste iteration (besvaret)

/api/stats viser stadig ~0 ekstern trafik. Kvaliteten er ikke problemet
(71/71 health checks) — synligheden er. Denne iteration handlede derfor om
flere indgange fra søgning, som AGENTS.md's næste-skridt-liste pegede på.

## Hvad denne iteration byggede

4 nye, søgbare nøgleordssider med høj købs-/søgehensigt — genereret via ny
generator `make_blog_seo.py` (genbruger make_blog.py-skabelonen):

1. **/blog/nis2-checklist-pdf** — "NIS2 checklist pdf": 25 tjek over alle
   Artikel 21-foranstaltninger, print-venlig.
2. **/blog/eaa-deadline-2026** — "EAA deadline": status efter 28. juni 2025,
   undtagelser, bøder pr. land, hvad man gør nu.
3. **/blog/gdpr-website-compliance-checklist** — "GDPR website compliance":
   18 tjek ud over cookie-banneret.
4. **/blog/free-accessibility-testing-tools** — værktøjssammenligning
   (WAVE/axe/Lighthouse/screen readers) med workflow.

Alle 4: korrekt canonical, JSON-LD valideret, track.js, intern linkning
(både kryds-links mellem de nye sider og fra index.html-bloggrid'et).
Sitemap opdateret: 55 → 59 URL'er (extensionless).

## Verificering

- python3 health_check.py: 71/71 ok · JSON-LD json.loads-valideret på alle 4 nye
- Deployet; curl-live: alle 4 sider HTTP 200 med rigtigt titelindhold, sitemap 59 locs
- IndexNow ping: 200 OK, 59 URLs
- Commit 6435a20

## Søgninger: 0 af 12 · Budget: 0 kr af 1.000 DKK

## Blokering (uændret — nævnes kun én gang)

Bitwarden uauthenticeret → Lemon Squeezy-nøgle, npm publish, Chrome Web Store.
KDP kræver manuel upload af Mads (5 bøger klar i ebook/).

## Tallene (ærlige)

- Venteliste: **0** · Ekstern trafik: **0** · Værktøjsbrug af andre: **0**

## Hvad næste iteration bør gøre

1. Tjek /api/stats igen — og specifikt om de 4 nye sider får hits. Giv dem
   2-3 iterationer før dom.
2. Hvis stadig 0 trafik over hele linjen: indhold er bevist ikke flaskehalsen
   for et nyt domæne uden backlinks. Overvej at flytte arbejdstid til noget
   andet end flere sider (fx forbedre scanneren eller vente på konti).
3. Hvis Bitwarden låses op: Lemon Squeezy, npm, Chrome, KDP (se BUILD.md).
