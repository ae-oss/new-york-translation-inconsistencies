"""Capture the bounded second-round official-publication inventory."""
import concurrent.futures
import hashlib
import json
import pathlib
import subprocess

ROOT = pathlib.Path(__file__).resolve().parents[1]
CATALOG = ROOT / "research/legal-misrepresentation/round-two-sources.json"
OUT = ROOT / "research/legal-misrepresentation/evidence/round-two"
OUT.mkdir(parents=True, exist_ok=True)

sources = json.loads(CATALOG.read_text())
sources.append({
    "issue": "paid-sick-leave",
    "id": "psl:P737",
    "title": "P737 Employment Laws/Labor Standards FAQ",
    "url": "https://dol.ny.gov/system/files/documents/2026/03/p737-2-26.pdf",
})

def capture(source):
    try:
        urls = [source["url"]]
        if source["url"].startswith("https://www.health.ny.gov/"):
            urls.append(source["url"].replace("https://www.health.ny.gov/", "https://healthweb-back.health.ny.gov/"))
        for url in urls:
            response = subprocess.run(
                ["curl", "--fail", "--location", "--silent", "--show-error", "--max-time", "35", url],
                capture_output=True, timeout=40,
            )
            if response.returncode == 0:
                break
        response.check_returncode()
        body = response.stdout
        extension = ".pdf" if body.startswith(b"%PDF-") else ".html"
        output = OUT / (source["id"].replace(":", "-") + extension)
        output.write_bytes(body)
        return {**source, "status": 200, "fetched_url": url, "bytes": len(body), "sha256": hashlib.sha256(body).hexdigest(),
                "file": str(output.relative_to(ROOT))}
    except (subprocess.CalledProcessError, subprocess.TimeoutExpired, OSError) as exc:
        return {**source, "error": str(exc)}

with concurrent.futures.ThreadPoolExecutor(max_workers=6) as executor:
    results = list(executor.map(capture, sources))
(OUT / "manifest.json").write_text(json.dumps(results, indent=2, ensure_ascii=False) + "\n")
for result in results:
    print(result["id"], result.get("status", "ERROR"), result.get("bytes", ""), result.get("error", ""))
