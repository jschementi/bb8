// jshint esversion:6

var sphero = require("sphero");
var bb8 = sphero(process.env.PORT);

bb8.connect((err) => {
  if (err) {
    return console.log('BB-8 failed to connect', err);
  }
  console.log('BB-8 going to sleep');
  bb8.sleep(0,0,0, (err, data) => {
    if (err) throw err;
    console.log(data);
    setTimeout(() => process.exit(0), 5000);
  });
});
