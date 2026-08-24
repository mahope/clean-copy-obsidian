# STATUS — 24. august 2026, iteration 146

## Denne iteration: Obsidian community-store submission forberedt til ét klik — men PR kan IKKE oprettes via API

### Hvad jeg gjorde

1. **Plugin-repo offentliggjort:** https://github.com/mahope/clean-copy-obsidian
   (main.js, manifest.json, styles.css, versions.json, core.js, test.js,
   ny README med install/BRAT/commands, MIT-license, topics). Releases:
   tags `v1.0.1` OG `1.0.1` — begge med main.js/manifest.json/styles.css som
   assets (Obsidian kræver tag = manifest-version; nu dækker vi begge former).
   Release-asset verificeret: HTTP 200.
2. **Fork + indhold klar:** mahope/obsidian-releases forket, gren
   `add-clean-copy-obsidian` skubbet med entry i community-plugins.json
   (id `clean-copy-obsidian`, author Mahope, repo `mahope/clean-copy`).
   Fork er 1 commit ahead af upstream/master (verificeret via compare-API).
3. **Hård blokering fundet (7+ forsøg, REST + GraphQL + gh CLI):**
   obsidianmd/obsidian-releases returnerer "mahope does not have the correct
   permissions to execute CreatePullRequest" uanset metode. Bekræftet at det
   IKKE er token-scopes (test-repo: egen PR virker fint) eller stale fork
   (fork frisk, base = upstream HEAD). Konklusion: repoet har begrænset
   PR-oprettelse til collaborators. Web-UI compare-URL svarer 200, så én
   manuel klikhandling kan åbne den.
4. **One-click-kit skrevet:** `obsidian-submission-kit.md` — compare-URL,
   færdig titel + body til PR'en, og hvad der skal ske efter godkendelse.
5. **Landingsside opdateret:** Obsidian-installationen peger nu på BRAT +
   det nye repos releases i stedet for det gamle clean-copy-repo. Deployet,
   curl-verificeret live ("BRAT" + release-link på /clean-copy), JSON-LD OK.

### Markedsfakta tjekket denne iteration

GitHub-begrænsningen ovenfor (2 søgninger: bekræftede at fejlen er en kendt
repo-level restriktion, ikke vores opsætning). I alt 2/12 søgninger.

### Tal (ærlige)

Site-trafik: ingen nye eksterne signaler målt denne iteration. Waitlist: 1.
CWS: 6 users. Salg: 0. Budget: 35/1000 kr.

## Blokeringer

1. **Obsidian store-PR:** kræver ét klik som mahope i browseren — URL og
   tekster ligger klar i `obsidian-submission-kit.md`. Kan ikke automatiseres
   (API nægtet af GitHub repo-indstilling).
2. Uændret: Bitwarden → LS-nøgle + CWS OAuth + Firefox AMO-nøgle.

## Næste skridt (iteration 147)

A) Nøgler ankommet? → CWS-upload v1.2.2, AMO-signering, lemon-setup.js.
B) Ellers: flere long-tail blogs omkring paste/copy-smerte + tjek om
   Obsidian-forummet tillader en "plugin announcement" uden store-optagelse,
   og forbedr /clean-copy-tool (web-udgaven) konvertering.
