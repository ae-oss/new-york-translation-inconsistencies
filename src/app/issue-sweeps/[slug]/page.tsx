import Link from "next/link";
import { notFound } from "next/navigation";
import { legal } from "@/lib/legal-research";

export const dynamicParams = false;
export function generateStaticParams() { return legal.issues.map(i => ({ slug: i.id })); }

export default async function IssuePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const issue = legal.issues.find(i => i.id === slug);
  if (!issue) notFound();
  const sources = legal.sources.filter(s => s.issue_id === issue.id);
  const claims = legal.claims.filter(c => c.issue_id === issue.id);
  const rules = legal.rules.filter(r => r.issue_id === issue.id);
  const retrieved = sources.filter(s => s.coverage !== "discovered").length;
  const screened = sources.filter(s => ["partially_screened", "fully_screened"].includes(s.coverage)).length;
  return <main className="container main"><div className="page-heading"><Link href="/issue-sweeps/">← All issue sweeps</Link><div className="eyebrow">{issue.status}</div><h1>{issue.title}</h1><p>{issue.summary}</p><p className="muted">Scope: {issue.scope}</p></div>
    <section className="context-panel"><h2>Legal questions</h2><ol>{issue.legal_questions.map(q => <li key={q}>{q}</li>)}</ol><h2>Binding rules examined</h2>{rules.map(r => <article className="rule-row" key={r.id}><h3><a href={r.url} target="_blank" rel="noreferrer">{r.citation} ↗</a></h3><p><strong>Rule summary:</strong> {r.text}</p><p className="muted">Effective: {r.effective_date ?? "Date not established"}</p><p className="muted">Scope and qualifications: {r.qualifications}</p></article>)}</section>
    <section><h2>Government publications</h2><p className="muted">{sources.length} located · {retrieved} retrieved · {screened} with recorded claim screening · {claims.length} claims assessed. “Partially screened” does not certify a whole-document audit.</p><div className="table-wrap"><table><thead><tr><th>Publication</th><th>Agency</th><th>Coverage</th><th>Claims assessed</th></tr></thead><tbody>{sources.map(s => <tr key={s.id}><th scope="row"><a href={s.url} target="_blank" rel="noreferrer">{s.title} ↗</a><div className="muted">Accessed {s.accessed_at}</div></th><td>{legal.agencies.find(a => a.id === s.agency_id)?.name ?? s.agency_id}</td><td>{s.coverage.replaceAll("_", " ")}<div className="muted">{s.screen_note}</div></td><td>{s.claim_ids.length}</td></tr>)}</tbody></table></div></section>
    <section className="context-panel"><h2>Claim assessments</h2>{claims.length === 0 && <p>No claim assessment has been recorded yet.</p>}{claims.map(c => <article className="claim-row" key={c.id}><div className="eyebrow">{c.outcome.replaceAll("_", " ")} · {c.confidence} confidence</div><blockquote lang={sources.find(s => s.id === c.source_id)?.language ?? "en"}>{c.exact_quote}</blockquote><p>{c.analysis}</p><p className="muted">{c.location} · {c.independently_reviewed ? "Independent review recorded" : "Independent review pending"}</p></article>)}</section>
    <p className="note"><strong>Coverage limit:</strong> {issue.limitations}</p>
  </main>;
}
