var fs = require("fs");
var path = require("path");
var jsonpp = require("../src/jsonpp");
var runner = require("./run_tests_common");

function readFile(filePath) {
  return fs.readFileSync(filePath, { encoding: "utf-8" });
}

runner.runFixtureTests({
  readFile: readFile,
  formatJson: jsonpp.formatJson,
  baseDir: path.join(__dirname, "fixtures"),
  checkErrors: true
});

console.log("All tests passed.");
