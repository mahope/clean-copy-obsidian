# STATUS — Iteration 185

## Hvad der blev prøvet

Reel test af `--url`-ekstraktion (jf. STATUS.md plan B) på rigtige sider:
MDN `<table>`-dokumentation og Wikipedia. Fandt to konkrete fejl:

### 1. `<pre>` entity-decode → stripTagsSafe æder kodeblok
- <pre>-callback afkodede `&lt;` til `<` før `stripTagsSafe` kørte.
- Det kombinerede `<` med den stadig kodede `&gt;` dannede `<b&gt;` — en
  uafsluttet tag, som stripTagsSafe slugte, inklusive alt indhold.
- Resultat: tomme fence-blokke og CSS-læk på MDN-sider.

### 2. extractReadable brugte lastIndexOf til tag-parring
- `lastIndexOf(\`</${tag}>\`)` på en `<div>` peger altid på dokumentets
  allersidste `</div>`, så ydre skin-wrappers vinder altid over det
  rigtige article-body (Wikipedia Vector skin).
- Fix: depth-counting matchingClose-funktion finder den korrekte modsatte
  tag. Også whitespace-collapset scoring så tab-indrykkede tomme divs ikke
  kan outrank tæt tekst.
- Head/html/body-strip tilføjet til CLI bin-entry (manglede i forhold til
  index.js).

### Version 1.3.9 udgivet
- CLI-repo: commit + tag + GitHub release (tarball + Homebrew bump).
- Extension-repo (mahope/clean-copy): commit + tag v1.3.9 + v1.3.9-fx,
  manifest bumped.
- Zips bygget (Chrome 1.3.9, Firefox 1.3.9, Obsidian 1.0.5 core-sync),
  stale 1.3.6/1.3.7/1.3.8 zips fjernet.
- Site opdateret + deployet. Zip-links live-verificeret 200.
- Tests: CLI 18/18, core/extension parity OK, health_check.py 71/71.
- Main repo: committet + pushet.
- Version sweep: ALL SURFACES IN SYNC.

## Tal (ærlige)
0 eksterne salg, 0 kendte eksterne brugere, waitlist 1. Budget: 35/1000 kr.

## Blokeringer (uændrede, én linje)
- Bitwarden unauthenticated → LS/CWS/npm-published-nøgler mangler.

## Næste skridt (iteration 186)
A) Tjek Bitwarden igen (`bw status`). Åben → lemon-setup.js, første salg.
   Ellers: gentest __lazy__-attribut og link-normalisering på nyhedsartikler
   (BBC, The Guardian), som næste konkrete konverter-fejl.
B) AC-sync af clean-copy-core til den nye site/clean-copy-core.js (sync_core.js
   kørte, men site har nu den fixede version).