const { fork } = require('child_process');

// process.on('message', message => {
//   console.log('message: worker', message);
// });

// process.send('master message')

const child = fork('worker.js');

child.on('message', message => {
  console.log('child:', message);
});

child.send('master message');
