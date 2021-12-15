---
title: 观察者模式
---

##

![](https://cy-picgo.oss-cn-hangzhou.aliyuncs.com/20211215153742.png)

发布—订阅模式又叫**观察者模式**，它定义对象间的一种一对多的依赖关系，当一个对象的状态发生改变时，所有依赖于它的对象都将得到通知。在 JavaScript 开发中，我们一般用事件模型来替代传统的发布—订阅模式

发布—订阅模式的优点非常明显，一为时间上的解耦，二为对象之间的解耦。它的应用非常 广泛，既可以用在异步编程中，也可以帮助我们完成更松耦合的代码编写。发布—订阅模式还可 以用来帮助实现一些别的设计模式，比如中介者模式。从架构上来看，无论是 MVC 还是 MVVM， 都少不了发布—订阅模式的参与，而且 JavaScript 本身也是一门基于事件驱动的语言。

当然，发布—订阅模式也不是完全没有缺点。创建订阅者本身要消耗一定的时间和内存，而 且当你订阅一个消息后，也许此消息最后都未发生，但这个订阅者会始终存在于内存中。另外， 发布—订阅模式虽然可以弱化对象之间的联系，但如果过度使用的话，对象和对象之间的必要联 系也将被深埋在背后，会导致程序难以跟踪维护和理解。特别是有多个发布者和订阅者嵌套到一 起的时候，要跟踪一个 bug 不是件轻松的事情。

### DOM 事件

```html
<button id="btn">button</button>
```

```js
const btn = document.getElementById('btn');
// 订阅
const clickHandler = () => {
  console.log('按钮被点击了');
};

btn.addEventListener('click', clickHandler, false);
```

## 实现

订阅方法，取消订阅方法，发布方法，状态（当状态改变时去发布）

```js
class Subject {
  constructor() {
    this.state = 0;
    this.observers = [];
  }

  getState() {
    return this.state;
  }

  setState(state) {
    this.state = state;
    this.notifyAllObservers();
  }

  notifyAllObservers() {
    this.observers.forEach(observer => observer.update());
  }

  attch(observer) {
    this.observers.push(observer);
  }
}

class Observer {
  constructor(name, subject) {
    this.name = name;
    this.subject = subject;
    this.subject.attch(this);
  }
  update() {
    console.log(`name: ${this.name}, state: ${this.subject.getState()}`);
  }
}

const s = new Subject();
const o1 = new Observer('o1', s);
const o2 = new Observer('o2', s);

s.setState(1);
```

在 Java 中实现一个自己的发布—订阅模式，通常会把订阅者对象自身当成引用传入发布者对象中，同时订阅者对象还需提供一个名为诸如 update 的方法，供发布者对象在适合的时候调用。而在 JavaScript 中，我们用注册回调函数的形式来代替传统的发布—订阅模式，显得更加优雅和简单。

## 一定是先订阅再分布吗

通常我们都是先订阅，然后发布，但是想想我们是不是也可以先发布，然后再订阅，如 QQ 离线消息，我们先发布了消息，然后登陆了之后才收到消息
