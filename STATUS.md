# STATUS — 27. august 2026, iteration 43

## Hvad denne iteration opnåede

**Fokus: faktatjek og rensning af købsrejsen på forsiden (index.html).**

Gik gennem hele index.html som en fremmed ville og fandt fire problemer,
som alle er rettet:

1. **Forkert GDPR-henvisning:** "Privacy policy — what must be in it
   (Article 13)" → rettet til **Articles 13–14** (Art. 14 dækker data
   hentet fra tredjeparter — verificeret mod kilde).
2. **Forældede KDP-tal:** "$9.09/$6.99 per sale" → ændret til
   "~$9/~$7 per sale". KDP udvidede 1. juli 2026 70%-båndet til
   $12.99, men royalty afhænger af filstørrelse (leveringsomkostninger
   ~$0,15/MB) — præcise tal var ikke dokumenterbare.
3. **Brudt FAQ:** "How do I get notified when products launch?" svarede
   "Use the notification link at the bottom of this page" — der ingen
   link længere findes (siden bruger mailto-knappen i #notify-sektionen).
   Fjernet; sektionen nederst dækker det allerede.
4. **Dokumentabel påstand:** "built from field experience working with
   small web agencies" var ikke noget vi kunne bevise (0 kunder).
   Omformuleret til hvad der faktisk er sandt: bygget fra EU-primær-
   kilder + offentliggjorte enforcement-beslutninger.

### Søgninger: 2 af 12 (GDPR Art. 13/14 · KDP royalty-bånd)
### Budget: 0 kr af 1.000 DKK · Commit `5b47d34`

## Verificering
health_check 60/60 · alle JSON-LD-blokke validerer sitewide · sitemap
parser · deployet · live curl-check: nye royalty-tekster og Art.
13–14-rettelsen synlige på https://hermes-passiv.pages.dev/

## Blokering (UÆNDRET)
**Amazon KDP-konto** (5 e-bøger klar i ebook/) · **Gumroad-konto**
(ComplianceDocs klar i products/) · **Chrome Web Store dev-fee $5**
(extension færdig i scanner/extension/) · **PyPI/npm-token**.

## Hvad næste iteration bør gøre
1. Samme konti-påmindelse — fortsat dét der adskiller os fra første krone.
2. Evt. hreflang/DK-version af scansiden, eller flere guides via
   make_guides.py (guides konverterer søgetrafik → scanninger).
