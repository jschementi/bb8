// jshint esversion:6

if (!process.env.PORT) {

  const noble = require('noble');
  const child_process = require('child_process');

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

  const dgram = require('dgram');
  const sphero = require("sphero");

  const deviceID = process.env.PORT;

  console.log('Connecting to BB-8', deviceID);

  const bb8 = sphero(deviceID);

  bb8.connect((err) => {
    if (err) {
      return console.log('BB-8 failed to connect', err);
    }
    console.log('BB-8 connected');
    bb8.color('orangered');
    bb8.setAutoReconnect(1, 20, (err) => {
      if (err) throw err;

      const server = dgram.createSocket('udp4');

      server.on('error', (err) => {
        console.log(`server error:\n${err.stack}`);
        server.close();
      });

      server.on('message', (msg, rinfo) => {
        console.log(rinfo);
        console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);

        var exitCode = parseInt(msg, 10);
        console.log('Exit code: ', exitCode);
        if (exitCode === 0) {
          bb8.color('green');
        } else if (isNaN(exitCode)) {
          bb8.color('orange');
        } else {
          bb8.color('red');
        }
      });

      server.on('listening', () => {
        var address = server.address();
        console.log(`server listening ${address.address}:${address.port}`);
      });

      server.bind(8081);
    });
  });
}
