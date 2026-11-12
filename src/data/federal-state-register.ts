export type FederalStateRecord = {
  id: string;
  title: string;
  category: string;
  status: string;
  stateText: string;
  federalComparison: string;
  boundary: string;
  stateSource: { label: string; url: string };
  federalSource: { label: string; url: string };
};

// Approved cases live in legal-research.json. Keep this list of IDs here so the
// federal–state index uses the same finding pages and publication status.
export const approvedFederalStateFindingIds = [
  "medicare-advantage-discharge-review-route",
  "medicare-discharge-notice-request",
] as const;

// Research-stage comparisons are deliberately separate from approved findings.
// Adding one here does not add to the site's approved-finding count.
export const researchFederalStateRecords: FederalStateRecord[] = [
  {
    id: "medicaid-child-hospice",
    title: "Hospice guidance omits children's right to concurrent curative care",
    category: "State guidance versus federal Medicaid law",
    status: "Independently reviewed · publication checks pending",
    stateText: "A general New York Department of Health page says a hospice election waives ordinary Medicaid treatment of the terminal illness without stating the child exception.",
    federalComparison: "Federal Medicaid law preserves related curative treatment for a child who elects hospice. The corrected, CMS-approved New York plan pages and separate state managed-care guidance also preserve it.",
    boundary: "This is a discrepancy in a general information page. It does not establish that New York actually withholds curative care, or that a family lost treatment. A dated live-page capture is still needed for publication as a finding.",
    stateSource: { label: "New York DOH hospice page", url: "https://www.health.ny.gov/health_care/medicaid/program/longterm/hospice.htm" },
    federalSource: { label: "42 U.S.C. § 1396d(o)(1)(C)", url: "https://uscode.house.gov/us/usc/t42/s1396d/" },
  },
  {
    id: "medicaid-adult-hospice",
    title: "Medicaid hospice eligibility described with a six-month threshold",
    category: "State guidance versus federally approved New York Medicaid plan",
    status: "Independently reviewed · publication checks pending",
    stateText: "The same DOH page's eligibility heading applies a six-month prognosis to a program it says is available through Medicaid and Medicare. A later paragraph on the page says twelve months.",
    federalComparison: "The corrected CMS-approved New York Medicaid state plan uses approximately twelve months or less. This is a comparison with New York's federally approved plan, not a claim that federal law gives every Medicaid beneficiary a twelve-month hospice threshold.",
    boundary: "The twelve-month comparison concerns Medicaid-only or Medicaid-primary coverage. Medicare-primary hospice may use a six-month threshold. No deterred applicant or denial was documented; preserve a dated page capture before publication as a finding.",
    stateSource: { label: "New York DOH hospice page", url: "https://www.health.ny.gov/health_care/medicaid/program/longterm/hospice.htm" },
    federalSource: { label: "CMS-approved NY SPA 24-0072, pp. 5–6", url: "https://www.medicaid.gov/medicaid/spa/downloads/NY-24-0072.pdf" },
  },
  {
    id: "forensic-exam-self-payment",
    title: "Forensic-exam billing manual offers survivors a self-payment choice",
    category: "State provider instruction with a federal funding-condition implication",
    status: "Research-stage source comparison · grant compliance unproven",
    stateText: "The March 2026 Office of Victim Services provider manual lists paying out of pocket as a survivor choice for the forensic exam; its appended form includes a direct-payment option.",
    federalComparison: "Federal STOP funding conditions require access to a forensic exam at no cost to the survivor. New York's own Executive Law also requires covered exams without charge and provides OVS or voluntary-insurance payment routes.",
    boundary: "The text conflicts with the free-exam message, but it does not show that any survivor was charged, that a free route was denied, or that New York breached a federal grant condition. This item has not passed the site's finding publication gate.",
    stateSource: { label: "OVS forensic-exam provider manual", url: "https://ovs.ny.gov/system/files/documents/2026/03/fre-provider-manual-for-publication-20260319_0.pdf" },
    federalSource: { label: "34 U.S.C. § 10449", url: "https://www.govinfo.gov/content/pkg/USCODE-2024-title34/html/USCODE-2024-title34-subtitleI-chap101-subchapXIX-sec10449.htm" },
  },
];
