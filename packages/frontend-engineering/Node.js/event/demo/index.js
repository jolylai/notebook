const EventEmitter = require('events');

const eventEmitter = new EventEmitter();

eventEmitter.on('start', count => {
  console.log('start', count);
});

eventEmitter.emit('start', 1);
eventEmitter.emit('start', 2);
eventEmitter.emit('start', 3);
eventEmitter.emit('start', 4);
