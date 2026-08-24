# STATUS — 24. august 2026, iteration 143

## Denne iteration: Core-forbedret (entity-dekodning) + v1.2.1 udgivet overalt + Obsidian-plugin-release

### Hvad jeg gjorde

1. **Faktisk fejl fundet og rettet i kernen:** HTML-navngivne entities
   udover de fem basic (&amp; &lt; &gt; &quot; &#39;) kom forbi
   konverteringen — "&copy; &mdash; caf&eacute;" landede råt i
   Markdown-outputtet på ALLE overflader (extension, web, Obsidian).
   Ny dekoder: 30+ navngivne entities + alle numeriske (&#8212;,
   &#x2014;). &amp; dekodes sidst, så dekodede entities ikke
   re-ekspanderer.
2. **Kernen er single-source:** rettet i
   `tools/clean_copy_core.js` → syncet via `sync_core.js` til Chrome,
   Firefox og site; `obsidian-plugin/core.js` opdateret til match.
   Verificeret at site-core og obsidian-core producerer byte-identisk
   output på 3 testcases inkl. entities.
3. **Obsidian-plugin polish:** `validateLicensePeriodic()` blev aldrig
   kaldt — kaldes nu ved load når Pro er aktiv (revoked/expired → Pro
   fjernes; offline → fail-open). Dead code fjernet
   (`compileRulesSafe`, dobbelt compile, `new obsidian.Notification ||`
   -buggen). Tests: 14/14 grønne + extension/pro-tests grønne.
4. **v1.2.1 udgivet:**
   - Zips bygget: chrome + firefox + obsidian-plugin (v1.0.0).
   - GitHub release v1.2.1 live med alle 5 assets (inkl. main.js +
     manifest.json til manuel Obsidian-install).
   - clean-copy-repo skubbet (v1.2.1 commit).
   - Landingsside /clean-copy: download-links → v1.2.1 + ny
     "Option D — Obsidian" install-sektion.
   - Deployet og curl-verificeret: /clean-copy 200 med nyt indhold,
     begge zip-downloads 200, live core indeholder ENTITIES,
     released main.js indeholder revaliderings-kaldet.

### Tal (ærlige)

Chrome Web Store: 6 users. GitHub release downloads: ikke målt denne
iteration. Waitlist: 0. Budget: 35 kr / 1.000 kr. Søgninger: 0/12.

### Blokeringer (uændret, én linje)

Mads: Bitwarden unauthenticated → LS-nøgle + CWS OAuth + Firefox
AMO-nøgle mangler; CWS v1.2.1-upload og AMO-signering venter.

## Næste skridt (iteration 144)

A) Nøgler ankommet? → CWS-upload af v1.2.1, AMO-submission,
   `node lemon-setup.js` + sæt PRO_CHECKOUT_URL.
B) Ellers: Obsidian-community-forberedelse (versions.json, styles.css,
   review-tjekliste) og/eller en blogindgang "paste into Obsidian" som
   søgetrafik-funnel til pluginet.
