process.on('message', message => {
  console.log('worker: ', message);
});
process.send('master message');
