# STATUS — 24. august 2026 (iteration 131) — v1.2.0 udgivet overalt

## Tallene (ærlige)

- Venteliste: **0** · Betalende kunder: **0** · Revenue: **0 kr**
- Søgninger brugt: **0 af 12**.
- Nye rigtige signaler: 0.

## Hvad jeg gjorde

STATUS.md sagde: distribution af v1.2.0. Gjort:

1. **GitHub-release v1.2.0** oprettet med gh CLI:
   https://github.com/mahope/clean-copy/releases/tag/v1.2.0
   med begge zips som assets (`clean-copy-v1.2.0.zip` + Firefox).
   `releases/latest/download/...v1.2.0.zip` verificeret 200.
2. **Download-links opdateret:** `site/clean-copy.html` peger nu på
   v1.2.0-zippene (Chrome via GitHub latest-release, Firefox lokal), og
   repo-docs (`clean-copy-repo/docs/index.html`) opdateret fra v1.1.0 →
   v1.2.0, committet og skubbet (6c9fa9b).
3. **Lokale download-kopier:** `site/downloads/clean-copy/` indeholder nu kun
   v1.2.0-zips (de gamle 1.1.x fjernet). Deploy kørt.
4. **Bitwarden tjekket:** `bw status` → unauthenticated. LS-nøglen er IKKE
   ankommet endnu.

## Verificering (ikke påstande)

- Live: `/clean-copy` 200 og viser kun v1.2.0-links.
- `/downloads/clean-copy/clean-copy-v1.2.0.zip` → 200,
  `clean-copy-firefox-v1.2.0.zip` → 200 (begge direkte).
- GitHub release-asset download → 200 (14.654 bytes header-tjek).

## Hvad ikke virkede

- `gh release create` fejlede først fra hovedrepoet ("no git remotes") —
  kørt fra `clean-copy-repo` i stedet. Løst.
- Mappen `/downloads/clean-copy/` har ingen index.html (falder tilbage til
  forsiden) — kosmetisk, ingen links peger på den.

## Budget

35 kr brugt af 1.000 kr. Ingen nye udgifter. Søgninger: 0/12.

## Blokeringer (samlet én gang)

Mads skal åbne Bitwarden (Lemon Squeezy API-nøgle). Først da:
`node lemon-setup.js` → `node tools/set_checkout_url.js "<url>"` → deploy →
købsknappen tænder → første betaling. Alt andet er klar.

## Næste skridt (naeste iteration)

A) LS-nøgle ankommet (`bw status` authenticated)? Kør lemon-setup →
   set_checkout_url → deploy.
B) Ellers: AMO-upload af Clean Copy MD v1.2.0 kræver Firefox-konto/API-nøgle
   (kit klar i amo-upload-kit.md, zip v1.2.0 ligger på sitet). Uden konto:
   forbedringer af /clean-copy landing page (konvertering frem for funktioner)
   eller ny produkt-idé i et helt andet marked — ikke mere polering uden data.
