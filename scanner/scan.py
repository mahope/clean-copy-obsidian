#!/usr/bin/env python3
"""
scan.py — CLI wrapper around scanner_core.

usage:
    python scan.py <url> [more-urls...]
    python scan.py --file page.html

Outputs a human-readable report (and machine JSON with --json).
Exit code 1 if any scanned page has errors, 0 otherwise.
"""

import json
import sys

from scanner_core import scan_url, scan_html


def render(rep: dict) -> str:
    if not rep.get("ok"):
        return f"SCAN FAILED for {rep.get('url', '?')}: {rep.get('error')}"
    lines = [
        f"EAA/WCAG report — {rep['url']}",
        f"Score: {rep['score']}/100  Grade {rep['grade']} "
        f"(errors={rep['summary']['errors']}, warnings={rep['summary']['warnings']}, "
        f"notices={rep['summary']['notices']})",
        "-" * 60,
    ]
    for f in rep["findings"]:
        lines.append(f"[{f['severity'].upper():7}] {f['rule_id']}: {f['message']}")
        for ex in f["examples"]:
            lines.append(f"           e.g. {ex}")
    if not rep["findings"]:
        lines.append("No issues found by the automated checks.")
    lines.append("")
    lines.append("Note: automated checks catch ~30-40% of accessibility issues.")
    lines.append("Full manual checklist: see 'EAA Compliance Checklist' e-book.")
    return "\n".join(lines)


def main():
    args = sys.argv[1:]
    as_json = "--json" in args
    args = [a for a in args if a != "--json"]
    if not args:
        print(__doc__)
        sys.exit(2)

    reports = []
    for arg in args:
        try:
            if arg.startswith("http"):
                rep = scan_url(arg)
            else:
                with open(arg, encoding="utf-8") as fh:
                    rep = scan_html(fh.read())
                rep["url"] = arg
        except Exception as e:
            rep = {"ok": False, "error": str(e), "url": arg}
        reports.append(rep)
        if not as_json:
            print(render(rep))
            print()

    if as_json:
        print(json.dumps(reports, indent=2))
    sys.exit(1 if any(r.get("summary", {}).get("errors", 0) > 0
                      or not r.get("ok") for r in reports) else 0)


if __name__ == "__main__":
    main()
