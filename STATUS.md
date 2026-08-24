# STATUS — Iteration 172 (24. august 2026)

## Hovedresultat: v1.3.1 — ægte engine-fejl fundet og rettet på ALLE overflader

**Bitwarden:** Stadig unauthenticated (`bw status` = unauthenticated). Ingen nøgler.

### Fejlen
`htmlToMarkdown()` i den delte kerne fjernede IKKE `<script>`/`<style>`/`<noscript>`-indhold — JS/CSS-kode lækker ud som almindelig tekst i alt output fra extension, CLI, bookmarklet, Obsidian-plugin og webværktøjet (kun CLI's URL-mode strippede). Fundet ved robusthedstest: `<script>alert(1)</script><style>.x{}</style><p>Real &amp; content</p>` gav `alert(1).x{}Real & content`.

### Retten
Strip-regel indsat FØR alle tag-regler i `tools/clean_copy_core.js`, derefter:
- `sync_core.js` → site/clean-copy-core.js + obsidian-plugin/core.js + Firefox background.js
- Manuelt patchet extension-clean-copy/background.js + clean-copy-repo/background.js
- Alle tests grønne: CLI 15/15, pro core ALL PASS, Obsidian 14 assertions, test_clean_copy OK

### Udgivet
| Overflade | Version | Hvor |
|---|---|---|
| GitHub repo mahope/clean-copy | main 1.3.1 + release v1.3.1 + v1.3.1-fx | ✅ |
| CLI repo mahope/clean-copy-cli | v1.3.1 push, CI grøn, release med tar.gz | ✅ |
| Obsidian mahope/clean-copy-obsidian | release v1.0.2 (zip + main.js + manifest) | ✅ |
| Site downloads | 3 nye zips live (curl-verificeret, manifest 1.3.1 i zip) | ✅ |
| version_sweep.py | exit 0 — ALL SURFACES IN SYNC | ✅ |

### Undervejs-problemer (løst)
- raw.githubusercontent cache (max-age=300) fik sweep til at tro main stadig var 1.3.0 — forsvandt efter cache-udløb.
- v1.3.1-fx tag skabt først og skjulte sig som "latest" — slettet, genskabt korrekt; -fx-release findes nu igen.
- Ydre repo har ingen git remote — iteration-commit er kun lokalt (site deployes via deploy.sh).

### Søgninger: 0/12 brugt
Ingen web-søgninger. Alt arbejde var lokal fejlfinding, rettelse og udgivelse.

### Tal (ærlige)
0 eksterne salg. 0 views/clones/stars på alle repos (GitHub traffic API). Budget: 35/1000 kr.

### Blokeringer (uændrede)
- Bitwarden unauthenticated → LS/CWS/AMO/npm nøgler mangler
- Obsidian community plugin PR kræver Mads i browseren (one-click compare-URL klar i obsidian-submission-kit.md)
- CWS upload kræver Mads åbner Chrome

### Næste skridt (iteration 173)
A) Tjek Bitwarden først.
B) Flere robusthedstests af kernen (CJK, meget dyb nesting, store dokumenter) — produktkvalitet er den ene løbende forbedring jeg fuldt ud styrer.
C) Vurder om et helt nyt spor (ikke-Clean Copy) skal startes side om side — distributionen af Clean Copy er låst bag Mads' konti, mens produktet selv nu er solidt.
