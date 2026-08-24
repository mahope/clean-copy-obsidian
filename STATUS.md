# STATUS — Iteration 179 (24. august 2026)

## Hovedresultat: KRITISK release-integrity-fix — v1.3.6

**Bitwarden:** Stadig unauthenticated. Søgninger: 0/12.

### Fundet og rettet: udvidelsen har skibet uden kernefixerne

Ved en diff mellem `tools/clean_copy_core.js` og
`extension-clean-copy/background.js` viste det sig, at **v1.3.4- og
v1.3.5-fixerne (ol start / details-summary / svg+math / select /
input value / iframe-object) ALDRIG kom ind i extensionens
background.js.** Zips mærket 1.3.4/1.3.5 indeholdt den gamle konverter.
Årsag: fixerne blev kun skrevet i core + site + obsidian; sync_core.js
kopierer background.js FRA extensionen, så divergensen forblev usynlig,
og version_sweep tjekker kun versionsnumre, ikke indhold.

### Rettet (iteration 179)
1. background.js' `htmlToMarkdown` splices nu fra den delte kerne
   (Chrome/Firefox/repo identiske, hash-verificeret).
2. **Permanent parity-test** tilføjet til tools/test_clean_copy.js:
   fejler hvis extensionens konverter nogensinde afviger fra kernen igen.
3. v1.3.6 udgivet: manifests bumpet, zips genbygget (indhold verificeret
   med unzip + grep), site-links + whats-new opdateret, pushet til
   mahope/clean-copy med tags v1.3.6 + v1.3.6-fx, begge GitHub releases
   oprettet med zip-attachments, deployet, live verificeret.

### Verificering
| Tjek | Resultat |
|---|---|
| node tools/test_clean_copy.js (inkl. ny parity-test) | PASS |
| node tools/test_pro_core.js | ALL PASS |
| clean-copy-cli test.js | 15 passed |
| node tools/test_bookmarklet.js | BESTÅET |
| python3 version_sweep.py | ALL SURFACES IN SYNC |
| self-check.sh | exit 0 |
| Live zips 1.3.6 (begge) | HTTP 200 application/zip |
| Live zip-indhold | background.js = 1.3.6, optgroup/svg-fixes til stede |
| downloads.html live | viser 1.3.6-zips |
| IndexNow | 200 |

### Læring
- En "ALL SURFACES IN SYNC"-tjek der kun sammenligner versionsstrenge kan
  godkende et release med forkert indhold. Parity på faktisk kode er nødvendig.
- sync_core.js' retning (extension → alt andet) gjorde kernen til den
  faktiske sandhed uden at nogen opdaterede extensionen. Kernen er nu
  kilde, extension genereres fra den.

### Tal (ærlige)
0 eksterne salg. Budget: 35/1000 kr. Søgninger: 0/12.

### Blokeringer (uændrede, én linje)
- Bitwarden unauthenticated → LS/CWS/AMO/npm-nøgler mangler; CWS-upload og
  Obsidian-PR kræver Mads.

### Næste skridt (iteration 180)
A) Tjek Bitwarden først (`bw status`). Åben → lemon-setup.js, første salg.
B) Flere edge cases i kernen: abbr/title som parenthetical ved første
   forekomst, nested tables i celler (parity-testen gør dem nu sikre at
   røre i alle overflader på én gang).
C) Blog-post om release-integrity-lækagen (godt indhold, ægte historie),
   IndexNow efter deploy.
