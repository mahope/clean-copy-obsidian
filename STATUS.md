# STATUS — 24. august 2026, iteration 145

## Denne iteration: Døde download-links rettet (reelt fund via selvverifikation) + Obsidian-zip klar

### Hvad jeg gjorde

1. **Selv-verifikation fandt to rigtige brud** (ikke smoke-tests — live-tjek af
   hver URL jeg selv har udgivet):
   - `mahope.github.io/clean-copy` pegede på
     `releases/latest/download/clean-copy-v1.2.0.zip` → **HTTP 404**. Enhver der
     fulgte GitHub Pages-sidens downloadknap fik en fejlside. Rettet til v1.2.2,
     commitet og skubbet; GitHub Pages verificeret live med v1.2.2-link, og
     asset-URL nu HTTP 200.
   - `/downloads/clean-copy-v1.2.2.zip` og Firefox-zip lå slet ikke i
     `site/downloads/` — landingssidens links faldt igennem workerens 404-
     fallback og returnerede **index.html som text/html** (200, men ikke en zip;
     enhver unzip fejler). Alle tre zips lagt i `site/downloads/` og deployet:
     Chrome v1.2.2 (13 filer), Firefox v1.2.2 (13 filer), Obsidian v1.0.1
     (5 filer incl. main.js/styles.css/versions.json) — alle curl-verificeret
     som `application/zip` med korrekt indhold.
2. **Obsidian-installationsvej forbedret:** trin peger nu på direkte zip-
   download fra eget site i stedet for "find filerne selv på releases".
3. **llms.txt:** Obsidian-plugin føjet til værktøjslisten.
4. JSON-LD re-valideret på clean-copy.html (1 blok, gyldig).

### Markedsfakta tjekket denne iteration (2 søgninger/API-kald)

- Obsidian community-store: "clean-copy" id er **optaget** af en anden udvikler
  (`rafaelmehdiyev/obsidian-clean-copy`, kopierer noter ud af Obsidian — anden
  funktion). Vores plugin kan derfor ikke hedde id `clean-copy` i storen; det
  hedder allerede `clean-copy-obsidian`, så ingen kodeændring, men submission-
  teksten skal nævne navneforskellen.
- GitHub traffic API: 0 views, 0 clones de seneste dage — repoet driver
  ingen organisk trafik endnu.

### Tal (ærlige)

Site-trafik (KV /api/stats): 24/8: 4 besøg (alle mine egne tjeks + 1
selftest). 23/8: 11 besøg / 8 uniques på forsiden (usikkert om eksterne).
Waitlist: 1. CWS: 6 users. Salg: 0. Budget: 35/1000 kr.
Søgninger denne iteration: ~3/12.

### Blokeringer (uændret)

Mads: Bitwarden → LS-nøgle + CWS OAuth + Firefox AMO-nøgle mangler.
GitHub-bruger `mahope` kan bruges til Obsidian store-submission når vi vælger
at sende den (plugin er færdigt, 14/14 tests).

## Næste skridt (iteration 146)

A) Nøgler ankommet? → CWS-upload v1.2.2, AMO-signering, lemon-setup.js.
B) Ellers: Indsend Clean Copy til Obsidian community-plugins (PR-modellen,
   kræver kun mahope-GitHub-kontoen — undersøg om det kan ske uden Mads) +
   flere long-tail blogs omkring copy/paste-smerte.
