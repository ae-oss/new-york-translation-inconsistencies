import { languages, research, stats } from "@/lib/research";

export default function Statistics() {
  const s = stats();
  const translations = research.documents.flatMap((doc) => doc.translations);
  const rows = languages.slice(1).map((language) => {
    const pairs = translations.filter((pair) => pair.language === language);
    return {
      language,
      links: pairs.length,
      sources: new Set(research.documents.filter((doc) => doc.translations.some((pair) => pair.language === language)).map((doc) => doc.id)).size,
      cleared: pairs.filter((pair) => ["eligible_bounded", "edition_cleared_targeted"].includes(pair.status)).length,
      valid: pairs.filter((pair) => pair.valid_targeted_comparison).length,
      units: pairs.reduce((n, pair) => n + pair.targeted_units, 0),
      findings: research.findings.filter((finding) => finding.language === language).length,
    };
  });
  return <main className="container main">
    <div className="page-heading"><div className="eyebrow">Historical translation coverage · separate from legal misrepresentation</div><h1>Statistics and coverage</h1><p>These counts distinguish source documents, translation links, source clearance, and completed targeted comparison.</p></div>
    <div className="stat-strip">
      <div><strong>{s.documents}</strong><span>unique English sources</span></div>
      <div><strong>{s.locatedLinks}</strong><span>translation links</span></div>
      <div><strong>{s.sourceClearedPairs}</strong><span>edition-cleared pairs</span></div>
      <div><strong>{s.examinedUnits}</strong><span>source-cleared units examined</span></div>
    </div>
    <p className="mobile-table-hint">Scroll the table sideways to see all coverage columns.</p>
    <div className="table-wrap"><table>
      <caption>Coverage by target language as of {research.as_of}</caption>
      <thead><tr><th>Language</th><th>English sources with link</th><th>Translation links recorded</th><th>Edition-cleared pairs</th><th>Pairs with valid targeted comparison</th><th>Targeted units examined</th><th>Approved findings</th></tr></thead>
      <tbody>{rows.map((row) => <tr key={row.language}><th scope="row">{row.language}</th><td>{row.sources}</td><td>{row.links}</td><td>{row.cleared}</td><td>{row.valid}</td><td>{row.units}</td><td>{row.findings}</td></tr>)}</tbody>
    </table></div>
    <p className="note">The Spanish pilot had 8 pairs eligible at its initial gate, 3 conditional pairs, and 1 excluded edition mismatch. Two conditional pairs contributed one aligned targeted unit each, yielding 10 pairs with valid targeted coverage. The second round opened 30 further English sources. The launch review added three edition-cleared language pairs and seven bounded examined units. Across all rounds, 23 pairs have 48 valid targeted units. One provisional Chinese contrast, one uncertain Polish lead, and rejected or source-limited candidates are excluded from the approved finding count. No whole-document screening or overall error-detection rate is claimed.</p>
  </main>;
}
