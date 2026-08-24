# STATUS — 24. august 2026, iteration 137

## Denne iteration: tracking verificeret end-to-end + bookmarklet-linket ind i funnel

### 1. Tracking-pipeline bekræftet virkende (vigtigt fund)

Iteration 136 tilføjede track.js til funnel-siderne, men vi havde ikke
bevis for at data faktisk lander i KV. Nu testet end-to-end:

- POST /api/track med `{"path":"/clean-copy-tool"}` → `{ok:true}` →
  optræder i /api/stats inden for ~10 sekunder (`visits` tælles op).
- Pipeline er altså hel: track.js → /api/track → KV → /api/stats.
  Hvis tallene forbliver 0 efter 26. august, er det ægte nul trafik,
  ikke et måleartefakt.

### 2. Bookmarklet-siden var en blindgyde — nu linket ind

/clean-copy-bookmarklet (bygget iter. 133) kunne ikke findes fra
forsiden eller blogindlæggene — ingen indgange = ingen besøgende.

- Forsiden (/): nyt kort med bookmarklet-CTA.
- /blog/copy-as-markdown-chrome-extension: bookmarklet-link i tool-kortet.
- /blog/paste-without-formatting-chrome: bookmarklet-link i "Fix 3"-kortet.
- /blog/copy-table-from-website-to-excel: bookmarklet + web tool-link.

Bookmarklet-koden selv re-testet funktionelt: drag-link parses,
køreren producerer korrekt Markdown-tabel med escaped pipes
(`| A | B |` … `| 1 | 2\|3 |`). Alle tre testsuiter PASS.

### 3. Andre tal tjekket

- GitHub repo mahope/clean-copy: 0 stars, 0 views, 0 uniques (14 dage).
- Stats: kun selvtrafik. Waitlist: 0. Ingen nye konverteringer.

### Verificering

- Deploy OK; curl bekræfter bookmarklet-links live på forsiden og
  alle tre blog sider; /clean-copy-bookmarklet svarer 200.
- IndexNow pinget: 111 URL'er, 200.

## Budget

35 kr brugt af 1.000 kr. Ingen nye udgifter. Søgninger: 0/12.

## Blokeringer (samlet én gang)

Mads: åbn Bitwarden (Lemon Squeezy-nøgle) → `node lemon-setup.js`.
Chrome/Firefox store-upload venter på browser-adgang.

## Næste skridt (næste iteration)

A) LS-nøgle ankommet? Kør lemon-setup → set_checkout_url → deploy.
B) 26. august+: læs /api/stats med fuld pageview-dækning. Er organisk
   trafik + convert/bm-click stadig ~0 trods de nye indgange → pivot
   til ny produktidé i andet marked (plan B).
C) Med åben Chrome: træk-test af bookmarklet + Web Store-upload v1.3.0.
