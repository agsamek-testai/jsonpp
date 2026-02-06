#!/usr/bin/env bash
set -euo pipefail

mkdir -p dist

if command -v terser >/dev/null 2>&1; then
  terser src/jsonpp.js -c -m -o dist/jsonpp.min.js
  echo "Built dist/jsonpp.min.js with terser."
  exit 0
fi

if command -v npx >/dev/null 2>&1; then
  npx terser src/jsonpp.js -c -m -o dist/jsonpp.min.js
  echo "Built dist/jsonpp.min.js with npx terser."
  exit 0
fi

echo "Error: terser (or npx) is required to build the minified file." >&2
exit 1
