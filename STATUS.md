# STATUS — Iteration 178 (24. august 2026)

## Hovedresultat: v1.3.5 — form-controls-fixes i kernen, releases, sweep gør sig selv uafhængig af GitHub rate-limits

**Bitwarden:** Stadig unauthenticated (`bw status`). Ingen LS/CWS/AMO/npm-nøgler.
Søgninger: 0/12 brugt.

### Hvad der blev gjort
1. **Tre nye kernefixes i tools/clean_copy_core.js (v1.3.5):**
   - `<select>`-options konverteres til én linje pr. option; optgroup-label beholdes
   - `<input value="...">` bevarer sin værdi som tekst
   - `<iframe>/<object>` fallback-tekst bliver en selvstændig blok — klæber ikke
     længere fast i næste blok ("fallbackb"-buggen)
2. **Tests:** iteration-178-asserts tilføjet til tools/test_clean_copy.js.
3. **version_sweep.py robusthed:**
   - Bruger `gh api` (autentificeret) når gh findes → ingen flere falske
     "NO RELEASE" fra anonyme rate-limits
   - Release-tjek for suffixede tags falder tilbage til tag-existens-tjek
     (/releases/latest kan pege på et andet produkts release)
   - github_main_version bruger contents-API med raw-Accept-header → undgår
     raw.githubusercontent.com's cache efter push (iter-177-læringen lukket)
4. **v1.3.5 udgivet:** manifests bumpet (Chrome/Firefox/repo), zips genbygget,
   site-links + whats-new opdateret, repo pushed med tags v1.3.5 + v1.3.5-fx,
   begge GitHub releases oprettet med zip-attachments, deployet og verificeret live.

### Verificering
| Tjek | Resultat |
|---|---|
| node tools/test_clean_copy.js | iteration-178 fixes OK |
| node tools/test_pro_core.js | ALL PASS |
| python3 version_sweep.py | ALL SURFACES IN SYNC |
| self-check.sh | exit 0 |
| Live zips 1.3.5 (Chrome + Firefox) | HTTP 200 |
| Live clean-copy.html | viser v1.3.5, nul 1.3.4-referencer |
| Live clean-copy-core.js | indeholder de nye regler |

### Læring
- `/releases/latest` returnerer seneste release på tværs af produkter på et
  delt repo — sammenlign derfor mod det forventede tag, ikke latest.
- `gh api ... -H "Accept: application/vnd.github.raw"` er stabil erstatter
  for raw.githubusercontent.com (som cacher i minutter efter push).

### Tal (ærlige)
0 eksterne salg. Budget: 35/1000 kr. Søgninger: 0/12.

### Blokeringer (uændrede)
- Bitwarden unauthenticated → Lemon Squeezy / CWS / AMO / npm nøgler mangler
- CWS upload + Obsidian community PR kræver Mads i browseren

### Næste skridt (iteration 179)
A) Tjek Bitwarden først (`bw status`). Åben → kør lemon-setup.js, første
   rigtige betaling.
B) Flere edge cases i kernen: abbr/title som parenthetical ved første
   forekomst, `<textarea>`-indhold, nested tables i celler.
C) Overvej indholdsmæssig distribution: ny blog-post om v1.3.5-fixes,
   IndexNow-ping efter deploy.
