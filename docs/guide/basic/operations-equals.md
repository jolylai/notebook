# 关系比较

宽松相等（loose equals）== 和严格相等（strict equals）=== 都用来判断两个值是否“相
等”，但是它们之间有一个很重要的区别，特别是在判断条件上。

== 允许在相等比较中进行强制类型转换，而 === 不允许。

## 字符串和数字之间的相等比较

如果一个操作数是字符串，另一个操作数是数值，在比较相等性之前先将字符串转换为数值；

> (1) 如果 Type(x) 是数字，Type(y) 是字符串，则返回 x == ToNumber(y) 的结果。
> (2) 如果 Type(x) 是字符串，Type(y) 是数字，则返回 ToNumber(x) == y 的结果。

```js
var a = 42;
var b = '42';

a === b; // false
a == b; // true
```

---

## 其他类型和布尔类型之间的相等比较 ⭐️

如果有一个操作数是布尔值，则在比较相等性之前先将其转换为数值——false 转换为 0，而
true 转换为 1；

> (1) 如果 Type(x) 是布尔类型，则返回 ToNumber(x) == y 的结果；
> (2) 如果 Type(y) 是布尔类型，则返回 x == ToNumber(y) 的结果。

```js
var x = true;
var y = '42';

x == y; // false

var x = '42';
var y = false;

x == y; // false
```

---

## null 和 undefined 之间的相等比较

> (1) 如果 x 为 `null`，y 为 `undefined`，则结果为 `true`。
> (2) 如果 x 为 `undefined`，y 为 `null`，则结果为 `true`。

在 == 中 null 和 undefined 相等（它们也与其自身相等），除此之外其他值都不存在这种
情况

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

null 和 undefined 之间的强制类型转换是安全可靠的，上例中除 null 和 undefined 以外的
其他值均无法得到假阳（false positive）结果。

例如：

```js
function compact(array) {
    if (array == null) {
        return [];
    }
    // ...do something
    return result;
}

var a = doSomething();
if (a == null) {
    // ..
}
```

条件判断 a == null 仅在 doSomething() 返回非 null 和 undefined 时才成立，除此之外其
他值都不成立，包括 0、false 和 "" 这样的假值。

## 对象和非对象之间的相等比较

如果一个操作数是对象，另一个操作数不是，则调用对象的 valueOf()方法，用得到的基本类
型值按照前面的规则进行比较；

> (1) 如果 Type(x) 是字符串或数字，Type(y) 是对象，则返回 x == ToPrimitive(y) 的结果；
> (2) 如果 Type(x) 是对象，Type(y) 是字符串或数字，则返回 ToPromitive(x) == y 的结果。

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

---

## 对象与对象之间的相等比较

如果两个操作数都是对象，则比较它们是不是同一个对象。如果两个操作数都指向同一个对象，
则相等操作符返回 true；否则，返回 false。
