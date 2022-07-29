const { fork, spawn, exec, execFile } = require('child_process');

const spawnChild = spawn('node', ['worker.js']);
console.log('spawnChild: ', spawnChild);

// spawnChild.stdout.pipe(process.stdout);

// const forkChild = fork('worker.js');
// console.log('forkChild: ', forkChild);
// forkChild.stdout.on('data', chunk => {
//   console.log('chunk: ', chunk);
// });
