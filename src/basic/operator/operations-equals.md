---
title: 相等操作符
---

## `==` 和`===` 的区别

== 允许在相等比较中进行强制类型转换，而 === 不允许。（你不知道的 JS）<br>
相等和不相等——先转换再比较，全等和不全等——仅比较而不转换。(高级程序设计)

在转换不同的数据类型时，相等和不相等操作符遵循下列基本规则:

- 如果有一个操作数是布尔值，则在比较相等性之前先将其转换为数值——false 转换为 0，而 true 转换为 1;
- 如果一个操作数是字符串，另一个操作数是数值，在比较相等性之前先将字符串转换为数值;
- 如果一个操作数是对象，另一个操作数不是，则调用对象的 valueOf()方法，用得到的基本类型值按照前面的规则进行比较;

这两个操作符在进行比较时则要遵循下列规则。

- null 和 undefined 是相等的。
- 要比较相等性之前，不能将 null 和 undefined 转换成其他任何值。
- 如果有一个操作数是 NaN，则相等操作符返回 false，而不相等操作符返回 true。重要提示:
  即使两个操作数都是 NaN，相等操作符也返回 false;因为按照规则，NaN 不等于 NaN。
- 如果两个操作数都是对象，则比较它们是不是同一个对象。如果两个操作数都指向同一个对象，
  则相等操作符返回 true;否则，返回 false。

## == 比较中的 5 条规则

规则 1：NaN 和其他任何类型比较永远返回 false（包括和他自己 ）。

```js
NaN == NaN; // false
```

规则 2：Boolean 和其他任何类型比较，Boolean 首先被转换为 Number 类型。

```js
true == 1; // true
true == '2'; // false, 先把 true 变成 1，而不是把 '2' 变成 true
true == ['1']; // true, 先把 true 变成 1， ['1']拆箱成 '1', 再参考规则3
true == ['2']; // false, 同上
undefined == false; // false ，首先 false 变成 0，然后参考规则4
null == false; // false，同上
```

规则 3：String 和 Number 比较，先将 String 转换为 Number 类型。

```js
123 == '123'; // true, '123' 会先变成 123
'' == 0; // true, '' 会首先变成 0
```

规则 4：null == undefined 比较结果是 true，除此之外，null、undefined 和其他任何结果的比较值都为 false。

```js
null == undefined; // true
null == ''; // false
null == 0; // false
null == false; // false
undefined == ''; // false
undefined == 0; // false
undefined == false; // false
```

规则 5：原始类型和引用类型做比较时，引用类型会依照 ToPrimitive 规则转换为原始类型。

```js
'[object Object]' == {};
// true, 对象和字符串比较，对象通过 toString 得到一个基本类型值
'1,2,3' == [1, 2, 3];
// true, 同上  [1, 2, 3]通过 toString 得到一个基本类型值
```

## 抽象相等

如果两个值的类型相同，就仅比较它们是否相等。例如，42 等于 42，"abc" 等于 "abc"。

有几个非常规的情况需要注意。

- NaN 不等于 NaN。
- +0 等于 -0。

对象(包括函数和数组)的宽松相等 ==。两个对象指向同一个值时即视为相等，不发生强制类型转换。

== 在比较两个不同类型的值时会发生隐式强制类型转换，会将其中之 一或两者都转换为相同的类型后再进行比较。

## 字符串和数字之间的相等比较

如果一个操作数是字符串，另一个操作数是数值，在比较相等性之前先将字符串转换为数值;

```js
var a = 42;
var b = '42';

a === b; // false
a == b; // true
```

---

## 其他类型和布尔类型之间的相等比较 ⭐️

如果有一个操作数是布尔值，则在比较相等性之前先将其转换为数值——false 转换为 0，而 true 转换为 1；

```js
'42' == true; // false
'42' == false; // false
```

1. Type(x)是布尔值，所以 ToNumber(x)将 true 强制类型转换为 1，变成 1 == "42"
2. "42" 根据规则被强制类型转换为 42，最后变成 1 == 42，结果为 false。

避免了 == true 和 == false(也叫作布尔值的宽松相等)之后我们就不用担心这些坑了。

```js
var a = '42';
// 不要这样用，条件判断不成立:
if (a == true) {
  // ..
}
// 也不要这样用，条件判断不成立:
if (a === true) {
  // ..
}
// 这样的显式用法没问题:
if (a) {
  // ..
}
// 这样的显式用法更好:
if (!!a) {
  // ..
}
// 这样的显式用法也很好:
if (Boolean(a)) {
  // ..
}
```

---

## null 和 undefined 之间的相等比较

- `null` 和 `undefined` 相等。
- `null` 和 `undefined` 不能转换为其他类型的值再进行比较。

```js
var a = null;
var b;

a == b; // true
a == null; // true
b == null; // true

a == false; // false
b == false; // false
a == ''; // false
b == ''; // false
a == 0; // false
b == 0; // false
```

上例中可以看出 null 和 undefined 是相等的，除此之外其他值都不成立，包括 0、false 和"" 这样的假值。

使用场景

1. 函数传参

```js
function compact(array) {
  if (array == null) {
    return [];
  }
  // ...do something
}
```

2. 条件判断

```js
var a = doSomething();
if (a == null) {
  // ..
}

if (a === undefined || a === null) {
  // ..
}
```

条件判断 `a == null` 仅在 doSomething() 返回非 `null` 和 `undefined` 时才成立，除此之外其他值都不成立，包括 `0`、`false` 和`""` 这样的假值。

## 对象和非对象之间的相等比较

<Alert>
如果一个操作数是对象，另一个操作数不是，则调用对象的 valueOf()方法，用得到的基本类
型值按照前面的规则进行比较；
</Alert>

```js
var a = 42;
var b = [42];
a == b; // true
```

[ 42 ] 首先调用 ToPromitive 抽象操作，返回 "42"，变成 "42" == 42，然后 又变成 42 == 42，最后二者相等。

```js
var a = 'abc';
var b = Object(a); // 和new String( a )一样
a === b; // false
a == b; // true

var a = null;
var b = Object(a); // 和Object()一样
a == b; // false
var c = undefined;
var d = Object(c); // 和Object()一样
c == d; // false
var e = NaN;
var f = Object(e); // 和new Number( e )一样
e == f; // false
```

因为没有对应的封装对象，所以 null 和 undefined 不能够被封装(boxed)，Object(null) 和 Object() 均返回一个常规对象。

#### 2 的什么情况下等于 3？

```js
Number.prototype.valueOf = function() {
  return 3;
};

new Number(2) == 3; // true
```

#### a == 2 && a == 3

```js
var i = 2;
Number.prototype.valueOf = function() {
  return i++;
};
var a = new Number(42);
if (a == 2 && a == 3) {
  console.log('Yep, this happened.');
}
```

## 对象与对象之间的相等比较

<Alert>
如果两个操作数都是对象，则比较它们是不是同一个对象。如果两个操作数都指向同一个对象，
则相等操作符返回 true；否则，返回 false。
</Alert>

```js
[] == ![]; // true
```

据 ToBoolean 规则，它会进行布尔 值的显式强制类型转换(同时反转奇偶校验位)。所以`[] == ![]`变成了`[] == false`。

1. [] == false
2. [] == 0
3. '' == 0
4. 0 == 0

## 比较少见的情况

假值的相等比较

```js
'0' == null; // false
'0' == undefined; // false
'0' == false; // true -- 晕!
'0' == NaN; // false
'0' == 0; // true
'0' == ''; // false

false == null; // false
false == undefined; // false
false == NaN; // false
false == 0; // true -- 晕!
false == ''; // true -- 晕!
false == []; // true -- 晕!
false == {}; // false

'' == null; // false
'' == undefined; // false
'' == NaN; // false
'' == 0; // true -- 晕!
'' == []; // true -- 晕!
'' == {}; // false

0 == null; // false
0 == undefined; // false
0 == NaN; // false
0 == []; // true -- 晕!
0 == {}; // false
```

安全运用隐式强制类型转换

我们要对 == 两边的值认真推敲，以下两个原则可以让我们有效地避免出错。

```js
'0' == false; // true -- 晕!
false == 0; // true -- 晕!
false == ''; // true -- 晕!
false == []; // true -- 晕!
'' == 0; // true -- 晕!
'' == []; // true -- 晕!
0 == []; // true -- 晕!
```

- 如果两边的值中有 true 或者 false，千万不要使用 ==。
- 如果两边的值中有 []、"" 或者 0，尽量不要使用 ==。

## 练习题

1. [] == ![]

   - 第一步，![] 会变成 false
   - 第二步，应用 规则 2 ，题目变成： [] == 0
   - 第三步，应用 规则 5 ，[]的 valueOf 是 0，题目变成： 0 == 0
   - 所以， 答案是 true ！//

[JavaScript 隐式类型转换，一篇就够了！](https://chinese.freecodecamp.org/news/javascript-implicit-type-conversion/#-1-)
