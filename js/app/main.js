app.runTests = function () {
  diag("app tests");
  plan({tests: 1});
  ok(1, "app.runTests got called");
};
