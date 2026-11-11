# New York legal-guidance expansion: provisional checkpoint

**Research date:** 2 November 2026. **Publication status:** Local research only. The live site still has two approved findings; nothing in this checkpoint is approved as an additional finding. This is a targeted examination of three claim clusters, not a full-document audit.

## What was checked

The [capture manifest](evidence/round-three/manifest.json) records 10 direct HTML copies from official New York government sites and one Attorney General PDF binary. The PDF text was not independently extracted and is not relied on for a verdict. The source copies support the quoted passages and their SHA-256 hashes; they do not establish when an undated webpage was first published. Web retrieval of the [Sanchez court decision](https://www.nycourts.gov/reporter/3dseries/2020/2020_05270.htm) supplemented the local captures; its direct download returned HTTP 403, so no local binary is claimed.

| Cluster | Status | Tentative impact | What remains |
| --- | --- | --- | --- |
| Attorney General tenant guide: exactly 5% rent increase | Preliminary discrepancy candidate | Limited reach, potentially important for affected tenants | Independent legal and source review; confirm guide's current printable edition and any scope exclusions |
| Workers' Compensation Board toolkit: occupational-disease filing period | Preliminary discrepancy candidate | Impact unassigned; accurate linked disease guidance mitigates the risk | Resolve source context and filing path; distinguish accident, occupational disease, and special hearing-loss rules |
| Tenant guide: nonregulated lease renewal and Good Cause Eviction | Unresolved wording tension | Not rated | Determine whether the guide's literal renewal statement makes a false legal claim, given that the statute primarily restricts removal and the guide links to a qualifying explanation |

No actual reliance, denial, eviction, or benefit loss was found. No agency was contacted.

## 1. Exactly 5% rent increase

The current [Attorney General residential tenants' guide](https://ag.ny.gov/publications/residential-tenants-rights-guide) says in both its nonregulated lease-renewal section and its rent-increase section that the advance-notice duty applies to an increase of **“more than 5%.”** The Spanish HTML captured for this round, and its search-indexed passage, use the equivalent **“más del 5%”** in the corresponding section; a fresh direct open of the Spanish URL returned 404. That is not an English-to-Spanish mistranslation: the restrictive threshold appears in both captured versions. Only these specific passages were compared across languages.

Current [Real Property Law § 226-c(1)(a)](https://www.nysenate.gov/legislation/laws/RPP/226-C) includes an increase **equal to or greater than 5%**. The displayed revision is dated 22 August 2025, and the present effective clause runs from 18 August 2024 to 15 June 2034. Subdivision 2 sets 30-, 60-, or 90-day notice based on the longer of occupancy and lease length. For a nonregulated apartment whose tenant has lived there three years, an offer to raise $2,000 monthly rent to $2,100 is exactly 5%; the statute calls for 90 days' written notice, whereas the guide's words imply that this precise increase falls outside the notice rule. Section 226-c says an untimely notice keeps the tenancy on its existing terms until the applicable notice period expires after actual written notice. Coverage and facts must still be checked in a real case, including the statutory cooperative-shareholder exception.

This reading is corroborated by the Attorney General's earlier [2019 rent-law explainer](https://ag.ny.gov/sites/default/files/2019-changesinnyrentlaw.pdf), which uses the inclusive wording, and by the official reporter's [*Mohegan Vista Properties v Mazo*](https://www.nycourts.gov/REPORTER/3dseries/2022/2022_22224.htm) quotation of § 226-c. These are corroboration, not extra findings. The PDF was reviewed through web retrieval; its locally saved binary has not had a separate text/image check.

**Adversarial check:** The guide discusses nonregulated units and does not claim rent regulation applies. Its “more than 5%” appears twice, making a one-off transcription less likely. The independent reviewer reopened the live English page and confirmed the exactly-5% example against the statute. A current printable English edition was not established: the printable link redirected to the live HTML page.

## 2. Occupational-disease filing period

The active [Workers' Compensation Board injured-worker toolkit](https://www.wcb.ny.gov/content/main/Workers/injured-workers-toolkit.jsp) addresses accidents **or illness**, then says a worker can file a claim **“within two years of the incident.”** A later timeline on the same page also says to notify the Board of an injury or illness within two years of the **accident**. For an occupational disease arising after years of exposure, there may be no single incident within that period.

[Workers' Compensation Law § 28](https://www.nysenate.gov/legislation/laws/WKC/28) has a separate occupational-disease rule: a claim is not barred merely because two years from an accident/exposure has elapsed when the claim is filed within the statutory period tied to disablement and knowledge that the disease is work related. The Board's more specific [Occupational Disease page](https://www.wcb.ny.gov/content/main/Workers/OccDisease.jsp) lists those two triggers, and its [File a Claim page](https://www.wcb.ny.gov/content/main/Workers/file-claim.jsp) directs occupational-disease claimants to the special requirements. The [Appellate Division's *Matter of Sanchez* decision](https://www.nycourts.gov/reporter/3dseries/2020/2020_05270.htm) remitted a time-bar determination because earlier records did not establish when the worker learned the disease was work related; it did not itself award benefits.

A worker exposed years earlier who becomes disabled and learns the work-related cause only recently might still be able to file under § 28. The toolkit's short rule could lead that worker to think the claim is already barred. This is a **potential** consequence only. The statutory date of disablement, date of actual or constructive knowledge, special hearing-loss rule, and other claim requirements require fact-specific analysis.

**Adversarial check:** “Incident” may be intended as a generic reference to a recent accident, and the Board has separate accurate disease guidance linked from its filing path. The toolkit's heading and nearby text explicitly include illness, however. Independent review retained the wording concern as provisional and left impact unassigned until the complete source context and actual claimant path can be assessed.

## 3. Good Cause renewal wording: unresolved

The [tenants' guide](https://ag.ny.gov/publications/residential-tenants-rights-guide) says a landlord of a nonregulated apartment does not have to renew the lease. The Attorney General's separate [Good Cause page](https://ag.ny.gov/publications/new-york-state-good-cause-eviction-law) says many covered landlords cannot refuse renewal simply because the lease expired; [Real Property Law § 216](https://www.nysenate.gov/legislation/laws/RPP/216) restricts removal of covered tenants absent a court finding of good cause, even after a lease expires.

This is **not yet a supported discrepancy**. A landlord's lack of a literal duty to offer a new lease may coexist with the tenant's right to remain unless good cause is proved. The guide also links to Good Cause protection in its eviction section. The scope depends on municipality and the housing unit's exemptions. Do not count the categorical renewal sentence as a finding without resolving that distinction.

## Coverage and next gate

- Three claim clusters were examined in selected passages of two active Attorney General pages and three active Board pages against two current statutes and one official court decision. The HCR leases page supplied only a contextual source check. No complete page or guide is certified screened.
- Two of the three clusters are preliminary discrepancy candidates. The third is unresolved. There are **zero new approved findings** and no change to the live site's finding count.
- The Spanish tenant-guide passage mirrors the English 5% wording; it is **not** a counted translation finding. No other language version was screened.
- Subsequent independent review confirmed a narrow same-facts consequence for the tenant-guide threshold: a covered exactly-5% rent increase can trigger statutory notice even though the guide says “more than 5%.” The printable guide edition remains unverified. The reviewer kept the occupational-disease wording provisional and its impact unassigned because linked Board guidance states the correct rule.
- Before public inclusion: establish whether an updated printable tenant guide exists, confirm any later amendment or correction, resolve the Board toolkit's effect in its full navigation context, and assign final impact/confidence ratings. Publication requires a separate decision.
