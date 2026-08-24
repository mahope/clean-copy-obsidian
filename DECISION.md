# DECISION — Iteration 109: Pivot til Chrome Extension + Lemon Squeezy Integration

**Dato:** 2026-08-24
**Beslutning:** Compliance-produktsuiten er parkeret (bygget færdig, 0 eksterne brugere over 107 iterationer). Nyt spor: Chrome-udvidelse "Clean Copy" med distribution via Chrome Web Store. Lemon Squeezy-integration bygget og klar til når API-nøgle ankommer. KDP e-bøger stadig klar til Mads' konto.

## Hvorfor pivot

| Faktor | Compliance | Clean Copy (Chrome Extension) |
|--------|-----------|------|
| Afhængighed af Mads | KDP-konto, Bitwarden, Stripe | $5 dev fee (under 150 kr — selvbetalt) |
| Distribution | Ingen (alle kanaler mættede) | Chrome Web Store organisk søgning |
| Byggetid | 107 iterationer | 1 iteration |
| Målgruppe | Compliance-ansvarlige i bureauer | ALLE der kopierer tekst fra nettet |
| Indtægt hvis 0 salg | Spildt tid | Minimalt spild ($5 + 1 iteration) |

## Hvad bygges

### Primært — Clean Copy Chrome Extension
- **Produkt:** Chrome-udvidelse der kopierer markeret tekst som ren tekst eller Markdown
- **Målgruppe:** Udviklere, skribenter, forskere, studerende — alle der arbejder med tekst
- **Distribution:** Chrome Web Store organisk søgning
- **Pris:** Gratis (Free) med Pro-opgradering $19/år når Lemon Squeezy er klar
- **Dev fee:** $5 (≈35 kr) — under 150 kr, selvbetalt pr. budgetregler
- **Sprog:** Engelsk (globalt marked)

### Sekundært — Lemon Squeezy Integration (klar til API-nøgle)
- `lemon-setup.js` — Opretter 7 produkter (5 e-bøger + ComplianceDocs bundle + Scanner Pro) med priser og checkout-links
- Kør med `LS_API_KEY=sk_... node lemon-setup.js` når nøglen er tilgængelig
- Alle produkter: $9.99 (e-bøger), $29.99 (bundle), $29/yr (Scanner Pro)

### Tertiært (venter på Mads) — KDP e-bøger
- 5 e-bøger fuldt skrevet, EPUB + covers + metadata klar
- Upload-kit i `kdp-upload-kit.md`
- Mads skal oprette KDP-konto (~15 min)

## Hvem betaler, hvor meget, hvor ofte

| Produkt | Køber | Pris | Frekvens |
|---------|-------|------|----------|
| Clean Copy (Free) | Alle | $0 | — |
| Clean Copy Pro ($19/yr) | Power users | $19/år | Årligt |
| E-bøger (KDP) | Webbureauer | $9.99 | Engang |
| ComplianceDocs (LS) | Webbureauer | $29.99 | Engang |
| Scanner Pro (LS) | Webbureauer | $29/år | Årligt |

## Hvad kræver Mads

1. **Chrome Web Store dev fee ($5):** Jeg betaler. Ingen Mads-indsats.
2. **Lemon Squeezy API-nøgle:** Ligger i Bitwarden (forventet 24. august). Når den er tilgængelig, kører jeg `lemon-setup.js` og produkterne er live.
3. **KDP-konto:** Opret på kdp.amazon.com (15 min). Upload 5 e-bøger når kontoen er klar.

## Budget

| Post | Beløb | Status |
|------|-------|--------|
| Chrome Web Store dev fee | $5 (≈35 kr) | ✅ Godkendt (under 150 kr) |
| I alt brugt | 35 kr af 1.000 DKK | — |

## Hvad kan slå det ihjel

1. **Chrome Web Store afviser udvidelsen** (lav risiko — simpel funktionalitet, ingen kontroversielle permissions)
2. **Ingen installerer den** (middel risiko — 0 brugere er samme problem som compliance). Hvis < 10 downloads efter 30 dage, skift til næste idé.
3. **Konkurrenter med samme funktion** (middel — "Copy as Markdown" findes, men Clean Copy er enklere og renere)
4. **Lemon Squeezy-nøgle kommer aldrig** (så er Pro-indtægten blokeret, men Free-versionen bygger stadig brugere)

## Næste skridt

1. ✅ Clean Copy extension bygget + testet
2. ✅ Clean Copy landing page → site/clean-copy.html (live)
3. ✅ OG preview image → site/clean-copy/og-preview.png
4. ✅ Sitemap updated med clean-copy entry
5. ✅ Lemon Squeezy integration bygget + dry-run testet
6. ⬜ Chrome Web Store $5 dev fee + upload (blokeret: cua-driver virker ikke, browser_exec kan ikke starte Chrome)
7. ⬜ Når LS-nøgle kommer: kør `node lemon-setup.js` → produkter live
8. ⬜ Når Mads åbner KDP: upload 5 e-bøger

## Faktisk blokering

Jeg kan ikke uploade til Chrome Web Store selv. cua-driver har macOS permissions-problemer, og browser_exec kan ikke starte headless Chrome. Mads skal enten:
- Åbne Chrome og gå til chrome.google.com/webstore/devconsole
- Eller give mig en anden måde at få adgang

ZIP'en ligger klar: `clean-copy.zip` i repoets rod.