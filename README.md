# New York Legal Misrepresentation

This is the existing New York GitHub Pages repository, adapted to examine whether current New York State agency guidance materially conflicts with applicable binding law. Multilingual translation research remains available in the site's separate **Translation research** section and is excluded from the legal-misrepresentation counts.

The initial research is in `research/legal-misrepresentation/`: two bounded issue sweeps, independent adversarial review, dated source captures, and publication checks. `scripts/build-legal-preview.mjs` projects the reviewed research into `src/data/legal-research.json`, which drives the public issue, agency, coverage, and finding pages. The two approved findings were rechecked on 30 October 2026. The hearing case expressly states that the latest official printed NYCRR supplement could not be directly inspected.

A separate 11 November 2026 multilingual review added two reviewer-approved **Limited-potential translation findings**: WCB C-3 hearing instructions and HCR Fact Sheet 30 succession wording. The [review ledger](research/legal-misrepresentation/reviewer-expansion-2026-11-11.md) and [dated source captures](research/legal-misrepresentation/evidence/round-six-2026-11-11/) record the matched documents, hashes, page images, negative checks, and held-back leads. These findings are excluded from the legal-misrepresentation count.

## Build and verify

Use Node 22 and pnpm 10:

```sh
pnpm install --frozen-lockfile
pnpm run validate:data
pnpm run validate:legal
pnpm run typecheck
pnpm run build
```

The static export is in `out/`. `scripts/validate-legal-data.mjs` checks source/claim/rule joins, preserved evidence hashes, and publication gates. An approved finding requires a supported, high-confidence independently reviewed claim, dated source capture, exact legal text, and a review date. The research contains two approved findings, five uncertain leads, fourteen negative checks, and two evidence-limited comparisons. No whole document has been certified fully screened.

`refresh:legal` still projects only the initial October legal-guidance sweeps. It should be reconciled with later legal-guidance updates before being used to regenerate the current `src/data/legal-research.json`.

## Publication

The manual `.github/workflows/pages.yml` workflow deploys to the existing free GitHub Pages path. It uses `NEXT_PUBLIC_BASE_PATH=/new-york-translation-inconsistencies` so archive and evidence URLs remain under the repository site. The site makes no claim of an exhaustive statewide audit or documented individual harm. Recapture and reassess sources before later corrections or new findings are published.
