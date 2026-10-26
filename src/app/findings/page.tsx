import { research } from "@/lib/research";
import { FindingList } from "@/components/finding-list";

export default function Findings() {
  return <main className="container main"><div className="page-heading"><div className="eyebrow">Research findings</div><h1>Potential translation discrepancies identified</h1><p>{research.findings.length} independently verified published-text {research.findings.length === 1 ? "finding" : "findings"} approved for publication. Significance describes potential effects, not a change in legal rights or documented harm.</p></div><FindingList findings={research.findings} />
    <section className="research-status"><div className="eyebrow">Separate research status</div><h2>Still under review</h2><p><strong>Provisional:</strong> The Workers’ Compensation Board RB-89 Chinese appeal instruction appears to describe a judge’s decision rather than its filing date. Matched 4-24 PDFs and page images confirm the wording contrast, but administrative usage of <span lang="zh">作出决定</span> needs qualified Chinese-language review. It is excluded from the published finding count. <a href="https://www.wcb.ny.gov/content/main/forms/rb89_C.pdf" target="_blank" rel="noreferrer">Chinese form ↗</a></p><p><strong>Uncertain or rejected:</strong> A Polish C-257 doctor/provider expression remains uncertain. The Spanish P700 “liquidated damages” expression does not establish a different liability proposition. Other source-limited and rejected leads remain outside the published findings database. No enacted legislation has been screened.</p></section>
  </main>;
}
