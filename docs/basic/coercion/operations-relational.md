# 关系比较

“抽象关系比较”（abstract relational comparison），分为两个部分：比较双方都是字符串和其他情况。

## 比较双方都是字符串

如果两个操作数都是字符串，则比较两个字符串对应的字符编码值。

```js
'Brick' < 'alphabet'; //true
'Brick'.toLowerCase() < 'alphabet'.toLowerCase(); //false

'23' < '3'; //true
'23' < 3; //false
```

## 其他

<Alert>
比较双方首先调用 ToPrimitive，如果结果出现非字符串，就根据 ToNumber 规则将双方强制类型转换为数字来进行比较。
</Alert>

如果一个操作数是对象，则调用这个对象的 valueOf()方法，用得到的结果按照前面的规则执
行比较。如果对象没有 valueOf()方法，则调用 toString()方法，并用得到的结果根据前面
的规则执行比较。

```js
var a = ['42'];
var b = ['043'];
a < b; // false
```

a 和 b 并没有被转换为数字，因为 ToPrimitive 返回的是字符串，所以这里比较的是 "42" 和 "043" 两个字符串，它们分别以 "4" 和 "0" 开头。因为 "0" 在字母顺序上小于 "4"，所以 最后结果为 false。

```js
var a = { b: 42 };
var b = { b: 43 };

a < b; // false
a == b; // false
a > b; // false
a <= b; // true
a >= b; // true
```

**因为根据规范 a <= b 被处理为 b < a，然后将结果反转(即 !(a > b))。因为 b < a 的结果是 false，所以 a <= b 的结果是 true。**

相等比较有严格相等，关系比较却没有“严格关系比较”(strict relational comparison)。也 就是说如果要避免 a < b 中发生隐式强制类型转换，我们只能确保 a 和 b 为相同的类型， 除此之外别无他法。

```js
NaN < 3; // false
NaN >= 3; // false
```

**任何操作数与 NaN 进行关系比较，结果都是 false。**