import Link from "next/link";
import { coverage, legal } from "@/lib/legal-research";

export default function Home() {
  const c = coverage();
  return <main className="container main">
    <div className="page-heading home-heading"><div className="eyebrow">New York legal information research</div><h1>What an agency says. What the law requires.</h1><p>We examine current New York government guidance for material conflicts with binding legal requirements.</p><p className="muted">{legal.notice}</p></div>
    <div className="stat-strip" aria-label="Research coverage"><div><strong>{c.issues}</strong><span>bounded issues investigated</span></div><div><strong>{c.screenedDocuments}</strong><span>documents with recorded claim screening</span></div><div><strong>{c.claims}</strong><span>claims assessed</span></div><div><strong>{c.published}</strong><span>approved misrepresentation findings</span></div></div>
    <div className="section-grid"><section><div className="eyebrow">Research by legal question</div><h2>Issue sweeps</h2><p>Each sweep defines a rule, discovers relevant agency publications, and records checked claims and gaps.</p><Link className="action-link" href="/issue-sweeps/">Browse issue sweeps →</Link></section><section><div className="eyebrow">Evidence status</div><h2>Findings and open questions</h2><p>Supported findings, uncertain leads, negative checks, and evidence limits remain distinct.</p><Link className="action-link" href="/findings/">See assessed claims →</Link></section><section><div className="eyebrow">Federal–New York</div><h2>Federal–state discrepancies</h2><p>Compare New York publications with federal rules and federally approved Medicaid terms, with approved findings and research-stage records kept distinct.</p><Link className="action-link" href="/federal-state/">Open the federal–state register →</Link></section></div>
    <p className="note">The <Link href="/issue-sweeps/hospital-patient-rights/">hospital patient-rights review</Link> checked 25 targeted records and discharge claims and added four independently reviewed findings. The <Link href="/research-update/">2 November expansion checkpoint</Link> separately records seven provisional issue clusters. The <Link href="/archive/translation/">translation research</Link> remains a separate part of this site.</p>
  </main>;
}
