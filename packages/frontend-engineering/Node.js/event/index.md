---
title: 事件
---

## 事件触发器

```js
const EventEmitter = require('events');

const eventEmitter = new EventEmitter();

eventEmitter.on('start', count => {
  console.log('start', count);
});

eventEmitter.emit('start', 1);
eventEmitter.emit('start', 2);
eventEmitter.emit('start', 3);
eventEmitter.emit('start', 4);
```

## 单次监听器

```js
const EventEmitter = require('events');

const eventEmitter = new EventEmitter();

eventEmitter.once('start', () => {
  console.log('start');
});

eventEmitter.emit('start');
eventEmitter.emit('start');
eventEmitter.emit('start');
eventEmitter.emit('start');
```
