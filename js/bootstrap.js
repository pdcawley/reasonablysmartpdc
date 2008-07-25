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

const NOT_FOUND = [404, "Not found", ["Content-Type", "text/html"], "<html><head><title>404 Not Found</title></head><body><p>Nope, I dunno where that's gone</p></body></html>"];

function main () {
  var uri = system.request.uri
  , path = uri.split(/\//)
  , target = app
  , [action, format] = path.pop().split(/\.(?=[^.]*$)/)
  , item // for that for loop 'cos let doesn't work
  ;

  system.console.log(action);
  debug(action);
  debug('[' + path.join(', ') + ']');

  for each(item in path) {
    if (item) {
      debug("Checking " + item);
      target = target[item];
      if (!target) {
        return NOT_FOUND;
      }

    }
  }

  switch (action) {
  case 'test':
    try {
      target.runTests();
      return [200, "Ok", ["Content-Type", "text/plain"], Test.More.builder().buffer];
    }
    catch (e) {
      return [ 500, "Internal Server Error"
             , ["Content-Type", "text/plain"]
             , "Got error: " + e + "\n\n" + Test.More.builder().buffer];
    }
    break;
  default:
    return NOT_FOUND;
  }
}
