---
title: 深入箭头函数
order: 2
---

## 题目一

```js
/**
 * 非严格模式
 */

var name = 'window';

var person1 = {
  name: 'person1',
  show1: function() {
    console.log(this.name);
  },
  show2: () => console.log(this.name),
  show3: function() {
    return function() {
      console.log(this.name);
    };
  },
  show4: function() {
    return () => console.log(this.name);
  },
};
var person2 = { name: 'person2' };

person1.show1();
person1.show1.call(person2);

person1.show2();
person1.show2.call(person2);

person1.show3()();
person1.show3().call(person2);
person1.show3.call(person2)();

person1.show4()();
person1.show4().call(person2);
person1.show4.call(person2)();
```

正确答案如下：

```js
person1.show1(); // person1，隐式绑定，this指向调用者 person1
person1.show1.call(person2); // person2，显式绑定，this指向 person2

person1.show2(); // window，箭头函数绑定，this指向外层作用域，即全局作用域
person1.show2.call(person2); // window，箭头函数绑定，this指向外层作用域，即全局作用域

person1.show3()(); // window，默认绑定，这是一个高阶函数，调用者是window
// 类似于`var func = person1.show3()` 执行`func()`
person1.show3().call(person2); // person2，显式绑定，this指向 person2
person1.show3.call(person2)(); // window，默认绑定，调用者是window

person1.show4()(); // person1，箭头函数绑定，this指向外层作用域，即person1函数作用域
person1.show4().call(person2); // person1，箭头函数绑定，
// this指向外层作用域，即person1函数作用域
person1.show4.call(person2)(); // person2
```

## 题目二

这次通过构造函数来创建一个对象，并执行相同的 4 个 show 方法。

```js
/**
 * 非严格模式
 */

var name = 'window';

function Person(name) {
  this.name = name;
  this.show1 = function() {
    console.log(this.name);
  };
  this.show2 = () => console.log(this.name);
  this.show3 = function() {
    return function() {
      console.log(this.name);
    };
  };
  this.show4 = function() {
    return () => console.log(this.name);
  };
}

var personA = new Person('personA');
var personB = new Person('personB');

personA.show1();
personA.show1.call(personB);

personA.show2();
personA.show2.call(personB);

personA.show3()();
personA.show3().call(personB);
personA.show3.call(personB)();

personA.show4()();
personA.show4().call(personB);
personA.show4.call(personB)();
```

正确答案如下：

```js
personA.show1(); // personA，隐式绑定，调用者是 personA
personA.show1.call(personB); // personB，显式绑定，调用者是 personB

personA.show2(); // personA，首先personA是new绑定，产生了新的构造函数作用域，
// 然后是箭头函数绑定，this指向外层作用域，即personA函数作用域
personA.show2.call(personB); // personA，同上

personA.show3()(); // window，默认绑定，调用者是window
personA.show3().call(personB); // personB，显式绑定，调用者是personB
personA.show3.call(personB)(); // window，默认绑定，调用者是window

personA.show4()(); // personA，箭头函数绑定，this指向外层作用域，即personA函数作用域
personA.show4().call(personB); // personA，箭头函数绑定，call并没有改变外层作用域，
// this指向外层作用域，即personA函数作用域
personA.show4.call(personB)(); // personB，解析同题目1，最后是箭头函数绑定，
// this指向外层作用域，即改变后的person2函数作用域
```
