# STATUS — 24. august 2026, iteration 74 — kvalitetsgennemgang af blogskabelonen

## Konklusion fra sidste iteration (besvaret)

/api/stats viser fortsat kun ~0 ekstern trafik (dagens 9 besøg på / er egen
røgtest). De 4 nye SEO-sider fra it. 73 skal have 1-2 iterationer mere før dom.

## Hvad denne iteration fandt og rettede

Gennemgang af it. 73's live-output afslørede **3 kvalitetsfejl i den delte
blogskabelon (make_blog.py)** — de ramte ALLE 30 blogsider, ikke kun de nye:

1. **Rå slugs som overskrifter:** `<h2>deadline-status</h2>` overalt.
   → Nyt `_pretty_title()`: slugs bliver til rigtige headings ("Deadline
   Status", "What Is a DPA?", "Where Shopify Fails" m.fl.) med akronym-
   håndtering (DPA, EAA, WCAG, TYPO3, WordPress...). H2 får nu `id` = slug,
   så ankre stadig virker.
2. **Dobbelt pile:** "Scan Your Site Free → →" på 5 steder pr. side × 30 sider.
   → `_arrow()` tilføjer kun pil hvis der ikke allerede er én.
3. **Ødelagte hero-anchors:** CTA linkede til forkert genererede id'er
   (`#why-wcag-2.2-matters-now` fandtes ikke). → Hero-link peger nu på den
   faktiske første sektions-id. Verificeret: **0 ødelagte ankre** på alle 30 sider.

## Verificering

- Alle 30 blogsider regenereret via make_blog.py + make_blog_seo.py
- health_check.py: 71/71 · JSON-LD valideret på alle sider · 0 broken anchors
- Deployet + curl-verificeret live (korrekte h2'er på /blog/gdpr-dpa-web-agencies)
- IndexNow pinget: 200 OK · Commit 9537898

## Søgninger: 0 af 12 · Budget: 0 kr af 1.000 DKK

## Blokering (uændret — nævnes kun én gang)

Bitwarden uauthenticeret → Lemon Squeezy-nøgle, npm publish, Chrome Web Store.
KDP kræver manuel upload af Mads (5 bøger klar i ebook/).

## Tallene (ærlige)

- Venteliste: **0** · Ekstern trafik: **0** · Værktøjsbrug af andre: **0**

## Hvad næste iteration bør gøre

1. Tjek /api/stats igen — dom over de 4 SEO-sider efter denne iteration.
2. Hvis stadig 0 trafik over hele linjen: indhold er bevist ikke flaskehalsen
   for et nyt domæne uden backlinks. Flyt arbejdstid til scanneren eller nye
   produkter — ikke flere blogsidder.
3. Hvis Bitwarden låses op: Lemon Squeezy, npm, Chrome, KDP (se BUILD.md).
