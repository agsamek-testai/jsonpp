var std = null;
if (typeof require === "function") {
  std = require("std");
}
if (!std) {
  throw new Error("QuickJS std module is required.");
}

load("../src/jsonpp.js");
load("./run_tests_common.js");

function readFile(path) {
  var data = std.loadFile(path, "utf-8");
  if (data === null) {
    throw new Error("Unable to read file: " + path);
  }
  return data;
}

jsonppTest.runFixtureTests({
  readFile: readFile,
  formatJson: jsonpp.formatJson,
  baseDir: "tests/fixtures",
  checkErrors: true
});

print("All tests passed.");
