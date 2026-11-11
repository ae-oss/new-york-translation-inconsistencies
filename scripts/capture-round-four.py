#!/usr/bin/env python3
"""Capture a bounded set of current NY Senate section pages for research."""

import hashlib
import json
import subprocess
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "research/legal-misrepresentation/evidence/round-four"
OUT.mkdir(parents=True, exist_ok=True)

SECTIONS = {
    "RPP": "233 259-C 231 227-E 235-B 235-F 234 235-C 232-C 232-A 238-A 235-E 226-B 227-A 227-C 235 227 230 223-B 237 237-A 768 446-B 446-H 227-F 442-E".split(),
    "GOB": "5-701 5-702 5-321 5-905".split(),
    "MDW": "78 68 50-A 35 50-C 51-B 51-C 51-A 79 75 302-C".split(),
    "RPA": "711 749 853".split(),
    "PEN": "180.55".split(),
    "PBS": "228".split(),
    "LAB": "191 193 195 196-D 201-D 215 651 652 654 661 662 192 194 198 198-C".split(),
}

manifest = []
for code, sections in SECTIONS.items():
    for section in sections:
        url = f"https://www.nysenate.gov/legislation/laws/{code}/{section}"
        path = OUT / f"{code.lower()}-{section.lower()}.html"
        result = subprocess.run(
            ["curl", "-L", "--silent", "--show-error", "--max-time", "25", "--write-out", "%{http_code} %{url_effective}", "--output", str(path), url],
            text=True, capture_output=True,
        )
        parts = result.stdout.split(" ", 1)
        status = int(parts[0]) if parts and parts[0].isdigit() else None
        data = path.read_bytes() if path.exists() else b""
        manifest.append({
            "code": code, "section": section, "url": url,
            "status": status, "final_url": parts[1] if len(parts) > 1 else "",
            "bytes": len(data), "sha256": hashlib.sha256(data).hexdigest() if data else None,
            "path": str(path.relative_to(ROOT)) if data else None,
            "error": result.stderr.strip() or None,
        })
        print(f"{code} {section} {status} {len(data)}", flush=True)

(OUT / "manifest.json").write_text(json.dumps({
    "captured_at_utc": datetime.now(timezone.utc).isoformat(),
    "sources": manifest,
}, indent=2) + "\n")
