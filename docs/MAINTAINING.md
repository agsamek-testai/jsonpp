# Maintainers Guide

This repository keeps a tiny ES5-compatible JSON pretty printer with a few
supporting assets. Follow the steps below to keep changes consistent.

## Source of truth

- `src/jsonpp.js` is the source implementation.
- `docs/dist/jsonpp.js` is the GitHub Pages bundle copied from `src/jsonpp.js`.

If you change `src/jsonpp.js`, refresh the docs bundle via
`./scripts/sync_docs_bundle.sh`.
To keep the docs bundle up to date on every commit, install the repo git hooks
once:

```sh
./scripts/install_git_hooks.sh
```

The pre-commit hook runs:

- `./scripts/sync_docs_bundle.sh`

## Formatting rules

- The formatter must be width-aware: keep content on a single line if it fits
  within `maxWidth`, otherwise break into lines with indentation.
- Indentation uses tabs; `indent` specifies how many tabs to add per level.
- Do not use modern syntax. Stick to ES5 (no `let`, `const`, arrow functions,
  classes, or template strings).

## Tests

Tests are fixture-driven. The shared runner lives in `tests/run_tests_common.js`.

- Fixtures live in `tests/fixtures/` as `*.json` input files with matching
  `*.expected` outputs.
- QuickJS runner: `tests/run_tests.js`.
- Node runner: `tests/run_tests_node.js`.

When adding a new test, create both files and add a case entry to the shared
runner.

## HTML playground

The interactive demo is in `docs/index.html`.
For GitHub Pages, `docs/dist/jsonpp.js` is a copy of `src/jsonpp.js`. Refresh it
with `./scripts/sync_docs_bundle.sh` when you intend to update the Pages output.
If Pages is configured to "Deploy from a branch", it serves the `docs/` folder
as-is and will not build `docs/dist` for you. Commit the synced bundle or switch
to a GitHub Actions Pages workflow if you want to build on deploy.

- Keep it dependency-free and compatible with older browsers.
- If you change the API or output format, update the playground and the README.
