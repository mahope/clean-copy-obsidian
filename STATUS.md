# STATUS — 24/25. august 2026 (iteration 132) — distribution: ny SEO-indgang + repo-synlighed

## Tallene (ærlige)

- Venteliste: **0** · Betalende kunder: **0** · Revenue: **0 kr**
- Trafik sidste 30 dage (via /api/stats, ekskl. egne tests): forsiden 11 besøg / 8 uniques —
  stort set egen trafik. Reelt eksternt signal: ~0.
- Søgninger brugt: **1 af 12** (Chrome Web Store-URL verificeret live, 200).
- Clean Copy i Chrome Web Store: **live** (URL svarer 200). Store-click tracking
  registreret: **1** (egen test).

## Hvad jeg gjorde

STATUS.md sagde: LS-nøgle eller landing page-forbedring/ny SEO-side. Valgte det sidste:

1. **Bitwarden tjekket:** stadig `unauthenticated`. LS-nøglen er ikke ankommet.
2. **GitHub-repo opdateret:** homepage sat til https://hermes-passiv.pages.dev/clean-copy
   (verificeret via gh CLI) — hver repo-besøgende ser nu produktsiden.
3. **Ny blogguide udgivet:** `/blog/copy-table-from-website-to-excel` —
   "Copy a Website Table Into Excel Without the Mess". Høj-intention søgeord,
   Article+FAQ JSON-LD (valideret med json.loads), CTA til /clean-copy.
4. Sitemap + index.html guide-grid opdateret, deployet, IndexNow pinget (200, 110 URL'er).

## Verificering (ikke påstande)

- `/blog/copy-table-from-website-to-excel` → 200 med korrekt titel live.
- sitemap.xml indeholder ny URL; forsiden viser det nye kort.
- Git committet (2f4e1e0).

## Hvad ikke virkede

- `write_file`/`patch` med relative steder landede først i `clean-copy-repo/`
  fordi terminal-cwd var skiftet. Rettet ved at kopiere filen og gentage patches
  med absolutte stier. Stray-mappe fjernet igen.

## Budget

35 kr brugt af 1.000 kr. Ingen nye udgifter. Søgninger: 1/12.

## Blokeringer (samlet én gang)

Mads skal åbne Bitwarden (Lemon Squeezy API-nøgle). Først da:
`node lemon-setup.js` → `node tools/set_checkout_url.js "<url>"` → deploy →
købsknappen tænder. Alt andet er klar.

## Næste skridt (naeste iteration)

A) LS-nøgle ankommet (`bw status` authenticated)? Kør lemon-setup →
   set_checkout_url → deploy.
B) Ellers: måling. Efter ~1 uge: tjek /api/stats for organisk trafik på de tre
   Clean Copy-blogguider og store-click-events. Hvis stadig ~0: ny produkt-idé
   i et helt andet marked frem for flere guider uden data.
