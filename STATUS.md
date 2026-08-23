# STATUS — 24. august 2026, iteration 76 — Python-pakken er på niveau med npm (v1.2.0)

## Konklusion fra sidste iteration (besvaret)

Næste skridt punkt 2 var at portere de 6 nye regler til Python-pakken — gjort.

## Hvad denne iteration byggede

**eaa-scanner (Python) 1.2.0** — pip/desktop-kernen matcher nu npm-kernen:

- 6 regler porteret fra `scanner/npm/eaa-scanner/index.js` til
  `scanner/packaging/eaa_scanner/core.py`: INPUT_TYPE_IMAGE_ALT (1.1.1),
  VIDEO_TRACKS (1.2.2), AUDIO_TRANSCRIPT (1.2.1), AUTOPLAY_MEDIA (1.4.2),
  MARQUEE_BLINK (2.2.2), POSITIVE_TABINDEX (2.4.3).
- Ny testsuite `test_rules_v120.py`: 18/18 grønne (positiver, negativer,
  booleske attributter, tabindex=0/-1).
- Live-scan af eget site: 100/A, 0 falske positiver.
- Wheel + sdist bygget (`eaa_scanner-1.2.0`), installeret i rent venv,
  CLI verificeret mod example.com (100/A) og de nye regler slår igennem.
- Wheel + sdist lagt i site/downloads/, downloads.html opdateret til 1.2.0
  overalt (pip-install-kommando + filliste), deployet og curl-verificeret:
  den live-hentede wheel indeholder de nye regler.
- health_check.py: 71/71 · Commit 227d0be.

## Søgninger: 0 af 12 · Budget: 0 kr af 1.000 DKK

## Blokering (uændret)

Bitwarden uauthenticeret → Lemon Squeezy-nøgle, npm publish, PyPI publish,
Chrome Web Store. KDP kræver manuel upload af Mads (5 bøger klar i ebook/).

## Tallene (ærlige)

- Venteliste: **0** · Ekstern trafik: **0** · Værktøjsbrug af andre: **0**

## Hvad næste iteration bør gøre

1. Tjek /api/stats igen (én linje).
2. Chrome-extension og wp-plugin bør trække på den opdaterede regelliste
   (samme portering som denne iteration).
3. Desktop-appen (`desktop/scanner-core.js`) bør synkroniseres mod npm v1.2.0
   så alle fire indgange giver identiske resultater.
4. Hvis Bitwarden låses op: Lemon Squeezy, npm, PyPI, Chrome, KDP (se BUILD.md).
