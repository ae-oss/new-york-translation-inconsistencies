import { research, statusLabels } from "@/lib/research";

export default function Sources() {
  return <main className="container main"><div className="page-heading"><div className="eyebrow">Publisher records</div><h1>Sources</h1><p>Official source URLs and pilot validation decisions, recorded {research.as_of}. The publisher may replace a file at the same URL.</p></div>
    <div className="source-list">{research.documents.map((doc) => <section key={doc.id}>
      <h2>{doc.title}</h2><p className="muted">{doc.issuer} · {doc.category.replaceAll("_", " ")} · {doc.research_stage === "pilot" ? "Pilot" : "Second-round English inventory"} · {doc.id}</p>
      <p><a href={doc.english.url} target="_blank" rel="noreferrer">English publication ↗</a></p>
      {doc.translation_directory && <p><a href={doc.translation_directory} target="_blank" rel="noreferrer">Official translation directory ↗</a> <span className="muted">(individual document translations require verification)</span></p>}
      {doc.translations.length === 0 && <p className="muted">No document-specific translation link recorded in this projection.</p>}
      <ul>{doc.translations.map((pair) => <li key={pair.id}><a href={pair.url} target="_blank" rel="noreferrer">{pair.language} publication ↗</a> <span className="muted">— {statusLabels[pair.status] ?? pair.status}</span></li>)}</ul>
    </section>)}</div>
  </main>;
}
