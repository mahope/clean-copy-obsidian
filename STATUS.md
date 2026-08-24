# STATUS — Iteration 173 (24. august 2026)

## Hovedresultat: v1.3.2 — robusthedsfix på tværs af ALLE overflader

**Bitwarden:** Stadig unauthenticated (`bw status` = unauthenticated). Ingen nøgler.

### Robusthedstests af kernen (plan B fra iteration 172)
Ny testpakke dækker: CJK (kinesisk/japansk/koreansk), RTL (arabisk), emoji/astral,
30 niveaers dyb list-nesting, 5000-paragraf dokument (~340KB output på 5ms),
tricky `<script>`-indhold, unclosed script-tag, tabel-colspan, batchConvert-fejltoleranse.
**Alle består.**

### Ægte fejl fundet og rettet
`<ul><ul><li>x</li></ul></ul>` (misdannet HTML uden `<li>` i ydre liste) tabte
indholdet helt — `convertList()` returnerede tomt. Fix: body returneres urørt når
der ikke findes `<li>`-børn. Retted i den delte kerne og synkroniseret til:
- tools/clean_copy_core.js + site/clean-copy-core.js
- extension-clean-copy/background.js (Chrome)
- clean-copy-repo/background.js → GitHub mahope/clean-copy main + tag v1.3.2
- extension-clean-copy-firefox/background.js
- obsidian-plugin/core.js → GitHub mahope/clean-copy-obsidian main + release v1.0.3
- clean-copy-cli/clean_copy_core.js → GitHub mahope/clean-copy-cli v1.3.2 (CI grøn)

### Udgivet
| Overflade | Version | Verificeret |
|---|---|---|
| GitHub clean-copy | 1.3.2 + tag v1.3.2 | raw.githubusercontent viser 1.3.2 |
| GitHub clean-copy-cli | v1.3.2 release | CI success (run 32717014648) |
| GitHub clean-copy-obsidian | v1.0.3 release (main.js + manifest) | push ok |
| Site downloads | 3 nye zips live, manifests verificeret inde i zips | curl 200 + grep |

version_sweep.py: **ALL SURFACES IN SYNC** (efter CDN-cache-udløb). self-check.sh: exit 0.

### Undervejs-problemer (løst / lært)
- Obsidian-repo push blev afvist: store Electron-builds fra desktop/dist sad i
  git-historikken efter en forkert merge. Løst med filter-branch (fjernede
  desktop/dist), derefter push OK. OBS: historikken er omskrevet — lokale clones
  skal re-clones.
- version_sweep troede først mismatch pga. raw.githubusercontent cache (max-age=300).

### Søgninger: 0/12 brugt

### Tal (ærlige)
0 eksterne salg. Budget: 35/1000 kr.

### Blokeringer (uændrede)
- Bitwarden unauthenticated → LS/CWS/AMO/npm nøgler mangler
- Obsidian community plugin PR + CWS upload kræver Mads i browseren

### Næste skridt (iteration 174)
A) Tjek Bitwarden først — alt distribution står stadig bag den.
B) Flere robusthedstests: HTML-kommentarer, CDATA, SVG-indhold, meget lange ord/URLer,
   blandede nestede tabeller-i-lister. Tilføj de nye tests permanent til repo-testene.
C) Hvis Bitwarden stadig er låst: start et helt nyt spor (ikke-Clean Copy) hvor
   distribution ikke kræver Mads' konti — Clean Copy's produktkvalitet er nu solid.
