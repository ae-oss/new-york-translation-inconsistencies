import Link from "next/link";
import { notFound } from "next/navigation";
import { research, statusLabels } from "@/lib/research";

export const dynamicParams = false;

export function generateStaticParams() {
  return research.documents.map((doc) => ({ slug: doc.id.replace(/^ny-source:/, "") }));
}

export default async function DocumentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const doc = research.documents.find((candidate) => candidate.id === `ny-source:${slug}`);
  if (!doc) notFound();
  return <main className="main reader-page">
    <div className="reader-heading">
      <Link href="/government-guidance/">← Change document</Link>
      <div><div className="eyebrow">Historical translation research · {doc.category.replaceAll("_", " ")} · {doc.issuer}</div><h1>{doc.title}</h1><p>{doc.research_stage === "pilot" ? "Pilot source" : "Second-round English source inventory"}{doc.english.revision_marker ? ` · English edition ${doc.english.revision_marker}` : ""}</p></div>
    </div>
    <div className="reader-grid">
      <section className="reader-panel"><div className="reader-tab">English source</div><div className="reader-body">
        <h2>Official English publication</h2><p>This research record identifies the publisher document. It does not reproduce the full PDF or claim that every passage has been screened.</p>
        <dl><dt>Issuer</dt><dd>{doc.issuer}</dd><dt>PDF pages observed</dt><dd>{doc.english.pdf_pages ?? "Not recorded"}</dd><dt>Printed English edition marker</dt><dd>{doc.english.revision_marker ?? "Not recorded in the research inventory"}</dd></dl>
        {!doc.english.revision_marker && <p className="muted">This field records an edition code or date found on the document. A blank inventory field does not mean the publication is unofficial or lacks a current version.</p>}
        <a className="action-link" href={doc.english.url} target="_blank" rel="noreferrer">Open original publication ↗</a>
      </div></section>
      <section className="reader-panel"><div className="reader-tab">Translations and review</div><div className="reader-body">
        <h2>Language pairs</h2><p>Coverage is reported per language. No paired quotations or findings are approved for publication yet.</p>
        {doc.translations.length === 0 && <div className="empty-state">No document-specific translated publication has been verified for this source.</div>}
        {doc.translations.map((pair) => <article className="reader-translation" key={pair.id}>
          <h3>{pair.language}</h3><p className="muted">{statusLabels[pair.status] ?? pair.status}</p>
          {pair.language_designation !== pair.language && <p>Publisher designation: {pair.language_designation}</p>}
          {pair.script_variety_note && <p className="muted">{pair.script_variety_note}</p>}
          {pair.target_edition_marker && <p>Printed translation edition marker: {pair.target_edition_marker}</p>}
          {pair.status === "excluded_edition_mismatch" && doc.english.revision_marker && pair.target_edition_marker && <p className="muted">The printed English and translation editions differ, so this pair is excluded from meaning findings.</p>}
          <p>{pair.valid_targeted_comparison ? `${pair.targeted_units} targeted meaning units examined` : "No valid meaning comparison claimed"}</p>
          <a href={pair.url} target="_blank" rel="noreferrer">Open official translation ↗</a>
        </article>)}
        {doc.translation_directory && <p><a href={doc.translation_directory} target="_blank" rel="noreferrer">Open publisher translation directory ↗</a></p>}
      </div></section>
    </div>
  </main>;
}
