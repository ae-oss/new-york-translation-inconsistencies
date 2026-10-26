import fs from "node:fs";

const data = JSON.parse(fs.readFileSync(new URL("../src/data/public-research.json", import.meta.url), "utf8"));
const ids = new Set();
const pairIds = new Set();
const sourceById = new Map();
const pairById = new Map();
const findingIds = new Set();
const languages = new Set(["Spanish","Chinese","Russian","Yiddish","Bengali","Korean","Haitian Creole","Italian","Arabic","Polish","French","Urdu"]);
if (!Array.isArray(data.documents) || !Array.isArray(data.findings)) throw new Error("Missing documents or findings");
for (const doc of data.documents) {
  if (!doc.id || ids.has(doc.id)) throw new Error("Missing/duplicate source ID");
  ids.add(doc.id);
  sourceById.set(doc.id, doc);
  if (!doc.english?.url?.startsWith("https://")) throw new Error(`Invalid English source URL: ${doc.id}`);
  for (const pair of doc.translations) {
    if (!pair.id || pairIds.has(pair.id)) throw new Error("Missing/duplicate comparison ID");
    pairIds.add(pair.id);
    pairById.set(pair.id, { doc, pair });
    if (!languages.has(pair.language)) throw new Error(`Unknown target language: ${pair.language}`);
    if (!pair.url?.startsWith("https://")) throw new Error(`Invalid translation URL: ${pair.id}`);
    if (pair.status === "located_not_verified" && (pair.targeted_units !== 0 || pair.valid_targeted_comparison)) throw new Error(`Lead incorrectly counted as examined: ${pair.id}`);
    if (!Number.isInteger(pair.targeted_units) || pair.targeted_units < 0 || pair.valid_targeted_comparison !== (pair.targeted_units > 0)) throw new Error(`Inconsistent targeted coverage: ${pair.id}`);
  }
}
for (const finding of data.findings) {
  if (!finding.id || findingIds.has(finding.id)) throw new Error(`Missing/duplicate finding ID: ${finding.id}`);
  findingIds.add(finding.id);
  if (finding.publication_status !== "approved_supported") throw new Error(`Unapproved finding in public data: ${finding.id}`);
  if (!pairIds.has(finding.comparison_id) || !ids.has(finding.document_id)) throw new Error(`Unknown source/comparison for finding: ${finding.id}`);
  const { doc, pair } = pairById.get(finding.comparison_id);
  if (doc.id !== finding.document_id || !pair.valid_targeted_comparison || pair.language !== finding.language || pair.code !== finding.language_code) throw new Error(`Finding does not match examined pair: ${finding.id}`);
  for (const key of ["approval_date","title","language","language_code","language_designation","faithful_english","difference","significance","confidence","same_facts_example","counterargument","response","potential_consequence","documented_consequence","independent_review","authority_note","case_law_status","coverage_note","current_relevance"]) {
    if (!finding[key]) throw new Error(`Missing ${key} in finding: ${finding.id}`);
  }
  if (!["Major","Moderate","Limited"].includes(finding.significance)) throw new Error(`Invalid significance: ${finding.id}`);
  for (const key of ["original_quote","translated_quote"]) {
    const quote = finding[key];
    if (!quote?.text || !quote?.lang || !quote?.anchor || !quote?.url?.startsWith("https://")) throw new Error(`Incomplete ${key}: ${finding.id}`);
  }
  if (finding.original_quote.url !== sourceById.get(finding.document_id).english.url || finding.translated_quote.url !== pair.url) throw new Error(`Finding quotation links do not match source pair: ${finding.id}`);
  if (!["ltr","rtl"].includes(finding.translated_quote.dir)) throw new Error(`Invalid quotation direction: ${finding.id}`);
  if (!Array.isArray(finding.authorities) || !finding.authorities.length || finding.authorities.some((source) => !source.label || !source.url?.startsWith("https://"))) throw new Error(`Invalid authorities: ${finding.id}`);
  if (!/^[a-f0-9]{64}$/.test(finding.captured_source_sha256?.english ?? "") || !/^[a-f0-9]{64}$/.test(finding.captured_source_sha256?.target ?? "")) throw new Error(`Missing captured-source hash: ${finding.id}`);
}
console.log(`Validated ${ids.size} distinct English sources, ${pairIds.size} translation links, ${data.findings.length} approved findings.`);
