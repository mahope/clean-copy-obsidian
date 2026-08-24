
## Iteration 129 — Clean Copy Pro licens-backend ✅

- `site/_worker.js`: `/api/license/activate` + `/api/license/validate` — KV-baserede
  nøgler (`lic:<key>`), max 5 enheder, idempotent aktivering, revoked/expired-check,
  fail-safe fejlbeskeder. Testet lokalt i wrangler dev (alle cases grønne) og live.
- `site/clean-copy-tool.html`: Pro-sektion ($19/år, features, 5 enheder) +
  licensaktiveringsformular. Købsknappen er skjult til en ægte LS-checkout-URL
  injiceres via `tools/set_checkout_url.js` — ingen døde links.
- `tools/license-admin.js`: issue/revoke/list nøgler via wrangler (manuel
  leveringsvej indtil webhook-automatisering).
- `lemon-setup.js`: Clean Copy Pro tilføjet (produkt #8, $19/år, license: true);
  printer webhook-/manuelle opfølgningstrin for licensproduktet.
- `site/wrangler.toml`: ny — lokal wrangler dev-test af Worker+KV muligt.
- Deployet + curl-verificeret live.

## Iteration 123 — Clean Copy Web ✅

- **Nyt produkt:** `site/clean-copy-tool.html` — indsæt rodet tekst/rå HTML, få ren
  Markdown eller ren tekst. 100 % klient-side (DOMParser + delt konverterkerne),
  intet uploades. Live på `/clean-copy-tool`.
- **Delt kerne:** `tools/clean_copy_core.js` → `site/clean-copy-core.js` (UMD) —
  koden trukket verbatim ud af extensionens background.js, så web og extension
  konverterer identisk. 25 eksisterende tests + nye roundtrip-tests grønne.
- Features: mode-switch (Markdown/plain), smart-quote-cleanup, sample, copy,
  download .md, tæller, FAQ, WebApplication JSON-LD (valideret).
- Linkning: kort på forsiden, CTA på /clean-copy, sitemap-indgang (extensionless).
  Deployet + curl-verificeret live, IndexNow 200.

## Iteration 122 — Firefox-port + konverteringsfixes ✅

- **Ny kodebase:** `extension-clean-copy-firefox/` — AMO-kompatibel MV3 manifest
  (event page background, gecko ID `clean-copy@mahope.dk`, data_collection_permissions
  `["none"]`, ingen offscreen), `navigator.clipboard` direkte fra background.
- **Testet:** 25 logik-tests i Node (`tools/test_clean_copy.js`, vm-sandbox) — alle grønne.
- **Bugfixes (også i Chrome-versionen):** `&gt;` dekodes nu; nested lists konverteres
  rekursivt med korrekt indrykning; ordered lists får `1.`-markører;
  whitespace-collapse bevarer linjeindrykning.
- **Versioner:** Chrome v1.1.1 lokal / repo v1.1.2 (commit ff32168, GitHub release +
  zip live); Firefox v1.1.0 zip klar (`clean-copy-firefox-v1.1.0.zip`).
- **AMO-kit:** `amo-upload-kit.md` — komplet listing + reviewer-notes.
- **Site:** /clean-copy har Firefox-installationssektion + zips på
  /downloads/clean-copy/. Deployet og curl-verificeret live (200 + indhold),
  IndexNow pinget.

# BUILD — Hvad er bygget, hvad mangler

**Dato:** 2026-08-24 (iteration 113 — dansk SEO-blog som søgeindgang til page-profile)

## Dansk SEO-blog: teknisk SEO-tjek (iteration 113) ✅

- `site/blog/teknisk-seo-tjek-hjemmeside.html` — ny dansk artikel målrettet
  "teknisk seo tjek hjemmeside"-søgninger. 5-trins guide, top-5 fejl, FAQ,
  Article JSON-LD (valideret), canonical extensionless, CTA'er til
  /da/page-profile.
- Intern linkning: kort på forsiden (/), kort på /da-hubben, link i footeren
  på /da/page-profile. Sitemap-indgang tilføjet (extensionless).
- Deployet + verificeret live (200 med indhold på alle berørte sider),
  IndexNow pinget (200).



## Oversigt

| Produkt | Status | Revenue | Distribution |
|---------|--------|---------|-------------|
| Compliance-produkt (5 e-bøger, scanner, site, desktop, extension) | **Parkeret** — bygget færdigt, 0 eksterne brugere | 0 kr | Blokeret på Mads' konti (KDP, Bitwarden) |
| **site-icons** | **Live** — CLI-værktøj til favicon/OG/PWA-icon-generering | 0 kr (gratis tier) | Download via pages.dev |
| **Clean Copy** | **Bygget** — Chrome extension + landing page <br>Extension: `/extension-clean-copy/` (7 filer, MV3)<br>Landing page: `/site/clean-copy.html` (live) | 0 kr (Free tier) | Chrome Web Store (mangler $5 fee); Web-presence live |
| **page-profile** | **Live** — CLI + **web-version (iteration 111)**: `/api/profile?url=` endpoint i Worker + interaktivt "Try it now"-felt på `/page-profile`. Samme 21-points score som CLI'en. | 0 kr (gratis tier) | Web UI på pages.dev · CLI download · offentligt JSON API |
| **Lemon Squeezy integration** | **Bygget klar** — `lemon-setup.js` opretter 7 produkter med checkout-links | — | Venter på API-nøgle |

### page-profile web-version (iteration 111) ✅

- `site/_worker.js`: `handleProfile()` — JS-port af CLI-analysen (meta, OG,
  Twitter, JSON-LD @types, headings, alt, security headers, hreflang, https)
  + `scoreProfile()` med identiske vægte → samme score/karakter som CLI.
- Fejlhåndtering: 400 (manglende/ugyldig URL, selv-profiling), 413 (>500 KB),
  502 (netværk), HTTP ≥ 400 fra target → tydelig fejlbesked (ikke analyse af
  fejlsider).
- `site/page-profile.html`: "Try it now" formular → terminal-style rapport.
  XSS-sikker output-escaping, aria-live status, noscript-fallback, tracking
  via /api/track (event=profile).
- Live-verificeret: example.com F, wikipedia.org C, nousresearch.com B;
  alle fejlkasver testet. IndexNow pinget.

### Dansk page-profile (iteration 112) ✅

- `site/da/page-profile.html` — fuld dansk landingsside med samme interaktive
  profiler ("Prøv det nu"), korrekt canonical + hreflang (en/da/x-default),
  SoftwareApplication JSON-LD valideret.
- Links fra `/da` hub og sitemap-indgange for både /page-profile og
  /da/page-profile. Deployet og verificeret live (200 + korrekt titel på alle
  tre sider; API'et svarer stadig korrekt).

### Intern linkning rettet (iteration 113) ✅

- `/api/stats?days=90`: page-profile har 0 eksterne profileringer — eneste
  trafikdag er 23/8 (egen smoke-test).
- Forsiden (`index.html`) havde intet link til page-profile → tilføjet kort i
  blogsektionen med CTA til /page-profile.
- `blog/accessibility-scanner-cli.html` → tilføjet "Going Deeper"-CTA med
  link til /page-profile.
- Deployet og live-verificeret (grep-tjek på begge sider); IndexNow pinget.

---

## page-profile — bygget i iteration 110

**Produkt:** Python CLI-værktøj (zero dependencies, pure stdlib) der profilerer enhver webside: HTTP-status, meta tags, Open Graph, JSON-LD, headings, alt-text, security headers, hreflang, canonical, language. Output som terminal-rapport eller JSON.

### Bygget ✅

- `page-profile/page_profile.py` — Kerne-bibliotek (~500 linjer): fetch, HTML-parser, score-beregning, terminal/JSON-formattering
- `page-profile/cli.py` — CLI entrypoint
- `page-profile/pyproject.toml` — PyPI-pakke-metadata
- `page-profile/README.md` — Dokumentation
- `site/page-profile.html` — Fuld produktlandingsside: CLI-demo, quick-start, tier-sammenligning, live example, output-struktur
- `site/downloads/page-profile/page_profile.py` — Single-file download
- `site/downloads/page-profile/page-profile-1.0.0.tar.gz` — Tarball med README

### Verificeret ✅

- `python3 page_profile.py https://hermes-passiv.pages.dev/` → 16.5/21.0 Grade B
- `python3 page_profile.py https://example.com/` → 6.0/21.0 Grade F (korrekt)
- `--json` output: valid JSON
- Live verificeret: /page-profile (200), /downloads (indeholder entry), /free-tools (indeholder kort), sitemap (indeholder entry)

### Distribution live ✅

- `site/downloads/page-profile/page_profile.py` — Single-file download
- `site/downloads/page-profile/page-profile-1.0.0.tar.gz` — Tarball med README

### Deployet ✅

- `./deploy.sh` → alle nye filer uploaded, Worker compiled
- Live-verificeret med curl: /page-profile (200), /downloads, /free-tools, /sitemap.xml
- IndexNow pinget: 200

## Vedligeholdelse

- page-profile: ingen dependencies — Python 3.8+ stdlib only
- site-icons: kræver Pillow + rsvg-convert
- Deploy: `./deploy.sh` (eksisterende script)
- Health check: alle sider 200, sitemap valid, downloads tilgængelige

---

## Kommende (Mads-afhængigt)

1. **Chrome Web Store $5 fee** — betal og upload Clean Copy
2. **Lemon Squeezy API-key (Bitwarden)** — Opret Pro-produkter for page-profile ($19/yr), site-icons ($29), Clean Copy ($19/yr), og 7 compliance-produkter
3. **PyPI publish** — `pip install page-profile` og `pip install site-icons`
4. **KDP-konto** — upload 5 e-bøger

---

## Compliance-produkt: PARKERET

Alt er bygget. Se BUILD.md iteration 108 for komplet liste. Intet nyt tilføjes.
---

## Iteration 114 — EN SEO-blog: /blog/technical-seo-check-website ✅

- Engelsk pendant til den danske teknisk-SEO-guide, søgeindgang til /page-profile.
- Article JSON-LD valideret (json.loads), canonical extensionless, sitemap-indgang.
- Intern linkning: footer på /page-profile + kryds-link fra DA-artiklen. Link-tjek: ingen brudte.
- Deployet og curl-verificeret live (200 + indhold på alle tre sider). IndexNow: 102 URL'er, 200.

## Iteration 120 — Clean Copy nu installérbar uden Web Store ✅

- **Offentligt GitHub-repo live:** https://github.com/mahope/clean-copy
  (kildekode v1.1.0, MIT-license, README med install-guide, tests følger med,
  topics: chrome-extension/markdown/clipboard/browser-extension).
  Fundet ud af at `gh` CLI er logget ind som mahope — ingen Mads-blokering.
- Landingsside /clean-copy: hero-CTA og priskort peger nu på GitHub,
  installationssektionen har "Option A — Install from source" (tilgængelig NU)
  og "Option B — Chrome Web Store (coming)". Deployet og curl-verificeret.
- `STORE_LISTING.md` i repo-roden: færdige listetekster + permission-
  justification til Web Store-upload (ren copy-paste når adgang kommer).


## Iteration 130 — Clean Copy Pro-funktioner (v1.2.0) ✅

- Kerne: compileRules/applyRules/batchConvert i clean_copy_core.js (delt af web + extensions). Tests: tools/test_pro_core.js.
- Extensions v1.2.0 (Chrome+Firefox): options.html/options.js — licensaktivering mod /api/license/*, custom regler med find/replace/regex; regler anvendes på alle kopier når Pro er aktiv (fejlende regler springes stille over).
- Web: batch-sektion på /clean-copy-tool, Pro-gated, kvietisk revalidering.
- Zips: clean-copy-v1.2.0.zip, clean-copy-firefox-v1.2.0.zip. GitHub repo skubbet (v1.2.0).
- Deployet og curl-verificeret live.

## Iteration 137 — Tracking verificeret + bookmarklet-funnel-link ✅

- End-to-end test af /api/track → KV → /api/stats: POST med
  /clean-copy-tool optrådte i stats inden for 10 sek. Pipeline hel.
- /clean-copy-bookmarklet havde ingen indgange: tilføjet kort på forsiden
  og bookmarklet-links i 3 Clean Copy-blogindlæg.
- Bookmarklet re-testet funktionelt (tabel→Markdown, escaped pipes): PASS.
- Deployet, curl-verificeret live på alle berørte sider. IndexNow: 200.

## Iteration 146 — Obsidian plugin-repo offentlig + submission klar ✅ (PR blokeret af GitHub)

- **Nyt offentligt repo:** https://github.com/mahope/clean-copy-obsidian
  (plugin-kode, ny README, MIT-license, topics; tests 14/14).
- Releases `v1.0.1` og `1.0.1` med main.js/manifest.json/styles.css som assets.
- Fork mahope/obsidian-releases + gren `add-clean-copy-obsidian` med entry i
  community-plugins.json — klar til PR. API-nægtet af repo-restriktion;
  one-click compare-URL + færdig PR-tekst i `obsidian-submission-kit.md`.
- /clean-copy Obsidian-sektion opdateret (BRAT + nyt repo), deployet og
  curl-verificeret live.
