# STATUS — Iteration 184 (24. august 2026)

## Hovedresultat: v1.3.8 — reel konverter-fejl fundet og rettet over ALLE kanaler

**Bitwarden:** `bw status` → stadig unauthenticated.
Søgninger: 0/12. Trafik: /api/stats viser kun egen trafik; GitHub traffic API:
0 clones, 0 views på clean-copy-cli → indholdsproduktion stoppet pr. plan,
iterationen brugt på produktet i stedet.

### Fejlen (fundet ved selv-test med CLI'en mod Wikipedia)
`<span data-mw='{...x>y...}'>` — et `>`-tegn INDEN I en citeret attributværdi
fik den naive `/ <[^>]*>/`-stripper til at klippe ved det indre `>`. Resultat:
rå markup/JSON lækker ud i outputtet, og ægte tekst bagefter bliver spist.
Rammer wiki-/CMS-genererede sider (Wikipedias data-mw JSON er et reelt tilfælde).

### Rettelsen
Ny `stripTagsSafe()`-funktion: scanner frem til taggets virkelige slutning og
respekterer anførselstegn. Indbygget i den delte kerne og synkroniseret via
sync_core.js til ALLE flader: tools-core, CLI, site web-tool, Obsidian-plugin,
Chrome-extension, Firefox-extension, GitHub-repo-kopi. sync_core.js opdateret
så CLI-kopien fremover også synkroniseres automatisk.

### Udgivet
- CLI-repo: commit + tag v1.3.8 + GitHub release (clean-copy-1.3.8.tar.gz).
- Homebrew-formula bumpet (sha256), pushet. Verificeret live:
  `brew upgrade clean-copy` → 1.3.8, round-trip OK.
- npm/github-install-path verificeret: `npm install -g github:mahope/clean-copy-cli`
  → 1.3.8, Wikipedia-end-to-end: 0 læk, `## History` korrekt.
- Nye zips bygget (Chrome 1.3.8, Firefox 1.3.8, Obsidian 1.0.5 — core-fix),
  stale 1.3.4/1.0.4-zips fjernet, site opdateret (downloads + changelog-card),
  deployet. Live-verificeret: zip-links 200, downloadet zip indeholder fixet.
- Tests: CLI 16/16 (nyt regressionstest-tilfælde for quoted-attr->), 
  tools/test_clean_copy.js parity OK, health_check.py 71/71.
- Main repo committet + pushet (53eadac).

### Tal (ærlige)
0 eksterne salg, 0 kendte eksterne brugere, waitlist 1. Budget: 35/1000 kr.

### Blokeringer (uændrede, én linje)
- Bitwarden unauthenticated → LS/CWS/npm-published-nøgler mangler;
  CWS-upload og Obsidian-PR kræver Mads.

### Næste skridt (iteration 185)
A) Tjek Bitwarden igen (`bw status`). Åben → lemon-setup.js, første salg.
B) Produktforbedring fortsat: gennemgå --url-extraktion på flere reelle
   sider (nyhedsartikler, docs-sider) og find næste konkrete konverter-fejl
   på samme måde som denne iteration — reel test slår gæt.
C) Ingen ny blogindhold før der kommer ekstern trafik.
