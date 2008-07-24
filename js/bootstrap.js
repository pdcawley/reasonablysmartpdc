system.use("lib.Test.Builder");
system.use("lib.Test.More");

function debug(msg) {
  if (debug.debugging) {
    system.console.log(msg);
  }
}

debug.debugging = true;

function main () {
  plan({tests: 1});

  ok(1);

  debug("Buffer is: '" + Test.More.builder().buffer + "'");

  return [200, "Ok", ["Content-Type", "text/plain"], Test.More.builder().buffer];
}
