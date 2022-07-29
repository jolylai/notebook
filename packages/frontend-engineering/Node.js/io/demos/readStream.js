// const fs = require('fs');

// const readStream = fs.createReadStream('assets/sample.png');

// readStream.on('data', function onData(data) {
//   console.log('data: ', data);
//   console.log('length: ', data.length);
// });

// readStream.on('end', function onEnd() {
//   console.log('END');
// });

// readStream.on('error', function onError(err) {
//   console.log('err: ', err);
// });

const Stream = require('stream');

const readStream = new Stream.Readable({
  read() {
    //   console.log('read', readStream.read().toString());
  },
});

readStream.on('readable', () => {
  console.log('read', readStream.read().toString());
});

readStream.push('Hello');
readStream.push('Node.js');

// console.log(readStream.toString());
