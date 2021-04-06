target 要使用 Proxy 包装的目标对象（可以是任何类型的对象，包括原生数组，函数，甚至另一个代理
handler 一个通常以函数作为属性的对象，用来定制拦截行为

```js
const origin = {};
const proxy = new Proxy(origin, {
  get: function(target, key, context) {
    return 10;
  },
});

proxy.a;
```
