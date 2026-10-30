import Link from "next/link";
import { claimFor, legal, sourceFor } from "@/lib/legal-research";

const labels: Record<string, string> = {
  supported_misrepresentation: "Supported after review",
  uncertain_lead: "Uncertain lead",
  no_supported_misrepresentation: "No supported misrepresentation",
  evidence_limitation: "Evidence limitation",
};

export default function Findings() {
  return <main className="container main"><div className="page-heading"><div className="eyebrow">Claim-level outcomes</div><h1>Findings and assessed claims</h1><p>Approved findings have source verification, independent review, and high-confidence legal comparisons. Uncertain leads and negative checks remain visible below.</p></div>
    <section><h2>Approved findings</h2>{legal.findings.length === 0 && <p className="empty-state">No claim has passed the publication gate. Reviewed candidates and negative checks remain visible below.</p>}{legal.findings.map(f => {
      const c = claimFor(f); if (!c) return null; const s = sourceFor(c);
      return <article className="finding-card" key={f.id}><div className="eyebrow">{f.publication_status === "approved" ? "Approved" : "Preview · approval pending"}</div><h2><Link href={`/findings/${f.id}/`}>{f.title}</Link></h2><p>{c.analysis}</p><p className="muted">{s?.title} · {c.significance} potential significance · {c.current_relevance}</p><Link href={`/findings/${f.id}/`}>Read evidence →</Link></article>;
    })}</section>
    <section className="context-panel"><h2>All assessed claims</h2>{legal.claims.map(c => {
      const source = sourceFor(c);
      return <article className="claim-row" key={c.id}><div className="eyebrow">{labels[c.outcome]} · {c.confidence} confidence</div><h3>{source?.title ?? c.source_id}</h3><blockquote>{c.exact_quote}</blockquote><p>{c.analysis}</p><p className="muted">{c.independently_reviewed ? "Independent review recorded" : "Independent review pending"} · <Link href={`/issue-sweeps/${c.issue_id}/`}>View issue sweep</Link></p></article>;
    })}</section>
  </main>;
}
