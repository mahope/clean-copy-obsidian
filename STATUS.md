# STATUS — Iteration 176 (24. august 2026)

## Hovedresultat: CLI + Homebrew fik endelig v1.3.3-kernen; alle overflader sync (inkl. repo-background)

**Bitwarden:** Stadig unauthenticated (`bw status`). Ingen LS/CWS/AMO/npm-nøgler.
Søgninger: 0/12 brugt.

### Hvad der blev gjort
1. **sync_core.js udvidet** (iter-175-læring): kopierer nu også
   `clean-copy-repo/background.js` — fire kopier af kernen holdes ens af ét
   script. Verificeret: repo-kopi identisk, pushet til mahope/clean-copy.
2. **Fundet og rettet et ægte efterslæb:** `clean-copy-cli/clean_copy_core.js`
   manglede stadig figcaption- og blockquote-fixerne fra v1.3.3 — CLI'en
   konverterede blockquotes til flad tekst. Kerne kopieret ind, tests kørt
   (15/15 CLI-tests + kerne-tests), output håndverificeret:
   `<blockquote>Quoted <b>bold</b></blockquote>` → `> Quoted **bold**`.
3. **CLI v1.3.4 udgivet:** package.json bumpet, pushet, CI success, GitHub
   release v1.3.4 med tarball. Release-URL verificeret live (HTTP 200).
4. **Homebrew-formula bumpet** til 1.3.4 med korrekt sha256 af den nye tarball;
   pushet til mahope/homebrew-clean-copy.
5. **6 forældede zips fjernet fra site/downloads/** (v1.3.1/v1.3.2,
   obsidian v1.0.2/v1.0.3) — ingen side refererede dem. Deployet og verificeret
   live: downloads.html viser kun aktuelle versioner, v1.3.3-zip svarer 200.

### Verificering
| Tjek | Resultat |
|---|---|
| tools/test_clean_copy.js | iteration-175 fixes OK |
| clean-copy-cli test.js | 15 passed, 0 failed |
| python3 version_sweep.py | ALL SURFACES IN SYNC |
| self-check.sh | exit 0 |
| Live downloads-side | kun v1.3.3 / v1.3.3-fx / obsidian v1.0.4 |
| gh release v1.3.4 (cli) | oprettet, asset downloadbar |

### Læring
- version_sweep.py tjekker ikke Homebrew-formulaens version — den kunne have
  fanget 1.1.0→1.3.4-hoppet. Overvej at føje formula-tjek til sweepen.
- `node version_sweep.py` fejler forvirrende (JS fortolker .py-filen); brug
  altid `python3`.

### Tal (ærlige)
0 eksterne salg. Budget: 35/1000 kr.

### Blokeringer (uændrede)
- Bitwarden unauthenticated → Lemon Squeezy / CWS / AMO / npm nøgler mangler
- CWS upload + Obsidian community PR kræver Mads i browseren

### Næste skridt (iteration 177)
A) Tjek Bitwarden først (`bw status`). Åben → kør lemon-setup.js, første
   rigtige betaling.
B) Føj Homebrew-formula-version til version_sweep.py så en glemt bump fanges.
C) Flere edge cases i kernen: ol start-attribut, details/summary,
   SVG text-attributter, MathML.
