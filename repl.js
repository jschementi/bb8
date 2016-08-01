// jshint esversion:6

var sphero = require("sphero");
var bb8 = sphero(process.env.PORT);

bb8.connect((err) => {
  if (err) {
    return console.log('BB-8 failed to connect', err);
  }
  console.log('BB-8 connected');
  bb8.color('orangered');
  bb8.setAutoReconnect(1, 20, (err) => {
    if (err) throw err;

    var repl = require('repl');
    var r = repl.start('> ');
    r.context.bb8 = bb8;
  });
});
