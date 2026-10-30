import { readFileSync, writeFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const read = name => JSON.parse(readFileSync(join(root, "research/legal-misrepresentation", name), "utf8"));
const paid = read("paid-sick-leave.json");
const ui = read("unemployment.json");
const agencyId = name => /Attorney General/i.test(name) ? "ny-ag" : "ny-dol";
const agencyName = id => id === "ny-ag" ? "Office of the New York State Attorney General" : "New York State Department of Labor";
const issues = [
  { id: "paid-sick-leave", title: paid.title, summary: "Current explanations of ordinary paid sick leave and the separate COVID quarantine-leave sunset.", scope: "New York State agency guidance relevant to private-sector paid sick leave; selected NYC point only where the Attorney General discusses it.", legal_questions: paid.bounded_questions, agency_ids: ["ny-dol", "ny-ag"], status: "Initial finding approved after independent and 30 October source checks", limitations: "The lead agency page and governing sources were recaptured on 30 October 2026. Remaining documents are only partially screened. The 2022 FAQ is still linked but visibly older. The 68-page P737 compendium has not been fully reviewed. No actual worker harm was found.", claims_identified_topic_level: paid.coverage.claim_units_identified_in_scope, claims_screened_topic_level: paid.coverage.claim_units_screened_at_least_at_topic_level },
  { id: "unemployment-hearings", title: ui.title, summary: "Hearing-request and appeal deadlines in current unemployment insurance guidance.", scope: ui.scope, legal_questions: ui.legal_questions, agency_ids: ["ny-dol"], status: "Initial finding approved after independent and 30 October source checks", limitations: "Only selected page sections and claims have been checked. The Appeal Board still posts the rule and applied its receipt calculation in a May 2026 decision; its latest official printed NYCRR supplement was not available for direct inspection. No actual lost appeal was found.", claims_identified_topic_level: ui.documents.reduce((n, d) => n + d.status.claims_identified, 0), claims_screened_topic_level: ui.documents.reduce((n, d) => n + d.status.claims_screened, 0) },
];
const agencies = [
  { id: "ny-dol", name: agencyName("ny-dol"), jurisdiction: "New York State", url: "https://dol.ny.gov/" },
  { id: "ny-ag", name: agencyName("ny-ag"), jurisdiction: "New York State", url: "https://ag.ny.gov/" },
];
const ruleUrl = rule => rule.id === "NYCRR-196-1-3" ? "https://dos.ny.gov/system/files/documents/2021/12/122221.pdf" : rule.official_url || rule.official_code_url || rule.official_agency_representation_url || rule.official_urls?.[0] || "";
const rules = [
  ...paid.binding_rules.map(r => ({ id: `psl:${r.id}`, issue_id: "paid-sick-leave", citation: r.citation, url: ruleUrl(r), text: r.operative_summary, exact_text: null, effective_date: r.effective_date || r.effective_dates || null, applicability: r.applicability_and_qualifications, qualifications: r.applicability_and_qualifications, corroboration: r.corroborating_current_agency_source ? [{ label: "Current Workers' Compensation Board confirmation", url: r.corroborating_current_agency_source }] : [] })),
  ...ui.legal_rules.map(r => ({ id: `ui:${r.id}`, issue_id: "unemployment-hearings", citation: r.citation, url: ruleUrl(r), text: r.operative_summary, exact_text: null, effective_date: r.effective_date || null, applicability: r.location || "See linked legal text and source record", qualifications: r.currency_note || "Check party, notice, filing method, and any statutory exception.", corroboration: r.id === "NYCRR-461-1a" ? [{ label: "Appeal Board decision 640066 (May 2026)", url: "https://uiappeals.ny.gov/system/files/documents/2026/05/640066-appeal-decision.pdf" }, { label: "DOL hearing process FAQ", url: "https://dol.ny.gov/hearing-process-frequently-asked-questions" }] : [] })),
];
const sources = [
  ...paid.publications.map(p => ({ id: `psl:${p.id}`, issue_id: "paid-sick-leave", agency_id: agencyId(p.agency), title: p.title, url: p.url, language: "en", publication_date: p.publication_date && p.publication_date !== "not shown" ? p.publication_date : null, accessed_at: paid.capture_date, current_relevance: /older PDF/i.test(p.current_exposure) ? "Residual" : "Active", coverage: "partially_screened", claim_ids: paid.claims.filter(c => c.publication_id === p.id).map(c => `psl:${c.id}`), screen_note: p.screening_extent, capture: null })),
  ...ui.documents.map(d => ({ id: `ui:${d.id}`, issue_id: "unemployment-hearings", agency_id: agencyId(d.publisher), title: d.title, url: d.url, language: d.language, publication_date: d.publication_date || d.updated_date || null, accessed_at: ui.capture_date, current_relevance: "Active", coverage: "partially_screened", claim_ids: ui.claims.filter(c => c.document_id === d.id).map(c => `ui:${c.id}`), screen_note: d.status.processed + "; full document not certified", capture: null })),
];
const outcome = value => value === "no_supported_misrepresentation" ? value : value === "evidence_limitation" ? value : "uncertain_lead";
const grade = value => /^(high|moderate|low)$/i.test(value || "") ? value[0].toUpperCase() + value.slice(1).toLowerCase() : "Pending";
const significance = value => /^(major|moderate|limited)$/i.test(value || "") ? value[0].toUpperCase() + value.slice(1).toLowerCase() : "Pending";
const relevance = value => /^(active|historical|residual)$/i.test(value || "") ? value[0].toUpperCase() + value.slice(1).toLowerCase() : "Uncertain";
const historical = value => ({ outdated_guidance: "Outdated guidance", original_misrepresentation: "Original misrepresentation", historically_accurate: "Historically accurate" }[value] || "Undetermined");
const claims = [
  ...paid.claims.map(c => ({ id: `psl:${c.id}`, issue_id: "paid-sick-leave", source_id: `psl:${c.publication_id}`, rule_ids: c.rule_ids.map(id => `psl:${id}`), exact_quote: c.exact_agency_words, location: c.location, surrounding_context: c.surrounding_context || "Only the recorded excerpt has been checked; read the linked publication for its full context.", outcome: outcome(c.outcome), confidence: grade(c.confidence), significance: significance(c.potential_significance), current_relevance: relevance(c.current_relevance), historical_classification: historical(c.historical_classification), analysis: c.comparison, counterargument: c.strongest_counterargument || "No specific counterargument recorded for this initial negative or unresolved check.", reviewer_outcome: c.review_status || "Independent challenge pending.", example: c.same_facts_example || "", potential_consequence: c.potential_consequence || "Not established for this claim.", documented_consequence: c.documented_consequence || "None established.", limitations: c.limitations || "Initial bounded comparison; source capture and independent review may be outstanding.", independently_reviewed: false, screened_at: c.capture_date || paid.capture_date })),
  ...ui.claims.map(c => ({ id: `ui:${c.id}`, issue_id: "unemployment-hearings", source_id: `ui:${c.document_id}`, rule_ids: (c.rule_ids || []).map(id => `ui:${id}`), exact_quote: c.exact_claim, location: c.location, surrounding_context: c.surrounding_context || "Only the recorded excerpt has been checked; read the linked publication for its full context.", outcome: outcome(c.outcome), confidence: grade(c.confidence), significance: significance(c.potential_significance), current_relevance: relevance(c.current_relevance || "active"), historical_classification: historical(c.historical_classification), analysis: c.comparison, counterargument: c.counterargument || "No specific counterargument recorded for this initial negative or unresolved check.", reviewer_outcome: c.independent_review || "Independent challenge pending.", example: c.same_facts_example || "", potential_consequence: c.potential_consequence || "Not established for this claim.", documented_consequence: "None established.", limitations: "Initial bounded comparison; regulation currency and independent review may be outstanding.", independently_reviewed: false, screened_at: ui.capture_date })),
];
const reviewed = new Map(claims.map(c => [c.id, c]));
const pslCandidate = reviewed.get("psl:PSL-COVID-001");
Object.assign(pslCandidate, {
  outcome: "supported_misrepresentation", confidence: "High", significance: "Major", independently_reviewed: true,
  reviewer_outcome: "Independent reviewer verified the DOL sentence, signed sunset, WCB confirmation, and surviving ordinary sick leave. The source set was recaptured on 30 October 2026 before initial publication.",
  surrounding_context: "The surrounding DOL paragraph discusses mandatory or precautionary COVID quarantine/isolation orders and links special COVID Paid Sick Leave fact sheets.",
  example: "A covered worker receives a new COVID isolation order in October 2026 after using available ordinary sick leave, and expects extra quarantine leave under the 2020 act. That special statutory entitlement expired in July 2025; other leave depends on separate facts.",
  limitations: "DOL's original posting date is unknown. The current source and law were recaptured on 30 October 2026. No actual worker reliance or loss is documented. Other protections are not categorically assessed.",
  potential_consequence: "A worker may plan around extra quarantine leave that the 2020 act no longer provides, potentially delaying a request for other available leave or benefits. No reliance has been documented.",
});
const uiCandidate = reviewed.get("ui:UI-01");
Object.assign(uiCandidate, {
  outcome: "supported_misrepresentation", confidence: "High", significance: "Major", independently_reviewed: true,
  rule_ids: ["ui:NYCRR-461-1a", "ui:LAB-620-1a"],
  reviewer_outcome: "Independent reviewer confirmed the restrictive DOL wording, Appeal Board postmark/receipt rule, current DOL FAQ, and May 2026 Board application. The claim, rule PDF, statute, and decision were recaptured on 30 October 2026. No conflicting later rule was located; the latest official printed supplement was not directly inspected.",
  surrounding_context: "The Contact page places this categorical statement directly above an address for mailing a hearing request; it does not describe the postmark or receipt presumption there.",
  example: "A determination is received five business days after mailing. A claimant posts a signed hearing request 29 calendar days after receipt; DOL receives it four days later. The cited rule treats the postmark as timely, subject to contrary receipt proof and filing qualifications.",
  limitations: "The Appeal Board's posted rule PDF carries a 2020 internal revision date. The Board applied the receipt calculation in May 2026, but the latest official printed supplement was not available for direct inspection. No notice exemplar or actual lost appeal is documented.",
});
const uiRelated = reviewed.get("ui:UI-02");
Object.assign(uiRelated, {
  outcome: "supported_misrepresentation", confidence: "High", independently_reviewed: true,
  reviewer_outcome: "A five-claim independent sample escalated this from a negative check; it belongs to the same hearing-deadline cluster as UI-01, not a second finding.",
  analysis: "The categorical instruction measures 30 days from the notice date, while the Appeal Board's posted rule measures timely postmark from the party's receipt. This is grouped with UI-01 as one deadline issue, not a second finding.",
});
for (const id of ["psl:PSL-BASE-002", "psl:PSL-BASE-005", "psl:PSL-BASE-008", "ui:UI-05"]) {
  const c = reviewed.get(id);
  Object.assign(c, { independently_reviewed: true, reviewer_outcome: "Independent sample rechecked the source and cited rule; initial negative outcome provisionally upheld." });
}
const evidencePath = file => join(root, "research/legal-misrepresentation/evidence", file);
const digest = file => createHash("sha256").update(readFileSync(evidencePath(file))).digest("hex");
const capture = (file, image = null) => ({ file: `research/legal-misrepresentation/evidence/${file}`, sha256: digest(file), captured_at: "2026-10-30", kind: "raw official HTTP response HTML", image, image_sha256: image ? digest(image) : null });
sources.find(s => s.id === "psl:DOL-FARE-COVID").capture = capture("psl-covid-dol-fare-2026-10-30.raw.html", "psl-covid-dol-fare-2026-10-30.png");
sources.find(s => s.id === "ui:DOL-UI-CONTACT").capture = capture("ui-hearing-dol-contact-2026-10-30.raw.html", "ui-hearing-dol-contact-2026-10-30.png");
sources.find(s => s.id === "ui:DOL-UI-TOP-FAQ").capture = capture("ui-hearing-dol-top-faq-2026-10-30.raw.html");
for (const id of ["psl:DOL-FARE-COVID", "ui:DOL-UI-CONTACT", "ui:DOL-UI-TOP-FAQ"]) sources.find(s => s.id === id).accessed_at = "2026-10-30";
for (const id of ["psl:PSL-COVID-001", "ui:UI-01", "ui:UI-02"]) reviewed.get(id).screened_at = "2026-10-30";
rules.find(r => r.id === "psl:COVID-SUNSET").exact_text = "shall expire and be deemed repealed July 31, 2025";
rules.find(r => r.id === "psl:LAB-196B").exact_text = "Every employer shall be required to provide its employees with sick leave as follows:";
rules.find(r => r.id === "ui:NYCRR-461-1a").exact_text = "A request for a hearing shall be timely if it is postmarked within 30 days of the party's receipt of the determination";
rules.find(r => r.id === "ui:LAB-620-1a").exact_text = "within thirty days after the mailing or personal delivery of notice of such determination, request a hearing";
rules.find(r => r.id === "ui:NYCRR-461-1a").effective_date = "Exact amendment effective date not established; Appeal Board-hosted rule and a May 2026 Board application rechecked 2026-10-30.";
rules.find(r => r.id === "ui:LAB-620-1a").effective_date = "Current statutory text rechecked 2026-10-30; latest revision date shown by NY Senate: 2014-09-22.";
rules.find(r => r.id === "ui:NYCRR-461-1a").qualifications = "The Appeal Board still posts this rule and applied its receipt calculation in a May 2026 decision. The latest official printed NYCRR supplement was not available for direct inspection. A targeted search found no later conflicting adoption; this is not an exhaustive State Register audit. Confirm the party, notice, filing method, and any applicable exception.";
const findings = [
  { id: "special-covid-leave-sunset", title: "Expired special COVID leave described as ongoing", claim_id: "psl:PSL-COVID-001", related_claim_ids: ["psl:PSL-COVID-002", "psl:PSL-COVID-003", "psl:PSL-COVID-004"], publication_status: "approved", review_date: "2026-10-30", correction_status: "DOL FARE page still displayed the claim when recaptured on 30 October 2026; WCB separately explains the expiration. No correction or withdrawal of this DOL page was verified." },
  { id: "unemployment-hearing-deadline", title: "Hearing request said to require receipt by day 30", claim_id: "ui:UI-01", related_claim_ids: ["ui:UI-02"], publication_status: "approved", review_date: "2026-10-30", correction_status: "DOL Contact page still displayed the claim when recaptured on 30 October 2026; DOL's hearing FAQ gives more complete filing guidance. No correction or withdrawal of this contact-page statement was verified." },
];
const publicData = {
  as_of: "2026-10-30", stage: "Initial published research", notice: "Two bounded issue sweeps produced two independently reviewed, high-confidence findings. Coverage remains partial; each case states its legal qualifications and evidence limits.",
  issues, agencies, sources, rules, claims, findings,
  audit: { method: "From 15 recorded negative claims, an independent reviewer selected every third ID after lexical sorting, beginning at position two. Five were checked; one was escalated into the existing deadline issue.", sampled_claim_ids: ["psl:PSL-BASE-002", "psl:PSL-BASE-005", "psl:PSL-BASE-008", "ui:UI-02", "ui:UI-05"], limitations: "This is a small systematic sample of recorded negative claims, not a sample of all unextracted text; no overall error-detection rate is claimed." },
};
writeFileSync(join(root, "src/data/legal-research.json"), JSON.stringify(publicData, null, 2) + "\n");
console.log(`Projected ${issues.length} issues, ${sources.length} sources, ${claims.length} claims, ${publicData.findings.filter(f => f.publication_status === "approved").length} approved findings.`);
