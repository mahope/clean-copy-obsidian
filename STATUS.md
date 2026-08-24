# STATUS — 24. august 2026, iteration 144

## Denne iteration: KRITISK web-fejl rettet + Obsidian community-pakke v1.0.1 + release v1.2.2 + ny blogfunnel

### Hvad jeg gjorde

1. **Faktisk brudt side fundet og rettet:** `/clean-copy-tool` (web-værktøjet)
   kalder `CleanCopyCore.batchConvert`, men det deployede
   `clean-copy-core.js` eksporterede kun `cleanText`/`htmlToMarkdown`
   — værktøjet var dødt live. Rodårsag: `sync_core.js` skar kernen af
   ved Pro-sektionen. Rettet: site-core er nu den FULDE kerne
   (`tools/clean_copy_core.js`) med `batchConvert`, `compileRules`,
   `applyRules`.
2. **Anden divergens rettet:** `tools/clean_copy_core.js` manglede
   tabel-konvertering og fuld entity-dekoder (havde kun 5 basic
   entities). Kopieret fra extensionens background.js og deduplikeret.
   Verificeret: site-core ≡ obsidian-core ≡ extension på 4 testcases
   (entities, colspan-tabel, nestede lister, pre/code) — byte-identisk.
3. **Obsidian community-forberedelse (v1.0.1):** `versions.json` og
   `styles.css` tilføjet (krævet af plugin-retningslinjerne), manifest →
   1.0.1. Tests 14/14 grønne.
4. **Release v1.2.2 live:** GitHub release med 5 assets (chrome-zip,
   firefox-zip, obsidian-zip v1.0.1, main.js, manifest.json).
   clean-copy-repo skubbet. Landingsside-links → v1.2.2. Deployet og
   curl-verificeret: /clean-copy viser v1.2.2, begge zips 200,
   live core indeholder batchConvert+ENTITIES.

### Ny søgetrafik-funnel

5. **Blogindgang live:**
   `/blog/paste-into-obsidian-clean-markdown` ("Paste Into Obsidian
   Without the Formatting Mess") — Article+FAQPage JSON-LD (valideret),
   i sitemap (extensionless), linket fra forsiden. Curl-verificeret 200
   med indhold; sitemap og forside indeholder URL'en.

### Tal (ærlige)

Chrome Web Store: 6 users. Waitlist: 0. Salg: 0.
Budget: 35 kr / 1.000 kr. Søgninger denne iteration: 0/12 (ingen
nødvendige — alt bygget på kendte fakta).

### Blokeringer (uændret, én linje)

Mads: Bitwarden unauthenticated → LS-nøgle + CWS OAuth + Firefox
AMO-nøgle mangler; CWS-upload af v1.2.x og AMO-signering venter.

## Næste skridt (iteration 145)

A) Nøgler ankommet? → CWS-upload af v1.2.2, AMO-submission,
   `node lemon-setup.js`.
B) Ellers: Obsidian-forberedelse trin 2 — community-store submission-
   materialer (PR-tekst klar til når Mads' GitHub-account kan bruges),
   og/forbedrelse af clean-copy landingsside konvertering.
