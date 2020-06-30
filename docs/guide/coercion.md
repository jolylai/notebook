---
title: 强制类型转换
group:
  title: 指南
---

> 将值从一种类型转换为另一种类型通常称为`类型转换(type casting)`，这是显式的情况;隐式的情况称为`强制类型转换(coercion)`。

## toString

**基本类型值的字符串化**

规则为:`null` 转换为 `"null"`，`undefined` 转换为 `"undefined"`，`true` 转换为 `"true"`。

```js
String(null); // 'null'
String(undefined); // 'undefined'
String(true); // 'true'
String(42); // '42'
```

极小值和极大值的数字使用指数形式

```js
// 1.07 连续乘以七个 1000
var a = 1.07 * 1000 * 1000 * 1000 * 1000 * 1000 * 1000 * 1000;
// 七个1000一共21位数字
a.toString(); // "1.07e21"
```

**普通对象的字符串化**

对普通对象来说，如果自行定义对象有自己的 toString() 方法，字符串化时就会调用该方法并 使用其返回值。
否则 toString()(`Object.prototype.toString()`)返回 内部属性 [[Class]] 的值，如 "[object Object]"。

**数组字符串化**

数组的默认 `toString()` 方法经过了重新定义，将所有单元字符串化以后再用 "," 连接起 来:

```js
var a = [1, '2', 3, true];
a.toString(); // "1,2,3,true"

a = [undefined, null];
a.toString(); // ","

a = [[1, 2], [3], 4];
a.toString(); // "1,2,3,4"

a = [{ b: 1 }];
a.toString(); // "[object Object]"

a = [undefined, null, 12, true, '2', { b: 1 }];
a.toString(); // ",,12,true,2,[object Object]"
```

**JSON 字符串化**

对大多数简单值来说，JSON 字符串化和 `toString()` 的效果基本相同，只不过序列化的结果总是字符串:

```js
JSON.stringify(42); // "42"
JSON.stringify('42'); // ""42""(含有双引号的字符串)
JSON.stringify(null); // "null"
JSON.stringify(true); // "true"
```

不安全的 JSON 值

- `undefined`
- `function`
- `symbol (ES6+)`
- `包含循环引用(对象之间相互引用，形成一个无限循环)的对象都不符合 JSON 结构标准`

JSON.stringify(..) 在对象中遇到 `undefined`、`function` 和 `symbol` 时会自动将其忽略，在
数组中则会返回 `null`(以保证单元位置不变)。

```js
JSON.stringify( undefined ); // undefined
JSON.stringify( function(){} ); // undefined
JSON.stringify([1,undefined,function(){},4]);  // "[1, null, null, 4]"
JSON.stringify({ a:2, b:function(){} }）  // "{"a": "2"}"
```

对包含循环引用的对象执行 JSON.stringify(..) 会出错。
如果对象中定义了 toJSON() 方法，JSON 字符串化时会首先调用该方法，然后用它的返回 值来进行序列化。

## ToNumber

### 基本类型值转 Number

`true` 转换为 `1`，`false` 转换为 `0`。`undefined` 转换为 `NaN`，`null` 转换为 `0`。

- ToNumber 对字符串的处理失败时返回 `NaN`(处理数字常量失败时会产生语法错误)
- ToNumber 对以 0 开头的 十六进制数并不按十六进制处理而是按十进制。

### 对象类型值

> 对象(包括数组)会首先被转换为相应的基本类型值，如果返回的是非数字的基本类型值，则再遵循以上规则将其强制转换为数字。

**对象转换成基本类型值**

会首先检查该值是否有 `valueOf()` 方法。 如果有**并且返回基本类型值**，就使用该值进行强制类型转换。如果没有就使用 `toString()`的返回值(如果存在)来进行强制类型转换。

```js
var a = {
  valueOf: function() {
    return '42';
  },
};
Number(a); // 42

var b = {
  toString: function() {
    return '42';
  },
};

Number(b); // 42

var c = [4, 2];
c.toString = function() {
  return this.join(''); // "42"
};
Number(c); // 42

Number(''); // 0
Number([]); // 0
Number(['abc']); // NaN
```

如果 valueOf()不返回基本类型值，则使用 `toString()`的返回值(如果存在)来进行强制类型转

```js
var a = {
  valueOf: function() {
    return [];
  },
};

Number(a); // NaN
```

如果 valueOf() 和 toString() 均不返回基本类型值，会产生 TypeError 错误。

```js
var a = {
  valueOf: function() {
    return [];
  },
  toString: function() {
    return [];
  },
};

Number(a); // TypeError: Cannot convert object to primitive value
```

::: tip
从 ES5 开始，使用 `Object.create(null)` 创建的对象 [[Prototype]] 属性为 null，并且没有 `valueOf()` 和 `toString()` 方法，因此无法进行强制类型转换。
:::

## ToBoolean

### 假值

- undefined
- null
- false
- +0、-0 和 NaN
- ""

假值的布尔强制类型转换结果为 `false`。
