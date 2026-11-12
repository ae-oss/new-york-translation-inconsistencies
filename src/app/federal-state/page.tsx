import Link from "next/link";
import { approvedFederalStateFindingIds, researchFederalStateRecords } from "@/data/federal-state-register";
import { claimFor, legal, sourceFor } from "@/lib/legal-research";

export default function FederalStatePage() {
  const approved = approvedFederalStateFindingIds.map(id => legal.findings.find(f => f.id === id)).filter(f => f?.publication_status === "approved");

  return <main className="container main">
    <div className="page-heading">
      <div className="eyebrow">Federal–New York comparisons</div>
      <h1>Federal–state discrepancies</h1>
      <p>A separate register of New York government information checked against applicable federal requirements and federally approved Medicaid terms.</p>
    </div>

    <section className="context-panel">
      <h2>What this register means</h2>
      <p>A difference in published guidance does not itself prove that New York administered a program unlawfully. We identify the exact federal rule or approved plan, the New York publication, the people and process it covers, and what remains unverified. State rules can also provide broader protection than federal minimums.</p>
      <p className="muted">Status is assigned to each comparison. The two approved cases below are already in the site's findings dataset; the later research records are not added to the approved count. No patient-level harm or federal enforcement decision has been established for the later records.</p>
    </section>

    <section aria-labelledby="approved-federal-state">
      <div className="eyebrow">Published case files · {approved.length}</div>
      <h2 id="approved-federal-state">Approved findings involving federal rules</h2>
      {approved.map(finding => {
        if (!finding) return null;
        const claim = claimFor(finding);
        const source = claim && sourceFor(claim);
        return <article className="finding-card" key={finding.id}>
          <div className="eyebrow">Approved · New York DOH guidance versus federal Medicare rule</div>
          <h2><Link href={`/findings/${finding.id}/`}>{finding.title}</Link></h2>
          <p>{claim?.analysis}</p>
          <p className="muted">{source?.title} · {claim?.significance} potential significance · No documented patient harm</p>
          <Link href={`/findings/${finding.id}/`}>Read the source and rule comparison →</Link>
        </article>;
      })}
    </section>

    <section className="context-panel" aria-labelledby="research-federal-state">
      <div className="eyebrow">Research-stage comparisons · {researchFederalStateRecords.length}</div>
      <h2 id="research-federal-state">Reviewed or identified; not approved findings</h2>
      <p>These records preserve the distinction between an independently checked wording difference, a federally approved state-plan comparison, and a possible federal funding implication.</p>
      {researchFederalStateRecords.map(record => <article className="claim-row" key={record.id} id={record.id}>
        <div className="eyebrow">{record.category} · {record.status}</div>
        <h3>{record.title}</h3>
        <p><strong>New York publication:</strong> {record.stateText}</p>
        <p><strong>Federal or approved-plan comparison:</strong> {record.federalComparison}</p>
        <p className="muted"><strong>Limit:</strong> {record.boundary}</p>
        <p><a href={record.stateSource.url} target="_blank" rel="noreferrer">{record.stateSource.label} ↗</a> · <a href={record.federalSource.url} target="_blank" rel="noreferrer">{record.federalSource.label} ↗</a></p>
      </article>)}
    </section>

    <section aria-labelledby="no-conflict">
      <h2 id="no-conflict">Checks without an established federal–state conflict</h2>
      <p>The forensic-exam review found that New York's published police-report and cooperation rules align with the federal STOP condition. The initial pediatric Medicaid review found no supported federal EPSDT conflict in its targeted passages; orthodontic retreatment, nursing hours, a PERS route, and access to school-site ABA remain fact-specific questions. These are not counted as discrepancies.</p>
      <p className="muted">The appeal-deadline discrepancies grounded in New York Public Health Law, the seven-day HIV medication notice, and the older MLTC transport template belong to separate guidance-versus-New York-rule research. Their controlling comparison is a New York rule, so they are not relabeled as direct federal-law violations here.</p>
    </section>
    <p className="note">Coverage is limited to the named publications and passages. This register is not a survey of all federal and New York law, and its entries cannot be used to estimate how often patients encounter incorrect guidance.</p>
  </main>;
}
