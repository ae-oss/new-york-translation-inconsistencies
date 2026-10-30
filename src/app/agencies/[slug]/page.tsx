import Link from "next/link";
import { notFound } from "next/navigation";
import { legal } from "@/lib/legal-research";

export const dynamicParams = false;
export function generateStaticParams() { return legal.agencies.map(a => ({ slug: a.id })); }
export default async function AgencyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const agency = legal.agencies.find(a => a.id === slug); if (!agency) notFound();
  const sources = legal.sources.filter(s => s.agency_id === slug);
  return <main className="container main"><div className="page-heading"><Link href="/agencies/">← All agencies</Link><div className="eyebrow">{agency.jurisdiction}</div><h1>{agency.name}</h1><p><a href={agency.url} target="_blank" rel="noreferrer">Agency website ↗</a></p></div><h2>Publications in the current sweeps</h2>{sources.map(s => <article className="source-row" key={s.id}><h3><a href={s.url} target="_blank" rel="noreferrer">{s.title} ↗</a></h3><p><Link href={`/issue-sweeps/${s.issue_id}/`}>{legal.issues.find(i => i.id === s.issue_id)?.title}</Link> · {s.coverage.replaceAll("_", " ")} · {s.claim_ids.length} claims assessed</p><p className="muted">{s.screen_note}</p></article>)}</main>;
}
