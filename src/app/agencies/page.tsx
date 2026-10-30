import Link from "next/link";
import { legal } from "@/lib/legal-research";

export default function Agencies() { return <main className="container main"><div className="page-heading"><div className="eyebrow">Government publishers</div><h1>Agencies</h1><p>Agencies represented by retrieved material in the current bounded issue sweeps.</p></div>{legal.agencies.map(a => {
  const sources = legal.sources.filter(s => s.agency_id === a.id);
  return <article className="document-row" key={a.id}><div><h2><Link className="document-title-link" href={`/agencies/${a.id}/`}>{a.name}</Link></h2><p className="muted">{a.jurisdiction}</p></div><div><strong>{sources.length} publications in scope</strong><p><Link href={`/agencies/${a.id}/`}>View agency records →</Link></p></div></article>;
})}</main>; }
