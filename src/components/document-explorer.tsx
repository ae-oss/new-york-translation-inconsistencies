"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { Document } from "@/lib/research";
import { languages, statusLabels } from "@/lib/research";

const statusOrder: Record<string, number> = {
  eligible_bounded: 0,
  edition_cleared_targeted: 0,
  conditional_local_alignment: 1,
  english_opened_target_opened_edition_pending: 1,
  excluded_edition_mismatch: 2,
  located_not_verified: 3,
};

export function DocumentExplorer({ documents }: { documents: Document[] }) {
  const [language, setLanguage] = useState("All languages");
  const [agency, setAgency] = useState("All agencies");
  const [query, setQuery] = useState("");
  const agencies = useMemo(() => ["All agencies", ...new Set(documents.map((doc) => doc.issuer))], [documents]);
  const filtered = useMemo(() => documents.filter((doc) => {
    if (agency !== "All agencies" && agency !== doc.issuer) return false;
    if (language !== "All languages" && !doc.translations.some((pair) => pair.language === language)) return false;
    const q = query.trim().toLocaleLowerCase();
    return !q || `${doc.title} ${doc.issuer} ${doc.category}`.toLocaleLowerCase().includes(q);
  }), [agency, documents, language, query]);
  return <>
    <div className="filters" aria-label="Document filters">
      <label>Target language<select value={language} onChange={(event) => setLanguage(event.target.value)}>{languages.map((value) => <option key={value}>{value}</option>)}</select></label>
      <label>Issuing agency<select value={agency} onChange={(event) => setAgency(event.target.value)}>{agencies.map((value) => <option key={value}>{value}</option>)}</select></label>
      <label>Search documents<input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Title or agency" /></label>
    </div>
    <p className="result-count" aria-live="polite">{filtered.length} unique English source {filtered.length === 1 ? "document" : "documents"} shown</p>
    <div className="document-list">
      {filtered.map((doc) => {
        const pairs = doc.translations.filter((pair) => language === "All languages" || pair.language === language).sort((a, b) => (statusOrder[a.status] ?? 9) - (statusOrder[b.status] ?? 9));
        return <article className="document-row" key={doc.id}>
          <div>
            <div className="eyebrow">{doc.category.replaceAll("_", " ")} · {doc.issuer}</div>
            <h2><Link className="document-title-link" href={`/government-guidance/${doc.id.replace(/^ny-source:/, "")}/`}>{doc.title}</Link></h2>
            <p className="muted">{doc.research_stage === "pilot" ? "Pilot" : "Second-round inventory"} · English source · {doc.english.pdf_pages ?? "?"} PDF pages{doc.english.revision_marker ? ` · Edition ${doc.english.revision_marker}` : ""}</p>
            <a className="source-link" href={doc.english.url} target="_blank" rel="noreferrer">Open official English document ↗</a>
          </div>
          <div className="translation-list">
            <h3>{pairs.length} document-specific {pairs.length === 1 ? "translation link" : "translation links"} recorded</h3>
            {pairs.length === 0 && <p className="muted">No individual target pair has been verified for this source.</p>}
            {doc.translation_directory && <p><a className="source-link" href={doc.translation_directory} target="_blank" rel="noreferrer">Official translation directory ↗</a></p>}
            {pairs.map((pair) => <div className="translation-item" key={pair.id}>
              <div><strong>{pair.language}</strong><span className="status">{statusLabels[pair.status] ?? pair.status}</span></div>
              {pair.language_designation && pair.language_designation !== pair.language && <p>Publisher designation: {pair.language_designation}</p>}
              <p>{pair.valid_targeted_comparison ? `${pair.targeted_units} targeted unit${pair.targeted_units === 1 ? "" : "s"} examined` : "No valid comparison coverage claimed"}</p>
              <a href={pair.url} target="_blank" rel="noreferrer">Official translation ↗</a>
            </div>)}
          </div>
        </article>;
      })}
      {filtered.length === 0 && <p className="empty-state">No source documents match those filters.</p>}
    </div>
  </>;
}
