"use client";

import { useMemo, useState } from "react";
import type { Finding } from "@/lib/research";
import { languages } from "@/lib/research";

export function FindingList({ findings }: { findings: Finding[] }) {
  const [language, setLanguage] = useState("All languages");
  const [query, setQuery] = useState("");
  const visible = useMemo(() => findings.filter((finding) => {
    if (language !== "All languages" && finding.language !== language) return false;
    const q = query.trim().toLocaleLowerCase();
    return !q || `${finding.title} ${finding.difference}`.toLocaleLowerCase().includes(q);
  }), [findings, language, query]);
  return <>
    <div className="filters finding-filters">
      <label>Target language<select value={language} onChange={(event) => setLanguage(event.target.value)}>{languages.map((value) => <option key={value}>{value}</option>)}</select></label>
      <label>Search findings<input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Topic or wording" /></label>
    </div>
    <p className="result-count" aria-live="polite">{visible.length} approved {visible.length === 1 ? "finding" : "findings"} shown</p>
    {visible.length === 0 && <div className="empty-state"><h2>{findings.length === 0 ? "Screening and independent review are in progress" : "No findings match these filters"}</h2><p>{findings.length === 0 ? "No finding has passed the publication gate. Candidate contrasts and rejected leads stay in the separate research record until source checks, legal analysis, independent review, and approval are complete." : "Try another language or search term."}</p></div>}
    {visible.map((finding) => <article className="finding-card" key={finding.id}>
      <div className="eyebrow">{finding.language_designation} · {finding.significance} potential · {finding.confidence}</div>
      <h2>{finding.title}</h2>
      <div className="quote-grid">
        <section><h3>Official English</h3><blockquote lang={finding.original_quote.lang}>{finding.original_quote.text}</blockquote><a href={finding.original_quote.url} target="_blank" rel="noreferrer">{finding.original_quote.anchor} ↗</a></section>
        <section><h3>Government translation</h3><blockquote lang={finding.translated_quote.lang} dir={finding.translated_quote.dir}>{finding.translated_quote.text}</blockquote><a href={finding.translated_quote.url} target="_blank" rel="noreferrer">{finding.translated_quote.anchor} ↗</a></section>
      </div>
      <p><strong>Faithful English rendering of the translation:</strong> {finding.faithful_english}</p>
      <h3>Difference in meaning</h3><p>{finding.difference}</p>
      <h3>Same-facts example</h3><p>{finding.same_facts_example}</p>
      <h3>Strongest equivalent reading</h3><p>{finding.counterargument}</p><p><strong>Assessment:</strong> {finding.response}</p>
      <div className="finding-assessment"><div><h3>Potential consequence</h3><p>{finding.potential_consequence}</p></div><div><h3>Documented consequence</h3><p>{finding.documented_consequence}</p></div></div>
      <details><summary>Review, authority, and coverage</summary><p><strong>Independent review:</strong> {finding.independent_review}</p><p><strong>Captured official PDF hashes:</strong> English <code>{finding.captured_source_sha256.english}</code>; {finding.language} <code>{finding.captured_source_sha256.target}</code>. These identify the checked files, not future changes at the source URLs.</p><p><strong>Authority:</strong> {finding.authority_note}</p><ul>{finding.authorities.map((source) => <li key={source.url}><a href={source.url} target="_blank" rel="noreferrer">{source.label} ↗</a></li>)}</ul><p><strong>Case-law search:</strong> {finding.case_law_status}</p><p><strong>Coverage:</strong> {finding.coverage_note}</p><p><strong>Current relevance:</strong> {finding.current_relevance}</p><p><strong>Publication approval:</strong> {finding.approval_date}</p></details>
    </article>)}
  </>;
}
