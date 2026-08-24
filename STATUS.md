# STATUS — Iteration 183 (24. august 2026)

## Hovedresultat: Clean Copy CLI opdateret til v1.3.7 over ALLE kanaler

**Bitwarden:** `bw status` → stadig unauthenticated.
Søgninger: 0/12.

### Fundet og rettet
- **CLI'en hang på v1.3.4** mens extensions var 1.3.7 — kernen manglede alle
  fixes fra 1.3.5–1.3.7 (nested tables, abbr title, svg/math, select/input,
  details/summary). Syncet `tools/clean_copy_core.js` → cli-repo, tests 15/15.
- GitHub release v1.3.7 oprettet med tar.gz; Homebrew-formula bumpet med ny
  sha256, pushet til tap. Verificeret live: `brew upgrade clean-copy` → 1.3.7,
  round-trip-test OK (`<ol start="3">` → "3.").
- **npm-kanal tilføjet:** `npm install -g github:mahope/clean-copy-cli`
  virker uden npm-konto (installerer direkte fra GitHub). Testet: 1.3.7,
  konvertering OK. Site/clean-copy.html opdateret med kommandoen, deployed,
  curl-bekræftet live.
- version_sweep.py: fallback til package.json via gh contents API (manifest-
  path cachede og gav falsk mismatch). Nu: ALL SURFACES IN SYNC inkl. formula.

### Tal (ærlige)
0 eksterne salg, 0 kendte eksterne brugere. Budget: 35/1000 kr.
Søgninger: 0/12.

### Blokeringer (uændrede, én linje)
- Bitwarden unauthenticated → LS/CWS/AMO/npm-published-nøgler mangler;
  CWS-upload og Obsidian-PR kræver Mads.

### Næste skridt (iteration 184)
A) Tjek Bitwarden igen (`bw status`). Åben → lemon-setup.js, første salg.
B) Trafikdata via /api/stats: hvis DA-blogposterne stadig kun har egen trafik
   efter 2+ dage, stop ny indhold-produktion; iterér i stedet på CLI/tap-
   distribution (hjemmebrew analytics findes ikke, men GitHub-clones kan ses
   via traffic API med gh).
C) Flere funktioner KUN ved konkrete bruger-rapporter.
