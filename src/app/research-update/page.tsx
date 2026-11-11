import Link from "next/link";

const leads = [
  {
    id: "NY-C01", title: "Rent increase notice at exactly 5%", agency: "Attorney General", type: "Shared English/Spanish guidance versus statute", rating: "Narrow potential effect", status: "Strong provisional; final adjudication pending",
    observed: "The tenant guide says “more than 5%”; Real Property Law § 226-c also covers an increase equal to 5%.",
    consequence: "A tenant facing precisely a 5% increase could mistakenly think the advance-notice rule does not apply.",
    limits: "Confirm the applicable tenancy, exceptions, and current printable guide edition. The Spanish wording repeats the English issue; this is not a demonstrated mistranslation.",
    source: "https://ag.ny.gov/publications/residential-tenants-rights-guide", law: "https://www.nysenate.gov/legislation/laws/RPP/226-C"
  },
  {
    id: "NY-C02", title: "Occupational-disease filing clock", agency: "Workers’ Compensation Board", type: "Guidance versus statutory scope", rating: "Impact not assigned", status: "Preliminary wording problem",
    observed: "A toolkit describes a two-year period from an “incident” for injuries and illnesses; Workers’ Compensation Law § 28 has a distinct occupational-disease timing rule.",
    consequence: "A reader could calculate the wrong claim date, depending on disease and knowledge dates.",
    limits: "The toolkit links to more precise guidance. Disease categories and the actual filing path need review before any impact rating.",
    source: "https://www.wcb.ny.gov/content/main/Workers/injured-workers-toolkit.jsp", law: "https://www.nysenate.gov/legislation/laws/WKC/28"
  },
  {
    id: "NY-C03", title: "Domestic-violence lease termination exception", agency: "Attorney General", type: "Shared English/Spanish guidance versus statute", rating: "Potentially major", status: "Preliminary; final adjudication pending",
    observed: "The tenant guide states a categorical requirement to leave the apartment free of occupants; Real Property Law § 227-c has an exception for a sole leaseholder whose abuser remains.",
    consequence: "A survivor may wrongly believe leaving the lease is unavailable or must try to remove an abusive household member.",
    limits: "The full statutory conditions and current guide edition still need a final source and context check. No actual harmed tenant is documented.",
    source: "https://ag.ny.gov/publications/residential-tenants-rights-guide", law: "https://www.nysenate.gov/legislation/laws/RPP/227-C"
  },
  {
    id: "NY-C04", title: "Farmworker overtime threshold", agency: "Department of Labor", type: "Shared English/Spanish guidance versus regulation", rating: "Potentially major", status: "Provisional; final adjudication pending",
    observed: "Several DOL passages still say overtime begins after 56 hours. The adopted 2026 threshold is 52 hours; the same packets also contain a correct 52-hour update.",
    consequence: "For a covered worker at 53–56 hours, relying on the stale passage could obscure overtime pay owed.",
    limits: "This is one repeated issue, not a finding per page or language. Check packet page images, worker coverage, and exceptions before approval. It is not an English/Spanish mistranslation.",
    source: "https://dol.ny.gov/node/6461", law: "https://dol.ny.gov/farm-laborers-wage-board"
  },
  {
    id: "NY-C05", title: "External appeal: 120 days versus four months", agency: "Department of Financial Services", type: "Guidance versus statute", rating: "Potentially major in a narrow date window", status: "Provisional; final adjudication pending",
    observed: "Two 2025 DFS flyers say 120 days to seek a patient external appeal; Insurance Law § 4914 provides four calendar months.",
    consequence: "In some calendar periods the two methods produce different deadlines, possibly changing whether an appeal is timely.",
    limits: "Current flyers and any applicable exception require a final check. No denied appeal or actual reliance is documented.",
    source: "https://www.dfs.ny.gov/system/files/documents/2025/09/Health-Plan-Decision.pdf", law: "https://www.nysenate.gov/legislation/laws/ISC/4914"
  },
  {
    id: "NY-C06", title: "Translated external-appeal form editions", agency: "Department of Financial Services", type: "Multilingual edition parity", rating: "Impact not assigned", status: "Provisional source-design concern",
    observed: "The newer English form has an eighth reason in question 12 for No Surprises Act appeals. Thirteen linked translated forms retain seven boxes and older edition markers; five translations received semantic checks of this field.",
    consequence: "A user of an older translated form may not see the same reason category, but actual intake handling has not been established.",
    limits: "The editions differ, so this is not a matched-edition mistranslation. Thirteen box structures were checked; only five language versions received semantic checks, and none received a full-document audit.",
    source: "https://www.dfs.ny.gov/complaints/file_external_appeal", law: "https://www.nysenate.gov/legislation/laws/ISC/4914"
  },
  {
    id: "NY-C07", title: "Health Department external appeal deadline", agency: "Department of Health", type: "Guidance versus statute", rating: "Potentially major", status: "Provisional; regulatory conflict unresolved",
    observed: "A DOH page says 45 days after a final adverse determination or waiver; Public Health Law § 4914 and a current model notice say four months.",
    consequence: "A patient could abandon an appeal after day 45 even when the statutory window remains open.",
    limits: "An older regulation also states 45 days; its present status and application must be resolved before publication as an approved finding.",
    source: "https://healthweb-back.health.ny.gov/health_care/managed_care/appealext.htm", law: "https://www.nysenate.gov/legislation/laws/PBH/4914"
  },
] as const;

export default function ResearchUpdate() {
  return <main className="container main">
    <div className="page-heading"><div className="eyebrow">Research checkpoint · 2 November 2026</div><h1>Expanded source checks and provisional leads</h1><p>This checkpoint makes the later research visible without turning unadjudicated leads into approved findings. A live source-status recheck was made on 11 November 2026.</p></div>
    <div className="stat-strip"><div><strong>51</strong><span>individual statutory sections inventoried, not complete Acts</span></div><div><strong>36</strong><span>agency publications with targeted checks this round</span></div><div><strong>7</strong><span>distinct provisional issue clusters</span></div><div><strong>0</strong><span>new approved findings</span></div></div>
    <section className="context-panel"><h2>How to read the numbers</h2><p>The 36 rows span six agencies; thirteen are language versions of one DFS application. Two extra bilingual farmworker packets had one claim checked each. Ten translated tenant-guide print links were located, and an English–Haitian Creole pair appears edition-aligned on sampled markers; none of those ten received a full translation comparison. The 51 statutory sections served as legal authorities for guidance checks. These units overlap, so they should not be added into a total of “laws reviewed.”</p><p>The original site dataset still has <Link href="/findings/">two approved public findings</Link>. The hearing-deadline finding documents a 30 October capture; its source URL redirected on 11 November to a page without the sentence. No change date or formal correction has been established.</p></section>
    <section className="context-panel"><h2>Potential importance</h2><p>The two approved findings were rated <strong>Major potential significance</strong> at review. Of the seven later leads, four are provisionally rated potentially major, one has a narrow potential effect, and two have no impact rating yet. One additional annual-report date error is limited. These are assessments of plausible effects, not measured incidence or proof that anyone lost wages, benefits, housing, or an appeal. The unemployment finding now concerns wording captured in October rather than a claim visible at its original URL today.</p></section>
    <section><div className="eyebrow">Independent challenge recorded · final review outstanding</div><h2>Seven research leads</h2><p className="muted">“Potentially major” means a plausible effect under stated facts, not a proven legal outcome. No individual reliance, denial, underpayment, or injury has been established.</p>{leads.map(lead => <article className="finding-card" key={lead.id} id={lead.id.toLowerCase()}><div className="eyebrow">{lead.id} · {lead.agency} · {lead.status}</div><h2>{lead.title}</h2><p className="muted">{lead.type} · {lead.rating}</p><p><strong>Observed:</strong> {lead.observed}</p><p><strong>Possible consequence:</strong> {lead.consequence}</p><p className="muted"><strong>What remains:</strong> {lead.limits}</p><p><a href={lead.source}>Agency publication ↗</a> · <a href={lead.law}>Governing law or rule ↗</a></p></article>)}</section>
    <section className="context-panel"><h2>Additional limited observation</h2><p>The Division of Human Rights FY2023–24 annual report gives two different years, 2024 and 2025, for the same complaint-rule transition. The statute and adjacent timeline support 2024. This appears to be an isolated historical-report date error, not a major current-guidance finding or a translation discrepancy. <a href="https://dhr.ny.gov/system/files/documents/2026/01/nys-dhr-sfy-2024-annual-report.pdf">Annual report ↗</a></p></section>
    <p className="note">Research records: <a href="https://github.com/ae-oss/new-york-translation-inconsistencies/blob/main/research/legal-misrepresentation/progress-snapshot-2026-11-02.md">progress snapshot</a>, <a href="https://github.com/ae-oss/new-york-translation-inconsistencies/blob/main/research/legal-misrepresentation/candidate-register-2026-11-02.md">candidate register</a>, <a href="https://github.com/ae-oss/new-york-translation-inconsistencies/blob/main/research/legal-misrepresentation/round-four-inventory.csv">51-section inventory</a>, and <a href="https://github.com/ae-oss/new-york-translation-inconsistencies/blob/main/research/legal-misrepresentation/round-five-claim-ledger-2026-11-02.md">claim ledger</a>. The research record distinguishes targeted claim checks from full-document screening.</p>
  </main>;
}
