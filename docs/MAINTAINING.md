# Maintainers Guide

This repository keeps a tiny ES5-compatible JSON pretty printer with a few
supporting assets. Follow the steps below to keep changes consistent.

## Source of truth

- `src/jsonpp.js` is the source implementation.
- `dist/jsonpp.min.js` is a generated minified build derived from `src/jsonpp.js`.

If you change `src/jsonpp.js`, regenerate the minified build via
`./scripts/build_minified.sh`.

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

The interactive demo is in `example/index.html`.

- Keep it dependency-free and compatible with older browsers.
- If you change the API or output format, update the playground and the README.
