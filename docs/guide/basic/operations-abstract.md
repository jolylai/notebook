# 抽象值操作

掌握字符串、数字和布尔值之间类型转换的基本规则。

## ToString

要把一个值转换为一个字符串有两种方式。

第一种是使用几乎每个值都有的 `toString()`方法。这个方法唯一要做的就是返回相应值的字符串表现。

第二种使用`String()` 基本包装类型

**String()函数遵循下列转换规则：**

-   如果值有 `toString()`方法，则调用该方法（没有参数）并返回相应的结果；
-   如果值是 `null`，则返回`"null"`；
-   如果值是 `undefined`，则返回`"undefined"`。

### undefined and null

`null` 和 `undefined` 值没有`toString()`这个方法, 如果调用 `toString` 方法会报错；

```js
let a;

//  `undefined` 值没有`toString()`这个方法
a.toString(); // Uncaught TypeError: Cannot read property 'toString' of undefined

// `null` 值没有`toString()`这个方法
a = null;
a.toString(); // Uncaught TypeError: Cannot read property 'toString' of undefined

a = true;
a.toString(); // "true"
```

### Boolean

```js
true.toString(); // "true"
String('true'); // "true"
```

### Number

多数情况下，调用 `toString()`方法不必传递参数。但是，在调用数值的 `toString()`方法时，可以传递一个参数：输出数值的基数。默认情况下，`toString()`方法以十进制格式返回数值的字符串表示。

```js
const a = 10;
// 默认十进制
a.toString(); // "10"
a.toString(2); //"1010"
a.toString(8); // "12"
a.toString(10); // "10"
a.toString(16); // "a"

// 会按照指定的小数位返回数值的字符串
a.toFixed(2); // "10.00"

// 返回以指数表示法（也称 e 表示法）
// 表示的数值的字符串形式
a.toExponential(1); // "1.0e+1"

// toPrecision()会根据要处理的数值决定到底是调用 toFixed()还是调用 toExponential()。
a.toPrecision(1); // "1e+1"
a.toPrecision(2); // "10"

// multiplying `1.07` by `1000`, seven times over
const number = 1.07 * 1000 * 1000 * 1000 * 1000 * 1000 * 1000 * 1000;

// seven times three digits => 21 digits
number.toString(); // "1.07e21"
String(number); // "1.07e21"
```

### Object

```js
const obj = {
    age: 18,
};
obj.toString(); //  "[object Object]"

// 自定义 toString 方法
obj.toString = function() {
    return this.age;
};
obj.toString(); //  18
```

**Note**

-   对普通对象来说，除非自行定义，否则 `toString()`（Object.prototype.toString()）返回内部属性 [[Class]] 的值，如 "[object Object]"。
-   如果对象有自己的 `toString()` 方法，字符串化时就会调用该方法并使用其返回值。

### Array

```js
[null].toString(); // ""
[undefined].toString(); // ""
[true].toString(); // "true"
[1, 2, 3].toString(); //  "1,2,3"
[{}].toString(); // "[object Object]"
[[1, [2]]].toString(); // "1,2"
```

**Note**

-   数组的默认 toString() 方法经过了重新定义，将所有单元字符串化以后再用 "," 连接起来

### JSON Stringification

> [JSON.stringify(value[, replacer [, space]])](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify)

所有安全的 JSON 值（JSON-safe）都可以使用 JSON.stringify(..) 字符串化。不是只能 JSON 对象。

```js
JSON.stringify(42); // "42"
JSON.stringify('42'); // ""42"" (a string with a quoted string value in it)
JSON.stringify(null); // "null"
JSON.stringify(true); // "true"
```

**Note:不安全的 JSON 值**

-   undefined
-   function
-   symbol（ES6+）
-   包含循环引用（对象之间相互引用，形成一个无限循环）的对象。(对包含循环引用的对象执行 JSON.stringify(..) 会出错。)

JSON.stringify(..) 在对象中遇到 `undefined`、`function` 和 `symbol` 时会自动将其忽略，在
数组中则会返回 `null`（以保证单元位置不变）。

```js
JSON.stringify(undefined); // undefined
JSON.stringify(function() {}); // undefined

// 遇到 `undefined`、`function` 和 `symbol` 时
// 返回 `null`（以保证单元位置不变）
JSON.stringify([1, undefined, function() {}, 4]); // "[1,null,null,4]"
// 自动将其忽略
JSON.stringify({ a: 2, b: function() {} }); // "{"a":2}"
```

---

## ToNumber

`true` 转换为 `1`，`false` 转换为 `0`。`undefined` 转换为 `NaN`，`null` 转换为 `0`。

### String

ToNumber 对字符串的处理基本遵循数字常量的相关规则 / 语法。处理失败
时返回 `NaN`（处理数字常量失败时会产生语法错误）。不同之处是 ToNumber 对以 0 开头的
十六进制数并不按十六进制处理（而是按十进制）。

```js
Number(''); // 0
Number(null); // 0
Number(undefined); // NaN
Number(false); // 0
Number(true); // 1
```

**式解析数字字符串**：解析允许字符串中含有非数字字符，解析按从左到右的顺序，如果遇到非数字字符就停
止。而转换不允许出现非数字字符，否则会失败并返回 NaN。

```js
var a = '42';
var b = '42px';

Number(a); // 42
parseInt(a, 10); // 42

Number(b); // NaN
parseInt(b, 10); // 42

parseInt(true); // NaN
```

**Note:parseInt**

-   parseInt(..) 针对的是字符串值。向 parseInt(..) 传递数字和其他类型的参数是没有用的，比如 true、function(){...} 和 [1,2,3]。
-   非字符串参数会首先被强制类型转换为字符串，依赖这样的隐式强制类型转换并非上策，应该避免向 parseInt(..) 传递非字符串参数。
-   如果你的代码需要在 ES5 之前的环境运行，请记得将第二个参数设置为 10。

### Object

对象（包括数组）会首先被转换为相应的基本类型值，如果返回的是非数字的基本类型
值，则再遵循以上规则将其强制转换为数字。

为了将值转换为相应的基本类型值，抽象操作 ToPrimitive（参见 ES5 规范 9.1 节）会首先
（通过内部操作 DefaultValue，参见 ES5 规范 8.12.8 节）检查该值是否有 valueOf() 方法。
如果有并且返回**基本类型值**，就使用该值进行强制类型转换。如果没有就使用 toString()
的返回值（如果存在）来进行强制类型转换。即 `Object.valueOf -> Object.toString -> Object.prototype.toString()`的顺序。

```js
Number({}); // NaN

const a = {
    valueOf: function() {
        return '42';
    },
};
Number(a); // 42

const b = {
    toString: function() {
        return '42';
    },
};
Number(b); // 42

const c = {
    // 有valueOf方法先采用
    valueOf: function() {
        return '12';
    },

    toString: function() {
        return '42';
    },
};
Number(c); // 42

Number([]); // 0
Number(['abc']); // NaN
const d = [4, 2];
Number(d); // NaN
d.toString = function() {
    return this.join(''); // "42"
};
Number(d); // 42
d.valueOf = function() {
    return 12;
};
Number(d); // 12
```

如果 valueOf() 和 toString() 均不返回基本类型值，会产生 TypeError 错误。

```js
const obj = Object.create(null);
Number(obj); // Uncaught TypeError: Cannot convert object to primitive value
```

从 ES5 开始，使用 Object.create(null) 创建的对象 [[Prototype]] 属性为 null，并且没
有 valueOf() 和 toString() 方法，因此无法进行强制类型转换。

### Date

获取当前时间戳

```js
const timestamp = new Date().getTime();
const timestamp = +new Date();
// 静态方法 不用new
const timestamp = Date.now();
```

---

## ToBoolean

JavaScript 中的值可以分为以下两类：

-   (1) 可以被强制类型转换为 false 的值
-   (2) 其他（被强制类型转换为 true 的值）

### 假值

-   undefined
-   null
-   ''
-   false
-   +0, -0 ,NaN

### 真值（truthy value）

真值就是假值列表之外的值。

---
