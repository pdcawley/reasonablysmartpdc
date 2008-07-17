function main() {
  var file = system.filesystem.get('index.html');
  return [ 200, "Ok", ["Content-Type", "text/html" ], file ];
}
