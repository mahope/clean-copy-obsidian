# Listing in the Obsidian Community directory

Plugins are no longer added with a pull request to `obsidianmd/obsidian-releases`
(pull requests are disabled there, and `community-plugins.json` is mirrored every
hour from the directory). Submission is a one-time form at
[community.obsidian.md](https://community.obsidian.md). Official guide:
https://docs.obsidian.md/Plugins/Releasing/Submit+your+plugin

## Checklist before submitting

- `manifest.json` on the default branch is final: `id` has no "obsidian" and
  cannot change after publishing, `name` is unique in the directory, `description`
  starts with a verb, ends with a period and is at most 250 characters.
- `versions.json` has an entry for the manifest version.
- A GitHub Release exists whose tag equals the manifest version (bare, no `v`) and
  carries `main.js`, `manifest.json` and `styles.css` as individual assets. The
  release workflow creates it when the tag is pushed.
- `README.md` explains purpose and usage, and discloses network use and payment
  (Developer policies, "Disclosures").
- `LICENSE` is in the repository root (MIT).

## Submit

1. Sign in at community.obsidian.md with the Obsidian account.
2. Profile: connect the GitHub account `mahope`.
3. Plugins: **New plugin**. Repository URL `https://github.com/mahope/clean-copy-obsidian`,
   owner the organization "Mahoje" (create it under Organizations first), so the
   listing is not tied to a personal profile.
4. Payment type: **Optional payment** (Pro features are paid, the rest is free).
5. Read and accept the Developer policies, then Submit.

The directory reviews the plugin automatically (Manifest, Releases, Source code,
Build verification). To preview a scan before or after submitting, use **Review
branch** on the entry's management page. Fixes are shipped as a new release with an
incremented version.
