# New York Legal Misrepresentation

This is the existing New York GitHub Pages repository, adapted to examine whether current New York State agency guidance materially conflicts with applicable binding law. The earlier multilingual translation research remains available under the site's **Translation archive** and is excluded from the legal-misrepresentation counts.

The initial research is in `research/legal-misrepresentation/`: two bounded issue sweeps, independent adversarial review, dated source captures, and publication checks. `scripts/build-legal-preview.mjs` projects the reviewed research into `src/data/legal-research.json`, which drives the public issue, agency, coverage, and finding pages. The two approved findings were rechecked on 30 October 2026. The hearing case expressly states that the latest official printed NYCRR supplement could not be directly inspected.

## Build and verify

Use Node 22 and pnpm 10:

```sh
pnpm install --frozen-lockfile
pnpm run refresh:legal
pnpm run validate:data
pnpm run typecheck
pnpm run build
```

The static export is in `out/`. `scripts/validate-legal-data.mjs` checks source/claim/rule joins, preserved evidence hashes, and publication gates. An approved finding requires a supported, high-confidence independently reviewed claim, dated source capture, exact legal text, and a review date. The research contains two approved findings, five uncertain leads, fourteen negative checks, and two evidence-limited comparisons. No whole document has been certified fully screened.

## Publication

The manual `.github/workflows/pages.yml` workflow deploys to the existing free GitHub Pages path. It uses `NEXT_PUBLIC_BASE_PATH=/new-york-translation-inconsistencies` so archive and evidence URLs remain under the repository site. The site makes no claim of an exhaustive statewide audit or documented individual harm. Recapture and reassess sources before later corrections or new findings are published.
