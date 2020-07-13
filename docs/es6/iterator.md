# 迭代器

> 迭代器（iterator）是一个结构化的模式，用于从源以一次一个的方式提取数据。

`Symbol.iterator` 为每一个对象定义了默认的迭代器。该迭代器可以被 for...of 循环使用。`Object` 没有默认的迭代器

## 接口

```js
{
  [Symbol.iterator](){ return this },
  // 取得下一个IteratorResult
  next(){},
  // 停止迭代器并返回IteratorResult
  // 如for循环break时调用return 方法
  return(){},
  // 报错并返回IteratorResult
  throw(){}
}
```
### return(...)

return(..) 被定义为向迭代器发送一个信号，表明消费者代码已经完毕，不会再从其中提
取任何值。这个信号可以用于通知生产者（响应 next(..) 调用的迭代器）执行可能需要的
清理工作，比如释放 / 关闭网络、数据库或者文件句柄资源。
如果迭代器存在 return(..)，并且出现了任何可以自动被解释为异常或者对迭代器消耗的
提前终止的条件，就会自动调用 return(..)。你也可以手动调用 return(..)。
return(..) 就 像 next(..) 一样会返回一个 IteratorResult 对 象。 一 般 来 说， 发 送 给
return(..) 的可选值将会在这个 IteratorResult 中作为 value 返回，但在一些微妙的情况
下并非如此。

### throw(..) 

throw(..) 用于向迭代器报告一个异常 / 错误，迭代器针对这个信号的反应可能不同于针对
return(..) 意味着的完成信号。和对于 return(..) 的反应不一样，它并不一定意味着迭代
器的完全停止。
例如，通过生成器迭代器，throw(..) 实际上向生成器的停滞执行上下文中插入了一个抛
出的异常，这个异常可以用 try..catch 捕获。未捕获的 throw(..) 异常最终会异常终止生
成器迭代器。

### IteratorResult
`IteratorResult` 接口指定了从任何迭代器操作返回的值必须是下面这种形式的对象：`{ value: .. , done: true / false }`
内置迭代器总是返回这种形式的值，当然如果需要的话，返回值还可以有更多的属性。
例如，自定义迭代器可能在结果对象上增加额外的元数据（比如数据的来源、获取数据的时间长度、缓存过期时长、下次请求的适当频率，等等）。

## 内置类型的迭代

数组迭代

```js
const arr = [1, 2, 3];
const it = arr[Symbol.iterator](); // 生成一个迭代器
it.next(); // { value: 1, done: false }
it.next(); // { value: 2, done: false }
it.next(); // { value: 3, done: false } 此时的done还为false
it.next(); // { value: undefined, done: true }
```

前面代码中在提取值 3 的时候，迭代器 it 不会报告 done: true。必须得再次调用 next()，
越过数组结尾的值，才能得到完成信号 done: true。

字符串迭代

```js
const greeting = "hello world";
const it = greeting[Symbol.iterator]();
it.next(); // { value: "h", done: false }
it.next(); // { value: "e", done: false }
```

严格来说，基本值本身不是 iterable，但是感谢“封箱”技术，"hello world"
被强制转换 / 变换为 String 对象封装形式，而这是一个 iterable。

Map

```js
const m = new Map();
m.set("foo", 42);
m.set({ cool: true }, "hello world");

const it1 = m[Symbol.iterator]();
// api 产生迭代器
const it2 = m.entries();

it1.next(); // { value: [ "foo", 42 ], done: false }
it2.next(); // { value: [ "foo", 42 ], done: false }
```

Set

```js
const s = new Set();

s.add(1);
s.add(2);
s.add(3);

const it1 = s[Symbol.iterator]();
const it2 = s.entries();

it1.next(); // { value: 1, done: false }
it2.next(); // { value: [ 1, 1 ], done: false }
```

`s.entries()` 以 [value, value] 形似迭代对象， `s[Symbol.iterator]()` 以 `value`形似迭代对象

## 迭代器循环

```js
const a = [4, 3, 2, 1];
for (v of a) {
  console.log("value", v);
}
```

```js
const a = [4, 3, 2, 1];
it = a[Symbol.iterator]();

for(let val of it){
  console.log('value', val)
}

for (let v, res; (res = it.next()) && !res.done ) {
  console.log("value", res.value);
}
```

## 自定义迭代器

```js
const it = {
 // 使迭代器it成为iterable
 [Symbol.iterator]() { return this; },
 next() { .. },
 ..
};
it[Symbol.iterator]() === it; // true
```

```js
const Fib = {
  [Symbol.iterator]() {
    const n1 = 1,
      n2 = 1;
    return {
      // 使迭代器成为iterable
      [Symbol.iterator]() {
        return this;
      },
      next() {
        const current = n2;
        n2 = n1;
        n1 = n1 + current;
        return { value: current, done: false };
      },
      return(v) {
        console.log("Fibonacci sequence abandoned.");
        return { value: v, done: true };
      }
    };
  }
};
for (const v of Fib) {
  console.log(v);
  // 者对迭代器消耗的提前终止的条件，就会自动调用 return(..)
  if (v > 50) break;
}
// 1 1 2 3 5 8 13 21 34 55
// Fibonacci sequence abandoned.
```

调用 `Fib[Symbol.iterator]()` 方法的时候，会返回带有 next() 和 return(..) 方法的迭代
器对象。通过放在闭包里的变量 n1 和 n2 维护状态。

## 迭代器消耗

spread 运算符 ...

```js
const a = [1, 2, 3, 4, 5];

function foo(x, y, z, w, p) {
  console.log(x + y + z + w + p);
}
foo(...a); // 15

const b = [0, ...a, 6];
b; // [0,1,2,3,4,5,6]
```

数组解构可以部分或完全（如果和 rest / gather 运算符 ... 配对使用的话）消耗一个迭代器

```js
const a = [1, 2, 3, 4, 5];

const it = a[Symbol.iterator]();

// 从it中获取前两个元素
const [x, y] = it;

// 获取第三个元素，然后一次取得其余所有元素
const [z, ...w] = it;

// it已经完全耗尽？是的。
it.next(); // { value: undefined, done: true }
x; // 1
y; // 2
z; // 3
w; // [4,5]
```
