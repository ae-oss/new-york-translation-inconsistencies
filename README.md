# New York Translation Inconsistencies

An independent multilingual research reader for New York government-published guidance, forms, and notices (Model A). It is separate from the Puerto Rico and EU projects. The current public projection contains 42 unique English source documents, 41 document-specific translation links, 23 pairs with valid targeted comparison, 48 examined meaning units, and two independently reviewed published-text findings. These are bounded checks, not full-document reviews.

The public findings database is `src/data/public-research.json`. A finding can enter its `findings` array only after source and edition matching, exact-quote and PDF-image review, meaning challenge, governing-rule and consequence assessment, and independent publication review. `scripts/validate-public-data.mjs` rejects incomplete or non-approved findings. Provisional, uncertain, rejected, and source-limited work is kept separate from the approved finding count. The underlying research and saved source evidence live outside this public repository in `research/new-york/` in the local research workspace.

## Local checks

Use Node 22 and pnpm 10:

```sh
pnpm install --frozen-lockfile
pnpm run validate:data
pnpm run typecheck
NEXT_PUBLIC_BASE_PATH=/new-york-translation-inconsistencies pnpm run build
```

The static output is written to `out/`. The site uses Next.js static export and GitHub Pages project-path links.

## Publication workflow

`.github/workflows/pages.yml` deploys only on a manual `workflow_dispatch` event. Updating source or adding research to the repository does not automatically publish a finding. Before dispatch, check the official PDFs and current index again, update review records, and run the local checks. The GitHub Pages deployment rebuilds from the locked dependencies, validates publication data, and uploads the static output.

The site is research, not legal advice. Government publication of a translation does not itself establish legal authority, and no translation-caused harm is claimed without evidence.
