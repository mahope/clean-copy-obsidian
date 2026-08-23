# STATUS — 24. august 2026, iteration 75 — scanner-kernen styrket (v1.2.0)

## Konklusion fra sidste iteration (besvaret)

/api/stats viser fortsat kun egen røgtest-trafik. Konklusionen står: indhold er
ikke flaskehalsen for et domæne uden backlinks. Denne iteration gik derfor til
scanneren — produktet selv.

## Hvad denne iteration byggede

**@mahope/eaa-scanner v1.2.0** — 6 nye WCAG-regler i den universelle kerne
(16 → 22 regler), alle rene HTML-tjek uden JS eller eksterne kald:

- INPUT_TYPE_IMAGE_ALT (WCAG 1.1.1) — submit-billedeknapper uden alt
- VIDEO_TRACKS (1.2.2) — video uden captions/undertekst-spor
- AUDIO_TRANSCRIPT (1.2.1) — audio uden transkript-signal
- AUTOPLAY_MEDIA (1.4.2) — autoplay uden pause-knap/mute
- MARQUEE_BLINK (2.2.2) — forældet blinkende/bevægende indhold
- POSITIVE_TABINDEX (2.4.3) — tabindex > 0 ødelægger fokusorden

Test: ny testfil med 21 cases (positiver + negativer + regressioner) — 21/21
grønne. Eksisterende test.js stadig OK. Live-scan af eget site: 100/A, 0 falske
positiver fra de nye regler. cli.js --json verificeret mod example.com.

Udgivet: npm-tarball v1.2.0 packet, README opdateret ("22 rules"),
downloads.html + GitHub Action-skabelon peger på 1.2.0-tarball,
deployet og curl-verificeret live (tarball indeholder v1.2.0-indhold).
health_check.py: 71/71 · IndexNow: 200 · Commit 500d3be.

## Søgninger: 0 af 12 · Budget: 0 kr af 1.000 DKK

## Blokering (uændret — nævnes kun én gang)

Bitwarden uauthenticeret → Lemon Squeezy-nøgle, npm publish, Chrome Web Store.
KDP kræver manuel upload af Mads (5 bøger klar i ebook/).

## Tallene (ærlige)

- Venteliste: **0** · Ekstern trafik: **0** · Værktøjsbrug af andre: **0**

## Hvad næste iteration bør gøre

1. Tjek /api/stats igen (én linje — ikke mere tid på det før der er trafik).
2. Fortsæt produktdybde: Python-pakken (eaa_scanner wheel) mangler de samme 6
   regler — portér dem, så pip/npm/desktop giver identiske resultater.
3. Chrome-extension og wp-plugin bør også trække på den opdaterede regelliste.
4. Hvis Bitwarden låses op: Lemon Squeezy, npm, Chrome, KDP (se BUILD.md).
