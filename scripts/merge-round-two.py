"""Merge the bounded October 2026 source capture and targeted claim screens."""
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "src/data/legal-research.json"
MANIFEST = ROOT / "research/legal-misrepresentation/evidence/round-two/manifest.json"
data = json.loads(DATA.read_text())
captures = json.loads(MANIFEST.read_text())

new_issues = [
    dict(id="medicaid-appeals", title="Medicaid managed-care appeals and continued benefits",
         summary="What official model materials say about plan appeals, State fair hearings, and aid continuing.",
         scope="New York State Department of Health model handbook, notices, charts, and related managed-care guidance. Only specified passages have been compared; plan type and notice type matter.",
         legal_questions=["After a plan's final adverse determination, when may an enrollee request a State fair hearing?", "When must an enrollee request continuation of a previously authorized service?", "Do model notices distinguish plan appeals from State fair hearings?"],
         agency_ids=["ny-doh"], status="Second-round targeted screening in progress",
         limitations="Eight official publications were captured, one located page was not retrievable. The model handbook is a template, not proof that a plan used it. Federal 42 CFR 438.408(f)(2) allows 90–120 days, while the displayed state 18 NYCRR 360-10.8 text still says 60 days; current rule hierarchy and adoption status require further review. No new finding has passed independent review.",
         claims_identified_topic_level=3, claims_screened_topic_level=2),
    dict(id="rent-overcharge", title="Rent-stabilization overcharge and appeal guidance",
         summary="Overcharge remedies, review periods, and administrative appeal timing in HCR publications.",
         scope="New York State Homes and Community Renewal guidance for rent-stabilized apartments, including both NYC and ETPA jurisdictions only where the document says so.",
         legal_questions=["How long does a party have to petition for administrative review of an HCR order?", "When may a tenant collect an awarded overcharge penalty?", "How do post-2019 and earlier complaint periods differ?"],
         agency_ids=["ny-hcr"], status="Second-round targeted screening in progress",
         limitations="Eight distinct HCR publications were captured; Fact Sheet 26 was located but its PDF endpoint did not permit a stable direct capture. Selected claims in Fact Sheet 16 were read. The current official printed rent-code supplement was not inspected; period and jurisdiction distinctions remain material. No new finding has passed independent review.",
         claims_identified_topic_level=3, claims_screened_topic_level=2),
    dict(id="paid-family-leave", title="Paid Family Leave eligibility and claims",
         summary="Eligibility, benefit level, application, and payment guidance for New York Paid Family Leave.",
         scope="Workers' Compensation Board and Paid Family Leave program publications; ordinary PFL is distinguished from expired COVID quarantine leave and from disability benefits.",
         legal_questions=["Which workers meet the usual 26-week or 175-day eligibility conditions?", "What are the current duration and wage-replacement limits?", "How are complete family-care claims submitted and decided?"],
         agency_ids=["ny-wcb"], status="Second-round targeted screening in progress",
         limitations="Nine official publications were captured; four additional official links were located but their file endpoints rejected stable direct capture. Selected eligibility and 2026 benefit claims were checked. A construction-worker rule taking effect in 2027 is excluded from current-law conclusions. No new finding has passed independent review.",
         claims_identified_topic_level=3, claims_screened_topic_level=2),
]

new_agencies = [
    dict(id="ny-doh", name="New York State Department of Health", jurisdiction="New York State", url="https://www.health.ny.gov/"),
    dict(id="ny-hcr", name="New York State Homes and Community Renewal", jurisdiction="New York State", url="https://hcr.ny.gov/"),
    dict(id="ny-wcb", name="New York State Workers' Compensation Board", jurisdiction="New York State", url="https://www.wcb.ny.gov/"),
]

new_rules = [
    dict(id="med:CFR-438-408", issue_id="medicaid-appeals", citation="42 CFR § 438.408(f)(2)", url="https://www.ecfr.gov/current/title-42/chapter-IV/subchapter-C/part-438/subpart-F/section-438.408", text="For a managed-care plan appeal resolution, the State must allow 90 to 120 calendar days for a fair-hearing request.", exact_text="The enrollee must have no less than 90 calendar days and no more than 120 calendar days from the date of the MCO's, PIHP's, or PAHP's notice of resolution to request a State fair hearing.", effective_date="eCFR current through 2026-10-28", applicability="Managed-care plan appeal resolution, not every Medicaid hearing type.", qualifications="Federal rule sets a range. The displayed New York state regulation's older 60-day wording creates a rule-currentness issue that is not resolved by the handbook alone.", corroboration=[{"label":"DOH model handbook","url":"https://www.health.ny.gov/health_care/managed_care/medicaid/mmc_model_member_handbook.htm"},{"label":"State regulation page showing 60 days","url":"https://regs.health.ny.gov/content/section-360-108-fair-hearings"}]),
    dict(id="med:CFR-438-420", issue_id="medicaid-appeals", citation="42 CFR § 438.420", url="https://www.ecfr.gov/current/title-42/chapter-IV/subchapter-C/part-438/subpart-F/section-438.420", text="Continued benefits for a timely appeal of a reduction, suspension, or termination require the regulatory conditions and a timely continuation request.", exact_text="The enrollee timely files for continuation of benefits.", effective_date="eCFR current through 2026-10-28", applicability="Previously authorized services under managed care; plan appeal and fair-hearing stages differ.", qualifications="The provision defines timely filing as within 10 calendar days of notice or by intended effective date, whichever is later, and requires other conditions, including an unexpired authorization.", corroboration=[{"label":"DOH fair hearing and aid continuing guidance","url":"https://www.health.ny.gov/health_care/managed_care/plans/appeals/2017-12-15_fair_hearing.htm"}]),
    dict(id="rent:NYCRR-2529-2", issue_id="rent-overcharge", citation="9 NYCRR § 2529.2", url="https://govt.westlaw.com/nycrr/Document/I4f8cead1cd1711dda432a117e6e0f345?viewType=FullText", text="A petition for administrative review of a Rent Administrator order is filed within 35 days after issuance.", exact_text=None, effective_date=None, applicability="New York City rent-stabilization administrative review; ETPA rules require separate checking.", qualifications="Online NYCRR copy is marked unofficial, and the latest official printed supplement was not directly inspected. HCR's own appeal page gives the same 35-day period.", corroboration=[{"label":"HCR Appealing an Order","url":"https://hcr.ny.gov/node/331"}]),
    dict(id="pfl:WKC-203", issue_id="paid-family-leave", citation="Workers' Compensation Law § 203", url="https://www.nysenate.gov/legislation/laws/WKC/203", text="Usual eligibility is 26 consecutive weeks with a covered employer; employees regularly working fewer than 20 hours weekly qualify on the 175th day of regular employment.", exact_text=None, effective_date="2026-02-27 revision; 2027 amendment not yet effective", applicability="Covered employment in the current statutory period.", qualifications="The statute has additional categories and a separate construction-worker provision effective January 1, 2027. Program pages simplify those details.", corroboration=[]),
    dict(id="pfl:WKC-204", issue_id="paid-family-leave", citation="Workers' Compensation Law § 204(2)(a)", url="https://www.nysenate.gov/legislation/laws/WKC/204", text="Current PFL benefits are capped at 12 weeks per 52-week period and 67% of average weekly wage, subject to a state-wage cap.", exact_text=None, effective_date="Current 2026 benefit tier", applicability="Eligible paid family leave; not disability benefits.", qualifications="Annual state average weekly wage sets the dollar cap; the Superintendent's delay authority and statutory benefit qualifications must be considered.", corroboration=[{"label":"2026 Board rates announcement","url":"https://apps.wcb.ny.gov/content/main/PressRe/paid-family-leave-2026.jsp"}]),
]

def claim(id, issue, source, rules, quote, location, outcome, analysis, limitations, confidence="Moderate", counterargument="No contrary example established in this targeted check."):
    return dict(id=id, issue_id=issue, source_id=source, rule_ids=rules, exact_quote=quote, location=location,
                surrounding_context="Only the identified passage was compared; the linked publication supplies full context.", outcome=outcome,
                confidence=confidence, significance="Pending", current_relevance="Active", historical_classification="Undetermined",
                analysis=analysis, counterargument=counterargument, reviewer_outcome="Independent challenge pending; no publication as a finding.",
                example="", potential_consequence="Not established for this targeted check.", documented_consequence="None established.",
                limitations=limitations, independently_reviewed=False, screened_at="2026-10-30")

new_claims = [
    claim("med:hearing-120", "medicaid-appeals", "med:model-handbook", ["med:CFR-438-408"], "If you receive a Final Adverse Determination, you will have 120 calendar days from the date of the Final Adverse Determination to ask for a State Fair Hearing.", "Model handbook, Plan Appeals / Fair Hearings", "uncertain_lead", "The handbook's 120-day period falls within the current federal 90–120-day range. The state regulation website still displays 60 days for some managed-care hearing requests, so the New York implementation and amendment status must be resolved before any verdict.", "Do not call the handbook wrong or assume the older state page governs this specific plan-appeal path.", confidence="Low", counterargument="Federal law may displace an inconsistent shorter state window; an amendment or plan-specific rule may explain the difference."),
    claim("med:aid-10", "medicaid-appeals", "med:model-handbook", ["med:CFR-438-420"], "You must ask for a fair hearing within 10 days from the date of the Final Adverse Determination or by the time the action takes effect, whichever is later.", "Model handbook, Aid to Continue after Plan Appeal", "no_supported_misrepresentation", "The ten-day/effective-date framework is consistent with the federal continuation rule for an adverse appeal resolution, subject to the rule's other eligibility conditions.", "Only the model passage and federal rule were checked; plan-specific notices and state implementation remain to be inspected."),
    claim("rent:par-35", "rent-overcharge", "rent:fact16", ["rent:NYCRR-2529-2"], "The filing of a PAR within 35 days of the Rent Administrator’s order by the owner or tenant will prevent the tenant from collecting the penalty awarded until the Commissioner rules on the PAR.", "Fact Sheet 16, PDF page 2", "no_supported_misrepresentation", "The 35-day filing period matches HCR's current Appealing an Order page and the unofficial online text of 9 NYCRR § 2529.2. This check found no contrary deadline in the identified NYC rent-stabilization context.", "The official printed code supplement and ETPA counterpart were not directly inspected."),
    claim("rent:treble-six", "rent-overcharge", "rent:fact16", [], "For complaints filed on or after the passage of the Housing Stability and Tenant Protection Act (HSTPA) on June 14, 2019, in the event of a willful overcharge, the penalty equals three times the amount of the overcharge beginning up to six years prior to the filing of the complaint.", "Fact Sheet 16, PDF page 2", "evidence_limitation", "The 2019 timing distinction and six-year language are consistent with HCR's public HSTPA overview, but this pass did not establish every statutory exception or the exact current code text for a legal-effect verdict.", "The phrasing has not been independently checked against all governing rent-stabilization and ETPA provisions.", confidence="Pending"),
    claim("pfl:eligibility-26", "paid-family-leave", "pfl:eligibility", ["pfl:WKC-203"], "Employees who work a regular schedule of 20 or more hours per week are eligible after 26 consecutive weeks of employment.", "Eligibility page, full-time employees", "no_supported_misrepresentation", "This matches the usual current statutory eligibility threshold for covered employment. The page also gives the 175-day rule for regular schedules below 20 hours weekly.", "Special statutory categories and the 2027 construction-worker amendment were not screened as current ordinary eligibility."),
    claim("pfl:benefit-2026", "paid-family-leave", "pfl:2026", ["pfl:WKC-204"], "Employees taking Paid Family Leave receive 67% of their average weekly wage, up to a cap of 67% of the current New York State Average Weekly Wage (NYSAWW).", "2026 benefits page, wage replacement", "no_supported_misrepresentation", "The quoted percentage and state-wage cap match the current statutory benefit tier and Board's 2026 rates notice.", "Specific wage calculations and carrier decisions were not audited."),
]

data["issues"].extend(new_issues)
data["agencies"].extend(new_agencies)
data["rules"].extend(new_rules)
data["claims"].extend(new_claims)

claim_source = {c["id"]: c["source_id"] for c in new_claims}
screened = set(claim_source.values())
for row in captures:
    if row["issue"] not in {"medicaid-appeals", "rent-overcharge", "paid-family-leave"} or row["id"] == "rent:ra89-landing":
        continue
    agency = {"medicaid-appeals":"ny-doh", "rent-overcharge":"ny-hcr", "paid-family-leave":"ny-wcb"}[row["issue"]]
    ok = row.get("status") == 200 and row.get("bytes", 0) > 1000
    ids = [c["id"] for c in new_claims if c["source_id"] == row["id"]]
    data["sources"].append(dict(id=row["id"], issue_id=row["issue"], agency_id=agency, title=row["title"],
        url=row["url"], language="en", publication_date=None, accessed_at="2026-10-30",
        current_relevance="Active" if ok else "Uncertain", coverage="partially_screened" if ids else ("retrieved" if ok else "discovered"),
        claim_ids=ids, screen_note=("Identified claim passages compared only; rest of publication not certified." if ids else ("Official copy captured; no claim-level screen completed." if ok else "Official link located; direct binary capture failed, so text and edition not certified.")),
        capture=(dict(file=row["file"], sha256=row["sha256"], captured_at="2026-10-30",
                      kind="official HTTP response; Health Department mirror used where recorded in manifest", image=None, image_sha256=None) if ok else None)))

p737 = next(s for s in data["sources"] if s["id"] == "psl:DOL-P737-2026")
p737_manifest = next(r for r in captures if r["id"] == "psl:P737")
p737["screen_note"] = "Relevant paid-sick-leave portion reviewed on PDF pp. 51–59 (printed pp. 47–55), including accrual, use, notice, carryover, and overlap passages; remaining compendium topics outside this sweep. Two existing claims retained, one unresolved."
p737["accessed_at"] = "2026-10-30"
p737["capture"] = dict(file=p737_manifest["file"], sha256=p737_manifest["sha256"], captured_at="2026-10-30", kind="raw official PDF", image=None, image_sha256=None)
data["issues"][0]["limitations"] = "The lead agency page and governing sources were recaptured on 30 October 2026. Remaining documents are only partially screened. The 2022 FAQ is still linked but visibly older. P737's relevant paid-sick-leave portion (PDF pp. 51–59) was examined, not its unrelated chapters. No actual worker harm was found."
data["stage"] = "Published initial findings; second-round targeted screening in progress"
data["notice"] = "Two independently reviewed findings remain published. Three new issue sweeps now show verified source inventories and limited claim screens; no new finding has passed independent review."

DATA.write_text(json.dumps(data, indent=2, ensure_ascii=False) + "\n")
print(f"Merged {len(new_issues)} issues, {len([s for s in data['sources'] if s['issue_id'] in {i['id'] for i in new_issues}])} sources, {len(new_claims)} targeted claims")
