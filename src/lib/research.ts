import data from "@/data/public-research.json";

export type Translation = {
  id: string;
  language: string;
  code: string;
  url: string;
  status: string;
  targeted_units: number;
  valid_targeted_comparison: boolean;
  target_edition_marker: string | null;
  language_designation: string;
  script_variety_note: string | null;
};
export type Document = {
  id: string;
  title: string;
  issuer: string;
  category: string;
  english: { url: string; pdf_pages: number | null; revision_marker: string | null };
  translations: Translation[];
  research_stage: "pilot" | "round2_english_inventory";
  translation_directory: string | null;
};
export type ResearchData = {
  as_of: string;
  scope: string;
  notice: string;
  documents: Document[];
  findings: Finding[];
};
export type Finding = {
  id: string;
  publication_status: "approved_supported";
  approval_date: string;
  comparison_id: string;
  document_id: string;
  title: string;
  language: string;
  language_code: string;
  language_designation: string;
  original_quote: { text: string; lang: string; anchor: string; url: string };
  translated_quote: { text: string; lang: string; anchor: string; url: string; dir: "ltr" | "rtl" };
  faithful_english: string;
  difference: string;
  significance: "Major" | "Moderate" | "Limited";
  confidence: string;
  same_facts_example: string;
  counterargument: string;
  response: string;
  potential_consequence: string;
  documented_consequence: string;
  independent_review: string;
  captured_source_sha256: { english: string; target: string };
  authority_note: string;
  authorities: { label: string; url: string }[];
  case_law_status: string;
  coverage_note: string;
  current_relevance: string;
};
export const research = data as unknown as ResearchData;

export const languages = [
  "All languages", "Spanish", "Chinese", "Russian", "Yiddish", "Bengali",
  "Korean", "Haitian Creole", "Italian", "Arabic", "Polish", "French", "Urdu",
] as const;

export const statusLabels: Record<string, string> = {
  eligible_bounded: "Eligible for bounded comparison",
  conditional_local_alignment: "Conditional passage alignment",
  excluded_edition_mismatch: "Edition mismatch; excluded",
  located_not_verified: "Located; pair not verified",
  edition_cleared_targeted: "Edition cleared for targeted comparison",
  english_opened_target_opened_edition_pending: "Both publications opened; edition alignment pending",
};

export function stats() {
  const translations = research.documents.flatMap((doc) => doc.translations);
  return {
    documents: research.documents.length,
    locatedLinks: translations.length,
    sourceClearedPairs: translations.filter((pair) => ["eligible_bounded", "edition_cleared_targeted"].includes(pair.status)).length,
    validTargetedPairs: translations.filter((pair) => pair.valid_targeted_comparison).length,
    examinedUnits: translations.reduce((n, pair) => n + pair.targeted_units, 0),
    findings: research.findings.length,
  };
}
