import Link from "next/link";
import { research, stats } from "@/lib/research";

export default function Home() {
  const s = stats();
  return <main className="container main">
    <section className="intro">
      <h1 className="sr-only">New York Translation Inconsistencies</h1>
      <p>Examine differences in meaning between English government publications and their existing translations.</p>
      <p className="muted">{research.notice}</p>
    </section>
    <div className="stat-strip" aria-label="Research coverage">
      <div><strong>{s.documents}</strong><span>unique English source documents inventoried</span></div>
      <div><strong>{s.locatedLinks}</strong><span>document-specific translation links recorded</span></div>
      <div><strong>{s.validTargetedPairs}</strong><span>pairs with valid targeted comparison</span></div>
      <div><strong>{s.findings}</strong><span>approved findings for publication</span></div>
    </div>
    <p className="note">Potential translation discrepancies identified. The inventory includes 12 pilot sources and 30 additional English sources opened in the controlled second round. A source or translated link is never counted as a completed comparison without examined units.</p>
    <section className="context-panel"><div className="eyebrow">Why these materials</div><h2>New York language access</h2><p><a href="https://www.nysenate.gov/legislation/laws/EXC/202-A" target="_blank" rel="noreferrer">Executive Law § 202-a ↗</a> requires state agencies providing direct public services to translate qualifying vital documents into the 12 most common non-English languages spoken by New Yorkers with limited English proficiency. It does not, by itself, require translation of every enacted law or make agency translations legally authoritative.</p><p>The research inventory supports Spanish, Chinese, Russian, Yiddish, Bengali, Korean, Haitian Creole, Italian, Arabic, Polish, French, and Urdu. Coverage varies by language; a located translation is never described as screened unless a bounded comparison was completed.</p><p>In its <a href="https://ogs.ny.gov/system/files/documents/2025/12/2025-ola-annual-report_0.pdf" target="_blank" rel="noreferrer">FY 2024–2025 report ↗</a>, the Office of Language Access recorded 27,123 documents translated into 73 languages, including 24,878 translated from English into 72 other languages; agencies reported 7,057 translated documents posted online. Those state activity counts are separate from this project’s inventory and do not establish how many unique, legally significant matched pairs exist.</p></section>
    <div className="section-grid">
      <section><div className="eyebrow">Model A</div><h2>Government guidance and forms</h2><p>Browse issuing agencies, source editions, translations, and the precise boundaries of comparison coverage.</p><Link className="action-link" href="/government-guidance/">Browse source documents →</Link></section>
      <section><div className="eyebrow">Research status</div><h2>Evidence first</h2><p>The research record separates published findings from provisional candidates, uncertain leads, rejected readings, and source limits. Each language pair is counted only to the extent actually examined.</p><Link className="action-link" href="/findings/">See finding status →</Link></section>
    </div>
  </main>;
}
