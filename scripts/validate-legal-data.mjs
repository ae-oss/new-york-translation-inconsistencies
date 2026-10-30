import { readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const data = JSON.parse(readFileSync(join(root, "src/data/legal-research.json"), "utf8"));
const errors = [];
const byId = (rows, label) => {
  const ids = new Set();
  for (const row of rows) {
    if (!row.id || ids.has(row.id)) errors.push(`${label}: duplicate or missing id ${row.id}`);
    ids.add(row.id);
  }
  return new Map(rows.map(row => [row.id, row]));
};
const issues = byId(data.issues, "issue"), agencies = byId(data.agencies, "agency"), sources = byId(data.sources, "source"), rules = byId(data.rules, "rule"), claims = byId(data.claims, "claim");
byId(data.findings, "finding");
for (const source of data.sources) {
  if (!issues.has(source.issue_id) || !agencies.has(source.agency_id)) errors.push(`source ${source.id}: broken issue or agency link`);
  if (!/^https:\/\//.test(source.url)) errors.push(`source ${source.id}: no HTTPS government source URL`);
  for (const claimId of source.claim_ids) if (!claims.has(claimId)) errors.push(`source ${source.id}: missing claim ${claimId}`);
  if (source.capture) {
    try {
      const bytes = readFileSync(join(root, source.capture.file));
      if (createHash("sha256").update(bytes).digest("hex") !== source.capture.sha256) errors.push(`source ${source.id}: capture hash mismatch`);
      if (source.capture.image) {
        const image = readFileSync(join(root, "public/evidence", source.capture.image));
        if (createHash("sha256").update(image).digest("hex") !== source.capture.image_sha256) errors.push(`source ${source.id}: screenshot hash mismatch`);
      }
    } catch { errors.push(`source ${source.id}: capture file missing`); }
  }
}
for (const rule of data.rules) {
  if (!issues.has(rule.issue_id) || !rule.citation || !/^https:\/\//.test(rule.url)) errors.push(`rule ${rule.id}: missing issue, citation, or source URL`);
  for (const item of rule.corroboration) if (!item.label || !/^https:\/\//.test(item.url)) errors.push(`rule ${rule.id}: invalid corroborating source`);
}
for (const claim of data.claims) {
  const source = sources.get(claim.source_id);
  if (!source || source.issue_id !== claim.issue_id) errors.push(`claim ${claim.id}: source does not match issue`);
  if (!source?.claim_ids.includes(claim.id)) errors.push(`claim ${claim.id}: source omits claim id`);
  if (!claim.exact_quote || !claim.location || !claim.analysis) errors.push(`claim ${claim.id}: incomplete source comparison`);
  for (const ruleId of claim.rule_ids) if (!rules.has(ruleId)) errors.push(`claim ${claim.id}: missing binding rule ${ruleId}`);
  if (claim.outcome === "supported_misrepresentation" && (!claim.independently_reviewed || claim.confidence !== "High")) errors.push(`claim ${claim.id}: supported without high-confidence independent review`);
}
for (const finding of data.findings) {
  const claim = claims.get(finding.claim_id), source = sources.get(claim?.source_id);
  if (!finding.title) errors.push(`finding ${finding.id}: missing title`);
  if (!claim || !claim.independently_reviewed || !source?.capture) errors.push(`finding ${finding.id}: preview lacks independent review or source capture`);
  for (const relatedId of finding.related_claim_ids) if (!claims.has(relatedId)) errors.push(`finding ${finding.id}: missing related claim ${relatedId}`);
  if (finding.publication_status === "approved" && (claim?.outcome !== "supported_misrepresentation" || claim?.confidence !== "High" || !claim.rule_ids.every(id => rules.get(id)?.exact_text) || !finding.review_date)) errors.push(`finding ${finding.id}: approved without supported high-confidence claim, exact law text, or review date`);
}
if (errors.length) { console.error(errors.join("\n")); process.exitCode = 1; }
else console.log(`Validated ${data.issues.length} issues, ${data.sources.length} sources, ${data.claims.length} claims, ${data.findings.filter(f => f.publication_status === "approved").length} approved findings.`);
