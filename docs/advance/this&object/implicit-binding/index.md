---
title: 显示绑定
order: 30
---

### 显式绑定

JavaScript 提供的绝大多数函数以及你自 己创建的所有函数都可以使用 call(..) 和 apply(..) 方法。通过 foo.call(..)，我们可以在调用 foo 时强制把它的 this 绑定到 obj 上。

```js
function foo() {
  console.log(this.a);
}
var obj = { a: 2 };
foo.call(obj); // 2
```

如果你传入了一个原始值(字符串类型、布尔类型或者数字类型)来当作 this 的绑定对 象，这个原始值会被转换成它的对象形式(也就是 `new String(..)`、`new Boolean(..)`或者 `new Number(..)`)。这通常被称为“装箱”。

```js
var nickname = 'Kitty';

function Person(name) {
  this.nickname = name;
  this.distractedGreeting = function() {
    setTimeout(function() {
      console.log('Hello, my name is ' + this.nickname);
    }, 500);
  };
}

var person = new Person('jawil');

person.distractedGreeting(); //Hello, my name is Kitty
```

使用箭头函数

```js
var nickname = 'Kitty';
function Person(name) {
  this.nickname = name;
  this.distractedGreeting = function() {
    setTimeout(() => {
      console.log('Hello, my name is ' + this.nickname);
    }, 500);
  };
}

var person = new Person('jawil');
person.distractedGreeting();
// Hello, my name is jawil

// 隐式丢失
var foo = person.distractedGreeting;
foo(); // Hello, my name is Kitty
```

使用 bind

```js
var nickname = 'Kitty';
function Person(name) {
  this.nickname = name;
  this.distractedGreeting = function() {
    setTimeout(
      function() {
        console.log('Hello, my name is ' + this.nickname);
      }.bind(this),
      500,
    );
  };
}

var person = new Person('jawil');
person.distractedGreeting();
// Hello, my name is jawil
```

## 类型验证

## 获取数组中的最大值和最小值

```js
var numbers = [5, 458, 120, -215];

Math.max.apply(Math, numbers); //458
Math.max.call(Math, 5, 458, 120, -215); //458

// ES6
Math.max.call(Math, ...numbers); // 458
```
