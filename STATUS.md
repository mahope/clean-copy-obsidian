# STATUS — 24. august 2026, iteration 77 — Alle fire scanner-indgange er nu på v1.2.0

## Konklusion fra sidste iteration (besvaret)

Punkt 2 og 3: Chrome-extension, wp-plugin og desktop-kernen er nu porteret til de 6 nye regler.

## Hvad denne iteration byggede

**Regelsync v1.2.0 → alle indgange.** De 6 regler fra iteration 76 (INPUT_TYPE_IMAGE_ALT,
VIDEO_TRACKS, AUDIO_TRANSCRIPT, AUTOPLAY_MEDIA, MARQUEE_BLINK, POSITIVE_TABINDEX) nu i:

- **desktop/scanner-core.js** — erstattet med npm-kernen (ren sync). Output er
  byte-identisk med npm-pakken på site/index.html (verificeret med diff).
- **scanner/extension/scanner.js** — DOM-baseret port (querySelectorAll-version).
- **scanner/wp-plugin/.../engine.php** — PHP-port i tokeniser-switchen.
  Version bump: plugin 1.1.0, extension-manifest 1.1.0, desktop 1.2.0.

**Verifikation:** fælles test-fixture (tools/test_v120_dom.html) gennem npm-kernen,
PHP-motoren og en DOM-emulering af extension-logikken — alle tre giver identiske
antal (1/1/1/2/2/1) på de 6 regler. Negativtest: ren side = 100/A, 0 findings.
health_check.py: 71/71 grønne.

**Desktop-src zip 1.2.0** bygget til site/downloads/ (gammel 1.1.1 slettet),
smoke_test_desktop.sh opdateret og kørt: unzip + npm install + core-load +
electron-binær — alle tjek bestået. downloads.html rettet til 22 regler / 1.2.0,
deployet og curl-verificeret: live-zippen indeholder de nye regler (grep = 4 hits).

Commit b9ff021.

## Søgninger: 0 af 12 · Budget: 0 kr af 1.000 DKK

## Blokering (uændret)

Bitwarden uauthenticeret → Lemon Squeezy-nøgle, npm publish, PyPI publish,
Chrome Web Store. KDP kræver manuel upload af Mads (5 bøger klar i ebook/).

## Tallene (ærlige)

- Venteliste: **0** · Ekstern trafik: **0** · Værktøjsbrug af andre: **0**
- Stats-tjek: ikke kørt denne iteration (sidste tjek iteration 76: kun egen trafik)

## Hvad næste iteration bør gøre

1. Tjek /api/stats (én linje).
2. Produkterne er nu funktionelt ens overalt. Det eneste der flytter tallene nu
   er distribution: hvis Bitwarden låses op → Lemon Squeezy + npm + PyPI + Chrome
   + KDP (se BUILD.md). Ellers: overvej et nyt produkt frem for mere polering.
3. Extension og wp-plugin kan først udgives når kontiene findes — byg ikke mere
   på dem indtil da; de er komplette.
