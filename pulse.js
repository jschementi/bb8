// jshint esversion:6

var sphero = require("sphero");
var bb8 = sphero(process.env.PORT);
var randomColor = require('sphero/lib/utils').randomColor;

bb8.connect((err) => {
  if (err) {
    return console.log('BB-8 failed to connect', err);
  }
  console.log('BB-8 connected');

  let val = -0.5;
  let incr = 0.1;
  const delay = 100;
  let color = randomColor();

  const interval = setInterval(() => {
    bb8.color(color, val);
    if ((val + incr) > 1.0) {
      incr = Math.abs(incr) * -1;
    } else if ((val + incr) < -1.0) {
      incr = Math.abs(incr);
      color = randomColor();
    }
    val += incr;
  }, delay);
});
