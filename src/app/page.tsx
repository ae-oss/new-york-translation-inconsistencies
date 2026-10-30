import Link from "next/link";
import { coverage, legal } from "@/lib/legal-research";

export default function Home() {
  const c = coverage();
  return <main className="container main">
    <div className="page-heading home-heading"><div className="eyebrow">New York legal information research</div><h1>What an agency says. What the law requires.</h1><p>We examine current New York government guidance for material conflicts with binding legal requirements.</p><p className="muted">{legal.notice}</p></div>
    <div className="stat-strip" aria-label="Research coverage"><div><strong>{c.issues}</strong><span>bounded issues investigated</span></div><div><strong>{c.screenedDocuments}</strong><span>documents with recorded claim screening</span></div><div><strong>{c.claims}</strong><span>claims assessed</span></div><div><strong>{c.published}</strong><span>approved misrepresentation findings</span></div></div>
    <div className="section-grid"><section><div className="eyebrow">Research by legal question</div><h2>Issue sweeps</h2><p>Each sweep defines a rule, discovers relevant agency publications, and records checked claims and gaps.</p><Link className="action-link" href="/issue-sweeps/">Browse issue sweeps →</Link></section><section><div className="eyebrow">Evidence status</div><h2>Findings and open questions</h2><p>Supported findings, uncertain leads, negative checks, and evidence limits remain distinct.</p><Link className="action-link" href="/findings/">See assessed claims →</Link></section></div>
    <p className="note">Historical translation findings are preserved in the <Link href="/archive/translation/">translation archive</Link>; they are not counted as legal misrepresentation findings.</p>
  </main>;
}
