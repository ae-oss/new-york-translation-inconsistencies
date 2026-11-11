#!/usr/bin/env python3
"""Index direct statute captures against narrowly located agency-guide passages."""

import csv
import hashlib
import html
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
EVIDENCE = ROOT / "research/legal-misrepresentation/evidence/round-four"
AG_PATH = ROOT / "research/legal-misrepresentation/evidence/round-three/ag-tenants-guide.html"
AG_URL = "https://ag.ny.gov/publications/residential-tenants-rights-guide"
DOL_URL = "https://dol.ny.gov/node/6461"
OUT = ROOT / "research/legal-misrepresentation/round-four-inventory.json"

def text_only(raw):
    raw = re.sub(r"<(script|style)\b[^>]*>.*?</\1>", " ", raw, flags=re.I | re.S)
    return re.sub(r"\s+", " ", html.unescape(re.sub(r"<[^>]+>", " ", raw))).strip()

ag_text = text_only(AG_PATH.read_text())
code_names = {
    "RPP": ["Real Property Law", "RPL"],
    "GOB": ["General Obligations Law"],
    "MDW": ["Multiple Dwelling Law"],
    "RPA": ["RPAPL", "Real Property Actions and Proceedings Law"],
    "PEN": ["Penal Law"],
    "PBS": ["Public Service Law"],
}

labor_claims = {
    "191": "When employment ends, the employer must pay wages by the regular payday for the pay period worked; on request, mail the final wages.",
    "193": "Employers may deduct only certain allowed items, not breakages, cash shortages, fines, or other business losses.",
    "195": "Employers must give or post their policies on sick leave, vacation, personal leave, holidays and hours; payroll records must include specified wage and hour fields.",
    "196-D": "Labor Standards enforces the prohibition against tip appropriation; food and beverage establishments must post the gratuities provision.",
    "201-D": "The law protects specified lawful political, recreational, consumable-product, and union activities outside work.",
    "215": "Employers may not penalize workers for complaints about Labor Law violations to the employer or the Labor Commissioner.",
}

# Conservative first-pass dispositions. These do not amount to full-document
# screening or final legal review; the independently checked exceptions are
# explained in the checkpoint.
source_limits = {
    "MDW/75": "Specific hot-water temperature in the guide also cites local law; this section alone does not establish that exact number.",
    "PEN/180.55": "This is only the third-degree offense; the guide states the broader key-money rule without parsing all degrees.",
    "RPA/749": "The guide combines the warrant rule with belongings handling; this section does not alone establish the latter claim.",
    "RPP/233": "The guide only identifies the manufactured-home-park statute here; no narrow operative claim was checked.",
    "RPP/235": "The cited wilful-services provision does not establish the guide's separate belongings-retention statement; check other authority.",
    "RPP/237-A": "The guide's child-discrimination summary omits exceptions listed in this section; overlapping fair-housing law and context require review.",
}

records = []
for path in sorted(EVIDENCE.glob("*.html")):
    if path.name.startswith("dol-"):
        continue
    code, section = path.stem.split("-", 1)
    code, section = code.upper(), section.upper()
    raw = path.read_text(errors="replace")
    head = re.search(r'<h2 class="nys-openleg-result-title-headline">(.*?)</h2>', raw, re.S)
    title = re.search(r'<h3 class="nys-openleg-result-title-short">(.*?)</h3>', raw, re.S)
    rule = re.search(r'<div class="nys-openleg-result-text">(.*?)</div>', raw, re.S)
    revision = re.search(r"Viewing most recent revision \(from ([^)]+)\)", raw)
    if not head or not title or not rule or text_only(head.group(1)).upper() != f"SECTION {section}":
        continue
    if code == "LAB":
        guide_url = DOL_URL
        guide_title = "Wages and Hours Frequently Asked Questions"
        guide_capture = ROOT / "research/legal-misrepresentation/evidence/round-four/dol-wages-faq.html"
        guide_excerpt = labor_claims.get(section, "")
        citation_explicit = section in ("193", "195", "196-D", "201-D", "215")
    else:
        guide_url = AG_URL
        guide_title = "Residential Tenants’ Rights Guide"
        guide_capture = AG_PATH
        names = "|".join(re.escape(x) for x in code_names[code])
        num = re.escape(section).replace(r"\-", "-")
        pattern = rf"(?:{names})\s*(?:\(\s*[‘\"']?RPL[’\"']?\s*\))?\s*(?:§|Section|,\s*§)\s*{num}(?![\w-])"
        matches = list(re.finditer(pattern, ag_text, re.I))
        if not matches:
            pattern = rf"(?:§|Section)\s*{num}(?![\w-])"
            matches = list(re.finditer(pattern, ag_text, re.I))
        if matches:
            at = matches[0].start()
            guide_excerpt = ag_text[max(0, at - 310):min(len(ag_text), matches[0].end() + 70)].strip()
        else:
            guide_excerpt = ""
        citation_explicit = bool(matches)
    records.append({
        "id": f"NY4-{len(records)+1:02d}",
        "statute_code": code,
        "section": section,
        "statute_title": text_only(title.group(1)),
        "statute_url": f"https://www.nysenate.gov/legislation/laws/{code}/{section}",
        "statute_revision_display": revision.group(1) if revision else None,
        "statute_capture": str(path.relative_to(ROOT)),
        "statute_sha256": hashlib.sha256(path.read_bytes()).hexdigest(),
        "guidance_agency": "New York State Department of Labor" if code == "LAB" else "Office of the New York State Attorney General",
        "guidance_title": guide_title,
        "guidance_url": guide_url,
        "guidance_capture": str(guide_capture.relative_to(ROOT)),
        "guidance_sha256": hashlib.sha256(guide_capture.read_bytes()).hexdigest(),
        "guidance_capture_date": "2026-11-02",
        "guidance_edition_note": "The HTML page displays no edition date; capture date is not a publication date.",
        "guidance_passage": guide_excerpt,
        "guidance_passage_kind": "researcher_paraphrase" if code == "LAB" else "short_source_context",
        "guidance_explicitly_cites_section": citation_explicit,
        "statute_opening": text_only(rule.group(1))[:500],
        "comparison_scope": "Guide passage near the cited provision only; no full-guide screening",
        "triage_status": ("provisional_conflict" if f"{code}/{section}" == "RPP/227-C" else
                          "source_limited" if f"{code}/{section}" in source_limits else
                          "targeted_no_apparent_conflict"),
        "triage_note": ("AG guide omits § 227-c(4)(a)(i)'s abusive-household-member exception to the free-of-occupants condition. Independent challenge pending."
                        if f"{code}/{section}" == "RPP/227-C" else
                        source_limits.get(f"{code}/{section}", "First-pass check of this guide passage against the relevant statutory clause found no material tension; no full-document review.")),
        "finding_status": "none",
    })

OUT.write_text(json.dumps({"research_date": "2026-11-02", "records": records}, ensure_ascii=False, indent=2) + "\n")
with OUT.with_suffix(".csv").open("w", newline="") as f:
    writer = csv.DictWriter(f, fieldnames=["id", "statute_code", "section", "statute_title", "statute_url", "guidance_agency", "guidance_url", "guidance_passage", "guidance_passage_kind", "triage_status", "triage_note", "finding_status"])
    writer.writeheader()
    for record in records:
        writer.writerow({k: record[k] for k in writer.fieldnames})
print(len(records), OUT)
