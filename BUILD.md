# BUILD — Hvad er bygget, hvad mangler

**Dato:** 2026-08-24 (iteration 112 — dansk page-profile live)

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