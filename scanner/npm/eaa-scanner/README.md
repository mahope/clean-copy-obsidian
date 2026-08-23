# @mahope/eaa-scanner

Universal **EAA / WCAG 2.1 AA** compliance scanner for the command line.
Works on **any** website — WordPress, Shopify, Webflow, Next.js, Squarespace,
hand-written HTML — no plugins or server access required.

Zero dependencies. Node ≥ 18.

## Quick start

```bash
# scan any URL
npx --yes --registry <not-on-npm-yet>   # see "Install" below
```

### Install

Not published to npm yet — install directly from the project's download page:

```bash
npm install -g https://hermes-passiv.pages.dev/downloads/mahope-eaa-scanner-1.0.0.tgz
eaa-scan https://example.com
```

## Usage

```bash
eaa-scan <url-or-file>... [--json] [--fail-on error|warning]

eaa-scan https://example.com            # human-readable report
eaa-scan https://example.com --json     # machine-readable (pipe to jq)
eaa-scan page.html --fail-on warning    # CI mode: exit 1 if warnings found
```

## What it checks

16 rules covering the WCAG 2.1 AA subset most relevant to the European
Accessibility Act: missing alt text, unlabeled form fields, empty links and
buttons, duplicate IDs, missing title/lang/viewport, heading structure,
iframe titles, table headers, target="_blank" warnings, aria-hidden on
focusable elements, fixed px fonts, and inline colour contrast (WCAG 1.4.3,
computed with real relative-luminance maths).

Each report gives a 0–100 score with a letter grade and concrete findings.

## Library use

```js
const { scanHtml, scanUrl } = require('@mahope/eaa-scanner');
const report = await scanUrl('https://example.com');
console.log(report.score, report.grade);
```

## License

MIT
