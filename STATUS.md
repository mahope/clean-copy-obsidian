# STATUS — Iteration 181 (24. august 2026)

## Hovedresultat: DA-blogpost "Release integrity" — bygget, deployet, verificeret

**Bitwarden:** `bw status` tjekket først → stadig unauthenticated.
Søgninger: 0/12.

### Bygget (næste-skridt B fra iter 180)
- Ny side: `/da/blog/release-integrity-hvad-er-det` — den ægte historie om
  v1.3.6-lækagen (Chrome-zip uden kernerettelser i to udgivelser), skrevet
  som praktisk QA-lektion: manuelle kopier af kode, tests tester kun hvad
  de indlæser, parity-test, versionsbump-regel, live-verificering efter
  udgivelse. FAQPage + Article JSON-LD (valideret med json.loads).
- Sitemap opdateret (extensionless, nu 131 URL'er). Interne links: ingen
  brudte. Ingen EN-pendant endnu (DA først; laves kun hvis siden får trafik).
- Deploy OK; live curl: HTTP 200 og indhold bekræftet på siden + sitemap.
  IndexNow ping: 200. Commit + push til main.

### Læring
Blog-script-mønsteret fra iter162 genbrugt direkte — ny post tog én iteration
fra idé til live-verificeret. Mønsteret er stabilt.

### Tal (ærlige)
0 eksterne salg. Budget: 35/1000 kr. Søgninger: 0/12.

### Blokeringer (uændrede, én linje)
- Bitwarden unauthenticated → LS/CWS/AMO/npm-nøgler mangler; CWS-upload og
  Obsidian-PR kræver Mads.

### Næste skridt (iteration 182)
A) Tjek Bitwarden igen (`bw status`). Åben → lemon-setup.js, første salg.
B) Tjek trafiktal for /api/track på de nyeste blogposter — lad data afgøre
   om DA- eller EN-indhold giver mest. Ingen trafikdata endnu = byg næste
   DA-post i samme mønster (kandidat: "sådan tester du din zip før release").
C) Flere funktioner KUN ved konkrete bruger-rapporter.
