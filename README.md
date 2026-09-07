# Clean Copy for Obsidian

Paste and clean text as proper Markdown inside [Obsidian](https://obsidian.md).

- **Free:** "Paste as clean Markdown" (Ctrl/Cmd+Shift+V) converts clipboard HTML — headings, bold, italic, links, lists, tables, code, entities — to proper Markdown using the same engine as [Clean Copy for Chrome/Firefox](https://github.com/mahope/clean-copy). "Clean selection" tidies the current selection (strips pasted HTML junk, smart quotes, zero-width characters).
- **Pro ($19/yr):** custom find/replace cleanup rules applied after every conversion, with regex support. Activated with a license key in settings.

## Install

### Via BRAT (recommended until the community listing is approved)

1. Install [BRAT](https://github.com/TfTHacker/obsidian42-brat) from Community plugins.
2. Run **BRAT: Add a beta plugin for testing** and paste `https://github.com/mahope/clean-copy-obsidian`.
3. Enable **Clean Copy** under Settings → Community plugins. BRAT keeps it updated from GitHub releases.

### Manual install

1. Download `main.js`, `manifest.json` and `styles.css` from the [latest release](https://github.com/mahope/clean-copy-obsidian/releases/latest).
2. Put them in `<vault>/.obsidian/plugins/clean-copy-obsidian/`.
3. Reload Obsidian, then enable **Clean Copy** under Settings → Community plugins.

### From Community Plugins (coming)

Submission is pending. When approved: Settings → Community plugins → Browse → search **Clean Copy**.

## Commands

| Command | Default hotkey | What it does |
|---|---|---|
| Paste as clean Markdown | Ctrl/Cmd+Shift+V | Clipboard HTML → clean Markdown at cursor |
| Paste as plain text | — | Stripped, unformatted text |
| Clean selection | — | Tidy already-pasted text in place |

All behavior is configurable in settings (default paste format, Pro rules).

## Privacy

No network access. No telemetry. The plugin reads your clipboard only when you run a paste command.

## Note on naming

The community plugin id is `clean-copy-obsidian`; another developer uses the id `clean-copy` for a different plugin.

## Development

```bash
node test.js
```

Tests cover HTML→Markdown conversion (tables, nested lists, code blocks, entities), cleanup rules and edge cases. `core.js` is the shared engine, identical to the browser extensions' core.

## Author

Mads Holst Jensen — [mahoje.dk](https://mahoje.dk) · [github.com/mahope/clean-copy-obsidian](https://github.com/mahope/clean-copy-obsidian)

## License

MIT
