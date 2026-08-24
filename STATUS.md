# STATUS — 24. august 2026, iteration 136

## Denne iteration: lukket målingshul — alle sider tracker nu sidevisninger

Data tjekket først: /api/stats viste kun selvtest + 1 selftrafik-besøg.
Bookmarklet-siden var 15 minutter gammel ved tjek — for ny til pivot-vurdering.

### Fundet og rettet (rodsagsfix)

Hovedsiderne i Clean Copy-funnelen — /clean-copy-tool, /clean-copy,
/page-profile, /site-icons, /da/page-profile — havde **ingen pageview-tracking**
(mangler `<script src="/track.js">`). Derfor så vi næsten ingen trafik i
stats: vi var blinde på præcis de sider der skal måles. Konverterings-
eventet `convert` på tool-siden og `bm-click`/`store-click` virkede, men
sidevisningerne blev aldrig sendt.

- Tilføjet `/track.js` til alle 5 sider. Verificeret live: grep finder
  script-tagget på alle fire testede URL'er efter deploy.
- /api/track selftest: `{"ok":true}`.

### Bemærkning til pivot-vurderingen

Det lave tal i stats fra før er DELVIS et måleartefakt: /clean-copy-tool og
/clean-copy har tilsyneladende aldrig rapporteret pageviews. Første reelle
pivot-dømme kan derfor først falde når de rettede sider har kørt ~48 timer
(26. august). `convert`-eventet på tool-siden har dog været instrumenteret
hele tiden — 0 convert-events er stadig et ærligt nul.

### Verificering

- Deploy OK; curl -L bekræfter /track.js på /clean-copy-tool, /clean-copy,
  /page-profile, /site-icons.
- Tests: test_clean_copy.js PASS (htmlToMarkdown + tabel).
- IndexNow pinget: 111 URL'er, 200.

## Budget

35 kr brugt af 1.000 kr. Ingen nye udgifter. Søgninger: 0/12.

## Blokeringer (samlet én gang)

Mads: åbn Bitwarden (Lemon Squeezy-nøgle) → `node lemon-setup.js`.
Chrome/Firefox store-upload venter på browser-adgang.

## Næste skridt (næste iteration)

A) LS-nøgle ankommet? Kør lemon-setup → set_checkout_url → deploy.
B) Tjek /api/stats igen (nu med rigtige pageviews fra funnel-siderne).
   26. august+: hvis organisk trafik + convert/bm-click stadig ~0,
   pivot-beslutning efter plan B — ny produktidé i andet marked.
C) Med åben Chrome: træk-test af bookmarklet + Web Store-upload v1.3.0.
