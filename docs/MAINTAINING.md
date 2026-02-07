# Maintainers Guide

This repository keeps a tiny ES5-compatible JSON pretty printer with a few
supporting assets. Follow the steps below to keep changes consistent.

## Source of truth

- `src/jsonpp.js` is the source implementation.
- `dist/jsonpp.min.js` is a generated minified build derived from `src/jsonpp.js`.
- `docs/dist/jsonpp.js` is the GitHub Pages bundle copied from `src/jsonpp.js`.

If you change `src/jsonpp.js`, regenerate the minified build via
`./scripts/build_minified.sh`.
Refresh the docs bundle via `./scripts/sync_docs_bundle.sh`.

## Generated assets on commit

For local development (including Codex environments), install the repo git
hooks once:

```sh
./scripts/install_git_hooks.sh
```

The pre-commit hook runs:

- `./scripts/build_minified.sh`
- `./scripts/sync_docs_bundle.sh`

On GitHub, the `Verify generated assets` workflow runs the same scripts and
fails if the working tree changes, ensuring generated files are committed.

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
For GitHub Pages, `docs/dist/jsonpp.js` is a copy of `src/jsonpp.js` and should
be updated whenever the library changes. Use
`./scripts/sync_docs_bundle.sh` to refresh it.
If Pages is configured to "Deploy from a branch", it serves the `docs/` folder
as-is and will not build `docs/dist` for you. Commit the synced bundle or switch
to a GitHub Actions Pages workflow if you want to build on deploy.

- Keep it dependency-free and compatible with older browsers.
- If you change the API or output format, update the playground and the README.
