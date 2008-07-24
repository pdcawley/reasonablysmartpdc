var app = {};

system.use("lib.Test.Builder");
system.use("lib.Test.More");
system.use("app.main");

function debug(msg) {
  if (debug.debugging) {
    system.console.log(msg);
  }
}

debug.debugging = true;

function main () {
  diag("First tests");
  plan({tests: 1});

  ok(1);

  Test.More.builder().reset();
  plan({tests: 1});
  ok(1);
  return [200, "Ok", ["Content-Type", "text/plain"], Test.More.builder().buffer];
}
