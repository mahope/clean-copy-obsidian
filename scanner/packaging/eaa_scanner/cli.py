"""CLI for eaa-scanner: eaa-scan <url|file> [...]"""

import argparse
import json
import sys

from .core import scan_html, scan_url


def _render(rep: dict) -> str:
    if not rep.get("ok"):
        return f"SCAN FAILED for {rep.get('url', '?')}: {rep.get('error')}"
    s = rep["summary"]
    lines = [
        f"EAA/WCAG report — {rep['url']}",
        f"Score: {rep['score']}/100  Grade {rep['grade']} "
        f"(errors={s.get('errors', 0)}, warnings={s.get('warnings', 0)}, "
        f"notices={s.get('notices', 0)})",
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
    return "\n".join(lines)


def main(argv=None):
    ap = argparse.ArgumentParser(
        prog="eaa-scan",
        description="Scan URLs or HTML files for EAA / WCAG 2.1 AA issues.")
    ap.add_argument("targets", nargs="+",
                    help="URL(s) starting with http(s) or local HTML file path(s)")
    ap.add_argument("--json", action="store_true", help="output machine-readable JSON")
    ap.add_argument("--fail-on", choices=["error", "warning"], default="error",
                    help="exit non-zero when findings at this severity exist (default: error)")
    args = ap.parse_args(argv)

    reports = []
    for t in args.targets:
        try:
            if t.startswith(("http://", "https://")):
                rep = scan_url(t)
            else:
                with open(t, encoding="utf-8") as fh:
                    rep = scan_html(fh.read())
                rep["url"] = t
        except Exception as e:                      # never crash on one bad target
            rep = {"ok": False, "error": str(e), "url": t}
        reports.append(rep)
        if not args.json:
            print(_render(rep))
            print()

    if args.json:
        print(json.dumps(reports, indent=2))

    def bad(r):
        if not r.get("ok"):
            return True
        sev = {"error": 0, "warning": 1}.get(args.fail_on, 0)
        order = {"error": 0, "warning": 1, "notice": 2}
        return any(order.get(f["severity"], 2) <= sev for f in r.get("findings", []))

    sys.exit(1 if any(bad(r) for r in reports) else 0)


if __name__ == "__main__":
    main()
