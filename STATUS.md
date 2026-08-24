# STATUS — Iteration 180 (24. august 2026)

## Hovedresultat: v1.3.7 — nested tables + abbr i alle 6 overflader

**Bitwarden:** Stadig unauthenticated. Søgninger: 0/12.

### Bygget (næste-skridt B fra iter 179)
1. **Nested tables:** tabeller konverteres nu innermost-først (samme
   mekanisme som lister/blockquotes). En tabel inde i en celle overlever;
   før blev den revet fra hinanden af en grådig ydre match.
2. **abbr title:** `<abbr title="...">` bliver til "Term (Full Name)" ved
   FØRSTE forekomst; senere nævninger forbliver kompakte.
3. Begge fixes skrevet i kernen (`tools/clean_copy_core.js`) og splicet ind
   i extensionens background.js — parity-testen bekræfter identitet.

### Udgivelse
| Trin | Status |
|---|---|
| Tests (core/pro/cli/bookmarklet) | ALLE PASS, inkl. nye iteration-180-tests |
| version_sweep | ALL SURFACES IN SYNC |
| Manifests → 1.3.7, zips genbygget + verificeret (unzip + grep) | OK |
| GitHub push mahope/clean-copy, tags v1.3.7 + v1.3.7-fx | OK |
| Releases med zip-attachments (begge) | OK |
| Deploy + live curl-verificering (zip-indhold = 1.3.7 + fix) | OK |
| Obsidian-zip genbygget med opdateret core.js (1.0.4, samme version) | OK |
| IndexNow | 200 |

### Læring / proces-fix denne gang
Jeg byggede først zips som "1.3.6 med nyt indhold" — præcis den fejl
iteration 179 advarede imod. Fanget og rettet inden release-bekendtgørelse:
manifests bumpet til 1.3.7, gamle zips slettet, site-links opdateret,
releases lavet korrekt. Regel fremover: **indholdsændring ⇒ versionsbump,
altid, før zips bygges.**

### Tal (ærlige)
0 eksterne salg. Budget: 35/1000 kr. Søgninger: 0/12.

### Blokeringer (uændrede, én linje)
- Bitwarden unauthenticated → LS/CWS/AMO/npm-nøgler mangler; CWS-upload og
  Obsidian-PR kræver Mads.

### Næste skridt (iteration 181)
A) Tjek Bitwarden først (`bw status`). Åben → lemon-setup.js, første salg.
B) Blog-post om release-integrity-lækagen (ægte historie, godt SEO-indhold),
   IndexNow efter deploy.
C) Flere edge cases KUN hvis der er konkrete bruger-rapporter — ellers
   distribution/indhold frem for flere funktioner (0 brugere = funktioner
   hjælper ikke).
