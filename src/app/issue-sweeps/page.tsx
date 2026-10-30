import Link from "next/link";
import { legal } from "@/lib/legal-research";

export default function IssueSweeps() {
  return <main className="container main"><div className="page-heading"><div className="eyebrow">Bounded research universes</div><h1>Issue sweeps</h1><p>Each sweep starts with specific legal questions, then checks current agency publications against binding requirements.</p></div>
    {legal.issues.length === 0 && <p className="empty-state">The initial sweeps are being verified. No issue has yet been entered in the public preview data.</p>}
    {legal.issues.map(issue => {
      const sources = legal.sources.filter(s => s.issue_id === issue.id);
      const claims = legal.claims.filter(c => c.issue_id === issue.id);
      const retrieved = sources.filter(s => s.coverage !== "discovered").length;
      const screened = sources.filter(s => ["partially_screened", "fully_screened"].includes(s.coverage)).length;
      return <article className="document-row" key={issue.id}><div><div className="eyebrow">{issue.status}</div><h2><Link className="document-title-link" href={`/issue-sweeps/${issue.id}/`}>{issue.title}</Link></h2><p>{issue.summary}</p><p className="muted">{issue.scope}</p></div><div className="translation-list"><strong>{sources.length} publications located</strong><p>{retrieved} retrieved · {screened} with claim screening · {claims.length} claims assessed</p><p>{issue.legal_questions.length} defined legal {issue.legal_questions.length === 1 ? "question" : "questions"}</p><Link href={`/issue-sweeps/${issue.id}/`}>Open sweep →</Link></div></article>;
    })}
  </main>;
}
