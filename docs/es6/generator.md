# 生成器

## 打破完整运行

### 输入和输出

```js
function* foo(x) {
  const y = x * (yield);
  return y;
}

const it = foo(3);

// 启动foo(..)
it.next(); // { value: undefined, done: false }

// 把值 7 传回作为被暂停的 yield 表达式的结果
// 相当于把第一个 yield 替换成 7
it.next(7); // { value: 21, done: true }
```

### 多个迭代器

```js
function* foo() {
  var x = yield 2;
  z++;
  var y = yield x * z;
  console.log(x, y, z);
}
var z = 1;
var it1 = foo();
var it2 = foo();
var val1 = it1.next().value; // 2 <-- yield 2
var val2 = it2.next().value; // 2 <-- yield 2
val1 = it1.next(val2 * 10).value; // 40 <-- x:20, z:2
val2 = it2.next(val1 * 5).value; // 600 <-- x:200, z:3
it1.next(val2 / 2); // y:300
// 20 300 3
it2.next(val1 / 4); // y:10
// 200 10 3
```

## 生成器产生值

### 生产者与迭代器

假定你要产生一系列值，其中每个值都与前面一个有特定的关系。

使用闭包实现

```js
var gimmeSomething = (function() {
  var nextVal;
  return function() {
    if (nextVal === undefined) {
      nextVal = 1;
    } else {
      nextVal = 3 * nextVal + 6;
    }
    return nextVal;
  };
})();
gimmeSomething(); // 1
gimmeSomething(); // 9
gimmeSomething(); // 33
gimmeSomething(); // 105
```

使用迭代器实现

```js
var something = (function() {
  var nextVal;
  return {
    // for..of循环需要
    [Symbol.iterator]: function() {
      return this;
    },
    // 标准迭代器接口方法
    next: function() {
      if (nextVal === undefined) {
        nextVal = 1;
      } else {
        nextVal = 3 * nextVal + 6;
      }
      return { done: false, value: nextVal };
    }
  };
})();
something.next().value; // 1
something.next().value; // 9
something.next().value; // 33
something.next().value; // 105

function* something() {
  var nextVal;
  while (true) {
    if (nextVal === undefined) {
      nextVal = 1;
    } else {
      nextVal = 3 * nextVal + 6;
    }
    yield nextVal;
  }
}
```

ES6 还新增了一个 for..of 循环，这意味着可以通过原生循环语法自动迭代标准迭代器：

```js
for (var v of something) {
  console.log(v);
  // 不要死循环！
  if (v > 500) {
    break;
  }
}
// 1 9 33 105 321 969

// 以手工在迭代器上循环
for (var ret; (ret = something.next()) && !ret.done; ) {
  console.log(ret.value);
  // 不要死循环！
  if (ret.value > 500) {
    break;
  }
}
// 1 9 33 105 321 969
```

for..of 循环在每次迭代中自动调用 next()，它不会向 next() 传入任何值，并且会在接收
到 done:true 之后自动停止

## 生成器委托

从一个生成器调用另一个生成器。yield 委托的主要目的是代码组织，以达到与普通函数调用的对称。

```js
function* foo() {
  console.log("*foo() starting");
  yield 3;
  yield 4;
  console.log("*foo() finished");
}
function* bar() {
  // yield *[1,2] 会消耗数组值 [1,2] 的默认迭代器。
  yield* [1, 2];
  yield* foo(); // yield委托！
  yield 5;
}
var it = bar();
it.next().value; // 1
it.next().value; // 2
it.next().value; // *foo()启动
// 3
it.next().value; // 4
it.next().value; // *foo()完成
// 5
```

`yield *` 把迭代器实例控制（当前 `*bar()` 生成器的）委托给 / 转移到了这另一个 `*foo()` 迭代器。

### 消息委托

思考下面消息的消息流出入

```js
function* foo() {
  // it.next(2)
  console.log("inside *foo():", yield "B");
  // it.next(3)
  console.log("inside *foo():", yield "C");
  return "D";
}
function* bar() {
  // it.next(1)
  console.log("inside *bar():", yield "A");
  // yield委托！
  // *bar() 中return "D"
  console.log("inside *bar():", yield* foo());
  // it.next(4)
  console.log("inside *bar():", yield "E");
  return "F";
}
var it = bar();

console.log(it.next().value);
// outside: A

console.log(it.next(1).value);
// inside *bar(): 1
// outside: B

console.log(it.next(2).value);
// inside *foo(): 2
// outside: C

console.log(it.next(3).value);
// inside *foo(): 3
// inside *bar(): D
// outside: E

console.log(it.next(4).value);
// inside *bar(): 4
// outside: F
```

### 异常也被委托

```js
function* foo() {
  try {
    yield "B";
  } catch (err) {
    // 捕获 it.throw(2) 中传进来的值
    console.log("error caught inside *foo():", err);
  }
  yield "C";
  throw "D";
}
function* bar() {
  yield "A";
  try {
    yield* foo();
  } catch (err) {
    // 捕获 *foo() 中 throw "D"
    console.log("error caught inside *bar():", err);
  }
  yield "E";
  yield* baz();
  // 注：不会到达这里！
  // 从 *baz() throw 出来的异常并没有在 *bar() 内被捕获——所以 *baz() 和 *bar()
  // 都被设置为完成状态。这段代码之后，就再也无法通过任何后续的 next(..) 调用得到
  // 值 "G"，next(..) 调用只会给 value 返回 undefined。
  yield "G";
}
function* baz() {
  throw "F";
}
var it = bar();

console.log("outside:", it.next().value);
// outside: A
console.log("outside:", it.next(1).value);
// outside: B
console.log("outside:", it.throw(2).value);
// error caught inside *foo(): 2
// outside: C
console.log("outside:", it.next(3).value);
// error caught inside *bar(): D
// outside: E
try {
  console.log("outside:", it.next(4).value);
} catch (err) {
  console.log("error caught outside:", err);
}
// error caught outside: F
console.log("it.next().value: ", it.next().value);
```

### 异步委托

```js
function* foo() {
  var r2 = yield request("http://some.url.2");
  var r3 = yield request("http://some.url.3/?v=" + r2);
  return r3;
}
function* bar() {
  var r1 = yield request("http://some.url.1");
  var r3 = yield* foo();
  console.log(r3);
}
run(bar);
```

### 递归委托

```js
function* foo(val) {
  if (val > 1) {
    // 生成器递归
    val = yield* foo(val - 1);
  }
  return yield request("http://some.url/?v=" + val);
}
function* bar() {
  var r1 = yield* foo(3);
  console.log(r1);
}
run(bar);
```
