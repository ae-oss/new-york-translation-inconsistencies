import raw from "@/data/legal-research.json";

export type Outcome = "supported_misrepresentation" | "uncertain_lead" | "no_supported_misrepresentation" | "evidence_limitation";
export type Coverage = "discovered" | "retrieved" | "processed" | "partially_screened" | "fully_screened";
export type Source = {
  id: string; issue_id: string; agency_id: string; title: string; url: string; language: string;
  publication_date: string | null; accessed_at: string; current_relevance: "Active" | "Historical" | "Residual" | "Uncertain";
  coverage: Coverage; claim_ids: string[]; screen_note: string; capture: { file: string; sha256: string; captured_at: string; kind: string; image: string | null; image_sha256: string | null } | null;
};
export type Rule = { id: string; issue_id: string; citation: string; url: string; text: string; exact_text: string | null; effective_date: string | null; applicability: string; qualifications: string; corroboration: { label: string; url: string }[] };
export type Claim = {
  id: string; issue_id: string; source_id: string; rule_ids: string[]; exact_quote: string; location: string;
  surrounding_context: string; outcome: Outcome; confidence: "High" | "Moderate" | "Low" | "Pending";
  significance: "Major" | "Moderate" | "Limited" | "Pending"; current_relevance: "Active" | "Historical" | "Residual" | "Uncertain";
  historical_classification: "Original misrepresentation" | "Outdated guidance" | "Historically accurate" | "Undetermined";
  analysis: string; counterargument: string; reviewer_outcome: string; example: string;
  potential_consequence: string; documented_consequence: string; limitations: string;
  independently_reviewed: boolean; screened_at: string;
};
export type Issue = { id: string; title: string; summary: string; scope: string; legal_questions: string[]; agency_ids: string[]; status: string; limitations: string; claims_identified_topic_level: number; claims_screened_topic_level: number };
export type Agency = { id: string; name: string; jurisdiction: string; url: string };
export type Finding = { id: string; title: string; claim_id: string; related_claim_ids: string[]; publication_status: "preview_review" | "approved"; review_date: string | null; correction_status: string };
export type LegalResearch = {
  as_of: string; stage: string; notice: string; issues: Issue[]; agencies: Agency[]; sources: Source[]; rules: Rule[]; claims: Claim[]; findings: Finding[];
  audit: { method: string; sampled_claim_ids: string[]; limitations: string };
};
export const legal = raw as unknown as LegalResearch;
export const sourceFor = (claim: Claim) => legal.sources.find(s => s.id === claim.source_id);
export const rulesFor = (claim: Claim) => claim.rule_ids.map(id => legal.rules.find(r => r.id === id)).filter((rule): rule is Rule => Boolean(rule));
export const claimFor = (finding: Finding) => legal.claims.find(c => c.id === finding.claim_id);
export const agencyFor = (source: Source) => legal.agencies.find(a => a.id === source.agency_id);
export const issueFor = (source: Source) => legal.issues.find(i => i.id === source.issue_id);
export function coverage() {
  return {
    issues: legal.issues.length,
    questions: legal.issues.reduce((n, i) => n + i.legal_questions.length, 0),
    topicIdentified: legal.issues.reduce((n, i) => n + i.claims_identified_topic_level, 0),
    topicScreened: legal.issues.reduce((n, i) => n + i.claims_screened_topic_level, 0),
    agencies: new Set(legal.sources.map(s => s.agency_id)).size,
    sources: legal.sources.length,
    retrieved: legal.sources.filter(s => s.coverage !== "discovered").length,
    processed: legal.sources.filter(s => !["discovered", "retrieved"].includes(s.coverage)).length,
    screenedDocuments: legal.sources.filter(s => ["partially_screened", "fully_screened"].includes(s.coverage)).length,
    fullyScreened: legal.sources.filter(s => s.coverage === "fully_screened").length,
    claims: legal.claims.length,
    reviewed: legal.claims.filter(c => c.independently_reviewed).length,
    supported: legal.claims.filter(c => c.outcome === "supported_misrepresentation").length,
    supportedClusters: legal.findings.filter(f => claimFor(f)?.outcome === "supported_misrepresentation").length,
    uncertain: legal.claims.filter(c => c.outcome === "uncertain_lead").length,
    negative: legal.claims.filter(c => c.outcome === "no_supported_misrepresentation").length,
    limited: legal.claims.filter(c => c.outcome === "evidence_limitation").length,
    published: legal.findings.filter(f => f.publication_status === "approved").length,
    previewDossiers: legal.findings.filter(f => f.publication_status === "preview_review").length,
    activeSources: legal.sources.filter(s => s.current_relevance === "Active").length,
    residualSources: legal.sources.filter(s => s.current_relevance === "Residual").length,
    historicalSources: legal.sources.filter(s => s.current_relevance === "Historical").length,
    languages: [...new Set(legal.sources.map(s => s.language))],
  };
}
