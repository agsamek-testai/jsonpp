# jsonpp

`jsonpp` is a width-aware JSON pretty printer. It tries to keep data on a
single line when it fits within a configurable `maxWidth`, and otherwise breaks
lines while keeping indentation consistent. Indentation uses tabs, and the
`indent` option represents the number of tabs per nesting level.

## How it works

1. Serialize a value into a compact one-line JSON string.
2. If the line fits, return it as-is.
3. If it does not fit, expand the structure:
   - arrays: one item per line,
   - objects: one key per line, values indented one level deeper.

## Usage (Node or bundlers)

```js
var jsonpp = require("./src/jsonpp");

var data = {
  name: "Alex",
  tags: ["json", "pretty", "printer"],
  meta: { active: true, score: 42 }
};

console.log(jsonpp.formatJson(data, { indent: 1, maxWidth: 40 }));
```

## Playground

Open `docs/index.html` in a browser to try the formatter interactively. To
refresh the GitHub Pages bundle, run `./scripts/sync_docs_bundle.sh`.

To sync the docs bundle automatically on every commit, install the repo git
hooks once:

```sh
./scripts/install_git_hooks.sh
```

## Tests (QuickJS)

```sh
qjs tests/run_tests.js
```

## Tests (Node)

```sh
node tests/run_tests_node.js
```

Test fixtures live in `tests/fixtures` as JSON inputs with matching
`.expected` files for exact output comparisons.

## Maintaining consistency

See `docs/MAINTAINING.md` for guidance on keeping the source, build, tests, and
playground in sync.
