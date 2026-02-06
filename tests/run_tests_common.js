(function (root) {
  "use strict";

  function assertEquals(actual, expected, message) {
    if (actual !== expected) {
      throw new Error(message + "\nExpected:\n" + expected + "\nActual:\n" + actual);
    }
  }

  function assertThrows(fn, message) {
    var threw = false;
    try {
      fn();
    } catch (error) {
      threw = true;
    }
    if (!threw) {
      throw new Error(message);
    }
  }

  function runFixtureTests(config) {
    var readFile = config.readFile;
    var formatJson = config.formatJson;
    var baseDir = config.baseDir;

    var cases = [
      {
        name: "simple",
        input: baseDir + "/simple.json",
        expected: baseDir + "/simple.expected",
        options: { maxWidth: 80, indent: 1 }
      },
      {
        name: "narrow",
        input: baseDir + "/narrow.json",
        expected: baseDir + "/narrow.expected",
        options: { maxWidth: 20, indent: 1 }
      },
      {
        name: "objects",
        input: baseDir + "/objects.json",
        expected: baseDir + "/objects.expected",
        options: { maxWidth: 40, indent: 1 }
      },
      {
        name: "empty",
        input: baseDir + "/empty.json",
        expected: baseDir + "/empty.expected",
        options: { maxWidth: 12, indent: 1 }
      },
      {
        name: "mixed",
        input: baseDir + "/mixed.json",
        expected: baseDir + "/mixed.expected",
        options: { maxWidth: 20, indent: 1 }
      },
      {
        name: "nested",
        input: baseDir + "/nested.json",
        expected: baseDir + "/nested.expected",
        options: { maxWidth: 18, indent: 1 }
      }
    ];

    var i;
    for (i = 0; i < cases.length; i += 1) {
      var inputRaw = readFile(cases[i].input);
      var expected = readFile(cases[i].expected);
      var data = JSON.parse(inputRaw);
      var output = formatJson(data, cases[i].options);
      assertEquals(output + "\n", expected, "Mismatch for case: " + cases[i].name);
    }

    if (config.checkErrors) {
      assertThrows(function () {
        formatJson({ value: 1 }, { indent: -1 });
      }, "Expected error for negative indent.");
      assertThrows(function () {
        formatJson({ value: 1 }, { maxWidth: 0 });
      }, "Expected error for non-positive maxWidth.");
    }
  }

  var api = { runFixtureTests: runFixtureTests };

  if (typeof module !== "undefined" && module.exports) {
    module.exports = api;
  } else {
    root.jsonppTest = api;
  }
}(this));
