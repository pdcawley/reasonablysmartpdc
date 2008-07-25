system.use('app.fixup_datastore');

app.runTests = function () {
  system.datastore.write('tests', {id: 1, value: 'original'});
  plan({tests: 3});

  var o1 = system.datastore.get('tests', 1)
  , o2 = system.datastore.get('tests', 1)
  ;

  ok(o1, "fetched an object");
  ok(o2, "fetched it again");
  o1.value = 'altered';
  is(o2.value, 'altered');
};
