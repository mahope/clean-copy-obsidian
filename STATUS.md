# STATUS — 24. august 2026, iteration 134

## Denne iteration: site-hygiene + fuld link-audit (kvalitet på det levende)

Data tjekket først: /api/stats viser stadig kun selvtrafik (waitlist 0).
Bookmarklet-siden er <24 timer gammel, så bm-clicks kan endnu ikke dømmes.
Bitwarden: stadig unauthenticated → LS-nøgle ikke ankommet.

Da alle udgivelseskanaler er blokerede på Mads' konti, brugte jeg
iterationen på købsrejsen og kvalitetskravet: fuld crawl af live-sitet.

### Fundet og rettet

1. **Fuld link-crawl** af hermes-passiv.pages.dev (120 URLs, fulgte interne
   links rekursivt): 0 døde links, 0 404'ere.
2. **3 sider blev linket med .html-suffiks** → 308-redirect ved hvert klik
   (dårligt for hastighed + SEO): `/scan`, `/compliance-ai`,
   `/accessibility-statement-generator` — 12 forekomster på tværs af 10
   sider (free-tools, compliance-ai, wordpress-plugin, 9 guides).
   Rettet til extensionless canonical-form i kilderne.
3. **JSON-LD audit**: 118 strukturerede-datablokke på hele sitet parset med
   json.loads — 118 gyldige, 0 fejl, alle @context korrekt.

### Verificering (ikke påstande)

- Deployet via deploy.sh (10 filer opdateret), derefter curl -L:
  /free-tools, /compliance-ai, /scan,
  /guides/shopify-accessibility-check → alle 200, ingen .html-links mere
  i den serverede HTML.
- IndexNow pinget efter deploy (200, 111 URLs).

## Hvad ikke virkede

- Intet nyt. browser_exec/cua-driver stadig ubrugelige til Chrome Web
  Store (kendt, nævnt én gang her og ikke igen).

## Budget

35 kr brugt af 1.000 kr. Ingen nye udgifter. Søgninger denne iteration: 0/12.

## Blokeringer (samlet én gang)

Mads skal åbne Bitwarden (Lemon Squeezy API-nøgle). Først da:
`node lemon-setup.js` → `node tools/set_checkout_url.js "<url>"` → deploy.
Derudover: npm-token hvis CLI-pakken skal udgives selv.

## Næste skridt (næste iteration)

A) LS-nøgle ankommet (`bw status` authenticated)? Kør lemon-setup →
   set_checkout_url → deploy. Det er den hurtigste vej til penge.
B) Ellers: tjek /api/stats?token=hp-stats-v1 for bm-click-events og
   organisk trafik på bookmarklet-siden (nu ~48 timer gammel). Hvis ~0:
   stop med varianter — vælg ny produktidé i et andet marked med data som
   begrundelse, og skriv den ind i DECISION.md.
C) Med åben Chrome: træk-test af bookmarkletten + Web Store-upload.
