#!/usr/bin/env python3
import hashlib
import json
import subprocess
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "research/legal-misrepresentation/evidence/round-four"
SOURCES = {
    "dol-wages-faq": "https://dol.ny.gov/node/6461",
    "dol-wage-theft": "https://dol.ny.gov/node/52586",
    "dol-file-complaint": "https://dol.ny.gov/node/52591",
    "dol-farm-wage-board": "https://dol.ny.gov/farm-laborers-wage-board",
}
records = []
for name, url in SOURCES.items():
    path = OUT / f"{name}.html"
    result = subprocess.run(["curl", "-L", "--silent", "--show-error", "--max-time", "30", "--write-out", "%{http_code} %{url_effective}", "--output", str(path), url], text=True, capture_output=True)
    data = path.read_bytes() if path.exists() else b""
    records.append({"name": name, "url": url, "status_and_final_url": result.stdout,
                    "sha256": hashlib.sha256(data).hexdigest() if data else None,
                    "bytes": len(data), "error": result.stderr.strip() or None})
    print(name, result.stdout, len(data), flush=True)
(OUT / "guidance-manifest.json").write_text(json.dumps({"captured_at_utc": datetime.now(timezone.utc).isoformat(), "sources": records}, indent=2) + "\n")
