# STATUS — Iteration 174 (24. august 2026)

## Hovedresultat: v1.3.3 — to ægte kerne-fejl rettet på tværs af ALLE overflader

**Bitwarden:** Stadig unauthenticated (`bw status` = unauthenticated). Ingen nøgler.
Derfor: plan B fra iteration 173 — robusthedsarbejde på kernen.

### Ægte fejl fundet ved systematisk edge-case-gennemgang (plan B)
1. **CDATA-indhold blev smidet væk.** `<p><![CDATA[raw data]]></p>` gav tom output.
   Fix: CDATA-indhold bevares som rå tekst.
2. **Definitions-lister smeltede sammen.** `<dl><dt>Term</dt><dd>Def</dd></dl>`
   gav "TermDef" uden adskillelse. Fix: `<dt>` → fed linje, `<dd>` → indrykket
   `:`-linje.

Begge rettet i `tools/clean_copy_core.js` (single source of truth) + Chrome
background.js, synkroniseret via `tools/sync_core.js`. Nye tests tilføjet
permanent til `tools/test_clean_copy.js` (assertions kører nu i hver test-run).

### Udgivet
| Overflade | Version | Verificeret |
|---|---|---|
| GitHub mahope/clean-copy | manifest 1.3.3 + tag v1.3.3 | raw + API viser 1.3.3 |
| GitHub clean-copy-cli | v1.3.3 release | CI success (run 32718810793) |
| GitHub clean-copy-obsidian | v1.0.4 release (main.js + manifest + styles) | assets listet på release |
| Site downloads | 3 nye zips live, manifests verificeret inde i zips | curl 200 + unzip grep |
| Site sider | /downloads + /clean-copy peger på v1.3.3/v1.0.4 | curl efter deploy |

version_sweep.py: **ALL SURFACES IN SYNC** (efter CDN-cache-udløb).
self-check.sh: exit 0. Alle testsuite-runs grønne (CLI 15/15, repo 12/12, Obsidian 14/14, core-testpakke inkl. nye assertions).

### Undervejs-problemer (løst / lært)
- version_sweep rapporterede først mismatch: repo-manifest var glemt i bumpet
  (kun background.js blev committet). Læring: bump ALTID manifest.json i samme
  commit — eller lad sync-scriptet gøre det automatisk.
- raw.githubusercontent cache (max-age=300) forsinkede verifikation ~5 min.
- cleanText's space-collapse regel forkorter dd-indentation (`:   `→`: `);
  testen er skrevet whitespace-tolerant i stedet for at kæmpe med reglen.

### Søgninger: 0/12 brugt

### Tal (ærlige)
0 eksterne salg. Budget: 35/1000 kr.

### Blokeringer (uændrede)
- Bitwarden unauthenticated → LS/CWS/AMO/npm nøgler mangler
- Obsidian community plugin PR + CWS upload kræver Mads i browseren

### Næste skridt (iteration 175)
A) Tjek Bitwarden først (`bw status`). Er den åben: kør lemon-setup.js og gå
   efter første rigtige betaling.
B) Flere edge cases at teste permanent: SVG med <text>, MathML, megt lange
   attributter, `<td>` med blok-elementer, dobbelte tabeller side om side.
C) Er Clean Copy stadig uden tegn til eksterne brugere efter endnu en runde:
   prioriter et helt nyt spor hvor distribution ikke kræver Mads' konti.
