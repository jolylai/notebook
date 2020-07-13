# 关系比较

“抽象关系比较”（abstract relational comparison），分为两个部分：比较双方都是字符串和其他情况。

比较双方首先调用 ToPrimitive，如果结果出现非字符串，就根据 ToNumber 规则将双方强制类型转换为数字来进行比较。

## 两个操作数都是数值

如果两个操作数都是数值，则执行数值比较。

```js
5 < 6; // true
5 > 6; // false
```

## 一个操作数是数值

如果一个操作数是数值，则将另一个操作数转换为一个数值，然后执行数值比较

```js
53 < "12"; // false
42 < "043"; // true
```

## 一个操作数是布尔值

如果一个操作数是布尔值，则先将其转换为数值，然后再执行比较。

```js
false < 8; // true
```

## 一个操作数是对象

如果一个操作数是对象，则调用这个对象的 valueOf()方法，用得到的结果按照前面的规则执
行比较。如果对象没有 valueOf()方法，则调用 toString()方法，并用得到的结果根据前面
的规则执行比较。

```js
[42] < ["43"]; // true

["42"] < ["043"]; // false

[4, 2] < [0, 4, 3]; // false

var a = { b: 42 };
var b = { b: 43 };

a < b; // false
a == b; // false
a > b; // false
a <= b; // true
a >= b; // true
```

因为 a 是 [object Object]，b 也是 [object Object]，所以按照字母顺序
a < b 并不成立。

## NaN

任何操作数与 NaN 进行关系比较，结果都是 false。

```js
NaN < 3; // false
NaN >= 3; // false
```

## 两个操作数都是字符串

如果两个操作数都是字符串，则比较两个字符串对应的字符编码值。

```js
"Brick" < "alphabet"; //true
"Brick".toLowerCase() < "alphabet".toLowerCase(); //false

"23" < "3"; //true
"23" < 3; //false
```
