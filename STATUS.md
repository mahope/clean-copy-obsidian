# STATUS — 24. august 2026, iteration 135

## Denne iteration: tabel-konvertering i Clean Copy-kernen + intern linkning

Data tjekket først: /api/stats viser stadig kun selvtrafik (bm-click 1 =
selvtest). Bookmarklet-siden er stadig <48 timer gammel — pivot-kriteriet fra
STATUS 134 er IKKE nået endnu, så ingen ny pivot. Derfor: forbedring af det
levende produkt (prioritet 2 i AGENTS.md).

### Bygget

1. **HTML-tabel → Markdown-tabel** i `extension-clean-copy/background.js`
   (kilden til ALLE tre varianter): thead/tbody, colspan-padding,
   pipe-escaping i celler, inline-markup i celler (`**b**`, `[l](x)`),
   entity-unescape. Tabeller var det største hul — vi har et blogindlæg
   om "copy table to Excel" som lovede funktionen.
2. **`tools/sync_core.js`** (nyt build-script): genbygger
   `site/clean-copy-core.js` fra background.js og holder Firefox-kopien
   identisk. Én kilde til sandhed fremover.
3. **Bookmarklet genbygget** (7094 chars) med tabel-understøttelse.
4. **Blogindlægget copy-clean-text-from-website** linker nu også til
   /clean-copy-tool ("Five ways", kort 5). copy-as-markdown-bloggen
   linkede allerede.
5. Featuretekster på /clean-copy og /clean-copy-tool nævner tabeller.
6. Nye tests i test_clean_copy.js (header/separator/body/pipe-escape/
   colspan/inline-celler). Alle tests grønne.

### Faldgrube fundet undervejs

Bookmarklet-builderens naive string-stripper brød på rå `"` `'` inde i
regex-tegnklasser → ulovlig JS efter URL-escape. Løsning: hex-escapes
(`\x22\x27`) i regexes der skal ind i bookmarkletten.

### Verificering (ikke påstande)

- Deployet; curl -L bekræfter: blog-siden viser "Five ways" + kort 5,
  /clean-copy-tool og /clean-copy nævner tabeller, live bookmarklet.js
  indeholder tabel-reglen. IndexNow pinget (200).
- Tests: ext core + bookmarklet (7094 chars, gyldig JS) + pro core = PASS.
- Zips v1.3.0 bygget til Chrome + Firefox (klar når upload kan åbnes).

## Hvad ikke virkede

- bash-heredoc med template literals drillede (backticks) — løst ved at
  skrive sync_core.js som fil i stedet for inline -e.

## Budget

35 kr brugt af 1.000 kr. Ingen nye udgifter. Søgninger: 0/12.

## Blokeringer (samlet én gang)

Mads: åbn Bitwarden (Lemon Squeezy-nøgle) → `node lemon-setup.js`.
Chrome/Firefox store-upload venter på browser-adgang.

## Næste skridt (næste iteration)

A) LS-nøgle ankommet? Kør lemon-setup → set_checkout_url → deploy.
B) Tjek /api/stats igen: organisk trafik + bm-click på bookmarklet-
   siden (nu >48 timer). Hvis ~0: pivot-beslutning efter plan B —
   ny produktidé i andet marked, ind i DECISION.md.
C) Med åben Chrome: træk-test + Web Store-upload af v1.3.0.
