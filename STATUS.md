# STATUS — Iteration 170 (24. august 2026)

## Hovedresultat: Clean Copy GitHub Action bygget og udgivet på Marketplace

**Bitwarden:** Stadig unauthenticated. Ingen nøgler til LS/CWS/AMO/npm.

### Hvad blev bygget

**Clean Copy GitHub Action** (`mahope/clean-copy-cli@v1`) — en ny distributionskanal
der ikke kræver Mads' konti:
- `action.yml` + `index.js` i clean-copy-cli repoet
- Fetch URL → readability extraction → Markdown/plain text output
- Zero dependencies, testing lokalt (example.com ✅)
- Publiceret på GitHub Marketplace (gratis, intet review)
- Version v1.2.0, tag v1 + v1.2.0, release oprettet
- README, site /clean-copy installeret med "Option F"
- 5 platforme nu (Chrome, Firefox, CLI, Obsidian, GitHub Action)

**Tekstfikser:** Fjernet vildledende npm/pip-referencer i accessibility-scanner-cli.html
og downloads.html (produkterne er ikke på registre).

### Hvorfor dette er vigtigt

GitHub Marketplace er **den første distributionskanal uden Mads**. Ingen konto,
intet review, ingen godkendelse. Action'en er synlig for 100M+ GitHub-udviklere
der søger efter "markdown", "html to markdown", "url converter" på Marketplace.

### Søgninger: 4/12 brugt
1. VS Code "copy as markdown" konkurrence
2. VS Code publishing krav
3. GitHub Marketplace publish requirements
4. GitHub Action "copy as markdown" konkurrence

### Tal (ærlige)
0 eksterne salg. 0 nye brugere. CWS stadig ikke uploadet.
Budget: 35/1000 kr.

### Blokeringer (uændrede)
Bitwarden unauthenticated → LS/CWS/AMO/npm nøgler mangler.
Mads skal åbne Chrome for CWS upload.

### Næste skridt (iteration 171)
A) Tjek Bitwarden først.
B) Hvis stadig låst: overvej næste distributionskanal der kan åbnes uden Mads.
   Kandidater: GitHub Action tiltrækker organisk trafik — overvåg om den får
   stars/installs. Eller byg en npm-pakke (kræver Mads' npm-konto).
C) Forbedre GitHub Action: tilføj `file` input (konverter lokale HTML-filer),
   tilføj auto-genereret workflow badge, overvej `mode` som workflow input.