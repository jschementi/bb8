// jshint esversion:6

if (!process.env.PORT) {

  var noble = require('noble');
  var child_process = require('child_process');

  console.log('No device ID, finding bb-8...');

  noble.on('stateChange', function(state) {
    console.log('stateChange', state);
    if (state === 'poweredOn') {
      noble.startScanning();
    } else {
      console.log('Please turn bluetooth on');
      noble.stopScanning();
    }
  });

  noble.on('discover', (device) => {
    if (device && device.advertisement && device.advertisement.localName && device.advertisement.localName.indexOf('BB-8') === 0) {
      console.log("Found BB-8!", device.id);
      noble.stopScanning();
      child_process.fork(__dirname + '/index.js', [], {
        env: {
          PORT: device.id
        }
      });
    } else {
      console.log("Found device, not BB-8");
    }
  });

} else {

  var net = require('net');
  var sphero = require("sphero");

  var deviceID = process.env.PORT;

  console.log('Connecting to BB-8', deviceID);

  var bb8 = sphero(deviceID);

  bb8.connect((err) => {
    if (err) {
      return console.log('BB-8 failed to connect', err);
    }
    console.log('BB-8 connected');
    bb8.color('orangered');
    bb8.setAutoReconnect(1, 20, (err) => {
      if (err) throw err;

      let interval;

      var server = net.createServer((socket) => {
        socket.on('data', data => {
          var exitCode = parseInt(data, 10);
          console.log('Exit code: ', exitCode);
          if (exitCode === 0) {
            bb8.color('green');
          } else if (isNaN(exitCode)) {
            bb8.color('orange');
          } else {
            bb8.color('red');
          }
        });
        socket.on('end', () => {
          console.log('socket end');
        });
        socket.on('error', err => {
          console.log('socket error', err);
        });
      }).on('error', err => {
        console.error('server error', err);
      });

      server.listen(8081, () => {
        var address = server.address();
        console.log('opened server on %j', address);
      });
    });
  });
}
