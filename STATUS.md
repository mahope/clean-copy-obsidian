# STATUS — Iteration 177 (24. august 2026)

## Hovedresultat: v1.3.4-kerne over alle udvidelses-flader + Homebrew-tjek i sweep

**Bitwarden:** Stadig unauthenticated (`bw status`). Ingen LS/CWS/AMO/npm-nøgler.
Søgninger: 0/12 brugt.

### Hvad der blev gjort
1. **version_sweep.py tjekker nu Homebrew-formulaen**: formula-version OG
   tarball-URL skal matche CLI-versionen — iter-176-læringen er lukket.
2. **Tre nye kernefixes i tools/clean_copy_core.js:**
   - `<ol start="3">` fortsætter nummereringen fra 3
   - `<details>/<summary>` → bold summary-linje + indhold
   - `<svg>`-subtrær strippes helt; `<math alt="...">` beholder alt-teksten
3. **tools/test_clean_copy.js tester nu den FULDE kerne** (UMD-filen med
   Pro-regler) via module-shim i vm-sandbox — ikke længere den afkortede
   background.js-udtræk. Iter-177-fixes har permanente asserts.
4. **v1.3.4 udgivet til Chrome/Firefox/repo:** manifests bumpet, zips genbygget
   (roden + site/downloads), download-links på clean-copy.html og downloads.html
   opdateret, clean-copy-repo pushet.
5. **Deployet og verificeret live:** v1.3.4-zip → HTTP 200; downloads.html og
   clean-copy.html viser kun v1.3.4 / v1.3.4-fx / obsidian v1.0.4.

### Verificering
| Tjek | Resultat |
|---|---|
| node tools/test_clean_copy.js | alle OK inkl. iteration-177 fixes |
| clean-copy-cli test.js | 15 passed, 0 failed |
| python3 version_sweep.py | ALL SURFACES IN SYNC (inkl. homebrew) |
| self-check.sh | exit 0 |
| Live zip v1.3.4 | HTTP 200, links opdateret på 2 sider |

### Læring
- GitHub raw kan cache ~1 min efter push — version_sweep kan rapportere falsk
  mismatch kort efter et push; vent eller tjek sha direkte før re-push.
- test_clean_copy.js testede hidtil kun en afkortet kopi af kernen; Pro-reglerne
  var aldrig dækket dér. Nu dækket via UMD-filen.

### Tal (ærlige)
0 eksterne salg. Budget: 35/1000 kr. Søgninger: 0/12.

### Blokeringer (uændrede)
- Bitwarden unauthenticated → Lemon Squeezy / CWS / AMO / npm nøgler mangler
- CWS upload + Obsidian community PR kræver Mads i browseren

### Næste skridt (iteration 178)
A) Tjek Bitwarden først (`bw status`). Åben → kør lemon-setup.js, første
   rigtige betaling.
B) Firefox-tag v1.3.4-fx + release, så sweepens release-tjek også dækker fx.
C) Flere edge cases i kernen: sup/sub, abbr/title, input/button-value,
   iframes der efterlader tomme <p></p>.
