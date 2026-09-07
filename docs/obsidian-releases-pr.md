# Community plugin submission - ready-to-send PR

Getting into Obsidian's community plugin browser takes **one pull request** to
[obsidianmd/obsidian-releases](https://github.com/obsidianmd/obsidian-releases)
(official guide: https://docs.obsidian.md/Plugins/Releasing/Submit+your+plugin).
Everything below is copy-paste ready. There are no secrets or tokens involved.

Note (2026-08): Obsidian has also started a web dashboard at
https://community.obsidian.md (log in, connect GitHub `mahope`, pick the repo,
Submit). If that dashboard accepts the submission, the PR is not needed - use
whichever route works first.

## Prerequisites (all done)

- Repo is public: https://github.com/mahope/clean-copy-obsidian
- `manifest.json` id `clean-copy-obsidian`, `minAppVersion` 1.4.0, `isDesktopOnly` false
- `versions.json` present
- A GitHub Release tagged **exactly** the manifest version (bare, no `v`) with
  `main.js`, `manifest.json`, `styles.css` as individual assets - created by
  `.github/workflows/release.yml` on tag push. Push a bare tag (e.g. `1.0.10`)
  before opening the PR; the reviewer bot checks the release for the current
  manifest version.
- LICENSE (MIT) in the repo root

## Steps

1. Fork https://github.com/obsidianmd/obsidian-releases on GitHub (account `mahope`).
2. Edit `community-plugins.json` and append this object **at the end of the array**
   (keep the trailing entry's comma, no trailing comma after this one):

```json
{
  "id": "clean-copy-obsidian",
  "name": "Clean Copy",
  "author": "Mads Holst Jensen",
  "description": "Paste and clean text as proper Markdown. Custom cleanup rules and batch cleaning with Clean Copy Pro.",
  "repo": "mahope/clean-copy-obsidian"
}
```

3. Open a pull request against `master` with the title and body below. The PR
   template is a checklist; every box must be ticked.

## PR title

```
Add plugin: Clean Copy
```

## PR body

```
# I am submitting a new Community Plugin

## Repo URL

Link to my plugin: https://github.com/mahope/clean-copy-obsidian

## Release Checklist
- [x] I have tested the plugin on
  - [x] Windows
  - [x] macOS
  - [x] Linux
  - [x] Android _(if applicable)_
  - [x] iOS _(if applicable)_
- [x] My GitHub release contains all required files
  - [x] `main.js`
  - [x] `manifest.json`
  - [x] `styles.css` _(optional)_
- [x] GitHub release name matches the exact version number specified in my manifest.json (_**Note:** Use the exact version number, don't include a prefix `v`_)
- [x] The `id` in my `manifest.json` matches the `id` in the `community-plugins.json` file.
- [x] My README.md describes the plugin's purpose and provides clear usage instructions.
- [x] I have read the developer policies at https://docs.obsidian.md/Developer+policies, and have assessed my plugin's adherence to these policies.
- [x] I have read the tips in https://docs.obsidian.md/Plugins/Releasing/Plugin+guidelines and have self-reviewed my plugin to avoid these common pitfalls.
- [x] I have added a license in the LICENSE file.
- [x] My project respects and is compatible with the original license of any code from other plugins that I'm using.
  I have given proper attribution to these other projects in my `README.md`.
```

Tick only the platforms actually tested before sending. After the bot review
passes, a maintainer merges the PR (usually within a couple of weeks) and the
plugin appears in Settings -> Community plugins -> Browse.
