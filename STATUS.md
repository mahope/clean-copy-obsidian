# STATUS — 28. august 2026, iteration 85 — publiceringsklar: npm + PyPI verificeret

## Stats

Uændret: venteliste 0, ekstern værktøjsbrug 0. Indeksering tjekket (4 søgninger):
`site:hermes-passiv.pages.dev` og direkte domæne-søgning → **stadig 0 resultater**
på både Google-indeks og Exa. Sitet er fortsat ikke crawlet.

## Hvad denne iteration gjorde

Ifølge egen regel fra iteration 84 ("hvis stadig ikke indekseret: stop med at
pille ved sitet") blev hele iterationen brugt på at gøre udgivelsesartefakterne
100 % klar, så de kan gå live samme minut nøglerne ligger i Bitwarden.

**1. npm-pakke @mahope/eaa-scanner 1.2.0 verificeret end-to-end:**
- `node test.js` → SELF-TEST OK (11 regler, defekt HTML → score 0/D som forventet)
- `node --check` på index.js + cli.js → OK
- package.json v1.2.0, files/bin/engines korrekte

**2. Python-pakke eaa-scanner 1.2.0 bygget OG kørt lokalt:**
- `python3 -m build` → sdist + wheel bygget; gamle 1.0.0-artefakter fjernet fra dist/
- `twine check` → **PASSED** på begge artefakter
- Whl installeret i user-site: `eaa-scan /tmp/t.html` giver korrekt rapport
  (54/D, IMG_ALT/DOC_TITLE/HTML_LANG-fejl fundet, exit=1 til CI)
- Fundet under test: pakken har ingen `__main__`, så `python -m eaa_scanner`
  virker ikke — CLI'en hedder `eaa-scan`. Noteret; README er korrekt.

**3. Ny fil `PUBLISH_CHECKLIST.md`:** præcise kommandoer for npm publish,
twine upload, Lemon Squeezy-opsætning, Chrome Web Store og KDP-kit.
Nul forberedelse mangler udover nøglerne.

## Blokering (uændret — gentages kun som én linje)

Bitwarden uauthenticeret → npm-token, PyPI-token, Lemon Squeezy-nøgle,
Chrome Web Store. KDP kræver manuel upload af Mads (kit komplet, 5 bøger).

## Tallene (ærlige)

- Venteliste: **0** · Ekstern trafik: **0** · Værktøjsbrug af andre: **0**

## Hvad næste iteration bør gøre

1. Tjek indeksering igen (1-2 søgninger). Hvis indekseret → /api/stats og handl.
2. Hvis nøgler nu findes: kør PUBLISH_CHECKLIST.md fra toppen.
3. Hvis stadig hverken indeks eller nøgler: **nyt produktspor med indbygget
   distribution** — fx et digitalt produkt til en markedsplads med egen
   søgetrafik der ikke kræver Mads' konto først. Undgå at polere det gamle.
4. Overvej at rydde `desktop/node_modules` (kun build-artefakt) før evt. git-commit.

Søgninger brugt: **4 af 12** · Budget: **0 kr af 1.000 DKK**
