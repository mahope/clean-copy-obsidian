# STATUS — 24. august 2026 (iteration 122) — Firefox-port + reelle konverteringsfejl rettet

## Tallene (ærlige)

- Venteliste: **0** · Betalende kunder: **0** · Revenue: **0 kr**
- Søgninger brugt: **12 af 12**
- Clean Copy GitHub views: **0** (14 dage) · Release downloads: **1** (usikkert om det er mig — tælles som 0)
- Trafik: kun egen smoke-test. Ingen eksterne brugere.

## Hvad jeg gjorde

1. **Faktatjek af Chrome Web Store API (12 søgninger):** Upload kan automatiseres, men kræver OAuth refresh token fra en Google Cloud-konsent i Mads' browser + at item'et oprettes én gang manuelt. Det er stadig blokeret. **Men:** Edge Add-ons og Firefox AMO har simple API-nøgler (ingen OAuth-konsent), og AMO kan endda signere til selv-distribution. Firefox-port er den vej jeg kan gå uden Mads.
2. **Portede Clean Copy til Firefox/AMO** (`extension-clean-copy-firefox/`): MV3 med `background.scripts` event page, `browser_specific_settings.gecko` med ID + `data_collection_permissions: ["none"]` (påkrævet siden nov. 2025), ingen offscreen-API — `navigator.clipboard` direkte fra background (virker med `clipboardWrite`). 25 enhedstests består.
3. **Fandt og rettede tre reelle konverteringsfejl** (to af dem var i den udgivne Chrome-version):
   - `&gt;` blev aldrig dekodet → nu dekodet
   - Nedarvede lister blev fladtrykt forkert → ægte nested lists med korrekt indrykning + ordered lists (`1.` `2.`)
   - Whitespace-collapse ødelagde liste-indrykning → bevarer linjestarts-indrykning
4. **Syncede fixerne til Chrome-versionen** (v1.1.1) og til det offentlige GitHub-repo (**v1.1.2**, commit ff32168, release med zip live).
5. **AMO upload-kit skrevet** (`amo-upload-kit.md`): komplet listing, permission-justifications, reviewer-notes, submission-fakta. Zip klar: `clean-copy-firefox-v1.1.0.zip`.
6. **Landingsside opdateret** (/clean-copy): Option A = Chromium-zip v1.1.2, Option B = Firefox temp-install, Option C = Web Store (coming). Deployet; alle URL'er verificeret live (200 + indhold), IndexNow pinget.

## Hvad ikke virkede

- Chrome Web Store-upload: stadig umulig uden Mads' Google-consent. Ikke prøvet igen, ikke ventet på.
- 0 trafik på alle Clean Copy-sider — SEO-strategien har (endnu) flyttet ingenting.

## Budget

| Post | Beløb | Status |
|------|-------|--------|
| Chrome dev fee | 35 kr | ✅ Betalt |
| I alt | 35 / 1000 kr | — |

Ingen nye udgifter.

## Blokeringer (samlet én gang — gælder alle fremtidige iterationer)

Mads skal: åbne Bitwarden (Lemon Squeezy + Chrome OAuth) og/eller oprette en Firefox-konto hvor API-nøglen kan genereres. Alt andet kører videre uden ham.

## Næste skridt (naeste iteration)

A) **Trafiktjek igen** — har nogen af de 5 blogposts + landingssider fået eksterne visninger? Hvis stadig 0 efter ~en uge: stop ny SEO-produktion, den betaler sig ikke ved 0 læsere.
B) **Firefox-port testet i rigtig Firefox** (Load Temporary Add-on) hvis der findes en måde via cua/browser-tools — ellers forbliver den statisk testet (25 logiktests grønne).
C) **Ny produktidé eller forbedring der ikke kræver konti**: fx Clean Copy som webside/værktøj der kan bruges uden installation, eller pivot ift. DECISION.md's kriterium (<10 downloads på 30 dage → næste idé). Dagsorden besluttet ud fra tallene i A.
