(function () {
  function runTests(std) {
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
  }

  if (typeof load === "function") {
    var std = typeof std !== "undefined" ? std : null;
    if (!std && typeof require === "function") {
      std = require("std");
    }
    if (!std) {
      throw new Error("QuickJS std module is required.");
    }
    load("../src/jsonpp.js");
    load("./run_tests_common.js");
    runTests(std);
    return;
  }

  (async function () {
    var std = await import("std");
    var src = std.loadFile("../src/jsonpp.js", "utf-8");
    if (src === null) {
      throw new Error("Unable to read src/jsonpp.js");
    }
    std.evalScript(src);
    var common = std.loadFile("./run_tests_common.js", "utf-8");
    if (common === null) {
      throw new Error("Unable to read tests/run_tests_common.js");
    }
    std.evalScript(common);
    runTests(std);
  }()).catch(function (error) {
    throw error;
  });
}());
