---
title: bind
order: 3
---

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
