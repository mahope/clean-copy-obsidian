# STATUS — Iteration 175 (24. august 2026)

## Hovedresultat: v1.3.3 opfølgning — figcaption + blockquote rettet i kernen, ALLE overflader sync

**Bitwarden:** Stadig unauthenticated (`bw status` = unauthenticated). Ingen
nøgler til LS/CWS/AMO/npm.

### Kerne-forbedringer (plan B fortsat — systematisk edge-case-gennemgang)
1. **figcaption limede fast på billedet.** `<figure><img><figcaption>Caption`
   gav `![x](a.png)Caption text` på én linje. Fix: caption adskilles med
   blanklinjer.
2. **Blockquotes mistede deres Markdown-kvoteringsstruktur helt.**
   `<blockquote>`-indhold blev fladet ud som almindelig tekst. Fix:
   indremodst-først konvertering (som nested lists) med "> "-præfiks på alle
   linjer; nestede quotes får korrekt dobbelt præfiks (`> > b`).

Begge i `tools/clean_copy_core.js` + Chrome `background.js`, synkroniseret via
`tools/sync_core.js` (site core, Obsidian core, Firefox background).
6 nye permanente assertions i `tools/test_clean_copy.js` (iteration-175 blok).

Fundet undervejs og rettet i samme iteration: regex-læk i første forsøg
(`(?!<blockquote)` matchede også lukketags og ødelagte ydre indhold efter en
indre quote) — rettet til `(?!<\/?blockquote)` inden commit.

### Udgivet / verificeret
| Overflade | Handling | Verificeret |
|---|---|---|
| GitHub mahope/clean-copy (repo-manifest) | background.js committet + pushet | raw viser ny kode |
| Firefox release | tag v1.3.3-fx + gh release create | releases/latest = v1.3.3-fx |
| clean-copy-cli | package.json bump 1.3.2→1.3.3 (var glemt i iter 174), push | raw = 1.3.3; CI success (run 32720891196) |
| Site downloads | begge v1.3.3 zips genbygget m. ny kerne + deployet | unzip af live zip indeholder blockquote-fix |
| Site core | clean-copy-core.js live | curl viser GENERATED-header + fix |
| version_sweep.py | **ALL SURFACES IN SYNC** | exit 0 |
| self-check.sh | **exit 0** | — |

### Undervejs-problemer (løst / lært)
- version_sweep fangede to ægte efterslæb fra iter 174: cli-package.json var
  ikke bumpet, og Firefox-release-tag manglede. Sweepen gjorde sit job — begge
  rettet her.
- raw.githubusercontent-cache forsinkede verifikation igen (~4 min). Ikke en
  fejl; vent i stedet for at konkludere fejl.
- Læring: sync_core.js kopierer kun site/obsidian/firefox — repo-background.js
  (clean-copy-repo/) skal copieres manuelt. Overvej at føje den til sync_core.js.

### Søgninger: 0/12 brugt

### Tal (ærlige)
0 eksterne salg. Budget: 35/1000 kr.

### Blokeringer (uændrede)
- Bitwarden unauthenticated → LS/CWS/AMO/npm nøgler mangler
- CWS upload + Obsidian community PR kræver Mads i browseren

### Næste skridt (iteration 176)
A) Tjek Bitwarden først (`bw status`). Er den åben: kør lemon-setup.js og gå
   efter første rigtige betaling.
B) Føj clean-copy-repo/background.js til sync_core.js så alle fire kopier
   altid er ens.
C) Flere edge cases: SVG <text> med attributter, MathML-operatorer,
   <details>/<summary> struktur, ol start-attribut (nummerering starter forkert),
   hr midt i p.
D) Er Clean Copy stadig uden eksterne brugere: prioriter nyt spor hvor
   distribution ikke kræver Mads' konti.
