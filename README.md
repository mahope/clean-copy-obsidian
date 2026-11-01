# Clean Copy Markdown

Paste web pages, emails and documents into [Obsidian](https://obsidian.md) as clean Markdown instead of cluttered HTML.

- **Free:** "Paste as clean Markdown" converts the HTML on your clipboard (headings, bold, italic, links, lists, tables, code, entities) to proper Markdown using the same engine as [Clean Copy for Chrome/Firefox](https://github.com/mahope/clean-copy). "Clean selection" tidies text that is already in your note (stray HTML, smart quotes, zero-width characters, extra spaces).
- **Pro (paid, optional):** custom find/replace cleanup rules, with regex support, applied after every conversion. Activated with a license key in the plugin settings. See [pricing](https://cleancopy.tools/#price).

The free version is complete and works fully offline. See [Network use, payment and privacy](#network-use-payment-and-privacy) for exactly what Pro does online.

## Example

Copy this from a web page:

```html
<h2>Release notes</h2>
<p>Version <b>2.1</b> is out. See the <a href="https://example.com/changelog">changelog</a>.</p>
<ul><li>Faster sync</li><li>Fewer <i>crashes</i></li></ul>
<table><tr><th>Plan</th><th>Price</th></tr><tr><td>Free</td><td>0</td></tr></table>
```

Run **Paste as clean Markdown** and you get:

```markdown
## Release notes

Version **2.1** is out. See the [changelog](https://example.com/changelog).

- Faster sync
- Fewer *crashes*

| Plan | Price |
| --- | --- |
| Free | 0 |
```

Set the default paste mode to CSV and the same table pastes as `Plan,Price` / `Free,0`.

## Usage

1. Copy something from a browser, mail client or document.
2. Open the command palette (Ctrl/Cmd+P) and run **Paste as clean Markdown**, or assign your own shortcut under Settings → Hotkeys. The plugin ships with no default hotkey, so it never clashes with your setup.
3. To tidy text that is already in a note, select it and run **Clean selection**.

### Commands

| Command | What it does |
|---|---|
| Paste as clean Markdown | Reads the clipboard and inserts it at the cursor, converted with your default paste mode. The command name follows the default mode as it was when Obsidian started (for example "Paste as clean text" in plain mode). |
| Clean selection | Cleans the selected text in place. HTML in the selection is converted, plain text is tidied. |

### Settings

- **Default paste mode:** Markdown, Markdown with `[[WikiLinks]]`, CSV (tables become comma-separated rows) or plain text.
- **Clean Copy Pro license:** enter your key and select Activate.
- **Custom cleanup rules (Pro):** find/replace rules applied after each conversion.

## Install

### From Community plugins (coming)

Submission to the Obsidian Community directory is in progress. When it is published: Settings → Community plugins → Browse → search **Clean Copy Markdown**.

### Via BRAT (until the directory listing is live)

1. Install [BRAT](https://github.com/TfTHacker/obsidian42-brat) from Community plugins.
2. Run **BRAT: Add a beta plugin for testing** and paste `https://github.com/mahope/clean-copy-obsidian`.
3. Enable **Clean Copy Markdown** under Settings → Community plugins. BRAT keeps it updated from GitHub releases.

### Manual install

1. Download `main.js`, `manifest.json` and `styles.css` from the [latest release](https://github.com/mahope/clean-copy-obsidian/releases/latest).
2. Put them in `<vault>/.obsidian/plugins/clean-copy-markdown/`.
3. Reload Obsidian, then enable **Clean Copy Markdown** under Settings → Community plugins.

### Upgrading from 1.0.9 or earlier

Versions up to 1.0.9 used the plugin id `clean-copy-obsidian` and the name "Clean Copy". From 1.0.10 the id is `clean-copy-markdown` (Obsidian does not allow "obsidian" in an id, and the name "Clean Copy" is used by another plugin). Obsidian treats this as a new plugin, so remove the old `clean-copy-obsidian` folder, install again and re-enter your Pro license key.

## Network use, payment and privacy

- **Free features use no network.** Pasting and cleaning happen on your machine. No account is needed, and there is no telemetry or analytics.
- **Payment:** Pro is a paid upgrade for custom cleanup rules. Everything else is free.
- **Network use (Pro license check only):** when you select Activate, and once at each launch while Pro is active, the plugin sends an HTTPS POST to `https://hermes-passiv.pages.dev/api/license/` (`activate` or `validate`). The request contains your license key and a random device id that the plugin generates locally and stores in its own settings. It is used only to check that the key is valid and to enforce the license's device limit. The clipboard, your notes and your vault are never sent. If you are offline, Pro stays active for that session.
- **Clipboard:** the plugin reads the clipboard only at the moment you run a paste command.
- **Files:** the plugin does not access any files outside your vault.

## Releasing (maintainers)

A GitHub Release with `main.js`, `manifest.json` and `styles.css` as individual
assets is created automatically by
[`.github/workflows/release.yml`](.github/workflows/release.yml) when a tag is
pushed. The tag is the bare version **without a `v` prefix**, equal to `version`
in `manifest.json`, and `versions.json` needs an entry for it.

```bash
# bump manifest.json + versions.json, commit, then:
git tag 1.0.11 && git push origin main 1.0.11
```

Listing in the Obsidian Community directory is done once at
[community.obsidian.md](https://community.obsidian.md); later releases are picked up
automatically. The step-by-step notes are in
[docs/community-submission.md](docs/community-submission.md).

## Development

```bash
node test.js
```

Tests cover HTML to Markdown conversion (tables, nested lists, code blocks, entities), cleanup rules and edge cases. `core.js` is the shared engine, identical to the browser extensions' core and bundled into `main.js`.

## Author

Built by Mads Holst Jensen, developer and technical partner for small businesses, Odense, Denmark. https://mahoje.dk

Other Clean Copy builds: [browser extension](https://cleancopy.tools/), [CLI](https://github.com/mahope/clean-copy-cli).

## License

MIT
