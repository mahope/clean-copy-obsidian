# STATUS — 24. august 2026, iteration 148

## Denne iteration: NYT PRODUKT — Clean Copy CLI + Homebrew tap (live og installerbar)

### Hvorfor

Stats-tjek (90 dage): stadig nul eksterne besøgende på alle sider. Flere blogs
er ikke svaret. Men jeg fandt en distributionskanal der ikke er blokeret:
**Homebrew**. En tap kræver kun GitHub — hvor jeg har fuld adgang. Det matcher
AGENTS.md's produkttype "CLI-værktøjer distribueret via Homebrew".

### Hvad er bygget og verificeret

1. **clean-copy CLI** (`clean-copy-cli/`, repo: github.com/mahope/clean-copy-cli)
   - Samme konverterkerne som udvidelsen (tools/clean_copy_core.js) som
     kommandolinjeværktøj. Nul dependencies, Node 16+.
   - Features: HTML→Markdown/plain text (stdin, filer), `--url` med readability-
     extraction (fjerner script/style/nav/footer, vælger største indholdsblok),
     `--copy` til udklipsholder, `--out`, `--quiet`. Fejl håndteres pænt
     (bad URL → exit 1 + klar besked, >5 MB afvises, redirects følges, timeout).
2. **Tests:** 13/13 grønne (`node test.js`) + manuel verifikation mod live-sider.
3. **Distribution:** GitHub release v1.0.0 med tarball; **Homebrew-tap**
   (github.com/mahope/homebrew-clean-copy). **End-to-end verificeret:**
   `brew install mahope/clean-copy/clean-copy` virkede på denne maskine,
   inkl. brew test. (Fikseste et checksum-helvede undervejs — GitHub release
   assets kan ikke overskrives pålideligt; korrekt sha256 er nu i tap'en.)
4. **Landingsside:** /clean-copy har nu "Option D — Command line / Homebrew"
   med install-instruktioner. Deployet og curl-verificeret live.

### Fejl rettet undervejs

- clean-copy-repo/tools/test_clean_copy.js pegede på forkert sti (gammel
  mappestruktur) og crashede på chrome.storage-blokken — fixet og pushet.
- extractReadable: nav/footer-stripping kørte efter kandidat-scoring og nåede
  aldrig at gavne noget ved stdin/fil-input — extraction kører nu for alle
  fulde HTML-dokumenter, ikke kun --url.

### Søgninger: 0/12 brugt.

### Tal (ærlige)

Site: nul eksterne besøgende (90 dages /api/stats). Waitlist: 1. CWS: 6 users.
GitHub traffic (clean-copy + clean-copy-obsidian): 0 views, 0 clones. Salg: 0.
Budget: 35/1000 kr (ingen nye udgifter).

## Blokeringer (uændrede)

1. Obsidian store-PR: ét klik som mahope — kit i obsidian-submission-kit.md.
2. Bitwarden → LS-nøgle + CWS OAuth + AMO-nøgle.

## Næste skridt (iteration 149)

A) Nøgler ankommet? → CWS/AMO-upload, lemon-setup.js.
B) Ellers: overvej npm-publicering af CLI (kræver npm-konto — Mads-punkt),
   evt. en "convert URL to Markdown" landingsside der driver /clean-copy-tool,
   eller måling af om tap'en får traction via GitHub-clones API.
