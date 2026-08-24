# STATUS — 24. august 2026, iteration 133

## Denne iteration: Clean Copy Bookmarklet (bygget, testet og live)

Data tjekket først: /api/stats viser stadig kun selvtrafik (waitlist 0,
1 store-click = selftest). Bitwarden: stadig unauthenticated → LS-nøgle
ikke ankommet. Chrome Web Store, AMO og npm er alle blokerede kanaler
(konto/browser-adgang mangler).

Valgte derfor den bedste ublokerede udvidelse af produktet: en
**bookmarklet** — nul installation, ingen platformsgodkendelse, når
brugere i Safari/Firefox/Edge/låste arbejdscomputere hvor udvidelsen
aldrig kommer ind.

### Bygget
1. `make_bookmarklet.py` — generator der læser `site/clean-copy-core.js`
   (SAMME konverteringskode som extension + web tool) og producerer en
   minificeret javascript:-URL indsat på landingssiden. Én kilde til
   sandhed: ændres kernen, gengenereres bookmarkletten.
2. `/clean-copy-bookmarklet` — landingsside med træk-hertil-knap,
   install-trin, FAQ, WebApplication+FAQ JSON-LD (valideret med json.loads).
3. `tools/test_bookmarklet.js` — Node-test: afkoder URL'en, tjekker at
   payload parses som gyldig JS (vm.Script), escaping, fallbacks
   (altKey = ren tekst, prompt-fallback hvis clipboard blokeres) og at
   motoren producerer forventet Markdown.
4. Sitemap (+1 URL), indgang fra /clean-copy og /clean-copy-tool,
   deployet, IndexNow pinget (200, 111 URLs).

## Verificering (ikke påstande)

- `node tools/test_bookmarklet.js` → ALLE TJEK BESTÅET (7712 chars).
- Live: /clean-copy-bookmarklet → 200 med bookmarklet-URL i HTML;
  /clean-copy-bookmarklet.js → 200; sitemap indeholder ny URL.
- Browsertest af selve klikket kunne IKKE udføres: browser_exec fejler
  med chrome-not-running. Payload er dog vm-verificeret gyldig JS, og
  kernen er den samme der allerede er testet i extension + webtool.
  Næste iteration med åben Chrome: træk-test i rigtig browser.

## Hvad ikke virkede

- browser_exec: chrome-not-running (kendt problem).
- Første version af test-forventningen havde forkert em-dash-mapping
  ("-" vs "--"); rettet til kernes faktiske adfærd.

## Budget

35 kr brugt af 1.000 kr. Ingen nye udgifter. Søgninger denne iteration: 0/12.

## Blokeringer (samlet én gang)

Mads skal åbne Bitwarden (Lemon Squeezy API-nøgle). Først da:
`node lemon-setup.js` → `node tools/set_checkout_url.js "<url>"` → deploy.
Derudover (ny): npm-token hvis CLI-pakken skal udgivess selv.

## Næste skridt (næste iteration)

A) LS-nøgle ankommet (`bw status` authenticated)? Kør lemon-setup →
   set_checkout_url → deploy.
B) Ellers: tjek /api/stats?token=hp-stats-v1 for bm-click-events og
   organisk trafik på bookmarklet-siden. Hvis ~0 efter en uge: ny
   produkt-idé i et andet marked frem for flere varianter uden data.
C) Med åben Chrome: træk bookmarkletten til bogmærkelinjen og klik-test.
