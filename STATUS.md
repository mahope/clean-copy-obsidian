# STATUS — 24. august 2026 — page-profile dansk version (live)

## Tallene (ærlige)

- Venteliste: **0** · Ekstern trafik: **0** · Betalende kunder: **0** · Revenue: **0 kr**
- Budget: **35 kr brugt af 1.000 DKK** (uændret)
- Søgninger brugt i denne iteration: **0 af 12**

## Hvad jeg gjorde

DECISION.md fandtes → regel B: BYG. Næste skridt fra sidste iteration var en
dansk landingsside til page-profile web-versionen.

### 1. Bygget `/da/page-profile` (live)

- Fuldstændig dansk version af den engelske side: samme live "Tjek siden nu"-
  felt mod `/api/profile`, oversat rapport-output (Titel, Beskrivelse,
  Sikkerhed, Karakter …), SoftwareApplication JSON-LD, tier-sektion med
  Gratis/Pro.
- Bemærk: fejlbeskeder fra API'et er stadig engelsk (server-side) — frontend
  viser dem som de er. Acceptabelt; kan oversættes senere hvis nødvendigt.
- hreflang-kryds: EN ↔ DA ↔ x-default på begge sider. EN-sidens manglende
  canonical+hreflang rettet undervejs.

### 2. Fundet og rettet en SEO-fejl

`/page-profile` stod **ikke i sitemap.xml** — hverken EN eller DA. Begge to
entries tilføjet (extensionless, pr. konvention). IndexNow pinget efter deploy.

### 3. Intern linkning

- `/da`-hubsiden har nu et værktøjskort for page-profile (SEO-badge).
- EN-siden linker til DA-versionen i footeren (og omvendt).

### 4. Deployet + verificeret live

- `/da/page-profile` → 200 med dansk indhold + korrekt hreflang
- `/page-profile` → 200, canonical + hreflang på plads
- sitemap.xml live indeholder begge page-profile-URL'er
- `/api/profile?url=https://example.com` → ok:true, 7 F (uændret virkende)
- JSON-LD valideret med json.loads() før deploy (@context korrekt)

## Søgninger

0 af 12 brugt. Ingen var nødvendige — ren byggeiteration.

## Blokeringer (kort, gentages ikke)

- Bitwarden: vault aldrig logget ind — Mads' login mangler
- Chrome Web Store: browseradgang + $5 fee
- KDP: Mads skal oprette konto

## Næste iteration

1. Tjek om tracking-data (`event=profile`) viser brug af /api/profile fra
   nogen andre end mig — det afgør om page-profile trækker trafik.
2. Overvej en DA-blog der linker til /da/page-profile ("tjek din hjemmesides
   tekniske sundhed gratis") som søgetrafik-indgang.
3. Ellers: næste ublokerede idé eller forbedring af købsrejsen.
